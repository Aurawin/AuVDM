coVDM.App.Components.Display = {
  Version         : new Version(2013,5,18,14),
  Title           : new Title("VDM Core Display","Display"),
  Vendor          : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header          : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/Display.js',coAppKit.PreLoaded),
  debugToConsole  : true,
  VDM             : null,
  thresholdSmallW : 640,
  thresholdSmallH : 480,
  Create:function (vdm){
    var _d=coObject.Create();
    _d.Unit=this;
    _d.Class="Display";
    _d.VDM=vdm;
    _d.Orientation = coVDM.Orientation;
    _d.Small=false;
    _d.Update=function(){
      var d=this;
      d.Height = window.innerHeight;
      d.Width = window.innerWidth;
      d.Small= ( (d.Width<=d.Unit.thresholdSmallW) || (d.Height<=d.Unit.thresholdSmallH));
    };
    _d.Update();
    return _d;
  }
};
