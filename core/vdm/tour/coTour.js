var coTour=coVDM.App.Components.coTour={
  Version        : new Version(2013,5,22,15),
  Title          : new Title("Aurawin Tour","coTour"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/tour/coTour.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/tour/coTour.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/tour/coTour.js',
  debugToConsole : true,
  NameSpace      : "/core/vdm/tour",
  App            : null,
  API            : null,
  Screen         : null,
  init : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        "/core/app/coApp.js",
        "/core/app/coAppUI.js",
        "/core/app/coAppScreens.js"
      ],
      [
        this.NameSpace+"/coTour.css",
        this.NameSpace+"/Views.js",
        this.NameSpace+"/Nav.js"
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.deferInit=function(App){
      return true;
    };
    this.App.onLogin=function(App){
      if (App.Screen)
        App.Screen.Frame.zIndexFactor=0;
    };
    this.App.onLogout=function(App){
      if (App.Screen)
        App.Screen.Frame.zIndexFactor=coVDM.zFactorPolicies;
    };
    return this;
  },
  onInitialized : function(App){
    App.Unit.Screen=App.Screen=App.Unit.createScreen();
    App.Screen.Conseal();
    App.Loaded=true;
  },
  createScreen : function(){
    if (this.Screen!=null) return this.Screen;
    var _sc=this.Screen=coAppScreens.createScreen(
      coVDM.VDM,
      "Tour",
      "System",
      coLang.Table.Apps.Tour.Name,
      coLang.Table.Apps.Tour.Title,
      coTheme.Icons.Tour.Main
    );
    _sc.Frame.zIndexFactor=coVDM.zFactorTour;
    _sc.Unit=this;
    _sc.Player=null;
    _sc.AllowFullScreen=true;
    _sc.SaveGeometry=true;
    _sc.Position=coApp.Position.Center;
    _sc.Description=coLang.Table.Apps.Music.Description;
    _sc.onShow=function(){
      var sc=this;
    };
    _sc.onManifestUpdated=function(col){
      var sc=this;

    };
    _sc.Main=_sc.Unit.App.Components.Views.CreateMain(_sc);

    //_sc.Switcher=_sc.Unit.App.Components.Views.CreateSwitcher(_sc);
    _sc.Nav=_sc.Unit.App.Components.Nav.Create(_sc);
    _sc.Nav.Home.Slide=_sc.Main;
    return _sc;
  },
  InvokeTour : function(){
    var sc=this.App.Screen;
    sc.Show();
  }
};
coVDM.App.Components.coTour.init(coVDM.VDM);
