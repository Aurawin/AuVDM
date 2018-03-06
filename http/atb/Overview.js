coPartners.App.Components.Overview = {
  Version        : new Version(2013,12,10,1),
  Title          : new Title("Partners Views Overview","Overview"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPartners.App,'/partners/Overview.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Init : function(){

  },
  setContent : function(Screen,ShowCase,Item){
    var sc=Screen;
    var pg=Item.Page;
    pg.clearContainerClass();
    pg.ContentBox=coAppUI.App.Components.ContentBox.Create(
      "ContentBox",
      "PartnersOverviewContentBox",
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

    var bx=pg.ContentBox.Members=pg.ContentBox.Items.createItem(
      coLang.Table.Labels.Members, "",coTheme.Icons.Acorn
    );
    bx.rotateIcon(30);
    bx.LoadContent(coPartners.App.Components.Content.urlOverViewMembers);

    var bx=pg.ContentBox.Developers=pg.ContentBox.Items.createItem(
      coLang.Table.Labels.Developers, "",coTheme.Icons.Apps
    );
    bx.LoadContent(coPartners.App.Components.Content.urlOverViewDevelopers);

    var bx=pg.ContentBox.Enterprise=pg.ContentBox.Items.createItem(
      coLang.Table.Labels.Enterprise, "",coTheme.Icons.BusinessMan
    );
    bx.LoadContent(coPartners.App.Components.Content.urlOverViewEnterprise);

    var bx=pg.ContentBox.Commitment=pg.ContentBox.Items.createItem(
      coLang.Table.Labels.Commitment, "",coTheme.Icons.Seal
    );
    bx.LoadContent(coPartners.App.Components.Content.urlOverViewCommitment);
  }

};
coPartners.App.Components.Overview.Init();

