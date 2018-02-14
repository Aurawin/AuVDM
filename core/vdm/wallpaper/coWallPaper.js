var coWallPaper=coVDM.App.Components.coWallPaper = {
  Version        : new Version(2014,9,19,7),
  Title          : new Title("Aurawin Wallpaper Screen","WallPaper"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/vdm/wallpaper/coWallPaper.js',
  NameSpace      : '/core/vdm/wallpaper',
  debugToConsole : true,
  Init           : function(){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js'
      ],
      [
        this.NameSpace+'/coWallPaper.css',
        this.NameSpace+'/DB.js',
        this.NameSpace+'/TabsBar.js',
        this.NameSpace+'/View.js',
        this.NameSpace+'/Nav.js',
        this.NameSpace+'/Manifest.js'
      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.Initialized=true;
    this.App.onLogin=function(App){
      if (App.Screen) {
        App.Screen.setWallPaper();
      } else{
        App.processLoggedIn=false;
      };
    };
    return this;
  },
  onInitialized : function(App){
    App.Files=App.Components.DB.Create(App);
    App.Unit.Screen=App.Screen=App.Unit.createScreen(App);
    App.Loaded=true;
  },
  createScreen:function(App){
    if (App.Screen!=null) return App.Screen;
    var sc=App.Screen=coAppScreens.createScreen(
      coVDM.VDM,
      "WallPaperScreen",
      coLang.Table.Groups.Main.Name,
      coLang.Table.Apps.WallPaper.Name,
      coLang.Table.Apps.WallPaper.Title,
      coTheme.Icons.WallPaper,
      0.5,
      0.5,
      coAppUI.Framed,
      "bdrFrame",
      "bdrFrame",
      "bdrFilm"
    );
    sc.Unit=this;
    sc.AllowFullScreen=true;
    sc.SaveGeometry=true;
    sc.Position=coApp.Position.TopLeft;
    sc.Description=coLang.Table.Apps.WallPaper.Description;
    sc.State=coApp.State.Normal;
    sc.iconInApplications=true;
    sc.iconInTaskList=true;

    sc.TabsBar=coWallPaper.App.Components.TabsBar.Create(sc);
    sc.View=coWallPaper.App.Components.View.Create(sc);
    sc.Nav=coWallPaper.App.Components.Nav.Create(sc);

    sc.setWallPaper=function(){
      var sc=this;
      if (sc.Manifest.MAP.WallPaper.Value!=0){
        var sIMG=coVDM.URI_WALLPAPER_GET.replace("$id",sc.Manifest.MAP.WallPaper.Value);
        coVDM.VDM.WorkSpace.Client.style.backgroundImage="";
        switch (sc.Manifest.MAP.WallPaperKind.Value){
          case (0): {
            coDOM.setBackground(coVDM.VDM.WorkSpace.Client,"","","repeat",sIMG);
            coDOM.setBackground(sc.View.Container,"","","repeat",sIMG);
            break;
          };
          case (1): {
            coDOM.setBackground(coVDM.VDM.WorkSpace.Client,"cover","center","no-repeat",sIMG);
            coDOM.setBackground(sc.View.Container,"cover","center","no-repeat",sIMG);
            break;
          };
        };
      };
    };
    App.Components.Manifest.Install(sc);
    sc.Conseal();
    return sc;
  }
};
coWallPaper.Init();
