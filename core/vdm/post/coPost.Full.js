coVDM.App.Components.coPost= {
  Version        : new Version(2014,10,11,35),
  Title          : new Title("VDM Core Post","Post"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/post/coPost.Full.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/post/coPost.Full.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/post/coPost.Full.js',
  VDM            : null,
  debugToConsole : true,
  init : function(){
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
        '/core/vdm/alerts/coAlerts.js',
        '/core/vdm/coConsole.js',
        '/core/vdm/coMessagebox.js',
        '/core/vdm/editor/text/coText.js',
        '/core/vdm/dialogs/coDialogs.js',
        '/core/vdm/thumbs/coThumbs.js',
        '/core/vdm/music/coMusic.js',
        '/core/vdm/policies/coPolicies.js',
        '/core/vdm/purchases/coPurchases.js',
        '/core/vdm/tour/coTour.js',
        '/core/license/coLicense.js',
        '/core/spc/eml/coMail.js',
        '/core/collages/coCollageBoard.js',
        '/core/cms/coCMS.js'
      ],
      [
        '/core/vdm/viewers/ImageViewer.js',
        '/core/vdm/viewers/MovieViewer.js',
        '/core/vdm/viewers/PDFViewer.js'
      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.VDM=coVDM.VDM;
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
      coDOM.setBase("_blank");
    };
    this.App.onInitDeferred=function(App){
    };
    this.Header.App=this.App;
    this.Usage.App=this.App;
    return this;
  },
  onInitialized : function(App){
    App.Loaded=true;
  }
};
