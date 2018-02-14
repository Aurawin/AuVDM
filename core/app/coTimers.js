var coTimers={
  Version        : new Version(2014,10,13,31),
  Title          : new Title("Core Object Timer","coTimers"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  List           : new Array(),
  debugToConsole : true,
  createList : function (TimeOut,Owner){
    if (Owner==undefined) Owner=null;
    var _lst=new Array();
    if (!TimeOut) TimeOut=500;
    _lst.Default=TimeOut;
    _lst.Clearing=false;
    _lst.recurseRelease=false;
    _lst.cloneAsVar=true;
    _lst.Owner=Owner;
    _lst.createItem=function(Interval,Owner){
      if (Owner==undefined) Owner=null;
      var lst=this;
      var _itm=new Object();
      if (Interval==undefined) var Interval=lst.Default;
      _itm.Active=false;
      _itm.recurseRelease=false;
      _itm.cloneAsVar=true;
      _itm.Interval=Interval;
      _itm.Data=null;
      _itm.List=lst;
      _itm.Handle=0;
      _itm.RunOnce=false;
      _itm.AutoReset=false;
      _itm.FreeOnComplete=false;
      _itm.Owner=Owner;
      _itm.FirstDelay=0;
      _itm.onExecute=null;
      _itm.ClearTimeout=function(){
        clearTimeout(this.Handle);
        this.Handle=0;
      };
      _itm.ClearInterval=function(){
        clearInterval(this.Handle);
        this.Handle=0;
      };
      _itm.Clear=_itm.ClearInterval;
      _itm.Reset=function(){
        var itm=this;
        if (itm.Active==true) {
          if (itm.Handle!=0)
            itm.Clear();
          itm.Clear=itm.ClearTimeout;
          itm.Handle=setTimeout(function(){itm.doExecute();},itm.Interval);
        };
      };
      _itm.setActive=function(Active){
        var itm=this;
        if (itm.Handle!=0)
          itm.Clear();
        itm.Active=false;
        if (Active==true){
          itm.Active=true;
          if (itm.AutoReset==true) {
            itm.Clear=itm.ClearTimeout;
            var Delay=(itm.FirstDelay==0) ? itm.Interval : itm.FirstDelay;
            itm.Handle=setTimeout(function(){itm.doExecute();},Delay);
          } else {
            var Delay=(itm.FirstDelay==0) ? itm.Interval : itm.FirstDelay;
            if (itm.FirstDelay==0) {
              itm.Clear=itm.ClearInterval;
              itm.Handle=setInterval(function(){itm.doExecute();},Delay);
            } else {
              itm.Clear=itm.ClearTimeout;
              itm.Handle=setTimeout(
                function(){
                  itm.doExecute();
                  if (itm.RunOnce==true) {
                    itm.Clear();
                    itm.Active=false;
                  } else {
                    itm.Clear();
                    itm.Clear=itm.ClearInterval;
                    itm.Handle=setInterval(
                      function(){
                        if (itm.Active==true) {
                          itm.doExecute();
                        } else {
                          itm.Clear();
                        };
                      },
                      itm.Interval
                    );
                  };
                },
                Delay
              );
            };
          };
        };
      };
      _itm.doExecute=function(){
        var itm=this;
        if ((itm.onExecute) && (itm.Active==true)) {
          try {
            itm.onExecute(itm);
          } catch (err) {
            if (coTimers.debugToConsole==true) {
              var sMessage="coTimers.Item.Exception: "+err.message+"\n"+err.stack;
              if (coVDM.VDM.Console) {
                coVDM.VDM.Console.Append(sMessage);
              } else {
                console.debug(sMessage);
              };
            };
          };
          if (itm.RunOnce==true) {
            if (itm.FreeOnComplete==true) {
              itm.Release();
            } else {
              itm.setActive(false);
            };
          } else if (itm.AutoReset==true) {
            itm.Reset();
          };
        };
      };

      _itm.getIndex=function(){
        return this.List.indexOf(this);
      };
      _itm.Release=function(){
        var itm=this;
        if (itm.List.Clearing!=true) {
          var idx=itm.getIndex();
          if (idx!=-1)
            itm.List.splice(idx,1);
        };
        if (itm.Handle!=0) {
          clearInterval(itm.Handle);
          itm.Handle=0;
        };
        itm=Release(itm);
        return null;
      };
      lst.push(_itm);
      return _itm;
    };
    _lst.Clear=function(){
      var lst=this;
      lst.Clearing=true;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var itm=lst[iLcv];
        itm=itm.Release();
      };
      lst.length=0;
      lst.Clearing=false;
    };
    _lst.Disable=function(){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var itm=lst[iLcv];
        itm.setActive(false);
      };
    };
    _lst.Release=function(){
      var lst=this;
      var idx=coTimers.List.indexOf(lst);
      if (idx!=-1)
        coTimers.List.splice(idx,1);
      lst.Clear();
      _lst=lst=Release(lst);
      return null;
    };
    return _lst;
  },
  onLogOut       : function(){
    for (var iLcv=0; iLcv<coTimers.List.length; iLcv++){
      var tmrs=coTimers.List[iLcv];
      tmrs.Disable();
    };
  }
};
