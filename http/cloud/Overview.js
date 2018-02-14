coCloudPage.App.Components.Overview = {
  Version        : new Version(2014,1,8,2),
  Title          : new Title("Cloud Views Overview","Overview"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCloudPage.App,'/cloud/Overview.js',coAppKit.PreLoaded),
  debugToConsole : true,

  setContent : function(Screen,ShowCase,Item){
    var sc=Screen;
    var pg=Item.Page;
    pg.clearContainerClass();
    pg.ContentBox=coAppUI.App.Components.ContentBox.Create(
      "ContentBox",
      "CloudPageContentBox",
      sc,
      pg.Slides,
      pg,
      pg.Client,
      coAppUI.Alignment.Client
    );

    pg.ContentBox.scaleX=(coVDM.Display.Small==true)? 1 : 0.5;
    pg.ContentBox.itemPadding.Top=4;
    pg.ContentBox.itemPadding.Left=4;
    pg.ContentBox.itemPadding.Right=4;
    pg.ContentBox.itemPadding.Bottom=4;

    pg.ContentBox.itemBorder.Top=2;
    pg.ContentBox.itemBorder.Left=2;
    pg.ContentBox.itemBorder.Right=2;
    pg.ContentBox.itemBorder.Bottom=2;

    pg.ContentBox.itemMargin.Top=10;
    pg.ContentBox.itemMargin.Left=10;
    pg.ContentBox.itemMargin.Right=10;
    pg.ContentBox.itemMargin.Bottom=10;

    var bx=pg.ContentBox.Intro=pg.ContentBox.Items.createItem(
      coLang.Table.Labels.Introduction, "",coTheme.Icons.Acorn
    );
    bx.rotateIcon(30);
    bx.LoadContent(coCloudPage.App.Components.Content.urlOverviewIntro);

    var bx=pg.ContentBox.Ownership=pg.ContentBox.Items.createItem(
      coLang.Table.Labels.Ownership, "",coTheme.Icons.Lock
    );
    bx.LoadContent(coCloudPage.App.Components.Content.urlOverviewOwnership);

    var bx=pg.ContentBox.Control=pg.ContentBox.Items.createItem(
      coLang.Table.Labels.Control, "",coTheme.Icons.BusinessMan
    );
    bx.LoadContent(coCloudPage.App.Components.Content.urlOverviewControl);

    var bx=pg.ContentBox.Commitment=pg.ContentBox.Items.createItem(
      coLang.Table.Labels.Commitment, "",coTheme.Icons.Seal
    );
    bx.LoadContent(coCloudPage.App.Components.Content.urlOverviewCommitment);
  }

};

