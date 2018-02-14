coVDM.App.Components.coSplash = {
  Version        : new Version(2014,11,5,85),
  Title          : new Title("VDM Core Splash Screen","Splash"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/splash/coSplash.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/splash/coSplash.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/splash/coSplash.js',
  debugToConsole : true,
  VDM            : null,
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
        '/core/vdm/splash/coSplash.css'
      ],
      this.onInitialized,
      coAppKit.AppSystem
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.Unit.App=this.App;
    this.App.ConsealAfterCreate=false;
    this.App.deferInit=function(App){
      return (coVDM.VDM.Torus!=undefined);
    };
    this.App.onAuthorizing=function(App){
      if (App.Screen){
        App.Screen.resetProgressBar();
        if (App.Screen.Hidden==false)
          App.Screen.Reveal();
        App.Screen.setStatus(coLang.Table.Apps.VDM.Status.Creds);
      } else{
        App.processAuthorizing=false;
      };
    };
    this.App.onLogin=function(App){
      if ((App.Screen) && (App.Screen.Visible==true)){
        App.Screen.Conseal();
      };
    };
    this.App.onLogout=function(App){
      App.Screen.unCheckAll();
      App.Screen.Panels.Progress.Control.maxValue=100;
      App.Screen.Panels.Progress.Control.Progress=100;
      App.Screen.Reveal();
      App.Screen.setStatus(coLang.Table.Apps.VDM.Status.getLoggedOut());
    };
    this.App.onAuthenticating=function(App){
      if (App.Screen){
        App.Screen.resetProgressBar();
        if (App.Screen.Hidden==false)
          App.Screen.Reveal();
        App.Screen.setStatus(coLang.Table.Apps.VDM.Status.Creds);
      } else{
        App.processAuthenticating=false;
      };
    };
    this.App.onAuthorized=function(App){
      if (
        (App.Screen) &&
        (typeof(coAccount)!=undefined) &&
        (coAccount.App) &&
        (coAccount.App.DB) &&
        (coAccount.App.DB.Loaded==true)
      ){
        App.Screen.checkCreds();
      } else {
        App.processAuthorized=false;
      };
    };
    this.App.onPostBoot=function(App){
      App.processPostBoot=false;
      if (App.Screen){
        App.Screen.checkBoot();
        App.processPostBoot=true;
      };
    };
    this.App.onAuthorizationFailed=function(App){
      if (App.Screen){
        App.Screen.Conseal();
      } else {
        App.processAuthorizationFailed=false;
      }
    };
    this.App.onAuthenticated=function(App){
      if (
        (App.Screen) &&
        (typeof(coAccount)!=undefined) &&
        (coAccount.App) &&
        (coAccount.App.DB) &&
        (coAccount.App.DB.Loaded==true)
      ){
        App.Screen.checkCreds();
      } else{
        App.processAuthenticated=false;
      };
    };
    this.App.onCacheDownloading=function(App){
      if (App.Screen){
        var sStatus= (coAppKit.CacheFirst==true) ? coLang.Table.VDM.Installing : coLang.Table.VDM.Updating;
        App.Screen.setStatus(sStatus);
      };
    };
    return this;
  },
  onInitialized:function(App){
    App.Screen=App.Unit.VDM.Splash=App.Unit.Create(App.Unit.VDM);
    App.onLoadProgress=function(App,iPosition,iTotal){
      App.Screen.Panels.Progress.Control.maxValue=iTotal;
      App.Screen.Panels.Progress.Control.setProgress(iPosition);
    };
    if (coAppKit.Verified==true)
      App.Screen.checkCreds();
    App.Loaded=true;
  },
  Create:function(aVDM){
    var ss=coAppScreens.createScreen(
      aVDM,
      "SplashScreen",
      "System",
      "Splash",
      "Welcome",
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Frameless,
      "bdrFrame",
      "bdrSplash",
      "bdrSplashFilm"
    );
    ss.Unit=this;
    ss.Cached=true;
    ss.DeviceLoaded=false;
    ss.CheckTotal=5;
    ss.Hidden=false;
    ss.Position=coApp.Position.Center;
    ss.State=coApp.State.Normal;
    ss.iconInApplications=false;
    ss.iconInTaskList=false;
    ss.AllowFullScreen=false;
    coDOM.setTransition(ss.Container,"opacity 1s");
    ss.Frame.Torus.Container.style.bottom="";
    ss.Frame.Torus.Container.style.top="15px";
    ss.Frame.zIndexFactor=coVDM.zFactorSplash;
    ss.Panels=coAppUI.App.Components.Panels.Create("Splash","SplashPanels",ss.Frame,ss,ss.Frame.Client,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);
    ss.Panels.Logo=ss.Panels.createItem("",ss.Panels.Kind.Image,"Logo","pnlSplashLogo",coAppUI.Alignment.Top);
    ss.Panels.Logo.setGlyph(coTheme.Icons.Logo.Dark.Cloud);
    ss.Panels.SplashItems=ss.Panels.createItem("",ss.Panels.Kind.Panels,"Splash Items","pnlSplashItems",coAppUI.Alignment.Top);
    ss.SplashItems=ss.Panels.SplashItems.Panels=coAppUI.App.Components.Panels.Create("Splash Items","pnlSplashItemsList",ss.Frame,ss.Panels.SplashItems,ss.Panels.SplashItems.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
    ss.SplashItems.Boot=ss.SplashItems.createItem("",ss.Panels.Kind.Label,"Boot","splashBoot",coAppUI.Alignment.Left);
    ss.SplashItems.Creds=ss.SplashItems.createItem("",ss.Panels.Kind.Label,"Creds","splashCreds",coAppUI.Alignment.Left);
    ss.SplashItems.Contacts=ss.SplashItems.createItem("",ss.Panels.Kind.Label,"Contacts","splashContacts",coAppUI.Alignment.Left);
    ss.SplashItems.Folders=ss.SplashItems.createItem("",ss.Panels.Kind.Label,"Folders","splashFolders",coAppUI.Alignment.Left);
    ss.Panels.Progress=ss.Panels.createProgressBar("","Progress","pnlSplashProgress",coAppUI.Alignment.Top);
    ss.Panels.Status=ss.Panels.createItem(coLang.Table.Apps.VDM.Status.Creds,ss.Panels.Kind.Label,"Status","pnlSplashStatus",coAppUI.Alignment.Top);
    ss.doAppCacheProgress=function(pe){
      var ss=this;
      try {
        if (pe.total){
          ss.Panels.Progress.Control.maxValue=pe.total;
          ss.Panels.Progress.Control.setProgress(pe.loaded);
        } else {
          ss.evtAppCacheProgress.setActive(false);
          ss.Panels.Progress.Control.maxValue=100;
          ss.Panels.Progress.Control.setProgress(100);
        };

      } catch (err){

      };
    };
    ss.evtAppCacheProgress=coEvents.Add(window.applicationCache,"progress",function(pe){ss.doAppCacheProgress(pe);},coEvents.NoCapture,coEvents.Active);
    ss.onShow=function(){
      coAppKit.Splashed();
      this.Container.style.opacity=1;
      if (coVDM.VDM.Running==true) {
        this.setStatus(coLang.Table.VDM.Initializing);
        this.Frame.Torus.Start();
        coVDM.VDM.WorkSpace.Button.setCollapsed(coLang.Table.Apps.VDM.Starting);
      } else {
        this.setStatus(coLang.Table.VDM.Shutdown);
      };
    };
    ss.onHide=function(){
      var ss=this;
    };
    ss._setStatus=ss.setStatus;
    ss.setStatus=function(sMessage){
      ss._setStatus(sMessage);
      ss.Panels.Status.Container.innerHTML=sMessage;
    };
    ss.resetProgressBar=function(){
      var ss=this;
      ss.Panels.Progress.Control.maxValue=ss.CheckTotal;
      ss.Panels.Progress.Control.setProgress(ss.getCheckCount());
    };
    ss.checkDevice=function(){
      var ss=this;
      ss.checkFolders();
      ss.checkContacts();
      ss.DeviceLoaded=true;
    };
    ss.checkBoot=function(){
      var ss=this;
      ss.SplashItems.Boot.Container.style.opacity=1;
      var bError=(coAppKit.CacheError==true);
      var s=coLang.Table.Apps.VDM.Status.getBootedText(bError);
      ss.setStatus(s);
      ss.progressCheck();
    };
    ss.checkCreds=function(){
      var ss=this;
      ss.SplashItems.Creds.Container.style.opacity=1;
      var sStatus=coLang.Table.Apps.VDM.Status.Welcome;
      sStatus=sStatus.replace("$User",coAccount.App.DB.MAP.First.Value);
      ss.setStatus(sStatus);
      ss.progressCheck();
    };
    ss.checkContacts=function(){
      var ss=this;
      ss.SplashItems.Contacts.Container.style.opacity=1;
      ss.setStatus(coLang.Table.Apps.VDM.Status.Contacts);
      ss.progressCheck();
    };
    ss.checkCache=function(){
      var ss=this;
      ss.Cached=true;
    };
    ss.checkFolders=function(){
      var ss=this;
      ss.SplashItems.Folders.Container.style.opacity=1;
      ss.setStatus(coLang.Table.Apps.VDM.Status.Folders);
      ss.resetProgressBar();
      ss.progressCheck();
    };
    ss.getCheckCount=function(){
      var iResult=0;
      if ( (ss.DeviceLoaded==true) || (coVDM.Credentials.ResourceID!=0))
        iResult++;
      if (ss.SplashItems.Creds.Container.style.opacity==1)
        iResult++;
      if (ss.SplashItems.Contacts.Container.style.opacity==1)
        iResult++;
      if (ss.SplashItems.Folders.Container.style.opacity==1)
        iResult++;
      if (ss.SplashItems.Boot.Container.style.opacity==1)
        iResult++;
      return iResult;
    };
    ss.allChecked=function(){
      var ss=this;
      return (ss.getCheckCount()==5);
    };
    ss.progressCheck=function(){
      var ss=this;
      var bReady = (
        (ss.Cached==true) &&
        ((ss.DeviceLoaded==true) || (coVDM.Credentials.ResourceID!=0)) &&
        (ss.SplashItems.Creds.Container.style.opacity==1) &&
        (ss.SplashItems.Boot.Container.style.opacity==1) &&
        (ss.SplashItems.Contacts.Container.style.opacity==1) &&
        (ss.SplashItems.Folders.Container.style.opacity==1)
      );
      if (bReady==true) coAppKit.Login();
      return bReady;
    };
    ss.unCheckCreds=function(){
      var ss=this;
      ss.SplashItems.Creds.Container.style.opacity=.25;
    };
    ss.unCheckBoot=function(){
      var ss=this;
      ss.SplashItems.Boot.Container.style.opacity=.25;
    };
    ss.unCheckContacts=function(){
      var ss=this;
      ss.SplashItems.Contacts.Container.style.opacity=.25;
    };
    ss.unCheckFolders=function(){
      var ss=this;
      ss.SplashItems.Folders.Container.style.opacity=.25;
    };
    ss.unCheckAll=function(){
      var ss=this;
      ss.unCheckCreds();
      ss.unCheckBoot();
      ss.unCheckContacts();
      ss.unCheckFolders();
    };
    ss._createItem=function(){
      var ss=this;
      var itm=coObject.Create();
      itm.Owner=ss;

      itm.Free=function(){
        var itm=this;
        itm=coObject.Release(itm);
        return null;
      };
      return itm;
    };
    return ss;
  }
};
coVDM.App.Components.coSplash.init(coVDM.VDM);
