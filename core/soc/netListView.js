coSocial.App.Components.netListView = {
  Version        : new Version(2013,11,29,4),
  Title          : new Title("Social Network ListView","netListView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/netListView.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create : function(Network,Screen,Slides,Owner,Parent,Align){
    var ns=Network;
    var lv=coAppUI.App.Components.ListView.Create("Files","ListView",Screen,Slides,Owner,Parent,Align);
    ns.Files.Displays.push(lv);
    lv.dropFiles=ns.Uploader;
    var ds=lv.DataSet=ns.Files;
    lv.Header.Columns.addItem(ds.Fields.MAP.Name);
    lv.Header.Columns.addItem(ds.Fields.MAP.Created);
    lv.Header.Columns.addItem(ds.Fields.MAP.Modified);
    lv.Header.Columns.addItem(ds.Fields.MAP.Size);
    lv.onDoubleClick=function(itm){
      var lv=this;
      var sc=lv.Screen;
      var ns=sc.Network;
      var tv=ns.Cabinet.Tree;
      var itmFile=itm.Data;
      var sFile=itmFile.MAP.Name.Value;
      var aItem=coRegistry.Items.Open(sFile,tv.Selected.Data,ns.Files,itmFile);
      if (aItem){
          // can do stuff with screen
      };
    };
    return lv;
  }
};
