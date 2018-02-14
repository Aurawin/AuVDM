coVDM.App.Components.coAlerts = {
  Version        : new Version(2013,2,3,14),
  Title          : new Title("VDM Core Alerts","Alerts"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/vdm/alerts/coAlerts.js',
  VDM            : null,
  debugToConsole : true,
  init           : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js'
      ],
      [
        '/core/vdm/alerts/coAlerts.css'
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.App.Initialized=true;
    return this;
  },
  onInitialized:function(App){
    App.Unit.VDM.Alerts=App.Unit.Create(App.Unit.VDM);
    App.Screen=App.Unit.VDM.Alerts.Screen;
    App.Screen.Conseal();
    App.Loaded=true;
  },
  Create:function(aVDM){
    var _a=new Object();
    _a.Unit=this;
    _a.Index=-1;
    _a.VDM=aVDM;
    _a.Screen = _a.Unit.createScreen(aVDM,_a);
    _a.List = new Array();
    _a.Update=function(){
      var a=this;
      var sValue=""+a.List.length;
      coDOM.setHTML(a.VDM.TopBar.Alerts.Number,sValue);
      a.VDM.TopBar.Alerts.Number.style.width=17*sValue.length+"px";
    };
    _a.Clear=function(){
      var a=this;
      a.length=0;
      a.Update();
    };
    _a.Add=function(sTitle,sMessage){
      var Alerts=this;
      var a=new Object();
      a.Title=sTitle;
      a.Message=sMessage;
      a.dtStamp= new Date();
      Alerts.List.push(a);
      Alerts.Update();
      return a;
    };
    return _a;
  },
  createScreen:function(aVDM,Alerts){
    var _as=coAppScreens.createScreen(aVDM,"AlrtFrm","System","Alerts","Aurawin Notifications");
    _as.Unit=this;
    _as.Position=coApp.Position.Center;
    _as.State=coApp.State.Normal;
    _as.Alerts=Alerts;
    _as.Description=coLang.Table.Apps.Alerts.Description;

    _as.Caption=document.createElement('div');
    _as.Date=document.createElement('div');
    _as.Message=document.createElement('div');
    _as.Message.Margin=new Margin(60,14,20,60);

    _as.Frame.Client.appendChild(_as.Caption);
    _as.Frame.Client.appendChild(_as.Date);
    _as.Frame.Client.appendChild(_as.Message);

    _as.Caption.className="AlrtFrmMsgCaption";
    _as.Date.className="AlrtFrmMsgDate";
    _as.Message.className="AlrtFrmMsgBody";
    _as.Message.blockScroll=false;

    _as.NavBar=coApp.createNavigationBar(
      "AlrtFrmNavBar",
      _as.Frame.Client,
      _as,
      _as.OnFirstAlert,
      _as.OnLastAlert,
      _as.OnNextAlert,
      _as.OnPreviousAlert,
      _as.OnDeleteAlert
    );
    _as.onResize=function(){
      var as=this;
      if (as.Visible!=true) return;
      as.NavBar.setSize(as.NavBar);
      as.Message.style.top=as.Message.Margin.Top+"px";
      as.Message.style.left=as.Message.Margin.Left+"px";
      as.Message.style.width=as.Frame.Client.clientWidth-as.Message.Margin.Left-as.Message.Margin.Right+"px";
      as.Message.style.height=as.Frame.Client.clientHeight-as.Message.Margin.Top-as.Message.Margin.Top+"px";
    };
    _as.Display=function(){
      var as=this;
      coDOM.setText(as.Caption,"");
      coDOM.setText(as.Date,"");
      coDOM.setText(as.Message,"");
      if ( (as.Alerts.Index!=-1) && (as.Alerts.Index<as.Alerts.List.length) ) {
        var  Alert=as.Alerts.List[as.Alerts.Index];
        coDOM.setHTML(as.Caption,Alert.Title);
        coDOM.setHTML(as.Date,Alert.dtStamp);
        coDOM.setHTML(as.Message,Alert.Message);
      };
    };
    _as.onShow=function(){
      var as=_as;
      if ( (as.Alerts.Index==-1) && (as.Alerts.List.length>0) ) as.Alerts.Index=0;
      as.Display();
    };
    _as.onHide=function(){
       var as=_as;
    };
    _as.OnNextAlert=function(){
      // coVDM.Alerts.Screen.NavBar
      var as=_as;
      as.Alerts.Index++;
      if (as.Alerts.List.length>0){
        if (as.Alerts.Index>=as.Alerts.List.length) as.Alerts.Index=0;
      } else {
        as.Alerts.Index=-1;
      }
      as.Display();
    };
    _as.OnPreviousAlert=function(){
    };
    _as.OnFirstAlert=function(){
      var as=_as;
      if (as.List.length>0){
        as.Alerts.Index=0;
      } else {
        as.Alerts.Index=-1;
      }
    };
    _as.OnLastAlert=function(){
      // coVDM.Alerts.Screen.NavBar
    };
    _as.OnDeleteAlert=function(){
      var as=_as;
      if (as.Alerts.List.length==0) {
        as.Hide();
      };
    };
    return _as;
  }

};
coVDM.App.Components.coAlerts.init(coVDM.VDM);
