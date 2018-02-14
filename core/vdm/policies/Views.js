coPolicies.App.Components.Views = {
  Version        : new Version(2013,5,22,11),
  Title          : new Title("Aurawin Policy Views","Views"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPolicies.App,'/core/vdm/policies/Views.js',coAppKit.PreLoaded),
  debugToConsole : true,
  urlAUP         : '/aup/Main.html',
  urlPrivacy     : '/privacy/Main.html',
  urlAgreement   : '/tos/Main.html',
  CreateSwitcher:function(Screen){
    var sc=Screen;
    sw=coAppUI.App.Components.MultiView.Create("Switcher","sldClient",sc,sc.Slides,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Default);
    sw.zIndex=2;
    sw.Nav.Conseal();
    return sw;
  },
  CreateMain:function(Screen){
    var sc=Screen;
    m=sc.Slides.createSlide("PolicyMain","sldPolicyMain",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
    m.Unit=this;
    m.Container.className="sldPolicyMain";

    m.Slides.AUP=coAppUI.App.Components.PageView.Create("AUP","sldPolicyAUP",sc,m.Slides,m,m.Container,coAppUI.Alignment.Client);
    m.Slides.AUP.Conseal();
    m.Slides.AUP.setURL(this.urlAUP);

    m.Slides.Privacy=coAppUI.App.Components.PageView.Create("Privacy","sldPolicyPrivacy",sc,m.Slides,m,m.Container,coAppUI.Alignment.Client);
    m.Slides.Privacy.Conseal();
    m.Slides.Privacy.setURL(this.urlPrivacy);

    m.Slides.Agreement=coAppUI.App.Components.PageView.Create("Agreement","sldPolicyAgreement",sc,m.Slides,m,m.Container,coAppUI.Alignment.Client);
    m.Slides.Agreement.Conseal();
    m.Slides.Agreement.setURL(this.urlAgreement);

    m.showAUP=function(){
      var m=this;
      m.Slides.Privacy.Conseal();
      m.Slides.Agreement.Conseal();
      m.Slides.AUP.Reveal();
    };
    m.showAgreement=function(){
      var m=this;
      m.Slides.Privacy.Conseal();
      m.Slides.AUP.Conseal();
      m.Slides.Agreement.Reveal();
    };
    m.showPrivacy=function(){
      var m=this;
      m.Slides.Agreement.Conseal();
      m.Slides.AUP.Conseal();
      m.Slides.Privacy.Reveal();
    };
    return m;
   }
};
