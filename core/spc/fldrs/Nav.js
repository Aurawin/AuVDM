coCabinet.App.Components.Nav = {
  Version        : new Version(2014,11,8,47),
  Title          : new Title("Spectrum Cabinet Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCabinet.App,'/core/spc/fldrs/Nav.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCabinet.App,'/core/spc/fldrs/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    Nav=coAppUI.App.Components.Nav.Create("Folders","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      [Screen.Tree,Screen.Splitter,Screen.ListView],
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpMain=Nav.Items.addItem(
      Nav.itemKind.Group,"gpMain",coLang.Table.Labels.Main,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      [Screen.Tree,Screen.Splitter,Screen.ListView],
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
        var fldrs=this.Nav.Screen;
        var cmds=fldrs.ListView.Commands;
        if (cmds.Mode.Index!=cmds.Mode.Default)
          cmds.Cancel();
        cmds.setMode(cmds.Mode.Download);
        cmds.onConfirm=null;
        fldrs.Tree.lockSelection=true;
      }
    );
    Nav.gpMain.HideList.push(Nav.gpDownload);
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
        var cmds=sc.ListView.Commands;
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
        var cmds=sc.ListView.Commands;
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
          var vdm=coVDM.VDM;
          var fldrs=btn.Nav.Screen;
          var dbFldr=fldrs.Tree.Selected.Data;
          var Network=fldrs.Tree.Selected.Network;
          var sXML=coXML.Header;
          var sData="";
          var cmds=fldrs.ListView.Commands;
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            if (cmd.Checked==true){
              var dbItem=cmd.Item.Data;
              var sLink=(dbItem.MAP.NetworkID.Value!=0) ? Network.MAP.Files.Value.getDownloadURL(dbItem) : fldrs.DB.getDownloadURL(dbItem) ;
              coDOM.Download(sLink);
            };
          };
          cmds.setMode(cmds.Mode.Default);
          fldrs.Tree.lockSelection=false;
        },
        function(btn){
          var fldrs=btn.Nav.Screen;
          fldrs.ListView.Commands.Cancel();
          fldrs.Tree.lockSelection=false;
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
        var fldrs=this.Nav.Screen;
        var cmds=fldrs.ListView.Commands;
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
        var cmds=sc.ListView.Commands;
        cmds.SelectAll();
      }
    );
    Nav.gpMain.HideList.push(Nav.gpDelete);
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
        var cmds=sc.ListView.Commands;
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
          var vdm=coVDM.VDM;
          var fldrs=btn.Nav.Screen;
          var sXML=coXML.Header;
          var sData="";
          var cmds=fldrs.ListView.Commands;
          var dbFolder=fldrs.Tree.Selected.Data;
          var net=fldrs.Tree.Selected.Network;
          if (net) {
            // social file delete
            var dbFiles=net.MAP.Files.Value;
            for (var iLcv=0; iLcv<cmds.length; iLcv++){
              var cmd=cmds[iLcv];
              if (cmd.Checked==true)
                sData=sData.concat(dbFiles.FileToXML(cmd.Item.Data));
            };

            sXML=sXML.concat(coXML.Print(dbFiles.Stanza,sData,coXML.CDATA_OFF));
            var netCMD=dbFiles.Commands.createCommand(
              vdm.Net,
              coSocial.NameSpace,
              coSocial.NS_FILES_DELETE,
              sXML,
              function(netCMD){
                var fldrs=netCMD.Owner;
                var fldr=fldrs.Tree.Selected.Data;
                var net=netCMD.Network;
                var files=net.MAP.Files.Value;
                files.Commands.List(files,fldr.MAP.ID.Value);
              },
              dbFiles.Commands.onCmdError,
              dbFiles.Commands.onCmdTimeOut,
              coNet.NoProgress,
              coNet.CreateAndRun,
              coNet.FreeOnComplete,
              coNet.AutoLoadOff
            );
            netCMD.Owner=fldrs;
            netCMD.Network=net;
          } else {
            // cabinet
            for (var iLcv=0; iLcv<cmds.length; iLcv++){
              var cmd=cmds[iLcv];
              if (cmd.Checked==true)
                sData=sData.concat(fldrs.DB.FileToXML(cmd.Item.Data));
            };

            sXML=sXML.concat(coXML.Print(fldrs.DB.Files.Stanza,sData,coXML.CDATA_OFF));
            var netCMD=vdm.Net.Commands.createCommand(
              vdm.Net,
              coVDM.NameSpace,
              coVDM.NS_FLS_DELETE,
              sXML,
              function(netCMD){
                var fldrs=netCMD.Owner;
                var fldr=fldrs.Tree.Selected.Data;
                fldrs.DB.Commands.ListFiles(fldr.MAP.ID.Value);
              },
              fldrs.DB.Commands.onCmdError,
              fldrs.DB.Commands.onCmdTimeOut,
              coNet.NoProgress,
              coNet.CreateAndRun,
              coNet.FreeOnComplete,
              coNet.AutoLoadOff
            );
            netCMD.Owner=fldrs;
          };

          cmds.setMode(cmds.Mode.Default);


        },
        function(btn){
          btn.Nav.Screen.ListView.Commands.Cancel();
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
        var fldrs=this.Menu.Nav.Screen;
        coSocial.Connections.Networks.Commands.ListFolders();
        coSocial.Networks.Commands.ListFolders();
        fldrs.DB.Commands.ListFolders();
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
        var fldrs=this.Menu.Nav.Screen;
        if ( fldrs.Tree.Selected )
          fldrs.Tree.Editor.invokeNew();
      },
      null
    );
    Nav.gpMain.mnuFolder.miFolderRename=Nav.gpMain.mnuFolder.addItem(
      "Rename",
      coLang.Table.Buttons.Rename,
      null,
      function(){
        var fldrs=this.Menu.Nav.Screen;
        if (fldrs.Tree.Selected)
          fldrs.Tree.Editor.invokeRename();
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
        var fldrs=this.Menu.Nav.Screen;
        var itm=fldrs.Tree.Selected;
        if ( (itm) && (itm.readOnly==false)) {
          itm.Delete();
        };
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
        var fldrs=this.Menu.Nav.Screen;
        var tv=fldrs.Tree;
        if (tv.Selected) {
          var fldr=tv.Selected.Data.MAP;
          var net=tv.Selected.Network;
          if (net){
            var files=net.MAP.Files.Value;
            files.Commands.List(files,fldr.ID.Value);
          } else {
            fldrs.DB.Commands.ListFiles(fldr.ID.Value);
          };
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
    Nav.gpMain.mnuFile.miFileRename=Nav.gpMain.mnuFile.addItem(
      "Rename",
      coLang.Table.Buttons.Rename,
      Nav.gpMain,
      function(){
        var fldrs=this.Menu.Nav.Screen;
        var lv=fldrs.ListView;
        if (lv.Items.Selected)
          lv.Items.BeginEdit();
      },
      null
    );
    Nav.gpMain.mnuFile.miFileUpload=Nav.gpMain.mnuFile.addItem(
      "Upload",
      coLang.Table.Buttons.Upload,
      null,
      function(){
        var fldrs=this.Menu.Nav.Screen;
        fldrs.Uploader.Reveal();
      },
      null
    );
    Nav.gpMain.mnuFile.miFileDownload=Nav.gpMain.mnuFile.addItem(
      "Download",
      coLang.Table.Buttons.Download,
      Nav.gpDownload,
      function(){
        var fldrs=this.Menu.Nav.Screen;
      },
      null
    );
    Nav.gpMain.mnuFile.miSep2=Nav.gpMain.mnuFile.addItem(
      "Sep2",
      "-",
      Nav.NoTarget,
      Nav.NoClick
    );
    Nav.gpMain.mnuFile.miFileDelete=Nav.gpMain.mnuFile.addItem(
      "Delete",
      coLang.Table.Buttons.Delete,
      Nav.gpDelete,
      function(){
        var fldrs=this.Menu.Nav.Screen;
      },
      null
    );
    Nav.Home.homeInfo=Nav.gpMain.homeInfo=Nav.gpDelete.homeInfo=Nav.gpDelete.Confirm.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpMain,
      Nav.NoMenuItem,
      Nav.NoClick
    );

    Nav.AddToGroupHideLists(Nav.gpDelete);
    return Nav;
  }
};

