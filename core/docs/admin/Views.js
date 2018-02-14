coDocs.App.Components.AdminViews = {
  Version        : new Version(2013,12,2,1),
  Title          : new Title("Documentation Administration Views","Admin Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDocs.App,'/core/docs/admin/Views.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create:function(Screen, aOwner, aParent,aAlign){
    var sc=Screen;
    var v=aOwner.Slides.createSlide(
      "AdminView",
      Screen.Class+"AdminView",
      sc,
      aOwner,
      aParent,
      aAlign
    );
    v.DefsList=this.createDefsList(sc,v,v.Container);

    v.Splitter=coAppUI.App.Components.Splitter.Create(sc,v.Slides,v,v.Container,coAppUI.Alignment.Left);
    v.Editors=this.createEditors(sc,v,v.Container);
    v.Splitter.targetLeft=v.DefsList;
    v.Splitter.targetRight=v.Editors;
    v.Visible=false;
    v.Hidden=true;
    v.clearContainerClass();
    v.showAdmin=function(){
      var v=this;
      v.DefsList.Show();
      v.Splitter.Show();
      v.Editors.showDefinitions();
      v.Reveal();
    };
    return v;
  },
  createEditors:function(Screen,Owner,Parent){
    return coDocs.App.Components.AdminEditors.Create(Screen,Owner,Parent,coAppUI.Alignment.Client);
  },
  createDefsList:function(Screen, aOwner, aParent){
    var dl=coAppUI.App.Components.TreeView.Create(
      "DefsList",
      Screen.Class+"DefsList",
      Screen,
      aOwner.Slides,
      aOwner,
      aOwner.Container,
      coAppUI.Alignment.Left
    );
    dl.clearContainerClass();
    // todo Manipulate TreeView Menu here...
    return dl;
  }
};

