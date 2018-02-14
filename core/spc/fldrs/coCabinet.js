coCabinet = {
  Version        : new Version(2014,10,21,100),
  Title          : new Title("Spectrum Cabinet","Cabinet"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/spc/fldrs/coCabinet.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/spc/fldrs/coCabinet.js',coAppKit.PreLoaded),
  Unit           : '/core/spc/fldrs/coCabinet.js',
  NameSpace      : '/core/spc/fldrs',
  debugToConsole : true,
  Screen         : null,
  LoadDelay      : 350,
  RefreshDelay   : 1500,
  Files          : null,
  Folders        : null,
  ConverterPingDelay : 5*1000,
  init : function(){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js'
      ],
      [
        '/core/spc/fldrs/DB.js',
        '/core/spc/fldrs/Nav.js',
        '/core/spc/fldrs/Uploader.js',
        '/core/spc/fldrs/Converter.js',
        '/core/spc/fldrs/TreeView.js',
        '/core/spc/fldrs/ListView.js'
      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.onAuthorized=function(App){
      if ((App.Loaded==true) && (App.Screen.DB.Requested==false)){
        App.Screen.DB.Commands.ListFolders();
        App.Screen.DB.Requested=true;
      };
    };
    this.App.onAuthenticated=function(App){
    };
    this.App.onLogout=function(App){
    };
    this.App.onLogin=function(App){
      if ((App.Screen.DB.Loaded==false) && (App.Screen.DB.Requested==false)) {
        App.Screen.DB.Commands.ListFolders();
        App.Screen.DB.Requested=true;
      };
    };
    this.App.deferInit=function(App){
      return  (
        (typeof(coVDM.VDM)!=undefined) &&
        (typeof(coVDM.VDM.WorkSpace)!=undefined)
      );
    };
    return this;
  },
  onInitialized : function(App){

    coSpectrum.App.Components.Cabinet=App.Unit;
    App.Unit.Screen=App.Screen=coSpectrum.Folders=App.Unit.Create();
    if ((App.processAuthorized==true) && (App.Screen.DB.Requested==false)) {
      App.Screen.DB.Commands.ListFolders();
      App.Screen.DB.Requested=true;
    };
    coCabinet.Files=App.Screen.DB.createFiles();
    coCabinet.Folders=App.Screen.DB;
    App.Screen.Conseal();
    App.Loaded=true;
  },
  Create : function(){
    var mfst=coVDM.Manifest;
    var _fldrs=this.App.Screen=coAppScreens.createScreen(coVDM.VDM,"Folders","Spectrum","Cabinet",coLang.Table.Apps.Spectrum.Folders.Cabinet,coTheme.Icons.Spectrum.Folder.Cabinet);
    _fldrs.Unit=this;
    _fldrs.SaveGeometry=true;
    _fldrs.Position=coApp.Position.TopLeft;
    _fldrs.Trees=new Array();
    _fldrs.Description=coLang.Table.Apps.Spectrum.Folders.Description;
    _fldrs.AllowFullScreen=true;
    _fldrs.onManifestUpdated=function(){};

    mfst.cabFolderTreeView=mfst.addEntry("cabFolderTreeView","cab-fld-tv",_fldrs.onManifestUpdated);
    mfst.cabFolderTreeView.addField("Width",coDB.Kind.Integer,"width",coTheme.Apps.Cabinet.Folder.Width,coDB.StreamOn);

    _fldrs.onShow=function(){
      var fldrs=this;
      try {
        var mfst=coVDM.Manifest;
        fldrs.Tree.Reveal();
        fldrs.Tree.Torus.Start();
        fldrs.Tree.Container.style.width=mfst.cabFolderTreeView.MAP.Width.Value+"px";
        fldrs.ListView.Items.Clear();
        fldrs.setSize();
        setTimeout(
          function(){
            fldrs.Tree.Load();
          },
          coCabinet.LoadDelay
        );
      } catch (err){
        coVDM.VDM.Console.Append("Exception: coSpectrum.Folders.onShow "+err);
      };
    };
    _fldrs.onHide=function(){
      var fldrs=this;
      try{
        fldrs.ListView.Items.Clear();
      } catch(err){
        coVDM.VDM.Console.Append("Exception: coSpectrum.Folders.onHide "+err);
      };
    };

    _fldrs.DB=this.App.Components.DB.Create(_fldrs);

    _fldrs.Tree=this.App.Components.TreeView.Create(_fldrs,_fldrs.Slides,_fldrs.Frame.Client,coAppUI.Alignment.Left);
    _fldrs.Splitter=coAppUI.App.Components.Splitter.Create(_fldrs,_fldrs.Slides,_fldrs.Frame,_fldrs.Frame.Client,coAppUI.Alignment.Left);
    _fldrs.ListView=this.App.Components.ListView.Create(_fldrs,_fldrs.Slides,_fldrs.Frame,_fldrs.Frame.Client);
    _fldrs.Uploader=this.App.Components.Uploader.Create(_fldrs,_fldrs.ListView.Slides,_fldrs.ListView,_fldrs.ListView.Container);
    _fldrs.Converter=this.App.Components.Converter.Create(_fldrs,_fldrs.ListView.Slides,_fldrs.ListView,_fldrs.ListView.Container);
    _fldrs.ListView.dropFiles=_fldrs.Uploader;
    _fldrs.Tree.Files=_fldrs.DB.Files;
    _fldrs.Nav=this.App.Components.Nav.Create(_fldrs);
    _fldrs.Splitter.targetLeft=_fldrs.Tree;
    _fldrs.Splitter.targetRight=_fldrs.ListView;
    _fldrs.Splitter.onSized=function(){
      var fldrs=this.Screen;
      var mfst=coVDM.Manifest;
      mfst.cabFolderTreeView.MAP.Width.Value=fldrs.Tree.Container.clientWidth;
      mfst.Save();
    };
    return _fldrs;

  }
};
coCabinet.init();
