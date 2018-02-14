coCMS.App.Components.MultiViews = {
  Version        : new Version(2014,10,21,2),
  Title          : new Title("Aurawin CMS MultiViews","MultiViews"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/MultiViews.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCMS.App,'/core/cms/MultiViews.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/MultiViews.js',
  debugToConsole : true,

  createFileOptions:function(Screen){
    var s=coAppUI.App.Components.MultiView.Create(
      "Options",
      "mvCMSFileOptions",
      Screen,
      Screen.Files.Slides,
      Screen.Files,
      Screen.Files.Container,
      coAppUI.Alignment.Default
    );
    s.Folder=null;
    s.File=null;
    var lb=s.Controls.Title=coAppUI.App.Components.Label.Create(
      s,
      s.Container,
      "Title",
      "lblCMSFileOptionTitle",
      ""
    );
    lb.Placement.Mode.setTopCenter();
    lb.Placement.Top=10;

    s.Read=function(Folder,File){
      var s=this;
      s.Folder=Folder;
      s.File=File;
      s.Controls.Title.setCaption(rcFile.MAP.Name.Value);
    };

    return s;
  }
};
