coAppUI.App.Components.Request = {
  Version        : new Version(2013,5,18,3),
  Title          : new Title("Aurawin Request","Request"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Request.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function (Owner){
    r=coObject.Create();
    r.Owner=Owner;
    r.Class="Request";
    r.Sending=false;
    r.Socket=null;
    r.dtOpened=null;
    r._url="";
    r.onError=null;
    r.onComplete=null;
    r.Connecting=false;
    r.getURL=function(){
      var r=this;
      return r._url;
    };
    r.doError=function(){
      var r=this;
      if (r.onError)
        r.onError(r);
    };
    r.setURL=function(sURL){
      var r=this;
      r.Connecting=true;
      r.Socket=new XMLHttpRequest();
      r.Socket.Owner=r;
      r.Socket.open("GET",sURL,coNet.NET_ASYNC);
      r.Socket.onerror=function(){
        var Socket=this;
        var r=Socket.Owner;
        r.Code=Socket.status;
        r.doError();
        r.Socket=null;
      };
      r.Socket.onreadystatechange=function(){
        var Socket=this;
        var r=Socket.Owner;
        switch (Socket.readyState) {
          case (1,2): //server connection established
            r.dtOpened=new Date().setMilliseconds(0);
            r.Connected=true;
            r.Connecting=false;
            r.Sending=true;
            break;
          case 4: // request finished and response is ready
            r.Sending=false;
            if ((Socket.status==200) || (Socket.status==417)) {
              if (r.onComplete)
                r.onComplete(r);
              r.Socket=null;
            } else {
              r.Code=Socket.status;
              r.doError();
              r.Socket=null;
            };
            break;
        };
      };
      r.Socket.send();
    };
    return r;
  }
}

