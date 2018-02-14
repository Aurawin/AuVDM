coSocial.App.Components.netJoin = {
  Version        : new Version(2013,5,18,21),
  Title          : new Title("Social Network Join","netJoin"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/netJoin.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create : function(Screen,Slides,Owner,Parent){
    var sc=Screen;
    mv=coAppUI.App.Components.MultiView.Create("Join","sldClient",sc,Slides,Owner,Parent,coAppUI.Alignment.Default);
    mv.Hidden=true;
    coSocial.App.Components.Nav.AddJoinItems(Screen,mv);
    mv.DataSet=null;
    mv.Panels=coAppUI.App.Components.Panels.Create("Network","pnlNetworkJoinPanels",sc.Frame,mv,mv.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);
    mv.Panels.Info=mv.Panels.createItem("",mv.Panels.Kind.Panels,"Network","pnlNetworkJoinPanels",coAppUI.Alignment.Top);
    mv.Panels.Info.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlNetworkJoinChildren",sc.Frame,mv.Panels.Info,mv.Panels.Info.Container,coAppUI.Alignment.Top,coAppUI.AutoSize,coAppUI.vScrollOff);
    mv.Panels.Info.Avatar=mv.Panels.Info.Panels.createItem("",mv.Panels.Kind.Image,"Avatar","pnlNetworkJoinAvatar",coAppUI.Alignment.Left);
    mv.Panels.Info.Header=mv.Panels.Info.Panels.createItem("",mv.Panels.Kind.Panels,"Header","pnlNetworkJoinChildren",coAppUI.Alignment.Top);
    mv.Panels.Info.Header.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlNetworkJoinHeaderChildren",sc.Frame,mv.Panels.Info.Header,mv.Panels.Info.Header.Container,coAppUI.Alignment.Top,coAppUI.AutoSize,coAppUI.vScrollOff);
    mv.Panels.Info.Header.Title=mv.Panels.Info.Header.Panels.createItem("",mv.Panels.Kind.Label,"Avatar","pnlNetworkJoinTitle",coAppUI.Alignment.Top);
    mv.Panels.Info.Header.Description=mv.Panels.Info.Header.Panels.createItem("",mv.Panels.Kind.Label,"Avatar","pnlNetworkJoinDescription",coAppUI.Alignment.Top);
    mv.Panels.Message=mv.Panels.createItem("",mv.Panels.Kind.Memo,"Body","pnlNetworkJoinMessage",coAppUI.Alignment.Client);
    mv.Panels.Message.Container.placeholder=coLang.Table.Apps.Social.Request.Join;
    mv.Load=function(netItem,socNet){
      var mv=this;
      mv.DataSet=socNet;
      mv.Item=netItem;
      var sURI=(socNet.MAP.AvatarID.Value!=0) ? coAvatar.URI_AVATAR.replace("$id",socNet.MAP.AvatarID.Value) : "";
      mv.Panels.Info.Avatar.Container.style.backgroundImage=(sURI.length>0)? "url("+sURI+")" : "";
      coDOM.setText(mv.Panels.Info.Header.Title.Container,socNet.MAP.Title.Value);
      coDOM.setText(mv.Panels.Info.Header.Description.Container,socNet.MAP.Description.Value);
      mv.Panels.Message.Container.value.length=0;
    };
    return mv;
  }
};
