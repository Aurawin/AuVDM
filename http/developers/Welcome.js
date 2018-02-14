coDevelopersPage.App.Components.Welcome = {
  Version        : new Version(2014,1,11,1),
  Title          : new Title("Developer Views Welcome","Welcome"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDevelopersPage.App,'/developers/Welcome.js',coAppKit.PreLoaded),
  debugToConsole : true,
  setContent : function(Screen,ShowCase,Item){
    var sc=Screen;
    var pg=Item.Page;
    var vs=ShowCase.Owner.Owner;
    var ib=vs.ImageBar;

    ib.setOwnerAndParent(pg.Slides,pg,pg.Client);
    ib.Align.setValue(coAppUI.Alignment.Client);
    ib.Wrapper.Glyph2.setWidth(coMath.Div(coVDM.Display.Width,1.75));

    ShowCase.Owner.doSetSize=ShowCase.Owner.doSetSizeSmall;

    pg.clearContainerClass();
    ShowCase.setScrollerBackgroundColor("rgba(255,255,255,1)");
    vs.Spacer.setHeight(40);
  }
};

