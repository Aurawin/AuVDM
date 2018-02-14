coCMS.App.Components.DB = {
  Version        : new Version(2014,10,28,15),
  Title          : new Title("Content Management Database","DB"),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/DB.js',coAppKit.PreLoaded),
  Vendor         : new Vendor(
    "Aurawin",
    "Copyright (&copy;) 2014.  All rights reserved.",
    [
      {'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843},
      {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852}
    ]
  ),
  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 500,
  LoadChunk      : 300,
  LoadDelay      : 500,

  createFolders:function(){
    var f=coDB.createCollection(coXML.createParser(),"fdrs","fdr",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    f.LoadInfo.FirstDelay=coCMS.App.Components.DB.LoadQuick;
    f.LoadInfo.Interval=coCMS.App.Components.DB.LoadDelay;
    f.LoadInfo.Chunk=coCMS.App.Components.DB.LoadChunk;
    f.Loaded=false;
    f.Items.DisplayMode.setValue(f.Items.DisplayMode.Multiple);
    f.Identity=f.Fields.ID=f.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    f.Fields.Path=f.Fields.addField("Path",coDB.Kind.String,"pth","",coDB.StreamOn);
    return f;
  },
  createDomain:function(){
    var d=new coDB.Fields("dm",coDB.HasNoCollection,coDB.HasNoItems);
    d.Identity=d.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    d.addField("CertID",coDB.Kind.QWord,"cid",0,coDB.StreamOn);
    d.addField("DefaultQuota",coDB.Kind.QWord,"dqa",0,coDB.StreamOn);
    d.addField("Name",coDB.Kind.String,"nme","",coDB.StreamOn);
    d.addField("Root",coDB.Kind.String,"rot","",coDB.StreamOn);
    d.addField("FriendlyName",coDB.Kind.String,"fne","",coDB.StreamOn);
    d.addField("DefaultCatchAll",coDB.Kind.Boolean,"dca",false,coDB.StreamOn);
    d.addField("DefaultFiltering",coDB.Kind.Boolean,"dfl",true,coDB.StreamOn);
    return d;
  },
  createFiles:function(){
    var f=coDB.createCollection(coXML.createParser(),"fls","fl",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    f.LoadInfo.FirstDelay=coCMS.App.Components.DB.LoadQuick;
    f.LoadInfo.Interval=coCMS.App.Components.DB.LoadDelay;
    f.LoadInfo.Chunk=coCMS.App.Components.DB.LoadChunk;
    f.Loaded=false;
    f.Items.DisplayMode.setValue(f.Items.DisplayMode.Multiple);
    f.Identity=f.Fields.ID=f.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    f.Fields.addField("FolderID",coDB.Kind.QWord,"fid",0,coDB.StreamOn);
    f.Fields.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
    f.Fields.addField("Digest",coDB.Kind.Base64,"d","",coDB.StreamOn);
    f.Fields.addField("Created",coDB.Kind.DateTime,"ctd",0.0,coDB.StreamOn);
    f.Fields.addField("Modified",coDB.Kind.DateTime,"mtd",0.0,coDB.StreamOn);
    f.Fields.addField("Size",coDB.Kind.QWord,"z",0,coDB.StreamOn);
    f.Fields.addField("Attributes",coDB.Kind.QWord,"atr",0,coDB.StreamOn);
    f.Fields.addField("Compress",coDB.Kind.Boolean,"cmp",true,coDB.StreamOn);
    f.Fields.addField("Cache",coDB.Kind.Boolean,"cac",true,coDB.StreamOn);
    f.Fields.addField("Keywords",coDB.Kind.Boolean,"kwds",false,coDB.StreamOn);
    f.Fields.addField("TTL",coDB.Kind.Integer,"ttl",0,coDB.StreamOn);
    f.transformURL=function(rc){
      var f=this;
      var Folder=coCMS.App.DB.Folders.getItemById(rc.MAP.FolderID.Value);
      var sPath=Folder.MAP.Path.Value;
      var idx=sPath.indexOf("/http/");
      if (idx==0){
        idx=sPath.indexOf('/',1);
        sPath=sPath.substring(idx+1);
      };
      return (Folder)? sPath+'/'+rc.MAP.Name.Value  : null;
    };
    f.rotateURL=function(rc,Angle){
      return coCMS.URI_FLS_ROTATE.replace("$fid",rc.MAP.FolderID.Value).replace("$id",rc.MAP.ID.Value).replace("$deg",Angle);
    };
    return f;
  },
  createFile:function(){
    var f=new coDB.Fields("fl",coDB.HasNoCollection,coDB.HasNoItems);
    f.Identity=f.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    f.addField("FolderID",coDB.Kind.QWord,"fid",0,coDB.StreamOn);
    f.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
    f.addField("Digest",coDB.Kind.Base64,"d","",coDB.StreamOn);
    f.addField("Created",coDB.Kind.DateTime,"ctd",0.0,coDB.StreamOn);
    f.addField("Modified",coDB.Kind.DateTime,"mtd",0.0,coDB.StreamOn);
    f.addField("Size",coDB.Kind.QWord,"z",0,coDB.StreamOn);
    f.addField("Attributes",coDB.Kind.QWord,"atr",0,coDB.StreamOn);
    f.addField("Compress",coDB.Kind.Boolean,"c",true,coDB.StreamOn);
    f.addField("Cache",coDB.Kind.Boolean,"c",true,coDB.StreamOn);
    f.addField("Keywords",coDB.Kind.Boolean,"c",false,coDB.StreamOn);
    f.addField("TTL",coDB.Kind.Integer,"fs",0,coDB.StreamOn);
    return f;
  },
  Create : function(){
    DB=coObject.Create(coObject.relInline,coObject.cpyAsVar,"DB");
    DB.Attributes=new Object();
    DB.Attributes.None=0;
    DB.Attributes.System=1 << 0;
    DB.Attributes.Reserved=1 << 1;
    DB.Attributes.ReadOnly= 1 << 2;
    DB.Attributes.CoreObject= 1 << 3;
    DB.Attributes.isCoreObject=function(File){
      return ((File.MAP.Attributes.Value & this.CoreObject)>=this.CoreObject);
    };
    DB.Domain=this.createDomain();
    DB.Folders=this.createFolders();
    DB.Files=this.createFiles();
    DB.Parser=createParser();
    DB.Commands=coNet.createCommands(coVDM.VDM.Net);
    DB.Commands.Owner=DB;
    DB.Commands.onAllowEditComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        coCMS.Tools.Enable();
        coCMS.App.SetupEditors();
        coCMS.App.SetupFileManager();
      };
    };
    DB.Commands.onIdentifyComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Commands;
        var rcPP=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,rcPP.Stanza,xDoc.documentElement);
        if (xItem) {
          rcPP.fromXML(xDoc,xItem);
        };
      };
    };
    DB.Commands.onListFoldersComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Commands;
        var DB=cmds.Owner;
        var Folders=DB.Folders;
        Folders.Loading=true;
        Folders.Loaded=false;
        Folders.LoadInfo.Validate=false;
        Folders.LoadInfo.XML=netCMD.dataRecv;
        netCMD.dataRecv=null;
        Folders.LoadInfo.Start=0;
        Folders.LoadInfo.setActive(true);
      };
    };
    DB.Commands.onListFilesComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Commands;
        var DB=cmds.Owner;
        var lv=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,DB.Files.Stanza,xDoc.documentElement);
        if (xItem) {
          lv.DataSet.fromXML(xDoc,xItem);
        };
      };
    };
    DB.Commands.onSetFileAttributesComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Commands;
        var rcFile=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,rcFile.Stanza,xDoc.documentElement);
        if (xItem) {
          rcFile.fromXML(xDoc,xItem);
        };
      };
    };
    DB.Commands.onDiscoverComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Commands;
        var rcManifest=netCMD.Data;
        var rcPP=rcManifest.MAP.PagePoint.Value;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,rcPP.Stanza,xDoc.documentElement);
        if (xItem) {
          rcPP.fromXML(xDoc,xItem);
          cmds.readManifest(rcManifest);
        };
      };
    };
    DB.Commands.onReadManifestComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Commands;
        var rcManifest=netCMD.Data;
        var rcPP=rcManifest.MAP.PagePoint.Value;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,rcPP.Stanza,xDoc.documentElement);
        if (xItem) {
          rcPP.fromXML(xDoc,xItem);
          var sXML=coEncoding.base64Decode(rcPP.MAP.Data.Value);
          var xDoc=netCMD.Net.Parser.Parse(sXML);
          var xItem=coXML.getStanza(xDoc,rcManifest.Stanza,xDoc.documentElement);
          if (xItem){
            rcManifest.fromXML(xDoc,xItem);
          };
        };
      };
    };
    DB.Commands.onReadDomainComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var rcDomain=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,rcDomain.Stanza,xDoc.documentElement);
        if (xItem) {
          rcDomain.fromXML(xDoc,xItem);
        };
      };
    };
    DB.Commands.onWriteManifestComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Commands;
        var rcManifest=netCMD.Data;
        var rcPP=rcManifest.MAP.PagePoint.Value;
        var xDoc=netCMD.dataRecv;
      };
    };
    DB.Commands.onFolderDeleted=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Owner;
        var DB=cmds.Owner;
        netCMD.Data.Free();
      };
    };
    DB.Commands.onFileAdded=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Owner;
        var DB=cmds.Owner;
        var File=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,File.Stanza,xDoc.documentElement);
        if (xItem){
          File.fromXML(xDoc,xItem);
        }
      };
    };    
    DB.Commands.onFileRenamed=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Owner;
        var DB=cmds.Owner;
        var File=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,File.Stanza,xDoc.documentElement);
        if (xItem){
          File.fromXML(xDoc,xItem);
        }
      };
    };
    DB.Commands.onFileDeleted=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Owner;
        var DB=cmds.Owner;
        var File=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,File.Stanza,xDoc.documentElement);
        if (xItem){
          File.fromXML(xDoc,xItem);
          File.Free();
        }
      };
    };
    DB.Commands.onTimeout=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;

    };
    DB.Commands.onError=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
    };
    DB.Commands.LoadManifest=function(mfst){
      var cmds=this;
    };
    DB.Commands.ListFolders=function(Path){
      if (Path==undefined) Path="/";
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_FLDS_LIST,
        coNet.NoData,
        cmds.onListFoldersComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Headers.Update(coNet.fieldDepth,coCMS.FolderRefreshDepth);
      netCMD.Headers.Update(coNet.fieldSearch,Path);
      return netCMD;
    };
    DB.Commands.ListFiles=function(folderID,ListView){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_FLS_LIST,
        coNet.NoData,
        cmds.onListFilesComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Data=ListView;
      netCMD.Headers.Update(coNet.fieldSearch,folderID);
      return netCMD;
    };
    DB.Commands.checkAllowEdit=function(){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_EDITOR,
        coNet.NoData,
        cmds.onAllowEditComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      return netCMD;
    };
    DB.Commands.SetFileAttributes=function(rcFile){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_FLS_SET_ATTRIBUTES,
        coXML.Header+rcFile.toXML(),
        cmds.onSetFileAttributesComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=rcFile;
      netCMD.Owner=cmds;
      return netCMD;
    };
    DB.Commands.Identify=function(rcPP){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_ID,
        coXML.Header+rcPP.toXML(),
        cmds.onIdentifyComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=rcPP;
      netCMD.Owner=cmds;
      return netCMD;
    };
    DB.Commands.Discover=function(rcManifest){
      var cmds=this;
      var rcPP=rcManifest.MAP.PagePoint.Value;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_ID,
        coXML.Header+rcPP.toXML(),
        cmds.onDiscoverComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=rcManifest;
      netCMD.Owner=cmds;
      return netCMD;
    };
    DB.Commands.readDomain=function(){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_DM_READ,
        coNet.NoData,
        cmds.onReadDomainComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=coCMS.App.DB.Domain;
      netCMD.Owner=cmds;
      return netCMD;
    };
    DB.Commands.readManifest=function(rcManifest){
      var cmds=this;
      var rcPP=rcManifest.MAP.PagePoint.Value;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_READ,
        coXML.Header+rcPP.toXML(),
        cmds.onReadManifestComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=rcManifest;
      netCMD.Owner=cmds;
      return netCMD;
    };
    DB.Commands.writeManifest=function(rcManifest){
      var cmds=this;
      var rcPP=rcManifest.MAP.PagePoint.Value;
      rcPP.MAP.Data.Value=coEncoding.base64Encode(coXML.Header+rcManifest.toXML());
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_WRITE,
        coXML.Header+rcPP.toXML(),
        cmds.onWriteManifestComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=rcManifest;
      netCMD.Owner=cmds;
      return netCMD;
    };
    DB.Commands.DeleteFolder=function(Folder){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_FLDS_DEL,
        coXML.Header+Folder.toXML(),
        cmds.onFolderDeleted,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=Folder;
      netCMD.Owner=cmds;
      return netCMD;
    };
    DB.Commands.DeleteFile=function(rcFile){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_FLS_DELETE,
        coXML.Header+rcFile.toXML(),
        cmds.onFileDeleted,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=rcFile;
      netCMD.Owner=cmds;
      return netCMD;
    };
    DB.Commands.AddFile=function(File){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_FLS_ADD,
        coXML.Header+File.toXML(),
        cmds.onFileAdded,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=File;
      netCMD.Owner=cmds;
      return netCMD;
    };    
    DB.Commands.RenameFile=function(File){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coCMS.NameSpace,
        coCMS.NS_FLS_RENAME,
        coXML.Header+File.toXML(),
        cmds.onFileRenamed,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=File;
      netCMD.Owner=cmds;
      return netCMD;
    };
    return DB;
  }
};



