coVDM.App.Components.coLogin = {
  Version        : new Version(2012,11,28,93),
  Title          : new Title("VDM Core Login","Login"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/vdm/login/coLogin.js',
  debugToConsole : true,
  RevealDelay    : 250,
  init : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/spc/coSpectrum.js',
        '/core/vdm/splash/coSplash.js',
        '/core/spc/cts/coContacts.js'
      ],
      coAppKit.NoDependencies,
      this.onInitialized
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.App.Initialized=true;
    return this;
  },
  onInitialized : function(App){
    App.Screen=App.Unit.VDM.Login=App.Unit.Create(App.Unit.VDM);
    App.Loaded=true;
  },
  InvokeSignup:function(){
    var sc=coVDM.App.Components.coLogin.App.Screen;
    sc.Show();
    sc.Nav.forceSelected(sc.Nav.gpSignup);
  },
  InvokeLogin:function(){
    var sc=coVDM.App.Components.coLogin.App.Screen;
    sc.Show();
    sc.Nav.forceSelected(sc.Nav.Home);
  },
  Create : function (aVDM){
    var _lgin=coAppScreens.createScreen(
      aVDM,
      "Login",
      "System",
      "Login",
      coVDM.Vendor.Organization,
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Frameless,
      "bdrLogin",
      "bdrLogin",
      ""
    );
    _lgin.Unit=this;
    _lgin.Step=0;
    _lgin.Frame.zIndexFactor=coVDM.zFactorLogin;
    _lgin.heightBase=_lgin.Container.offsetHeight;
    _lgin.heightAccount=235;
    _lgin.heightLocation=303;
    _lgin.heightName=272;
    _lgin.State=coApp.State.Normal;
    _lgin.Position=coApp.Position.TopCenter;
    _lgin.iconInApplications=false;
    _lgin.iconInTaskList=false;
    _lgin.AllowFullScreen=false;
    _lgin.AllowClose=false;

    _lgin.createAuth=function(){
      var sc=this;
      var _au=sc.Slides.createSlide("sldAuth","sldClient",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);

      _au.doKeyDown=function(e){
        var au=_au;
        if (e==undefined) e=window.event;
        switch (e.keyCode) {
          case 13:
            au.doNext();
            break;
          case 27:
            au.doBack();
            break;
        };
      };
      _au.doValueFocus=function(e){
        var au=_au;
        if (e==undefined) e=window.event;
        var sm=coVDM.VDM.Status;
        var el=coDOM.srcElement(e);
        switch (el){
          case (au.txtAccount):
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctName,au.Screen,el);
            break;
          case (au.txtPass):
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctPass,au.Screen,el);
            break;
          case (au.selResource):
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctResource,au.Screen,el);
            break;
          case (au.txtResource) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.ResourceNameContinue,au.Screen,el);
            break;
        };
      };

      _au.Logo=document.createElement('div');
      _au.LogoText=document.createElement('div');
      _au.Container.appendChild(_au.Logo);
      _au.Container.appendChild(_au.LogoText);
      _au.Logo.className=_lgin.Class+"Logo";
      _au.LogoText.className=_lgin.Class+"LgoTxt";
      _au.LogoTextPadding=new Padding();
      _au.LogoTextPadding.Load(_au.LogoText);
      coDOM.setText(_au.LogoText,coLang.Table.VDM.getWelcome());
      _au.LogoText.style.left="0px";
      _au.Logo.style.backgroundImage="url("+coTheme.Icons.Logo.Bottom+")";

      _au.PromptBox=document.createElement('div');
      _au.Container.appendChild(_au.PromptBox);
      _au.PromptBox.className=_lgin.Class+"PrmptBox";

      _au.txtAccount=document.createElement('input');
      _au.txtAccount.setAttribute("type","text");
      _au.PromptBox.appendChild(_au.txtAccount);
      _au.txtAccount.className=_lgin.Class+"Account";
      _au.txtAccount.onkeydown=_au.doKeyDown;
      _au.txtAccount.onfocus=_au.doValueFocus;
      _au.txtAccount.placeholder=coLang.Table.Net.Login.AcctNameHint;


      _au.txtPass=document.createElement('input');
      _au.txtPass.setAttribute("type","password");
      _au.PromptBox.appendChild(_au.txtPass);
      _au.txtPass.className=_lgin.Class+"Pass";
      _au.txtPass.onkeydown=_au.doKeyDown;
      _au.txtPass.onfocus=_au.doValueFocus;
      _au.txtPass.placeholder=coLang.Table.Net.Login.AcctPassHint;

      _au.selResource=document.createElement('select');
      _au.PromptBox.appendChild(_au.selResource);
      _au.selResource.className=_lgin.Class+"Resource";
      _au.selResource.onfocus=_au.doValueFocus;
      _au.selResource.options.length=1;
      _au.selResource.options[0]=new Option(coLang.Table.Net.Login.Resource.Loading,0, false, false);

      _au.selSave=document.createElement('select');
      _au.PromptBox.appendChild(_au.selSave);
      _au.selSave.className=_lgin.Class+"Save";
      _au.selSave.options.length=2;
      _au.selSave.options[0]=new Option(coLang.Table.Net.Login.Resource.SaveOff,0, false, false);
      _au.selSave.options[1]=new Option(coLang.Table.Net.Login.Resource.SaveOn,1, false, false);


      _au.txtResource=document.createElement('input');
      _au.txtResource.setAttribute("type","text");
      _au.PromptBox.appendChild(_au.txtResource);
      _au.txtResource.className=_lgin.Class+"Resource";
      _au.txtResource.placeholder=coLang.Table.Net.Login.Resource.Name;
      _au.txtResource.onkeydown=_au.doKeyDown;
      _au.txtResource.onfocus=_au.doValueFocus;

      _au.btnDisableBack=document.createElement('div');
      _au.PromptBox.appendChild(_au.btnDisableBack);
      _au.btnDisableBack.className=_lgin.Class+"PrmptBtnDisable";
      _au.btnDisableBack.onmouseover=_au.setHint;

      _au.btnBack=document.createElement('div');
      _au.PromptBox.appendChild(_au.btnBack);
      _au.btnBack.className=_lgin.Class+"PrmptBack";
      _au.btnBack.style.backgroundImage="url("+coTheme.Icons.Buttons.Back+")";
      _au.evBtnBackClick=coEvents.Add(_au.btnBack,"click",function(e){ if (e==undefined) e=window.event; _au.doBack();},coEvents.Capture,coEvents.Active);
      _au.evBtnBackTouch=coEvents.Add(_au.btnBack,"touchstart",function(e) { if (e==undefined) e=window.event; _au.doBack();},coEvents.Capture,coEvents.Active);

      _au.btnDisableNext=document.createElement('div');
      _au.PromptBox.appendChild(_au.btnDisableNext);
      _au.btnDisableNext.className=_lgin.Class+"PrmptBtnDisable";
      _au.btnDisableNext.onmouseover=_au.setHint;
      _au.btnDisableNext.style.visibility="hidden";

      _au.btnNext=document.createElement('div');
      _au.PromptBox.appendChild(_au.btnNext);
      _au.btnNext.className=_lgin.Class+"PrmptNext";
      _au.btnNext.style.backgroundImage="url("+coTheme.Icons.Buttons.Forward+")";
      _au.btnNext.onmouseover=function(){
        _au.setHint();
      };
      _au.evBtnNextClick=coEvents.Add(_au.btnNext,"click",function(e){ if (e==undefined) e=window.event; _au.doNext();},coEvents.Capture,coEvents.Active);
      _au.evBtnNextTouch=coEvents.Add(_au.btnNext,"touchstart",function(e){ if (e==undefined) e=window.event; _au.doNext();},coEvents.NoCapture,coEvents.Active);

      _au.onSetSize=function(){
        var au=this;
        if (au.Visible==false) return;
        au.Logo.style.left=coApp.HalfWidth(au.Container,au.Logo)+"px";
        au.LogoText.style.width=au.LogoText.offsetParent.offsetWidth-au.LogoText.offsetLeft-au.LogoTextPadding.xBias()+"px";

        au.PromptBox.style.left=coApp.HalfWidth(au.Container,au.PromptBox)+"px";
        var iBdr=au.txtAccount.offsetWidth-au.txtAccount.clientWidth;
        var iLeft=au.PromptBox.clientWidth-au.btnBack.offsetLeft-au.btnBack.offsetWidth - iBdr;
        var iWidth=au.PromptBox.clientWidth-(2*au.txtAccount.offsetLeft)-(2*iBdr);
        au.txtAccount.style.width=iWidth+"px";
        au.txtPass.style.width=iWidth+"px";
        au.txtResource.style.width=iWidth+"px";
        au.selResource.style.width=iWidth+iBdr+"px";
        au.selSave.style.width=iWidth+iBdr+"px";
        au.btnNext.style.left=iLeft+"px";
        au.btnDisableNext.style.left=iLeft+"px";
      };
      _au.onShow=function(){
        var au=_au;
        document.title=coLang.Table.VDM.Login;
        au.Logo.style.visibility="visible";
        au.LogoText.style.visibility="visible";

        au.btnDisableBack.style.visibility="visible";
        au.btnDisableNext.style.visibility="hidden";
        au.txtAccount.disabled=false;
        au.txtAccount.style.visibility="visible";
        au.txtPass.disabled=false;
        au.txtPass.style.visibility="hidden";


        au.selResource.style.visibility="hidden";
        au.Step=0;

        //au.setHint();
        if (coVDM.VDM.Browser.MSIE==true) {
          au.DisableButtons();
          au.Step=6;
        } else {
          au.EnableButtons();
        };
      };
      _au.onHide=function(){
        var au=_au;
        au.txtAccount.value="";
        au.txtPass.value="";
        au.Logo.style.visibility="hidden";
        au.LogoText.style.visibility="hidden";
        au.btnDisableBack.style.visibility="hidden";
        au.btnDisableNext.style.visibility="hidden";
        au.txtAccount.style.visibility="hidden";
        au.txtPass.style.visibility="hidden";
        au.txtResource.style.visibility="hidden";
        au.selResource.style.visibility="hidden";
        au.selSave.style.visibility="hidden";
        coVDM.VDM.Status.Hide();
        au.txtAccount.blur();
        au.txtPass.blur();
        au.txtResource.blur();
        au.selResource.blur();
        au.selSave.blur();
      };
      _au.doNext=function(){
        var au=this;
        var bSetHint=true;
        switch (au.Step){
          case 0 :
            // Going to collect Password
            if (au.txtAccount.value.length>0) {
              coVDM.Credentials.User=au.txtAccount.value.toLowerCase();
              au.Step=1;
              //au.txtAccount.blur();
              au.txtPass.style.visibility="visible";
              if (coVDM.VDM.Browser.allowsFocus==true) au.txtPass.focus();
              au.txtResource.style.visibility="hidden";
              au.txtAccount.style.visibility="hidden";
              au.btnDisableBack.style.visibility="hidden";

              coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctPass,au.Screen,au.txtPass);
            } else {
              if (coVDM.VDM.Browser.allowsFocus==true) au.txtAccount.focus();
              coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctName,au.Screen,au.txtAccount);
            };
            break;
          case 1 :
            // Going to login
            if (au.txtPass.value.length>0) {
              coVDM.Credentials.Pass=au.txtPass.value;
              coVDM.Credentials.Auth=coEncryption.toMD5(coVDM.Credentials.User+coVDM.Credentials.Pass);
              au.Step=2;
              au.txtAccount.value="";
              au.txtPass.value="";
              au.txtResource.style.visibility="hidden";
              au.txtPass.style.visibility="hidden";
              au.txtAccount.style.visibility="visible";
              au.txtAccount.disabled=true;
              coVDM.VDM.Status.Show(coLang.Table.Net.Login.Verification,au.Screen,au.selResource);
              au.btnDisableNext.style.visibility="visible";
              au.btnDisableBack.style.visibility="visible";
              _lgin.VDM.Authenticate();
            };
            break;
          case 2 :
            // Password set, get Resource
            au.Step=3;
            au.txtAccount.style.visibility="hidden";
            au.txtPass.style.visibility="hidden";
            au.txtResource.style.visibility="hidden";
            au.btnDisableNext.style.visibility="visible";
            au.btnDisableBack.style.visibility="visible";
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.Verification,au.Screen,au.selResource);
            au.selResource.style.visibility="visible";
            break;
          case 3 :
            // Resources were just loaded
            au.Step=4;
            au.txtAccount.style.visibility="hidden";
            au.txtResource.style.visibility="hidden";
            au.txtPass.style.visibility="hidden";
            au.btnDisableNext.style.visibility="hidden";
            au.btnDisableBack.style.visibility="visible";
            au.selResource.style.visibility="visible";
            coVDM.VDM.Torus.Hide();
            break;
          case 4 :
            // Resource selection was made...
            au.Step=5;
            au.txtResource.style.visibility="hidden";
            au.txtAccount.style.visibility="hidden";
            au.txtPass.style.visibility="hidden";
            au.btnDisableBack.style.visibility="hidden";
            au.selResource.style.visibility="hidden";

            var sel=au.selResource;
            if ((sel.value==-1) || (sel.options.length==1) || (sel.value==coLang.Table.Net.Login.Resource.New) ) {
              // selection is to create a new resource...
              au.btnDisableNext.style.visibility="hidden";
              au.txtResource.style.visibility="visible";
            } else {
              var id=parseInt(sel.value);
              au.btnDisableNext.style.visibility="visible";
              _lgin.CompleteLogin(id);
              bSetHint=false;
            };
            break;
          case 5 :
            if (au.txtResource.value.length==0) return;
            // Resource selection was "New Device"
            // Resource was entered
            au.Step=6;
            au.txtAccount.style.visibility="hidden";
            au.txtPass.style.visibility="hidden";
            au.btnDisableNext.style.visibility="hidden";
            au.btnDisableBack.style.visibility="hidden";
            au.selResource.style.visibility="hidden";
            au.txtResource.style.visibility="hidden";
            au.selSave.style.visibility="visible";
            break;
          case 6 :
            // Resource selection was "New Device"
            // Resource was entered,
            // Resource save login enter was confirmed
            var rc=coVDM.App.Components.coDevice.List.DB.addItem();
            rc.MAP.Name.Value=au.txtResource.value;
            if (au.selSave.options.selectedIndex==1)
              rc.MAP.Flags.Value=rc.MAP.Flags.Value | coVDM.App.Components.coDevice.FLAG_SAVE_SESSION;
            au.Step=7;
            au.txtAccount.style.visibility="hidden";
            au.txtPass.style.visibility="hidden";
            au.btnDisableNext.style.visibility="hidden";
            au.btnDisableBack.style.visibility="visible";
            au.selResource.style.visibility="hidden";
            au.txtResource.style.visibility="hidden";

            coVDM.App.Components.coDevice.List.cmdAdd.Data=rc;
            coVDM.App.Components.coDevice.List.cmdAdd.dataSend=coXML.Header+rc.toXML();
            coVDM.App.Components.coDevice.List.cmdAdd.reTry();

            break;
          case 7 :
            // Resource selection was "New Device"
            // Resource was entered
            au.Step=8;
            au.txtAccount.style.visibility="hidden";
            au.txtPass.style.visibility="hidden";
            au.btnDisableNext.style.visibility="visible";
            au.btnDisableBack.style.visibility="visible";
            au.selResource.style.visibility="hidden";
            au.txtResource.style.visibility="hidden";
            var rc=coVDM.App.Components.coDevice.List.getResourceByName(au.txtResource.value);
            _lgin.CompleteLogin(rc.MAP.ID.Value);
            bSetHint=false;
            break;
        };
        if (bSetHint==true) au.setHint();
      };
      _au.doBack=function(){
        var au=this;
        switch (au.Step){
          case 1 :
            // Going back to collect Username
            au.txtAccount.value=coVDM.Credentials.User;
            au.txtAccount.style.visibility="visible";
            au.txtPass.style.visibility="hidden";
            au.txtPass.value="";
            if (coVDM.VDM.Browser.allowsFocus==true) au.txtAccount.focus();
            au.txtAccount.select();
            au.Step=0;
            au.btnDisableNext.style.visibility="hidden";
            au.btnDisableBack.style.visibility="visible";
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctName,au.Screen,au.txtAccount);
            break;
          case 5 :
            au.Step=3;
            au.doNext();
            break;
          case 6 :
            au.Step=4;
            au.doNext();
            break;
        };
      };
      _au.resetHint=function(){
        var au=this;
        switch (au.Step) {
          case (0) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctName,au.Screen,au.txtAccount);
            break;
          case (1) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctPass,au.Screen,au.txtPass);
            break;
          case (2) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctPass,au.Screen,au.txtPass);
            break;
          case (3) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctResource,au.Screen,au.selResource);
            break;
          case (4) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctResource,au.Screen,au.selResource);
            break;
          case (5) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.ResourceName,au.Screen,au.txtResource);
            break;
          case (6) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.SaveLogin,au.Screen,au.selSave);
            break;
          case (7) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.getCreating(au.txtResource.value));
            break;
          };
      };
      _au.setHint=function(){
        var au=this;
        switch (au.Step) {
          case (0) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctContinueName,au.Screen,au.txtAccount);
            break;
          case (1) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctContinuePass,au.Screen,au.txtPass);
            break;
          case (2) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctContinuePass,au.Screen,au.txtPass);
            break;
          case (3) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctContinueRecource,au.Screen,au.selResource);
            break;
          case (4) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.AcctContinueRecource,au.Screen,au.selResource);
            break;
          case (5) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.ResourceNameContinue,au.Screen,au.txtResource);
            break;
          case (6) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.SaveLoginContinue,au.Screen,au.selSave);
            break;
          case (7) :
            coVDM.VDM.Status.Show(coLang.Table.Net.Login.Resource.getCreating(au.txtResource.value));
            break;
        };
      };
      _au.DisableButtons=function(){
        var au=this;
        au.btnDisableBack.style.visibility="visible";
        au.btnDisableNext.style.visibility="visible";
      };
      _au.EnableButtons=function(){
        var au=this;
        au.txtAccount.disabled=false;
        au.txtAccount.style.visibility="visible";
        au.txtPass.disabled=false;
        au.btnDisableBack.style.visibility="visible";
        au.btnDisableNext.style.visibility="hidden";
        au.txtPass.style.visibility="hidden";
        au.selResource.style.visibility="hidden";
        au.Step=0;
      }
      _au.resetHint();
      return _au;
    };

    _lgin.createSignup=function(){
      var sc=this;
      var _su=coObject.Create();
      _su.Step=0;
      _su.Screen=this;
      _su.Checked=false;
      _su.Validated=false;
      _su.toValidate=0;
      _su.Creating=false;
      _su.Contact=coSpectrum.Contacts.DB.createItem();
      _su.doAccountChange=function(){
        var su=_su;
        su.Validated=false;
        su.Checked=false;
        if (su.toValidate!=0)
          clearTimeout(su.toValidate);
        su.toValidate=setTimeout(
          function(){
            var txt=su.sldAcct.Panels.Account.Username.Value.Container;
            var sUser=txt.value;
            var sMessage=coLang.Table.Signup.Validating.replace("$User",sUser);
            coVDM.VDM.Status.Show(sMessage,su.Screen,txt);
            coLogin.userExists(sUser,su.onUserExistsError,su.onUserExistsSuccess);
          },
          coVDM.SignupValidationDelay
        );
      };
      _su.setSlide=function(step){
        var su=_su;
        var mnu=_lgin.Nav.gpSignup.Menu;
        if (step) su.Step=step;
        switch (su.Step) {
          case (1) :
            su.sldAddr.Conseal();
            su.sldAcct.Conseal();
            su.sldName.Reveal();
            mnu.setSelected(mnu.miName);
            break;
          case (2) :
            su.sldAcct.Conseal();
            su.sldName.Conseal();
            su.sldAddr.Reveal();
            mnu.setSelected(mnu.miAddr);
            break;
          case (3) :
            su.sldAddr.Conseal();
            su.sldName.Conseal();
            su.sldAcct.Reveal();
            mnu.setSelected(mnu.miAcct);
            break;
          case (4) :
            su.sldAddr.Conseal();
            su.sldAcct.Conseal();
            su.sldName.Conseal();
            boxSignup.style.display="none";
            boxName.style.display="none";
            boxAddr.style.display="none";
            su.doSignup();
            break;
        };
      };
      _su.onUserExistsError=function(Request){
        var su=_su;
        var suUser=su.sldAcct.Panels.Account.Username.Value.Container;
        var sm=coVDM.VDM.Status;
        var sFirst=su.sldName.Panels.Names.First.Value.Container.value;
        su.Checked=true;
        if (Request.Code==coLogin.CO_STATUS_NOT_FOUND){
          su.Validated=true;
          var sMessage=coLang.Table.Signup.Valid.replace("$First",sFirst);
          sMessage=sMessage.replace("$User",Request.UserName);
          sm.Show(sMessage,su.Screen,suUser);
        } else {
          su.Validated=false;
          var sMessage=coLang.Table.Signup.Error.replace("$First",sFirst);
          sMessage=sMessage.replace("$Code",Request.Code);
          sm.Show(sMessage,su.Screen,suUser);
        };
      };
      _su.onSignupError=function(Request){
        var su=_su;
        su.Step=0;
        su.Validated=false;
        su.Creating=false;
        var sm=coVDM.VDM.Status;
        var suUser=su.sldAcct.Panels.Account.Username.Value.Container;
        var txt=su.sldName.Panels.Names.First.Value.Container;
        var sFirst=txt.value;
        var sMessage=coLang.Table.Signup.Error.replace("$First",sFirst);
        sMessage=sMessage.replace("$Code",Request.Code);
        sm.Show(sMessage,su.Screen,suUser);
      };
      _su.onSignupComplete=function(Request){
        var su=_su;
        su.Step=0;
        su.Validated=true;
        su.Creating=false;

        var usrLogin=_lgin.sldAuth.txtAccount;
        var pwdLogin=_lgin.sldAuth.txtPass;

        var suFirst=su.sldName.Panels.Names.First.Value;
        var suMiddle=su.sldName.Panels.Names.Middle.Value;
        var suLast=su.sldName.Panels.Names.Last.Value;
        var suPhone=su.sldName.Panels.Contact.Phone.Value;

        var suAddr1=su.sldAddr.Panels.Locations.Address1.Value;
        var suAddr2=su.sldAddr.Panels.Locations.Address2.Value;
        var suCity=su.sldAddr.Panels.Locations.City.Value;
        var suState=su.sldAddr.Panels.Locations.State.Value;
        var suZip=su.sldAddr.Panels.Locations.Postal.Value;
        var suCountry=su.sldAddr.Panels.Locations.Country.Value;

        var suUser=su.sldAcct.Panels.Account.Username.Value;
        var suPass1=su.sldAcct.Panels.Security.Password1.Value;
        var suPass2=su.sldAcct.Panels.Security.Password2.Value;

        usrLogin.value=suUser.Container.value;
        pwdLogin.value=suPass1.Container.value;

        var sFirst=suFirst.Container.value;

        suUser.Container.value="";
        suFirst.Container.value="";
        suMiddle.Container.value="";
        suLast.Container.value="";
        suAddr1.Container.value="";
        suAddr2.Container.value="";
        suCity.Container.value="";
        suState.Container.value="";
        suZip.Container.value="";
        suPhone.Container.value="";
        suPass1.Container.value="";
        suPass2.Container.value="";
        suCountry.Container.value="";

        var sMessage=coLang.Table.Signup.Success.replace("$First",sFirst);
        sMessage=sMessage.replace("$User",Request.UserName);
        coVDM.VDM.Status.Show(sMessage,su.Screen,usrLogin);

        setTimeout(
          function(){
            _lgin.Nav.setSelected(_lgin.Nav.Home);
          },
          1000
        );

      };
      _su.onUserExistsSuccess=function(Request){
        var su=_su;
        var txt=su.sldName.Panels.Names.First.Value.Container;
        var suUser=su.sldAcct.Panels.Account.Username.Value.Container;
        var sFirst=txt.value;
        su.Validated=false;
        su.Checked=true;
        if (Request.Code==coLogin.CO_STATUS_OK) {
          var sMessage=coLang.Table.Signup.AlreadyTaken.replace("$First",sFirst);
          sMessage=sMessage.replace("$User",Request.UserName);
          coVDM.VDM.Status.Show(sMessage,su.Screen,suUser);
        } else {
          var sMessage=coLang.Table.Signup.Error.replace("$First",sFirst);
          sMessage=sMessage.replace("$Code",Request.Code);
          coVDM.VDM.Status.Show(sMessage,su.Screen,suUser);
        };
      };
      _su.doSignup=function(){
        var su=_su;
        if (su.Creating==true) return;
        var suFirst=su.sldName.Panels.Names.First.Value.Container;
        var suMiddle=su.sldName.Panels.Names.Middle.Value.Container;
        var suLast=su.sldName.Panels.Names.Last.Value.Container;
        var suPhone=su.sldName.Panels.Contact.Phone.Value.Container;

        var suAddr1=su.sldAddr.Panels.Locations.Address1.Value.Container;
        var suAddr2=su.sldAddr.Panels.Locations.Address2.Value.Container;
        var suCity=su.sldAddr.Panels.Locations.City.Value.Container;
        var suState=su.sldAddr.Panels.Locations.State.Value.Container;
        var suZip=su.sldAddr.Panels.Locations.Postal.Value.Container;
        var suCountry=su.sldAddr.Panels.Locations.Country.Value.Container;

        var suUser=su.sldAcct.Panels.Account.Username.Value.Container;
        var suPass1=su.sldAcct.Panels.Security.Password1.Value.Container;
        var suPass2=su.sldAcct.Panels.Security.Password2.Value.Container;
        var sm=coVDM.VDM.Status;
        if (suFirst.value.length==0) {
          su.setSlide(1);
          sm.Show(coLang.Table.Signup.InvalidFirstName,su.Screen,suFirst);
          suFirst.blur();
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suFirst.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suLast.value.length==0) {
          su.setSlide(1);
          sm.Show(coLang.Table.Signup.InvalidLastName,su.Screen,suLast);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suLast.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suPhone.value.length==0) {
          su.setSlide(1);
          sm.Show(coLang.Table.Signup.InvalidPhone,su.Screen,suPhone);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suPhone.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suAddr1.value.length==0) {
          su.setSlide(2);
          sm.Show(coLang.Table.Signup.InvalidAddress,su.Screen,suAddr1);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suAddr1.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suCity.value.length==0) {
          su.setSlide(2);
          sm.Show(coLang.Table.Signup.InvalidCity,su.Screen,suCity);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suCity.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suState.value.length==0) {
          su.setSlide(2);
          sm.Show(coLang.Table.Signup.InvalidState,su.Screen,suState);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suState.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suZip.value.length==0) {
          su.setSlide(2);
          sm.Show(coLang.Table.Signup.InvalidPost,su.Screen,suZip);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suZip.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suCountry.value.length==0) {
          su.setSlide(2);
          sm.Show(coLang.Table.Signup.InvalidCountry,su.Screen,suCountry);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suCountry.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suUser.value.length==0) {
          su.setSlide(3);
          sm.Show(coLang.Table.Signup.InvalidAccount,su.Screen,suUser);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suUser.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suPass1.value.length==0) {
          su.setSlide(3);
          sm.Show(coLang.Table.Signup.InvalidPassword,su.Screen,suPass1);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suPass1.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (suPass2.value!=suPass1.value) {
          su.setSlide(3);
          sm.Show(coLang.Table.Signup.InvalidConfirmPassword,su.Screen,suPass2);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suPass2.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        if (su.Validated==false) {
          sMsg=(su.Checked==true) ? coLang.Table.Signup.TakenAccount : coLang.Table.Signup.InvalidAccount;
          su.setSlide(3);
          sm.Show(sMsg,su.Screen,suUser);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suUser.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        };
        var act=coLogin.DB.Account;
        act.User.Value=suUser.value;
        act.FirstName.Value=suFirst.value;
        act.LastName.Value=suLast.value;
        act.Telephone.Value=suPhone.value;
        act.Password.Value=suPass1.value;
        act.Auth=coEncryption.toMD5(suUser.value+suPass1.value);

        var rstr=coLogin.DB.Roster;
        rstr.FirstName.Value=suFirst.value;
        rstr.LastName.Value=suLast.value;
        rstr.Email.Value=suUser.value+"@{$i domain_name}";
        rstr.Address1.Value=suAddr1.value;
        rstr.Address2.Value=suAddr2.value;
        rstr.City.Value=suCity.value;
        rstr.State.Value=suState.value;
        rstr.Zip.Value=suZip.value;
        rstr.Phone.Value=suPhone.value;

        act.Roster.Value=rstr.toXML();

        var sXML=coXML.Header+act.toXML();

        var sMessage=coLang.Table.Signup.Creating.replace("$First",act.FirstName.Value);
        sMessage=sMessage.replace("$User",act.User.Value);
        coVDM.VDM.Status.Show(sMessage,su.Screen,suUser);

        su.Creating=true;
        coLogin.userCreate(act.User.Value,act.Auth,sXML,su.onSignupError,su.onSignupComplete);
      };
      _su.doValueFocus=function(e){
        var su=_su;
        if (e==undefined) e=window.event;
        var sm=coVDM.VDM.Status;
        var el=coDOM.srcElement(e);

        var suFirst=su.sldName.Panels.Names.First.Value.Container;
        var suMiddle=su.sldName.Panels.Names.Middle.Value.Container;
        var suLast=su.sldName.Panels.Names.Last.Value.Container;
        var suPhone=su.sldName.Panels.Contact.Phone.Value.Container;

        var suAddr1=su.sldAddr.Panels.Locations.Address1.Value.Container;
        var suAddr2=su.sldAddr.Panels.Locations.Address2.Value.Container;
        var suCity=su.sldAddr.Panels.Locations.City.Value.Container;
        var suState=su.sldAddr.Panels.Locations.State.Value.Container;
        var suZip=su.sldAddr.Panels.Locations.Postal.Value.Container;

        var suUser=su.sldAcct.Panels.Account.Username.Value.Container;
        var suPass1=su.sldAcct.Panels.Security.Password1.Value.Container;
        var suPass2=su.sldAcct.Panels.Security.Password2.Value.Container;

        switch (el){
          case (suFirst) :
            sm.Show(coLang.Table.Signup.InvalidFirstName,su.Screen,suFirst);
            break;
          case (suMiddle) :
            sm.Show(coLang.Table.Signup.OptionalMiddleName,su.Screen,suMiddle);
            break;
          case (suLast) :
            sm.Show(coLang.Table.Signup.InvalidLastName,su.Screen,suLast);
            break;
          case (suPhone) :
            sm.Show(coLang.Table.Signup.InvalidPhone,su.Screen,suPhone);
            break;
          case (suAddr1) :
            sm.Show(coLang.Table.Signup.InvalidAddress,su.Screen,suAddr1);
            break;
          case (suAddr2) :
            sm.Show(coLang.Table.Signup.OptionalAddress2,su.Screen,suAddr2);
            break;
          case (suCity) :
            sm.Show(coLang.Table.Signup.InvalidCity,su.Screen,suCity);
            break;
          case (suState) :
            sm.Show(coLang.Table.Signup.InvalidState,su.Screen,suState);
            break;
          case (suZip) :
            sm.Show(coLang.Table.Signup.InvalidPost,su.Screen,suZip);
            break;
          case (suUser) :
            sm.Show(coLang.Table.Signup.InvalidAccount,su.Screen,suUser);
            break;
          case (suPass1) :
            sm.Show(coLang.Table.Signup.InvalidPassword,su.Screen,suPass1);
            break;
          case (suPass2) :
            sm.Show(coLang.Table.Signup.InvalidConfirmPassword,su.Screen,suPass2);
            break;
        };
      };
      _su.doKeyCheckUsername=function (e){
        var su=_su;
        var suPass1=su.sldAcct.Panels.Security.Password1.Value.Container;
        var suUser=su.sldAcct.Panels.Account.Username.Value.Container;
        if ( (e.keyCode==9) || (e.keyCode==13) ){
          e.keyCode=0;
          coDOM.preventDefault(e);
          if (coVDM.VDM.Browser.allowsFocus==true)
            setTimeout(function(){suPass1.focus();},coVDM.App.Components.coLogin.RevealDelay);
          return false;
        } else if (
          ( (e.keyCode>=coLogin.VALID_USERNAME_ALPHA_CAPS_LOW)  &&  (e.keyCode<=coLogin.VALID_USERNAME_ALPHA_CAPS_HI) ) ||
          ( (e.keyCode>=coLogin.VALID_USERNAME_ALPHA_LOW) &&  (e.keyCode<=coLogin.VALID_USERNAME_ALPHA_HI) ) ||
          ( (e.keyCode>=coLogin.VALID_USERNAME_NUM_LOW) &&  (e.keyCode<=coLogin.VALID_USERNAME_NUM_HI) ) ||
          (coLogin.VALID_USERNAME_CHARS.indexOf(e.keyCode)!=-1) ||
          (coLogin.VALID_INPUT_CHARATS.indexOf(e.keyCode)!=-1)

        ) {
          // not much to do
        } else {
          e.keyCode=0;
          coDOM.preventDefault(e);
          if (coVDM.VDM.Browser.allowsFocus==true)
            suUser.focus();
        };
      };
      _su.doKeyCheck=function (e){
        var su=_su;
        if (e==undefined) e=window.event;
        var suUser=su.sldAcct.Panels.Account.Username.Value.Container; // value element
        var el=coDOM.srcElement(e);

        if (el==suUser) su.Validated=false;

        if ( (e.keyCode==9) || (e.keyCode==13) ){
          var suFirst=su.sldName.Panels.Names.First.Value.Container;
          var suMiddle=su.sldName.Panels.Names.Middle.Value.Container;
          var suLast=su.sldName.Panels.Names.Last.Value.Container;
          var suPhone=su.sldName.Panels.Contact.Phone.Value.Container;

          var suAddr1=su.sldAddr.Panels.Locations.Address1.Value.Container;
          var suAddr2=su.sldAddr.Panels.Locations.Address2.Value.Container;
          var suCity=su.sldAddr.Panels.Locations.City.Value.Container;
          var suState=su.sldAddr.Panels.Locations.State.Value.Container;
          var suZip=su.sldAddr.Panels.Locations.Postal.Value.Container;
          var suCountry=su.sldAddr.Panels.Locations.Country.Value.Container;

          var suUser=su.sldAcct.Panels.Account.Username.Value.Container;
          var suPass1=su.sldAcct.Panels.Security.Password1.Value.Container;
          var suPass2=su.sldAcct.Panels.Security.Password2.Value.Container;

          switch (el) {
            case (suFirst) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suMiddle.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suMiddle) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suLast.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suLast) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suPhone.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suPhone) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              su.doSignup(2);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suAddr1.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suAddr1) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suAddr2.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suAddr2) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suCity.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suCity) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suState.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suState) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suZip.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suZip) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suCountry.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suCountry) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              su.doSignup(3);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suUser.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suUser) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suPass1.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suPass1) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              if (coVDM.VDM.Browser.allowsFocus==true)
                setTimeout(function(){suPass2.focus();},coVDM.App.Components.coLogin.RevealDelay);
              return false;
            case (suPass2) :
              e.keyCode=0;
              coDOM.preventDefault(e);
              // set caption to Create
              coDOM.setText(_lgin.Nav.gpSignup.Confirm.Control.OK,coLang.Table.Buttons.Create);
              return false;
          };
        };
      };
      _su.createNameSlide=function(){
        var cts=coSpectrum.Contacts;
        var sld=sc.Slides.createSlide("sldSignupName","sldClient",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
        sld.Signup=this;
        sld.Panels=coAppUI.App.Components.Panels.Create("Contact","pnlClientForList",sc.Frame,sc,sld.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOn);
        sld.Panels.Names=sld.Panels.createItem("",sld.Panels.Kind.Panels,"Names","pnlCollection",coAppUI.Alignment.Top);
        sld.Panels.Contact=sld.Panels.createItem("",sld.Panels.Kind.Panels,"Contact","pnlCollection",coAppUI.Alignment.Top);

        sld.Panels.Names.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",sc.Frame,sld.Panels.Names,sld.Panels.Names.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
        sld.Panels.Names.Caption=sld.Panels.Names.Panels.createCaption(coLang.Table.Signup.NameInfo,"Names","pnlCaption");

        sld.Panels.Names.First=sld.Panels.Names.Panels.createLabeledText(coLang.Table.Contact.First,"First","pnlField");
        sld.Panels.Names.First.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Names.First.Value.Container.onfocus=this.doValueFocus;
        sld.Panels.Names.First.DB.DataSet=cts.DB;
        sld.Panels.Names.First.DB.Field=cts.DB.FirstName;
        sld.Panels.Names.Middle=sld.Panels.Names.Panels.createLabeledText(coLang.Table.Contact.Middle,"Middle","pnlField");
        sld.Panels.Names.Middle.DB.DataSet=cts.DB;
        sld.Panels.Names.Middle.DB.Field=cts.DB.MiddleName;
        sld.Panels.Names.Middle.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Names.Middle.Value.Container.onfocus=this.doValueFocus;
        sld.Panels.Names.Last=sld.Panels.Names.Panels.createLabeledText(coLang.Table.Contact.Last,"Last","pnlField");
        sld.Panels.Names.Last.DB.DataSet=cts.DB;
        sld.Panels.Names.Last.DB.Field=cts.DB.LastName;
        sld.Panels.Names.Last.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Names.Last.Value.Container.onfocus=this.doValueFocus;

        sld.Panels.Contact.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",sc.Frame,sld.Panels.Contact,sld.Panels.Contact.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
        sld.Panels.Contact.Caption=sld.Panels.Contact.Panels.createCaption(coLang.Table.Signup.PhoneInfo,"Phone","pnlCaption");

        sld.Panels.Contact.Phone=sld.Panels.Contact.Panels.createLabeledText(coLang.Table.Contact.Phone,"Phone","pnlField");
        sld.Panels.Contact.Phone.DB.DataSet=cts.DB;
        sld.Panels.Contact.Phone.DB.Field=cts.DB.Phone1;
        sld.Panels.Contact.Phone.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Contact.Phone.Value.Container.onfocus=this.doValueFocus;

        sld.Panels.setRecord(sld.Signup.Contact);
        return sld;
      };
      _su.createAddrSlide=function(){
        var cts=coSpectrum.Contacts;
        var sld=sc.Slides.createSlide("sldSignupAddr","sldClient",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
        sld.Signup=this;
        sld.Panels=coAppUI.App.Components.Panels.Create("Contact","pnlClientForList",sc.Frame,sc,sld.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOn);
        sld.Panels.Locations=sld.Panels.createItem("",sld.Panels.Kind.Panels,"Locations","pnlCollection",coAppUI.Alignment.Top);

        sld.Panels.Locations.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",sc.Frame,sld.Panels.Locations,sld.Panels.Locations.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
        sld.Panels.Locations.Caption=sld.Panels.Locations.Panels.createCaption(coLang.Table.Signup.LocationInfo,"Location","pnlCaption");

        sld.Panels.Locations.Address1=sld.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.Address,"Address1","pnlField");
        sld.Panels.Locations.Address1.DB.DataSet=cts.DB;
        sld.Panels.Locations.Address1.DB.Field=cts.DB.Address;
        sld.Panels.Locations.Address1.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Locations.Address1.Value.Container.onfocus=this.doValueFocus;
        sld.Panels.Locations.Address2=sld.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.Address,"Address2","pnlField");
        sld.Panels.Locations.Address2.DB.DataSet=cts.DB;
        sld.Panels.Locations.Address2.DB.Field=cts.DB.Address2;
        sld.Panels.Locations.Address2.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Locations.Address2.Value.Container.onfocus=this.doValueFocus;
        sld.Panels.Locations.City=sld.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.City,"City","pnlField");
        sld.Panels.Locations.City.DB.DataSet=cts.DB;
        sld.Panels.Locations.City.DB.Field=cts.DB.City;
        sld.Panels.Locations.City.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Locations.City.Value.Container.onfocus=this.doValueFocus;
        sld.Panels.Locations.State=sld.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.State,"State","pnlField");
        sld.Panels.Locations.State.DB.DataSet=cts.DB;
        sld.Panels.Locations.State.DB.Field=cts.DB.State;
        sld.Panels.Locations.State.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Locations.State.Value.Container.onfocus=this.doValueFocus;
        sld.Panels.Locations.Postal=sld.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.Post,"Zipcode","pnlField");
        sld.Panels.Locations.Postal.DB.DataSet=cts.DB;
        sld.Panels.Locations.Postal.DB.Field=cts.DB.Postal;
        sld.Panels.Locations.Postal.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Locations.Postal.Value.Container.onfocus=this.doValueFocus;
        sld.Panels.Locations.Country=sld.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.Country,"Country","pnlField");
        sld.Panels.Locations.Country.DB.DataSet=cts.DB;
        sld.Panels.Locations.Country.DB.Field=cts.DB.Country;
        sld.Panels.Locations.Country.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Locations.Country.Value.Container.onfocus=this.doValueFocus;

        sld.Panels.setRecord(sld.Signup.Contact);

        return sld;
      };
      _su.createAcctSlide=function(){
        var cts=coSpectrum.Contacts;
        var sld=sc.Slides.createSlide("sldSignupAccount","sldClient",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
        sld.Signup=this;

        sld.Panels=coAppUI.App.Components.Panels.Create("Contact","pnlClientForList",sc.Frame,sc,sld.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOn);
        sld.Panels.Account=sld.Panels.createItem("",sld.Panels.Kind.Panels,"Account","pnlCollection",coAppUI.Alignment.Top);

        sld.Panels.Account.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",sc.Frame,sld.Panels.Account,sld.Panels.Account.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
        sld.Panels.Account.Caption=sld.Panels.Account.Panels.createCaption(coLang.Table.Signup.Account,"Signup","pnlCaption");

        sld.Panels.Account.Username=sld.Panels.Account.Panels.createLabeledText(coLang.Table.Signup.Username,"User","pnlField");
        sld.Panels.Account.Username.Value.Container.onkeydown=this.doKeyCheckUsername;
        sld.Panels.Account.Username.Value.Container.onchange=this.doAccountChange;
        sld.Panels.Account.Username.Value.Container.onfocus=this.doValueFocus;

        sld.Panels.Security=sld.Panels.createItem("",sld.Panels.Kind.Panels,"Security","pnlCollection",coAppUI.Alignment.Top);
        sld.Panels.Security.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",sc.Frame,sld.Panels.Security,sld.Panels.Security.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
        sld.Panels.Security.Caption=sld.Panels.Security.Panels.createCaption(coLang.Table.Signup.SecurityInfo,"Security","pnlCaption");

        sld.Panels.Security.Password1=sld.Panels.Security.Panels.createLabeledText(coLang.Table.Signup.Password,"Password1","pnlField");
        sld.Panels.Security.Password1.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Security.Password1.Value.Container.onfocus=this.doValueFocus;
        sld.Panels.Security.Password1.Value.Container.setAttribute("type", "password");
        sld.Panels.Security.Password2=sld.Panels.Security.Panels.createLabeledText(coLang.Table.Signup.Password2,"Password2","pnlField");
        sld.Panels.Security.Password2.Value.Container.onkeydown=this.doKeyCheck;
        sld.Panels.Security.Password2.Value.Container.onfocus=this.doValueFocus;
        sld.Panels.Security.Password2.Value.Container.setAttribute("type", "password");

        return sld;
      };
      _su.sldName=_su.createNameSlide();
      _su.sldAddr=_su.createAddrSlide();
      _su.sldAcct=_su.createAcctSlide();
      _su.getSlide=function(){
        var su=this;
        switch (su.Step) {
          case (0) : return su.sldName;
          case (1) : return su.sldAddr;
          case (2) : return su.sldAcct;
        };
        return null;
      };
      return _su;
    };

    _lgin.sldAuth=_lgin.createAuth();
    _lgin.Signup=_lgin.createSignup();
    _lgin.DevicesLoaded=function(){
      var lgn=_lgin;
      var sel=lgn.sldAuth.selResource;
      coVDM.App.Components.coDevice.List.DB.Fields.setOptions(sel);
      var iDX=sel.options.length;
      sel.options.length=iDX+1;
      sel.options[iDX]=new Option(coLang.Table.Net.Login.Resource.New,-1,false,false);
      if (lgn.Visible==true) {
        lgn.sldAuth.Step=3;
        lgn.sldAuth.doNext();
      } else{
        var rc=coVDM.App.Components.coDevice.List.getCurrentResource();
        if (rc) {
          lgn.CompleteLogin(rc.MAP.ID.Value);
        } else {
          lgn.Show();
          lgn.sldAuth.Step=3;
          lgn.sldAuth.doNext();
        };
      };
    };
    _lgin.resourceAdded=function(){
      var lgn=_lgin;
      var sel=lgn.sldAuth.selResource;
      coVDM.App.Components.coDevice.List.DB.Fields.setOptions(sel);
      var iDX=sel.options.length;
      sel.options.length=iDX+1;
      sel.options[iDX]=new Option(coLang.Table.Net.Login.Resource.New,-1,false,false);
      if (lgn.Visible==true) lgn.sldAuth.doNext();
    };
    _lgin.CompleteLogin=function(resourceID){
      var lgin=this;
      coVDM.VDM.Status.Hide();
      lgin.Hide();
      coVDM.VDM.Splash.Show();
      coVDM.Credentials.ResourceID=resourceID;
      coVDM.Manifest.cmdRead.Headers.Update(coNet.fieldRCID,resourceID);
      coVDM.Manifest.cmdRead.reTry();
      coSpectrum.Contacts.DB.Commands.List.reTry();
      coSpectrum.Folders.DB.Commands.ListFolders.reTry();
    };
    _lgin.Nav=coAppUI.App.Components.Nav.Create("Login","Nav",_lgin,_lgin.Slides,_lgin.Frame,_lgin.Frame.Client);
    _lgin.Nav.Home=_lgin.Nav.Items.addItem(
      _lgin.Nav.itemKind.Button,"Login",coLang.Table.Buttons.Login,
      _lgin.Nav.oAutoShowOn,
      _lgin.Nav.oCascadeOn,
      _lgin.Nav.oAddToShowList,
      _lgin.Nav.oSetAsDefaultOff,
      _lgin.Nav.NoTarget,
      _lgin.sldAuth,
      _lgin.Nav.NoShowList,
      [_lgin.Signup.sldName,_lgin.Signup.sldAddr,_lgin.Signup.sldAcct],
      _lgin.Nav.NoReturn,
      function(navItem){
        var lgin=navItem.Nav.Screen;
        lgin.Signup.sldAcct.Hide();
        lgin.Signup.sldAddr.Hide();
        lgin.Container.style.height=lgin.heightBase+"px";
        lgin.setSize();
      }
    );
    _lgin.Nav.btnSignup=_lgin.Nav.Items.addItem(
      _lgin.Nav.itemKind.Button,"Signup",coLang.Table.Buttons.Signup,
      _lgin.Nav.oAutoShowOn,
      _lgin.Nav.oCascadeOn,
      _lgin.Nav.oAddToShowList,
      _lgin.Nav.oSetAsDefaultOff,
      _lgin.Nav.NoTarget,
      _lgin.Nav.NoSlide,
      _lgin.Nav.NoShowList,
      [_lgin.sldAuth],
      _lgin.Nav.NoReturn,
      function(){
        coDOM.setText(_lgin.Nav.gpSignup.Confirm.Control.OK,coLang.Table.Buttons.Next);
      }
    );
    _lgin.Nav.btnTour=_lgin.Nav.Items.addItem(
      _lgin.Nav.itemKind.Button,"Tour",coLang.Table.Labels.Tour,
      _lgin.Nav.oAutoShowOn,
      _lgin.Nav.oCascadeOn,
      _lgin.Nav.oAddToShowList,
      _lgin.Nav.oSetAsDefaultOff,
      _lgin.Nav.NoTarget,
      _lgin.Nav.NoSlide,
      _lgin.Nav.NoShowList,
      _lgin.Nav.NoHideList,
      _lgin.Nav.NoReturn,
      function(){
        coVDM.App.Components.coTour.InvokeTour();
      }
    );
    _lgin.Nav.btnPolicies=_lgin.Nav.Items.addItem(
      _lgin.Nav.itemKind.Button,"Policies",coLang.Table.Labels.Policies,
      _lgin.Nav.oAutoShowOn,
      _lgin.Nav.oCascadeOn,
      _lgin.Nav.oAddToShowList,
      _lgin.Nav.oSetAsDefaultOff,
      _lgin.Nav.NoTarget,
      _lgin.Nav.NoSlide,
      _lgin.Nav.NoShowList,
      _lgin.Nav.NoHideList,
      _lgin.Nav.NoReturn,
      function(){
        coVDM.App.Components.coPolicies.InvokePolicies();
      }
    );
    _lgin.Nav.gpSignup=_lgin.Nav.Items.addItem(
      _lgin.Nav.itemKind.Group,"gpSignup","Signup",
      _lgin.Nav.oAutoShowOff,
      _lgin.Nav.oCascadeOn,
      _lgin.Nav.oNoShowList,
      _lgin.Nav.oSetAsDefaultOn,
      _lgin.Nav.NoTarget,
      _lgin.Nav.NoSlide,
      _lgin.Nav.NoShowList,
      [_lgin.sldAuth,_lgin.Nav.btnSignup,_lgin.Nav.btnTour,_lgin.Nav.btnPolicies],
      _lgin.Nav.NoHome,
      function(){
        _lgin.Nav.gpSignup.Return=_lgin.Nav.gpSignup;
        _lgin.Nav.gpSignup.Confirm.Return=_lgin.Nav.gpSignup;
        //_lgin.Signup.doSignup();
      }
    );
    _lgin.Nav.gpSignup.Menu=_lgin.Nav.gpSignup.Items.addItem(
      _lgin.Nav.itemKind.Menu,"Signup","Menu",
      _lgin.Nav.oAutoShowOff,
      _lgin.Nav.oCascadeOn,
      _lgin.Nav.oAddToShowList,
      _lgin.Nav.oSetAsDefaultOn,
      _lgin.Nav.NoTarget,
      _lgin.Nav.NoSlide,
      _lgin.Nav.NoShowList,
      _lgin.Nav.NoHideList,
      _lgin.Nav.NoReturn,
      _lgin.Nav.NoClick
    );
    _lgin.Nav.gpSignup.Menu.onMenuItemSelect=function(mnuItem){
      var lgin=_lgin;
      var slide=mnuItem.Data;
      switch (slide){
        case (lgin.Signup.sldName): {
          lgin.Signup.sldAcct.Conseal();
          lgin.Signup.sldAddr.Conseal();
          lgin.Signup.sldName.Reveal();
          lgin.Container.style.height=lgin.heightName+"px";
          lgin.setSize();
          break;
        }
        case (lgin.Signup.sldAddr): {
          lgin.Signup.sldName.Conseal();
          lgin.Signup.sldAcct.Conseal();
          lgin.Signup.sldAddr.Reveal();
          lgin.Container.style.height=lgin.heightLocation+"px";
          lgin.setSize();
          break;
        }
        case (lgin.Signup.sldAcct): {
          lgin.Signup.sldName.Conseal();
          lgin.Signup.sldAddr.Conseal();
          lgin.Signup.sldAcct.Reveal();
          lgin.Container.style.height=lgin.heightAccount+"px";
          lgin.setSize();
          break;
        }
      };
      slide.Show();
    };
    _lgin.Nav.gpSignup.Menu.miName=_lgin.Nav.gpSignup.Menu.addItem(
      "Name",
      coLang.Table.Labels.Name,
      null,
      _lgin.Nav.gpSignup.Menu.onMenuItemSelect,
      _lgin.Signup.sldName
    );
    _lgin.Nav.gpSignup.Menu.miAddr=_lgin.Nav.gpSignup.Menu.addItem(
      "Address",
      coLang.Table.Labels.Location,
      null,
      _lgin.Nav.gpSignup.Menu.onMenuItemSelect,
      _lgin.Signup.sldAddr
    );
    _lgin.Nav.gpSignup.Menu.miAcct=_lgin.Nav.gpSignup.Menu.addItem(
      "Account",
      coLang.Table.Signup.Account,
      null,
      _lgin.Nav.gpSignup.Menu.onMenuItemSelect,
      _lgin.Signup.sldAcct
    );
    _lgin.Nav.gpSignup.Menu.Selected=_lgin.Nav.gpSignup.Menu.miName;
    _lgin.Nav.gpSignup.Menu.miName.SaveSelection=true;
    _lgin.Nav.gpSignup.Menu.miAddr.SaveSelection=true;
    _lgin.Nav.gpSignup.Menu.miAcct.SaveSelection=true;

    _lgin.Nav.gpSignup.Confirm=_lgin.Nav.gpSignup.Items.addItem(
      _lgin.Nav.itemKind.Confirm,"cnfSignup",[coLang.Table.Buttons.Next,coLang.Table.Buttons.Cancel],
      _lgin.Nav.oAutoShowOff,
      _lgin.Nav.oCascadeChildren,
      _lgin.Nav.oAddToShowList,
      _lgin.Nav.oSetAsDefaultOff,
      _lgin.Nav.gpSignup,
      _lgin.Nav.NoSlide,
      _lgin.Nav.NoShowList,
      _lgin.Nav.NoHideList,
      _lgin.Nav.gpSignup,
      [
        function(){ // Next
          var lgin=_lgin;
          lgin.Signup.doSignup();
        },
        function(){ // cancel
          var lgin=_lgin;
          lgin.Nav.gpSignup.Confirm.Return=lgin.Nav.Home;
          lgin.Nav.gpSignup.Return=lgin.Nav.Home;
        }
      ]
    );
    _lgin.Nav.btnSignup.Target=_lgin.Nav.gpSignup;

    _lgin.Nav.Home.ShowList.push(_lgin.Nav.btnSignup);
    _lgin.Nav.Home.ShowList.push(_lgin.Nav.btnTour);
    _lgin.Nav.Home.ShowList.push(_lgin.Nav.btnPolicies);

    _lgin.Nav.Home.HideList.push(_lgin.Nav.gpSignup);

    _lgin.onSetSize=function(){
      var lgin=this;
    };
    _lgin.onShow=function(){
      var lgin=this;
      lgin.Container.style.opacity=1;

      coVDM.VDM.WorkSpace.Button.Hide();

      coVDM.VDM.Splash.Hide();
      coVDM.VDM.Torus.Hide();
    };
    _lgin.onHide=function(){
      var lgin=this;
      lgin.Container.style.opacity=0;
      coVDM.VDM.WorkSpace.Button.Show();
    };
    return _lgin;
  }
};

coVDM.App.Components.coLogin.init(coVDM.VDM);
