coAppUI.App.Components.Password = {
  Version        : new Version(2014,9,6,19),
  Title          : new Title("Aurawin UI Password","Password"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Password.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function(aOwner,aParent,sName,sClass,sHint,sPlaceHolder){
    if (sName==undefined) sName="";
    if (sClass==undefined) sClass="";
    if (sHint==undefined) sHint="";
    if (sPlaceHolder==undefined) sPlaceHolder="";
    var s=coObject.Create();
    s.AllowInput=new coAppUI.App.Components.Text.AllowInput();
    s.AllowInput.setPassword();
    s.Visible=false;
    s.Hidden=false;
    s.Class="Password";
    s.Parent=aParent;
    s.Owner=aOwner;
    if (aOwner.Controls) aOwner.Controls.push(s);

    s.Container=document.createElement('input');
    s.Container.setAttribute("type","password");
    s.Parent.appendChild(s.Container);

    s.Container.className=(sClass.length>0) ? s.Class+" "+sClass : s.Class;
    s.Container.Owner=s;
    s.itemIndex=-1;
    s.Numeric=true;
    s.onChange=null;
    s.onNext=null;
    s.onFocus=null;
    s.onChange=null;

    s.Placement=new Placement();
    s.Border=new Border();
    s.Padding=new Padding();
    s.Margin=new Margin();
    s.Container.name=sName;
    s.Container.title=sHint;
    s.Visible=(coUtils.getStyle(s.Container,'visibility')=='visible');

    coDOM.setPlaceHolder(s.Container,sPlaceHolder);
    s.Focus=function(){
      this.Container.focus();
    };
    s.Blur=function(){
      this.Container.blur();
    };
    s.Container.onfocus=function(){
      var s=this.Owner;
      coVDM.VDM.Status.Hide();
      if (s.onFocus)
        s.onFocus(s);
    };
    s.Container.onchange=function(e){
      var s=this.Owner;
      coVDM.VDM.Status.Hide();
      if (s.onChange)
        s.onChange(s);
    };
    s.Container.onkeypress=function(e){
      var kOld=coDOM.getKeyCode(e);

      switch (this.Owner.AllowInput.Value) {
        case (this.Owner.AllowInput.Password) :
          if (
               (
                 ( ((kOld>=35) && (kOld<=39))==false) &&
                 ( ((kOld>=48) && (kOld<=57))==false) &&
                 ( ((kOld>=65) && (kOld<=90))==false) &&
                 ( ((kOld>=97) && (kOld<=122))==false) &&
                 ( ((kOld>=45) && (kOld<=46))==false) &&

                 (kOld!=43) &&
                 (kOld!=46) &&
                 (kOld!=95)

               )==true
          ) {
            coDOM.setKeyCode(e,0);
            e.preventDefault();
          };
          break;
        case (this.Owner.AllowInput.Username) :
          if (
               (
                 ( ((kOld>=35) && (kOld<=39))==false) &&
                 ( ((kOld>=48) && (kOld<=57))==false) &&
                 ( ((kOld>=65) && (kOld<=90))==false) &&
                 ( ((kOld>=97) && (kOld<=122))==false) &&
                 ( ((kOld>=45) && (kOld<=46))==false) &&

                 (kOld!=46) &&
                 (kOld!=95)

               )==true
          ) {
            coDOM.setKeyCode(e,0);
            e.preventDefault();
          };
          break;
        case (this.Owner.AllowInput.All) :
          break;
        case (this.Owner.AllowInput.Numeric) :
          if (((kOld>=48) && (kOld<=57))==false){
            coDOM.setKeyCode(e,0);
            e.preventDefault();
          };
          break;
        case (this.Owner.AllowInput.Alpha) :
          if (((kOld>=48) && (kOld<=57))==true){
            coDOM.setKeyCode(e,0);
            e.preventDefault();
          };
          break;
        case (this.Owner.AllowInput.AlphaNumeric) :
          if (
               (
                 ( ((kOld>=35) && (kOld<=39))==false) &&
                 ( ((kOld>=48) && (kOld<=57))==false) &&
                 ( ((kOld>=65) && (kOld<=90))==false) &&
                 ( ((kOld>=97) && (kOld<=122))==false)
               )==true
          ) {
            coDOM.setKeyCode(e,0);
            e.preventDefault();
          };
          break;
      };
      if ( ( (kOld==9) || (kOld==13)) && (this.Owner.onNext)){
        coVDM.VDM.Status.Hide();
        this.Owner.onNext(this.Owner);
      };
    };
    s.Container.onchange=function(e){
      var s=this.Owner;
      if (s.onChange)
        s.onChange(s);
    };
    s.setPattern=function(sPattern){
      this.Container.pattern=sPattern;
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
      if (pElm) {
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
