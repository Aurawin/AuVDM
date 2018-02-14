coVDM.App.Components.coMusic.App.Components.Nav = {
  Version        : new Version(2014,8,7,53),
  Title          : new Title("Music Navigation","nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var Nav=Screen.Nav=coAppUI.App.Components.Nav.Create("Music","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
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
      function(){
        // todo
      }
    );
    Nav.gpLayout=Nav.Items.addItem(
      Nav.itemKind.Group,"gpLayout",coLang.Table.Labels.Layout,
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
    Nav.Home.ShowList.Add(Nav.gpLayout);

    Nav.gpLayout.Menu=Nav.gpLayout.Items.addItem(
      Nav.itemKind.Menu,"mnuLayout",coLang.Table.Labels.Layout,
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
    Nav.gpLayout.Menu.miComplete=Nav.gpLayout.Menu.addItem(
      "miComplete",
      coLang.Table.Views.Complete,
      Nav.NoTarget,
      function(mnuItem){
         var sc=mnuItem.Menu.Nav.Screen;
         sc.Unit.App.Components.Views.SwitchToComplex(sc);
      },
      Nav.NoData
    );
    Nav.gpLayout.Menu.miSimple=Nav.gpLayout.Menu.addItem(
      "miSimple",
      coLang.Table.Views.Simple,
      Nav.NoTarget,
      function(mnuItem){
         var sc=mnuItem.Menu.Nav.Screen;
         sc.Unit.App.Components.Views.SwitchToSimple(sc);
      },
      Nav.NoData
    );
    Nav.gpView=Nav.Items.addItem(
      Nav.itemKind.Group,"gpView",coLang.Table.Labels.View,
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
    Nav.Home.ShowList.Add(Nav.gpView);
    Nav.gpView.gpFolders=Nav.gpView.Items.addItem(
      Nav.itemKind.Group,"gpFolders",coLang.Table.Labels.Folders,
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(){

      }
    );
    Nav.gpView.gpPlayLists=Nav.gpView.Items.addItem(
      Nav.itemKind.Group,"gpPlayLists",coLang.Table.Apps.Music.PlayList.Menu,
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.LeftView.PlayLists,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
        switch (sc.ViewMode) {
          case (sc.Unit.vmComplex) :
            if (sc.LeftView.PlayLists.Hidden==true){
              sc.Manifest.MAP.PlayLists.Value=true;
              sc.LeftView.PlayLists.Container.style.height=sc.Manifest.MAP.PlayListHeight.Value+"px";
              sc.LeftView.PlayLists.Hidden=false;
              sc.LeftView.PlayLists.Show();
            } else {
              sc.Manifest.MAP.PlayLists.Value=false;
              sc.Manifest.MAP.PlayListHeight.Value=sc.LeftView.PlayLists.Container.offsetHeight;
              sc.LeftView.PlayLists.Conseal();
            };
            sc.setSize();
            break;
          case (sc.Unit.vmSimple) :
            sc.Unit.App.Components.Views.ShowSwitcher(sc);
            sc.Switcher.Nav.Menu.setSelected(sc.Switcher.Nav.Menu.miPlayLists);
            break;
        };
      }
    );
    Nav.gpView.Menu=Nav.gpView.Items.addItem(
      Nav.itemKind.Menu,"mnuView",coLang.Table.Labels.View,
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
    Nav.gpView.Menu.AllowCaptionChange=false;
    Nav.gpView.Menu.miRefresh=Nav.gpView.Menu.addItem(
      "miRefresh",
      coLang.Table.Buttons.Refresh,
      Nav.gpView.gpFolders,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.LeftView.Tree.Torus.Start();
        coSpectrum.App.Components.Cabinet.Screen.DB.Commands.ListFolders.reTry();
      },
      Nav.NoData
    );
    Nav.gpView.Menu.miFolders=Nav.gpView.Menu.addItem(
      "miFolders",
      coLang.Table.Labels.Folders,
      Nav.gpView.gpFolders,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Unit.App.Components.Views.ShowSwitcher(sc);
        sc.Switcher.Nav.Menu.setSelected(sc.Switcher.Nav.Menu.miFolders);
      },
      Nav.NoData
    );
    Nav.gpView.Menu.miPlayLists=Nav.gpView.Menu.addItem(
      "miPlayLists",
      coLang.Table.Apps.Music.PlayList.Menu,
      Nav.gpView.gpPlayLists,
      Nav.NoClick,
      Nav.NoData
    );
    Nav.gpResults=Nav.Items.addItem(
      Nav.itemKind.Group,"gpResults",coLang.Table.Labels.Results,
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [Nav.gpLayout,Nav.gpView],
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpView.Menu.miSummary=Nav.gpView.Menu.addItem(
      "miSummary",
      coLang.Table.Labels.Summary,
      Nav.gpResults,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Switcher.Show();
        sc.Switcher.Nav.setSelected(sc.Switcher.Nav.gpSummary);
      },
      Nav.NoData
    );
    Nav.gpResults.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpResults,
      Nav.NoMenuItem,
      Nav.NoClick
    );
    Nav.gpResults.btnAll=Nav.gpResults.Items.addItem(
      Nav.itemKind.Button,"btnAll",coLang.Table.Labels.All,
      Nav.oAutoShowOn,
      Nav.oCascadeOff,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        navItem.Nav.onGroupResultsAll(navItem);
      }
    );
    Nav.gpResults.mnuArtist=Nav.gpResults.Items.addItem(
      Nav.itemKind.Menu,"mnuArtist",coLang.Table.Apps.Music.Artist,
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
    Nav.gpResults.mnuAlbum=Nav.gpResults.Items.addItem(
      Nav.itemKind.Menu,"mnuAlbum",coLang.Table.Apps.Music.Album,
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
    Nav.gpResults.mnuGenre=Nav.gpResults.Items.addItem(
      Nav.itemKind.Menu,"mnuGenre",coLang.Table.Apps.Music.Genre.Option,
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
    Nav.onGroupResultsByAlbum=function(mnuItem){
      var Nav=mnuItem.Menu.Nav;
      var sc=Nav.Screen;
      sc.DB.Selected.Groups.Selected=sc.DB.Selected.Groups.Album;
      sc.DB.Selected.Groups.Selected.Filter=mnuItem.Data;

      sc.RightView.ListView.Items.SyncView();
    };
    Nav.onGroupResultsAll=function(navItem){
      var Nav=navItem.Nav;
      var sc=Nav.Screen;
      sc.DB.Selected.Groups.Selected=null;
      sc.RightView.ListView.Items.SyncView();
    };
    Nav.onGroupResultsByArtist=function(mnuItem){
      var Nav=mnuItem.Menu.Nav;
      var sc=Nav.Screen;
      sc.DB.Selected.Groups.Selected=sc.DB.Selected.Groups.Artist;
      sc.DB.Selected.Groups.Selected.Filter=mnuItem.Data;
      sc.RightView.ListView.Items.SyncView();
    };
    Nav.onGroupResultsByGenre=function(mnuItem){
      var Nav=mnuItem.Menu.Nav;
      var sc=Nav.Screen;
      sc.DB.Selected.Groups.Selected=sc.DB.Selected.Groups.Genre;
      sc.DB.Selected.Groups.Selected.Filter=mnuItem.Data;
      sc.RightView.ListView.Items.SyncView();
    };

    return Nav;
  },
  AddSwitchItems : function(Screen,Nav,Switch){
    var sc=Screen;
    Nav.gpSummary=Nav.Items.addItem(
      Nav.itemKind.Group,"gpSummary",coLang.Table.Labels.Summary,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Switch.Summary,
      [Switch.Summary],
      [sc.LeftView.Tree,sc.LeftView.PlayLists],
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
      }
    );

    Nav.gpFolders=Nav.Items.addItem(
      Nav.itemKind.Group,"gpFolders",coLang.Table.Labels.Folders,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.LeftView.Tree,
      [sc.LeftView.Tree],
      [Switch.Summary,sc.LeftView.PlayLists],
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
      }
    );
    Nav.gpPlayLists=Nav.Items.addItem(
      Nav.itemKind.Group,"gpPlayLists",coLang.Table.Apps.Music.PlayList.Menu,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.LeftView.PlayLists,
      [sc.LeftView.PlayLists],
      [Switch.Summary,sc.LeftView.Tree],
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
      }
    );
    Nav.Menu.miSummary=Nav.Menu.addItem(
      "miGroups",
      coLang.Table.Labels.Summary,
      Nav.gpSummary,
      Nav.NoClick,
      Nav.NoData
    );

    Nav.Menu.miFolders=Nav.Menu.addItem(
      "miFolders",
      coLang.Table.Labels.Folders,
      Nav.gpFolders,
      Nav.NoClick,
      Nav.NoData
    );

    Nav.Menu.miPlayLists=Nav.Menu.addItem(
      "miPlayLists",
      coLang.Table.Apps.Music.PlayList.Menu,
      Nav.gpPlayLists,
      Nav.NoClick,
      Nav.NoData
    );
  },
  setGroupByArtistMenu:function(Screen,Groups){
    var gp=Groups.Artist;
    var mnu=Screen.Nav.gpResults.mnuArtist;
    mnu.Control.Clear();
    var lst=new Array();
    for (var Value in gp.Values)
      lst.push(Value);
    lst.sort();
    for (var iLcv=0; iLcv<lst.length; iLcv++){
      mnu.addItem(
        "miResult",
        lst[iLcv],
        Screen.Nav.gpResults,
        Screen.Nav.onGroupResultsByArtist,
        lst[iLcv]
      );
    };
    lst.length=0;
    lst=null;
    gp=null;
    mnu=null;
  },
  setGroupByAlbumMenu:function(Screen,Groups){
    var gp=Groups.Album;
    var mnu=Screen.Nav.gpResults.mnuAlbum;
    mnu.Control.Clear();
    var lst=new Array();
    for (var Value in gp.Values)
      lst.push(Value);
    lst.sort();
    for (var iLcv=0; iLcv<lst.length; iLcv++){
      mnu.addItem(
        "miResult",
        lst[iLcv],
        Screen.Nav.gpResults,
        Screen.Nav.onGroupResultsByAlbum,
        lst[iLcv]
      );
    };
    lst.length=0;
    lst=null;
    gp=null;
    mnu=null;
  },
  setGroupByGenreMenu:function(Screen,Groups){
    var gp=Groups.Genre;
    var mnu=Screen.Nav.gpResults.mnuGenre;
    mnu.Control.Clear();
    var lst=new Array();
    for (var Value in gp.Values)
      lst.push(Value);
    lst.sort();
    for (var iLcv=0; iLcv<lst.length; iLcv++){
      mnu.addItem(
        "miResult",
        lst[iLcv],
        Screen.Nav.gpResults,
        Screen.Nav.onGroupResultsByGenre,
        lst[iLcv]
      );
    };
    lst.length=0;
    lst=null;
    gp=null;
    mnu=null;
  }
};

