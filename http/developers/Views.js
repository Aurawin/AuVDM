coDevelopersPage.App.Components.Views = {
  Version        : new Version(2014,1,11,1),
  Title          : new Title("Developers Views","Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDevelopersPage.App,'/developers/Views.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var vs=Screen.Slides.createSlide(
      "Views",
      Screen.Class+"Views",
      Screen,
      Screen.Frame,
      Screen.Frame.Client,
      coAppUI.Alignment.Client
    );
    vs.ImageBar=coDevelopersPage.App.Components.ImageBar.Create(vs);
    vs.Spacer=coDevelopersPage.App.Components.Spacer.Create(vs);
    vs.Content=coDevelopersPage.App.Components.Content.Create(vs);
    vs.Footer=coDevelopersPage.App.Components.Footer.Create(vs);

    vs.Visible=true;
    vs.clearContainerClass();
    vs.Footer.Visible=true;
    vs.Content.Visible=true;
    vs.Content.clearContainerClass();

    return vs;
  }
};

