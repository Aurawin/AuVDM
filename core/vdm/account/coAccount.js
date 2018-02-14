var coAccount=coVDM.App.Components.coAccount = {
  Version          : new Version(2014,8,16,40),
  Title            : new Title("Aurawin Account Screen","Account"),
  Vendor           : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header           : coAppKit.Dependencies.Create(null,'/core/vdm/account/coAccount.js',coAppKit.PreLoaded),
  Usage            : coAppKit.Units.Create(null,'/core/vdm/account/coAccount.js',coAppKit.PreLoaded),
  Unit             : '/core/vdm/account/coAccount.js',
  debugToConsole   : true,
  VDM              : null,
  NameSpace        : "/core/vdm/account",
  NS_ACCT_READ     : "/ar",
  NS_ACCT_WRITE    : "/aw",
  NS_ACCT_DISK_USE : "/dc",
  NS_ACCT_SET_CONTACT : "/sc",
  lvUsage          : 0,
  lvServices       : 1,
  lvBilling        : 2,
  lvPayments       : 3,
  init             : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js',
        '/core/vdm/payments/coPayments.js'
      ],
      [
        '/core/vdm/account/coAccount.css',
        '/core/vdm/account/Nav.js',
        '/core/vdm/account/DB.js',
        '/core/vdm/account/Usage.js',
        '/core/vdm/account/Billing.js',
        '/core/vdm/account/Switcher.js',
        '/core/vdm/account/Editor.js',
        '/core/vdm/account/Services.js',
        '/core/vdm/account/Manifest.js',
        '/core/vdm/account/Payments.js'
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.DB=null;
    this.App.deferInit=function(App){
      return ( (coVDM.VDM.Torus!=undefined) && (coPayments!=undefined) && (coPayments.App!=undefined) && (coPayments.App.Accounts!=null));
    };
    this.App.onWorkspaceResized=function(App){
    };
    this.App.onInitDeferred=function(App){
    };
    this.App.onAuthorized=function(App){
      if (App.Screen){
        App.DB.Commands.Read();
        App.DB.Commands.DiskUsage();
      } else {
        App.processAuthorized=false;
      };
    };
    this.App.onAuthenticated=function(App){
      if (App.Screen){
        App.DB.Commands.Read();
        App.DB.Commands.DiskUsage();
      } else{
        App.processAuthenticated=false;
      };
    };
    this.App.onLogin=function(App){
    };
    this.App.onStartup=function(App){
    };
    return this;
  },
  onInitialized:function(App){
    App.DB=App.Components.DB.Create(App);
    App.Screen=App.Unit.VDM.Welcome=App.Unit.Create(App.Unit.VDM);
    App.DB.setDisplay(App.Screen);
    App.Screen.Conseal();
    App.Loaded=true;
  },
  Create:function(aVDM){
    var ss=coAppScreens.createScreen(
      aVDM,
      "AccountScreen",
      "System",
      "Account",
      coLang.Table.Account.Title,
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Frame,
      "bdrWelcome",
      "bdrWelcome",
      ""
    );
    ss.Unit=this;
    ss.Description=coLang.Table.Account.Description;
    ss.DB=coVDM.App.Components.coAccount.App.DB;
    ss.Position=coApp.Position.TopLeft;
    ss.State=coApp.State.Normal;
    ss.iconInApplications=true;
    ss.iconInTaskList=true;
    ss.AllowFullScreen=true;
    ss.Container.className="AccountScreen";
    ss.SaveGeometry=true;

    ss.Container.style.height=ss.Height+"px";
    ss.Container.style.width=ss.Width+"px";

    this.App.Components.Manifest.Install(ss);


    ss.Switcher=this.App.Components.Switcher.Create(ss);

    ss.Slides.Usage=this.App.Components.Usage.Create(ss);
    ss.Slides.Services=this.App.Components.Services.Create(ss);
    ss.Slides.Payments=this.App.Components.Payments.Create(ss);

    ss.Nav=this.App.Components.Nav.Create(ss);

    ss.onHide=function(){
      var ss=this;
    };
    ss.onShow=function(){
      var ss=this;
      ss.Nav.selectView(ss.Manifest.MAP.LastView.Value);
    };

    return ss;
  }
};
coVDM.App.Components.coAccount.init(coVDM.VDM);
