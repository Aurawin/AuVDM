var coIDTree= {
  Version : new Version(2011,11,29,2),
  Title : new Title("Core Object ID Tree","coIDTree"),
  Vendor : new Vendor("Aurawin", "Copyright (&copy;) 2011.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Trees : new Array(),
  getID : function(kind,domainID,userID,timeStamp){
    return coEncryption.toMD5("".concat(kind,domainID,userID,timeStamp));
  },
  createTree : function(){
    var t=new Object();
    t.recurseRelease=false;
    t.copyAsVar=true;
    t.Items=null;
    t.onCreateItemsDisplay=null;
    t.onCreateItemDisplay=null;
    t.onCreateChildrenDisplay=null;
    t.createItems=function(){
      var t=this;
      var lst=new Array();
      lst.recurseRelease=false;
      lst.copyAsVar=true;
      lst.Loading=false;
      lst.Owner=t;
      lst.Display=null;
      lst.addNode=function(Kind,domainID,userID,timeStamp,Owner){
        if (Owner==undefined) Owner=this;
        var tree=this.Owner;
        var lst=this;
        var nd=new Object();
        nd.recurseRelease=false;
        nd.copyAsVar=true;
        nd.Owner=Owner;
        nd.Tree=tree;
        nd.ID=coIDTree.getID(Kind,domainID,userID,timeStamp);
        nd.Kind=Kind;
        nd.TimeStamp=timeStamp;
        nd.Items=null;
        nd._createChildren=function(){
          var nd=this;
          var tree=nd.Tree;
          var chldrn=new Array();
          chldrn.recurseRelease=false;
          chldrn.copyAsVar=true;
          chldrn.Owner=nd;
          chldrn.Tree=tree;
          chldrn.Loading=false;
          chldrn.addNode=function(Kind,domainID,userID,timeStamp){
            var chldrn=this;
            var tree=chldrn.Tree;
            return tree.Items.addNode(Kind,domainID,UserID,timeStamp,chldrn);
          };
          chldrn.Free=function(){
            var chldrn=this;
            chldrn.Loading=true;
            for (var iLcv=0; iLcv<chldrn.length; iLcv++){
              var itm=chldrn[iLcv];
              itm.Free();
            };
            if ((chldrn.Display) && (chldrn.Display.Free)) chldrn.Display.Free();
            chldrn.Loading=false;
            return chldrn=coUtils.Release(chldrn);
          };
          chldrn.Display = (tree.onCreateChildrenDisplay) ? tree.onCreateChildrenDisplay(chldrn) : null;
          return chldrn;
        };
        nd.Free=function(){
          var nd=this;
          nd.Items.Free();
          if ((nd.Display) && (nd.Display.Free)) nd.Display.Free();
          return nd=coUtils.Release(nd);
        };
        nd.Items=nd._createChildren();
        Owner.push(nd);
        nd.Display=(tree.onCreateItemDisplay) ? tree.onCreateItemDisplay(nd) : null;
        return nd;
      };
      lst.Free=function(){
        var lst=this;
        lst.Loading=true;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var itm=llst[iLcv];
          itm.Free();
        };
        if ((lst.Display) && (lst.Display.Free)) lst.Display.Free();
        lst.Loading=false;
        return lst=coUtils.Release(lst);
      };
      lst.Display = (tree.onCreateItemsDisplay) ? tree.onCreateItemsDisplay(lst) : null;
      return lst;
    };
    t.Free=function(){
      var t=this;
      t.Items.Free();
      var idx=coIDTree.Trees.indexOf(t);
      if (idx!=-1) coIDTree.Trees.splice(idx,1);
      return t=coUtils.Release(t);
    };
    coIDTree.Trees.push(t);
    return t;
  }

};

