coSocial.App.Components.Cabinet = {
  Version        : new Version(2013,5,18,18),
  Title          : new Title("Social Network Cabinet","Cabinet"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/Cabinet.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,Owner){
    var cab=Owner.Slides.createSlide("Cabinet","sldClient",Screen,Owner,Owner.Container,coAppUI.Alignment.Client);
    cab.Hidden=true;
    cab.Tree=coSocial.App.Components.netTree.Create(Owner,Screen,cab.Slides,cab,cab.Container,coAppUI.Alignment.Left);
    cab.Splitter=coAppUI.App.Components.Splitter.Create(Screen,cab.Slides,cab,cab.Container,coAppUI.Alignment.Left);
    cab.ListView=coSocial.App.Components.netListView.Create(Owner,Screen,cab.Slides,cab,cab.Container,coAppUI.Alignment.Client);
    cab.Splitter.targetLeft=cab.Tree;
    cab.Splitter.targetRight=cab.ListView;
    cab.Splitter.onSized=function(){
      var spl=this;
      spl.Screen.Manifest.MAP.CabTreeWidth.Value = cab.Tree.Container.clientWidth;
      coVDM.Manifest.Save();
    };
    cab.onShow=function(){
      var cab=this;
      var sc=cab.Screen;
      var ns=sc.Network;
      //ns.ToolBar.Buttons.Cabinet.setDown();
      cab.Tree.Show();
      cab.Splitter.Show();
      cab.ListView.Show();
      cab.Tree.Container.style.width=sc.Manifest.MAP.CabTreeWidth.Value+"px";
      cab.Tree.Synchronize();
    };
    cab.onHide=function(){
      var cab=this;
      var sc=cab.Screen;
      var ns=sc.Network;
      //ns.ToolBar.Buttons.Cabinet.setUp();
      cab.Tree.Hide();
      cab.Splitter.Hide();
      cab.ListView.Hide();
    };
    cab.Load=function(dbItem){
      var cab=this;
      var sc=cab.Screen;
      var ns=sc.Network;
        // clear out data
        //ns.Folders.Clear();
      ns.Files.Clear();
        // Download selected network's folders

      /*
      var netCMD=ns.Folders.Commands.List;
      netCMD.Headers.Update(coNet.fieldSearch,dbItem.MAP.ID.Value);
      netCMD.reTry();
      netCMD=null;
      */
    };
    return cab;
  }
};
