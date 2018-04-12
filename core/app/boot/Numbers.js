const Numbers= {
  Unit           : '',
  Loaded         : true,
  Initialized    : false,
  debugToConsole : false,

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
