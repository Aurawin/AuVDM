coDialogs.App.Components.SelectPicture = {
  Version        : new Version(2014,8,7,39),
  Title          : new Title("Aurawin Select Picture Dialog","Select Picture Dialog"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDialogs.App,'/core/vdm/dialogs/SelectPicture.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Screen         : null,
  Create:function(){
    var vw=coAppScreens.createScreen(
      coVDM.VDM,
      "PictureDialog",
      coLang.Table.Groups.System.Name,
      coLang.Table.Dialogs.Pictures.Name,
      coLang.Table.Dialogs.Pictures.Title,
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Framed,
      "bdrFrame",
      "bdrMovieViewer",
      "bdrFilm"
    );
    vw.DB=coCabinet.Folders;
    vw.targetScreen=null;
    vw.File=null;
    vw.Folder=null;
    vw.Frame.zIndexFactor=1;
    vw.SaveGeometry=true;
    vw.Position=coApp.Position.TopLeft;

    vw.onCmdError=function(netCMD){
      var vw=netCMD.Owner;
      vw.Frame.Torus.Stop();
    };
    vw.onCmdTimeOut=function(netCMD){
      var vw=netCMD.Owner;
      vw.Frame.Torus.Stop();
    };
    vw.onShow=function(){
      var vw=this;
      vw.Frame.Torus.Start();

      if (vw.targetScreen) vw.targetScreen.Container.style.pointerEvents="none";

      vw.Tree.Container.style.width=vw.Manifest.MAP.TreeWidth.Value+"px";
      var sPath=vw.Manifest.MAP.TreePath.Value;
      vw.Tree.Load();

      var nets=coSocial.Networks.Items;
      for (var iLcv=0; iLcv<nets.length; iLcv++){
        var  net=nets[iLcv];
        net.MAP.Folders.Value.Displays.Add(vw.Tree);
      };
      var cons=coSocial.Connections.Items;
      for (var iLcv=0; iLcv<cons.length; iLcv++){
        var  net=cons[iLcv].Network;
        net.MAP.Folders.Value.Displays.Add(vw.Tree);
      };

      vw.setSize();

      setTimeout(
        function() {
          var db=vw.Tree.DataSet;
          if (vw.Folder) {
            var tvi=vw.Tree.Items.findByData(vw.Folder);
            if (tvi!=null) tvi.Select();
          } else {
            coDOM.setText(vw.Files.Title.Description,coLang.Table.Dialogs.NoFolderSelected);
          };
          vw.Frame.Torus.Stop();
        },
        200
      );
    };
    vw.doHide=function(){
      var vw=this;
      if (vw.targetScreen){
        vw.targetScreen.Container.style.pointerEvents="";
        vw.targetScreen.Show();
      };
      vw.onExecuted=null;
      vw.onCanceled=null;
      vw.Modal=true;
      vw.Target=null;
      vw.targetScreen=null;
    };
    vw.Execute=function(){
      var vw=this;
      vw.Show();
    };
    vw.Manifest.addField("Tree Width",coDB.Kind.Integer,"tree-width",coSpectrum.DefaultFolderWidth,coDB.StreamOn);
    vw.Manifest.addField("Tree Path",coDB.Kind.String,"tree-path","Pictures",coDB.StreamOn);

    vw.Position=coApp.Position.Center;
    vw.WindowState=coVDM.VDM.Browser.WindowState;
    vw.iconInApplications=false;
    vw.iconInTaskList=true;
    vw.AllowFullScreen=false;
    vw.Folder=null;
    vw.File=null;
    vw.onExecuted=null;
    vw.onCanceled=null;
    vw.Modal=true;
    vw.Target=null;

    vw.Tree=coCabinet.App.Components.TreeView.Create(vw,vw.Frame,vw.Frame.Client,coAppUI.Alignment.Left);
    vw.Tree.AllowInplaceEditor=false;
    vw.Tree.getCurrentFileCollection=function(node){
      var sc=this.Screen;
      return sc.Tree.Files;
    };

    vw.Splitter=coAppUI.App.Components.Splitter.Create(vw,vw.Slides,vw.Frame,vw.Frame.Client,coAppUI.Alignment.Left);
    var lv=vw.ListView=vw.Files=coAppUI.App.Components.IconListView.Create("Files","",vw,vw.Slides,vw.Frame,vw.Frame.Client,coAppUI.Alignment.Client,coAppUI.vScrollOn);

    var ds=vw.Tree.Files=vw.ListView.DataSet=coSocial.App.Components.DB.createFiles();
    ds.Screen=vw;
    ds.Displays.Add(lv);

    ds.LoadInfo.Chunk=coSocial.App.Components.DB.LoadChunk;
    ds.LoadInfo.Interval=coSocial.App.Components.DB.LoadPause;
    ds.LoadInfo.FirstDelay=coSocial.App.Components.DB.LoadDelay;
    ds.LoadInfo.Torus=vw.Frame.Torus;

    vw.Uploader=coCabinet.App.Components.Uploader.Create(vw,vw.Slides,vw.Frame,vw.Frame.Client);
    vw.Files.Mode.setValue(vw.Files.Mode.Values.ExtraLarge);
    vw.Files.onSelected=function(itm){
      var ilv=itm.Owner.Owner;
      var vw=ilv.Screen;
      vw.File=itm.Data;
    };
    vw.Files.Items.Loader.onItemLoaded=function(itm){
      if (itm.Data==null) return null;
      return (itm.Data.MAP.NetworkID.Value==0) ? coSpectrum.Folders.DB.palmprintURL(itm.Data) : vw.Files.DataSet.palmprintURL(itm.Data) ;
    };
    vw.Files.onDoubleClick=function(itm){
      var ilv=itm.Owner.Owner;
      var vw=ilv.Screen;
      vw.File=itm.Data;
      if (vw.onExecuted) vw.onExecuted(vw);
      vw.Hide();
    };
    vw.Files.PartialSynchronize=function(LoadInfo){
      var ilv=this;
      for (var iLcv=0; iLcv<LoadInfo.Items.length; iLcv++){
        var dbFile=LoadInfo.Items[iLcv];
        var cType=coContentType.getFileContentType(dbFile.MAP.Name.Value);
        if ( (cType) && (cType.Kind==coContentType.fkImage) ){
          var itm=ilv.Items.createItem(dbFile.MAP.Name.Value,coTheme.Icons.HourGlass,dbFile);
          itm.Show();
          itm.Container.className="IconListItemPicture";
          itm.Torus.Start();
        };
      };
    };

    vw.Files.SyncView=function(){
      var ilv=this;
      var vw=ilv.Screen;
      vw.File=null;
      ilv.Items.Clear();
      var Recycle=new Array();
      for (var iLcv=0; iLcv<ilv.DB.Items.length; iLcv++){
        var dbFile=ilv.DB.Items[iLcv];
        if (dbFile.Verified==true) {
          var cType=coContentType.getFileContentType(dbFile.MAP.Name.Value);
          if ( (cType) && (cType.Kind==coContentType.fkImage) ){
            var itm=ilv.Items.createItem(dbFile.MAP.Name.Value,coTheme.Icons.HourGlass,dbFile);
            itm.Show();
            itm.Container.className="IconListItemPicture";
            itm.Torus.Start();
          };
        } else {
          Recycle.push(dbFile);
        };
      };
      for (var iLcv=0; iLcv<Recycle.length; iLcv++){
        var dbFile=Recycle[iLcv];
        dbFile.Free();
      };
      Recycle.length=0;
      Recycle=null;
    };
    vw.Files.Synchronize=vw.Files.SyncView;
    vw.Tree.onItemSelected=function(itm){
      var tv=itm.Owner.TreeView;
      var vw=tv.Screen;
      vw.Folder=itm.Data;
      vw.Network=itm.Network;
      coDOM.setText(vw.Files.Title.Description,coLang.Table.Dialogs.Pictures.List.Description(coDOM.getText(itm.Caption)));
      vw.Manifest.MAP.TreePath.Value=itm.getPath();
      coVDM.Manifest.Save();
    };

    coDOM.setText(vw.Files.Title.Caption,coLang.Table.Dialogs.Pictures.List.Title);
    coDOM.setText(vw.Files.Title.Description,coLang.Table.Dialogs.NoFolderSelected);

    vw.Splitter.targetLeft=vw.Tree;
    vw.Splitter.targetRight=vw.Files;
    vw.Splitter.onSized=function(){
      var vw=this.Owner.Screen;
      var mfst=coVDM.Manifest;
      vw.Manifest.MAP.TreeWidth.Value=vw.Tree.Container.clientWidth;
      mfst.Save();
    };

    vw.Nav=coAppUI.App.Components.Nav.Create("Nav","Nav",vw,vw.Slides,vw.Frame,vw.Frame.Client);
    vw.Nav.Confirm=vw.Nav.Items.addItem(
      vw.Nav.itemKind.Confirm,"cnfSelect",[coLang.Table.Buttons.Select,coLang.Table.Buttons.Cancel],
      vw.Nav.oAutoShowOn,
      vw.Nav.oCascadeChildren,
      vw.Nav.oAddToShowList,
      vw.Nav.oSetAsDefaultOn,
      vw.Nav.NoTarget,
      vw.Nav.NoSlide,
      [vw.Tree,vw.Splitter,vw.Files],
      vw.Nav.NoHideList,
      vw.Nav.Confirm,
      [
        function(navItem){ // Select
          var vw=navItem.Nav.Screen;
          if (vw.File==null) return;
          if (vw.onExecuted) vw.onExecuted(vw);
          vw.Hide();
        },
        function(navItem){ // Cancel
          var vw=navItem.Nav.Screen;
          if (vw.onCanceled) vw.onCanceled(vw);
          vw.Hide();
        }
      ]
    );

    return vw;
  }
};

