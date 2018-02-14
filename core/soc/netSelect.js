coSocial.App.Components.netSelect = {
  Version        : new Version(2014,10,13,72),
  Title          : new Title("Social Network Selector","netSelect"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/netSelect.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,Slides,Owner,Parent,Groups,alignSlide,alignToolbar){
    if (Groups==undefined) Groups=new Array();
    if (alignSlide==undefined) alignSlide=coAppUI.Alignment.Left;
    if (alignToolbar==undefined) alignToolbar=coAppUI.Alignment.Bottom;
    var sc=Screen;
    var nSel=coAppUI.App.Components.NetSelect.Create(Groups,"NetworkSelector","sldClient",sc,Slides,Owner,Parent,alignSlide);

    nSel.ToolBar=coAppUI.App.Components.Toolbar.Create("tbSelector","Toolbar",sc,nSel.Slides,nSel,nSel.Container,alignToolbar);
    nSel.ToolBar.AllowWrap=false;
    nSel.ToolBar.Mode.setValue(nSel.ToolBar.Mode.justCaptions);
    nSel.ToolBar.setHeights(coVDM.ToolbarHeightThin,coVDM.ToolbarHeightThin,coTheme.UI.Toolbar.Item.Text.lineHeight);
    nSel.ToolBar.Buttons.Search=nSel.ToolBar.createTextWithButton(coLang.Table.Buttons.Search,coTheme.Icons.None);
    nSel.ToolBar.Buttons.Search.Input.placeholder=coLang.Table.Apps.Social.Networks.Search.Hint;
    nSel.ToolBar.Buttons.Search.onClick=function(TxtBtn){
      var tb=TxtBtn.Owner;
      var sc=tb.Screen;
      var cs=sc.Search;
      cs.ToolBar.Buttons.Search.Input.value=TxtBtn.Input.value;
      TxtBtn.Input.value="";
      cs.ToolBar.Buttons.Search.doClick();
      coSocial.App.Components.Views.ShowSearch(sc);
    };
    nSel.Client.onSetSize=function(){
      var cl=this;
      var nSel=cl.Owner;
      var tb=nSel.ToolBar;
      var iWidth=tb.Container.clientWidth;
      var twb=tb.Buttons.Search;
      var iBias=5+twb.inputMargin.xBias()+twb.inputBorder.xBias()+twb.Button.Border.xBias()+twb.Button.Margin.xBias();
      twb.Input.style.width=(iWidth-(iBias+twb.Button.Container.offsetWidth))+"px";
    };
    nSel.AdjustGroups=function(){
     var sc=this.Screen;
     coSocial.App.Components.Views.AdjustGroups(sc);
    };
    if (nSel.My){
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
      nSel.My.onOpenItem=function(Item){
        var nSel=Item.Owner.Owner.Owner;
        var sc=nSel.Screen;
        sc.Unit.App.Components.Views.ShowEditNetwork(sc,Item.Data);
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
        sc.Requests.Load(itm.Data);
      };
      nSel.My.onOpenPendingRequests=function(itm){
        var itms=itm.Owner;
        var nSel=itms.Owner.Owner;
        var sc=nSel.Screen;

        sc.Requests.Load(itm.Data);
        coSocial.App.Components.Views.ShowRequests(sc);
      };

    };
    if (nSel.Other){
      nSel.Other.onShow=function(gp){
        var nSel=gp.Owner;
        var sc=nSel.Screen;
        nSel.Other.State.setValue(sc.Manifest.MAP.ConnectionsState.Value);
      };
      nSel.Other.onSelectItem=function(itm){
        var itms=itm.Owner;
        var nSel=itms.Owner.Owner;
        var sc=nSel.Screen;

        nSel.AdjustGroups();
        sc.Requests.Load(null);
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
    };
    if (nSel.Group) {
      nSel.Group.onSelected=function(gp){
        var nSel=gp.Owner;
        var sc=nSel.Screen;
      };
      nSel.Group.onExpanded=function(gp){
        var nSel=gp.Owner;
        var sc=nSel.Screen;
      };
      nSel.Group.onCollapsed=function(gp){
        var nSel=gp.Owner;
        var sc=nSel.Screen;
      };
    };
    return nSel;
  }
};
