var coPartners = {
  Version        : new Version(2014,10,10,4),
  Title          : new Title("Aurawin Partners","Partners"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/partners/coPartners.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/partners/coPartners.js',coAppKit.PreLoaded),
  Unit           : '/partners/coPartners.js',
  NameSpace      : "/core/partners",
  NS_PARTNERS_LIST   : "/l",
  ElementSwitchDelay : 5000,
  HeaderHideDelay    : 5000,
  opCloudMax         : 0.7,
  opCloudMin         : 0.2,
  divCloud           : null,
  divTopNav          : null,
  cloudPuslate       : true,
  PicMargin          : 2,
  doLoad : function()  {
    var html=document.getElementsByTagName('html')[0];
    html.style.overflow="auto";
    window.scrollTo(0,1);
    document.body.style.margin="0";
    document.body.style.padding="0";
    document.body.style.overflow="auto";

    this.divTopNav=coDOM.$("TopNavBar");
    this.divCloud=coDOM.$("Cloud");
    this.divTopNavBarTitle=coDOM.$("TopNavBarTitle");
    this.divTNBIHome=coDOM.$("TNBIHome");
    this.divTNBIEnterprise=coDOM.$("TNBIEnterprise");
    this.divTNBIPartners=coDOM.$("TNBIPartners");
    this.divTNBIDevelopers=coDOM.$("TNBIDevelopers");
    this.divTNBIDownloads=coDOM.$("TNBIDownloads");
    this.divTNBIPartners.firstElementChild.setAttribute("disabled","disabled");
    this.evtCloud=coEvents.Add(
      this.divCloud,
      coDOM.TransitionEnd,
      this.cloudTransitionEnd,
      coEvents.NoCapture,
      coEvents.Active
    );
    this.divCloud.style.opacity=.27;

  },
  init : function(){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js',
        '/core/cms/coCMS.js'
      ],
      [
        '/partners/DB.js',
        '/partners/Views.js',
        '/partners/ImageBar.js',
        '/partners/Spacer.js',
        '/partners/Content.js',
        '/partners/Footer.js',
        '/partners/Welcome.js',
        '/partners/Overview.js',
        '/partners/Benefits.js',
        '/partners/Signup.js'
      ],
      this.onInitialized
    );
    this.App.onPostBoot=function(App){
      App.Initialized=true;
    };
    this.App.Unit=this;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.ConsealAfterCreate=false;
  },
  onInitialized : function(App){
    App.Cloud=coDOM.$("Cloud");
    App.Logo=coDOM.$("Logo");
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
      "PartnersScreen",
      coLang.Table.Groups.Social.Name,
      coLang.Table.Apps.Partners.Name,
      coLang.Table.Apps.Partners.Title,
      coTheme.Icons.Collage.Main,
      0.5,
      0.5,
      coAppUI.Frameless,
      "bdrPartners",
      "framePartners",
      "filmPartners"
    );
    coDOM.setText(this.divTopNavBarTitle,coLang.Table.Apps.Partners.Title);

    sc.Unit=this;
    sc.AllowFullScreen=true;
    sc.SaveGeometry=true;
    sc.Position=coApp.Position.Full;
    sc.Description=coLang.Table.Apps.Cloud.Description;

    sc.Views=coPartners.App.Components.Views.Create(sc);

    sc.doShow=function(){
      var sc=this;
      coDOM.setStyle(coPartners.divTopNav,coDOM.BoxShadow,coTheme.CSS.BoxShadow.None);
      sc.Views.Content.Owner.Reveal();
      coPartners.cloudPuslate=false;
      coVDM.VDM.Torus.Stop();
      sc.Container.style.opacity=1;
    };
    sc.doHide=function(){
      var sc=this;
    };
    if (App.Failed==true) sc.CollageLoadFailed();
    return sc;
  },
  cloudTransitionEnd:function(e){
    if (coPartners.cloudPuslate==true) {
      var Opacity=coPartners.divCloud.style.opacity;
      Opacity=(Opacity==coPartners.opCloudMax) ? coPartners.opCloudMin : coPartners.opCloudMax;
      coPartners.divCloud.style.opacity=Opacity;
    } else {
      coPartners.divCloud.style.opacity=0;
    };
  }
};
coPartners.init();

