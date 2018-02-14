coAppUI.App.Components.Button = {
  Version        : new Version(2014,3,16,37),
  Title          : new Title("Aurawin UI Button","Button"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Button.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function(aOwner,aParent,sName,sClass,sCaption){
    if (sName==undefined) sName="";
    if (sClass==undefined) sClass="";
    if (sCaption==undefined) sCaption="";

    var l=coObject.Create();
    l.Visible=false;
    l.Hidden=false;
    l.Class="Button";
    l.Parent=aParent;
    l.Owner=aOwner;

    if (aOwner.Controls) aOwner.Controls.push(l);
    l.Enabled=true;
    l.Container=document.createElement('div');
    l.Parent.appendChild(l.Container);
    l.Container.className=(sClass.length>0) ? l.Class+" "+sClass : l.Class;
    l.Container.name=sName;
    l.Placement=new Placement();
    l.Border=new Border();
    l.Padding=new Padding();
    l.Margin=new Margin();
    l.onClick=null;
    l.Visible=(coUtils.getStyle(l.Container,'visibility')=='visible');

    coDOM.setText(l.Container,sCaption);
    l.evtFocus=coEvents.Add(
      l.Container,
      "focus",
      function(e){
        coEvents.NavigationLock.Lock(coVDM.InputFocusDelay);
        coEvents.ScrollLock.Lock(coVDM.InputFocusDelay);
      },
      coEvents.Capture,
      coEvents.Active
    );
    l.evtMouseUp=coEvents.Add(l.Container,"mouseup",  function(e){e.preventDefault(); if (l.Enabled==true) l.doClick();},coEvents.Capture,coEvents.Active);
    l.evtTouchEnd=coEvents.Add(l.Container,"touchend",function(e){e.preventDefault(); if (l.Enabled==true) l.doClick();},coEvents.Capture,coEvents.Active);
    l.setGylph=function(sURL){
      var l=this;
      if (l.Glyph!=sURL){
        l.Glyph=sURL;
        l.Container.style.backgroundRepeat="no-repeat";
        l.Container.style.backgroundSize="contain";
        l.Container.style.backgroundImage=(sURL.length>0)? "url("+sURL+")" : "none";
      };
    };
    l.setCaption=function(sCaption){
      coDOM.setText(this.Container,sCaption);
    };
    l.doClick=function(){
      coVDM.VDM.Status.Hide();
      if (this.onClick) this.onClick(this);
    };
    l.setClass=function(sClass){
      this.Container.className=sClass;
      this.loadCSS();
    };
    l.setEnabled=function(){
      this.Enabled=true;
      this.Container.disabled=false;
    };
    l.setDisabled=function(){
      this.Enabled=false;
      this.Container.disabled=true;
    };
    l.setHeight=function(height){
      var iY=height-(this.Border.yBias()+this.Padding.yBias());
      this.Container.style.height=iY+"px";
    };
    l.setSize=function(ix,iY){
      var iX=iX-this.Border.xBias()-this.Padding.xBias();
      this.Container.style.width=iX+"px";
    };
    l.enforcePlacement=function(){
      var l=this; var elm=this.Container; var pElm=elm.offsetParent;
      switch (l.Placement.Mode.Value) {
        case (l.Placement.Mode.TopLeftRight) :
          elm.style.left=l.Placement.Left+"px";
          elm.style.top=l.Placement.Top+"px";
          elm.style.width=pElm.clientWidth-(l.Border.xBias()+l.Placement.Left+l.Placement.Right+l.Padding.xBias())+"px";
          break;
        case (l.Placement.Mode.TopLeft) :
          elm.style.left=l.Placement.Left+"px";
          elm.style.top=l.Placement.Top+"px";
          elm.style.right="";
          break;
        case (l.Placement.Mode.TopRight) :
          elm.style.right=l.Placement.Right+l.Border.Right+l.Margin.Right+"px";
          elm.style.top=l.Placement.Top+"px";
          elm.style.left="";
          break;
        case (l.Placement.Mode.BottomLeft) :
          elm.style.left=l.Placement.Left+l.Border.Left+l.Margin.Left+"px";
          elm.style.bottom=l.Placement.Bottom+"px";
          elm.style.right="";
          elm.style.top="";
          break;
        case (l.Placement.Mode.BottomRight) :
          elm.style.right=l.Placement.Right+l.Border.Right+l.Margin.Right+"px";
          elm.style.bottom=l.Placement.Bottom+"px";
          elm.style.left="";
          elm.style.top="";
          break;
        case (l.Placement.Mode.TopCenter) :
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.top=l.Placement.Top+"px";
          elm.style.left=iLeft+"px";
          break;
        case (l.Placement.Mode.Center) :
          var iTop=Math.round((pElm.clientHeight-elm.offsetHeight)/2);
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.left=iLeft+"px";
          elm.style.top=iTop+"px";
          break;
        case (l.Placement.Mode.Full) :
          elm.style.top=l.Placement.Top+"px";
          elm.style.left=l.Placement.Left+"px";
          elm.style.width=pElm.clientWidth-l.Placement.Right+"px";
          elm.style.height=pElm.clientHeight-l.Placement.Bottom+"px";
          break;
      };
    };
    l.Conseal=function(){
      this.Hide();
      this.Hidden=true;
    };
    l.Show=function(){
      if (this.Hidden==true) return;
      this.Visible=true;
      this.Container.style.visibility="visible";
    };
    l.Hide=function(){
      this.Visible=false;
      this.Container.style.visibility="hidden";
    };
    l.loadCSS=function(){
      this.Border.Load(this.Container);
      this.Padding.Load(this.Container);
      this.Margin.Load(this.Container);
      coDOM.clearMargins(this.Container);
    };
    l.Free=function(){
      if (this.Owner.Controls) {
        var idx=this.Owner.Controls.indexOf(this);
        if (idx!=-1) this.Owner.Controls.splice(idx,1);
      };
      this.Container.EventList.Free();
      this.Parent.removeChild(this.Container);
      this.Placement.Free();
      coObject.Release(this);
      return null;
    };
    l.loadCSS();
    return l;
  }
};
