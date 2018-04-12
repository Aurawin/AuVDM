const FrameTitleBar={
  Unit           : '/core/app/boot/FrameTitleBar.js',
  Loaded         : true,
  debugToConsole : false,
  createBar: function(Frame){
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
  }
};