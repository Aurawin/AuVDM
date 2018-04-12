/*
unit /core/vdm/coVDM.js

This unit provides the virtual desktop environment
that uses server core objects/commands and services.

*/
const VDM = {
  Version               : new Version(2018,3,7,457),
  Title                 : new Title("Virtual Desktop","coVDM"),
  Vendor                : new Vendor("Aurawin", "Copyright (&copy;) 2011-2018.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header                : coAppKit.Dependencies.Create(null,'/core/vdm/coVDM.js',coAppKit.PreLoaded),
  Usage                 : coAppKit.Units.Create(null,'/core/vdm/coVDM.js',coAppKit.PreLoaded),
  Unit                  : '/core/vdm/coVDM.js',
  Node                  : "{$i node_name}",
  Server                : "{$i node_address}",
  Domain                : "{$i domain_name}",
  Service               : "{$i node_service}",
  Daily                 : "{$i domain_name}"=="daily.aurawin.com",
  Secure                : window.location.protocol=="https:",
  NameSpace             : "/core/vdm",
  NS_CO_LOGIN           : "/core/login",
  NS_CC_CREDS           : "/creds",
  NS_CC_AUTH            : "/auth",
  NS_CC_LOGOUT          : "/logout",
  NS_MFST_READ          : "/mfst/r",
  NS_MFST_WRITE         : "/mfst/w",
  NS_RES_LOAD           : "/res/l",
  NS_GRPS_LIST          : "/grps/l",
  NS_GRPS_READ          : "/grps/r",
  NS_GRPS_WRITE         : "/grps/w",
  NS_GRPS_DELETE        : "/grps/d",
  NS_GRPS_ADD           : "/grps/a",
  NS_FLDS_LIST          : "/fldrs/l",
  NS_FLDS_ADD           : "/fldrs/a",
  NS_FLDS_RENAME        : "/fldrs/r",
  NS_FLDS_DEL           : "/fldrs/d",
  NS_FLDS_CLEAR         : "/fldrs/clr",
  NS_FLS_INSPECT        : "/fls/i",
  NS_FLS_LIST           : "/fls/l",
  NS_FLS_LIST_ALL       : "/fls/la",
  NS_FLS_LIST_WITH      : "/fls/lw",
  NS_FLS_ADD            : "/fls/a",
  NS_FLS_DELETE         : "/fls/d",
  NS_FLS_READ           : "/fls/r",
  NS_FLS_WRITE          : "/fls/w",
  NS_FLS_RENAME         : "/fls/rn",
  NS_FLS_COPY           : "/fls/c",
  NS_FLS_MOVE           : "/fls/m",
  NS_WPR_LIST_TILES     : "/wlpr/lt",
  NS_WPR_LIST_SCENES    : "/wlpr/ls",

  DownloadDelay         : 60000,

  URI_FILE_DOWNLOAD     : "/core/vdm?fls/dl&$id",
  URI_FILE_GET          : "/core/vdm?fls/get&$id",
  URI_FILE_SET_DATA     : "/core/vdm?fls/sed&$FolderId&$FileId",
  URI_FILE_GET_DATA     : "/core/vdm?fls/ged&$FolderId&$FileId",
  URI_FILE_ROTATE       : "/core/vdm?fls/rot&$id&$deg",
  URI_WALLPAPER_GET     : "/core/vdm?wlpr/g&$id",

  URI_FILE_STREAM       : "/core/vdm?fls/strm&$id",
  URI_FILE_TRANSFORM    : "/core/vdm?fls/tfm&$id",
  URI_FILE_PALMPRINT    : "/core/vdm?fls/plp&$id",

  Credentials             : new coCredentials("{$i domain_name}","","",""),
  Orientation             : new Orientation(),
  HintReset               : 5000,

  MenuItemHeight          : 22,
  MenuItemLineHeight      : 20,

  MenuSpacing             : 10,
  MenuSelectDelay         : 500,


  ButtonMargin            : 4,
  ImagesLoaded            : false,
  Display                 : null,
  Browser                 : null,
  debugToConsole          : false,
  divFormat               : null,
  divParse                : null,
  zFactorLogin            : 189,
  zFactorStatus           : 190,
  zFactorWelcome          : 191,
  zFactorTour             : 192,
  zFactorPolicies         : 193,
  zFactorMainMenu         : 194,
  zFactorTaskBar          : 195,
  zFactorDragDrop         : 196,
  zFactorScroll           : 197,
  zFactorCover            : 198,
  zFactorApps             : 199,
  resizeDelay             : 500,
  screenResizeDelay       : 250,
  screenLoadDelay         : 1000,
  zFactorMessageBox       : 1100,
  zFactorSplash           : 1200,
  zTorus                  : 11000,

  AutoResizeShowCaseDelay : 250,
  DropFilesZIndex         : 50,
  InputFocusDelay         : 3000,

  NotifyWidth             : 170,
  AlertMinWidth           : 300,
  AlertMinHeight          : 225,
  CaptionTapWindowMS      : 400,
  CaptionTapDelayMS       : 10,
  torusDelay              : 250,
  torusAutoShow           : 150,
  torusAutoHide           : 100,
  torusTimeout            : 2000,
  MultiViewOffset         : 40,
  wsMargin                : 20,

  vsResetMS               : 1000,
  vsShadow                : 4,
  vsAutoHide              : 1700,
  vsAutoScrollMS          : 100,
  vsAutoDecay             : 1000,
  vsAutoDecayWindow       : 5000,
  vsTouchStart            : 120,
  vsTrackRange            : 80,
  vsTrackMouseRange       : 25,

  vsBoxHeight             : 80,
  vsBoxWidth              : 10,
  vsBorderWidth           : 1,
  vsBoxBtnTravel          : 120,
  vsButtonWidth           : 6,
  vsButtonHeight          : 32,


  vsRadiusNeutral         : 25,
  vsRadiusSlow            : 50,
  vsRadiusFast            : 100,

  MouseMoveEnableDelay    : 2000,

  vsFocusScrollToTop      : true,
  vsFocusScrollTouchOnly  : true,
  vsScrollToTopOffset     : 25,
  vsFireFoxScrollFactor   : 10,

  vsTravelNeutral         : 0,
  vsTravelSlow            : 5,
  vsTravelFast            : 10,
  vsTravelTurbo           : 100,
  vsTrackLoopMax          : 3,

  vsAutoHideForEndTouch   : 500,
  vsScrollOverRun         : 30,

  vSplitResizeDelay       : 150,


  dndStartDelta           : 40,
  dndStartAllowY          : 8,
  dndStartTimeWindow      : 200,
  dragItemSpacing         : 4,
  dragItemSpacingTouch    : 47,

  clockRefreshMS          : 250,
  SplashShowDelay         : 2500,
  SplashHideDelay         : 1500,
  FocusLock               : 1000,
  TouchLock               : 2000,
  ScrollLock              : 1000,
  TouchMouseDelay         : 1000,
  TouchButtonDelay        : 2000,
  StatusMessageDelay      : 8000,
  ElementControlsDelay    : 5000,
  ElementSwitchDelay      : 2500,
  ElementStickyTool       : 250,
  SignupValidationDelay   : 500,
  ShowCaseButtonHeight    : 22,
  NavBarHeight            : 27,
  NavBarLineHeight        : 25,
  NavBarButtonHeight      : 25,
  NavBarConfirmButtonHeight : 23,
  NavBarItemHeight        : 25,
  NavBarInputHeight       : 18,
  HeaderHeight            : 24,
  FooterHeight            : 28,
  ButtonFilmSelect        : "#787238",
  ButtonSelectFont        : "#cfc87e",
  EditChangeNotifiyDelay  : 800,
  ListBoxWidth            : 120,
  ListBoxHeight           : 120,
  ListItemsMargin         : 2,
  ListItemMargin          : 2,
  ListItemHeight          : 25,
  ListItemLineHeight      : 23,
  ListViewAutoRefresh     : 250,
  ListViewSelectDelay     : 150,
  ListViewResizeDelay     : 150,
  ListViewResizePause     : 500,
  ListViewResizeDefer     : 1500,
  ListViewResizeMax       : 10,
  ListViewLoadDelay       : 150,
  ListViewLoadPause       : 1000,
  ListViewLoadMax         : 50,
  ListViewHeaderFontSize  : 12,
  ListViewItemFontSize    : 12,
  ListItemScrollDelay     : 400,
  BoxViewLeftMargin       : 80,
  BoxViewRightMargin      : 80,
  BoxViewNavMargin        : 21,
  ListItemAlternateOdd    : "rgba(255,255,255,0.2)",
  ListItemAlternateEven   : "rgba(250,250,250,0.1)",
  FooterLineHeight        : 28,
  MenuItemSelectDelay     : 50,
  TaskSwitchDelay         : 150,
  TaskBarHeight           : 48,
  TaskBarItemHeight       : 44,
  TaskBarIconHeight       : 32,
  TopBarHeight            : 28,
  ClockWidth              : 240,
  TimerIntervalManifest   : 2500,
  ToolbarHeightFull       : 55,
  ToolbarHeightLinear     : 40,
  ToolbarHeightBare       : 28,
  ToolbarHeightThin       : 34,
  ToolbarHeightThinLinear : 20,
  ToolbarButtonSizeThin   : 34,
  ToolbarButtonMargin     : 4,
  ToolbarTextHeight       : 22,
  PanelLabeledTextHeight  : 32,
  PanelLabeledComboHeight : 24,
  PanelLabelTextLabelHeight : 22,
  PanelLabelComboLabelHeight : 22,

  DaysToRememberLogin     : 35,
  DaysToRememberVersion   : 1000,
  LoginFailureResetDelay  : 2000,

  FolderRefreshDepth      : 2,

  Manifest                : null,
  Console                 : null,
  Events                  : null,
  Instance                : null,
  Exception               : function (err){
    if (this.Console)
      this.Console.Exception(err);
  },
  init                    : function(){
    if (this.Instance!=null) {
      alert("Cannot create duplicate Virtual Desktop Managers!");
      return;
    };
    this.App=AppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/App.js',
        '/core/app/AppUI.js',
        '/core/app/AppScreens.js',
        '/core/vdm/Startup.js'
      ],
      [
        '/core/vdm/VDM.css'
      ],
      this.onInitialized
    );
    this.API=this.App.Components;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.Components.Browser=null;
    this.App.Components.Display=null;
    this.App.deferInit=function(App){
      if (  (AppKit.CacheUpdating==true) && (VDM ) ) {
        VDM.Torus.Show();
        if (VDM.Splash) {
          VDM.Splash.setStatus(
            (AppKit.CacheObsolete==true) ? Lang.Table.Apps.VDM.Status.CacheUpdated : coLang.Table.Apps.VDM.Status.CacheInstall
          );
        };
      };
      return (coAppKit.CacheChecked==true);
    };
    this.App.onAuthenticated=function(App){

    };
    this.App.onAuthorized=function(App){

    };
    this.App.onPostBoot=function(App){
      coVDM.VDM.Loading=false;
    };
    this.App.onLogin=function(App){
      if ( (coVDM.VDM.Devices) && (coVDM.VDM.Devices.List.DB.Loaded==true)) {
        coVDM.VDM.LogIn();
        coVDM.Manifest.Read();
        coVDM.Events.BeforeUnload.setActive(true);
      } else {
        App.processLoggedIn=false;
      };
    };
    this.App.onLogout=function(App){
      coVDM.Events.BeforeUnload.setActive(false);
    };
    var _vdm=this.VDM=coObject.Create(coObject.relInline,coObject.cpyAsVar,"VDM");

    this.Events=_vdm.Events=coObject.Create(coObject.relInline,coObject.cpyAsVar,"Events");
    _vdm.Running=true;
    _vdm.Resizing=false;
    _vdm.Devices=null;
    _vdm.Splash=null;
    _vdm.Login=null;
    _vdm.Status=null;
    _vdm.Console=null;
    _vdm.Alerts=null;

    _vdm.tmrResize=coAppKit.Timers.createItem(this.resizeDelay);
    _vdm.tmrResize.Owner=_vdm;
    _vdm.tmrResize.RunOnce=true;
    _vdm.tmrResize.onExecute=function(){
      var vdm=this.Owner;
      vdm.setSize();
    };


    _vdm.onNetworkFailure=function(){
      var vdm=coVDM.VDM;

      coVDM.VDM.Status.Show(coLang.Table.Net.Failure,vdm.Login,vdm.Login.sldAuth.txtAccount);

      vdm.Login.Show();
      vdm.Login.DisableButtons();
      vdm.Login.Frame.Shake();
    };
    _vdm.Net=coNet.init(
      this.Domain,
      this.NameSpace,
      this.Credentials,
      _vdm.onNetworkFailure
    );
  },
  Load:function (){
    var _vdm=coVDM.VDM;
    _vdm.Container = document.getElementById('vdm');
    if (!_vdm.Container) {
      _vdm.Container=document.createElement('div');
      document.body.appendChild(_vdm.Container);
      _vdm.Container.className="vdm";
    };
    _vdm.Authenticated=false;
    _vdm.Parent=_vdm.Container.offsetParent;
    var html=document.getElementsByTagName('html')[0];
    html.style.overflow="hidden";
    window.scrollTo(0,0);

    document.body.style.margin="0";
    document.body.style.padding="0";
    document.body.style.overflow="hidden";
    coVDM.divFormat=document.createElement('div');
    document.body.appendChild(coVDM.divFormat);
    coVDM.divFormat.className="divFormat";
    coVDM.divParse=document.createElement('div');
    document.body.appendChild(coVDM.divParse);
    coVDM.divParse.className="divParse";
    _vdm.Torus=this.createTorus();

    this.App.Initialized=true;
  },
  onInitialized:function(App){
    var _vdm=coVDM.VDM;
    coVDM.Credentials.Auth=coCookies.getCookie(coNet.fieldAuth);
    coVDM.Credentials.User=coCookies.getCookie(coNet.fieldAccount);
    coVDM.Credentials.ResourceID=coCookies.getCookieAsInt64(coNet.fieldRCID);
    if (coVDM.Credentials.Auth)
      coAppKit.CredsBooted=true;
    coVDM.Startup();

    coVDM.App.Components.Events.init(_vdm);
    _vdm.Status=coVDM.App.Components.Status.Create(_vdm);
    _vdm.TopBar=coVDM.App.Components.Topbar.Create(_vdm,_vdm.Container);
    _vdm.Screens.onCreated();
    _vdm.setSize();
    if ( (coVDM.Credentials.Auth) && (coVDM.Credentials.Auth.length>0) )
      _vdm.Authorize();
    App.Loaded=true;
  },
  Startup:function(){
    var _vdm=coVDM.VDM;
    _vdm.Loading=true;

    if (window.statusBarHidden) window.statusBarHidden=true;

    if (window.menubar) window.menubar.visible = false;
    if (window.locationbar) window.locationbar.visible=false;
    this.VDM=_vdm;


    _vdm.LogIn=function(){
      var vdm=this;
      vdm.Authenticated=true;
      coNet.AutoLoad();
      vdm.SaveLogin();
      vdm.showDesktop();
      vdm.Torus.Stop();
      vdm.WorkSpace.Button.Disabled=false;
      vdm.WorkSpace.Button.Show();
   };
    _vdm.LogOut=function(){
      var vdm=this;
      vdm.Running=false;
      vdm.Authenticated=false;
      coCookies.deleteCookie(coNet.fieldAuth);
      coCookies.deleteCookie(coNet.fieldRCID);
      vdm.Screens.HideAll();
      coDB.onLogOut();
      coTimers.onLogOut();
      coAppUI.onLogOut();
      coAppKit.Logout();
      vdm.closeWorkSpace();
      coAppKit.Shutdown();
    };
    _vdm.setSize=function(){
      var vdm=this;
      vdm.Resizing=true;
      try {
        window.scrollTo(0,0);
        coEvents.TouchLock.Lock(coVDM.TouchLock);
        vdm.Display.Update();
        vdm.Cover.style.width=vdm.Container.offsetWidth+"px";
        vdm.Cover.style.height=vdm.Container.offsetHeight+"px";
        coVDM.Orientation.Current = (vdm.Container.offsetWidth>=vdm.Container.offsetHeight)? coVDM.Orientation.Landscape : coVDM.Orientation.Portrait;
        if (vdm.TopBar.Visible==true){
          vdm.TopBar.Container.style.top = "0px";
          vdm.TopBar.Container.style.left = "0px";
          vdm.TopBar.Container.style.width = vdm.Container.clientWidth + "px";
          vdm.TopBar.Clock.Container.style.left=vdm.TopBar.Container.clientWidth-vdm.ClockWidth-vdm.TopBar.Margin.Width+"px";
          vdm.TopBar.Clock.Container.style.width=coVDM.ClockWidth+"px";
        };
        vdm.WorkSpace.setSize();
        vdm.TopBar.Alerts.Container.style.width=vdm.TopBar.Container.clientWidth-vdm.TopBar.Clock.Container.clientWidth-vdm.TopBar.Margin.Width+"px";
        vdm.Screens.WorkspaceResized();
        coAppKit.WorkspaceResized();
        vdm.Resizing=false;
      } catch (err) {
        vdm.Resizing=false;
      };
    };
    _vdm.Resize=function(){
      if (coVDM.VDM.Resizing==false)
        this.tmrResize.setActive(true);
    };
    _vdm.closeWorkSpace=function(){
      var vdm=this;
      coAppKit.Apps.vdmStopped();
      vdm.Alerts.Clear;
      vdm.Alerts.Screen.Hide();
      vdm.TopBar.Hide();
      vdm.WorkSpace.Hide();
    };
    _vdm.showDesktop=function(){
      var vdm=this;

      if (vdm.Browser.ShowTopBar==true) {
        vdm.TopBar.Show();
      };
      vdm.WorkSpace.Show();
      vdm.setSize();
      coAppKit.Apps.vdmStarted();
    };
    _vdm.Authorize=function(){
      var vdm=this;

      coAppKit.Authorizing();

      vdm.cmdAuthorize.Headers.Update(coNet.fieldAccount,coVDM.Credentials.User);
      vdm.cmdAuthorize.Headers.Update(coNet.fieldAuth,coVDM.Credentials.Auth);
      vdm.cmdAuthorize.reTry();
    };
    _vdm.Authenticate=function(){
      var vdm=this;
      coAppKit.Authenticating();
      vdm.cmdAuthenticate.Headers.Update(coNet.fieldAccount,coVDM.Credentials.User);
      vdm.cmdAuthenticate.Headers.Update(coNet.fieldAuth,coVDM.Credentials.Auth);
      vdm.cmdAuthenticate.reTry();
    };
    _vdm.SaveLogin=function(){
      var vdm=this;
      var rc=vdm.Devices.List.DB.getItemById(coVDM.Credentials.ResourceID);
      var bSave=(rc) ? ( (rc.MAP.Flags.Value | coVDM.API.coDevice.FLAG_SAVE_SESSION) == rc.MAP.Flags.Value) : false;
      if (bSave==true) {
        coCookies.setCookie(coNet.fieldRCID,coVDM.Credentials.ResourceID,coVDM.DaysToRememberLogin);
        coCookies.setCookie(coNet.fieldAuth,coVDM.Credentials.Auth,coVDM.DaysToRememberLogin);
        coCookies.setCookie(coNet.fieldAccount,coVDM.Credentials.User,coVDM.DaysToRememberLogin);
      } else {
        coCookies.setCookieTemp(coNet.fieldRCID,coVDM.Credentials.ResourceID);
        coCookies.setCookieTemp(coNet.fieldAuth,coVDM.Credentials.Auth);
        coCookies.setCookieTemp(coNet.fieldAccount,coVDM.Credentials.User);
      };
    };
    _vdm.onAuthenticateFailed=function(cmd){
      coAppKit.LoginFailed();
    };
    _vdm.onAuthenticateComplete=function(cmd){
      var vdm=coVDM.VDM;
      switch (cmd.Code) {
        case coNet.CO_STATUS_OK :
          coVDM.API.coDevice.List.cmdList.reTry();
          coAppKit.Authenticated();
          break;
        default :
          coAppKit.LoginFailed();
          coCookies.deleteCookie(coNet.fieldAuth);
          coCookies.deleteCookie(coNet.fieldRCID);
          break;
      };
    };
    _vdm.onAuthorizeFailed=function(cmd){
      coAppKit.AuthorizationFailed();
    };
    _vdm.onAuthorizeComplete=function(cmd){
      var vdm=coVDM.VDM;
      switch (cmd.Code) {
        case coNet.CO_STATUS_OK :
          coVDM.Credentials.User=cmd.Headers.getValue(coNet.fieldAccount);
          coAppKit.Authorized();
          break;
        default :
          coCookies.deleteCookie(coNet.fieldAuth);
          coCookies.deleteCookie(coNet.fieldRCID);
          coAppKit.AuthorizationFailed();
          //vdm.Torus.Hide();
          break;
      };
    };
    _vdm.onBeforeUnload=function(e){
      e.returnValue=coLang.Table.VDM.ZoneWarning;
      return coLang.Table.VDM.ZoneWarning;
    };
    _vdm.Cover = document.createElement('div');

    _vdm.Container.appendChild(_vdm.Cover);
    _vdm.Cover.className="cvrVDM";

    _vdm.cmdAuthorize=_vdm.Net.Commands.createCommand(
      _vdm.Net,
      coVDM.NS_CO_LOGIN,
      coVDM.NS_CC_AUTH,
      coNet.NoData,
      _vdm.onAuthorizeComplete,
      _vdm.onAuthorizeFailed,
      _vdm.onAuthorizeFailed,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _vdm.cmdAuthenticate=_vdm.Net.Commands.createCommand(
      _vdm.Net,
      coVDM.NS_CO_LOGIN,
      coVDM.NS_CC_CREDS,
      coNet.NoData,
      _vdm.onAuthenticateComplete,
      _vdm.onAuthenticateFailed,
      _vdm.onAuthenticateFailed,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _vdm.coverOn=function(){
      var vdm=coVDM.VDM;
      vdm.Cover.style.display="block";
      vdm.Cover.style.visibility="visible";
      vdm.Cover.style.zIndex=vdm.Screens.zIndex()+coVDM.zFactorCover;
    };
    _vdm.coverOff=function(){
      var vdm=coVDM.VDM;
      vdm.Cover.style.display="none";
      vdm.Cover.style.visibility="hidden";
    };
  },
  ScreenToClientX:function(elm){
    return coUtils.getOffsetLeft(elm,coVDM.VDM.WorkSpace.Container);
  },
  ScreenToClientY:function(elm){
    return coUtils.getOffsetTop(elm,coVDM.VDM.WorkSpace.Container);
  },
  createTorus : function(){
    var _tr=coObject.Create();
    _tr.Unit=this;
    _tr.Class="vdmTorus";
    _tr.VDM=this.VDM;
    _tr.Visible=false;
    _tr.Parent=this.VDM.Container;
    _tr.Container=document.createElement('div');
    _tr.Parent.appendChild(_tr.Container);
    _tr.Container.className=_tr.Class;
    _tr.Overlay=document.createElement('div');
    _tr.Container.appendChild(_tr.Overlay);
    _tr.Overlay.className=_tr.Class+"Overlay";
    _tr.Container.style.zIndex=coVDM.zTorus;
    _tr.Show=function(){
       var tr=this;
       tr.Container.style.visibility="visible";
       tr.Container.style.display="block";
       tr.Visible=true;
    };
    _tr.Hide=function(){
       var tr=this;
       tr.Timer=0;
       tr.Visible=false;

       tr.Container.style.visibility="hidden";
       tr.Container.style.display="none";
    };
    _tr.Start=_tr.Show;
    _tr.Stop=_tr.Hide;
    return _tr;
  }
};
coVDM.init();
coDOM.addEvent(window,"load",function(){ coVDM.Load();},false);
