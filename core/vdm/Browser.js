VDM.Browser = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  debugToConsole : true,
  Compiled       : false,
  init: function(){
    this.Initialized=true;
  },
  VDM            : null,
  Create : function(vdm){
    var wb=coDOM.createBrowser();
    wb.Unit=this;
    var  sName= navigator.appName;
    wb.VDM=vdm;
    wb.allowsFocus=true;
    wb.ButtonSpacing=0;
    wb.AuthCookieDuration=0;
    wb.ShowTopBar=false;
    wb.Mouse=true;
    wb.vScrollDir=1;
    wb.WebKit=(typeof(WebKitTransitionEvent)=='function');
    wb.WYSIWYG=true;
    wb.Event=coObject.Create();
    wb.Event.mouseWheel= (!wb.FireFox) ? "mousewheel" : "DOMMouseScroll";
    wb.WindowState=coApp.State.Normal;
    wb.Parameters=coList.StringArray();
    var s=window.location.search;
    if ((s.length>0) && (s[0]=='?')) s=s.substr(1);
    wb.Parameters.fromString(s,'&');
    if (wb.Linux==true){
      coTheme.UI.Select.buttonWidth=28;
    };
    if (wb.Apple==true) {
      coTheme.UI.Select.buttonWidth=34;
      coTheme.UI.Select.fontSize=13;
    };
    if (wb.iOS) {
      coVDM.resizeDelay=550;
      wb.allowsFocus=false;
      wb.vScrollDir=-1;
      if (wb.iOS.Kind.isIphone==true){
        coAppKit.CheckForLoad2=1000;
        wb.ButtonSpacing=15;
        wb.AuthCookieDuration=1;
        coTheme.UI.Select.buttonWidth=14;
        wb.Mouse=false;
        wb.WindowState=coApp.State.Full;
        wb.WYSIWYG=false;
        coVDM.Display.Small=true;
        coVDM.MultiViewOffset=10;
        coVDM.SplashShowDelay=5000;
        coVDM.ListViewLoadMax=15;
        coVDM.ListViewResizeMax=15;

        coVDM.torusAutoShow=227;
        coVDM.vsFocusScrollToTop=false;

        coVDM.vsAutoScrollMS=10;

        coVDM.vsTravelSlow=32;
        coVDM.vsTravelFast=80;
        coVDM.vsTravelTurbo=180;

        coVDM.vsRadiusNeutral=20;
        coVDM.vsRadiusSlow=79;
        coVDM.vsRadiusFast=100;

        coVDM.vsAutoDecay=1700;
      };
    };
    if (coVDM.Display.Small==true){
      coVDM.BoxViewRightMargin=2;
      coVDM.BoxViewLeftMargin=2;
      coVDM.BoxViewNavMargin=2;
    };
    return wb;
  }
};
