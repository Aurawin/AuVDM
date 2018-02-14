coDevelopersPage.App.Components.Footer = {
  Version        : new Version(2014,1,11,1),
  Title          : new Title("Developer Views Footer","Footer"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDevelopersPage.App,'/developers/Footer.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Init : function(){

  },
  Create : function(Owner){
    var sc=Owner.Screen;
    var vs=Owner.Slides.createSlide(
      "Footer",
      sc.Class+"Footer",
      sc,
      Owner,
      Owner.Container,
      coAppUI.Alignment.Bottom
    );
    vs.Unit=this;
    vs.Visible=true;

    vs.Glyph=vs.Slides.createSlide(
      "FooterGlyph",
      sc.Class+"FooterGlyph",
      sc,
      vs,
      vs.Container,
      coAppUI.Alignment.Left
    );
    vs.Content=vs.Slides.createSlide(
      "FooterContent",
      sc.Class+"FooterContent",
      sc,
      vs,
      vs.Container,
      coAppUI.Alignment.Client
    );
    vs.onContentLoaded=function(s){
      var vs=s.Owner;
      coDOM.setHTML(vs.Content.Container,s.responseText);
    };
    vs.onContentError=function(s){
      var vs=s.Owner;
      coDOM.setHTML(vs.Content.Container,"");
    };
    vs.LoadContent=function(){
      var vs=this;
      coDOM.httpGET(vs,coDevelopersPage.App.Components.Content.urlContent,vs.onContentLoaded,vs.onContentError);

    };
    vs.Visible=true;
    vs.clearContainerClass();
    vs.Glyph.Visible=true;
    vs.Glyph.clearContainerClass();
    vs.Content.clearContainerClass();
    vs.Content.Visible=true;
    vs.LoadContent();
    return vs;
  }
};
