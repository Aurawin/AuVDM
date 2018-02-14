coSignatures.App.Components.DB = {
  Version        : new Version(2014,10,28,4),
  Title          : new Title("Spectrum Signatures Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSignatures.App,'/core/spc/sigs/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create:function(){
    var DB=coDB.createCollection(coXML.Parser,"sigs","sig",coDB.HasItems,coDB.HasDisplays);
    DB.Items.DisplayMode.setValue(DB.Items.DisplayMode.Multiple);
    DB.Loaded=false;
    DB.Fields.ID=DB.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    DB.Fields.Created=DB.Fields.addField("Created",coDB.Kind.DateTime,"created",0.0,coDB.StreamOn);
    DB.Fields.Modified=DB.Fields.addField("modified",coDB.Kind.DateTime,"modified",0.0,coDB.StreamOn);
    DB.Fields.Title=DB.Fields.addField(coLang.Table.Labels.Title,coDB.Kind.String,"title","",coDB.StreamOn);
    DB.Fields.Data=DB.Fields.addField("Data",coDB.Kind.String,"data","",coDB.StreamOn);

    DB.Commands=coNet.createCommands(coVDM.VDM.Net);
    DB.Commands.onCmdError=function(netCMD){
      if (coSignatures.App.Components.DB.debugToConsole==true) coVDM.VDM.Console.Append("Signatures.DB.Commands.onCmdError (Code="+ netCMD.Code +")");
    };
    DB.Commands.onCmdTimeOut=function(netCMD){
      if (coSignatures.App.Components.DB.debugToConsole==true) coVDM.VDM.Console.Append("Signatures.DB.Commands.onCmdTimeOut (Code="+ netCMD.Code +")");
    };
    DB.Commands.onListComplete=function(netCMD){
      if (coSignatures.App.Components.DB.debugToConsole==true) coVDM.VDM.Console.Append("Signatures.DB.Commands.onListComplete (Code="+ netCMD.Code +")");
      var sigs=coSignatures.App.Screen;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc=netCMD.dataRecv;
        var xItems=coXML.getStanza(xDoc,sigs.DB.Stanza,xDoc.documentElement);
        sigs.DB.fromXML(xDoc,xItems);
        sigs.DB.Loaded=true;
      };
    };
    DB.Commands.onAddComplete=function(netCMD){
      var sigs=coSignatures.App.Screen;
      if (coSignatures.App.Components.DB.debugToConsole==true) coVDM.VDM.Console.Append("Signatures.DB.Commands.onAddComplete (Code="+ netCMD.Code +")");
      var itm=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,sigs.DB.Stanza,xDoc.documentElement);
        itm.updateXML(xDoc,xItem);
      };
    };
    DB.Commands.onDeleteComplete=function(netCMD){
      var sigs=coSignatures.App.Screen;
      if (coSignatures.App.Components.DB.debugToConsole==true) coVDM.VDM.Console.Append("Signatures.DB.Commands.onDeleteComplete (Code="+ netCMD.Code +")");
      var itm=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) itm.Free();
    };
    DB.Commands.onReadComplete=function(netCMD){
      var sigs=coSignatures.App.Screen;
      if (coSignatures.App.Components.DB.debugToConsole==true) coVDM.VDM.Console.Append("Signatures.DB.Commands.onReadComplete (Code="+ netCMD.Code +")");
      var itm=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,sigs.DB.Stanza,xDoc.documentElement);
        itm.updateXML(xDoc,xItem);
      };
    };

    DB.Commands.onRefreshComplete=function(netCMD){
      var sigs=coSignatures.App.Screen;
      if (coSignatures.App.Components.DB.debugToConsole==true) coVDM.VDM.Console.Append("Signatures.DB.Commands.onRefreshComplete (Code="+ netCMD.Code +")");
      var itm=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,sigs.DB.Stanza,xDoc.documentElement);
        itm.updateXML(xDoc,xItem);
      };
    };
    DB.Commands.onWriteComplete=function(netCMD){
      var sigs=coSignatures.App.Screen;
      var itm=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,sigs.DB.Stanza,xDoc.documentElement);
        itm.updateXML(xDoc,xItem);
      };
    };
    DB.Commands.List = DB.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      coSpectrum.NS_SIGS_LIST,
      coNet.NoData,
      DB.Commands.onListComplete,
      DB.Commands.onCmdError,
      DB.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOn
    );
    DB.Commands.Add = DB.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      coSpectrum.NS_SIGS_ADD,
      coNet.NoData,
      DB.Commands.onAddComplete,
      DB.Commands.onCmdError,
      DB.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    DB.Commands.Delete = DB.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      coSpectrum.NS_SIGS_DELETE,
      coNet.NoData,
      DB.Commands.onDeleteComplete,
      DB.Commands.onCmdError,
      DB.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    DB.Commands.Read = DB.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      coSpectrum.NS_SIGS_READ,
      coNet.NoData,
      DB.Commands.onReadComplete,
      DB.Commands.onCmdError,
      DB.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    DB.Commands.Refresh = DB.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      coSpectrum.NS_SIGS_READ,
      coNet.NoData,
      DB.Commands.onRefreshComplete,
      DB.Commands.onCmdError,
      DB.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    DB.Commands.Write = DB.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      coSpectrum.NS_SIGS_WRITE,
      coNet.NoData,
      DB.Commands.onWriteComplete,
      DB.Commands.onCmdError,
      DB.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );

    return DB;
  }

};
