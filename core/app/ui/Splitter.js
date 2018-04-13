UI.Splitter = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  debugToConsole : true,
  Compiled       : false,
  init: function(){
    this.Initialized=true;
    UI.Controls.Add(this);
  },
  Create         : function(Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Left;
    var _sp=Slides.createSlide("Splitter","Splitter SplitterGradient",Screen,Owner,Parent,Align);
    _sp.Container.style.cursor="col-resize";
    _sp.clearContainerClass();
    _sp.targetLeft=null;
    _sp.targetRight=null;
    _sp.targetTop=null;
    _sp.targetBottom=null;
    _sp.onSized=null;
    _sp.MouseDown=false;
    _sp.Touching=false;
    _sp.minWidth=20;
    _sp.Border=new Border();
    _sp.startOffset=0;
    _sp.toResize=0;
    _sp.xBias=0;
    _sp.setBias=function(){
      var sp=this;
      sp.Border.Load(sp.Container);
      sp.xBias=coMath.Div(sp.Container.offsetWidth+sp.Border.xBias(),2);
    };
    _sp.doMove=function(iX){
      var sp=this;
      iX=Math.max(sp.targetLeft.Container.offsetLeft+iX-sp.xBias,sp.minWidth);
      if ( (sp.Parent.clientWidth-(iX+sp.Container.offsetWidth)) < sp.minWidth )
        iX=sp.Parent.clientWidth-(sp.Container.offsetWidth+sp.minWidth);

      sp.Container.style.left=iX + "px";
      var iWidth=sp.targetLeft.Container.offsetLeft+iX;

      sp.targetLeft.Container.style.width=iWidth+"px";
      sp.targetRight.Container.style.left=sp.Container.offsetLeft+sp.Container.offsetWidth+"px";
      sp.targetRight.Container.style.width=sp.Parent.clientWidth-sp.targetRight.Container.offsetLeft +"px";
      sp.Screen.Slides.setSize();
    };

    _sp.onTouchStart=function(e){
      if (e==undefined) e=window.event;
      coAppUI.iFrames.Disable();
      var sp=this;
      sp.setBias();
      sp.Touching=true;
      var touch = e.touches[e.touches.length-1];
      sp.startOffset=touch.clientX-sp.Container.offsetLeft;
      if (coVDM.VDM.Browser.Mouse==true){
        sp.evtMouseDown.setActive(false);
        sp.evtMouseMove.setActive(false);
        sp.evtMouseUp.setActive(false);
      };
      sp.evtTouchMove.setActive(true);
      sp.evtTouchEnd.setActive(true);
      coDOM.preventDefault(e);
      if (coAppUI.debugToConsole==true) coVDM.VDM.Console.Append("Splitter.onTouchStart (startOffset="+sp.startOffset+")");
    };
    _sp.onTouchMove=function(e){
      if (e==undefined) e=window.event;
      var sp=this;
      var srcElm=coDOM.srcElement(e);
      if (sp.Container==srcElm) {
        sp.Touching=true;
        var touch = e.touches[e.touches.length-1];
        var iDX=touch.clientX-sp.startOffset;
        sp.doMove(iDX);
        coDOM.preventDefault(e);
      };
    };
    _sp.onTouchEnd=function(e){
      if (e==undefined) e=window.event;
      coAppUI.ConsealediFrames.Enable();

      var sp=this;
      sp.Touching=true;
      if (coVDM.VDM.Browser.Mouse==true){
        sp.evtMouseDown.setActive(true);
        sp.evtMouseMove.setActive(true);
        sp.evtMouseUp.setActive(false);
      };
      sp.evtTouchMove.setActive(false);
      sp.evtTouchEnd.setActive(false);
      coDOM.preventDefault(e);
      if (sp.onSized) sp.onSized();
    };
    _sp.onMouseUp=function(e){
      if (e==undefined) e=window.event;
      var sp = this;
      coAppUI.ConsealediFrames.Enable();
      sp.MouseDown=false;
      sp.evtTouchStart.setActive(true);
      sp.evtTouchMove.setActive(false);
      sp.evtTouchEnd.setActive(false);
      if (coVDM.VDM.Browser.Mouse==true){
        sp.evtMouseMove.setActive(false);
        sp.evtMouseUp.setActive(false);
      };
      if (sp.onSized) sp.onSized();
      coDOM.preventDefault(e);
    };
    _sp.onMouseDown=function(e){
      if (e==undefined) e=window.event;
      var sp = this;
      coAppUI.iFrames.Disable();
      sp.setBias();
      sp.MouseDown=true;
      sp.startScreenOffset=coUtils.getOffsetLeft(sp.Container,coVDM.VDM.WorkSpace.Container)+e.clientX;
      sp.startOffset=sp.Container.offsetLeft+e.clientX;
      sp.evtTouchStart.setActive(false);
      sp.evtTouchMove.setActive(false);
      sp.evtTouchEnd.setActive(false);
      if (coVDM.VDM.Browser.Mouse==true){
        sp.evtMouseMove.setActive(true);
        sp.evtMouseUp.setActive(true);
      };
      coDOM.preventDefault(e);
    };
    _sp.onMouseMove=function(e){
      if (e==undefined) e=window.event;
      var sp = this;
      if (sp.MouseDown==true){
        var iX=sp.startOffset+(e.pageX-sp.startScreenOffset);
        sp.doMove(iX);
      };
      coDOM.preventDefault(e);
    };

    _sp.evtTouchStart=coEvents.Add(_sp.Container,"touchstart",function(e){_sp.onTouchStart(e);},coEvents.Capture,coEvents.Active);
    _sp.evtTouchMove=coEvents.Add(window,"touchmove",function(e){_sp.onTouchMove(e);},coEvents.Capture,coEvents.NoActivate);
    _sp.evtTouchEnd=coEvents.Add(window,"touchend",function(e){_sp.onTouchEnd(e);},coEvents.Capture,coEvents.NoActivate);
    if (coVDM.VDM.Browser.Mouse==true){
      _sp.evtMouseDown=coEvents.Add(_sp.Container,"mousedown",function(e){_sp.onMouseDown(e);},coEvents.Capture,coEvents.Active);
      _sp.evtMouseMove=coEvents.Add(window,"mousemove",function(e){_sp.onMouseMove(e);},coEvents.Capture,coEvents.NoActivate);
      _sp.evtMouseUp=coEvents.Add(window,"mouseup",function(e){_sp.onMouseUp(e);},coEvents.Capture,coEvents.NoActivate);
    };
    _sp.onSetSize=function(){
      var sp=this;
    };
    return _sp;
  }
};
