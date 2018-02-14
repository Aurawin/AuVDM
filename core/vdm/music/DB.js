coVDM.App.Components.coMusic.App.Components.DB = {
  Version        : new Version(2014,10,28,243),
  Title          : new Title("Music Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/DB.js',coAppKit.PreLoaded),
  Extensions     : new Array("mp3","mpeg"),
  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 1000,
  LoadChunk      : 10,
  LoadDelay      : 3500,
  createFolders : function (Owner){
    var lst=coDB.createCollection(coNet.Parser,"folders","folder",coDB.HasItems,coDB.HasDisplays);
    lst.Owner=Owner;
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Multiple);
    lst.Identity=lst.Fields.ID=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    lst.Fields.addField("Path",coDB.Kind.String,"path","",coDB.StreamOn);
    return lst;
  },
  createPlaylists: function (Owner){
    var lst=coDB.createCollection(coNet.Parser,"playlists","playlist",coDB.HasItems,coDB.HasDisplays);
    lst.Unit=this;
    lst.Owner=Owner;
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Single);

    lst.Identity=lst.Fields.ID=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    lst.Fields.addField("Playlist",coDB.Kind.String,"name","",coDB.StreamOn);
    lst.Fields.addField("Count",coDB.Kind.Integer,"count",0,coDB.StreamOff);
    lst.Fields.addField("Files",coDB.Kind.Int64Array,"files","",coDB.StreamOn);
    return lst;
  },
  createTags:function(){
    var lst=coDB.createCollection(coNet.Parser,"tags","tag",coDB.HasItems,coDB.HasNoDisplays);
    lst.Unit=this;
    lst.Fields.addField("Kind",coDB.Kind.Integer,"k",0,coDB.StreamOn);
    lst.Fields.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
    lst.Fields.addField("Value",coDB.Kind.String,"v","",coDB.StreamOn);
  return lst;
  },
  createGenres:function(Owner){
    var lst=coDB.createCollection(coNet.Parser,"genres","genre",coDB.HasItems,coDB.HasDisplays);
    lst.Owner=Owner;
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Single);
    lst.Fields.addField("Genre",coDB.Kind.String,"ge","",coDB.StreamOn);
    return lst;
  },
  createAlbums:function(Owner){
    var lst=coDB.createCollection(coNet.Parser,"albums","album",coDB.HasItems,coDB.HasDisplays);
    lst.Owner=Owner;
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Single);
    lst.Fields.addField("Album",coDB.Kind.String,"al","",coDB.StreamOn);
    return lst;
  },
  createArtists:function(Owner){
    var lst=coDB.createCollection(coNet.Parser,"artists","artist",coDB.HasItems,coDB.HasDisplays);
    lst.Owner=Owner;
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Single);
    lst.Fields.addField("Artist",coDB.Kind.String,"a","",coDB.StreamOn);
    return lst;
  },
  createSummary: function(Owner){
    var flds=coDB.Fields("s",coDB.HasNoCollection,coDB.HasNoItems);
    flds.Owner=Owner;
    flds.addField("Inspected",coDB.Kind.Boolean,"ip",false,coDB.StreamOn);
    flds.addField("Album",coDB.Kind.String,"al","",coDB.StreamOn);
    flds.addField("Song",coDB.Kind.String,"s","",coDB.StreamOn);
    flds.addField("Details",coDB.Kind.String,"d","",coDB.StreamOn);
    flds.addField("Artist",coDB.Kind.String,"a","",coDB.StreamOn);
    flds.addField("Accompaniment",coDB.Kind.String,"ac","",coDB.StreamOn);
    flds.addField("Composer",coDB.Kind.String,"co","",coDB.StreamOn);
    flds.addField("TrackNumber",coDB.Kind.String,"tn","",coDB.StreamOn);
    flds.addField("Year",coDB.Kind.String,"yr",coMusic.Frames.Year,coDB.StreamOn);
    flds.addField("Genre",coDB.Kind.String,"ge","",coDB.StreamOn);
    flds.addField("Group",coDB.Kind.String,"gp","",coDB.StreamOn);

    flds.addField("Tags",coDB.Kind.Collection,"tags",this.createTags(),coDB.StreamOn);

    return flds;
  },
  createMyNetworks:function(Owner){
    var lst=coDB.createCollection(coNet.Parser,"networks","network",coDB.HasItem,coDB.HasNoDisplays,coDB.ParseSync);
    lst.Unit=this;
    lst.Owner=Owner;

    lst.Identity=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    lst.Fields.addField("Title",coDB.Kind.String,"title","",coDB.StreamOn);
    lst.Fields.addField("Folders",coDB.Kind.Collection,"folders",this.createFolders(Owner),coDB.StreamOff);
    lst.Fields.addField("Files",coDB.Kind.Collection,"files",this.createFiles(Owner),coDB.StreamOff);
    lst.Fields.addField("Results",coDB.Kind.Collection,"results",this.createFiles(Owner),coDB.StreamOff);

    lst.Fields.MAP.Folders.Value.Owner=lst;
    lst.Fields.MAP.Folders.Owner=lst;
    lst.Items.Owner=lst;
    lst.getBasicXML=function(net){
      var lst=this;
      net.MAP.Title.Stream=false;
      net.MAP.OwnerID.Stream=false;
      var sXML=net.toXML();
      net.MAP.Title.Stream=true;
      net.MAP.OwnerID.Stream=true;
      return sXML;
    };
    lst.Items.onLoaded=function(){
      var itms=this;
      var nets=itms.Owner;
      var db=nets.Owner;
      var sc=db.Owner;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var net=itms[iLcv];
        net.MAP.Folders.Value.Owner=net;
        net.Owner=nets;

        var dm=net.MAP.Files.Value.Items.DisplayMode;
        dm.setValue(dm.Single);
        net.MAP.Files.Value.Network=net;
        net.MAP.Files.Value.Owner=db;
        net.MAP.Files.Value.Displays.Add(sc.RightView.ListView);

        var dm=net.MAP.Results.Value.Items.DisplayMode;
        dm.setValue(dm.Single);
        net.MAP.Results.Value.Network=net;

        db.Commands.ListNetworkFolders(net);

      };
    };
    lst.Fields.MAP.Folders.Value.Items.onLoaded=function(){
      var itms=this;
      var sc=itms.Owner.Owner.Owner.Owner.Owner;
      var dbNet=itms.Owner.Owner;
      var tv=sc.LeftView.Tree;
      itms.Owner.pathField=itms.Owner.Fields.MAP.Path;
      tv.Items.Loading=true;

      var list=coList.Int64Array();

      var sPrePath=coLang.Table.Apps.Social.Networks.My+"/"+dbNet.MAP.Title.Value;

      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var itm=itms[iLcv];
        var fldr=itm.MAP;
        list.Add(fldr.ID.Value);
        fldr.Path.Value=sPrePath+"/"+fldr.Path.Value;
        var tvi=tv.Items.fromDB(itm);
        tvi.setIcon("tviFolder")
        tvi.Show();
        tvi.Network=dbNet;
      };

      var tvi=tv.Items.findByText(coLang.Table.Apps.Social.Networks.My);
      tv.placeNetworks(tvi);
      tvi.Show();

      tv.onLoaded();

      tv.Items.Loading=false;
      //sc.DB.Commands.NetworkListWith(dbNet,list);

      list.length=0;
      list=null;
    };
    return lst;
  },
  createOtherNetworks:function(Owner){
    var lst=coDB.createCollection(coNet.Parser,"networks","network",coDB.HasItem,coDB.HasNoDisplays,coDB.ParseSync);
    lst.Unit=this;
    lst.Owner=Owner;
    lst.Identity=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    lst.Fields.addField("Title",coDB.Kind.String,"title","",coDB.StreamOn);
    lst.Fields.addField("Folders",coDB.Kind.Collection,"folders",this.createFolders(Owner),coDB.StreamOff);
    lst.Fields.addField("Files",coDB.Kind.Collection,"files",this.createFiles(Owner),coDB.StreamOff);
    lst.Fields.addField("Results",coDB.Kind.Collection,"results",this.createFiles(Owner),coDB.StreamOff);

    lst.Fields.MAP.Folders.Value.Owner=lst;
    lst.Items.Owner=lst;
    lst.getBasicXML=function(net){
      var lst=this;
      net.MAP.Title.Stream=false;
      net.MAP.OwnerID.Stream=false;
      var sXML=net.toXML();
      net.MAP.Title.Stream=true;
      net.MAP.OwnerID.Stream=true;
      return sXML;
    };
    lst.Items.onLoaded=function(){
      var itms=this;
      var nets=itms.Owner;
      var db=nets.Owner;
      var sc=db.Owner;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var net=itms[iLcv];
        net.MAP.Folders.Value.Owner=net;
        net.Owner=nets;

        var dm=net.MAP.Files.Value.Items.DisplayMode;
        dm.setValue(dm.Single);
        net.MAP.Files.Value.Network=net;
        net.MAP.Files.Value.Owner=db;

        var dm=net.MAP.Results.Value.Items.DisplayMode;
        dm.setValue(dm.Single);
        net.MAP.Results.Value.Network=net;


        net.MAP.Files.Value.Displays.Add(sc.RightView.ListView);

        db.Commands.ListNetworkFolders(net);
      };
    };
    lst.Fields.MAP.Folders.Value.Items.onLoaded=function(){
      var itms=this;
      var sc=itms.Owner.Owner.Owner.Owner.Owner;
      var dbNet=itms.Owner.Owner;
      var tv=sc.LeftView.Tree;
      itms.Owner.pathField=itms.Owner.Fields.MAP.Path;
      tv.Items.Loading=true;

      var list=coList.Int64Array();
      var sPrePath=coLang.Table.Apps.Social.Networks.Other+"/"+dbNet.MAP.Title.Value;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var itm=itms[iLcv];
        var fldr=itm.MAP;
        list.Add(fldr.ID.Value);
        fldr.Path.Value=sPrePath+"/"+fldr.Path.Value;
        var tvi=tv.Items.fromDB(itm);
        tvi.Show();
        tvi.Network=dbNet;
        tvi.setIcon("tviFolder")
      };

      var tvi=tv.Items.findByText(coLang.Table.Apps.Social.Networks.Other);

      tv.placeNetworks(tvi);
      tvi.Show();
      tv.Items.Loading=false;

      tv.onLoaded();

      //sc.DB.Commands.NetworkListWith(dbNet,list);

      list.length=0;
      list=null;
    };
    return lst;
  },
  createConnections:function(Owner){
    var lst=coDB.createCollection(coNet.Parser,"connections","connection",coDB.HasItem,coDB.HasNoDisplays,coDB.ParseSync);
    lst.Unit=this;
    lst.Identity=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    lst.Fields.addField("NetworkID",coDB.Kind.Int64,"nid",0,coDB.StreamOn);
    return lst;
  },
  createFile : function(){
    var flds=coDB.Fields("file",coDB.HasNoCollection,coDB.HasNoItems);
    flds.Unit=this;

    var smry=this.createSummary(flds);

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
    flds.addField("Summary",coDB.Kind.Fields,"s",smry,coDB.StreamOn);

    smry.onLoaded=function(){
      var smry=this;
      var dbItem=smry.Owner;
      var col=dbItem.Collection;
      if (col)
        col.reMapSummary(dbItem);
    };
    flds.MAP.Album=smry.MAP.Album;
    flds.MAP.Song=smry.MAP.Song;
    flds.MAP.Details=smry.MAP.Details;
    flds.MAP.Artist=smry.MAP.Artist;
    flds.MAP.Accompaniment=smry.MAP.Accompaniment;
    flds.MAP.Composer=smry.MAP.Composer;
    flds.MAP.TrackNumber=smry.MAP.TrackNumber;
    flds.MAP.Year=smry.MAP.Year;
    flds.MAP.Genre=smry.MAP.Genre;
    flds.MAP.Group=smry.MAP.Group;

    return flds;
  },
  createFiles:function(Owner){
    var lst=coDB.createCollection(coNet.Parser,"files","file",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    lst.Unit=this;
    lst.Owner=Owner;
    lst.LoadInfo.FirstDelay=lst.Unit.LoadQuick;
    lst.LoadInfo.Interval=lst.Unit.LoadDelay;
    lst.LoadInfo.Chunk=lst.Unit.LoadChunk;
    lst.Items.DisplayMode.setValue(lst.Items.DisplayMode.Multiple);
    lst.Identity=lst.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);

    var smry=this.createSummary(lst);

    smry.onLoaded=function(){
      var dbItem=this.Owner;
      var db=dbItem.Collection.Owner;
      db.reMapSummary(dbItem);
    };

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
    lst.Fields.addField("Summary",coDB.Kind.Fields,"s",smry,coDB.StreamOn);


    lst.Fields.MAP.Album=smry.MAP.Album;
    lst.Fields.MAP.Song=smry.MAP.Song;
    lst.Fields.MAP.Details=smry.MAP.Details;
    lst.Fields.MAP.Artist=smry.MAP.Artist;
    lst.Fields.MAP.Accompaniment=smry.MAP.Accompaniment;
    lst.Fields.MAP.Composer=smry.MAP.Composer;
    lst.Fields.MAP.TrackNumber=smry.MAP.TrackNumber;
    lst.Fields.MAP.Year=smry.MAP.Year;
    lst.Fields.MAP.Genre=smry.MAP.Genre;
    lst.Fields.MAP.Group=smry.MAP.Group;
    /*
    lst.Fields.onLoaded=function(dbItem){
      var smry=dbItem.MAP.Summary.Value;
      dbItem.MAP.Album=smry.MAP.Album;
      dbItem.MAP.Song=smry.MAP.Song;
      dbItem.MAP.Details=smry.MAP.Details;
      dbItem.MAP.Artist=smry.MAP.Artist;
      dbItem.MAP.Accompaniment=smry.MAP.Accompaniment;
      dbItem.MAP.Composer=smry.MAP.Composer;
      dbItem.MAP.TrackNumber=smry.MAP.TrackNumber;
      dbItem.MAP.Year=smry.MAP.Year;
      dbItem.MAP.Genre=smry.MAP.Genre;
      dbItem.MAP.Group=smry.MAP.Group;
    };
    */
    lst.Groups.Artist=lst.Groups.Add(smry.MAP.Artist);
    lst.Groups.Album=lst.Groups.Add(smry.MAP.Album);
    lst.Groups.Genre=lst.Groups.Add(smry.MAP.Genre);

    lst.getURL=function(File){
      return coSocial.URI_FILE_GET.replace("$id",File.MAP.ID.Value).replace("$nid",File.MAP.NetworkID.Value);
    };
    lst.streamURL=function(File){
      return coSocial.URI_FILE_STREAM.replace("$auth",coVDM.Credentials.Auth).replace("$id",File.MAP.ID.Value).replace("$nid",File.MAP.NetworkID.Value);
    };
    lst.Items.onPartialLoad=function(dbItems){
      var db=this.Owner.Owner;
      db.FreeNonMusic(dbItems);
      for (var iLcv=0; iLcv<dbItems.length; iLcv++)
        this.Owner.Displays.SyncItem(dbItems[iLcv]);
    };
    lst.Items.onLoaded=function(){
      var itms=this;
      var db=itms.Owner;
      var sc=db.Owner.Screen;
      db.Loaded=true;
      sc.DB.onFoldersLoaded();
    };
    return lst;
  },
  createDB:function(Screen){
    var db=coObject.Create();
    db.Owner=Screen;
    db.Folders=this.createFolders(db);
    db.Folders.Files=this.createFiles(db);


    db.MyNetworks=this.createMyNetworks(db);
    db.OtherNetworks=this.createOtherNetworks(db);
    db.Connections=this.createConnections(db);


    db.Selected=this.createFiles(db);
    db.Results=this.createFiles(db);
    db.Results.Items.onLoaded=function(){
      var db=this.Owner.Owner;
      for (iLcv=0; iLcv<this.length; iLcv++)
        db.reMapSummary(this[iLcv]);
    };


    db.PlayLists=this.createPlaylists(db);

    db.Screen=Screen;
    db.reMapSummary=function(itm){
      var db=this;
      var smry=itm.MAP.Summary.Value;

      itm.MAP.Album=smry.MAP.Album;
      itm.MAP.Song=smry.MAP.Song;
      itm.MAP.Details=smry.MAP.Details;
      itm.MAP.Artist=smry.MAP.Artist;
      itm.MAP.Accompaniment=smry.MAP.Accompaniment;
      itm.MAP.Composer=smry.MAP.Composer;
      itm.MAP.TrackNumber=smry.MAP.TrackNumber;
      itm.MAP.Year=smry.MAP.Year;
      itm.MAP.Genre=smry.MAP.Genre;
      itm.MAP.Group=smry.MAP.Group;
      itm.MAP.Genre.Default=itm.MAP.Genre.Value;
      if (!isNaN(itm.MAP.Genre.Value) ) {
        itm.MAP.Genre.Value=coLang.Table.Apps.Music.Genre.toString(parseInt(itm.MAP.Genre.Value));
      };

    };
    db.setID3Tags=function(itm){
      var db=this;
      var smry=itm.MAP.Summary.Value;
      var tags=smry.MAP.Tags.Value;
      if (tags.Items.length>0){
        db.setID3Tag(tags.Items,itm.MAP.Album,coMusic.Frames.Title,"");
        db.setID3Tag(tags.Items,itm.MAP.Song, coMusic.Frames.TitleDescription,"");
        db.setID3Tag(tags.Items,itm.MAP.Artist,coMusic.Frames.LeadArtist, "");
        db.setID3Tag(tags.Items,itm.MAP.Accompaniment,coMusic.Frames.Accompaniment,"");
        db.setID3Tag(tags.Items,itm.MAP.Composer,coMusic.Frames.Composer,"" );
        db.setID3Tag(tags.Items,itm.MAP.TrackNumber,coMusic.Frames.TrackNumber,"");

        db.setID3Tag(tags.Items,itm.MAP.Year,coMusic.Frames.Year, "");
        db.setID3Tag(tags.Items,itm.MAP.Group,coMusic.Frames.ContentGroupDescription, "");

        var tag=db.setID3Tag(tags.Items,itm.MAP.Genre,coMusic.Frames.ContentType, coLang.Table.Apps.Music.Genre.Unknown);
        var idx= (tag) ? coUtils.parseInt(tag.Value,-1) : -1;
        if (tag) {
          tag.Value=(idx>-1) ? coLang.Table.Apps.Music.Genre.toString(idx) : tag.Value;
        } else {
          itm.Genre.Value=coLang.Table.Apps.Music.Genre.Unknown;
          //itm.Genre.buildIndex();
        };
      };
    };
    db.setID3Tag=function(Items,fldTag,iKind,sDefault){
      for (var iLcv=0; iLcv<Items.length; iLcv++){
        var itm=Items[iLcv];
        var val=itm.MAP.Kind.Value;
        if (itm.MAP.Kind.Value==iKind) {
          fldTag.Value=itm.MAP.Value.Value;
          //fldTag.buildIndex();
          return fldTag;
        };
      };
      fldTag.Value=sDefault;
      //fldTag.buildIndex();

      return fldTag;
    };

    db.setFileBasicStream=function(dbItem,val){
      dbItem.MAP.Created.Stream=val;
      dbItem.MAP.Modified.Stream=val;
      dbItem.MAP.Kind.Stream=val;
      dbItem.MAP.Summary.Stream=val;
      dbItem.MAP.Name.Stream=val;
      dbItem.MAP.Size.Stream=val;
      dbItem.MAP.Digest.Stream=val;
      dbItem.MAP.Data.Stream=val;
    };
    db.getFileAsBasic=function(dbItem){
      var db=this;
      db.setFileBasicStream(dbItem,false);
      var sRes=dbItem.toXML();
      db.setFileBasicStream(dbItem,true);
      return sRes;
    };
    db.RemoveNonMusic=function(list){
      var DB=coMusic.App.Components.DB;
      var itm=null;
      var iLcv=0;
      while (iLcv<list.length) {
        var itm=list[iLcv];
        var sExt=coUtils.extractFileExt(itm.MAP.Name.Value).toLowerCase();
        if (DB.Extensions.indexOf(sExt)==-1){
          list.splice(iLcv,1);
        } else{
          iLcv+=1;
        };
      };
      itm=null;
    };
    db.FreeNonMusic=function(list){
      var DB=coMusic.App.Components.DB;
      var itm=null;
      var iLcv=0;
      var recy=new Array();
      while (iLcv<list.length) {
        var itm=list[iLcv];
        var sExt=coUtils.extractFileExt(itm.MAP.Name.Value).toLowerCase();
        if (DB.Extensions.indexOf(sExt)==-1){
          recy.push(itm);
          list.splice(iLcv,1);
        } else{
          iLcv+=1;
        };
      };
      for (iLcv=0; iLcv<recy.length; iLcv++)
        recy[iLcv].Free();
      recy.length=0;
      recy=null;
      itm=null;
    };
    db.LoadFolders=function(){
      var db=this;
      var sc=db.Screen;
      var list=new Array();
      var fldrs=coSpectrum.Folders.DB;
      var sPath=coLang.Table.Apps.Spectrum.Folders.Music;
      var dbMusic=fldrs.getItem(fldrs.Fields.Path,sPath);
      list.push(dbMusic);
      var sPath=sPath+"/";
      fldrs.Lookup(fldrs.Fields.Path,[sPath],list);
      sc.DB.Folders.Items.Merge(list);
      sc.LeftView.Tree.Load();
      list.length=0;
      var list=coList.Int64Array();
      for (var iLcv=0; iLcv<sc.DB.Folders.Items.length; iLcv++){
        var itm=sc.DB.Folders.Items[iLcv];
        list.Add(itm.MAP.ID.Value);
      };
      sc.DB.Folders.Loaded=true;
      list.length=0;
      list=null;
    };
    db.onFoldersLoaded=function(){
      var db=this;
      var sc=db.Screen;
      if (
        (sc.Player.Source==sc.Player.Unit.srcNone) &&
        (sc.Manifest.MAP.SearchIndex.Value==sc.Unit.srchGenre)
      ) {
        sc.RightView.Toolbar.Options.Genre.Container.options.selectedIndex=sc.Manifest.MAP.GenreIndex.Value;
      };
    };

    var cmds=db.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=db;
    cmds.onError=function(netCMD){

    };
    cmds.onTimeOut=function(netCMD){

    };

    cmds.onNetworkFoldersLoaded=function(netCMD){
      var db=netCMD.Owner;
      var sc=db.Screen;
    };
    cmds.onListConnectionsComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var db=cmds.Owner;
      var sc=db.Screen;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var dbFile=netCMD.Data;

        var xDoc = netCMD.dataRecv;
        var xList=xDoc.documentElement;
        var xNets=coXML.getStanza(xDoc,db.MyNetworks.Stanza);
        db.Connections.fromXML(xDoc,xList);
        db.OtherNetworks.fromXML(xDoc,xNets);

      };
    };
    cmds.onListFilesComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var db=cmds.Owner;
      var sc=db.Screen;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        db.Selected.LoadInfo.XML=netCMD.dataRecv;
        netCMD.dataRecv.length=0;
        db.Selected.LoadInfo.Start=0;
        db.Selected.LoadInfo.setActive(true);
      };
    };
    cmds.onNetworkListFilesComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var net=netCMD.Data;
      var db=cmds.Owner;
      var sc=db.Screen;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var col=db.Selected;
        col.LoadInfo.XML=netCMD.dataRecv;
        netCMD.dataRecv.length=0;
        col.LoadInfo.Start=0;
        col.LoadInfo.setActive(true);
      };
    };
    cmds.onListMyNetworksWithComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var db=cmds.Owner;
      var sc=db.Screen;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        db.Files.LoadInfo.XML="".concat(netCMD.dataRecv);
        netCMD.dataRecv.length=0;
        db.Files.LoadInfo.Start=0;
        db.Files.LoadInfo.setActive(true);
      };
    };
    cmds.onListMyNetworksComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var db=cmds.Owner;
      var sc=db.Screen;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc=netCMD.dataRecv;
        var xList=xDoc.documentElement;
        db.MyNetworks.fromXML(xDoc,xList);
      };
    };
    cmds.onListWithComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var db=cmds.Owner;
      var sc=db.Screen;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        db.Folders.Files.LoadInfo.XML="".concat(netCMD.dataRecv);
        netCMD.dataRecv.length=0;
        db.Folders.Files.LoadInfo.Start=0;
        db.Folders.Files.LoadInfo.setActive(true);
      };
    };
    cmds.onNetworkListWithComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var net=netCMD.Data;
        var List=net.MAP.Files.Value;
        List.LoadInfo.XML="".concat(netCMD.dataRecv);
        netCMD.dataRecv.length=0;
        List.LoadInfo.Start=0;
        List.LoadInfo.setActive(true);
      };
    };
    cmds.onListNetworkFoldersComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var net=netCMD.Data;
      var db=cmds.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc=netCMD.dataRecv;
        var xList=xDoc.documentElement;
        net.MAP.Folders.Value.fromXML(xDoc,xList);
      };
    };
    cmds.ListMyNetworks=function(){
      var cmds=this;
      var netCMD=this.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_NET_LIST,
        coNet.NoData,
        cmds.onListMyNetworksComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateSuspended,
        coNet.LingerOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.reTry();
    };
    cmds.ListConnections=function(){
      var cmds=this;
      var netCMD=this.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_CONNECTION_LIST,
        coNet.NoData,
        cmds.onListConnectionsComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateSuspended,
        coNet.LingerOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.reTry();
    };
    cmds.ListNetworkFolders=function(socNet){
      var cmds=this;
      var netCMD=this.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_FOLDER_LIST,
        coNet.NoData,
        cmds.onListNetworkFoldersComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateSuspended,
        coNet.LingerOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Headers.Update(coNet.fieldSearch,socNet.MAP.ID.Value);
      netCMD.Headers.Update(coNet.fieldNameSpace,coLang.Table.Apps.Spectrum.Folders.Music);
      netCMD.Owner=cmds;
      netCMD.Data=socNet;
      netCMD.reTry();
    };
    cmds.NetworkListWith=function(socNet,IDs){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSocial.NameSpace,
        coSocial.NS_FLS_LIST_WITH,
        coXML.Header+socNet.Owner.getBasicXML(socNet),
        cmds.onNetworkListWithComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Data=socNet;
      netCMD.Headers.Update(coNet.fieldSearch,IDs.toString(','));
      cmds=null;
      return netCMD;
    };
    cmds.ListWith=function(IDs){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_FLS_LIST_WITH,
        coNet.NoData,
        cmds.onListWithComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Headers.Update(coNet.fieldSearch,IDs.toString(','));

      cmds=null;
      return netCMD;
    };
    cmds.ListFiles=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_FLS_LIST,
        coNet.NoData,
        cmds.onListFilesComplete,
        cmds.onError,
        cmds.onTimeOut,
        coNet.NoProgress,
        coNet.CreateSuspended,
        coNet.LingerOnComplete,
        coNet.AutoLoadOff
    );
    cmds.ListFiles.Owner=cmds;

    cmds.NetworkListFiles=cmds.createCommand(
      coVDM.VDM.Net,
      coSocial.NameSpace,
      coSocial.NS_FILE_LIST,
      coNet.NoData,
      cmds.onNetworkListFilesComplete,
      cmds.onError,
      cmds.onTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    cmds.NetworkListFiles.Owner=cmds;
    coSpectrum.Folders.DB.EventList.createItem(
      coDB.evkLoaded,
      function(){
        if (db.Screen.Visible==true)
          db.LoadFolders();
      }
    );
    return db;
  }
};
