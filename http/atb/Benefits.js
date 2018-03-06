coPartners.App.Components.Benefits = {
  Version        : new Version(2013,12,10,1),
  Title          : new Title("Partners Views Benefits","Benefits"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPartners.App,'/partners/Benefits.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Init : function(){

  },
  setContent : function(Screen,ShowCase,Item){
    var sc=Screen;
    var pg=Item.Page;
    var lv=coAppUI.App.Components.ListView.Create(
      "BenefitsListView",
      sc.Class+"BenefitsListView",
      sc,
      pg.Slides,
      pg,
      pg.Client,
      coAppUI.Alignment.Client
    );
    lv.clearContainerClass();
    lv.ListItemHeight=30;
    lv.ListItemLineHeight=30;

    var DB=coPartners.App.DB;
    lv.DataSet=DB.Benefits;
    lv.DataSet.Displays.Add(lv);
    lv.Header.Columns.addItem(lv.DataSet.Fields.MAP.Benefit);
    lv.Header.Columns.addItem(lv.DataSet.Fields.MAP.Member);
    lv.Header.Columns.addItem(lv.DataSet.Fields.MAP.Professional);
    lv.Header.Columns.addItem(lv.DataSet.Fields.MAP.Enterprise);

    DB.Commands.LoadBenefits(coPartners.App.Components.Content.xmlBenefits);

  }
};
coPartners.App.Components.Benefits.Init();

