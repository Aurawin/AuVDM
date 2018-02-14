coVDM.App.Components.coPost= {
  Version        : new Version(2013,11,17,5),
  Title          : new Title("VDM Core Post Daily","Post (Daily)"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/post/coPost.Daily.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/post/coPost.Daily.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/post/coPost.Daily.js',
  VDM            : null,
  debugToConsole : true,
  init : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/vdm/coAppScreen.js',
        '/core/login/coLogin.js',
        '/core/soc/coSocial.js',
        '/core/vdm/coDevice.js',
        '/core/vdm/account/coAccount.js',
        '/core/vdm/alerts/coAlerts.js',
        '/core/vdm/coConsole.js',
        '/core/vdm/coMessagebox.js',
        '/core/vdm/editor/text/coText.js',
        '/core/vdm/dialogs/coDialogs.js',
        '/core/vdm/thumbs/coThumbs.js',
        '/core/vdm/music/coMusic.js',
        '/core/vdm/payments/coPayments.js',
        '/core/vdm/policies/coPolicies.js',
        '/core/vdm/purchases/coPurchases.js',
        '/core/vdm/tour/coTour.js',
        '/core/license/coLicense.js',
        '/core/spc/eml/coMail.js',
        '/core/collages/coCollageBoard.js'
      ],
      [
      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.VDM=vdm;
    this.App.onAuthenticated=function(App){
    };
    this.App.onAuthorized=function(App){
    };
    this.App.onLogin=function(App){
      coVDM.VDM.WorkSpace.Button.Initialize();
    };
    this.App.deferInit=function(App){
      return (
        (typeof(jQuery)!='undefined') &&
        (typeof(coSpectrum)!='undefined') &&
        (typeof(coSocial)!='undefined')
      );
    };
    this.App.onStartup=function(App){
    };
    this.App.onInitDeferred=function(App){
      App.Loaded=true;
      coAppKit.PostBoot();
    };
    this.Header.App=this.App;
    this.Usage.App=this.App;

    return this;
  },
  onInitialized : function(App){
  }
};
