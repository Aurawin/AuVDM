UI.FilmStrip = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  Compiled       : false,
  Transition     : 'left 10s linear',
  AspectRatio    : 1.33333,
  defaultSpacing : 10,
  init:function(){
    this.Initialized=true;
    UI.Controls.Add(this);
  },
  createAspect   : function(Owner,Ratio,InnerSpacing){
    a=coObject.Create(coObject.relInline,coObject.cpyAsVar,"Aspect");
    a.Owner=Owner;
    a.Ratio=Ratio;
    a.InnerSpacing=InnerSpacing;
    a.Apply=function(){
      var a=this;
      var vw=a.Owner;
      for (var iLcv=0; iLcv<vw.Frames.length; iLcv++){
        var F=vw.Frames[iLcv];
        F.AdjustSize();
      };
    };
    a.Free=function(){
      var a=this;
      a.Owner.Apsect=null;
      a=coObject.Release(a);
      return null;
    };
    return a;
  },
  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Default;

    var _vw=Slides.createSlide(sName,sClass+" FilmStrip",Screen,Owner,Parent,Align);
    _vw.Container.className="FilmStrip "+sClass;
    _vw.Class=sClass;
    _vw.Container.style.overflow="hidden";
    _vw.Client=document.createElement('div');
    _vw.Container.appendChild(_vw.Client);
    _vw.Transition=this.Transition;
    _vw.urlSlideBackground=coTheme.UI.FilmStrip.Slide.Background;
    _vw.colorSlideBackground=coTheme.UI.FilmStrip.Slide.Color;
    _vw.transitionScrollDelay=coTheme.UI.FilmStrip.Slide.transitionScrollDelay;
    _vw.Aspect=this.createAspect(_vw,this.AspectRatio,this.defaultSpacing);
    _vw.Client.className=sClass+"Client FilmStripClient";
    _vw._createFrames=function(){
      var vw=this;
      var lst=new Array();
      lst.Class="FilmFrames";
      lst.Owner=vw;
      lst.Parent=vw.Client;
      lst.Container=document.createElement('div');
      lst.Parent.appendChild(lst.Container);
      lst.Container.className=sClass+"Frames FilmStripFrames";
      lst.Clearing=false;
      lst.Loading=false;

      lst.Stop=function(){
        var lst=this;
        //lst.evtTransition.setActive(false);
        coDOM.clearTransition(lst.Parent);
        lst.Parent.style.left="0px";
        lst.evtTransition.setActive(false);
      };
      lst.Start=function(){
        var lst=this;
        //lst.evtTransition.setActive(true);
        coDOM.setTransition(lst.Parent,lst.Owner.Transition);
        var elm=lst.Container.firstChild;
        lst.Parent.style.left="-"+elm.offsetWidth+"px";
        lst.evtTransition.setActive(true);
      };
      lst.doTransitionEnd=function(e){
        var lst=this;
        coDOM.clearTransition(lst.Parent);
        var elm=lst.Container.firstChild;
        lst.Container.appendChild(elm); // push it to the end;
        lst.Parent.style.left="0px";
        setTimeout(
          function(){
            coDOM.setTransition(lst.Parent,lst.Owner.Transition);
            lst.Parent.style.left="-"+elm.offsetWidth+"px";
          },
          50
        );
      };
      lst.doResize=function(e){
        var lst=this;
        lst.Container.style.height=lst.Parent.clientHeight+"px";
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var F=lst[iLcv];
          F.AdjustSize();
        };
      };
      lst.doScroll=function(e){
        var vw=this.Owner;
        if (vw.onScroll) vw.onScroll();
      };
      lst.evtTransition=coEvents.Add(lst.Parent,coDOM.TransitionEnd,function(e){lst.doTransitionEnd(e);},coEvents.Capture,coEvents.NoActivate);
      lst.evtScroll=coEvents.Add(vw.Container,coDOM.Scroll,function(e){lst.doScroll(e);},coEvents.NoCapture,coEvents.Active);
      lst.addItem=function(sCaption,sGlyph){
        if (sGlyph==undefined) sGlyph="";
        if (sCaption==undefined) sCaption="";
        var lst=this;
        var vw=lst.Owner;
        var f=coObject.Create(coObject.relInline,coObject.cpyAsVar,"FilmFrame");
        f.Owner=lst;
        f.Parent=lst.Container;
        f.onOpen=null;
        f.Data=null;
        f.Container=document.createElement('div');
        f.Parent.appendChild(f.Container);
        f.Container.className=f.Class + " " + vw.Class+"Frame";
        if (vw.urlSlideBackground.length>0) {
          f.Container.style.backgroundImage="url("+vw.urlSlideBackground+")";
          f.Container.style.backgroundColor=vw.colorSlideBackground.toString();
        } else {
          f.Container.style.backgroundImage="none";
          f.Container.style.backgroundColor=vw.colorSlideBackground.toString();
        };
        f.Glyph=document.createElement('div');
        f.Container.appendChild(f.Glyph);
        f.Glyph.className=f.Class+"Glyph " + vw.Class+"FrameGlyph";
        if (sCaption.length>0) coDOM.setText(f.Glyph,sCaption);
        if (sGlyph.length>0) f.Glyph.style.backgroundImage="url("+sGlyph+")";
        f.URL=sGlyph;
        f.AdjustSize=function(){
          var f=this;
          var iSpacing=(2*f.Owner.Owner.Aspect.InnerSpacing);
          f.Container.style.height=f.Parent.clientHeight+"px";
          f.Container.style.width=coMath.Trunc(f.Container.offsetHeight*f.Owner.Owner.Aspect.Ratio)+"px";
          f.Glyph.style.top=f.Owner.Owner.Aspect.InnerSpacing+"px";
          f.Glyph.style.left=f.Owner.Owner.Aspect.InnerSpacing+"px";
          f.Glyph.style.width=(f.Container.clientWidth-iSpacing)+"px";
          f.Glyph.style.height=(f.Container.clientHeight-iSpacing)+"px";
        };
        f.setImage=function(sGlyph){
          var f=this;
          f.Glyph.style.backgroundImage="url("+sGlyph+")";
          f.URL=sGlyph;
        };
        f.setCaption=function(sCaption){
          var f=this;
          if (sCaption.length>0) coDOM.setText(f.Glyph,sCaption);
        };
        f.doOpen=function(e){
          var f=this;
          if (e==undefined) e=window.event;
          if (f.onOpen){
            coDOM.preventDefault(e);
            f.onOpen(f);
          };
        };
        f.scrollInView=function(){
          var f=this;
          var vw=f.Owner.Owner;
          $(vw.Container).animate({ scrollLeft:(f.Container.offsetLeft+(f.Container.offsetWidth/2))-(vw.Container.clientWidth/2)},vw.transitionScrollDelay,coTheme.UI.frameTransitionEase);
        };
        f.Free=function(){
          var f=this;
          var vw=f.Owner.Owner;

          if (f.Owner.Clearing==false) {
            var idx=f.Owner.indexOf(f)
            if (idx!=-1) f.Owner.splice(idx,1);
          };
          f.Container.removeChild(f.Glyph);
          f.Parent.removeChild(f.Container);

          f=coObject.Release(f);
          return null;
        };
        f.AdjustSize();
        f.Container.ontouchstart=function(e){coDOM.preventDefault(e);};
        f.Container.ontouchend=function(e){f.doOpen(e);};
        f.Container.onmouseup=function(e){f.doOpen(e);};
        this.push(f);
        return f;
      };
      lst.Clear=function(){
        var lst=this, f=null;
        lst.Clearing=true;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          f=lst[iLcv];
          f.Free();
        };
        lst.Clearing=false;
        lst.length=0;
      };
      lst.Free=function(){
        var lst=this;
        lst.Clear();
        lst.evtTransition.Free();
        lst.Parent.removeChild(lst.Container);
        lst=null;
        return null;
      };
      return lst;
    };
    _vw.Frames=_vw._createFrames();
    _vw.onResize=function(){
      this.Client.style.height=this.Container.clientHeight+"px";
      this.Frames.doResize();
    };
    return _vw;
  }
};
