coMusic.App.Components.Splitter = {
  Version        : new Version(2013,5,18,6),
  Title          : new Title("Music Splitter","Splitter"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Splitter.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function (Screen){
    var sp=coAppUI.App.Components.Splitter.Create(Screen,Screen.Slides,Screen,Screen.Frame.Client,coAppUI.Alignment.Left);
    sp.onShow=function(){
      var sp=this;
      var sc=sp.Screen;
      sc.LeftView.Container.style.width=sc.Manifest.MAP.LeftViewWidth.Value+"px";
    };
    sp.onSized=function(){
      var sp=this;
      var sc=sp.Screen;
      sc.Manifest.MAP.LeftViewWidth.Value=sc.LeftView.Container.clientWidth;
      coVDM.Manifest.Save();
    };
    return sp;
  }
};

