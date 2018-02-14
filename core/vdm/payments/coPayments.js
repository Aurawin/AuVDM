coPayments = {
  Version        : new Version(2014,8,16,14),
  Title          : new Title("Aurawin Core Payments","coPayments"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/payments/coPayments.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/payments/coPaymentss.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/payments/coPayments.js',
  VDM            : null,
  debugToConsole : true,
  accountPattern : "[0-9] {10}",

  NameSpace      : "/core/vdm/payments",

  NS_CARD_READ   : "/pr",
  NS_CARD_WRITE  : "/pw",
  NS_CARD_LIST   : "/pl",
  NS_CARD_ADD    : "/pa",
  NS_CARD_DELETE : "/pd",

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
        '/core/vdm/payments/DB.js'
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.Accounts=null;
    this.App.Initialized=true;
    return this;
  },
  onInitialized:function(App){
    App.Loaded=true;
    App.Accounts=App.Components.DB.Create();
  }
};
coPayments.init(coVDM.VDM);

