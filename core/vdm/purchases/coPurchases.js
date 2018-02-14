coPurchases = {
  Version        : new Version(2013,1,26,11),
  Title          : new Title("Aurawin Core Purchases","coPurchases"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/purchases/coPurchases.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/purchases/coPurchases.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/purchases/coPurchases.js',
  VDM            : null,
  debugToConsole : true,
  accountPattern : "[0-9] {10}",

  NameSpace      : "/core/vdm/purchases",

  NS_PURCHASE_READ   : "/pr",
  NS_PURCHASE_WRITE  : "/pw",
  NS_PURCHASE_LIST   : "/pl",
  NS_PURCHASE_ADD    : "/pa",
  NS_PURCHASE_DELETE : "/pd",

  init           : function(vdm){
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
        '/core/vdm/purchases/DB.js'
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.Initialized=true;
    this.App.Accounts=null;
    this.App.onLogin=function(App){
      App.Purchases.Commands.List();
    };
    return this;
  },
  onInitialized:function(App){
    App.Loaded=true;
    App.Purchases=App.Components.DB.Create();
  }
};
coPurchases.init(coVDM.VDM);
