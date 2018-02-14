coSocial.App.Components.sldNetwork = {
  Version        : new Version(2013,5,18,7),
  Title          : new Title("Social Network Slide","sldNetwork"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/netNetwork.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var ns=sc.Slides.createSlide("Network","sldClient",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
    //ns.Folders=coSocial.App.Components.DB.createFolders();
    //ns.Files=coSocial.App.Components.DB.createFiles();
    //ns.Uploader=coSocial.App.Components.netUploader.Create(sc,ns);
    //ns.ToolBar=coSocial.App.Components.netToolbar.Create(sc,ns);
    //ns.Cabinet=coSocial.App.Components.Cabinet.Create(sc,ns);

    return ns;
  }

};
