coPurchases.App.Components.DB = {
  Version        : new Version(2014,10,28,3),
  Title          : new Title("Purchases Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/purchases/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  purchaseKind   : {Membership:0, Subscription:1, Item:2, Refund:3},
  Create : function(){
    var DB=coDB.createCollection(coXML.createParser(),"pcs","pc",coDB.HasItems,coDB.HasDisplays,coDB.ParseSync);
    DB.Unit=this;
    DB.Items.DisplayMode.setValue(DB.Items.DisplayMode.Multiple);
    DB.Identity=DB.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);

    DB.Fields.addField("Title",coDB.Kind.String,"tl","",coDB.StreamOn);
    DB.Fields.addField("Description",coDB.Kind.String,"dn","",coDB.StreamOn);
    DB.Fields.addField("Kind",coDB.Kind.Byte,"kd",this.purchaseKind.Item,coDB.StreamOn);
    DB.Fields.addField("Price",coDB.Kind.Double,"pe",0.0,coDB.StreamOn);
    DB.Fields.addField("Taxable",coDB.Kind.Boolean,"te",false,coDB.StreamOn);
    DB.Fields.addField("Available",coDB.Kind.Int64,"ae",0,coDB.StreamOn);
    DB.Fields.addField("Inventory",coDB.Kind.Int64,"iy",0,coDB.StreamOn);
    DB.Fields.addField("Backorder",coDB.Kind.Int64,"br",0,coDB.StreamOn);
    DB.Fields.addField("Enabled",coDB.Kind.Boolean,"ed",false,coDB.StreamOn);

    var cmds=DB.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=DB;
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
    cmds.onDeleteComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
        dbItem.Free();
      };
    };
    cmds.onAddComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var col=dbItem.Collection;

        var xDoc =netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);

        col.addItem(dbItem);
      };
    };
    cmds.onWriteComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      };
    };
    cmds.onListComplete=function(netCMD){
      var db=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItems=coXML.getStanza(xDoc,db.Stanza);
        db.fromXML(xDoc,xItems);
      };
    };
    cmds.Read=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coPurchases.NameSpace,
        coPurchases.NS_PURCHASE_READ,
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
    cmds.Write=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coPurchases.NameSpace,
        coPurchases.NS_PURCHASE_WRITE,
        coXML.Header+dbItem.toXML(),
        cmds.onWriteComplete,
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
    cmds.Add=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coPurchases.NameSpace,
        coPurchases.NS_PURCHASE_ADD,
        coXML.Header+dbItem.toXML(),
        cmds.onAddComplete,
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
    cmds.Delete=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coPurchases.NameSpace,
        coPurchases.NS_PURCHASE_DELETE,
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
    cmds.List=function(){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coPurchases.NameSpace,
        coPurchases.NS_PURCHASE_LIST,
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
      netCMD.Data=cmds.Owner;
    };
    return DB;
  }
};
