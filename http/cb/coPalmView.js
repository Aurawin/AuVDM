var coPalmView = {
  Version        : new Version(2014,10,8,37),
  Title          : new Title("Aurawin Collage Palm View","Collage Palm View"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/cb/coPalmView.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/cb/coPalmView.js',coAppKit.PreLoaded),
  Unit           : '/cb/coPalmView.js',
  NameSpace      : "/core/collages",
  NS_COLLAGE_PV_READ  : "/plmv",
  ElementSwitchDelay : 5000,
  HeaderHideDelay    : 5000,
  PicMargin          : 2,
  doLoad : function()  {
    var html=document.getElementsByTagName('html')[0];
    html.style.overflow="auto";
    window.scrollTo(0,1);
    document.body.style.margin="0";
    document.body.style.padding="0";
    document.body.style.overflow="auto";

    divWrapper=coDOM.$("cmpWrapper");
    divCloud=coDOM.$("Cloud");
    divLogo=coDOM.$("Logo");
    divCloud.style.opacity=.27;
    setTimeout(
      function(){
        divCloud.style.opacity=1;
        setTimeout(
          function(){
            divCloud.style.opacity=.27;
          },
          1500
        );
      },
      1500
    );
    divLogo.style.opacity=1;

  },
  init : function(){
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
        '/cb/DB.js'
      ],
      this.onInitialized
    );
    this.App.onPostBoot=function(App){
      App.Initialized=true;
    };
    this.App.ConsealAfterCreate=false;
    this.App.Unit=this;
  },
  onInitialized : function(App){
    App.Header=coDOM.$("Header");
    App.InfoTitle=coDOM.$("InfoTitle");
    App.InfoWrap=coDOM.$("InfoWrap");
    App.InfoDescription=coDOM.$("InfoDescription");
    App.AvatarBox=coDOM.$("InfoAvatarBox");
    App.Avatar=coDOM.$("InfoAvatar");
    App.AvatarText=coDOM.$("AvatarText");
    App.AvatarWrapper=coDOM.$("InfoAvatarWrapper");
    App.Cloud=coDOM.$("Cloud");
    App.Logo=coDOM.$("Logo");
    App.AvatarBy=coDOM.$("AvatarBy");
    coDOM.setText(App.AvatarBy,coLang.Table.Apps.Collage.PalmView.PostedBy);
    App.DB=App.Components.DB.Create(App);
    App.DB.ID.Value=coVDM.VDM.Browser.Parameters.itemAsQword(0);
    if (App.DB.ID.Value!=0) {
      App.DB.Commands.Read(App.DB);
    } else {
      App.Failed=true;
    }

    App.doMakeHeaderHidden=function(){
      var App=this;

      if ((App.Logo.style.display!="none") && (coVDM.Display.Small==true)){
        App.Logo.style.display="none";
        App.InfoWrap.style.left=App.AvatarBox.offsetLeft+"px";
        App.AvatarBox.style.display="none";
      };
      if (App.Header.style.opacity!=1) {
        App.Header.style.opacity=1;
      };
      if (App.toHideHeader!=0){
        clearTimeout(App.toHideHeader);
        App.toHideHeader=0;
      };
      App.toHideHeader=setTimeout(
        function(){
          App.Header.style.opacity=0;
        },
        coPalmView.HeaderHideDelay
      );
    };
    App.evtTouchMove=coEvents.Add(window,"touchstart",App.doMakeHeaderHidden,coEvents.NoCapture,coEvents.NoActivate);
    App.evtMouseMove=coEvents.Add(window,"mousemove",App.doMakeHeaderHidden,coEvents.NoCapture,coEvents.NoActivate);
    App.Screen=App.Unit.createScreen(App);
    App.Screen.Show();
    App.Loaded=true;
  },
  createScreen: function(App){
    if (App.Screen!=null) return App.Screen;
    coVDM.VDM.Torus.Start();
    var sc=App.Screen=coAppScreens.createScreen(
      coVDM.VDM,
      "CollagePalmView",
      coLang.Table.Groups.Social.Name,
      coLang.Table.Apps.Collage.PalmView.Name,
      coLang.Table.Apps.Collage.PalmView.Title,
      coTheme.Icons.Collage.Main,
      0.5,
      0.5,
      coAppUI.Frameless,
      "bdrPalmView",
      "framePalmView",
      "filmPalmView"
    );
    sc.Unit=this;
    sc.AllowFullScreen=true;
    sc.SaveGeometry=true;
    sc.Position=coApp.Position.Full;
    sc.Description=coLang.Table.Apps.Collage.PalmView.Description;
    sc.Collage=coAppUI.App.Components.Elements.Create("Collage",sc.Class+"Collage",sc,sc.Slides,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
    sc.Collage.AutoStart=false;
    sc.Collage.setTransparent();
    sc.CollageLoad=function(dbItem){
      var sc=this;
      var App=coPalmView.App;
      App.evtMouseMove.setActive(true);
      App.evtTouchMove.setActive(true);
      App.Logo.style.marginRight="0px";
      App.Logo.style.right="10px";

      coPalmView.App.Cloud.style.opacity=0;
      coPalmView.App.AvatarWrapper.style.opacity=1;

      coDOM.setText(coPalmView.App.AvatarText,dbItem.MAP.By.Value);
      coDOM.setText(coPalmView.App.InfoTitle,dbItem.MAP.Title.Value);
      coDOM.setHTML(coPalmView.App.InfoDescription,dbItem.MAP.Description.Value);
      var kind=dbItem.MAP.Kind.Value;
      sc.Collage.Items.Add(kind);

      var imgs=dbItem.MAP.Glyphs.Value.Items;
      coPalmView.App.Avatar.style.backgroundImage="url("+dbItem.MAP.Avatar.Value+")";
      var elm=sc.Collage.Items[kind];
      sc.Collage.setDelay(dbItem.MAP.Delay.Value);

      sc.setSize();

      for (var iLcv=0; iLcv<imgs.length; iLcv++){
        var img=imgs[iLcv].MAP;
        var elem=sc.Collage.Items[img.Element.Value];
        var si=elem.subItems[img.SubItem.Value];
        if (si){
          var g=si.addGlyph(img.Data.Value);
          g.Delay=dbItem.MAP.Delay.Value;
          g.MoveX=img.MoveX.Value;
          g.MoveY=img.MoveY.Value;
          g.ScaleX=img.ScaleX.Value;
          g.ScaleY=img.ScaleY.Value;
          g.Rotate=img.Rotate.Value;
        };
      };
      coVDM.VDM.Torus.Stop();
      sc.Collage.Container.style.opacity=1;
      sc.Collage.Items.Start();

      App.doMakeHeaderHidden();
    };
    sc.CollageLoadFailed=function(){
      var sc=this;
      coPalmView.App.Cloud.style.opacity=1;
      coPalmView.App.Logo.style.opacity=1;
      sc.Collage.Items.Conseal();
      var elm=sc.Collage.Items.Add(coAppUI.App.Components.Elements.Kind.Double);
      elm.clearBoxShadows();
      elm.Reveal();
      elm.subItems[1].addGlyph(coTheme.Icons.Find);
      var sText="".concat(
        "<p class=\"CollageError\">",
          coLang.Table.Apps.Collage.PalmView.Missing,
        "</p>",
        "<p class=\"CollageErrorMessage\">",
          coLang.Table.Apps.Collage.PalmView.CollageNotFound,
        "</p>"
      );
      elm.subItems[0].setText(sText);
      sc.setSize();
      coVDM.VDM.Torus.Stop();
    };
    sc.Collage.onSetSize=function(){
      var cl=this;
      var cX=cl.Container.clientWidth;
      var cY=cl.Container.clientHeight;
      var iSpan=cY;
      if (iSpan>cX)
        iSpan=cX;
      iSpan-=(iSpan % 2==0) ? coPalmView.PicMargin : coPalmView.PicMargin+1;
      cl.setElementSpan(iSpan);
    };
    sc.doShow=function(){
      var sc=this;
      sc.Collage.Reveal();
    };
    sc.doHide=function(){
      var sc=this;
      sc.Collage.Conseal();
    };
    if (App.Failed==true) sc.CollageLoadFailed();
    return sc;
  }
};
coPalmView.init();
