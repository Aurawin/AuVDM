var coDocs = {
  Version        : new Version(2013,12,2,4),
  Title          : new Title("Aurawin Documentation","Documentation"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/docs/coDocs.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/docs/coDocs.js',coAppKit.PreLoaded),
  Unit           : '/core/docs/coDocs.js',
  NameSpace      : "/core/docs",

  NS_DEFS_ADD    : "/defs-a",
  NS_DEFS_READ   : "/defs-r",
  NS_DEFS_WRITE  : "/defs-w",
  NS_DEFS_DEL    : "/defs-d",
  NS_DEFS_LIST   : "/defs-l",

  NS_IMPL_ADD    : "/impl-a",
  NS_IMPL_LIST   : "/impl-l",
  NS_IMPL_DEL    : "/impl-d",
  NS_IMPL_READ   : "/impl-r",
  NS_IMPL_WRITE  : "/impl-w",

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
        this.NameSpace+'/coDocs.css',
        this.NameSpace+'/DB.js',
        this.NameSpace+'/Nav.js',
        this.NameSpace+'/admin/Views.js',
        this.NameSpace+'/admin/Editors.js'
      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.Initialized=true;
    return this;
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
      "appInsight",
      coLang.Table.Groups.Main.Name,
      coLang.Table.Apps.Docs.Name,
      coLang.Table.Apps.Docs.Title,
      coTheme.Icons.Docs.Main,
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
    sc.Description=coLang.Table.Apps.Docs.Description;
    sc.State=coApp.State.Normal;
    sc.iconInApplications=(coVDM.Daily==true);
    sc.iconInTaskList=true;

    sc.Views=sc.Slides.createSlide(
      "Views",
      sc.Class+"Views",
      sc,
      sc.Frame,
      sc.Frame.Client,
      coAppUI.Alignment.Client
    );
    sc.Views.clearContainerClass();

    sc.Views.Slides.Admin=coDocs.App.Components.AdminViews.Create(
      sc,
      sc.Views,
      sc.Views.Container,
      coAppUI.Alignment.Client
    );

    // Todo other slides for document creation
    // which are implements of the abstracted types
    // todo


    sc.Nav=coDocs.App.Components.Nav.Create(sc);

    return sc;
  }
};
coDocs.init();
