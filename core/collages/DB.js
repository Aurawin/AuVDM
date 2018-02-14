coCollageBoard.App.Components.DB = {
  Version        : new Version(2014,10,28,20),
  Title          : new Title("Collage Board Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCollageBoard.App,'/core/collages/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 1000,
  LoadChunk      : 15,
  LoadDelay      : 1500,
  Kind           : null,
  Init : function(){
    this.Kind=this.createCollageKind();
  },
  Create : function(sc){
    var _ds=coDB.createCollection(coXML.Parser,"clgs","clg",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    _ds.Unit=this;
    _ds.LoadInfo.FirstDelay=this.LoadQuick;
    _ds.LoadInfo.Interval=this.LoadDelay;
    _ds.LoadInfo.Chunk=this.LoadChunk;

    _ds.Items.DisplayMode.setValue(_ds.Items.DisplayMode.Multiple);
    _ds.ID=_ds.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    _ds.Fields.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    _ds.Fields.addField("Modified",coDB.Kind.Double,"mtd",0.0,coDB.StreamOn);
    _ds.Fields.addField("Delay",coDB.Kind.Double,"dly",coCollageBoard.ElementSwitchDelay,coDB.StreamOn);
    _ds.Fields.addField("Kind",coDB.Kind.Byte,"knd",this.Kind.None,coDB.StreamOn);
    _ds.Fields.addField("Title",coDB.Kind.String,"tle","",coDB.StreamOn);
    _ds.Fields.addField("Description",coDB.Kind.String,"dsc","",coDB.StreamOn);
    _ds.Fields.addField("Type",coDB.Kind.String,"tpe","",coDB.StreamOff);
    _ds.Fields.addField("Speed",coDB.Kind.String,"spe","",coDB.StreamOff);
    _ds.Fields.addField("Images",coDB.Kind.Integer,"ict",0,coDB.StreamOff);
    _ds.Fields.addField("Glyphs",coDB.Kind.Collection,"imgs",this.createImageList(),coDB.StreamOn);
    _ds.getURL=function(dbItem){
      return coVDM.Service+"://"+coVDM.Domain+coCollageBoard.NS_COLLAGE_LANDING+"?"+dbItem.MAP.ID.Value;
    };
    _ds.SyncNonStreamingData=function(dbItem){
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
        dbItem.MAP.Speed.Value=(dbItem.MAP.Delay.Value/1000).toFixed(1)+"s";
    };
    _ds.Fields.onLoaded=function(dbItem){
      dbItem.Collection.SyncNonStreamingData(dbItem);
    };
    _ds.Items.onPartialLoad=function(dbItems){
      var db=this.Owner;
      for (var iLcv=0; iLcv<dbItems.length; iLcv++) {
        var dbItem=dbItems[iLcv];
        db.SyncNonStreamingData(dbItem);
        db.Displays.SyncItem(dbItem);
      };
    };

    var cmds=_ds.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=_ds;
    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.onReadComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      };
    };
    cmds.onWriteComplete=function(netCMD){
      var db=netCMD.Owner.Owner;
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
        db.SyncNonStreamingData(dbItem);
        db.Displays.SyncItem(dbItem);
      };
    };
    cmds.onDeleteComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) dbItem.Free();
    };
    cmds.onListComplete=function(netCMD){
      var lst=netCMD.Owner.Owner;
      lst.LoadInfo.XML=netCMD.dataRecv;
      netCMD.dataRecv="";
      lst.LoadInfo.Start=0;
      lst.LoadInfo.setActive(true);
    };
    cmds.onAddComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var dbCol=netCMD.Owner.Owner;
        var dbItem=netCMD.Data;
        dbItem.Collection=dbCol;
        dbCol.Items.push(dbItem);

        var xDoc = netCMD.dataRecv;
        var xItem=xDoc.documentElement;
        dbItem.fromXML(xDoc,xItem);
      };
    };
    cmds.Read=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCollageBoard.NameSpace,
        coCollageBoard.NS_COLLAGE_READ,
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
    cmds.Write=function(dbItem,Torus){
      if (Torus==undefined) Torus=null;
      if (Torus) Torus.Start();
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCollageBoard.NameSpace,
        coCollageBoard.NS_COLLAGE_WRITE,
        coXML.Header+dbItem.toXML(),
        cmds.onWriteComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Torus=Torus;
      netCMD.Owner=cmds;
      netCMD.Data=dbItem;
    };
    cmds.Add=function(dbItem,Torus){
      if (Torus==undefined) Torus=null;
      if (Torus) Torus.Start();
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCollageBoard.NameSpace,
        coCollageBoard.NS_COLLAGE_ADD,
        coXML.Header+dbItem.toXML(),
        cmds.onAddComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Torus=Torus;
      netCMD.Owner=cmds;
      netCMD.Data=dbItem;
    };
    cmds.List=function(iNetworkID,Torus){
      if (Torus==undefined) Torus=null;
      if (Torus) Torus.Start();
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCollageBoard.NameSpace,
        coCollageBoard.NS_COLLAGE_LIST,
        coNet.NoData,
        cmds.onListComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Torus=Torus;
      if (iNetworkID!=undefined)
        netCMD.Headers.Add(coNet.fieldSearch,iNetworkID);
      netCMD.Owner=cmds;
    };
    cmds.Delete=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCollageBoard.NameSpace,
        coCollageBoard.NS_COLLAGE_DELETE,
        coXML.Header+dbItem.toXML(),
        cmds.onDeleteComplete,
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
  createCollage: function(){
    var _ds=coDB.Fields("clg",coDB.NoCollection,coDB.HasNoItems);
    _ds.Unit=this;
    _ds.ID=_ds.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    _ds.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    _ds.addField("Modified",coDB.Kind.Double,"mtd",0.0,coDB.StreamOn);
    _ds.addField("Delay",coDB.Kind.Double,"dly",coCollageBoard.ElementSwitchDelay,coDB.StreamOn);
    _ds.addField("Kind",coDB.Kind.Byte,"knd",this.Kind.None,coDB.StreamOn);
    _ds.addField("Title",coDB.Kind.String,"tle","",coDB.StreamOn);
    _ds.addField("Description",coDB.Kind.String,"dsc","",coDB.StreamOn);
    _ds.addField("Glyphs",coDB.Kind.Collection,"imgs",this.createImageList(),coDB.StreamOn);
    return _ds;
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
    return _ds;
  }
};
coCollageBoard.App.Components.DB.Init();
