coMusic.App.Components.Views = {
  Version        : new Version(2013,5,18,54),
  Title          : new Title("Music Views","Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Views.js',coAppKit.PreLoaded),
  debugToConsole : true,
  CreatePlayListWithTree:function(Screen){
    var sc=Screen;
    pltv=sc.Slides.createSlide("PlayListTreeView","sldClient",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Left);
    sc.Player=pltv.Player=coVDM.App.Components.coMusic.App.Components.Player.Create(sc,pltv.Slides,pltv,pltv.Container,coAppUI.Alignment.Top);
    pltv.PlayLists=coVDM.App.Components.coMusic.App.Components.PlayLists.Create(sc,pltv.Slides,pltv,pltv.Container,coAppUI.Alignment.Top);
    pltv.PlayLists.Hidden=true;
    pltv.Tree=coVDM.App.Components.coMusic.App.Components.TreeView.Create(sc,pltv.Slides,pltv,pltv.Container,coAppUI.Alignment.Client);
    sc.DB.Folders.Files.LoadInfo.Torus=pltv.Tree.Torus;
    sc.DB.MyNetworks.Fields.MAP.Files.Value.LoadInfo.Torus=pltv.Tree.Torus;
    return pltv;
  },
  CreateStackedListView : function (Screen){
    var sc=Screen;
    sv=sc.Slides.createSlide("StackedListView","sldClient",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
    sv.Toolbar=coVDM.App.Components.coMusic.App.Components.Toolbar.Create(_sc,sv.Slides,sv,sv.Container);
    sv.Stack=coVDM.App.Components.coMusic.App.Components.Stack.Create(_sc,sv.Slides,sv,sv.Container,coAppUI.Alignment.Top);
    sv.ListView=coVDM.App.Components.coMusic.App.Components.ListView.Create(_sc,sv.Slides,sv,sv.Container,coAppUI.Alignment.Client);
    sc.DB.Folders.Files.Displays.push(sv.ListView);



    sc.DB.MyNetworks.Fields.MAP.Results.Value.Displays.push(sv.ListView);
    sc.DB.MyNetworks.Fields.MAP.Results.Value.LoadInfo.Torus=sv.ListView.Torus;

    return sv;
  },
  CreateSwitcher:function(Screen){
    var sc=Screen;
    sw=coAppUI.App.Components.MultiView.Create("Switcher","sldClient",sc,sc.Slides,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Default);
    sw.zIndex=2;
    sw.Summary=sc.Unit.App.Components.Summary.Create(sc,sw);
    sc.Unit.App.Components.Nav.AddSwitchItems(sc,sw.Nav,sw);
    return sw;
  },
  SwitchToComplex:function(Screen){
    var sc=Screen;
    sc.Manifest.MAP.ViewMode.Value=sc.Unit.vmComplete;

    sc.Switcher.Hide();

    sc.Splitter.Hidden=true;
    sc.LeftView.Hidden=true;
    sc.LeftView.PlayLists.Hidden=true;

    sc.LeftView.Player.Hidden=true;
    sc.LeftView.Tree.Hidden=true;
    sc.RightView.Hidden=true;
    sc.RightView.ListView.Hidden=true;
    sc.RightView.Stack.Hidden=true;
    sc.RightView.Toolbar.Hidden=true;

      sc.Splitter.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);
      sc.LeftView.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);
      sc.RightView.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);


      sc.LeftView.PlayLists.setOwnerAndParent(sc.LeftView.Slides,sc.LeftView,sc.LeftView.Container);

      sc.LeftView.Player.setOwnerAndParent(sc.LeftView.Slides,sc.LeftView,sc.LeftView.Container);
      sc.LeftView.Tree.setOwnerAndParent(sc.LeftView.Slides,sc.LeftView,sc.LeftView.Container);

      sc.RightView.Toolbar.setOwnerAndParent(sc.RightView.Slides,sc.RightView,sc.RightView.Container);
      sc.RightView.Stack.setOwnerAndParent(sc.RightView.Slides,sc.RightView,sc.RightView.Container);
      sc.RightView.ListView.setOwnerAndParent(sc.RightView.Slides,sc.RightView,sc.RightView.Container);


      sc.LeftView.PlayLists.Align.Index=coAppUI.Alignment.Top;


      sc.LeftView.PlayLists.Container.style.height=sc.Manifest.MAP.PlayListHeight.Value+"px";



      sc.LeftView.Hidden=false;

      sc.LeftView.Player.Hidden=false;
      sc.LeftView.Tree.Hidden=false;
      sc.Splitter.Hidden=false;

      sc.RightView.Hidden=false;
      sc.RightView.ListView.Hidden=false;
      sc.RightView.Stack.Hidden=true; // todo
      sc.RightView.Toolbar.Hidden=false;

      sc.LeftView.Show();


      if (sc.Manifest.MAP.PlayLists.Value==true) {;
        sc.LeftView.PlayLists.Hidden=false;
        sc.LeftView.PlayLists.Show();
      } else {
        sc.LeftView.PlayLists.Conseal();
      };

      sc.LeftView.Tree.Show();
      sc.Splitter.Show();
      sc.RightView.Show();
      sc.RightView.ListView.Show();

      sc.LeftView.Align.Index=coAppUI.Alignment.Left;
      sc.LeftView.Container.style.width=sc.Manifest.MAP.LeftViewWidth.Value+"px";


      sc.Nav.gpView.Menu.miFolders.Conseal();
      sc.Nav.gpView.gpFolders.Hidden=false;
      sc.Nav.gpView.gpPlayLists.Hidden=false;

      sc.Nav.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);

    sc.setSize();
    sc.ViewMode=sc.Unit.vmComplex;
    coVDM.Manifest.Save();
  },
  SwitchToSimple:function(Screen){
    var sc=Screen;
    sc.Manifest.MAP.ViewMode.Value=sc.Unit.vmSimple;


    sc.Splitter.Hidden=true;
    sc.LeftView.Hidden=true;
    sc.LeftView.PlayLists.Hidden=true;


    sc.LeftView.Player.Hidden=true;
    sc.LeftView.Tree.Hidden=true;
    sc.RightView.Hidden=true;
    sc.RightView.ListView.Hidden=true;
    sc.RightView.Stack.Hidden=true;
    sc.RightView.Toolbar.Hidden=true;
    sc.Splitter.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);
    sc.LeftView.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);
    sc.RightView.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);
    sc.RightView.Toolbar.setOwnerAndParent(sc.RightView.Slides,sc.RightView,sc.RightView.Container);
    sc.RightView.Stack.setOwnerAndParent(sc.RightView.Slides,sc.RightView,sc.RightView.Container);

    sc.LeftView.PlayLists.setOwnerAndParent(sc.Switcher.Slides,sc.Switcher,sc.Switcher.Container);

    sc.LeftView.Player.setOwnerAndParent(sc.RightView.Slides,sc.RightView,sc.RightView.Container);
    sc.LeftView.Tree.setOwnerAndParent(sc.LeftView.Slides,sc.LeftView,sc.LeftView.Container);

    sc.LeftView.PlayLists.Align.Index=coAppUI.Alignment.Client;


    sc.LeftView.Hidden=true;

    sc.LeftView.PlayLists.Hidden=(sc.Manifest.MAP.PlayLists.Value==false);


    sc.LeftView.Player.Hidden=false;
    sc.LeftView.Tree.Hidden=true;
    sc.Splitter.Hidden=true;

    sc.RightView.Hidden=false;
    sc.RightView.ListView.Hidden=false;
    sc.RightView.Stack.Hidden=true; // todo
    sc.RightView.Toolbar.Hidden=false;

    sc.LeftView.Hide();
    sc.LeftView.Tree.Hide();
    sc.Splitter.Hide();

    sc.RightView.Show();
    sc.LeftView.Player.Show();
    sc.LeftView.Tree.Hide();
    sc.LeftView.PlayLists.Hide();

    sc.RightView.Toolbar.Show();
    sc.RightView.ListView.Show();
    sc.ViewMode=sc.Unit.vmSimple;

    sc.Nav.gpView.Menu.miFolders.Hidden=false;
    sc.Nav.gpView.gpFolders.Conseal();
    sc.Nav.gpView.gpPlayLists.Conseal();

    sc.Nav.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);

    sc.setSize();
    sc.Manifest.MAP.ViewMode.Value=sc.Unit.vmSimple;
    coVDM.Manifest.Save();

  },
  ShowSwitcher:function(Screen){
    var sc=Screen;
    if (sc.ViewMode==sc.Unit.vmSimple){
      sc.Switcher.Reveal();

      sc.LeftView.PlayLists.Hidden=true;
      sc.LeftView.Player.Hidden=true;
      sc.LeftView.Tree.Hidden=true;

      sc.Splitter.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);
      sc.LeftView.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);
      sc.RightView.setOwnerAndParent(sc.Slides,sc.Frame,sc.Frame.Client);

      sc.LeftView.PlayLists.setOwnerAndParent(sc.Switcher.Slides,sc.Switcher,sc.Switcher.Container);

      sc.LeftView.Tree.setOwnerAndParent(sc.Switcher.Slides,sc.Switcher,sc.Switcher.Container);
      sc.Switcher.Nav.setOwnerAndParent(sc.Switcher.Slides,sc.Switcher,sc.Switcher.Container);

      sc.LeftView.Tree.Hidden=false;
      sc.LeftView.PlayLists.Hidden=false;


      sc.setSize();
      sc.Switcher.Show();
    };
  }
};

