coMusic.App.Components.Search = {
  Version        : new Version(2014,10,28,35),
  Title          : new Title("Music Search","Search"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Search.js',coAppKit.PreLoaded),
  debugToConsole : true,
  ttlList        : 1200,
  ttlListBy      : 120,
  LoadQuick      : 250,
  LoadPause      : 1000,
  LoadChunk      : 50,
  LoadDelay      : 1500,

  qrListGenre    : null,
  qrListArtist   : null,
  qrListAlbum    : null,
  qrListGroup    : null,

  qrByGroup      : null,
  qrByGenre      : null,
  qrByTags       : null,


  NameSpace      : "/core/vdm",
  NS_MUSIC       : "/srch/music",

  ST_ARTIST      : "tst",
  ST_ALBUM       : "alb",
  ST_SONG        : "sng",
  ST_GENRE       : "gre",
  ST_GROUP       : "grp",
  ST_TAGS        : "tgs",

  Commands       : null,
  Screen         : null,

  Init : function(Screen){
    this.Screen=Screen;
    this.Commands=coNet.createCommands(coVDM.VDM.Net);

    this.qrListGenre=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOn);
    this.qrListGenre.Results.MAP.ResultsAsXML.Kind=coDB.Kind.String;
    this.qrListGenre.setProvider(this.NameSpace,this.NS_MUSIC);
    this.qrListGenre.setQuery(this.NameSpace,this.NS_MUSIC,this.ST_GENRE,this.ttlList);
    this.qrListGenre.Results.onLoaded=function(){
      var qr=this.Owner;
      var sc=qr.Owner.Screen;
      var itm=qr.Results.MAP.ResultsAsXML;
      if (itm.Value.length>0) {
        var sa=coList.Split(itm.Value);
        var sa2=new Array();
        sa2.length=sa.length;
        var opts=sc.RightView.Toolbar.Options.Genre.Container;
        for (var iLcv=0; iLcv<sa.length; iLcv++){
          var sName=(isNaN(sa[iLcv])) ?  sa[iLcv] : coLang.Table.Apps.Music.Genre.toString(parseInt(sa[iLcv]));
          sa2[iLcv]=new Array();
          sa2[iLcv][0]=sName;
          sa2[iLcv][1]=sa[iLcv];
        };
        sa2.sort();
        opts.length=sa2.length;
        for (var iLcv=0; iLcv<sa2.length; iLcv++)
          opts[iLcv]=new Option(sa2[iLcv][0],sa2[iLcv][1]);
        sa2.length=0;
        sa2=null;
        sa.length=0;
        sa=null;
      };
    };

    this.qrListGroup=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOn);
    this.qrListGroup.setProvider(this.NameSpace,this.NS_MUSIC);
    this.qrListGroup.setQuery(this.NameSpace,this.NS_MUSIC,this.ST_GROUP,this.ttlList);
    this.qrListGroup.Results.MAP.ResultsAsXML.Kind=coDB.Kind.String;

    this.qrListArtist=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOn);
    this.qrListArtist.setProvider(this.NameSpace,this.NS_MUSIC);
    this.qrListArtist.setQuery(this.NameSpace,this.NS_MUSIC,this.ST_ARTIST,this.ttlList);
    this.qrListArtist.Results.MAP.ResultsAsXML.Kind=coDB.Kind.String;
    this.qrListArtist.Results.onLoaded=function(){
      var qr=this.Owner;
      var sc=qr.Owner.Screen;
      var itm=qr.Results.MAP.ResultsAsXML;
      if (itm.Value.length>0) {
        var sa=coList.Split(itm.Value);
        sa.sort();
        var opts=sc.RightView.Toolbar.Options.Artists.Container;
        opts.length=sa.length;
        for (var iLcv=0; iLcv<sa.length; iLcv++)
          opts[iLcv]=new Option(sa[iLcv],sa[iLcv]);
      };
    };

    this.qrListAlbum=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOn);
    this.qrListAlbum.setProvider(this.NameSpace,this.NS_MUSIC);
    this.qrListAlbum.setQuery(this.NameSpace,this.NS_MUSIC,this.ST_ALBUM,this.ttlList);
    this.qrListAlbum.Results.MAP.ResultsAsXML.Kind=coDB.Kind.String;
    this.qrListAlbum.Results.onLoaded=function(){
      var qr=this.Owner;
      var sc=qr.Owner.Screen;
      var itm=qr.Results.MAP.ResultsAsXML;
      if (itm.Value.length>0) {
        var sa=coList.Split(itm.Value);
        sa.sort();
        var opts=sc.RightView.Toolbar.Options.Albums.Container;
        opts.length=sa.length;
        for (var iLcv=0; iLcv<sa.length; iLcv++)
          opts[iLcv]=new Option(sa[iLcv],sa[iLcv]);
      };
    };

    this.qrByGroup=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOff);
    this.qrByGroup.setProvider(this.NameSpace,this.NS_MUSIC);
    this.qrByGroup.setQuery(this.NameSpace,this.NS_MUSIC,this.ST_GROUP,this.ttlListBy);

    this.qrByGenre=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOff);
    this.qrByGenre.setProvider(this.NameSpace,this.NS_MUSIC);
    this.qrByGenre.setQuery(this.NameSpace,this.NS_MUSIC,this.ST_GENRE,this.ttlListBy);
    this.qrByGenre.Query.onExecute=function(){
      var sc=coMusic.App.Screen;
      sc.RightView.ListView.Items.Clear();
    };
    this.qrByGenre.Results.onLoaded=function(){
      var qr=this.Owner;
      var sc=qr.Owner.Screen;
      sc.DB.Selected.LoadInfo.XML=coMusic.Parser.Parse(coXML.Header+qr.Results.MAP.ResultsAsXML.Value);
      qr.Results.MAP.ResultsAsXML.Value.length=0;
      sc.DB.Selected.LoadInfo.Start=0;
      sc.DB.Selected.LoadInfo.setActive(true);
      sc.DB.Selected.LoadInfo.onComplete=function(col){
        var sc=coMusic.App.Screen;
        sc.DB.Selected.Groups.Selected=sc.DB.Selected.Groups.Genre;

        coMusic.App.Components.Nav.setGroupByGenreMenu(sc,col.Groups);
        coMusic.App.Components.Nav.setGroupByArtistMenu(sc,col.Groups);
        coMusic.App.Components.Nav.setGroupByAlbumMenu(sc,col.Groups);

        sc.Switcher.Summary.viewGenres=false;
        sc.Switcher.Summary.viewArtists=true;
        sc.Switcher.Summary.viewAlbums=true;

        sc.Nav.gpResults.mnuGenre.Conseal();
        sc.Nav.gpResults.mnuArtist.Hidden=false;
        sc.Nav.gpResults.mnuAlbum.Hidden=false;
        sc.Nav.forceSelected(sc.Nav.gpResults);
      };
    };

    this.qrByArtist=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOff);
    this.qrByArtist.setProvider(this.NameSpace,this.NS_MUSIC);
    this.qrByArtist.setQuery(this.NameSpace,this.NS_MUSIC,this.ST_ARTIST,this.ttlListBy);
    this.qrByArtist.Query.onExecute=function(){
      var sc=coMusic.App.Screen;
      sc.RightView.ListView.Items.Clear();
    };
    this.qrByArtist.Results.onLoaded=function(){
      var qr=this.Owner;
      var sc=qr.Owner.Screen;
      sc.DB.Selected.LoadInfo.XML=coMusic.Parser.Parse(coXML.Header+qr.Results.MAP.ResultsAsXML.Value);
      qr.Results.MAP.ResultsAsXML.Value.length=0;
      sc.DB.Selected.LoadInfo.Start=0;
      sc.DB.Selected.LoadInfo.setActive(true);
      sc.DB.Selected.LoadInfo.onComplete=function(col){
        var sc=coMusic.App.Screen;
        sc.DB.Selected.Groups.Selected=sc.DB.Selected.Groups.Artist;

        sc.Switcher.Summary.viewGenres=true;
        sc.Switcher.Summary.viewArtists=false;
        sc.Switcher.Summary.viewAlbums=true;

        coMusic.App.Components.Nav.setGroupByGenreMenu(sc,col.Groups);
        coMusic.App.Components.Nav.setGroupByArtistMenu(sc,col.Groups);
        coMusic.App.Components.Nav.setGroupByAlbumMenu(sc,col.Groups);
        sc.Nav.gpResults.mnuGenre.Hidden=false;
        sc.Nav.gpResults.mnuArtist.Conseal();
        sc.Nav.gpResults.mnuAlbum.Hidden=false;
        sc.Nav.forceSelected(sc.Nav.gpResults);
      };
    };


    this.qrByAlbum=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOff);
    this.qrByAlbum.setProvider(this.NameSpace,this.NS_MUSIC);
    this.qrByAlbum.setQuery(this.NameSpace,this.NS_MUSIC,this.ST_ALBUM,this.ttlListBy);
    this.qrByAlbum.Query.onExecute=function(){
      var sc=coMusic.App.Screen;
      sc.RightView.ListView.Items.Clear();
    };
    this.qrByAlbum.Results.onLoaded=function(){
      var qr=this.Owner;
      var sc=qr.Owner.Screen;
      sc.DB.Selected.LoadInfo.XML=coMusic.Parser.Parse(coXML.Header+qr.Results.MAP.ResultsAsXML.Value);
      qr.Results.MAP.ResultsAsXML.Value.length=0;
      sc.DB.Selected.LoadInfo.Start=0;
      sc.DB.Selected.LoadInfo.setActive(true);
      sc.DB.Selected.LoadInfo.onComplete=function(col){
        var sc=coMusic.App.Screen;
        sc.DB.Selected.Groups.Selected=sc.DB.Selected.Groups.Album;

        sc.Switcher.Summary.viewGenres=true;
        sc.Switcher.Summary.viewArtists=true;
        sc.Switcher.Summary.viewAlbums=false;

        coMusic.App.Components.Nav.setGroupByGenreMenu(sc,col.Groups);
        coMusic.App.Components.Nav.setGroupByArtistMenu(sc,col.Groups);
        coMusic.App.Components.Nav.setGroupByAlbumMenu(sc,col.Groups);
        sc.Nav.gpResults.mnuGenre.Hidden=false;
        sc.Nav.gpResults.mnuArtist.Hidden=false;
        sc.Nav.gpResults.mnuAlbum.Conseal();
        sc.Nav.forceSelected(sc.Nav.gpResults);
      };
    };

    this.qrByTags=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOff);
    this.qrByTags.setProvider(this.NameSpace,this.NS_MUSIC);
    this.qrByTags.setQuery(this.NameSpace,this.NS_MUSIC,this.ST_TAGS,this.ttlListBy);
    this.qrByTags.Query.onExecute=function(){
      var sc=coMusic.App.Screen;
      sc.RightView.ListView.Items.Clear();
    };
    this.qrByTags.Results.onLoaded=function() {
      var qr=this.Owner;
      var sc=qr.Owner.Screen;

      var xDoc=coMusic.Parser.Parse(coXML.Header+qr.Results.MAP.ResultsAsXML.Value);
      var xItem=xDoc.documentElement;
      sc.DB.Results.fromXML(xDoc,xItem);

      var list=new Array();
      var saSearch=qr.Term.toLowerCase().split(' ');

      sc.DB.Results.Search(sc.DB.Results.Fields.MAP.Song,saSearch,list);
      sc.DB.Results.Search(sc.DB.Results.Fields.MAP.Artist,saSearch,list);
      sc.DB.Results.Search(sc.DB.Results.Fields.MAP.Genre,saSearch,list);
      sc.DB.Results.Search(sc.DB.Results.Fields.MAP.Album,saSearch,list);

      sc.DB.Results.Items.length=0;
      sc.DB.Selected.Items.Merge(list);
      sc.RightView.ListView.Load();
      list.length=0;
      list=null;
    };
  }
};

