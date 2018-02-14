coVDM.App.Components.coEnticement = {
  Version        : new Version(2012,11,19,40),
  Title          : new Title("VDM Enticement Screen","Enticement"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/vdm/enticement/coEnticement.js',
  debugToConsole : true,
  VDM            : null,
  revealDelay    : 1000,
  Transition     : 'left 15s linear',
  imgLogo        : "/images/logo-black-r2.png",
  imgLovedOnes   : "/core/vdm/imgs/entice/loved.jpg",
  imgFriends     : "/core/vdm/imgs/entice/friends.jpg",
  imgSharing     : "/core/vdm/imgs/entice/sharing.jpg",
  imgFreedom     : "/core/vdm/imgs/entice/free.jpg",
  imgFun         : "/core/vdm/imgs/entice/fun.jpg",
  imgCollaborate : "/core/vdm/imgs/entice/colab.jpg",
  imgFamily      : "/core/vdm/imgs/entice/family.jpg",

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
        '/core/vdm/enticement/Elements.js',
        '/core/vdm/enticement/Nav.js'
      ],
      this.onInitialized
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.App.Initialized=true;
    this.App.deferInit=function(App){
      return (coVDM.VDM.Torus!=undefined);
    };
    this.App.onLogin=function(App){
      App.Screen.Container.style.opacity=0;
      setTimeout(
        function(){
          App.Screen.Conseal();
        },
        1500
      );
    };
    this.App.onStartup=function(App){
      App.Screen.Show();
    };
    return this;
  },
  onInitialized:function(App){
    App.Screen=App.Unit.VDM.Welcome=App.Unit.Create(App.Unit.VDM);
    App.Loaded=true;
  },
  Create:function(aVDM){
    var ss=coAppScreens.createScreen(
      aVDM,
      "EnticementScreen",
      "System",
      "Enticement",
      "Enticement",
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Frameless,
      "bdrEnticement",
      "bdrEnticement",
      ""
    );
    ss.Unit=this;
    ss.Position=coApp.Position.Bottom;
    ss.State=coApp.State.Normal;
    ss.iconInApplications=false;
    ss.iconInTaskList=false;
    ss.AllowFullScreen=false;
    ss.SaveGeometry=false;


    ss.Manifest.Geometry.State.Value=coApp.State.Normal;
    ss.Manifest.Geometry.State.Default=coApp.State.Normal;

    ss.Container.className="EnticementScreen";
    ss.Frame.Client.className="bdrEnticementClient";
    ss.Frame.Torus.Container.style.bottom="0px";
    ss.Frame.Torus.Container.style.top="5px";

    /*
    ss.Cabinet=ss.Slides.createSlide("Cabinet","sldEnticementCabinet",ss,ss.Slides,ss.Frame.Client,coAppUI.Alignment.Left);
    ss.Cabinet.Container.className=ss.Cabinet.Class;
    ss.Cabinet.Image=coAppUI.App.Components.Image.Create("Image","enticeCabinet",ss,ss.Cabinet.Slides,ss.Cabinet,ss.Cabinet.Container,coAppUI.Alignment.Client);
    ss.Cabinet.Image.setImage(coTheme.Icons.Spectrum.Folder.Cabinet);
    ss.Cabinet.Image.Kind.setValue(ss.Cabinet.Image.Kind.Center);

    ss.Strip=coAppUI.App.Components.FilmStrip.Create("Strip","EnticementStrip",coTheme.Masks.None,ss,ss.Slides,ss,ss.Frame.Client,coAppUI.Alignment.Client);
    ss.Strip.Container.className=ss.Strip.Class;
    ss.Strip.Aspect.InnerSpacing=20;
    ss.Strip.Visible=true;
    ss.Strip.Transition=this.Transition;
    ss.Strip.Frames.Collaborate=ss.Strip.Frames.addItem(coLang.Table.Apps.Enticement.Collaborate,coVDM.App.Components.coEnticement.imgCollaborate);
    ss.Strip.Frames.Freedom=ss.Strip.Frames.addItem(coLang.Table.Apps.Enticement.Freedom,coVDM.App.Components.coEnticement.imgFreedom);
    ss.Strip.Frames.Share=ss.Strip.Frames.addItem(coLang.Table.Apps.Enticement.Share,coVDM.App.Components.coEnticement.imgSharing);
    ss.Strip.Frames.Enjoy=ss.Strip.Frames.addItem(coLang.Table.Apps.Enticement.Enjoy,coVDM.App.Components.coEnticement.imgFun);
    ss.Strip.Frames.Friends=ss.Strip.Frames.addItem(coLang.Table.Apps.Enticement.Friends,coVDM.App.Components.coEnticement.imgFriends);
    ss.Strip.Frames.Family=ss.Strip.Frames.addItem(coLang.Table.Apps.Enticement.Family,coVDM.App.Components.coEnticement.imgFamily);
    ss.Strip.Frames.LovedOnes=ss.Strip.Frames.addItem(coLang.Table.Apps.Enticement.LovedOnes,coVDM.App.Components.coEnticement.imgLovedOnes);

    ss.Device=ss.Slides.createSlide("Device","sldEnticementDevice",ss,ss.Slides,ss.Frame.Client,coAppUI.Alignment.Right);
    ss.Device.Container.className=ss.Device.Class;

    ss.Device.Image=coAppUI.App.Components.Image.Create("Image","enticeDevice",ss,ss.Device.Slides,ss.Device,ss.Device.Container,coAppUI.Alignment.Client);
    ss.Device.Image.setImage(coTheme.Icons.Tour.Devices);
    ss.Device.Image.Kind.setValue(ss.Cabinet.Image.Kind.Center);

    if (coVDM.Display.Small==true){
      ss.Device.Conseal();
      ss.Cabinet.Conseal();
    };

    this.App.Components.Nav.Create(ss);
    */
    this.App.Components.Elements.Create(ss);
    ss.Elements.Visible=true;
    ss.onHide=function(){
      var ss=this;
      ss.Elements.Conseal();
      //ss.Cabinet.Conseal();
      //ss.Strip.Conseal();
      //ss.Device.Conseal();
      ss.Container.style.opacity=0;
      //ss.Strip.Frames.Stop();
    };
    ss.onResize=function(){
      var ss=this;
    };
    ss.onShow=function(){
      var ss=this;
      ss.Elements.Reveal();
      /*
      if (coVDM.Display.Small!=true){
        ss.Cabinet.Reveal();
        ss.Device.Reveal();
      };
      ss.Strip.Reveal();
      setTimeout(
        function(){
          ss.Strip.Frames.Start();
        },
        coVDM.App.Components.coEnticement.revealDelay
      );
      */
      ss.setSize();
      ss.Container.style.opacity=1;
    };
    return ss;
  }
};
coVDM.App.Components.coEnticement.init(coVDM.VDM);
