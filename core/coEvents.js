var coEvents={
  Version        : new Version(2014,8,22,27),
  Title          : new Title("Core Object Events","coEvents"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  NoActivate     : false,
  debugToConsole : false,
  Active         : true,
  Capture        : true,
  NoCapture      : false,
  TouchLock      : null,
  FocusLock      : null,
  ScrollLock     : null,
  init : function(){
    this.TouchLock=this.createLock();
    this.FocusLock=this.createLock();
    this.NavigationLock=this.createLock();
    this.ScrollLock=this.createScrollLock();
  },
  createScrollLock : function(){
    _sk=coEvents.createLock();
    _sk.vScroll=null;
    _sk.elmLock=null;
    _sk.doLock=_sk.Lock;
    _sk.Lock=function(durationMS,vs,elm){
      if (vs==undefined) vs=null;
      if (elm==undefined) elm=null;
      var sk=this;

      sk.vScroll=vs;
      sk.elmLock=elm;
      if (elm) elm.blur();
      sk.doLock(durationMS);
    };
    _sk.onUnlock=function(){
      var sk=this;
      var vs=sk.vScroll, elm=sk.elmLock;
      if ((vs) && (elm)){
        vs.scrollToTop(elm);
        elm.focus();
      };
    };
    return _sk;
  },
  createLock : function(){
    _lk=new Object();
    _lk.Active=false;
    _lk.toLock=0;
    _lk.onLock=null;
    _lk.onUnlock=null;
    _lk.elmStart=null;
    _lk.Lock=function(durationMS){
      var lk=this;
      if (durationMS==undefined) durationMS=1000;
      lk.Active=true;
      if (lk.toLock!=0)
        clearTimeout(lk.toLock);
      lk.toLock=setTimeout(function(){lk._doTimerUnlock();},durationMS);
      if (lk.onLock) lk.onLock();
    };
    _lk.Unlock=function(){
      var lk=this;
      if (lk.toLock!=0){
        clearTimeout(lk.toLock);
        if (lk.onUnlock) lk.onUnlock();
      };
      lk.toLock=0;
      lk.Active=false;
      lk.elmStart=null;
    };
    _lk._doTimerUnlock=function(){
      var lk=this;
      lk.Active=false;
      if (lk.onUnlock) lk.onUnlock();
    };
    return _lk;
  },
  createList : function(el){
    _lst=new Array();
    _lst.Element=el;
    _lst.Loading=false;
    _lst.Remove=function(type,method){
      var lst=this;
      var idx=lst.indexOf(type,method);
      if (idx>-1)
        lst.splice(idx,1);
    };
    _lst.Add=function(el,type,method,capture,active){
      var lst=this;
      return lst.createEvent(el,type,method,capture,active);
    };
    _lst.indexOf=function(type,method){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var evt=lst[iLcv];
        if ( (evt.Type==type) && (evt.Event==method) )
          return iLcv;
      };
      return -1;
    };
    _lst.findType=function(type){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var evt=lst[iLcv];
        if (evt.type==type)
          return evt;
      };
      return null;
    };
    _lst.resetEvent=function(type,method){
      var lst=this;
      var idx=lst.indexOf(type,method);
      if (idx!=-1){
        var evt=lst[idx];
        evt.setActive(false);
        setTimeOut(function(){evt.setActive(true);},800);
      };
    };
    _lst.createEvent=function(el,type,method,capture,active){
      if (capture==undefined) capture=false;
      if (active==undefined) active=true;
      var lst=this;
      _evt=new Object();
      _evt.Class="Event";
      _evt.recurseRelease=false;
      _evt.cloneAsVar=true;
      _evt.Element=el;
      _evt.Type=type;
      _evt.Event=method;
      _evt.Capture=capture;
      _evt.Active=null;
      _evt.List=lst;
      _evt.reSet=function(){
        var evt=this;
        evt.setActive(false);
        setTimeout(function () { evt.setActive(true);},800);
      };
      _evt.setActive=function(active){
        var evt=this;

        if (active==true){
          if (evt.Active!=active)
            coDOM.addEvent(evt.Element,evt.Type,evt.Event,evt.Capture);
          evt.Active=true;
        } else {
          evt.Active=false;
          coDOM.removeEvent(evt.Element,evt.Type,evt.Event,evt.Capture);
        };

      };
      _evt.Free=function(){
        var evt=this;
        var lst=evt.List;
        coDOM.removeEvent(evt.Element,evt.Type,evt.Event,evt.Capture);
        if (lst.Loading==false){
          var idx=lst.indexOf(evt);
          if (idx!=-1) lst.splice(idx,1);
        };
        evt=coObject.Release(evt)
        return null;
      };
      lst.push(_evt);
      if (active==true) {
        _evt.setActive(true);
      } else {
        _evt.Active=false;
      };
      return _evt;
    };
    _lst.Free=function(){
      var lst=this;
      lst.Loading=true;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var evt=lst[iLcv];
        if (evt.Free) evt.Free();
      };
      lst.Loading=false;
      lst.length=0;
      lst.Element.EventList=null;
      return lst=Release(lst);
    };
    return _lst;
  },
  Add : function (elem, type, cbMethod,useCapture,active) {
    if (elem == null || elem == undefined) return;
    if(!elem.EventList) elem.EventList=coEvents.createList(elem);
    return elem.EventList.Add(elem,type,cbMethod,useCapture,active);
  },
  Remove : function(elem, type, cbMethod,useCapture) {
    if (!useCapture) useCapture=false;
    if (elem == null || elem == undefined) { alert("exiting detachment"); return };
    if (elem.EventList)
      elem.EventList.Remove(type,cbMethod);
    if ( elem.removeEventListener ) {
      elem.removeEventListener( type, cbMethod, useCapture );
    } else if ( elem.detachEvent) {
      elem.detachEvent("on"+type,cbMethod);
    };
  },
  Cancel : function (Value){
    if (!Value) var Value=true;
    if (window.event) {
      window.event.cancelBubble=true;
      window.event.defaultPrevented=true;
      if (window.event.preventDefault) window.event.preventDefault();
      if (window.event.stopPropagation) window.event.stopPropagation();
      window.event.returnValue=Value;
      return Value;
    } else {
      return Value;
    };
  },


};
coEvents.init();
