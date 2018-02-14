coMusic.App.Components.Stack = {
  Version        : new Version(2013,5,18,3),
  Title          : new Title("Music Thumbnail Stack","Stack"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Stack.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,Slides,Owner,Parent,Align){
    var stk=coThumbs.App.Components.Stack.Create(Screen,Slides,Owner,Parent,Align);
    stk.Hidden=true;
    return stk;
  }
};

