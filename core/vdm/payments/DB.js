coPayments.App.Components.DB = {
  Version        : new Version(2014,10,28,19),
  Title          : new Title("Payment Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPayments.App,'/core/vdm/payments/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(){
    var DB=coDB.createCollection(coXML.createParser(),"cards","card",coDB.HasItems,coDB.HasDisplays,coDB.ParseSync);
    DB.Unit=this;
    DB.Items.DisplayMode.setValue(DB.Items.DisplayMode.Multiple);
    DB.Identity=DB.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);

    DB.Fields.addField("Alias",coDB.Kind.String,"al","",coDB.StreamOn);
    DB.Fields.addField("Holder",coDB.Kind.String,"ch","",coDB.StreamOn);
    DB.Fields.addField("Active",coDB.Kind.Boolean,"ac",false,coDB.StreamOn);
    DB.Fields.addField("Number",coDB.Kind.QWord,"num",0,coDB.StreamOn);
    DB.Fields.addField("ExpMonth",coDB.Kind.Byte,"em",0,coDB.StreamOn);
    DB.Fields.addField("ExpYear",coDB.Kind.Integer,"ey",0,coDB.StreamOn);
    DB.Fields.addField("Code",coDB.Kind.Integer,"cd",0,coDB.StreamOn);
    DB.Fields.addField("Card",coDB.Kind.String,"nm","",coDB.StreamOff);
    DB.Fields.addField("Expires",coDB.Kind.String,"ex","",coDB.StreamOff);
    DB.Fields.addField("Default",coDB.Kind.String,"df","",coDB.StreamOff);

    DB.Fields.onLoaded=function(itm){
      var sVal="".concat(itm.MAP.Number.Value);
      var iLen=sVal.length-4;
      var sVal=sVal.substr(sVal.length - 4);
      var sVal2="";
      for (var iLcv=1; iLcv<=iLen; iLcv++) sVal2+="*";
      itm.MAP.Card.Value=sVal2+sVal;
      itm.MAP.Expires.Value=itm.MAP.ExpMonth.Value+"/"+itm.MAP.ExpYear.Value;
      itm.MAP.Default.Value=(itm.MAP.Active.Value==true)? "*" : "";
    };
    var cmds=DB.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=DB;
    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.onReadComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc =netCMD.dataRecv;
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

        var xDoc = netCMD.dataRecv;
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
        coPayments.NameSpace,
        coPayments.NS_CARD_READ,
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
        coPayments.NameSpace,
        coPayments.NS_CARD_WRITE,
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
        coPayments.NameSpace,
        coPayments.NS_CARD_ADD,
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
        coPayments.NameSpace,
        coPayments.NS_CARD_DELETE,
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
    cmds.MakeActive=function(dbItem){
      var cmds=this;
      if (dbItem.MAP.Active.Value==true) return;
      var col=dbItem.Collection;
      for (var iLcv=0; iLcv<col.Items.length; iLcv++){
        var dbiLcv=col.Items[iLcv];
        if (dbiLcv!=dbItem){
          if (dbiLcv.MAP.Active.Value==true) {
            dbiLcv.MAP.Active.Value=false;
            cmds.Write(dbiLcv);
          };
        };
      };
      dbItem.MAP.Active.Value=true;
      cmds.Write(dbItem);
    };
    cmds.List=function(){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coPayments.NameSpace,
        coPayments.NS_CARD_LIST,
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

