coPartners.App.Components.Views = {
  Version        : new Version(2014,10,3,4),
  Title          : new Title("Partners Views","Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPartners.App,'/partners/Views.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Init : function(){

  },
  Create : function(Screen){
    var vs=Screen.Slides.createSlide(
      "Views",
      Screen.Class+"Views",
      Screen,
      Screen.Frame,
      Screen.Frame.Client,
      coAppUI.Alignment.Client
    );
    vs.ImageBar=coPartners.App.Components.ImageBar.Create(vs);
    vs.Spacer=coPartners.App.Components.Spacer.Create(vs);
    vs.Content=coPartners.App.Components.Content.Create(vs);
    vs.Footer=coPartners.App.Components.Footer.Create(vs);

    vs.Visible=true;
    vs.clearContainerClass();
    vs.Footer.Visible=true;
    vs.Content.Visible=true;
    vs.Content.clearContainerClass();

    return vs;
  }
};
coPartners.App.Components.Views.Init();

