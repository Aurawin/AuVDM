var coSocial = {
  Version        : new Version(2014,5,18,337),
  Title          : new Title("Aurawin Social Networking","coSocial"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/soc/coSocial.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/soc/coSocial.js',coAppKit.PreLoaded),
  Unit           : '/core/soc/coSocial.js',
  debugToConsole : true,
  NameSpace      : "/core/soc",
  Media          : null,
  Network        : null,
  Networks       : null,
  Files          : null,
  Folders        : null,
  Connections    : null,
  App            : null,
  netSelect      : null,
  // Last Views
  lvCabinet      : 0,
  lvRequests     : 1,
  // View Modes
  vmComplete     : 0,
  vmSimple       : 1,

  NET_KIND_OWNER : 0,
  NET_KIND_OTHER : 1,

  TTL_NET_SEARCH        : 120,

  NS_NET_SEARCH         : "/n/s",
  NS_NET_QUERY_TAGS     : "/n/qt",
  NS_NET_LIST           : "/n/l",
  NS_NET_READ           : "/n/r",
  NS_NET_WRITE          : "/n/w",
  NS_NET_DEL            : "/n/d",
  NS_NET_ADD            : "/n/a",
  NS_NET_FIND           : "/n/f",

  NS_CONNECTION_READ    : "/c/r",
  NS_CONNECTION_LIST    : "/c/l",
  NS_CONNECTION_DELETE  : "/c/d",
  NS_CONNECTION_SET_ACCEPTED : "/c/sac",

  URI_FILE_SET_DATA     : "/core/soc?fls/sed&$NetworkId&$FolderId&$FileId",
  URI_FILE_GET_DATA     : "/core/soc?fls/ged&$NetworkId&$FolderId&$FileId",



  NS_FLS_LIST_WITH      : "/fls/lw",
  NS_FILE_IMPORT        : "/fls/p",
  NS_FLS_INSPECT        : "/fls/i",
  NS_FILE_LIST          : "/fls/l",
  NS_FILE_ADD           : "/fls/a",
  NS_FILE_READ          : "/fls/r",
  NS_FILE_RENAME        : "/fls/rn",
  NS_FILE_WRITE         : "/fls/w",

  NS_FILES_MOVE         : "/fls/m",
  NS_FILES_DELETE       : "/fls/d",
  NS_FOLDER_ADD         : "/fldrs/a",
  NS_FOLDER_LIST        : "/fldrs/l",
  NS_FOLDER_DELETE      : "/fldrs/d",
  NS_FOLDER_RENAME      : "/fldrs/r",
  NS_FOLDER_CLEAR       : "/fldrs/clr",
  NS_MEDIA_LIST         : "/kind/l",

  NS_REQUEST_READ       : "/r/r",
  NS_REQUEST_DELETE     : "/r/d",
  NS_REQUEST_LIST       : "/r/l",
  NS_REQUEST_MAKE       : "/r/m",
  NS_REQUEST_INVITE     : "/r/i",
  NS_REQUEST_ACCEPT     : "/r/acc",
  NS_REQUEST_REJECT     : "/r/rej",

  URI_FILE_STREAM       : "/core/soc?fls/strm&$nid&$fid&$id",
  URI_FILE_TRANSFORM    : "/core/soc?fls/tfm&$nid&$fid&$id",
  URI_FILE_PALMPRINT    : "/core/soc?fls/plp&$nid&$fid&$id",
  URI_FILE_ROTATE       : "/core/soc?fls/rot&$nid&$fid&$id&$deg",
  URI_FILE_DOWNLOAD     : "/core/soc?fls/dl&$nid&$fid&$id",
  URI_FILE_GET          : "/core/soc?fls/get&$nid&$fid&$id",

  FLAG_ACL_READ         : 1 << 0,
  FLAG_ACL_WRITE        : 1 << 1,
  FLAG_ACL_ADD          : 1 << 2,
  FLAG_ACL_DELETE       : 1 << 3,
  FLAG_ACL_LIST         : 1 << 4,

  FLAG_NET_PRIVATE      : 0,
  FLAG_NET_PUBLIC       : 1,

  NET_GROUP_MY          : 'My',
  NET_GROUP_OTHER       : 'Other',
  NET_GROUP_RESULTS     : 'Results',

  init : function(){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js',
        '/core/srch/coSearch.js'
      ],
      [
        this.NameSpace+'/DB.js',
        this.NameSpace+'/Manifest.js',
        this.NameSpace+'/Nav.js',
        this.NameSpace+'/Search.js',
        this.NameSpace+'/Views.js',
        this.NameSpace+'/netJoin.js',
        this.NameSpace+'/netListView.js',
        this.NameSpace+'/netRequest.js',
        this.NameSpace+'/netSelect.js',
        this.NameSpace+'/netUploader.js',
        this.NameSpace+'/sldEditor.js',
        this.NameSpace+'/sldSearch.js',
        this.NameSpace+'/coSocial.css'
      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.onLogin=function(App){
      if (App.Unit.Networks) {
        App.Components.Search.Init(App.Screen);
        App.Unit.Networks.Commands.List();
        App.Unit.Connections.Commands.List();
      } else {
        App.processLoggedIn=false;
      };
    };
    this.App.deferInit=function(App){
      if (
           (typeof(coSearch)!=undefined) &&
           (typeof(coSpectrum)!=undefined) &&
           (coSpectrum.Folders)
      ) {
        return true;
      };
      return false;
    };
  },
  onInitialized : function(App){
    App.Unit.Connections=App.Components.DB.createConnections();
    App.Unit.Requests=App.Components.DB.createRequests();
    App.Unit.Networks=App.Components.DB.createNetworks();
    App.Unit.Media=App.Components.DB.createMedia();

    App.Unit.Network=App.Unit.createNetwork();
    App.Screen=coSocial.App.Screen=coSocial.createScreen();
    App.Unit.Files=coSocial.App.Components.DB.createFiles();
    App.Unit.Folders=coSocial.App.Components.DB.createFolders();
    App.Screen.Conseal();
    App.Loaded=true;

  },
  createNetwork:function(){
    var net=coObject.Create();
    net.createKinds=function(){
      var kds=coObject.Create();
      kds.Owner=this;
      kds.Unknown=0;
      kds.Family=1;
      kds.Friends=2;
      kds.Professional=3;
      kds.Recreational=4;
      kds.Commerical=5;
      return kds;
    };
    net.Kinds=net.createKinds();
    return net;
  },
  createScreen : function(){
    if (this.Screen!=null) return this.Screen;
    var _sc=this.Screen=coAppScreens.createScreen(coVDM.VDM,"Social","System",coLang.Table.Apps.Social.Name,coLang.Table.Apps.Social.Title,coTheme.Icons.Social.Main);
    _sc.Unit=this;

    _sc.AllowFullScreen=true;
    _sc.SaveGeometry=true;
    _sc.Position=coApp.Position.TopLeft;
    _sc.Description=coLang.Table.Apps.Social.Description;
    _sc.onShow=function(){
      this.Nav.setSelected(this.Nav.gpNetwork);
    };
    _sc.onManifestUpdated=function(col){

    };
    _sc.Selector=coSocial.App.Components.netSelect.Create(
      _sc,
      _sc.Slides,
      _sc.Frame,
      _sc.Frame.Client,
      [coSocial.NET_GROUP_MY,coSocial.NET_GROUP_OTHER],
      coAppUI.Alignment.Left,
      coAppUI.Alignment.Bottom
    );
    //_sc.Network=coSocial.App.Components.sldNetwork.Create(_sc);
    _sc.Switcher=coSocial.App.Components.Views.CreateSwitcher(_sc);
    _sc.Requests=coSocial.App.Components.netRequest.Create(_sc,_sc.Switcher);
    _sc.Deletor=coSocial.App.Components.netSelect.Create(
      _sc,
      _sc.Switcher.Slides,
      _sc.Switcher,
      _sc.Switcher.Container,
      [coSocial.NET_GROUP_MY,coSocial.NET_GROUP_OTHER],
      coAppUI.Alignment.Client,
      coAppUI.Alignment.Default
    );
    _sc.Deletor.ToolBar.Conseal();

    _sc.Editor=coSocial.App.Components.sldEditor.Create(_sc);
    _sc.Search=coSocial.App.Components.sldSearch.Create(
      _sc,
      _sc.Switcher.Slides,
      _sc.Switcher,
      _sc.Switcher.Container
    );
    _sc.Nav=coSocial.App.Components.Nav.Create(_sc);
    _sc.Unit.App.Components.Nav.AddSwitchItems(_sc,_sc.Switcher.Nav);

    coSocial.App.Components.Manifest.Install(_sc);

    _sc.ViewMode=_sc.Manifest.MAP.ViewMode.Value;
    _sc.Unit.App.Components.Views.SetView(_sc);
    return _sc;
  },
  getNetworkById:function(id){
    var net=this.Networks.getItemById(id);
    if (!net) net=this.Connections.Networks.getItemById(id);
    return net;
  }
};
coSocial.init();
