const FrameDragEvents={
  Unit           : '/core/app/boot/FrameDragEvents.js',
  Loaded         : true,
  debugToConsole : false,
  setEvents : function(Form){
    var frm=Form;
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
  }
};