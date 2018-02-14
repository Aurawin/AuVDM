coMail.App.Components.Nav = {
  Version        : new Version(2015,2,17,90),
  Title          : new Title("Spectrum Mail Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var Nav=coAppUI.App.Components.Nav.Create("Nav","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpInbox=Nav.Items.addItem(
      Nav.itemKind.Group,"gpInbox","Inbox",
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Screen.Views.Inbox,
      [Screen.Main,Screen.tbMain,Screen.Tabsbar,Screen.Folders,Screen.Splitter],
      [Screen.Views.Outbox],
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.Home.ShowList.Add(Nav.gpInbox);

    Nav.gpMark=Nav.Items.addItem(
      Nav.itemKind.Group,"gpMark","Mark",
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var Nav=navItem.Nav;
        switch (coVDM.Manifest.emlThreadView.MAP.Mark.Value){
          case (0) : {
            Nav.gpMark.Menu.setSelected(Nav.gpMark.Menu.miAll);
            break;
          };
          case (1) : {
            Nav.gpMark.Menu.setSelected(Nav.gpMark.Menu.miThread);
            break;
          };
        };
      }
    );
    Nav.gpMark.lbMark=Nav.gpMark.Items.addItem(
      Nav.itemKind.Label,"lbMark",coLang.Table.Mail.Mark.Label,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpMark.Menu=Nav.gpMark.Items.addItem(
      Nav.itemKind.Menu,"Mark Menu","Menu",
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpMark,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpMark.Menu.AllowCaptionChange=true;
    Nav.gpMark.Menu.onMenuItemSelect=function(mnuItem){
      var Nav=mnuItem.Menu.Nav;
    };
    Nav.gpMark.Menu.miAll=Nav.gpMark.Menu.addItem(
      "All",
      coLang.Table.Mail.Mark.Page,
      Nav.NoTarget,
      function(mnuItem){
        if (coVDM.Manifest.emlThreadView.MAP.Mark.Value!=0) {
          coVDM.Manifest.emlThreadView.MAP.Mark.Value=0;
          coVDM.Manifest.Save();
        };
      },
      null
    );
    Nav.gpMark.Menu.miThread=Nav.gpMark.Menu.addItem(
      "Thread",
      coLang.Table.Mail.Mark.Thread,
      Nav.NoTarget,
      function(mnuItem){
        if (coVDM.Manifest.emlThreadView.MAP.Mark.Value!=1) {
          coVDM.Manifest.emlThreadView.MAP.Mark.Value=1;
          coVDM.Manifest.Save();
        };
      },
      null
    );
    Nav.gpMark.Menu.miThread.Selected=true;
    Nav.gpMark.btnMarkRead=Nav.gpMark.Items.addItem(
      Nav.itemKind.Button,"btnMarkRead",coLang.Table.Mail.Mark.Read,
      Nav.oAutoShowOn,
      Nav.oCascadeNoSlide,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpMark,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.gpMark,
      function(navItem){
        var Nav=navItem.Nav;
        var sc=Nav.Screen;
        var vw=Nav.gpMark.Slide;
        var gp=null;
        navItem.Return=Nav.gpMark.Return;
        var Root=(Assigned(vw.Selected)==true)? vw.Selected.getRoot() : null;
        var Items=new Array();
        switch (coVDM.Manifest.emlThreadView.MAP.Mark.Value) {
          case(0): {
            vw.Groups.getAllItems(Items);
            break;
          };
          case(1) : {
            if (Root) Root.Thread.getAllItems(Items);
            break;
          };
        };
        for (var iLcv=0; iLcv<Items.length; iLcv++){
          dbItem=Items[iLcv].Data;
          smry=dbItem.MAP.Summary.Value.MAP;
          if (smry.Read.Value!=true) {
            Items[iLcv].Modified=0;
            sc.DB.Commands.ToggleRead(dbItem,true);
            if ( (gp!=vw.Groups.Pinned) && (coSpectrum.IMAP.Flags.isPinned(dbItem.MAP.Flags.Value)==true)) {
              gp=vw.Groups.Pinned;
            };
          };
        };
        if (Root) {
          if (gp==null) gp=vw.Groups.Default;
          gp.moveItem(Root,coAppUI.ThreadView.SelectNext,coAppUI.ThreadView.WhithinThread,coAppUI.ThreadView.WhithinGroup);
        };
        Items.length=0;
        Items=null;
      }
    );
    Nav.gpMark.btnMarkUnRead=Nav.gpMark.Items.addItem(
      Nav.itemKind.Button,"btnMarkUnRead",coLang.Table.Mail.Mark.Unread,
      Nav.oAutoShowOn,
      Nav.oCascadeNoSlide,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpMark,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.gpMark,
      function(navItem){
        var Nav=navItem.Nav;
        var sc=Nav.Screen;
        var vw=Nav.gpMark.Slide;
        var gp=null;
        navItem.Return=Nav.gpMark.Return;
        var Root=(vw.Selected)? vw.Selected.getRoot() : null;
        var Items=new Array();
        switch (coVDM.Manifest.emlThreadView.MAP.Mark.Value) {
          case(0): {
            vw.Groups.getAllItems(Items);
            break;
          };
          case(1) : {
            if (Root) vw.Selected.Thread.getAllItems(Items);
            break;
          };
        };
        for (var iLcv=0; iLcv<Items.length; iLcv++){
          dbItem=Items[iLcv].Data;
          smry=dbItem.MAP.Summary.Value.MAP;
          if (smry.Read.Value==true) {
            Items[iLcv].Modified=0;
            sc.DB.Commands.ToggleRead(dbItem,false);
            if ( (gp!=vw.Groups.Pinned) && (coSpectrum.IMAP.Flags.isPinned(dbItem.MAP.Flags.Value)==true)) {
              gp=vw.Groups.Pinned;
            };
          };
        };
        if (Root) {
          if (gp==null) gp=vw.Groups.Unread;
          gp.moveItem(Root,coAppUI.ThreadView.SelectNext,coAppUI.ThreadView.WhithinThread,coAppUI.ThreadView.WhithinGroup);
        };
        Items.length=0;
        Items=null;
      }
    );
    Nav.gpInbox.Menu=Nav.gpInbox.Items.addItem(
      Nav.itemKind.Menu,"Inbox Menu","Menu",
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpInbox,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpInbox.AddToShowList(Nav.gpInbox.Menu);
    Nav.gpInbox.Menu.AllowCaptionChange=false;

    Nav.gpInbox.Menu.onMenuItemSelect=function(mnuItem){
      var Nav=mnuItem.Menu.Nav;
    };
    Nav.gpInbox.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpInbox,
      Nav.NoMenuItem,
      function(navItem){
        var sc=navItem.Nav.Screen;
        sc.tbMain.Reveal();
        if (coVDM.Manifest.MailboxFolders.MAP.ForInbox.Value==true){
          sc.Folders.Reveal();
          sc.Splitter.Reveal();
          sc.Folders.Container.style.width=coVDM.Manifest.MailboxFolders.MAP.Width.Value+"px";
          sc.Tabsbar.Tabs.Folders.Selected=true;
          sc.Tabsbar.Tabs.Folders.Decorate();
        } else {
          sc.Tabsbar.Tabs.Folders.Selected=false;
          sc.Tabsbar.Tabs.Folders.Decorate();
          sc.Folders.Conseal();
          sc.Splitter.Conseal();
        };
      }
    );
    Nav.gpInbox.Menu.miRefresh=Nav.gpInbox.Menu.addItem(
      "Refresh",
      coLang.Table.Buttons.Refresh,
      Nav.gpInbox,
      function(mnuItem){
        var Nav=mnuItem.Menu.Nav;
        var mbx=Nav.Screen;
        var vw=mbx.Views.Inbox;
        var Folder=mbx.DB.Folders.Mail.Inbox;
        mbx.DB.Commands.RecordCount(Folder);
        mbx.DB.Commands.ListFolders(Folder);
        mbx.DB.Commands.FolderList(vw,Folder.MAP.ID.Value,vw.Header.Pages.Current);
      },
      null
    );
    Nav.gpInbox.Menu.miSep1=Nav.gpInbox.Menu.addItem(
      "Sep1",
      "-",
      Nav.gpInbox,
      Nav.NoClick
    );
    Nav.gpInbox.Menu.miCompose=Nav.gpInbox.Menu.addItem(
      "Compose",
      coLang.Table.Mail.Compose,
      Nav.gpInbox,
      function(mnuItem){
        var Nav=mnuItem.Menu.Nav;
        var mbx=Nav.Screen;
        var Folder=mbx.DB.Folders.Mail.Outbox;
        var Files=mbx.Views.Outbox.DataSet;
        var cmp=coMail.App.Components.Writers.Create(mbx,Folder,Files,null);
        cmp.Tab.Select();
      },
      null
    );
    Nav.gpInbox.Menu.miMark=Nav.gpInbox.Menu.addItem(
      "Mark",
      coLang.Table.Labels.Mark,
      Nav.gpMark,
      function(menuItem){
        var Nav=menuItem.Menu.Nav;
        var sc=Nav.Screen;
        Nav.gpMark.Slide=sc.Views.Inbox;
        Nav.gpMark.Return=Nav.gpInbox;
      }
    );
    Nav.gpInbox.Menu.miMark.Target=Nav.gpMark;
    Nav.gpInbox.Menu.miSep2=Nav.gpInbox.Menu.addItem(
      "Sep2",
      "-",
      Nav.gpInbox,
      Nav.NoClick
    );
    Nav.gpInbox.Menu.miDelete=Nav.gpInbox.Menu.addItem(
      "Delete",
      coLang.Table.Labels.Delete,
      Nav.gpInbox,
      function(mnuItem){
        var Nav=mnuItem.Menu.Nav;
        var mbx=Nav.Screen;
        if (mbx.Tabsbar.Selected) {
          var vw=mbx.Tabsbar.Selected.Data, dbItem=null, itm=null;
          switch (vw.Class) {
            case ("mail") : {
              if (vw.Selected) {
                dbItem=vw.Selected.Data;
                vw.onDeleteItem(vw.Selected);
              };
              break;
            };
            case ("sldMailReader"):{
              mbx.DB.Commands.DeleteMessage(vw.DataSet,vw.Folder);
              tab=vw.Folder.Display.getItem(mbx.Tabsbar);
              tab.Select();
              break;
            };
            default: {
              //todo
              break;
            };
          };
        };
      },
      null
    );

    Nav.gpFolderView=Nav.Items.addItem(
      Nav.itemKind.Group,"gpFolderView","Folder",
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Screen.FolderView,
      [Screen.Views.Inbox,Screen.Main,Screen.Tabsbar,Screen.tbMain],
      [],
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpFolderView.Menu=Nav.gpFolderView.Items.addItem(
      Nav.itemKind.Menu,"Folder Menu","Menu",
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpFolderView,
      Nav.NoSlide,
      Nav.NoShowList,
      [Screen.Tabsbar],
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpFolderView.Menu.AllowCaptionChange=false;
    Nav.gpFolderView.Menu.onMenuItemSelect=function(mnuItem){
      var Nav=mnuItem.Menu.Nav;
    };
    Nav.gpFolderView.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpFolderView,
      Nav.NoMenuItem,
      function(navItem){
        var sc=navItem.Nav.Screen;
        var vw=navItem.Slide;
        var Folder=vw.Folder;
        var Tab=Folder.Display.getItem(sc.Tabsbar);
        if ((Tab) && (Tab.Selected!=true)) Tab.Select();
        sc.tbMain.Reveal();
        if (coVDM.Manifest.MailboxFolders.MAP.ForMailbox.Value==true){
          sc.Folders.Reveal();
          sc.Splitter.Reveal();
          sc.Folders.Container.style.width=coVDM.Manifest.MailboxFolders.MAP.Width.Value+"px";
          sc.Tabsbar.Tabs.Folders.Selected=true;
          sc.Tabsbar.Tabs.Folders.Decorate();
        } else {
          sc.Tabsbar.Tabs.Folders.Selected=false;
          sc.Tabsbar.Tabs.Folders.Decorate();
          sc.Folders.Conseal();
          sc.Splitter.Conseal();
        };
      }
    );
    Nav.gpFolderView.Menu.miRefresh=Nav.gpFolderView.Menu.addItem(
      "Refresh",
      coLang.Table.Buttons.Refresh,
      Nav.gpFolderView,
      function(mnuItem){
        var Nav=mnuItem.Menu.Nav;
        var mbx=Nav.Screen;
        if (mbx.Folders.Selected) {
         var Folder=mbx.Folders.Selected.Data;
         var vw=Folder.Display.getItemByProperty("Folder",Folder);
         if (vw){
           mbx.DB.Commands.RecordCount(Folder);
           mbx.DB.Commands.ListFolders(Folder);
           mbx.DB.Commands.FolderList(vw,Folder.MAP.ID.Value,vw.Header.Pages.Current);
         };
        };
      },
      null
    );
    Nav.gpFolderView.Menu.miSep1=Nav.gpFolderView.Menu.addItem(
      "Sep1",
      "-",
      Nav.gpFolderView,
      Nav.NoClick
    );
    Nav.gpFolderView.Menu.miCompose=Nav.gpFolderView.Menu.addItem(
      "Compose",
      coLang.Table.Mail.Compose,
      Nav.gpFolderView,
      function(mnuItem){
        var Nav=mnuItem.Menu.Nav;
        var mbx=Nav.Screen;
        var cmp=coMail.App.Components.Writers.Create(mbx);
        cmp.Tab.Select();
      },
      null
    );
    Nav.gpFolderView.Menu.miMark=Nav.gpFolderView.Menu.addItem(
      "Mark",
      coLang.Table.Labels.Mark,
      Nav.gpMark,
      function(menuItem){
        var Nav=menuItem.Menu.Nav;
        var sc=Nav.Screen;
        Nav.gpMark.Slide=Nav.gpFolderView.Slide;
        Nav.gpMark.Return=Nav.gpFolderView;
      }
    );
    Nav.gpFolderView.Menu.miMark.Target=Nav.gpMark;

    Nav.gpFolderView.Menu.miSep2=Nav.gpFolderView.Menu.addItem(
      "Sep2",
      "-",
      Nav.gpFolderView,
      Nav.NoClick
    );
    Nav.gpFolderView.Menu.miClear=Nav.gpFolderView.Menu.addItem(
      "Clear",
      coLang.Table.Buttons.Clear,
      Nav.gpFolderView,
      function(mnuItem){
        var Nav=mnuItem.Menu.Nav;
        var mbx=Nav.Screen;
        var itm=mbx.Folders.Selected;
        if (itm) {
          var Folder=itm.Data;
          var vw=Folder.Display.getItemByProperty("Folder",Folder);
          if (vw){
            mbx.DB.Commands.Clear(Folder,vw.DataSet,mbx.DB.Folders);
          };
        };
      },
      null
    );
    Nav.gpFullReader=Nav.Items.addItem(
      Nav.itemKind.Group,"gpFullReader","Reader",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [Screen.Main,Screen.Tabsbar,Screen.tbMain],
      [],
      Nav.NoReturn,
      Nav.NoClick
    );
    if (coVDM.Display.Small==true){
      Nav.gpFullReader.AddToHideList(Screen.Folders);
      Nav.gpFullReader.AddToHideList(Screen.Splitter);
    };
    Nav.gpFullReader.showTorus=false;

    Nav.gpFullReader.btnUp=Nav.gpFullReader.Items.addItem(
        Nav.itemKind.Button,"btnUp",coLang.Table.Buttons.Up,
        Nav.oAutoShowOn,
        Nav.oCascadeNoSlide,
        Nav.oAddToShowList,
        Nav.oSetAsDefaultOff,
        Nav.NoTarget,
        Nav.NoSlide,
        Nav.NoShowList,
        Nav.NoHideList,
        Nav.NoReturn,
        function(navItem){
          var Nav=navItem.Nav;
          // set data record for previous email
        }
    );

    Nav.gpFullReader.btnDown=Nav.gpFullReader.Items.addItem(
        Nav.itemKind.Button,"btnDown",coLang.Table.Buttons.Down,
        Nav.oAutoShowOn,
        Nav.oCascadeNoSlide,
        Nav.oAddToShowList,
        Nav.oSetAsDefaultOff,
        Nav.NoTarget,
        Nav.NoSlide,
        Nav.NoShowList,
        Nav.NoHideList,
        Nav.NoReturn,
        function(navItem){
          var Nav=navItem.Nav;
          // set data record for next email
        }
    );
    Nav.gpFullReader.btnReply=Nav.gpFullReader.Items.addItem(
        Nav.itemKind.Button,"btnReply",coLang.Table.Buttons.Reply,
        Nav.oAutoShowOn,
        Nav.oCascadeNoSlide,
        Nav.oAddToShowList,
        Nav.oSetAsDefaultOff,
        Nav.NoTarget,
        Nav.NoSlide,
        Nav.NoShowList,
        Nav.NoHideList,
        Nav.NoReturn,
        function(navItem){
          var Nav=navItem.Nav;
          var mbx=Nav.Screen;
          var rdr=Nav.gpFullReader.Slide;
          var dbItem=rdr.Item.Data;
          mbx.DB.Commands.readAndReply(dbItem);
        }
    );
    Nav.gpFullReader.btnForward=Nav.gpFullReader.Items.addItem(
        Nav.itemKind.Button,"btnForward",coLang.Table.Buttons.Forward,
        Nav.oAutoShowOn,
        Nav.oCascadeNoSlide,
        Nav.oAddToShowList,
        Nav.oSetAsDefaultOff,
        Nav.NoTarget,
        Nav.NoSlide,
        [Screen.Tabsbar,Screen.tbMain],
        Nav.NoHideList,
        Nav.NoReturn,
        function(navItem){
          var Nav=navItem.Nav;
          var mbx=Nav.Screen;
          var rdr=Nav.gpFullReader.Slide;
          var dbItem=rdr.Item.Data;
          mbx.DB.Commands.readAndForward(dbItem);
        }
    );
    Nav.gpFullReader.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpFullReader,
      Nav.NoMenuItem,
      function(navItem){
        var sc=navItem.Nav.Screen;
        var rdr=navItem.Slide;
        if ((rdr) && (rdr.Loading==false)) {
          var Folder=rdr.Folder;
          var Tab=Folder.Display.getItem(sc.Tabsbar);
          if ((Tab) && (Tab.Selected!=true)) Tab.Select();
        };
        if (coVDM.Manifest.MailboxFolders.MAP.ForReader.Value==true){
          sc.Folders.Reveal();
          sc.Splitter.Reveal();
          sc.Folders.Container.style.width=coVDM.Manifest.MailboxFolders.MAP.Width.Value+"px";
          sc.Tabsbar.Tabs.Folders.Selected=true;
          sc.Tabsbar.Tabs.Folders.Decorate();
        } else {
          sc.Tabsbar.Tabs.Folders.Selected=false;
          sc.Tabsbar.Tabs.Folders.Decorate();
          sc.Folders.Conseal();
          sc.Splitter.Conseal();
        };
      }
    );
    Nav.gpWriter=Nav.Items.addItem(
      Nav.itemKind.Group,"gpWriter","Writer",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [Screen.Tabsbar,Screen.Main],
      [Screen.tbMain],
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpWriterSigs=Nav.Items.addItem(
      Nav.itemKind.Group,"gpWriterSigs","Signatures",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [Screen.Tabsbar,Screen.Main,Nav.gpWriter],
      Nav.NoHideList,
      Nav.Home,
      Nav.NoClick
    );
    Nav.gpWriter.Menu=Nav.gpWriter.Items.addItem(
      Nav.itemKind.Menu,"Writer Menu","Menu",
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpWriter,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpWriter.Menu.onMenuItemSelect=function(mnuItem){
      var Nav=mnuItem.Menu.Nav;
      var cmp=Nav.gpWriter.Slide;
      cmp.Selections.navMenuItem=mnuItem;
    };
    Nav.gpWriterOptions=Nav.Items.addItem(
      Nav.itemKind.Group,"gpWtrOpts","WriterOptions",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [Screen.Main,Screen.Tabsbar,Nav.gpWriter],
      [Screen.tbMain],
      Nav.gpWriter,
      function(navItem){
        var Nav=navItem.Nav;
        var mbx=Nav.Screen;
        var cmp=Nav.gpWriterOptions.Slide;
      }
    );
    Nav.gpWriterSigs.cmboSigs=Nav.gpWriterSigs.Items.addItem(
      Nav.itemKind.Combo,"cmboSigs","Signatures",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpWriterSigs.btnSign=Nav.gpWriterSigs.Items.addItem(
      Nav.itemKind.Button,"Sign",coLang.Table.Buttons.Sign,
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var Nav=navItem.Nav;
        var mbx=Nav.Screen;
        var mfst=coVDM.Manifest;
        var wr=Nav.gpWriterSigs.Slide;
        var iSig=mfst.emlComposer.Signature.Value=Nav.gpWriterSigs.cmboSigs.Control.value;
        iSig=coUtils.parseInt(iSig);
        mfst.Save();
        var sSig=coSignatures.App.Screen.getSignatureById(iSig);
        sSig=coSpectrum.SMTP.TextToHTML(sSig);
        wr.Body.Controls.Edit.Append(sSig);
        Nav.gpWriter.Menu.setSelected(Nav.gpWriter.Menu.miOptions);
      }
    );
    Nav.gpWriterOptions.btnPTM=Nav.gpWriterOptions.Items.addItem(
      Nav.itemKind.Button,coLang.Table.Buttons.Plain,"Plain",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var Nav=navItem.Nav;
        var mbx=Nav.Screen;
        var wr=Nav.gpWriterOptions.Slide;
        Nav.gpWriterOptions.btnPTM.setChecked(true);
        Nav.gpWriterOptions.btnRTM.setChecked(false);
        if (!wr.Panels.Message.Rich.Control.Rendered){
          wr.Panels.Message.Rich.setVisible();
        } else if (wr.Panels.Message.Rich.Visible==true){
          var editor=wr.Panels.Message.Rich.Control;
          var root = editor.dom.getRoot();
          editor.selection.select(root);
          var sContent = editor.selection.getContent({format : 'text'});
          editor.selection.collapse();
          wr.Panels.Message.Plain.setValue(sContent);
          sContent=null;
        };
        wr.Panels.Message.Rich.setHidden();
        wr.Panels.Message.Plain.setVisible();
      }
    );
    Nav.gpWriterOptions.btnRTM=Nav.gpWriterOptions.Items.addItem(
      Nav.itemKind.Button,"Rich",coLang.Table.Buttons.Rich,
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var Nav=navItem.Nav;
        var mbx=Nav.Screen;
        var wr=Nav.gpWriterOptions.Slide;
        Nav.gpWriterOptions.btnPTM.setChecked(false);
        Nav.gpWriterOptions.btnRTM.setChecked(true);
        var sContent=wr.Panels.Message.Plain.getValue();
        var sContent=sContent.replace(/\r\n/g,"<p>");
        var sContent=sContent.replace(/\n\n/g,"<p>");
        wr.Panels.Message.Plain.setHidden();
        try {
          wr.Panels.Message.Rich.Control.setContent(sContent);
          wr.Panels.Message.Rich.setVisible();
        } catch (err) {
          coVDM.VDM.Console.Append("Exception: coSpectrum.mbx.Nav.gpWriterOptions.btnRTM.setContent "+err);
          wr.Panels.Message.Plain.setVisible();
          wr.Panels.Message.Rich.setHidden();
          Nav.gpWriterOptions.btnPTM.setChecked(true);
          Nav.gpWriterOptions.btnRTM.setChecked(false);
        };
      }
    );
    Nav.gpWriterOptions.cnfSend=Nav.gpWriterOptions.Items.addItem(
      Nav.itemKind.Confirm,"cnfSend",[coLang.Table.Buttons.Send,coLang.Table.Buttons.Discard],
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      [
        function(btn){ // ok

        },
        function(btn){ // cancel
          var Nav=btn.Nav;
          var mbx=Nav.Screen;
          var wr=Nav.gpWriterOptions.Slide;
          wr.Panels.Headers.resetValues();
          wr.Panels.Message.Plain.resetValues();
          wr.Panels.Message.Rich.resetValues();
          wr.Free();
          Nav.setSelected(Nav.gpInbox);
        }
      ]
    );
    Nav.gpWriter.Menu.miSave=Nav.gpWriter.Menu.addItem(
      "Save",
      coLang.Table.Buttons.Save,
      Nav.gpWriter,
      function(mi){
        var Nav=mi.Menu.Nav;
        var cmp=Nav.gpWriter.Slide;
        if (cmp.Loading!=true) cmp.Save();
      }
    );
    Nav.gpWriter.Menu.miSep1=Nav.gpWriter.Menu.addItem(
      "Sep1",
      "-",
      Nav.gpWriter,
      Nav.NoClick
    );
    Nav.gpWriter.Menu.miAttach=Nav.gpWriter.Menu.addItem(
      "Attach",
      coLang.Table.Mail.Attach,
      null,
      Nav.gpWriter.Menu.onMenuItemSelect,
      null
    );
    Nav.gpWriter.Menu.miOptions=Nav.gpWriter.Menu.addItem(
      "Options",
      coLang.Table.Mail.Options,
      Nav.gpWriterOptions,
      Nav.gpWriter.Menu.onMenuItemSelect,
      null
    );
    Nav.gpWriter.Menu.miSignatures=Nav.gpWriter.Menu.addItem(
      "Signatures",
      coLang.Table.Mail.Signatures,
      Nav.gpWriterSigs,
      Nav.gpWriter.Menu.onMenuItemSelect,
      null
    );
    Nav.gpWriter.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpWriter,
      Nav.gpWriter.Menu.miOptions,
      function(navItem){
        var sc=navItem.Nav.Screen;
        if (coVDM.Manifest.MailboxFolders.MAP.ForWriter.Value==true){
          sc.Folders.Reveal();
          sc.Splitter.Reveal();
          sc.Folders.Container.style.width=coVDM.Manifest.MailboxFolders.MAP.Width.Value+"px";
          sc.Tabsbar.Tabs.Folders.Selected=true;
          sc.Tabsbar.Tabs.Folders.Decorate();
        } else {
          sc.Tabsbar.Tabs.Folders.Selected=false;
          sc.Tabsbar.Tabs.Folders.Decorate();
          sc.Folders.Conseal();
          sc.Splitter.Conseal();
        };
      }
    );
    Nav.gpWriterOptions.homeInfo=Nav.gpWriter.homeInfo;
    Nav.gpWriterSigs.homeInfo=Nav.gpWriter.homeInfo;

    Nav.gpWriter.menuItem=Nav.gpWriter.Menu.miOptions;
    Nav.gpWriterSigs.menuItem=Nav.gpWriter.Menu.miSignatures;


    Nav.AddToGroupHideLists(Nav.gpInbox);
    Nav.AddToGroupHideLists(Nav.gpFolderView);
    Nav.AddToGroupHideLists(Nav.gpWriter);
    Nav.AddToGroupHideLists(Nav.gpWriterOptions);
    Nav.AddToGroupHideLists(Nav.gpWriterSigs);
    Nav.AddToGroupHideLists(Nav.gpFullReader);
    Nav.AddToGroupHideLists(Nav.gpMark);
    return Nav;
  }
};
