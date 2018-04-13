UI.Torus = {
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
  Create         : function(aFrame,Owner,Parent,Mode){
    if (Mode==undefined) Mode="block";
    var _tr=coObject.Create();
    _tr.Class="Torus";
    _tr.Container=document.createElement('div');
    _tr.Frame=aFrame;
    _tr.Owner=Owner;
    _tr.Parent=Parent;
    _tr.Visible=false;
    _tr.showTimeout=coVDM.torusTimeout;
    _tr.tmrHide=0;
    _tr.toTimeout=0;
    _tr.spinCount=0;
    _tr.Started=false;
    _tr.displayMode=Mode;
    _tr.Container.className=_tr.Class;
    _tr.Parent.appendChild(_tr.Container);
    _tr.Container.style.display="none";

    _tr.Placement=new Placement();
    _tr.Placement.Mode.setBottomRight();
    _tr.Placement.Bottom=10;
    _tr.Placement.Right=10;

    if (Owner.Controls) Owner.Controls.push(_tr);

    _tr.Overlay=document.createElement('div');
    _tr.Overlay.className=_tr.Class+"Overlay";
    _tr.Container.appendChild(_tr.Overlay);
    _tr.enforcePlacement=function(){
      var s=this; var elm=this.Container; var pElm=elm.offsetParent;
      switch (s.Placement.Mode.Value) {
        case (s.Placement.Mode.TopLeft) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          elm.style.right="";
          elm.style.bottom="";
          break;
        case (s.Placement.Mode.TopRight) :
          elm.style.right=s.Placement.Right+"px";
          elm.style.top=s.Placement.Top+"px";
          elm.style.left="";
          elm.style.bottom="";
          break;
        case (s.Placement.Mode.TopLeftRight) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          elm.style.width=pElm.clientWidth-(s.Placement.Left+s.Placement.Right+s.Padding.xBias())+"px";
          elm.style.bottom="";
          elm.style.right="";
          break;
        case (s.Placement.Mode.TopCenter) :
          elm.style.top=s.Placement.Top+"px";
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.left=iLeft+"px";
          elm.style.bottom="";
          elm.style.right="";
          break;
        case (s.Placement.Mode.BottomRight) :
          elm.style.bottom=s.Placement.Bottom+"px";
          elm.style.right=s.Placement.Right+"px";
          elm.style.top="";
          elm.style.left="";
          break;
        case (s.Placement.Mode.BottomLeft) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.bottom=s.Placement.Bottom+"px";
          elm.style.top="";
          elm.style.right="";
          break;
        case (s.Placement.Mode.Center) :
          var iTop=Math.round((pElm.clientHeight-elm.offsetHeight)/2);
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.left=iLeft+"px";
          elm.style.top=iTop+"px";
          elm.style.right="";
          elm.style.bottom="";
          break;
        case (s.Placement.Mode.Full) :
          elm.style.top=s.Placement.Top+"px";
          elm.style.left=s.Placement.Left+"px";
          elm.style.width=pElm.clientWidth-s.Placement.Right+"px";
          elm.style.height=pElm.clientHeight-s.Placement.Bottom+"px";
          elm.style.right="";
          elm.style.bottom="";
          break;
      };
    };
    _tr.resetTimers=function(){
      var tr=this;
      if (tr.toTimeout!=0) {
        clearTimeout(tr.toTimeout);
        tr.toTimeout=0;
      };
      if (tr.tmrHide!=0){
        clearTimeout(tr.tmrHide);
        tr.tmrHide=0;
      };
    };
    _tr.doShow=function(){
      var tr=this;
      bShow=(tr.Owner.Visible==undefined)? (tr.Frame.Screen.Visible==true) : tr.Owner.Visible;
      if (bShow==true) {
        tr.Visible=true;
        tr.Container.style.visibility="visible";
        tr.Container.style.display=tr.displayMode;
        tr.enforcePlacement();
      };
    };
    _tr.Show=function(){
      var tr=this;
      if (tr.Started==true) return;
      tr.resetTimers();
      tr.spinCount+=1;
      tr.doShow();
      tr.toTimeout=setTimeout(
        function(){
          tr.toTimeout=0;
          tr.resetTimers();
          tr.Visible=false;
          tr.spinCount=0;
          tr.Container.style.display="none";
        },
        tr.showTimeout
      );
    };
    _tr.Start=function(){
      var tr=this;
      if (tr.Started==true) return;
      tr.Started=true;
      tr.resetTimers();
      tr.doShow();
    };
    _tr.Stop=function(){
      var tr=this;
      tr.Started=false;
      tr.resetTimers();
      tr.Visible=false;
      tr.Container.style.display="none";
    };
    _tr.Hide=function(iLinger){
      if (!iLinger) iLinger=coVDM.torusAutoHide;
      var tr=this;
      tr.spinCount-=1;
      if (tr.Frame.Screen.Visible==false){
        tr.resetTimers();
        tr.Visible=false;
        tr.Container.style.display="none";
      } else  if ( tr.spinCount<=0) {
        if (tr.Started==true) return;
        if (iLinger<100){
          tr.resetTimers();
          tr.Visible=false;
          tr.Container.style.display="none";
        } else {
          if (tr.tmrHide==0){
            var _tr=this;
            tr.tmrHide=setTimeout(
              function(){
                var tr=_tr;
                tr.resetTimers();
                tr.Visible=false;
                tr.Container.style.display="none";
                tr.tmrHide=0;
              },
              iLinger
            );
          };
        };
      };
    };
    _tr.Free=function(){
      if (this.Owner.Controls) {
        var idx=this.Owner.Controls.indexOf(this);
        if (idx!=-1) this.Owner.Controls.splice(idx,1);
      };
      var tr=this;
      tr.resetTimers();
      tr.Container.removeChild(tr.Overlay);
      tr.Parent.removeChild(tr.Container);
      if (tr.Frame.Torus==tr)  tr.Frame.Torus=null;
      tr=coObject.Release(tr);
      return null;
    };
    return _tr;
  }
};
