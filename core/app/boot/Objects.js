const releaseRecursive = true;
const releaseInline = false;
const copyAsVar = true;
const copyRecursive   = false;
const NoOwner        = null;

const Objects={
  Unit           : '/core/app/boot/Objects.js',
  Loaded         : true,
  debugToConsole : false,

  createNew : function(className, recurseRelease,copyAsVar){
    if (className==undefined) className="Object";
    if (recurseRelease==undefined) recurseRelease=false;
    if (copyAsVar==undefined) copyAsVar=true;

    var obj=new Object();
    obj.recurseRelease=recurseRelease;
    obj.copyAsVar=copyAsVar;
    obj.Class=className;
    
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

