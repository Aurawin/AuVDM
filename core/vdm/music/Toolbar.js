coVDM.App.Components.coMusic.App.Components.Toolbar = {
  Version        : new Version(2014,10,13,72),
  Title          : new Title("Music Player Toolbar","Toolbar"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Toolbar.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,Slides,Owner,Parent){
    var tb=coAppUI.App.Components.Toolbar.Create("tbFiles","Toolbar",Screen,Slides,Owner,Parent,coAppUI.Alignment.Top);
    tb.Mode.setValue(tb.Mode.captionRight);
    tb.setHeights(coVDM.ToolbarHeightThin,coVDM.ToolbarHeightThin,coTheme.UI.Toolbar.Item.Text.lineHeight);
    var btn=tb.Buttons.Play=tb.createButton('',coTheme.Icons.Music.Play);
    btn.setHint(coLang.Table.Apps.Music.Hints.PlayFromList);
    btn.AllowUp=false;
    btn.onClick=function(btn){
      var sc=btn.Owner.Screen;
      var ply=sc.Player;
      if (ply.Source==ply.Unit.srcPlayFromListView) {
        // Playing so stop
        ply.Stop();
        btn.setIcon(coTheme.Icons.Music.Play);
        btn.setHint(coLang.Table.Apps.Music.Hints.PlayFromList);
        btn.setUp();
      } else {
        btn.setHint(coLang.Table.Apps.Music.Hints.StopFromList);
        btn.setIcon(coTheme.Icons.Music.Stop);
        btn.setDown();
        var lv=sc.RightView.ListView;
        var li=lv.Items.Selected;
        var idx=(li) ? lv.Items.indexOf(li) : 0;
        ply.PlayFromListView(idx);
      };
    };
    var btn=tb.Buttons.Repeat=tb.createButton('',coTheme.Icons.Music.Repeat);
    btn.setHint(coLang.Table.Apps.Music.Hints.Repeat);
    btn.AllowUp=false;
    btn.onClick=function(btn){
      var tb=btn.Owner;
      var sc=tb.Screen;
      var ply=sc.Player;
      if (ply.Repeat==true){
        ply.setRepeat(false);
        btn.setUp();
      } else {
        ply.setRepeat(true);
        btn.setDown();
      };
      // Update Repeat
    };
    tb.Buttons.Sep1=tb.createSeperator();

    tb.Options=coObject.Create();

    tb.Options.Search=tb.createSelect();
    var elm=tb.Options.Search.Container;
    var ops=coLang.Table.Apps.Music.Search.Options;
    elm.options.length=ops.length;
    for (var iLcv=0; iLcv<ops.length; iLcv++){
      elm.options[iLcv].text=ops[iLcv];
      elm.options[iLcv].value=ops[iLcv];
    }
    elm.title=coLang.Table.Apps.Music.Search.Select;

    tb.Options.Search.onChange=function(){
      var Search=this;
      var tb=this.Owner;
      if (tb.Options.Loading==true) return;
      var sc=tb.Screen;
      sc.setSearch(Search.Container.selectedIndex);
      tb.setSize();
    };
    tb.Options.Search.getIndex=function(){
      return this.Container.options.selectedIndex;
    }
    tb.Options.Genre=tb.createSelect();
    tb.Options.Genre.Hidden=true;
    tb.Options.Genre.Container.title=coLang.Table.Apps.Music.Genre.Hints.Select;
    tb.Options.Genre.onChange=function(){
      var Genre=this;
      var tb=this.Owner;
      var sc=tb.Screen;
      var elm=Genre.Container;
      sc.Manifest.MAP.GenreIndex.Value=elm.options.selectedIndex;
      coVDM.Manifest.Save();

      var qr=coMusic.App.Components.Search.qrByGenre;
      qr.Query.MAP.Term.Value=qr.Query.MAP.Term.Default+"="+elm.options[elm.options.selectedIndex].value;
      qr.Query.Execute();
      sc.RightView.ListView.Torus.Start();
    };

    tb.Options.Artists=tb.createSelect();
    tb.Options.Artists.Hidden=true;
    tb.Options.Artists.Container.title=coLang.Table.Apps.Music.Hints.SelectArtist;
    tb.Options.Artists.onChange=function(){
      var Artists=this;
      var tb=this.Owner;
      var sc=tb.Screen;
      if (tb.Options.Loading==true) return;

      var elm=Artists.Container;
      var list=new Array();
      sc.Manifest.MAP.ArtistIndex.Value=elm.options.selectedIndex;
      coVDM.Manifest.Save();

      var qr=coMusic.App.Components.Search.qrByArtist;
      qr.Query.MAP.Term.Value=qr.Query.MAP.Term.Default+"="+elm.options[elm.options.selectedIndex].value;
      qr.Query.Execute();

      sc.RightView.ListView.Torus.Start();
    };

    tb.Options.Albums=tb.createSelect();
    tb.Options.Albums.Hidden=true;
    tb.Options.Albums.Container.title=coLang.Table.Apps.Music.Hints.SelectAlbum;
    tb.Options.Albums.onChange=function(){
      var Albums=this;
      var tb=this.Owner;
      var sc=tb.Screen;
      if (tb.Options.Loading==true) return;
      var elm=Albums.Container;
      var list=new Array();
      sc.Manifest.MAP.AlbumIndex.Value=elm.options.selectedIndex;
      coVDM.Manifest.Save();

      var qr=coMusic.App.Components.Search.qrByAlbum;
      qr.Query.MAP.Term.Value=qr.Query.MAP.Term.Default+"="+elm.options[elm.options.selectedIndex].value;
      qr.Query.Execute();

      sc.RightView.ListView.Torus.Start();
    };

    tb.Options.Query=tb.createTextWithButton(coLang.Table.Labels.Go,coTheme.Icons.None);
    tb.Options.Query.Input.style.width="120px";
    tb.Options.Query.Hidden=true;
    var elm=tb.Options.Query.Input;
    elm.title=coLang.Table.Apps.Music.Search.Hint;
    elm.placeholder=coLang.Table.Apps.Music.Search.Input;
    tb.Options.Query.onClick=function(){
      var Query=this;
      var tb=this.Owner;
      if (tb.Options.Loading==true) return;
      var sc=tb.Screen;
      sc.Search(tb.Options.Query.Input.value);
    };
    tb.onResize=function(){
      var tb=this;
      switch (tb.Options.Search.getIndex()) {
        case (0) :
          var txt=tb.Options.Query.Input;
          txt.style.width="100px";
          var iExtra=tb.Container.clientWidth-tb.Client.clientWidth-7;
          txt.style.width=txt.offsetWidth+iExtra+"px";
          break;
        case (1) :
          var btn=tb.Options.Artists;
          var elm=btn.Container;
          var iWidth=btn.staticWidth;
          if (elm.offsetLeft+iWidth>tb.Container.clientWidth)
            iWidth=tb.Container.clientWidth-elm.offsetLeft-2;
          elm.style.width=iWidth+"px";
          break;
        case (2) :


          break;
      };
    };
    return tb;
  }
};
