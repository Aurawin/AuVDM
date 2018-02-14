coPalmView.App.Components.DB = {
  Version        : new Version(2014,11,21,7),
  Title          : new Title("Collage Palm View Database Module","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 1000,
  LoadChunk      : 15,
  LoadDelay      : 1500,
  Kind           : null,
  Init : function(){
    this.Kind=this.createCollageKind();
  },
  Create : function(App){
    var _ds=coDB.Fields("plmv",coDB.NoCollection,coDB.HasNoItems);
    _ds.Unit=this;
    _ds.App=App;
    _ds.ID=_ds.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    _ds.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    _ds.addField("Modified",coDB.Kind.Double,"mtd",0.0,coDB.StreamOn);
    _ds.addField("Delay",coDB.Kind.Double,"dly",coPalmView.ElementSwitchDelay,coDB.StreamOn);
    _ds.addField("Kind",coDB.Kind.Byte,"knd",this.Kind.None,coDB.StreamOn);
    _ds.addField("Type",coDB.Kind.String,"typ",this.Kind.None,coDB.StreamOn);
    _ds.addField("By",coDB.Kind.String,"by","",coDB.StreamOn);
    _ds.addField("Avatar",coDB.Kind.String,"ava","",coDB.StreamOn);
    _ds.addField("Title",coDB.Kind.String,"ttl","",coDB.StreamOn);
    _ds.addField("Description",coDB.Kind.String,"des","",coDB.StreamOn);
    _ds.addField("Images",coDB.Kind.String,"ict","",coDB.StreamOff);
    _ds.addField("Glyphs",coDB.Kind.Collection,"imgs",this.createImageList(),coDB.StreamOn);
    _ds.onLoaded=function(dbItem){
      var sc=this.App.Screen;
      switch (dbItem.MAP.Kind.Value){
          case (0) : {
            dbItem.MAP.Type.Value=coLang.Table.Labels.Single;
            break;
          };
          case (1) : {
            dbItem.MAP.Type.Value=coLang.Table.Labels.Double;
            break;
          };
          case (2) : {
            dbItem.MAP.Type.Value=coLang.Table.Labels.Tripple;
            break;
          };
          case (3) : {
            dbItem.MAP.Type.Value=coLang.Table.Labels.Quadruple;
            break;
          };
      };
      dbItem.MAP.Images.Value=dbItem.MAP.Glyphs.Value.Items.length;
      dbItem.MAP.Delay.Value=Math.max(dbItem.MAP.Delay.Value,coPalmView.ElementSwitchDelay);
      sc.CollageLoad(dbItem);
    };
    var cmds=_ds.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=_ds;
    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.onReadComplete=function(netCMD){
      var dbItem=netCMD.Data;
      var sc=netCMD.Owner.Owner.App.Screen;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      } else {
        sc.CollageLoadFailed();
      };
    };
    cmds.Read=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coPalmView.NameSpace,
        coPalmView.NS_COLLAGE_PV_READ,
        coXML.Header+dbItem.toXML(),
        cmds.onReadComplete,
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
  createCollageKind : function() {
    var ik=new coObject.Create();
    ik.None=0;
    ik.Single=1;
    ik.Double=2;
    ik.Tripple=3;
    ik.Quad=4;
    ik.Value=ik.None;
    return ik;
  },
  createImageList : function(){
    var _ds=coDB.createCollection(coXML.Parser,"imgs","img",coDB.HasItems,coDB.HasNoDisplay);
    _ds.Unit=this;
    _ds.Fields.addField("CollageID",coDB.Kind.QWord,"cid",0,coDB.StreamOn);
    _ds.Fields.addField("OwnerID",coDB.Kind.QWord,"oid",0,coDB.StreamOn);
    _ds.Fields.addField("FolderID",coDB.Kind.QWord,"fld",0,coDB.StreamOn);
    _ds.Fields.addField("FileID",coDB.Kind.QWord,"fid",0,coDB.StreamOn);
    _ds.Fields.addField("NetworkID",coDB.Kind.QWord,"nid",0,coDB.StreamOn);
    _ds.Fields.addField("Element",coDB.Kind.Integer,"elm",0,coDB.StreamOn);
    _ds.Fields.addField("SubItem",coDB.Kind.Integer,"esi",0,coDB.StreamOn);
    _ds.Fields.addField("MoveX",coDB.Kind.Integer,"mvx",0,coDB.StreamOn);
    _ds.Fields.addField("MoveY",coDB.Kind.Integer,"mvy",0,coDB.StreamOn);
    _ds.Fields.addField("Rotate",coDB.Kind.Integer,"rot",0,coDB.StreamOn);
    _ds.Fields.addField("ScaleX",coDB.Kind.Double,"scx",0.0,coDB.StreamOn);
    _ds.Fields.addField("ScaleY",coDB.Kind.Double,"scy",0.0,coDB.StreamOn);
    _ds.Fields.addField("Data",coDB.Kind.String,"dat",0.0,coDB.StreamOn);
    return _ds;
  }
};
coPalmView.App.Components.DB.Init();

