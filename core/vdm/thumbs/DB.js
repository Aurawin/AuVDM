coThumbs.App.Components.DB = {
  Version        : new Version(2013,5,18,1),
  Title          : new Title("Thumbnail Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coThumbs.App,'/core/vdm/thumbs/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  createFolders : function (){
    var lst=coDB.createCollection(coNet.Parser,"folders","folder",coDB.HasItems,coDB.HasDisplays);
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Multiple);
    lst.Identity=lst.Fields.ID=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    lst.Fields.addField("Path",coDB.Kind.String,"path","",coDB.StreamOn);
    return lst;
  },
  createFile : function(){
    var flds=coDB.Fields("file",coDB.HasNoCollection,coDB.HasNoItems);
    flds.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    flds.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    flds.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    flds.addField("FolderID",coDB.Kind.Int64,"fid",0,coDB.StreamOn);
    flds.addField("Created",coDB.Kind.DateTime,"created",0.0,coDB.StreamOn);
    flds.addField("Modified",coDB.Kind.DateTime,"modified",0.0,coDB.StreamOn);
    flds.addField("Kind",coDB.Kind.Integer,"kind",coContentType.fkBinary,coDB.StreamOn);
    flds.addField("Name",coDB.Kind.String,"name","",coDB.StreamOn);
    flds.addField("Size",coDB.Kind.Int64,"size",0,coDB.StreamOn);
    flds.addField("Summary",coDB.Kind.XML,"summary","",coDB.StreamOn);
    flds.addField("Digest",coDB.Kind.Base64,"digest","",coDB.StreamOn);
    flds.addField("Data",coDB.Kind.Base64,"data","",coDB.StreamOn);
    return flds;
  },
  createFiles:function(){
    var lst=coDB.createCollection(coNet.Parser,"files","file",coDB.HasItems,coDB.HasDisplays);
    lst.getURL=function(File){
      return coSocial.URI_FILE_GET.replace("$id",File.MAP.ID.Value).replace("$nid",File.MAP.NetworkID.Value);
    };
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Multiple);
    lst.Identity=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    lst.Fields.addField("FolderID",coDB.Kind.Int64,"fid",0,coDB.StreamOn);
    lst.Fields.addField("Created",coDB.Kind.DateTime,"created",0.0,coDB.StreamOn);
    lst.Fields.addField("Modified",coDB.Kind.DateTime,"modified",0.0,coDB.StreamOn);
    lst.Fields.addField("Kind",coDB.Kind.Integer,"kind",coContentType.fkBinary,coDB.StreamOn);
    lst.Fields.addField("Name",coDB.Kind.String,"name","",coDB.StreamOn);
    lst.Fields.addField("Size",coDB.Kind.Int64,"size",0,coDB.StreamOn);
    lst.Fields.addField("Summary",coDB.Kind.XML,"summary","",coDB.StreamOn);
    lst.Fields.addField("Digest",coDB.Kind.Base64,"digest","",coDB.StreamOn);
    lst.Fields.addField("Data",coDB.Kind.Base64,"data","",coDB.StreamOn);
    return lst;
  }
};

