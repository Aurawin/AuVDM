coTour.App.Components.Views = {
  Version        : new Version(2013,5,22,35),
  Title          : new Title("Tour Views","Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coTour.App,'/core/vdm/tour/Views.js',coAppKit.PreLoaded),
  debugToConsole : true,
  urlWelcome     : '/core/vdm/tour/wel.html',
  urlIWelcome    : '/core/vdm/tour/iwel.html',
  urlCloud       : '/core/vdm/tour/cl.html',
  urlICloud      :'/core/vdm/tour/icl.html',
  urlSocial      : '/core/vdm/tour/soc.html',
  urlISocial     :'/core/vdm/tour/isoc.html',
  urlSecure      : '/core/vdm/tour/sec.html',
  urlISecure     :'/core/vdm/tour/isec.html',
  CreateSwitcher:function(Screen){
    var sc=Screen;
    sw=coAppUI.App.Components.MultiView.Create("Switcher","sldClient",sc,sc.Slides,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Default);
    sw.zIndex=2;
    sw.Nav.Conseal();
    return sw;
  },
  CreateMain:function(Screen){
    var sc=Screen;
    m=sc.Slides.createSlide("TourMain","sldTourMain",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
    m.Unit=this;
    m.Container.className="sldTourMain";
    m.Header=m.Slides.createSlide("Header","sldTourHeader",sc,m,m.Container,coAppUI.Alignment.Top);
    m.Header.clearContainerClass();
    m.Header.ShowCase=coAppUI.App.Components.ShowCase.Create("TourShowCase","sldTourShowCase",sc,m.Header.Slides,m.Header,m.Header.Container,coAppUI.Alignment.Right);
    m.Header.ShowCase.Container.className="sldTourShowCase";
    m.Header.ShowCase.Items.Welcome=m.Header.ShowCase.Items.addItem();
    m.Header.ShowCase.Items.Cloud=m.Header.ShowCase.Items.addItem();
    m.Header.ShowCase.Items.Social=m.Header.ShowCase.Items.addItem();
    m.Header.ShowCase.Items.Secure=m.Header.ShowCase.Items.addItem();
    m.Header.ShowCase.onSelectItem=function(scItem){
      var m=scItem.Owner.Owner.Owner;
      var mnu=m.Screen.Nav.gpTour.Menu;
      var scI=m.Slides.Illustrations;
      switch (scItem){
        case (m.Header.ShowCase.Items.Welcome) : {
          scI.Items.Welcome.Button.Select();
          mnu.setSelected(mnu.miWelcome);
          break;
        };
        case (m.Header.ShowCase.Items.Cloud) : {
          scI.Items.Cloud.Button.Select();
          mnu.setSelected(mnu.miCloud);
          break;
        };
        case (m.Header.ShowCase.Items.Social) : {
          scI.Items.Social.Button.Select();
          mnu.setSelected(mnu.miSocial);
          break;
        };
        case (m.Header.ShowCase.Items.Secure) : {
          scI.Items.Secure.Button.Select();
          mnu.setSelected(mnu.miSafe);
          break;
        };
      };
    };
    m.Slides.Illustrations=coAppUI.App.Components.ShowCase.Create("TourIllustrations","sldTourIllustrations",sc,m.Slides,m,m.Container,coAppUI.Alignment.Client);
    m.Slides.Illustrations.showButtons=false;
    m.Slides.Illustrations.Container.className="sldTourIllustrations";
    m.Slides.Illustrations.Items.Welcome=m.Slides.Illustrations.Items.addItem();
    m.Slides.Illustrations.Items.Cloud=m.Slides.Illustrations.Items.addItem();
    m.Slides.Illustrations.Items.Social=m.Slides.Illustrations.Items.addItem();
    m.Slides.Illustrations.Items.Secure=m.Slides.Illustrations.Items.addItem();

    m.onShow=function(){
      var m=this;
      m.Header.ShowCase.Items.Welcome.Page.setURL(m.Unit.urlIWelcome);
      m.Header.ShowCase.Items.Cloud.Page.setURL(m.Unit.urlICloud);
      m.Header.ShowCase.Items.Social.Page.setURL(m.Unit.urlISocial);
      m.Header.ShowCase.Items.Secure.Page.setURL(m.Unit.urlISecure);
      m.Slides.Illustrations.Items.Welcome.Page.setURL(m.Unit.urlWelcome);
      m.Slides.Illustrations.Items.Cloud.Page.setURL(m.Unit.urlCloud);
      m.Slides.Illustrations.Items.Social.Page.setURL(m.Unit.urlSocial);
      m.Slides.Illustrations.Items.Secure.Page.setURL(m.Unit.urlSecure);
    };
    return m;
   }
};
