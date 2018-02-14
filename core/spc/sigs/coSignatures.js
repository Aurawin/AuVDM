coSignatures= {
  Version        : new Version(2014,8,12,29),
  Title          : new Title("Spectrum Signatures","Signatures"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSpectrum.App,'/core/spc/sigs/coSignatures.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/spc/sigs/coSignatures.js',coAppKit.PreLoaded),
  Unit           : '/core/spc/sigs/coSignatures.js',
  NameSpace      : '/core/spc/sigs',

  debugToConsole : true,

  init : function(){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js',
        '/core/vdm/coConsole.js'
      ],
      [
        this.NameSpace+'/Nav.js',
        this.NameSpace+'/DB.js'
      ],
      this.onInitialized
    );
    this.App.onAuthorized=function(App){
    };
    this.App.onAuthenticated=function(App){
    };
    this.App.onLogin=function(App){
    };
    this.App.onLogout=function(App){
    };
    this.App.Unit=this;
    this.App.Initialized=true;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    return this;
  },
  onInitialized : function(App){
    App.Screen=App.Unit.Create(App);
    App.Screen.Conseal();
    App.Loaded=true;
  },

  Create : function(App){
    var _sigs=coAppScreens.createScreen(coVDM.VDM,"SpectrumSignatures","Spectrum","Signatures","Spectrum Signatures","/core/spc/imgs/sigs.png");
    _sigs.Unit=this;
    _sigs.SaveGeometry=true;
    _sigs.Description=coLang.Table.Apps.Spectrum.Signatures.Description;
    _sigs.AllowFullScreen=true;
    _sigs.Position=coApp.Position.TopLeft;

    _sigs.DB=App.Components.DB.Create(_sigs);

    _sigs.getSignatureById=function(id){
      var sigs=_sigs;
      for (var iLcv=0; iLcv<sigs.DB.Items.length; iLcv++){
        var itm=sigs.DB.Items[iLcv];
        if (itm.getValue(sigs.DB.Fields.ID)==id){
          return itm.getValue(sigs.DB.Fields.Data);
        };
      };
      return "";
    };
    _sigs.setNavCombo=function(navCombo){
      var sigs=_sigs;
      navCombo.Control.options.length=0;
      for (var iLcv=0; iLcv<sigs.DB.Items.length; iLcv++){
        var itm=sigs.DB.Items[iLcv];
        navCombo.addOption(itm.getValue(sigs.DB.Fields.Title),itm.getValue(sigs.DB.Fields.ID));
      };
    };

    _sigs.ListView=coAppUI.App.Components.ListView.Create("Signatures","ListView",_sigs,_sigs.Slides,_sigs.Frame,_sigs.Frame.Client,coAppUI.Alignment.Client);
    _sigs.ListView.DataSet=_sigs.DB;
    _sigs.ListView.Header.Columns.addItem(_sigs.DB.Fields.Title);
    _sigs.ListView.onDoubleClick=function(itm){
      var sigs=_sigs;
      if (itm!=null) {
        sigs.Nav.gpEdit.Data=itm.Data;
        sigs.Editor.Panels.setRecord(itm.Data,coAppUI.ShowTorus);
        sigs.Editor.Panels.resetValues();
        sigs.Nav.setSelected(sigs.Nav.gpEdit);
      };
    };

    _sigs.Editor=_sigs.Slides.createSlide("Signature Editor","sldClient",_sigs,_sigs.Frame,_sigs.Frame.Client,coAppUI.Alignment.Client);
    _sigs.Editor.Panels=coAppUI.App.Components.Panels.Create("Editor","pnlClient",_sigs.Frame,_sigs.Editor,_sigs.Editor.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);

    _sigs.Editor.Panels.Fields=_sigs.Editor.Panels.createItem("",_sigs.Editor.Panels.Kind.Panels,"Fields","pnlFields",coAppUI.Alignment.Top);
    _sigs.Editor.Panels.Fields.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollection",_sigs.Frame,_sigs.Editor.Panels.Fields,_sigs.Editor.Panels.Fields.Container,coAppUI.Alignment.Top,coAppUI.AutoSize,coAppUI.vScrollOff);
    _sigs.Editor.Panels.Fields.Name=_sigs.Editor.Panels.Fields.Panels.createLabeledText(coLang.Table.Labels.Title,"Name","pnlField");
    _sigs.Editor.Panels.Fields.Name.DB.DataSet=_sigs.DB;
    _sigs.Editor.Panels.Fields.Name.DB.Field=_sigs.DB.Fields.Title;

    _sigs.Editor.Panels.Body=_sigs.Editor.Panels.createMemo("SIG","pnlMemo",coAppUI.Alignment.Client);
    _sigs.Editor.Panels.Body.DB.DataSet=_sigs.DB;
    _sigs.Editor.Panels.Body.DB.Field=_sigs.DB.Fields.Data;

    _sigs.Nav=App.Components.Nav.Create(_sigs);

    _sigs.onShow=function(){
    };
    _sigs.onHide=function(){
    };
    _sigs.Conseal();
    return _sigs;
  }
};
coSignatures.init();
