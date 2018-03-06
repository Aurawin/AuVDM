var coMath= {
  Version : new Version(2014,3,1,9),
  Title : new Title("Core Object Math","coMath"),
  Vendor : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Sign : function(value){
    return (value>0)? 1 : -1;
  },
  inRange : function (Low,High,Value){
    return ((Value>=Low) && (Value<=High));
  },
  Frac : function(val){
    return val % 1;
  },
  Div : function(num,den){
   if (den==0) return 0;
   var res=num/den;
   return (res>0) ? Math.floor(res) : Math.ceil(res);
  },
  Trunc : function(val){
    return (val>0) ? Math.floor(val) : Math.ceil(val);
  },
  Pred : function(val){
    return (val-=1)
  }
};
