var coMusic=coVDM.App.Components.coMusic={
  Version        : new Version(2015,6,2,102),
  Title          : new Title("Aurawin Music Player","coMusic"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/music/coMusic.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/music/coMusic.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/music/coMusic.js',
  debugToConsole : true,
  NameSpace      : "/core/vdm/music",
  App            : null,
  API            : null,
  Screen         : null,
  modeSpectrum   : 0,
  modeSocial     : 1,
  srchText       : 0,
  srchArtist     : 1,
  srchAlbum      : 2,
  srchGenre      : 3,
  vmComplete     : 0,
  vmSimple       : 1,
  Audio          : null,
  Exts           : null,
  VDM            : null,
  Frames         : null,
  Parser         : createParser(),
  init : function(vdm){
    this.Exts=coList.StringArray();
    this.Exts.Add("mp3");
    this.Opener=coRegistry.Items.createItem(
      this.Exts,
      function(aItem,Folder,Files,File){
        if (aItem.Screen==null)
          aItem.Screen=coMusic.App.Screen;
        aItem.Screen.Show();
        //Folder,Files,
        aItem.Screen.Player.setFile(File);
        return aItem;
      }
    );
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js'
      ],
      [
        this.NameSpace+'/coMusic.css',
        this.NameSpace+'/DB.js',
        this.NameSpace+'/Nav.js',
        this.NameSpace+'/Stack.js',
        this.NameSpace+'/Search.js',
        this.NameSpace+'/TreeView.js',
        this.NameSpace+'/Views.js',
        this.NameSpace+'/ListView.js',
        this.NameSpace+'/Splitter.js',
        this.NameSpace+'/Toolbar.js',
        this.NameSpace+'/Player.js',
        this.NameSpace+'/PlayLists.js',
        this.NameSpace+'/Uploader.js',
        this.NameSpace+'/Manifest.js',
        this.NameSpace+'/netSelect.js',
        this.NameSpace+'/Summary.js'
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.Frames=this.createFrameKinds();
    this.App.deferInit=function(App){
      if (
        (typeof(coSpectrum)!=undefined) &&
        (coSpectrum.Folders)
      ) {
        return true;
      };
      return false;
    };
    this.App.onLogin=function(App){
      App.Components.Search.Init(App.Screen);
    };
    this.Header.App=this.App;
    this.Usage.App=this.App;
    return this;
  },
  onInitialized : function(App){
    App.Unit.Screen=App.Screen=App.Unit.createScreen();
    App.Screen.Conseal();
    App.Loaded=true;
  },
  createFrameKinds : function(){
    k=coObject.Create();
    k.None                             = 0;
    k.ID3                              = 1;
    k.ID3V20                           = 2;
    k.ID3V23                           = 3;
    k.ID3V30                           = 4;
    k.ID3V40                           = 5;
    k.RAW                              = 6;
    k.MPEG                             = 7;
    k.Commercial                       = 8;
    k.Compilation                      = 9;
    k.BufferSize                       = 10;
    k.PlayCounter                      = 11;
    k.Comments                         = 12;
    k.AudioEncryption                  = 13;
    k.EncryptedMeta                    = 14;
    k.EventTimingCodes                 = 15;
    k.Equalization                     = 16;
    k.GeneralEncapsulatedObject        = 17;
    k.GroupIdentificationRegistration  = 18;
    k.InvolvedPeople                   = 19;
    k.InvolvedPeopleList               = 20;
    k.MusicianCreditsList              = 21;
    k.Mood                             = 22;
    k.LinkedInfo                       = 23;
    k.MusicCDIdentifier                = 24;
    k.MPEGtable                        = 25;
    k.MPEGLocationLookupTable          = 26;
    k.Ownership                        = 27;
    k.PositionSynchronization          = 28;
    k.Private                          = 29;
    k.Picture                          = 30;
    k.AttachedPicture                  = 31;
    k.Popularimeter                    = 32;
    k.Reverb                           = 33;
    k.VolumeAdj                        = 34;
    k.SyncedText                       = 35;
    k.SyncedTempo                      = 36;
    k.Title                            = 37;
    k.BeatsPerMinute                   = 38;
    k.Composer                         = 39;
    k.ContentType                      = 40;
    k.CopyrightMessage                 = 41;
    k.Date                             = 42;
    k.PlaylistDelay                    = 43;
    k.EncodedBy                        = 44;
    k.FileType                         = 45;
    k.FileLicense                      = 46;
    k.Time                             = 47;
    k.InitialKey                       = 48;
    k.Languages                        = 49;
    k.Length                           = 50;
    k.MediaType                        = 51;
    k.ProducedNotice                   = 52;
    k.OriginalArtist                   = 53;
    k.Originalfilename                 = 54;
    k.OriginalWriter                   = 55;
    k.AlbumSortOrder                   = 56;
    k.PerformerSortOrder               = 57;
    k.TitleSortOrder                   = 58;
    k.OriginalReleaseYear              = 59;
    k.OriginalReleaseTime              = 60;
    k.OriginalTitle                    = 61;
    k.RadioStationOwner                = 62;
    k.LeadArtist                       = 63;
    k.Accompaniment                    = 64;
    k.Conductor                        = 65;
    k.PerformerRefinement              = 66;
    k.ModifiedBy                       = 67;
    k.PartOfaSet                       = 68;
    k.Publisher                        = 69;
    k.ISRC                             = 70;
    k.RecordingDates                   = 71;
    k.RecordingTime                    = 72;
    k.TaggingTime                      = 73;
    k.TrackNumber                      = 74;
    k.ReleaseTime                      = 75;
    k.SetNumber                        = 76;
    k.Size                             = 77;
    k.EncodingTime                     = 78;
    k.EncodingParams                   = 79;
    k.ContentGroupDescription          = 80;
    k.TitleDescription                 = 81;
    k.SubTitleDescription              = 82;
    k.SetSubTitle                      = 83;
    k.Writer                           = 84;
    k.UserDefined                      = 85;
    k.Year                             = 86;
    k.UniqueFileID                     = 87;
    k.UnSynchronizedTranscription      = 88;
    k.OfficialFileWebpage              = 89;
    k.OfficialArtistWebpage            = 90;
    k.OfficialAudioSourceWebpage       = 91;
    k.CommericalInfo                   = 92;
    k.CopyrightInfo                    = 93;
    k.PublishersOfficialWebpage        = 94;
    k.StationURL                       = 95;
    k.URL                              = 96;
    k.UserDefinedURL                   = 97;
    k.PaymentURL                       = 98;
    k.UserDefinedTextInformation       = 99;
    k.TextWriter                       = 100;
    k.PodcastKeywords                  = 101;
    k.Podcast                          = 102;
    k.PodcastDescription               = 103;
    k.PodcastFeed                      = 104;
    k.PodcastID                        = 105;
    return k;
  },
  createScreen : function(){
    if (this.Screen!=null) return this.Screen;
    var _sc=this.Screen=coAppScreens.createScreen(
      coVDM.VDM,
      "Music",
      "System",
      coLang.Table.Apps.Music.Name,
      coLang.Table.Apps.Music.Title,
      coTheme.Icons.Music.Main
    );
    // Screen,Slides,Owner,Parent,Align
    _sc.Unit=this;
    _sc.Player=null;
    _sc.AllowFullScreen=true;
    _sc.SaveGeometry=true;
    _sc.ViewMode=this.vmComplex;

    _sc.Position=coApp.Position.TopLeft;
    _sc.Description=coLang.Table.Apps.Music.Description;
    _sc.onShow=function(){
      var sc=this;
      var qr=coMusic.App.Components.Search.qrListGenre;
      if (qr.Query.Loaded!=true)
        qr.Query.Execute();
      var qr=coMusic.App.Components.Search.qrListGroup;
      if (qr.Query.Loaded!=true)
        qr.Query.Execute();
      var qr=coMusic.App.Components.Search.qrListAlbum;
      if (qr.Query.Loaded!=true)
        qr.Query.Execute();

      if (sc.DB.MyNetworks.Loaded!=true)
        sc.DB.Commands.ListMyNetworks();

      if (sc.DB.Connections.Loaded!=true)
        sc.DB.Commands.ListConnections();

      if (sc.DB.Folders.Loaded!=true)
        sc.DB.LoadFolders();

      sc.setSearch(sc.Manifest.MAP.SearchIndex.Value);
      sc.setViewMode(sc.Manifest.MAP.ViewMode.Value);
    };

    _sc.onManifestUpdated=function(col){

    };
    _sc.setViewMode=function(idx){
      var sc=this;
      switch(idx){
        case (sc.Unit.vmComplete) :
          sc.Unit.App.Components.Views.SwitchToComplex(sc);
          break;
        case (sc.Unit.vmSimple) :
          sc.Unit.App.Components.Views.SwitchToSimple(sc);
          break;
      };
    };
    _sc.setSearch=function(idx){
      var sc=this;
      var tb=sc.RightView.Toolbar;
      tb.Options.Loading=true;
      tb.Options.Search.Container.selectedIndex=idx;
      sc.Manifest.MAP.SearchIndex.Value=idx;
      coVDM.Manifest.Save();
      switch (idx){
        case (sc.Unit.srchText) :
          tb.Options.Artists.Conseal();
          tb.Options.Albums.Conseal();
          tb.Options.Genre.Conseal();

          tb.Options.Query.Hidden=false;
          tb.Options.Query.Show();
          break;
        case (sc.Unit.srchArtist) :
          tb.Options.Genre.Conseal();
          tb.Options.Query.Conseal();
          tb.Options.Albums.Conseal();

          tb.Options.Artists.Hidden=false;
          tb.Options.Artists.Show();
          break;
        case (sc.Unit.srchAlbum) :
          tb.Options.Genre.Conseal();
          tb.Options.Query.Conseal();
          tb.Options.Artists.Conseal();

          tb.Options.Albums.Hidden=false;
          tb.Options.Albums.Show();
          break;
        case (sc.Unit.srchGenre) :
          tb.Options.Query.Conseal();
          tb.Options.Artists.Conseal();
          tb.Options.Albums.Conseal();

          tb.Options.Genre.Hidden=false;
          tb.Options.Genre.Show();
          break;
      };
      tb.Options.Loading=false;
    };
    _sc.Mode=_sc.Unit.modeSpectrum;

    _sc.Search=function(sTerm){
      var sc=this;
      var qr=coMusic.App.Components.Search.qrByTags;
      qr.Query.MAP.Term.Value=qr.Query.MAP.Term.Default+"="+sTerm;
      qr.Term=sTerm;
      qr.Query.Execute();
    };
    _sc.DB=_sc.Unit.App.Components.DB.createDB(_sc);

    _sc.LeftView=_sc.Unit.App.Components.Views.CreatePlayListWithTree(_sc);
    _sc.Splitter=_sc.Unit.App.Components.Splitter.Create(_sc);
    _sc.RightView=_sc.Unit.App.Components.Views.CreateStackedListView(_sc);
    _sc.Splitter.targetLeft=_sc.LeftView;
    _sc.Splitter.targetRight=_sc.RightView;
    _sc.Uploader=_sc.Unit.App.Components.Uploader.Create(_sc);
    _sc.RightView.ListView.dropFiles=_sc.Uploader;
    _sc.Switcher=_sc.Unit.App.Components.Views.CreateSwitcher(_sc);

    _sc.Nav=_sc.Unit.App.Components.Nav.Create(_sc);

    _sc.Unit.App.Components.Manifest.Install(_sc);
    return _sc;
  }
};
coVDM.App.Components.coMusic.init(coVDM.VDM);

