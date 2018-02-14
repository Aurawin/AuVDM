coDevelopersPage.App.Components.Content = {
  Version        : new Version(2014,1,11,7),
  Title          : new Title("Developer Views Content","Content"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coDevelopersPage.App,'/developers/Content.js',coAppKit.PreLoaded),
  debugToConsole : true,
  ButtonHeight   : 24,
  urlContent            : '/developers/cntFooter.html',
  urlProgramText        : "/developers/cntImageBar.html",
  urlOverviewIntro      : "/developers/cntOverviewIntro.html",
  urlOverviewRundown    : "/developers/cntOverviewRundown.html",

  urlDatabaseIntro      : "/developers/cntDatabaseIntro.html",
  urlDatabaseFeatures   : "/developers/cntDatabaseFeatures.html",

  urlUIIntro            : "/developers/cntUIIntro.html",
  urlUISlideComponents  : "/developers/cntUISlideComps.html",
  urlUIPlacedComponents : "/developers/cntUIPlacedComps.html",
  urlUIMiscComponents   : "/developers/cntUIMiscComps.html",

  Create : function(Owner){
    var wpr=Owner.Slides.createSlide(
      "Wrapper",
      "DevelopersPageContentWrapper",
      Owner.Screen,
      Owner,
      Owner.Container,
      coAppUI.Alignment.Client
    );
    wpr.clearContainerClass();
    wpr.doSetSizeFull=function(){
      var wpr=this;
      var sc=wpr.Screen;
      var vw=wpr.ShowCase;
      var cntr=sc.Views.Content.Container;
      cntr.style.height=wpr.Container.clientHeight-(vw.Margin.yBias()+vw.Border.yBias())+"px";
      cntr.style.width=sc.Views.ImageBar.Wrapper.Container.offsetWidth-(vw.Margin.xBias()+vw.Border.xBias())+"px";
    };
    wpr.doSetSizeSmall=function(){
      var wpr=this;
      var sc=wpr.Screen;
      var vw=wpr.ShowCase;
      var cntr=sc.Views.Content.Container;
      cntr.style.height=wpr.Container.clientHeight-(vw.Margin.yBias()+vw.Border.yBias())+"px";
      cntr.style.width=wpr.Container.clientWidth-(vw.Margin.xBias()+vw.Border.xBias())+"px";
    };

    wpr.doSetSize=wpr.doSetSizeFull;

    var vw=wpr.ShowCase=coAppUI.App.Components.ShowCase.Create(
      "ShowCase",
      Owner.Screen.Class+"ShowCase",
      Owner.Screen,
      wpr.Slides,
      wpr,
      wpr.Container,
      coAppUI.Alignment.Center
    );
    vw.PageItemPosition=coAppUI.Absolute;
    vw.PageClientPosition=coAppUI.Relative;
    vw.PageContentPosition=coAppUI.Absolute;

    if  (coVDM.Display.Small==true){
      vw.Items.Welcome=vw.Items.addItem();
    };

    vw.Items.Overview=vw.Items.addItem();
    vw.Items.Data=vw.Items.addItem();
    vw.Items.UI=vw.Items.addItem();

    vw.Buttons.placeTopCenterInside();
    vw.onSelectItem=function(Item){
      var vw=Item.Owner;
      //
    };
    if  (coVDM.Display.Small==true){
      var btn=vw.Items.Welcome.Button;
      btn.setCaption(coLang.Table.Labels.Welcome);
      btn.setHeight(this.ButtonHeight);
    };

    var btn=vw.Items.Overview.Button;
    btn.setCaption(coLang.Table.Labels.Overview);
    btn.setHeight(this.ButtonHeight);

    var btn=vw.Items.Data.Button;
    btn.setCaption(coLang.Table.Labels.Data);
    btn.setHeight(this.ButtonHeight)

    var btn=vw.Items.UI.Button;
    btn.setCaption(coLang.Table.Labels.UserInterface);
    btn.setHeight(this.ButtonHeight)


    if  (coVDM.Display.Small==true)
      coDevelopersPage.App.Components.Welcome.setContent(vw.Screen,vw,vw.Items.Welcome);
    coDevelopersPage.App.Components.Overview.setContent(vw.Screen,vw,vw.Items.Overview);
    coDevelopersPage.App.Components.Data.setContent(vw.Screen,vw,vw.Items.Data);
    coDevelopersPage.App.Components.UI.setContent(vw.Screen,vw,vw.Items.UI);
    return vw;
  }
};
