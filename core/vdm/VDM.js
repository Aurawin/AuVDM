/*
unit /core/vdm/VDM.js

This unit provides the virtual desktop environment
that uses server core objects/commands and services.

*/
const VDM = {
  Version               : new Version(2018,4,12,458),
  Title                 : new Title("Virtual Desktop","VDM"),
  Vendor                : new Vendor("Aurawin", "Copyright (&copy;) 2011-2018.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit                  : '',
  Loaded                : true,
  debugToConsole        : false,
  Initialized           : false,
  debugToConsole        : true,
  Compiled              : false,

  App                   : null,
  Browser               : null,

  Node                  : null,
  Server                : null,
  Domain                : null,
  Service               : null,
  Daily                 : null,

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

  Credentials             : new Credentials("aurawin.com","","",""),
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
  
  DaysToRememberLogin     : 35,
  DaysToRememberVersion   : 1000,
  LoginFailureResetDelay  : 2000,

  FolderRefreshDepth      : 2,

  Manifest                : null,
  Console                 : null,
  Events                  : null,
  Instance                : null,

  init                    : function(){
    this.Initialized=true;

    if (this.Instance!=null) {
      alert("Cannot create duplicate Virtual Desktop Managers!");
      return;
    };
   
    this.App=AppKit.createApplication(
      this.Title,
      this.Version,
      this.Vendor,
      [
        {
          "src":"./vdm/Browser.js",
          "name":"VDM.Browser"
        }
      ],
      AppKit.NoStyleSheets,
      this.onInitialized,
      AppKit.AppSystem
    );

    this.App.deferInit=function(App){
      if (  (AppKit.CacheUpdating==true) && (VDM ) ) {
        VDM.Torus.Show();
        if (VDM.Splash) {
          VDM.Splash.setStatus(
            (AppKit.CacheObsolete==true) ? Lang.Table.Apps.VDM.Status.CacheUpdated : Lang.Table.Apps.VDM.Status.CacheInstall
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
      VDM.Loading=false;
    };
    this.App.onLogin=function(App){
      if ( (VDM.Devices) && (VDM.Devices.List.DB.Loaded==true)) {
        VDM.LogIn();
        VDM.Manifest.Read();
        VDM.Events.BeforeUnload.setActive(true);
      } else {
        App.processLoggedIn=false;
      };
    };
    this.App.onLogout=function(App){
      VDM.Events.BeforeUnload.setActive(false);
    };
    let _vdm=this;

    _vdm.Events=Objects.createNew("Events");
    _vdm.Running=true;
    _vdm.Resizing=false;
    _vdm.Devices=null;
    _vdm.Splash=null;
    _vdm.Login=null;
    _vdm.Status=null;
    _vdm.Console=null;
    _vdm.Alerts=null;

    _vdm.tmrResize=AppKit.Timers.createItem(this.resizeDelay);
    _vdm.tmrResize.Owner=_vdm;
    _vdm.tmrResize.RunOnce=true;
    _vdm.tmrResize.onExecute=function(){
      var vdm=this.Owner;
      vdm.setSize();
    };


    _vdm.onNetworkFailure=function(){
      var vdm=VDM;

      VDM.Status.Show(coLang.Table.Net.Failure,vdm.Login,vdm.Login.sldAuth.txtAccount);

      vdm.Login.Show();
      vdm.Login.DisableButtons();
      vdm.Login.Frame.Shake();
    };

    _vdm.Net=Net.init(
      this.Domain,
      this.NameSpace,
      this.Credentials,
      _vdm.onNetworkFailure
    );
  },
  Load:function (){
    var _vdm=this;
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
    _vdm.divFormat=document.createElement('div');
    document.body.appendChild(VDM.divFormat);
    _vdm.divFormat.className="divFormat";
    _vdm.divParse=document.createElement('div');
    document.body.appendChild(VDM.divParse);
    _vdm.divParse.className="divParse";
    _vdm.Torus=this.createTorus();

  },
  onInitialized:function(App){
    var _vdm=VDM;
    _vdm.Credentials.Auth=Cookies.getCookie(Net.fieldAuth);
    _vdm.Credentials.User=Cookies.getCookie(Net.fieldAccount);
    _vdm.Credentials.ResourceID=Cookies.getCookieAsInt64(Net.fieldRCID);
    if (VDM.Credentials.Auth)
      AppKit.CredsBooted=true;
    _vdm.Startup();
    _vdm.Components.Events.init(_vdm);
    _vdm.Status=VDM.App.Components.Status.Create(_vdm);
    _vdm.TopBar=VDM.App.Components.Topbar.Create(_vdm,_vdm.Container);
    _vdm.Screens.onCreated();
    _vdm.setSize();
    if ( (VDM.Credentials.Auth) && (VDM.Credentials.Auth.length>0) )
      _vdm.Authorize();
    App.Loaded=true;
  },
  Startup:function(){
    var _vdm=VDM;
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
        coEvents.TouchLock.Lock(VDM.TouchLock);
        vdm.Display.Update();
        vdm.Cover.style.width=vdm.Container.offsetWidth+"px";
        vdm.Cover.style.height=vdm.Container.offsetHeight+"px";
        VDM.Orientation.Current = (vdm.Container.offsetWidth>=vdm.Container.offsetHeight)? VDM.Orientation.Landscape : VDM.Orientation.Portrait;
        if (vdm.TopBar.Visible==true){
          vdm.TopBar.Container.style.top = "0px";
          vdm.TopBar.Container.style.left = "0px";
          vdm.TopBar.Container.style.width = vdm.Container.clientWidth + "px";
          vdm.TopBar.Clock.Container.style.left=vdm.TopBar.Container.clientWidth-vdm.ClockWidth-vdm.TopBar.Margin.Width+"px";
          vdm.TopBar.Clock.Container.style.width=VDM.ClockWidth+"px";
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
      if (VDM.Resizing==false)
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

      vdm.cmdAuthorize.Headers.Update(coNet.fieldAccount,VDM.Credentials.User);
      vdm.cmdAuthorize.Headers.Update(coNet.fieldAuth,VDM.Credentials.Auth);
      vdm.cmdAuthorize.reTry();
    };
    _vdm.Authenticate=function(){
      var vdm=this;
      coAppKit.Authenticating();
      vdm.cmdAuthenticate.Headers.Update(coNet.fieldAccount,VDM.Credentials.User);
      vdm.cmdAuthenticate.Headers.Update(coNet.fieldAuth,VDM.Credentials.Auth);
      vdm.cmdAuthenticate.reTry();
    };
    _vdm.SaveLogin=function(){
      var vdm=this;
      var rc=vdm.Devices.List.DB.getItemById(VDM.Credentials.ResourceID);
      var bSave=(rc) ? ( (rc.MAP.Flags.Value | VDM.API.coDevice.FLAG_SAVE_SESSION) == rc.MAP.Flags.Value) : false;
      if (bSave==true) {
        coCookies.setCookie(coNet.fieldRCID,VDM.Credentials.ResourceID,VDM.DaysToRememberLogin);
        coCookies.setCookie(coNet.fieldAuth,VDM.Credentials.Auth,VDM.DaysToRememberLogin);
        coCookies.setCookie(coNet.fieldAccount,VDM.Credentials.User,VDM.DaysToRememberLogin);
      } else {
        coCookies.setCookieTemp(coNet.fieldRCID,VDM.Credentials.ResourceID);
        coCookies.setCookieTemp(coNet.fieldAuth,VDM.Credentials.Auth);
        coCookies.setCookieTemp(coNet.fieldAccount,VDM.Credentials.User);
      };
    };
    _vdm.onAuthenticateFailed=function(cmd){
      coAppKit.LoginFailed();
    };
    _vdm.onAuthenticateComplete=function(cmd){
      var vdm=VDM;
      switch (cmd.Code) {
        case coNet.CO_STATUS_OK :
          VDM.API.coDevice.List.cmdList.reTry();
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
      var vdm=VDM;
      switch (cmd.Code) {
        case coNet.CO_STATUS_OK :
          VDM.Credentials.User=cmd.Headers.getValue(coNet.fieldAccount);
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
      VDM.NS_CO_LOGIN,
      VDM.NS_CC_AUTH,
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
      VDM.NS_CO_LOGIN,
      VDM.NS_CC_CREDS,
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
      var vdm=VDM;
      vdm.Cover.style.display="block";
      vdm.Cover.style.visibility="visible";
      vdm.Cover.style.zIndex=vdm.Screens.zIndex()+VDM.zFactorCover;
    };
    _vdm.coverOff=function(){
      var vdm=VDM;
      vdm.Cover.style.display="none";
      vdm.Cover.style.visibility="hidden";
    };
  },
  ScreenToClientX:function(elm){
    return coUtils.getOffsetLeft(elm,VDM.WorkSpace.Container);
  },
  ScreenToClientY:function(elm){
    return coUtils.getOffsetTop(elm,VDM.WorkSpace.Container);
  },
  createTorus : function(){
    var _tr=Objects.createNew("vdmTorus");
    _tr.Visible=false;
    _tr.Parent=this.Container;
    _tr.Container=document.createElement('div');
    _tr.Parent.appendChild(_tr.Container);
    _tr.Container.className=_tr.Class;
    _tr.Overlay=document.createElement('div');
    _tr.Container.appendChild(_tr.Overlay);
    _tr.Overlay.className=_tr.Class+"Overlay";
    _tr.Container.style.zIndex=VDM.zTorus;
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
DOM.addEvent(window,"load",function(){ VDM.Load();},false);
