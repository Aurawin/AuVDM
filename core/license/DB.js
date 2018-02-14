coLicense.App.Components.DB = {
  Version        : new Version(2013,5,18,10),
  Title          : new Title("Licensing Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coLicense.App,'/core/license/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 1000,
  LoadChunk      : 15,
  LoadDelay      : 1500,
  createDownloads:function(){
    var lst=coDB.createCollection(coNet.Parser,"downloads","download",coDB.HasItems,coDB.HasDisplays);
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Single);
    lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("Product",coDB.Kind.String,"prod","",coDB.StreamOn);
    lst.Fields.addField("Version",coDB.Kind.String,"vers","",coDB.StreamOn);
    lst.Fields.addField("Description",coDB.Kind.String,"des","",coDB.StreamOn);
    lst.Fields.addField("URL",coDB.Kind.String,"url","",coDB.StreamOn);
    lst.Fields.addField("Category",coDB.Kind.String,"cat","",coDB.StreamOn);
    lst.Fields.addField("OS",coDB.Kind.String,"os","",coDB.StreamOn);
    lst.Fields.addField("Size",coDB.Kind.String,"sze",0,coDB.StreamOn);

    lst.Groups.Category=lst.Groups.Add(lst.Fields.MAP.Category);
    lst.Groups.OS=lst.Groups.Add(lst.Fields.MAP.OS);

    var cmds=lst.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=lst;
    cmds.onSocketError=function(Socket){

    };
    cmds.onSocketComplete=function(Socket){
      var lst=Socket.Owner.Owner;
      var xDoc = Socket.responseXML;
      var xList=xDoc.documentElement;
      lst.fromXML(xDoc,xList);
    };
    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.List=function(){
      return coDOM.httpGET(this,"/downloads/manifest.xml",cmds.onSocketComplete,cmds.onSocketError);
    };
    return lst;
  }
};
