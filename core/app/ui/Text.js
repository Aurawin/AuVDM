coAppUI.App.Components.Text = {
  Version        : new Version(2014,10,26,58),
  Title          : new Title("Aurawin UI Text","Text"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Text.js',coAppKit.PreLoaded),
  debugToConsole : true,
  AllowInput : function(){
    this.Alpha=1;
    this.Numeric=2;
    this.AlphaNumeric=3;
    this.Password=4;
    this.Username=5;
    this.Postal=6;
    this.All=7;
    this.Value=this.All;
    this.NextOnTab=true;
    this.setNumeric=function(){
      this.Value=this.Numeric;
    };
    this.setAlpha=function(){
      this.Value=this.Alpha;
    };
    this.setAlphaNumeric=function(){
      this.Value=this.AlphaNumeric;
    };
    this.setPassword=function(){
      this.Value=this.Password;
    };
    this.setPostal=function(){
      this.Value=this.Postal;
    };
    this.setUsername=function(){
      this.Value=this.Username;
    };
    return this;
  },
  Create         : function(aOwner,aParent,sName,sClass,sHint,sPlaceHolder){
    if (sName==undefined) sName="";
    if (sClass==undefined) sClass="";
    if (sHint==undefined) sHint="";
    if (sPlaceHolder==undefined) sPlaceHolder="";
    var s=coObject.Create();
    s.Unit=this;
    s.AllowInput=new coAppUI.App.Components.Text.AllowInput();
    s.Visible=false;
    s.Hidden=false;
    s.Class="Text";
    s.Parent=aParent;
    s.Owner=aOwner;
    s.Loading=false;
    s.onNext=null;
    s.onFocus=null;
    s.onChange=null;

    if (aOwner.Controls) aOwner.Controls.push(s);

    s.Container=document.createElement('input');
    s.Parent.appendChild(s.Container);
    s.Container.className=(sClass.length>0) ? s.Class+" "+sClass : s.Class;
    s.Container.Owner=s;
    s.itemIndex=-1;
    s.Numeric=true;

    s.Placement=new Placement();
    s.Border=new Border();
    s.Padding=new Padding();
    s.Margin=new Margin();
    s.Container.name=sName;
    s.Container.title=sHint;
    s.Visible=$(s.Container).css("visibility")=='visible';

    coDOM.setPlaceHolder(s.Container,sPlaceHolder);
    s.setReadOnly=function(bValue){
      this.Container.readOnly=(bValue==true);
    };
    s.Serialize=function(){
      return $(this.Container).serialize();
    };
    s.Focus=function(){
      this.Container.focus();
    };
    s.selectAll=function(){
      this.Container.select();
    };
    s.Blur=function(){
      this.Container.blur();
    };
    s.setFontSize=function(iSize){
      var s=this;
      s.Container.style.fontSize=iSize+"px";
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
        case (this.Owner.AllowInput.Postal) :
          if (
               (
                 ( ((kOld>=35) && (kOld<=39))==false) &&
                 (      (kOld!=45)                  )  &&
                 ( ((kOld>=48) && (kOld<=57))==false) &&
                 ( ((kOld>=65) && (kOld<=90))==false) &&
                 ( ((kOld>=97) && (kOld<=122))==false)
               )==true
          ) {
            coDOM.setKeyCode(e,0);
            e.preventDefault();
          };
      };
      if ( ((kOld==9) || (kOld==13)) && (this.Owner.onNext) ){
        coVDM.VDM.Status.Hide();
        this.Owner.onNext(this.Owner);
        coDOM.setKeyCode(e,0);
      };
    };
    s.Container.onkeydown=function(e){
      var kOld=coDOM.getKeyCode(e);
      if ( (kOld==9) && (this.Owner.onNext) && (this.Owner.NextOnTab==true) ){
        coVDM.VDM.Status.Hide();
        this.Owner.onNext(this.Owner);
        coDOM.setKeyCode(e,0);
        coDOM.preventDefault(e);
      } else if (kOld==46) {
        coDOM.setKeyCode(e,0);
        coDOM.preventDefault(e);
        this.Owner.Clear();
      };
    };
    s.Container.onkeyup=function(e){
      var s=this.Owner;
      var kOld=coDOM.getKeyCode(e);
      if (
        (e.ctrlKey==false) &&
        (kOld>40) &&
        (s.onChange)
      ) if (s.onChange) s.tmrChange.setActive(true);
    };
    s.Container.onfocus=function(e){
      var s=this.Owner;
      coVDM.VDM.Status.Hide();
      coEvents.NavigationLock.Lock(coVDM.InputFocusDelay);
      coEvents.ScrollLock.Lock(coVDM.InputFocusDelay);
      if (s.onFocus)
        s.onFocus(s);
    };
    s.Container.onblur=function(e){
      var s=this.Owner;
    };
    s.Container.oninput=function(e){
      var s=this.Owner;
      coVDM.VDM.Status.Hide();
      if (s.Loading==true) return;
      if (s.onChange) s.tmrChange.setActive(true);
    };
    s.setPattern=function(sPattern){
      this.Container.pattern=sPattern;
    };
    s.tmrChange=coApp.Timers.createItem(coVDM.EditChangeNotifiyDelay);
    s.tmrChange.Owner=s;
    s.tmrChange.RunOnce=true;
    s.tmrChange.onExecute=function(){
      var s=this.Owner;
      s.onChange(s);
    };
    s.setPlaceHolder=function(sMessage){
      coDOM.setPlaceHolder(this.Container,sMessage);
    };
    s.setCaption=function(sCaption){
      this.Loading=true;
      this.Container.value=sCaption;
      this.Loading=false;
    };
    s.getTextLength=function(){
      return this.Container.value.length;
    };
    s.Clear=function(){
      this.Loading=true;
      this.Container.value="";
      this.Loading=false;
    };
    s.setVisible=function(Value){
      this.Container.style.visibility=(Value==true) ? "visible": "hidden";
      this.Visible=(Value==true);
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
      var s=this; var elm=this.Container; var pElm=this.Parent;
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
          elm.style.width=pElm.clientWidth-s.Placement.Left-s.Placement.Right-s.Padding.xBias()-s.Border.xBias()+"px";
          elm.style.height=pElm.clientHeight-s.Placement.Top-s.Placement.Bottom+"px";
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

