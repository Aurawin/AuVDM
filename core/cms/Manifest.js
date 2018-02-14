coCMS.App.Components.Manifest = {
  Version        : new Version(2014,10,21,1),
  Title          : new Title("Aurawin CMS Manifest","Manifest"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/Manifest.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCMS.App,'/core/cms/Manifest.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/Manifest.js',
  debugToConsole : true,


  createFileMan:function(Screen){
    var mfst=coVDM.Manifest;
    mfst.cmsFileManager=mfst.addEntry("cmsFileManager","cms-fl-man",Screen.onManifestUpdated);
    mfst.cmsFileManager.addField("FoldersWidth",coDB.Kind.Integer,"fldrs-w",coTheme.Apps.Cabinet.Folder.Width,coDB.StreamOn);
  }
};

