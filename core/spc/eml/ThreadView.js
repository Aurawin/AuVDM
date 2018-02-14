coMail.App.Components.ThreadView = {
  Version        : new Version(2015,6,1,114),
  Title          : new Title("Spectrum Mail Thread View","ThreadView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/ThreadView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var mbx=Screen;
    var vw=coAppUI.App.Components.ThreadView.Create(mbx.Main.Slides,mbx,mbx.Main,mbx.Main.Container,"Mail","mail",coAppUI.Alignment.Client,coAppUI.vScrollOn);
    vw.Unit=this;

    // Add item tools

    // Mark message
    var tl=vw.Tools.Add(
      "State",
      coLang.Table.Apps.Spectrum.Email.Hint.MarkRead,
      coTheme.Icons.Spectrum.Mail.Status,
      "mailItemToolState",
      function(itm){
        itm.View.onToggleStateItem(itm);
      }
    );
    // Junk
    var tl=vw.Tools.Add(
      "Junk",
      coLang.Table.Apps.Spectrum.Email.Hint.Junk,
      coTheme.Icons.Spectrum.Mail.Junk,
      "mailItemToolJunk",
      function(itm){

        itm.View.onJunkItem(itm);
      }
    );
    // Pin unpin message
    var tl=vw.Tools.Add(
      "Pin",
      coLang.Table.Apps.Spectrum.Email.Hint.Pin,
      coTheme.Icons.Spectrum.Mail.Pin,
      "mailItemToolPin",
      function(itm){
        itm.View.onPinItem(itm);
      }
    );
    // Attachments
    var tl=vw.Tools.Add(
      "Attachments",
      coLang.Table.Apps.Spectrum.Email.Hint.Attachments,
      coTheme.Icons.Spectrum.Mail.Attach,
      "mailItemToolAttach",
      function(itm){
        var vw=itm.View;
        var sc=vw.Screen;
        // Switcher -> message attachments
      }
    );
    tl.Permanent=true;

    // Trash
    var tl=vw.Tools.Add(
      "Trash",
      coLang.Table.Apps.Spectrum.Email.Hint.Trash,
      coTheme.Icons.Spectrum.Mail.Trash,
      "mailItemToolTrash",
      function(itm){
        itm.View.onDeleteItem(itm);
      }
    );
    vw.getFirstUnreadChild=function(itm){
      var vw=this; var itmRes=null;
      if (itm.Data.MAP.Summary.Value.MAP.Read.Value==false) return itm;
      for (var iLcv=0; iLcv<itm.Thread.Items.length; iLcv++){
        itmRes= (itm.Thread.Items[iLcv].Data.MAP.Summary.Value.MAP.Read.Value==false) ? itm.Thread.Items[iLcv] : vw.getFirstUnreadChild(itm.Thread.Items[iLcv]);
        if (itmRes) return itmRes;
      };
      return null;
    };
    vw.DataSet=mbx.DB.createFiles();
    vw.DataSet.Displays.push(vw);
    vw.Groups.Pinned=vw.Groups.Add(
      coTheme.Icons.Spectrum.Mail.Pin,
      coLang.Table.Apps.Spectrum.Email.Group.Label.Pinned,
      coLang.Table.Apps.Spectrum.Email.Group.Label.Empty.Pinned
    );
    vw.Groups.Unread=vw.Groups.Add(
      coTheme.Icons.Spectrum.Mail.Unread,
      coLang.Table.Apps.Spectrum.Email.Group.Label.Unread,
      coLang.Table.Apps.Spectrum.Email.Group.Label.Empty.Unread
    );
    vw.Groups.Default=vw.Groups.Add(
      coTheme.Icons.Spectrum.Mail.Read,
      coLang.Table.Apps.Spectrum.Email.Group.Label.Default,
      coLang.Table.Apps.Spectrum.Email.Group.Label.Empty.Default
    );
    vw.getItemById=function(ID){
      var vw=this;
      var itms=vw.DataSet.Items;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var itm=itms[iLcv];
        if (itm.MAP.ID.Value==ID)
          return itm;
      };
      return null;
    };
    vw.PartialSynchronize=function(loadInfo){
      var vw=this, dbItem=null, iFlags=0, vi=null, Root=null, List=new Array();
      var Thread=dbiParent=itmParent=gp=smry=null, Results=new Array();
      var scTop=vw.Groups.Container.scrollTop;

      for (var iLcv=0; iLcv<loadInfo.Items.length; iLcv++) {
        dbItem=loadInfo.Items[iLcv];
        iFlags=dbItem.MAP.Flags.Value;
        dbItem.Verified=(coVDM.IMAP.Flags.isDeleted(iFlags)==false);
        if (dbItem.Verified==true){
          vi=dbItem.Display.getItem(vw);
          smry=dbItem.MAP.Summary.Value.MAP;
          gp=null; itmParent=null; Thread=null;
          if (coSpectrum.IMAP.Flags.isPinned(iFlags)==true) gp=vw.Groups.Pinned;
          if ( (gp==null) && (smry.InReplyTo.Value.length>0) ) {
            // find dbItemParent
            Results.length=0;
            vw.DataSet.Lookup(smry.MessageId,[smry.InReplyTo.Value],Results);
            if (Results.length>0) {
              dbiParent=Results[0].Owner;
              itmParent=dbiParent.Display.getItem(vw);
              if (itmParent) {
                gp=itmParent.Group;
                Thread=itmParent.Thread;
              };
            };
          };
          if (gp==null)
            gp=(coSpectrum.IMAP.Flags.isSeen(iFlags)==false) ? vw.Groups.Unread : vw.Groups.Default;

          if (vi==null) 
            vi=vw.createItem(gp,Thread,true,dbItem);

          Root=vi.getRoot();
          Root.Thread.getAllItems(List);
          for (jLcv=0; jLcv<List.length; jLcv++){
            List[jLcv].Data.Verified=true;
          };

          var gp=(coSpectrum.IMAP.Flags.isPinned(dbItem.MAP.Flags.Value)==true) ? vw.Groups.Pinned : null;
          if (gp==null) gp=(dbItem.MAP.Summary.Value.MAP.Read.Value==true) ? vw.Groups.Default : vw.Groups.Unread;
          if (gp!=vi.Group) {
            if ( gp==vw.Groups.Default) {
              var itmUR=vw.getFirstUnreadChild(Root);
              if (itmUR) gp=vw.Groups.Unread;
              gp.moveItem(Root,coAppUI.ThreadView.SelectNone,coAppUI.ThreadView.SkipThreads,coAppUI.ThreadView.WhithinGroup);
            } else {
              gp.moveItem(Root,coAppUI.ThreadView.SelectNone,coAppUI.ThreadView.SkipThreads,coAppUI.ThreadView.WhithinGroup);
            };
          };
          vw.SyncItem(vi);
        };
      };
      coDOM.setHTML(coVDM.divParse,"");

      vw.Groups.Container.scrollTop=scTop;
    };
    vw.doItemNormalize=function(itm){
      var vw=this
      var rcItem=itm.Data;
      if (rcItem==null) return;
      var SMRY=rcItem.MAP.Summary.Value.MAP;
      var Read=SMRY.Read.Value;

      var Replied=SMRY.Replied.Value;
      var RepliedAll=SMRY.RepliedAll.Value;
      var Forwarded=SMRY.Forwarded.Value;

    };
    vw.onPinItem=function(itm){
      var vw=itm.View;
      var sc=vw.Screen;
      vw.Torus.Show();
      sc.DB.Commands.TogglePin(itm.Data);
      itm.Modified=0;
      var gp=(coSpectrum.IMAP.Flags.isPinned(itm.Data.MAP.Flags.Value)==true) ? vw.Groups.Pinned : null;
      if (gp==null) gp=(itm.Data.MAP.Summary.Value.MAP.Read.Value==true) ? vw.Groups.Default : vw.Groups.Unread;
      if (gp!=itm.Group) {
        if (gp==vw.Groups.Default) {
          var itmR=itm.getRoot();
          var itmUR=vw.getFirstUnreadChild(itmR);
          if (itmUR) gp=vw.Groups.Unread;
          gp.moveItem(itmR,coAppUI.ThreadView.SelectNext,coAppUI.ThreadView.WhithinThread,coAppUI.ThreadView.WhithinGroup);
        } else {
          gp.moveItem(itm,coAppUI.ThreadView.SelectNext,coAppUI.ThreadView.WhithinThread,coAppUI.ThreadView.WhithinGroup);
        };
      };
    };
    vw.onToggleStateItem=function(itm){
      var vw=itm.View;
      var sc=vw.Screen;
      vw.Torus.Show();
      itm.Modified=0;
      sc.DB.Commands.ToggleRead(itm.Data);

      var gp=(coSpectrum.IMAP.Flags.isPinned(itm.Data.MAP.Flags.Value)==true) ? vw.Groups.Pinned : null;
      if (gp==null) gp=(itm.Data.MAP.Summary.Value.MAP.Read.Value==true) ? vw.Groups.Default : vw.Groups.Unread;
      if (gp!=itm.Group) {
        if (gp==vw.Groups.Default) {
          var itmR=itm.getRoot();
          var itmUR=vw.getFirstUnreadChild(itmR);
          if (itmUR) gp=vw.Groups.Unread;
          gp.moveItem(itmR,coAppUI.ThreadView.SelectNext,coAppUI.ThreadView.SkipThreads,coAppUI.ThreadView.WhithinGroup);
        } else {
          var itmR=itm.getRoot();
          gp.moveItem(itmR,coAppUI.ThreadView.SelectNext,coAppUI.ThreadView.SkipThreads,coAppUI.ThreadView.WhithinGroup);
        };
      };
    };
    vw.onSynchronizeItem=function(vi){
      var vw=this;
      var drItem=vi.Data;
      if (drItem==null) return;
      var scTop=vw.Groups.Container.scrollTop;
      var iSY=vi.Container.offsetHeight;

      var dtModified=drItem.MAP.Modified.Value;
      if (dtModified==vi.Modified) return;

      var SMRY=drItem.MAP.Summary.Value;
      var dtMessage= (SMRY.MAP.Bound.Value==coSpectrum.SMTP_INBOUND) ? drItem.MAP.Created.Value : drItem.MAP.Modified.Value;
      dtMessage=coDateTime.incSecond(dtMessage,coDateTime.DateOffset);

      var Pinned=coSpectrum.IMAP.Flags.isPinned(drItem.MAP.Flags.Value);
      var From=SMRY.MAP.From.Value;
      var Read=SMRY.MAP.Read.Value;
      var Replied=SMRY.MAP.Replied.Value;
      var RepliedAll=SMRY.MAP.RepliedAll.Value;
      var Forwarded=SMRY.MAP.Forwarded.Value;
      var Files=SMRY.MAP.Attachments.Value;

      if (Pinned==true) {
        vi.Header.Stamp.Tools.Pin.title=coLang.Table.Apps.Spectrum.Email.Hint.Unpin;
        coDOM.setBackgroundImage(vi.Header.Stamp.Tools.Pin,coTheme.Icons.Spectrum.Mail.Unpin);
      } else {
        vi.Header.Stamp.Tools.Pin.title=coLang.Table.Apps.Spectrum.Email.Hint.Pin;
        coDOM.setBackgroundImage(vi.Header.Stamp.Tools.Pin,coTheme.Icons.Spectrum.Mail.Pin);
      };
      if (Read==true) {
        vi.Header.Stamp.Tools.State.title=coLang.Table.Apps.Spectrum.Email.Hint.MarkUnread;
        coDOM.setBackgroundImage(vi.Header.Stamp.Tools.State,coTheme.Icons.Spectrum.Mail.Read);
      } else {
        vi.Header.Stamp.Tools.State.title=coLang.Table.Apps.Spectrum.Email.Hint.MarkRead;
        coDOM.setBackgroundImage(vi.Header.Stamp.Tools.State,coTheme.Icons.Spectrum.Mail.Unread);
      };

      vi.Modified=dtModified;
      var gp=(Pinned==true) ? vw.Groups.Pinned : null;
      if (gp==null) gp=(Read==true) ? vw.Groups.Default : vw.Groups.Unread;
      if (gp!=vi.Group) {
        if (gp==vw.Groups.Default) {
          var itmR=vi.getRoot();
          var itmUR=vw.getFirstUnreadChild(itmR);
          if (itmUR) gp=vw.Groups.Unread;
          gp.moveItem(itmR,coAppUI.ThreadView.SelectNone,coAppUI.ThreadView.SkipThreads,coAppUI.ThreadView.SkipGroup);
        } else {
          gp.moveItem(vi,coAppUI.ThreadView.SelectNone,coAppUI.ThreadView.SkipThreads,coAppUI.ThreadView.SkipGroup);
        };
      };

      var sLines=coEncoding.base64Decode(SMRY.MAP.Lines.Value);
      if (SMRY.MAP.Rendered.Value==false) {
        sLines=coSpectrum.SMTP.Prepare(sLines);
        sLines=coSpectrum.SMTP.DecodeHeader(sLines);
        sLines=coSpectrum.SMTP.Nullmap(sLines);
        var saLines=sLines.split("<br>");
        sLines="";
        for (var iLcv=0; iLcv<saLines.length; iLcv++) {
          coDOM.setHTML(coVDM.divParse,saLines[iLcv]);
          saLines[iLcv]=coDOM.getText(coVDM.divParse);
        };
        var saLines=coSpectrum.SMTP.CleanupLines(saLines);
        SMRY.MAP.Rendered.Value=true;
        SMRY.MAP.Lines.Value=coEncoding.base64Encode(saLines.join("<br>"));
        coMail.App.Screen.DB.Commands.UpdateSummary(drItem);
      } else {
        var saLines=sLines.split("<br>");
        saLines.length=2;
        if (!saLines[0]) saLines[0]="";
        if (!saLines[1]) saLines[1]="";
      };
      var sFntSize=(!Read) ? coTheme.UI.ThreadView.Font.Size.UnRead+"px" : coTheme.UI.ThreadView.Font.Size.Read+"px";
      var sFntWt= (!Read) ? coTheme.UI.ThreadView.Font.Weight.UnRead : coTheme.UI.ThreadView.Font.Weight.Read;
      var sFntColor=(!Read) ? coTheme.UI.ThreadView.Font.Color.UnRead.toString() : coTheme.UI.ThreadView.Font.Color.Read.toString();
      var sBdrColor=(!Read) ? coTheme.UI.ThreadView.Border.Color.UnRead.toString(): coTheme.UI.ThreadView.Border.Color.Read.toString();

      var now=coDateTime.Now();
      var secsOld=coDateTime.secondsBetween(now,dtMessage);

      var dt=coDateTime.decodeDateTime(dtMessage);

      var sDate=coLang.Table.Mail.Stamp.getDisplay(secsOld,dt);


      var sName=coSpectrum.SMTP.NameFromEmail(SMRY.MAP.From.Value);
      if (sName.length==0) sName=SMRY.MAP.From.Value;

      vi.Header.Label.setName(sName);
      vi.Header.Label.setSubject(SMRY.MAP.Subject.Value);
      vi.Header.Stamp.setDate(sDate);


      if (Files==false){
        vi.Header.Stamp.Tools.Attachments.style.pointerEvents="none";
        vi.Header.Stamp.Tools.Attachments.style.visibility="hidden";

      } else {
        vi.Header.Stamp.Tools.Attachments.style.pointerEvents="";
        vi.Header.Stamp.Tools.Attachments.style.visibility="visible";
      };

      coDOM.setHTML(vi.Lines.Line1,saLines[0]);
      coDOM.setHTML(vi.Lines.Line2,saLines[1]);

      vi.Container.style.borderLeftColor=sBdrColor;
      vi.Container.style.borderRightColor=sBdrColor;
      //vi.Header.Container.style.borderLeftColor=sBdrColor;
      vi.Header.Label.Subject.style.fontWeight=sFntWt;
      vi.Header.Label.Name.style.fontWeight=sFntWt;
      vi.Header.Label.Subject.style.fontSize=sFntSize;
      vi.Header.Label.Subject.style.color=sFntColor;
      if (!Read)
        vi.MoveToTop();



      if (iSY!=vi.Container.offsetHeight){
        scTop+=(vi.Container.offsetHeight-iSY);
        vw.Groups.Container.scrollTop=scTop;
      };

    };
    vw.SyncItem=vw.onSynchronizeItem;
    vw.onOpenItem=function(itm){
      var vw=itm.View;
      var mbx=vw.Screen;
      if (itm!=null) {
        var Folder=mbx.Folders.Selected.Data;
        var Files=vw.DataSet;
        var itmFile=itm.Data;
        var smry=itmFile.MAP.Summary.Value.MAP;
        switch (smry.Bound.Value) {
          case (coSpectrum.SMTP_INBOUND) :
            var rdr=mbx.Readers.Find(itmFile.MAP.ID.Value);
            if (rdr==null) {
              itm.Reader=rdr=mbx.Nav.gpFullReader.Slide=coMail.App.Components.Reader.createFullReader(mbx,itm);
              itm.Modified=0;
              rdr.Loading=true;
              rdr.readItem(Folder,itmFile);
            } else{
              mbx.Nav.gpFullReader.Slide=rdr;
            };
            mbx.Nav.forceSelected(mbx.Nav.gpFullReader);
            rdr.Tab.Select();
            break;
          case coSpectrum.SMTP_OUTBOUND :
            var cmp=mbx.Writers.Find(itmFile.MAP.ID.Value);
            if (cmp==null){
              cmp=mbx.Nav.gpWriter.Slide=coMail.App.Components.Writers.Create(mbx,Folder,Files,itmFile);
            } else{
              mbx.Nav.gpWriter.Slide=cmp;
            };
            mbx.Nav.forceSelected(mbx.Nav.gpWriter);
            cmp.Tab.Select();
            break;
        };
      };
    };
    vw.onJunkItem=function(itm){

      var vw=itm.View;
      var sc=vw.Screen;
      var Folder=vw.Folder;
      var status=Folder.MAP.Status.Value.MAP;
      var itms=new Array();
      var iLcv=0;
      itm.Thread.getAllItems(itms);
      // Could be junk or unjunk
      var FID=(Folder!=mbx.Folders.Mail.Junk) ? mbx.Folders.Mail.Junk.Data.MAP.ID.Value : mbx.Folders.Mail.Inbox.Data.MAP.ID.Value;
      for (iLcv=0; iLcv<itms.length; iLcv++){
        sc.DB.Commands.MoveMessage(
          itms[iLcv].Data,
          FID,
          Folder
        );
        itms[iLcv].Data.Display.removeItem(itms[iLcv]);
        itms[iLcv].Data=null;
      };
      itms.length=0;
      itms=null;
      itm.Select();

      if (itm.Group.Items[itm.Group.Items.length-1]==itm) {
        vw.Previous(coAppUI.ThreadView.SkipThreads);
      } else {
        var nItm=vw.Next(coAppUI.ThreadView.SkipThreads);
        if (nItm==null)
          vw.Previous(coAppUI.ThreadView.SkipThreads);
      };

      itm.Free();
    };
    vw.onDeleteItem=function(itm){
      var vw=itm.View;
      var sc=vw.Screen;
      var Folder=vw.Folder;
      var status=Folder.MAP.Status.Value.MAP;
      var iLcv=0;
      var itms=new Array();
      itm.Thread.getAllItems(itms);
      for (iLcv=0; iLcv<itms.length; iLcv++){
        sc.DB.Commands.DeleteMessage(itms[iLcv].Data,Folder);
        itms[iLcv].Data.Display.removeItem(itms[iLcv]);
        itms[iLcv].Data=null;
      };
      itms.length=0;
      itms=null;
      itm.Select();
      if (itm.Group.Items[itm.Group.Items.length-1]==itm) {
        vw.Previous(coAppUI.ThreadView.SkipThreads);
      } else {;
        var nItm=vw.Next(coAppUI.ThreadView.SkipThreads);
        if (nItm==null)
          vw.Previous(coAppUI.ThreadView.SkipThreads);
      };
      itm.Free();
    };
    vw.onPageChanged=function(Page){
      var vw=this;
      var sc=vw.Screen;
      var Folder=vw.Folder;
      vw.Torus.Start();
      sc.DB.Commands.FolderList(vw,Folder.MAP.ID.Value,Page);
    };
    vw.onPageRefresh=function(Page){
      var vw=this;
      var sc=vw.Screen;
      var Folder=vw.Folder;
      vw.Torus.Start();
      sc.DB.Commands.RecordCount(Folder);
      sc.DB.Commands.FolderList(vw,Folder.MAP.ID.Value,Page);
    };
    vw.onDragStarted=function(Info){
      var vw=Info.View;
      var itm=Info.Source;
      var itms=new Array();
      itm.Thread.getAllItems(itms);
      Info.Action.Count=itms.length;
      Info.Action.Blurb=itm.Header.Label.getSubject();
      itms.length=0;
      itms=null;
    };
    vw.onDragAccepted=function(Info){
      var vw=Info.View;
      var mbx=vw.Screen;
      var itm=Info.Source;
      if (Info.Target.Class=="TVItem") {
        var Folder=Info.Target.Data;
        var dtNow=coDateTime.Now();
        if (dtNow>Folder.MAP.Modified.Value) {
          mbx.DB.Commands.ListFolders(Folder);
          mbx.DB.Commands.RecordCount(Folder);
          Folder.MAP.Modified.Value=coDateTime.incMinute(dtNow,2);
        };
        Info.Target.Expand();
      };
    };
    vw.onDragRejected=function(Info){
      var vw=Info.View;
    };
    vw.onDragCanceled=function(Info){
      var vw=Info.View;
    };
    vw.onDragCommited=function(Info){
      var vw=Info.View;
      var mbx=vw.Screen;
      var itm=Info.Source;
      if (Info.Source.Class=="ThreadViewItem"){
        if (Info.Target==mbx.Folders.Mail.Trash) {
          vw.onDeleteItem(itm);
        } else {
          var itms=new Array(), OID=0, ID=0;
          Folder=mbx.Folders.Selected.Data;

          itm.Thread.getAllItems(itms);
          OID=Info.Target.Data.MAP.ID.Value;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            itm=itms[iLcv];
            ID=itm.Data.MAP.FolderID.Value;
            if (OID!=ID){
              mbx.DB.Commands.MoveMessage(itm.Data,OID,Folder);
            };
          };
          itms.length=0;
          itms=null;
        };
      };
    };
    vw.dragInfo=coDragDrop.createInfo(
      vw,
      "/core/spc/imgs/eml.png",
      coDragDrop.NoBlurb,
      coDragDrop.NoTarget,
      coLang.Table.DragDrop.Items.Email,
      coLang.Table.DragDrop.Action.Move,
      vw.onDragStarted,
      vw.onDragAccepted,
      vw.onDragRejected,
      vw.onDragCanceled,
      vw.onDragCommited
    );
    vw.onShow=function(){
      var vw=this;
      vw.Screen.setSize();
    };
    return vw;
  },
  CreateFolderView:function(Screen,Folder,TVItem){
    if (Folder==undefined) Folder=null;
    if (TVItem==undefined) TVItem=null;
    var fv=this.Create(Screen);

    var tv=(TVItem) ? TVItem.Owner.TreeView : null;

    fv.Tools.Junk.Enabled=( (TVItem==null) || ((TVItem!=tv.Mail.Sent) && (TVItem!=tv.Mail.Outbox)) );

    fv.MBX=Screen;
    fv.Item=TVItem;
    fv.Loading=false;
    fv.Folder=Folder;
    fv.DataSet.Folder=Folder;
    fv.Files=new Array();
    fv.onShow=function(){
      var tv=this;
      tv.Screen.setSize();
    };
    fv.Tab=Screen.Tabsbar.createTab(coAppUI.NoCaption,coTheme.Icons.Spectrum.Folder.Open,coAppUI.AutoSize,coAppUI.allowClose);
    fv.Tab.Hidden=true;
    fv.Tab.Hide();
    fv.Tab.Data=fv;
    fv.Tab.onSelect=function(tab){
      var fv=tab.Data;
      var mbx=fv.MBX;
      var tv=mbx.Folders;
      mbx.Nav.gpMark.Slide=fv;
      mbx.Nav.gpFolderView.Slide=fv;
      mbx.Nav.forceSelected(mbx.Nav.gpFolderView);
      tab.Show();
      fv.Reveal();
      if (fv.Item) fv.Item.Select();
      if (tv){
        if (tv.Selected==tv.Mail.Junk) {
          mbx.tbMain.Buttons.Junk.setIcon(coTheme.Icons.Spectrum.Mail.Unjunk);
          mbx.tbMain.Buttons.Junk.setHint(coLang.Table.Apps.Spectrum.Email.Hint.Unjunk);
          mbx.tbMain.Buttons.Junk.setCaption(coLang.Table.Buttons.Restore);

          mbx.tbMain.Buttons.Junk.Show();
        } else if ( (tv.Selected==tv.Mail.Outbox) || (tv.Selected==tv.Mail.Sent)) {
          mbx.tbMain.Buttons.Junk.Conseal();
        } else {
          mbx.tbMain.Buttons.Junk.setIcon(coTheme.Icons.Spectrum.Mail.Junk);
          mbx.tbMain.Buttons.Junk.setHint(coLang.Table.Apps.Spectrum.Email.Hint.Junk);
          mbx.tbMain.Buttons.Junk.setCaption(coLang.Table.Mail.Junk);
          mbx.tbMain.Buttons.Junk.Show();
        };
      };

    };
    fv.Tab.onUnselect=function(tab){
      var fv=tab.Data;
      var mbx=fv.MBX;
      var tv=mbx.Folders;
      mbx.Nav.gpFolderView.Slide=null;
      mbx.Tabsbar.Torus=null;
      fv.Conseal();
    };
    fv.Tab.onClose=function(tab){
      var fv=tab.Data;
      var mbx=fv.MBX;
      if (tab.Selected==true)
        mbx.Folders.Mail.Inbox.Select();
      tab.Hide();
      fv.Conseal();
    };
    if (Folder) {
      Folder.Display.addItem(fv,Screen);
      Folder.Display.addItem(fv.Tab,Screen.Tabsbar);
    };
    if ( (tv) && (TVItem==tv.Mail.Junk)) {
      fv.Tools.Junk.srcIcon=coTheme.Icons.Spectrum.Mail.Unjunk;
      fv.Tools.Junk.Hint=coLang.Table.Apps.Spectrum.Email.Hint.Unjunk;
    };
    return fv;
  }
};

