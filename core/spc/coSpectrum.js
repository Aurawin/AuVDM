/*
unit /core/spectrum/code.js

This unit provides front-end for spectrum Contacts, Tasks, etc.

*/

var coSpectrum = {
  Version        : new Version(2014,9,8,533),
  Title          : new Title("Aurawin Spectrum","coSpectrum"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/spc/coSpectrum.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/spc/coSpectrum.js',coAppKit.PreLoaded),
  Unit           : '/core/spc/coSpectrum.js',
  cssMailReader  : '/core/spc/eml/Reader.css',
  debugToConsole : true,
  NameSpace      : "/core/spc",
  Timers         : coTimers.createList(1500),

  SMTP_INBOUND   : 0,
  SMTP_OUTBOUND  : 1,


  NS_SIGS_LIST   : "/sigs/l",
  NS_SIGS_ADD    : "/sigs/sig/a",
  NS_SIGS_DEL    : "/sigs/sig/d",
  NS_SIGS_WRITE  : "/sigs/sig/w",
  NS_SIGS_READ   : "/sigs/sig/r",
  NS_SIGS_REFRESH: "/sigs/sig/rf",


  NS_EML_LIST    : "/eml/l",
  NS_EML_DEL     : "/eml/del",
  NS_EML_CLEAR   : "/eml/clr",
  NS_EML_COUNT   : "/eml/cnt",
  NS_EML_READ    : "/eml/r",
  NS_EML_WRITE   : "/eml/w",
  NS_EML_MOVE    : "/eml/mv",
  NS_EML_ADD     : "/eml/a",
  NS_EML_UP_SMRY : "/eml/us",
  NS_EML_MIME    : "/eml/m",

  URI_EML_MGET   : "eml/getm",

  Spectrum       : null,
  Signatures     : null,
  Contacts       : null,

  Mailbox        : null,
  Tasks          : null,
  Assemblies     : null,
  Projects       : null,
  Events         : null,
  SMTP           : null,
  IMAP           : null,
  mailRefresh    : 240000,
  DefaultFolderWidth : 100,
  init           : function(){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
      ],
      [
        this.NameSpace+'/cts/coContacts.js',
        this.NameSpace+'/fldrs/coCabinet.js',
        this.NameSpace+'/coSpectrum.css',
        this.NameSpace+'/SMTP.js',
        this.NameSpace+'/IMAP.js',
        this.NameSpace+'/asms/Assemblies.js',
        this.NameSpace+'/tsks/Tasks.js',
        this.NameSpace+'/sigs/coSignatures.js',
        this.NameSpace+'/pjs/Projects.js'
      ],
      this.onInitialized
    );
    this.App.Initialized=true;
    this.App.Unit=this;

    return this;
  },
  onInitialized : function(App){
    coSpectrum.SMTP=coVDM.SMTP=coSpectrum.App.Components.SMTP.Create();
    coSpectrum.IMAP=coVDM.IMAP=coSpectrum.App.Components.IMAP.Create();
    coSpectrum.Tasks=coSpectrum.App.Components.Tasks.Create();
    coSpectrum.Assemblies=coSpectrum.App.Components.Assemblies.Create();
    coSpectrum.Projects=coSpectrum.App.Components.Projects.Create();
    App.Loaded=true;
  }
};
coSpectrum.init();

