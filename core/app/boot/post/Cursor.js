const Cursor= {
  Unit           : '',
  Loaded         : true,
  Initialized    : false,
  debugToConsole : false,
  Waits : List.createInt64Array(),
  init : function(){
    this.Initialized=true;
  },
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

