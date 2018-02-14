coText.App.Components.Nav = {
  Version        : new Version(2014,10,11,4),
  Title          : new Title("Text Editor Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAccount.App,'/core/vdm/editor/text/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var Nav=Screen.Nav=coAppUI.App.Components.Nav.Create("Editor","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Menu=Nav.Items.addItem(
      Nav.itemKind.Menu,"mnuMain",coLang.Table.Labels.Menu,
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.Home.AllowCaptionChange=true;
    Nav.Menu.miNew=Nav.Menu.addItem(
      "miNew",
      coLang.Table.Labels.New,
      Nav.Home,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.New();
      },
      Nav.NoData
    );
    Nav.Menu.miSep1=Nav.Menu.addItem(
      "Sep1",
      "-",
      Nav.NoTarget,
      Nav.NoClick
    );
    Nav.Menu.miOpen=Nav.Menu.addItem(
      "miOpen",
      coLang.Table.Labels.Open,
      Nav.Home,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Open();
      },
      Nav.NoData
    );
    Nav.Menu.miSave=Nav.Menu.addItem(
      "miSave",
      coLang.Table.Labels.Save,
      Nav.Home,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Save(false);
      },
      Nav.NoData
    );
    Nav.Menu.miSaveAs=Nav.Menu.addItem(
      "miSaveAs",
      coLang.Table.Labels.SaveAs,
      Nav.Home,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Save(true);
      },
      Nav.NoData
    );

    return Nav;
  }
};

