var coAppKit = {
  Version        : new Version(2014,11,9,275),
  Title          : new Title("Aurawin Application Kit","coAppKit"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : null,
  debugToConsole : true,
  LoadUsesDelay  : 350,
  CheckForLoad1  : 900,
  CheckForLoad2  : 500,
  CacheChecking  : 500,
  cookieVersion  : 'AuVers',
  ErrorReloadDelay : 5000,
  ReloadDelay    : 250,
  Apps           : null,
  Units          : null,
  Dependencies   : null,
  AppSystem      : true,
  AppDefault     : false,
  PreLoaded      : true,
  DocLoaded      : false,
  ukStyleSheet   : 0,
  ukJavaScript   : 1,
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
  maxAppLoadCount : 2,

  SystemApps     : [],
  NoUses         : [],
  NoDependencies : [],
  Timers         : coTimers.createList(500),

  init           : function(){
    this.Units=this.createUnits();
    this.Dependencies=this.createDependencies();
    this.Header=this.Dependencies.Create(null,'/core/app/coAppKit.js',this.PreLoaded);
    this.Apps=this.createApps();
  },
  processStyleSheets : function(){
    var ss=document.styleSheets;
    for (var iLcv=0; iLcv<ss.length; iLcv++){
      s=ss[iLcv];
      rls=s.cssRules;
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
    this.DocLoaded=true;
  },
  getStyleSheets : function(){
    var Results=coList.Array();
    for (var iLcv=0; iLcv<this.Apps.length; iLcv++){
      var app=this.Apps[iLcv];
      for (var jLcv=0; jLcv<app.Dependencies.length; jLcv++){
        var dep=app.Dependencies[jLcv];
        if (dep.Kind==coAppKit.ukStyleSheet)
          Results.push(dep.Source);
      };
      for (var jLcv=0; jLcv<app.Uses.length; jLcv++){
        var use=app.Uses[jLcv];
        if (use.Kind==coAppKit.ukStyleSheet)
          Results.push(use.Source);
      };
    };
    return Results;
  },
  createApplication : function(Source,Title,Version,Vendor,Uses,Dependencies,onInitialized,System){
    if (System==undefined) System=false;
    var app=new coObject.Create();

    app.Class="App";
    app.Screen=null;
    app.Title=Title;
    app.Loaded=false;
    app.Initialized=false;
    app.Failed=false;
    app.System=System;
    app.Initializing=true;
    app.ConsealAfterCreate=true;
    app.Version=Version;
    app.Vendor=Vendor;
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
    app.Components=coObject.Create();
    app.Components.Class="Components";
    app.Dependencies=this.createDependencies();
    app.Dependencies.Owner=app;
    app.Uses=coList.Array();
    app.Uses.Owner=app;
    app.Uses.getLoaded=function(){
      var uses=this;
      var iCt=0;
      for (var iLcv=0; iLcv<uses.length; iLcv++){
        var use=uses[iLcv];
        if (use.Loaded==true) {
          iCt+=1;
        };
      };
      return iCt;
    };
    app.Uses.getAppsLoaded=function(app){
      var uses=this;
      var iCt=0;
      for (var iLcv=0; iLcv<uses.length; iLcv++){
        if (uses[iLcv].App) {
          if ( (uses[iLcv].App==app) || (uses[iLcv].App.Loaded==true) )
            iCt+=1;
        } else {
          // iCt+=1; // not bound yet
        };
      };
      return iCt;
    };
    app.createDependency=function(src){
      return coAppKit.Dependencies.Create(this,src,false);
    };
    app.createUse=function(src){
      var use=coAppKit.Units.Create(null,src,false);
      use.Apps.push(this);
      return use;

    };
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
      var idx=coAppKit.Apps.indexOf(app);
      if (idx!=-1) coAppKit.Apps.splice(idx,1);
      app.Uses.length=0;
      app.Depencies.length=0;
      app=coObject.Release(app);
      return null;
    };
    coAppKit.Apps.push(app);
    if (app.System==true) coAppKit.SystemApps.push(app);
    app.Use=this.Units.Create(app,Source);
    app.Use.Requested=true;
    app.Use.Loaded=true;
    coAppKit.Loaded=false;
    coAppKit.Apps.LoadTimer.setActive(true);
    coAppKit.Apps.ScreensTimer.setActive(true);
    return app;
  },
  createApps:function(){
    var lst=coList.Array();
    lst.Free=function(){
      var lst=this;
      while (lst.length>0) lst[0].Free();

      lst=coObject.Release(lst);
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
    lst.ScreensTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.ScreensTimer.Owner=lst;
    lst.ScreensTimer.AutoReset=true;
    lst.ScreensTimer.FirstDelay=coAppKit.CheckForLoad1;
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
              App.Screen.ComponentState=coApp.ComponentState.Loaded;
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
        coAppKit.Loaded=true;
      };
    };

    lst.LoginTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.LoginTimer.Owner=lst;
    lst.LoginTimer.AutoReset=true;
    lst.LoginTimer.FirstDelay=coAppKit.CheckForLoad1;
    lst.LoginTimer.onExecute=function(){
      var lst=this.Owner;
      var iCount=0;
      if ( coAppKit.LoggedIn==true ) {
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

    lst.AuthorizingTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.AuthorizingTimer.Owner=lst;
    lst.AuthorizingTimer.AutoReset=true;
    lst.AuthorizingTimer.FirstDelay=coAppKit.CheckForLoad1;
    lst.AuthorizingTimer.onExecute=function(){
      var lst=this.Owner;
      if (coAppKit.Verified==false) {
        var sApps=coAppKit.SystemApps;
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

    lst.AuthorizedTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.AuthorizedTimer.Owner=lst;
    lst.AuthorizedTimer.AutoReset=true;
    lst.AuthorizedTimer.FirstDelay=coAppKit.CheckForLoad1;
    lst.AuthorizedTimer.onExecute=function(){
      var lst=this.Owner;
      if (coAppKit.Verified==false) {
        var sApps=coAppKit.SystemApps;
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
    lst.UnAuthorizedTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.UnAuthorizedTimer.Owner=lst;
    lst.UnAuthorizedTimer.AutoReset=true;
    lst.UnAuthorizedTimer.FirstDelay=coAppKit.CheckForLoad1;
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

    lst.AuthenticatingTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.AuthenticatingTimer.Owner=lst;
    lst.AuthenticatingTimer.AutoReset=true;
    lst.AuthenticatingTimer.FirstDelay=coAppKit.CheckForLoad1;
    lst.AuthenticatingTimer.onExecute=function(){
      var lst=this.Owner;
      if (coAppKit.Verified==false) {
        var sApps=coAppKit.SystemApps;
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

    lst.AuthenticatedTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.AuthenticatedTimer.Owner=lst;
    lst.AuthenticatedTimer.AutoReset=true;
    lst.AuthenticatedTimer.FirstDelay=coAppKit.CheckForLoad1;
    lst.AuthenticatedTimer.onExecute=function(){
      var lst=this.Owner;
      if (coAppKit.Verified==false) {
        var sApps=coAppKit.SystemApps;
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

    lst.ResourcesTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.ResourcesTimer.Owner=lst;
    lst.ResourcesTimer.AutoReset=true;
    lst.ResourcesTimer.FirstDelay=coAppKit.CheckForLoad1;
    lst.ResourcesTimer.onExecute=function(){
      var lst=this.Owner;
      if (coAppKit.Verified==false) {
        var sApps=coAppKit.SystemApps;
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

    lst.SplashTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.SplashTimer.Owner=lst;
    lst.SplashTimer.AutoReset=true;
    lst.SplashTimer.FirstDelay=coAppKit.CheckForLoad1;
    lst.SplashTimer.onExecute=function(){
      var lst=this.Owner;
      if (coAppKit.Verified==false) {
        var sApps=coAppKit.SystemApps;
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
    lst.PostBootTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.PostBootTimer.Owner=lst;
    lst.PostBootTimer.AutoReset=true;
    lst.PostBootTimer.FirstDelay=coAppKit.CheckForLoad1;
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


    lst.LoadTimer=coAppKit.Timers.createItem(coAppKit.CheckForLoad2);
    lst.LoadTimer.Owner=lst;
    lst.LoadTimer.AutoReset=true;
    lst.LoadTimer.FirstDelay=coAppKit.CheckForLoad1;

    lst.LoadTimer.onExecute=function(){
      if (!document.body) return;
      if (coAppKit.DocLoaded==false) return;

      var tmr=this;
      tmr.Interval=coAppKit.CheckForLoad2;
      var apps=this.Owner;
      var iComplete=0;
      var iSystem=0;
      var units=coAppKit.Units;
      var deps=coAppKit.Dependencies;

      if (coAppKit.SystemBooted==true){
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
                  case (coAppKit.ukJavaScript) : {
                    coDOM.loadScript(
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
                        console.log("coAppKit.Unit("+use.Source+") failed to load JavaScript.");
                      }
                    );
                    break;
                  }
                  case (coAppKit.ukStyleSheet) : {
                    coDOM.loadStyle(
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
                        console.log("coAppKit.Unit("+use.Source+") failed to load style sheet.");
                      }
                    );
                    break;
                  }
              };
            } else {
              use.Loaded=true;
            };
        } else if ( (use.Loaded==false) && (use.App) && (use.Kind==coAppKit.ukJavaScript) ) {
          coAppKit.Units.setLoaded(use.App,use.Source);
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
                  case (coAppKit.ukJavaScript) : {
                        coDOM.loadScript(
                          dep,
                          dep.Source,
                          function(){
                            var dep=this.Owner;
                            dep.Loaded=true;
                            coAppKit.Units.setLoaded(dep.App,dep.Source);
                          },
                          function(){
                            var dep=this.Owner;
                            dep.Failed=true;
                            this.Failed=true;
                            console.log("coAppKit.Dependency("+dep.Source+") failed to load JavaScript.");
                          }
                        );
                    break;
                  };
                  case (coAppKit.ukStyleSheet) : {
                    coDOM.loadStyle(
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
                        console.log("coAppKit.Dependency("+dep.Source+") failed to load style sheet.");
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
              if (iLoadCount>coAppKit.maxAppLoadCount)
                return;

              if (app.System==true) {
                if ( (coAppKit.CacheUpdating==true) && (app.onCacheDownloading) )
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
      for (var iLcv=0; iLcv<coAppKit.SystemApps.length; iLcv++){
        var app=coAppKit.SystemApps[iLcv];
        if ( (app.System==true) && (app.onLoadProgress) )
          app.onLoadProgress(app,iComplete,apps.length);
      };
      if (  (  (coAppKit.CacheUpdating==true) &&  (iSystem>=coAppKit.SystemApps.length) )  ||  ( iComplete==apps.length) )
        tmr.setActive(false);
    };
    return lst;
  },
  createDependencies: function(){
    var lst=coList.Array();
    lst.Create=function(app,src,loaded){
      var lst=this;

      var dep=lst.Find(src);
      if (!dep) {
        var sExt=coUtils.extractFileExt(src).toLowerCase();
        var dep=coObject.Create();
        dep.App=app;
        dep.Apps=coList.Array();

        dep.Apps.Add=function(App){
          var idx=this.indexOf(App);
          if (idx==-1)
            this.push(App);
        };
        dep.Class="Dependency";
        dep.Source=src;
        dep.Requested=false;
        dep.Loaded=(loaded==undefined) ? false : loaded;
        dep.PreLoaded=(loaded!=undefined) ? loaded : false;
        dep.Kind= (sExt=="css") ? coAppKit.ukStyleSheet : coAppKit.ukJavaScript;
        lst.Add(dep);
      } else if (dep.App==null){
        dep.App=app;
      };
      if (loaded!=undefined) dep.PreLoaded=(dep.PreLoaded || loaded);
      if (dep.PreLoaded==true)
        dep.Loaded=true;
      if (app){
        app.Dependencies.Add(dep);
        dep.Apps.Add(app);
      };
      return dep;
    };
    lst.Add=function(dep){
      var idx=this.indexOf(dep);
      if (idx==-1)
        this.push(dep);
    };
    lst.Find=function(src){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        if (lst[iLcv].Source==src)
          return lst[iLcv];
      };
      return null;
    };
    lst.styleSheets=coList.Array();
    lst.getLoaded=function(){
      var deps=this;
      var iCt=0;
      for (var iLcv=0; iLcv<deps.length; iLcv++){
        var dep=deps[iLcv];
        if (dep.Loaded==true) {
          iCt+=1;
        };/* else if (dep.Kind==coAppKit.ukJavaScript){
          dep.Loaded=coDOM.isJavaScriptLoaded(dep.Source);
        } else if (dep.Kind==coAppKit.ukStyleSheet){
          dep.Loaded=coDOM.isStyleSheetLoaded(dep.Source);
        };
        */
      };
      return iCt;
    };
    return lst;
  },
  createUnits : function(){
    var lst=coList.Array();
    lst.setLoaded=function(App,src){
      var lst=this;
      var use=null;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        if (lst[iLcv].Source==src) {
          use=lst[iLcv];
          use.App=App;
          use.Loaded=true;
          use.Requested=true;
        };
      };
      if (!use) {
        use=lst.Create(App,src);
        use.Loaded=true;
        use.Requested=true;
      };
      return use;
    };
    lst.Create=function(App,src,loaded){
      var lst=this;
      var use=lst.Find(src);
      if (!use) {
        var sExt=coUtils.extractFileExt(src).toLowerCase();
        var use=coObject.Create();
        use.App=App;
        use.Requested=false;
        use.Apps=coList.Array();
        use.Class="Use";
        use.Source=src;
        use.Loaded=false;
        use.PreLoaded=(loaded!=undefined)? loaded : false;
        use.Kind= (sExt=="css") ? coAppKit.ukStyleSheet : coAppKit.ukJavaScript;
        lst.push(use);
      } else if (use.App==null) {
        use.App=App;
      };
      if (App) {
        App.Uses.push(use);
        use.Apps.push(App);
      };
      return use;
    };
    lst.Find=function(Source){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var uLcv=lst[iLcv];
        if (uLcv.Source==Source)
          return uLcv;
      };
      return null;
    };
    return lst;
  },
  Loaded:function(){
   var apps=coAppKit.Apps;
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
      if (coAppKit.debugToConsole==true)
        console.log("coAppKit.Reload (parent)");
      setTimeout(
          function(){
            parent.location.reload(coDOM.Browser.MSIE!=true);
          },
          coAppKit.ReloadDelay
        );
    } else {
      if (coAppKit.debugToConsole==true)
        console.log("coAppKit.Reload");
      setTimeout(
          function(){
            window.location.reload(coDOM.Browser.MSIE!=true);
          },
          coAppKit.ReloadDelay
      );
    };
  }
};
if (typeof(window)!='undefined') {
  if (window.applicationCache) {
    window.applicationCache.addEventListener(
      'noupdate',
      function(e) {
        if (coAppKit.debugToConsole==true)
          console.log("window.applicationCache.noupdate");
        coAppKit.CacheChecked=true;
        coCookies.setCookie(coAppKit.cookieVersion,coVDM.Version.Build,coVDM.DaysToRememberVersion);
      },
      false
    );
    window.applicationCache.addEventListener(
      'downloading',
      function(e) {
        if (coAppKit.debugToConsole==true)
          console.log("window.applicationCache.downloading");
        coAppKit.Apps.LoadTimer.Interval=coAppKit.CacheChecking;
        coAppKit.CacheUpdating=true;
        var iBuild=coCookies.getCookieAsInt64(coAppKit.cookieVersion);
        coAppKit.CacheFirst=(iBuild==0);
        coAppKit.CacheDownloading();
      },
      false
    );
    window.applicationCache.addEventListener(
      'updateready',
      function(e) {
        if (coAppKit.debugToConsole==true)
          console.log("window.applicationCache.updateready.swapCache");
        window.applicationCache.swapCache();
        if (coAppKit.debugToConsole==true)
          console.log("window.applicationCache.updateready.reload");
        coAppKit.Reload();
      },
      false
    );
    window.applicationCache.addEventListener(
      'obsolete',
      function(e) {
        if (coAppKit.debugToConsole==true)
          console.log("window.applicationCache.obsolete");
        coAppKit.CacheObsolete=true;
      },
      false
    );
    window.applicationCache.addEventListener(
      'error',
      function(e) {
        if (coAppKit.debugToConsole==true)
          console.log("window.applicationCache.error");
        coAppKit.CacheError=true;
      },
      false
    );
    window.applicationCache.addEventListener(
      'cached',
      function(e) {
        if (coAppKit.debugToConsole==true)
          console.log("window.applicationCache.cached");
        coAppKit.Reload();
      },
      false
    );
    if (window.applicationCache.status==window.applicationCache.IDLE)
      coAppKit.CacheChecked=true;
  } else {
      coAppKit.CacheChecked=true;
  };
  if (window.attachEvent){
    window.attachEvent('onload', function(){ coAppKit.processStyleSheets();},false);
  } else {
    window.addEventListener('load', function(){ coAppKit.processStyleSheets();},false);
  };
} else {
  coAppKit.CacheChecked=true;
};
coAppKit.init();
