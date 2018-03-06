coCabinet.App.Components.DB = {
  Version        : new Version(2014,10,28,135),
  Title          : new Title("Spectrum Cabinet Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCabinet.App,'/core/spc/fldrs/DB.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCabinet.App,'/core/spc/fldrs/DB.js',coAppKit.PreLoaded),
  LoadQuick      : 250,
  LoadPause      : 500,
  LoadChunk      : 300,
  LoadDelay      : 500,
  debugToConsole : true,
  Create : function(Screen) {
    var DB=coDB.createCollection(coNet.Parser,"folders","folder",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    DB.LoadInfo.FirstDelay=coCabinet.App.Components.DB.LoadQuick;
    DB.LoadInfo.Interval=coCabinet.App.Components.DB.LoadDelay;
    DB.LoadInfo.Chunk=coCabinet.App.Components.DB.LoadChunk;
    DB.Loaded=false;
    DB.Validate=false;
    DB.Requested=false;
    DB.Unit=this;
    DB.Screen=Screen;
    DB.Items.DisplayMode.setValue(DB.Items.DisplayMode.Multiple);
    DB.Identity=DB.Fields.ID=DB.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    DB.Fields.Path=DB.Fields.addField("Path",coDB.Kind.String,"path","",coDB.StreamOn);
    DB.Mail=coObject.Create();
    DB.Mail.Inbox=null;
    DB.Mail.Outbox=null;
    DB.Mail.Sent=null;
    DB.Mail.Trash=null;
    DB.FirstLoad=true;
    DB.onFoldersLoaded=function(dbEvent){
      var DB=this.Owner.Owner;
      var sc=DB.Screen;

      DB.Loading=false;
      DB.Loaded=true;
      if (DB.FirstLoad==true) {
        DB.FirstLoad=false;
        DB.Devices=DB.getItem(DB.Fields.MAP.Path,coLang.Table.Apps.Spectrum.Folders.Devices);
        DB.Documents=DB.getItem(DB.Fields.MAP.Path,coLang.Table.Apps.Spectrum.Folders.Documents);
        DB.Mail=DB.getItem(DB.Fields.MAP.Path,coLang.Table.Mail.Folder);
        DB.Mail.Inbox=DB.getItem(DB.Fields.MAP.Path,coLang.Table.Mail.Folder+"/"+coLang.Table.Mail.Inbox);
        DB.Mail.Outbox=DB.getItem(DB.Fields.MAP.Path,coLang.Table.Mail.Folder+"/"+coLang.Table.Mail.Outbox);
        DB.Mail.Sent=DB.getItem(DB.Fields.MAP.Path,coLang.Table.Mail.Folder+"/"+coLang.Table.Mail.Sent);
        DB.Mail.Trash=DB.getItem(DB.Fields.MAP.Path,coLang.Table.Mail.Folder+"/"+coLang.Table.Mail.Trash);

        DB.MyNetworks=DB.getItem(DB.Fields.MAP.Path,coLang.Table.Apps.Social.Networks.My);
        DB.OtherNetworks=DB.getItem(DB.Fields.MAP.Path,coLang.Table.Apps.Social.Networks.Other);

        coVDM.VDM.Splash.checkFolders();
      };
    };
    DB.EventList.createItem(coDB.evkLoaded,DB.onFoldersLoaded);

    DB.getURL=function(File){
      return  coVDM.URI_FILE_GET.replace("$id",File.MAP.ID.Value);
    };
    if (coVDM.Browser.cookieHandoff==true) {
      DB.transformURL=function(File){
          return  coVDM.URI_FILE_TRANSFORM.replace("$id",File.MAP.ID.Value);
      };
      DB.palmprintURL=function(File){
          return  coVDM.URI_FILE_PALMPRINT.replace("$id",File.MAP.ID.Value);
      };
      DB.streamURL=function(File){
        return  coVDM.URI_FILE_STREAM.replace("$id",File.MAP.ID.Value);
      };
    } else {
      DB.transformURL=function(File){
          return  coVDM.URI_FILE_TRANSFORM.replace("$id",File.MAP.ID.Value)+"?"+coVDM.Credentials.Auth;
      };
      DB.palmprintURL=function(File){
          return  coVDM.URI_FILE_PALMPRINT.replace("$id",File.MAP.ID.Value)+"?"+coVDM.Credentials.Auth;
      };
      DB.streamURL=function(File){
        return  coVDM.URI_FILE_STREAM.replace("$id",File.MAP.ID.Value)+"?"+coVDM.Credentials.Auth;
      };
    };
    DB.getDownloadURL=function(File){
      return  coVDM.URI_FILE_DOWNLOAD.replace("$id",File.MAP.ID.Value);
    };
    DB.Commands=coNet.createCommands(coVDM.VDM.Net);
    DB.Commands.Owner=DB;
    DB.Commands.onCmdError=function(netCMD){
      var cmds=this;
      var DB=cmds.DB;
      var sc=DB.Screen;
      if (DB.Unit.debugToConsole==true)
        coVDM.VDM.Console.Append(
          "".concat(
          " coSpectrum.App.Components.Cabinet.DB.Commands.onCmdError",
          " ",netCMD.toString()
          )
        );

    };
    DB.Commands.onCmdTimeOut=function(netCMD){
      var cmds=this;
      var DB=cmds.DB;
      var sc=DB.Screen;
      if (DB.Unit.debugToConsole==true)
        coVDM.VDM.Console.Append(
          "".concat(
          " coSpectrum.App.Components.Cabinet.DB.Commands.onCmdTimeOut",
          " ",netCMD.toString()
          )
        );
    };
    DB.createFile=function(){
      var File=new coDB.Fields("file",coDB.HasNoCollection,coDB.HasNoItems);
      File.Identity=File.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      File.addField("NetworkID",coDB.Kind.QWord,"nid",0,coDB.StreamOn);
      File.addField("FolderID",coDB.Kind.QWord,"fid",0,coDB.StreamOn);
      File.addField("Created",coDB.Kind.DateTime,"ctd",0.0,coDB.StreamOn);
      File.addField("Modified",coDB.Kind.DateTime,"mtd",0.0,coDB.StreamOn);
      File.addField("Allocated",coDB.Kind.DateTime,"atd",0.0,coDB.StreamOn);
      File.addField("Kind",coDB.Kind.Integer,"kd",coContentType.fkBinary,coDB.StreamOn);
      File.addField("Flags",coDB.Kind.Integer,"fs",0,coDB.StreamOn);
      File.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
      File.addField("Size",coDB.Kind.QWord,"z",0,coDB.StreamOn);
      File.addField("Summary",coDB.Kind.XML,"s","",coDB.StreamOn);
      File.addField("Digest",coDB.Kind.Base64,"d","",coDB.StreamOn);
      return File;
    };
    DB.FileToXML=function(dbItem){
      return coXML.Print(
        dbItem.Stanza,
        coXML.Print(dbItem.MAP.ID.Tag,dbItem.MAP.ID.Value.toString(),coXML.CDATA_OFF)+
        coXML.Print(dbItem.MAP.FolderID.Tag,dbItem.MAP.FolderID.Value.toString(),coXML.CDATA_OFF),
        coXML.CDATA_OFF
      );
    };
    DB.createFiles=function(){
      var Files=coDB.createCollection(coNet.Parser,"files","file",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);      Files.NS_CORE=coVDM.NameSpace;
      Files.NS_CMD_READ=coVDM.NS_FLS_READ;
      Files.LoadInfo.FirstDelay=coCabinet.App.Components.DB.LoadQuick;
      Files.LoadInfo.Interval=coCabinet.App.Components.DB.LoadDelay;
      Files.LoadInfo.Chunk=coCabinet.App.Components.DB.LoadChunk;
      Files.Items.DisplayMode.setValue(Files.Items.DisplayMode.Multiple);
      Files.rotateURL=function(File,Angle){
        return coVDM.URI_FILE_ROTATE.replace("$nid",File.MAP.NetworkID.Value).replace("$fid",File.MAP.FolderID.Value).replace("$id",File.MAP.ID.Value).replace("$deg",Angle);
      };
      Files.transformURL=function(File){
        return  coVDM.URI_FILE_TRANSFORM.replace("$auth",coVDM.Credentials.Auth).replace("$id",File.MAP.ID.Value);
      };
      Files.palmprintURL=function(File){
        return  coVDM.URI_FILE_PALMPRINT.replace("$auth",coVDM.Credentials.Auth).replace("$id",File.MAP.ID.Value);
      };
      Files.getURL=function(File){
        return  coVDM.URI_FILE_GET.replace("$id",File.MAP.ID.Value);
      };
      Files.streamURL=function(File){
        return  coVDM.URI_FILE_STREAM.replace("$auth",coVDM.Credentials.Auth).replace("$id",File.MAP.ID.Value);
      };
      var cmds=Files.Commands=coNet.createCommands(coVDM.VDM.Net);
      cmds.Owner=Files;
      cmds.setStream=function(File,value){
        File.MAP.FolderID.Stream=true;
        File.MAP.NetworkID.Stream=(File.MAP.NetworkID.Value!=0);
        File.MAP.Created.Stream=value;
        File.MAP.Modified.Stream=value;
        File.MAP.Allocated.Stream=value;
        File.MAP.Kind.Stream=value;
        File.MAP.Name.Stream=value;
        File.MAP.Size.Stream=value;
        File.MAP.Digest.Stream=value;
        File.MAP.Summary.Stream=value;
      };
      cmds.onNetError=function(netCMD){

      };
      cmds.onNetTimeOut=function(netCMD){

      };
      cmds.onMoveComplete=function(netCMD){
        var dbItem=netCMD.Data;
        dbItem.Free(); // will remove all GUI references :-)
      };
      cmds.onRenameComplete=function(netCMD){
        var cmds=netCMD.Owner;
        var Files=cmds.Owner;
        var File=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,Files.Stanza2);
        File.updateXML(xDoc,xItem);
      };
      cmds.onListFilesComplete=function(netCMD){
        var cmds=netCMD.Owner;
        var Files=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,Files.Stanza);
        Files.fromXML(xDoc,xItem);
      };
      cmds.Rename=function(File){
        var cmds=this;
        cmds.setStream(File,false);
        File.MAP.Name.Stream=true;
        var netCMD=coVDM.VDM.Net.Commands.createCommand(
          coVDM.VDM.Net,
          (File.MAP.NetworkID.Value==0) ? coVDM.NameSpace  : coSocial.NameSpace,
          (File.MAP.NetworkID.Value==0) ? coVDM.NS_FLS_RENAME : coSocial.NS_FILE_RENAME,
          coXML.Header+File.toXML(),
          cmds.onRenameComplete,
          cmds.onNetError,
          cmds.onNetTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
        );
        cmds.setStream(File,true);
        netCMD.Owner=cmds;
        netCMD.Data=File;
        return netCMD;
      };
      cmds.Move=function(Owner,File,FolderID){
        var cmds=this;
        cmds.setStream(File,false);
        var netCMD=coVDM.VDM.Net.Commands.createCommand(
          coVDM.VDM.Net,
          (File.MAP.NetworkID.Value==0) ? coVDM.NameSpace  : coSocial.NameSpace,
          (File.MAP.NetworkID.Value==0) ? coVDM.NS_FLS_MOVE : coSocial.NS_FILES_MOVE,
          coXML.Header+"<files>"+File.toXML()+"</files>",
          cmds.onMoveComplete,
          cmds.onNetError,
          cmds.onNetTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
        );
        netCMD.Headers.Update(coNet.fieldSearch,FolderID);
        cmds.setStream(File,true);
        netCMD.Owner=Owner;
        netCMD.Data=File;
        return netCMD;
      };
      cmds.DropWrite=function(dfItem,dbFile){
        var cmds=this;
        var xhr = new XMLHttpRequest();
        var sURL=coVDM.URI_FILE_SET_DATA;
        sURL=sURL.replace("$FolderId",dbFile.MAP.FolderID.Value);
        sURL=sURL.replace("$FileId",dbFile.MAP.ID.Value);
        xhr.open('POST', sURL, true);
        xhr.Owner=dfItem;
        xhr.Data=dbFile;
        xhr.upload.Owner=xhr;
        xhr.upload.Data=dbFile;
        dfItem.Progress.maxValue=dfItem.File.size;


        xhr.onreadystatechange=function() {
          var xhr=this;
          if ((xhr.readyState==4) && (xhr.status==200)) {

            var dfItem=xhr.Owner;
            var dbItem=xhr.Data;

            var xDoc=xhr.responseXML;
            var xItem=coXML.getStanza(xDoc,dbItem.Stanza,xDoc.documentElement);
            dbItem.fromXML(xDoc,xItem);

            dfItem.Progress.setProgress(0);
            dfItem.Free();

            if (dbItem.Collection==null)
              dbItem.Free();
          };
        };
        xhr.upload.onprogress=function(e){
          var xhr=this.Owner;
          var dfItem=xhr.Owner;
          var dbItem=xhr.Data;
          if (dfItem.Progress==null) {
            xhr.abort();
            xhr.Owner=null;
            xhr.Data=null;
            xhr=null;
          } else {
            dfItem.Progress.setProgress(e.position);
          };
        };
        xhr.send(dfItem.File);
        return xhr;
      };
      cmds.Write=function(dbFile){
        var cmds=this;
        var xhr = new XMLHttpRequest();
        var sURL=coVDM.URI_FILE_SET_DATA;
        sURL=sURL.replace("$FolderId",dbFile.MAP.FolderID.Value);
        sURL=sURL.replace("$FileId",dbFile.MAP.ID.Value);
        xhr.open('POST', sURL, true);
        xhr.Data=dbFile;
        xhr.upload.Owner=xhr;
        xhr.upload.Data=dbFile;

        xhr.onreadystatechange=function() {
          var xhr=this;
          if ((xhr.readyState==4) && (xhr.status==200)) {
            var dbItem=xhr.Data;
            var xDoc=xhr.responseXML;
            var xItem=coXML.getStanza(xDoc,dbItem.Stanza,xDoc.documentElement);
            dbItem.fromXML(xDoc,xItem);
          };
        };
        xhr.send(dbFile.Content);
        return xhr;
      };
      cmds.List=function(DataSet,folderID){
        var cmds=this;
        var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coVDM.NameSpace,
          coVDM.NS_FLS_LIST,
          coNet.NoData,
          cmds.onListFilesComplete,
          cmds.onNetError,
          cmds.onNetTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
        );
        netCMD.Owner=cmds;
        netCMD.Data=DataSet;
        netCMD.Headers.Update(coNet.fieldSearch,folderID);
        return netCMD;
      };
      cmds.Create=function(dbFile){
        var cmds=this;
        var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coVDM.NameSpace,
          coVDM.NS_FLS_ADD,
          coXML.Header+dbFile.toXML(),
          function(netCMD){ // Success
            var cmds=netCMD.Commands;
            var itmFile=netCMD.Data;

            if (netCMD.Code==coNet.CO_STATUS_OK){
              var xDoc=netCMD.dataRecv;
              var xItem=coXML.getStanza(xDoc,itmFile.Stanza,xDoc.documentElement);
              itmFile.fromXML(xDoc,xItem);
              // ID is no present, we can now write the data
              cmds.Write(itmFile);
            };
          },
          cmds.onCmdError,
          cmds.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateSuspended,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
        );
        netCMD.Data=dbFile;
        netCMD.Commands=cmds;
        netCMD.Try();
        return netCMD;
      };
      cmds.DropAdd=function(dfItem,dbFile){
        var cmds=this;
        var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coVDM.NameSpace,
          coVDM.NS_FLS_ADD,
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
          cmds.onCmdError,
          cmds.onCmdTimeOut,
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
      Files.Identity=Files.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      Files.Fields.addField("FolderID",coDB.Kind.QWord,"fid",0,coDB.StreamOn);
      Files.Fields.addField("NetworkID",coDB.Kind.QWord,"nid",0,coDB.StreamOn);
      Files.Fields.addField("Created",coDB.Kind.DateTime,"ctd",0.0,coDB.StreamOn);
      Files.Fields.addField("Modified",coDB.Kind.DateTime,"mtd",0.0,coDB.StreamOn);
      Files.Fields.addField("Allocated",coDB.Kind.DateTime,"atd",0.0,coDB.StreamOn);
      Files.Fields.addField("Kind",coDB.Kind.Integer,"kd",coContentType.fkBinary,coDB.StreamOn);
      Files.Fields.addField("Flags",coDB.Kind.Integer,"fs",0,coDB.StreamOn);
      Files.Fields.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
      Files.Fields.addField("Size",coDB.Kind.QWord,"z",0,coDB.StreamOn);
      Files.Fields.addField("Digest",coDB.Kind.Base64,"d","",coDB.StreamOn);
      Files.Fields.addField("Summary",coDB.Kind.XML,"s","",coDB.StreamOn);
      return Files;
    };
    DB.Files=DB.createFiles();

    DB.getInboxID=function(){
      return this.Mail.Inbox.MAP.ID.Value;
    };
    DB.getOutboxID=function(){
      return this.Mail.Outbox.MAP.ID.Value;
    };
    DB.getSentBoxID=function(){
      return this.Mail.Sent.Fields.ID.Value;
    };
    DB.getTrashBoxID=function(){
      return this.Mail.Trash.Fields.ID.Value;
    };
    DB.getFolder=function(iID){
      return this.getItem(fldrs.DB.Fields.MAP.ID,iID);
    };
    DB.onNetworkFoldersLoaded=function(dbEvent){
      var net=dbEvent.Network;
      var col=net.MAP.Folders.Value;
      var tvs=coCabinet.App.Components.TreeView.Trees;

      for (var tvLcv=0; tvLcv<tvs.length; tvLcv++){
        var tv=tvs[tvLcv];
        tv.Items.Loading=true;
        col.Displays.Add(tv); // won't add duplicate
        tv.Items.Loading=false;
      };
    };
    DB.onConnectionFoldersLoaded=function(dbEvent){
      var net=dbEvent.Network;
      var col=net.MAP.Folders.Value;
      var tvs=coCabinet.App.Components.TreeView.Trees;
      for (var tvLcv=0; tvLcv<tvs.length; tvLcv++){
        var tv=tvs[tvLcv];
        tv.Items.Loading=true;
        col.Displays.Add(tv); // won't add duplicate
        tv.Items.Loading=false;
      };
    };
    DB.onNetworksLoaded=function(dbEvent){
      var DB=coCabinet.Screen.DB;
      var fldrs=coCabinet.Screen;
      fldrs.Loading=true;

      var tvs=coCabinet.App.Components.TreeView.Trees;

      for (var tLcv=0; tLcv<tvs.length; tLcv++){
        var tv=tvs[tLcv];
        DB.Displays.Add(tv); // won't add duplicate
      };
      fldrs.Loading=false;
    };
    DB.onConnectionsLoaded=function(dbEvent){
      var DB=coCabinet.Screen.DB;
      var fldrs=coCabinet.Screen;
      fldrs.Loading=true;
      var tvs=coCabinet.App.Components.TreeView.Trees;
      for (var tLcv=0; tLcv<tvs.length; tLcv++){
        var tv=tvs[tLcv];
        DB.Displays.Add(tv); // won't add duplicate
      };
      fldrs.Loading=false;
    };

    DB.Commands.onAddComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var DB=cmds.Owner;
      var dbItem=netCMD.Data;
      var xDoc=netCMD.dataRecv;
      var xItem=coXML.getStanza(xDoc,DB.Stanza2,xDoc.documentElement);
      dbItem.updateXML(xDoc,xItem);
    };
    DB.Commands.onDeleteComplete=function(netCMD){
      // Nothing much to do here.
      var cmds=netCMD.Owner;
      var DB=cmds.Owner;
      netCMD.Data=DB.Items.Remove(netCMD.Data);
    };
    DB.Commands.onRenameComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Owner;
        var DB=cmds.Owner;
        var dbItem=netCMD.Data;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,DB.Stanza2,xDoc.documentElement);
        dbItem.updateXML(xDoc,xItem);
      };
    };
    DB.Commands.onClearComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var fldrs=cmds.Owner;
    };
    DB.Commands.onListFoldersComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Owner;
        var DB=cmds.Owner;
        var sc=DB.Screen;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,DB.Stanza,xDoc.documentElement);
        DB.fromXML(xDoc,xItem);
      };
    };
    DB.Commands.onRefreshFoldersComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Owner;
        var DB=cmds.Owner;
        var sc=DB.Screen;
        sc.Loading=true;
        DB.Loading=true;
        DB.Loaded=false;
        DB.LoadInfo.Validate=false;
        DB.LoadInfo.XML=netCMD.dataRecv;
        DB.LoadInfo.Start=0;
        DB.LoadInfo.setActive(true);
      };
    };
    DB.Commands.onListFilesComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var ds=netCMD.Data;
      ds.LoadInfo.XML=netCMD.dataRecv;
      ds.LoadInfo.Start=0;
      ds.LoadInfo.setActive(true);
    };
    DB.Commands.ListFolders=function(){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_FLDS_LIST,
        coNet.NoData,
        DB.Commands.onListFoldersComplete,
        DB.Commands.onCmdError,
        DB.Commands.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=DB.Commands;
      netCMD.Headers.Update(coNet.fieldDepth,coVDM.FolderRefreshDepth);
      return netCMD;
    };
    DB.Commands.RefreshFolder=function(Folder){
      var cmds=this;
      var DB=cmds.Owner;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_FLDS_LIST,
        coNet.NoData,
        DB.Commands.onRefreshFoldersComplete,
        DB.Commands.onCmdError,
        DB.Commands.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Headers.Update(coNet.fieldSearch,Folder.MAP.Path.Value);
      netCMD.Headers.Update(coNet.fieldDepth,coVDM.FolderRefreshDepth);
      DB.Displays.startTorus();
      return netCMD;

    };

    DB.Commands.ListFiles=function(folderID, DataSet){
      var cmds=this;
      if (DataSet==undefined) DataSet=cmds.Owner.Files;
      var fldrs=cmds.Owner.Screen;
      if ( (!folderID) || (folderID==0) || (folderID==undefined) ) return;
      DataSet.Displays.startTorus();
      var netCMD=fldrs.DB.Commands.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_FLS_LIST,
        coNet.NoData,
        fldrs.DB.Commands.onListFilesComplete,
        fldrs.DB.Commands.onCmdError,
        fldrs.DB.Commands.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Data=DataSet;
      netCMD.Headers.Update(coNet.fieldSearch,folderID);
    };

    DB.Commands.Add=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coVDM.NameSpace,
          coVDM.NS_FLDS_ADD,
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
      netCMD.Owner=this;
      return netCMD;
    };
    DB.Commands.Rename=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coVDM.NameSpace,
          coVDM.NS_FLDS_RENAME,
          coXML.Header+dbItem.toXML(),
          cmds.onRenameComplete,
          cmds.onCmdError,
          cmds.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
      );
      netCMD.Data=dbItem;
      netCMD.Owner=this;
      return netCMD;
    };
    DB.Commands.Delete=function(dbItem){
      var cmds=this;
      var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coVDM.NameSpace,
          coVDM.NS_FLDS_DEL,
          coXML.Header+dbItem.toXML(),
          cmds.onRenameComplete,
          cmds.onCmdError,
          cmds.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
      );
      netCMD.Data=dbItem;
      netCMD.Owner=cmds;
      return netCMD;
    };
    return DB;
  }
};
