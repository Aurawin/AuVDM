coSignatures.App.Components.Nav = {
  Version        : new Version(2014,8,14,66),
  Title          : new Title("Spectrum Signatures Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSignatures.App,'/core/spc/sigs/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(_sigs){
    var Nav=_sigs.Nav=coAppUI.App.Components.Nav.Create("Signatures","Nav",_sigs,_sigs.Slides,_sigs.Frame,_sigs.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      _sigs.ListView,
      [_sigs.ListView],
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
         var sigs=navItem.Nav.Screen;
      }
    );
    Nav.gpOptions=Nav.Items.addItem(
      Nav.itemKind.Group,"gpOptions","Options",
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      _sigs.ListView,
      [_sigs.ListView],
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpOptions.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpOptions,
      Nav.NoMenuItem,
      Nav.NoClick
    );
    Nav.gpNew=Nav.Items.addItem(
      Nav.itemKind.Group,"gpNew","New",
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      _sigs.Editor,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.Home,
      Nav.NoClick
    );
    Nav.gpEdit=Nav.Items.addItem(
      Nav.itemKind.Group,"gpEdit","Edit",
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      _sigs.Editor,
      Nav.NoShowList,
      [Nav.gpNew,Nav.gpOptions,_sigs.ListView],
      Nav.Home,
      Nav.NoClick
    );
    Nav.gpDelete=Nav.Items.addItem(
      Nav.itemKind.Group,"gpDelete","Delete",
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      _sigs.ListView,
      [_sigs.ListView],
      [Nav.gpNew,Nav.gpOptions],
      Nav.gpOptions,
      Nav.NoClick
    );
    Nav.Home.ShowList.push(Nav.gpOptions);
    Nav.Home.Target=Nav.gpOptions;

    Nav.AddToGroupHideLists(Nav.gpNew);
    Nav.AddToGroupHideLists(Nav.gpEdit);
    Nav.AddToGroupHideLists(Nav.gpOptions);
    Nav.AddToGroupHideLists(Nav.gpDelete);

    Nav.btnNew=Nav.gpOptions.Items.addItem(
      Nav.itemKind.Button,"btnNew",coLang.Table.Buttons.New,
      Nav.oAutoShowOn,
      Nav.oCascadeOff,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpNew,
      Nav.NoSlide,
      Nav.NoShowList,
      [_sigs.ListView],
      Nav.NoReturn,
      function (navItem){
        var sigs=navItem.Nav.Screen;
        var itm=sigs.Nav.gpNew.Data=sigs.DB.addItem();
        var li=sigs.ListView.Items.fromDB(itm);
        itm.Display.addItem(li,sigs.ListView);
        sigs.Editor.Panels.setRecord(itm,coAppUI.ShowTorus);
        sigs.Editor.Panels.resetValues();
      }
    );
    Nav.btnEdit=Nav.gpOptions.Items.addItem(
      Nav.itemKind.Button,"btnEdit",coLang.Table.Buttons.Edit,
      Nav.oAutoShowOn,
      Nav.oCascadeOff,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpEdit,
      Nav.NoSlide,
      Nav.NoShowList,
      [_sigs.ListView],
      Nav.gpOptions,
      function (navItem){
        var sigs=navItem.Nav.Screen;
        if (!sigs.ListView.Items.Selected) return;
        var itm=sigs.Nav.gpEdit.Data=sigs.ListView.Items.Selected.Data;
        sigs.Editor.Panels.setRecord(itm,coAppUI.ShowTorus);
        sigs.Editor.Panels.resetValues();
      }
    );
    Nav.btnDelete=Nav.gpOptions.Items.addItem(
      Nav.itemKind.Button,"btnDelete",coLang.Table.Buttons.Delete,
      Nav.oAutoShowOn,
      Nav.oCascadeOff,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpDelete,
      _sigs.ListView,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function (navItem){
        var sigs=navItem.Nav.Screen;
      }
    );
    Nav.gpNew.Confirm=Nav.gpNew.Items.addItem(
      Nav.itemKind.Confirm,"cnfNew",[coLang.Table.Buttons.Create,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpOptions,
      _sigs.Editor,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.gpOptions,
      [
        function(navItem){ // ok
          var sigs=navItem.Nav.Screen;
          var itm=sigs.Nav.gpNew.Data;
          sigs.Editor.Panels.Commit();
          sigs.DB.Commands.Add.dataSend=coXML.Header+itm.toXML();
          sigs.DB.Commands.Add.Data=itm;
          sigs.DB.Commands.Add.reTry();
        },
        function(navItem){ // cancel
          var sigs=navItem.Nav.Screen;
          sigs.Editor.Panels.resetValues();
          var itm=sigs.Nav.gpNew.Data;
          itm.Free();
          sigs.Nav.gpNew.Data=null;
        }
      ]
    );
    Nav.gpEdit.Confirm=Nav.gpEdit.Items.addItem(
      Nav.itemKind.Confirm,"cnfEdit",[coLang.Table.Buttons.Save,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      [_sigs.ListView],
      Nav.gpOptions,
      [
        function(navItem){ // ok
          var sigs=navItem.Nav.Screen;
          var edt=sigs.Editor;
          var lv=sigs.ListView;
          var itm=sigs.Nav.gpEdit.Data;
          edt.Panels.Commit();
          sigs.DB.Commands.Write.dataSend=coXML.Header+itm.toXML();
          sigs.DB.Commands.Write.Data=itm;
          sigs.DB.Commands.Write.reTry();
        },
        function(navItem){ // cancel
          var sigs=navItem.Nav.Screen;
          sigs.Editor.Panels.resetValues();
        }
      ]
    );
    Nav.gpDelete.Confirm=Nav.gpDelete.Items.addItem(
      Nav.itemKind.Confirm,"cnfDelete",[coLang.Table.Buttons.Delete,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpOptions,
      _sigs.ListView,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.gpOptions,
      [
        function(navItem){ // ok
          var sigs=navItem.Nav.Screen;
        },
        function(navItem){ // cancel
          var sigs=navItem.Nav.Screen;
        }
      ]
    );

    return Nav;
  }
};
