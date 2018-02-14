coSocial.App.Components.netSplitter = {
  Version        : new Version(2012,5,4,6),
  Title          : new Title("Social Network Splitter","netSplitter"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/netSplitter.js',coAppKit.PreLoaded),  debugToConsole : true,
  Create : function (Screen){
    var sp=coAppUI.App.Components.Splitter.Create(Screen,Screen.Slides,Screen,Screen.Frame.Client,coAppUI.Alignment.Left);
    sp.onShow=function(){
      var sp=this;
      var sc=sp.Screen;
      sc.Selector.Container.style.width=sc.Manifest.MAP.NetSelWidth.Value+"px";
    };
    sp.onSized=function(){
      var sp=this;
      var sc=sp.Screen;
      sc.Manifest.MAP.NetSelWidth.Value=sc.Selector.Container.clientWidth;
      coVDM.Manifest.Save();
    };
    return sp;
  }
};
