coMusic.App.Components.Summary = {
  Version        : new Version(2013,5,18,10),
  Title          : new Title("Music Summary","Summary"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Summary.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Screen         : null,
  Create : function(Screen,Switcher){
    this.Screen=Screen;


    var gps=Switcher.Slides.createSlide("Summary","sldClient",Screen,Switcher,Switcher.Container,coAppUI.Alignment.Client);
    gps.Unit=this;

    gps.viewAritsts=true;
    gps.viewAlbums=true;
    gps.viewGenres=true;

    gps.Artists=coAppUI.App.Components.ListView.Create("Artists","ListView",Screen,gps.Slides,gps,gps.Container,coAppUI.Alignment.Left);
    gps.Artists.DataSet=coMusic.App.Components.DB.createArtists(gps);
    gps.Artists.Header.Columns.addItem(gps.Artists.DataSet.Fields.MAP.Artist);

    gps.Albums=coAppUI.App.Components.ListView.Create("Albums","ListView",Screen,gps.Slides,gps,gps.Container,coAppUI.Alignment.Left);
    gps.Albums.DataSet=coMusic.App.Components.DB.createAlbums(gps);
    gps.Albums.Header.Columns.addItem(gps.Albums.DataSet.Fields.MAP.Album);

    gps.Genres=coAppUI.App.Components.ListView.Create("Genres","ListView",Screen,gps.Slides,gps,gps.Container,coAppUI.Alignment.Left);
    gps.Genres.DataSet=coMusic.App.Components.DB.createGenres(gps);
    gps.Genres.Header.Columns.addItem(gps.Genres.DataSet.Fields.MAP.Genre);

    gps.onShow=function(){
      var gps=this;
      var sc=gps.Screen;
      var iCount=0;

      if (gps.viewArtists==true){
        gps.Artists.Hidden=false;
        iCount+=1;
      } else {
        gps.Artists.Conseal();
      };
      if (gps.viewAlbums==true){
        gps.Albums.Hidden=false;
        iCount+=1;
      } else {
        gps.Albums.Conseal();
      };
      if (gps.viewGenres==true){
        gps.Genres.Hidden=false;
        iCount+=1;
      } else {
        gps.Genres.Conseal();
      };
      if (gps.viewArtists==true){
        gps.Artists.Hidden=false;
        gps.Artists.Container.style.width=coMath.Trunc(gps.Container.clientWidth/iCount)+"px";
      };
      if (gps.viewAlbums==true){
        gps.Albums.Hidden=false;
        gps.Albums.Container.style.width=coMath.Trunc(gps.Container.clientWidth/iCount)+"px";
      };
      if (gps.viewGenres==true){
        gps.Genres.Hidden=false;
        gps.Genres.Container.style.width=coMath.Trunc(gps.Container.clientWidth/iCount)+"px";
      };
    };
    return gps;
  }
};

