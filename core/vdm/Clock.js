coVDM.App.Components.Clock = {
  Version        : new Version(2012,5,18,5),
  Title          : new Title("VDM Core Clock","Clock"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/Clock.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(aVDM,aParent){
    var _clk=new coObject.Create();
    _clk.Unit=this;
    _clk.VDM=aVDM;
    _clk.Class="TrayClock";
    _clk.Timer=null;
    _clk.Parent=aParent;
    _clk.Container=document.createElement('div');
    _clk.Parent.appendChild(_clk.Container);
    _clk.Container.className=_clk.Class;
    _clk.Timer=coApp.Timers.createItem(coVDM.clockRefreshMS);
    _clk.Timer.RunOnce=false;
    _clk.Timer.onExecute=function(){
      clk=_clk;
      if (clk.VDM.Loading==true) return 0;
      var dt=new Date();
      coDOM.setText(clk.Container,dt.toLocaleString());
    };
    return _clk;
  }
};
