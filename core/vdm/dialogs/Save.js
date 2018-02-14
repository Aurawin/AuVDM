coDialogs.App.Components.Save = {
  Version        : new Version(2014,10,23,20),
  Title          : new Title("Aurawin Save Dialog","Save Dialog"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDialogs.App,'/core/vdm/dialogs/Save.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Screen         : null,
  ChangeDelay    : 250,
  Create:function(){
    var sc=coAppScreens.createScreen(
      coVDM.VDM,
      "SaveDialog",
      coLang.Table.Groups.System.Name,
      coLang.Table.Dialogs.File.Name,
      coLang.Table.Dialogs.File.Title,
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Framed,
      "bdrFrame",
      "bdrFilm",
      "bdrFilm"
    );
    sc.Unit=this;
    sc.Position=coApp.Position.Center;
    sc.WindowState=coVDM.VDM.Browser.WindowState;
    sc.Target=null;
    sc.iconInApplications=false;
    sc.iconInTaskList=true;
    sc.AllowFullScreen=false;
    sc.SaveGeometry=true;
    sc.Extension="";
    sc.Conseal();
    sc.FileName="";
    sc.Filters=coDialogs.createFilters();

    sc.setFilter=function(idx){
      var sc=this;
      var ds=sc.ListView.DataSet;
      sc.Filters.Index=idx;
      var f=sc.Filters[idx];
      if ( (f.Exts.length==0) || (f.Exts[0].length==0) || (f.Exts[0]=="*.*") ) {
        for (var iLcv=0; iLcv<ds.Items.length; iLcv++) {
          var dbf=ds.Items[iLcv];
          dbf.Visible=true;
        };
      } else {
        for (var iLcv=0; iLcv<ds.Items.length; iLcv++) {
          var dbf=ds.Items[iLcv];
          var sExt=coUtils.extractFileExt(dbf.MAP.Name.Value);
          sExt=sExt.toLowerCase();

          dbf.Visible=(f.Exts.indexOf(sExt)>-1);
        };
      };
      sc.tmrValueChange.setActive(true);
      sc.ListView.Items.SyncView();
    };
    sc.FilterPartialList=function(itms){
      var sc=this;

      var f=(sc.Filters.Index!=-1) ? sc.Filters[sc.Filters.Index] : sc.Filters[0];

      if ( (f.Exts.length==0) || (f.Exts[0].length==0) || (f.Exts[0]=="*.*") ) {
        for (var iLcv=0; iLcv<itms.length; iLcv++) {
          var dbf=itms[iLcv];
          dbf.Visible=true;
        };
      } else {
        for (var iLcv=0; iLcv<itms.length; iLcv++) {
          var dbf=itms[iLcv];
          var sExt=coUtils.extractFileExt(dbf.MAP.Name.Value);
          sExt=sExt.toLowerCase();
          dbf.Visible=(f.Exts.indexOf(sExt)>-1);
        };
      };
    };

    sc.Execute=function(){
      var sc=this;
      if (sc.Filters.length==0) {
        sc.Nav.Filter.Conseal();
      } else {
        for (var iLcv=0; iLcv<sc.Filters.length; iLcv++)
          sc.Nav.Filter.addOption(sc.Filters[iLcv].Title,iLcv);
      };

      sc.Show();
    };
    sc.doShow=function(){
      var vw=this;
      vw.Frame.Torus.Start();
      if (vw.Target) vw.Target.Container.style.pointerEvents="none";
      vw.Tree.Container.style.width=vw.Manifest.MAP.TreeWidth.Value+"px";
      vw.Tree.Load();

      var sPath=vw.Manifest.MAP.TreePath.Value;

      vw.Nav.Filter.Control.selectedIndex=vw.Filters.Index;

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
          vw.Tree.Load();
          var db=vw.Tree.DataSet;
          if (vw.Folder) {
            var tvi=vw.Tree.Items.findByData(vw.Folder);
            if (tvi!=null) tvi.Select();
          };
          vw.ListView.Items.SyncView();
          vw.Frame.Torus.Stop();
        },
        200
      );
    };
    sc.doHide=function(){
      var vw=this;
      vw.onExecuted=null;
      vw.onCanceled=null;
      vw.Modal=true;
      vw.FileName="";
      vw.Filters.Clear();
      vw.Nav.Filter.onClearData();

      vw.File=null;

      vw.TopBar.Value.Clear();

      if (vw.Target) {
        vw.Target.Container.style.pointerEvents="";
        vw.Target.Show();
      }
      vw.Target=null;

    };
    sc.Manifest.addField("Tree Width",coDB.Kind.Integer,"tree-width",coSpectrum.DefaultFolderWidth,coDB.StreamOn);
    sc.Manifest.addField("Tree Path",coDB.Kind.String,"tree-path","Files",coDB.StreamOn);
    sc.Folder=null;

    sc.File=null;
    sc.Network=null;
    sc.onExecuted=null;
    sc.onCanceled=null;
    sc.Modal=true;
    sc.Target=null;

    sc.TopBar=sc.Slides.createSlide(
      "TopBar",
      sc.Class+"TopBar",
      sc,
      sc.Frame,
      sc.Frame.Client,
      coAppUI.Alignment.Top
    );
    //sc.TopBar.clearContainerClass();

    sc.TopBar.Visible=true;
    // add label and input here..
    sc.TopBar.Label=coAppUI.App.Components.Label.Create(
      sc.TopBar,
      sc.TopBar.Container,
      "Label",
      sc.TopBar.Class+"Label",
      coLang.Table.Labels.FileName
    );
    sc.TopBar.Label.Screen=sc;
    sc.TopBar.Label.Visible=true;
    sc.TopBar.Label.Placement.Mode.setTopLeft();
    sc.TopBar.Label.Placement.Top=8;
    sc.TopBar.Label.Placement.Left=8;

    sc.TopBar.Value=coAppUI.App.Components.Text.Create(
      sc.TopBar,
      sc.TopBar.Container,
      "Value",
      sc.TopBar.Class+"Value",
      "",
      ""
    );
    sc.TopBar.Value.Screen=sc;
    sc.TopBar.Value.Visible=true;
    sc.TopBar.Value.Placement.Mode.setTopLeftRight();
    sc.TopBar.Value.Placement.Top=5;
    sc.TopBar.Value.Placement.Left=80;
    sc.TopBar.Value.Placement.Right=8;
    sc.tmrValueChange=coApp.Timers.createItem(sc.Unit.ChangeDelay);
    sc.tmrValueChange.Owner=sc;
    sc.tmrValueChange.RunOnce=true;
    sc.tmrValueChange.onExecute=function(tmr){
      var sc=tmr.Owner;

      var sName=sc.TopBar.Value.getCaption();
      var sNameExt=coUtils.extractFileExt(sName);
      sNameExt=sNameExt.toLowerCase();

      var fltr=(sc.Filters.Index!=-1) ? sc.Filters[sc.Filters.Index] : null;
      var sFltrExt=(fltr) ? fltr.Exts[0] : sc.Extension;
      sFltrExt=sFltrExt.toLowerCase();

      if ((sFltrExt.length>0) && (sFltrExt!=sNameExt))
        var sName=coUtils.changeFileExt(sName,sFltrExt);

      var idx=sName.lastIndexOf(".");
      if (idx==-1)
        sName+="."+sc.Extension;

      sc.Nav.Confirm.setButtonOKCaption(
        (sc.ListView.isFileListed(sName)==true) ? coLang.Table.Labels.Overwrite : coLang.Table.Labels.Create
      );
    };

    sc.TopBar.Value.onChange=function(itm){
      var sc=itm.Screen;
      sc.tmrValueChange.setActive(true);
    };
    sc.DB=coCabinet.Folders;
    sc.Tree=coCabinet.App.Components.TreeView.Create(sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Left);
    //sc.Tree.clearContainerClass("SaveDialogTreeView");
    sc.Tree.AllowInplaceEditor=false;
    sc.Tree.getCurrentFileCollection=function(node){
      var sc=this.Screen;
      return sc.Tree.Files;
    };
    sc.Splitter=coAppUI.App.Components.Splitter.Create(sc,sc.Slides,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Left);

    var lv=sc.ListView=coAppUI.App.Components.ListView.Create("Files","ListView",sc,sc.Slides,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client,coAppUI.vScrollOn);
    //lv.clearContainerClass("SaveDialogListView");
    var ds=sc.Tree.Files=sc.ListView.DataSet=coSocial.App.Components.DB.createFiles();
    ds.Screen=sc;
    ds.Displays.Add(lv);
    sc.Uploader=coCabinet.App.Components.Uploader.Create(sc,sc.Slides,sc.Frame,sc.Frame.Client);

    ds.LoadInfo.Chunk=coSocial.App.Components.DB.LoadChunk;
    ds.LoadInfo.Interval=coSocial.App.Components.DB.LoadPause;
    ds.LoadInfo.FirstDelay=coSocial.App.Components.DB.LoadDelay;
    ds.LoadInfo.Torus=sc.Frame.Torus;

    ds.Items.onPartialLoad=function(dbItems){
      var sc=this.Owner.Screen;
      if (sc.Visible==true)
        sc.FilterPartialList(dbItems);
    };

    lv.Header.Columns.addItem(ds.Fields.MAP.Name);
    lv.Header.Columns.addItem(ds.Fields.MAP.Created);
    lv.Header.Columns.addItem(ds.Fields.MAP.Modified);
    lv.Header.Columns.addItem(ds.Fields.MAP.Size);
    lv.getFileByName=function(Name){
      var Name=Name.toLowerCase();
      var lv=this;
      var itms=lv.DataSet.Items;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var sName=itms[iLcv].MAP.Name.Value.toLowerCase();
        if (sName==Name)
          return itms[iLcv];
      };
      return null;
    };
    lv.isFileListed=function(Name){
      return (this.getFileByName(Name)!=null);
    };


    sc.ListView.onItemSelected=function(itm){
      var sc=this.Screen;
      if (itm){
        var f=sc.File=itm.Data;
        // extract File Name
        var fltr=(sc.Filters.Index!=-1) ? sc.Filters[sc.Filters.Index] : null;
        var sExt=(f) ? fltr.Exts[0] : sc.Extension;
        sExt=sExt.toLowerCase();

        var sFileExt=coUtils.extractFileExt(f.MAP.Name.Value).toLowerCase();
        sc.Nav.Confirm.setButtonOKCaption(
          ((sFileExt==sExt) || (sExt=="") )? coLang.Table.Labels.Overwrite : coLang.Table.Labels.Create
        );
        sc.TopBar.Value.setCaption(f.MAP.Name.Value);
      } else {
        sc.TopBar.Value.setCaption("");
      };
    };

    sc.ListView.onDoubleClick=function(itm){
      var lv=itm.Owner.Owner;
      var sc=lv.Screen;
      sc.File=itm.Data;

      if (  (sc.TopBar.Value.getTextLength()==0) || (sc.Folder==null) ) return false;

      var sName=sc.TopBar.Value.getCaption();

      var fltr=(sc.Filters.Index!=-1) ? sc.Filters[sc.Filters.Index] : null;
      var sFltrExt=(fltr) ? fltr.Exts[0] : sc.Extension;
      sFltrExt=sFltrExt.toLowerCase();

      if ((sFltrExt.length>0) && (sFltrExt!=sNameExt))
        var sName=coUtils.changeFileExt(sName,sFltrExt);



      if (sName.indexOf("."+sc.Extension)==-1)
        sName+="."+sc.Extension;

      sc.FileName=sName;

      if (sc.onExecuted) sc.onExecuted(sc);

      sc.Conseal();
    };

    sc.Tree.onItemSelected=function(itm){
      var tv=itm.Owner.TreeView;
      var vw=tv.Screen;
      vw.Folder=itm.Data;
      vw.Network=(itm.Network)? itm.Network : null;

      vw.Manifest.MAP.TreePath.Value=vw.Folder.MAP.Path.Value;
      coVDM.Manifest.Save();
    };

    sc.Splitter.targetLeft=sc.Tree;
    sc.Splitter.targetRight=sc.ListView;
    sc.Splitter.onSized=function(){
      var sc=this.Owner.Screen;
      var mfst=coVDM.Manifest;
      sc.Manifest.MAP.TreeWidth.Value=sc.Tree.Container.clientWidth;
      mfst.Save();
    };

    sc.Nav=coAppUI.App.Components.Nav.Create("Nav","Nav",sc,sc.Slides,sc.Frame,sc.Frame.Client);
    sc.Nav.Confirm=sc.Nav.Items.addItem(
      sc.Nav.itemKind.Confirm,"cnfSelect",[coLang.Table.Buttons.Select,coLang.Table.Buttons.Cancel],
      sc.Nav.oAutoShowOn,
      sc.Nav.oCascadeChildren,
      sc.Nav.oAddToShowList,
      sc.Nav.oSetAsDefaultOn,
      sc.Nav.NoTarget,
      sc.Nav.NoSlide,
      [sc.Tree,sc.Splitter,sc.ListView,sc.TopBar],
      sc.Nav.NoHideList,
      sc.Nav.Confirm,
      [
        function(navItem){  // Select
          var sc=navItem.Nav.Screen;
          if (  (sc.TopBar.Value.getTextLength()==0) || (sc.Folder==null) ) return false;
          sc.FileName=sc.TopBar.Value.getCaption();

          var f=(sc.Filters.Index!=-1) ? sc.Filters[sc.Filters.Index] : null;
          var sExt=(f) ? f.Exts[0] : sc.Extension;
          sExt=sExt.toLowerCase();

          if ( (sExt.length>0) && (sc.FileName.indexOf("."+sExt)==-1) )
            sc.FileName+="."+sExt;

          if (sc.onExecuted) sc.onExecuted(sc);
          sc.Conseal();
        },
        function(navItem){ // Cancel
          var sc=navItem.Nav.Screen;
          if (sc.onCanceled) sc.onCanceled(sc);
          sc.Conseal();
        }
      ]
    );
    sc.Nav.Label=sc.Nav.Items.addItem(
      Nav.itemKind.Button,"Label",coLang.Table.Labels.Filter,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(){
        // todo
      }
    );
    sc.Nav.Filter=sc.Nav.Items.addItem(
      Nav.itemKind.Combo,"Filter",coLang.Table.Labels.Filter,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
        var idxFilter=coUtils.parseInt(navItem.Control.value);
        sc.setFilter(idxFilter);
      }
    );

    sc.Conseal();
    return sc;
  }
};

