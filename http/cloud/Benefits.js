coCloudPage.App.Components.Benefits = {
  Version        : new Version(2014,1,8,1),
  Title          : new Title("Cloud Views Benefits","Benefits"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCloudPage.App,'/cloud/Benefits.js',coAppKit.PreLoaded),
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

    pg.ContentBox.scaleX=1;

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
      "Aurawin Cloud Benefits", "",coTheme.Icons.Logo.Dark.Cloud
    );
    bx.LoadContent(coCloudPage.App.Components.Content.urlBenefits);


  }
};

