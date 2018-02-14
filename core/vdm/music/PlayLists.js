coMusic.App.Components.PlayLists = {
  Version        : new Version(2012,5,18,6),
  Title          : new Title("Music Playlists","PlayLists"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/PlayLists.js',coAppKit.PreLoaded),  debugToConsole : true,
  DefaultHeight  : 150,
  Create : function (Screen,Slides,Owner,Parent,Align){
    var lv=coAppUI.App.Components.ListView.Create("PlayList","ListView",Screen,Slides,Owner,Parent,Align);
    Screen.DB.PlayLists.Displays.push(lv);
    var ds=lv.DataSet=Screen.DB.PlayLists;
    lv._onShow=lv.onShow;
    lv.Header.Columns.addItem(ds.Fields.MAP.Playlist);
    lv.Header.Columns.addItem(ds.Fields.MAP.Count);
    lv.onDoubleClick=function(itm){
      var lv=this;
      var sc=lv.Screen;
    };
    lv.onShow=function(){
      var lv=this;
      lv.Container.style.height=lv.Screen.Manifest.MAP.PlayListHeight.Value+"px";
      lv._onShow();
    };
    return lv;
  }
};

