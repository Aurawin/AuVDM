coAccount.App.Components.Switcher = {
  Version        : new Version(2014,4,2,7),
  Title          : new Title("Account Switcher","Switcher"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAccount.App,'/core/vdm/account/Switcher.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var sw=coAppUI.App.Components.MultiView.Create("Switcher","sldClient",sc,sc.Slides,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Default);
    sw.Nav.Menu.Conseal();
    sw.zIndex=2;
    sw.Payment=coVDM.App.Components.coAccount.App.Components.Editor.createPayment(sc,sw);

    coVDM.App.Components.coAccount.App.Components.Nav.installSwitchItems(sw);
    sw.SwitchToNewPayment=function(){
      this.Reveal();
      this.Nav.forceSelected(this.Nav.gpNewPayment);
    };
    sw.Conseal();
    return sw;
  }
};

