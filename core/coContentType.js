var coContentType={
  Version        : new Version(2015,8,15,19),
  Title          : new Title("Core Object Content Type","coContentType"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
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
    var ct=coObject.Create();
    ct.Kind=Kind;
    ct.Owner=cts.List;
    ct.Class="contentType";
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
    cts.addContentType("image/x-emz",coContentType.fkImage,"emz",true);
    cts.addContentType("image/png",coContentType.fkImage,"png",true);
    cts.addContentType("image/jpg",coContentType.fkImage,"jpg",true);
    cts.addContentType("image/jpg",coContentType.fkImage,"jpeg",true);
    cts.addContentType("image/svg",coContentType.fkImage,"svg",false);
    cts.addContentType("image/bmp",coContentType.fkImage,"bmp",true);
    cts.addContentType("image/gif",coContentType.fkImage,"gif",true);
    cts.addContentType("audio/mpeg",coContentType.fkMusic,"mp3",true);
    cts.addContentType("video/mpeg",coContentType.fkVideo,"mpg",false);
    cts.addContentType("video/x-flv",coContentType.fkVideo,"flv",false);
    cts.addContentType("video/mp4",coContentType.fkVideo,"mp4",true);
    cts.addContentType("video/ogg",coContentType.fkVideo,"ogg",true);
    cts.addContentType("video/webm",coContentType.fkVideo,"webm",true);
    cts.addContentType("video/m4v",coContentType.fkVideo,"m4v",false);
    cts.addContentType("video/quicktime",coContentType.fkVideo,"mov",true);
    cts.addContentType("application/pdf",coContentType.fkPDF,"pdf",true);
    cts.addContentType("text/javascript",coContentType.fkJavaScript,"js",true);
    cts.addContentType("text/html",coContentType.fkHTML,"html",true);
    cts.addContentType("text/css",coContentType.fkCSS,"css",true);
    cts.addContentType("text/plain",coContentType.fkText,"txt",true);
    cts.addContentType("text/xml",coContentType.fkXML,"xml",true);
    cts.addContentType("text/cache-manifest",coContentType.fkAppCache,"appcache",true);
    cts.addContentType("text/plain",coContentType.fkTemplate,"inf",true);
    cts.addContentType("application/x-www-form-urlencoded",coContentType.fkFormEncoded,"",false);
  }
};
coContentType.init();
