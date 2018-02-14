coSocial.App.Components.Manifest = {
  Version        : new Version(2013,5,18,13),
  Title          : new Title("Social Network Manifest","Manifest"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/Manifest.js',coAppKit.PreLoaded),  debugToConsole : true,
  Install : function (Screen){
    var sc=Screen;
    var flds=Screen.Manifest;
    flds.addField("CabTreeWidth",coDB.Kind.Integer,"cab-tree-width",coVDM.ListBoxWidth,coDB.StreamOn);
    flds.addField("NetSelectVisible",coDB.Kind.Boolean,"net-sel-vis",(coVDM.Display.Small!=true),coDB.StreamOn);
    flds.addField("NetSelWidth",coDB.Kind.Integer,"net-sel-width",coVDM.ListBoxWidth,coDB.StreamOn);
    flds.addField("LastView",coDB.Kind.Integer,"last-view",sc.Unit.lvCabinet,coDB.StreamOn);
    flds.addField("ViewMode",coDB.Kind.Integer,"view-mode",(coVDM.Display.Small==true)? sc.Unit.vmSimple : sc.Unit.vmComplete,coDB.StreamOn);
    flds.addField("MyNetworkState",coDB.Kind.Integer,"my-networks-state",sc.Selector.My.State.Expanded,coDB.StreamOn);
    flds.addField("MyNetworkSelectionID",coDB.Kind.Integer,"my-networks-sel",0,coDB.StreamOn);
    flds.addField("ConnectionsState",coDB.Kind.Integer,"connections-state",sc.Selector.Other.State.Expanded,coDB.StreamOn);
    return flds;
  }
};
