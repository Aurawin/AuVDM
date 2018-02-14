coPartners.App.Components.Spacer = {
  Version        : new Version(2013,12,14,1),
  Title          : new Title("Partners Views Spacer","Spacer"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPartners.App,'/partners/Spacer.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Init : function(){

  },
  Create : function(Owner){
    var sc=Owner.Screen;
    var sp=Owner.Slides.createSlide(
      "Spacer",
      sc.Class+"Spacer",
      sc,
      Owner,
      Owner.Container,
      coAppUI.Alignment.Top
    );
    sp.Unit=this;
    sp.Visible=true;
    sp.clearContainerClass();
    var ln=sp.Controls.Line=coAppUI.App.Components.Line.Create(
      sp,
      sp.Container,
      "Line",
      sp.Class+"Line"
    );
    ln.Visible=true;
    ln.Placement.Mode.setFull();
    ln.Placement.Top=0;
    ln.Placement.Bottom=0;
    ln.Placement.Left=0;
    ln.Placement.Right=0;
    ln.Height=2;
    return sp;
  }
};
coPartners.App.Components.Spacer.Init();
