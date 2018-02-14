coFrontPage.App.Components.bxWelcome = {
  Version        : new Version(2014,2,27,231),
  Title          : new Title("Aurawin Front Page Welcome Box","Welcome Box"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coFrontPage.App,'/fp/bxWelcome.js',coAppKit.PreLoaded),
  debugToConsole : true,
  urlWelcome     : '/fp/wel1.html',
  urlBenefits    : '/fp/wel2.html',
  urlFeatures    : '/fp/wel3.html',
  elementSpanSmall : 50,
  elementSpanLarge : 280,
  elementsLarge    : 300,
  elementsSmall    : 100,
  glyphDelayWide   : 10000,
  glyphDelaySquare1: 11000,
  glyphDelaySquare2: 12000,

  Init:function(Screen,Box){
    Box.Slides.Welcome=this.createWelcomeBox(Screen,Box);
    Box.CompleteLogin=function(Resource){
      coVDM.Credentials.ResourceID=Resource.MAP.ID.Value;
      var sc=this.View.Screen;
      var splash=coVDM.VDM.Splash;
      if (splash){
        splash.checkDevice();
        if (splash.allChecked()==false){
          splash.Reveal();
        } else {
          splash.Conseal();
          coVDM.VDM.Loading=false;
        };
      };
      setTimeout(function(){sc.Container.style.opacity=0;},250);
      setTimeout(function(){sc.Conseal()},5000);
    };
    Box.InvokeSignup=function(){
      var Box=this;
      Box.Button.Select();
      Box.Button.scrollInView();
      Box.ShowCase.Buttons[0].Select();
      if (coVDM.Display.Small==true) {
        Box.ShowCase.Items.Signup.Button.Select();
      } else {
        Box.Slides.Login.Conseal();
        Box.Slides.Signup.Reveal();
      };

      Box.Slides.Signup.Slides.Conseal();
      Box.Slides.SignupName.Reveal();
    };
  },
  createWelcomeBox:function(Screen,Box){
    var sc=Screen;

    if (coVDM.Display.Small==true) {
      Box.ShowCase=coAppUI.App.Components.ShowCase.Create("FrontPageWelcome","sldFrontPageShowCase",sc,Box.Slides,Box,Box.Client,coAppUI.Alignment.Client);
      Box.ShowCase.PageItemPosition=coAppUI.Relative;
      Box.ShowCase.PageClientPosition=coAppUI.Relative;
      Box.ShowCase.PageContentPosition=coAppUI.Relative;
      var sci=Box.ShowCase.Items.Login=Box.ShowCase.Items.addItem();
      var sci=Box.ShowCase.Items.Signup=Box.ShowCase.Items.addItem();


      var sl=Box.Slides.Login=Box.Slides.createSlide("Login","sldLogin",sc,Box.ShowCase.Items.Login.Page,Box.ShowCase.Items.Login.Page.Client, coAppUI.Alignment.Client);
      var slSignup=Box.Slides.Signup=Box.Slides.createSlide("Signup","sldSignup",sc,Box.ShowCase.Items.Signup.Page,Box.ShowCase.Items.Signup.Page.Content, coAppUI.Alignment.Client);
      var slDevices=Box.Slides.Devices=Box.Slides.createSlide("Devices","sldDevices",sc,Box.ShowCase.Items.Login.Page,Box.ShowCase.Items.Login.Page.Content, coAppUI.Alignment.Client);
      slSignup.Visible=true;
    } else {
      var sl=Box.Slides.Login=Box.Slides.createSlide("Login","sldLogin",sc,Box,Box.Client, coAppUI.Alignment.Left);
      var slSignup=Box.Slides.Signup=Box.Slides.createSlide("Signup","sldSignup",sc,Box,Box.Client, coAppUI.Alignment.Left);
      var slDevices=Box.Slides.Devices=Box.Slides.createSlide("Devices","sldDevices",sc,Box,Box.Client, coAppUI.Alignment.Left);
      slSignup.Conseal();

      Box.Slides.Elements=coAppUI.App.Components.Elements.Create(
        "Elements",
        "elmsFrontPage",
        Screen,
        Box.Slides,
        Box,
        Box.Client,
        coAppUI.Alignment.Left
      );
      Box.Slides.Elements.Tripple=Box.Slides.Elements.Items.Add(coAppUI.App.Components.Elements.Kind.Tripple);
      var el=Box.Slides.Elements.Tripple.subItems[0];
      el.Glyphs.Delay=this.glyphDelayWide;
      el.addGlyph(coTheme.People.Wide.Freedom,"People");
      el.addGlyph(coTheme.People.Wide.Friends,"People");
      el.addGlyph(coTheme.People.Wide.Loved,"People");
      el.addGlyph(coTheme.People.Wide.Biking.Couple,"People");
      el.addGlyph(coTheme.People.Wide.Biking.Family,"People");
      el.addGlyph(coTheme.Tourist.Wide.Caribbean,"People");

      el.addGlyph(coTheme.People.Wide.Skiing.Poles,"Seasons");
      el.addGlyph(coTheme.People.Wide.Skiing.LegUp,"Seasons");
      el.addGlyph(coTheme.People.Wide.Skiing.CrossCountry,"Seasons");

      el.addGlyph(coTheme.Tourist.Wide.GrandCanyon,"Tourist");
      el.addGlyph(coTheme.Tourist.Wide.IgauzuFalls,"Tourist");
      el.addGlyph(coTheme.Tourist.Wide.BrandenburgGate,"Tourist");

      var el=Box.Slides.Elements.Tripple.subItems[1];
      el.Glyphs.Delay=this.glyphDelaySquare1;
      el.addGlyph(coTheme.People.Square.Birthday.Boy,"People");
      el.addGlyph(coTheme.People.Square.Camping.Tent,"People");
      el.addGlyph(coTheme.People.Square.Family.Sledding,"People");
      el.addGlyph(coTheme.People.Square.Biking.Beach,"People");
      el.addGlyph(coTheme.People.Square.Biking.Street,"People");

      el.addGlyph(coTheme.People.Square.Skiing.Family,"Seasons");
      el.addGlyph(coTheme.People.Square.Skiing.Road,"Seasons");
      el.addGlyph(coTheme.People.Square.Skiing.Braking,"Seasons");

      el.addGlyph(coTheme.Tourist.Square.Eiffel,"Tourist");

      var el=Box.Slides.Elements.Tripple.subItems[2];
      el.Glyphs.Delay=this.glyphDelaySquare2;
      el.addGlyph(coTheme.People.Square.Family.Aunt,"People");
      el.addGlyph(coTheme.People.Square.Family.Wedding,"People");
      el.addGlyph(coTheme.People.Square.Biking.Girl,"People");
      el.addGlyph(coTheme.People.Square.Biking.Woman,"People");

      el.addGlyph(coTheme.People.Square.Skiing.Trail,"Seasons");
      el.addGlyph(coTheme.People.Square.Skiing.DogWalk,"Seasons");
      el.addGlyph(coTheme.People.Square.Skiing.Boarder,"Seasons");

      el.addGlyph(coTheme.Tourist.Square.SaintBasil,"Tourist");
      el.addGlyph(coTheme.Tourist.Square.MonumentToDiscoveries,"Tourist");


      Box.Slides.Elements.setWidth(this.elementsLarge);
      Box.Slides.Elements.setElementSpan(this.elementSpanLarge);

      Box.ShowCase=coAppUI.App.Components.ShowCase.Create("FrontPageWelcome","sldFrontPageShowCase",sc,Box.Slides,Box,Box.Client,coAppUI.Alignment.Client);
      Box.ShowCase.PageItemPosition=coAppUI.Relative;
      Box.ShowCase.PageClientPosition=coAppUI.Relative;
      Box.ShowCase.PageContentPosition=coAppUI.Relative;
    }
    Box.ShowCase.doSetSize=function(){
      var Box=this.Owner;
      if ( (Box.Slides.Elements) && (this.Screen.ComponentState==coApp.ComponentState.Loaded)){
        if (Box.Slides.Elements.Hidden==true) {
          if (Box.Container.offsetWidth>=877) {
            Box.Slides.Elements.Reveal();
            this.Screen.setSize();
          };
        } else if (Box.Container.offsetWidth<877)  {
          Box.Slides.Elements.Conseal();
          this.Screen.setSize();
        };
      };
    };

    sl.Box=Box;
    slSignup.Box=Box;
    slDevices.Box=Box;

    slDevices.clearContainerClass();
    slSignup.clearContainerClass();

    var sci=Box.ShowCase.Items.Welcome=Box.ShowCase.Items.addItem();
    sci.Category="People";

    sci.Page.setURL(this.urlWelcome);
    sci.Page.onLoaded=function(Page){
      if (coVDM.Display.Small==true)
        Page.ConsealImages();
    };
    var sci=Box.ShowCase.Items.Benefits=Box.ShowCase.Items.addItem();
    sci.Category="Seasons";

    sci.Page.setURL(this.urlBenefits);
    sci.Page.onLoaded=function(Page){
      if (coVDM.Display.Small==true)
        Page.ConsealImages();
    };

    var sci=Box.ShowCase.Items.Features=Box.ShowCase.Items.addItem();
    sci.Category="Tourist";

    sci.Page.setURL(this.urlFeatures);
    sci.Page.onLoaded=function(Page){
      if (coVDM.Display.Small==true)
        Page.ConsealImages();
    };

    Box.ShowCase.clearContainerClass();
    Box.ShowCase.Buttons.placeBottomOutside();
    Box.ShowCase.AutoSize=true;
    Box.ShowCase.onSelectItem=function(Item){
      var cs=this;
      var bs=cs.Owner;
      if (coVDM.Display.Small==true) {

      } else {
        bs.Slides.Elements.setCategory(Item.Category);

        if (cs.Items.indexOf(Item)!=0){
          if (bs.Slides.SignupAccount.Visible==true) {
            bs.Slides.SignupAccount.btnBack.doClick();
          } else if (bs.Slides.SignupName.Visible==true){
            bs.Slides.SignupName.btnBack.doClick();
          };
        };
      };
    };
    Box.ShowCase.onAutoSize=function(iWidth,iHeight){
      var cs=this;
      var bs=cs.Owner;
      var sc=bs.ShowCase.Screen;
      var boxes=bs.Owner.Owner;

      var iBias=bs.Title.scrollHeight+bs.ShowCase.Buttons.Container.offsetHeight+20;
      if (iHeight+iBias>boxes.Wrap.offsetHeight) {
        iHeight=boxes.Wrap.offsetHeight-iBias;
      } else {
        iHeight+=bs.Title.scrollHeight;
      };
      iHeight=Math.max(iHeight,320);
      bs.setHeight(iHeight);
      sc.tmrResize.setActive(true);
    };

    Box.Slides.Signup=slSignup;
    Box.Slides.SignupName=this.createSignupNameSlide(Screen,Box,slSignup);
    Box.Slides.SignupLocation=this.createSignupLocationSlide(Screen,Box,slSignup);
    Box.Slides.SignupAccount=this.createSignupAccountSlide(Screen,Box,slSignup);

    Box.Slides.DeviceSelect=this.createDeviceSelect(Screen,Box,slDevices);
    Box.Slides.DeviceAdd=this.createDeviceAdd(Screen,Box,slDevices);
    slDevices.Conseal();

    sl.Unit=this;
    sl.Visible=true;
    sl.clearContainerClass();

    sl.Torus=coAppUI.App.Components.Torus.Create(Screen.Frame,sl,sl.Container);
    sl.Torus.Placement.Mode.setTopCenter();
    sl.Torus.Placement.Top=150;

    sl.lbLogin=coAppUI.App.Components.Label.Create(sl,sl.Container,"lbLogin","lbFrontPageBoxWelcome",coLang.Table.Net.Login.ExistingUsers);
    sl.lbLogin.Visible=true;
    sl.lbLogin.Placement.Mode.setTopLeft();
    sl.lbLogin.Placement.Top=10;
    sl.lbLogin.Placement.Left=10;

    if (coVDM.Display.Small==false) {
      sl.lnVert=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnVert","lnFrontPageBoxWelcomeV");
      sl.lnVert.setHeight(150);
      sl.lnVert.Visible=true;
      sl.lnVert.Placement.Mode.setRightCenter();
      sl.lnVert.Placement.Top=25;
      sl.lnVert.Placement.Right=0;
    };

    sl.txtUsername=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtUsername","txtFrontPageBoxWelcome",coLang.Table.Net.Login.AcctName,coLang.Table.Net.Login.AcctNameHint);
    sl.txtUsername.Visible=true;
    sl.txtUsername.AllowInput.setUsername();
    sl.txtUsername.Placement.Mode.setTopCenter();
    sl.txtUsername.Placement.Top=50;
    sl.txtUsername.onNext=function(){
      var sl=this.Owner;
      sl.txtPassword.Focus();
    };

    sl.txtPassword=coAppUI.App.Components.Password.Create(sl,sl.Container,"txtPassword","txtFrontPageBoxWelcome",coLang.Table.Net.Login.AcctPass,coLang.Table.Net.Login.AcctPassHint);
    sl.txtPassword.Visible=true;
    sl.txtPassword.Placement.Mode.setTopCenter();
    sl.txtPassword.Placement.Top=95;
    sl.txtPassword.onNext=function(){
     var sl=this.Owner;
     sl.btnLogin.doClick();
    };


    sl.btnLogin=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnLogin","btnFrontPageBoxWelcome",coLang.Table.Buttons.Login);
    sl.btnLogin.Visible=true;
    sl.btnLogin.Placement.Mode.setTopRight();
    sl.btnLogin.Placement.Top=155;
    sl.btnLogin.Placement.Right=17;
    sl.btnLogin.onClick=function(btn){
      var sl=this.Owner;
      var Box=sl.Box;
      sl.Torus.Start();

      coVDM.Credentials.User=sl.txtUsername.getCaption().toLowerCase();
      coVDM.Credentials.Pass=sl.txtPassword.getCaption();

      if (coVDM.Credentials.User.length==0) {
        sl.txtUsername.Focus();
        sl.Torus.Stop();
        return null;
      };

      if (coVDM.Credentials.Pass.length==0) {
        sl.txtPassword.Focus();
        sl.Torus.Stop();
        return null;
      };
      coVDM.VDM.Splash.Conseal();
      coVDM.Credentials.Auth=coEncryption.toMD5(coVDM.Credentials.User+coVDM.Credentials.Pass);
      coVDM.VDM.Authenticate();
      sl.btnLogin.setDisabled();
    };
    sl.btnSignup=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnSignup","btnFrontPageBoxWelcome",coLang.Table.Buttons.Signup);
    sl.btnSignup.Visible=true;
    sl.btnSignup.Placement.Mode.setTopLeft();
    sl.btnSignup.Placement.Top=155;
    sl.btnSignup.Placement.Left=17;

    sl.btnSignup.onClick=function(btn){
      var sl=this.Owner;
      var Box=sl.Box;
      if (coVDM.Display.Small==true){
        Box.ShowCase.Items.Signup.Button.Select();
      } else {
        sl.Conseal();
        Box.Slides.Signup.Reveal();
        Box.Slides.SignupName.Reveal();
        Box.ShowCase.Items.Welcome.Button.Select();
      }
      sl.Screen.setSize();
    };
    sl.Controls.AUP=coAppUI.App.Components.Label.Create(sl,sl.Container,"AUP","lblFrontPagePolicies",coLang.Table.Apps.Policies.AcceptableUse);
    sl.Controls.AUP.Visible=true;
    sl.Controls.AUP.Placement.Mode.setTopLeft();
    sl.Controls.AUP.Placement.Top=210;
    sl.Controls.AUP.Placement.Left=17;
    sl.Controls.AUP.onClick=function(){
       coPolicies.InvokeAUP();
    };
    sl.Controls.Privacy=coAppUI.App.Components.Label.Create(sl,sl.Container,"lblPrivacy","lblFrontPagePolicies",coLang.Table.Apps.Policies.Privacy);
    sl.Controls.Privacy.Visible=true;
    sl.Controls.Privacy.Placement.Mode.setTopLeft();
    sl.Controls.Privacy.Placement.Top=230;
    sl.Controls.Privacy.Placement.Left=17;
    sl.Controls.Privacy.onClick=function(){
       coPolicies.InvokePrivacy();
    };

    sl.Controls.Terms=coAppUI.App.Components.Label.Create(sl,sl.Container,"Tems","lblFrontPagePolicies",coLang.Table.Apps.Policies.Agreement);
    sl.Controls.Terms.Visible=true;
    sl.Controls.Terms.Placement.Mode.setTopLeft();
    sl.Controls.Terms.Placement.Top=250;
    sl.Controls.Terms.Placement.Left=17;
    sl.Controls.Terms.onClick=function(){
       coPolicies.InvokeTerms();
    };
    sl.onFailed=function(){
      var sl=this;
      var Box=sl.Box;
      Box.Slides.DeviceSelect.Conseal();
      if (coVDM.Display.Small==true)
        Box.ShowCase.Items.Login.Button.Select();
      Box.Slides.Login.Reveal();
      coVDM.VDM.Status.Show(coLang.Table.Net.Rejected,sl.Screen,sl.txtUsername);
      setTimeout(
        function(){
          sl.Torus.Stop();
          sl.btnLogin.setEnabled();
        },
        coVDM.LoginFailureResetDelay
      );
    };
    sl.onAuthenticated=function(){
      var Box=this.Box;
      if (Box.ShowCase.Items.Login)
        Box.ShowCase.Items.Login.Button.Select();
      Box.Slides.Login.Conseal();
      Box.Slides.Devices.Reveal();
      Box.Slides.DeviceSelect.Reveal();
      Box.Slides.DeviceSelect.Torus.Start();
    };
    sl.onShow=function(){
    };
    return sl;
  },
  createDeviceSelect:function(Screen,Box,Slide){
    var sc=Screen;
    sl=Slide.Slides.createSlide("DeviceSelect","sldDeviceSelect",sc,Slide,Slide.Container,coAppUI.Alignment.Client);
    //sl=Box.Slides.createSlide("DeviceSelect","sldDeviceSelect",sc,Box,Box.Client,coAppUI.Alignment.Left);
    sl.Unit=this;
    sl.Box=Box;
    sl.Container.className=sl.Class;

    sl.Torus=coAppUI.App.Components.Torus.Create(Screen.Frame,sl,sl.Container);
    sl.Torus.Placement.Mode.setTopCenter();
    sl.Torus.Placement.Top=49;

    sl.lbDevice=coAppUI.App.Components.Label.Create(sl,sl.Container,"lbDevice","lbFrontPageBoxWelcome",coLang.Table.Net.Login.Resource.Select);
    sl.lbDevice.Visible=true;
    sl.lbDevice.Placement.Mode.setTopLeft();
    sl.lbDevice.Placement.Top=10;
    sl.lbDevice.Placement.Left=10;

    if (coVDM.Display.Small==false) {
      sl.lnVert=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnVert","lnFrontPageBoxWelcomeV");
      sl.lnVert.Visible=true;
      sl.lnVert.setHeight(150);
      sl.lnVert.Placement.Mode.setRightCenter();
      sl.lnVert.Placement.Top=25;
      sl.lnVert.Placement.Right=0;

      sl.lnAddDevice=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnAddDevice","lnFrontPageBoxWelcomeH");
      sl.lnAddDevice.Visible=true;
      sl.lnAddDevice.Placement.Mode.setTopCenter();
      sl.lnAddDevice.Placement.Top=97;
    };

    sl.selDevice=coAppUI.App.Components.Select.Create(sl,sl.Container,"selNewDevice","selFrontPageBoxWelcome");
    sl.selDevice.Visible=true;
    sl.selDevice.Placement.Mode.setTopCenter();
    sl.selDevice.Placement.Top=50;


    sl.btnAdd=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnAdd","btnFrontPageBoxWelcome",coLang.Table.Net.Login.Resource.NotListed);
    sl.btnAdd.Visible=true;
    sl.btnAdd.Placement.Mode.setTopRight();
    sl.btnAdd.Placement.Top=115;
    sl.btnAdd.Placement.Right=132;
    sl.btnAdd.onClick=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      Box.Slides.DeviceSelect.Conseal();
      Box.Slides.DeviceAdd.Reveal();
    };

    sl.btnContinue=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnLogin","btnFrontPageBoxWelcome",coLang.Table.Labels.Continue);
    sl.btnContinue.Visible=true;
    sl.btnContinue.Placement.Mode.setTopRight();
    sl.btnContinue.Placement.Top=115;
    sl.btnContinue.Placement.Right=32;
    sl.btnContinue.onClick=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      var DB=coVDM.App.Components.coDevice.List.DB;
      var idx=sl.selDevice.Container.selectedIndex;
      if (idx!=-1){
        var Resource=DB.Items[idx];
        if (Resource)
          Box.CompleteLogin(Resource);
      };
    };
    sl.onAuthenticated=function(){
      var sl=this;
      sl.Torus.Stop();
    };
    sl.onDevicesLoaded=function(){
      var sl=this;
      var sc=sl.Screen;
      var Box=sl.Box;
      var DB=coVDM.App.Components.coDevice.List.DB;
      DB.Fields.setOptions(sl.selDevice.Container);
      sl.selDevice.setOptionsClass("optFrontPageBoxWelcome");

      if (coVDM.Credentials.ResourceID!=0){
        var Resource=DB.getItemById(coVDM.Credentials.ResourceID);
        if (Resource) {
          var idx=DB.Items.indexOf(Resource);
          sl.selDevice.Container.selectedIndex=idx;
          Box.CompleteLogin(Resource);
        } else {
          coVDM.Credentials.ResourceID=0;
          sc.Show();
          Box.ShowCase.Items.Welcome.Button.Select();
          Box.Slides.Login.Conseal();
          Box.Slides.Devices.Reveal();
          Box.Slides.DeviceSelect.Reveal();
          coVDM.VDM.Splash.Conseal();
          sc.tmrResize.setActive(true);
        };
      };
      sl.Torus.Stop();
    };
    sl.onShow=function(){
    };
    sl.Conseal();
    return sl;
  },

  createSignupLocationSlide:function(Screen,Box,Slide){
    var sc=Screen;

    sl=Slide.Slides.createSlide("Signup","sldSignupLocation",sc,Slide,Slide.Container,coAppUI.Alignment.Client);
    sl.Box=Box;
    sl.Unit=this;
    sl.clearContainerClass();

    if (coVDM.Display.Small==false) {
      sl.lnVert=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnVert","lnFrontPageBoxWelcomeV");

      sl.lnVert.setHeight(150);
      sl.lnVert.Visible=true;
      sl.lnVert.Placement.Mode.setRightCenter();
      sl.lnVert.Placement.Top=25;
      sl.lnVert.Placement.Right=0;
    };

    sl.lbHeader=coAppUI.App.Components.Label.Create(sl,sl.Container,"lbHeader","lbFrontPageBoxWelcome",coLang.Table.Signup.LocationInfo);
    sl.lbHeader.Placement.Mode.setTopLeft();
    sl.lbHeader.Placement.Top=10;
    sl.lbHeader.Placement.Left=10;

    sl.txtAddr1=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtAddr1","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterAddress,coLang.Table.Signup.LocationStreet1);
    sl.txtAddr1.Visible=true;
    sl.txtAddr1.Placement.Mode.setTopCenter();
    sl.txtAddr1.Placement.Top=50;
    sl.txtAddr1.onNext=function(){
      var sl=this.Owner;
      sl.txtAddr2.Focus();
    };

    sl.txtAddr2=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtAddr2","txtFrontPageBoxWelcome",coLang.Table.Signup.OptionalAddress2,coLang.Table.Signup.LocationStreet2);
    sl.txtAddr2.Visible=true;
    sl.txtAddr2.Placement.Mode.setTopCenter();
    sl.txtAddr2.Placement.Top=95;
    sl.txtAddr2.onNext=function(){
      var sl=this.Owner;
      sl.txtCity.Focus();
    };

    sl.txtCity=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtCity","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterCity,coLang.Table.Signup.LocationCity);
    sl.txtCity.Visible=true;
    sl.txtCity.Placement.Mode.setTopCenter();
    sl.txtCity.Placement.Top=140;
    sl.txtCity.onNext=function(){
      var sl=this.Owner;
      sl.txtState.Focus();
    };

    sl.txtState=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtState","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterState,coLang.Table.Signup.LocationState);
    sl.txtState.Visible=true;
    sl.txtState.Placement.Mode.setTopCenter();
    sl.txtState.Placement.Top=185;
    sl.txtState.onNext=function(){
      var sl=this.Owner;
      sl.txtPost.Focus();
    };

    sl.txtPost=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtPost","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterPost,coLang.Table.Signup.LocationPostal);
    sl.txtPost.Visible=true;
    sl.txtPost.AllowInput.setPostal();
    sl.txtPost.Placement.Mode.setTopCenter();
    sl.txtPost.Placement.Top=230;
    sl.txtPost.onNext=function(){
      var sl=this.Owner;
      sl.txtCountry.Focus();
    };

    sl.txtCountry=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtCountry","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterCountry,coLang.Table.Signup.LocationCountry);
    sl.txtCountry.Visible=true;
    sl.txtCountry.Placement.Mode.setTopCenter();
    sl.txtCountry.Placement.Top=275;
    sl.txtCountry.onNext=function(){
      var sl=this.Owner;
      sl.btnNext.doClick();
    };
    sl.Validate=function(){
      var sl=this;
      if (sl.txtAddr1.Container.value.length<2) {
        sl.txtAddr1.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterAddress,sl.Screen,sl.txtAddr1);
        return false;
      };
      if (sl.txtCity.Container.value.length<2) {
        sl.txtCity.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterCity,sl.Screen,sl.txtCity);
        return false;
      };
      if (sl.txtState.Container.value.length<2) {
        sl.txtState.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterState,sl.Screen,sl.txtState);
        return false;
      };
      if (sl.txtPost.Container.value.length<2) {
        sl.txtPost.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterPost,sl.Screen,sl.txtPost);
        return false;
      };
      if (sl.txtCountry.Container.value.length<2) {
        sl.txtCountry.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterCountry,sl.Screen,sl.txtCountry);
        return false;
      };
      var rst=coLogin.DB.Roster;
      rst.Address1.Value=sl.txtAddr1.getCaption();
      rst.Address2.Value=sl.txtAddr2.getCaption();
      rst.City.Value=sl.txtCity.getCaption();
      rst.State.Value=sl.txtState.getCaption();
      rst.Zip.Value=sl.txtPost.getCaption();
      rst.Country.Value=sl.txtCountry.getCaption();

      return true;
    };

    sl.btnNext=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnNext","btnFrontPageBoxWelcome",coLang.Table.Labels.Continue);
    sl.btnNext.Visible=true;
    sl.btnNext.Placement.Mode.setTopRight();
    sl.btnNext.Placement.Top=320;
    sl.btnNext.Placement.Right=17;
    sl.btnNext.onClick=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      if (sl.Validate()==true) {
        sl.Conseal();
        Box.Slides.SignupAccount.Reveal();
        Box.ShowCase.Items.Welcome.AutoSize();
        sl.Screen.setSize();
      };
    };

    sl.btnBack=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnBack","btnFrontPageBoxWelcome",coLang.Table.Buttons.Back);
    sl.btnBack.Visible=true;
    sl.btnBack.Placement.Mode.setTopLeft();
    sl.btnBack.Placement.Top=320;
    sl.btnBack.Placement.Left=17;
    sl.btnBack.onClick=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      sl.Conseal();
      Box.Slides.SignupName.Reveal();
      Box.ShowCase.Items.Welcome.AutoSize();
      sl.Screen.setSize();
    };
    sl.lnFooter=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnFooter","lnFrontPageBoxWelcomeFooterH");
    sl.lnFooter.Visible=true;
    sl.lnFooter.Placement.Mode.setTopCenter();
    sl.lnFooter.Placement.Top=360;

    sl.Conseal();
    return sl;
  },
  createSignupNameSlide:function(Screen,Box,Slide){
    var sc=Screen;
    sl=Slide.Slides.createSlide("Signup","sldSignupName",sc,Slide,Slide.Container,coAppUI.Alignment.Client);
    sl.Box=Box;
    sl.Unit=this;
    sl.clearContainerClass();

    if (coVDM.Display.Small==false) {
      sl.lnVert=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnVert","lnFrontPageBoxWelcomeV");
      sl.lnVert.Visible=true;
      sl.lnVert.setHeight(150);
      sl.lnVert.Placement.Mode.setRightCenter();
      sl.lnVert.Placement.Top=25;
      sl.lnVert.Placement.Right=0;
    };

    sl.lbHeader=coAppUI.App.Components.Label.Create(sl,sl.Container,"lblbHeader","lbFrontPageBoxWelcome",coLang.Table.Signup.Prompt);
    sl.lbHeader.Visible=true;
    sl.lbHeader.Placement.Mode.setTopLeft();
    sl.lbHeader.Placement.Top=10;
    sl.lbHeader.Placement.Left=10;

    sl.txtFirst=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtFirst","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterFirstName,coLang.Table.Signup.NameFirst);
    sl.txtFirst.Visible=true;
    sl.txtFirst.Placement.Mode.setTopCenter();
    sl.txtFirst.Placement.Top=50;
    sl.txtFirst.onNext=function(){
      var sl=this.Owner;
      sl.txtMiddle.Focus();
    };

    sl.txtMiddle=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtMiddle","txtFrontPageBoxWelcome",coLang.Table.Signup.OptionalMiddleName,coLang.Table.Signup.NameMiddle);
    sl.txtMiddle.Visible=true;
    sl.txtMiddle.Placement.Mode.setTopCenter();
    sl.txtMiddle.Placement.Top=95;
    sl.txtMiddle.onNext=function(){
      var sl=this.Owner;
      sl.txtLast.Focus();
    };

    sl.txtLast=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtLast","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterLastName,coLang.Table.Signup.NameFamily);
    sl.txtLast.Visible=true;
    sl.txtLast.Placement.Mode.setTopCenter();
    sl.txtLast.Placement.Top=140;
    sl.txtLast.onNext=function(){
      var sl=this.Owner;
      sl.txtPhone.Focus();
    };
    sl.Validate=function(){
      var sl=this;
      if (sl.txtFirst.Container.value.length<2) {
        sl.txtFirst.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterFirstName,sl.Screen,sl.txtFirst);
        return false;
      };
      if (sl.txtLast.Container.value.length<2) {
        sl.txtLast.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterLastName,sl.Screen,sl.txtLast);
        return false;
      };
      if (sl.txtPhone.Container.value.length<10) {
        sl.txtPhone.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterPhone,sl.Screen,sl.txtPhone);
        return false;
      };
      var rst=coLogin.DB.Roster;
      var act=coLogin.DB.Account;
      act.FirstName.Value=sl.txtFirst.getCaption();
      rst.FirstName.Value=sl.txtFirst.getCaption();
      rst.MiddleName.Value=sl.txtMiddle.getCaption();
      act.LastName.Value=sl.txtLast.getCaption();
      rst.LastName.Value=sl.txtLast.getCaption();
      act.Telephone.Value=sl.txtPhone.getCaption();
      rst.Phone.Value=sl.txtPhone.getCaption();
      return true;
    };
    sl.txtPhone=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtPhone","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterPhone,coLang.Table.Signup.PhoneInfo);
    sl.txtPhone.Visible=true;
    sl.txtPhone.Placement.Mode.setTopCenter();
    sl.txtPhone.Placement.Top=185;
    sl.txtPhone.onNext=function(){
      var sl=this.Owner;
      sl.btnNext.doClick();
    };


    sl.btnNext=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnNext","btnFrontPageBoxWelcome",coLang.Table.Labels.Continue);
    sl.btnNext.Visible=true;
    sl.btnNext.Placement.Mode.setTopRight();
    sl.btnNext.Placement.Top=230;
    sl.btnNext.Placement.Right=17;
    sl.btnNext.onClick=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      if (sl.Validate()==true){
        sl.Conseal();
        Box.Slides.SignupLocation.Reveal();
        sl.Screen.setSize();
        var sLoc=Box.Slides.SignupLocation;
        Box.ShowCase.onAutoSize(Box.offsetWidth,sLoc.Container.scrollHeight+sLoc.Padding.Bottom);
        sl.Screen.setSize();
      };
    };
    sl.btnBack=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnBack","btnFrontPageBoxWelcome",coLang.Table.Buttons.Back);
    sl.btnBack.Visible=true;
    sl.btnBack.Placement.Mode.setTopLeft();
    sl.btnBack.Placement.Top=230;
    sl.btnBack.Placement.Left=17;
    sl.btnBack.onClick=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      if (coVDM.Display.Small==true) {
        Box.ShowCase.Items.Login.Button.Select();
      } else {
        sl.Conseal();
        Box.Slides.Signup.Conseal();
        Box.Slides.Login.Reveal();
      };
      sl.Screen.setSize();
    };
    sl.lnFooter=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnFooter","lnFrontPageBoxWelcomeFooterH");
    sl.lnFooter.Visible=true;
    sl.lnFooter.Placement.Mode.setTopCenter();
    sl.lnFooter.Placement.Top=285;

    if (coVDM.Display.Small==true){
      sl.Visible=true;
    } else {
      sl.Conseal();
    };
    return sl;
  },
  createSignupAccountSlide:function(Screen,Box,Slide){
    var sc=Screen;

    sl=Slide.Slides.createSlide("Signup","sldSignupAccount",sc,Slide,Slide.Container,coAppUI.Alignment.Client);
    sl.Box=Box;
    sl.Unit=this;
    sl.clearContainerClass();

    sl.Torus=coAppUI.App.Components.Torus.Create(Screen.Frame,sl,sl.Container);
    sl.Torus.Placement.Mode.setTopCenter();
    sl.Torus.Placement.Top=230;


    if (coVDM.Display.Small==false) {
      sl.lnVert=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnVert","lnFrontPageBoxWelcomeV");
      sl.lnVert.Visible=true;
      sl.lnVert.setHeight(150);
      sl.lnVert.Placement.Mode.setRightCenter();
      sl.lnVert.Placement.Top=25;
      sl.lnVert.Placement.Right=0;
    };

    sl.lbHeader=coAppUI.App.Components.Label.Create(sl,sl.Container,"lbHeader","lbFrontPageBoxWelcome",coLang.Table.Signup.AccountInfo);
    sl.lbHeader.Visible=true;
    sl.lbHeader.Placement.Mode.setTopLeft();
    sl.lbHeader.Placement.Top=10;
    sl.lbHeader.Placement.Left=10;

    sl.glCheck=coAppUI.App.Components.Glyph.Create(sl,sl.Container,"glCheck","glFrontPageBoxWelcome","","");
    sl.glCheck.Visible=true;
    sl.glCheck.Placement.Mode.setTopRight();
    sl.glCheck.Placement.Top=47;
    sl.glCheck.Placement.Right=0;
    sl.glCheck.setGlyph("");

    sl.txtAccount=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtAccount","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterAccount,coLang.Table.Signup.Username);
    sl.txtAccount.Visible=true;
    sl.txtAccount.Checked=false;
    sl.txtAccount.Exists=false;
    sl.txtAccount.AllowInput.setUsername();
    sl.txtAccount.Placement.Mode.setTopCenter();
    sl.txtAccount.Placement.Top=50;
    sl.txtAccount.onChange=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      sl.glCheck.setGlyph("");
      sl.txtAccount.Checked=false;
      sl.txtAccount.Exists=false;

      var sUser=sl.txtAccount.getCaption();
      if (sUser.length>=2){
        sl.btnNext.setDisabled();
        sl.glCheck.setGlyph("");
        sl.Torus.Start();
        coLogin.userExists(sUser,function(cmd){sl.onUserExistsError(cmd);},function(cmd){sl.onUserExistsSuccess(cmd);});
      };
    };
    sl.txtAccount.onNext=function(){
      var sl=this.Owner;
      if (sl.txtAccount.Checked==false) {
        var sUser=sl.txtAccount.getCaption();
        if (sUser.length>=2){
          sl.btnNext.setDisabled();
          sl.glCheck.setGlyph("");
          sl.Torus.Start();
          coLogin.userExists(sUser,function(cmd){sl.onUserExistsError(cmd);},function(cmd){sl.onUserExistsSuccess(cmd);});
        } else {
          sl.glCheck.setGlyph(coTheme.Icons.Error);
          coVDM.VDM.Status.Show(coLang.Table.Signup.EnterAccount,sl.Screen,sl.txtAccount);
          sl.txtAccount.Focus();
        };
      } else {
        sl.txtPass1.Focus();
      };
    };
    sl.onUserExistsSuccess=function(cmd){
      var sl=this;
      var Box=sl.Box;
      var sFirst=Box.Slides.SignupName.txtFirst.getCaption();
      sl.btnNext.setEnabled();
      sl.glCheck.setGlyph(coTheme.Icons.Error);
      sl.Torus.Stop();
      if (cmd.Code==coLogin.CO_STATUS_OK) {
        sl.txtAccount.Checked=true;
        sl.txtAccount.Exists=true;
        var sMessage=coLang.Table.Signup.AlreadyTaken.replace("$First",sFirst);
        sMessage=sMessage.replace("$User",cmd.UserName);
        coVDM.VDM.Status.Show(sMessage,sl.Screen,sl.txtAccount);
        sl.txtAccount.Focus();
      } else {
        sl.txtAccount.Checked=false;
        sl.txtAccount.Exists=false;
        var sMessage=coLang.Table.Signup.Error.replace("$First",sFirst);
        sMessage=sMessage.replace("$Code",cmd.Code);
        coVDM.VDM.Status.Show(sMessage,sl.Screen,sl.txtAccount);
      };
    };
    sl.onUserExistsError=function(cmd){
      var sl=this;
      var Box=sl.Box;
      var sFirst=Box.Slides.SignupName.txtFirst.getCaption();
      sl.btnNext.setEnabled();
      sl.Torus.Stop();
      sl.txtAccount.Checked=true;
      if (cmd.Code==coLogin.CO_STATUS_NOT_FOUND){
        sl.glCheck.setGlyph(coTheme.Icons.CheckMark);
        sl.txtAccount.Exists=false;
        var sMessage=coLang.Table.Signup.Valid.replace("$First",sFirst);
        sMessage=sMessage.replace("$User",cmd.UserName);
        coVDM.VDM.Status.Show(sMessage,sl.Screen,sl.txtAccount);
      } else {
        sl.glCheck.setGlyph(coTheme.Icons.Error);
        sl.txtAccount.Checked=false;
        sl.txtAccount.Exists=false;
        var sMessage=coLang.Table.Signup.Error.replace("$First",sFirst);
        sMessage=sMessage.replace("$Code",cmd.Code);
        coVDM.VDM.Status.Show(sMessage,sl.Screen,sl.txtAccount);
      };
    };

    sl.txtPass1=coAppUI.App.Components.Password.Create(sl,sl.Container,"txtPass1","txtFrontPageBoxWelcome",coLang.Table.Signup.EnterPassword,coLang.Table.Signup.Password);
    sl.txtPass1.Visible=true;
    sl.txtPass1.AllowInput.setUsername();
    sl.txtPass1.Placement.Mode.setTopCenter();
    sl.txtPass1.Placement.Top=95;
    sl.txtPass1.onNext=function(){
      var sl=this.Owner;
      sl.txtPass2.Focus();
    };

    sl.txtPass2=coAppUI.App.Components.Password.Create(sl,sl.Container,"txtPass2","txtFrontPageBoxWelcome",coLang.Table.Signup.ConfirmPassword,coLang.Table.Signup.Password2);
    sl.txtPass2.Visible=true;
    sl.txtPass2.AllowInput.setUsername();
    sl.txtPass2.Placement.Mode.setTopCenter();
    sl.txtPass2.Placement.Top=140;
    sl.txtPass2.onNext=function(){
      var sl=this.Owner;
      sl.txtForward.Focus();
    };
    sl.Validate=function(){
      var sl=this;
      if (sl.txtAccount.Container.value.length<2) {
        sl.txtAccount.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterDifferentAccount,sl.Screen,sl.txtAccount);
        return false;
      };
      if (sl.txtPass1.Container.value.length<5) {
        sl.txtPass1.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterPassword,sl.Screen,sl.txtPass1);
        return false;
      };
      if (sl.txtPass1.Container.value!=sl.txtPass2.Container.value) {
        sl.txtPass2.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.ConfirmPassword,sl.Screen,sl.txtPass2);
        return false;
      };
      if ( (sl.txtAccount.Checked!=true) || (sl.txtAccount.Exists==true) ){
        sl.txtAccount.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.EnterDifferentAccount,sl.Screen,sl.txtAccount);
        return false;
      };
      if ( (sl.txtForward.Container.value.length<5) || (sl.txtForward.Container.value.indexOf('@')==-1) ){
        sl.txtForward.Focus();
        coVDM.VDM.Status.Show(coLang.Table.Signup.ForwardAddress,sl.Screen,sl.txtForward);
        return false;
      };
      var act=coLogin.DB.Account;
      var rst=coLogin.DB.Roster;
      act.User.Value=sl.txtAccount.getCaption();
      act.Password.Value=sl.txtPass1.getCaption();
      act.Forward.Value=sl.txtForward.getCaption();
      act.Auth.Value=coEncryption.toMD5(act.User.Value+act.Password.Value);
      rst.Email.Value=act.User.Value+"@"+coLogin.NET_DOMAIN;
      rst.Email2.Value=act.Forward.Value;
      return true;
    };
    sl.txtForward=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtForward","txtFrontPageBoxWelcome",coLang.Table.Signup.ForwardAddress,coLang.Table.Signup.EmailAddress);
    sl.txtForward.Visible=true;
    sl.txtForward.Placement.Mode.setTopCenter();
    sl.txtForward.Placement.Top=185;
    sl.txtForward.onNext=function(){
      var sl=this.Owner;
      sl.btnNext.doClick();
    };

    sl.btnBack=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnBack","btnFrontPageBoxWelcome",coLang.Table.Buttons.Back);
    sl.btnBack.Visible=true;
    sl.btnBack.Placement.Mode.setTopLeft();
    sl.btnBack.Placement.Top=230;
    sl.btnBack.Placement.Left=17;
    sl.btnBack.onClick=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      sl.Conseal();
      var sLoc=Box.Slides.SignupLocation;
      sLoc.Reveal();
      Box.ShowCase.onAutoSize(Box.offsetWidth,sLoc.Container.scrollHeight+sLoc.Padding.Bottom);
      sl.Screen.setSize();
    };

    sl.btnNext=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnNext","btnFrontPageBoxWelcome",coLang.Table.Labels.Continue);
    sl.btnNext.Visible=true;
    sl.btnNext.Placement.Mode.setTopRight();
    sl.btnNext.Placement.Top=230;
    sl.btnNext.Placement.Right=17;
    sl.btnNext.onClick=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      sl.Torus.Start();
      if (sl.Validate()==true){
        // code here
        sl.btnNext.setDisabled();
        var rst=coLogin.DB.Roster;
        var act=coLogin.DB.Account;
        act.Roster.Value=rst.toXML();

        var sXML=coXML.Header+act.toXML();
        coLogin.userCreate(act.User.Value,act.Auth.Value,sXML,function(){sl.onSignupError();},function(){sl.onSignupComplete();});
        sXML.length=0;
        Box.ShowCase.Items.Welcome.AutoSize();
        sl.Screen.setSize();
      } else {
        sl.Torus.Stop();
      };
    };
    sl.lnFooter=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnFooter","lnFrontPageBoxWelcomeFooterH");
    sl.lnFooter.Visible=true;
    sl.lnFooter.Placement.Mode.setTopCenter();
    sl.lnFooter.Placement.Top=285;

    sl.onSignupComplete=function(){
      var sl=this;
      sl.Torus.Stop();
      var act=coLogin.DB.Account;
      if (coVDM.Display.Small!=true){
        sl.Box.Slides.Signup.Conseal();
      } else {
        sl.Box.ShowCase.Items.Login.Button.Select();
      };
      sl.Box.Slides.Login.Reveal();
      sl.Box.Slides.Login.txtUsername.setCaption(act.User.Value);
      sl.Box.Slides.Login.txtPassword.setCaption(act.Password.Value);
    };
    sl.onSignupError=function(netCMD){
      var sl=this;
      sl.Torus.Stop();
      var rst=coLogin.DB.Roster;
      var act=coLogin.DB.Account;
      coVDM.VDM.Status.Show(coLang.Table.Signup.getError(act.FirstName.Value,netCMD.Code),sl.Screen,sl.txtAccount);
    };
    sl.Conseal();
    return sl;
  },
  createDeviceAdd:function(Screen,Box,Slide){
    var sc=Screen;
    sl=Slide.Slides.createSlide("DeviceAdd","sldDeviceAdd",sc,Slide,Slide.Container,coAppUI.Alignment.Client);
    //sl=Box.Slides.createSlide("DeviceAdd","sldDeviceAdd",sc,Box,Box.Client,coAppUI.Alignment.Left);
    sl.Box=Box;
    sl.Unit=this;
    sl.clearContainerClass();


    sl.Torus=coAppUI.App.Components.Torus.Create(Screen.Frame,sl,sl.Container);
    sl.Torus.Placement.Mode.setTopCenter();
    sl.Torus.Placement.Top=150;

    sl.lbDevice=coAppUI.App.Components.Label.Create(sl,sl.Container,"lbDevice","lbFrontPageBoxWelcome",coLang.Table.Net.Login.Resource.Adding);
    sl.lbDevice.Visible=true;
    sl.lbDevice.Placement.Mode.setTopLeft();
    sl.lbDevice.Placement.Top=10;
    sl.lbDevice.Placement.Left=10;

    sl.lnVert=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnVert","lnFrontPageBoxWelcomeV");
    sl.lnVert.Visible=true;
    sl.lnVert.setHeight(150);
    sl.lnVert.Placement.Mode.setRightCenter();
    sl.lnVert.Placement.Top=25;
    sl.lnVert.Placement.Right=0;

    sl.txtNewDevice=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtNewDevice","txtFrontPageBoxWelcome",coLang.Table.Net.Login.ResourceName,coLang.Table.Net.Login.Resource.Name);
    sl.txtNewDevice.Visible=true;
    sl.txtNewDevice.AllowInput.setUsername();
    sl.txtNewDevice.Placement.Mode.setTopCenter();
    sl.txtNewDevice.Placement.Top=50;

    sl.cbNewDevice=coAppUI.App.Components.CheckBox.Create(sl,sl.Container,"cbNewDevice","cbFrontPageBoxWelcome",coLang.Table.Net.Login.Resource.SaveOn,coLang.Table.Net.Login.Resource.OkToSave);
    sl.cbNewDevice.Visible=true;
    sl.cbNewDevice.Placement.Mode.setTopCenter();
    sl.cbNewDevice.Placement.Top=95;

    sl.lnAddDevice=coAppUI.App.Components.Line.Create(sl,sl.Container,"lnAddDevice","lnFrontPageBoxWelcomeH");
    sl.lnAddDevice.Visible=true;
    sl.lnAddDevice.Placement.Mode.setTopCenter();
    sl.lnAddDevice.Placement.Top=140;

    sl.btnContinue=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnLogin","btnFrontPageBoxWelcome",coLang.Table.Labels.Continue);
    sl.btnContinue.Visible=true;
    sl.btnContinue.Placement.Mode.setTopRight();
    sl.btnContinue.Placement.Top=150;
    sl.btnContinue.Placement.Right=17;

    sl.Validate=function(){
      var sl=this;
      var DB=coVDM.App.Components.coDevice.List.DB;
      var sDevice=sl.txtNewDevice.getCaption();
      var dbExists=DB.getItem(DB.Fields.MAP.Name,sDevice);
      if (sDevice.length<2){
        coVDM.VDM.Status.Show(coLang.Table.Net.Login.ResourceNameContinue,sl.Screen,sl.txtNewDevice);
        return false;
      };
      if (dbExists){
        coVDM.VDM.Status.Show(coLang.Table.Net.Login.ResourceDupContinue,sl.Screen,sl.txtNewDevice);
        return false;
      };
      return true;
    };
    sl.btnContinue.onClick=function(){
      var sl=this.Owner;

      if (sl.Validate()==true){
        sl.btnContinue.setDisabled();
        var Box=sl.Owner;

        sl.Torus.Start();
        var rc=coVDM.App.Components.coDevice.List.DB.addItem();
        rc.MAP.Name.Value=sl.txtNewDevice.getCaption();
        if (sl.cbNewDevice.getChecked()==true)
          rc.MAP.Flags.Value=rc.MAP.Flags.Value | coVDM.App.Components.coDevice.FLAG_SAVE_SESSION;

        coVDM.App.Components.coDevice.List.cmdAdd.Data=rc;
        coVDM.App.Components.coDevice.List.cmdAdd.dataSend=coXML.Header+rc.toXML();
        coVDM.App.Components.coDevice.List.cmdAdd.reTry();
      };
    };
    sl.btnBack=coAppUI.App.Components.Button.Create(sl,sl.Container,"btnBack","btnFrontPageBoxWelcome",coLang.Table.Buttons.Back);
    sl.btnBack.Visible=true;
    sl.btnBack.Placement.Mode.setTopLeft();
    sl.btnBack.Placement.Top=150;
    sl.btnBack.Placement.Left=17;
    sl.btnBack.onClick=function(){
      var sl=this.Owner;
      var Box=sl.Box;
      sl.Conseal();
      Box.Slides.DeviceSelect.Reveal();
      sl.Screen.setSize();
    };

    sl.onResourceAdded=function(Resource){
      var sl=this;
      sl.Torus.Stop();
      sl.btnContinue.setEnabled();
      var Box=sl.Owner;
      var sc=sl.Screen;
      if (sc.Visible==true){
        sl.Torus.Stop;
      };
      sl.Screen.Hide();
    };
    sl.Conseal();
    return sl;
  }

};
