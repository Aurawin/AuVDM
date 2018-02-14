coCollageBoard.App.Components.Views = {
  Version        : new Version(2013,11,22,9),
  Title          : new Title("Collage Board Views","Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCollageBoard.App,'/core/collages/Views.js',coAppKit.PreLoaded),
  debugToConsole : true,

  createLister   : function(sc){
    var lv=coAppUI.App.Components.ListView.Create("lvCollages","ListView",sc,sc.Slides,sc,sc.Frame.Client,coAppUI.Alignment.Client);
    lv.DataSet=sc.DB;
    lv.Header.Columns.addItem(sc.DB.Fields.MAP.Title);
    lv.Header.Columns.addItem(sc.DB.Fields.MAP.Type);
    lv.Header.Columns.addItem(sc.DB.Fields.MAP.Speed);
    lv.Header.Columns.addItem(sc.DB.Fields.MAP.Images);

    lv.onDoubleClick=function(li){
      var sc=li.Owner.Owner.Screen;
      var edt=sc.Views.Editor;
      sc.Views.List.Conseal();
      edt.Load(li.Data);
    };
    lv.Conseal();
    sc.DB.Displays.Add(lv);
    return lv;
  },
  createPreviewer : function(sc){

  },
  Create : function(sc){
    var vs=coObject.Create();
    vs.Screen=sc;
    vs.List=this.createLister(sc);
    vs.Editor=coCollageBoard.App.Components.Editor.Create(sc);

    return vs;
  }
};
