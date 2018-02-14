coVDM.App.Components.coMessagebox = {
  Version        : new Version(2014,9,18,13),
  Title          : new Title("VDM Core Messagebox","Messagebox"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/vdm/coMessagebox.js',
  debugToConsole : true,
  VDM            : null,
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
      coAppKit.NoDependencies,
      this.onInitialized
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.App.Initialized=true;
    return this;
  },
  onInitialized:function(App){
    App.Unit.VDM.MessageBox=App.Unit.Create(App.Unit.VDM);
    App.Loaded=true;
  },
  Create:function(aVDM, Kind, sTitle,sMessage,onClose){
    var _mb=coAppScreens.createScreen(aVDM,"msgBox","System","Message Box","Application Messagebox","/core/vdm/imgs/icns/mb/ok.png");
    _mb.Unit=this;
    _mb.iconInApplications=false;
    _mb.iconInTaskList=false;

    if (Kind==undefined) Kind=0;
    if (sTitle==undefined) sTitle="";
    if (sMessage==undefined) sMessage="";
    if (onClose==undefined) onClose=null;
    _mb.Frame.zIndexFactor=coVDM.zFactorMessageBox;
    _mb.AllowFullScreen=true;

    _mb._doClose=onClose;
    _mb.onHide=function(){
      _mb.VDM.coverOff();
      _mb.hideButton(_mb.Ok);
      _mb.hideButton(_mb.Cancel);
      _mb.hideButton(_mb.Yes);
      _mb.hideButton(_mb.No);
    };
    _mb.Execute=function(Kind,sTitle,sMessage,onClose){
      if (Kind==undefined) Kind=0;
      if (sTitle==undefined) sTitle="";
      if (sMessage==undefined) sMessage="";
      if (onClose==undefined) onClose=null;
      _mb.VDM.coverOn();
      coDOM.setText(_mb.Title.Container,sTitle);
      _mb.Message.Container.value=sMessage;
      _mb.onClose=onClose;
      _mb.Kind.setValue(Kind);
      _mb.Reveal();
    };
    _mb._createKind=function(Value){
      if (Value==undefined) Value=0;
      var k=this;
      k.Index=Value;
      k.Ok=0;
      k.OkCancel=1;
      k.YesNo=2;
      k.YesNoCancel=3;
      k.setValue=function(Value){
        k.Value=Value;
        switch (k.Value) {
          case k.Ok          : _mb._createOk(); break;
          case k.OkCancel    : _mb._createOkCancel(); break;
          case k.YesNo       : _mb._createYesNo(); break;
          case k.YesNoCancel : _mb._createYesNoCancel(); break;
        };
      };
      return k;
    };
    _mb._createResult=function(Value){
      if (Value==undefined) Value=0;
      var r=this;
      r.Index=Value;
      r.Ok=0;
      r.Cancel=1;
      r.Yes=2;
      r.No=3;
      return r;
    };
    _mb.doOkClick=function(e){
      _mb.Result.Index=_mb.Result.Ok;
      e.cancelBubble=true;
      e.returnValue=true;
      e.preventDefault();
      _mb.Conseal();
      if (_mb.onClose) _mb.onClose(_mb);
      return true;
    };
    _mb.doYesClick=function(e){
      _mb.Result.Index=_mb.Result.Yes;
      e.cancelBubble=true;
      e.returnValue=true;
      e.preventDefault();
      _mb.Conseal();
      if (_mb.onClose) _mb.onClose(_mb);
      return true;
    };
    _mb.doNoClick=function(e){
      _mb.Result.Index=_mb.Result.No;
      e.cancelBubble=true;
      e.returnValue=true;
      e.preventDefault();
      _mb.Conseal();
      return true;
    };
    _mb.doCancelClick=function(e){
      _mb.Result.Index=_mb.Result.Cancel;
      e.cancelBubble=true;
      e.returnValue=true;
      e.preventDefault();
      _mb.Conseal();
      return true;
    };
    _mb.Result=new _mb._createResult(-1);
    _mb.Kind=new _mb._createKind(Kind);
    _mb.Panels=coAppUI.App.Components.Panels.Create("Client","msgBoxClient",_mb.Frame,_mb,_mb.Frame.Client,coAppUI.Alignment.Client,coAppUI.Autosize,coAppUI.vScrollOff);
    _mb.Header=_mb.Panels.createItem("",_mb.Panels.Kind.Panels,"Header","msgBoxHeader",coAppUI.Alignment.Top);
    _mb.Header.Panels=coAppUI.App.Components.Panels.Create("pnlsHeader","msgBoxHeaderPanels",_mb.Frame,_mb.Header,_mb.Header.Container,coAppUI.Alignment.Client,coAppUI.Autosize,coAppUI.vScrollOff);
    _mb.Icon=_mb.Header.Panels.createItem("",_mb.Header.Panels.Kind.Image,"Image","msgBoxImage",coAppUI.Alignment.Left);
    _mb.Title=_mb.Header.Panels.createItem(sTitle,_mb.Header.Panels.Kind.Blank,"Title","msgBoxTitle",coAppUI.Alignment.Client);
    _mb.Message=_mb.Panels.createItem(sMessage,_mb.Panels.Kind.Blank,"Message","msgBoxMessage",coAppUI.Alignment.Client);
    _mb.Message.Container.readOnly=true;
    _mb.Footer=_mb.Panels.createItem("",_mb.Panels.Kind.Panels,"Footer","msgBoxFooter",coAppUI.Alignment.Bottom);
    _mb.Footer.Panels=coAppUI.App.Components.Panels.Create("Commands","msgBoxCommands",_mb.Frame,_mb.Footer,_mb.Footer.Container,coAppUI.Alignment.Center,coAppUI.Autosize,coAppUI.vScrollOff);
    _mb.Ok=null;
    _mb.Cancel=null;
    _mb.Yes=null;
    _mb.No=null;
    _mb.hideButton=function(btn){
      if (btn!=null) {
        btn.Hidden=true;
        btn.setVisibility(false);
      };
    };
    _mb.showButton=function(btn){
      if (btn!=null) {
        btn.Hidden=false;
        btn.setVisibility(true);
      };
    };
    _mb._createOk=function(){
      if (!_mb.Ok){
        _mb.Ok=_mb.Footer.Panels.createItem(coLang.Table.Buttons.Ok,_mb.Panels.Kind.Blank,"Ok","btnOk",coAppUI.Alignment.Left);
        _mb.Ok.Container.onclick=_mb.doOkClick;
      } else {
        _mb.showButton(_mb.Ok);
      };
      _mb.hideButton(_mb.Cancel);
      _mb.hideButton(_mb.Yes);
      _mb.hideButton(_mb.No);
    };
    _mb._createOkCancel=function(){
      if (!_mb.Ok){
        _mb.Ok=_mb.Footer.Panels.createItem(coLang.Table.Buttons.Ok,_mb.Panels.Kind.Blank,"Ok","btnOk",coAppUI.Alignment.Left);
        _mb.Ok.Container.onclick=_mb.doOkClick;
      } else {
        _mb.showButton(_mb.Ok);
      };
      if (!_mb.Cancel){
        _mb.Cancel=_mb.Footer.Panels.createItem(coLang.Table.Buttons.Cancel,_mb.Panels.Kind.Blank,"Cancel","btnCancel",coAppUI.Alignment.Left);
        _mb.Cancel.Container.onclick=_mb.doCancelClick;
      } else {
        _mb.hideButton(_mb.Cancel);
      };
      _mb.hideButton(_mb.Yes);
      _mb.hideButton(_mb.No);
    };
    _mb._createYesNo=function(){
      if (! _mb.Yes){
        _mb.Yes=_mb.Footer.Panels.createItem(coLang.Table.Buttons.Yes,_mb.Panels.Kind.Blank,"Ok","btnYes",coAppUI.Alignment.Left);
        _mb.Yes.Container.onclick=_mb.doYesClick;
      };
      if (!_mb.No){
        _mb.No=_mb.Footer.Panels.createItem(coLang.Table.Buttons.No,_mb.Panels.Kind.Blank,"Cancel","btnNo",coAppUI.Alignment.Left);
        _mb.No.Container.onclick=_mb.doNoClick;
      };
      _mb.hideButton(_mb.Ok);
      _mb.hideButton(_mb.Cancel);
    };
    _mb._createYesNoCancel=function(){
      if (!_mb.Yes){
        _mb.Yes=_mb.Footer.Panels.createItem(coLang.Buttons.Yes,_mb.Panels.Kind.Blank,"Ok","btnYes",coAppUI.Alignment.Left);
        _mb.Yes.Container.onclick=_mb.doYesClick;
      };
      if (!_mb.No){
        _mb.No=_mb.Footer.Panels.createItem(coLang.Buttons.No,_mb.Panels.Kind.Blank,"Cancel","btnNo",coAppUI.Alignment.Left);
        _mb.No.Container.onclick=_mb.doNoClick;
      };
      if (!_mb.Cancel){
        _mb.Cancel=_mb.Footer.Panels.createItem(coLang.Buttons.Cancel,_mb.Panels.Kind.Blank,"Cancel","btnCancel",coAppUI.Alignment.Left);
        _mb.Cancel.Container.onclick=_mb.doCancelClick;
      };
      _mb.hideButton(_mb.Ok);
    };
    _mb.Conseal();

    return _mb;
  }
};
coVDM.App.Components.coMessagebox.init(coVDM.VDM);
