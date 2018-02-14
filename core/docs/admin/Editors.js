coDocs.App.Components.AdminEditors = {
  Version        : new Version(2013,12,2,1),
  Title          : new Title("Documentation Administration Views","Admin Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDocs.App,'/core/docs/admin/Editors.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create:function(Screen, Owner, Parent,Align){
    var es=Owner.Slides.createSlide(
      "Editors",
      Screen.Class+"Editors",
      Screen,
      Owner,
      Parent,
      Align
    );
    es.Definitions=this.createDefs(Screen,es,es.Container);
    es.Definitions.Visible=false;
    es.Definitions.Hidden=true;
    es.Implementations=this.createImps(Screen,es,es.Container);
    es.Implementations.Visible=false;
    es.Implementations.Hidden=true;

    es.showDefinitions=function(){
      var es=this;
      es.Implementations.Conseal();
      es.Definitions.Reveal();
      // todo setNav
    };
    es.showImplementations=function(){
      var es=this;
      es.Definitions.Conseal();
      es.Implementations.Reveal();
      // todo setNav
    };
    es.clearContainerClass();
    return es;
  },
  createDefs:function(Screen, aOwner, aParent){
    var edt=aOwner.Slides.createSlide(
      "DefsEditor",
      Screen.Class+"DefsEditor",
      Screen,
      aOwner,
      aParent,
      coAppUI.Alignment.Client
    );
    edt.clearContainerClass();
    return edt;
  },
  createImps:function(Screen, aOwner, aParent){
    var sc=Screen;
    var edt=aOwner.Slides.createSlide(
      "ImpEditor",
      Screen.Class+"ImpEditor",
      Screen,
      aOwner,
      aParent,
      coAppUI.Alignment.Client
    );
    edt.clearContainerClass();
    return edt;
  }
};

