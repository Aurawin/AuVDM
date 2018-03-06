coPartners.App.Components.DB = {
  Version        : new Version(2013,12,7,2),
  Title          : new Title("Partners Database Module","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPartners.App,'/partners/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 1000,
  LoadChunk      : 15,
  LoadDelay      : 1500,
  Kind           : null,
  Init : function(){
    this.Kind=this.createPartnerKind();
  },
  createBenefits:function(aOwner){
    if (aOwner==undefined) aOwner=null;

    var _ds=coDB.createCollection(coXML.Parser,"bens","ben",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    _ds.Unit=this;
    _ds.Owner=aOwner;
    _ds.Identity=_ds.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    _ds.Fields.addField("Benefit",coDB.Kind.String,"ttl","",coDB.StreamOn);
    _ds.Fields.addField("Member",coDB.Kind.String,"mem","",coDB.StreamOn);
    _ds.Fields.addField("Professional",coDB.Kind.String,"pro","",coDB.StreamOn);
    _ds.Fields.addField("Enterprise",coDB.Kind.String,"ent","",coDB.StreamOn);

    return _ds;
  },
  Create : function(App){
    var _ds=coDB.Fields("prtr",coDB.NoCollection,coDB.HasNoItems);
    _ds.Unit=this;
    _ds.App=App;
    _ds.ID=_ds.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    _ds.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    _ds.addField("Accessed",coDB.Kind.Double,"lcd",0.0,coDB.StreamOn);
    _ds.addField("Type",coDB.Kind.Integer,"typ",this.Kind.Member,coDB.StreamOn);
    _ds.addField("Avatar",coDB.Kind.String,"ava","",coDB.StreamOn);
    _ds.addField("Phone",coDB.Kind.String,"phn","",coDB.StreamOn);
    _ds.addField("Email",coDB.Kind.String,"eml","",coDB.StreamOn);
    _ds.addField("Website",coDB.Kind.String,"web","",coDB.StreamOn);
    _ds.addField("Title",coDB.Kind.String,"ttl","",coDB.StreamOn);
    _ds.addField("Description",coDB.Kind.String,"des","",coDB.StreamOn);
    _ds.onLoaded=function(dbItem){
      var sc=this.App.Screen;
    };

    _ds.Benefits=this.createBenefits(_ds);

    var cmds=_ds.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=_ds;
    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.onListComplete=function(netCMD){
      var dbItem=netCMD.Data;
      var sc=netCMD.Owner.Owner.App.Screen;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = coXML.Parser.Parse(netCMD.dataRecv);
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      } else {

      };
    };
    cmds.onBeneftsLoaded=function(s){
      var cmds=s.Owner;
      db=cmds.Owner;
      var xDoc = coXML.Parser.Parse(s.responseText);
      var xItems=coXML.getStanza(xDoc,db.Benefits.Stanza);
      db.Benefits.fromXML(xDoc,xItems);
    };
    cmds.onBeneftsLoadError=function(s){
      var cmds=s.Owner;

    };
    cmds.LoadBenefits=function(xmlURL){
      var cmds=this;
      coDOM.httpGET(cmds,xmlURL,cmds.onBeneftsLoaded,cmds.onBenefitsLoadError);
    };
    cmds.List=function(){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coPartners.NameSpace,
        coPartners.NS_PARTNER_LIST,
        coNet.NoData,
        cmds.onListComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Data=dbItem;
    };
    return _ds;
  },
  createPartnerKind : function() {
    var pk=new coObject.Create();
    pk.Member=0;
    pk.Professional=1;
    pk.Enterprise=2;
    return pk;
  }
};
coPartners.App.Components.DB.Init();

