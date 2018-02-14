coFrontPage = {
  Version        : new Version(2015,6,3,59),
  Title          : new Title("Aurawin Front Page Screen","Front Page"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/fp/coFrontPage.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/fp/coFrontPage.js',coAppKit.PreLoaded),
  Unit           : '/fp/coFrontPage.js',
  debugToConsole : true,
  VDM            : null,
  revealDelay    : 1000,
  divTNB         : null,
  divTNBItems    : null,
  divWrap        : null,
  Transition     : 'left 15s linear',
  imgLogo        : "/images/logo-black-r2.png",
  imgLovedOnes   : "/core/vdm/imgs/entice/loved.jpg",
  imgFriends     : "/core/vdm/imgs/entice/friends.jpg",
  imgSharing     : "/core/vdm/imgs/entice/sharing.jpg",
  imgFreedom     : "/core/vdm/imgs/entice/free.jpg",
  imgFun         : "/core/vdm/imgs/entice/fun.jpg",
  imgCollaborate : "/core/vdm/imgs/entice/colab.jpg",
  imgFamily      : "/core/vdm/imgs/entice/family.jpg",

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
        "/core/cms/coCMS.js",
        "/downloads/coDownloadsPage.js"
      ],
      [
        "/fp/coFrontPage.css",
        "/fp/Boxes.js",
        "/fp/bxWelcome.js"
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
      App.Screen.Show();
      App.Screen.Boxes.Welcome.Slides.Login.onFailed();
    };
    this.App.onSplashed=function(App){
      if (App.Screen) {
        App.Splashed=true;
        coVDM.VDM.Torus.Stop();
        App.Screen.Conseal();
      } else {
        App.processSplashed=false;
      }
    };
    this.App.onAuthorizationFailed=function(App){
      if (App.Screen){
        App.Screen.Boxes.Welcome.Slides.Login.onFailed();
        App.Screen.Show();
      } else {
        App.processAuthorizationFailed=false;
      }
    };
    this.App.onAuthorizing=function(App){
      if (App.Screen) {
        if (App.Screen.Visible==true)
          App.Screen.Conseal();
      } else{
        App.processAuthorizing=false;
      };
    };
    this.App.onAuthenticated=function(App){
      if (App.Screen)  {
        App.Screen.Boxes.Welcome.Slides.Login.onAuthenticated();
        App.Screen.Boxes.Welcome.Slides.DeviceSelect.onAuthenticated();
        App.processResourcesLoaded=false;
        App.processAuthenticated=true;
      } else{
        App.processAuthenticated=false;
      };
    };
    this.App.onAuthorized=function(App){
      if (App.Screen) {
        App.processResourcesLoaded=true;
        if (App.Screen.Visible==true){
          App.Screen.Container.style.opacity=0;
          setTimeout(
            function(){
              App.Screen.Conseal();
            },
            250
          );
        };
      } else{
        App.processAuthorized=false;
        App.processResourcesLoaded=true;
      };
    };
    this.App.onResourcesLoaded=function(App){

      if (App.Screen) {
        App.Screen.Boxes.Welcome.Slides.DeviceSelect.onDevicesLoaded();
        App.processResourcesLoaded=true;
      } else {
        App.processResourcesLoaded=false;
      };
    };
    this.App.onResourceAdded=function(App,Resource){
      App.Screen.Boxes.Welcome.Slides.DeviceSelect.onDevicesLoaded();
      if (App.Screen.Visible==true)
        App.Screen.Boxes.Welcome.CompleteLogin(Resource);
    };
    this.App.onLogin=function(App){
      coFrontPage.divTNB.style.display="none";
      coFrontPage.divWrap.style.top="0px";
      coVDM.VDM.setSize();
      if (App.Screen.Visible==true){
        App.Screen.Container.style.opacity=0;

        setTimeout(
          function(){
            App.Screen.Conseal();
          },
          1500
        );
      };
    };
    this.App.onStartup=function(App){
      coFrontPage.divTNB=coDOM.$("TopNavBar");
      coFrontPage.divWrap=coDOM.$("vdmWrap");
      coFrontPage.divTNBItems=coDOM.$("TopNavBarItems");
      if (coVDM.Display.Small==true) 
        coFrontPage.divTNBItems.style.display="none";
    };
    this.App.onPostBoot=function(App){

    };

    return this;
  },
  InvokeSignup:function(){
    this.App.Screen.Boxes.Welcome.InvokeSignup();
  },
  InvokePolicies:function(){
    coPolicies.App.Screen.Show();
  },
  onInitialized:function(App){
    App.Screen=App.Unit.VDM.FrontPage=App.Unit.Create(App.Unit.VDM);
    coVDM.VDM.WorkSpace.Show();
    App.Loaded=true;
    if ( (coAppKit.CredsChecking==false) && (coAppKit.CredsChecked!=true) ) {
      App.Screen.Show();
      coVDM.VDM.Torus.Stop();
    };
  },
  Create:function(aVDM){
    var ss=coAppScreens.createScreen(
      aVDM,
      "FrontPageScreen",
      "System",
      "FrontPage",
      "FrontPage",
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Frameless,
      "frmFrontPage",
      "bdrFrontPage",
      "flmFrontPage",
      "clntFrontPage"
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

    ss.Container.className="FrontPageScreen";
    ss.Frame.Client.className="bdrFrontPageClient";
    ss.Frame.Torus.Container.style.bottom="0px";
    ss.Frame.Torus.Container.style.top="5px";

    ss.Boxes=this.App.Components.Boxes.Create(ss);
    ss.showLogin=function(){
      var ss=this;
      ss.Reveal();
      ss.Boxes.Welcome.Button.Select();
    };
    ss.doHide=function(){
      var ss=this;
      ss.Boxes.Conseal();
      ss.Container.style.opacity=0;
    };
    ss.doResize=function(){
      var ss=this;
    };
    ss.doShow=function(){
      var ss=this;
      ss.Container.style.opacity=.01;
      ss.Boxes.Reveal();
      setTimeout(
        function(){
          ss.Container.style.opacity=1;
        },
        550
      );
    };
    ss.Conseal();
    return ss;
  }
};
coFrontPage.init(coVDM.VDM);
