coContacts = {
  Version        : new Version(2014,9,18,43),
  Title          : new Title("Spectrum Contacts","Contacts"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/spc/cts/coContacts.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/spc/cts/coContacts.js',coAppKit.PreLoaded),
  Unit           : '/core/spc/cts/coContacts.js',
  NameSpace      : '/core/spc/cts',
  Screen         : null,
  debugToConsole : true,
  SMTP           : null,
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
        '/core/avatar/coAvatar.js'
      ],
      [
        '/core/spc/SMTP.js',
        this.NameSpace+'/Nav.js',
        this.NameSpace+'/DB.js',
        this.NameSpace+'/RosterView.js',
        this.NameSpace+'/Editor.js'
      ],
      this.onInitialized
    );
    this.App.onAuthorized=function(App){
      if ((App.Loaded==true) && (App.Screen.DB.Loaded==false))
        App.Screen.DB.Commands.List.reTry();
    };
    this.App.onAuthenticated=function(App){
    };
    this.App.onLogin=function(App){
      if (App.Screen.DB.Loaded==false)
        App.Screen.DB.Commands.List.reTry();
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
    App.Unit.SMTP=coSpectrum.App.Components.SMTP.Create();
    App.Screen=coSpectrum.Contacts=App.Unit.Create();
    if ((App.processAuthorized==true) && (App.Screen.DB.Loaded==false))
      App.Screen.DB.Commands.List.reTry();
    App.Screen.Conseal();
    App.Loaded=true;
  },
  createSelector:function(Screen,Owner){
    var _s=coAppUI.App.Components.ToolWindow.Create("Selector","RosterSelector",Screen,Owner);
    _s.View=this.App.Components.RosterView.Create(_s,coAppUI.App.Components.RosterView.ViewMode.Email);
    _s.Nav.Confirm.Caption[0]=coLang.Table.Labels.Everyone;
    _s.Nav.Confirm.Caption[1]=coLang.Table.Labels.Close;
    _s.Nav.Confirm.setButtonOKCaption(coLang.Table.Labels.Everyone);
    _s.Nav.Confirm.setButtonCancelCaption(coLang.Table.Labels.Close);
    _s.Nav.Confirm.onCommand[0]=function(navItem){
      var s=navItem.Nav.Screen;
      s.View.Search("");
      return false;
    };
    return _s;
  },
  Create : function(){
    var _cts=this.Screen=coSpectrum.Contacts=coAppScreens.createScreen(coVDM.VDM,"Contacts","Spectrum","Contacts","Contacts",coTheme.Icons.Spectrum.Contacts.Book);
    _cts.Unit=this;
    _cts.Position=coApp.Position.TopLeft;
    _cts.SaveGeometry=true;
    _cts.Me=null;
    _cts.AllowFullScreen=true;
    _cts.Description=coLang.Table.Apps.Spectrum.Contacts.Description;

    _cts.DB=this.App.Components.DB.Create();
    _cts.getEmail=function(ct){
      var cts=this;
      var itm=ct.MAP;
      var sName=(itm.NickName.length>0) ? itm.NickName.Value : itm.FirstName.Value+" "+itm.LastName.Value;
      var sEmail=itm.Email.Value;
      return "".concat("\"",sName,"\" <",sEmail,">");
    };
    _cts.FindByEmail=function(sEmail){
      var cts=this;
      var sEmail=cts.Unit.SMTP.AddressFromEmail(sEmail);
      var ct=null;
      for (var iLcv=0; iLcv<cts.DB.Items.length; iLcv++){
        var ctLcv=cts.DB.Items[iLcv];
        var sEmail1=ctLcv.getValue(cts.DB.Fields.MAP.Email).toLowerCase();
        var sEmail2=ctLcv.getValue(cts.DB.Fields.MAP.Email2).toLowerCase();
        var sEmail3=ctLcv.getValue(cts.DB.Fields.MAP.Email3).toLowerCase();
        if ( (sEmail1==sEmail) || (sEmail2==sEmail) || (sEmail3==sEmail) )
          return ctLcv;
      };
      return null;
    };
    _cts.DisplayName=function(ct){
      return (ct.MAP.NickName.Value.length>0) ? ct.MAP.NickName.Value : ct.MAP.FirstName.Value+" "+ct.MAP.LastName.Value;
    };
    var lv=_cts.ListView=coAppUI.App.Components.ListView.Create("Contacts","ListView",_cts,_cts.Slides,_cts.Frame,_cts.Frame.Client,coAppUI.Alignment.Client);
    lv.DataSet=_cts.DB;
    _cts.DB.Displays.Add(lv);
    lv.onDoubleClick=function(itm){
      var cts=_cts;
      var edt=cts.Nav.gpEdit.Slide;
      if (itm!=null) {
        var li=cts.ListView.Items.Selected;
        if (li.Data!=null) edt.Load(li.Data);
        cts.Nav.forceSelected(cts.Nav.gpEdit);
      };
    };
    lv.Header.Columns.addItem(_cts.DB.Fields.MAP.FirstName);
    lv.Header.Columns.addItem(_cts.DB.Fields.MAP.MiddleName);
    lv.Header.Columns.addItem(_cts.DB.Fields.MAP.LastName);
    lv.Header.Columns.addItem(_cts.DB.Fields.MAP.Email);
    lv.Header.Columns.addItem(_cts.DB.Fields.MAP.Phone);
    lv.Header.Columns.addItem(_cts.DB.Fields.MAP.Address);
    lv.Header.Columns.addItem(_cts.DB.Fields.MAP.City);
    lv.Header.Columns.addItem(_cts.DB.Fields.MAP.State);
    lv.Header.Columns.addItem(_cts.DB.Fields.MAP.Post);

    _cts.Nav=this.App.Components.Nav.Create(_cts);

    _cts.Clear=function(){
      _cts.DB.Items.Clear();
      _cts.Nav.gpOptions.Slide.Clear();
    };

    _cts.onShow=function(){
      var cts=_cts;
      if (cts.Nav.Active==cts.Nav.gpNew){
        var edt=_cts.Nav.gpNew.Slide;
        edt.Panels.setVisibility(true);
      };
      cts.ListView.Items.SyncView();
    };
    _cts.onHide=function(){
      var cts=_cts;
    };
    _cts.onFree=function(){
      var cts=_cts;
      cts.DB.Commands.Free();
      cts.DB.Free();
      cts.Commands.Free();
      cts.Nav.gpOptions.Slide.Free();
      cts.Nav.Free();
      _cts=coUtils.Release(cts);
    };
    return _cts;
  }
};
coContacts.init();

