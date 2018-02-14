coCollageBoard.App.Components.Nav = {
  Version        : new Version(2014,8,7,48),
  Title          : new Title("Collage Board Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCollageBoard.App,'/core/collages/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function (Screen){
    var sc=Screen;
    var Nav=coAppUI.App.Components.Nav.Create("CollageBoard","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      sc.Views.List,
      [sc.Views.List],
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;
      }
    );
    Nav.gpList=Nav.Items.addItem(
      Nav.itemKind.Group,"gpList",coLang.Table.Labels.List,
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.Views.List,
      [sc.Views.List],
      [sc.Views.Editor,sc.Views.Editor.Switcher],
      Nav.NoReturn,
      function(navItem){
        var sc=navItem.Nav.Screen;

      }
    );
    Nav.Home.Target=Nav.gpList;
    Nav.Home.ShowList.push(Nav.gpList);

    Nav.gpDelete=Nav.Items.addItem(
      Nav.itemKind.Group,"gpDelete",coLang.Table.Labels.Delete,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.Views.List,
      [sc.Views.List],
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var Nav=navItem.Nav;
        var sc=Nav.Screen;
        var lv=sc.Views.List;
        lv.Commands.setMode(lv.Commands.Mode.Delete);
      }
    );
    Nav.gpDelete.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpList,
      Nav.NoMenuItem,
      Nav.NoClick
    );
    Nav.gpDelete.Confirm=Nav.gpDelete.Items.addItem(
      Nav.itemKind.Confirm,"cnfDelete",[coLang.Table.Buttons.Confirm,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.gpList,
      sc.Views.List,
      [sc.Views.List],
      Nav.NoHideList,
      Nav.gpList,
      [
        function(navItem){ // Deleted
          var Nav=navItem.Nav;
          var sc=Nav.Screen;
          var lv=sc.Views.List;
          for (var iLcv=0; iLcv<lv.Items.length; iLcv++){
            var li=lv.Items[iLcv];
            if (li.Command.Checked==true){
              var dbItem=li.Data;
              sc.DB.Commands.Delete(dbItem);
            };
          };
          lv.Commands.setMode(lv.Commands.Mode.Default);
        },
        function(navItem){ // Cancel
          var sc=navItem.Nav.Screen;
          var lv=sc.Views.List;
          lv.Commands.setMode(lv.Commands.Mode.Default);
        }
      ]
    );
    Nav.gpList.Menu=Nav.gpList.Items.addItem(
      Nav.itemKind.Menu,"mnuList",coLang.Table.Labels.Menu,
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
    Nav.gpList.ShowList.push(Nav.gpList.Menu);
    // Refresh Collages
    Nav.gpList.Menu.miRefresh=Nav.gpList.Menu.addItem(
      "miRefresh",
      coLang.Table.Buttons.Refresh,
      Nav.gpList,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.DB.Commands.List();
      },
      Nav.NoData
    );
    // Add Collage Page
    Nav.gpList.Menu.miAdd=Nav.gpList.Menu.addItem(
      "miAdd",
      coLang.Table.Labels.Add,
      Nav.gpList,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        var edt=sc.Views.Editor;
        var Nav=edt.Switcher.Nav;
        sc.Views.List.Conseal();
        edt.Load(sc.DB.createItem());
        Nav.forceSelected(Nav.gpKind);
      },
      Nav.NoData
    );
    // Edit Collage Page
    Nav.gpList.Menu.miEdit=Nav.gpList.Menu.addItem(
      "miEdit",
      coLang.Table.Labels.Edit,
      Nav.gpList,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        if (sc.Views.List.Items.Selected){
          var edt=sc.Views.Editor;
          sc.Views.List.Conseal();
          edt.Load(sc.Views.List.Items.Selected.Data);
        };
      },
      Nav.NoData
    );
    // Delete Collage Page
    Nav.gpList.Menu.miDelete=Nav.gpList.Menu.addItem(
      "miDelete",
      coLang.Table.Labels.Delete,
      Nav.gpDelete,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
      },
      Nav.NoData
    );

    Nav.AddToGroupHideLists(Nav.gpList);
    Nav.AddToGroupHideLists(Nav.gpDelete);

    return Nav;
  },
  initEditor:function(edt){
    var sc=edt.Screen;
    var Details=edt.Switcher.Views.Details;
    // install switchItems
    var Nav=edt.Switcher.Nav;
    Nav.Home.Conseal();
    Nav.gpKind=Nav.Items.addItem(
      Nav.itemKind.Group,"gpKind",coLang.Table.Labels.Kind,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      edt.Switcher.Views.Kind,
      [edt,edt.Switcher,edt.Switcher.Views.Kind],
      [edt.Switcher.Views.Details],
      Nav.NoReturn,
      function(navItem){

      }
    );
    Nav.gpKind.Confirm=Nav.gpKind.Items.addItem(
      Nav.itemKind.Confirm,"cnfSelect",[coLang.Table.Buttons.Next,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      edt.Switcher.Views.Kind,
      Nav.NoShowList,
      [edt.Switcher.Views.Details],
      Nav.NoReturn,
      [
        function(navItem){ // Select
          var Nav=navItem.Nav;
          var sc=Nav.Screen;
          var elSample=sc.Views.Editor.Switcher.Views.Kind.Selected;
          var elPublish=sc.Views.Editor.Switcher.Views.Details.Slides.Collage;
          var API=coCollageBoard.App.Components.edtViews;
          API.copyElementsForPublisher(elSample,elPublish);
          API.initElementsForPublisher(elPublish);
          Nav.forceSelected(Nav.gpNewDetails);
          return false;
        },
        function(navItem){ // Cancel
          var sc=navItem.Nav.Screen;
          //sc.Views.Editor.Conseal();
          sc.Nav.forceSelected(sc.Nav.gpList);
        }
      ]
    );
    Nav.gpNewDetails=Nav.Items.addItem(
      Nav.itemKind.Group,"gpNewDetails",coLang.Table.Labels.Details,
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      edt.Switcher.Views.Details,
      [edt.Switcher],
      [edt.Switcher.Views.Kind],
      Nav.NoReturn,
      function(navItem){

      }
    );
    Nav.gpNewDetails.btnBack= Nav.gpNewDetails.Items.addItem(
      Nav.itemKind.Button,"btnBack",coLang.Table.Buttons.Back,
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      edt.Switcher.Views.Details,
      Nav.NoShowList,
      [edt.Switcher.Views.Kind],
      Nav.gpKind,
      function(navItem){
        var Nav=navItem.Nav;

        ///Nav.forceSelected(Nav.gpKind);
        //return false;
      }
    );
    Nav.gpNewDetails.Confirm=Nav.gpNewDetails.Items.addItem(
      Nav.itemKind.Confirm,"cnfNewDetails",[coLang.Table.Buttons.Create,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      edt.Switcher.Views.Details,
      [edt,edt.Switcher],
      Nav.NoHideList,
      Nav.NoReturn,
      [
        function(navItem){ // Select
          var Nav=navItem.Nav;
          var sc=Nav.Screen;
          var edt=sc.Views.Editor;
          sc.Frame.Torus.Start();
          edt.Commit();
          sc.DB.Commands.Add(edt.DataSet,sc.Frame.Torus);
          edt.Clear();
          sc.Nav.forceSelected(sc.Nav.gpList);
        },
        function(navItem){ // Cancel
          var sc=navItem.Nav.Screen;
          var edt=sc.Views.Editor;
          edt.Clear();
          sc.Nav.forceSelected(sc.Nav.gpList);
        }
      ]
    );
    Nav.gpEditDetails=Nav.Items.addItem(
      Nav.itemKind.Group,"gpEditDetails",coLang.Table.Labels.Details,
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      edt.Switcher.Views.Details,
      [edt,edt.Switcher],
      [edt.Switcher.Views.Kind],
      Nav.NoReturn,
      function(navItem){

      }
    );
    Nav.gpEditDetails.mnuMode=Nav.gpEditDetails.Items.addItem(
      Nav.itemKind.Menu,"mnuMode",coLang.Table.Labels.Mode,
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpEditDetails.mnuMode.AllowCaptionChange=true;

    Nav.gpEditDetails.mnuMode.miPreview=Nav.gpEditDetails.mnuMode.addItem(
      "miPreview",
      coLang.Table.Labels.Preview,
      Nav.gpEditDetails,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        var edt=sc.Views.Editor;
        var dets=edt.Switcher.Views.Details;
        dets.Slides.Title.Conseal();
        dets.Slides.Description.Conseal();
        dets.Slides.Location.Reveal();
        dets.Slides.Location.Text.Show();
        edt.setSize();
        dets.Slides.Collage.setSize();
        dets.setSize();
      },
      Nav.NoData
    );
    Nav.gpEditDetails.mnuMode.miPreview.SaveSelection=true;
    Nav.gpEditDetails.mnuMode.miEdit=Nav.gpEditDetails.mnuMode.addItem(
      "miEdit",
      coLang.Table.Labels.Edit,
      Nav.gpEditDetails,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        var edt=sc.Views.Editor;
        var dets=edt.Switcher.Views.Details;
        dets.Slides.Location.Conseal();
        dets.Slides.Title.Reveal();
        dets.Slides.Title.Text.Show();
        dets.Slides.Description.Reveal();
        edt.setSize();
        dets.Slides.Collage.setSize();
        dets.setSize();
      },
      Nav.NoData
    );
    Nav.gpEditDetails.mnuMode.miEdit.SaveSelection=true;

    Nav.gpEditDetails.mnuDelay=Nav.gpEditDetails.Items.addItem(
      Nav.itemKind.Menu,"mnuDelay",coLang.Table.Labels.Delay,
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
    Nav.gpEditDetails.mnuDelay.AllowCaptionChange=false;
    Nav.gpEditDetails.mnuDelay.miFaster=Nav.gpEditDetails.mnuDelay.addItem(
      "miFaster",
      coLang.Table.Labels.Faster,
      Nav.gpEditDetails,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        var edt=sc.Views.Editor;
        var collage=edt.Switcher.Views.Details.Slides.Collage;
        var itm=edt.DataSet.MAP;
        var iSleep=itm.Delay.Value;
        iSleep-=500;
        if (iSleep<coCollageBoard.minElementSwitchDelay)
          iSleep=coCollageBoard.minElementSwitchDelay;
        itm.Delay.Value=iSleep;
        collage.setDelay(iSleep);
      },
      Nav.NoData
    );
    Nav.gpEditDetails.mnuDelay.miSlower=Nav.gpEditDetails.mnuDelay.addItem(
      "miSlower",
      coLang.Table.Labels.Slower,
      Nav.gpEditDetails,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        var edt=sc.Views.Editor;
        var collage=edt.Switcher.Views.Details.Slides.Collage;
        var itm=edt.DataSet.MAP;
        var iSleep=itm.Delay.Value;
        iSleep+=500;
        if (iSleep>coCollageBoard.maxElementSwitchDelay)
          iSleep=coCollageBoard.maxElementSwitchDelay;
        itm.Delay.Value=iSleep;
        collage.setDelay(iSleep);
      },
      Nav.NoData
    );
    Nav.gpEditDetails.Confirm=Nav.gpEditDetails.Items.addItem(
      Nav.itemKind.Confirm,"cnfEditDetails",[coLang.Table.Buttons.Save,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      edt.Switcher.Views.Details,
      [edt.Switcher.Views.Details],
      [edt.Switcher.Views.Kind],
      Nav.NoReturn,
      [
        function(navItem){ // Select
          var Nav=navItem.Nav;
          var sc=Nav.Screen;
          var edt=sc.Views.Editor;
          edt.Commit();
          sc.DB.Commands.Write(edt.DataSet,sc.Frame.Torus);
          edt.Clear();
          sc.Nav.forceSelected(sc.Nav.gpList);
        },
        function(navItem){ // Cancel
          var sc=navItem.Nav.Screen;
          var edt=sc.Views.Editor;
          edt.Clear();
          sc.Nav.forceSelected(sc.Nav.gpList);
        }
      ]
    );
    Nav.AddToGroupHideLists(Nav.gpKind);
    Nav.AddToGroupHideLists(Nav.gpNewDetails);
    Nav.AddToGroupHideLists(Nav.gpEditDetails);
  }
};

