var coPolicies=coVDM.App.Components.coPolicies={
  Version        : new Version(2013,5,22,12),
  Title          : new Title("Aurawin Policies","coPolicies"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/policies/coPolicies.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/policies/coPolicies.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/policies/coPolicies.js',
  debugToConsole : true,
  NameSpace      : "/core/vdm/policies",
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
        this.NameSpace+"/coPolicies.css",
        this.NameSpace+"/Views.js",
        this.NameSpace+"/Nav.js"
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.Header.App=this.App;
    this.Usage.App=this.App;
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
      "Policies",
      "System",
      coLang.Table.Apps.Policies.Name,
      coLang.Table.Apps.Policies.Title,
      coTheme.Icons.Policies.Main
    );
    _sc.Unit=this;
    _sc.Player=null;
    _sc.AllowFullScreen=true;
    _sc.SaveGeometry=true;
    _sc.Position=coApp.Position.Center;
    _sc.Description=coLang.Table.Apps.Policies.Description;
    _sc.Frame.zIndexFactor=coVDM.zFactorPolicies;
    _sc.onShow=function(){
      var sc=this;
    };
    _sc.onManifestUpdated=function(col){

    };
    _sc.Main=_sc.Unit.App.Components.Views.CreateMain(_sc);
    _sc.Nav=_sc.Unit.App.Components.Nav.Create(_sc);
    _sc.Nav.Menu.Slide=_sc.Main;
    return _sc;
  },
  InvokeTerms : function(){
    var sc=this.App.Screen;
    var mnu=sc.Nav.Menu;
    sc.Show();
    mnu.setSelected(mnu.miAgreement);
  },
  InvokeAUP : function(){
    var sc=this.App.Screen;
    var mnu=sc.Nav.Menu;
    sc.Show();
    mnu.setSelected(mnu.miAUP);
  },
  InvokePrivacy : function(){
    var sc=this.App.Screen;
    var mnu=sc.Nav.Menu;
    sc.Show();
    mnu.setSelected(mnu.miPrivacy);
  },
  InvokePolicies : function(){
    var sc=this.App.Screen;
    sc.Show();
  }
};
coVDM.App.Components.coPolicies.init(coVDM.VDM);
