var coCursor= {
  Version : new Version(2013,6,6,5),
  Title : new Title("Core Object Cursor Changer","coCursor"),
  Vendor : new Vendor("Aurawin", "Copyright (&copy;) 2011-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/app/coCursor.js',coAppKit.PreLoaded),
  Waits : coList.Int64Array(),
  setWait:function(onComplete){
    document.body.style.cursor="wait";
    var _tmr=setInterval(
      function(){
        var tmr=_tmr;
        if (document.body.style.cursor=="wait"){
          coCursor.Waits.Remove(_tmr);
          clearInterval(tmr);
          _tmr=tmr=0;

          if (onComplete) onComplete();
        } else{
          document.body.style.cursor="wait";
        };
      },
      1500
    );
    coCursor.Waits.Add(_tmr);
  },
  setDefault:function(onComplete){
    var _tmr=setInterval(
      function(){
        var tmr=_tmr;
        if (coCursor.Waits.length==0) {
          clearInterval(tmr);
          document.body.style.cursor="";
          if (onComplete) onComplete();
        };
      },
      200
    );
  }
};

