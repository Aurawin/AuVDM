UI.Slides = {
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

  Create         : function(){
    var _lst=new Array();
    _lst.Class="Slides";
    _lst.copyAsVar=true;
    _lst.recurseRelease=false;

    _lst.Hide=function() {
      var list=this;
      for (var iLcv=0; iLcv<list.length; iLcv++){
        var sl=list[iLcv];
        sl.Hide();
      };
    };
    _lst.Conseal=function(){
      var list=this;
      for (var iLcv=0; iLcv<list.length; iLcv++){
        var sl=list[iLcv];
        sl.Conseal();
      };
    };
    _lst.HideAllByParent=function(Parent){
      var list=this;
      for (var iLcv=0; iLcv<list.length; iLcv++){
        var sl=list[iLcv];
        if (sl.Parent==Parent) {
          sl.Hide();
        };
      };
    };
    _lst.HideAllByContainer=function(Cntr){
      var list=this;
      for (var iLcv=0; iLcv<list.length; iLcv++){
        var sl=list[iLcv];
        if (sl.Container==Cntr) {
          sl.Hide();
        };
      };
    };
    _lst.Show=function(){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sl=lst[iLcv];
        sl.Show();
      };
    };
    _lst.setSize=function(){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sl=lst[iLcv];
        if (sl.Visible==true)
          sl.setSize();
      };
    };
    _lst.getSnapForCenter=function(slide){
      var lst=this;
      var p=new Position();
      var yBias=slide.Padding.yBias()+slide.Border.yBias()+slide.Margin.yBias();
      var xBias=slide.Padding.xBias()+slide.Border.xBias()+slide.Margin.xBias();

      p.Top=((slide.Parent.clientHeight/2) - (slide.Container.offsetHeight/2));
      p.Left=((slide.Parent.clientWidth/2)-(slide.Container.offsetWidth/2));
      p.Width=slide.Container.offsetWidth-xBias;
      p.Height=slide.Container.offsetHeight-yBias;
      p.Top=Math.max(p.Top,0);
      return p;
    };
    _lst.getSnapForBottom=function(slide){
      var lst=this;
      var p=new Position();
      var yBias=slide.Padding.yBias()+slide.Border.yBias()+slide.Margin.yBias();
      var xBias=slide.Padding.xBias()+slide.Border.xBias()+slide.Margin.xBias();
      p.Top=slide.Parent.clientHeight-slide.Container.offsetHeight;
      for (var iLcv=lst.length-1; iLcv>=0; iLcv--){
        var sLcv=lst[iLcv];
        if (sLcv==slide) break;
        if ( (sLcv.Align.Index==coAppUI.Alignment.Bottom) && (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) )
          p.Top-=sLcv.Container.offsetHeight+yBias;
      };
      p.Left=0;
      p.Width=slide.Parent.offsetWidth-xBias;
      p.Height=slide.Container.offsetHeight-yBias;
      return p;
    };
    _lst.getSnapForTop=function(slide){
      var lst=this;
      var p=new Position();
      var iValue=0;
      var xBias=slide.Border.xBias()+slide.Padding.xBias()+slide.Margin.xBias();
      var yBias=slide.Border.yBias()+slide.Padding.yBias()+slide.Margin.yBias();
      p.Width=slide.Parent.clientWidth-xBias;
      p.Height=slide.Container.offsetHeight-yBias;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sLcv=lst[iLcv];
        if (sLcv==slide) break;
        if ( (sLcv.Align.Index==coAppUI.Alignment.Top) && (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) )
          p.Top+=sLcv.Container.offsetHeight;
      };
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sLcv=lst[iLcv];
        if (sLcv==slide) break;
        if ( (sLcv.Align.Index==coAppUI.Alignment.Left) && (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) ){
          iValue=sLcv.Container.offsetWidth;
          p.Left+=iValue;
          p.Width-=iValue;
        };
      };
      for (var iLcv=lst.length-1; iLcv>-1; iLcv--){
        var sLcv=lst[iLcv];
        if (sLcv==slide) break;
        if ( (sLcv.Align.Index==coAppUI.Alignment.Right) && (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) )
          p.Right-=sLcv.Container.offsetWidth;
      };
      return p;
    };
    _lst.getSnapForLeft=function(slide){
      var lst=this;
      var p=new Position();
      p.Top=0;
      var yBias=slide.Padding.yBias()+slide.Border.yBias()+slide.Margin.yBias();
      var xBias=slide.Padding.xBias()+slide.Border.xBias()+slide.Margin.xBias();
      p.Width=slide.Container.offsetWidth-xBias;
      p.Height=slide.Parent.clientHeight-yBias;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sLcv=lst[iLcv];
        if (sLcv==slide) break;
        if ( (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) ){
          switch (sLcv.Align.Index) {
            case (coAppUI.Alignment.Left) :
              p.Left+=sLcv.Container.offsetWidth;
              break;
            case (coAppUI.Alignment.Top) :
              p.Top=sLcv.Container.offsetTop+sLcv.Container.offsetHeight;
              p.Height-=(sLcv.Container.offsetHeight+(sLcv.Border.Top+sLcv.Margin.Top));
              break;
          };
        };
      };
      for (var iLcv=lst.length-1; iLcv>=0; iLcv--){
        var sLcv=lst[iLcv];
        if (sLcv==slide) break;
        if ( (sLcv.Align.Index==coAppUI.Alignment.Bottom) && (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) )
          p.Height-=sLcv.Container.offsetHeight-(sLcv.Border.Top+sLcv.Margin.Top);
      };
      return p;
    };
    _lst.Exchange=function(slide1,slide2){
      var lst=this;
      var idx1=lst.indexOf(slide1);
      var idx2=lst.indexOf(slide2);
      if ((idx1>-1) && (idx2>-1)){
        lst[idx1]=slide2;
        lst[idx2]=slide1;
        if (idx1>idx2){
          var S2P=slide1.Container.previousSibling; // guaranteed
          var S1P=slide2.Container.previousSibling; // could be nil
          if (S1P==null)
            S1P=slide1.Parent.lastChild;
          $(S1P).insertAfter(slide1.Container);
        } else {
          var S1P=slide2.Container.previousSibling; // guaranteed
          var S2P=slide1.Container.previousSibling; // could be nil
          $(S1P).insertAfter(slide2.Container);
          if (S1P==null)
            S1P=slide1.Parent.firstChild;
          $(S1P).insertAfter(slide2.Container);

        };
      };
    };
    _lst.getSnapForRight=function(slide){
      var lst=this;
      var p=new Position();
      p.Top=0;
      p.Left=slide.Parent.offsetWidth-slide.Container.offsetWidth;
      var yBias=slide.Padding.yBias()+slide.Border.yBias()+slide.Margin.yBias();
      var xBias=slide.Padding.xBias()+slide.Border.xBias()+slide.Margin.xBias();
      p.Width=slide.Container.offsetWidth-xBias;
      p.Height=slide.Parent.clientHeight-yBias;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sLcv=lst[iLcv];
        if (sLcv==slide) break;
        if ( (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) ){
          switch (sLcv.Align.Index) {
            case (coAppUI.Alignment.Right) :
              p.Left-=sLcv.Container.offsetWidth;
              break;
            case (coAppUI.Alignment.Top) :
              p.Top=sLcv.Container.offsetTop+sLcv.Container.offsetHeight;
              p.Height-=(sLcv.Container.offsetHeight+(sLcv.Border.Top+sLcv.Margin.Top));
              break;
          };
        };
      };
      for (var iLcv=lst.length-1; iLcv>=0; iLcv--){
        var sLcv=lst[iLcv];
        if (sLcv==slide) break;
        if ( (sLcv.Align.Index==coAppUI.Alignment.Bottom) && (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) )
          p.Height-=sLcv.Container.offsetHeight-(sLcv.Border.Top+sLcv.Margin.Top);
      };
      return p;
    };
    _lst.getSnapForClient=function(slide){
      var lst=this;
      var p=new Position();
      var yBias=slide.Border.yBias()+slide.Padding.yBias()+slide.Margin.yBias();
      var xBias=slide.Border.xBias()+slide.Padding.xBias()+slide.Margin.xBias();

      //var cntr=slide.getContainer();
      p.Width=slide.Parent.clientWidth-xBias;
      p.Height=slide.Parent.clientHeight-yBias;
      /*
      p.Width=slide.Parent.offsetWidth-xBias;
      p.Height=slide.Parent.offsetHeight-yBias;
      */
      // Fix Height and Top
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sLcv=lst[iLcv];
        if ((sLcv.Align.Index==coAppUI.Alignment.Top) && (sLcv.Visible==true) ) {
           p.Top+=sLcv.Container.offsetHeight;
           p.Height-=sLcv.Container.offsetHeight;
        } else if ((sLcv.Align.Index==coAppUI.Alignment.Bottom) && (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) ){
           p.Height-=sLcv.Container.offsetHeight;
        };
      };
      // Fix Left and Width
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sLcv=lst[iLcv];
        if ((sLcv.Align.Index==coAppUI.Alignment.Left) && (sLcv.Visible==true) ) {
          p.Left+=sLcv.Container.offsetWidth;
          p.Width-=sLcv.Container.offsetWidth;
        } else if ( (sLcv.Align.Index==coAppUI.Alignment.Right ) && (sLcv.Visible==true) && (sLcv.Parent==slide.Parent) ) {
          p.Width-=sLcv.Container.offsetWidth;
        };
      };
      p.Height-=slide.Border.yBias();
      return p;
    };
    _lst.getClientArea=function(Parent,posClient){
      var lst=this;
      var p=posClient.Clone();
      // Fix Height and Top
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sLcv=lst[iLcv];
        if ((sLcv.Visible==true) && (sLcv.Parent==Parent)) {
          if ((sLcv.Align.Index==coAppUI.Alignment.Top)) {
            p.Top+=sLcv.Container.offsetHeight;
            p.Height-=sLcv.Container.offsetHeight;
          } else if ((sLcv.Align.Index==coAppUI.Alignment.Bottom) ){
            p.Height-=sLcv.Container.offsetHeight;
          };
        };
      };
      // Fix Left and Width
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var sLcv=lst[iLcv];
        if (sLcv.Visible==true) {
          if (sLcv.Align.Index==coAppUI.Alignment.Left) {
            p.Left+=sLcv.Container.offsetWidth;
            p.Width-=sLcv.Container.offsetWidth;
          } else if ( (sLcv.Align.Index==coAppUI.Alignment.Right ) && (sLcv.Parent==Parent) ) {
            p.Width-=sLcv.Container.offsetWidth;
          };
        };
      };
      return p;
    };
    _lst.createSlide=function(sName,sClass,Screen,Owner,Parent,Align){
      var lst=this;
      if (Align==undefined) Align=coAppUI.Alignment.Default;

      var _sl=new Object();
      _sl.List=lst;
      _sl.Align=new Alignment(Align);
      _sl.Visible=false;
      _sl.Hidden=false;
      _sl.Shown=false;
      _sl.copyAsVar=true;
      _sl.Panels=null;
      _sl.vScroll=null;
      _sl.Name=sName;
      _sl.Class=sClass;
      _sl.Owner=Owner;
      _sl.Screen=Screen;
      _sl.Frame=Screen.Frame;
      _sl.Parent=Parent;
      _sl.cssLoaded=false;
      _sl._display="";
      _sl.DataSet=null;
      _sl.zIndex=1;
      _sl.displayMode="block";
      _sl.debugToConsole=coAppUI.App.Components.Slides.debugToConsole;
      _sl.Logging=coAppUI.App.Components.Slides.debugToConsole;
      _sl.shownCount=0;
      _sl.resizeNeeded=false;
      _sl.innerPosition=new Position();
      _sl.Slides=coAppUI.App.Components.Slides.Create();
      _sl.Container=document.createElement('div');
      _sl.Parent.appendChild(_sl.Container);
      _sl.Container.Owner=_sl;
      _sl.doSetSize=function(){};
      _sl.doFree=function(){};
      _sl.doCreate=function(){};

      lst.push(_sl);

      _sl.setOverflow=function(X,Y){
        this.Container.style.overflowX= (X==true)? "auto" : "hidden";
        this.Container.style.overflowY= (Y==true)? "auto" : "hidden";
        this.Container.style.webkitOverflowScrolling=((X==true) || (Y==true)) ? "touch !important" : "none !important";
      };
      _sl.Controls=new Array();
      _sl.Controls.Owner=_sl;
      _sl.Controls.Show=function(){
        var ctls=this;
        for (var iLcv=0; iLcv<ctls.length; iLcv++){
          var ctl=ctls[iLcv];
          if (ctl.Visible==true)
            ctl.Show();
        };
      };
      _sl.Controls.Serialize=function(){
        var ctls=this
        var sResult="";
        for (var iLcv=0; iLcv<ctls.length; iLcv++){
          var ctl=ctls[iLcv];
          if (ctl.Serialize) {
            var sData=ctl.Serialize();
            if ((sData) && (sData.length>0))
              sResult+=sData+"&";
          };
        };
        for (var iLcv=0; iLcv<ctls.Owner.Slides.length; iLcv++){
          var sl=ctls.Owner.Slides[iLcv];
          var sData=sl.Controls.Serialize();
          if ((sData) && (sData.length>0))
            sResult+=sData;
        };
        return sResult;
      };
      _sl.Controls.Hide=function(){
        var ctls=this;
        for (var iLcv=0; iLcv<ctls.length; iLcv++){
          var ctl=ctls[iLcv];
          if (ctl.Visible==true){
            ctl.Hide();
            ctl.Visible=true;
          };
        };
      };
      _sl.Container.className=sClass+" sldBackground";
      _sl.Container.setAttribute("name",sName);
      _sl._display=coUtils.getStyle(_sl.Container,'display');
      _sl.onShow=null;
      _sl.onHide=null;
      _sl.onSetSize=null;
      _sl.onResize=null;
      _sl.onFree=null;
      _sl.toOverflow=0;
      _sl.Transparent=false;
      _sl.Border=new Border();
      _sl.Border.Load(_sl.Container);
      _sl.Padding=new Padding();
      _sl.Padding.Load(_sl.Container);
      _sl.Margin=new Margin();
      _sl.Margin.Load(_sl.Container);
      coDOM.clearMargins(_sl.Container);
      _sl.doShow=function(sl){};
      _sl.doHide=function(sl){};
      _sl.setBounds=function(sTop,sLeft,sBottom,sRight){
        var sl=this;
        sl.Container.style.top=sTop;
        sl.Container.style.left=sLeft;
        sl.Container.style.right=sRight;
        sl.Container.style.bottom=sBottom;
      };
      _sl.setTransparent=function(value){
        var sClass=this.Container.className;
        if (value==true) {
          if (sClass.indexOf("sldBackground")!=-1){
            sClass=sClass.replace(" sldBackground","");
            this.Container.className=sClass;
          };
        } else {
          if (sClass.indexOf("sldBackground")!=-1){
            sClass+=" sldBackground";
            this.Container.className=sClass;
          };
        };
      };
      _sl.scrollInView=function(itm,Target,Offset){
        var sl=this;
        if (Target==undefined) Target=sl.Container;
        if (Offset==undefined) Offset=0;
        var elm=(itm.Container) ? itm.Container : itm;
        var iOffset=coDOM.getOffsetTop(elm,Target);
        var iCalc=iOffset+elm.offsetHeight;
        var iWindow=Target.scrollTop+Target.clientHeight;
        if (iCalc>=iWindow){
          Target.scrollTop=(iOffset+elm.offsetHeight+2)-Target.clientHeight;
        } else if ((iCalc<iWindow) && (iOffset<Target.scrollTop)){
          Target.scrollTop=iOffset+Offset;
        };
      };
      _sl.pageUp=function(){
        var sl=this;
        if ( (sl.Unit.debugToConsole==true) && (sl.Logging==true) ) coVDM.VDM.Console.Append("Slide.pageUp");
        sl.Container.scrollTop=sl.Container.scrollTop-sl.Container.clientHeight;
      };
      _sl.pageDown=function(){
        var sl=this;
        if ( (sl.Unit.debugToConsole==true) && (sl.Logging==true) ) coVDM.VDM.Console.Append("Slide.pageDown");
        sl.Container.scrollTop=sl.Container.scrollTop+sl.Container.clientHeight;
      };
      _sl.setTabIndex=function(value){
        var sl=this;
        sl.Container.tabIndex=value;
      };
      _sl.setClassName=function(sClass){
        this.Container.className=sClass;
      };
      _sl.clearContainerClass=function(sAdded){
        sAdded=(sAdded==undefined) ? "" : " " + sAdded;
        this.Container.className=this.Class + sAdded;
      };
      _sl.getContainerByParent=function(){
        return this.Parent;
      };
      _sl.getContainerByOwner=function(){
        return this.Owner.Container;
      };
      _sl.setCaption=function(sCaption){
        coDOM.setText(this.Container,sCaption);
      };
      _sl.setHTML=function(sCaption){
        coDOM.setHTML(this.Container,sCaption);
      };
      _sl.setBackgroundImage=function(sURL){
         this.Container.style.backgroundImage= (sURL.length>0)? "url("+sURL+")" : "";
      };
      _sl.getContainer=(_sl.Owner==_sl.Screen.Frame) ? _sl.getContainerByParent : _sl.getContainerByOwner;
      _sl.setOwnerAndParent=function(Slides,Owner,Parent){
        var sl=this;
        var lst=sl.List;
        var idx=lst.indexOf(sl);
        if (idx!=-1)
          lst.splice(idx,1);
        sl.List=Slides;
        sl.Owner=Owner;
        sl.Parent=Parent;
        switch (sl.Align.Index) {
          case coAppUI.Alignment.Bottom :
            sl.List.push(sl);
            sl.Parent.appendChild(sl.Container);
            break;
          case coAppUI.Alignment.Top    :
            sl.List.splice(0,0,sl);
            sl.Parent.insertBefore(sl.Container,sl.Parent.firstChild);
            break;
          case coAppUI.Alignment.Left   :
            sl.List.splice(0,0,sl);
            sl.Parent.insertBefore(sl.Container,sl.Parent.firstChild);
            break;
          case coAppUI.Alignment.Right  :
            sl.List.push(sl);
            sl.Parent.appendChild(sl.Container);
            break;
          case coAppUI.Alignment.Center   :
            sl.List.splice(0,0,sl);
            sl.Parent.insertBefore(sl.Container,sl.Parent.firstChild);
            break;
          case coAppUI.Alignment.Client :
            sl.List.push(sl);
            sl.Parent.appendChild(sl.Container);
            break;
        };
        sl.getContainer=(sl.Owner==sl.Screen.Frame) ? sl.getContainerByParent : sl.getContainerByOwner;
        sl.Screen.setSize();
      };
      _sl.setPosition=function(p){
        var sl=this;
        sl.Container.style.top=p.Top+"px";
        sl.Container.style.left=p.Left+"px";
        sl.Container.style.width=p.Width+"px";
        sl.Container.style.height=p.Height+"px";
        sl.innerPosition.Top=sl.Padding.Top;
        sl.innerPosition.Left=sl.Padding.Left;
        sl.innerPosition.Width=p.Width-sl.Padding.xBias();
        sl.innerPosition.Height=p.Height-sl.Padding.yBias();
      };
      _sl.snapToCenter=function(){
        var sl=this;
        var lst=sl.List;
        var p=lst.getSnapForCenter(sl);
        sl.setPosition(p);
        p=null;
      };
      _sl.snapToBottom=function(){
        var sl=this;
        var lst=sl.List;
        var p=lst.getSnapForBottom(sl);
        sl.setPosition(p);
        p=null;
      };
      _sl.snapToTop=function(){
        var sl=this;
        var lst=sl.List;
        var p=lst.getSnapForTop(sl);
        sl.setPosition(p);
        p=null;
      };
      _sl.snapToLeft=function(){
        var sl=this;
        var lst=sl.List;
        var p=lst.getSnapForLeft(sl);
        sl.setPosition(p);
        p=null;
      };
      _sl.snapToRight=function(){
        var sl=this;
        var lst=sl.List;
        var p=lst.getSnapForRight(sl);
        sl.setPosition(p);
        p=null;
      };
      _sl.snapToClient=function(){
        var sl=this;
        var lst=sl.List;
        var p=lst.getSnapForClient(sl);
        sl.setPosition(p);
        p=null;
      };
      _sl.setVisibility=function(Value){
        var sl=this;
        if (Value==true){
          sl.style.zIndex=sl.zIndex;
          sl.Visible=true;
          if (sl.Panels!=null)
            sl.Panels.setVisibility(true);
        } else {
          sl.Visible=false;
          if (sl.Panels!=null)
            sl.Panels.setVisibility(false);
        };
      };
      _sl.sumClientHeightsEx=function(itm){
        var sl=this;
        var iHeight=0; var nodes=itm.parentNode.childNodes;
        for (var iLcv=0; iLcv<nodes.length; iLcv++){
          var itmLcv=nodes[iLcv];
          if ((itmLcv!=itm) && (itmLcv.style.visibility.toLowerCase()=="visible"))
            iHeight+=itmLcv.offsetHeight;
        };
        return iHeight;
      };
      _sl.setColor=function(Color){
        this.Container.style.backgroundColor=Color;
      };
      _sl.loadCSS=function(){
        var sl=this;
        sl.cssLoaded=true;
        sl.Border.Load(sl.Container);
        sl.Padding.Load(sl.Container);
        sl.Margin.Load(sl.Container);
        coDOM.clearMargins(sl.Container);
      };
      _sl.setWidth=function(iValue){
        this.Container.style.width=(iValue!=undefined) ? iValue +"px" : "";
      };
      _sl.setHeight=function(iValue){
        this.Container.style.height=(iValue!=undefined) ? iValue +"px" : "";
        this.Height=iValue;
      };
      _sl.BringToTop=function(){
        var sl=this;
        sl.Container.style.zIndex=sl.zIndex;
      };
      _sl.Show=function(){
        var sl=this;
        if (sl.Hidden==true) {
          sl.Visible=false;
          return;
        };
        sl.Container.style.display=sl.displayMode;
        if ( (sl.Shown==true) && (sl.Visible==true)) {
          sl.Container.style.zIndex=sl.zIndex;
          if (sl.onFocus) sl.onFocus();
          return;
        };
        sl.shownCount+=1;
        sl.Container.style.visibility="visible";
        if (sl.cssLoaded!=true) sl.loadCSS();
        sl.Container.style.zIndex=sl.zIndex;
        sl.Visible=true;
        sl.Slides.Show();
        sl.Controls.Show();
        sl.doShow(sl);
        if (sl.Panels!=null) sl.Panels.Show();
        if (sl.onShow!=null) sl.onShow();

        if (sl.onFocus) sl.onFocus();
        sl.setSize();
        if (sl.resizeNeeded==true)
          sl.setSize();
        sl.evtDOMSubtreeModified.setActive(true);
        sl.Shown=true;
      };
      _sl.Reveal=function(){
        var sl=this;
        sl.Hidden=false;
        sl.Container.style.display=sl._display;
        sl.Show();
      };
      _sl.Conseal=function(){
        var sl=this;
        sl.Container.style.display="none";
        if (sl.Torus) sl.Torus.Stop();
        sl.Hide();
        sl.Hidden=true;
      };
      _sl.Hide=function(){
        var sl=this;
        sl.evtDOMSubtreeModified.setActive(false);
        if (sl.Torus) sl.Torus.Stop();
        if (sl.Visible==false) return;
        sl.Container.style.visibility="hidden";
        sl.Visible=false;
        if (sl.vScroll) sl.vScroll.Hide();
        sl.Controls.Hide();
        sl.Slides.Hide();
        sl.doHide(sl);
        if (sl.Panels!=null) sl.Panels.Hide();
        if (sl.onHide!=null) sl.onHide();
      };
      _sl.setSize=function(){
        var sl=this;
        sl.resizeNeeded=false;
        if (sl.vScroll) sl.vScroll.Hide();
        switch (sl.Align.Index) {
            case coAppUI.Alignment.Bottom : sl.snapToBottom(); break;
            case coAppUI.Alignment.Top    : sl.snapToTop(); break;
            case coAppUI.Alignment.Left   : sl.snapToLeft();  break;
            case coAppUI.Alignment.Right  : sl.snapToRight(); break;
            case coAppUI.Alignment.Center : sl.snapToCenter(); break;
            case coAppUI.Alignment.Client : sl.snapToClient(); break;
        };
        for (var iLcv=0; iLcv<sl.Controls.length; iLcv++){
          var c=sl.Controls[iLcv];
          if (c.Visible==true) c.enforcePlacement();
        };
        sl.doSetSize(sl);
        if (sl.onSetSize) sl.onSetSize();
        if (sl.onResize) sl.onResize();
        if (sl.Panels) sl.Panels.setSize();
        if (sl.Slides) sl.Slides.setSize();
      };
      _sl.doBringToTop=function(){
        var sl=this;
        // if (sl.vScroll) sl.vScroll.Hide();
        sl.Screen.BringToTop();
        if (sl.onFocus) sl.onFocus();
      };
      _sl.evtMouseDown=coEvents.Add(_sl.Container,"mousedown",function(){var sl=this.Owner; sl.doBringToTop();},coEvents.NoCapture,coEvents.Active);
      _sl.evtTouchStart=coEvents.Add(_sl.Container,"touchstart",function(){var sl=this.Owner; sl.doBringToTop();},coEvents.NoCapture,coEvents.Active);
      _sl.evtDOMSubtreeModified=coEvents.Add(
        _sl.Container,
        "DOMSubtreeModified",
        function(){
          var sl=this.Owner;
          if (sl.toOverflow!=0)
            clearTimeout(sl.toOverflow);
          sl.evtDOMSubtreeModified.setActive(false);
          sl.toOverflow=setTimeout(
            function(){
              if ( (Assigned(sl)==true) && (sl.Screen.Visible==true) && (sl.Hidden==false) && (sl.Visible==true)) {
                if (
                  (sl.evtDOMSubtreeModified.Position.Top!=sl.Container.offsetTop)||
                  (sl.evtDOMSubtreeModified.Position.Left!=sl.Container.offsetLeft)||
                  (sl.evtDOMSubtreeModified.Position.Width!=sl.Container.offsetWidth)||
                  (sl.evtDOMSubtreeModified.Position.Height!=sl.Container.offsetHeight)
                ){
                  sl.setSize();
                  sl.evtDOMSubtreeModified.Position.Top=sl.Container.offsetTop;
                  sl.evtDOMSubtreeModified.Position.Left=sl.Container.offsetLeft;
                  sl.evtDOMSubtreeModified.Position.Width=sl.Container.offsetWidth;
                  sl.evtDOMSubtreeModified.Position.Height=sl.Container.offsetHeight;
                };
                clearTimeout(sl.toOverflow);
                sl.toOverflow=0;
              };
              setTimeout(function(){if (coObject.Assigned(sl)==true) sl.evtDOMSubtreeModified.setActive(true);},500);
            },
            1000
          );
        },
        coEvents.NoCapture,
        coEvents.NoActivate
      );
      _sl.evtDOMSubtreeModified.Position=new Position();

      _sl.Free=function(){
        var sl=this;
        var lst=sl.List;
        if (sl.doFree) sl.doFree();
        if (sl.onFree) sl.onFree();
        var idx=lst.indexOf(sl);
        if (idx!=-1) lst.splice(idx,1);

        sl.Container.EventList.Free();

        if (sl.Panels) sl.Panels.Free();
        if (sl.Slides) sl.Slides.Free();

        sl.Parent.removeChild(sl.Container);
        sl=Release(sl);
        return null;
      };
      return _sl;
    };
    _lst.Free=function(){
      var lst=this;
      while (lst.length>0) {
        var sld=lst[0];
        sld.Free();
      };
      lst.length=0;
      lst=coObject.Release(lst);
      return null;
    };
    return _lst;
  }
};
