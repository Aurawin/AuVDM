coPartners.App.Components.Content = {
  Version        : new Version(2013,12,12,5),
  Title          : new Title("Partners Views Content","Content"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPartners.App,'/partners/Content.js',coAppKit.PreLoaded),
  debugToConsole : true,

  urlOverViewMembers      : '/partners/cntOverViewMem.html',
  urlOverViewDevelopers   : '/partners/cntOverViewDev.html',
  urlOverViewEnterprise   : '/partners/cntOverViewEnt.html',
  urlOverViewCommitment   : '/partners/cntOverViewCom.html',
  urlSignupThanks         : '/partners/cntSignupThanks.html',
  urlBenefits             : '/partners/cntBenefits.html',
  xmlBenefits             : '/partners/benefits.xml',
  ButtonHeight   : 24,
  Init : function(){

  },

  Create : function(Owner){
    var wpr=Owner.Slides.createSlide(
      "Wrapper",
      "PartnersContentWrapper",
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
    vw.Items.Signup=vw.Items.addItem();
    vw.Buttons.placeTopCenterInside();
    vw.onSelectItem=function(Item){
      var vw=Item.Owner;
      vw.Items.Signup.Page.Slides.ShowCase.evtSlider.setActive(Item==vw.Items.Signup);
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
    var btn=vw.Items.Signup.Button;
    btn.setCaption(coLang.Table.Labels.Signup);
    btn.setHeight(this.ButtonHeight);

    if  (coVDM.Display.Small==true)
      coPartners.App.Components.Welcome.setContent(vw.Screen,vw,vw.Items.Welcome);
    coPartners.App.Components.Overview.setContent(vw.Screen,vw,vw.Items.Overview);
    coPartners.App.Components.Benefits.setContent(vw.Screen,vw,vw.Items.Benefits);
    coPartners.App.Components.Signup.setContent(vw.Screen,vw,vw.Items.Signup);

    return vw;
  }
};
coPartners.App.Components.Content.Init();
