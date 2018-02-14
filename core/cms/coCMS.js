var coCMS = {
  Version        : new Version(2014,10,26,13),
  Title          : new Title("Aurawin Content Managment System","coCMS"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/cms/coCMS.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/cms/coCMS.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/coCMS.js',
  NameSpace      : '/core/cms',
  NS_ID          : '/id',
  NS_READ        : '/r',
  NS_WRITE       : '/w',
  NS_EDITOR      : '/edtr',
  NS_FLDS_LIST   : '/fld/l',
  NS_FLDS_ADD    : '/fld/a',
  NS_FLDS_DEL    : '/fld/d',
  NS_FLDS_NAME   : '/fld/n',
  NS_FLS_LIST    : '/fls/l',
  NS_FLS_ADD     : '/fls/a',
  NS_FLS_RENAME  : '/fls/r',
  NS_FLS_DELETE  : '/fls/d',
  NS_FLS_SET_ATTRIBUTES : '/fls/sfa',
  NS_FILE_GET_DATA : "/core/cms?fls/ged&$fid&$id",
  NS_FILE_SET_DATA : "/core/cms?fls/sed&$fid&$id",
  URI_FLS_ROTATE : "/core/cms?fls/rot&$fid&$id&$deg",
  NS_DM_READ     : '/dm/r',
  NS_DM_WRITE    : '/dm/w',
  debugToConsole : true,
  LoadDelay      : 350,
  RefreshDelay   : 1500,
  FolderRefreshDepth  : 2,
  Tools          : new Array(),
  Timers         : coTimers.createList(1500),
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
        '/core/cms/coCMS.css',
        '/core/cms/DB.js',
        '/core/cms/Editor.js',
        '/core/cms/TreeViews.js',
        '/core/cms/ListViews.js',
        '/core/cms/Navs.js',
        '/core/cms/Uploaders.js',
        '/core/cms/FileMan.js',
        '/core/cms/MultiViews.js',
        '/core/cms/Manifest.js',
        '/core/cms/Toolbars.js'
      ],
      this.onInitialized
    );
    this.App.onLogout=function(App){
      App.Unit.Tools.Disable();
    };
    this.App.onLogin=function(App){
      App.Unit.Tools.Enable();
    };
    this.App.Unit=this;
    this.App.FileMan=null;
    this.Tools.Enabled=false;
    this.Tools.Remove=function(div) {
      var idx=this.indexOf(div);
      if (idx!=-1) this.splice(idx,1);
    };
    this.Tools.Enable=function(){
      this.Enabled=true;
      for (var iLcv=0; iLcv<this.length; iLcv++){
        this[iLcv].setAttribute("CMS","enabled");
      };
    };
    this.Tools.Disable=function(){
      this.Enabled=false;
      for (var iLcv=0; iLcv<this.length; iLcv++){
        this[iLcv].setAttribute("CMS","disabled");
      };
    };
    this.App.onAuthorized=function(App){
      if (App.DB){
        App.DB.Commands.readDomain();
        App.DB.Commands.checkAllowEdit();
      } else {
        App.processAuthorized=false;
      };
    };
    this.App.SetupEditors=function(){
      coAppUI.App.Components.CMS.checkForAce();
    };
    this.App.SetupFileManager=function(){
      this.FileMan=coCMS.App.Components.FileMan.Create();
    };
    this.App.Initialized=true;
    return this;
  },
  onInitialized : function(App){
    App.DB=App.Components.DB.Create();
    App.Loaded=true;
  }
};
coCMS.init();
