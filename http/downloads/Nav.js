coDownloadsPage.App.Components.Nav = {
  Version        : new Version(2014,8,7,9),
  Title          : new Title("Downloads Page Navigation","Nav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDownloadsPage.App,'/downloads/Nav.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,ListView,Slides,Owner,Parent){
    if (Slides==undefined) Slides=Screen.Slides;
    if (Owner==undefined) Owner=Screen.Frame;
    if (Parent==undefined) Parent=Screen.Frame.Client;
    var sc=Screen;
    var Nav=coAppUI.App.Components.Nav.Create("Nav","Nav",sc,Slides,Owner,Parent,coAppUI.Alignment.Bottom);
    Nav.ListView=ListView;
    Nav.Home=Nav.Items.addItem(
      Nav.itemKind.Button,"btnHome",coLang.Table.Buttons.Refresh,
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        coDownloadsPage.App.Screen.DataSet.Commands.List();
      }
    );

    Nav.mCategory=Nav.Items.addItem(
      Nav.itemKind.Menu,"mnuCategory",coLang.Table.Labels.Category,
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
    Nav.Home.ShowList.Add(Nav.mCategory);
    Nav.mOS=Nav.Items.addItem(
      Nav.itemKind.Menu,"mnuOS",coLang.Table.Labels.OperatingSystem,
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
    Nav.Home.ShowList.Add(Nav.mOS);
    Nav.mCategory.selectAll=function(){

      var mnu=this;
      var Nav=mnu.Nav;
      var lv=Nav.ListView;
      var ds=lv.DataSet;
      lv.Commands.Cancel();

      var lst=ds.Groups.Category.Values[mnu.miServer.getCaption()];
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var dbItem=lst[iLcv];
        dbItem.Visible=true;
      };
      var lst=ds.Groups.Category.Values[mnu.miDesktop.getCaption()];
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var dbItem=lst[iLcv];
        dbItem.Visible=true;
      };
      ds.Displays.Synchronize();
    };
    Nav.mCategory.miAll=Nav.mCategory.addItem(
      "miAll",
      coLang.Table.Labels.All,
      Nav.NoTarget,
      function(mnuItem){
        mnuItem.Menu.selectAll();
      },
      Nav.NoData
    );
    Nav.mCategory.selectDesktop=function(){
      var mnu=this;
      var Nav=mnu.Nav;
      var lv=Nav.ListView;
      var ds=lv.DataSet;

      lv.Commands.Cancel();

      var lst=ds.Groups.Category.Values[mnu.miServer.getCaption()];
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var dbItem=lst[iLcv];
        dbItem.Visible=false;
      };
      var lst=ds.Groups.Category.Values[mnu.miDesktop.getCaption()];
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var dbItem=lst[iLcv];
        dbItem.Visible=true;
      };
      ds.Displays.Synchronize();
    };
    Nav.mCategory.miDesktop=Nav.mCategory.addItem(
      "miDesktop",
      coLang.Table.Apps.Downloads.Category.Desktop,
      Nav.NoTarget,
      function(mnuItem){
        mnuItem.Menu.selectDesktop();
      },
      Nav.NoData
    );
    Nav.mCategory.selectServer=function(){
      var mnu=this;
      var ds=mnu.Nav.ListView.DataSet;
      var sc=mnu.Nav.Screen;
      var lv=mnu.Nav.ListView;

      lv.Commands.Cancel();

      var lst=ds.Groups.Category.Values[mnu.miServer.getCaption()];
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var dbItem=lst[iLcv];
        dbItem.Visible=true;
      };
      var lst=ds.Groups.Category.Values[mnu.miDesktop.getCaption()];
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var dbItem=lst[iLcv];
        dbItem.Visible=false;
      };
      ds.Displays.Synchronize();
    };
    Nav.mCategory.miServer=Nav.mCategory.addItem(
      "miServer",
      coLang.Table.Apps.Downloads.Category.Server,
      Nav.NoTarget,
      function(mnuItem){
        mnuItem.Menu.selectServer();
      },
      Nav.NoData
    );
    Nav.mOS.DoFilter=function(mnuItem){
      var Nav=mnuItem.Menu.Nav;
      var sc=Nav.Screen;
      var lv=Nav.ListView;
      var ds=lv.DataSet;
      lv.Commands.Cancel();

      ds.Groups.Selected=ds.Groups.OS;
      ds.Groups.Selected.Filter=mnuItem.getCaption();
      ds.Displays.Synchronize();
    };
    Nav.mOS.miAurawin=Nav.mOS.addItem(
      "miAurawin",
      coLang.Table.Apps.Downloads.OS.Aurawin,
      Nav.NoTarget,
      Nav.mOS.DoFilter,
      Nav.NoData
    );
    Nav.mOS.miWindows32=Nav.mOS.addItem(
      "miWindow32",
      coLang.Table.Apps.Downloads.OS.Windows,
      Nav.NoTarget,
      Nav.mOS.DoFilter,
      Nav.NoData
    );
    Nav.mOS.miWindows64=Nav.mOS.addItem(
      "miWindow64",
      coLang.Table.Apps.Downloads.OS.Windows64,
      Nav.NoTarget,
      Nav.mOS.DoFilter,
      Nav.NoData
    );
    Nav.mOS.miLinux32=Nav.mOS.addItem(
      "miLinux32",
      coLang.Table.Apps.Downloads.OS.Linux,
      Nav.NoTarget,
      Nav.mOS.DoFilter,
      Nav.NoData
    );
    Nav.mOS.miLinux64=Nav.mOS.addItem(
      "miLinux64",
      coLang.Table.Apps.Downloads.OS.Linux64,
      Nav.NoTarget,
      Nav.mOS.DoFilter,
      Nav.NoData
    );
    Nav.mOS.miOSX=Nav.mOS.addItem(
      "miOSX",
      coLang.Table.Apps.Downloads.OS.OSX,
      Nav.NoTarget,
      Nav.mOS.DoFilter,
      Nav.NoData
    );
    Nav.mCategory.miDesktop.SaveSelection=true;
    Nav.mCategory.miServer.SaveSelection=true;
    Nav.mOS.miWindows32.SaveSelection=true;
    Nav.mOS.miWindows64.SaveSelection=true;
    Nav.mOS.miLinux32.SaveSelection=true;
    Nav.mOS.miLinux64.SaveSelection=true;
    Nav.mOS.miOSX.SaveSelection=true;

    Nav.btnDownload=Nav.Items.addItem(
      Nav.itemKind.Button,"btnDownload",coLang.Table.Labels.Download,
      Nav.oAutoShowOn,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      function(navItem){
        var Nav=navItem.Nav;
        var lv=Nav.ListView;
        lv.Commands.setMode(lv.Commands.Mode.Download);
      }
    );
    Nav.Home.ShowList.Add(Nav.btnDownload);

    Nav.gpDownload=Nav.Items.addItem(
      Nav.itemKind.Group,"gpDownload","Download",
      Nav.oAutoShowOff,
      Nav.oCascadeOff,
      Nav.oNoShowList,
      Nav.oSetAsDefaultOff,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      Nav.NoClick
    );
    Nav.gpDownload.Confirm=Nav.gpDownload.Items.addItem(
      Nav.itemKind.Confirm,"cnfDownload",
      [
        coLang.Table.Buttons.Confirm,
        coLang.Table.Buttons.Cancel,
      ],
      Nav.oAutoShowOff,
      Nav.oCascadeOn,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.mCategory,
      [
       function(navItem){
         var Nav=navItem.Nav;
         var lv=Nav.ListView;
         lv.Commands.Confirm();
       },
       function(navItem){
         var Nav=navItem.Nav;
         var lv=Nav.ListView;
         lv.Commands.Cancel();
       }
      ]
    );
    Nav.btnDownload.Target=Nav.gpDownload;
    return Nav;
  }
};
