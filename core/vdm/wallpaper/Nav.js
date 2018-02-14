coWallPaper.App.Components.Nav = {
  Version        : new Version(2014,8,14,3),
  Title          : new Title("WallPaper Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coWallPaper.App,'/core/vdm/wallpaper/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var Nav=coAppUI.App.Components.Nav.Create("Nav","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      sc.View,
      [sc.TabsBar,sc.View],
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
       var sc=navItem.Nav.Screen;
       switch (sc.Manifest.MAP.TabIndex.Value){
         case (0) : {
           sc.TabsBar.Items.Tiles.Select();
           break;
         };
         case (1) : {
           sc.TabsBar.Items.Scenes.Select();
           break;
         };
       };
      }
    );
    Nav.Visible=true;
    return Nav;
  }
};


