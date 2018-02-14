coSocial.App.Components.Nav = {
  Version        : new Version(2014,8,7,127),
  Title          : new Title("Social Network Nav","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create: function (Screen){
    var _sc=Screen;
    var Nav=coAppUI.App.Components.Nav.Create("Social","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      _sc.Selector,
      [_sc.Selector],
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
      }
    );
    Nav.gpNetwork=Nav.Items.addItem(
      Nav.itemKind.Group,"gpNetwork","Network",
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      _sc.Selector,
      [_sc.Selector],
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpNetwork.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpNetwork,
      Nav.NoMenuItem,
      Nav.NoClick
    );
    this.AddNetworkMenuItems(Nav,Nav.gpNetwork);
    return Nav;
  },
  AddSwitchItems : function(Screen,Nav){
    var sc=Screen;
    Nav.gpDelNetworks=Nav.Items.addItem(
      Nav.itemKind.Group,"gpDelNetworks","Delete Networks",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.Deletor,
      Nav.NoShowList,
      [sc.Editor,sc.Requests,sc.Search],
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpDelNetworks.Confirm=Nav.gpDelNetworks.Items.addItem(
      Nav.itemKind.Confirm,"cnfDelNetwork",[coLang.Table.Buttons.Delete,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpDelNetworks,
      sc.Deletor,
      Nav.NoShowList,
      [sc.Editor,sc.Search],
      Nav.Home,
      [
        function(navItem){ // Confirm
          var sc=navItem.Nav.Screen;
          var nSel=sc.Deletor;
          for (var iLcv=0; iLcv<nSel.My.Items.length; iLcv++){
            var itm=nSel.My.Items[iLcv];
            if (itm.Command.Checked==true)
              coSocial.Networks.Commands.Delete(itm.Data);
          };
          nSel.My.Items.Mode.setValue(nSel.My.Items.Mode.Default);
          nSel.Other.Items.Mode.setValue(nSel.Other.Items.Mode.Default);
        },
        function(navItem){ // Cancel
          var sc=navItem.Nav.Screen;
          var nSel=sc.Deletor;
          nSel.My.Items.Mode.setValue(nSel.My.Items.Mode.Default);
          nSel.Other.Items.Mode.setValue(nSel.Other.Items.Mode.Default);
        }
      ]
    );
    Nav.gpSearch=Nav.Items.addItem(
      Nav.itemKind.Group,"gpSearch","Search",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.Search,
      Nav.NoShowList,
      [sc.Editor,sc.Requests,sc.Deletor],
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
        sc.Unit.App.Components.Views.ShowSearch(sc);
        sc.Search.Group.Items.Mode.setValue(sc.Search.Group.Items.Mode.Join);
      }
    );
    Nav.gpSearch.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpNetwork,
      Nav.NoMenuItem,
      function(NavItem){
        var sc=NavItem.Screen;
        sc.Switcher.Conseal();
      }
    );
    Nav.gpRequests=Nav.Items.addItem(
      Nav.itemKind.Group,"gpRequests",coLang.Table.Buttons.Requests,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.Requests,
      [sc.Requests],
      [
        sc.Deletor,
        sc.Editor,
        sc.Search
      ],
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
      }
    );
    Nav.gpNewNetwork=Nav.Items.addItem(
      Nav.itemKind.Group,"gpNewNetwork","New Network",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.Editor,
      [sc.Editor],
      [sc.Requests,sc.Search,sc.Deletor],
      Nav.Home,
      function(navItem){
        var sc=navItem.Nav.Screen;
        sc.Unit.App.Components.Views.ShowNewNetwork(sc);
      }
    );
    Nav.gpNewNetwork.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpNetwork,
      Nav.NoMenuItem,
      function(NavItem){
        var sc=NavItem.Screen;
        sc.Switcher.Conseal();
      }
    );
    Nav.gpNewNetwork.Confirm=Nav.gpNewNetwork.Items.addItem(
      Nav.itemKind.Confirm,"cnfNewNetwork",[coLang.Table.Buttons.Create,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.Home,
      [
        function(navItem){ // Create
          var sc=navItem.Nav.Screen;
          sc.Editor.Commit();
          coSocial.Networks.Commands.Add(sc.Editor.DataSet);
          sc.Switcher.Conseal();
        },
        function(navItem){ // Cancel
          var sc=navItem.Nav.Screen;
          sc.Editor.Reset();
          sc.Switcher.Conseal();
        }
      ]
    );
    Nav.gpEditNetwork=Nav.Items.addItem(
      Nav.itemKind.Group,"gpEditNetwork","Edit Network",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.Editor,
      [sc.Editor],
      [sc.Requests,sc.Search,sc.Deletor],
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
        var nSel=sc.Selector;
        if (!nSel.My.Items.Focused) return false;
        sc.Unit.App.Components.Views.ShowEditNetwork(sc,nSel.My.Items.Focused.Data);
      }
    );
    Nav.gpEditNetwork.Confirm=Nav.gpEditNetwork.Items.addItem(
      Nav.itemKind.Confirm,"cnfEditNetwork",[coLang.Table.Buttons.Save,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.Home,
      [
        function(navItem){ // Save
          var sc=navItem.Nav.Screen;
          sc.Editor.Commit();
          coSocial.Networks.Commands.Save(sc.Editor.DataSet);
          sc.Editor.Reset();
          sc.Switcher.Conseal();
        },
        function(navItem){ // Cancel
          var sc=navItem.Nav.Screen;
          sc.Editor.Reset();
          sc.Switcher.Conseal();
        }
      ]
    );
    Nav.Menu.miEditNetwork=Nav.Menu.addItem(
      "miEditNetwork",
      coLang.Table.Buttons.Editor,
      Nav.gpEditNetwork,
      Nav.NoClick,
      Nav.NoData
    );
    Nav.Menu.miRequests=Nav.Menu.addItem(
      "miRequests",
      coLang.Table.Buttons.Requests,
      Nav.gpRequests,
      Nav.NoClick,
      Nav.NoData
    );

    Nav.AddToGroupHideLists(Nav.gpNewNetwork);
    Nav.AddToGroupHideLists(Nav.gpEditNetwork);
    Nav.AddToGroupHideLists(Nav.gpDelNetworks);

    Nav.AddToGroupHideLists(Nav.gpSearch);
    Nav.AddToGroupHideLists(Nav.gpRequests);

  },
  AddJoinItems : function(Screen,Join){
    var sc=Screen;
    Join.Nav.Home.Hidden=true;
    Join.Nav.Home.AutoShow=false;
    Join.Nav.Home.Default=false;
    Join.Nav.Menu.AutoShow=false;
    Join.Nav.Menu.Hidden=true;

    Join.Nav.Confirm=Join.Nav.Items.addItem(
      Nav.itemKind.Confirm,"cnfJoin",[coLang.Table.Buttons.Join,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      [
        function(navItem){ // Confirm
          var sc=navItem.Nav.Screen;
          var mv=navItem.Nav.Owner;

          var dbItem=sc.Search.Request;
          dbItem.Reset();
          dbItem.MAP.NetworkID.Value=mv.DataSet.MAP.ID.Value;
          dbItem.MAP.Query.Value=mv.Panels.Message.Container.value;
          coSocial.Requests.Commands.Make(dbItem);

          mv.Item.Command.Enabled=false;
          mv.Item.Command.Hide();
          // todo set mode to pending
          mv.Conseal();
        },
        function(navItem){ // Cancel
          var sc=navItem.Nav.Screen;
          var mv=navItem.Nav.Owner;
          mv.Item.Command.Checked=false;
          mv.Item.Command.Synchronize();
          // todo Return
          mv.Conseal();
        }
      ]
    );
  },
  AddNetworkMenuItems:function(Nav,Group){
    Group.Menu=Group.Items.addItem(
      Nav.itemKind.Menu,"Menu",coLang.Table.Apps.Social.Networks.Menu,
      Nav.oAutoShowOff,
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
    Group.Menu.onMenuItemSelect=function(mnuItem){
      var sc=mnuItem.Menu.Nav.Screen;
      var slide=mnuItem.Data;
    };
    Group.Menu.miNew=Group.Menu.addItem(
      "New",
      coLang.Table.Labels.New,
      Nav.NoTarget,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Unit.App.Components.Views.ShowNewNetwork(sc);
      },
      Nav.NoData
    );
    Group.Menu.miEdit=Group.Menu.addItem(
      "Edit",
      coLang.Table.Buttons.Edit,
      Nav.NoTarget,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        if (!sc.Selector.My.Items.Focused) return false;
        sc.Unit.App.Components.Views.ShowEditNetwork(sc,sc.Selector.My.Items.Focused.Data);
      },
      Nav.NoData
    );
    Group.Menu.miRefresh=Group.Menu.addItem(
      "Refresh",
      coLang.Table.Buttons.Refresh,
      Nav.NoTarget,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        coSocial.Networks.Commands.List();
        coSocial.Connections.Commands.List();
      },
      Nav.NoData
    );
    Group.Menu.miDelete=Group.Menu.addItem(
      "Delete",
      coLang.Table.Buttons.Delete,
      Nav.NoTarget,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Unit.App.Components.Views.ShowDeleteNetworks(sc);
      },
      Nav.NoData
    );
  }
};
