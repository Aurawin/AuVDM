var coText=coVDM.App.Components.coText = {
  Version        : new Version(2014,10,10,30),
  Title          : new Title("Aurawin Text Editor","coText"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/editor/text/coText.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/editor/text/coText.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/editor/text/coText.js',
  NameSpace      : '/core/vdm/editor/text',
  debugToConsole : true,
  Exts           : null,
  Opener         : null,
  Extension      : 'txt',
  HtmlExts       : coList.StringArray(),

  init             : function(){
    this.HtmlExts=coList.StringArray();
    this.HtmlExts.Add("html");
    this.HtmlExts.Add("htm");

    this.Exts=coList.StringArray();

    this.Exts.Add("log");
    this.Exts.Add("inf");
    this.Exts.Add("ini");
    this.Exts.Add("txt");
    this.Exts.Add("text");
    this.Exts.Add("htm");
    this.Exts.Add("html");

    this.Opener=coRegistry.Items.createItem(
      this.Exts,
      function(aItem,Folder,Files,File){
        if (aItem.Screen==null)
          aItem.Screen=coText.App.Screen;
        aItem.Screen.Show();
        aItem.Screen.OpenFile(Folder,Files,File);
        return aItem;
      }
    );
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js',
        '/core/soc/coSocial.js'
      ],
      [
        this.NameSpace+'/coText.css',
        this.NameSpace+'/Manifest.js',
        this.NameSpace+'/Nav.js'
      ],
      this.onInitialized
    );
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.DB=null;
    this.App.Initialized=true;

    return this;
  },
  onInitialized:function(App){
    App.Loaded=true;
    App.Screen=coText.Create(coVDM.VDM);
  },
  Create:function(){
    var ss=coAppScreens.createScreen(
      coVDM.VDM,
      "EditorTextScreen",
      "System",
      "Text",
      coLang.Table.Apps.Editor.Text.Title,
      coTheme.Icons.Text.File,
      0.5,
      0.5,
      coAppUI.Frame,
      "bdrWelcome",
      "bdrWelcome",
      ""
    );
    ss.Unit=this;
    ss.Description=coLang.Table.Apps.Editor.Text.Description;
    ss.Position=coApp.Position.TopLeft;
    ss.State=coApp.State.Normal;
    ss.iconInApplications=true;
    ss.iconInTaskList=true;
    ss.AllowFullScreen=true;
    ss.Container.className="EditorTextScreen";
    ss.SaveGeometry=true;
    ss.setStatus(coLang.Table.Apps.Editor.Text.Status.Idle);

    ss.Container.style.height=ss.Height+"px";
    ss.Container.style.width=ss.Width+"px";

    this.App.Components.Manifest.Install(ss);

    ss.TabsBar=coAppUI.App.Components.TabsBar.Create("TabsBar","TabsBar",ss,ss.Slides,ss.Frame,ss.Frame.Client,coAppUI.Alignment.Top);
    ss.TabsBar.Visible=true;
    var tab=ss.TabsBar.Tabs.Blank=ss.TabsBar.createTab(coLang.Table.Apps.Editor.Text.Blank,coTheme.Icons.Text.File,coAppUI.AutoSize,coAppUI.allowClose);
    tab.Network=coSocial.Networks.createItem();
    tab.File=coSocial.Files.createItem();
    tab.Folder=coSocial.Folders.createItem();

    tab.File.MAP.Name.Default=tab.File.MAP.Name.Value=coLang.Table.Labels.New;

    ss.Client=ss.Slides.createSlide("sldClient","sldEditorTextMemo",ss,ss.Frame,ss.Frame.Client,coAppUI.Alignment.Client);
    ss.Client.Visible=true;
    ss.Memo=coAppUI.App.Components.RichEdit.Create(
      ss.Client,
      ss.Client.Container,
      "Memo",
      "EditorTextMemo",
      "",
      "",
      coAppUI.App.Components.RichEdit.FullButtons,
      coAppUI.App.Components.RichEdit.BtnNewOn,
      coAppUI.App.Components.RichEdit.BtnSaveOn
    );
    ss.Memo.Visible=true;
    ss.Memo.Screen=ss;
    ss.Memo.onNew=function(Memo){
      var ss=Memo.Screen;
      ss.New();
    };
    ss.Memo.onSave=function(Memo){
      var ss=Memo.Screen;
      ss.Save();
    };
    ss.Nav=this.App.Components.Nav.Create(ss);
    ss.Memo.Placement.Bottom=coVDM.NavBarHeight;
    ss.Memo.Placement.Mode.setFull();
    ss.setEditingStatus=function(Network,Folder,File){
      var sc=this;
      var sStatus=coLang.Table.Apps.Editor.Text.Status.Editing;
      sStatus=sStatus.replace("$network",Network.MAP.Title.Value);
      sStatus=sStatus.replace("$folder",Folder.MAP.Path.Value);
      sStatus=sStatus.replace("$file",File.MAP.Name.Value);
      sc.setStatus(sStatus);
    };
    ss.Memo.onSaved=function(Memo){
      var ss=Memo.Owner.Screen;
      ss.setAppStatus(ss.TabsBar.Selected);
      ss.Nav.Torus.Stop();
    };
    ss.Memo.onLoaded=function(Memo){
      var ss=Memo.Owner.Screen;
      var Tab=ss.TabsBar.Selected;
      ss.setEditingStatus(Tab.Network,Tab.Folder,Tab.File);
      ss.Nav.Torus.Stop();
    };
    ss.getTab=function(File){
      var ss=this;
      var Tabs=ss.TabsBar.Items;
      var iNetID=(File.MAP.NetworkID) ? File.MAP.NetworkID.Value : 0 ;
      if (iNetID>0) {
        for (var iLcv=0; iLcv<Tabs.length; iLcv++){
          var Tab=Tabs[iLcv];
          if (
               (Tab.File.MAP.NetworkID) &&
               (Tab.File.MAP.NetworkID.Value==iNetID) &&
               (Tab.File.MAP.ID.Value==File.MAP.ID.Value)
          ) {
            return Tab;
          };
        };
        return null;
      } else {
        for (var iLcv=0; iLcv<Tabs.length; iLcv++){
          var Tab=Tabs[iLcv];
          if (Tab.File.MAP.ID.Value==File.MAP.ID.Value)
            return Tab;
        };
        return null;
      };
    };
    ss.setupOpenDialog=function(){
      var ss=this;
      var dlg=coDialogs.Open;
      dlg.Target=ss;
      dlg.Frame.setCaption(coLang.Table.Dialogs.File.Open);
      dlg.Extension=coText.Extension;
      dlg.Filters.Clear();
      dlg.Filters.Index=0;
      dlg.Filters.Add(
        coLang.Table.Apps.Editor.Filters.All.Title,
        coLang.Table.Apps.Editor.Filters.All.Ext
      );
      dlg.Filters.Add(
        coLang.Table.Apps.Editor.Filters.Text.Title,
        coLang.Table.Apps.Editor.Filters.Text.Ext
      );
      dlg.Filters.Add(
        coLang.Table.Apps.Editor.Filters.Html.Title,
        coLang.Table.Apps.Editor.Filters.Html.Ext
      );
    };
    ss.setupSaveDialog=function(){
      var ss=this;
      var dlg=coDialogs.Save;
      dlg.Target=ss;
      dlg.Frame.setCaption(coLang.Table.Dialogs.File.Save);
      dlg.Extension=coText.Extension;
      dlg.Filters.Clear();
      dlg.Filters.Index=0;
      dlg.Filters.Add(
        coLang.Table.Apps.Editor.Filters.All.Title,
        coLang.Table.Apps.Editor.Filters.All.Ext
      );
      dlg.Filters.Add(
        coLang.Table.Apps.Editor.Filters.Text.Title,
        coLang.Table.Apps.Editor.Filters.Text.Ext
      );
      dlg.Filters.Add(
        coLang.Table.Apps.Editor.Filters.Html.Title,
        coLang.Table.Apps.Editor.Filters.Html.Ext
      );
    };

    ss.Save=function(Force){
      if (Force==undefined) Force=false;
      // general call to save current tab.
      var ss=this;
      var Tab=ss.TabsBar.Selected;
      if (Tab) {
        if ((Tab.File.MAP.ID.Value==0) || (Force==true)){
          // we must ask for a file name/path to save to...

          ss.setupSaveDialog();
          coDialogs.Save.onExecuted=function(){
            var ss=this.Target;
            var Tab=ss.TabsBar.Selected;
            Tab.File.MAP.NetworkID.Value = (this.Folder.MAP.NetworkID) ? this.Folder.MAP.NetworkID.Value : 0;
            var sExt=coUtils.extractFileExt(this.FileName);

            var dbItem=this.ListView.getFileByName(this.FileName);

            var net=coSocial.getNetworkById(Tab.File.MAP.NetworkID.Value);
            if (net) {
              Tab.Network.Assign(net);
            } else {
              Tab.Network.Reset();
            };

            Tab.File.MAP.ID.Value = (dbItem) ? dbItem.MAP.ID.Value : 0;
            Tab.File.MAP.FolderID.Value=this.Folder.MAP.ID.Value;
            Tab.File.MAP.Name.Value=this.FileName;
            Tab.setCaption(this.FileName);
            Tab.File.MAP.Kind.Value=coContentType.fkDocument;
            Tab.Folder.Assign(this.Folder);

            ss.Memo.PlainText=((coText.HtmlExts.indexOf(sExt)==-1) || (sExt==""));

            Tab.File.Content=(ss.Memo.PlainText==true) ? ss.Memo.getText() : ss.Memo.getHTML();

            ss.setEditingStatus(Tab.Network,Tab.Folder,Tab.File);

            var cmds=(Tab.File.MAP.NetworkID.Value!=0) ? coSocial.Files.Commands : coCabinet.Files.Commands;
            if (Tab.File.MAP.ID.Value==0) {
              cmds.Create(Tab.File);
            } else {
              cmds.Write(Tab.File);
            };

            ss.Memo.Modified=false;
          };
          coDialogs.Save.onCanceled=function(){
            var ss=this.Target;
          };
          coDialogs.Save.Execute();
        } else {
          Tab.File.Content=(ss.Memo.PlainText==true) ? ss.Memo.getText() : ss.Memo.getHTML();
          var cmds=(Tab.File.MAP.NetworkID.Value==0) ? coCabinet.Files.Commands : coSocial.Files.Commands;
          cmds.Write(Tab.File);
          ss.Memo.Modified=false;
        };
      };
    };
    ss.SaveAs=function(){
      this.Save(true);
    };
    ss.LoadContent=function(Network,Folder,File){
      var ss=this;
      ss.Memo.File=File;


      var sExt=coUtils.extractFileExt(File.MAP.Name.Value);
      var iNetID=(File.MAP.NetworkID) ? File.MAP.NetworkID.Value : 0 ;
      var sURL= (iNetID>0) ? coSocial.URI_FILE_GET_DATA : coVDM.URI_FILE_GET_DATA;
      sURL=sURL.replace("$NetworkId",iNetID);
      sURL=sURL.replace("$FolderId",File.MAP.FolderID.Value);
      sURL=sURL.replace("$FileId",File.MAP.ID.Value);
      ss.Memo.PlainText=((coText.HtmlExts.indexOf(sExt)==-1) || (sExt==""));
      ss.Memo.LoadFromUrl(sURL);

      ss.setEditingStatus(Network,Folder,File);
    };
    ss.AddBlankTab=function(){
      var ss=this;
      var Tab=ss.TabsBar.Tabs.Blank;
      if ((Tab.File.MAP.ID.Value!=0) || (ss.Memo.Modified==true) ) {
        var File=coSocial.App.Components.DB.createFile();
        File.MAP.Name.Default=File.MAP.Name.Value=coLang.Table.Labels.New;
        Tab=ss.TabsBar.createTab(File.MAP.Name.Value,coTheme.Icons.Text.File,coAppUI.AutoSize,coAppUI.allowClose);
        Tab.File=File;
        Tab.Network=coSocial.Networks.createItem();
        Tab.Folder=coSocial.Folders.createItem();
      };
      Tab.setCaption(Tab.File.MAP.Name.Value);
      Tab.onUnselect=ss._TabUnselected;
      Tab.onSelect=ss._TabSelected;
      Tab.onClose=ss._TabClosed;
      return Tab;
    };
    ss._TabClosed=function(Tab){
      var ss=Tab.Owner.Screen;
      if (Tab.Selected==true){
        ss.Nav.Torus.Start();
        if (ss.Memo.Modified==true) {
          ss.Save();
          return ;
        };
      };
      var tabRecycle=null;
      if (ss.TabsBar.Items.length==1) {
        Tab.File.Reset();
        Tab.Folder.Reset();
        Tab.Network.Reset();
        Tab.setCaption(Tab.File.MAP.Name.Value);
        ss.Memo.Clear();
        ss.Memo.Modified=false;
      } else if (Tab==ss.TabsBar.Tabs.Blank) {
        tabRecycle=Tab;
        ss.TabsBar.Tabs.Blank=ss.TabsBar.Items[1];
      } else {
        tabRecycle=Tab;
      };
      if (tabRecycle) {
        tabRecycle.File.Free();
        tabRecycle.Folder.Free();
        tabRecycle.Network.Free();
        tabRecycle.Free();
      };
      ss.Nav.Torus.Stop();
    };
    ss._TabSelected=function(Tab){
      var ss=Tab.Owner.Screen;
      ss.Nav.Torus.Start();
      if ((Tab.Folder.MAP.ID.Value>0) && (Tab.File.MAP.ID.Value>0)) {
        ss.LoadContent(Tab.Network,Tab.Folder,Tab.File);
      } else {
        ss.setStatus(coLang.Table.Apps.Editor.Text.Status.Empty);
        ss.Nav.Torus.Stop();
      };
    };
    ss._TabUnselected=function(Tab){
      var ss=Tab.Owner.Screen;
      ss.Nav.Torus.Start();
      if (ss.Memo.Modified==true) {
        ss.Save();
      };
      ss.Memo.Clear();
      ss.Memo.Modified=false;
    };
    ss.AddTab=function(Folder,File){
      var ss=this;
      var Tab=ss.TabsBar.Tabs.Blank;
      if ((Tab.File.MAP.ID.Value!=0) || (ss.Memo.Modified==true) ) {
        Tab=ss.TabsBar.createTab(File.MAP.Name.Value,coTheme.Icons.Text.File,coAppUI.AutoSize,coAppUI.allowClose);
        Tab.Network=coSocial.Networks.createItem();
        Tab.File=coSocial.Files.createItem();
        Tab.Folder=coSocial.Folders.createItem();
        Tab.File.MAP.Name.Value=coLang.Table.Labels.New;
      };
      Tab.setCaption(File.MAP.Name.Value);
      Tab.File.Assign(File);
      Tab.Folder.Assign(Folder);
      var iNetID=(File.MAP.NetworkID)? File.MAP.NetworkID.Value : 0;
      Tab.File.Path="/";
      if (iNetID!=0) {
        var net=coSocial.getNetworkById(iNetID);
        Tab.File.Path=(net)? "/" + net.MAP.Title.Value +"/": "";
      };
      Tab.File.Path+=Folder.MAP.Path.Value;
      Tab.onUnselect=ss._TabUnselected;
      Tab.onSelect=ss._TabSelected;
      Tab.onClose=ss._TabClosed;
      return Tab;
    };
    ss.New=function(){
      var ss=this;
      ss.Nav.Torus.Start();
      var Tab=ss.AddBlankTab();
      Tab.Select(coAppUI.ForceSelection);
    };
    ss.Open=function(){
      var ss=this;
      ss.Nav.Torus.Start();
      ss.setupOpenDialog();
      coDialogs.Open.onExecuted=function(){
        var ss=this.Target;
        var Tab=ss.TabsBar.Selected;

        Tab.File.MAP.NetworkID.Value = (this.Folder.MAP.NetworkID) ? this.Folder.MAP.NetworkID.Value : 0;
        var net=coSocial.getNetworkById(Tab.File.MAP.NetworkID.Value);
        if (net) {
          Tab.Network.Assign(net);
        } else {
          Tab.Network.Reset();
        };
        Tab.File.MAP.ID.Value = (this.File) ? this.File.MAP.ID.Value : 0;
        Tab.File.MAP.FolderID.Value=this.Folder.MAP.ID.Value;
        Tab.File.MAP.Name.Value=this.File.MAP.Name.Value;
        Tab.Folder.Assign(this.Folder);
        Tab.setCaption(this.File.MAP.Name.Value);
        ss.LoadContent(Tab.Network,Tab.Folder,Tab.File);
      };
      coDialogs.Save.onCanceled=function(){
        var ss=this.Target;
      };
      coDialogs.Open.Execute();
    };
    ss.OpenFile=function(Folder,Files,File){
      var ss=this;
      // ToDo - alert to swap content!
      ss.Nav.Torus.Start();
      var Tab=ss.getTab(File);
      if (Tab==null) {
        var Tab=ss.AddTab(Folder,File);
        Tab.Select(coAppUI.ForceSelection);
      } else {
        if (Tab.Selected!=true) {
          Tab.Select(coAppUI.ForceSelection);
        } else {
          ss.Nav.Torus.Stop();
        };
      };

    };
    ss.onHide=function(){
      var ss=this;
      ss.TabsBar.Conseal();
      ss.Client.Conseal();
    };
    ss.onShow=function(){
      var ss=this;
      ss.TabsBar.Reveal();
      ss.Client.Reveal();
    };
    var tab=ss.TabsBar.Tabs.Blank;
    tab.onUnselect=ss._TabUnselected;
    tab.onSelect=ss._TabSelected;
    tab.onClose=ss._TabClosed;
    tab.Select(coAppUI.BypassSelection);

    ss.Conseal();

    return ss;
  }
};
coText.init();
