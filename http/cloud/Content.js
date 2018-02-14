coCloudPage.App.Components.Content = {
  Version        : new Version(2014,1,9,7),
  Title          : new Title("Cloud Views Content","Content"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCloudPage.App,'/cloud/Content.js',coAppKit.PreLoaded),
  debugToConsole : true,
  ButtonHeight   : 24,
  urlOverviewIntro      : "/cloud/cntOverviewIntro.html",
  urlOverviewOwnership  : "/cloud/cntOverviewOwnership.html",
  urlOverviewControl    : "/cloud/cntOverviewControl.html",
  urlOverviewCommitment : "/cloud/cntOverviewCommitment.html",
  urlBenefits           : "/cloud/cntBenefits.html",
  urlFeaturesGeneral    : "/cloud/cntFeaturesGeneral.html",
  urlFeaturesStorage    : "/cloud/cntFeaturesStorage.html",
  urlFeaturesSCS        : "/cloud/cntFeaturesSCS.html",
  urlFeaturesSecurity   : "/cloud/cntFeaturesSecurity.html",
  urlFeaturesVDM        : "/cloud/cntFeaturesVDM.html",
  Create : function(Owner){
    var wpr=Owner.Slides.createSlide(
      "Wrapper",
      "CloudPageContentWrapper",
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
    vw.PageContentPosition=coAppUI.Relative;

    if  (coVDM.Display.Small==true){
      vw.Items.Welcome=vw.Items.addItem();
    };

    vw.Items.Overview=vw.Items.addItem();
    vw.Items.Benefits=vw.Items.addItem();
    vw.Items.Features=vw.Items.addItem();

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
    var btn=vw.Items.Benefits.Button;
    btn.setCaption(coLang.Table.Labels.Benefits);
    btn.setHeight(this.ButtonHeight)
    var btn=vw.Items.Features.Button;
    btn.setCaption(coLang.Table.Labels.Features);
    btn.setHeight(this.ButtonHeight);

    if  (coVDM.Display.Small==true)
      coCloudPage.App.Components.Welcome.setContent(vw.Screen,vw,vw.Items.Welcome);
    coCloudPage.App.Components.Overview.setContent(vw.Screen,vw,vw.Items.Overview);
    coCloudPage.App.Components.Benefits.setContent(vw.Screen,vw,vw.Items.Benefits);
    coCloudPage.App.Components.Features.setContent(vw.Screen,vw,vw.Items.Features);

    return vw;
  }
};
