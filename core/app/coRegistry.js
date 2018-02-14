var coRegistry={
  Version        : new Version(2014,10,17,9),
  Title          : new Title("Core Object Registry","coRegistry"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Items          : null,
  createItems    : function(){
    var itms=new Array();
    itms.Loading=false;
    itms.createItem=function(saExts,onOpen){
      var itms=this;
      var itm=new coObject.Create();
      itm.Owner=itms;
      itm.Class="RegistryItem";
      itm.Screen=null;
      itm.Extensions=coList.StringArray();
      itm.Extensions.Assign(saExts);
      itm.onOpen=onOpen;

      itm.Free=function(){
        var itm=this;
        var itms=itm.Owner;
        if (itms.Loading!=true){
          var idx=itms.indexOf(itm);
          if (idx!=-1)
            itms.splice(idx,1);
        };
        itm=coObject.Release(itm);
        return null;
      };
      itms.push(itm);
      return itm;
    };
    itms.screenClosed=function(screen){
      var itms=this;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var itm=itms[iLcv];
        if (itm.Screen==screen)
          itm.Screen=null;
      };
    };
    itms.Find=function(sFileName){
      var itms=this;
      var ext=coUtils.extractFileExt(sFileName);
      if (ext) ext=ext.toLowerCase();
      while (iLcv<itms.length) {
        var itm=itms[iLcv];
        var idx=itm.Extensions.IndexOf(ext);
        if (idx!=-1){
          return itm;
        };
        iLcv+=1;
      };
      return null;
    };
    itms.Open=function(sFileName,Folder,Files,Data){
      var itms=this;
      var ext=coUtils.extractFileExt(sFileName);
      var itmOpen=null;
      var iLcv=0;
      if (ext) ext=ext.toLowerCase();
      while ( (iLcv<itms.length) && (!itmOpen) ){
        var itm=itms[iLcv];
        var idx=itm.Extensions.IndexOf(ext);
        if (idx!=-1){
          itmOpen=itm;
        };
        iLcv+=1;
      };
      if ((itmOpen) && (itmOpen.onOpen))
        itmOpen.onOpen(itmOpen,Folder,Files,Data);

      return itmOpen;
    };
    itms.Free=function(){
      var itms=this;
      itms.Loading=true;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var itm=itms[iLcv];
        itm.Free();
      };
      itms.Loading=false;
      itms.length=0;
    };
    return itms;
  },
  init           : function(){
    this.Items=this.createItems();
  },
};
coRegistry.init();
