coWallPaper.App.Components.View = {
  Version        : new Version(2014,8,14,11),
  Title          : new Title("WallPaper View","View"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coWallPaper.App,'/core/vdm/wallpaper/View.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    // View Creation code below
    var sc=Screen;
    var sl=coAppUI.App.Components.IconListView.Create(
      "WallPaperView",
      "",
      sc,
      sc.Slides,
      sc.Frame,
      sc.Frame.Client,
      coAppUI.Alignment.Client
    );
    sl.clearContainerClass();
    sl.selectOnHover=false;
    sl.oneActExecute=true;
    sl.DataSet=coWallPaper.App.Files;
    coWallPaper.App.Files.Displays.Add(sl);
    sl.Items.Loader.onItemLoaded=function(itm){
      return coWallPaper.App.Files.Commands.getWallPaperURL(itm.Data);
    };
    sl.Window.Margin.Left=70;
    sl.Window.Margin.Right=70;
    sl.Window.Margin.Top=70;
    sl.Window.Margin.Bottom=70;
    /*
    sl.doSetSize=function(){
      var sl=this, itm=null;
      if (sl.Mode.Values.Index==sl.Mode.Values.Custom){
        var iBias=sl.Items.itmPadding.xBias()+sl.Items.itmMargin.xBias();
        iBias+=sl.Window.Padding.xBias()+sl.Window.Padding.xBias();
        sl.Mode.Size.Value=sl.Mode.Size[sl.Mode.Values.Custom]=sl.Window.Container.clientWidth-iBias;
        for (var iLcv=0; iLcv<sl.Items.length; iLcv++) {
          itm=sl.Items[iLcv];
          itm.setSize();
        };
      };
    };
    */
    sl.onDoubleClick=function(itm){
      var sl=this;
      var sc=sl.Screen;
      var mfst=sc.Manifest.MAP;
      mfst.WallPaper.Value=itm.Data.MAP.ID.Value;
      mfst.WallPaperKind.Value=mfst.TabIndex.Value;

      coVDM.Manifest.Save();
      sc.setWallPaper();
    };
    sl.onSelected=function(itm){
      var sIMG=sl.DataSet.Commands.getWallPaperURL(itm.Data);
    };
    sl.PartialSynchronize=function(LoadInfo){
      var ilv=this;
      for (var iLcv=0; iLcv<LoadInfo.Items.length; iLcv++){
        var dbFile=LoadInfo.Items[iLcv];
        var itm=dbFile.Display.getItem(ilv);
        if (!itm) itm=ilv.Items.createItem(
          coUtils.extractFileName(dbFile.MAP.Name.Value),
          coTheme.Icons.HourGlass,
          dbFile
        );
        dbFile.Display.addItem(itm,ilv);
        itm.Show();
        itm.Torus.Start();
      };
    };
    sl.Synchronize=function(){
      var ilv=this;
      var vw=ilv.Screen;
      vw.File=null;
      ilv.Items.Clear();
      var Recycle=new Array();
      for (var iLcv=0; iLcv<ilv.DB.Items.length; iLcv++){
        var dbFile=ilv.DB.Items[iLcv];
        if (dbFile.Verified==true) {
          var itm=dbFile.Display.getItem(ilv);
          if (!itm) itm=ilv.Items.createItem(
            coUtils.extractFileName(dbFile.MAP.Name.Value),
            coTheme.Icons.HourGlass,
            dbFile
          );
          dbFile.Display.addItem(itm,ilv);
          itm.Show();
          itm.Container.className="IconListItemPicture";
          itm.Torus.Start();
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
    return sl;
  }
};

