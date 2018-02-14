coVDM.App.Components.coEnticement.App.Components.Nav = {
  Version        : new Version(2012,10,26,1),
  Title          : new Title("Enticement Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var Nav=Screen.Nav=coAppUI.App.Components.Nav.Create("Enticement","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Family=Nav.Items.addItem(
      Nav.itemKind.Button,"Family",coLang.Table.Buttons.Family,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
         var sc=navItem.Nav.Screen;
         sc.Main.Slides.ShowCase.Items.Welcome.Button.Select();
      }
    );
    Nav.Enterprise=Nav.Items.addItem(
      Nav.itemKind.Button,"Enterprise",coLang.Table.Buttons.Enterprise,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
         var sc=navItem.Nav.Screen;
         sc.Main.Slides.ShowCase.Items.Welcome.Button.Select();
      }
    );
    return Nav;
  }
};
