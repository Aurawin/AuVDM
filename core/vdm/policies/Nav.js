coPolicies.App.Components.Nav = {
  Version        : new Version(2013,8,7,7),
  Title          : new Title("Policy Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPolicies.App,'/core/vdm/policies/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var Nav=Screen.Nav=coAppUI.App.Components.Nav.Create("Policies","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client,coAppUI.Alignment.Bottom);
    Nav.Menu=Nav.Items.addItem(
      Nav.itemKind.Menu,"mnuPolicy",coLang.Table.Labels.Policy,
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
    Nav.Menu.miAUP=Nav.Menu.addItem(
      "miAUP",
      coLang.Table.Apps.Policies.AcceptableUse,
      Nav.NoTarget,
      function(mnuItem){
         mnuItem.Menu.Nav.Screen.Main.showAUP();
      },
      Nav.NoData
    );
    Nav.Menu.miPrivacy=Nav.Menu.addItem(
      "miPrivacy",
      coLang.Table.Apps.Policies.Privacy,
      Nav.NoTarget,
      function(mnuItem){
         mnuItem.Menu.Nav.Screen.Main.showPrivacy();
      },
      Nav.NoData
    );
    Nav.Menu.miAgreement=Nav.Menu.addItem(
      "miAgreement",
      coLang.Table.Apps.Policies.Agreement,
      Nav.NoTarget,
      function(mnuItem){
         mnuItem.Menu.Nav.Screen.Main.showAgreement();
      },
      Nav.NoData
    );
    Nav.Menu.Selected=Nav.Menu.miAUP;
    Nav.Menu.miAUP.SaveSelection=true;
    Nav.Menu.miPrivacy.SaveSelection=true;
    Nav.Menu.miAgreement.SaveSelection=true;
    return Nav;
  }
};
