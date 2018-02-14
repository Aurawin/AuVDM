coContacts.Nav=coContacts.App.Components.Nav = {
  Version        : new Version(2014,8,7,20),
  Title          : new Title("Spectrum Contact Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coContacts.App,'/core/spc/cts/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var Nav=coAppUI.App.Components.Nav.Create("Contacts","Nav",Screen,Screen.Slides,Screen.Frame,Screen.Frame.Client);
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      Nav.oAutoShowOn,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
       var cts=navItem.Nav.Screen;
       cts.ListView.Commands.Cancel();
       cts.DB.Commands.List.reTry();
      }
    );
    Nav.gpOptions=Nav.Items.addItem(
      Nav.itemKind.Group,"gpOptions","Commands",
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
    Nav.gpNew=Nav.Items.addItem(
      Nav.itemKind.Group,"gpNewGroup","New",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      [Nav.gpOptions],
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpEdit=Nav.Items.addItem(
      Nav.itemKind.Group,"gpEdit","Edit",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var cts=navItem.Nav.Screen;
        if (cts.ListView.Items.Selected==null) return false;
        var edt=cts.Nav.gpEdit.Slide;
        var li=cts.ListView.Items.Selected;
        if (li.Data!=null) edt.Load(li.Data);
        return true
      }
    );
    Nav.gpDelete=Nav.Items.addItem(
      Nav.itemKind.Group,"gpDelete","Delete",
      Nav.oAutoShowOff,
      Nav.oCascadeChildren,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var cts=navItem.Nav.Screen;
        var cmds=cts.ListView.Commands;
        cmds.onConfirm=function(cmd){
          var cts=cmd.Owner.Owner.Screen;
          var dbItm=cmd.Item.Data;
          var netCMD=coVDM.VDM.Net.Commands.createCommand(
            cts.DB.Commands.Delete.Net,
            cts.DB.Commands.Delete.NSCore,
            cts.DB.Commands.Delete.NSCommand,
            coXML.Header+dbItm.toXML(),
            cts.DB.Commands.onDeleteComplete,
            cts.DB.Commands.onCmdError,
            cts.DB.Commands.onCmdTimeOut,
            coNet.NoProgress,
            coNet.CreateAndRun,
            coNet.FreeOnComplete,
            coNet.AutoLoadOff
          );
          netCMD.Data=cmd.Item;
        };
        cmds.setMode(cmds.Mode.Delete);
      }
    );
    Nav.gpNew.Slide=coContacts.Editor.Create(Screen,"New Contact");
    Nav.gpNew.Slide.Align.setValue(coAppUI.Alignment.Client);
    Nav.gpNew.Menu=Nav.gpNew.Items.addItem(
      Nav.itemKind.Menu,"View","Menu",
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
    Nav.gpNew.Menu.onMenuItemSelect=function(mnuItem){
      var cts=this.Nav.Screen;
      var edt=cts.Nav.gpNew.Slide;
      var pnl=mnuItem.Data;
      edt.Container.scrollTop=pnl.Container.offsetTop;
    };
    var edt=Nav.gpNew.Slide;
    Nav.gpNew.Menu.miNames=Nav.gpNew.Menu.addItem(
      "Name",
      coLang.Table.Labels.Name,
      null,
      Nav.gpNew.Menu.onMenuItemSelect,
      edt.Panels.Names
    );
    Nav.gpNew.Menu.miLocations=Nav.gpNew.Menu.addItem(
      "Location",
      coLang.Table.Labels.Location,
      null,
      Nav.gpNew.Menu.onMenuItemSelect,
      edt.Panels.Locations
    );
    Nav.gpNew.Menu.miPhone=Nav.gpNew.Menu.addItem(
      "Phone",
      coLang.Table.Labels.Phone,
      null,
      Nav.gpNew.Menu.onMenuItemSelect,
      edt.Panels.Phones
    );
    Nav.gpNew.Menu.miEmails=Nav.gpNew.Menu.addItem(
      "Email",
      coLang.Table.Labels.Email,
      null,
      Nav.gpNew.Menu.onMenuItemSelect,
      edt.Panels.Emails
    );
    Nav.gpNew.Menu.miTexts=Nav.gpNew.Menu.addItem(
      "Text",coLang.Table.Labels.Text,
      null,
      Nav.gpNew.Menu.onMenuItemSelect,
      edt.Panels.Texts
    );
    Nav.gpNew.Menu.miFields=Nav.gpNew.Menu.addItem(
      "Custom",
      coLang.Table.Labels.Custom,
      null,
      Nav.gpNew.Menu.onMenuItemSelect,
      edt.Panels.Fields
    );
    Nav.gpNew.Confirm=Nav.gpNew.Items.addItem(
      Nav.itemKind.Confirm,"cnfNew",["Save","Cancel"],
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.gpNew.Slide,
      Nav.NoShowList,
      [Nav.gpNew],
      Nav.gpOptions,
      [
        function(navItem){
          var cts=navItem.Nav.Screen;
          var edt=cts.Nav.gpNew.Slide;
          edt.Panels.Commit();
          cts.DB.Commands.Add.dataSend=coXML.Header+edt.DataSet.toXML();
          cts.DB.Commands.Add.Data=edt.DataSet;
          cts.DB.Commands.Add.reTry();
        },
        function(navItem){
          var cts=navItem.Nav.Screen;
          var edt=cts.Nav.gpNew.Slide;
          var itm=edt.DataSet;
          itm.Free();
          edt.DataSet=null;
        }
      ]
    );
    Nav.gpEdit.Slide=coContacts.Editor.Create(Screen,"Edit Contact");
    Nav.gpEdit.Slide.Align.setValue(coAppUI.Alignment.Client);
    Nav.gpEdit.Menu=Nav.gpEdit.Items.addItem(
      Nav.itemKind.Menu,"View","Menu",
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
    Nav.gpEdit.Menu.onMenuItemSelect=function(mnuItem){
      var cts=mnuItem.Menu.Nav.Screen;
      var edt=cts.Nav.gpEdit.Slide;
      var pnl=mnuItem.Data;
      edt.Container.scrollTop=pnl.Container.offsetTop;
    };
    var edt=Nav.gpEdit.Slide;
    Nav.gpEdit.Menu.miNames=Nav.gpEdit.Menu.addItem(
      "Name",
      coLang.Table.Labels.Name,
      null,
      Nav.gpEdit.Menu.onMenuItemSelect,
      edt.Panels.Names
    );
    Nav.gpEdit.Menu.miLocations=Nav.gpEdit.Menu.addItem(
      "Location",
      coLang.Table.Labels.Location,
      null,
      Nav.gpEdit.Menu.onMenuItemSelect,
      edt.Panels.Locations
    );
    Nav.gpEdit.Menu.miPhones=Nav.gpEdit.Menu.addItem(
      "Phones",
      coLang.Table.Labels.Phone,
      null,
      Nav.gpEdit.Menu.onMenuItemSelect,
      edt.Panels.Phones
    );
    Nav.gpEdit.Menu.miEmails=Nav.gpEdit.Menu.addItem(
      "Email",
      coLang.Table.Labels.Email,
      null,
      Nav.gpEdit.Menu.onMenuItemSelect,
      edt.Panels.Emails
    );
    Nav.gpEdit.Menu.miTexts=Nav.gpEdit.Menu.addItem(
      "Text",
      coLang.Table.Labels.Text,
      null,
      Nav.gpEdit.Menu.onMenuItemSelect,
      edt.Panels.Texts
    );
    Nav.gpEdit.Menu.miFields=Nav.gpEdit.Menu.addItem(
      "Custom",
      coLang.Table.Labels.Custom,
      null,
      Nav.gpEdit.Menu.onMenuItemSelect,
      edt.Panels.Fields
    );
    Nav.gpEdit.Menu.miFields=Nav.gpEdit.Menu.addItem(
      "Avatar",
      coLang.Table.Apps.Social.Network.Avatar,
      null,
      Nav.gpEdit.Menu.onMenuItemSelect,
      edt.Panels.Avatar
    );
    Nav.gpEdit.Confirm=Nav.gpEdit.Items.addItem(
      Nav.itemKind.Confirm,"cnfEdit",["Save","Cancel"],
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.gpOptions,
      [
        function(navItem){
          var cts=navItem.Nav.Screen;
          var edt=cts.Nav.gpEdit.Slide;
          edt.Commit();
          edt.Write();
        },
        function(navItem){
          // don't need to do anything
          var cts=navItem.Nav.Screen;
          var edt=cts.Nav.gpEdit.Slide;
          edt.Reset();
        }
      ]
    );
    Nav.gpEdit.Confirm.Slide=Nav.gpEdit.Slide;

    Nav.gpDelete.Confirm=Nav.gpDelete.Items.addItem(
      Nav.itemKind.Confirm,"cnfDelete",["Confirm","Cancel"],
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      [Nav.gpDelete],
      Nav.gpOptions,
      [
       function (navItem){
         var cts=navItem.Nav.Screen;
         var lv=cts.ListView;
         if (lv.Visible==true) {
           lv.Commands.Confirm();
         } else {
          // a Contact group was deleted
         }
       },
       function(navItem){
         var cts=navItem.Nav.Screen;
         var lv=cts.ListView;
         if (lv.Visible==true) {
           lv.Commands.Cancel();
         } else {

         }
       }
      ]
    );
    Nav.gpOptions.New=Nav.gpOptions.Items.addItem(
      Nav.itemKind.Button,"btnNew",coLang.Table.Buttons.New,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpNew,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function (navItem){
        var cts=navItem.Nav.Screen;
        var edt=cts.Nav.gpNew.Slide;
        edt.Load(cts.DB.addItem());
      }
    );
    Nav.gpOptions.Edit=Nav.gpOptions.Items.addItem(
      Nav.itemKind.Button,"btnEdit",coLang.Table.Buttons.Edit,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpEdit,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpOptions.Delete=Nav.gpOptions.Items.addItem(
      Nav.itemKind.Button,"btnDelete",coLang.Table.Buttons.Delete,
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOff,
      Nav.gpDelete,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.gpOptions,
      Nav.NoClick
    );

    Nav.Home.Target=Nav.gpOptions;
    Nav.Home.Slide=Screen.ListView;
    Nav.Home.HideList.push(Nav.gpEdit);
    Nav.Home.HideList.push(Nav.gpNew);
    Nav.Home.HideList.push(Nav.gpDelete);
    Nav.Home.ShowList.push(Nav.gpOptions);

    Nav.gpOptions.Slide=Screen.ListView;
    Nav.gpOptions.HideList.push(Nav.gpEdit);
    Nav.gpOptions.HideList.push(Nav.gpNew);
    Nav.gpOptions.HideList.push(Nav.gpDelete);

    Nav.gpEdit.HideList.push(Nav.gpOptions);
    Nav.gpEdit.HideList.push(Nav.gpNew);
    Nav.gpEdit.HideList.push(Nav.gpDelete);
    Nav.gpEdit.HideList.push(Nav.Home.Slide);
    Nav.gpEdit.Confirm.HideList.push(Nav.gpEdit);

    Nav.gpNew.HideList.push(Nav.gpEdit);
    Nav.gpNew.HideList.push(Nav.gpOptions);
    Nav.gpNew.HideList.push(Nav.gpDelete);

    Nav.gpDelete.HideList.push(Nav.gpOptions);
    Nav.gpDelete.HideList.push(Nav.gpEdit);
    Nav.gpDelete.HideList.push(Nav.gpNew);
    Nav.gpDelete.Slide=Screen.ListView;
    return Nav;
  }
};
