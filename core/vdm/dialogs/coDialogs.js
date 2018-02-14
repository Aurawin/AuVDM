var coDialogs=coVDM.App.Components.coDialogs = {
  Version        : new Version(2013,12,1,47),
  Title          : new Title("Aurawin Dialogs","coDialogs"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/dialogs/coDialogs.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/vdm/dialogs/coDialogs.js',coAppKit.PreLoaded),
  Unit           : '/core/vdm/dialogs/coDialogs.js',
  debugToConsole : true,
  SelectPicture  : null,
  Save           : null,
  Select         : null,
  List           : new Array(),

  init           : function (vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/spc/coSpectrum.js',
        '/core/soc/coSocial.js',
        '/core/avatar/coAvatar.js',
        '/core/spc/fldrs/coCabinet.js'
      ],
      [
        "/core/vdm/dialogs/coDialogs.css",
        "/core/vdm/dialogs/Open.js",
        "/core/vdm/dialogs/Save.js",
        "/core/vdm/dialogs/SelectPicture.js",
      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.VDM=vdm;
    this.App.Initialized=true;
    this.Header.App=this.App;
    this.Usage.App=this.App;
  },

  onInitialized : function(App){
    App.Screen=App.Unit.SelectPicture=App.Components.SelectPicture.Create();
    App.Unit.Save=App.Components.Save.Create();
    App.Unit.Open=App.Components.Open.Create();
    App.Loaded=true;
  },

  createFilters : function(){
    fls=coList.Array();
    fls.Class="Filters";
    fls.Index=-1;
    fls.Clear=function(){
      var fls=this;
      while (fls.length>0) fls[0].Free();
    };
    fls.Add=function(sTitle,sExt){
      if (sTitle==undefined) sTitle="";
      if (sExt==undefined) sExt="";
      var f=coObject.Create("Filter");
      f.Owner=this;
      f.Title=sTitle;
      f.Exts=sExt.toLowerCase().split(" ");
      f.Free=function(){
        var f=this;
        f.Exts.length=0;
        var idx=f.Owner.indexOf(f);
        if (idx!=-1) f.Owner.splice(idx,1);
        coObject.Release(f);
        return null;
      };
      this.push(f);
      return f;
    };

    return fls;
  }
};
coVDM.App.Components.coDialogs.init(coVDM.VDM);
