coMusic.App.Components.Player = {
  Version        : new Version(2015,6,2,165),
  Title          : new Title("Music Player","Player"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Player.js',coAppKit.PreLoaded),
  debugToConsole : true,
  DefaultHeight  : 75,

  PositionDelay       : 500,
  srcNone             : 0,
  srcPlayFromListView : 1,
  srcPlayList         : 2,

  Create : function(Screen,Slides,Owner,Parent,Align){
    var ply=Slides.createSlide("Player","sldMusicPlayer",Screen,Owner,Parent,coAppUI.Alignment.Top);

    ply.Unit=this;
    ply.Index=-1;
    ply.Repeat=false;
    ply.Audio=null;
    ply.Source=ply.Unit.srcNone;
    ply.getCurrentByteCount=function(){
      var ply=this;
      if (ply.Audio.webkitAudioDecodedByteCount) {
          ply.getCurrentByteCount=function(){
            return ply.Audio.webkitAudioDecodedByteCount;
          };

      };
      return 0;
    };
    ply.clearContainerClass();
    ply.Container.style.backgroundColor=coTheme.UI.Toolbar.Background.Color.toString();

    ply.Cover=ply.Slides.createSlide("Cover","sldCover",Screen,ply,ply.Container,coAppUI.Alignment.Left);
    ply.Cover.Container.className="sldCover";
    ply.Cover.Glyph=document.createElement('div');
    ply.Cover.Container.appendChild(ply.Cover.Glyph);
    ply.Cover.Glyph.className="musicGlyph";
    ply.Cover.Glyph.style.borderColor=coTheme.UI.Toolbar.Item.Border.Color.Idle.toString();
    ply.Cover.Glyph.style.backgroundImage="url("+coTheme.Icons.Music.Main+")";

    ply.Details=ply.Slides.createSlide("Details","sldDetails",Screen,ply,ply.Container,coAppUI.Alignment.Client);
    ply.Details.Container.className="sldDetails";
    ply.Details.Container.style.color=coTheme.UI.Toolbar.Item.Text.Color.toString();
    coTheme.UI.Toolbar.Item.Text.Shadow.Idle.Apply(ply.Details.Container);

    ply.Controls=ply.Slides.createSlide("Controls","sldControls",Screen,ply,ply.Container,coAppUI.Alignment.Right);
    ply.Controls.Container.className="sldControls";

    ply.Controls.Button=ply.Controls.Slides.createSlide("Button","sldControl",Screen,ply.Controls,ply.Controls.Container,coAppUI.Alignment.Client);
    ply.Controls.Button.Container.className="sldControl";

    var div=ply.Controls.Glyph=document.createElement('div');
    ply.Controls.Button.Container.appendChild(div);
    div.className="musicControlIcon";
    div.style.backgroundImage="url("+coTheme.Icons.Music.Play+")";
    div.title=coLang.Table.Apps.Music.Hints.Play;

    ply.Details.Song=ply.Details.Slides.createSlide("Song","sldSong",Screen,ply.Details,ply.Details.Container,coAppUI.Alignment.Top);
    ply.Details.Song.Container.className="sldSong";
    ply.Details.Artist=ply.Details.Slides.createSlide("Artist","sldArtist",Screen,ply.Details,ply.Details.Container,coAppUI.Alignment.Top);
    ply.Details.Artist.Container.className="sldArtist";

    ply.Details.Album=ply.Details.Slides.createSlide("Artist","sldAlbum",Screen,ply.Details,ply.Details.Container,coAppUI.Alignment.Top);
    ply.Details.Album.Container.className="sldAlbum";

    var pb=ply.Details.Progress=ply.Details.Slides.createSlide("Progress","sldProgress",Screen,ply.Details,ply.Details.Container,coAppUI.Alignment.Top);
    pb.Container.className="sldProgress";
    pb.Wrapper=document.createElement('div');
    pb.Container.appendChild(pb.Wrapper);
    pb.Wrapper.className="pbWrapper";
    pb.Wrapper.style.borderColor=coTheme.UI.Toolbar.Item.Border.Color.Idle.toString();

    pb.Filler=document.createElement('div');
    pb.Container.appendChild(pb.Filler);
    pb.Filler.className="pbFiller";

    pb.Position=document.createElement('div');
    pb.Container.appendChild(pb.Position);
    pb.Position.className="pbPosition";
    pb.buttonWidth=pb.Position.offsetWidth;
    pb.buttonOffset=pb.buttonWidth/2;
    pb.Value=0;

    ply.Details.Progress.onSetSize=function(){
      var pb=this;
      var ply=pb.Owner.Owner;
      ply.onProgress();
    };
    ply.setFile=function(dbFile){
      var ply=this;
      if (ply.Unit.debugToConsole==true)
        coVDM.Console.Append('coMusic.Player.setFile (data)');
      try{
        ply.DataSet=dbFile;
        ply.Controls.Glyph.style.backgroundImage="url("+coTheme.Icons.Music.Play+")";
        ply.Controls.Glyph.title=coLang.Table.Apps.Music.Hints.Play;
        coDOM.setText(ply.Details.Song.Container,dbFile.MAP.Song.Value);
        coDOM.setText(ply.Details.Artist.Container,dbFile.MAP.Artist.Value);
        coDOM.setText(ply.Details.Album.Container,dbFile.MAP.Album.Value);
        if (dbFile.MAP.NetworkID.Value==0){
          var sURL=coVDM.URI_FILE_STREAM.replace("$auth",coVDM.Credentials.Auth).replace("$id",dbFile.MAP.ID.Value);
        } else {
          var sURL=coSocial.URI_FILE_STREAM.replace("$auth",coVDM.Credentials.Auth).replace("$id",dbFile.MAP.ID.Value);
          sURL=sURL.replace("$nid",dbFile.MAP.NetworkID.Value);
          sURL=sURL.replace("$fid",dbFile.MAP.FolderID.Value);
        };
        if (ply.Unit.debugToConsole==true)
          coVDM.Console.Append('coMusic.Player.setFile:'+sURL);
        ply.Details.Progress.Filler.style.visibility="visible";

        //if (ply.Audio)
        //  ply.releaseAudio();
        //ply.Audio=ply.createAudio();

        ply.Audio.repeat=true;
        ply.Audio.loop=true;
        ply.Audio.src=sURL;
        ply.Audio.load();
        //ply.Audio.play();
        ply.onProgress();
      } catch(err){
        coVDM.Console.Exception(err,false);
      };
    };

    ply.AdjustPosition=function(){
      var ply=this;
      var pb=ply.Details.Progress;
      var iLeft=0;
      if (ply.Audio){
        var secLeft=(ply.Audio.duration-ply.Audio.currentTime);
        var ratio=ply.Audio.currentTime/ply.Audio.duration;
        iLeft=Math.max(0,(pb.Wrapper.clientWidth*ratio)-pb.buttonOffset);
        iLeft=Math.min(iLeft,pb.Wrapper.clientWidth-pb.buttonOffset);
      };
      pb.Position.style.left=iLeft+"px";
    };

    ply.setRepeat=function(value){
      var ply=this;
      ply.Repeat=(value==true);
    };
    ply.getRepeat=function(){
      return (this.Repeat==true);
    };
    ply.Seek=function(pctPosition){
      var ply=this;
      if (ply.Unit.debugToConsole==true)
        coVDM.Console.Append("coMusic.Player.Seek "+pctPosition*100+"%");
      ply.Audio.currentTime=pctPosition*ply.Audio.duration;
    };
    ply.onPlay=function(){
      var ply=this;
      var sc=ply.Screen;
      var pb=ply.Details.Progress;
      ply.Audio.repeat=false;
      ply.Audio.loop=false;

      pb.Value=ply.getCurrentByteCount();
      pb.Filler.style.visibility="visible";
      ply.Controls.Glyph.style.backgroundImage="url("+coTheme.Icons.Music.Stop+")";
      ply.Controls.Glyph.title=coLang.Table.Apps.Music.Hints.Stop;
      ply.AdjustPosition();
      ply.onProgress();
      ply.tmrPosition.setActive(true);

      var sStatus=coLang.Table.Apps.Music.Status.Play;
      sStatus=sStatus.replace("$song",ply.DataSet.MAP.Song.Value);
      sStatus=sStatus.replace("$artist",ply.DataSet.MAP.Artist.Value);
      sc.setStatus(sStatus);
    };
    ply.onPause=function(){
      var ply=this;
      ply.tmrPosition.setActive(false);
      var sc=ply.Screen;
      if (ply.Audio.ended==false) {
        var sStatus=coLang.Table.Apps.Music.Status.Pause;
        sStatus=sStatus.replace("$song",ply.DataSet.MAP.Song.Value);
        sStatus=sStatus.replace("$artist",ply.DataSet.MAP.Artist.Value);
        sc.setStatus(sStatus);

        ply.Controls.Glyph.style.backgroundImage="url("+coTheme.Icons.Music.Play+")";
        ply.Controls.Glyph.title=coLang.Table.Apps.Music.Hints.Play;
      };
    };
    ply.onStop=function(){
      ply.Controls.Glyph.style.backgroundImage="url("+coTheme.Icons.Music.Play+")";
      ply.Controls.Glyph.title=coLang.Table.Apps.Music.Hints.Play;
    };
    ply.onEnded=function(){
      var ply=this;
      var sc=ply.Screen;
      ply.tmrPosition.setActive(false);
      pb.Value=0;
      ply.Controls.Glyph.style.backgroundImage="url("+coTheme.Icons.Music.Play+")";
      ply.Controls.Glyph.title=coLang.Table.Apps.Music.Hints.Play;
      var sStatus=coLang.Table.Apps.Music.Status.Stop;
      sStatus=sStatus.replace("$song",ply.DataSet.MAP.Song.Value);
      sStatus=sStatus.replace("$artist",ply.DataSet.MAP.Artist.Value);
      sc.setStatus(sStatus);
      switch (ply.Source) {
        case (ply.Unit.srcNone):
          if (ply.Repeat==true) {
            ply.Audio.play();
          } else {
            ply.Index=-1;
            //ply.releaseAudio();
            ply.AdjustPosition();
            ply.onProgress();
          };
          break;
        case (ply.Unit.srcPlayFromListView) :
          ply.Index+=1;
          var itms=ply.Screen.RightView.ListView.Items;
          if (ply.Index<itms.length) {
            ply.setFile(itms[ply.Index].Data);
          } else if (ply.Repeat==true) {
            ply.Index=0;
            ply.setFile(itms[ply.Index].Data);
          } else {
            ply.Index=-1;
            //ply.releaseAudio();
            ply.AdjustPosition();
            ply.onProgress();
          };
          break;
        case (ply.Unit.srcPlayList) :
          // todo
          break;
      };
    };
    ply.onCanPlay=function(){
      var ply=this;
      if (ply.Unit.debugToConsole==true)
        coVDM.Console.Append('coMusic.Player.onCanPlay (Audio.play)');
      ply.Audio.play();
    };
    ply.onTimeUpdate=function(){
      var ply=this;
    };
    ply.onVolumeChange=function(){
      var ply=this;
    }
    ply.onControl=function(){
      var ply=this;
      if (ply.Unit.debugToConsole==true)
        coVDM.Console.Append("coMusic.Player.onControl");
      try {
        if (ply.Audio.paused==true) {
          ply.Audio.play();
        }  else {
          ply.Audio.pause();
        };
      } catch(err){
        coVDM.Console.Exception(err,false);
      };
    };
    ply.onProgress=function(e){
      var ply=this;
      var iWidth=0;
      var pb=ply.Details.Progress;
      if ( (ply.Audio) && (typeof(ply.Audio.buffered)!=undefined)) {
        try{

          var buf=ply.Audio.buffered;
          if (buf){
            pb.Value= (buf.length>0) ? buf.end(buf.length-1) : 0;
            var pct=pb.Value/ply.Audio.duration;
            var iWidth=Math.floor(pb.Wrapper.clientWidth*pct);
            if (iWidth==undefined) iWidth=0;
          };
        } catch(err){
          coVDM.Console.Exception(err,false);
        };
      };
      pb.Filler.style.width=iWidth+"px";
    };
    ply.onError=function(e){
      var ply=this;
      coVDM.Console.Append("coMusic.Player.onError (Stopping)");
      ply.Stop();
      ply.Controls.Glyph.style.backgroundImage="url("+coTheme.Icons.Music.Error+")";
    };
    ply.onMouseSeek=function(e){
      var ply=this;
      if (ply.DataSet){
        var sc=ply.Screen;
        var pb=ply.Details.Progress;
        if (e==undefined) e=window.event;
        var src=coDOM.target(e);
        iOffset=sc.ClientToScreen(src);
        if (coDOM.getButton(e)==1) {
          ply.Seek((e.clientX-iOffset)/pb.Wrapper.clientWidth);
          coDOM.preventDefault(e);
        };
      };
    };
    ply.onTouchSeek=function(e){
      var ply=this;
      var touch=e.targetTouches[e.targetTouches.length-1];
      if (ply.Unit.debugToConsole==true)
        coVDM.Console.Append("coMusic.Player.onTouchSeek touch.clientX="+touch.clientX+" touch.pageX="+touch.pageX);
      coDOM.preventDefault(e);
      if (ply.Audio) {
        try {
          var pb=ply.Details.Progress;
          if (e==undefined) e=window.event;
          var iOffset=ply.Screen.ClientToScreen(pb.Wrapper);
          var fRatio=(touch.clientX-iOffset)/pb.Wrapper.offsetWidth;
          if (fRatio<=1) {
            ply.Seek(fRatio);
          } else {
            if (ply.Unit.debugToConsole==true)
              coVDM.Console.Append("coMusic.Player.onTouchSeek ratio "+fRatio);
          };
        } catch(err){
          coVDM.Console.Exception("coMusic.Player.onTouchSeek "+err,false);
        };
      } else{
        ply.AdjustPosition();
        ply.onProgress();
      };
    };
    ply.createAudio=function(){
      var ply=this;
      var Audio=document.createElement('audio');
      document.body.appendChild(Audio);
      Audio.className="audioPlayer";
      Audio.autoplay=true;
      Audio.controls="controls";
      Audio.setAttribute('x-webkit-airplay','allow');
      
      Audio.style.opacity=0;

      Audio.evtVolumeChange=coEvents.Add(Audio,"volumechange",function(e){ ply.onVolumeChange(e);},coEvents.Capture,coEvents.Active);
      Audio.evtTimeUpdate=coEvents.Add(Audio,"timeupdate",function(e){ ply.onTimeUpdate(e);},coEvents.Capture,coEvents.NoActivate);
      Audio.evtCanPlay=coEvents.Add(Audio,"canplay",function(e){ ply.onCanPlay(e);},coEvents.Capture,coEvents.Active);
      Audio.evtPlay=coEvents.Add(Audio,"play",function(e){ ply.onPlay(e);},coEvents.Capture,coEvents.Active);
      Audio.evtPause=coEvents.Add(Audio,"pause",function(e){ ply.onPause(e);},coEvents.Capture,coEvents.Active);
      Audio.evtEnd=coEvents.Add(Audio,"ended",function(e){ ply.onEnded(e);},coEvents.Capture,coEvents.Active);
      Audio.evtProgress=coEvents.Add(Audio,"progress",function(e){ ply.onProgress(e);},coEvents.Capture,coEvents.Active);
      Audio.evtError=coEvents.Add(Audio,"error",function(e){ ply.onError(e);},coEvents.Capture,coEvents.Active);

      return Audio;
    };
    ply.releaseAudio=function(){
      var ply=this;
      if (ply.Audio){
        ply.Audio.EventList.Free();
        document.body.removeChild(ply.Audio);
        ply.onStop();
      };
      ply.AdjustPosition();
      ply.onProgress();
      ply.Audio=null;
    };

    ply.evtMouseSeek=coEvents.Add(ply.Details.Progress.Wrapper,"mousedown",function(e){ ply.onMouseSeek(e);},coEvents.Capture,coEvents.Active);
    ply.evtTouchSeek=coEvents.Add(ply.Details.Progress.Wrapper,"touchstart",function(e){ ply.onTouchSeek(e);},coEvents.Capture,coEvents.Active);
    ply.evtImgClick=coEvents.Add(ply.Controls.Glyph,"click",function(e){ ply.onControl(e);},coEvents.Capture,coEvents.Active);

    ply.tmrPosition=coApp.Timers.createItem(this.PositionDelay);
    ply.tmrPosition.Owner=ply;
    ply.tmrPosition.onExecute=function(){
      this.Owner.AdjustPosition();
    };
    ply.Audio=ply.createAudio();
    ply.getCurrentByteCount();
    //ply.releaseAudio();

    ply.onShow=function(){
      var ply=this;
      ply.Container.style.height=ply.Screen.Manifest.MAP.PlayerHeight.Value+"px";
      ply.Details.Progress.Filler.style.visibility="visible";
    };
    ply.onHide=function(){
      this.Details.Progress.Filler.style.visibility="hidden";
    };
    ply.Stop=function(){
      var ply=this;
      try {
        ply.Source=ply.Unit.srcNone;
      } catch(err){
        coVDM.Console.Exception(err,false);
      };
    };
    ply.PlayFromListView=function(idx){
      if (idx==undefined) idx=0;
      var ply=this;
      var sc=ply.Screen;
      ply.Source=ply.Unit.srcPlayFromListView;
      ply.Index=idx;
      var itms=sc.RightView.ListView.Items;
      if (ply.Index<itms.length) ply.setFile(itms[ply.Index].Data);
    };

    return ply;
  }
};

