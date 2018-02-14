coMusic.App.Components.netSelect = {
  Version        : new Version(2013,5,18,6),
  Title          : new Title("Music Social Network Selector","netSelect"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/netSelect.js',coAppKit.PreLoaded),
  debugToConsole : true,
  DefaultHeight  : 240,
  Create : function(Screen,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Top;
    var sc=Screen;
    var nSel=coAppUI.App.Components.NetSelect.Create([coSocial.NET_GROUP_MY,coSocial.NET_GROUP_OTHER],"NetworkSelector","sldClient",sc,sc.Slides,sc.Frame,sc.Frame.Client,Align);
    nSel.AdjustGroups=function(){
     var nSel=this;
    };

    nSel.My.onSelected=function(gp){
      var nSel=gp.Owner;
      var sc=nSel.Screen;
      if (nSel.Other.Items.Focused) nSel.Other.Items.Focused.setFocused(false);
    };
    nSel.My.onSynchronized=function(gp){
      if (gp.DataSet) {
        var iID=sc.Manifest.MAP.MyNetworkSelectionID.Value;
        var dbItem=gp.DataSet.getItemById(iID);
        var itm= (dbItem) ? dbItem.Display.getItem(gp) : null;
        if (itm) {
          itm.setSelected(true);
          itm.setFocused(true);
        };
      };
    };
    nSel.My.onShow=function(gp){
      var nSel=gp.Owner;
      var sc=nSel.Screen;
      nSel.My.State.setValue(sc.Manifest.MAP.MyNetworkState.Value);
    };
    nSel.My.onExpanded=function(gp){
      var nSel=gp.Owner;
      var sc=nSel.Screen;
      sc.Manifest.MAP.MyNetworkState.Value=gp.State.Expanded;
      coVDM.Manifest.Save();
    };
    nSel.My.onCollapsed=function(gp){
      var nSel=gp.Owner;
      var sc=nSel.Screen;
      sc.Manifest.MAP.MyNetworkState.Value=gp.State.Collapsed;
      coVDM.Manifest.Save();
    };
    nSel.My.onSelectItem=function(itm){
      var itms=itm.Owner;
      var nSel=itms.Owner.Owner;
      var sc=nSel.Screen;
      nSel.AdjustGroups();

      sc.Manifest.MAP.MyNetworkSelectionID.Value=itm.Data.MAP.ID.Value;
      coVDM.Manifest.Save();
    };
    nSel.Other.onShow=function(gp){
      var nSel=gp.Owner;
      var sc=nSel.Screen;
      nSel.Other.State.setValue(sc.Manifest.MAP.ConnectionsState.Value);
    };
    nSel.Other.onSelectItem=function(itm){
      var itms=itm.Owner;
      var nSel=itms.Owner.Owner;
      var sc=nSel.Screen;
      sc.Frame.Torus.Show();
    };
    nSel.Other.onSelected=function(gp){
      var nSel=gp.Owner;
      var sc=nSel.Screen;
      if (nSel.My.Items.Focused) nSel.My.Items.Focused.setFocused(false);
    };
    nSel.Other.onExpanded=function(gp){
      var nSel=gp.Owner;
      var sc=nSel.Screen;
      sc.Manifest.MAP.ConnectionsState.Value=gp.State.Expanded;
      coVDM.Manifest.Save();
    };
    nSel.Other.onCollapsed=function(gp){
      var nSel=gp.Owner;
      var sc=nSel.Screen;
      sc.Manifest.MAP.ConnectionsState.Value=gp.State.Collapsed;
      coVDM.Manifest.Save();
    };
    return nSel;
  }
};

