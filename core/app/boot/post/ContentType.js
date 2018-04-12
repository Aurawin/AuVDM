const  ContentType={
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  
  List           : new Array(),
  fkBinary       : 0,
  fkSMTP         : 1,
  fkXMPP         : 2,
  fkImage        : 3,
  fkMusic        : 4,
  fkVideo        : 5,
  fkCalcSheet    : 6,
  fkDocument     : 7,
  fkText         : 8,
  fkPresentation : 9,
  fkPlayList     : 10,
  fkPDF          : 11,
  fkJavaScript   : 12,
  fkHTML         : 13,
  fkCSS          : 14,
  fkXML          : 15,
  fkAppCache     : 16,
  fkTemplate     : 17,
  fkFormEncoded  : 18,
  debugToConsole : false,
  createCT : function(name,Kind,ext,viewable){
    var cts=this;
    var ct=Objects.createNew("ContentType");
    ct.Kind=Kind;
    ct.Owner=cts.List;
    ct.Name=name.toLowerCase();
    ct.Ext=ext.toLowerCase();
    ct.Viewable=viewable;
    ct.Free=function(){
      var ct=this;
      var idx=ct.Owner.indexOf(ct);
      if (idx!=-1)
        ct.Owner.splice(idx,1);
      ct=coObject.Release(ct);
      return null;
    };
    ct.Owner.push(ct);
    return ct;
  },
  addContentType:function(name,kind,ext,viewable){
    if (viewable==undefined) viewable=false;
    var cts=this;
    var ct=cts.createCT(name,kind,ext,viewable);
    return ct;
  },
  getFileContentType:function(sVal){
    return this.getContentType(coUtils.extractFileExt(sVal));
  },
  getContentType:function(ext){
    var cts=this;
    var ext=ext.toLowerCase();
    for (var iLcv=0; iLcv<cts.List.length; iLcv++){
      var ct=cts.List[iLcv];
      if (ct.Ext==ext)
        return  ct;
    };
    return null;
  },
  init : function(){
    var cts=this;
    cts.Initialized=true;
    cts.addContentType("image/x-emz",ContentType.fkImage,"emz",true);
    cts.addContentType("image/png",ContentType.fkImage,"png",true);
    cts.addContentType("image/jpg",ContentType.fkImage,"jpg",true);
    cts.addContentType("image/jpg",ContentType.fkImage,"jpeg",true);
    cts.addContentType("image/svg",ContentType.fkImage,"svg",false);
    cts.addContentType("image/bmp",ContentType.fkImage,"bmp",true);
    cts.addContentType("image/gif",ContentType.fkImage,"gif",true);
    cts.addContentType("audio/mpeg",ContentType.fkMusic,"mp3",true);
    cts.addContentType("video/mpeg",ContentType.fkVideo,"mpg",false);
    cts.addContentType("video/x-flv",ContentType.fkVideo,"flv",false);
    cts.addContentType("video/mp4",ContentType.fkVideo,"mp4",true);
    cts.addContentType("video/ogg",ContentType.fkVideo,"ogg",true);
    cts.addContentType("video/webm",ContentType.fkVideo,"webm",true);
    cts.addContentType("video/m4v",ContentType.fkVideo,"m4v",false);
    cts.addContentType("video/quicktime",ContentType.fkVideo,"mov",true);
    cts.addContentType("application/pdf",ContentType.fkPDF,"pdf",true);
    cts.addContentType("text/javascript",ContentType.fkJavaScript,"js",true);
    cts.addContentType("text/html",ContentType.fkHTML,"html",true);
    cts.addContentType("text/css",ContentType.fkCSS,"css",true);
    cts.addContentType("text/plain",ContentType.fkText,"txt",true);
    cts.addContentType("text/xml",ContentType.fkXML,"xml",true);
    cts.addContentType("text/cache-manifest",ContentType.fkAppCache,"appcache",true);
    cts.addContentType("text/plain",ContentType.fkTemplate,"inf",true);
    cts.addContentType("application/x-www-form-urlencoded",ContentType.fkFormEncoded,"",false);
  }
};

