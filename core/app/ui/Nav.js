coAppUI.App.Components.Nav = {
  Version        : new Version(2014,11,5,120),
  Title          : new Title("Aurawin Slide Navigator","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(sName,sClass,Screen,Slides,Owner,Parent,Align) {
    if (Align==undefined) Align=coAppUI.Alignment.Bottom;
    var _sn=Slides.createSlide(sName,sClass,Screen,Owner,Parent,Align);
    _sn.Container.className=sClass+ " "+sClass+"Gradient";
    _sn.Container.setAttribute("role","navigation");
    _sn.Visible=false;
    _sn.oDefaultHeight=coVDM.NavBarHeight;
    _sn.oSetAsDefaultOn=true;
    _sn.oSetAsDefaultOff=false;
    _sn.oAutoShowOn=true;
    _sn.oAutoShowOff=false;
    _sn.oAddToShowList=true;
    _sn.oNoShowList=false;
    _sn.oCascadeNoSlide=-1;
    _sn.oCascadeOff=0;
    _sn.oCascadeOn=1;
    _sn.oCascadeChildren=2;
    _sn.NoTarget=null;
    _sn.NoReturn=null;
    _sn.NoClick=null;
    _sn.NoMenuItem=null;
    _sn.NoSlide=null;
    _sn.NoData=null;
    _sn.NoShowList=[];
    _sn.NoHideList=[];
    _sn.Height=_sn.oDefaultHeight;
    _sn.clientHeight=_sn.oDefaultHeight;
    _sn.Container.style.height=_sn.Height+"px";

    _sn.Torus=( (Screen.Frame) && (Screen.Frame.Torus)) ?  Screen.Frame.Torus : (Screen.Torus) ? Screen.Torus : null;

    _sn.AddToGroupHideLists=function(navItem){
      var nav=this;

      if (nav.Home) {
        if (nav.Home.ShowList.indexOf(navItem)==-1)
          nav.Home.HideList.push(navItem);
      };
      for (var iLcv=0; iLcv<nav.Items.length; iLcv++){
        var navLcv=nav.Items[iLcv];
        if ( (navLcv!=navItem) && (navLcv.Kind==nav.itemKind.Group) )
          if (navLcv.ShowList.indexOf(navItem)==-1)
            navLcv.AddToGroupHideLists(navItem);
      };
    };
    _sn.createHomeInfo=function(btnHome,navItem,menuItem,onShow){
      var nav=this;
      if (btnHome==undefined) return;
      if (navItem==undefined) return;
      if (menuItem==undefined) menuItem=nav.NoMenuItem;
      if (onShow==undefined) onShow=null;
      var hi=coObject.Create();
      hi.Class="navHomeInfo";
      hi.Home=btnHome;
      hi.Nav=nav;
      hi.Target=navItem;
      hi.MenuItem=menuItem;
      hi.onShow=onShow;
      return hi;
    };
    _sn._itemKind=function(){
      var _knd=this;
      this.Group=0;
      this.Button=1;
      this.Combo=2;
      this.Menu=3;
      this.Confirm=4;
      this.Text=5;
      this.Label=6;
      this.isValid=function(Value){
        var knd=_knd;
        switch (Value) {
          case knd.Group : return true;
          case knd.Button : return true;
          case knd.Combo : return true;
          case knd.Menu : return true;
          case knd.Confirm : return true;
          case knd.Text : return true;
          case knd.Label : return true;
        };
        return false;
      };
      this.toString=function(Value){
        var knd=_knd;
        switch (Value) {
          case knd.Group : return "Group";
          case knd.Button : return "Button";
          case knd.Combo : return "Combo";
          case knd.Menu : return "Menu";
          case knd.Confirm : return "Confirm";
          case knd.Text : return "Text";
          case knd.Label : return "Label";
        };
        return "Unknown";
      };
      return this;
    };
    _sn.itemKind=new _sn._itemKind();
    _sn.createView=function(Item){
      var nav=this;
      var vw=coObject.Create(coObject.relInline,coObject.cpyAsVar,"NavView");
      vw.Owner=Item;
      vw.Nav=nav;
      vw.ShowList=new Array();
      vw.HideList=new Array();
      return vw;
    };
    _sn._Child=function(Parent,Kind,Name,Caption,AutoShow,Cascade,Default,Target,Slide,ShowList,HideList,Return,onCommand){
      var nav=this;
      var _chld=this;
      if (onCommand==undefined) onCommand=null;
      this.homeInfo=null;
      this.Kind=Kind;
      this.Visible=false;
      this.Hidden=false;
      this.Default=Default;
      this.Selected=false;
      this.Checked=false;
      this.Label=null;
      this.MenuItem=null;
      this.Caption=Caption;
      this.Target=Target;
      this.Return=Return;
      this.Slide=Slide;
      this.View=null;
      this.hideTorus=true;
      this.showTorus=true;
      this.Cascade=Cascade;
      this.HideList=new Array();
      this.ShowList=new Array();

      this.ShowList.Add=function(navItem){
        var sl=this;
        var idx=sl.indexOf(navItem);
        if (idx==-1) sl.push(navItem);
      };
      this.ShowList.Remove=function(navItem){
        var sl=this;
        var idx=sl.indexOf(navItem);
        if (idx!=-1) sl.splice(idx,1);
      };
      for (var iLcv=0; iLcv<ShowList.length; iLcv++){
        this.ShowList.push(ShowList[iLcv]);
      };
      for (var iLcv=0; iLcv<HideList.length; iLcv++){
        if (HideList[iLcv]=='self') {
          this.HideList.push(this);
        } else {
          this.HideList.push(HideList[iLcv]);
        };
      };
      this.Reveal=function(){
        var itm=this;
        itm.Hidden=false;
        itm.Show(itm.Cascade);
      };
      this.Conseal=function(){
        var itm=this;
        itm.Hidden=true;
        itm.Hide();
      };
      this.AddToHideList=function(itm){
        var navItem=this;
        var idx=navItem.HideList.indexOf(itm);
        if (idx==-1) navItem.HideList.push(itm);
        var idx=navItem.ShowList.indexOf(itm);
        if (idx!=-1) navItem.ShowList.splice(idx,1);
      };
      this.AddToShowList=function(itm){
        var navItem=this;
        var idx=navItem.ShowList.indexOf(itm);
        if (idx==-1) navItem.ShowList.push(itm);
        var idx=navItem.HideList.indexOf(itm);
        if (idx!=-1) navItem.HideList.splice(idx,1);
      };
      this.RemoveFromShowList=function(itm){
        var navItem=this;
        var idx=navItem.ShowList.indexOf(itm);
        if (idx!=-1) navItem.ShowList.splice(idx,1);
      };
      this.AutoShow=AutoShow;
      this.onCommand=onCommand;
      this.Name=Name;
      this.Parent=Parent;
      this.Value=null;
      this.Nav=_sn;
      this.Control=null;
      this.Items=null;

      this.Container=document.createElement('div');
      this.Parent.Container.appendChild(this.Container);
      this.Container.className=this.Nav.Class+_sn.itemKind.toString(Kind);
      this.Container.Align=new Alignment(coAppUI.Alignment.Left);
      this.Container.style.fontSize=coTheme.UI.Nav.fontSize+"px";
      this.Container.style.lineHeight=coVDM.NavBarLineHeight+"px";
      this.Container.style.height=coVDM.NavBarItemHeight+"px";
      this.Container.style.visibility="hidden";
      this.Container.style.display="none";
      this.Container.setAttribute("parent", ( (!Parent) || (Parent==null)) ? _sn.Class : Parent.Name );
      this.Container.setAttribute("name", Name);
      this.getMenu=function(){
        var chld=_chld;
        if (!chld.Menu) {
          return  (chld.Parent==null) ? null : chld.Parent.getMenu();
        } else {
          return chld.Menu;
        }
      };
      this.setSelected=function(Value){
        if (Value.Hidden==true) return;
        var chld=this;
        if ((chld.Selected!=Value) && (chld.Selected!=null) && (chld.Selected.Hide) )
          chld.Selected.Hide();
        chld.Selected=Value;
        var itmHide=(Value) ? chld : null;
        chld.Parent.HideSiblings(itmHide);
        chld.Show(chld.Cascade);
      };
      this.forceSelected=function(Value){
        if (Value.Hidden==true) return;
        var chld=this;
        if ((chld.Selected!=Value) && (chld.Selected!=null) && (chld.Selected.Hide) )
          chld.Selected.Hide();
        chld.Visible=false; // force
        chld.Selected=Value;
        var itmHide=(Value) ? chld : null;
        chld.Parent.HideSiblings(itmHide);
        if (Value.enforceHideList) Value.enforceHideList();
        chld.Show(chld.Cascade);
        if (Value.Slide) Value.Slide.Reveal();
        if ((Value.Show) && (Value.Cascade)) {
          Value.Show(Value.Cascade);
          var itms=Value.Items;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var chld=itms[iLcv];
            if (chld.Kind!=chld.Nav.itemKind.Group) chld.Show(Value.Cascade);
          };
        };
        if (Value.onCommand) Value.onCommand(chld);
      };
      switch (Kind) {
        case this.Nav.itemKind.Group    : this.Nav.initGroup(this); break;
        case this.Nav.itemKind.Button   : this.Nav.initButton(this); break;
        case this.Nav.itemKind.Combo    : this.Nav.initCombo(this); break;
        case this.Nav.itemKind.Menu     : this.Nav.initMenu(this); break;
        case this.Nav.itemKind.Confirm  : this.Nav.initConfirm(this); break;
        case this.Nav.itemKind.Text     : this.Nav.initText(this); break;
        case this.Nav.itemKind.Label    : this.Nav.initLabel(this); break;
      }
      this.Parent.push(this);
      this.getHeight=function(){
        var chld=this;
        return chld.Container.offsetHeight;
      };
      this.setHeight=function(){
        var chld=this;
        chld.Container.style.height=coVDM.NavBarItemHeight+"px";
        if (chld.onSetHeight)
          chld.onSetHeight();
      };
      this.enforceHideList=function(){
        var chld=this;
        for (var iLcv=0; iLcv<chld.HideList.length; iLcv++){
          var itm=chld.HideList[iLcv];
          if (itm){
            var idx=chld.ShowList.indexOf(itm);
            if ( (idx==-1) && (itm.Slide!=itm) && (itm!=chld) && (itm!=chld.Slide) ){
              if (itm.Visible==true) {
                if ( (itm.Slide) && (itm.Slide!=chld.Slide) ) itm.Slide.Hide();
                if (itm.Conseal) itm.Conseal();
                if (itm.Hide) itm.Hide();
              };
            };
          };
        };
      };
      this.enforceShowList=function(){
        var chld=this;
        for (var iLcv=0; iLcv<chld.ShowList.length; iLcv++){
          var itm=chld.ShowList[iLcv];
          var idx=chld.HideList.indexOf(itm);
          if ( (idx==-1) && (itm.Slide!=itm) && (itm!=chld) && (itm!=chld.Slide) ){
            if (itm.Visible==false) {
              if (itm.Show) itm.Show();
              if (itm.Reveal) itm.Reveal();
            };
          };
        };
      };
      this.setSize=function(){
        var chld=this;
        //chld.Container.style.width=chld.getWidth()+"px";
        chld.Container.style.height=coVDM.NavBarItemHeight+"px";
        if (chld.onSetSize!=null) chld.onSetSize();
      };
      this.onNavCanceled=function(){
        var chld=this;
        chld.onClearData();
      };
      this.Hide=function(){
        var chld=this;
        chld.Container.style.visibility="hidden";
        chld.Container.style.display="none";
        if (chld.Visible==false) return;
        chld.Visible=false;
        if (chld.Slide!=null){
          chld.Slide.Hide();
        };
        if (chld.onHide) chld.onHide();
        if (chld.Items!=null) chld.Items.Hide();
      };
      this.Show=function(Cascade){
        if (this.Hidden==true) return;

        if (!Cascade) Cascade=0;
        var chld=this;

        if ( (chld.Nav.Visible==false) || (chld.Visible==true) ) {
          if ((chld.Slide) && (chld.Slide.Visible==false))
            chld.Slide.Show();
          for (var iLcv=0; iLcv<chld.ShowList.length; iLcv++){
            var itm=chld.ShowList[iLcv];
            if ((itm) && (itm.Visible==false)) {
              if (itm.Show) itm.Show();
              if (itm.Reveal) itm.Reveal();
            };
          };

          return;
        };
        chld.Visible=true;
        chld.Parent.Container.style.visibility="visible";
        chld.Parent.Container.style.display="inline-block";
        chld.Container.style.visibility="visible";
        chld.Container.style.display="inline-block";
        chld.Parent.Visible=true;
        // chld.enforceHideList() will cause ping-pong;
        if (Cascade>0) {
          Cascade--;
          for (var iLcv=0; iLcv<chld.ShowList.length; iLcv++){
            var itm=chld.ShowList[iLcv];
            var idx=chld.HideList.indexOf(itm);
            if (idx==-1) itm.Show(Cascade);
          };
          var hl= (chld.Parent.Selected) ? chld.Parent.Selected.HideList : null;
          if ( (hl) && (hl.indexOf(chld.Slide)==-1) ) {
            if ( (chld.Slide!=null) && (chld.Slide.Visible==false) && (chld.Cascade!=chld.Nav.oCascadeNoSlide) ) {
              chld.Slide.Reveal();
              chld.Slide.Screen.setSize();
            };
            if ( (chld.Target) && (hl.indexOf(chld.Target)==-1)  )
              chld.Target.Show(Cascade);

          };
        };
        if (chld.Selected) chld.Selected.Show(chld.Cascade);

        if (chld.onShow) chld.onShow();
      };
      return this;
    };
    _sn._Children=function(divPlacement,Parent){
      var _chldrn=new Array();
      if (!divPlacement) divPlacement=_sn.Container;
      var sn=this;
      _chldrn.Nav=sn;
      _chldrn.Name=((!Parent) || (Parent==null)) ? _sn.Class : Parent.Name;
      _chldrn.Selected=null;
      _chldrn.Parent=Parent;
      _chldrn.Placement=divPlacement;
      _chldrn.Container=document.createElement('div');
      _chldrn.Placement.appendChild(_chldrn.Container);
      _chldrn.Container.className=sn.Class+"Children";
      _chldrn.Container.style.visibility="hidden";
      _chldrn.Container.style.display="none";
      _chldrn.Container.setAttribute("parent", ((!Parent) || (Parent==null))? _sn.Class : Parent.Name);
      _chldrn.Visible=false;
      _chldrn.addItem=function(Kind,Name,Caption,AutoShow,Cascade,AddToShowList,Default,Target,Slide,ShowList,HideList,Return,onCommand){
        var chldrn=this;
        var sn=chldrn.Nav;
        var chld=new sn._Child(chldrn,Kind,Name,Caption,AutoShow,Cascade,Default,Target,Slide,ShowList,HideList,Return,onCommand);
        if ( (AddToShowList==true) && (chldrn.Parent!=null) && (chldrn.Parent.ShowList))
          chldrn.Parent.ShowList.push(chld);
        return chld;
      };
      _chldrn.AutoShow=function(Cascade){
        if (Cascade==undefined) Cascade=0;
        if (Cascade<0) return;
        var chldrn=this;
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          if  ( (itm.Parent.Selected==null) || ( (itm.Parent.Selected) && (itm.Parent.Selected.HideList.indexOf(itm)==-1) ) ) {
            if (itm.AutoShow==true) {
              itm.enforceHideList();
              itm.Show(Cascade);
            };
            if (itm.Items!=null)
              itm.Items.AutoShow(Cascade-1);
          };
        };
      };
      _chldrn.HideSiblings=function(exItem){
        var chldrn=this;
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          if ((itm!=exItem) && (itm.AutoShow!=true) )
            itm.Hide();
        };
      };
      _chldrn.Hide=function(){
        var chldrn=this;
        chldrn.Container.style.visibility="hidden";
        chldrn.Container.style.display="none";
        chldrn.Visible=false;
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          itm.Hide();
        };
      };
      _chldrn.Show=function(){
        var chldrn=this;
        chldrn.Visible=true;
        chldrn.Container.style.visibility="visible";
        chldrn.Container.style.display="none";
        if (chldrn.Parent!=null) {
          chldrn.Parent.Visible=true;
          chldrn.Parent.Container.style.visibility="visible";
          chldrn.Parent.Container.style.display="inline-block";
        };
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          if (itm.AutoShow==true)
            itm.AutoShow(itm.Cascade);
        };
        for (var iLcv=0; iLcv<chldrn.ShowList.length; iLcv++){
          var itm=chldrn.ShowList[iLcv];
          itm.Show();
        };
      };
      _chldrn.getMenu=function(){
        var chldrn=this;
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          if (itm.Kind==itm.Nav.itemKind.Menu) return itm;
        };
        return  (chldrn.Parent!=null) ? chldrn.Parent.getMenu() : null;
      };
      _chldrn.setHeight=function(){
        var chldrn=this;
        chldrn.Container.style.height=coVDM.NavBarItemHeight+"px";
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          itm.setHeight();
          if (itm.Items!=null)
            itm.Items.setHeight();
        };
      };
      _chldrn.getDefault=function(){
        var chldrn=this;
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          if (itm.Default==true) return itm;
        };
        return null;
      };
      _chldrn.setDefault=function(defItem){
        var chldrn=this;
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          itm.Default=false;
        };
        defItem.Default=true;
      };
      _chldrn.setSelected=function(selItem){
        var chldrn=this;
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          itm.setSelected(false);
        };
        defItem.setSelected(true);
      };
      _chldrn.getSelected=function(){
        var chldrn=this;
        for (var iLcv=0; iLcv<chldrn.length; iLcv++){
          var itm=chldrn[iLcv];
          if (itm.Selected==true) return itm;
        };
        return null;
      };
      _chldrn.setSize=function(){
        var chldrn=this;
        chldrn.Container.style.height=coVDM.NavBarItemHeight+"px";
        if (chldrn.Visible==true) {
          chldrn.setHeight();
          for (var iLcv=0; iLcv<chldrn.length; iLcv++){
            var itm=chldrn[iLcv];
            if (itm.onSetSize) itm.onSetSize();
            if (itm.Items) itm.Items.setSize();
          };
        };
      };
      return _chldrn;
    };
    _sn.initGroup=function(itm){
      itm.Items=_sn._Children(itm.Container,itm);
      itm.AddToGroupHideLists=function(navItem){
        var itm=this;
        if (itm.ShowList.indexOf(navItem)==-1) {
          var idx=itm.HideList.indexOf(navItem);
          if (idx==-1)
            itm.HideList.push(navItem);
          for (var iLcv=0; iLcv<itm.Items.length; iLcv++) {
            var navLcv=itm.Items[iLcv];
            if ( (navLcv!=navItem) && (navLcv.Kind==navItem.Nav.itemKind.Group) ) {
              navLcv.AddToGroupHideLists(navItem);
            } else {
              navLcv.AddToHideList(navItem);
            };
          };
        };
      };
    };
    _sn.initButton=function(itm){
      itm.Label=document.createElement('span');
      itm.Label.className=itm.Nav.Class+"ButtonLabel";
      itm.Container.appendChild(itm.Label);
      itm.Container.style.height=coVDM.NavBarButtonHeight+"px";
      itm.Label.style.lineHeight=coVDM.NavBarLineHeight+"px";
      coDOM.setText(itm.Label,itm.Caption);
      itm.getWidth=function(){
        var itm=this;
        return itm.Container.offsetWidth;
      };
      itm.setChecked=function(value){
        var itm=this;
        if (value==true){
          itm.Container.style.backgroundColor=coVDM.ButtonFilmSelect;
          itm.Label.style.color=coVDM.ButtonSelectFont;
          itm.Checked=true;
        } else{
          itm.Label.style.color="";
          itm.Container.style.backgroundColor="";
          itm.Checked=false;
        };
      };
      itm.onSetHeight=function(){
        var itm=this;
        itm.Container.style.height=coVDM.NavBarButtonHeight+"px";
        itm.Label.style.lineHeight=coVDM.NavBarButtonHeight+"px";
      };
      itm.onSetSize=function(){
        var itm=this;
        itm.Container.style.height=coVDM.NavBarButtonHeight+"px";
        itm.Label.style.lineHeight=coVDM.NavBarButtonHeight+"px";
      };
      itm.doTouchStart=function(e){
        if (e==undefined) e=window.event;
        var itm=this;
        if (coEvents.TouchLock.Active==true) {
          if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("NavBarButton.doTouchStart (exiting)");
          return;
        };
        coDOM.preventDefault(e);
        if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
          coVDM.VDM.Console.Append("NavBarButton.doTouchTouchStart");
        if (coVDM.VDM.Browser.Mouse==true)
          itm.evtMouseUp.setActive(false);
        coEvents.TouchLock.Lock(coVDM.TouchLock);
        coEvents.TouchLock.elmStart=itm;
      };
      itm.doTouchEnd=function(e){
        if (e==undefined) e=window.event;
        var itm=this;
        coDOM.preventDefault(e);
        if ( (coEvents.TouchLock.Active==true) && (coEvents.TouchLock.elmStart!=itm) ){
          if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("NavBarButton.doTouchEnd (exiting)");
          return;
        };
        if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
          coVDM.VDM.Console.Append("NavBarButton.doTouchEnd");
        if (coVDM.VDM.Browser.Mouse==true)
          itm.evtMouseUp.setActive(false);
        itm.Container.blur();
        itm.doClick();
        coEvents.TouchLock.Lock(coVDM.TouchLock);
        coEvents.TouchLock.elmStart=itm;
      };
      itm.doMouseUp=function(e){
        if (e==undefined) e=window.event;
        var itm=this;
        coDOM.preventDefault(e);
        if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
          coVDM.VDM.Console.Append("NavBarButton.doMouseUp");
        itm.doClick();
      };
      itm.doClick=function(e){
        if (e==undefined) e=window.event;
        var itm=this;
        if ( (coEvents.TouchLock.Active==true) && (coEvents.TouchLock.elmStart!=itm) ){
          if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("NavBarButton.doClick (TouchLock exiting)");
          return;
        };
        coDOM.preventDefault(e);
        if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
          coVDM.VDM.Console.Append("NavBarButton.doClick (Torus)");
        if (  (itm.Nav.Torus) && (itm.showTorus==true)) itm.Nav.Torus.Show();
        setTimeout(
          function(){
            if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
              coVDM.VDM.Console.Append("NavBarButton.doClick (Callback)");

            itm.enforceHideList();
            if (itm.onCommand!=null) var iRes=itm.onCommand(itm);
            if (iRes==false) return true;
            if (itm.Target!=null) {
              if (itm.Target.MenuItem!=null)
                itm.Target.MenuItem.Menu.setSelected(itm.Target.MenuItem);
              itm.Target.enforceHideList();
              itm.Nav.forceSelected(itm.Target);
              itm.Parent.Selected=itm;
              if (itm.Target.onCommand)
                itm.Target.onCommand(itm.Target);
              itm.Target.Show(itm.Target.Cascade);
              itm.Target.Parent.setSize();
              //itm.Target.Parent.setPosition(0);
              if (itm.Target.Slide!=null){
                itm.Target.Slide.setSize();
                itm.Target.Slide.Show();
              };
            } else {
              itm.Show(itm.Cascade);
              if (itm.Slide!=null) {
                itm.Slide.setSize();
                itm.Slide.Reveal();
              };
              if (itm.Return!=null) {
                itm.Nav.forceSelected(itm.Return);
              };
            };
            if (itm.MenuItem){
              itm.MenuItem.Menu.setSelected(itm.MenuItem);
            };
            itm.Nav.setSize();
            if ( (itm.Nav.Torus)  && (itm.hideTorus==true) )itm.Nav.Torus.Hide();
          },
          coVDM.torusAutoShow
        );
      };
      if (coVDM.VDM.Browser.Mouse==true)
        itm.evtMouseUp=coEvents.Add(itm.Container,"mouseup",function(e){itm.doClick(e);},coEvents.Capture,coEvents.Active);
      itm.evtTouchEnd=coEvents.Add(itm.Container,"touchend",function(e){itm.doTouchEnd(e);},coEvents.Capture,coEvents.Active);
      itm.evtTouchStart=coEvents.Add(itm.Container,"touchstart",function(e){itm.doTouchStart(e);},coEvents.Capture,coEvents.Active);
      itm.onShow=function(){
        var itm=this;
        itm.Label.style.visibility="visible";
      };
      itm.onHide=function(){
        var itm=this;
        itm.Label.style.visibility="hidden";
      };

    };
    _sn.initLabel=function(itm){
      itm.Label=document.createElement('span');
      itm.Label.className=itm.Nav.Class+"Label";
      itm.Container.appendChild(itm.Label);
      itm.Container.style.height=coVDM.NavBarButtonHeight+"px";
      itm.Label.style.lineHeight=coVDM.NavBarLineHeight+"px";
      coDOM.setText(itm.Label,itm.Caption);
      coTheme.UI.Nav.Item.Label.Apply(itm);
      itm.setCaption=function(Value){
        this.Caption=Value;
        coDOM.setText(this.Label,Value);
      };
    };
    _sn.initText=function(itm){
      itm.Control=document.createElement('input');
      itm.Container.appendChild(itm.Control);
      itm.Control.type="text";
      itm.Control.placeholder=itm.Caption;
      itm.Control.className=itm.Nav.Class+"Text";
      itm.Control.Item=itm;
      itm.Control.ontouchstart=function(e){
        if (e==undefined) e=window.event;
        ctrl=this;
        var itm=ctrl.Item;
        itm.Control.focus();
        coDOM.preventDefault(e);
      };
      itm.Control.onkeypress=function(e){
        if (e.keyCode==13){
          coDOM.preventDefault(e);
          itm.Control.blur();
        };
      };
      itm.onSetHeight=function(){
        var itm=this;
        itm.Control.style.height=coVDM.NavBarInputHeight+"px";
      };
      itm.getWidth=function(){
        var itm=this;
        return itm.Control.offsetWidth;
      };
      itm.onShow=function(){
        var itm=this;
        itm.Control.style.visibility="visible";
        itm.Control.style.display="inline-block";
        itm.setSize();
      };
      itm.onHide=function(){
        var itm=this;
        itm.Control.blur();
        itm.Control.style.visibility="hidden";
        itm.Control.style.display="none";
      };
      itm.Control.onchange=function(){
        var ctrl=this;
        var itm=ctrl.Item;
        ctrl.Item.Value=itm.Control.value;
      };
    };
    _sn.initCombo=function(itm){
      itm.Control=document.createElement('select');
      itm.Container.appendChild(itm.Control);
      itm.Control.className=itm.Nav.Class+"Combo";
      itm.Control.style.visibility="hidden";
      itm.Control.style.display="none";
      itm.Control.Owner=itm;
      itm.Padding=new Padding();
      itm.Margin=new Margin();
      itm.getWidth=function(){
        var itm=this;
        return itm.Control.offsetWidth;
      };
      itm.onShow=function(){
        var itm=this;
        itm.Control.style.visibility="visible"
        itm.Control.style.display="inline-block";
        if (!itm.Padding.Loaded) itm.Padding.Load(itm.Control);
        if (!itm.Margin.Loaded) itm.Margin.Load(itm.Control);

        coTheme.UI.Select.Apply(itm.Control);
        coTheme.UI.Nav.Combo.Apply(itm);

        if (itm.Control.options.selectedIndex!=-1) {
          var iWidth=coDOM.textWidth(
            coVDM.divFormat,
            coTheme.UI.Select.fontSize,
            itm.Control.options[itm.Control.options.selectedIndex].label,
            itm.Padding,
            itm.Margin
          )+coTheme.UI.Select.buttonWidth;
          itm.Control.style.width=iWidth+"px";
          itm.Container.style.width=itm.Control.offsetWidth+"px";
          coDOM.setText(coVDM.divFormat,"");
        };
        itm.setSize();
        itm.Control.AutoSize();
      };
      itm.onHide=function(){
        var itm=this;
        itm.Control.style.visibility="hidden"
        itm.Control.style.display="none";
      };
      itm.setWidth=function(){
        var itm=this;
        itm.Container.style.width=itm.getWidth()+"px";
      };
      itm.onSetHeight=function(){
        var itm=this;
        itm.Control.style.height=coVDM.NavBarItemHeight+"px";
      };
      itm.indexOf=function(sOption){
        for (var iLcv=0; iLcv<itm.Control.options.length; iLcv++) {
          var opt=itm.Control.options[iLcv];
          if (opt.text==sOption)
            return iLcv;
        };
        return -1;
      };
      itm.addOption=function(sCaption,Value){
        var itm=this;
        var idx=itm.indexOf(sCaption);
        if (idx==-1) {
          var opt=document.createElement('option');
          opt.text=sCaption;
          opt.value=Value;
          itm.Control.add(opt,null);
        } else {
          itm.Control.options[idx].value=Value;
        };
      };

      itm.onClearData=function(){
        var itm=this;
        itm.Control.options.length=0;
      };
      itm.Control.AutoSize=function(){
        var itm=this.Owner;
        var iWidth=coDOM.textWidth(
            coVDM.divFormat,
            coTheme.UI.Select.fontSize,
            itm.Control.options[itm.Control.options.selectedIndex].label,
            itm.Padding,
            itm.Margin
        )+coTheme.UI.Select.buttonWidth;
        itm.Control.style.width=iWidth+"px";
        itm.Container.style.width=itm.Control.offsetWidth+"px";
      };
      itm.Control.onchange=function(){
        var itm=this.Owner;
        itm.Value=itm.Control.options[itm.Control.selectedIndex].value;
        itm.Control.AutoSize();
        if (itm.onCommand) itm.onCommand(itm);
      };
      return itm;
    };
    _sn.initMenuItems=function(menu,itms){
      var _itms=itms;
      _itms.Menu=menu;
      _itms.Clearing=false;
      _itms.Hovered=null;
      _itms.addItem=function(Name,Caption,Target,onClick,Data){
        var itms=this;
        return itms._initMenuItem(Name,Caption,Target,onClick,Data);
      };
      _itms.getMenuItemWithTarget=function(Target){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          if (itm.Target==Target)
            return itm;
        };
        return null;
      };
      _itms.getMenuItem=function(Caption){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          if (coDOM.getText(itm.Caption)==Caption)
            return itm;
        };
        return null;
      };
      _itms._initMenuItem=function(Name,Caption,Target,onClick,Data){
        var itms=this;
        var ctrl=itms.Menu.Control;
        var _itm=new Object();
        if (!Data) Data=null;
        _itm.recurseRelease=false;
        _itm.cloneAsVar=true;
        _itm.Name=Name;
        _itm.Menu=itms.Menu;
        _itm.Target=Target;
        _itm.Data=Data;
        _itm.Owner=_itms;
        _itm.SaveSelection=false;
        _itm.Clicking=false;
        _itm.Selected=false;
        _itm.Visible=false;
        _itm.Hidden=false;
        _itm.Enabled= (Caption=="-") ? false : true;
        _itm.Parent=_itm.Menu.Window;
        _itm.Class=_itm.Menu.Nav.Class+"MenuItem";
        _itm.cntCaption=document.createElement('div');
        _itm.Parent.appendChild(_itm.cntCaption);
        _itm.cntCaption.className=_itm.Class;
        _itm.cntCaption.style.display="block";
        _itm.cntCaption.Owner=_itm;
        _itm.Caption=document.createElement('span');
        _itm.cntCaption.appendChild(_itm.Caption);
        _itm.Caption.className=_itm.Class;
        _itm.Caption.Owner=_itm;
        _itm.Caption.setAttribute("role","navigation");
        if (Caption=="-") {
          var hr=document.createElement('hr');
          _itm.Caption.appendChild(hr);
          hr.Owner=_itm;
          hr.className=_itm.Menu.Nav.Class+"MenuItemSep";
        } else {
          coDOM.setText(_itm.Caption,Caption);

          _itm.doHoverIn=function(e){
            var itm=this;
            if (itm.Owner.Hovered) itm.Owner.Hovered.doHoverOut();
            itm.Owner.Hovered=itm;
            itm.cntCaption.className=itm.Class + " MenuSelectionGradient";
            itm.Caption.className=itm.Class+"Selected";
          };
          _itm.doHoverOut=function(e){
            var itm=this;
            itm.cntCaption.className=itm.Class;
            itm.Caption.className=itm.Class;
          };
          coEvents.Add(
            _itm.cntCaption,
            "touchstart",
            function(e){
              var elm=coDOM.srcElement(e);
              var itm=elm.Owner;
              if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
                coVDM.VDM.Console.Append("Nav.MenuItem.touchstart");
              itm.doHoverIn(e);
            },
            coEvents.NoCapture,
            coEvents.Active
          );
          coEvents.Add(
            _itm.cntCaption,
            "mouseover",
            function(e){
              var elm=coDOM.srcElement(e);
              var itm=elm.Owner;
              itm.doHoverIn(e);
            },
            coEvents.Capture,
            coEvents.Active
          );
          coEvents.Add(
            _itm.cntCaption,
            "mouseout",
            function(e){
              var elm=coDOM.srcElement(e);
              var itm=elm.Owner;
              itm.doHoverOut(e);
            },
            coEvents.Capture,
            coEvents.Active
          );
          coEvents.Add(
            _itm.cntCaption,
            "touchend",
            function(e){
              var elm=coDOM.srcElement(e);
              var itm=elm.Owner;
              if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
                coVDM.VDM.Console.Append("Nav.MenuItem.touchend");
              itm.doClick(e);
            },
            coEvents.Capture,
            coEvents.Active
          );
          coEvents.Add(
            _itm.cntCaption,
            "mouseup",
            function(e){
              var elm=coDOM.srcElement(e);
              var itm=elm.Owner;
              if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
                coVDM.VDM.Console.Append("Nav.MenuItem.mouseup");
              itm.doClick(e);
            },
            coEvents.Capture,
            coEvents.Active
          );
        };
        _itm.onClick=onClick;
        _itm.getCaption=function(){
          return coDOM.getText(this.Caption);
        };
        _itm.Conseal=function(){
          var itm=this;
          itm.Hidden=true;
          itm.cntCaption.style.display="none";
        };
        _itm.Hide=function(){
          var itm=this;
          itm.Visible=false;
          itm.Caption.style.visibility="hidden";
          itm.cntCaption.style.visibility="hidden";
        };
        _itm.Show=function(){
          var itm=this;
          itm.Visible=true;
          itm.Hidden=false;
          itm.cntCaption.style.display="block";
          itm.cntCaption.style.visibility="visible";
          itm.Caption.style.visibility="visible";
        };
        _itm.doClick=function(e){
          coDOM.preventDefault(e);
          var itm=this;
          if (itm.Enabled==true) {
            if (itm.Menu.vScrollStart==itm.Menu.vScroll.getPosition()){
              itm.cntCaption.className=itm.Class;
              itm.Clicking=true;
              itm.Menu.setSelected(itm);
              itm.Clicking=false;
            } else {
              itm.Menu.vScrollStart=itm.Menu.vScroll.getPosition();
            };
          };
        };

        _itm.getWidth=function(){
          var itm=_itm;
          return itm.Caption.offsetWidth;
        };
        _itm.Release=function(){
          var itm=_itm;
          var itms=_itms;
          itm.cntCaption.removeChild(itm.Caption);
          itm.Parent.removeChild(itm.cntCaption);
          if (itms.Clearing==false){
            var idx=itms.indexOf(itm);
            if (idx!=-1)
              itms.splice(idx,1);
          };
          return _itm = Release(itm);
        };
        _itm.Free=_itm.Release;
        itms.push(_itm);
        return _itm;
      };
      _itms.getTextWidth=function(){
        var itms=_itms; itm=null; iWidth=0;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          itm=itms[iLcv];
          iWidth=Math.max(itm.cntCaption.offsetWidth,iWidth);
        };
        return iWidth;
      };
      _itms.getHeight=function(){
        var itms=_itms;
        return (itms.length*coVDM.MenuItemHeight);
      };
      _itms.getWidth=itms.getTextWidth;
      _itms.Show=function(){
        var itms=_itms; iLcv=0;
        for (iLcv=0; iLcv<itms.length; iLcv++) {
          if (itms[iLcv].Hidden==false)
            itms[iLcv].Show();
        };
      };
      _itms.Hide=function(){
        var itms=_itms, iLcv=0;

        if (itms.Hovered) {
          itms.Hovered.doHoverOut();
          itms.Hovered=null;
        };

        for (iLcv=0; iLcv<itms.length; iLcv++) itms[iLcv].Hide();
      };
      _itms.Clear=function(){
        var itms=_itms;
        itms.Clearing=true;
        itms.Hovered=null;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          itms[iLcv]=itm.Release();
        };
        itms.length=0;
        itms.Clearing=false;
      };
      _itms.Release=function(){
        var itms=_itms;
        itms.Clear();
        _itms=Release();
      };
      return _itms;
    };
    _sn.initMenu=function(itm){
      itm.Container.className=itm.Nav.Class+"MenuButton";
      itm.Menu=itm;
      itm.AllowCaptionChange=true;
      itm.Selected=null;
      itm.vScrollStart=0;

      itm.Window=document.createElement('div');
      itm.Nav.Parent.appendChild(itm.Window);
      itm.Window.className=itm.Nav.Class+"Menu";
      itm.Window.Align=new Alignment(coAppUI.Alignment.Default);


      itm.vScroll=coAppUI.App.Components.vScroll.Create("vScroll",itm.Nav.Screen.Frame,itm,itm.Window,itm.Window);
      itm.vScroll.onShow=function(){
        var itm=this.Owner;
        itm.vScrollStart=itm.vScroll.getPosition();

        itm.evtPopupCancelByMouse.setActive(false);
        itm.evtPopupCancelByTouch.setActive(false);
      };
      itm.vScroll.onHide=function(){
        var itm=this.Owner;
        itm.evtPopupCancelByMouse.setActive(true);
        itm.evtPopupCancelByTouch.setActive(true);
      };
      itm.Control=itm.Nav.initMenuItems(itm,new Array());

      itm.Label=document.createElement('span');

      itm.Container.appendChild(itm.Label);
      itm.Label.className=itm.Nav.Class+"MenuLabel";
      itm.Label.style.visibility="hidden";
      itm.Label.style.lineHeight=coVDM.NavBarLineHeight+"px";
      itm.getMenuItemWithTarget=function(Target){
        var itm=this;
        itm.Control.getMenuItemWithTarget(Target);
      };
      itm.PopUp=function(){
        var itm=this;
        itm.Window.style.display="block";
        itm.Window.style.visibility="visible";
        itm.Window.style.left=coUtils.getLeft(itm.Container,itm.Nav.Container)+"px";
        itm.Window.style.top=itm.Nav.Container.offsetTop-(itm.Window.offsetHeight - 1 + (itm.Container.offsetHeight-itm.Nav.Container.offsetHeight)/2) +"px";
        itm.Window.style.zIndex=coVDM.VDM.Screens.zIndex()+itm.Nav.Frame.zIndexFactor;
        // check bounds
        if (itm.Window.offsetLeft+itm.Window.offsetWidth+coVDM.MenuSpacing>coVDM.VDM.WorkSpace.Client.clientWidth)
          itm.Window.style.left=coVDM.VDM.WorkSpace.Client.offsetWidth-itm.Window.offsetWidth-coVDM.MenuSpacing+"px";
        itm.Control.Show();
        itm.vScrollStart=itm.vScroll.getPosition();
        itm.evtPopupCancelByMouse.setActive(true);
        itm.evtPopupCancelByTouch.setActive(true);
      };
      itm.CancelPopUp=function(){
        var itm=this;
        itm.evtPopupCancelByMouse.setActive(false);
        itm.evtPopupCancelByTouch.setActive(false);
        itm.Window.style.display="none";
        itm.Window.style.visibility="hidden";
        itm.Control.Hide();
      };
      itm.doClick=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        this.PopUp();
      };
      itm.evtPopupCancelByMouse=coEvents.Add(window,"mouseup",function(e){itm.CancelPopUp(e);},coEvents.NoCapture,coEvents.NoActivate);
      itm.evtPopupCancelByTouch=coEvents.Add(window,"touchend",function(e){itm.CancelPopUp(e);},coEvents.NoCapture,coEvents.NoActivate);
      itm.evtTouchEnd=coEvents.Add(itm.Container,"touchend",function(e){itm.doClick(e);},coEvents.Capture,coEvents.Active);
      itm.evtClick=coEvents.Add(itm.Container,"click",function(e){itm.doClick(e);},coEvents.Capture,coEvents.Active);

      itm.getWidth=function(){
        var itm=this;
        return itm.Label.offsetWidth;
      };
      itm.setWidth=function(){
        var itm=this;
        itm.Container.style.width=itm.getWidth()+"px";
      };
      itm.addItem=function(Name,Caption,Target,onClick,Data){
        var itm=this;
        return itm.Control.addItem(Name,Caption,Target,onClick,Data);
      };
      itm.Control.onSetSize=function(){
        var itm=this;
        itm.Control.onSetSize();
      };
      itm.setSelected=function(mnuItem){
        var mnu=this;
        mnu.CancelPopUp();

        //if ((mnu.AllowCaptionChange==true) && (mnu.Selected==mnuItem)) return;

        mnu.Nav.Torus.Show();
        var mod=((mnu.Selected==null) || (mnu.Selected!=mnuItem));
        if ((mnu.Selected!=null) && (mnu.Selected.Target!=null) && (mnu.Selected.Target!=mnuItem.Target)){
          mnu.Selected.Target.Hide();
        };
        mnu.Selected = ((mnuItem.SaveSelection==true) || (mnu.AllowCaptionChange==true) ) ? mnuItem : null;

        if (mnu.Nav.Screen.Visible==true) mnu.onShow();
        mnu.Nav.setSize();

        if ( (mnuItem!=null) &&  ( (mnuItem.onClick) || (mnuItem.Target!=null) ) ) {
          var toMI=mnuItem;
          setTimeout(
            function(){
              if (toMI.Target) {
                toMI.Target.Parent.Selected=toMI.Target;
                toMI.Target.enforceHideList();
                toMI.Target.Nav.forceSelected(toMI.Target);
                toMI.Target.enforceShowList();
                //if (mnuItem.Target.Slide) mnuItem.Target.Slide.Reveal();
                if (toMI.Target.onCommand) toMI.Target.onCommand(toMI.Target);
              };
              if (toMI.onClick) toMI.onClick(toMI);
              _sn.Torus.Stop();
            },
            coVDM.MenuSelectDelay
          );
        };
      };

      itm.setCaption=function(sCaption){
        var mnu=this;
        coDOM.setText(mnu.Label,sCaption);
        mnu.Label.style.visibility="visible";
        mnu.Container.style.width=coDOM.textWidth(coVDM.divFormat,coTheme.UI.Nav.fontSize,sCaption,coTheme.UI.Nav.Menu.Padding,coTheme.UI.Nav.Menu.Margin)+"px";
      };
      itm.onHide=function(){
        var mnu=this;
        mnu.CancelPopUp();
        //mnu.Label.style.visibility="hidden";
      };
      itm.onShow=function(){
        var mnu=this;
        coTheme.UI.Nav.Menu.Apply(mnu);
        if (coObject.Assigned(mnu.Selected)==true){
          if (mnu.AllowCaptionChange==true) mnu.setCaption(coDOM.getText(mnu.Selected.Caption));
          if (mnu.Selected.Target!=null) {
            mnu.Selected.Target.Parent.Selected=mnu.Selected.Target;
            mnu.Selected.Target.Nav.Selected=mnu.Selected.Target;
            if (mnu.Selected.Target.Nav.Visible==true){
              mnu.Selected.Target.Show(mnu.Selected.Target.Cascade);
            };
          };
          if ( (mnu.Selected.Clicking!=true) && (mnu.Selected.onClick))
            mnu.Selected.onClick(mnu.Selected);
        } else {
          mnu.setCaption(mnu.Caption);
        };
      };

      return itm;
    };
    _sn.initConfirm=function(itm){
      var _itm=itm;
      itm.Control=new Object();
      itm.Control.Class=itm.Nav.Class+"Confirm";

      itm.Control.btnOK=document.createElement('div');
      itm.Container.appendChild(itm.Control.btnOK);
      itm.Control.btnOK.className=itm.Control.Class+"OK";
      itm.Control.btnOK.Item=itm;
      itm.Control.btnOK.style.visibility="hidden";
      itm.Control.btnOK.style.lineHeight=coVDM.NavBarLineHeight+"px";
      itm.Control.btnOK.style.height=coVDM.NavBarConfirmButtonHeight+"px";

      itm.Control.OK=document.createElement('span');
      itm.Control.btnOK.appendChild(itm.Control.OK);
      itm.Control.OK.className=itm.Control.Class+"OK";
      itm.Control.OK.style.lineHeight=coVDM.NavBarConfirmButtonHeight+"px";
      coDOM.setText(itm.Control.OK,itm.Caption[0]);
      itm.Control.OK.style.visibility="hidden";


      itm.Control.btnCancel=document.createElement('div');
      itm.Container.appendChild(itm.Control.btnCancel);
      itm.Control.btnCancel.className=itm.Control.Class+"Cancel";
      itm.Control.btnCancel.Item=itm;
      itm.Control.btnCancel.style.visibility="hidden";
      itm.Control.btnCancel.style.lineHeight=coVDM.NavBarLineHeight+"px";
      itm.Control.btnCancel.style.height=coVDM.NavBarConfirmButtonHeight+"px";
      itm.Control.Cancel=document.createElement('span');
      itm.Control.btnCancel.appendChild(itm.Control.Cancel);
      itm.Control.Cancel.className=itm.Control.Class+"Cancel";
      itm.Control.Cancel.style.lineHeight=coVDM.NavBarConfirmButtonHeight+"px";
      coDOM.setText(itm.Control.Cancel,itm.Caption[1]);
      itm.Control.Cancel.style.visibility="hidden";
      itm.setButtonOKCaption=function(sValue){
        coDOM.setText(this.Control.OK,sValue);
      };
      itm.setButtonCancelCaption=function(sValue){
        coDOM.setText(this.Control.Cancel,sValue);
      };
      itm.resetButtonOKCaption=function(){
        coDOM.setText(this.Control.OK,this.Caption[0]);
      };
      itm.resetButtonCancelCaption=function(){
        coDOM.setText(this.Control.Cancel,this.Caption[1]);
      };
      itm.onShow=function(){
        var itm=this;
        itm.Control.btnOK.style.visibility="visible";
        itm.Control.btnCancel.style.visibility="visible";
        itm.Control.OK.style.visibility="visible";
        itm.Control.Cancel.style.visibility="visible";
      };
      itm.onHide=function(){
        var itm=this;
        itm.Control.btnOK.style.visibility="hidden";
        itm.Control.btnCancel.style.visibility="hidden";
        itm.Control.OK.style.visibility="hidden";
        itm.Control.Cancel.style.visibility="hidden";
      };
      itm.onSetHeight=function(){
        var itm=this;
        itm.Container.style.height=coVDM.NavBarItemHeight+"px";

        itm.Control.btnOK.style.height=coVDM.NavBarConfirmButtonHeight+"px";
        itm.Control.btnCancel.style.height=coVDM.NavBarConfirmButtonHeight+"px";
        itm.Control.OK.style.lineHeight=coVDM.NavBarConfirmButtonHeight+"px";
        itm.Control.Cancel.style.lineHeight=coVDM.NavBarConfirmButtonHeight+"px";
      };
      itm.doOKClick=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var sn=this.Nav;
        var itm=this;
        if ((sn.Torus) && (itm.showTorus==true) ) sn.Torus.Show();
        setTimeout(
          function(){

            if ((itm.onCommand) && (itm.onCommand[0]))
              if (itm.onCommand[0](itm)==false) return false;

            itm.enforceHideList();
            itm.Hide();
            if (itm.Return!=null) {
              itm.Return.enforceHideList();
              itm.Return.Parent.Selected=itm.Return;
              itm.Return.Visible=false;
              itm.Nav.forceSelected(itm.Return);
              if (itm.Return.onCommand) itm.Return.onCommand(itm.Return);
            };
            //setTimeout(function(){ itm.evtBtnOkMouseUp.setActive(true);},coVDM.TouchMouseDelay);
            if ((sn.Torus) && (itm.hideTorus==true)) sn.Torus.Hide(coVDM.torusAutoHide);
            itm.Nav.Screen.setSize();
          },
          coVDM.torusAutoShow
        );
      };
      itm.doCancelClick=function(e){
        if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
          coVDM.VDM.Console.Append("slideNavigator.Confirm.doBtnCancelClick");
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var sn=this.Nav;
        var itm=this;
        if ( (sn.Torus) && (itm.showTorus==true)) sn.Torus.Show();
        setTimeout(
          function(){
            if ((itm.onCommand) && (itm.onCommand[1]))
              itm.onCommand[1](itm);

            itm.enforceHideList();
            itm.Hide();
            if (itm.Return!=null) {
              itm.Return.enforceHideList();
              if (itm.Return.Slide!=null){
                itm.Return.Slide.setSize();
                itm.Return.Slide.Reveal()
              };
              itm.Return.Visible=false;
              //itm.Nav.setSelected(itm.Return);
              itm.Nav.forceSelected(itm.Return);
            };
            if ( (sn.Torus) && (itm.hideTorus==true)) sn.Torus.Hide(coVDM.torusAutoHide);
            itm.Nav.Screen.setSize();
          },
          coVDM.torusAutoShow
        );
      };
      itm.doBtnOkMouseUp=function(e){
        if (e==undefined) e=window.event;
        var itm=this;
        if (coEvents.TouchLock.Active==true) {
          if ((coAppUI.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("slideNavigator.Confirm.doBtnOkMouseUp (exiting)");
          return;
        };
        if (coAppUI.debugToConsole==true)
          coVDM.VDM.Console.Append("slideNavigator.Confirm.doBtnOkMouseUp");
        return itm.doOKClick(e);
      };
      itm.doBtnCancelMouseUp=function(e){
        if (e==undefined) e=window.event;
        var itm=this;
        if (coEvents.TouchLock.Active==true) {
          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("slideNavigator.Confirm.doBtnCancelMouseUp (exiting)");
          return;
        };
        if (coAppUI.debugToConsole==true)
          coVDM.VDM.Console.Append("slideNavigator.Confirm.doBtnCancelMouseUp");
        return itm.doCancelClick(e);
      };
      itm.doBtnOkTouchStart=function(e){
        if (coAppUI.debugToConsole==true)
          coVDM.VDM.Console.Append("slideNavigator.Confirm.doBtnOkTouchStart");
        if (!e) e=window.event;
        coDOM.preventDefault(e);
        var itm=this;
        if (coEvents.TouchLock.Active==true) {
          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("NavBarButton.doBtnOkTouchStart (exiting)");
          return;
        };
        coEvents.TouchLock.Lock(coVDM.TouchLock);
        return itm.doOKClick(e);
      };
      itm.doBtnCancelTouchStart=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var itm=this;
        if (coEvents.TouchLock.Active==true) {
          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("NavBarButton.doBtnCancelTouchStart (exiting "+e.srcElement.className+")");
          return;
        };
        if (coAppUI.debugToConsole==true)
          coVDM.VDM.Console.Append("slideNavigator.Confirm.doBtnCancelTouchStart");
        itm.evtBtnCancelMouseUp.setActive(false);
        itm.Control.Cancel.blur();
        coEvents.TouchLock.Lock(coVDM.TouchLock);
        return itm.doCancelClick(e);
      };

      itm.evtBtnOkMouseUp=coEvents.Add(itm.Control.btnOK,"mouseup",function(e){itm.doBtnOkMouseUp(e);},coEvents.Capture,coEvents.Active);
      itm.evtBtnCancelMouseUp=coEvents.Add(itm.Control.btnCancel,"mouseup",function(e){itm.doBtnCancelMouseUp(e);},coEvents.Capture,coEvents.Active);

      itm.evtBtnOkTouchStart=coEvents.Add(itm.Control.btnOK,"touchstart",function(e){itm.doBtnOkTouchStart(e);},coEvents.Capture,coEvents.Active);
      itm.evtBtnCancelTouchStart=coEvents.Add(itm.Control.btnCancel,"touchstart",function(e){itm.doBtnCancelTouchStart(e);},coEvents.Capture,coEvents.Active);
    };
    _sn.Items=_sn._Children(_sn.Container,null);
    _sn.setSelected=function(navItem){
      var sn=this;
      if (sn.Selected==navItem) return;
      var hInf=navItem.homeInfo;
      if (hInf){
        var btnHome=hInf.Home;
        btnHome.Target=(navItem.homeInfo) ? navItem.homeInfo.Target : navItem;
        btnHome.Slide=navItem.Slide;
        btnHome.MenuItem=hInf.MenuItem;
        if (hInf.onShow)
          hInf.onShow(navItem);
      };
      navItem.Visible=false;
      navItem.Hidden=false;
      sn.Selected=navItem;
      navItem.Parent.Selected=navItem;
      navItem.enforceHideList();
      navItem.Show(navItem.Cascade);
      if ((navItem.Slide) && (navItem.Slide.Reveal)) navItem.Slide.Reveal();
      sn.Screen.setSize();
    };
    _sn.forceSelected=function(navItem){
      var sn=this;
      sn.Selected=null;
      navItem.Selected=false;
      navItem.Hidden=false;
      navItem.Visible=false;
      sn.setSelected(navItem);
      if (
            (navItem.onCommand) &&

            (
              (navItem.onCommand.length==undefined) ||
              (navItem.onCommand.length==1)

            )
      ) {
        navItem.onCommand(navItem);
      };
    };
    _sn.setHome=function(){

    };
    _sn.onResize=function(){
      var sn=this;
      sn.Items.Container.style.left="0px";
      sn.Items.Container.style.height=coVDM.NavBarHeight+"px";
      sn.Items.Container.style.width=sn.Parent.offsetWidth+"px";

      sn.Items.setSize();
      //sn.Items.setPosition(0);
    };
    _sn.doShow=function(){
      var sn=this;
      sn.Visible=true;
      sn.Items.Container.style.left="0px";
      sn.Height=coVDM.NavBarHeight;
      sn.Container.style.height=sn.Height+"px";
      sn.clientHeight=sn.Container.offsetHeight-(sn.Container.offsetHeight-sn.Container.clientHeight);
      sn.Items.Container.style.width=sn.Owner.offsetWidth+"px";
      sn.Items.Container.style.height=coVDM.NavBarItemHeight+"px";
      if (sn.Items.Selected==null) {
        sn.Items.Selected=sn.Items.getSelected();
        if (sn.Items.Selected==null)
          sn.Items.Selected=sn.Items.getDefault();
      };
      sn.Container.style.visibility="visible";
      var navItem=sn.Items.Selected;

      if (navItem!=null) {
        sn.Items.AutoShow(navItem.Cascade);
        navItem.Visible=false;
        navItem.Show(navItem.Cascade);
        sn.forceSelected(navItem);
      } else {
        sn.Items.AutoShow(0);
      };
    };
    _sn.doHide=function(){
      var sn=this;
      sn.Visible=false;
      sn.Container.style.visibility="hidden";
      sn.Items.Hide();
    };
    return _sn;
  }
};
