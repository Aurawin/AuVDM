coDownloadsPage = {
  Version        : new Version(2014,10,3,37),
  Title          : new Title("Aurawin Downloads Page Screen","Downloads Page"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/downloads/coDownloadsPage.js',
  Header         : coAppKit.Dependencies.Create(null,'/downloads/coDownloadsPage.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/downloads/coDownloadsPage.js',coAppKit.PreLoaded),
  debugToConsole : true,
  VDM            : null,
  revealDelay    : 1000,
  showOnCreate   : false,
  divWrapper     : null,
  divCloud       : null,
  divTopNavBarTitle : null,
  opCloudMax         : 0.7,
  opCloudMin         : 0.2,
  cloudPulsate   : true,
  tiCloud        : 0,
  init           : function(vdm){
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
        "/downloads/coDownloadsPage.css",
        "/downloads/Nav.js",
        "/downloads/DB.js",
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.App.Splashed=false;
    this.App.ConsealAfterCreate=false;
    this.App.deferInit=function(App){
      return (coVDM.App.Initialized==true);
    };
    this.App.onLoginFailed=function(App){
    };
    this.App.onAuthorized=function(App){
    };
    this.App.onAuthorizationFailed=function(App){
    };
    this.App.onAuthorizing=function(App){
    };
    this.App.onAuthenticated=function(App){
    };
    this.App.onResourcesLoaded=function(App){
    };
    this.App.onResourceAdded=function(App,Resource){
    };
    this.App.onLogin=function(App){
      if (App.Screen) {
        App.Screen.AllowClose=true;
      } else {
        App.processLogin=false;
      };
    };
    this.App.onStartup=function(App){

    };
    return this;
  },
  onInitialized:function(App){
    App.Screen=App.Unit.VDM.FrontPage=App.Unit.Create(App.Unit.VDM);
    if (App.Unit.showOnCreate==true) {
      App.Screen.Show();
      App.Screen.AllowFullScreen=true;

      coVDM.VDM.Torus.Stop();
      coVDM.VDM.Browser.WindowState=coApp.State.Full;
    };

    App.Loaded=true;
  },
  Create:function(aVDM){
    var ss=coAppScreens.createScreen(
      aVDM,
      "DownloadsPageScreen",
      "System",
      coLang.Table.Apps.Downloads.Name,
      coLang.Table.Apps.Downloads.Title,
      coTheme.Icons.Downloads.Aurawin,
      0.5,
      0.5,
      coAppUI.Frameless
    );
    ss.Description=coLang.Table.Apps.Downloads.Description;
    ss.Unit=this;
    ss.DataSet=this.App.Components.DB.Create();
    ss.DataSet.Commands.List();
    ss.AllowClose=false;
    ss.Position=coApp.Position.TopLeft;
    ss.iconInApplications=true;
    ss.iconInTaskList=true;
    ss.AllowFullScreen=true;
    ss.SaveGeometry=true;


    ss.Frame.Torus.Container.style.bottom="0px";
    ss.Frame.Torus.Container.style.top="5px";
    if (this.divTopNavBarTitle)  coDOM.setText(this.divTopNavBarTitle,coLang.Table.Apps.Downloads.Title);

    ss.doHide=function(){
    };
    ss.doResize=function(){
    };
    ss.doShow=function(){
      var ss=this;
      ss.Slides.Files.Reveal();
      ss.Slides.Category.Reveal();
      ss.Nav.Reveal();
      coDownloadsPage.cloudPulsate=false;
      coVDM.VDM.Torus.Stop();
      ss.Container.style.opacity=1;
    };

    var ilv=ss.Slides.Category=coAppUI.App.Components.IconListView.Create("ilvCategory","",ss,ss.Slides,ss.Frame,ss.Frame.Client,coAppUI.Alignment.Left,coAppUI.vScrollOn);
    var lv=ss.Slides.Files=coAppUI.App.Components.ListView.Create("lvFiles","lvFrontPageDownloads",ss,ss.Slides,ss.Frame,ss.Frame.Client,coAppUI.Alignment.Client);
    ilv.setWidth(114);
    ilv.Mode.setValue(ilv.Mode.Values.Large);
    ilv.oneActExecute=true;
    var Nav=ss.Nav=this.App.Components.Nav.Create(ss,lv,ss.Slides,ss.Frame,ss.Frame.Client);

    lv.Commands.onCancel=function(cmds){
      var lv=cmds.Owner;
      var sc=lv.Screen;
      sc.Nav.gpDownload.Conseal();
    };
    lv.Commands.onConfirm=function(cmd){
      var cmds=this;
      var dbItem=cmd.Item.Data;
      var sURL=dbItem.MAP.URL.Value;
      coVDM.VDM.Browser.OpenURL(sURL);
    };
    var liDesktop=ilv.Items.createItem("Desktop",coTheme.Icons.Computer.Laptop,null);
    liDesktop.evtMouseUp.setActive(true);
    liDesktop.onDoubleClick=function(){
      var sc=this.Owner.Owner.Screen;
      sc.Nav.mCategory.selectDesktop();
    };
    var liServer=ilv.Items.createItem("Server",coTheme.Icons.Computer.Server,null);
    liServer.evtMouseUp.setActive(true);
    liServer.onDoubleClick=function(){
      var sc=this.Owner.Owner.Screen;
      sc.Nav.mCategory.selectServer();
    };
    var ds=ss.DataSet;

    lv.DataSet=ds;

    lv.Header.Columns.addItem(ds.Fields.MAP.Product);
    lv.Header.Columns.addItem(ds.Fields.MAP.Version);
    lv.Header.Columns.addItem(ds.Fields.MAP.OS);
    lv.Header.Columns.addItem(ds.Fields.MAP.Size);
    lv.Header.Columns.addItem(ds.Fields.MAP.Category);
    lv.Header.Columns.addItem(ds.Fields.MAP.Description);

    ds.Displays.Add(lv);

    ss.Slides.Files.Hidden=false;
    ss.Slides.Category.Hidden=false;
    ss.Nav.Hidden=false;

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
    this.divCloud=coDOM.$("Cloud");
    this.divTopNavBarTitle=coDOM.$("TopNavBarTitle");
    this.divTNBIHome=coDOM.$("TNBIHome");
    this.divTNBIEnterprise=coDOM.$("TNBIEnterprise");
    this.divTNBIPartners=coDOM.$("TNBIPartners");
    this.divTNBIDevelopers=coDOM.$("TNBIDevelopers");
    this.divTNBIDownloads=coDOM.$("TNBIDownloads");
    this.divTNBIDownloads.firstElementChild.setAttribute("disabled","disabled");

    this.divCloud.style.opacity=.27;

    this.evtCloud=coEvents.Add(
      this.divCloud,
      coDOM.TransitionEnd,
      this.cloudTransitionEnd,
      coEvents.NoCapture,
      coEvents.Active
    );
  },
  cloudTransitionEnd:function(e){
    if (coDownloadsPage.cloudPulsate==true) {
      var Opacity=coDownloadsPage.divCloud.style.opacity;
      Opacity=(Opacity==coDownloadsPage.opCloudMax) ? coDownloadsPage.opCloudMin : coDownloadsPage.opCloudMax;
      coDownloadsPage.divCloud.style.opacity=Opacity;
    } else {
      coDownloadsPage.divCloud.style.opacity=0;
    };
  }

};
coDownloadsPage.init(coVDM.VDM);

