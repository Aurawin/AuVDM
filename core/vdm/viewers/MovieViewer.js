var MovieViewer=coVDM.App.Components.MovieViewer = {
  Version      : new Version(2014,8,20,55),
  Title        : new Title("Aurawin Movie Viewer","MovieViewer"),
  Vendor       : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/viewers/MovieViewer.js',coAppKit.PreLoaded),
  debugToConsole : true,
  movieExts    : null,
  textExts     : null,
  imageOpener  : null,
  textOpener   : null,
  imgTransition : "opacity 0.25s linear, visibility 0.25s linear",
  toolbarTransition : "opacity 0.125s linear",
  resetScaleDelay : 250,
  hideToolbarDelay : 3000,
  ToolbarHeight  : 54,

  init : function(){
    var exts=this.movieExts=coList.StringArray();
    exts.Add("flv");
    exts.Add("m4v");
    exts.Add("mov");
    exts.Add("mp4");
    exts.Add("webm");

    this.movieOpener=coRegistry.Items.createItem(
      exts,
      function(aItem,Folder,Files,File){
        if (aItem.Screen==null)
          aItem.Screen=MovieViewer.Create();
        aItem.Screen.Show();
        aItem.Screen.Open(Folder,Files,File);
        return aItem;
      }
    );
  },
  Create : function(){
    var vw=coAppScreens.createScreen(
      coVDM.VDM,
      "MovieViewer",
      coLang.Table.Groups.Main.Name,
      coLang.Table.Apps.MovieViewer.Name,
      coLang.Table.Apps.MovieViewer.Title,
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Framed,
      "bdrFrame",
      "bdrMovieViewer",
      "bdrFilm"
    );
    vw.SaveGeometry=true;
    vw.AllowFullScreen=true;
    vw.iconInApplications=false;
    vw.DataSet=null;
    vw.Folder=null;
    vw.Files=null;
    vw.FileIndex=-1;
    vw.ContentType=null;
    vw.ConsealAfterCreate=false;
    vw.FileIndex=-1;
    vw.Open=function(Folder,Files,File){
      var vw=this;
      if (MovieViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("MovieViewer.Open");

      vw.Toolbar.Show();
      vw.Folder=Folder;
      vw.Files=Files;
      vw.FileIndex=Files.Items.indexOf(File);
      vw.Read(File);
      vw.setSize();
    };
    vw.renewToolbar=function(){
      var vw=this;

      vw.Toolbar.Container.style.opacity=1;
      vw.tmrToolbarHide.setActive(true);
    };
    vw.Read=function(itmFile) {
      var vw=this;

      if (MovieViewer.debugToConsole==true) coVDM.VDM.Console.Append("MovieViewer.Read");

      vw.Frame.setCaption(coLang.Table.Apps.MovieViewer.Title+coLang.Table.Apps.Seperator.Param+itmFile.MAP.Name.Value);

      var sExt=coUtils.extractFileExt(itmFile.MAP.Name.Value);

      vw.ContentType=coContentType.getContentType(sExt);
      if ((vw.ContentType==null) || (vw.ContentType.Kind!=coContentType.fkVideo)) {
        if (MovieViewer.debugToConsole==true)
          coVDM.VDM.Console.Append("MovieViewer.Read ("+sExt+" not registered)");
        return;
      };

      var sStatus=coLang.Table.Status.Viewer.Movie.Loading;
      sStatus=sStatus.replace("$Path",vw.Folder.MAP.Path.Value);
      sStatus=sStatus.replace("$Name",itmFile.MAP.Name.Value);
      vw.setStatus(sStatus);
      var sURL=vw.Files.streamURL(itmFile);
      vw.Toolbar.Buttons.Play.Icon.style.backgroundImage="url("+coTheme.Masks.Start+")";
      vw.Panels.Movie.Load(sURL);
    };
    vw.doStop=function(){
      var vw=this;
      vw.Playing=false;
      vw.Toolbar.Buttons.Play.Icon.style.backgroundImage="url("+coTheme.Masks.Start+")";
      if (vw.Visible==true) {
        vw.renewToolbar();
        vw.Frame.TitleBar.Show();
        vw.Toolbar.Show();

        vw.setSize();
      };
    };
    vw.doPause=function(){
      var vw=this;
      vw.Playing=false;
      vw.Toolbar.Buttons.Play.Icon.style.backgroundImage="url("+coTheme.Masks.Start+")";
      if (vw.Visible==true) {
        vw.renewToolbar();
        vw.Frame.TitleBar.Show();
        vw.Toolbar.Show();
        vw.setSize();
      };
    };
    vw.doPlay=function(){
      var vw=this;
      vw.Toolbar.Buttons.Play.Icon.style.backgroundImage="url("+coTheme.Masks.Pause+")";
      vw.Playing=true;
    };
    vw.Stop=function(){
      var vw=this;
      vw.Panels.Movie.Stop();
      vw.doStop();
      vw.Toolbar.Show();
      vw.setSize();
    };
    vw.Play=function(){
      var vw=this;
      vw.Toolbar.Show();
      vw.Panels.Movie.Play();
      vw.setSize();
    };
    vw.Previous=function(){
      var vw=this;
      vw.renewToolbar();
      var itmFile=vw.getPreviousFile(vw.FileIndex,true);
      if (itmFile) {
        vw.Read(itmFile);
      };
    };
    vw.Next=function(){
      var vw=this;
      vw.renewToolbar();
      var itmFile=vw.getNextFile(vw.FileIndex,true);
      if (itmFile) {
        vw.Read(itmFile);
      };
    };
    vw.onHide=function(){
      var vw=this;
      vw.Stop();
      vw.Toolbar.Hide();
    };
    vw.onShow=function(){
      var vw=this;
      vw.Toolbar.Show();
    };
    vw.getPreviousFile=function(Index,setIndex){
      if (setIndex==undefined) setIndex=false;
      var vw=this;
      var exts=coVDM.App.Components.MovieViewer.movieExts;
      var iCt=vw.Files.Items.length;

      if (iCt==0) return null;
      var iLoop=0;

      var idx=Index;
      while (idx<iCt) {
        idx-=1;
        if (idx<0){
          if (iLoop>0) return null;
          idx=iCt-1;
          iLoop=1;
        };
        var itmFile=vw.Files.Items[idx];
        var sExt=coUtils.extractFileExt(itmFile.MAP.Name.Value).toLowerCase();
        vw.ContentType=coContentType.getContentType(sExt);
        if ((vw.ContentType!=null) && (vw.ContentType.Kind==coContentType.fkVideo) && (exts.indexOf(sExt)!=-1) ) {
          if (setIndex==true) vw.FileIndex=idx;
          return itmFile;
        };
      };
    };
    vw.getNextFile=function(Index,setIndex){
      if (setIndex==undefined) setIndex=false;
      var exts=coVDM.App.Components.MovieViewer.movieExts;
      var vw=this;
      var iCt=vw.Files.Items.length;

      if (iCt==0) return null;
      var iLoop=0;

      var idx=Index;
      while (idx>-1) {
        idx+=1;
        if (idx>iCt-1){
          if (iLoop>0) return null;
          idx=0;
          iLoop=1;
        };
        var itmFile=vw.Files.Items[idx];
        var sExt=coUtils.extractFileExt(itmFile.MAP.Name.Value).toLowerCase();
        vw.ContentType=coContentType.getContentType(sExt);
        if ((vw.ContentType!=null) && (vw.ContentType.Kind==coContentType.fkVideo) && (exts.indexOf(sExt)!=-1) ) {
          if (setIndex==true) vw.FileIndex=idx;
          return itmFile;
        };
      };
    };
    vw.Description=coLang.Table.Apps.MovieViewer.Description;

    vw.tmrToolbarHide=coApp.Timers.createItem(MovieViewer.hideToolbarDelay);
    vw.tmrToolbarHide.Owner=vw;
    vw.tmrToolbarHide.onExecute=function(tmr){
      var vw=tmr.Owner;
      vw.Toolbar.Container.style.opacity=0;
    };
    var tb=vw.Toolbar=coAppUI.App.Components.Toolbar.Create("imageToolbar","imageToolbar",vw,vw.Slides,vw.Frame,vw.Frame.Client,coAppUI.Alignment.Center);
    tb.Container.className="imageToolbar imageToolbarGradient";
    tb.Mode.setValue(tb.Mode.captionNone);
    tb.setHeights(MovieViewer.ToolbarHeight,MovieViewer.ToolbarHeight);

    tb.Buttons.Previous=tb.createButton(coLang.Table.Buttons.Previous,coTheme.Masks.Previous);
    tb.Buttons.Previous.View=vw;
    tb.Buttons.Previous.onClick=function(btn){
      var vw=btn.View;
      vw.Previous();
    };
    tb.Buttons.Sep1=tb.createSeperator();
    tb.Buttons.Play=tb.createButton(coLang.Table.Buttons.Play,coTheme.Masks.Start);
    tb.Buttons.Play.View=vw;
    tb.Buttons.Play.onClick=function(btn){
      var vw=btn.View;
      if (vw.Playing==true){
        vw.Stop();
      } else {
        vw.Play();
      };
    };
    tb.Buttons.Sep2=tb.createSeperator();
    tb.Buttons.Next=tb.createButton(coLang.Table.Buttons.Next,coTheme.Masks.Next);
    tb.Buttons.Next.View=vw;
    tb.Buttons.Next.onClick=function(btn){
      var vw=btn.View;
      vw.Next();
    };
    vw.Panels=coAppUI.App.Components.Panels.Create("Viewer","pnlClient pnlBackground",vw.Frame,vw,vw.Frame.Client,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);
    vw.Panels.Container.onmousemove=function(e){
      if (e==undefined) e=window.event;
      coDOM.preventDefault(e);
      var elm=coDOM.currentTarget(e);
      var vw=elm.Owner.Owner;
      if (!vw.Toolbar.Transition){
        vw.Toolbar.setTransition(MovieViewer.toolbarTransition);
        vw.Toolbar.Transition=true;
      };
      vw.Toolbar.Container.style.opacity=1;
      vw.tmrToolbarHide.setActive(true);
    };
    vw.Panels.Movie=vw.Panels.createItem("",vw.Panels.Kind.Movie,"Movie","pnlMovieViewerMovie",coAppUI.Alignment.Client);
    vw.Panels.Movie.Viewer=vw;
    vw.Panels.Movie.onPlay=function(){
      var vw=this.Owner.Screen;
      vw.doPlay();
    };
    vw.Panels.Movie.onPaused=function(){
      var vw=this.Owner.Screen;
      vw.doPause();
    };
    vw.Panels.Movie.onEnded=function(){
      var vw=this.Owner.Screen;
      vw.doStop();
    };

    return vw;
  }
};
coVDM.App.Components.MovieViewer.init();
