coCloudPage.App.Components.Views = {
  Version        : new Version(2014,10,3,2),
  Title          : new Title("Cloud Views","Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCloudPage.App,'/cloud/Views.js',coAppKit.PreLoaded),
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
    vs.ImageBar=coCloudPage.App.Components.ImageBar.Create(vs);
    vs.Spacer=coCloudPage.App.Components.Spacer.Create(vs);
    vs.Content=coCloudPage.App.Components.Content.Create(vs);
    vs.Footer=coCloudPage.App.Components.Footer.Create(vs);

    vs.Visible=true;
    vs.clearContainerClass();
    vs.Footer.Visible=true;
    vs.Content.Visible=true;
    vs.Content.clearContainerClass();

    return vs;
  }
};

