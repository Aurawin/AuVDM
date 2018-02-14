var coCollageBoard = {
  Version        : new Version(2013,11,22,25),
  Title          : new Title("Aurawin Collage Board","Collage Board"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/collages/coCollageBoard.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/collages/coCollageBoard.js',coAppKit.PreLoaded),
  Unit           : '/core/collages/coCollageBoard.js',
  NameSpace      : "/core/collages",
  NS_COLLAGE_ADD   : "/ca",
  NS_COLLAGE_READ  : "/cr",
  NS_COLLAGE_WRITE : "/cw",
  NS_COLLAGE_DELETE : "/cd",
  NS_COLLAGE_LIST   : "/cl",
  NS_COLLAGE_LANDING : "/cb",
  SampleMargin   : 10,
  ElementSwitchDelay : 5500,
  minElementSwitchDelay : 1500,
  maxElementSwitchDelay : 15000,
  init : function(){
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
        this.NameSpace+'/coCollageBoard.css',
        this.NameSpace+'/DB.js',
        this.NameSpace+'/Views.js',
        this.NameSpace+'/Nav.js',
        this.NameSpace+'/Manifest.js',
        this.NameSpace+'/Editor.js',
        this.NameSpace+'/edtViews.js'
      ],
      this.onInitialized
    );
    this.App.onLogin=function(App){
      App.Screen.DB.Commands.List();
    };
    this.App.onAuthenticated=function(App){
    };
    this.App.Unit=this;
    this.App.Initialized=true;
  },
  onInitialized : function(App){
    App.Screen=App.Unit.createScreen(App);
    App.Screen.Conseal();
    App.Loaded=true;
  },
  createScreen: function(App){
    if (App.Screen!=null) return App.Screen;
    var sc=App.Screen=coAppScreens.createScreen(
      coVDM.VDM,
      "CollageBoard",
      coLang.Table.Groups.Social.Name,
      coLang.Table.Apps.Collage.Name,
      coLang.Table.Apps.Collage.Title,
      coTheme.Icons.Collage.Main,
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
    sc.Description=coLang.Table.Apps.Collage.Description;
    App.Components.Manifest.Install(sc);

    sc.DB=App.Components.DB.Create(sc);
    sc.Views=App.Components.Views.Create(sc);

    sc.Nav=App.Components.Nav.Create(sc);

    return sc;
  }
};
coCollageBoard.init();
