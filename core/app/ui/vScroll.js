UI.vScroll = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  debugToConsole : true,
  Compiled       : false,
  List           : new Array(),
  init: function(){
    this.Initialized=true;
    UI.Controls.Add(this);
  },

  HideAll        : function(exScroll){
    for (var iLcv=0; iLcv<this.List.length; iLcv++) {
      var sc=this.List[iLcv];
      if (sc!=exScroll) sc.Hide();
    };
  },
  Create         : function(sName,Frame,Owner,Parent,Target,Scroller,Window){
    if (Scroller==undefined) Scroller=Target;
    if (Window==undefined) Window=window;
    var _sc=new coObject.Create();
    _sc.Unit=this;
    _sc.Logging=true;
    _sc.Frame=Frame;
    _sc.Owner=Owner;
    _sc.Parent=Parent;
    _sc.Target=Target;
    _sc.Window=Window;
    _sc.Scroller=Scroller;
    _sc.scrollTargetParent=false;
    _sc.PageBreak=Parent;
    _sc.Enabled=true;
    Frame.vScrolls.push(_sc);
    coAppUI.App.Components.vScroll.List.push(_sc);
    if (Owner.Controls) Owner.Controls.push(_sc);
    _sc.Container=document.createElement('div');
    _sc.Parent.appendChild(_sc.Container);
    _sc.Class="VScroll";
    _sc.Visible=false;
    _sc.Touching=false;
    _sc.Wheeled=false;
    _sc.MouseTrack=false;
    _sc.dtTouchStart=0;
    _sc.dtTouchMove=0;
    _sc.dtTouchEnd=0;
    _sc.dtAutoDecay=0;
    _sc.AutoDecay=0;
    _sc.Position=0;
    _sc.positionStart=0;
    _sc.AutoHideNeeded=false;
    _sc.positionDelta=0;
    _sc.trackLoop=0;
    _sc.trackX=0;
    _sc.trackY=0;
    _sc.onShow=null;
    _sc.onHide=null;

    _sc.targetMargin=new Margin();

    _sc.Container.className=_sc.Class;
    _sc.Container.style.height=coVDM.vsBoxHeight+"px";
    _sc.Parent.style.overflow="hidden";
    _sc.Container.style.overflow="hidden";
    _sc.Container.style.position="absolute";
    _sc.Button=document.createElement('div');
    _sc.Container.appendChild(_sc.Button);
    _sc.Button.className=_sc.Class+"Btn";
    _sc.Margin=new Margin();
    _sc.Padding=new Padding();
    _sc.Border=new Border();

    _sc.Button.Margin=new Margin();
    _sc.Button.Padding=new Padding();
    _sc.Button.Border=new Border();

    _sc.Border.Load(_sc.Container);
    _sc.Padding.Load(_sc.Container);
    _sc.Margin.Load(_sc.Container);

    _sc.Button.Border.Load(_sc.Button);
    _sc.Button.Padding.Load(_sc.Button);
    _sc.Button.Margin.Load(_sc.Button);

    _sc.tiScroll=0;
    _sc.tiAutoHide=0;
    _sc.dirFactor=0;
    _sc.Top=0;
    _sc.Right=0;
    _sc.Width=coVDM.vsBoxWidth;
    _sc.Height=coVDM.vsBoxHeight;
    _sc.Button.Width=coVDM.vsButtonWidth;
    _sc.Button.Height=coVDM.vsButtonHeight;

    _sc.Container.style.borderWidth=coVDM.vsBorderWidth;

    _sc.Button.Max=_sc.Height-(coVDM.vsBorderWidth*2)-_sc.Button.Height-_sc.Button.Margin.Bottom-_sc.Button.Margin.Top;
    _sc.Button.Center=_sc.Button.Top=Math.round((_sc.Height/2)-(_sc.Button.Height/2) - (_sc.Button.Margin.Top));

    _sc.Center=Math.round(_sc.Height/2);
    _sc.Enable=function(){
      var _sc=this;
      _sc.Enabled=true;
      if (coVDM.VDM.Browser.Mouse==true){
        _sc.evtMouseWheel.setActive(true);
        _sc.evtMouseDown.setActive(true);
      };
      _sc.evtTouchStart.setActive(true);
    };
    _sc.Disable=function(){
      var _sc=this;
      _sc.Enabled=false;
      if (coVDM.VDM.Browser.Mouse==true){
        _sc.evtMouseWheel.setActive(false);
        _sc.evtMouseDown.setActive(false);
      };
      _sc.evtTouchStart.setActive(false);
    };
    _sc.setSize=function(){};
    _sc.getFrameIndex=function(){
      return this.Frame.vScrolls.indexOf(this);
    };
    _sc.getDescendantScrollCount=function(elm){
      var sc=this;
      var idx=sc.getFrameIndex();
      var iCt=(coDOM.hasDescendant(sc.Target,elm)==true) ? 1 : 0 ;
      for (var iLcv=idx+1; iLcv<sc.Frame.vScrolls.length; iLcv++){
        var sLcv=sc.Frame.vScrolls[iLcv];
        if (
             (sLcv.Target.scrollHeight>sLcv.Parent.clientHeight) &&
             (coDOM.hasDescendant(sLcv.Target,elm)==true)
        ) {
          iCt++;
        };
      };
      return iCt;
    };
    _sc.scrollToTop=function(elm){
      var sc=this;
      var iScrollTop=coUtils.getOffsetTop(elm,sc.Parent)-coVDM.vsScrollToTopOffset;
      sc.Hide();
      if ( (sc.Unit.debugToConsole==true) && (sc.Logging==true) ) coVDM.VDM.Console.Append("VScroll.scrollToTop Value("+iScrollTop+")");
      sc.Scroller.scrollTop=iScrollTop;
      if ( (sc.Unit.debugToConsole==true) && (sc.Logging==true) ) coVDM.VDM.Console.Append("VScroll.scrollToTop Actual("+sc.Scroller.scrollTop+")");
    };
    _sc.pageUp=function(){
      var sc=this;
      if ( (sc.Unit.debugToConsole==true) && (sc.Logging==true) ) coVDM.VDM.Console.Append("VScroll.pageUp");
      sc.Show();
      sc.setPosition(0);
      sc.Button.Top=0;
      sc.Button.style.top=sc.Button.Top+"px";
      sc.Scroller.scrollTop-=sc.Target.clientHeight;
    };
    _sc.pageDown=function(){
      var sc=this;
      if ( (sc.Unit.debugToConsole==true) && (sc.Logging==true) ) coVDM.VDM.Console.Append("VScroll.pageDown");
      sc.Show();
      sc.Button.Top=sc.Button.Max;
      sc.Button.style.top=sc.Button.Top+"px";
      sc.setPosition(0);
      sc.Scroller.scrollTop+=sc.Target.clientHeight;
    };
    _sc.scrollInView=function(elm){
      var sc=this;
      if ( (sc.Unit.debugToConsole==true) && (sc.Logging==true) ) coVDM.VDM.Console.Append("VScroll.scrollInView");
      var yElm=elm.offsetTop+elm.offsetHeight;
      var yBox=sc.Scroller.clientHeight+sc.Scroller.scrollTop;
      if (yBox<yElm) {
        // below view area
        sc.Scroller.scrollTop=yElm-sc.Scroller.clientHeight; // push view up
      } else if (elm.offsetTop<sc.Scroller.scrollTop){
        // above view area
        sc.Scroller.scrollTop=elm.offsetTop;
      };
    };
    _sc.Show=function(){
      var sc=this;
      if (sc.Enabled==false){
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show (vScroll is disabled)");
        return;
      };
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show");
      coDragDrop.Locked=true;

      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show (Set autohide timer)");
      sc.setAutoHideTimer();


      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show (lock checks)");
      if ( (sc.Visible==true) || (sc.Target.scrollHeight<=sc.Parent.clientHeight) || (coEvents.ScrollLock.Active==true) || (coEvents.TouchLock.Active==true) || (coDragDrop.Active==true)) return true;

      coAppUI.App.Components.vScroll.HideAll(sc);

      sc.Visible=true;

      sc.Container.style.visibility="visible";
      sc.Container.style.display="absolute";
      sc.Container.style.zIndex=coVDM.VDM.Screens.zIndex()+coVDM.zFactorScroll;
      sc.setPosition(0);
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show (z-index set)");
      if (sc.Wheeled==false) {
        if (sc.evtMouseMove2) {
          sc.evtMouseMove2.setActive(true);
          if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show evtMouseMove2 (active)");
        } else {
          if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show (no evtMouseMove2)");
        };
        //sc.tiScroll=setInterval(function(){sc.doAutoScroll();},coVDM.vsAutoScrollMS);
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show (Interval set)");
        if (sc.Touching==true)
          if ((coAppUI.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show (based on touch)");
      } else {
        if ((coAppUI.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Show (based on wheel)");
      };
      if (sc.onShow) sc.onShow(sc);
    };
    _sc.Hide=function(){
      var sc=this;
      coDragDrop.Locked=false;
      sc.Container.style.visibility="hidden";
      sc.Container.style.display="none";
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Hide evtTouchMove (inactive)");
      sc.evtTouchMove.setActive(false);
      if (coVDM.VDM.Browser.Mouse==true) {
        sc.evtWindowMouseUp.setActive(false);
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Hide evtWindowMouseUp (inactive)");
        sc.evtMouseMove.setActive(false);
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Hide evtMouseMove (inactive)");
        sc.evtMouseMove2.setActive(false);
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.Hide evtMouseMove2 (inactive)");
      };

      sc.Touching=false;
      sc.Wheeled=false;
      sc.Visible=false;
      sc.MouseTrack=false;
      sc.positionStart=0;
      if (sc.tiScroll!=0) {
        clearInterval(sc.tiScroll);
        sc.tiScroll=0;
      };
      if (sc.tiAutoHide!=0) {
        clearInterval(sc.tiAutoHide);
        sc.tiAutoHide=0;
      };
      if (sc.onHide) sc.onHide(sc);
    };
    _sc.setTarget=function(Target){
      var sc=this;
      sc.Target=Target;
      sc.targetMargin.Load(Target);
      sc.Hide();
    };
    _sc.scrollTo=function(iPosition){
      var sc=this;
      var iDelta=(iPosition-sc.Scroller.scrollTop);
      sc.setPosition(iDelta);
    };
    _sc.setPosition=function(iDelta){
      var sc=this;
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.setPosition("+iDelta+")");

      sc.Container.style.visibility="hidden";
      sc.Container.style.display="block";

      if (sc.Container.offsetParent!=sc.Scroller.offsetParent)
        sc.Scroller.offsetParent.appendChild(sc.Container);

      var iPosition=sc.Scroller.scrollTop + iDelta;
      var iRange=sc.Target.scrollHeight;
      iPosition=Math.max(0,iPosition);
      iMaxRange=(iRange - sc.Parent.clientHeight );
      if (iPosition>iMaxRange )
        iPosition=iMaxRange;

      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.setPosition position="+iPosition);
      if (sc.scrollTargetParent==false) {
        sc.Scroller.scrollTop=iPosition;
        iPosition=sc.Scroller.scrollTop;
      } else {
        sc.Target.offsetParent.scrollTop=iPosition;
        iPosition=sc.Target.offsetParent.scrollTop;
      };
      var iClientH=(sc.Scroller.offsetParent.clientHeight)-sc.Scroller.offsetTop;

      var iY=(iPosition/iMaxRange)*sc.Scroller.clientHeight;
      iY=coMath.Trunc(iY);
      var iBdr=(sc.Border.Top+sc.Border.Bottom + coVDM.vsShadow);


      var iYBias=sc.Scroller.offsetTop;
      var iXBias=0;

      var iTop=(iYBias+iY)-coMath.Div(sc.Height,2);
      var iRight=(iXBias+sc.Width);

      sc.Container.style.height=sc.Height+"px";

      if (iTop<iYBias){
        // Top Check
        if (iY<=0){
          sc.Button.Top=0;
          sc.Container.style.height=sc.Button.Height+sc.Button.Margin.yBias()+"px";
        };
        iTop=iYBias+iBdr;
      };
      // Past Bottom Check
      if (iTop+sc.Height+coVDM.vsShadow >iYBias+iClientH)
        iTop=iYBias+sc.Scroller.offsetParent.clientHeight-(sc.Scroller.offsetTop+sc.Height+coVDM.vsShadow);
      // At bottom Check
      if ((iPosition+(sc.Scroller.offsetParent.clientHeight-sc.Scroller.offsetTop))>=iRange){
        var iHeight=sc.Button.Height+sc.Button.Margin.yBias();
        sc.Container.style.height=iHeight+"px";
        sc.Button.Top=0;
        iTop=sc.Scroller.offsetParent.clientHeight-(iHeight+sc.Button.Margin.yBias()+coVDM.vsShadow);
      };
      sc.Top=iTop;
      sc.Right=iRight;
      sc.Container.style.right=iRight+"px";
      sc.Container.style.top=iTop+"px";
      sc.Button.style.top=sc.Button.Top+"px";
      sc.Container.style.display="block";
      sc.Container.style.visibility="visible";
      return iPosition;
    };
    _sc.getPosition=function(){
      var sc=this;
      return sc.Target.scrollTop;
    };
    _sc.getOverflow=function(){
      var sc=this;
      return sc.Target.scrollHeight-sc.Parent.clientHeight-sc.targetMargin.yBias();
    };
    _sc.doStartTouch=function(e){
      var sc=this;
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.Console.Append("VScroll.doStartTouch");
      if (e==undefined) e=sc.Window.event;
      if (coEvents.ScrollLock.Active==true) {
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.Console.Append("VScroll.doStartTouch (Locked so exiting)");
        return;
      }
      if (coDragDrop.Active==true){
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.Console.Append("VScroll.doStartTouch (Dragging so exiting)");
        return;
      };
      if (sc.Target.scrollHeight<=sc.Parent.clientHeight) {
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.Console.Append("VScroll.doStartTouch (No overflow so exiting)");
        return true;
      };
      if (sc.getDescendantScrollCount(e.target)<=1) {
        sc.dirFactor=1;
        sc.dtTouchStart= + new Date();
        sc.dtTouchMove=0;
        var touch = e.touches[e.touches.length-1];
        var iYBias=0;
        var iXBias=0;
        var iY=(touch.clientY-iYBias)-sc.Center;
        var iX=Math.abs(touch.clientX-iXBias);
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true))
          coVDM.VDM.Console.Append("VScroll doStartTouch (Initialized variables) iYBias("+iYBias+") iXBias("+iXBias+") iY("+iY+") iX("+iX+")");

          if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll doStartTouch (Visible=false)");
          sc.Touching=true;
          sc.positionStart=iY;

          sc.Button.Top=sc.Button.Center;
          sc.Button.style.top=sc.Button.Top+"px";

          sc.MouseTrack=false;

          sc.evtTouchMove.setActive(true);
          sc.evtTouchEnd.setActive(true);

          if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll doStartTouch (Set events)");
          if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll doStartTouch (Disabled mouse click)");

          sc.setPosition(0);
          if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll doStartTouch (Set position)");
          sc.Show();
          if ((sc.Unit.debugToConsole==true) && (sc.Logging==true))coVDM.VDM.Console.Append("VScroll doStartTouch (done)");
      };
    };
    _sc.doMoveTouch=function(e){
      var sc=this;
      if (e==undefined) e=sc.Window.event;
      if (sc.Visible==false) {
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMoveTouch (not visible so exiting)");
        return true;
      } else if (sc.Touching==false) {
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMoveTouch (visible but not touching so exiting)");
        return true;
      };
      sc.dtTouchMove=+new Date();
      var touches=e.touches;
      var touch = touches[touches.length-1];
      coDOM.preventDefault(e);

      //position is absolute from window not from element...
      var iYBias=0;
      var iXBias=0;

      var iY=(touch.clientY-iYBias)-sc.Center;
      var iX=Math.abs(touch.clientX-iXBias);
      var iDelta=((iY - sc.positionStart) )* -1 * sc.dirFactor;
      if (coMath.inRange(-coVDM.vsRadiusNeutral,coVDM.vsRadiusNeutral,iDelta)==true) {
        iDelta=coVDM.vsTravelNeutral;
        sc.Button.Top=sc.Button.Center;
      }else if (coMath.inRange(-coVDM.vsRadiusSlow,coVDM.vsRadiusSlow,iDelta)==true) {
        iDelta= coVDM.vsTravelSlow * coMath.Sign(iDelta);
        sc.Button.Top= (iDelta<0) ? 0 : sc.Button.Max;
        sc.dtAutoDecay=sc.dtTouchEnd+Math.max(sc.AutoDecay,sc.dtTouchEnd-sc.dtTouchStart);
      } else if (coMath.inRange(-coVDM.vsRadiusFast,coVDM.vsRadiusFast,iDelta)==true){
        iDelta= coVDM.vsTravelFast * coMath.Sign(iDelta);
        sc.Button.Top= (iDelta<0) ? 0 : sc.Button.Max ;
        sc.dtAutoDecay=sc.dtTouchEnd+Math.max(sc.AutoDecay,sc.dtTouchEnd-sc.dtTouchStart);
      } else {
        sc.Button.Top= (iDelta<0) ? 0 : sc.Button.Max ;
        iDelta= coVDM.vsTravelTurbo * coMath.Sign(iDelta);
        sc.dtAutoDecay=sc.dtTouchEnd+Math.max(sc.AutoDecay,sc.dtTouchEnd-sc.dtTouchStart);
      };
      sc.Button.style.top=sc.Button.Top+"px";
      sc.setPosition(iDelta);
      sc.setAutoHideTimer();
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true))coVDM.VDM.Console.Append("VScroll.doMoveTouch (touches="+touches.length +", iX="+iX+", iY="+iY+"iDelta="+iDelta+")");
      return true;
    };
    _sc.doMouseDown=function(e){
      var sc=this;
      if (e==undefined) e=sc.Window.event;
      if (coDOM.getButton(e)!=1){
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMouseDown (exiting)");
        return;
      };
      if (sc.Target.scrollHeight<=sc.Parent.clientHeight) return true;

      if (sc.getDescendantScrollCount(e.target)<=1) {
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMouseDown");
        sc.trackX=e.pageX;
        sc.trackY=e.pageY;
        sc.Show();
        sc.evtWindowMouseUp.setActive(true);
        sc.evtMouseMove.setActive(false);
        sc.evtMouseMove2.setActive(true);
        //e.stopPropagation();
      };
    };
    _sc.doMouseUp=function(e){
      var sc=this;
      // use autoHide timer sc.Hide();
      sc.evtWindowMouseUp.setActive(false);
      sc.evtMouseMove.setActive(false);
      sc.evtMouseMove2.setActive(false);
    };
    _sc.doMouseMove=function(e){
      var sc=this;
      if (e==undefined) e=sc.Window.event;

      if (coDragDrop.Active==true){
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMouseMove (Dragging so exiting)");
        return;
      };
      if (coEvents.ScrollLock.Active==true) {
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMouseMove (Locked so exiting)");
        return;
      };
      if (sc.getOverflow()<=0) return true;


      var iXBias=0;
      var iX=e.clientX-iXBias;
      var iXLow=sc.Target.offsetWidth-sc.Width-coVDM.vsTrackMouseRange;

      if ( (sc.Visible==false) && (((iX>iXLow) && (iX<=(sc.Target.offsetWidth-sc.targetMargin.Right) ) && ((e.pageX!=sc.trackX) || (e.pageY!=sc.trackY))) ) ) {
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMouseMove");

        if ( (sc.MouseTrack==false) && (sc.Touching==false)) {
          if (coVDM.VDM.Browser.Mouse==true)
            sc.evtWindowMouseUp.setActive(true);
          sc.MouseTrack=true;
          if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMouseMove MouseTrack (enabled)");
        };
        if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMouseMove Show");
        sc.trackX=e.pageX;
        sc.trackY=e.pageY;
        sc.positionDelta=0;
        sc.dirFactor=1;
        sc.Show();
        sc.setPosition(0);
        coDOM.preventDefault(e);
      } else {
        if ( (sc.Visible==false) && (e.pageX==sc.trackX) && (e.pageY==sc.trackY)) sc.trackLoop+=1;
        if (sc.trackLoop>=coVDM.vsTrackLoopMax) {
          if (coVDM.VDM.Browser.Mouse==true) sc.evtMouseMove2.reSet(false);
          sc.trackLoop=0;
          if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doMouseMove TrackLoop Detected (resetting)");
        } else if (sc.Visible==true) {
          if ((e.which==1) || (e.button==1)){
            if (coVDM.VDM.Browser.vScrollDir==1){
              var iDiff=e.pageY-sc.trackY;
            } else {
              var iDiff=sc.trackY-e.pageY;
            };
            if (iDiff==0) {
              sc.Button.Top=sc.Button.Center;
            }else if (iDiff>0) {
              sc.Button.Top=sc.Button.Max;
            } else{
              sc.Button.Top=0;
            };
            sc.setPosition(iDiff);
            sc.trackX=e.pageX;
            sc.trackY=e.pageY;
            if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append(
              "VScroll.doMouseMove (exiting)".concat(
                " pageX=",e.pageX,
                " pageY=",e.pageY,
                " sc.trackX=",sc.trackX,
                " sc.trackY=",sc.trackY,
                " sc.trackLoop=",sc.trackLoop
              )
            );
            sc.setAutoHideTimer();
          } else {
           sc.trackX=e.pageX;
           sc.trackY=e.pageY;
          };
        };
      };
    };
    _sc.doMouseWheel=function(e){
      var sc=this;
      if (e==undefined) e=sc.Window.event;
      if (sc.Target.scrollHeight<=sc.Parent.clientHeight) return true;
      sc.dirFactor=1;

      if (sc.getDescendantScrollCount(e.target)<=1) {
        sc.Wheeled=true;

        var iDelta=(e.detail) ? e.detail*coVDM.vsFireFoxScrollFactor : e.wheelDelta*-1;
        if (coMath.inRange(-coVDM.vsRadiusNeutral,coVDM.vsRadiusNeutral,iDelta)==true) {
          sc.Button.Top=sc.Button.Center;
        }else if (coMath.inRange(-coVDM.vsRadiusSlow,coVDM.vsRadiusSlow,iDelta)==true) {
          sc.Button.Top= (iDelta>0) ?  sc.Button.Max : 0;
        } else if (coMath.inRange(-coVDM.vsRadiusFast,coVDM.vsRadiusFast,iDelta)==true){
          sc.Button.Top= (iDelta>0) ?  sc.Button.Max : 0;
        } else {
          sc.Button.Top= (iDelta>0) ?  sc.Button.Max : 0;
        };
        sc.Button.style.top=sc.Button.Top+"px";
        sc.Show();

        sc.setPosition(iDelta);
        sc.setAutoHideTimer();

        e.preventDefault();
      };
    };
    _sc.doEndTouch=function(e){
      var sc=this;
      if (!e) e=sc.Window.event;
      sc.evtTouchMove.setActive(false);
      sc.evtTouchEnd.setActive(false);
      sc.Touching=false;
      if (sc.dtTouchMove!=0)
        coDOM.preventDefault(e);
      sc.dtTouchEnd= + new Date();
      var msDiff=(sc.dtTouchEnd-sc.dtTouchStart);
      if (sc.Visible==true){
        sc.setAutoHideTimer();
        sc.AutoDecay=coVDM.vsAutoDecay;
        sc.dtAutoDecay=sc.dtTouchEnd+Math.max(sc.AutoDecay,sc.dtTouchEnd-sc.dtTouchStart);
      };
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doEndTouch (positionDelta="+sc.positionDelta+",AutoDecay="+sc.AutoDecay+")");
    };
    if (coVDM.VDM.Browser.Mouse==true){
      _sc.evtWindowMouseUp=coEvents.Add(_sc.Window,"mouseup",function(e){_sc.doMouseUp(e);},coEvents.Capture,coEvents.NoActivate);
      _sc.evtMouseWheel=coEvents.Add(_sc.Parent,coVDM.VDM.Browser.Event.mouseWheel ,function(e){_sc.doMouseWheel(e);},coEvents.Capture,coEvents.Active);
      _sc.evtMouseDown=coEvents.Add(_sc.Parent,"mousedown",function(e){_sc.doMouseDown(e);},coEvents.Capture,coEvents.Active);
      _sc.evtMouseMove=coEvents.Add(_sc.Parent,"mousemove",function(e){_sc.doMouseMove(e);},coEvents.NoCapture,coEvents.NoActivate);
      _sc.evtMouseMove2=coEvents.Add(_sc.Window,"mousemove",function(e){_sc.doMouseMove(e);},coEvents.NoCapture,coEvents.NoActivate);
    };
    _sc.evtTouchStart=coEvents.Add(_sc.Parent,"touchstart",function(e){_sc.doStartTouch(e);},coEvents.NoCapture,coEvents.Active);
    _sc.evtTouchMove=coEvents.Add(_sc.Window,"touchmove",function(e){_sc.doMoveTouch(e);},coEvents.Capture,coEvents.NoActivate);
    _sc.evtTouchEnd=coEvents.Add(_sc.Window,"touchend",function(e){_sc.doEndTouch(e);},coEvents.NoCapture,coEvents.NoActivate);

    _sc.doAutoScroll=function(){
      var sc=this;
      if (coEvents.ScrollLock.Active==true) {
        sc.Hide();
        return;
      };
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true))
        coVDM.VDM.Console.Append("VScroll.doAutoScroll (positionDelta="+sc.positionDelta+", touching="+sc.Touching+", MouseTrack="+sc.MouseTrack+", AutoDecay="+sc.AutoDecay+", Visible="+sc.Visible+")");
      var dtNow= + new Date();
      if ( (sc.AutoDecay>0) && (dtNow>=sc.dtAutoDecay) ) {
        sc.AutoDecay=0;
        sc.Hide();
        return;
      } else {
        var iNew=iOld=sc.Target.scrollTop;
        if (  (sc.Visible==true) && (sc.positionDelta!=0) && ( ( (sc.Touching==true)|| (sc.MouseTrack==true) ) || (sc.AutoDecay>0) ) )
          iNew=sc.setPosition(sc.positionDelta);
        if (sc.tiAutoHide==0)
          sc.Hide();
      };
    };
    _sc.setAutoHideTimer=function(){
      var sc=this;
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.setAutoHideTimer");
      if (sc.tiAutoHide!=0) {
        clearTimeout(sc.tiAutoHide);
        sc.tiAutoHide=0;
      };
      sc.tiAutoHide=setTimeout(function(){ sc.doAutoHide();},coVDM.vsAutoHide);
      sc.AutoHideNeeded=true;
    };
    _sc.doAutoHide=function(){
      var sc=this;
      if ((sc.Unit.debugToConsole==true) && (sc.Logging==true)) coVDM.VDM.Console.Append("VScroll.doAutoHide AutoHideNeeded="+sc.AutoHideNeeded);
      if ( (sc.Visible==true) && (sc.AutoHideNeeded==true)) sc.Hide();
      sc.tiAutoHide=0;
    };
    _sc.Free=function(){
      var sc=this;
      var lst=coAppUI.App.Components.vScroll.List;
      var idx=lst.indexOf(sc);
      if (idx!=-1)
        lst.splice(idx,1);
      if (this.Owner.Controls) {
        var idx=this.Owner.Controls.indexOf(this);
        if (idx!=-1) this.Owner.Controls.splice(idx,1);
      };
      var idx=coAppUI.App.Components.vScroll.List.indexOf(sc);
      if (idx!=-1) coAppUI.App.Components.vScroll.List.splice(idx,1);

      var idx=sc.Frame.vScrolls.indexOf(sc);
      if (idx!=-1) sc.Frame.vScrolls.splice(idx,1);
      sc.Target=null;
      if (sc.tiScroll!=0) {
        clearInterval(sc.tiScroll);
        sc.tiScroll=0;
      };
      if (sc.tiAutoHide!=0) {
        clearInterval(sc.tiAutoHide);
        sc.tiAutoHide=0;
      };
      if (coVDM.VDM.Browser.Mouse==true){
        sc.evtWindowMouseUp.Free();
        sc.evtMouseWheel.Free();
        sc.evtMouseMove.Free();
        sc.evtMouseMove2.Free();
      };
      sc.evtTouchStart.Free();
      sc.evtTouchMove.Free();
      sc.evtTouchEnd.Free();
      sc.Container.removeChild(sc.Button);
      sc.Parent.removeChild(sc.Container);
      sc=coObject.Release(sc);
      return null;
    };
    _sc.setSize();
    return _sc;
  }
};
