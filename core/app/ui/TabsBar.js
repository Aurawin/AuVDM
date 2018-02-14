coAppUI.App.Components.TabsBar = {
  Version        : new Version(2014,9,13,18),
  Title          : new Title("Aurawin Tabs Bar","TabsBar"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/TabsBar.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Top;
    var _tabs=Slides.createSlide(sName,sClass,Screen,Owner,Parent,Align);
    _tabs.clearContainerClass("TabsBarGradient");
    _tabs._Free=_tabs.Free;
    _tabs.cornerRadius=coTheme.UI.TabsBar.Item.Radius;
    _tabs.Client=document.createElement('div');
    _tabs.Container.appendChild(_tabs.Client);
    _tabs.Client.className=_tabs.Class+"Tabs";
    _tabs.Selected=null;
    _tabs.Torus=null;
    _tabs.Tabs=coObject.Create();
    _tabs.createSizeInfo=function(){
      var tabs=this;
      var si=coObject.Create();
      si.Owner=tabs;
      si.Total=0;
      si.Required=0;
      si.Fixed=0;
      si.Bias=null;
      si.Padding=new Padding();
      si.Margin=new Margin();
      si.Border=new Border();
      si.Calculate=function(){
        var si=this;
        var tabs=si.Owner;
        var tabBias=null;
        si.Total=tabs.Client.clientWidth;
        si.autoCount=0;
        si.Fixed=0;
        for (var iLcv=0; iLcv<tabs.Items.length; iLcv++){
          var tab=tabs.Items[iLcv];
          if (tab.Visible==true) {
            if ( (!tabBias) && (tab.AllowClose==true))
              tabBias=tab;
            if (tab.AutoSize==true) {
              si.autoCount+=1;
            } else {
              si.Fixed+=tab.Container.offsetWidth;
            };
          };
        };
        var iUsed=si.Total-si.Fixed;
        var iUnit=coMath.Div(iUsed,si.autoCount);
        if (tabBias) {
          if (si.Bias==null){
            si.Border.Load(tabBias.Container);
            si.Padding.Load(tabBias.Container);
            var iBias=si.Border.xBias()+si.Padding.xBias();
            si.Border.Load(tabBias.Caption);
            si.Padding.Load(tabBias.Caption);
            iBias+=si.Border.xBias()+si.Padding.xBias();
            si.Border.Load(tabBias.Decore);
            si.Padding.Load(tabBias.Decore);
            iBias+=si.Border.xBias()+si.Padding.xBias();
            si.Border.Load(tabBias.Icon);
            si.Padding.Load(tabBias.Icon);
            iBias+=si.Border.xBias()+si.Padding.xBias();
            si.Border.Load(tabBias.Close);
            si.Padding.Load(tabBias.Close);
            iBias+=si.Border.xBias()+si.Padding.xBias();
            si.Bias=iBias;
          };
          iUnit-=tabBias.Close.offsetWidth;
          iUnit-=tabBias.Icon.offsetWidth+si.Bias;
        };
        for (var iLcv=0; iLcv<tabs.Items.length; iLcv++){
          var tab=tabs.Items[iLcv];
          if (tab.AutoSize==true)
            tab.Caption.style.maxWidth=iUnit+"px";
        };
      };
      return si;
    };
    _tabs.createItemKind=function(Value){
      var tabs=this;
      if (Value==undefined) Value=1;
      var knd=coObject.Create();
      knd.Owner=tabs;
      knd.Tab=1;
      knd.Seperator=2;
      knd.Index=Value;
      return knd;
    };
    _tabs.createTab=function(sCaption,urlIcon,autoSize,allowClose){
      if (allowClose==undefined) allowClose=false;
      if (autoSize==undefined) autoSize=true;
      var tabs=this;
      var tab=coObject.Create();
      tab.Visible=false;
      tab.Hidden=false;
      tab.Selected=false;
      tab.AllowClose=(allowClose==true);
      tab.AllowSelection=true;
      tab.AutoSize=autoSize;
      tab.Class=tabs.Class+"Tab";
      tab.Parent=tabs.Client;
      tab.Owner=tabs;
      tab.Data=null;
      tab.onSelect=null;
      tab.onUnselect=null;
      tab.onClose=null;
      tab.Kind=tabs.createItemKind(tabs.Kinds.Tab);
      tab.dtInputMove=0;

      tab.Container=document.createElement('div');
      tab.Parent.appendChild(tab.Container);
      tab.Container.className=tab.Class;
      tab.Container.Owner=tab;

      tab.Decore=document.createElement('div');
      tab.Container.appendChild(tab.Decore);
      tab.Decore.className=tab.Class+"Deco";
      tab.Decore.Owner=tab;

      tab.Icon=document.createElement('div');
      tab.Decore.appendChild(tab.Icon);
      tab.Icon.className=tab.Class+"Icon";
      if (urlIcon.length>0)
        tab.Icon.style.backgroundImage="url("+urlIcon+")";
      tab.Icon.Owner=tab;

      tab.Caption=document.createElement('div');
      tab.Decore.appendChild(tab.Caption);
      tab.Caption.className=tab.Class+"Cap";
      tab.Caption.Owner=tab;

      tab.Close=document.createElement('div');
      tab.Decore.appendChild(tab.Close);
      tab.Close.className=tab.Class+"Close";
      tab.Close.Owner=tab;
      coDOM.setText(tab.Close,"x");

      tab.Container.style.minWidth=coTheme.UI.TabsBar.Item.minWidth+"px";
      tab.setCaption=function(sCaption){
        if (sCaption==undefined) sCaption="";
        var tab=this;
        coDOM.setText(tab.Caption,sCaption);
        tab.Container.title=sCaption;
        tab.Caption.style.display=(sCaption.length>0)? "inline-block" : "none";
      };
      tab.setCorners=function(iRadius){
        var tab=this;
        tab.Container.style.borderTopRightRadius=iRadius+"px";
        tab.Container.style.borderTopLeftRadius=iRadius+"px";
        tab.Close.style.borderTopRightRadius=iRadius+"px";
      };
      tab.getCaption=function(){
        var tab=this;
        return coDOM.getText(tab.Caption);
      };
      tab.setIcon=function(sIconURL){
        if (sIconURL==undefined) throw "TabsBar.Tab requires a valid URL.";
        var tab=this;
        tab.Icon.style.backgroundImage="url("+sIconURL+")";
      };
      tab.Decorate=function(){
        var tab=this;
        tab.Close.style.display=(tab.AllowClose==true) ? "inline-block" : "none";
        tab.Container.className=(tab.Selected==true) ? tab.Class+"Sel" : tab.Class;
      };
      tab.Select=function(Force){
        if (Force==undefined) Force=false;
        var tab=this;
        var tabs=tab.Owner;
        var ts= (coObject.Assigned(tabs.Selected)==true) ? tabs.Selected : null;
        if ( (ts==tab) && (Force==false) && (tab.AllowSelection==true) ) return;
        if (tabs.Torus) tabs.Torus.Show();
        setTimeout(
          function(){
            if ( (ts!=tab) && (ts!=null) && (tab.AllowSelection==true) ) {
              if (ts.onUnselect) ts.onUnselect(ts);
              ts.Selected=false;
              ts.Decorate();
              tabs.Selected=null;
            };
            if (tab.AllowSelection==true)
              tabs.Selected=tab;

            tab.Selected=true;
            tab.Decorate();
            if (tab.onSelect)
              tab.onSelect(tab);
            tab.Decorate();
            tabs.Screen.setSize();
            if (tabs.Torus) tabs.Torus.Stop();
          },
          coVDM.torusAutoShow
        );
      };
      tab.Caption.ontouchstart=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var cntr=coDOM.targetElement(e);
        var tab=cntr.Owner;
        tab.Select();
      };
      tab.Close.ontouchstart=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var cntr=coDOM.targetElement(e);
        var tab=cntr.Owner;
        if (tab.onClose) tab.onClose(tab);
      };
      tab.Container.onmousemove=function(e){
        var tab=this.Owner;
        if (coDragDrop.Active==true) {
          var dtNow=+new Date();
          var iDiff=dtNow-tab.dtInputMove;
          if (iDiff>coTheme.UI.TabsBar.AutoSelectDelay) {
            tab.dtInputMove=dtNow;
            tab.Select();
          };
        };
      };
      tab.Container.onclick=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var cntr=coDOM.targetElement(e);
        var tab=cntr.Owner;
        tab.Select();
      };
      tab.Close.onclick=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var cntr=coDOM.targetElement(e);
        var tab=cntr.Owner;
        if (tab.onClose) tab.onClose(tab);
      };
      tab.Show=function(){
        var tab=this;
        tab.Visible=true;
        tab.Container.style.display="";
        tab.Container.style.visibility="visible";
        tab.Decore.style.visibility="visible";
        tab.Icon.style.visibility="visible";
        tab.Close.style.visibility="visible";
        tab.Caption.style.visibility="visible";
        tab.Decorate();
      };
      tab.Hide=function(){
        var tab=this;
        tab.Visible=false;
        tab.Container.style.display="none";
      };
      tab.Free=function(){
        var tab=this;
        var tabs=tab.Owner;
        if (tabs.Selected==tab)
          tabs.Selected=null;
        if (tabs.Items.Loading==false) {
          var idx= tabs.Items.indexOf(tab);
          if (idx!=-1)
            tabs.Items.splice(idx,1);
        };
        tab.Decore.removeChild(tab.Caption);
        tab.Decore.removeChild(tab.Icon);
        tab.Decore.removeChild(tab.Close);
        tab.Container.removeChild(tab.Decore);
        tab.Parent.removeChild(tab.Container);

        if (tabs.Selected==tab)
          tabs.Selected=null;
        tab=coObject.Release(tab);
        return null;
      };
      tab.setCaption(sCaption);
      tab.setCorners(tabs.cornerRadius);
      tabs.Items.push(tab);
      return tab;
    };
    _tabs.createSeperator=function(){
      var tabs=this;
      var sep=coObject.Create();
      sep.Visible=false;
      sep.Hidden=false;
      sep.Class=tabs.Class+"Sep";
      sep.Parent=tabs.Client;
      sep.Owner=tabs;
      sep.Kind=tb.createItemKind(tb.Kinds.Seperator);

      sep.Container=document.createElement('div');
      sep.Parent.appendChild(sep.Container);
      sep.Container.className=sep.Class;

      sep.Nurl=document.createElement('div');
      sep.Container.appendChild(sep.Nurl);
      sep.Nurl.className=sep.Class+"Nurl";

      sep.Show=function(){
        var sep=this;
        sep.Visible=true;
        sep.Container.style.visibility="visible";
        sep.Nurl.style.visibility="visible";
      };
      sep.Hide=function(){
        var sep=this;
        sep.Visible=false;
        sep.Container.style.visibility="hidden";
        sep.Nurl.style.visibility="hidden";
      };
      sep.Free=function(){
        var sep=this;
        var tabs=sep.Owner;
        if (tabs.Items.Loading==false) {
          var idx= tabs.Items.indexOf(sep);
          if (idx!=-1)
            tabs.Items.splice(idx,1);
        };
        sep.Container.removeChild(sep.Nurl);
        sep.Parent.removeChild(sep.Container);
        sep=coObject.Release(sep);
        return null;
      };
      tabs.Items.push(sep);
      return sep;
    };
    _tabs.setCorners=function(iRadius){
      var tabs=this;
      tabs.cornerRadius=iRadius;
      for (var iLcv=0; iLcv<tabs.Items.length; iLcv++){
        var tab=tabs.Items[iLcv];
        tab.setCorners(iRadius);
      };
    };
    _tabs.Clear=function(){
      var tabs=this;
      tabs.Items.Loading=true;
      for (var iLcv=0; iLcv<tabs.Items.length; iLcv++){
        var itm=tabs.Items[iLcv];
        itm.Free();
      };
      tabs.Items.Loading=false;
      tabs.Items.length=0;
    };
    _tabs.doShow=function(){
      var tabs=this;
      tabs.Container.style.height=tabs.Height+"px";
      for (var iLcv=0; iLcv<tabs.Items.length; iLcv++){
        var itm=tabs.Items[iLcv];
        if (itm.Hidden==false){
          itm.Show();
        };
      };
    };
    _tabs.doHide=function(){
      var tabs=this;
      for (var iLcv=0; iLcv<tabs.Items.length; iLcv++){
        var itm=tabs.Items[iLcv];
        itm.Hide();
      };
    };
    _tabs.onResize=function(){
      var tabs=this;
      tabs.SizeInfo.Calculate();
    };
    _tabs.Free=function(){
      var tabs=this;
      tabs.Clear();
      tabs.Items=tabs.Items.Free();
      tabs.Mode=tabs.Mode.Free();
      tabs.Kinds=tabs.Kinds.Free();
      tabs.Container.removeChild(tabs.Client);
      tabs=tabs._Free();
      return null;
    };
    _tabs.Items=new Array();
    _tabs.Items.Loading=false;
    _tabs.Kinds=_tabs.createItemKind();
    _tabs.SizeInfo=_tabs.createSizeInfo();

    coTheme.UI.TabsBar.Apply(_tabs);
    return _tabs;
  }
};

