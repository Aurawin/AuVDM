var coLicense = {
  Version        : new Version(2013,11,15,6),
  Title          : new Title("Aurawin Licensing","coLicense"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/license/coLicense.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/license/coLicense.js',coAppKit.PreLoaded),
  Unit           : '/core/license/coLicense.js',
  debugToConsole : true,
  NameSpace      : "/core/license",
  NS_DL_LIST     : "/dl/l",
  Downloads      : null,
  init           : function(){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
      ],
      [
        this.NameSpace+'/coLicense.css',
        this.NameSpace+'/DB.js'
      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.Initialized=true;
    this.Header.App=this.App;
    this.Usage.App=this.App;

    return this;
  },
  onInitialized : function(App){
    App.Loaded=true;
  }
};
coLicense.init();

