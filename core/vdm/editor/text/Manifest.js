coText.App.Components.Manifest = {
  Version        : new Version(2013,11,17,1),
  Title          : new Title("Text Editor Manifest","Manifest"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAccount.App,'/core/vdm/editor/text/Manifest.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Install : function (Screen){
    var sc=Screen;
    var flds=Screen.Manifest;
    //flds.addField("LastView",coDB.Kind.Integer,"last-view",sc.Unit.lvUsage,coDB.StreamOn);
    return flds;
  }
};

