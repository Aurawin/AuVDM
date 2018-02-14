coVDM.App.Components.coAccount.App.Components.Nav = {
  Version        : new Version(2014,8,7,35),
  Title          : new Title("Account Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAccount.App,'/core/vdm/account/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var Nav=Screen.Nav=coAppUI.App.Components.Nav.Create("Account","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      [sc.Slides.Usage],
      [sc.Slides.Usage],
      Nav.NoHideList,
      Nav.NoReturn,
      function(){
        // todo
      }
    );
    Nav.Menu=Nav.Items.addItem(
      Nav.itemKind.Menu,"mnuMain",coLang.Table.Labels.Menu,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.Home.ShowList.Add(Nav.Menu);
    Nav.Menu.AllowCaptionChange=true;
    Nav.gpUsage=Nav.Items.addItem(
      Nav.itemKind.Group,"gpUsage",coLang.Table.Account.Usage,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      sc.Slides.Usage,
      [sc.Slides.Usage],
      [sc.Slides.Services,sc.Slides.Payments],
      Nav.NoReturn,
      function(){

      }
    );
    Nav.gpBilling=Nav.Items.addItem(
      Nav.itemKind.Group,"gpBilling",coLang.Table.Account.Billing,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      [sc.Slides.Usage,sc.Slides.Services,sc.Slides.Payments],
      Nav.NoReturn,
      function(){

      }
    );
    Nav.gpPayments=Nav.Items.addItem(
      Nav.itemKind.Group,"gpPayments",coLang.Table.Account.Payments,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [sc.Slides.Payments],
      [sc.Slides.Usage,sc.Slides.Services],
      Nav.NoReturn,
      function(){

      }
    );
    Nav.gpServices=Nav.Items.addItem(
      Nav.itemKind.Group,"gpServices",coLang.Table.Account.Services,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [sc.Slides.Services],
      [sc.Slides.Usage,sc.Slides.Payments],
      Nav.NoReturn,
      function(){

      }
    );
    Nav.gpPayments.cnfDelete=Nav.gpPayments.Items.addItem(
      Nav.itemKind.Confirm,"cnfDelete",[coLang.Table.Buttons.Delete,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOff,
      Nav.oCascadeOff,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      [sc.Slides.Payments],
      [sc.Slides.Usage,sc.Slides.Services],
      Nav.NoReturn,
      [
        function(navItem){
          var sc=navItem.Nav.Screen;
          var cmds=sc.Slides.Payments.ListView.Commands;
          cmds.Confirm();
        },
        function(navItem){
          var sc=navItem.Nav.Screen;
          var cmds=sc.Slides.Payments.ListView.Commands;
          cmds.Cancel();
        }
      ]
    );
    Nav.Menu.miUsage=Nav.Menu.addItem(
      "miUsage",
      coLang.Table.Account.Usage,
      Nav.gpUsage,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Manifest.MAP.LastView.Value=sc.Unit.lvUsage;
        coVDM.Manifest.Save();
      },
      Nav.NoData
    );
    Nav.Menu.miUsage.SaveSelection=true;
    Nav.Menu.miServices=Nav.Menu.addItem(
      "miServices",
      coLang.Table.Account.Services,
      Nav.gpServices,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Manifest.MAP.LastView.Value=sc.Unit.lvServices;
        coVDM.Manifest.Save();
      },
      Nav.NoData
    );
    Nav.Menu.miServices.SaveSelection=true;
    Nav.Menu.miBilling=Nav.Menu.addItem(
      "miBilling",
      coLang.Table.Account.Billing,
      Nav.gpBilling,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Manifest.MAP.LastView.Value=sc.Unit.lvBilling;
        coVDM.Manifest.Save();
      },
      Nav.NoData
    );
    Nav.Menu.miBilling.SaveSelection=true;
    Nav.Menu.miBilling.Conseal();
    Nav.Menu.miPayments=Nav.Menu.addItem(
      "miPayments",
      coLang.Table.Account.Payments,
      Nav.gpPayments,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Manifest.MAP.LastView.Value=sc.Unit.lvPayments;
        coVDM.Manifest.Save();
      },
      Nav.NoData
    );
    Nav.Menu.miPayments.SaveSelection=true;
    Nav.gpUsage.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpUsage,
      Nav.Menu.miUsage,
      Nav.NoClick
    );
    Nav.gpServices.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpUsage,
      Nav.Menu.miServices,
      Nav.NoClick
    );
    Nav.gpPayments.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpUsage,
      Nav.Menu.miPayments,
      Nav.NoClick
    );
    Nav.gpBilling.homeInfo=Nav.createHomeInfo(
      Nav.Home,
      Nav.gpUsage,
      Nav.Menu.miBilling,
      Nav.NoClick
    );
    Nav.gpPayments.Menu=Nav.gpPayments.Items.addItem(
      Nav.itemKind.Menu,"mnuPayments",coLang.Table.Labels.Menu,
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
    Nav.gpPayments.Menu.miRefresh=Nav.gpPayments.Menu.addItem(
      "miRefresh",
      coLang.Table.Buttons.Refresh,
      Nav.gpPayments,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        coPayments.App.Accounts.Commands.List();
      },
      Nav.NoData
    );
    Nav.gpPayments.Menu.miNew=Nav.gpPayments.Menu.addItem(
      "miNew",
      coLang.Table.Buttons.New,
      Nav.gpPayments,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        // Switch to new editor
        sc.Switcher.Reveal();
        sc.Switcher.Nav.forceSelected(sc.Switcher.Nav.gpNewPayment);
      },
      Nav.NoData
    );
    Nav.gpPayments.Menu.miEdit=Nav.gpPayments.Menu.addItem(
      "miEdit",
      coLang.Table.Buttons.Edit,
      Nav.gpPayments,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;

        var edt=sc.Switcher.Payment;
        var liPayment=sc.Slides.Payments.ListView.Items.Selected;
        edt.diEdit=(liPayment) ? liPayment.Data : null;
        if (edt.diEdit){
          edt.Load(edt.diEdit);
          sc.Switcher.Reveal();
          sc.Switcher.Nav.forceSelected(sc.Switcher.Nav.gpEditPayment);
        };
      },
      Nav.NoData
    );
    Nav.gpPayments.Menu.miUse=Nav.gpPayments.Menu.addItem(
      "miUse",
      coLang.Table.Account.UseCard,
      Nav.gpPayments,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        var liPayment=sc.Slides.Payments.ListView.Items.Selected;
        var dbPayment=(liPayment) ? liPayment.Data : null;
        if (dbPayment) {
          dbPayment.Collection.Commands.MakeActive(dbPayment);
        };
      },
      Nav.NoData
    );
    Nav.gpPayments.Menu.miDelete=Nav.gpPayments.Menu.addItem(
      "miDelete",
      coLang.Table.Buttons.Delete,
      Nav.gpPayments,
      function(mnuItem){
        var sc=mnuItem.Menu.Nav.Screen;
        sc.Slides.Payments.invokeDelete();
      },
      Nav.NoData
    );
    Nav.selectView=function(iView){
      var Nav=this;
      var sc=Nav.Screen;
      switch (iView){
        case(sc.Unit.lvUsage) : sc.Nav.Menu.setSelected(sc.Nav.Menu.miUsage); break;
        case(sc.Unit.lvServices) : sc.Nav.Menu.setSelected(sc.Nav.Menu.miServices); break;
        case(sc.Unit.lvBilling) : sc.Nav.Menu.setSelected(sc.Nav.Menu.miBilling); break;
        case(sc.Unit.lvPayments) : sc.Nav.Menu.setSelected(sc.Nav.Menu.miPayments); break;
      };
    };

    return Nav;
  },
  installSwitchItems:function(Switcher){
    var Nav=Switcher.Nav;
    Nav.gpNewPayment=Nav.Items.addItem(
      Nav.itemKind.Group,"gpNewPayment",coLang.Table.Labels.New,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Switcher.Payment,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(){

      }
    );
    Nav.gpEditPayment=Nav.Items.addItem(
      Nav.itemKind.Group,"gpEditPayment",coLang.Table.Labels.Edit,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Switcher.Payment,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
      }
    );
    Nav.gpNewPayment.Confirm=Nav.gpNewPayment.Items.addItem(
      Nav.itemKind.Confirm,"cnfNewPayment",[coLang.Table.Buttons.New,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.gpNewPayment.Slide,
      Nav.NoShowList,
      [Nav.gpNewPayment],
      Nav.NoReturn,
      [
        function(navItem){
          var sc=navItem.Nav.Screen;
          var edt=sc.Switcher.Payment;
          if (edt.Validate()==false){
            return false;
          };
          edt.Commit(edt.diNew);
          var DB=coPayments.App.Accounts;
          DB.Commands.Add(edt.diNew);
          edt.diNew.Reset();
          sc.Switcher.Conseal();
        },
        function(navItem){
          var sc=navItem.Nav.Screen;
          var edt=sc.Switcher.Payment;
          edt.diNew.Reset();
          sc.Switcher.Conseal();
        }
      ]
    );
    Nav.gpEditPayment.Confirm=Nav.gpEditPayment.Items.addItem(
      Nav.itemKind.Confirm,"cnfEditPayment",[coLang.Table.Buttons.Save,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.gpEditPayment.Slide,
      Nav.NoShowList,
      [Nav.gpEditPayment],
      Nav.NoReturn,
      [
        function(navItem){
          var sc=navItem.Nav.Screen;
          var edt=sc.Switcher.Payment;
          if (edt.Validate()==false){
            return false;
          };
          edt.Commit(edt.diEdit);
          var DB=coPayments.App.Accounts;
          DB.Commands.Write(edt.diEdit);
          edt.diEdit=null;
          sc.Switcher.Conseal();
        },
        function(navItem){
          var sc=navItem.Nav.Screen;
          var edt=sc.Switcher.Payment;
          edt.diNew.Reset();
          sc.Switcher.Conseal();
        }
      ]
    );

    return Nav;
  }
};

