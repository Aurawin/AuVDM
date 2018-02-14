var coSitePage = {
  Version        : new Version(2013,12,6,1),
  Title          : new Title("Aurawin Site Page Application","Site Page"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/{PATH}/coSitePage.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/{PATH}/coSitePage.js',coAppKit.PreLoaded),
  Unit           : '/{PATH}/coSitePage.js',
  NameSpace      : "/{NAMESPACE}",
  doLoad         : function(){
    var html=document.getElementsByTagName('html')[0];
    html.style.overflow="auto";
    window.scrollTo(0,1);
    document.body.style.margin="0";
    document.body.style.padding="0";
    document.body.style.overflow="auto";

    divWrapper=coDOM.$("cmpWrapper");
  },
  Init : function(){
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
        /{PATH}/DB.js,
        /{PATH}/Views.js
      ],
      this.onInitialized
    );
    this.App.onPostBoot=function(App){
      App.Initialized=true;
    };
    this.App.Unit=this;
    this.Header.App=this.App;
    this.Usage.App=this.App;
  },
  onInitialized : function(App){
    App.DB=App.Components.DB.Create(App);
    App.Screen=App.Unit.createScreen(App);
    App.Screen.Show();
    App.Loaded=true;
  },
  createScreen: function(App){
    if (App.Screen!=null) return App.Screen;
    coVDM.VDM.Torus.Start();
    var sc=App.Screen=coAppScreens.createScreen(
      coVDM.VDM,
      "SitePageScreen",
      coLang.Table.Groups.Custom.Name,
      "Site Page", // edit name
      "Site Page Application", // edit description
      coTheme.Icons.Logo.Aurawin,
      0.5,
      0.5,
      coAppUI.Frameless,
      "bdrSitePage",
      "frameSitePage",
      "filmSitePage"
    );
    sc.Unit=this;
    sc.AllowFullScreen=true;
    sc.SaveGeometry=true;
    sc.Position=coApp.Position.Full;
    sc.Description="Aurawin Site Page"; // edit description
    sc.DB=coSitePage.App.Components.DB.Create(sc);
    sc.Views=coSitePage.App.Components.Views.Create(sc);
    sc.SitePageLoadFailed=function(){
      var sc=this;
      // add code handling here
    };
    sc.doShow=function(){
      var sc=this;
      coVDM.VDM.Torus.Stop();
    };
    sc.doHide=function(){
      var sc=this;
    };
    if (App.Failed==true) sc.SitePageLoadFailed();
    return sc;
  }
};
coSitePage.Init();
