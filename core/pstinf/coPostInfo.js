var coPostInfo={
  Version        : new Version(2013,12,11,1),
  Title          : new Title("Aurawin Post Information","coPost"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/pstinf/coPostInfo.js',
  Header         : coAppKit.Dependencies.Create(null,'/pstinf/coPostInfo.js',coAppKit.PreLoaded),
  urlDB          : "/core/pstinf?db",
  urlEmail       : "/core/pstinf?eml",
  debugToConsole : false,
  Init           : function(){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      coAppKit.NoUses,
      coAppKit.NoDependencies,
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.Initialized=true;
    this.Header.App=this.App;
  },
  DB:function(Owner,NameSpace,Data,onComplete,onError) {
    var Socket=new XMLHttpRequest();
    Socket.Owner=Owner;
    Socket.cbError=onError;
    Socket.cbComplete=onComplete;
    Socket.open("POST",coPostInfo.urlDB,coNet.NET_ASYNC);
    Socket.setRequestHeader(coNet.fieldNameSpace,NameSpace);

    Socket.onerror=function(){
      var Socket=this;
      Socket.cbError(Socket);
      Socket=null;
    };
    Socket.onreadystatechange=function(){
      var Socket=this;
      switch (Socket.readyState) {
        case (1,2): //server connection established
          Socket.Connected=true;
          Socket.Connecting=false;
          Socket.Sending=true;
          break;
        case 4: // request finished and response is ready
          Socket.Sending=false;
          if ((Socket.status==200) || (Socket.status==417)) {
            Socket.cbComplete(Socket);//responseText
            Socket=null;
          } else {
            Socket.cbError(Socket);
          };
          break;
      };
    };
    Socket.send(Data);
    return Socket;
  }
};
coPostInfo.Init();
