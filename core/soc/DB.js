coSocial.App.Components.DB = {
  Version        : new Version(2014,10,28,71),
  Title          : new Title("Social Networking Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/DB.js',coAppKit.PreLoaded),  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 1000,
  LoadChunk      : 300,
  LoadDelay      : 1500,
  createRequests:function(){
    var lst=coDB.createCollection(coNet.Parser,"requests","request",coDB.HasItems,coDB.HasDisplays);
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Single);
    lst.Identity=lst.Fields.ID=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    lst.Fields.addField("QueryID",coDB.Kind.Int64,"qid",0,coDB.StreamOn);
    lst.Fields.addField("ResponseID",coDB.Kind.Int64,"rid",0,coDB.StreamOn);
    lst.Fields.addField("Opened",coDB.Kind.Double,"odt",0.0,coDB.StreamOn);
    lst.Fields.addField("Closed",coDB.Kind.Double,"cdt",0.0,coDB.StreamOn);
    lst.Fields.addField("Expires",coDB.Kind.Double,"exp",0.0,coDB.StreamOn);
    lst.Fields.addField("Flags",coDB.Kind.Byte,"fls",0,coDB.StreamOn);
    lst.Fields.addField("Query",coDB.Kind.String,"qry","",coDB.StreamOn);
    lst.Fields.addField("Response",coDB.Kind.String,"rsp","",coDB.StreamOn);
    lst.Members=this.createMembers();

    var cmds=lst.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=lst;
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
      if (netCMD.Code==coNet.CO_STATUS_OK) dbItem.Free();
    };
    cmds.onListComplete=function(netCMD){
      var lst=netCMD.Owner.Owner;
      var xDoc = netCMD.dataRecv;
      var xList=xDoc.documentElement;
      lst.Members.fromXML(xDoc,xList);
      lst.fromXML(xDoc,xList);
    };
    cmds.onMakeComplete=function(netCMD){
      var dbItem=netCMD.Data;
      var lst=netCMD.Owner.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
        lst.addItem(dbItem);
        dbItem.Reset();
      };
    };
    cmds.onInviteComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      };
    };
    cmds.onAcceptComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      };
    };
    cmds.onRejectComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      };
    };
    cmds.Read=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_REQUEST_READ,
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
    cmds.Make=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_REQUEST_MAKE,
        coXML.Header+dbItem.toXML(),
        cmds.onMakeComplete,
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
    cmds.Invite=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_REQUEST_INVITE,
        coXML.Header+dbItem.toXML(),
        cmds.onInviteComplete,
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
    cmds.Accept=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_REQUEST_ACCEPT,
        coXML.Header+dbItem.toXML(),
        cmds.onAcceptComplete,
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
    cmds.Reject=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_REQUEST_REJECT,
        coXML.Header+dbItem.toXML(),
        cmds.onRejectComplete,
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
        coSocial.NameSpace,
        coSocial.NS_REQUEST_DELETE,
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
    cmds.List=function(networkID){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_REQUEST_LIST,
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
      netCMD.Headers.Update(coNet.fieldSearch,networkID);
      return netCMD;
    };
    return lst;
  },
  createMembers:function(){
    var lst=coDB.createCollection(coNet.Parser,"members","member",coDB.HasItems,coDB.HasDisplays);
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Multiple);
    lst.Identity=lst.Fields.ID=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("AccountID",coDB.Kind.Int64,"auid",0,coDB.StreamOn);
    lst.Fields.addField("AvatarID",coDB.Kind.Int64,"aid",0,coDB.StreamOn);
    lst.Fields.addField("First",coDB.Kind.String,"fst","",coDB.StreamOn);
    lst.Fields.addField("Nick",coDB.Kind.String,"nck","",coDB.StreamOn);
    lst.Fields.addField("Last",coDB.Kind.String,"lst","",coDB.StreamOn);
    lst.Fields.addField("City",coDB.Kind.String,"cty","",coDB.StreamOn);
    lst.Fields.addField("State",coDB.Kind.String,"ste","",coDB.StreamOn);
    lst.Fields.addField("Post",coDB.Kind.String,"pst","",coDB.StreamOn);
    lst.Fields.addField("Country",coDB.Kind.String,"cnt","",coDB.StreamOn);

    return lst;
  },
  createConnections:function(){
    var lst=coDB.createCollection(coNet.Parser,"connections","connection",coDB.HasItems,coDB.HasDisplays);
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Multiple);
    lst.Identity=lst.Fields.ID=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    lst.Fields.addField("Created",coDB.Kind.Double,"ctd",0,coDB.StreamOn);
    lst.Fields.addField("Accepted",coDB.Kind.Double,"atd",0,coDB.StreamOn);


    lst.onConnectionsLoaded=function(dbEvent){
      var lst=dbEvent.Owner.Owner.Owner;
      for (var iLcv=0; iLcv<lst.Items.length; iLcv++){
        var con=lst.Items[iLcv];
        con.Network=lst.Networks.getItemById(con.MAP.NetworkID.Value);
      };
    };
    lst.Networks=this.createNetworks();
    lst.Networks.Owner=lst;
    lst.Networks.EventList.createItem(coDB.evkLoaded,lst.onConnectionsLoaded);

    var cmds=lst.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=lst;
    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.onDeleteComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) dbItem.Free();
    };
    cmds.onSetAcceptedComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      };
    };
    cmds.onAddComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      };
    };
    cmds.onListComplete=function(netCMD){
      var lst=netCMD.Owner.Owner;
      var xDoc = netCMD.dataRecv;
      var xList=xDoc.documentElement;
      lst.fromXML(xDoc,xList);
      var xNets=coXML.getStanza(xDoc,lst.Networks.Stanza);
      lst.Networks.fromXML(xDoc,xNets);
    };
    cmds.Add=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_CONNECTION_ADD,
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
        coSocial.NameSpace,
        coSocial.NS_CONNECTION_DELETE,
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
    cmds.SetAccepted=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_CONNECTION_SET_ACCEPTED,
        coXML.Header+dbItem.toXML(),
        cmds.onSetAcceptedComplete,
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
      var lst=cmds.Owner;
      var cmd=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_CONNECTION_LIST,
        coNet.NoData,
        cmds.onListComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOn
      );
      cmd.Owner=cmds;
      return cmd;
    };
    cmds.ListFolders=function(){
      var cmds=this;
      var lst=cmds.Owner;
      var nets=lst.Networks.Items;
      for (var iLcv=0; iLcv<nets.length; iLcv++){
        var net=nets[iLcv];
        lst.Networks.Commands.ListFolders(net);
      };
    };
    lst.Networks.EventList.createItem(coDB.evkLoaded,coCabinet.Screen.DB.onConnectionsLoaded);
    return lst;
  },
  createFolders:function(){
    var lst=coDB.createCollection(coXML.createParser(),"folders","folder",coDB.HasItems,coDB.HasDisplays);
    lst.LoadInfo.FirstDelay=coSocial.App.Components.DB.LoadQuick;
    lst.LoadInfo.Interval=coSocial.App.Components.DB.LoadDelay;
    lst.LoadInfo.Chunk=coSocial.App.Components.DB.LoadChunk;


    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Multiple);

    lst.Identity=lst.Fields.ID=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    lst.Fields.addField("Path",coDB.Kind.String,"path","",coDB.StreamOn);

    lst.pathField=lst.Fields.MAP.Path;

    lst.Trees=new Array();
    var cmds=lst.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=lst;

    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.onDeleteComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) dbItem.Free();
    };
    cmds.onAddComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
        dbItem.fromXML(xDoc,xItem);
      };
    };
    cmds.onRenameComplete=function(netCMD){
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        if (dbItem.Display) dbItem.Display.Synchronize();
      };
    };
    cmds.onListComplete=function(netCMD){
      var lst=netCMD.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        lst.LoadInfo.XML=netCMD.dataRecv;
        netCMD.dataRecv="";
        lst.LoadInfo.Start=0;
        lst.LoadInfo.Validate=false;
        lst.LoadInfo.setActive(true);
      };
    };
    cmds.onRefreshComplete=function(netCMD){
      var lst=netCMD.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        lst.LoadInfo.XML=netCMD.dataRecv;
        netCMD.dataRecv="";
        lst.LoadInfo.Start=0;
        lst.LoadInfo.Validate=false;
        lst.LoadInfo.setActive(true);
      };
    };
    cmds.onClearComplete=function(netCMD){
      var lst=netCMD.Owner;
    };
    cmds.List=function(Parent){
      if (Parent==undefined) Parent=null;
      var cmds=this;
      var cmd=this.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_FOLDER_LIST,
        coNet.NoData,
        cmds.onListComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      cmd.Owner=cmds.Owner;
      cmd.Headers.Update(coNet.fieldDepth,1);
      cmd.Headers.Update(coNet.fieldSearch,cmds.Owner.Network.MAP.ID.Value);
      if (Parent)
        cmd.Headers.Update(coNet.fieldNameSpace,Parent.MAP.Path.Value);
      return cmd;
    };
    cmds.RefreshFolder=function(Folder){
      var cmds=this;
      var cmd=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_FOLDER_LIST,
        coNet.NoData,
        cmds.onRefreshComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      cmd.Owner=Folder.Collection;
      cmd.Headers.Update(coNet.fieldSearch,Folder.MAP.NetworkID.Value);
      cmd.Headers.Update(coNet.fieldNameSpace,Folder.MAP.Path.Value);
      cmd.Headers.Update(coNet.fieldDepth,coVDM.FolderRefreshDepth);
      Folder.Collection.Displays.startTorus();
      return cmd;
    };
    cmds.Add=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_FOLDER_ADD,
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
        coSocial.NameSpace,
        coSocial.NS_FOLDER_DELETE,
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
    cmds.Rename=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_FOLDER_RENAME,
        coXML.Header+dbItem.toXML(),
        cmds.onRenameComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=lst;
      netCMD.Data=dbItem;
    };
    cmds.Clear=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_FOLDER_CLEAR,
        coXML.Header+dbItem.toXML(),
        cmds.onClearComplete,
        cmds.onNetError,
        cmds.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=lst;
      netCMD.Data=dbItem;
    };

    return lst;
  },
  createFile:function(){
    var flds=coDB.Fields("file",coDB.HasNoCollection,coDB.HasNoItems);
    flds.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    flds.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    flds.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    flds.addField("FolderID",coDB.Kind.Int64,"fid",0,coDB.StreamOn);
    flds.addField("Created",coDB.Kind.DateTime,"ctd",0.0,coDB.StreamOn);
    flds.addField("Modified",coDB.Kind.DateTime,"mtd",0.0,coDB.StreamOn);
    flds.addField("Allocated",coDB.Kind.DateTime,"atd",0.0,coDB.StreamOn);
    flds.addField("Kind",coDB.Kind.Integer,"kd",coContentType.fkBinary,coDB.StreamOn);
    flds.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
    flds.addField("Size",coDB.Kind.Int64,"z",0,coDB.StreamOn);
    flds.addField("Digest",coDB.Kind.Base64,"d","",coDB.StreamOn);
    flds.addField("Summary",coDB.Kind.XML,"s","",coDB.StreamOn);
    return flds;
  },
  createFiles:function(){
    var lst=coDB.createCollection(coXML.createParser(),"files","file",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    lst.NS_CORE=coSocial.NameSpace;
    lst.NS_CMD_READ=coSocial.NS_FILE_READ;
    lst.LoadInfo.FirstDelay=this.LoadQuick;
    lst.LoadInfo.Interval=this.LoadDelay;
    lst.LoadInfo.Chunk=this.LoadChunk;
    if (coVDM.Browser.cookieHandoff==true) {
      lst.transformURL=function(File){
        var sURL=(File.MAP.NetworkID.Value!=0) ? coSocial.URI_FILE_TRANSFORM : coVDM.URI_FILE_TRANSFORM;
        return sURL.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value);
      };
      lst.palmprintURL=function(File){
        var sURL=(File.MAP.NetworkID.Value!=0) ? coSocial.URI_FILE_PALMPRINT : coVDM.URI_FILE_PALMPRINT;
        return sURL.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value);
      };
      lst.streamURL=function(File){
        var sURL=(File.MAP.NetworkID.Value!=0) ? coSocial.URI_FILE_STREAM : coVDM.URI_FILE_STREAM;
        return sURL.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value);
      };
    } else {
      lst.transformURL=function(File){
        var sURL=(File.MAP.NetworkID.Value!=0) ? coSocial.URI_FILE_TRANSFORM : coVDM.URI_FILE_TRANSFORM;
        return sURL.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value)+"?"+coVDM.Credentials.Auth;
      };
      lst.palmprintURL=function(File){
        var sURL=(File.MAP.NetworkID.Value!=0) ? coSocial.URI_FILE_PALMPRINT : coVDM.URI_FILE_PALMPRINT;
        return sURL.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value)+"?"+coVDM.Credentials.Auth;
      };
      lst.streamURL=function(File){
        var sURL=(File.MAP.NetworkID.Value!=0) ? coSocial.URI_FILE_STREAM : coVDM.URI_FILE_STREAM;
        return sURL.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value)+"?"+coVDM.Credentials.Auth;
      };
    };
    lst.rotateURL=function(File,Angle){
      var sURL=(File.MAP.NetworkID.Value!=0) ? coSocial.URI_FILE_ROTATE : coVDM.URI_FILE_ROTATE;
      return sURL.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value).replace("$deg",Angle);
    };
    lst.getURL=function(File){
      return coSocial.URI_FILE_GET.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value);
    };
    lst.getDownloadURL=function(File){
      return coSocial.URI_FILE_DOWNLOAD.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value);
    };
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Multiple);

    lst.Identity=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    lst.Fields.addField("FolderID",coDB.Kind.Int64,"fid",0,coDB.StreamOn);
    lst.Fields.addField("Created",coDB.Kind.DateTime,"ctd",0.0,coDB.StreamOn);
    lst.Fields.addField("Modified",coDB.Kind.DateTime,"mtd",0.0,coDB.StreamOn);
    lst.Fields.addField("Allocated",coDB.Kind.DateTime,"atd",0.0,coDB.StreamOn);
    lst.Fields.addField("Kind",coDB.Kind.Integer,"kd",coContentType.fkBinary,coDB.StreamOn);
    lst.Fields.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
    lst.Fields.addField("Size",coDB.Kind.Int64,"z",0,coDB.StreamOn);
    lst.Fields.addField("Digest",coDB.Kind.Base64,"d","",coDB.StreamOn);
    lst.Fields.addField("Summary",coDB.Kind.XML,"s","",coDB.StreamOn);

    lst.setBasicStream=function(dbItem,value){
      dbItem.MAP.Created.Stream=(value==true);
      dbItem.MAP.Modified.Stream=(value==true);
      dbItem.MAP.Kind.Stream=(value==true);
      dbItem.MAP.Name.Stream=(value==true);
      dbItem.MAP.Size.Stream=(value==true);
      dbItem.MAP.Summary.Stream=(value==true);
      dbItem.MAP.Digest.Stream=(value==true);
    };

    lst.FileToXML=function(dbItem){
      var lst=this;
      lst.setBasicStream(dbItem,false);
      var sXML=dbItem.toXML();
      lst.setBasicStream(dbItem,true);
      return sXML;
    };

    var cmds=lst.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=lst;

    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.onListComplete=function(netCMD){
      var lst=netCMD.Owner;
      if (lst){
        lst.LoadInfo.XML=netCMD.dataRecv;
        netCMD.dataRecv="";
        lst.LoadInfo.Start=0;
        lst.LoadInfo.setActive(true);
      };
    };
    cmds.List=function(dbFiles,iFolderID){
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_FILE_LIST,
        coNet.NoData,
        cmds.onListComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateSuspended,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=dbFiles;
      netCMD.Headers.Update(coNet.fieldSearch,iFolderID);
      netCMD.reTry();
      return netCMD;
    };
    cmds.DropAdd=function(dfItem,dbFile){
        var cmds=this;
        var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coSocial.NameSpace,
          coSocial.NS_FILE_ADD,
          coXML.Header+dbFile.toXML(),
          function(netCMD){ // Success
            var cmds=netCMD.Commands;
            var dfItem=netCMD.Owner;
            var upLoader=dfItem.Owner;
            var fldrs=upLoader.Owner;
            var itmFile=netCMD.Data;
            var files=itmFile.Files;

            if (netCMD.Code==coNet.CO_STATUS_OK){

              var xDoc=netCMD.dataRecv;
              var xItem=coXML.getStanza(xDoc,itmFile.Stanza,xDoc.documentElement);
              itmFile.fromXML(xDoc,xItem);
              var dbFile=files.addItem(itmFile);
              cmds.DropWrite(dfItem,dbFile);
              itmFile.Free();
            };
          },
          function(netCMD){
            // error
            var dfItem=netCMD.Owner;
            dfItem.setErrored();
          },
          function(netCMD){
            // timeout
            var dfItem=netCMD.Owner;
            dfItem.setErrored();
          },
          function(netCMD,iProgress,iTotal){
            var dfItem=netCMD.Owner;
            dfItem.Progress.maxValue=iTotal;
            dfItem.Progress.setProgress(iProgress);
          },
          coNet.CreateSuspended,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
        );
        netCMD.Data=dbFile;
        netCMD.Owner=dfItem;
        netCMD.Commands=cmds;
        netCMD.Try();
        return netCMD;
    };
    cmds.Create=function(dbFile){
        var cmds=this;
        var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coSocial.NameSpace,
          coSocial.NS_FILE_ADD,
          coXML.Header+dbFile.toXML(),
          function(netCMD){ // Success
            var cmds=netCMD.Commands;
            var itmFile=netCMD.Data;
            if (netCMD.Code==coNet.CO_STATUS_OK){
              var xDoc=netCMD.dataRecv;
              var xItem=coXML.getStanza(xDoc,itmFile.Stanza,xDoc.documentElement);
              itmFile.fromXML(xDoc,xItem);
              cmds.Write(dbFile);
            };
          },
          function(netCMD){
            // error
          },
          function(netCMD){
            // timeout
          },
          function(netCMD,iProgress,iTotal){
            // progress
          },
          coNet.CreateSuspended,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
        );
        netCMD.Data=dbFile;
        netCMD.Commands=cmds;
        netCMD.Try();
        return netCMD;
    };
    cmds.Write=function(dbFile){
        var cmds=this;
        var xhr = new XMLHttpRequest();
        var sURL=coSocial.URI_FILE_SET_DATA;
        sURL=sURL.replace("$NetworkId",dbFile.MAP.NetworkID.Value);
        sURL=sURL.replace("$FolderId",dbFile.MAP.FolderID.Value);
        sURL=sURL.replace("$FileId",dbFile.MAP.ID.Value);

        xhr.open('POST', sURL, true);
        xhr.Owner=cmds;
        xhr.Data=dbFile;
        xhr.upload.Owner=xhr;
        xhr.upload.Data=dbFile;
        xhr.setRequestHeader(coNet.fieldMethodOverride,'PUT');

        xhr.onreadystatechange=function() {
          var xhr=this;
          if (xhr.readyState==4){
            var dbItem=xhr.Data;
            if (xhr.status==200) {
              var xDoc=xhr.responseXML;
              var xItem=coXML.getStanza(xDoc,dbItem.Stanza,xDoc.documentElement);
              dbItem.fromXML(xDoc,xItem);
            } else {
              // error
            };
          };
        };
        xhr.upload.onerror=function(e){
          var xhr=this.Owner;
          var dbItem=xhr.Data;
          // Error
        };
        xhr.upload.ontimeout=function(e){
          var xhr=this.Owner;
          var dbItem=xhr.Data;
          // Error
        };
        xhr.upload.onprogress=function(e){
          var xhr=this.Owner;
          var dbItem=xhr.Data;
          var iProg=coDOM.getProgress(e);
          // todo
        };
        xhr.send(dbFile.Content);
        return xhr;
    };
    cmds.DropWrite=function(dfItem,dbFile){
        var cmds=this;
        var xhr = new XMLHttpRequest();
        var sURL=coSocial.URI_FILE_SET_DATA;
        sURL=sURL.replace("$NetworkId",dbFile.MAP.NetworkID.Value);
        sURL=sURL.replace("$FolderId",dbFile.MAP.FolderID.Value);
        sURL=sURL.replace("$FileId",dbFile.MAP.ID.Value);

        dfItem.Writer=xhr;

        xhr.open('POST', sURL, true);
        xhr.Owner=dfItem;
        xhr.Data=dbFile;
        xhr.upload.Owner=xhr;
        xhr.upload.Data=dbFile;
        xhr.setRequestHeader(coNet.fieldMethodOverride,'PUT');

        dfItem.Progress.maxValue=dfItem.File.size;

        xhr.onreadystatechange=function() {
          var xhr=this;
          if (xhr.readyState==4){
            var dfItem=xhr.Owner;
            var dbItem=xhr.Data;
            if (xhr.status==200) {
              var xDoc=xhr.responseXML;
              var xItem=coXML.getStanza(xDoc,dbItem.Stanza,xDoc.documentElement);
              dbItem.fromXML(xDoc,xItem);

              dfItem.Progress.setProgress(0);
              dfItem.Free();

              if (dbItem.Collection==null)
                dbItem.Free();
            } else {
              dfItem.setErrored();
            };
          };
        };
        xhr.upload.onerror=function(e){
          var xhr=this.Owner;
          var dfItem=xhr.Owner;
          var dbItem=xhr.Data;
          dfItem.setErrored();
        };
        xhr.upload.ontimeout=function(e){
          var xhr=this.Owner;
          var dfItem=xhr.Owner;
          var dbItem=xhr.Data;
          dfItem.setErrored();
        };
        xhr.upload.onprogress=function(e){
          var xhr=this.Owner;
          var dfItem=xhr.Owner;
          var dbItem=xhr.Data;
          var iProg=coDOM.getProgress(e);
          if (dfItem.Progress==null){
            xhr.abort();
            xhr.Owner=null;
            xhr.Data=null;
            xhr=null;
          } else {
            dfItem.Progress.setProgress(iProg);
          };
        };
        xhr.send(dfItem.File);
        return xhr;
    };
    return lst;
  },
  createMedia:function(){
    var co=this;
    var lst=coDB.createCollection(coVDM.VDM.Net.Parser,"kinds","kind",coDB.HasItems);
    lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,true,coDB.StreamOn);
    lst.Fields.addField("NameSpace",coDB.Kind.String,"ns","",coDB.StreamOn);
    lst.Text=null;
    lst.Picture=null;
    lst.Music=null;
    lst.Video=null;

    var cmds=lst.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=lst;
    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.onListComplete=function(netCMD){
      var lst=netCMD.Owner;
      var xDoc = netCMD.dataRecv;
      var xList=xDoc.documentElement;
      lst.fromXML(xDoc,xList);
      lst.Text=lst.getItem(lst.Fields.MAP.NameSpace,"text");
      lst.Picture=lst.getItem(lst.Fields.MAP.NameSpace,"picture");
      lst.Music=lst.getItem(lst.Fields.MAP.NameSpace,"music");
      lst.Video=lst.getItem(lst.Fields.MAP.NameSpace,"video");
    };
    cmds.List=cmds.createCommand(
      coVDM.VDM.Net,
      coSocial.NameSpace,
      coSocial.NS_MEDIA_LIST,
      coNet.NoData,
      cmds.onListComplete,
      cmds.onCmdError,
      cmds.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOn
    );
    cmds.List.Owner=lst;
    return lst;
  },
  createNetworks: function(){
    var vdm=coVDM.VDM;

    lst=coDB.createCollection(vdm.Net.Parser,"networks","network",coDB.HasItems,coDB.HasDisplays);
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Multiple);

    lst.Identity=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,true,coDB.StreamOn);

    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,true,coDB.StreamOn);
    lst.Fields.addField("AvatarID",coDB.Kind.Int64,"aid",0,true,coDB.StreamOn);

    lst.Fields.addField("Created",coDB.Kind.Double,"ctd",0.0,true,coDB.StreamOn);
    lst.Fields.addField("Modified",coDB.Kind.Double,"mtd",0.0,true,coDB.StreamOn);

    // Folder IDs
    lst.Fields.addField("DocumentsID",coDB.Kind.Int64,"dcid",0,true,coDB.StreamOn);
    lst.Fields.addField("MusicID",coDB.Kind.Int64,"muid",0,true,coDB.StreamOn);
    lst.Fields.addField("PicturesID",coDB.Kind.Int64,"pcid",0,true,coDB.StreamOn);
    lst.Fields.addField("TrashID",coDB.Kind.Int64,"trid",0,true,coDB.StreamOn);
    lst.Fields.addField("VideosID",coDB.Kind.Int64,"vdid",0,true,coDB.StreamOn);
    // Network Properties

    lst.Fields.addField("Privacy",coDB.Kind.Byte,"privacy",0,coDB.StreamOn);
    lst.Fields.addField("Title",coDB.Kind.String,"title","",coDB.StreamOn);
    lst.Fields.addField("Description",coDB.Kind.String,"desc","",coDB.StreamOn);
    lst.Fields.addField("MemberCount",coDB.Kind.Integer,"memct",0,coDB.StreamOn);
    lst.Fields.addField("RequestCount",coDB.Kind.Integer,"reqct",0,coDB.StreamOn);
    lst.Fields.addField("PubMembers",coDB.Kind.Int64Array,"pum",coList.Int64Array(),coDB.StreamOn);
    lst.Fields.addField("PriMembers",coDB.Kind.Int64Array,"prm",coList.Int64Array(),coDB.StreamOn);
    lst.Fields.addField("Admins",coDB.Kind.Int64Array,"admins",coList.Int64Array(),coDB.StreamOn);



    lst.evtLoaded=function(evt){
      var lst=evt.Networks;
      for (var iLcv=0; iLcv<lst.Items.length; iLcv++){
        var dbNet=lst.Items[iLcv];
        if (dbNet.MAP.Folders==undefined) {
          var fld=dbNet.addField("Folders",coDB.Kind.Collection,"folders",coSocial.App.Components.DB.createFolders(),coDB.StreamOff);
          fld.Value.Network=dbNet;
        };
        if (dbNet.MAP.Files==undefined) {
          var fld=dbNet.addField("Files",coDB.Kind.Collection,"files",coSocial.App.Components.DB.createFiles(),coDB.StreamOff);
          fld.Value.Network=dbNet;
          fld.Value.Displays.Add(coSpectrum.Folders.ListView);
        };
      };
    };
    var evt=lst.EventList.createItem(coDB.evkLoaded,lst.evtLoaded);
    evt.Networks=lst;
    evt=null;

    var cmds=lst.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=lst;

    cmds.onNetError=function(netCMD){

    };
    cmds.onNetTimeOut=function(netCMD){

    };
    cmds.onListComplete=function(netCMD){
      var lst=netCMD.Owner;
      var xDoc = netCMD.dataRecv;
      var xList=xDoc.documentElement;
      lst.fromXML(xDoc,xList);
    };
    cmds.onAddComplete=function(netCMD){
      var dbItem=netCMD.Data;
      var lst=netCMD.Owner;
      var xDoc=netCMD.dataRecv;
      var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
      dbItem.fromXML(xDoc,xItem);
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        lst.addItem(dbItem);
        var edt=coSocial.App.Screen.Editor;
        edt.Panels.Avatar.Commit();
        edt.Reset();
      };
    };
    cmds.onDeleteComplete=function(netCMD){
      var dbItem=netCMD.Data;
      var lst=netCMD.Owner;
      var xDoc=netCMD.dataRecv;
      var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
      dbItem.fromXML(xDoc,xItem);
      if (netCMD.Code==coNet.CO_STATUS_OK)
        lst.Delete(dbItem);
    };
    cmds.onWriteComplete=function(netCMD){
      var dbItem=netCMD.Data;
      var lst=netCMD.Owner;
      var xDoc=netCMD.dataRecv;
      var xItem=coXML.getStanza(xDoc,dbItem.Stanza);
      dbItem.fromXML(xDoc,xItem);
      if (netCMD.Code==coNet.CO_STATUS_OK)
        dbItem.Display.Synchronize();
    };
    cmds.onImportAvatarComplete=function(netCMD){
      var dbFile=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var lst=netCMD.Owner;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,dbFile.Stanza);
        dbFile.fromXML(xDoc,xItem);
        var dbItem=lst.getItem(lst.Identity,dbFile.MAP.NetworkID.Value);
        if (dbItem) {
          dbItem.MAP.AvatarID.Value=dbFile.MAP.ID.Value;
          lst.Commands.Save(dbItem);
        };
      };
    };
    cmds.onSearchComplete=function(netCMD){
      var lst=netCMD.Commands.Owner;
      var xDoc = netCMD.dataRecv;
      var xList=xDoc.documentElement;
      lst.fromXML(xDoc,xList);
    };
    cmds.List=function(){
      var cmds=this;
      var lst=cmds.Owner;
      var cmd=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_NET_LIST,
        coNet.NoData,
        cmds.onListComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      cmd.Owner=lst;
      return cmd;
    };
    cmds.ListFolders=function(dbNet){
      if (dbNet==undefined) dbNet=null;
      var cmds=this;
      var lst=cmds.Owner;
      if (dbNet){
        var colFolders=dbNet.MAP.Folders.Value;
        colFolders.Commands.List();
      } else {
        for (var iLcv=0; iLcv<lst.Items.length; iLcv++){
          var net=lst.Items[iLcv];
          var colFolders=net.MAP.Folders.Value;
          colFolders.Commands.List();
        };
      };

    };
    cmds.RefreshFolders=function(Folder){
      var cmds=this;
      var lst=cmds.Owner;

      for (var iLcv=0; iLcv<lst.Items.length; iLcv++) {
        var dbNet=lst.Items[iLcv];
        var colFolders=dbNet.MAP.Folders.Value;
        var netCMD=colFolders.Commands.List(colFolders);
        netCMD.Headers.Update(coNet.fieldSearch,dbNet.MAP.ID.Value);
        netCMD.Try();
        netCMD=null;
        colFldrs=null;
        dbNet=null;
      };
    };
    cmds.Add=function(dbItem){
      var cmds=this;
      var lst=cmds.Owner;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_NET_ADD,
        coXML.Header+dbItem.toXML(),
        cmds.onAddComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=dbItem;
      netCMD.Owner=lst;
    };
    cmds.ImportAvatar=function(dbFile){
      var cmds=this;
      var lst=cmds.Owner;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_FILE_IMPORT,
        coXML.Header+dbFile.toXML(),
        cmds.onImportAvatarComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=dbFile;
      netCMD.Owner=lst;
    };
    cmds.Save=function(dbItem){
      var cmds=this;
      var lst=cmds.Owner;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_NET_WRITE,
        coXML.Header+dbItem.toXML(),
        cmds.onWriteComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=dbItem;
      netCMD.Owner=lst;
    };
    //cmds.Search=coSearch.Create(cmds,coSocial.TTL_NET_SEARCH,coSocial.NameSpace,coSocial.NS_NET_SEARCH);
    cmds.Delete=function(dbItem){
      var cmds=this;
      var lst=cmds.Owner;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_NET_DEL,
        coXML.Header+dbItem.toXML(),
        cmds.onDeleteComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=dbItem;
      netCMD.Owner=lst;
    };
    // Cabinet
    lst.EventList.createItem(coDB.evkLoaded,coCabinet.Screen.DB.onNetworksLoaded);
    return lst;
  }
};
