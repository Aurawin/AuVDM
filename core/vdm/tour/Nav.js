coTour.App.Components.Nav = {
  Version        : new Version(2013,8,14,10),
  Title          : new Title("Tour Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coTour.App,'/core/vdm/tour/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var Nav=Screen.Nav=coAppUI.App.Components.Nav.Create("Tour","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
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
         sc.Main.Header.ShowCase.Items.Welcome.Button.Select();
      }
    );
    Nav.gpTour=Nav.Items.addItem(
      Nav.itemKind.Group,"gpTour",coLang.Table.Labels.Tour,
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
    Nav.Home.ShowList.Add(Nav.gpTour);

    Nav.gpTour.Menu=Nav.gpTour.Items.addItem(
      Nav.itemKind.Menu,"mnuTour",coLang.Table.Labels.Tour,
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
    Nav.gpTour.Menu.miWelcome=Nav.gpTour.Menu.addItem(
      "miWelcome",
      coLang.Table.Labels.Welcome,
      Nav.NoTarget,
      function(mnuItem){
         var sc=mnuItem.Menu.Nav.Screen;
         sc.Main.Header.ShowCase.Items.Welcome.Button.Select();
      },
      Nav.NoData
    );
    Nav.gpTour.Menu.miCloud=Nav.gpTour.Menu.addItem(
      "miCloud",
      coLang.Table.Apps.Tour.Cloud,
      Nav.NoTarget,
      function(mnuItem){
         var sc=mnuItem.Menu.Nav.Screen;
         sc.Main.Header.ShowCase.Items.Cloud.Button.Select();
      },
      Nav.NoData
    );
    Nav.gpTour.Menu.miSocial=Nav.gpTour.Menu.addItem(
      "miSocial",
      coLang.Table.Apps.Tour.Social,
      Nav.NoTarget,
      function(mnuItem){
         var sc=mnuItem.Menu.Nav.Screen;
         sc.Main.Header.ShowCase.Items.Social.Button.Select();
      },
      Nav.NoData
    );
    Nav.gpTour.Menu.miSafe=Nav.gpTour.Menu.addItem(
      "miSecure",
      coLang.Table.Apps.Tour.Secure,
      Nav.NoTarget,
      function(mnuItem){
         var sc=mnuItem.Menu.Nav.Screen;
         sc.Main.Header.ShowCase.Items.Secure.Button.Select();
      },
      Nav.NoData
    );
    Nav.gpTour.Menu.AllowCaptionChange=true;
    Nav.gpTour.Menu.miWelcome.SaveSelection=true;
    Nav.gpTour.Menu.miCloud.SaveSelection=true;
    Nav.gpTour.Menu.miSocial.SaveSelection=true;
    Nav.gpTour.Menu.miSafe.SaveSelection=true;
    return Nav;
  }
};

