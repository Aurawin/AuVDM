coWallPaper.App.Components.Manifest = {
  Version        : new Version(2013,12,19,2),
  Title          : new Title("WallPaper Manifest","Manifest"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coWallPaper.App,'/core/vdm/wallpaper/Manifest.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Install : function (Screen){
    var sc=Screen;
    var flds=Screen.Manifest;
    flds.Screen=sc;
    flds.addField("TabIndex",coDB.Kind.Integer,"tab-index",0,coDB.StreamOn);
    flds.addField("WallPaper",coDB.Kind.QWord,"wpr-id",0,coDB.StreamOn);
    flds.addField("WallPaperKind",coDB.Kind.QWord,"wpr-k",0,coDB.StreamOn);
    flds.onLoaded=function(){
      var sc=this.Screen;
      sc.setWallPaper();
    };
    return flds;
  }
};

