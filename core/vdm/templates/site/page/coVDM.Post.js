coVDM.App.Components.coPost= {
  Version        : new Version(2013,12,6,1),
  Title          : new Title("{Your App} Post","Post ({Your App})"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/{PATH}/coVDM.Post.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/{PATH}/coVDM.Post.js',coAppKit.PreLoaded),
  Unit           : '/{PATH}/coVDM.Post.js',
  VDM            : null,
  debugToConsole : true,
  init : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      coAppKit.NoUses,
      coAppKit.NoDependencies,
      this.onInitialized
    );
    this.App.Unit=this;
    this.VDM=vdm;
    this.App.onLogin=function(App){
    };
    this.App.deferInit=function(App){
      return (true);
    };
    this.App.onStartup=function(App){

    };
    this.App.onInitDeferred=function(App){

    };
    return this;
  },
  onInitialized : function(App){
    App.Loaded=true;
    coAppKit.PostBoot();
  }
};
