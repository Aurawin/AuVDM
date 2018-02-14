/*
unit /core/srch/coSearch.js

This unit provides front-end for system searching.

*/

var coSearch = {
  Version        : new Version(2014,10,28,36),
  Title          : new Title("Aurawin Search","coSearch"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/srch/coSearch.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/srch/coSearch.js',coAppKit.PreLoaded),
  Unit           : '/core/srch/coSearch.js',
  debugToConsole : true,
  NameSpace      : "/core/srch",
  NS_FIND        : "/f",
  NS_QUERY       : "/q",
  NS_LIST        : "/l",
  NS_DISCOVER    : "/d",
  VDM            : null,
  autoDiscoveryOn  : true,
  autoDiscoveryOff : false,
  defaultTTL     : 120 , // seconds
  defaultLimit   : 2500, // default limit to the number of results to return

  init           : function(){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      coAppKit.NoUses,
      coAppKit.NoDependencies,
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.Initialized=true;
    this.Providers=this.createProviders();
    return this;
  },
  onInitialized : function(App){
    App.Loaded=true;
  },
  createProvider:function(Owner){
    var flds=coDB.Fields("provider",coDB.HasNoCollection,coDB.HasNoItems);
    flds.Owner=Owner;
    flds.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    flds.addField("Namespace1",coDB.Kind.NameSpace,"ns1","",coDB.StreamOn);
    flds.addField("Namespace2",coDB.Kind.NameSpace,"ns2","",coDB.StreamOn);
    return flds;
  },
  createProviders : function(Owner){
    var lst=coDB.createCollection(coNet.Parser,"providers","providers",coDB.HasItems,coDB.HasNoDisplays);
    lst.Owner=Owner;
    lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("Namespace1",coDB.Kind.NameSpace,"ns1","",coDB.StreamOn);
    lst.Fields.addField("Namespace2",coDB.Kind.NameSpace,"ns2","",coDB.StreamOn);

    return lst;
  },
  createQuery : function(Owner) {
    var flds=coDB.Fields("query",coDB.HasNoCollection,coDB.HasNoItems);
    flds.onExecute=null;
    flds.Owner=Owner;
    flds.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    flds.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    flds.addField("GroupID",coDB.Kind.Int64,"gid",0,coDB.StreamOn);
    flds.addField("SessionID",coDB.Kind.Int64,"sid",0,coDB.StreamOn);
    flds.addField("UserID",coDB.Kind.Int64,"uid",0,coDB.StreamOn);
    flds.addField("TimeToLive",coDB.Kind.Integer,"ttl",this.defaultTTL,coDB.StreamOn);
    flds.addField("NamespacePrimary",coDB.Kind.NameSpace,"ns1","",coDB.StreamOn);
    flds.addField("NamespaceSecondary",coDB.Kind.NameSpace,"ns2","",coDB.StreamOn);
    flds.addField("Term",coDB.Kind.String,"t","",coDB.StreamOn);
    flds.setCriteria=function(Term){
      var flds=this;
      flds.MAP.Term.Value=flds.MAP.Term.Default+"="+Term;
    };
    return flds;
  },
  createSearch : function(Owner){

    var flds=coDB.Fields("search",coDB.HasNoCollection,coDB.HasNoItems);

    flds.Owner=Owner;

    flds.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    flds.addField("ProviderID",coDB.Kind.Int64,"pid",0,coDB.StreamOn);
    flds.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    flds.addField("GroupID",coDB.Kind.Int64,"gid",0,coDB.StreamOn);
    flds.addField("SessionID",coDB.Kind.Int64,"sid",0,coDB.StreamOn);
    flds.addField("UserID",coDB.Kind.Int64,"uid",0,coDB.StreamOn);
    flds.addField("QueryID",coDB.Kind.Int64,"qid",0,coDB.StreamOn);

    flds.addField("Created",coDB.Kind.DateTime,"ctd",0.0,coDB.StreamOn);
    flds.addField("Modified",coDB.Kind.DateTime,"mtd",0.0,coDB.StreamOn);
    flds.addField("Expires",coDB.Kind.DateTime,"exp",0.0,coDB.StreamOn);
    flds.addField("Executed",coDB.Kind.DateTime,"exe",0.0,coDB.StreamOn);

    flds.addField("ReadDisco",coDB.Kind.Boolean,"rdo",true,coDB.StreamOn);
    flds.addField("WriteBack",coDB.Kind.Boolean,"wbk",true,coDB.StreamOn);

    flds.addField("Limit",coDB.Kind.Integer,"lmt",this.defaultLimit,coDB.StreamOn);
    flds.addField("Index",coDB.Kind.Integer,"idx",-1,coDB.StreamOn);

    flds.addField("Results",coDB.Kind.Int64Array,"rds",coList.Int64Array(),coDB.StreamOn);
    flds.addField("ResultsAsXML",coDB.Kind.XML,"rax","",coDB.StreamOn);

    return flds;
  },
  createQR:function(Owner,Commands,autoDiscover){
    var qr=coObject.Create(coObject.relInline,coObject.cpyAsVar,"QR");
    qr.Owner=Owner;
    qr.AutoDiscover=(autoDiscover==true);
    qr.Provider=this.createProvider(qr);
    qr.Query=this.createQuery(qr);
    qr.Results=this.createSearch(qr);
    qr.Commands=Commands;
    qr.setProvider=function(nsPrimary,nsSecondary){
      var qr=this;
      qr.Provider.MAP.Namespace1.Value=nsPrimary;
      qr.Provider.MAP.Namespace1.Default=nsPrimary;
      qr.Provider.MAP.Namespace2.Value=nsSecondary;
      qr.Provider.MAP.Namespace2.Default=nsSecondary;
      qr.discoverProvider();
    };
    qr.setSearch=function(ProviderID,QueryID,Term,Limit,Index){
      qr=this;
      qr.Results.MAP.ProviderID.Value=ProviderID;
      qr.Results.MAP.ProviderID.Default=ProviderID;
      qr.Results.MAP.QueryID.Value=QueryID;
      qr.Results.MAP.QueryID.Default=QueryID;
      qr.Results.MAP.Limit.Value=Limit;
      qr.Results.MAP.Limit.Default=Limit;
      qr.Results.MAP.Index.Value=Index;
      qr.Results.MAP.Index.Default=Index;
      if (qr.AutoDiscover==true)
        qr.discoverSearch();
    };
    qr.setQuery=function(nsPrimary,nsSecondary,Term,TTL){
      var qr=this;
      qr.Query.MAP.NamespacePrimary.Value=nsPrimary;
      qr.Query.MAP.NamespacePrimary.Default=nsPrimary;
      qr.Query.MAP.NamespaceSecondary.Value=nsSecondary;
      qr.Query.MAP.NamespaceSecondary.Default=nsSecondary;
      qr.Query.MAP.Term.Value=Term;
      qr.Query.MAP.Term.Default=Term;
      qr.Query.MAP.TimeToLive.Value=TTL;
      qr.Query.MAP.TimeToLive.Default=TTL;

      if (qr.AutoDiscover==true)
        qr.discoverQuery();
    };
    qr.onProviderDiscovered=function(netCMD){
      var qr=netCMD.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc=netCMD.dataRecv;
        var xItem=xDoc.documentElement;
        qr.Provider.fromXML(xDoc,xItem);
        qr.Results.MAP.ProviderID.Value=qr.Provider.MAP.ID.Value;
        qr.discoverSearch();
      };
    };
    qr.discoverProvider=function(){
      var qr=this;
      var cmds=qr.Commands;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSearch.NameSpace,
        coSearch.NS_DISCOVER,
        coXML.Header+qr.Provider.toXML(),
        qr.onProviderDiscovered,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=qr;
    };
    qr.onSearchDiscovered=function(netCMD){
      var qr=netCMD.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc=netCMD.dataRecv;
        var xItem=xDoc.documentElement;
        qr.Results.fromXML(xDoc,xItem);
      };
    };
    qr.discoverSearch=function(){
      var qr=this;
      if  ( (qr.Provider.MAP.ID.Value==0) || (qr.Query.MAP.ID.Value==0) )
        return;
      qr.Results.MAP.ProviderID.Value=qr.Provider.MAP.ID.Value;
      qr.Results.MAP.QueryID.Value=qr.Query.MAP.ID.Value;
      var cmds=qr.Commands;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSearch.NameSpace,
        coSearch.NS_DISCOVER,
        coXML.Header+qr.Results.toXML(),
        qr.onSearchDiscovered,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=qr;
    };
    qr.onQueryDiscovered=function(netCMD){
      var qr=netCMD.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc=netCMD.dataRecv;
        var xItem=xDoc.documentElement;
        qr.Query.fromXML(xDoc,xItem);
        qr.Results.MAP.QueryID.Value=qr.Query.MAP.ID.Value;
        qr.discoverSearch();
      };
    };
    qr.discoverQuery=function(){
      var qr=this;
      var cmds=qr.Commands;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSearch.NameSpace,
        coSearch.NS_DISCOVER,
        coXML.Header+qr.Query.toXML(),
        qr.onQueryDiscovered,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=qr;
    };
    qr.onQueryComplete=function(netCMD){
      var qr=netCMD.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc=netCMD.dataRecv;
        var xItem=xDoc.documentElement;
        qr.Results.fromXML(xDoc,xItem);
      };
    };
    qr.Query.Execute=function(){
      var qr=this.Owner;
      var cmds=qr.Commands;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSearch.NameSpace,
        coSearch.NS_QUERY,
        coXML.Header+qr.Query.toXML(),
        qr.onQueryComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=qr;
      if (qr.Query.onExecute)
        qr.Query.onExecute();
    };

    return qr;
  }
};
coSearch.init();
