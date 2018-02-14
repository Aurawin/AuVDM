coVDM.App.Components.coStartup = {
  Version        : new Version(2013,5,18,80),
  Title          : new Title("VDM Core Startup","Startup"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/coStartup.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/coStartup.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/coStartup.js',
  VDM            : null,
  debugToConsole : true,
  init : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
      ],
      [
        '/core/vdm/Browser.js',
        '/core/vdm/Clock.js',
        '/core/vdm/Display.js',
        '/core/vdm/Events.js',
        '/core/vdm/Groups.js',
        '/core/vdm/Manifest.js',
        '/core/vdm/Status.js',
        '/core/vdm/Topbar.js',
        '/core/vdm/WorkSpace.js'
      ],
      this.onInitialized
    );
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.Initialized=true;
    this.VDM=vdm;
    this.App.onStartup=function(App){
      if (coVDM.App.Components.coPost)
        coVDM.App.Components.coPost.init();
    };
    this.App.onLogin=function(App){
      coVDM.VDM.WorkSpace.Button.Disabled=false;
      coVDM.VDM.WorkSpace.Button.Show();
      coVDM.VDM.WorkSpace.Button.setExpanded();
    };
    this.App.deferInit=function(App){
      return (
        (coVDM.App.Components.Browser!=null) &&
        (coVDM.App.Components.Display!=null) &&
        (coVDM.App.Components.Status!=null) &&
        (coVDM.App.Components.coPost!=undefined)
      );
    };
    this.App.onInitDeferred=function(App){
    };
    return this;
  },
  onInitialized : function(App){
    coVDM.VDM.WorkSpace=coVDM.App.Components.WorkSpace.Create(coVDM.VDM);
    coVDM.Display=App.Unit.VDM.Display=coVDM.App.Components.Display.Create(coVDM.VDM);
    coVDM.Browser=App.Unit.VDM.Browser=coVDM.App.Components.Browser.Create(coVDM.VDM);
    document.body.style.height=App.Unit.VDM.Browser.Height+"px";
    App.Loaded=true;
    coAppKit.Startup();
  }
};
coVDM.App.Components.coStartup.init(coVDM.VDM);
