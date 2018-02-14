coSocial.App.Components.Views = {
  Version        : new Version(2014,10,13,93),
  Title          : new Title("Social Networking Views","Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/Views.js',coAppKit.PreLoaded),
  debugToConsole : true,
  CreateSwitcher:function(Screen){
    var sc=Screen;
    sw=coAppUI.App.Components.MultiView.Create("Switcher","sldClient",sc,sc.Slides,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Default);
    sw.zIndex=2;
    return sw;
  },
  SetView:function(Screen){
    var sc=Screen;
    var mfv=sc.Manifest.MAP.ViewMode.Value;
    if (mfv!=coSocial.vmComplete) {
      sc.Manifest.MAP.ViewMode.Value=coSocial.vmComplete;
      sc.ViewMode=coSocial.vmComplete;
      coVDM.Manifest.Save();
    };
    sc.Switcher.Conseal();
    sc.Deletor.Conseal();
    sc.Requests.Conseal();

    sc.Editor.Conseal();
    sc.Search.Conseal();

    sc.Editor.Align.Index=coAppUI.Alignment.Client;
    sc.Selector.Align.Index=coAppUI.Alignment.Client;
    sc.Deletor.Align.Index=coAppUI.Alignment.Client;


    sc.Requests.setOwnerAndParent(sc.Switcher.Slides,sc.Switcher,sc.Switcher.Container);

    //sc.Switcher.Nav.Menu.Conseal();

    //sc.Selector.Show();
    //sc.setSize();
  },
  ShowRequests:function(Screen){
    var sc=Screen;
    sc.Requests.Reveal();
    sc.Switcher.Reveal();
    sc.Switcher.Nav.setSelected(sc.Switcher.Nav.gpRequests);
  },
  ShowDeleteNetworks:function(Screen){
    var sc=Screen;
    var Nav=sc.Switcher.Nav;
    sc.Switcher.Reveal();
    sc.Deletor.Reveal();
    sc.Switcher.Nav.setSelected(sc.Switcher.Nav.gpDelNetworks);

    var nSel=sc.Deletor;
    nSel.My.Items.Mode.setValue(nSel.My.Items.Mode.Delete);
    nSel.Other.Items.Mode.setValue(nSel.Other.Items.Mode.Delete);
  },
  ShowNewNetwork:function(Screen){
    var sc=Screen;
    var Nav=sc.Switcher.Nav;

    sc.Editor.Reveal();
    sc.Switcher.Reveal();

    sc.Switcher.Nav.setSelected(sc.Switcher.Nav.gpNewNetwork);

    sc.Editor.Network.Reset();
    sc.Editor.Load(sc.Editor.Network);
    sc.Editor.setEditorCaption(coLang.Table.Apps.Social.Network.New);

  },
  ShowEditNetwork:function(Screen,dbItem){
    var sc=Screen;
    var Nav=sc.Switcher.Nav;
    sc.Editor.Reveal();
    sc.Switcher.Reveal();

    sc.Switcher.Nav.setSelected(sc.Switcher.Nav.gpEditNetwork);

    sc.Editor.Load(dbItem);
    sc.Editor.setEditorCaption(coLang.Table.Apps.Social.Network.Edit);

  },
  ShowSearch:function(Screen){
    var sc=Screen;
    var nSel=sc.Search;
    nSel.Reveal();
    sc.Switcher.Reveal();
    sc.Switcher.Nav.setSelected(sc.Switcher.Nav.gpSearch);
    nSel.Group.Items.Mode.setValue(nSel.Group.Items.Mode.Join);
    sc.Switcher.setSize();
  },
  AdjustGroups:function(Screen){
    var sc=Screen;
    var nSel=sc.Selector;
    switch (sc.ViweMode){
      case (coSocial.vmSimple):
        // nothing to do
        break;
      case (coSocial.vmComplete):
        if (nSel.Visible==true) {
          sc.Nav.gpCabinet.AddToShowList(sc.Nav.gpNetwork);
          sc.Nav.gpCabinet.AddToShowList(sc.Selector);
          sc.Nav.gpCabinet.AddToShowList(sc.Splitter);
        } else {
          sc.Nav.gpCabinet.AddToHideList(sc.Nav.gpNetwork);
          sc.Nav.gpCabinet.AddToHideList(sc.Selector);
          sc.Nav.gpCabinet.AddToHideList(sc.Splitter);
        };
        break;
    };
  }
};
