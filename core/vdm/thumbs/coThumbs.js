var coThumbs = {
  Version        : new Version(2013,5,22,10),
  Title          : new Title("Aurawin Thumbnail System","coThumbs"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/thumbs/coThumbs.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/thumbs/coThumbs.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/thumbs/coThumbs.js',
  debugToConsole : true,
  NameSpace      : "/core/vdm/thumbs",
  ThumbHandlers  : new Array(),
  App            : null,
  Screen         : null,
  init : function(vdm){
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
        this.NameSpace+'/coThumbs.css',
        this.NameSpace+'/DB.js',
        this.NameSpace+'/Music.js',
        this.NameSpace+'/Image.js',
        this.NameSpace+'/Video.js',
        this.NameSpace+'/Thumb.js',
        this.NameSpace+'/Stack.js'
      ],
      this.onInitialized
    );
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this
    this.App.Initialized=true;
  },
  onInitialized : function(App){
    coThumbs.ThumbHandlers.push(coThumbs.App.Components.Image);
    coThumbs.ThumbHandlers.push(coThumbs.App.Components.Music);
    App.Loaded=true;
  },
  getThumbHandler:function(sExt){
    for (var iLcv=0; iLcv<coThumbs.ThumbHandlers.length; iLcv++){
      var h=coThumbs.ThumbHandlers[iLcv];
      if (h.Handles.indexOf(sExt)>-1){
        return h;
      };
    };
    return coThumbs.App.Components.Thumb;
  }
};
coThumbs.init(coVDM.VDM);

