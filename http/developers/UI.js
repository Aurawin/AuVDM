coDevelopersPage.App.Components.UI = {
  Version        : new Version(2014,10,13,2),
  Title          : new Title("Developer Views Database","Database"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDevelopersPage.App,'/developers/UI.js',coAppKit.PreLoaded),
  debugToConsole : true,

  setContent : function(Screen,ShowCase,Item){
    var sc=Screen;
    var pg=Item.Page;
    pg.clearContainerClass();
    var cb = pg.ContentBox=coAppUI.App.Components.ContentBox.Create(
      "ContentBox",
      "DevelopersPageContentBox",
      sc,
      pg.Slides,
      pg,
      pg.Content,
      coAppUI.Alignment.Client
    );
    cb.setScale(1,1);
    cb.itemPadding.Top=4;
    cb.itemPadding.Left=4;
    cb.itemPadding.Right=4;
    cb.itemPadding.Bottom=4;

    cb.itemBorder.Top=2;
    cb.itemBorder.Left=2;
    cb.itemBorder.Right=2;
    cb.itemBorder.Bottom=2;

    cb.itemMargin.Top=10;
    cb.itemMargin.Left=10;
    cb.itemMargin.Right=10;
    cb.itemMargin.Bottom=10;
    cb.CMS.setURI("/developers/UI.xml");

    /*
    var bx=cb.Intro=cb.Items.createItem(
      coLang.Table.Apps.Developers.UI.Intro, "",coTheme.Icons.Puzzle
    );
    bx.LoadContent(coDevelopersPage.App.Components.Content.urlUIIntro);

    var bx=cb.SlideComponents=cb.Items.createItem(
      "Slide Components", "",coTheme.Icons.Gears.Tripple
    );
    bx.LoadContent(coDevelopersPage.App.Components.Content.urlUISlideComponents);

    var bx=cb.PlacedComponents=cb.Items.createItem(
      "Placed Components", "",coTheme.Icons.Gears.Double
    );
    bx.LoadContent(coDevelopersPage.App.Components.Content.urlUIPlacedComponents);

    var bx=cb.MiscComponents=cb.Items.createItem(
      "Miscellaneous Components", "",coTheme.Icons.Gears.Single
    );
    bx.LoadContent(coDevelopersPage.App.Components.Content.urlUIMiscComponents);
    */
  }
};

