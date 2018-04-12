const AppKit = {
  Unit           : '/core/app/boot/AppKit.js',
  Loaded         : true,
  debugToConsole : false,



  LoadUsesDelay  : 350,
  CheckForLoad1  : 900,
  CheckForLoad2  : 500,
  CacheChecking  : 500,
  cookieVersion  : 'AuVers',
  ErrorReloadDelay : 5000,
  ReloadDelay    : 250,
  Apps           : null,
  
  AppSystem      : true,
  AppDefault     : false,
  PreLoaded      : true,

  ukStyleSheet   : 0,
  ukJavaScript   : 1,
  
  ScriptsLoaded  : false,
  Loaded         : false,
  LoggedIn       : false,
  Verified       : false,
  CacheFirst     : false,
  CacheUpdating  : false,
  CacheObsolete  : false,
  CacheChecked   : true,
  CacheError     : false,
  CredsBooted    : false,
  CredsChecking  : false,
  CredsChecked   : false,
  CredsRejected  : false,
  SystemBooted   : false,
  Console        : null,
  maxAppLoadCount : 2,

  SystemApps     : [],
  NoScripts      : [],
  NoStyleSheets  : [],
  
  Timers         : Timers.createList(500),
  Scripts        : List.createArray(),

  init           : function(){
    this.Apps=this.createApps();
  },
  processStyleSheets : function(){
    var ss=document.styleSheets;
    for (var iLcv=0; iLcv<ss.length; iLcv++){
      s=ss[iLcv];
      rls=s.cssRules;
      if (rls){
        for (var rLcv=0; rLcv<rls.length; rLcv++){
          var r=rls[rLcv];
          if (r.selectorText=="header") {
            var s=r.style;
            var sURL=s.content;
            sURL=sURL.replace(/\'/g,'');
            this.Dependencies.Create(null,sURL,this.PreLoaded);
          };
        };
      };
    };
    this.DocLoaded=true;
  },
  getStyleSheets : function(){
    var Results=coList.Array();
    for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
      var app=this.Apps[iLcv];
      for (var jLcv=0; jLcv<app.Dependencies.length; jLcv++){
        var dep=app.Dependencies[jLcv];
        if (dep.Kind==AppKit.ukStyleSheet)
          Results.push(dep.Source);
      };
      for (var jLcv=0; jLcv<app.Uses.length; jLcv++){
        var use=app.Uses[jLcv];
        if (use.Kind==AppKit.ukStyleSheet)
          Results.push(use.Source);
      };
    };
    return Results;
  },
  createApplication : function(title,version,vendor,scripts,css,onInitialized,system){
    if (system==undefined) system=false;
    var app=new Objects.createNew("App");

    app.Screen=null;
    app.Title=title;
    app.Loaded=false;
    app.Initialized=false;
    app.Failed=false;
    app.System=system;
    app.Initializing=true;
    app.ConsealAfterCreate=true;
    app.Version=version;
    app.Vendor=vendor;
    app.deferInit=null;
    app.processScreenCreated=false;
    app.processInitialized=false;
    app.processSplashed=false;
    app.processAuthorized=false;
    app.processAuthorizing=false;
    app.processLoggedIn=false;
    app.processPostBoot=false;
    app.onInitDeferred=null;
    app.onAuthorizing=null;
    app.onAuthenticating=null;
    app.onAuthorized=null;
    app.onAuthorizationFailed=null;
    app.onResourcesLoaded=null;
    app.onResourceAdded=null;
    app.onScreenCreated=null;
    app.onLoadProgress=null;
    app.onLogin=null;
    app.onLogout=null;
    app.onLoginFailed=null;
    app.onStartup=null;
    app.onShutdown=null;
    app.onPostBoot=null;
    app.onSplashed=null;
    app.onWorkspaceResized=null;
    app.onCacheDownloading=null;
    app.Scripts=List.createArray();
    app.StyleSheets=List.createArray();

    for (iLcv=0; iLcv<scripts.length; iLcv++){
      sc = Scripts.createScript(scripts[iLcv].src, scripts[iLcv].name);
      app.Scripts.push(sc);
    }
    Scripts.addScripts(app.Scripts);

    app.onInitialized=(onInitialized==undefined)? null : onInitialized;
    for (var iLcv=0; iLcv<Uses.length; iLcv++) {
      if (Uses[iLcv]!=undefined) {
        var use=app.createUse(Uses[iLcv]);
        app.Uses.push(use);
      };
    };
    for (var iLcv=0; iLcv<Dependencies.length; iLcv++) {
      if (Dependencies[iLcv]!=undefined)
        app.createDependency(Dependencies[iLcv],false);
    };
    app.Free=function(){
      var app=this;
      var idx=AppKit.Apps.indexOf(app);
      if (idx!=-1) AppKit.Apps.splice(idx,1);
      app.Uses.length=0;
      app.Depencies.length=0;
      app=Objects.Release(app);
      return null;
    };
    AppKit.Apps.push(app);
    if (app.System==true) AppKit.SystemApps.push(app);

    AppKit.Loaded=false;

    return app;
  },
  createApps:function(){
    var lst=List.createArray();
    lst.Free=function(){
      var lst=this;
      while (lst.length>0) lst[0].Free();

      lst=Objects.Release(lst);
      return null;
    };
    lst.getApp=function(Name){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var app=lst[iLcv];
        if (app.Title.Short==Name)
          return app;
      };
      return null;
    };
    lst.Add=function(app){
      var idx=this.indexOf(app);
      if (idx==-1)
        this.push(app);
    };
    lst.vdmStarted=function(){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var app=lst[iLcv];
        if (app.onVDMStarted)
          app.onVDMStarted(app);
      };
    };
    lst.vdmStopped=function(){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var app=lst[iLcv];
        if (app.onVDMStopped)
          app.onVDMStopped(app);
      };
    };
    lst.ScreensTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.ScreensTimer.AutoReset=true;
    lst.ScreensTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.ScreensTimer.onExecute=function(){
      var lst=this.Owner;
      var iCount=0, iMaster=0, App=null;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        App=lst[iLcv];
        if (
          (App.Loaded==true) &&
          (App.Initialized==true)
        ) {
          if (App.Screen) iMaster+=1;
          if (
            (App.processScreenCreated!=true) &&
            (App.Screen) &&
            (App.Screen!=undefined)
            ) {
              App.processScreenCreated=true;
              App.Screen.ComponentState=App.ComponentState.Loaded;
              if (App.onScreenCreated)
                App.onScreenCreated(App);
              if ((App.processScreenCreated==true) && (App.ConsealAfterCreate==true))
                App.Screen.Conseal();
            };
          };
          if (App.processScreenCreated==true)
            iCount+=1;
      };
      if (iCount==iMaster) {
        this.setActive(false);
        AppKit.Loaded=true;
      };
    };

    lst.LoginTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.LoginTimer.AutoReset=true;
    lst.LoginTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.LoginTimer.onExecute=function(){
      var lst=this.Owner;
      var iCount=0;
      if ( AppKit.LoggedIn==true ) {
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var App=lst[iLcv];
          if (
            (App.Loaded==true) &&
            (App.Initialized==true) &&
            (App.processLoggedIn!=true)
          ) {
            App.processLoggedIn=true;
            if (App.onLogin)
              App.onLogin(App);
          };
          if (App.processLoggedIn==true)
            iCount+=1;
        };
        if (iCount==lst.length)
          this.setActive(false);
      };
    };

    lst.AuthorizingTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.AuthorizingTimer.AutoReset=true;
    lst.AuthorizingTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.AuthorizingTimer.onExecute=function(){
      var lst=this.Owner;
      if (AppKit.Verified==false) {
        var sApps=AppKit.SystemApps;
        for (var iLcv=0; iLcv<sApps.length; iLcv++){
          var App=sApps[iLcv];
          if (App.processAuthorizing!=true){
            App.processAuthorizing=true;
            if (App.onAuthorizing)
              App.onAuthorizing(App);
          };
        };
      } else {
        ict=0;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var App=lst[iLcv];
          if (App.processAuthorizing!=true){
            App.processAuthorizing=true;
            if (App.onAuthorizing)
              App.onAuthorizing(App);
            if (App.processAuthorizing==true) ict++;
          } else {
            ict++;
          };
        };
        if (ict==lst.length)
          this.setActive(false);
      };
    };

    lst.AuthorizedTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.AuthorizedTimer.AutoReset=true;
    lst.AuthorizedTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.AuthorizedTimer.onExecute=function(){
      var lst=this.Owner;
      if (AppKit.Verified==false) {
        var sApps=AppKit.SystemApps;
        for (var iLcv=0; iLcv<sApps.length; iLcv++){
          var App=sApps[iLcv];
          if (App.processAuthorized!=true){
            App.processAuthorized=true;
            if (App.onAuthorized)
              App.onAuthorized(App);
          };
        };
      } else {
        var ict=0;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var App=lst[iLcv];
          if (App.processAuthorized!=true){
            App.processAuthorized=true;
            if (App.onAuthorized)
              App.onAuthorized(App);
            if (App.processAuthorized==true) ict++;
          } else {
            ict++;
          };
        };
        if (ict==lst.length)
          this.setActive(false);
      };
    };
    lst.UnAuthorizedTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.UnAuthorizedTimer.AutoReset=true;
    lst.UnAuthorizedTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.UnAuthorizedTimer.onExecute=function(){
      var lst=this.Owner;
      var ict=0;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var App=lst[iLcv];
        if (App.processAuthorizationFailed!=true){
          App.processAuthorizationFailed=true;
          if (App.onAuthorizationFailed)
            App.onAuthorizationFailed(App);
          if (App.processAuthorizationFailed==true) ict++;
        } else {
          ict++;
        };
      };
      if (ict==lst.length)
        this.setActive(false);
    };

    lst.AuthenticatingTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.AuthenticatingTimer.AutoReset=true;
    lst.AuthenticatingTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.AuthenticatingTimer.onExecute=function(){
      var lst=this.Owner;
      if (AppKit.Verified==false) {
        var sApps=AppKit.SystemApps;
        for (var iLcv=0; iLcv<sApps.length; iLcv++){
          var App=sApps[iLcv];
          if (App.processAuthenticating!=true){
            App.processAuthenticating=true;
            if (App.onAuthenticating)
              App.onAuthenticating(App);

          };
        };
      } else {
        var ict=0;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var App=lst[iLcv];
          if (App.processAuthenticating!=true){
            App.processAuthenticating=true;
            if (App.onAuthenticating)
              App.onAuthenticating(App);
            if (App.processAuthenticating==true) ict++;
          } else {
            ict++;
          };
        };
        if (ict==lst.length)
          this.setActive(false);
      };
    };

    lst.AuthenticatedTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.AuthenticatedTimer.AutoReset=true;
    lst.AuthenticatedTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.AuthenticatedTimer.onExecute=function(){
      var lst=this.Owner;
      if (AppKit.Verified==false) {
        var sApps=AppKit.SystemApps;
        for (var iLcv=0; iLcv<sApps.length; iLcv++){
          var App=sApps[iLcv];
          if (App.processAuthenticated!=true){
            App.processAuthenticated=true;
            if (App.onAuthenticated)
              App.onAuthenticated(App);

          };
        };
      } else {
        var ict=0;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var App=lst[iLcv];
          if (App.processAuthenticated!=true){
            App.processAuthenticated=true;
            if (App.onAuthenticated)
              App.onAuthenticated(App);
            if (App.processAuthenticated==true) ict++;
          } else {
            ict++;
          };
        };
        if (ict==lst.length)
          this.setActive(false);
      };
    };

    lst.ScriptsTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.ScriptsTimer.AutoReset=true;
    lst.ScriptsTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.ScriptsTimer.setActive(true);
    lst.ScriptsTimer.onExecute=function(){
      let lst=this.Owner;
      let scripts = DOM.getAllScripts();
      let uncompiled=false;
      let script = null;
      let iInitialized=0;
      let unloaded = List.createArray();
      unloaded.Assign(AppKit.Scripts);

      for (iLcv=0; iLcv<scripts.length; iLcv++){
        script=scripts[iLcv];
        if (script.Compiled){
          if  (script.Initialized!=true){
            try {
              script.init();
              AppKit.Scripts.push(script);
              unloaded.Remove(script);
            } catch (err) {
              AppKit.logConsoleMessage("Script method (init) : "+script.Unit+" "+err.message);
            }
          } else {
            unloaded.Remove(script);
            iInitialized+=1;
          }
        } else {
          uncompiled=true;
          unloaded.push(script);
        }
      }        
      if (unloaded.length>0) {
        if (uncompiled || (DateTime.secondsBetween(DateTime.Now(),this.Activated)>10)){
          for (iLcv=0; iLcv<unloaded.length; iLcv++){
            AppKit.logConsoleMessage("Script method (init) unable to execute: "+unloaded[iLcv].Unit);
          }
          lst.ScriptsTimer.setActive(false);
        }
      } else if (iInitialized==scripts.length)  {
        AppKit.ScriptsLoaded=true;
        lst.ScriptsTimer.setActive(false);
      }

    };


    lst.ResourcesTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.ResourcesTimer.AutoReset=true;
    lst.ResourcesTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.ResourcesTimer.onExecute=function(){
      var lst=this.Owner;
      if (AppKit.Verified==false) {
        var sApps=AppKit.SystemApps;
        for (var iLcv=0; iLcv<sApps.length; iLcv++){
          var App=sApps[iLcv];
          if (App.processResourcesLoaded!=true){
            App.processResourcesLoaded=true;
            if (App.onResourcesLoaded)
              App.onResourcesLoaded(App);
          };
        };
      } else {
        var ict=0;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var App=lst[iLcv];
          if (App.processResourcesLoaded!=true){
            App.processResourcesLoaded=true;
            if (App.onResourcesLoaded)
              App.onResourcesLoaded(App);
            if (App.processResourcesLoaded==true) ict++;
          } else {
            ict++;
          };
        };
        if (ict==lst.length)
          this.setActive(false);
      };
    };

    lst.SplashTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.SplashTimer.AutoReset=true;
    lst.SplashTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.SplashTimer.onExecute=function(){
      var lst=this.Owner;
      if (AppKit.Verified==false) {
        var sApps=AppKit.SystemApps;
        for (var iLcv=0; iLcv<sApps.length; iLcv++){
          var App=sApps[iLcv];
          if (App.processSplashed!=true){
            App.processSplashed=true;
            if (App.onSplashed)
              App.onSplashed(App);
          };
        };
      } else {
        var ict=0;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var App=lst[iLcv];
          if (App.processSplashed!=true){
            App.processSplashed=true;
            if (App.onSplashed)
              App.onSplashed(App);
            if (App.processSplashed==true) ict++;
          } else {
            ict++;
          };
        };
        if (ict==lst.length)
          this.setActive(false);
      };
    };
    lst.PostBootTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.PostBootTimer.AutoReset=true;
    lst.PostBootTimer.FirstDelay=AppKit.CheckForLoad1;
    lst.PostBootTimer.onExecute=function(){
      var lst=this.Owner;
      var ict=0;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var App=lst[iLcv];
        if (App.processPostBoot!=true){
          App.processPostBoot=true;
          if (App.onPostBoot)
            App.onPostBoot(App);
          if (App.processPostBoot==true) ict++;
        } else {
          ict++;
        };
      };
      if (ict==lst.length)
        this.setActive(false);
    };


    lst.LoadTimer=AppKit.Timers.createItem(AppKit.CheckForLoad2,lst);
    lst.LoadTimer.AutoReset=true;
    lst.LoadTimer.FirstDelay=AppKit.CheckForLoad1;

    lst.LoadTimer.onExecute=function(){
      if (!document.body) return;
      if (AppKit.DocLoaded==false) return;

      var tmr=this;
      tmr.Interval=AppKit.CheckForLoad2;
      var apps=this.Owner;
      var iComplete=0;
      var iSystem=0;
      var units=AppKit.Units;
      var deps=AppKit.Dependencies;

      if (AppKit.SystemBooted==true){
        for (var iLcv=0; iLcv<apps.length; iLcv++){
          var app=apps[iLcv];
          if ( (app.Initialized==false) && (app.deferInit==null) )
            app.Initialized=true;
        };
      };

      for (var iLcv=0; iLcv<units.length; iLcv++) {
        var use=units[iLcv];
        if (use.Requested==false) {
            use.Requested=true;
            if ((use.PreLoaded==false) && (use.Loaded==false) ){
              switch (use.Kind) {
                  case (AppKit.ukJavaScript) : {
                    DOM.loadScript(
                      use,
                      use.Source,
                      function(){
                        var use=this.Owner;
                        use.Loaded=true;
                      },
                      function(){
                        var use=this.Owner;
                        use.Failed=true;
                        this.Failed=true;
                        console.log("AppKit.Unit("+use.Source+") failed to load JavaScript.");
                      }
                    );
                    break;
                  }
                  case (AppKit.ukStyleSheet) : {
                    DOM.loadStyle(
                      use,
                      use.Source,
                      function(){
                        var use=this.Owner;
                        use.Loaded=true;
                      },
                      function(){
                        var use=this.Owner;
                        use.Failed=true;
                        this.Failed=true;
                        console.log("AppKit.Unit("+use.Source+") failed to load style sheet.");
                      }
                    );
                    break;
                  }
              };
            } else {
              use.Loaded=true;
            };
        } else if ( (use.Loaded==false) && (use.App) && (use.Kind==AppKit.ukJavaScript) ) {
          AppKit.Units.setLoaded(use.App,use.Source);
        };
      };
      for (var iLcv=0; iLcv<deps.length; iLcv++) {
        var dep=deps[iLcv];
        if (dep.App) {
          if ( (dep.App.Initialized==false) && (dep.App.deferInit) && (dep.App.deferInit(dep.App)==true) ){
            dep.App.Initialized=true;
            if (dep.App.onInitDeferred)
              dep.App.onInitDeferred(dep.App);
          };
          if ( (dep.App.Initialized==true) ){
            if ( dep.Requested==false ) {
              dep.Requested=true;
              if ((dep.PreLoaded==false) && (dep.Loaded==false) ){
                switch (dep.Kind) {
                  case (AppKit.ukJavaScript) : {
                        DOM.loadScript(
                          dep,
                          dep.Source,
                          function(){
                            var dep=this.Owner;
                            dep.Loaded=true;
                            AppKit.Units.setLoaded(dep.App,dep.Source);
                          },
                          function(){
                            var dep=this.Owner;
                            dep.Failed=true;
                            this.Failed=true;
                            console.log("AppKit.Dependency("+dep.Source+") failed to load JavaScript.");
                          }
                        );
                    break;
                  };
                  case (AppKit.ukStyleSheet) : {
                    DOM.loadStyle(
                      dep,
                      dep.Source,
                      function(){
                        var dep=this.Owner;
                        dep.Loaded=true;
                      },
                      function(){
                        var dep=this.Owner;
                        dep.Failed=true;
                        this.Failed=true;
                        console.log("AppKit.Dependency("+dep.Source+") failed to load style sheet.");
                      }
                    );
                    break;
                  };
                };
              } else {
                dep.Loaded=true;
              };
            };
          };
        };
      };
      var iLoadCount=0;
      for (var iLcv=0; iLcv<apps.length; iLcv++){
        var app=apps[iLcv];
        if (app.Loaded==false) {
          if (
            (app.Failed==false) &&
            (app.Initializing==true) &&
            ( (app.Initialized==true) || ( (app.deferInit==null) ||  ( (app.deferInit) && (app.deferInit(app)==true)) )) &&
            (app.Uses.getLoaded()==app.Uses.length) &&
            (app.Uses.getAppsLoaded(app)==app.Uses.length) &&
            (app.Dependencies.getLoaded()==app.Dependencies.length)
          ){
            if (app.processInitialized!=true){
              app.processInitialized=true;
              app.Initialized=true;
              app.Initializing=false;
              if (app.onInitialized) app.onInitialized(app);

              iLoadCount+=1;
              if (iLoadCount>AppKit.maxAppLoadCount)
                return;

              if (app.System==true) {
                if ( (AppKit.CacheUpdating==true) && (app.onCacheDownloading) )
                  app.onCacheDownloading(app);
                return;
              };
            };
          } else if ( (app.Failed==false) && (app.Initialized==false) ) {
            if ( (app.Dependencies.getLoaded()==app.Dependencies.length) && (app.deferInit)){
              app.Initialized=app.deferInit(app);
            };
            app.Failed=(app.Initializing==false);
            app.Loaded=(app.Failed==true);
          };
        };
        if ( (app.Loaded==true) && (app.Initialized==true) ) {
          iComplete+=1;
          if (app.System==true)
            iSystem+=1;
        };
      };
      for (var iLcv=0; iLcv<AppKit.SystemApps.length; iLcv++){
        var app=AppKit.SystemApps[iLcv];
        if ( (app.System==true) && (app.onLoadProgress) )
          app.onLoadProgress(app,iComplete,apps.length);
      };
      if (  (  (AppKit.CacheUpdating==true) &&  (iSystem>=AppKit.SystemApps.length) )  ||  ( iComplete==apps.length) )
        tmr.setActive(false);
    };
    return lst;
  },

  Loaded:function(){
   var apps=AppKit.Apps;
   var ict=0;
   for (var iLcv=0; iLcv<apps.length; iLcv++){
     if (apps[iLcv].Loaded==true)
       ict+=1;
   };
   return (ict==apps.length);
  },
  PostBoot:function(){
    this.SystemBooted=true;
    this.Apps.PostBootTimer.setActive(true);
    this.Apps.ScreensTimer.setActive(true);
  },
  CacheDownloading:function(){
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     if (App.onCacheDownloading) App.onCacheDownloading(App);
   };
  },
  Startup:function(){
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     if (App.onStartup) App.onStartup(App);
   };
   this.PostBoot();
  },
  Shutdown:function(){
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     if (App.onShutdown) App.onShutdown(App);
   };
  },
  Splashed:function(){
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     App.processSplashed=false;
   };
   this.Apps.SplashTimer.setActive(true);
  },
  Authenticating:function(){
   this.Verified=false;
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     App.processAuthenticating=false;
   };
   this.Apps.AuthenticatingTimer.setActive(true);
  },
  Authenticated:function(){
   this.Verified=true;
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     App.processAuthenticated=false;
   };
   this.Apps.AuthenticatedTimer.setActive(true);
  },
  ResourceAdded:function(Resource){
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     if (App.onResourceAdded) App.onResourceAdded(App,Resource);
   };
  },
  ResourcesLoaded:function(){
   this.Apps.ResourcesTimer.setActive(true);
  },
  Authorizing:function(){
    this.CredsChecking=true;
    for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
      var App=this.Apps[iLcv];
      App.processAuthorizing=false;
    };
    this.Apps.AuthorizingTimer.setActive(true);
  },
  Authorized:function(){
    this.CredsRejected=false;
    this.CredsChecked=true;
    this.CredsChecking=false;
    this.Verified=true;
    for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
      var App=this.Apps[iLcv];
      App.processAuthorized=false;
    };
    this.Apps.AuthorizedTimer.setActive(true);
  },
  AuthorizationFailed:function(){
   this.CredsRejected=true;
   this.CredsChecked=true;
   this.CredsChecking=false;
   this.Verified=false;
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     App.processAuthorizationFailed=false;
   };
   this.Apps.UnAuthorizedTimer.setActive(true);
  },
  LoginFailed:function(){
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     if (App.onLoginFailed) App.onLoginFailed(App);
   };
  },
  Login:function(){
    if (this.LoggedIn==true) return;
    this.Verified=true;
    this.LoggedIn=true;
    this.Apps.LoginTimer.setActive(true);
  },
  Logout : function() {
   this.Verified=false;
   this.LoggedIn=false;
   for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
     var App=this.Apps[iLcv];
     if (App.onLogout) App.onLogout(App);
   };
  },
  WorkspaceResized:function(){
    for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
      var App=this.Apps[iLcv];
      if (App.onWorkspaceResized) App.onWorkspaceResized(App);
    };
  },
  Reload:function(){
    if (parent.location){
      if (AppKit.debugToConsole==true)
        console.log("AppKit.Reload (parent)");
      setTimeout(
          function(){
            parent.location.reload(DOM.Browser.MSIE!=true);
          },
          AppKit.ReloadDelay
        );
    } else {
      if (AppKit.debugToConsole==true)
        console.log("AppKit.Reload");
      setTimeout(
          function(){
            window.location.reload(DOM.Browser.MSIE!=true);
          },
          AppKit.ReloadDelay
      );
    };
  },
  logConsoleMessage:function(line){
    if (DOM!=undefined){
      if (!this.Console) this.Console = DOM.createConsoleLog();
      this.Console.writeLn(line);
    } else {
      console.log(line)
    }
  }
};

if (typeof(window)!='undefined') {
  if (window.applicationCache) {
    window.applicationCache.addEventListener(
      'noupdate',
      function(e) {
        if (AppKit.debugToConsole==true)
          console.log("window.applicationCache.noupdate");
        AppKit.CacheChecked=true;
        Cookies.setCookie(AppKit.cookieVersion,coVDM.Version.Build,coVDM.DaysToRememberVersion);
      },
      false
    );
    window.applicationCache.addEventListener(
      'downloading',
      function(e) {
        if (AppKit.debugToConsole==true)
          console.log("window.applicationCache.downloading");
        AppKit.Apps.LoadTimer.Interval=AppKit.CacheChecking;
        AppKit.CacheUpdating=true;
        var iBuild=Cookies.getCookieAsInt64(AppKit.cookieVersion);
        AppKit.CacheFirst=(iBuild==0);
        AppKit.CacheDownloading();
      },
      false
    );
    window.applicationCache.addEventListener(
      'updateready',
      function(e) {
        if (AppKit.debugToConsole==true)
          console.log("window.applicationCache.updateready.swapCache");
        window.applicationCache.swapCache();
        if (AppKit.debugToConsole==true)
          console.log("window.applicationCache.updateready.reload");
        AppKit.Reload();
      },
      false
    );
    window.applicationCache.addEventListener(
      'obsolete',
      function(e) {
        if (AppKit.debugToConsole==true)
          console.log("window.applicationCache.obsolete");
        AppKit.CacheObsolete=true;
      },
      false
    );
    window.applicationCache.addEventListener(
      'error',
      function(e) {
        if (AppKit.debugToConsole==true)
          console.log("window.applicationCache.error");
        AppKit.CacheError=true;
      },
      false
    );
    window.applicationCache.addEventListener(
      'cached',
      function(e) {
        if (AppKit.debugToConsole==true)
          console.log("window.applicationCache.cached");
        AppKit.Reload();
      },
      false
    );
    if (window.applicationCache.status==window.applicationCache.IDLE)
      AppKit.CacheChecked=true;
  } else {
      AppKit.CacheChecked=true;
  };
  if (window.attachEvent){
    window.attachEvent('onload', function(){ AppKit.processStyleSheets();},false);
  } else {
    window.addEventListener('load', function(){ AppKit.processStyleSheets();},false);
  };
} else {
  AppKit.CacheChecked=true;
};
AppKit.init();
