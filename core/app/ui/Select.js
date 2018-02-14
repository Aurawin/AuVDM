coAppUI.App.Components.Select = {
  Version        : new Version(2014,3,31,32),
  Title          : new Title("Aurawin Select","Select"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Select.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function(aOwner,aParent,sName,sClass,sPlaceholder){
    if (sName==undefined) sName="";
    if (sClass==undefined) sClass="";
    if (sPlaceholder==undefined) sPlaceholder="";

    var s=coObject.Create();
    s.Visible=false;
    s.Hidden=false;
    s.Class=sClass;
    s.Parent=aParent;
    s.Owner=aOwner;

    if (aOwner.Controls) aOwner.Controls.push(s);

    s.Container=document.createElement('select');
    s.Parent.appendChild(s.Container);
    s.Container.className=(s.Class.length>0) ? "Select "+s.Class : "Select";

    if (coVDM.VDM.Browser.Chrome==true){
      s.Container.style.backgroundImage="url("+coTheme.Icons.Arrow.Blue.Down+")";
      s.Container.style.backgroundPosition="center right";
      s.Container.style.backgroundSize="17px 17px";
      s.Container.style.backgroundRepeat="no-repeat";
      s.Container.style.webkitAppearance="none";
    };
    s.Container.Owner=s;
    s.Container.name=sName;
    s.Enabled=true;
    s.itemIndex=-1;
    s.onChange=null;
    s.Placement=new Placement();
    s.Border=new Border();
    s.Padding=new Padding();
    s.Margin=new Margin();
    s.Placeholder=sPlaceholder;
    s.Visible=(coUtils.getStyle(s.Container,'visibility')=='visible');
    coTheme.UI.Select.Apply(s.Container);

    s.Container.onload=function(e){
      var s=this.Owner;
    };
    s.Container.onchange=function(e){
      var s=this.Owner;
      s.itemIndex=this.selectedIndex;
      if (s.onChange)
        s.onChange(s);
    };
    s.setEnabled=function(Value){
      var s=this;
      s.Enabled=(Value==true);
      s.Container.disabled=(Value!=true);
    };
    s.Serialize=function(){
      return escape(this.Container.name)+'='+escape(this.Container.value);
    };
    s.Container.onfocus=function(e){
      var s=this.Owner;
      coEvents.NavigationLock.Lock(coVDM.InputFocusDelay);
      coEvents.ScrollLock.Lock(coVDM.InputFocusDelay);
    };
    s.addOption=function(sName,Value,bSelected,bDisabled){
      var opts=this.Container.options;
      var opt=new Option();
      opt.className=this.Class;
      opt.text=sName;
      opt.value=Value;
      opt.defaultSelected=(bSelected==true);
      opt.disabled=(bDisabled==true);
      opts.add(opt);
      coTheme.UI.Select.ApplyToOption(opt);
      return opt;
    };
    s.Clear=function(){
      var opts=this.Container.options;
      opts.length=0;
      if ((this.Placeholder) && (this.Placeholder.length>0))
        this.addOption(this.Placeholder,this.Placeholder,true,true);
    };
    s.setCaption=function(sCaption){
      var sCaption="".concat(sCaption).toLowerCase();
      var ops=this.Container.options;
      for (var iLcv=0; iLcv<ops.length; iLcv++){
        if(ops[iLcv].value.toLowerCase()==sCaption){
          ops.selectedIndex=iLcv;
          return;
        };
      };
    };
    s.getCaption=function(){
      return this.Container.value;
    };
    s.getValue=function(){
      return this.Container.value;
    };
    s.setClass=function(sClass){
      this.Container.className=sClass;
      this.loadCSS();
    };
    s.setOptionsClass=function(sClass){
      var ops=this.Container.options;
      for (var iLcv=0; iLcv<ops.length; iLcv++){
        ops[iLcv].className=sClass;
      };
    };
    s.Focus=function(){
      this.Container.focus();
    };
    s.selectedIndex=function(){
      return this.Container.selectedIndex;
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
    };
    s.enforcePlacement=function(){
      var s=this; var elm=this.Container; var pElm=elm.offsetParent;
      switch (s.Placement.Mode.Value) {
        case (s.Placement.Mode.TopLeftRight) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          elm.style.width=pElm.clientWidth-(s.Placement.Left+s.Placement.Right)+"px";
          break;
        case (s.Placement.Mode.TopLeft) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          break;
        case (s.Placement.Mode.TopRight) :
          elm.style.right=s.Placement.Right+"px";
          elm.style.top=s.Placement.Top+"px";
          break;
        case (s.Placement.Mode.TopCenter) :
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.left=iLeft+"px";
          elm.style.top=s.Placement.Top+"px";
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
    s.Clear();
    return s;
  }
};
