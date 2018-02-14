coMusic.App.Components.Manifest = {
  Version        : new Version(2013,5,18,27),
  Title          : new Title("Music Manifest","Manifest"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Manifest.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Install : function (Screen){
    var sc=Screen;
    var flds=Screen.Manifest;
    flds.addField("LeftViewWidth",coDB.Kind.Integer,"left-view-width",coVDM.ListBoxWidth,coDB.StreamOn);
    flds.addField("PlayerHeight",coDB.Kind.Integer,"player-height",coVDM.App.Components.coMusic.App.Components.Player.DefaultHeight,coDB.StreamOn);
    flds.addField("PlayListHeight",coDB.Kind.Integer,"playlist-height",coVDM.App.Components.coMusic.App.Components.PlayLists.DefaultHeight,coDB.StreamOn);

    flds.addField("PlayLists",coDB.Kind.Boolean,"playlists",false,coDB.StreamOn);
    flds.addField("ViewMode",coDB.Kind.Integer,"view-mode",(coVDM.Display.Small==true)? sc.Unit.vmSimple : sc.Unit.vmComplete,coDB.StreamOn);

    flds.addField("SearchIndex",coDB.Kind.Integer,"search-index",1,coDB.StreamOn);

    flds.addField("ArtistIndex",coDB.Kind.Integer,"artist-index",-1,coDB.StreamOn);
    flds.addField("AlbumIndex",coDB.Kind.Integer,"album-index",-1,coDB.StreamOn);
    flds.addField("GenreIndex",coDB.Kind.Integer,"genre-index",1,coDB.StreamOn);

    return flds;
  }
};

