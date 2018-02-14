coVDM.App.Components.coEnticement.App.Components.Elements = {
  Version        : new Version(2012,11,20,7),
  Title          : new Title("Enticement Elements","Elements"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  debugToConsole : true,
  esNormal       : 230,
  Create : function(Screen){
    var sc=Screen;
    sc.Elements=coAppUI.App.Components.Elements.Create(
      "Elements",
      "EnticementElements",
      sc,
      sc.Slides,
      sc.Frame,
      sc.Frame.Client,
      coAppUI.Alignment.Client
    );
    sc.Elements.setElementSpan(this.esNormal);
    sc.Elements.Welcome=sc.Elements.Items.Add(coAppUI.App.Components.Elements.Kind.Single);
    sc.Elements.Uses=sc.Elements.Items.Add(coAppUI.App.Components.Elements.Kind.Tripple);
    sc.Elements.Kinds=sc.Elements.Items.Add(coAppUI.App.Components.Elements.Kind.Tripple);

    sc.Elements.Welcome.Container.style.backgroundImage="url("+coVDM.App.Components.coEnticement.imgLogo+")";

    sc.Elements.Uses.subItems[0].Container.style.backgroundImage="url("+coVDM.App.Components.coEnticement.imgSharing+")";
    sc.Elements.Uses.subItems[1].Container.style.backgroundImage="url("+coVDM.App.Components.coEnticement.imgCollaborate+")";
    sc.Elements.Uses.subItems[2].Container.style.backgroundImage="url("+coVDM.App.Components.coEnticement.imgFun+")";

    sc.Elements.Kinds.subItems[0].Container.style.backgroundImage="url("+coVDM.App.Components.coEnticement.imgFriends+")";
    sc.Elements.Kinds.subItems[1].Container.style.backgroundImage="url("+coVDM.App.Components.coEnticement.imgLovedOnes+")";
    sc.Elements.Kinds.subItems[2].Container.style.backgroundImage="url("+coVDM.App.Components.coEnticement.imgFamily+")";
    return sc.Elements;
  }
};

