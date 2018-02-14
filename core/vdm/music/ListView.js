coMusic.App.Components.ListView = {
  Version        : new Version(2014,28,5,21),
  Title          : new Title("Music List View","ListView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/ListView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  LoadChunk      : 20,
  LoadPause      : 2500,
  LoadDelay      : 250,
  Create : function (Screen,Slides,Owner,Parent,Align){
    var lv=coAppUI.App.Components.ListView.Create("Files","ListView",Screen,Slides,Owner,Parent,Align);
    lv.Unit=this;
    var ds=Screen.DB.Selected;
    ds.Displays.Add(lv);
    lv.DataSet=ds;
    lv.tmrLoad.Chunk=lv.Unit.LoadChunk;
    lv.tmrLoad.Interval=lv.Unit.LoadPause;
    lv.tmrLoad.FirstDelay=lv.Unit.LoadDelay;
    lv.Header.Columns.addItem(ds.Fields.MAP.Song);
    lv.Header.Columns.addItem(ds.Fields.MAP.Artist);
    lv.Header.Columns.addItem(ds.Fields.MAP.Album);
    lv.Header.Columns.addItem(ds.Fields.MAP.Genre);
    lv.Header.Columns.addItem(ds.Fields.MAP.Size);
    lv.onDoubleClick=function(itm){
      var lv=this;
      try {
        var sc=lv.Screen;
        var ply=sc.Player;
        switch (ply.Source) {
          case (ply.Unit.srcNone) :
            ply.setFile(itm.Data);
            break;
          case (ply.Unit.srcPlayFromListView) :
            var idx=lv.Items.indexOf(itm);
            ply.PlayFromListView(idx);
            break;
          case (ply.Unit.srcPlayList) :
            // todo
            break;
        };
      } catch(err){
        coVDM.Console.Append('coMusic.ListView.onDoubleClick Exception');
        coVDM.Console.Exception(err,false);
      };
    };
    return lv;
  }
};

