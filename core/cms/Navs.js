coCMS.App.Components.Navs = {
  Version        : new Version(2014,10,26,7),
  Title          : new Title("Aurawin CMS Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/Navs.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCMS.App,'/core/cms/Navs.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/Navs.js',

  createManager:function(Screen){
    var Nav=coAppUI.App.Components.Nav.Create("FileMan","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      [Screen.Client,Screen.Toolbar,Screen.Folders,Screen.Splitter,Screen.Files],
      [Screen.Files.Options],
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpMain=Nav.Items.addItem(
      Nav.itemKind.Group,"gpMain",coLang.Table.Labels.Main,
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
    Nav.gpDownload=Nav.Items.addItem(
      Nav.itemKind.Group,"gpDownload",coLang.Table.Buttons.Download,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      [Nav.gpMain],
      Nav.NoReturn,
      function(){
        var sc=this.Nav.Screen;
        var cmds=sc.Files.Commands;
        if (cmds.Mode.Index!=cmds.Mode.Default)
          cmds.Cancel();
        cmds.setMode(cmds.Mode.Download);
        cmds.onConfirm=null;
      }
    );
    Nav.gpDownload.btnAll=Nav.gpDownload.Items.addItem(
      Nav.itemKind.Button,"All",coLang.Table.Labels.All,
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
        var sc=navItem.Nav.Screen;
        var cmds=sc.Files.Commands;
        cmds.SelectAll();
      }
    );
    Nav.gpDownload.btnNone=Nav.gpDownload.Items.addItem(
      Nav.itemKind.Button,"All",coLang.Table.Labels.None,
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
        var sc=navItem.Nav.Screen;
        var cmds=sc.Files.Commands;
        cmds.SelectNone();
      }
    );
    Nav.gpDownload.Confirm=Nav.gpDownload.Items.addItem(
      Nav.itemKind.Confirm,"cnfDownload",[coLang.Table.Buttons.Download,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOff,
      Nav.oCascadeOff,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [Nav.gpDownload],
      Nav.NoHideList,
      Nav.gpMain,
      [
        function(btn){
          var sc=btn.Nav.Screen;
          var sXML=coXML.Header;
          var sData="";
          var Files=sc.Files.DataSet;
          var cmds=sc.Files.Commands;
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            if (cmd.Checked==true){
              var sLink=Files.getDownloadURL(cmd.Item.Data) ;
              coDOM.Download(sLink);
            };
          };
          cmds.setMode(cmds.Mode.Default);
        },
        function(btn){
          btn.Nav.Screen.Files.Commands.Cancel();
        }
      ]
    );
    Nav.gpDelete=Nav.Items.addItem(
      Nav.itemKind.Group,"gpDelete",coLang.Table.Buttons.Delete,
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      [Nav.gpMain],
      Nav.NoReturn,
      function(){
        var sc=this.Nav.Screen;
        var cmds=sc.Files.Commands;
        if (cmds.Mode.Index!=cmds.Mode.Default)
          cmds.Cancel();
        cmds.setMode(cmds.Mode.Delete);
        cmds.onConfirm=null;
      }
    );
    Nav.gpDelete.btnAll=Nav.gpDelete.Items.addItem(
      Nav.itemKind.Button,"All",coLang.Table.Labels.All,
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
        var sc=navItem.Nav.Screen;
        var cmds=sc.Files.Commands;
        cmds.SelectAll();
      }
    );
    Nav.gpDelete.btnNone=Nav.gpDelete.Items.addItem(
      Nav.itemKind.Button,"All",coLang.Table.Labels.None,
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
        var sc=navItem.Nav.Screen;
        var cmds=sc.Files.Commands;
        cmds.SelectNone();
      }
    );
    Nav.gpDelete.Confirm=Nav.gpDelete.Items.addItem(
      Nav.itemKind.Confirm,"cnfDelete",[coLang.Table.Buttons.Delete,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOff,
      Nav.oCascadeOff,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [Nav.gpDelete],
      Nav.NoHideList,
      Nav.gpMain,
      [
        function(btn){
          var sc=btn.Nav.Screen;
          var cmds=sc.Files.Commands;
          var File=cmd=null;
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            cmd=cmds[iLcv];
            if (cmd.Checked==true){
              File=cmd.Item.Data;
              if (coCMS.App.DB.Attributes.isCoreObject(File)==false)
                coCMS.App.DB.Commands.DeleteFile(File);
            };
          };
          cmds.setMode(cmds.Mode.Default);
        },
        function(btn){
          btn.Nav.Screen.Files.Commands.Cancel();
        }
      ]
    );
    Nav.gpMain.mnuFolder=Nav.gpMain.Items.addItem(
      Nav.itemKind.Menu,"Folder",coLang.Table.Labels.Folder,
      Nav.oAutoShowOn,
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
    Nav.gpMain.mnuFolder.AllowCaptionChange=false;
    Nav.gpMain.mnuFolder.miFolderRefresh=Nav.gpMain.mnuFolder.addItem(
      "Refresh",
      coLang.Table.Buttons.Refresh,
      null,
      function(){
        var sc=this.Menu.Nav.Screen;
        var tn=sc.Folders.Selected;
        if (tn){
          var Folder=tn.Data;
          coCMS.App.DB.Commands.ListFolders(Folder.MAP.Path.Value);
        } else {
          coCMS.App.DB.Commands.ListFolders("/");
        };
      },
      null
    );
    Nav.gpMain.mnuFolder.miSep1=Nav.gpMain.mnuFolder.addItem(
      "Sep1",
      "-",
      Nav.NoTarget,
      Nav.NoClick
    );
    Nav.gpMain.mnuFolder.miFolderNew=Nav.gpMain.mnuFolder.addItem(
      "New",
      coLang.Table.Buttons.New,
      null,
      function(){
        var sc=this.Menu.Nav.Screen;
        if ( sc.Folders.Selected )
          sc.Folders.Editor.invokeNew();
      },
      null
    );
    Nav.gpMain.mnuFolder.miFolderRename=Nav.gpMain.mnuFolder.addItem(
      "Rename",
      coLang.Table.Buttons.Rename,
      null,
      function(){
        var sc=this.Menu.Nav.Screen;
        if (sc.Folders.Selected)
          sc.Folders.Editor.invokeRename();
      },
      null
    );
    Nav.gpMain.mnuFolder.miSep2=Nav.gpMain.mnuFolder.addItem(
      "Sep2",
      "-",
      Nav.NoTarget,
      Nav.NoClick
    );
    Nav.gpMain.mnuFolder.miFolderDel=Nav.gpMain.mnuFolder.addItem(
      "Delete",
      coLang.Table.Buttons.Delete,
      null,
      function(){
        var sc=this.Menu.Nav.Screen;
        var itm=fldrs.Tree.Selected;
        // todo show confirmation to delete.
        /*
        if ( (itm) && (itm.readOnly==false)) {
          itm.Delete();
        };
        */
      },
      null
    );
    Nav.gpMain.mnuFile=Nav.gpMain.Items.addItem(
      Nav.itemKind.Menu,"File",coLang.Table.Labels.File,
      Nav.oAutoShowOn,
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
    Nav.gpMain.mnuFile.AllowCaptionChange=false;
    Nav.gpMain.mnuFile.miFileRefresh=Nav.gpMain.mnuFile.addItem(
      "Refresh",
      coLang.Table.Buttons.Refresh,
      Nav.gpMain,
      function(){
        var sc=this.Menu.Nav.Screen;
        var tv=sc.Folders;
        var tn=tv.Selected;
        if (tn) {
          var Folder=tn.Data.MAP;
          coCMS.App.DB.Commands.ListFiles(Folder.ID.Value,sc.Files);
        };
      },
      null
    );
    Nav.gpMain.mnuFile.miSep1=Nav.gpMain.mnuFile.addItem(
      "Sep1",
      "-",
      Nav.NoTarget,
      Nav.NoClick
    );
    Nav.gpMain.mnuFile.miFileNew=Nav.gpMain.mnuFile.addItem(
      "New",
      coLang.Table.Buttons.New,
      Nav.gpMain,
      function(){
        var sc=this.Menu.Nav.Screen;
        var Folder=sc.Folders.Selected.Data;
        var lv=sc.Files;
        var Files=lv.DataSet;
        var File=Files.addItem();
        File.MAP.Name.Value=coLang.Table.Apps.CMS.FileMan.New.File();
        File.MAP.FolderID.Value=Folder.MAP.ID.Value;
        coCMS.App.DB.Commands.AddFile(File);
        var li=lv.Items.SyncItem(File);
        li.setSelected();
        lv.Items.BeginEdit();
      },
      null
    );
    Nav.gpMain.mnuFile.miFileEdit=Nav.gpMain.mnuFile.addItem(
      "Edit",
      coLang.Table.Buttons.Edit,
      Nav.gpMain,
      function(){
        var sc=this.Menu.Nav.Screen;
        var lv=sc.Files;
        var tv=sc.Folders;
        var File=lv.Items.Selected.Data;
        var Folder=tv.Selected.Data;
        var Files=lv.DataSet;
        var ct=coContentType.getFileContentType(File.MAP.Name.Value);
        if (ct) {
          switch (ct.Kind){
            case (coContentType.fkImage) : {
              coRegistry.Items.Open(File.MAP.Name.Value,Folder,Files,File);
              break;
            };
            case (coContentType.fkAppCache):
            case (coContentType.fkJavaScript):
            case (coContentType.fkHTML):
            case (coContentType.fkCSS):
            case (coContentType.fkText):
            case (coContentType.fkTemplate):
            case (coContentType.fkXML):
             {
              coCMS.App.Components.Editor.Open(Folder,File,ct);
              break;
            };
          };
        };
      },
      null
    );
    Nav.gpMain.mnuFile.miFileRename=Nav.gpMain.mnuFile.addItem(
      "Rename",
      coLang.Table.Buttons.Rename,
      Nav.gpMain,
      function(){
        var sc=this.Menu.Nav.Screen;
        var lv=sc.Files;
        if (lv.Items.Selected)
          lv.Items.BeginEdit();
      },
      null
    );
    Nav.gpMain.mnuFile.miSep2=Nav.gpMain.mnuFile.addItem(
      "Sep2",
      "-",
      Nav.NoTarget,
      Nav.NoClick
    );
    Nav.gpMain.mnuFile.miFileUpload=Nav.gpMain.mnuFile.addItem(
      "Upload",
      coLang.Table.Buttons.Upload,
      null,
      function(){
        var sc=this.Menu.Nav.Screen;
        sc.Uploader.Reveal();
      },
      null
    );
    Nav.gpMain.mnuFile.miFileDownload=Nav.gpMain.mnuFile.addItem(
      "Download",
      coLang.Table.Buttons.Download,
      Nav.gpDownload,
      function(){
        var sc=this.Menu.Nav.Screen;
      },
      null
    );
    Nav.gpMain.mnuFile.miSep3=Nav.gpMain.mnuFile.addItem(
      "Sep3",
      "-",
      Nav.NoTarget,
      Nav.NoClick
    );
    Nav.gpMain.mnuFile.miFileDelete=Nav.gpMain.mnuFile.addItem(
      "Delete",
      coLang.Table.Buttons.Delete,
      Nav.gpDelete,
      function(){
        var sc=this.Menu.Nav.Screen;
      },
      null
    );
    Nav.Home.ShowList.push(Nav.gpMain);
    Nav.AddToGroupHideLists(Nav.gpMain);
    Nav.AddToGroupHideLists(Nav.gpDownload);
    Nav.AddToGroupHideLists(Nav.gpDelete);
    Nav.Home.homeInfo=Nav.gpMain.homeInfo=Nav.gpDelete.homeInfo=Nav.gpDelete.Confirm.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpMain,
      Nav.NoMenuItem,
      Nav.NoClick
    );
    return Nav;
  },
  createEditor:function(Screen){
    var Nav=coAppUI.App.Components.Nav.Create("Editor","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);

    Nav.Menu=Nav.Items.addItem(
      Nav.itemKind.Menu,"Menu",coLang.Table.Labels.Menu,
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Screen.Content,
      [Screen.Client],
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.Menu.AllowCaptionChange=false;
    Nav.Menu.Revert=Nav.Menu.addItem(
      "Revert",
      coLang.Table.Labels.Revert,
      null,
      function(){
        this.Menu.Nav.Screen.Revert();
      },
      null
    );
    Nav.Menu.addItem("Sep1","-",Nav.NoTarget,Nav.NoClick);
    Nav.Menu.Lock=Nav.Menu.addItem(
      "Lock",
      coLang.Table.Labels.Lock,
      null,
      function(){
        var sc=this.Menu.Nav.Screen;
      },
      null
    );
    Nav.Menu.Unlock=Nav.Menu.addItem(
      "Lock",
      coLang.Table.Labels.Unlock,
      null,
      function(){
        var sc=this.Menu.Nav.Screen;
      },
      null
    );
    Nav.Menu.addItem("Sep2","-",Nav.NoTarget,Nav.NoClick);
    Nav.Menu.Save=Nav.Menu.addItem(
      "Save",
      coLang.Table.Labels.Save,
      null,
      function(){
        this.Menu.Nav.Screen.Save();
      },
      null
    );
    //Nav.Menu.addItem("Sep3","-",Nav.NoTarget,Nav.NoClick);

    Nav.Status=Nav.Items.addItem(
      Nav.itemKind.Group,"Status",coLang.Table.Labels.Status,
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
    Nav.Status.Column=Nav.Status.Items.addItem(
      Nav.itemKind.Label,
      "Column","1",
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.Status.Row=Nav.Status.Items.addItem(
      Nav.itemKind.Label,
      "Row","1",
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    return Nav;
  }
};

