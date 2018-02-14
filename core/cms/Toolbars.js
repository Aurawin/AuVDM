coCMS.App.Components.Toolbars = {
  Version        : new Version(2014,10,23,3),
  Title          : new Title("Aurawin CMS Toolbars","Toolbars"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/Toolbars.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCMS.App,'/core/cms/Toolbars.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/Toolbars.js',
  debugToConsole : true,
  createFileManager:function(Screen){
    var tb=coAppUI.App.Components.Toolbar.Create(
      "ToolBar",
      "Toolbar",
      Screen,
      Screen.Client.Slides,
      Screen.Client,
      Screen.Client.Container,
      coAppUI.Alignment.Top
    );
    tb.Mode.setValue(tb.Mode.justCaptions);
    tb.setHeights(coVDM.ToolbarHeightBare,coVDM.ToolbarTextHeight,coTheme.UI.Toolbar.Item.Text.lineHeight);
    tb.Buttons.New=tb.createButton(coLang.Table.Labels.New,coTheme.Icons.Documents.New);
    tb.Buttons.Sep1=tb.createSeperator();
    tb.Buttons.Compress=tb.createSwitch(coLang.Table.Apps.CMS.FileMan.Options.Compress);
    tb.Buttons.Keywords=tb.createSwitch(coLang.Table.Apps.CMS.FileMan.Options.Keywords);
    tb.Buttons.Cache=tb.createSwitch(coLang.Table.Apps.CMS.FileMan.Options.Cache);
    tb.Buttons.New.onClick=function(b){
      var tb=b.Owner;
      var sc=tb.Screen;
      sc.Nav.gpMain.mnuFile.miFileNew.doClick();
    };
    tb.Buttons.Compress.onClick=function(s){
      var tb=s.Owner;
      var sc=tb.Screen;
      var File=sc.Files.Items.Selected.Data;
      File.MAP.Compress.Value=(s.Value==true);
      coCMS.App.DB.Commands.SetFileAttributes(File);
    };
    tb.Buttons.Keywords.onClick=function(s){
      var tb=s.Owner;
      var sc=tb.Screen;
      var File=sc.Files.Items.Selected.Data;
      File.MAP.Keywords.Value=(s.Value==true);
      coCMS.App.DB.Commands.SetFileAttributes(File);
    };
    tb.Buttons.Cache.onClick=function(s){
      var tb=s.Owner;
      var sc=tb.Screen;
      var File=sc.Files.Items.Selected.Data;
      File.MAP.Cache.Value=(s.Value==true);
      coCMS.App.DB.Commands.SetFileAttributes(File);
    };
    tb.Buttons.TTL=tb.createText(coLang.Table.Labels.seconds,coLang.Table.Apps.CMS.FileMan.Options.TTL);
    tb.Buttons.TTL.onTextChange=function(t){
      var tb=t.Owner;
      var sc=tb.Screen;
      var File=sc.Files.Items.Selected.Data;
      File.MAP.TTL.Value=coUtils.parseInt(t.getValue());
      coCMS.App.DB.Commands.SetFileAttributes(File);
    };
    tb.setupFileOptions=function(File){
      var tb=this;
      var Enabled=(Assigned(File))? true : false;
      tb.Buttons.Compress.setEnabled(Enabled);
      tb.Buttons.Keywords.setEnabled(Enabled);
      tb.Buttons.Cache.setEnabled(Enabled);
      tb.Buttons.TTL.setEnabled(Enabled);
      if (Enabled==true){
        tb.Buttons.Compress.setValue(File.MAP.Compress.Value);
        tb.Buttons.Keywords.setValue(File.MAP.Keywords.Value);
        tb.Buttons.Cache.setValue(File.MAP.Cache.Value);
        tb.Buttons.TTL.setValue(File.MAP.TTL.Value);
      };
    };
    tb.setupFileOptions();
    return tb;
  }
};
