coFrontPage.App.Components.Boxes = {
  Version        : new Version(2014,2,27,37),
  Title          : new Title("Front Page Boxes","Boxes"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coFrontPage.App,'/fp/Boxes.js',coAppKit.PreLoaded),
  debugToConsole : true,



  boxHeightSmall : 300,
  boxHeightMedium: 350,

  Create : function(Screen){
    var sc=Screen;
    bs=coAppUI.App.Components.BoxView.Create(
      "Boxes",
      "FrontPageBoxes",
      sc,
      sc.Slides,
      sc.Frame,
      sc.Frame.Client,
      coAppUI.Alignment.Client
    );
    bs.Logo.Conseal();
    bs.Nav.Conseal();
    bs.Boxes.Margin.Left=coVDM.BoxViewLeftMargin;
    bs.Boxes.Margin.Right=coVDM.BoxViewRightMargin;

    bs.Welcome=bs.Boxes.Add("",coLang.Table.Buttons.Login,coLang.Table.VDM.getWelcomeBanner(coVDM.Display.Small),"FrontPageBoxWelcome");
    bs.Welcome.Title.className="FrontPageBoxWelcomeTitle";
    sc.Unit.App.Components.bxWelcome.Init(sc,bs.Welcome);
    bs.Welcome.setHeight( (coVDM.Display.Small==true) ? this.boxHeightSmall : 311);
    bs.Visible=true;
    return bs;
  }
};
