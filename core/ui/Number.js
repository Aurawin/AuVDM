coAppUI.App.Components.Number = {
  Version        : new Version(2013,5,18,5),
  Title          : new Title("Aurawin UI Number","Number"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Number.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function(aOwner,aParent,sName,sClass,sHint,sPlaceHolder){
    if (sName==undefined) sName="";
    if (sClass==undefined) sClass="";
    if (sHint==undefined) sHint="";
    if (sPlaceHolder==undefined) sPlaceHolder="";
    var s=coObject.Create();
    s.Visible=false;
    s.Hidden=false;
    s.Class="Number";
    s.Parent=aParent;
    s.Owner=aOwner;
    if (aOwner.Controls) aOwner.Controls.push(s);

    s.Container=document.createElement('input');
    s.Container.type="number";
    s.Parent.appendChild(s.Container);
    s.Container.className=(sClass.length>0) ? s.Class+" "+sClass : s.Class;
    s.Container.Owner=s;
    s.itemIndex=-1;
    s.onChange=null;
    s.Placement=new Placement();
    s.Border=new Border();
    s.Padding=new Padding();
    s.Margin=new Margin();
    s.Container.name=sName;
    s.Container.title=sHint;
    coDOM.setPlaceHolder(s.Container,sPlaceHolder);
    s.Visible=(coUtils.getStyle(s.Container,'visibility')='visible');

    s.Container.onchange=function(e){
      var s=this.Owner;
      s.itemIndex=this.selectedIndex;
      if (s.onChange)
        s.onChange(s);
    };
    s.setPlaceHolder=function(sMessage){
      coDOM.setPlaceHolder(this.Container,sMessage);
    };
    s.setCaption=function(sCaption){
      this.Container.value=sCaption;
    };
    s.setHint=function(sHint){
      this.Container.title=sHint;
    };
    s.getCaption=function(){
      return this.Container.value;
    };
    s.setClass=function(sClass){
      this.Container.className=sClass;
      this.loadCSS();
    };
    s.setHeight=function(height){
      var iY=height-(this.Border.yBias()+this.Padding.yBias());
      this.Container.style.height=iY+"px";
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
    s.enforcePlacement=function(){
      var s=this; var elm=this.Container; var pElm=elm.offsetParent;
      switch (s.Placement.Mode.Value) {
        case (s.Placement.Mode.TopLeft) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          //elm.style.width=pElm.clientWidth-(s.Placement.Left+s.Placement.Right)+"px";
          break;
        case (s.Placement.Mode.TopLeftRight) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          elm.style.width=pElm.clientWidth-(s.Placement.Left+s.Placement.Right+s.Padding.xBias())+"px";
          break;
        case (s.Placement.Mode.Center) :
          var iTop=Math.round((pElm.clientHeight-elm.offsetHeight)/2);
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.left=iLeft+"px";
          elm.style.top=iTop+"px";
          break;
        case (l.Placement.Mode.Full) :
          elm.style.top=s.Placement.Top+"px";
          elm.style.left=s.Placement.Left+"px";
          elm.style.width=pElm.clientWidth-s.Placement.Right+"px";
          elm.style.height=pElm.clientHeight-s.Placement.Bottom+"px";
          break;
      };
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
      coDOM.clearMargins(this.Container);
    };
    s.Free=function(){
      if (this.Owner.Controls) {
        var idx=this.Owner.Controls.indexOf(this);
        if (idx!=-1) this.Owner.Controls.splice(idx,1);
      };
      this.Parent.removeChild(this.Container);
      this.Placement.Free();
      coObject.Release(this);
      return null;
    };
    s.loadCSS();
    return s;
  }
};
