/*
unit /core/app/coApp.js

This unit provides the virtual desktop environment
that uses server core objects/commands and services.

*/
var coApp={
  Version        : new Version(2014,10,21,159),
  Title          : new Title("Aurawin Application Frames","coApp"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/app/coApp.js',
  debugToConsole : false,
  Parser         : coXML.createParser(),
  List           : new Array(),
  Timers         : coTimers.createList(500),
  // coAppScreens
  DragHandlers   : null,
  State          : new WindowState(),
  Position       : new WindowPosition(),
  ComponentState : new ComponentState(),
  ignoreSizing   : true,
  useSizing      : false,

  Data : function(){
    this.Drag=null;
    return this;
  },
  DragData: function(doBegin,doEnd,doDrag){

    _dd=this;
    _dd.TopBarHeight=0;
    _dd.beginDrag=doBegin;
    _dd.endDrag=doEnd;
    _dd.doDrag=doDrag;
    _dd.Size=new Size();
    _dd.Offset=new Point();
    _dd.Start=new Location();
    _dd.Mouse=new Point();

    _dd.evtTouchStart=null;
    _dd.evtMouseDown=null;

    _dd.evtTouchMove=coEvents.Add(window,"touchmove",_dd.doDrag,coEvents.Capture,coEvents.NoActivate);
    _dd.evtTouchEnd=coEvents.Add(window,"touchend",_dd.endDrag,coEvents.Capture,coEvents.NoActivate);
    _dd.evtMouseMove=coEvents.Add(window,"mousemove",_dd.doDrag,coEvents.Capture,coEvents.NoActivate);
    _dd.evtMouseUp=coEvents.Add(window,"mouseup",_dd.endDrag,coEvents.Capture,coEvents.NoActivate);

    _dd.toString=function(){
      var dd=_dd;
      var str="";
      return str.concat(
        " Size=",dd.Size.toString(),
        " Offset=",dd.Offset.toString(),
        " Start=",dd.Start.toString(),
        " Mouse=",dd.Mouse.toString()
      );
    };
    return this;

  },
  DragDrop : {
    Handlers : function(){
      this.List=new Array();
      this.Active=null;
      this.Enable=function(Frame){
          var hndlrs=this;
          var hndlr=null;
          if (hndlrs.Handler) {
            hndlr=new hndlrs.Handler(Frame);
            hndlr.Index=hndlrs.List.push(hndlr)-1;
          };
          return hndlr;
      };
      this.Handler=function(Frame){
          var hndlr=this;
          this.Index=-1;
          this.Data=null;
          this.Screen=Frame.Screen;
          this.Frame=Frame;
          this.onMaximize=function(){
            // taskbar VDM TODO
            var hndlr=this;
            hndlr.Screen.Maximize();
          };
          this.onMinimize=function(){
            // taskbar VDM TODO
            var hndlr=this;
            hndlr.Screen.Minimize();
          };
          this.onResize=function(){
            var hndlr=this;
            hndlr.Screen.setSize();
          };
          this.onRestore=function(){
            // taskbar VDM TODO
            var hndlr=this;
            hndlr.Screen.Restore();
          };
          this.onShow=function(){
            var hndlr=this;
            hndlr.Screen.Show();
          };
          return this;
      };
      return this;
    }
  },
  init           : function(){

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
    this.App.Initialized=true;

    this.DragHandlers = new coApp.DragDrop.Handlers();


    return this;
  },
  onInitialized:function(App){
    App.Loaded=true;
  },
  createFrameTitleBar: function(Frame){
    var tb=coObject.Create();
    tb.Visible=true;
    tb.Class="frameTitleBar";
    tb.dtClick=0;
    tb.Screen=Frame.Screen;

    tb.Frame=Frame;
    tb.Parent=Frame.Container;

    tb.Container=document.createElement('div');
    tb.Parent.appendChild(tb.Container);
    tb.Container.className="bdrTitleBar bdrTitleBarFilm";

    tb.Caption=document.createElement('div');
    tb.Container.appendChild(tb.Caption);
    tb.Caption.className="bdrCaption";
    coDOM.setText(tb.Caption,tb.Screen.Caption);

    tb.Caption.Data=new coApp.Data();

    tb.Caption.Data.Margin=new Margin();
    tb.Caption.Data.Padding=new Padding();
    tb.Caption.Data.Margin.Load(tb.Caption);
    tb.Caption.Data.Padding.Load(tb.Caption);

    tb.Close=document.createElement('div');
    tb.Container.appendChild(tb.Close);
    tb.Close.className="btnAppClose redGradient";
    coTheme.UI.screenCloseButton.Apply(tb.Close);

    tb.DodgeButton=function(){
      var tb=this;
      var btn=coVDM.VDM.WorkSpace.Button;
      var iX=tb.Screen.Container.offsetLeft;
      var iBias=
      (
        (btn.Visible==true) &&
        (tb.Screen.Container.offsetTop<=btn.Container.offsetHeight) &&
        (iX<=btn.Container.offsetWidth)
      ) ? (btn.Container.offsetWidth - iX) : 0;
      tb.Caption.style.marginLeft=iBias+"px";
      tb.Caption.style.width=tb.Frame.Container.clientWidth-(iBias+tb.Caption.Data.Padding.xBias()+tb.Close.offsetWidth)+"px";
    };
    tb.Show=function(){
      var tb=this;
      tb.Visible=true;
      tb.Caption.Data.Margin.Load(tb.Caption);
      tb.Container.style.visibility="visible";
      tb.Caption.style.visibility="visible";
      tb.Close.style.visibility="visible";
    };
    tb.Hide=function(){
      var tb=this;
      tb.Visible=false;
      tb.Container.style.visibility="hidden";
      tb.Caption.style.visibility="hidden";
      tb.Close.style.visibility="hidden";
    };
    tb.doDragEnd=function(e){
      coAppUI.ConsealediFrames.Enable();
      coAppUI.ConsealedPageViews.Enable();

      var tb=this;
      var src=tb.Caption;
      var dhData=src.Data.Drag;
      if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.doDragEnd "+coVDM.VDM.Console.divToString(src));
      setTimeout(
        function(){
          tb.dtClick=0;
          if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.doDragEnd - Reset Click Timer");
        },
        350
      );
      document.body.style.cursor="default";
      tb.Caption.style.cursor="default";
      tb.Frame.Top.style.cursor="n-resize";
      tb.Frame.Parent.style.cursor="default";

      tb.evtMouseMove.setActive(false);
      tb.evtMouseUp.setActive(false);


      coApp.DragHandlers.Active=null;
    };
    tb.doDoubleClick=function(){
      if (coVDM.VDM.Browser.WindowState==coApp.State.Full) return false;
      if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.doDoubleClick");
      var tb=this;
      tb.dtClick=0;
      if (tb.Screen.AllowSize==true) {
        switch (tb.Screen.State) {
          case coApp.State.Full :
            if (coVDM.VDM.Browser.WindowState!=coApp.State.Full)
              tb.Frame.setNormal();
            break;
          case coApp.State.Center:
            tb.Frame.setFull();
            break;
          case coApp.State.Normal:
            tb.Frame.setFull();
            break;
        };
      };
    };
    tb.doTouchStart=function(e){
      e = (e) ? e : window.event;
      var tb=this;
      if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
        coDOM.preventDefault(e);
        return true;
      };
      var dtStamp= +new Date();
      tb.dtClick=dtStamp;
      if (coApp.debugToConsole==true)
        coVDM.VDM.Console.Append("FrameTitleBar.Caption.ontouchstart");
      tb.evtTouchMove.setActive(true);
      tb.evtTouchEnd.setActive(true);
      return tb.doStartMove(e);
    };
    tb.doTouchEnd=function(e){
      e = (e) ? e : window.event;
      var tb=this;
      tb.evtTouchMove.setActive(false);
      tb.evtTouchEnd.setActive(false);

      if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
        coDOM.preventDefault(e);
        return true;
      };
      var dtStamp= +new Date();
      var diff= dtStamp - tb.dtClick;
      coDOM.preventDefault(e);
      if (diff<=350) {
        if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.doTouchEnd ondoubletap detected");
        tb.doDoubleClick(e);
      } else {
        if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.doTouchEnd diff threshold @"+diff);
      };
      if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.ontouchend ");
      tb.Caption.Data.Drag.endDrag(e);
      return true;
    };
    tb.doTouchMove=function(e){
      e = (e) ? e : window.event;
      if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
        coDOM.preventDefault(e);
        return true;
      };
      if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.ontouchmove ");
      return tb.Caption.Data.Drag.doDrag(e);
    };

    tb.doStartMove=function(e){
      coAppUI.iFrames.Disable();
      coAppUI.PageViews.Disable();

      var tb=this;
      if (e==undefined) e=window.event;
      if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
        coDOM.preventDefault(e);
        return true;
      };
      if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.doStartMove");

      var touch= ((e.touches) && (e.touches.length>0)) ?e.touches[e.touches.length-1]:null;

      coDOM.preventDefault(e);

      var oElem=tb.Frame.Screen.Container;
      var src=tb.Caption;
      var dhData=src.Data.Drag;
      coApp.DragHandlers.Active=tb.Frame.DragHandler;
      tb.Frame.DragHandler.Data=dhData;
      tb.Screen.Position=coApp.Position.TopLeft;


      dhData.Size.Width=tb.Screen.sizeInfo.Width;
      dhData.Size.Height=tb.Screen.sizeInfo.Height;

      dhData.Start.Top.Y=oElem.offsetTop;
      dhData.Start.Top.X=oElem.offsetLeft;
      dhData.Start.Bottom.Y=dhData.Start.Top.Y+dhData.Size.Height;
      dhData.Start.Bottom.X=dhData.Start.Top.X+dhData.Size.Width;



      tb.Screen.BringToTop();

      document.body.style.cursor="move";
      tb.Frame.Top.style.cursor="move";
      tb.Caption.style.cursor="move";
      tb.Frame.Parent.style.cursor="move";
      dhData.TopBarHeight=coVDM.VDM.TopBar.getHeight();

      if (touch) {
        if (coApp.debugToConsole==true) {
          coVDM.VDM.Console.Append(
            "".concat(
            "  FrameTitleBar.Caption.touches("+e.touches.length+")",
            " touch.clientX=",touch.clientX,
            " touch.clientY=",touch.clientY
          ));
        };

        dhData.Mouse.X = touch.clientX;
        dhData.Mouse.Y = touch.clientY;

        dhData.Offset.X = touch.clientX-tb.Screen.ClientToScreen(tb.Caption);
        dhData.Offset.Y = touch.pageY - dhData.Start.Top.Y;
      } else {
        if (coApp.debugToConsole==true) {
          coVDM.VDM.Console.Append(
            "".concat(
            "  FrameTitleBar.Caption.mouse",
            " e.clientX=",e.clientX,
            " e.clientY=",e.clientY
          ));
        };
        dhData.Mouse.X = e.clientX;
        dhData.Mouse.Y = e.clientY;
        dhData.Offset.X = e.clientX - dhData.Start.Top.X;
        dhData.Offset.Y = e.clientY - dhData.Start.Top.Y;
      };
    };
    tb.doMouseDown=function(e){
      if (e==undefined) e=window.event;
      if (coDOM.getButton(e)!=1) return;
      if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
        coDOM.preventDefault(e);
        return true;
      };
      var dtStamp= +new Date();
      var diff= dtStamp - tb.dtClick;
      if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.doMouseDown");
      if ((diff-coVDM.CaptionTapDelayMS>0) && (diff<=coVDM.CaptionTapWindowMS)) {
        if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.doMouseDown ondoubleclick detected");
        tb.doDoubleClick(e);
        coDOM.preventDefault(e);
      } else {
        tb.dtClick=dtStamp;
      };
      if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.Time difference "+ diff +" greater than "+ coVDM.CaptionTapWindowMS + " ms.");
      if ((tb.Screen.AllowMove==true) && (tb.Frame.Screen.State!=coApp.State.Full) ){
        tb.evtMouseMove.setActive(true);
        tb.evtMouseUp.setActive(true);
        return tb.doStartMove(e)
      };
      return true;
    };
    tb.Caption.Data.Drag=new coApp.DragData(// doBegin doEnd doDrag
      function(e){e = e ? e : window.event; tb.doMouseDown(e);},
      function(e){e = e ? e : window.event; tb.doDragEnd(e);},
      function(e) {

      var Handler=coApp.DragHandlers.Active=tb.Frame.DragHandler;

        //if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.Dragging (Enter) "+ Handler.Data.toString());

        e = e ? e : window.event;
        var src=tb.Caption;
        var dhData=src.Data.Drag;

        tb.Frame.DragHandler.Data=dhData;
        var Screen=Handler.Screen;
        var oElem = Screen.Container;
        var touch= ((e.touches) && (e.touches.length>0)) ?e.touches[e.touches.length-1]:null;
        if ( touch) {
          if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.Drag.touches("+e.touches.length+")");
          coDOM.preventDefault(e);
          //var iYBias=coUtils.getOffsetTop(oElem,coVDM.VDM.WorkSpace.Container);
          //var iXBias=coUtils.getOffsetLeft(oElem,coVDM.VDM.WorkSpace.Container)+src.offsetWidth;

          Handler.Data.Mouse.X = touch.clientX;
          Handler.Data.Mouse.Y = touch.clientY;

          //if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.Drag Touch "+ Handler.Data.toString());
        } else {
          Handler.Data.Mouse.X = (e.clientX) ? e.clientX : e.pageX;
          Handler.Data.Mouse.Y = (e.clientY) ? e.clientY : e.pageY;
          if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.Caption.Drag Mouse ");
        };

        if (Handler.Data.Mouse.Y<0) Handler.Data.Mouse.Y=0;
        if (Handler.Data.Mouse.Y>coVDM.VDM.WorkSpace.Size.Height) Handler.Data.Mouse.Y=coVDM.VDM.WorkSpace.Size.Height;
        if (Handler.Data.Mouse.X<0) Handler.Data.Mouse.X=0;
        if (Handler.Data.Mouse.X>coVDM.VDM.WorkSpace.Size.Width) Handler.Data.Mouse.X=coVDM.VDM.WorkSpace.Size.Width;

        var iTop =Handler.Data.Mouse.Y - Handler.Data.Offset.Y - Handler.Data.TopBarHeight;
        if (iTop<0) iTop=0;

        var iLeft = Handler.Data.Mouse.X -Handler.Data.Offset.X;


        oElem.style.left = iLeft + "px";
        try {
          oElem.style.top = iTop + "px";
        } catch (err) {
          if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("Exception: FrameTitleBar.Caption.Drag "+err);
        }
        if (coApp.debugToConsole==true) coVDM.VDM.Console.Append(
          "".concat(
            " FrameTitleBar.Caption.Dragging ",
            " iX=",iLeft,
            " iY=",iTop,
            Handler.Data.toString()
          )
        );
        Screen.sizeInfo.Top=iTop;
        Screen.sizeInfo.Left=iLeft;
        Screen.setPosition();
        return true;
      }
    );
    tb.evtMouseMove=coEvents.Add(window,"mousemove",tb.Caption.Data.Drag.doDrag,coEvents.Capture,coEvents.NoActivate);
    tb.evtMouseUp=coEvents.Add(window,"mouseup",tb.Caption.Data.Drag.endDrag,coEvents.Capture,coEvents.NoActivate);
    tb.evtMouseDown=coEvents.Add(tb.Caption,"mousedown",function(e){tb.doMouseDown(e);},coEvents.Capture,coEvents.Active);
    tb.evtTouchStart=coEvents.Add(tb.Caption,"touchstart",function(e){tb.doTouchStart(e);},coEvents.Capture,coEvents.Active);
    tb.evtTouchMove=coEvents.Add(window,"touchmove",function(e){tb.doTouchMove(e);},coEvents.Capture,coEvents.NoActivate);
    tb.evtTouchEnd=coEvents.Add(window,"touchend",function(e){tb.doTouchEnd(e);},coEvents.Capture,coEvents.NoActivate);

    tb.setSize=function(){
      var tb=this;
      var iWidth=tb.Frame.Container.clientWidth;
      var iHeight=tb.Caption.clientHeight;

      tb.Caption.style.width=iWidth-(tb.Caption.Data.Padding.xBias()+ tb.Close.offsetWidth)+"px";
      tb.Container.style.height=iHeight+"px";
    };
    tb.doCloseClick=function(e){
      var tb=this;
      if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("FrameTitleBar.doCloseClick");
      if (!e) e=window.event;
      coDOM.preventDefault(e);
      if (tb.Screen.AllowClose==true) {
        tb.Frame.Torus.Show();
        setTimeout(
          function(){
            tb.Screen.Close();
          },
          coVDM.torusAutoShow
        );
      }
      return true;
    };
    tb.doCloseTouchEnd=function(e){
      var tb=this;
      if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("Frame.TitleBar.doCloseTouchEnd");
      if (!e) e=window.event;
      coDOM.preventDefault(e);
      if (tb.Screen.AllowClose==true) {
        tb.Frame.Torus.Show();
        setTimeout(
           function() {
             tb.Screen.Close();
           },
           coVDM.torusAutoShow
        );
      };
      return true;
    };
    tb.evCloseClick=coEvents.Add(tb.Close,"mouseup",function(e){ tb.doCloseClick(e);},coEvents.Capture,coEvents.Active);
    tb.evCloseTouchEnd=coEvents.Add(tb.Close,"touchend",function(e){tb.doCloseTouchEnd(e);},coEvents.Capture,coEvents.Active);
    tb.setCaption=function(sCaption){
      var tb=this;
      coDOM.setText(tb.Caption,sCaption);
    };
    tb.Free=function(){
      var tb=this;
      tb.Close.EventList.Free();
      tb.Caption.EventList.Free();
      tb.Container.removeChild(tb.Close);
      tb.Container.removeChild(tb.Caption);
      tb.Parent.removeChild(tb.Container);

      tb.evtTouchMove.Free();
      tb.evtTouchEnd.Free();
      tb.evtMouseMove.Free();
      tb.evtMouseUp.Free();

      tb=coObject.Release(tb);
      return null;
    };
    return tb;
  },
  Wait:function(iMills,dtExpires,Lock){
    var
    dt=+new Date();
    dtNow=dt.setMilliseconds(0);
    cbHold=null;
    if (!iMills) iMills=50;
    if (!dtExpires) dtExpires = dt.setMilliseconds(iMills);
    if (!Lock) {
      cbHold=function(){
        return true;
      };
    } else {
      cbHold=function(){
        return (Lock.Locked==true);
      }
    }
    while ((dtNow<dtExpires) || (cbHold()==true)) {
      dt=+new Date();
      dtNow=dt.getTime();
    };
  },
  Assert           : function(sMessage){
    alert(sMessage);
  },
  coAppPosScale : function(aX,aY){
    this.X=aX;
    this.Y=aY;
    return this;
  },
  PopUpMode : function(Default){
    if (!Default) Default=0;
    this.Below=0;
    this.Above=1;
    this.Index=Default;
    return this;
  },
  Modal : function(Screen,PopUpComponent,PopUpMode){
    var _mdl=this;
    this.zIndexFactor=0;
    this.Screen=Screen;
    this.Scrolling=false;
    this.Parent=coVDM.VDM.WorkSpace.Client;
    this.Component=PopUpComponent;
    this.frameThickness=coTheme.UI.frameThicknessNormal;

    this.PopUpMode=PopUpMode;
    this.Wrapper=document.createElement('div');
    this.Parent.appendChild(this.Wrapper);
    this.Wrapper.className="mdlFrame";

    this.TopLeft=document.createElement('div');
    this.TopRight=document.createElement('div');
    this.Top=document.createElement('div');
    this.Left=document.createElement('div');
    this.Right=document.createElement('div');
    this.BottomLeft=document.createElement('div');
    this.BottomRight=document.createElement('div');
    this.Bottom=document.createElement('div');

    this.Wrapper.appendChild(this.TopLeft);
    this.Wrapper.appendChild(this.Top);
    this.Wrapper.appendChild(this.TopRight);
    this.Wrapper.appendChild(this.Left);
    this.Wrapper.appendChild(this.Right);
    this.Wrapper.appendChild(this.BottomLeft);
    this.Wrapper.appendChild(this.BottomRight);
    this.Wrapper.appendChild(this.Bottom);

    this.TopLeft.className="shdTopLeft";
    this.Top.className="shdTop";
    this.TopRight.className="shdTopRight";
    this.Left.className="shdLeft";
    this.Right.className="shdRight";
    this.BottomLeft.className="shdBottomLeft";
    this.BottomRight.className="shdBottomRight";
    this.Bottom.className="shdBottom";


    this.TopLeft.Data=new coApp.Data();
    this.Top.Data=new coApp.Data();
    this.TopRight.Data=new coApp.Data();
    this.Left.Data=new coApp.Data();
    this.Right.Data=new coApp.Data();
    this.BottomLeft.Data=new coApp.Data();
    this.BottomRight.Data=new coApp.Data();
    this.Bottom.Data=new coApp.Data();

    this.Container=document.createElement('div');
    this.Wrapper.appendChild(this.Container);
    this.Container.className="shdContainer";

    this.Client=document.createElement('div');
    this.Container.appendChild(this.Client);
    this.Client.className="bdrClient";
    this.Client.Owner=this;
    this.setFrameThickness=function(value){
      this.frameThickness=value;
      this.TopLeft.style.width=value+"px";
      this.TopLeft.style.height=value+"px";
      this.Top.style.height=value+"px";
      this.TopRight.style.width=value+"px";
      this.TopRight.style.height=value+"px";
      this.Left.style.width=value+"px";
      this.Right.style.width=value+"px";
      this.BottomLeft.style.width=value+"px";
      this.BottomLeft.style.height=value+"px";
      this.BottomRight.style.width=value+"px";
      this.BottomRight.style.height=value+"px";
      this.Bottom.style.height=value+"px";

      this.Container.style.top=value+"px";
      this.Container.style.left=value+"px";
      this.Container.style.right=value+"px";
      this.Container.style.bottom=value+"px";
    };

    this.AdjustBounds=function(pt){
       if (pt.X<0) pt.X=0;
       if (pt.Y<0) pt.Y=0;

       if (pt.Y>_mdl.Screen.Parent.offsetHeight) pt.Y=_mdl.Screen.Parent.offsetHeight;
       if (pt.X>_mdl.Screen.Parent.offsetWidth) pt.X=_mdl.Screen.Parent.offsetWidth;
    };

    this.Hide=function(){
      var frm=this;
      frm.Screen.Visible=false;
      frm.Parent.style.visibility="hidden";
      if (frm.Screen.Slides!=null) frm.Screen.Slides.Hide();
      if (frm.Screen.Panels!=null) frm.Screen.Panels.Hide();
    };
    this.evtMouseDown=coEvents.Add(
      this.Client,
      "mousedown",
      function(e){
        var frm=this.Owner;
        if (coVDM.VDM.Screens.Active!=frm.Screen) frm.BringToTop();
      },
      coEvents.NoCapture,
      coEvents.Activate
    );
    this.BringToTop=function(){
      var frm=this;
      if  ((coVDM.VDM.Screens.Active) && (coVDM.VDM.Screens.Active.Modal) ) {
        if (frm.Screen!=coVDM.VDM.Screens.Active) {
          coVDM.VDM.Screens.Active.Show();
          return;
        };
      };
      frm.Wrapper.style.zIndex=coVDM.VDM.Screens.zIndex()+frm.zIndexFactor;
    };
    this.Show=function(){
      var frm=this;
      frm.Visible=true;
      frm.setSize();
      frm.Wrapper.style.visibility="visible";
      frm.Wrapper.style.display="block";
      if (frm.Screen.Panels!=null) frm.Screen.Panels.Show();
    };
    this.setSize=function(){
      var frm=this;
      frm.Parent.style.width=frm.Screen.Width+"px";
      frm.Parent.style.height=frm.Screen.Height+"px";


      frm.TopRight.style.left=frm.Screen.Width - frm.frameThickness +"px";
      frm.Top.style.left=frm.frameThickness+"px";
      frm.Top.style.width=frm.Screen.Width - 2*frm.frameThickness +"px";
      frm.Left.style.top=frm.frameThickness+"px";
      frm.Left.style.height=frm.Screen.Height - 2*frm.frameThickness + "px";
      frm.Right.style.left=frm.Screen.Width - frm.TopRight.clientWidth + "px";
      frm.Right.style.top=frm.frameThickness+"px";
      frm.Right.style.height=frm.Screen.Height - 2*frm.frameThickness + "px";
      frm.BottomLeft.style.top=frm.Screen.Height - frm.frameThickness + "px";
      frm.BottomRight.style.left=frm.Screen.Width - frm.frameThickness + "px";
      frm.BottomRight.style.top=frm.Screen.Height - frm.frameThickness + "px";
      frm.Bottom.style.top=frm.Screen.Height - frm.frameThickness + "px";
      frm.Bottom.style.left=frm.frameThickness+ "px";
      frm.Bottom.style.width=frm.Screen.Width-2*frm.frameThickness+"px";



    };
    this.setFrameThickness(coTheme.UI.frameThicknessNormal);

    return this;
  },
  Frame : function (Screen) {
    this.vScrolls=new Array();
    this.Screen=Screen;
    this.Scrolling=false;
    this.DragHandler=null;
    this.Parent=Screen.Container;
    this.zIndexFactor=0;
    this.Sizing=false;
    this.frameThickness=coTheme.UI.frameThicknessNormal;


    this.Wrapper=document.createElement('div');
    this.Parent.appendChild(this.Wrapper);
    this.Wrapper.className="bdrFrame";

    this.TopLeft=document.createElement('div');
    this.TopRight=document.createElement('div');
    this.Top=document.createElement('div');
    this.Left=document.createElement('div');
    this.Right=document.createElement('div');
    this.BottomLeft=document.createElement('div');
    this.BottomRight=document.createElement('div');
    this.Bottom=document.createElement('div');

    this.Wrapper.appendChild(this.TopLeft);
    this.Wrapper.appendChild(this.Top);
    this.Wrapper.appendChild(this.TopRight);
    this.Wrapper.appendChild(this.Left);
    this.Wrapper.appendChild(this.Right);
    this.Wrapper.appendChild(this.BottomLeft);
    this.Wrapper.appendChild(this.BottomRight);
    this.Wrapper.appendChild(this.Bottom);

    this.TopLeft.className="bdrTopLeft";
    this.Top.className="bdrTop";
    this.TopRight.className="bdrTopRight";
    this.Left.className="bdrLeft";
    this.Right.className="bdrRight";
    this.BottomLeft.className="bdrBottomLeft";
    this.BottomRight.className="bdrBottomRight";
    this.Bottom.className="bdrBottom";



    this.TopLeft.Data=new coApp.Data();
    this.Top.Data=new coApp.Data();
    this.TopRight.Data=new coApp.Data();
    this.Left.Data=new coApp.Data();
    this.Right.Data=new coApp.Data();
    this.BottomLeft.Data=new coApp.Data();
    this.BottomRight.Data=new coApp.Data();
    this.Bottom.Data=new coApp.Data();

    this.Container=document.createElement('div');
    this.Wrapper.appendChild(this.Container);
    this.Container.className="bdrContainer bdrFilm";

    this.TitleBar=coApp.createFrameTitleBar(this);
    this.Client=document.createElement('div');
    this.Container.appendChild(this.Client);
    this.Client.className="bdrClient";
    this.Client.style.left="0px";
    this.Client.style.bottom="0px";
    this.Client.style.right="0px";
    this.Top.style.left=this.frameThickness+"px";
    this.Left.style.top=this.frameThickness+"px";
    this.Right.style.top=this.frameThickness+"px";
    this.Bottom.style.left=this.frameThickness+ "px";

    this.Torus=coAppUI.App.Components.Torus.Create(this,this,this.Container);

    this.setFrameThickness=function(value){
      this.frameThickness=value;

      this.Top.style.left=value+"px";
      this.Left.style.top=value+"px";
      this.Right.style.top=value+"px";
      this.Bottom.style.left=value+"px";


      this.TopLeft.style.width=value+"px";
      this.TopLeft.style.height=value+"px";
      this.Top.style.height=value+"px";
      this.TopRight.style.width=value+"px";
      this.TopRight.style.height=value+"px";
      this.Left.style.width=value+"px";
      this.Right.style.width=value+"px";
      this.BottomLeft.style.width=value+"px";
      this.BottomLeft.style.height=value+"px";
      this.BottomRight.style.width=value+"px";
      this.BottomRight.style.height=value+"px";
      this.Bottom.style.height=value+"px";

      this.Container.style.top=value+"px";
      this.Container.style.left=value+"px";
      this.Container.style.right=value+"px";
      this.Container.style.bottom=value+"px";
    };

    this.vScrolls.setSize=function(){
      var vss=this;
      for (var iLcv=0; iLcv<vss.length; iLcv=+1){
        var vs=vss[iLcv];
        vs.setSize();
      };
    };
    this.vScrolls.HideAll=function(){
      var vss=this;
      for (var iLcv=0; iLcv<vss.length; iLcv++){
        var vs=vss[iLcv];
        vs.Hide();
      };
    };
    this.setCaption=function(sCaption){
      var frm=this;
      frm.TitleBar.Screen.Caption=sCaption;
      coDOM.setText(frm.TitleBar.Caption,sCaption);
    };
    this.AdjustBounds=function(pt){
      var frm=this;
      if (pt.X<0) pt.X=0;
      if (pt.Y<0) pt.Y=0;

      if (pt.Y>frm.Screen.Parent.offsetHeight) pt.Y=frm.Screen.Parent.offsetHeight;
      if (pt.X>frm.Screen.Parent.offsetWidth) pt.X=frm.Screen.Parent.offsetWidth;
    };
    this.setDragEvents=function(){
      var frm=this;
      frm.doDragEnd=function(e){
        coAppUI.ConsealediFrames.Enable();
        coAppUI.ConsealedPageViews.Enable();

        if (e == undefined) e=window.event;
        var frm=this;
        if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
          coDOM.preventDefault(e);
          return true;
        };
        var dhData=frm.DragHandler.Data;
        dhData.evtMouseMove.setActive(false);
        dhData.evtTouchMove.setActive(false);
        dhData.evtMouseUp.setActive(false);
        dhData.evtTouchEnd.setActive(false);
        coApp.DragHandlers.Active=null;
        document.body.style.cursor="default";
        if (coApp.debugToConsole==true) coVDM.VDM.Console.Append(
          "".concat(
            "Frame.doDragEnd"
          )
        );
        return false;
      };
      frm.doDragBegin=function(e){
        coAppUI.iFrames.Disable();
        coAppUI.PageViews.Disable();

        if (e == undefined) e=window.event;
        var frm=this;
        if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
          coDOM.preventDefault(e);
          if (coApp.debugToConsole==true)
            coVDM.VDM.Console.Append("Frame.doDragBegin exiting");
          return true;
        };
        if ((frm.Screen.AllowSize==true) && (frm.Screen.State!=coApp.State.Full)) {
          if (coApp.debugToConsole==true)
            coVDM.VDM.Console.Append("Frame.doDragBegin "+coVDM.VDM.Console.divToString(frm.Container));

          var src=coDOM.srcElement(e);
          document.body.style.cursor=src.style.cursor;

          var dhData=src.Data.Drag;
          coApp.DragHandlers.Active=frm.DragHandler;
          frm.DragHandler.Data=dhData;
          var oElem=frm.Screen.Container;
          dhData.TopBarHeight=coVDM.VDM.TopBar.getHeight();

          var touch= ((e.touches) && (e.touches.length>0)) ?e.touches[e.touches.length-1]:null;

          if ( touch ) {
            dhData.Mouse.X = touch.clientX;
            dhData.Mouse.Y = touch.clientY;

            dhData.Size.Width=oElem.offsetWidth;
            dhData.Size.Height=oElem.offsetHeight;

            dhData.Start.Top.Y=oElem.offsetTop;
            dhData.Start.Top.X=oElem.offsetLeft;
            dhData.Start.Bottom.Y=dhData.Start.Top.Y+dhData.Size.Height;
            dhData.Start.Bottom.X=dhData.Start.Top.X+dhData.Size.Width;

            dhData.Offset.Y=touch.clientY - coVDM.ScreenToClientY(src);
            dhData.Offset.X=touch.clientX - coVDM.ScreenToClientX(src);

            frm.Screen.BringToTop();

            if (coApp.debugToConsole==true)
              coVDM.VDM.Console.Append("Frame.doDragBegin.Touch."+dhData.toString());



            dhData.evtTouchMove.setActive(true);
            dhData.evtTouchEnd.setActive(true);

          } else {
            dhData.Mouse.X = e.clientX;
            dhData.Mouse.Y = e.clientY;

            dhData.Size.Width=oElem.offsetWidth;
            dhData.Size.Height=oElem.offsetHeight;

            dhData.Start.Top.Y=oElem.offsetTop;
            dhData.Start.Top.X=oElem.offsetLeft;
            dhData.Start.Bottom.Y=dhData.Start.Top.Y+dhData.Size.Height;
            dhData.Start.Bottom.X=dhData.Start.Top.X+dhData.Size.Width;

            dhData.Offset.Y=0;
            dhData.Offset.Y=e.clientY - coVDM.ScreenToClientY(src);
            dhData.Offset.X=e.clientX - coVDM.ScreenToClientX(src);

            frm.Screen.BringToTop();

            if (coApp.debugToConsole==true)
              coVDM.VDM.Console.Append("Frame.doDragBegin.Mouse "+dhData.toString());


            dhData.evtMouseMove.setActive(true);
            dhData.evtMouseUp.setActive(true);
          };

          dhData.doDrag(e);

          return true;
        };
        return false;
      };
      frm.TopLeft.Data.Drag=new coApp.DragData(
        function(e){if (e == undefined) e=window.event; frm.doDragBegin(e);},
        function(e){if (e == undefined) e=window.event; frm.doDragEnd(e);},
        function(e) {
          if (e == undefined) e=window.event;
          if (coVDM.VDM.Browser.State==coApp.State.Full) {
            coDOM.preventDefault(e);
          };
          var Handler=coApp.DragHandlers.Active;
          if ((Handler!=null) && (frm.Screen.AllowSize==true) && (frm.Screen.State!=coApp.State.Full)) {
            var Screen=Handler.Screen;
            var Pos=new Point();
            var oElem = Screen.Container;

            var touch= ((e.touches) && (e.touches.length>0)) ?e.touches[e.touches.length-1]:null;
            if (touch){
              Handler.Data.Mouse.X = touch.clientX;
              Handler.Data.Mouse.Y = touch.clientY;
            } else {
              Handler.Data.Mouse.X = e.clientX;
              Handler.Data.Mouse.Y = e.clientY;
            };
            if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("Frame.TopLeft.DoDrag "+(Handler.Data.toString()));

            Pos.Y=Handler.Data.Mouse.Y - Handler.Data.Offset.Y - Handler.Data.TopBarHeight;
            Pos.X=Handler.Data.Mouse.X - Handler.Data.Offset.X;
            frm.AdjustBounds(Pos);

            oElem.style.left = Pos.X + "px";
            oElem.style.top = Pos.Y + "px";
            oElem.style.width=Handler.Data.Start.Bottom.X-Pos.X + "px";
            oElem.style.height=Handler.Data.Start.Bottom.Y-Pos.Y + "px";

            frm.Screen.setSize();
            return true;
          };
        }
      );
      frm.BottomLeft.Data.Drag=new coApp.DragData(
        function(e){if (e == undefined) e=window.event; frm.doDragBegin(e);},
        function(e){if (e == undefined) e=window.event; frm.doDragEnd(e);},
        function(e) {
          if (e == undefined) e=window.event;
          if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
            coDOM.preventDefault(e);
          };
          var Handler=coApp.DragHandlers.Active;
          if ((Handler!=null) && (frm.Screen.AllowSize==true) && (frm.Screen.State!=coApp.State.Full)) {
            var Screen=Handler.Screen;
            var Pos=new Point();
            var oElem = Screen.Container;


            Handler.Data.Mouse.X = e.clientX;
            Handler.Data.Mouse.Y = e.clientY;

            Pos.Y=Handler.Data.Mouse.Y - Handler.Data.TopBarHeight + Handler.Data.Offset.Y;

            Pos.X=Handler.Data.Mouse.X - Handler.Data.Offset.X;

            frm.AdjustBounds(Pos);

            oElem.style.left = Pos.X + "px";
            oElem.style.width=Handler.Data.Start.Bottom.X-Pos.X + "px";
            oElem.style.height=Pos.Y-Handler.Data.Start.Top.Y + "px";

            frm.Screen.setSize();

            return true;
          };
        }
      );
      frm.TopRight.Data.Drag=new coApp.DragData(
        function(e){if (e == undefined) e=window.event; frm.doDragBegin(e);},
        function(e){if (e == undefined) e=window.event;frm.doDragEnd(e);},
        function(e) {
          if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
            coDOM.preventDefault(e);
            return true;
          };
          var Handler=coApp.DragHandlers.Active;
          if ((Handler!=null) && (frm.Screen.AllowSize==true) && (frm.Screen.State!=coApp.State.Full)) {
            var Screen=Handler.Screen;
            var Pos=new Point();
            var oElem = Screen.Container;
            if (e == undefined) e=window.event;

            Handler.Data.Mouse.X = e.clientX;
            Handler.Data.Mouse.Y = e.clientY;

            Pos.Y=Handler.Data.Mouse.Y - Handler.Data.Offset.Y  - Handler.Data.TopBarHeight;
            Pos.X=Handler.Data.Mouse.X + Handler.Data.Offset.X;
            frm.AdjustBounds(Pos);

            oElem.style.top = Pos.Y + "px";
            oElem.style.width=Pos.X-Handler.Data.Start.Top.X + "px";
            oElem.style.height=Handler.Data.Start.Bottom.Y-Pos.Y + "px";

            if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("Frame.TopRight.DoDrag "+(Handler.Data.toString()));

            Screen.setSize();

            return true;
          };
        }
      );
      frm.BottomRight.Data.Drag=new coApp.DragData(
        function(e){if (e == undefined) e=window.event; frm.doDragBegin(e);},
        function(e){if (e == undefined) e=window.event; frm.doDragEnd(e);},
        function(e) {
          if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
            e.preventDefault();
            e.stopPropagation();
            e.cancelBubble=true;
            e.returnValue=true;
            return true;
          };
          var Handler=coApp.DragHandlers.Active;
          if ((Handler!=null) && (frm.Screen.AllowSize==true) && (frm.Screen.State!=coApp.State.Full)) {
            var Screen=Handler.Screen;
            var Pos=new Point();
            var oElem = Screen.Container;
            if (e == undefined) e=window.event;

            Handler.Data.Mouse.X = e.clientX;
            Handler.Data.Mouse.Y = e.clientY;

            Pos.Y=Handler.Data.Mouse.Y - Handler.Data.TopBarHeight + Handler.Data.Offset.Y;
            Pos.X=Handler.Data.Mouse.X + Handler.Data.Offset.X;
            frm.AdjustBounds(Pos);

            oElem.style.width=Pos.X-Handler.Data.Start.Top.X + "px";
            oElem.style.height=Pos.Y-Handler.Data.Start.Top.Y + "px";

            if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("Frame.BottomRight.DoDrag "+(Handler.Data.toString()));

            Screen.setSize();

            return true;
          };
        }
      );
      frm.Top.Data.Drag=new coApp.DragData(// doBegin doEnd doDrag
        function(e){if (e == undefined) e=window.event; frm.doDragBegin(e);},
        function(e){if (e == undefined) e=window.event; frm.doDragEnd(e);},
        function(e) {
          if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
            e.preventDefault();
            e.stopPropagation();
            e.cancelBubble=true;
            e.returnValue=true;
            return true;
          };
          var Handler=coApp.DragHandlers.Active;
          if ( (Handler!=null) && (frm.Screen.AllowSize==true) && (frm.Screen.State!=coApp.State.Full)) {

            var Screen=Handler.Screen;
            var Pos=new Point();
            var oElem = Screen.Container;
            if (e == undefined) e=window.event;

            Handler.Data.Mouse.X = e.clientX;
            Handler.Data.Mouse.Y = e.clientY;


            Pos.Y=Handler.Data.Mouse.Y - Handler.Data.Offset.Y - Handler.Data.TopBarHeight;

            frm.AdjustBounds(Pos);

            oElem.style.top = Pos.Y + "px";
            oElem.style.height=Handler.Data.Start.Bottom.Y-Pos.Y + "px";

            if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("Frame.Top.DoDrag "+(Handler.Data.toString()));

            Screen.setSize();

            return true;
          };
        }
      );
      frm.Left.Data.Drag=new coApp.DragData(// doBegin doEnd doDrag
        function(e){e = e ? e : window.event; frm.doDragBegin(e);},
        function(e){e = e ? e : window.event; frm.doDragEnd(e);},
        function(e) {
          if (e == undefined) e=window.event;
          if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
            coDOM.preventDefault(e);
            return true;
          };
          var Handler=coApp.DragHandlers.Active;
          if ((Handler!=null) && (frm.Screen.AllowSize==true) && (frm.Screen.State!=coApp.State.Full)) {
            var Screen=Handler.Screen;
            var Pos=new Point();
            var oElem = Screen.Container;


            Handler.Data.Mouse.X = e.clientX;
            Handler.Data.Mouse.Y = e.clientY;


            Pos.X=Handler.Data.Mouse.X - Handler.Data.Offset.X;
            frm.AdjustBounds(Pos);


            oElem.style.left = Pos.X + "px";
            oElem.style.width=Handler.Data.Start.Bottom.X-Pos.X + "px";
            frm.Screen.setSize();

            if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("Frame.Left.DoDrag "+(Handler.Data.toString()));

            return true;
          };
        }
      );
      frm.Right.Data.Drag=new coApp.DragData(// doBegin doEnd doDrag
        function(e){ if (e == undefined) e=window.event; frm.doDragBegin(e);},
        function(e){ if (e == undefined) e=window.event; frm.doDragEnd(e);},
        function(e) {
          var Handler=coApp.DragHandlers.Active;
          if ((Handler!=null) && (frm.Screen.AllowSize==true) && (frm.Screen.State!=coApp.State.Full)) {
            var Screen=Handler.Screen;
            var Pos=new Point();
            var oElem = Screen.Container;
            if (e == undefined) e=window.event;

            Handler.Data.Mouse.X = e.clientX;
            Handler.Data.Mouse.Y = e.clientY;

            Pos.X=Handler.Data.Mouse.X+Handler.Data.Offset.X;
            frm.AdjustBounds(Pos);

            oElem.style.width=Pos.X-Handler.Data.Start.Top.X + "px";
            Screen.setSize();

            if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("Frame.Right.DoDrag "+(Handler.Data.toString()));
            return true;
          };
        }
      );
      frm.Bottom.Data.Drag=new coApp.DragData(// doBegin doEnd doDrag
        function(e){if (e == undefined) e=window.event; frm.doDragBegin(e);},
        function(e){if (e == undefined) e=window.event; frm.doDragEnd(e);},
        function(e) {
          if (e == undefined) e=window.event;
          if (coVDM.VDM.Browser.WindowState==coApp.State.Full) {
            coDOM.preventDefault(e);
            return true;
          };
          var Handler=coApp.DragHandlers.Active;
          if ((Handler!=null) && (frm.Screen.AllowSize==true) && (frm.Screen.State!=coApp.State.Full)) {

            var Screen=Handler.Screen;
            var Pos=new Point();
            var oElem = Screen.Container;

            var touch=((e.touches) && (e.touches.length>0))? e.touches[e.touches.length-1] : null;
            if (touch) {
              Handler.Data.Mouse.X = touch.clientX;
              Handler.Data.Mouse.Y = touch.clientY;
              Pos.Y=Handler.Data.Mouse.Y - Handler.Data.TopBarHeight + Handler.Data.Offset.Y;
            } else {
              Handler.Data.Mouse.X = e.clientX;
              Handler.Data.Mouse.Y = e.clientY;

              Pos.Y=Handler.Data.Mouse.Y - Handler.Data.TopBarHeight + Handler.Data.Offset.Y;
            };
            frm.AdjustBounds(Pos);

            oElem.style.height=Pos.Y-Handler.Data.Start.Top.Y + "px";
            Screen.setSize();
            if (coApp.debugToConsole==true) coVDM.VDM.Console.Append("Frame.Bottom.DoDrag "+(Handler.Data.toString()));
            return true;
          };
        }
      );
    };
    this.TopLeft.style.cursor="nw-resize";
    this.Top.style.cursor="n-resize";
    this.TopRight.style.cursor="ne-resize";
    this.Right.style.cursor="e-resize";
    this.Left.style.cursor="w-resize";
    this.BottomLeft.style.cursor="sw-resize";
    this.Bottom.style.cursor="s-resize";
    this.BottomRight.style.cursor="se-resize";
    this.setDragEvents();
    this.DragHandler=coApp.DragHandlers.Enable(this);



    this.Shake=function(){
      var
      frm=this,
      aniStep=15,
      aniStepPause=40,
      aniDwell=10,
      Step=0,
      iLeft=frm.Parent.offsetLeft,
      iLeftStop=iLeft-50,
      iRightStop=iLeft+50,
      dtExpires=0,
      lkLcv=new Lock(frm.Parent.offsetLeft);

      frm.vScrolls.HideAll();

      cbGoLeft=function(){
        if (lkLcv.Index>iLeftStop) {
          frm.Parent.style.left=lkLcv.Index+"px";
          lkLcv.Index=lkLcv.Index-aniStep;
          setTimeout(cbGoLeft,aniStepPause);
        } else {
          lkLcv.Index=iLeftStop;
          frm.Parent.style.left=lkLcv.Index+"px";
          switch (Step) {
            case 0 : Step++; setTimeout(cbGoRight,aniDwell); break;
            case 2 : Step++; setTimeout(cbGoRight,aniDwell); break;
          };
        };
      };
      cbGoRight=function(){
        if (lkLcv.Index<iRightStop) {
          frm.Parent.style.left=lkLcv.Index+"px";
          lkLcv.Index=lkLcv.Index+aniStep;
          setTimeout(cbGoRight,aniStepPause);
        } else {
          lkLcv.Index=iRightStop;
          frm.Parent.style.left=lkLcv.Index+"px";
          switch (Step) {
            case 1 : Step++; setTimeout(cbGoLeft,aniDwell); break;
            case 3 : Step++; setTimeout(cbGoLeftToCenter,aniDwell); break;
          };
        };
      };
      cbGoLeftToCenter=function(){
        if (lkLcv.Index>iLeft) {
          frm.Parent.style.left=lkLcv.Index+"px";
          lkLcv.Index=lkLcv.Index-aniStep;
          setTimeout(cbGoLeftToCenter,aniStepPause);
        } else {
          lkLcv.Index=iLeft;
          frm.Parent.style.left=lkLcv.Index+"px";
        };
      };
      Step=0;
      cbGoLeft();
    };
    this.Hide=function(){
      var frm=this;
      frm.vScrolls.HideAll();
      frm.TitleBar.Hide();
      frm.Torus.Stop();
      frm.Screen.Visible=false;
      frm.Parent.style.visibility="hidden";
      if (frm.Screen.Panels!=null) frm.Screen.Panels.Hide();
      if (frm.Screen.Slides!=null) frm.Screen.Slides.Hide();
    };

    this.setEvents=function(){
      var frm=this;
      if (coVDM.VDM.Browser.WindowState!=coApp.State.Full ){
        var ddT=frm.Top.Data.Drag;
        var ddTL=frm.TopLeft.Data.Drag;
        var ddTR=frm.TopRight.Data.Drag;

        var ddB=frm.Bottom.Data.Drag;
        var ddBL=frm.BottomLeft.Data.Drag;
        var ddBR=frm.BottomRight.Data.Drag;

        var ddL=frm.Left.Data.Drag;
        var ddR=frm.Right.Data.Drag;


        if (!this.evtMouseDown) this.evtMouseDown=coEvents.Add(this.Client,"mousedown",function(e){if (coVDM.VDM.Screens.Active!=frm.Screen) frm.BringToTop();},coEvents.NoCapture,coEvents.Active);
        if (!this.evtTouchStart) this.evtTouchStart=coEvents.Add(this.Client,"touchstart",function(e){if (coVDM.VDM.Screens.Active!=frm.Screen) frm.BringToTop();},coEvents.NoCapture,coEvents.Active);

        if (!ddTL.evtMouseDown) ddTL.evtMouseDown=coEvents.Add(this.TopLeft,"mousedown",function(e){frm.TopLeft.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);
        if (!ddTL.evtTouchStart) ddTL.evtTouchStart=coEvents.Add(this.TopLeft,"touchstart",function(e){frm.TopLeft.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);

        if (!ddBL.evtMouseDown) ddBL.evtMouseDown=coEvents.Add(this.BottomLeft,"mousedown",function(e){frm.BottomLeft.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);
        if (!ddBL.evtTouchStart) ddBL.evtTouchStart=coEvents.Add(this.BottomLeft,"touchstart",function(e){frm.BottomLeft.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);

        if (!ddT.evtMouseDown) ddT.evtMouseDown=coEvents.Add(this.Top,"mousedown",function(e){frm.Top.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);
        if (!ddT.evtTouchStart) ddT.evtTouchStart=coEvents.Add(this.Top,"touchstart",function(e){frm.Top.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);

        if (!ddTR.evtMouseDown) ddTR.evtMouseDown=coEvents.Add(this.TopRight,"mousedown",function(e){frm.TopRight.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);
        if (!ddTR.evtTouchStart) ddTR.evtTouchStart=coEvents.Add(this.TopRight,"touchstart",function(e){frm.TopRight.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);

        if (!ddBR.evtMouseDown) ddBR.evtMouseDown=coEvents.Add(this.BottomRight,"mousedown",function(e){frm.BottomRight.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);
        if (!ddBR.evtTouchStart) ddBR.evtTouchStart=coEvents.Add(this.BottomRight,"touchstart",function(e){frm.BottomRight.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);

        if (!ddL.evtMouseDown) ddL.evtMouseDown=coEvents.Add(this.Left,"mousedown",function(e){frm.Left.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);
        if (!ddL.evtTouchStart) ddL.evtTouchStart=coEvents.Add(this.Left,"touchstart",function(e){frm.Left.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);

        if (!ddR.evtMouseDown) ddR.evtMouseDown=coEvents.Add(this.Right,"mousedown",function(e){frm.Right.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);
        if (!ddR.evtTouchStart) ddR.evtTouchStart=coEvents.Add(this.Right,"touchstart",function(e){frm.Right.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);

        if (!ddB.evtMouseDown) ddB.evtMouseDown=coEvents.Add(this.Bottom,"mousedown",function(e){frm.Bottom.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);
        if (!ddB.evtTouchStart) ddB.evtTouchStart=coEvents.Add(this.Bottom,"touchstart",function(e){frm.Bottom.Data.Drag.beginDrag(e);},coEvents.Capture,coEvents.Active);
      };
    };
    this.BringToTop=function(){
      var frm=this;
      if  ((coVDM.VDM.Screens.Active) && (coVDM.VDM.Screens.Active.Modal) ) {
        if (frm.Screen!=coVDM.VDM.Screens.Active) {
          coVDM.VDM.Screens.Active.Show();
          return;
        };
      };
      frm.TitleBar.DodgeButton();
    };
    this.Reveal=function(){
      var frm=this;
      frm.Parent.style.display="block";
      frm.Parent.style.visibility="visible";
    };
    this.Conseal=function(){
      var frm=this;
      frm.Torus.Stop();
      frm.Screen.Visible=false;
      frm.Parent.style.display="none";
      frm.Parent.style.visibility="hidden";
    };
    this.Show=function(){
      var frm=this;
      frm.vScrolls.HideAll();
      if ((coVDM.VDM.Browser.WindowState==coApp.State.Full) && (frm.Screen.AllowFullScreen==true)){
        frm.Screen.Position=coApp.Position.Full;
        frm.Screen.State=coApp.State.Full;
        frm.Screen.Container.style.left="0px";
        frm.Screen.Container.style.top="0px";
        frm.Screen.Width=coVDM.VDM.WorkSpace.Size.Width;
        frm.Screen.Height=coVDM.VDM.WorkSpace.Size.Height;
      };
      if (frm.Screen.Position==coApp.Position.Center) frm.setCenter();

      frm.TitleBar.DodgeButton();
      frm.Screen.Visible=true;

      frm.setSize();
      frm.setEvents();
      frm.Torus.Show();

      if (frm.Screen.State==coApp.State.Normal) frm.Screen.sizeInfo.Load(frm.Parent);

      frm.Parent.style.visibility="visible";
      frm.Parent.style.display="block";
      frm.TitleBar.Show();
      if (frm.Screen.Panels!=null) frm.Screen.Panels.Show();
      if (frm.Screen.Nav) frm.Screen.Nav.Show();
      frm.Torus.Hide(coVDM.torusAutoHide);
    };
    this.Center=function(){
      var frm=this;
      if (frm.Screen.Visible==false) {
        iDTWidth = coVDM.VDM.WorkSpace.Client.clientWidth;
        iDTHeight = coVDM.VDM.WorkSpace.Client.clientHeight;
        iDTLeft=Math.floor( iDTWidth/2 - (frm.Parent.clientWidth/2) );
         iDTTop=Math.floor( iDTHeight/2 - (frm.Parent.clientHeight/2) );
        frm.Parent.style.top=iDTTop+"px";
        frm.Parent.style.left=iDTLeft+"px";
      };
      frm.TitleBar.DodgeButton();
    };
    this.setNormal=function(){
      var frm=this;
      frm.Sizing=true;

      coDOM.clearTransition(frm.Screen.Container);

      frm.setFrameThickness(coTheme.UI.frameThicknessNormal);
      frm.Screen.Position=coApp.Position.TopLeft;
      frm.Screen.State=coApp.State.Normal;

      frm.Screen.Width=frm.Screen.sizeInfo.Width;
      frm.Screen.Height=frm.Screen.sizeInfo.Height;
      frm.setSize();

      $(frm.Screen.Container).animate(
        {
          left:frm.Screen.sizeInfo.Left+"px",
          top:frm.Screen.sizeInfo.Top+"px",
          width:frm.Screen.sizeInfo.Width+"px",
          height:frm.Screen.sizeInfo.Height+"px",
        },
        coTheme.UI.frameTransitionDelay,
        coTheme.UI.frameTransitionEase,
        function(){
          frm.Screen.setSize(coApp.ignoreSizing);
          frm.Screen.setPosition();
          frm.Screen.setSize();
          frm.TitleBar.DodgeButton();
          frm.Sizing=false;
          if (coTheme.UI.screenFade==true) {
            coDOM.setTransition(
              frm.Screen.Container,
              coTheme.UI.screenFadeTransition()
            );
          };
        }
      );

    };
    this.setFull=function(){
      var frm=this;
      frm.Sizing=true;

      coDOM.clearTransition(frm.Screen.Container);

      frm.Screen.Position=coApp.Position.Full;
      frm.Screen.State=coApp.State.Full;

      frm.Screen.Width=coVDM.VDM.WorkSpace.Size.Width;
      frm.Screen.Height=coVDM.VDM.WorkSpace.Size.Height;

      $(frm.Screen.Container).animate(
        { left:"0px", top:"0px", width:coVDM.VDM.WorkSpace.Size.Width+"px", height:coVDM.VDM.WorkSpace.Size.Height+"px"},
        coTheme.UI.frameTransitionDelay,
        coTheme.UI.frameTransitionEase,
        function(){
          frm.Screen.Width=coVDM.VDM.WorkSpace.Size.Width;
          frm.Screen.Height=coVDM.VDM.WorkSpace.Size.Height;
          frm.Screen.setSize(coApp.ignoreSizing);
          frm.Screen.Container.style.width=frm.Screen.Width+"px";
          frm.Screen.Container.style.height=frm.Screen.Height+"px";
          frm.setFrameThickness(coTheme.UI.frameThicknessFull);
          frm.Screen.setPosition();
          frm.TitleBar.setSize();
          frm.TitleBar.DodgeButton();
          frm.Sizing=false;
          if (coTheme.UI.screenFade==true) {
            coDOM.setTransition(
              frm.Screen.Container,
              coTheme.UI.screenFadeTransition()
            );
          };
        }
      );
     };
    this.setCenter=function(){
      var frm=this;
      coDOM.setTransition(frm.Screen.Container,coTheme.UI.frameTransition());
      setTimeout(
        function(){
          coDOM.setTransition(
            frm.Screen.Container,
            coTheme.UI.screenFadeTransition()
          );
        },
        coTheme.UI.frameTransitionResetDelay
      );

      frm.setFrameThickness(coTheme.UI.frameThicknessNormal);
      frm.Screen.Position=coApp.Position.Center;
      var bInvalidate=false;
      iDTWidth = coVDM.VDM.WorkSpace.Client.clientWidth;
      iDTHeight = coVDM.VDM.WorkSpace.Client.clientHeight;
      switch (frm.Screen.State) {
        case coApp.State.Full :
          frm.Parent.style.top="0px";
          frm.Parent.style.left="0px";
          frm.Parent.style.width=iDTWidth+"px";
          frm.Parent.style.height=iDTHeight+"px";
          frm.Screen.Width=iDTWidth;
          frm.Screen.Height=iDTHeight;
          bInvalidate=true;
          break;
        case coApp.State.Hidden:
          break;
        case coApp.State.Normal :
          if (frm.Parent.offsetWidth>iDTWidth){
            frm.Parent.style.left="0px";
            frm.Parent.style.width=iDTWidth+"px";
            frm.Screen.Width=iDTWidth;
            bInvalidate=true;
          }
          if (frm.Parent.offsetHeight>iDTHeight){
            frm.Parent.style.top="0px";
            frm.Parent.style.height=iDTHeight+"px";
            frm.Screen.Height=iDTHeight;
            bInvalidate=true;
          }

          iDTLeft=Math.round( iDTWidth/2 - (frm.Screen.Width*frm.Screen.PosScale.X) );
          iDTTop=Math.round( iDTHeight/2 - (frm.Screen.Height*frm.Screen.PosScale.Y) );
          frm.Parent.style.left=iDTLeft+"px";
          frm.Parent.style.top=iDTTop+"px";

          frm.Screen.sizeInfo.Load(frm.Parent);

          break;
        case coApp.State.Icon:
          break;
      };
      if (bInvalidate==true){
        frm.setSize();
        frm.Screen.setPosition();
        frm.Screen.setSize();
      };

    };
    this.setTopCenter=function(){
      var frm=this;
      frm.setFrameThickness(coTheme.UI.frameThicknessNormal);
      coDOM.setTransition(frm.Screen.Container,coTheme.UI.frameTransition());
      setTimeout(
        function(){
          coDOM.setTransition(
            frm.Screen.Container,
            coTheme.UI.screenFadeTransition()
          );
        },
        coTheme.UI.frameTransitionResetDelay
      );

      frm.Screen.Position=coApp.Position.TopCenter;
      var bInvalidate=false;
      iDTWidth = coVDM.VDM.WorkSpace.Client.clientWidth;
      iDTHeight = coVDM.VDM.WorkSpace.Client.clientHeight;
      frm.Parent.style.top="0px";
      switch (frm.Screen.State) {
        case coApp.State.Full :
          frm.Parent.style.left="0px";
          frm.Parent.style.width=iDTWidth+"px";
          frm.Parent.style.height=iDTHeight+"px";
          frm.Screen.Width=iDTWidth;
          frm.Screen.Height=iDTHeight;
          bInvalidate=true;
          break;
        case coApp.State.Hidden:
          break;
        case coApp.State.Normal :
          if (frm.Parent.offsetWidth>iDTWidth){
            frm.Parent.style.left="0px";
            frm.Parent.style.width=iDTWidth+"px";
            frm.Screen.Width=iDTWidth;
            bInvalidate=true;
          }
          if (frm.Parent.offsetHeight>iDTHeight){
            frm.Parent.style.height=iDTHeight+"px";
            frm.Screen.Height=iDTHeight;
            bInvalidate=true;
          }

          iDTLeft=Math.round( iDTWidth/2 - (frm.Screen.Width*frm.Screen.PosScale.X) );

          frm.Parent.style.left=iDTLeft+"px";
          frm.Screen.sizeInfo.Load(frm.Parent);
          break;
        case coApp.State.Icon:
          break;
      };
      if (bInvalidate==true){
        frm.setSize();
        frm.Screen.setPosition();
        frm.Screen.setSize();
      };
    };
    this.setSize=function(){
      var frm=this;
      frm.Parent.style.width=frm.Screen.Width+"px";
      frm.Parent.style.height=frm.Screen.Height+"px";
      frm.Parent.scrollTop=0;

      frm.TopRight.style.left=frm.Screen.Width - frm.frameThickness +"px";
      frm.Top.style.width=frm.Screen.Width - 2*frm.frameThickness+"px";
      frm.Left.style.height=frm.Screen.Height - 2*frm.frameThickness + "px";
      frm.Right.style.left=frm.Screen.Width - frm.frameThickness + "px";
      frm.Right.style.height=frm.Screen.Height - 2*frm.frameThickness + "px";
      frm.BottomLeft.style.top= frm.Screen.Height - frm.frameThickness + "px";
      frm.BottomRight.style.left=frm.Screen.Width - frm.frameThickness + "px";
      frm.BottomRight.style.top=frm.Screen.Height - frm.frameThickness + "px";
      frm.Bottom.style.top=frm.Screen.Height - frm.frameThickness + "px";
      frm.Bottom.style.width=frm.Screen.Width-2*frm.frameThickness+"px";


      frm.TitleBar.setSize();

      frm.Client.style.top=(frm.TitleBar.Visible==true) ? frm.TitleBar.Container.offsetHeight+"px":"0px";
   };
    this.Free=function(){
      var frm=this;
      if (frm.Screen.Panels) frm.Screen.Panels=frm.Panels.Free();

      frm.TitleBar=frm.TitleBar.Free();
      frm.Torus=frm.Torus.Free();
      frm.Wrapper.removeChild(frm.TopLeft);
      frm.Wrapper.removeChild(frm.Top);
      frm.Wrapper.removeChild(frm.TopRight);
      frm.Wrapper.removeChild(frm.Left);
      frm.Wrapper.removeChild(frm.Right);
      frm.Wrapper.removeChild(frm.BottomLeft);
      frm.Wrapper.removeChild(frm.BottomRight);
      frm.Wrapper.removeChild(frm.Bottom);
      frm.Container.removeChild(frm.Client);
      frm.Wrapper.removeChild(frm.Container);
      frm.Parent.removeChild(frm.Wrapper);
      frm=coObject.Release(frm);
      return null;
    };
    this.evtScroll=coEvents.Add(
      this.Parent,
      "scroll",
      function(e){
        this.scrollTop=0;
      },
      coEvents.NoCapture,
      coEvents.Active
    );
    this.setFrameThickness(coTheme.UI.frameThicknessNormal);

    return this;
  },
  HalfWidth:function(aContainer,aElem){
     return Math.floor(aContainer.clientWidth/2 - aElem.clientWidth/2);
  },
  HalfHeight:function(aContainer,aElem){
     return Math.floor(aContainer.clientHeight/2 - aElem.clientHeight/2);
  },
  FrameLess : function (Screen,classFrame,classBorder,classFilm,classClient) {
    if (classFrame==undefined) classFrame="bdrFrame";
    if (classBorder==undefined) classBorder="bdrContainer";
    if (classFilm==undefined) classFilm="bdrFilm";
    if (classClient==undefined) classClient="bdrClient";

    var frm=this;
    this.vScrolls=new Array();

    this.Screen=Screen;
    this.DragHandler=null;
    this.Scrolling=false;
    this.Parent=Screen.Container;
    this.zIndexFactor=0;
    this.Wrapper=document.createElement('div');
    this.Parent.appendChild(this.Wrapper);
    this.Wrapper.className=classFrame;
    this.Container=document.createElement('div');
    this.Wrapper.appendChild(this.Container);
    this.Container.className=classBorder+" "+classFilm;
    this.evtMouseDown=null;
    this.TitleBar=null;

    this.Client=document.createElement('div');
    this.Container.appendChild(this.Client);
    this.Client.className=classClient;

    this.Border=new Border();
    this.Padding=new Padding();
    this.Margin=new Margin();
    this.Border.Load(this.Container);
    this.Padding.Load(this.Container);
    this.Margin.Load(this.Container);

    this.Torus=coAppUI.App.Components.Torus.Create(this,this,this.Container);

    this.AdjustBounds=function(pt){
       if (pt.X<0) pt.X=0;
       if (pt.Y<0) pt.Y=0;

       if (pt.Y>frm.Screen.Parent.offsetHeight) pt.Y=frm.Screen.Parent.offsetHeight;
       if (pt.X>frm.Screen.Parent.offsetWidth) pt.X=frm.Screen.Parent.offsetWidth;
    };
    this.Shake=function(){
      var
      frm=this,
      aniStep=15,
      aniStepPause=40,
      aniDwell=10,
      Step=0,
      iLeft=frm.Parent.offsetLeft,
      iLeftStop=iLeft-50,
      iRightStop=iLeft+50,
      dtExpires=0,
      lkLcv=new Lock(frm.Parent.offsetLeft);

      frm.vScrolls.HideAll();

      cbGoLeft=function(){
        if (lkLcv.Index>iLeftStop) {
          frm.Parent.style.left=lkLcv.Index+"px";
          lkLcv.Index=lkLcv.Index-aniStep;
          setTimeout(cbGoLeft,aniStepPause);
        } else {
          lkLcv.Index=iLeftStop;
          frm.Parent.style.left=lkLcv.Index+"px";
          switch (Step) {
            case 0 : Step++; setTimeout(cbGoRight,aniDwell); break;
            case 2 : Step++; setTimeout(cbGoRight,aniDwell); break;
          };
        };
      };
      cbGoRight=function(){
        if (lkLcv.Index<iRightStop) {
          frm.Parent.style.left=lkLcv.Index+"px";
          lkLcv.Index=lkLcv.Index+aniStep;
          setTimeout(cbGoRight,aniStepPause);
        } else {
          lkLcv.Index=iRightStop;
          frm.Parent.style.left=lkLcv.Index+"px";
          switch (Step) {
            case 1 : Step++; setTimeout(cbGoLeft,aniDwell); break;
            case 3 : Step++; setTimeout(cbGoLeftToCenter,aniDwell); break;
          };
        };
      };
      cbGoLeftToCenter=function(){
        if (lkLcv.Index>iLeft) {
          frm.Parent.style.left=lkLcv.Index+"px";
          lkLcv.Index=lkLcv.Index-aniStep;
          setTimeout(cbGoLeftToCenter,aniStepPause);
        } else {
          lkLcv.Index=iLeft;
          frm.Parent.style.left=lkLcv.Index+"px";
        };
      };
      Step=0;
      cbGoLeft();
    };
    this.vScrolls.setSize=function(){
      var vss=this;
      for (var iLcv=0; iLcv<vss.length; iLcv++){
        var vs=vss[iLcv];
        vs.setSize();
      };
    };
    this.vScrolls.HideAll=function(){
      var vss=this;
      for (var iLcv=0; iLcv<vss.length; iLcv++){
        var vs=vss[iLcv];
        vs.Hide();
      };
    };
    this.Hide=function(){
      var frm=this;
      frm.Torus.Stop();
      frm.Screen.Visible=false;
      frm.Parent.style.visibility="hidden";
      if (frm.Screen.Panels!=null) frm.Screen.Panels.Hide();
      if (frm.Screen.Slides!=null) frm.Screen.Slides.Hide();
    };
    this.Reveal=function(){
      var frm=this;
      frm.Parent.style.display="block";
      frm.Parent.style.visibility="visible";
    };
    this.Conseal=function(){
      var frm=this;
      frm.Torus.Stop();
      frm.Screen.Visible=false;
      frm.Parent.style.display="none";
      frm.Parent.style.visibility="hidden";
    };
    this.setEvents=function(){
      var frm=this;
      frm.evtMouseDown=coEvents.Add(
        frm.Client,
        "mousedown",
        function(e){
          if (coVDM.VDM.Screens.Active!=frm.Screen) frm.BringToTop();
        },
        coEvents.NoCapture,
        coEvents.Activate
      );
    };
    this.BringToTop=function(){
      var frm=this;
      if  ((coVDM.VDM.Screens.Active) && (coVDM.VDM.Screens.Active.Modal) ) {
        if (frm.Screen!=coVDM.VDM.Screens.Active) {
          coVDM.VDM.Screens.Active.Show();
          return;
        };
      };
    };
    this.Show=function(){
      var frm=this;
      if (frm.Screen.AllowFullScreen==true){

        frm.Screen.Position=coApp.Position.Full;
        frm.Screen.State=coApp.State.Full;

        frm.Screen.Container.style.left="0px";
        frm.Screen.Container.style.top="0px";

        frm.Screen.Width=coVDM.VDM.WorkSpace.Size.Width;
        frm.Screen.Height=coVDM.VDM.WorkSpace.Size.Height;

        frm.Screen.Container.style.width=frm.Screen.Width+"px";
        frm.Screen.Container.style.height=frm.Screen.Height+"px";

      } else {
        frm.Screen.Width=frm.Parent.clientWidth;
        frm.Screen.Height=frm.Parent.clientHeight;
        if (frm.Screen.Position==coApp.Position.Center) frm.setCenter();
        if (frm.Screen.State==coApp.State.Normal) frm.Screen.sizeInfo.Load(frm.Parent);
      };

      frm.Screen.sizeInfo.Load(frm.Screen.Container);
      frm.Screen.Visible=true;
      frm.Torus.Show();

      frm.Parent.style.visibility="visible";
      frm.Parent.style.display="block";

      if (frm.Screen.Panels!=null) frm.Screen.Panels.Show();
      if (frm.Screen.Nav) frm.Screen.Nav.Show();

      frm.Torus.Hide(coVDM.torusAutoHide);

      frm.setSize();
    };
    this.Center=function(){
      var frm=this;
      if (frm.Screen.Visible==false) {
        iDTWidth = coVDM.VDM.WorkSpace.Client.clientWidth;
        iDTHeight = coVDM.VDM.WorkSpace.Client.clientHeight;
        iDTLeft=Math.floor( iDTWidth/2 - (frm.Parent.clientWidth/2) );
         iDTTop=Math.floor( iDTHeight/2 - (frm.Parent.clientHeight/2) );
        frm.Parent.style.top=iDTTop+"px";
        frm.Parent.style.left=iDTLeft+"px";
      };
    };
    this.setNormal=function(){
      var frm=this;
      frm.setFull();
    };
    this.setFull=function(){
      var frm=this;
      frm.Screen.Position=coApp.Position.Full;
      frm.Screen.State=coApp.State.Full;
      frm.Screen.Container.style.left="0";
      frm.Screen.Container.style.top="0";
      frm.Screen.Width=coVDM.VDM.WorkSpace.Size.Width;
      frm.Screen.Height=coVDM.VDM.WorkSpace.Size.Height;
      frm.Screen.Container.style.width=frm.Screen.Width+"px";
      frm.Screen.Container.style.height=frm.Screen.Height+"px";
      frm.setSize();
      frm.Screen.setSize();
    };
    this.setCenter=function(){
      var frm=this;
      frm.Screen.Position=coApp.Position.Center;
      var bInvalidate=false;
      iDTWidth = coVDM.VDM.WorkSpace.Client.clientWidth;
      iDTHeight = coVDM.VDM.WorkSpace.Client.clientHeight;
      switch (frm.Screen.State) {
        case coApp.State.Full :
          frm.Parent.style.top="0px";
          frm.Parent.style.left="0px";
          frm.Parent.style.width=iDTWidth+"px";
          frm.Parent.style.height=iDTHeight+"px";
          frm.Screen.Width=iDTWidth;
          frm.Screen.Height=iDTHeight;
          bInvalidate=true;
          break;
        case coApp.State.Hidden:
          break;
        case coApp.State.Normal :
          if (frm.Parent.offsetWidth>iDTWidth){
            frm.Parent.style.left="0px";
            frm.Parent.style.width=iDTWidth+"px";
            frm.Screen.Width=iDTWidth;
            bInvalidate=true;
          }
          if (frm.Parent.offsetHeight>iDTHeight){
            frm.Parent.style.top="0px";
            frm.Parent.style.height=iDTHeight+"px";
            frm.Screen.Height=iDTHeight;
            bInvalidate=true;
          }

          iDTLeft=Math.round( iDTWidth/2 - (frm.Screen.Width*frm.Screen.PosScale.X) );
          iDTTop=Math.round( iDTHeight/2 - (frm.Screen.Height*frm.Screen.PosScale.Y) );
          frm.Parent.style.left=iDTLeft+"px";
          frm.Parent.style.top=iDTTop+"px";

          frm.Screen.sizeInfo.Load(frm.Parent);

          break;
        case coApp.State.Icon:
          break;
      };

      if (bInvalidate==true){
        frm.setSize();
        frm.Screen.setSize();
      };

    };
    this.setTopCenter=function(){
      var frm=this;
      frm.Screen.Position=coApp.Position.TopCenter;
      var bInvalidate=false;
      iDTWidth = coVDM.VDM.WorkSpace.Client.clientWidth;
      iDTHeight = coVDM.VDM.WorkSpace.Client.clientHeight;
      frm.Parent.style.top="0px";
      switch (frm.Screen.State) {
        case coApp.State.Full :
          frm.Parent.style.left="0px";
          frm.Parent.style.width=iDTWidth+"px";
          frm.Parent.style.height=iDTHeight+"px";
          frm.Screen.Width=iDTWidth;
          frm.Screen.Height=iDTHeight;
          bInvalidate=true;
          break;
        case coApp.State.Hidden:
          break;
        case coApp.State.Normal :
          if (frm.Parent.offsetWidth>iDTWidth){
            frm.Parent.style.left="0px";
            frm.Parent.style.width=iDTWidth+"px";
            frm.Screen.Width=iDTWidth;
            bInvalidate=true;
          }
          if (frm.Parent.offsetHeight>iDTHeight){
            frm.Parent.style.height=iDTHeight+"px";
            frm.Screen.Height=iDTHeight;
            bInvalidate=true;
          }

          iDTLeft=Math.round( iDTWidth/2 - (frm.Screen.Width*frm.Screen.PosScale.X) );

          frm.Parent.style.left=iDTLeft+"px";
          frm.Screen.sizeInfo.Load(frm.Parent);
          break;
        case coApp.State.Icon:
          break;
      };
      if (bInvalidate==true){
        frm.setSize();
        frm.Screen.setPosition();
        frm.Screen.setSize();
      };
    };
    this.setSize=function(){
      var frm=this;

      frm.Wrapper.style.top="0px";
      frm.Wrapper.style.left="0px";
      frm.Wrapper.style.right="0px";
      frm.Wrapper.style.bottom="0px";

      frm.Container.style.top="0px";
      frm.Container.style.left="0px";
      frm.Container.style.right="0px";
      frm.Container.style.bottom="0px";


      frm.Client.style.left="0px";
      frm.Client.style.top="0px";
      frm.Client.style.right="0px";
      frm.Client.style.bottom="0px";


      frm.vScrolls.setSize();
    };
    this.setEvents();
    return this;
  },
  HalfWidth:function(aContainer,aElem){
     return Math.floor(aContainer.clientWidth/2 - aElem.clientWidth/2);
  },
  HalfHeight:function(aContainer,aElem){
     return Math.floor(aContainer.clientHeight/2 - aElem.clientHeight/2);
  },
  createNavigationBar : function(sClassRoot,aParent,aOwner,onFirstClick,onLastClick,onNextClick,onPreviousClick,onDeleteClick){
    var _nb=new Object();
    _nb.Class = sClassRoot;
    _nb.Parent = aParent;
    _nb.Owner = aOwner;
    _nb.Margin=new Margin(2,4,4,2);
    _nb.Container=document.createElement('div');
    _nb.btnFirst=document.createElement('div');
    _nb.btnPrevious=document.createElement('div');
    _nb.btnDelete=document.createElement('div');
    _nb.btnNext=document.createElement('div');
    _nb.btnLast=document.createElement('div');
    aParent.appendChild(_nb.Container);
    _nb.Container.appendChild(_nb.btnFirst);
    _nb.Container.appendChild(_nb.btnLast);
    _nb.Container.appendChild(_nb.btnDelete);
    _nb.Container.appendChild(_nb.btnNext);
    _nb.Container.appendChild(_nb.btnPrevious);

    _nb.Container.className=_nb.Class+"Cntr";
    _nb.btnFirst.className=_nb.Class+"BtnFirst";
    _nb.btnLast.className=_nb.Class+"BtnLast";
    _nb.btnDelete.className=_nb.Class+"BtnDelete";
    _nb.btnNext.className=_nb.Class+"BtnNext";
    _nb.btnPrevious.className=_nb.Class+"BtnPrevious";

    _nb.btnFirst.onClick=onFirstClick;
    _nb.btnLast.onClick=onLastClick;
    _nb.btnNext.onClick=onNextClick;
    _nb.btnPrevious.onClick=onPreviousClick;
    _nb.btnDelete.onClick=onDeleteClick;

    _nb.setSize=function(){
      var nb=this;
      if (nb.Owner.Visible!=true) return;
      var
        iCenter=nb.btnPrevious.clientWidth+nb.btnDelete.clientWidth+nb.btnNext.clientWidth;
        iWidth =nb.Parent.clientWidth-nb.Margin.Left-nb.Margin.Right;
        iHeight = nb.Parent.clientHeight;
        iMiddle = Math.floor(iWidth/2);
        iDelete = Math.floor(nb.btnDelete.clientWidth/2);

      nb.Container.style.top=iHeight-nb.Margin.Top-nb.Margin.Bottom-nb.Container.clientHeight+"px";
      nb.Container.style.left=nb.Margin.Left+"px";
      nb.Container.style.width=iWidth+"px";
      nb.btnFirst.style.left=nb.Margin.Left+"px";
      nb.btnPrevious.style.left=iMiddle - nb.btnPrevious.clientWidth - iDelete +"px";
      nb.btnDelete.style.left=iMiddle - iDelete + "px";
      nb.btnNext.style.left=iMiddle+iDelete +"px";
      nb.btnLast.style.left=iWidth-nb.Margin.Left-nb.btnLast.clientWidth+"px";
      return 0;
    };

    return _nb;
  }
};


function coAppInitialize(app,sClassName){
  app.Class=sClassName;
  if (!app.Version) app.Version=new Version(0,0,0,0);
  if (!app.Vendor) app.Vendor=new Vendor("","",new Array());
  if (!app.Title) app.Title=new Title("","");
  if (!app.States) app.States=new coAppState();
  if (!app.State) app.State=app.States.Initializing;
  if (!app.Slides) app.Slides=coAppUI.createSlides();
  if (!app.Container) {
    app.Container=document.createElement('div');
    coVDM.VDM.WorkSpace.Client.appendChild(app.Container);
    app.Container.className=app.Class;
  };
  if (!app.Frame) app.Frame=new coApp.Frame(app);
  if (!app.onSetSize) app.onSetSize=function(){};
  if (!app.onShow) app.onShow=function(){};
  if (!app.onHide) app.onHide=function(){};
  coApp.List.push(app);

  return app;
};
coApp.init();

