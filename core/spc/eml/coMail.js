var coMail=coSpectrum.App.Components.Mail = {
  Version        : new Version(2014,9,24,62),
  Title          : new Title("Aurawin Spectrum Mail","Mail"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/spc/eml/coMail.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/spc/eml/coMail.js',coAppKit.PreLoaded),
  Unit           : '/core/spc/eml/coMail.js',
  NameSpace      : '/core/spc/eml',
  debugToConsole : true,
  SMTP           : null,
  Screen         : null,
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
        '/core/spc/cts/coContacts.js'
      ],
      [
        '/core/spc/eml/DB.js',
        '/core/spc/eml/ListView.js',
        '/core/spc/eml/Manifest.js',
        '/core/spc/eml/Nav.js',
        '/core/spc/eml/Reader.js',
        '/core/spc/eml/TabsBar.js',
        '/core/spc/eml/ThreadView.js',
        '/core/spc/eml/Toolbars.js',
        '/core/spc/eml/TreeView.js',
        '/core/spc/eml/Uploader.js',
        '/core/spc/eml/Writers.js'
      ],
      this.onInitialized
    );
    this.App.onLogout=function(App){
      if (App.Screen)
        App.Screen.tmrRefresh.setActive(false);
    };
    this.App.onLogin=function(App){
      if (App.Screen) {
        App.Screen.tmrRefresh.setActive(true);
        App.Screen.DB.Commands.ListFolders();
      } else {
        App.processLoggedIn=false;
      };
    };
    this.App.Unit=this;
    this.App.Initialized=true;
    return this;
  },
  onInitialized : function(App){
    App.Unit.SMTP=coSpectrum.App.Components.SMTP.Create();
    var _mbx=App.Screen=coSpectrum.Mailbox=coSpectrum.App.Components.Mail.Create();
    _mbx.DB=App.Components.DB.Create(_mbx);
    _mbx.Folders=App.Components.TreeView.Create(_mbx,_mbx.Slides,_mbx,_mbx.Frame.Client,coAppUI.Alignment.Left);
    _mbx.Splitter=coAppUI.App.Components.Splitter.Create(_mbx,_mbx.Slides,_mbx,_mbx.Frame.Client,coAppUI.Alignment.Left);
    _mbx.Main=_mbx.Slides.createSlide("Main",_mbx.Class+"Main",_mbx,_mbx,_mbx.Frame.Client,coAppUI.Alignment.Client);
    App.Components.Manifest.Create(_mbx);
    _mbx.Splitter.onSized=function(){
      var mbx=this.Screen;
      var mfst=coVDM.Manifest;
      mfst.MailboxFolders.MAP.Width.Value=mbx.Folders.Container.clientWidth;
      mfst.Save();
    };
    _mbx.Tabsbar=App.Components.TabsBar.Create(_mbx);
    _mbx.tbMain=App.Components.Toolbars.createMainToolbar(_mbx);
    _mbx.tbAttach=App.Components.Toolbars.createAttachToolbar(_mbx);
    _mbx.Uploader=App.Components.Uploader.Create(_mbx);
    _mbx.createUploader=App.Components.Uploader.Create(_mbx);

    _mbx.Views=new Object();
    _mbx.Views.Inbox=App.Components.ThreadView.CreateFolderView(_mbx,null);
    _mbx.Views.Outbox=App.Components.ThreadView.CreateFolderView(_mbx,null);
    _mbx.Views.Outbox.Conseal();

    coMail.App.Components.TabsBar.initInbox(_mbx);
    coMail.App.Components.TabsBar.initOutbox(_mbx);


    _mbx.Splitter.targetLeft=_mbx.Folders;
    _mbx.Splitter.targetRight=_mbx.Main;
    _mbx.Splitter.onSized=function(){
      var mbx=this.Owner;
      var mfst=coVDM.Manifest;
      mfst.MailboxFolders.MAP.Width.Value=mbx.Folders.Container.clientWidth;
      mfst.Save();
    };
    _mbx.Nav=App.Components.Nav.Create(_mbx);

    App.Loaded=true;
  },
  Create : function(){
    var _mbx=this.Screen=coAppScreens.createScreen(
      coVDM.VDM,
      "MailBox",
      "Spectrum",
      coLang.Table.Mail.Name,
      coLang.Table.Mail.Title,
      coTheme.Icons.Spectrum.Mail.Inbox.Empty
    );
    _mbx.Unit=this;
    _mbx.SaveGeometry=true;
    _mbx.Position=coApp.Position.TopLeft;
    _mbx.Description=coLang.Table.Apps.Spectrum.Inbox.Description;
    _mbx.AllowFullScreen=true;
    _mbx.onManifestUpdated=function(){};


    _mbx.Writers=new Array();
    _mbx.Writers.Find=function(iID){
      var list=this;
      for (var iLcv=0; iLcv<list.length; iLcv++){
        var cmp=list[iLcv];
        if (cmp.DataSet.MAP.ID.Value==iID)
          return cmp;
      };
      return null;
    };
    _mbx.Readers=new Array();
    _mbx.Readers.Find=function(iID){
      var list=this;
      for (var iLcv=0; iLcv<list.length; iLcv++){
        var rdr=list[iLcv];
        if (rdr.DataSet.MAP.ID.Value==iID)
          return rdr;
      };
      return null;
    };
    _mbx.UpdateStatus=function(){
        var mbx=this;
        var tv=mbx.Folders;
        var vw=mbx.Views.Inbox;
        var status=mbx.DB.Folders.Mail.Inbox.MAP.Status.Value;
        var iUnread=status.MAP.Unread.Value;
        var iTotal=status.MAP.Total.Value;
        var sCaption=(iUnread==0)? coLang.Table.Mail.Inbox : coLang.Table.Mail.Inbox+ " ("+iUnread+")";
        mbx.Frame.setCaption(sCaption);
        var sStatus=coLang.Table.Apps.Spectrum.Inbox.Status.Mailbox;
        sStatus=sStatus.replace("$unread",iUnread);
        sStatus=sStatus.replace("$total",iTotal);
        mbx.setStatus(sStatus);
        mbx.Icon=coTheme.Icons.Spectrum.Mail.Inbox.get(iUnread>0);
        mbx.iconIndicator=iUnread;
        if (mbx.Folders.Mail){
          mbx.Folders.Mail.Inbox.setIndicatorIcon(mbx.Icon);
          mbx.Tabsbar.Tabs.Inbox.setIcon(mbx.Icon);
        };
    };
    _mbx._doShowEnvelope=function(){
      var mbx=this;
      var cmp=mbx.Nav.gpWriter.Slide;
      mbx.Nav.gpWriterEnv.btnTo.setChecked(cmp.Panels.Headers.To.Visible);
      mbx.Nav.gpWriterEnv.btnSubject.setChecked(cmp.Panels.Headers.Subject.Visible);
      mbx.Nav.gpWriterEnv.btnCC.setChecked(cmp.Panels.Headers.CC.Visible);
      mbx.Nav.gpWriterEnv.btnBCC.setChecked(cmp.Panels.Headers.BCC.Visible);
    };
    _mbx.setWriterSlides=function(value){
      var mbx=this;
      mbx.Nav.gpWriter.Slide=value;
      mbx.Nav.gpWriterOptions.Slide=value;
      mbx.Nav.gpWriterSigs.Slide=value;
    };

    _mbx.tmrRefresh=coSpectrum.Timers.createItem(coSpectrum.mailRefresh);
    _mbx.tmrRefresh.Owner=_mbx;
    _mbx.tmrRefresh.onExecute=function(){
      var tmr=this;
      var mbx=tmr.Owner;
      mbx.DB.Commands.RecordCount(mbx.DB.Folders.Mail.Inbox);
    };

    _mbx.doShow=function(){
      var mbx=this;
      var mfst=coVDM.Manifest;
      mbx.Folders.Container.style.width=mfst.MailboxFolders.MAP.Width.Value+"px";
      mbx.Folders.Synchronize();
      coSignatures.App.Screen.setNavCombo(mbx.Nav.gpWriterSigs.cmboSigs);
      var navItem=(mbx.Nav.Selected) ? mbx.Nav.Selected : mbx.Nav.gpInbox;
      mbx.Tabsbar.Tabs.Inbox.Select(coAppUI.ForceSelection);
    };
    _mbx.doHide=function(){
      var mbx=this;
    };

    return _mbx;
  }
};
coSpectrum.App.Components.Mail.init();
