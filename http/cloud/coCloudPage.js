coCloudPage = {
  Version        : new Version(2014,10,10,7),
  Title          : new Title("Aurawin Cloud Page Screen","Cloud Page"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/cloud/coCloudPage.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/cloud/coCloudPage.js',coAppKit.PreLoaded),
  Unit           : '/cloud/coCloudPage.js',
  debugToConsole : true,
  VDM            : null,

  opCloudMax         : 0.7,
  opCloudMin         : 0.2,
  divCloud           : null,
  cloudPulsate       : true,
  divTopNav          : null,

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
        "/core/cms/coCMS.js"
      ],
      [
        "/cloud/coCloudPage.css",
        "/cloud/Views.js",
        "/cloud/ImageBar.js",
        "/cloud/Spacer.js",
        "/cloud/Content.js",
        "/cloud/Footer.js",
        "/cloud/Overview.js",
        "/cloud/Benefits.js",
        "/cloud/Features.js",
        "/cloud/Welcome.js"
      ],
      this.onInitialized
    );
    this.App.onPostBoot=function(App){
      App.Initialized=true;
    };
    this.VDM=vdm;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.ConsealAfterCreate=false;
    this.App.Splashed=false;
    return this;
  },
  onInitialized:function(App){
    App.Screen=App.Unit.VDM.FrontPage=App.Unit.Create(App.Unit.VDM);
    App.Screen.Show();
    App.Loaded=true;
  },
  Create:function(aVDM){
    var ss=coAppScreens.createScreen(
      aVDM,
      "CloudPageScreen",
      "System",
      "CloudPage",
      "CloudPage",
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Frameless,
      "frmCloudPage",
      "bdrCloudPage",
      "flmCloudPage",
      "cltCloudPage"
    );
    coDOM.setText(this.divTopNavBarTitle,coLang.Table.Apps.Cloud.Title);

    ss.Unit=this;
    ss.Position=coApp.Position.Full;
    ss.State=coApp.State.Full;
    ss.iconInApplications=false;
    ss.iconInTaskList=false;
    ss.AllowFullScreen=false;
    ss.SaveGeometry=false;


    ss.Manifest.Geometry.State.Value=coApp.State.Full;
    ss.Manifest.Geometry.State.Default=coApp.State.Full;

    ss.Container.className="CloudPageScreen";
    ss.Frame.Torus.Container.style.bottom="0px";
    ss.Frame.Torus.Container.style.top="5px";

    ss.Views=coCloudPage.App.Components.Views.Create(ss);

    ss.doHide=function(){
      var ss=this;
    };
    ss.doShow=function(){
      var ss=this;
      coDOM.setStyle(coCloudPage.divTopNav,coDOM.BoxShadow,coTheme.CSS.BoxShadow.None);
      ss.Views.Content.Owner.Reveal();
      coCloudPage.cloudPulsate=false;
      coVDM.VDM.Torus.Stop();
      ss.Container.style.opacity=1;
    };

    return ss;
  },
  doPageLoad:function(){
    this.showOnCreate=true;
    var html=document.getElementsByTagName('html')[0];
    html.style.overflow="auto";
    window.scrollTo(0,1);
    document.body.style.margin="0";
    document.body.style.padding="0";
    document.body.style.overflow="auto";

    this.divWrapper=coDOM.$("cmpWrapper");
    this.divTopNav=coDOM.$("TopNavBar");
    this.divCloud=coDOM.$("Cloud");
    this.divTopNavBarTitle=coDOM.$("TopNavBarTitle");
    this.divTNBIHome=coDOM.$("TNBIHome");
    this.divTNBIEnterprise=coDOM.$("TNBIEnterprise");
    this.divTNBIPartners=coDOM.$("TNBIPartners");
    this.divTNBIDevelopers=coDOM.$("TNBIDevelopers");
    this.divTNBIDownloads=coDOM.$("TNBIDownloads");
    this.divTNBIEnterprise.firstElementChild.setAttribute("disabled","disabled");

    this.evtCloud=coEvents.Add(
      this.divCloud,
      coDOM.TransitionEnd,
      this.cloudTransitionEnd,
      coEvents.NoCapture,
      coEvents.Active
    );
    this.divCloud.style.opacity=.27;
  },
  cloudTransitionEnd:function(e){
    if (coCloudPage.cloudPulsate==true) {
      var Opacity=coCloudPage.divCloud.style.opacity;
      Opacity=(Opacity==coCloudPage.opCloudMax) ? coCloudPage.opCloudMin : coCloudPage.opCloudMax;
      coCloudPage.divCloud.style.opacity=Opacity;
    } else {
      coCloudPage.divCloud.style.opacity=0;
    };
  }
};
coCloudPage.init(coVDM.VDM);

