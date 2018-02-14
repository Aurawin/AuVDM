coDocs.App.Components.Nav = {
  Version        : new Version(2014,8,7,2),
  Title          : new Title("Documentation Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDocs.App,'/core/docs/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var Nav=Screen.Nav=coAppUI.App.Components.Nav.Create("Nav","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Menu=Nav.Items.addItem(
      Nav.itemKind.Menu,"mnuMain",coLang.Table.Labels.Menu,
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      [Screen.Views],
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.Home.AllowCaptionChange=true;

    Nav.gpAdmin=Nav.Items.addItem(
      Nav.itemKind.Group,"gpAdmin",coLang.Table.Labels.Administrate,
      Nav.oAutoShowOn,
      Nav.oCascadeOff,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );

    Nav.Menu.miAdmin=Nav.Menu.addItem(
      "miAdmin",
      coLang.Table.Labels.Administrate,
      Nav.gpAdmin,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Views.Slides.Admin.showAdmin();
      },
      Nav.NoData
    );
    Nav.Menu.miNew=Nav.Menu.addItem(
      "miNew",
      coLang.Table.Labels.New,
      Nav.Home,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;

      },
      Nav.NoData
    );
    Nav.Menu.miEdit=Nav.Menu.addItem(
      "miEdit",
      coLang.Table.Labels.Edit,
      Nav.Home,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;

      },
      Nav.NoData
    );

    return Nav;
  }
};

