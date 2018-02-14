coVDM.App.Components.coWelcome = {
  Version        : new Version(2012,9,18,32),
  Title          : new Title("VDM Welcome Screen","Welcome"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  debugToConsole : true,
  VDM            : null,
  init           : function(vdm){
    this.App=coAppKit.createApp(
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js'
      ],
      coAppKit.NoDependencies,
      this.onInitialized
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.App.Initialized=true;
    this.App.deferInit=function(App){
      return  (
          (coVDM.VDM.Torus!=undefined) &&
          (coVDM.App.Components.coEnticement!=undefined) &&
          (coVDM.App.Components.coEnticement.App.Loaded==true)
        );
    };
    this.App.onWorkspaceResized=function(App){
      if (coVDM.VDM.Display.Small==true){
        if (App.Screen.Visible==true)
          App.Screen.Hide();
      } else {
        if ((App.Screen.Visible==false) && (App.Screen.Hidden==false))
          App.Screen.Show();
      };
    };
    this.App.onAuthenticated=function(App){
      if (App.Screen.Visible==true){
        App.Screen.Container.style.opacity=0;
        setTimeout(
          function(){
            App.Screen.Conseal();
          },
          1500
        );
      };
    };
    this.App.onLogin=function(App){
      if (App.Screen.Visible==true){
        App.Screen.Container.style.opacity=0;
        setTimeout(
          function(){
            App.Screen.Conseal();
          },
          1500
        );
      };
    };
    this.App.onStartup=function(App){
      if (App.Screen.Visible==true)
        App.Screen.Container.style.opacity=1;
    };
    return this;
  },
  onInitialized:function(App){
    App.Screen=App.Unit.VDM.Welcome=App.Unit.Create(App.Unit.VDM);
    if (coVDM.VDM.Display.Small==false) App.Screen.Show();
    App.Loaded=true;
  },
  Create:function(aVDM){
    var ss=coAppScreens.createScreen(
      aVDM,
      "WelcomeScreen",
      "System",
      "Welcome",
      "Welcome",
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Frameless,
      "bdrWelcome",
      "bdrWelcome",
      ""
    );
    ss.Unit=this;
    ss.Position=coApp.Position.TopLeft;
    ss.State=coApp.State.Normal;
    ss.iconInApplications=false;
    ss.iconInTaskList=false;
    ss.AllowFullScreen=false;
    ss.Container.className="WelcomeScreen";

    ss.Height=152;
    ss.Width=152;
    ss.Container.style.height=ss.Height+"px";
    ss.Container.style.width=ss.Width+"px";

    ss.Frame.zIndexFactor=coVDM.zFactorWelcome;
    ss.Frame.Client.className="bdrWelcomeClient";
    ss.Frame.Torus.Container.style.bottom="";
    ss.Frame.Torus.Container.style.top="5px";
    ss.Panels=coAppUI.App.Components.Panels.Create("Welcome","WelcomePanels",ss.Frame,ss,ss.Frame.Client,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOn);

    ss.Panels.Tour=ss.Panels.createItem(coLang.Table.Apps.Tour.Title,ss.Panels.Kind.Image,"Tour","pnlWelcomeTour",coAppUI.Alignment.Top);
    ss.Panels.Tour.onClick=function(){
      coVDM.App.Components.coTour.InvokeTour();
    };
    ss.Panels.Tour.Container.title=coLang.Table.Apps.Welcome.Hints.Tour;

    ss.Panels.Policies=ss.Panels.createItem("",ss.Panels.Kind.Image,"Policies","pnlWelcomePolicies",coAppUI.Alignment.Top);
    ss.Panels.Policies.Container.title=coLang.Table.Apps.Welcome.Hints.Policies;
    ss.Panels.Policies.onClick=function(){
      coVDM.App.Components.coPolicies.InvokePolicies();
    };

    ss.Panels.Signup=ss.Panels.createItem(coLang.Table.Buttons.Signup,ss.Panels.Kind.Image,"Signup","pnlWelcomeSignup",coAppUI.Alignment.Top);
    ss.Panels.Signup.Container.title=coLang.Table.Apps.Welcome.Hints.Signup;
    ss.Panels.Signup.onClick=function(){
      coVDM.App.Components.coLogin.InvokeSignup();
    };

    ss.Panels.onResize=function(){
      var pnls=this;
      pnls.Container.style.width="";
      pnls.Container.style.height="";
      pnls.Container.style.display="";
      ss.Container.style.height=pnls.Container.offsetHeight+"px";
    };
    ss.onHide=function(){
      var ss=this;
    };
    ss.onShow=function(){
      var ss=this;
      ss.Container.style.opacity=1;
    };


    return ss;
  }
};
coVDM.App.Components.coWelcome.init(coVDM.VDM);
