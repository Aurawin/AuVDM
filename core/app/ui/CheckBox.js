UI.CheckBox = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  Compiled       : false,
  init:function(){
    this.Initialized=true;
    UI.Controls.Add(this);  
  },
  Create         : function(aOwner,aParent,sName,sClass,sLabel,sHint){
    if (sName==undefined) sName="";
    if (sClass==undefined) sClass="";
    if (sLabel==undefined) sLabel="";
    if (sHint==undefined) sHint="";
    var s=coObject.Create();
    s.AllowInput=new coAppUI.App.Components.Text.AllowInput();
    s.Visible=false;
    s.Hidden=false;
    s.Class="CheckBox";
    s.Parent=aParent;
    s.Checked=false;

    s.Owner=aOwner;
    if (aOwner.Controls) aOwner.Controls.push(s);

    s.Container=document.createElement('div');
    s.Parent.appendChild(s.Container);
    s.Container.className=(sClass.length>0) ? sClass +" "+s.Class: s.Class;

    s.Input=document.createElement('input');
    s.Container.appendChild(s.Input);
    s.Input.setAttribute("type","checkbox");
    s.Input.className=s.Container.className;
    s.Input.Owner=s;

    s.Label=document.createElement('div');
    s.Container.appendChild(s.Label);
    s.Label.className=(sClass.length>0) ? s.Class + "Label " + sClass : s.Class+"Label";

    s.Container.Owner=s;
    s.itemIndex=-1;
    s.Numeric=true;
    s.onChange=null;
    s.Placement=new Placement();
    s.Border=new Border();
    s.Padding=new Padding();
    s.LabelPadding=new Padding();
    s.Margin=new Margin();
    s.Container.name=sName;
    s.Container.title=sHint;

    s.Visible=(coUtils.getStyle(s.Container,'visibility')=='visible');

    s.Label.title=sHint;
    coDOM.setText(s.Label,sLabel);
    s.evtLabelMouseUp=coEvents.Add(s.Label,"mouseup",function(e){e.preventDefault(); s.doClick(s);},coEvents.Capture,coEvents.Activate);
    s.evtLabelTouchEnd=coEvents.Add(s.Label,"touchend",function(e){e.preventDefault(); s.doClick(s);},coEvents.Capture,coEvents.Activate);
    s.Input.onchange=function(e){
      var s=this.Owner;
      if (s.onChange)
        s.onChange(s);
    };
    s.doClick=function(s){
      s.Input.checked=(!s.Input.checked);
      if (s.onChange)
        s.onChange(s);
    };
    s.setCaption=function(sCaption){
      coDOM.setText(this.Label,sCaption);
    };
    s.getChecked=function(){
      return this.Input.checked;
    };
    s.setChecked=function(value){
      this.Input.checked=(value==true);
    };
    s.setHint=function(sHint){
      this.Label.title=sHint;
    };
    s.getCaption=function(){
      return coDOM.getText(this.Label);
    };
    s.setClass=function(sClass){
      this.Container.className=sClass;
      this.loadCSS();
    };
    s.setHeight=function(height){
      var iY=height-(this.Border.yBias()+this.Padding.yBias());
      this.Container.style.height=iY+"px";
    };
    s.setWidth=function(value){
      this.Container.style.width=value+"px";
    };
    s.setSize=function(ix,iY){
      var iX=iX-this.Border.xBias()-this.Padding.xBias();
      this.Container.style.width=iX+"px";
    };
    s.Conseal=function(){
      this.Hide();
      this.Hidden=true;
      this.Container.style.display="none";
    };
    s.Reveal=function(){
      this.Hidden=false;
      this.Container.style.display="block";
      this.Show();
    };
    s.doResize=function(){
      var s=this;
      var iH=s.Container.clientHeight;
      var iW=s.Container.clientWidth;

      this.Input.style.left=s.Padding.Left+"px";
      this.Input.style.top=coMath.Div((iH-this.Input.offsetHeight),2)+"px";

      this.Label.style.height=iH+"px";

      this.Label.style.left=this.Input.offsetLeft+this.Input.offsetWidth+2+"px";
      this.Label.style.width=iW-(this.Label.offsetLeft+this.LabelPadding.xBias()) +"px";
    };
    s.enforcePlacement=function(){
      var s=this; var elm=this.Container; var pElm=elm.offsetParent;
      switch (s.Placement.Mode.Value) {
        case (s.Placement.Mode.TopLeft) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          break;
        case (s.Placement.Mode.TopRight) :
          elm.style.right=s.Placement.Right+"px";
          elm.style.top=s.Placement.Top+"px";
          break;
        case (s.Placement.Mode.TopLeftRight) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          elm.style.width=pElm.clientWidth-(s.Placement.Left+s.Placement.Right+s.Padding.xBias())+"px";
          break;
        case (s.Placement.Mode.TopCenter) :
          elm.style.top=s.Placement.Top+"px";
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.left=iLeft+"px";
          break;
        case (s.Placement.Mode.Center) :
          var iTop=Math.round((pElm.clientHeight-elm.offsetHeight)/2);
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.left=iLeft+"px";
          elm.style.top=iTop+"px";
          break;
        case (s.Placement.Mode.Full) :
          elm.style.top=s.Placement.Top+"px";
          elm.style.left=s.Placement.Left+"px";
          elm.style.width=pElm.clientWidth-s.Placement.Right+"px";
          elm.style.height=pElm.clientHeight-s.Placement.Bottom+"px";
          break;
      };
      s.doResize();
    };
    s.Show=function(){
      if (this.Hidden==true) return;
      this.Visible=true;
      this.Container.style.visibility="visible";
    };
    s.Hide=function(){
      this.Visible=false;
      this.Container.style.visibility="hidden";
    };
    s.loadCSS=function(){
      this.Border.Load(this.Container);
      this.Padding.Load(this.Container);
      this.Margin.Load(this.Container);
      this.LabelPadding.Load(this.Label);
      coDOM.clearMargins(this.Container);
    };
    s.Free=function(){
      if (this.Owner.Controls) {
        var idx=this.Owner.Controls.indexOf(this);
        if (idx!=-1) this.Owner.Controls.splice(idx,1);
      };
      this.Label.EventList.Free();
      this.Container.removeChild(this.Label);
      this.Container.removeChild(this.Input);
      this.Parent.removeChild(this.Container);
      this.Placement.Free();
      coObject.Release(this);
      return null;
    };
    s.loadCSS();
    return s;
  }
};
