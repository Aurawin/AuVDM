const AppScreens={
  Version        : new Version(2018,4,9,504),
  Title          : new Title("Core Object Application Screens","AppScreens"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2018.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/app/AppScreens.js',
  debugToConsole : false,
  Bounds         : new Point(10,10),
  init : function(){
    this.App=AppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/App.js',
        '/core/app/AppUI.js'
      ],
      [

      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.deferInit=function(App){
      return (typeof(coVDM.VDM)!='undefined');
    };
    this.App.onInitDeferred=function(App){

    };
    this.App.Initialized=true;
    return this;
  },
  onInitialized : function(App){
    coVDM.VDM.Screens=AppScreens.createScreenManager();
    App.DragHandlers = new App.DragDrop.Handlers();
    App.Loaded=true;
  },
  createScreenManager:function(){
    var _sm=coObject.Create();
    _sm.Class="screenManager";
    _sm.Active=null;
    _sm.List=new Array();
    _sm.DodgeButton=function(){
      var sm=this;
      var iLcv=0;
      for (iLcv=0; iLcv<sm.List.length; iLcv++) {
        var sc=sm.List[iLcv];
        if ((sc) && (sc.Visible==true) && (sc.Frame) && (sc.Frame.TitleBar) )
          sc.Frame.TitleBar.DodgeButton();
      };
    };
    _sm.HideAll=function(){
      var sm=this;
      var iLcv=0;
      for (iLcv=0; iLcv<sm.List.length; iLcv++) {
        var sc=sm.List[iLcv];
        if ((sc) && (sc.Visible==true))
          sc.Hide();
      };
      return true;
    };
    _sm.getVisibleCount=function(){
      var sm=this;
      var iCount=0;
      for (var iLcv=0; iLcv<sm.List.length; iLcv++){
        var sn=sm.List[iLcv];
        if (sn.Visible==true)
          iCount+=1;
      };
      return iCount;
    };
    _sm.indexOf=function(widget){
      var sm=this;
      for (var iLcv=0; iLcv<sm.List.length; iLcv++){
        if (sm.List[iLcv]==widget)
          return iLcv;
      };
      return -1;
    };
    _sm.Remove=function(widget){
      var sm=this;
      var idx=sm.indexOf(widget);
      if (idx!=-1)
        sm.List.splice(idx,1);
      return idx;
    };
    _sm.getRunningApps=function(){
      var _qry=new Array();
      var sm=this;
      _qry.recurseRelease=false;
      _qry.cloneAsVar=true;
      for (var iLcv=0; iLcv<sm.List.length; iLcv++){
        var scn=sm.List[iLcv];
        if (scn.Visible==true)
          _qry.push(scn);
      };
      _qry.Free=function(){
        var qry=this;
        qry.length=0;
        qry=Release(qry);
        return null;
      };
      return _qry;
    };
    _sm.zOrderTop=function(){
      var sm=this;
      var zBase=sm.List.length;
      var zBias=iDZ=1;
      var sc=null;
      for (var iLcv=0; iLcv<sm.List.length; iLcv++){
        sc=sm.List[iLcv];
        if (sc.Visible==true) {
          zBias=( (sc.Frame) && (sc.Frame.zIndexFactor)) ? sc.Frame.zIndexFactor : 0;
          iDZ+=1;
        };
      };
      return zBase+zBias+iDZ;
    };
    _sm.zOrderRunningApps=function(){
      var sm=this;
      var zBase=sm.List.length;
      var zBias=iDZ=1;
      for (var iLcv=0; iLcv<sm.List.length; iLcv++){
        var sc=sm.List[iLcv];
        if (sc.Visible==true) {
          zBias=( (sc.Frame) && (sc.Frame.zIndexFactor)) ? sc.Frame.zIndexFactor : 0;
          sc.Container.style.zIndex=zBase+zBias+iDZ;
          iDZ+=1;
        };
      };
    };
    _sm.ReIndex=function(Widget){
      var sm=this;
      var idx=sm.List.indexOf(Widget);
      if (idx!=-1) sm.List.splice(idx,1);
      sm.List.push(Widget);
    }
    _sm.getAppsByGroup=function(sGroup){
      var _qry=new Array();
      var sm=this;
      _qry.recurseRelease=false;
      _qry.cloneAsVar=true;
      for (var iLcv=0; iLcv<sm.List.length; iLcv++){
        var scn=sm.List[iLcv];
        if (scn.Group==sGroup)
          _qry.push(scn);
      };
      _qry.Free=function(){
        var qry=this;
        qry.length=0;
        qry=Release(qry);
        return null;
      };
      return _qry;
    };
    _sm.Register=function(widget){
      var sm=this;
      return sm.List.push(widget);
    };
    _sm.onCreated=function(){
      var sm=this;
      for (var iLcv=0; iLcv<_sm.List.length; iLcv++){
        var Widget=sm.List[iLcv];
        Widget.setSize();
        if (Widget.onCreated) Widget.onCreated();
      };
    };
    _sm.WorkspaceResized=function(){
      var sm=this;
      for (var iLcv=0; iLcv<sm.List.length; iLcv++){
        var Widget=sm.List[iLcv];
        if (Widget.Visible==true) {
          Widget.checkBounds();
          Widget.setPosition();
        };
      };
    };
    _sm.zIndex=function(){
      var sm=this;
      return sm.List.length+1;
    };
    return _sm;
  },
  createScreen:function(vdm,sClass,sGroup,sName,sCaption,sIcon,aScaleX,aScaleY,aFrame,classFrame,classBorder,classFilm,classClient){
    _sc=coObject.Create();
    if (aScaleX==undefined) aScaleX=0.5;
    if (aScaleY==undefined) aScaleY=0.5;
    if (sIcon==undefined) sIcon="/core/vdm/imgs/apps/ico.png";
    if (aFrame==undefined) aFrame=true;
    if (classFrame==undefined) classFrame="bdrFrame";
    if (classBorder==undefined) classBorder="bdrContainer";
    if (classFilm==undefined) classFilm="bdrFilm";
    if (classClient==undefined) classClient="bdrClient";
    _sc.Modal=false;
    _sc.iconInApplications=true;
    _sc.iconInTaskList=true;
    _sc.iconIndicator=0;
    _sc.Position=App.Position.Center;
    _sc.Hint="";
    _sc.Status=sName;
    _sc.Description="";
    _sc.State=App.State.Full;
    _sc.AllowClose=true;
    _sc.AllowFullScreen=false;
    _sc.FreeOnClose=false;
    _sc.SaveGeometry=false;
    _sc.AllowMove=true;
    _sc.AllowSize=true;
    _sc.Visible=false;
    _sc.Class=sClass;
    _sc.Name=sName;
    _sc.Caption=sCaption;
    _sc.Group=sGroup;
    _sc.Icon=sIcon;
    _sc.TaskList=null;
    _sc.onResize=null;
    _sc.onHide=null;
    _sc.onShow=null;
    _sc.onFree=null;
    _sc.doShow=null;
    _sc.doHide=null;
    _sc.doFree=null;

    _sc.ComponentState=App.ComponentState.Loading;
    _sc.Slides=AppUI.App.Components.Slides.Create();
    _sc.sizeInfo=new Position();
    _sc.PosScale=new App.AppPosScale(aScaleX,aScaleY);

    _sc.tmrResize=App.Timers.createItem(coVDM.screenResizeDelay,_sc);
    _sc.tmrResize.RunOnce=true;
    _sc.tmrResize.onExecute=function(tmr){
      var sc=tmr.Owner;
      sc.setSize();
    };

    _sc.Parent=vdm.WorkSpace.Client;
    _sc.Container=document.createElement('div');
    _sc.Parent.appendChild(_sc.Container);
    _sc.Container.className=_sc.Class+" screenBoxShadow";
    _sc.Frame=(aFrame==true) ? new App.Frame(_sc) : new App.FrameLess(_sc,classFrame,classBorder,classFilm,classClient);
    coVDM.VDM.Screens.Register(_sc);
    if (coTheme.UI.screenFade==true)
      coDOM.setTransition(_sc.Container,coTheme.UI.screenFadeTransition());
    var sDisplay=$(_sc.Container).css("display").toLowerCase();
    if (sDisplay=="none")
      _sc.Container.style.display="block";
    _sc.Height=_sc.Container.offsetHeight;
    _sc.Width=_sc.Container.offsetWidth;
    _sc.sizeInfo.loadCSS(_sc.Container);
    _sc.Container.style.display=sDisplay;

    if (_sc.sizeInfo.Width==0) _sc.sizeInfo.Width=640;
    if (_sc.sizeInfo.Height==0) _sc.sizeInfo.Hidth=480;
    _sc.Manifest=coVDM.Manifest.addEntry(sName,coXML.nodeNamePrep(sName),coDB.NoUpdate);
    _sc.checkBounds=function(){
      var sc=this;

      if (sc.Container.offsetLeft+AppScreens.Bounds.X>coVDM.VDM.WorkSpace.Size.Width)
        sc.Container.style.left=coVDM.VDM.WorkSpace.Size.Width-AppScreens.Bounds.Left+"px";
      if (sc.Container.offsetLeft<0)
        sc.Container.style.left="0px";

      if (sc.Container.offsetTop+AppScreens.Bounds.Y>coVDM.VDM.WorkSpace.Size.Height)
        sc.Container.style.top=coVDM.VDM.WorkSpace.Size.Height-AppScreens.Bounds.Y+"px";
      if (sc.Container.offsetTop<0)
        sc.Container.style.top="0px";
    };
    _sc.createGeometryManifest=function(){
      var sc=this;
      var mfst=sc.Manifest;
      var flds=coDB.Fields("geometry",coDB.HasNoCollection,coDB.HasNoItems);
      flds.addField("Width",coDB.Kind.Integer,"width",sc.sizeInfo.Width,coDB.StreamOn);
      flds.addField("Height",coDB.Kind.Integer,"height",sc.sizeInfo.Height,coDB.StreamOn);
      flds.addField("Top",coDB.Kind.Integer,"top",sc.sizeInfo.Top,coDB.StreamOn);
      flds.addField("Left",coDB.Kind.Integer,"left",sc.sizeInfo.Left,coDB.StreamOn);
      flds.addField("State",coDB.Kind.Integer,"State",sc.State,coDB.StreamOn);

      mfst.addField("Geometry",coDB.Kind.Fields,"geometry",flds,coDB.StreamOn);

      return flds.MAP;
    };
    _sc.Manifest.Geometry=_sc.createGeometryManifest();

    _sc.BringToTop=function(){
      var sc=this;
      var sm=coVDM.VDM.Screens;
      var asc=sm.Active;
      if (asc==sc) return;
      if ( (asc!=sc) && (asc!=null)) {
        if (asc.Modal==true) return;
      };
      sm.ReIndex(sc);
      sm.Active=sc;
      sm.zOrderRunningApps();
    };
    _sc.Show=function(){
      var sc=this;
      var sm=coVDM.VDM.Screens;
      var asc=sm.Active;
      if ( (asc!=sc) && (asc!=null) ) {
        if ((asc.Modal==true) && (asc.Visible==true)) return;
      };
      sm.ReIndex(sc);
      sm.Active=sc;
      if (sc.Visible==true){
        sc.Frame.BringToTop();
      } else {
        if (sc.SaveGeometry) {
          var gm=sc.Manifest.Geometry;
          sc.State=gm.State.Value;
          if (sc.Position==App.Position.TopLeft){
            if (sc.State==App.State.Normal) {
              sc.Container.style.top=gm.Top.Value+"px";
              sc.Container.style.left=gm.Left.Value+"px";
              sc.Container.style.width=gm.Width.Value+"px";
              sc.Container.style.height=gm.Height.Value+"px";
            };
            sc.sizeInfo.Top=gm.Top.Value;
            sc.sizeInfo.Left=gm.Left.Value;
            sc.sizeInfo.Width=gm.Width.Value;
            sc.sizeInfo.Height=gm.Height.Value;

            sc.Width=gm.Width.Value;
            sc.Height=gm.Height.Value;
          };
        };
        sc.Hidden=false;
        sc.Container.style.display="block";
        sc.Container.style.visibility="hidden";
        sc.Frame.Show();
        sc.Container.style.visibility="visible";
        switch (sc.State) {
          case App.State.Normal :
            switch (sc.Position){
              case (App.Position.Center) :
                sc.Frame.setCenter();
                break;
              case (App.Position.TopCenter) :
                sc.Frame.setTopCenter();
                break;
              default :
                //sc.Frame.setSize();
                break;
            };
            break;
          case App.State.Full   :
            sc.Frame.setFull();
            break;
        };
        if (sc.doShow) sc.doShow();
        if (sc.onShow) sc.onShow();
        sc.Frame.BringToTop();
        sc.setSize();
      };
      sc.checkBounds();

      sc.Container.style.opacity=1;
      if (sc!=coVDM.VDM.Splash)
        coVDM.VDM.WorkSpace.Button.setCollapsed();

      sm.zOrderRunningApps();
    };
    _sc._performHide=function(){
      var sc=this;

      sc.Frame.Torus.Stop();
      sc.Frame.Hide();
      if (coVDM.VDM.Screens.Active==sc)
        coVDM.VDM.Screens.Active=null;

      if (sc.Nav) sc.Nav.Hide();
      if (sc.doHide) sc.doHide();
      if (sc.onHide) sc.onHide();

      var iCount=coVDM.VDM.Screens.getVisibleCount();
      if ((iCount==0) && (AppKit.Loading==false))
        coVDM.VDM.WorkSpace.Button.setExpanded();

    };
    _sc._performConseal=function(){
      var sc=this;
      sc.Hide();
      sc.Hidden=true;
      sc.Container.style.display="none";
    };
    _sc._performPosthide=function(){
      this.Container.style.opacity=0;
      var sc=this;
      setTimeout(function(){sc._performHide();},coTheme.UI.screenFadeDelay*1000);
    };
    _sc._performPrehide=function(){
      var sc=this;
      setTimeout(function(){sc._performPosthide();},coTheme.UI.screenFadeDelay*1000);
    };
    _sc._performPostConseal=function(){
      this.Container.style.opacity=0;
      var sc=this;
      setTimeout(function(){sc._performConseal();},coTheme.UI.screenFadeDelay*1000);
    };
    _sc._performPreConseal=function(){
      var sc=this;
      setTimeout(function(){sc._performPostConseal();},coTheme.UI.screenFadeDelay*1000);
    };
    _sc.Close=function(){
      var sc=this;
      sc.Conseal();
      if (sc.FreeOnClose==true) {
        sc.Free();
      };
    };
    _sc.Hide=function(){
      var sc=this;
      if (sc.Visible==true){
        if ((AppKit.Loading==false) && (coTheme.UI.screenFade==true)) {
          sc._performPrehide();
        } else {
          sc._performHide();
        };
      };
    };
    _sc.Conseal=function(){
      var sc=this;
      if ((AppKit.Loading==false) && (coTheme.UI.screenFade==true)) {
        sc._performPreConseal();
      } else {
        sc._performConseal();
      };
    };
    _sc.Reveal=function(){
      var sc=this;
      sc.Hidden=false;
      sc.Container.style.display="block";
      sc.Show();
    };
    _sc.setSize=function(ignoreSize){
      if (ignoreSize==undefined) ignoreSize=false;
      var sc=this;
      if (sc.Hidden==true) return;

      if (ignoreSize!=true){
        sc.Height=sc.Container.offsetHeight;
        sc.Width=sc.Container.offsetWidth;
      };

      if (sc.onResize) sc.onResize(sc);

      sc.Frame.setSize();
      if (sc.Nav) sc.Nav.setSize();
      for (var iLcv=0; iLcv<sc.Slides.length; iLcv++){
        var sl=sc.Slides[iLcv];
        if ((sl.Visible==true) && (sl.setSize)) sl.setSize();
      };
      if (sc.Panels) sc.Panels.setSize();
      if ( (sc.SaveGeometry) && (sc.State==App.State.Normal) && (sc.Frame.Sizing!=true) ) {
        sc.sizeInfo.Top=sc.Container.offsetTop;
        sc.sizeInfo.Left=sc.Container.offsetLeft;
        sc.sizeInfo.Width=sc.Width;
        sc.sizeInfo.Height=sc.Height;
        var gm=sc.Manifest.Geometry;
        gm.Top.Value=sc.sizeInfo.Top;
        gm.Left.Value=sc.sizeInfo.Left;
        gm.Width.Value=sc.sizeInfo.Width;
        gm.Height.Value=sc.sizeInfo.Height;
        coVDM.Manifest.Save();
      };
    };
    _sc.setStatus=function(sStatus){
      var sc=this;
      sc.Status=sStatus;
      if (sc.TaskItem)
        sc.TaskItem.Update();
    };
    _sc.ClientToScreenX=function(elm){
      var sc=this;
      var eLcv=elm; iOffset=0;
      while  ( (eLcv!=null) ){
        iOffset+=eLcv.offsetLeft;
        eLcv=eLcv.parentElement;
        if (eLcv==coVDM.VDM.WorkSpace.Client) return iOffset;
      };
      return iOffset;
    };
    _sc.ClientToScreenScrollY=function(elm){
      var sc=this;
      var eLcv=elm; iOffset=0;
      while  ( (eLcv!=null) ){
        iOffset+=eLcv.scrollTop;
        eLcv=eLcv.parentElement;
        if (eLcv==coVDm.VDM.WorkSpace.Client) return iOffset;
      };
      return iOffset;
    };
    _sc.ClientToScreenY=function(elm){
      var sc=this;
      var eLcv=elm; iOffset=0;
      while  ( (eLcv!=null) ){
        iOffset+=(eLcv.offsetTop-eLcv.scrollTop);
        eLcv=eLcv.parentElement;
        if (eLcv==coVDM.VDM.WorkSpace.Client) return iOffset;
      };
      return iOffset;
    };
    _sc.ClientToScreen=_sc.ClientToScreenX;
    _sc.setPosition=function(){
      var sc=this;
      var bChanged=false;
      var wsHeight=coVDM.VDM.WorkSpace.Size.Height;
      var wsWidth=coVDM.VDM.WorkSpace.Size.Width;
      if (sc.SaveGeometry) {
        sc.Manifest.Geometry.State.Value=sc.State;
        switch (sc.State) {
          case (App.State.Normal) :
            switch (sc.Position) {
              case (App.Position.TopCenter) :
                sc.Container.style.left=Math.round( wsWidth/2 - (sc.Width*sc.PosScale.X) )+"px";
                sc.Container.style.top="0px";
                bChanged=true;
                break;
              case (App.Position.Center) :
                sc.Container.style.left=Math.round( wsWidth/2 - (sc.Width*sc.PosScale.X) )+"px";
                sc.Container.style.top=Math.round( wsHeight/2 - (sc.Height*sc.PosScale.Y) )+"px";
                bChanged=true;
                break;
              case (App.Position.Top) :
                sc.Container.style.top="0px";
                sc.Container.style.bottom="";
                sc.Container.style.width=wsWidth+"px";
                bChanged=true;
                break;
              case (App.Position.Bottom) :
                sc.Container.style.bottom="0px";
                sc.Container.style.top="";
                sc.Container.style.width=wsWidth+"px";
                bChanged=true;
                break;
              default :
                sc.Manifest.Geometry.Top.Value=sc.sizeInfo.Top;
                sc.Manifest.Geometry.Left.Value=sc.sizeInfo.Left;
                break;
            };
            coVDM.Manifest.Save();
            break;
          case (App.State.Full) :
            sc.Width=wsWidth;
            sc.Height=wsHeight;
            sc.Container.style.width=wsWidth+"px";
            sc.Container.style.height=wsHeight+"px";
            bChanged=true;
            break;
        };
      } else {
        switch (sc.Position) {
          case (App.Position.TopCenter) :
            sc.Container.style.left=Math.round( wsWidth/2 - (sc.Width*sc.PosScale.X) )+"px";
            sc.Container.style.top="0px";
            bChanged=true;
            break;
          case (App.Position.Full) :
            sc.Width=wsWidth;
            sc.Height=wsHeight;
            sc.Container.style.width=wsWidth+"px";
            sc.Container.style.height=wsHeight+"px";
            bChanged=true;
            break;
          case (App.Position.Center) :
            sc.Container.style.left=Math.round( wsWidth/2 - (sc.Width*sc.PosScale.X) )+"px";
            sc.Container.style.top=Math.round( wsHeight/2 - (sc.Height*sc.PosScale.Y) )+"px";
            bChanged=true;
            break;
          case (App.Position.Bottom) :
            sc.Container.style.bottom="0px";
            sc.Container.style.top="";
            sc.Container.style.width=wsWidth+"px";
            bChanged=true;
            break;
        };
      };
      if (sc.Container.offsetTop+coVDM.wsMargin>wsHeight){
        sc.Container.style.top=wsHeight-coVDM.wsMargin+"px";
        bChanged=true;
      };
      if (sc.Container.offsetLeft+coVDM.wsMargin>wsWidth){
        sc.Container.style.left=wsWidth-coVDM.wsMargin+"px";
        bChanged=true;
      };
      if (sc.Frame.TitleBar) sc.Frame.TitleBar.DodgeButton();
      if (bChanged==true) sc.setSize(App.ignoreSizing);
    };
    _sc.Free=function(){
      var sc=this;
      if (sc.doFree) sc.doFree(sc);
      if (sc.onFree) sc.onFree();

      coVDM.VDM.Screens.Remove(sc);
      if (sc.TaskItem)
        sc.TaskItem.Free();
      sc.Slides=sc.Slides.Free();
      sc.Frame=sc.Frame.Free();
      sc.Parent.removeChild(sc.Container);
      sc=coObject.Release(sc);
      return null;
    };

    return _sc;
  }
};
AppScreens.init();
