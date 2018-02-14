coSocial.App.Components.netToolbar = {
  Version        : new Version(2013,5,18,27),
  Title          : new Title("Social Network Toolbar","Toolbar"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/netToolbar.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,Owner){
    var sc=Screen;
    var ns=Owner;
    var tb=coAppUI.App.Components.Toolbar.Create("tbNetworks","Toolbar",sc,ns.Slides,ns,ns.Container,coAppUI.Alignment.Top);
    tb.Mode.setValue(tb.Mode.captionRight);
    tb.setHeights(coVDM.ToolbarHeightThin,coVDM.ToolbarHeightThin);

    tb.Buttons.Networks=tb.createButton(coLang.Table.Buttons.Networks,coTheme.Icons.Social.Main);
    tb.Buttons.Networks.AllowUp=false;
    tb.Buttons.Networks.onClick=function(btn){
        var tb=btn.Owner;
        var sc=tb.Screen;
        switch (sc.ViewMode) {
          case (coSocial.vmComplete) :
            if (sc.Selector.Visible==true) {
              sc.Unit.App.Components.Views.HideNetworks(sc,btn);
              sc.Manifest.MAP.NetSelectVisible.Value=false;
              coVDM.Manifest.Save();
            } else {
              sc.Unit.App.Components.Views.ShowNetworks(sc,btn);
              sc.Manifest.MAP.NetSelectVisible.Value=true;
              coVDM.Manifest.Save();
            };
            sc.setSize();
            break;
          case (coSocial.vmSimple):
            coSocial.App.Components.Views.ShowNetworks(sc,btn);
            break;
        };
    };
    tb.Buttons.Cabinet=tb.createButton(coLang.Table.Buttons.Cabinet,coTheme.Icons.Spectrum.Folder.Cabinet);
    tb.Buttons.Cabinet.AllowUp=false;
    tb.Buttons.Cabinet.onClick=function(btn){
      var tb=btn.Owner;
      var sc=tb.Screen;
      sc.Unit.App.Components.Views.ShowCabinet(sc,btn);
    };
    tb.Buttons.Requests=tb.createButton(coLang.Table.Buttons.Requests,coTheme.Icons.None);
    tb.Buttons.Requests.AllowUp=false;
    tb.Buttons.Requests.onClick=function(btn){
      var tb=btn.Owner;
      var sc=tb.Screen;
      sc.Unit.App.Components.Views.ShowRequests(sc,btn);
    };
    return tb;
  }
};
