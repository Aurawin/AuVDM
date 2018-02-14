coAcePage = {
  Version        : new Version(2014,10,20,1),
  Title          : new Title("Aurawin Ace Screen","Ace"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/ace/coAcePage.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/ace/coAcePage.js',coAppKit.PreLoaded),
  Unit           : '/ace/coAcePage.js',
  debugToConsole : true,
  VDM            : null,
  revealDelay    : 1000,
  Transition     : 'left 15s linear',
  init           : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        "/core/app/coApp.js",
        "/core/app/coAppUI.js",
        "/core/app/coAppScreens.js",
        "/core/vdm/coVDM.js",
        "/core/cms/coCMS.js"
      ],
      [
        "/ace/coAcePage.css"
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.Splashed=false;
    this.App.ConsealAfterCreate=false;
    this.App.deferInit=function(App){
      return true;
    };
    this.App.onLoginFailed=function(App){
    };
    this.App.onSplashed=function(App){
    };
    this.App.onAuthorizationFailed=function(App){
    };
    this.App.onAuthorizing=function(App){
    };
    this.App.onAuthenticated=function(App){
    };
    this.App.onAuthorized=function(App){
    };
    this.App.onResourcesLoaded=function(App){
    };
    this.App.onResourceAdded=function(App,Resource){
    };
    this.App.onLogin=function(App){
    };
    this.App.onPostBoot=function(App){
      coVDM.VDM.Torus.Stop();
    };
    return this;
  },
  onInitialized:function(App){
    coAppUI.App.Components.CMS.checkForAce();
    App.Screen=App.Unit.createScreen();
    coVDM.VDM.WorkSpace.Show();
    App.Loaded=true;
    App.Screen.Show();
  },
  createScreen:function(){
    var ss=coAppScreens.createScreen(
      coVDM.VDM,
      "screenAce",
      "System",
      "Ace",
      "Ace",
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Frameless,
      "frmAcePage",
      "bdrAcePage",
      "flmAcePage",
      "clntAcePage"
    );
    ss.Unit=this;
    ss.Position=coApp.Position.Full;
    ss.State=coApp.State.Full;
    ss.iconInApplications=false;
    ss.iconInTaskList=false;
    ss.AllowFullScreen=false;
    ss.SaveGeometry=false;


    ss.Manifest.Geometry.State.Value=coApp.State.Full;
    ss.Manifest.Geometry.State.Default=coApp.State.Full;

    ss.Container.className="AcePageScreen";
    ss.Frame.Client.className="bdrAcePageClient";
    ss.Frame.Torus.Container.style.bottom="0px";
    ss.Frame.Torus.Container.style.top="5px";


    ss.Ace=coAppUI.App.Components.CMS.createEditor(ss.Frame,ss.Frame.Client,"Ace","cmsAce");

    ss.doHide=function(){
      var ss=this;
      ss.Container.style.opacity=0;
    };
    ss.doResize=function(){
      var ss=this;
    };
    ss.doShow=function(){
      var ss=this;
      ss.Container.style.opacity=.01;
      setTimeout(
        function(){
          ss.Container.style.opacity=1;
        },
        550
      );
    };
    return ss;
  }
};
coAcePage.init();
