coSocial.App.Components.Search = {
  Version        : new Version(2013,5,18,4),
  Title          : new Title("Social Search","Search"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/Search.js',coAppKit.PreLoaded),
  debugToConsole : true,

  ttlList        : 1200,
  ttlSearch      : 1200,

  LoadQuick      : 250,
  LoadPause      : 1000,
  LoadChunk      : 50,
  LoadDelay      : 1500,

  qrNetworks     : null,


  NameSpace      : "/core/soc",
  NS_NETWORKS    : "/n/s",
  ST_FIELDS      : "f",

  Commands       : null,
  Screen         : null,

  Init : function(Screen){
    this.Screen=Screen;
    this.Commands=coNet.createCommands(coVDM.VDM.Net);

    this.qrNetworks=coSearch.createQR(this,this.Commands,coSearch.autoDiscoveryOff);
    this.qrNetworks.setProvider(this.NameSpace,this.NS_NETWORKS);
    this.qrNetworks.setQuery(this.NameSpace,this.NS_NETWORKS,this.ST_FIELDS,this.ttlSearch);
    this.qrNetworks.Query.onExecute=function(){
      var sc=coSocial.App.Screen;
      sc.Search.Group.Items.Clear();
    };
    this.qrNetworks.Results.onLoaded=function() {
      var qr=this.Owner;
      var sc=qr.Owner.Screen;

      var xDoc=coXML.Parser.Parse(coXML.Header+qr.Results.MAP.ResultsAsXML.Value);
      var xItem=xDoc.documentElement;

      sc.Search.Results.fromXML(xDoc,xItem);
    };
  }
};
