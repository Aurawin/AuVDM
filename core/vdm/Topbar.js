coVDM.App.Components.Topbar = {
  Version        : new Version(2014,8,15,7),
  Title          : new Title("VDM Core Topbar","Topbar"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/Topbar.js',coAppKit.PreLoaded),
  debugToConsole : true,
  VDM            : null,
  Create : function (aVDM,aParent){
    var _tb=new Object();
    _tb.Unit=this;
    _tb.Visible=false;
    _tb.Container=document.createElement('div');
    _tb.Parent=aParent;
    _tb.Parent.appendChild(_tb.Container);
    _tb.Container.style.height=aVDM.TopBarHeight+"px";
    _tb.Container.style.width="100%";
    _tb.Margin = new Margin(4,4,4,4);
    _tb.Container.className="TopBar TopBarGradient";

    _tb.Alerts = _tb.Unit.CreateAlerts(aVDM,_tb.Container);
    _tb.Clock = coVDM.App.Components.Clock.Create(aVDM,_tb.Container);
    _tb.Hide=function(){
      var tb=this;
      tb.Visible=false;
      tb.Visible=false;
      tb.Container.style.display="none";
    };
    _tb.Show=function(){
      var tb=this;
      tb.Visible=true;
      tb.Container.style.display="block";
    };
    _tb.getHeight=function(){
      var tb=this;
      return  (tb.Visible==true) ?  tb.Container.offsetHeight : 0;
    };
    return _tb;
  },
  CreateAlerts : function(aVDM,aParent){
    _tba=new Object();
    _tba.Unit=this;
    _tba.Class="Notify";
    _tba.Container=document.createElement('div');
    aParent.appendChild(_tba.Container);
    _tba.Container.className="Notify";

    _tba.Icon=document.createElement('div');
    _tba.Icon.onclick=function(){
      coVDM.VDM.Alerts.Screen.Show();
    }
    _tba.Container.appendChild(_tba.Icon);
    _tba.Icon.className="Notify-Icon";

    _tba.Number=document.createElement('div');
    _tba.Container.appendChild(_tba.Number);
    _tba.Number.className="Notify-Number";

    _tba.Container.style.width=aParent.clientWidth-coVDM.ClockWidth+"px";
    _tba.Container.style.height=aParent.clientHeight+"px";

    return _tba;
  }
};

