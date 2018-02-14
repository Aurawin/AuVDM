coMusic.App.Components.Inspector = {
  Version          : new Version(2013,5,18,12),
  Title            : new Title("Music File Inspector","Inspector"),
  Vendor           : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Inspector.js',coAppKit.PreLoaded),
  debugToConsole   : true,
  DefaultHeight    : 150,
  MaxInspect       : 10,
  CheckDelay       : 1500,
  Create : function(Screen,Slides,Owner,Parent,Align){
    var lv=coAppUI.App.Components.ListView.Create("Inspector","ListView",Screen,Slides,Owner,Parent,Align);
    Screen.DB.Inspector.Displays.push(lv);
    var ds=lv.DataSet=Screen.DB.Inspector;
    lv.Imports=new Array();
    lv._onShow=lv.onShow;
    lv.onDoubleClick=function(itm){
      var lv=this;
      var sc=lv.Screen;
    };
    lv.onShow=function(){
      var lv=this;
      lv.Container.style.height=lv.Screen.Manifest.MAP.InspectorHeight.Value+"px";
      lv._onShow();
    };
    var col=lv.Header.Columns.addItem(ds.Fields.MAP.Name);
    coDOM.setText(col.Container,coLang.Table.Apps.Music.Inspecting);

    return lv;
  }
};

