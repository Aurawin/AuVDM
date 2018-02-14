coCMS.App.Components.FileMan = {
  Version        : new Version(2014,10,22,2),
  Title          : new Title("Aurawin CMS File Manager","FileMan"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/FileMan.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCMS.App,'/core/cms/FileMan.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/FileMan.js',
  debugToConsole : true,
  Create:function() {
    var ss=coAppScreens.createScreen(
      coVDM.VDM,
      "screenCMSFileMan",
      "System",
      coLang.Table.Apps.CMS.FileMan.Name,
      coLang.Table.Apps.CMS.FileMan.Title,
      coTheme.Icons.CMS.FileManager,
      0.5,
      0.5,
      coAppUI.Frame,
      "frmScreen",
      "bdrScreen",
      "flmScreen",
      "cntScreen"
    );
    ss.Unit=this;
    ss.Description=coLang.Table.Apps.CMS.FileMan.Description;
    ss.Position=coApp.Position.TopLeft;
    ss.State=coApp.State.Normal;
    ss.iconInApplications=true;
    ss.iconInTaskList=true;
    ss.AllowFullScreen=true;
    ss.SaveGeometry=true;
    ss.onManifestUpdated=function(){};
    coCMS.App.Components.Manifest.createFileMan(ss);

    ss.Client=ss.Slides.createSlide("sldClient","sldClient",ss,ss.Frame,ss.Frame.Client,coAppUI.Alignment.Client);
    ss.Client.Visible=true;
    ss.Toolbar=coCMS.App.Components.Toolbars.createFileManager(ss);
    ss.Folders=coCMS.App.Components.TreeViews.createFolders(ss);
    ss.Splitter=coAppUI.App.Components.Splitter.Create(ss,ss.Client.Slides,ss.Client,ss.Client.Container,coAppUI.Alignment.Left);
    ss.Files=coCMS.App.Components.ListViews.createFiles(ss);
    ss.Files.Options=coCMS.App.Components.MultiViews.createFileOptions(ss);

    ss.Nav=coCMS.App.Components.Navs.createManager(ss);
    ss.Splitter.targetLeft=ss.Folders;
    ss.Splitter.targetRight=ss.Files;
    ss.Uploader=coCMS.App.Components.Uploaders.createManager(ss);
    ss.Frame.setCaption(coLang.Table.Apps.CMS.FileMan.getCaption(coCMS.App.DB.Domain.MAP.Name.Value));

    ss.Splitter.onSized=function(){
      var ss=this.Screen;
      var mfst=coVDM.Manifest;
      mfst.cmsFileManager.MAP.FoldersWidth.Value=ss.Folders.Container.clientWidth;
      mfst.Save();
    };

    ss.doShow=function(){
      var ss=this;
      var mfst=coVDM.Manifest.cmsFileManager.MAP;
      ss.Folders.setWidth(mfst.FoldersWidth.Value);
      coCMS.App.DB.Commands.ListFolders("/");
    };
    ss.updateStatus=function(){
      var ss=this;
      var s=(ss.Folders.Selected)? ss.Folders.Selected.Data.MAP.Path.Value: "";
      s=(s.length>0) ? coLang.Table.Apps.CMS.FileMan.Status.Selected.replace("$path",s) : coLang.Table.Apps.CMS.FileMan.Status.Idle;
      ss.setStatus(s);
    };
    ss.Conseal();
    return ss;
  }
 };
