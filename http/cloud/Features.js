coCloudPage.App.Components.Features = {
  Version        : new Version(2014,1,8,1),
  Title          : new Title("Cloud Views Features","Features"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCloudPage.App,'/cloud/Features.js',coAppKit.PreLoaded),
  debugToConsole : true,
  setContent : function(Screen,ShowCase,Item){
    var sc=Screen;
    var pg=Item.Page;

    pg.clearContainerClass();
    var cb=pg.ContentBox=coAppUI.App.Components.ContentBox.Create(
      "ContentBox",
      "CloudPageContentBox",
      sc,
      pg.Slides,
      pg,
      pg.Client,
      coAppUI.Alignment.Client
    );
    cb.setScale(1,1);
    //pg.ContentBox.scaleX=1;

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

    var bx=cb.General=cb.Items.createItem(
      "General Features", "",coTheme.Icons.Logo.Dark.Cloud
    );
    bx.LoadContent(coCloudPage.App.Components.Content.urlFeaturesGeneral);

    var bx=cb.Storage=cb.Items.createItem(
      "Storage Capabilities", "",coTheme.Icons.Spectrum.Folder.Cabinet
    );
    bx.LoadContent(coCloudPage.App.Components.Content.urlFeaturesStorage);

    var bx=cb.VDM=cb.Items.createItem(
      "Aurawin Virtual Desktop","",coTheme.Icons.Logo.Dark.Cloud
    );
    bx.LoadContent(coCloudPage.App.Components.Content.urlFeaturesVDM);

    var bx=cb.SCS=cb.Items.createItem(
      "Aurawin Social Computing Server (SCS)", "",coTheme.Icons.Logo.Table
    );
    bx.LoadContent(coCloudPage.App.Components.Content.urlFeaturesSCS);

    var bx=cb.Security=cb.Items.createItem(
      "Security for spam, hacking, and content","",coTheme.Icons.Lock
    );
    bx.LoadContent(coCloudPage.App.Components.Content.urlFeaturesSecurity);
  }
};

