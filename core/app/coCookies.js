var coCookies={
  Version        : new Version(2012,11,1,12),
  Title          : new Title("Core Object Cookies","coCookie"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  maxResetLoop   : 100,
  setCookieTemp : function(sName,sValue){
    var sValue=escape(sValue);
    document.cookie=sName + "=" + sValue;
  },
  setCookieShort : function(sName,sValue){
    var dtExpires=new Date();
    dtExpires.setMilliseconds(1000);
    var sValue=escape(sValue) + "; expires=" + dtExpires.toUTCString();
    document.cookie=sName + "=" + sValue;
  },
  setCookie : function(sName,sValue,Days){
    if (Days==undefined) Days=0;
    var Cookies=document.cookie.split(";");
    var dtExpires=new Date();
    dtExpires.setDate(dtExpires.getDate() + Days);
    var c_value=escape(sValue) + (  ((Days==null) || (Days==0) ) ? "" : "; expires="+dtExpires.toUTCString());
    document.cookie=sName + "=" + c_value;
  },
  deleteCookie : function(sName){
    var dtExpires=new Date(1900,1,1,0,0,0,0);
    var sDel=sName+"=; expires=" + dtExpires.toUTCString();
    document.cookie=sDel;
  },
  resetCookie : function(sName,sValue,Days){
    iLoop=0;
    while ( ( coCookie.getCookie(sName).length>0 ) && (iLoop<coCookie.maxResetLoop))
      coCookie.deleteCookie(sName);

    coCookie.setCookie(sName,sValue,Days);
  },
  getCookie: function  (sName) {
    var Cookie="";
    var Cookies=document.cookie.split("; ");
    for (var iLcv=0; iLcv<Cookies.length; iLcv++) {
      var x=Cookies[iLcv].substr(0,Cookies[iLcv].indexOf("="));
      var y=Cookies[iLcv].substr(Cookies[iLcv].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==sName) Cookie=unescape(y);
    };
    return Cookie;
  },
  getCookieAsInt64: function(sName){
    var sCookie=this.getCookie(sName);
    return (sCookie.length>0) ? parseInt(sCookie) : 0;
  }
};
