var coObject={
  Version        : new Version(2014,8,5,20),
  Title          : new Title("Core Object Item","coObject"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  debugToConsole : false,
  relRecursive   : true,
  relInline      : false,
  cpyAsVar       : true,
  cpyRecursive   : false,
  NoOwner        : null,
  Create : function(recurseRelease,copyAsVar,sClass){
    if (recurseRelease==undefined) recurseRelease=false;
    if (copyAsVar==undefined) copyAsVar=true;
    if (sClass==undefined) sClass="Object";
    var obj=new Object();
    obj.recurseRelease=recurseRelease;
    obj.copyAsVar=copyAsVar;
    obj.Class=sClass;
    return obj;
  },
  Release : function(obj) {
     if (typeof(obj) != 'object') {
       return null;
     } else if (isArray(obj)==true){
       for (var iLcv=0; iLcv<obj.length; iLcv++)
         obj[iLcv]=null;
       obj.length=0;
       for (var i in obj)
         obj[i] = null;
       obj=null
       return null;
     } else if (obj == null){
       return null;
     } else {
       if (obj.recurseRelease==true){
         for (var i in obj)
           obj[i] = coObject.Release(obj[i]);
       } else {
         for (var i in obj)
           obj[i] = null;
         obj=null
       }
       return null;
     };
  },
  Clone : function(obj) {
     if (typeof(obj) != 'object')
       return  obj;
     if ((obj == null) || (obj.cloneAsVar==true)) return obj;
     var subobj =  (isArray(obj)==true)? new Array() : new Object();
     for (var i in obj) {
       subobj[i] = this.Clone(obj[i]);
     }
     return subobj;
  },
  getMAPName:function(sName){
    return sName.replace(/ /g,"");
  },
  Assigned:function(obj){
    return ((obj) && ((obj.Class!=null) || typeof(obj.Free)=='function'));
  },
  Map : function(obj,sName,Value){
    var sName=sName.replace(/ /g,"");
    obj[sName]=Value;
    return sName;
  }
};
function Assigned(obj) {
  return ((obj) && ((obj.Class!=null) || typeof(obj.Free)=='function'));
};

