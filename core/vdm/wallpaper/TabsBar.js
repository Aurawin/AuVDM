coWallPaper.App.Components.TabsBar = {
  Version        : new Version(2014,10,10,4),
  Title          : new Title("WallPaper TabsBar","TabsBar"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coWallPaper.App,'/core/vdm/wallpaper/TabsBar.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    // View Creation code below
    var sc=Screen;
    var tb=coAppUI.App.Components.TabsBar.Create(
      "TabsBar",
      "TabsBar",
      sc,
      sc.Slides,
      sc.Frame,
      sc.Frame.Client,
      coAppUI.Alignment.Top
    );
    var tab=tb.Items.Tiles=tb.createTab(
      coLang.Table.Labels.Tiles,
      coTheme.Icons.Tiles,
      coAppUI.AutoSize,
      coAppUI.disableClose
    );
    tab.onSelect=function(){
      var tab=this;
      var sc=tab.Owner.Screen;
      var DB=coWallPaper.App.Files;
      sc.View.Items.Clear();
      sc.View.Mode.setValue(sc.View.Mode.Values.Large);
      sc.Manifest.MAP.TabIndex.Value=0;
      coVDM.VDM.Manifest.Save();
      DB.Commands.ListTiles(DB);
    };
    var tab=tb.Items.Scenes=tb.createTab(
      coLang.Table.Labels.Scenes,
      coTheme.Icons.Scenes,
      coAppUI.AutoSize,
      coAppUI.disableClose
    );
    tab.onSelect=function(){
      var tab=this;
      var sc=tab.Owner.Screen;
      var DB=coWallPaper.App.Files;
      sc.View.Items.Clear();
      sc.View.Mode.setValue(sc.View.Mode.Values.Custom);
      DB.Commands.ListScenes(DB);
      sc.Manifest.MAP.TabIndex.Value=1;
      coVDM.VDM.Manifest.Save();
    };

    return tb;
  }
};
