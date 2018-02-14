coDocs.App.Components.DB = {
  Version        : new Version(2013,11,28,2),
  Title          : new Title("Documentation Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDB.App,'/core/docs/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 1000,
  LoadChunk      : 15,
  LoadDelay      : 1500,
  Kind           : null,

  createDefines:function(aOwner){
    if (aOwner==undefined) aOwner=null;

    var _ds=coDB.createCollection(coXML.Parser,"defs","def",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    _ds.Unit=this;
    _ds.Owner=aOwner;
    _ds.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    _ds.Fields.addField("OwnerID",coDB.Kind.QWord,"oid",0,coDB.StreamOn);
    _ds.Fields.addField("NetworkID",coDB.Kind.QWord,"nid",0,coDB.StreamOn);
    _ds.Fields.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    _ds.Fields.addField("Modified",coDB.Kind.Double,"mtd",0.0,coDB.StreamOn);
    _ds.Fields.addField("Namespace",coDB.Kind.String,"ns","",coDB.StreamOn);
    _ds.Fields.addField("Title",coDB.Kind.String,"ttle","",coDB.StreamOn);
    _ds.Fields.addField("Description",coDB.Kind.String,"desc","",coDB.StreamOn);
    _ds.Fields.addField("Manifest",coDB.Kind.XML,"mft","",coDB.StreamOn);

    return _ds;
  },
  createImplements:function(aOwner){
    if (aOwner==undefined) aOwner=null;
    var _ds=coDB.createCollection(coXML.Parser,"impls","impl",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    _ds.Unit=this;
    _ds.Owner=aOwner;

    _ds.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    _ds.Fields.addField("OwnerID",coDB.Kind.QWord,"oid",0,coDB.StreamOn);
    _ds.Fields.addField("NetworkID",coDB.Kind.QWord,"nid",0,coDB.StreamOn);
    _ds.Fields.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    _ds.Fields.addField("Modified",coDB.Kind.Double,"mtd",0.0,coDB.StreamOn);
    _ds.Fields.addField("Definitions",coDB.Kind.Collection,"defs",this.createDefines(_ds),coDB.StreamOn);

    return _ds;
  },
  createDocument:function(aOwner){
    if (aOwner==undefined) aOwner=null;

    var _ds=coDB.Fields("document",coDB.HasItems,coDB.HasNoCollection,coDB.HasNoItems);
    _ds.Unit=this;
    _ds.Owner=aOwner;

    _ds.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    _ds.addField("OwnerID",coDB.Kind.QWord,"oid",0,coDB.StreamOn);
    _ds.addField("NetworkID",coDB.Kind.QWord,"nid",0,coDB.StreamOn);
    _ds.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    _ds.addField("Modified",coDB.Kind.Double,"mtd",0.0,coDB.StreamOn);
    _ds.addField("Manifest",coDB.Kind.Collection,"mfst",this.createImplements(_ds),coDB.StreamOn);

    return _ds;
  }
};
