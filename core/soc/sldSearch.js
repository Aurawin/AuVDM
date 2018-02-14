coSocial.App.Components.sldSearch = {
  Version        : new Version(2013,5,18,19),
  Title          : new Title("Social Network Search","sldSearch"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/sldSearch.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create : function(Screen,Slides,Owner,Parent){
    var sc=Screen;
    var cs=coSocial.App.Components.netSelect.Create(
      Screen,
      Slides,
      Owner,
      Parent,
      [coSocial.NET_GROUP_RESULTS],
      coAppUI.Alignment.Client,
      coAppUI.Alignment.Top
    );
    cs.Results=coSocial.App.Components.DB.createNetworks();
    cs.Group.DataSet=cs.Results;
    cs.Results.Displays.push(cs.Group);
    cs.Request=coSocial.Requests.createItem();
    cs.Group.onCommand=function(itm){
      var cs=itm.Owner.Owner.Owner;
      cs.Join.Hidden=false;
      cs.Join.Load(itm,itm.Data)
      cs.Join.Show();
    };
    cs.ToolBar.Buttons.Search.onClick=function(TxtBtn){
      var sTerm=TxtBtn.Input.value;
      if (sTerm.length>0) {
        var qr=coSocial.App.Components.Search.qrNetworks;
        qr.Query.MAP.Term.Value=qr.Query.MAP.Term.Default+"="+sTerm;
        qr.Term=sTerm;
        qr.Query.Execute();
      };
    };
    cs.Join=coSocial.App.Components.netJoin.Create(Screen,cs.Slides,cs,cs.Container);

    return cs;
  }
};
