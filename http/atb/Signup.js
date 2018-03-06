coPartners.App.Components.Signup = {
  Version        : new Version(2014,1,15,7),
  Title          : new Title("Partners Views Signup","Signup"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPartners.App,'/partners/Signup.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Init : function(){

  },
  setContent : function(Screen,ShowCase,Item){
    var sc=Screen;
    var pg=Item.Page;
    pg.clearContainerClass();
    var sl=pg.Slides.ShowCase=coAppUI.App.Components.ShowCase.Create(
      "ShowCase",
      Screen.Class+"SignupShowCase",
      Screen,
      pg.Slides,
      pg,
      pg.Client,
      coAppUI.Alignment.Client
    );
    sl.scrollerTransitionEnd=function(e){
      var elm=coDOM.srcElement(e);
      var sl=elm.Owner;

      switch (sl.Items.Selected) {
        case (sl.Items.Name):{
          var frm=sl.Items.Name.Page.Slides.Form;
          frm.Controls.First.Focus();
          break;
        };
        case (sl.Items.Contact):{
          var frm=sl.Items.Contact.Page.Slides.Form;
          frm.Controls.Phone.Focus();
          break;
        };
        case (sl.Items.Business):{
          var frm=sl.Items.Business.Page.Slides.Form;
          frm.Controls.Membership.Focus();
          break;
        };
      };
    };
    sl.evtSlider=coEvents.Add(
      sl.Scroller,
      coDOM.TransitionEnd,
      sl.scrollerTransitionEnd,
      coEvents.NoCapture,
      coEvents.NoActivate
    );
    sl.PageItemPosition=coAppUI.Absolute;
    sl.PageClientPosition=coAppUI.Relative;
    sl.PageContentPosition=coAppUI.Relative;
    sl.Items.Name=sl.Items.addItem();
    sl.Items.Contact=sl.Items.addItem();
    sl.Items.Business=sl.Items.addItem();
    sl.Items.Thanks=sl.Items.addItem();

    sl.Buttons.setLabel(coLang.Table.Labels.Information);
    sl.Buttons.placeBottomInside();

    sl.onSubmitComplete=function(s){
      var sl=s.Owner;
      var frm=sl.Items.Name.Page.Slides.Form;


      var pg=sl.Items.Thanks.Page;

      var sName=frm.Controls.First.getCaption();
      var sText=coDOM.getHTML(pg.Content);

      sText=sText.replace("$FirstName",sName);
      coDOM.setHTML(pg.Client,sText);

      sl.Items.Name.Button.Conseal();
      sl.Items.Contact.Button.Conseal();
      sl.Items.Business.Button.Conseal();
      sl.Items.Thanks.Button.Reveal();
      sl.Items.Thanks.Button.Select();
    };
    sl.onSubmitError=function(s){
      var sl=s.Owner;

    };
    sl.Post=function(){
      var sl=this;
      var sData=(
        "au-eml-ns="+escape("Partners_Signup")+"&"+
        "au-eml-addr="+escape("partners@aurawin.com")+"&"+
        "au-eml-sbj="+escape("New Aurawin Partner")+"&"+
        "au-eml-bdy="+escape(
          "New Aurawin Partner Signup\r\n\r\n"+
          "{$i formdata}\r\n\r\n"+
          "Please process asap,\r\n"+
          "The Aurawin Business Development Team.\r\n\r\n"+
          "Email: partners@aurawin.com\r\n"+
          "Phone: 512.850.3117\r\n"+
          "Web: https://aurawin.com/partners\r\n"
        )+"&"+
        sl.Items.Serialize()
      );
      var s=coPostInfo.DB(sl,"PartnersSignup",sData,sl.onSubmitComplete,sl.onSubmitError);
    };

    sl.clearContainerClass();

    this.setNameForm(Screen,sl,sl.Items.Name);
    this.setContactForm(Screen,sl,sl.Items.Contact);
    this.setBusinessForm(Screen,sl,sl.Items.Business);
    this.setThanks(Screen,sl,sl.Items.Thanks);
  },
  setThanks:function(Screen,ShowCase,Item){
    var sc=Screen;
    Item.Button.setCaption(coLang.Table.Labels.ThankYou);
    Item.Button.Conseal();

    Item.Page.setURL(coPartners.App.Components.Content.urlSignupThanks);
  },
  setBusinessForm:function(Screen,ShowCase,Item){
    var sc=Screen;
    var bxBusiness=Item;
    Item.Button.setCaption(coLang.Table.Labels.Business);
    var sl=bxBusiness.Page.Slides.Form=bxBusiness.Page.Slides.createSlide(
      "SignupBusinessForm",
      sc.Class+"SignupBusinessForm",
      sc,
      bxBusiness.Page,
      bxBusiness.Page.Client,
      coAppUI.Alignment.Center
    );
    sl.Validate=function(){
      var sl=this;
      var sci=sl.Owner;
      var pg=sci.Owner;
      if (sl.Controls.Membership.selectedIndex()<1){
        pg.Items.Business.Button.Select();
        sl.Controls.Membership.Focus();
        coVDM.VDM.Status.Show(
          coLang.Table.Signup.Membership,
          sl.Screen,
          sl.Controls.Membership
        );
        return false;
      };
      if (sl.Controls.JSTrained.Container.value.length<1){
        pg.Items.Business.Button.Select();
        sl.Controls.JSTrained.Focus();
        coVDM.VDM.Status.Show(
          coLang.Table.Signup.EnterJSTrained,
          sl.Screen,
          sl.Controls.JSTrained
        );
        return false;
      };
      if (sl.Controls.AuVDMTrained.Container.value.length<1){
        pg.Items.Business.Button.Select();
        sl.Controls.AuVDMTrained.Focus();
        coVDM.VDM.Status.Show(
          coLang.Table.Signup.EnterAuVDMTrained,
          sl.Screen,
          sl.Controls.AuVDMTrained
        );
        return false;
      };
      if (sl.Controls.AuSCSTrained.Container.value.length<1){
        pg.Items.Business.Button.Select();
        sl.Controls.AuSCSTrained.Focus();
        coVDM.VDM.Status.Show(
          coLang.Table.Signup.EnterAuSCSTrained,
          sl.Screen,
          sl.Controls.AuSCSTrained
        );
        return false;
      };
      if (pg.Items.Name.Page.Slides.Form.Validate()==false)
        return false;
      if (pg.Items.Contact.Page.Slides.Form.Validate()==false)
        return false;
      return true;
    };
    var cmbo=sl.Controls.Membership=coAppUI.App.Components.Select.Create(
      sl,
      sl.Container,
      "Membership",
      sc.Class+"SignupBusinessFormMembership",
      coLang.Table.Signup.Level
    );
    cmbo.Placement.Mode.setTopLeftRight();
    cmbo.Placement.Top=10;
    cmbo.Placement.Left=10;
    cmbo.Placement.Right=10;
    cmbo.Visible=true;
    cmbo.onNext=function(){
      var sl=this.Owner;
      sl.Controls.JSTrained.Focus();
    };
    cmbo.addOption(coLang.Table.Labels.Member,coLang.Table.Labels.Member,false);
    cmbo.addOption(coLang.Table.Labels.Developer,coLang.Table.Labels.Developer,false);
    cmbo.addOption(coLang.Table.Labels.Enterprise,coLang.Table.Labels.Enterprise,false);
    var txt=sl.Controls.JSTrained=coAppUI.App.Components.Text.Create(
      sl,
      sl.Container,
      "JSTrained",
      sc.Class+"SignupBusinessFormJSTrained",
      coLang.Table.Signup.EnterJSTrained,
      coLang.Table.Signup.JSTrained
    );
    txt.Placement.Mode.setTopLeftRight();
    txt.Placement.Top=57;
    txt.Placement.Left=10;
    txt.Placement.Right=10;
    txt.Visible=true;
    txt.onNext=function(){
      var sl=this.Owner;
      sl.Controls.AuVDMTrained.Focus();
    };
    var txt=sl.Controls.AuVDMTrained=coAppUI.App.Components.Text.Create(
      sl,
      sl.Container,
      "AuVDMTrained",
      sc.Class+"SignupBusinessFormAuVDMTrained",
      coLang.Table.Signup.EnterAuVDMTrained,
      coLang.Table.Signup.AuVDMTrained
    );
    txt.Placement.Mode.setTopLeftRight();
    txt.Placement.Top=107;
    txt.Placement.Left=10;
    txt.Placement.Right=10;
    txt.Visible=true;
    txt.onNext=function(){
      var sl=this.Owner;
      sl.Controls.AuSCSTrained.Focus();
    };
    var txt=sl.Controls.AuSCSTrained=coAppUI.App.Components.Text.Create(
      sl,
      sl.Container,
      "AuSCSTrained",
      sc.Class+"SignupBusinessFormAuSCSTrained",
      coLang.Table.Signup.EnterAuSCSTrained,
      coLang.Table.Signup.AuSCSTrained
    );
    txt.Placement.Mode.setTopLeftRight();
    txt.Placement.Top=157;
    txt.Placement.Left=10;
    txt.Placement.Right=10;
    txt.Visible=true;
    txt.onNext=function(){
      var sl=this.Owner;
      sl.Controls.Next.doClick();
    };
    var btn=sl.Controls.Back=coAppUI.App.Components.Button.Create(
      sl,
      sl.Container,
      "SignupFormButton",
      sc.Class+"SignupFormButton",
      coLang.Table.Buttons.Back
    );
    btn.Visible=true;
    btn.Placement.Mode.setBottomLeft();
    btn.Placement.Bottom=10;
    btn.Placement.Left=10;
    btn.onClick=function(){
      var sl=this.Owner;
      var sci=sl.Owner;
      var pg=sci.Owner;
      pg.Items.Contact.Button.Select();
    };
    var btn=sl.Controls.Next=coAppUI.App.Components.Button.Create(
      sl,
      sl.Container,
      "SignupFormButton",
      sc.Class+"SignupFormButton",
      coLang.Table.Labels.Signup
    );
    btn.Visible=true;
    btn.Placement.Mode.setBottomRight();
    btn.Placement.Bottom=10;
    btn.Placement.Right=10;
    btn.onClick=function(){
      var sl=this.Owner;
      var sci=sl.Owner;
      var pg=sci.Owner;
      if (sl.Validate()==true) {
        pg.Post();
      };
    };


  },
  setContactForm:function(Screen,ShowCase,Item){
    var sc=Screen;
    var bxContact=Item;
    bxContact.Button.setCaption(coLang.Table.Labels.Contact);
    var sl=bxContact.Page.Slides.Form=bxContact.Page.Slides.createSlide(
      "SignupContactForm",
      sc.Class+"SignupContactForm",
      sc,
      bxContact.Page,
      bxContact.Page.Client,
      coAppUI.Alignment.Center
    );

    var txt=sl.Controls.Phone=coAppUI.App.Components.Text.Create(
      sl,
      sl.Container,
      "Phone",
      sc.Class+"SignupContactFormPhone",
      coLang.Table.Signup.EnterPhone,
      coLang.Table.Labels.Phone
    );
    txt.Placement.Mode.setTopLeftRight();
    txt.Placement.Top=10;
    txt.Placement.Left=10;
    txt.Placement.Right=10;
    txt.Visible=true;
    txt.onNext=function(){
      var sl=this.Owner;
      sl.Controls.Email.Focus();
    };
    var txt=sl.Controls.Email=coAppUI.App.Components.Text.Create(
      sl,
      sl.Container,
      "Email",
      sc.Class+"SignupContactFormEmail",
      coLang.Table.Signup.ForwardAddress,
      coLang.Table.Signup.EmailAddress
    );
    txt.Placement.Mode.setTopLeftRight();
    txt.Placement.Top=57;
    txt.Placement.Left=10;
    txt.Placement.Right=10;
    txt.Visible=true;
    txt.onNext=function(){
      var sl=this.Owner;
      sl.Controls.Website.Focus();
    };

    var txt=sl.Controls.Website=coAppUI.App.Components.Text.Create(
      sl,
      sl.Container,
      "Website",
      sc.Class+"SignupContactFormWebsite",
      coLang.Table.Signup.EnterWebsite,
      coLang.Table.Labels.Website
    );
    txt.Placement.Mode.setTopLeftRight();
    txt.Placement.Top=105;
    txt.Placement.Left=10;
    txt.Placement.Right=10;
    txt.Visible=true;
    txt.onNext=function(){
      var sl=this.Owner;
      sl.Controls.Next.doClick();
    };
    var btn=sl.Controls.Back=coAppUI.App.Components.Button.Create(
      sl,
      sl.Container,
      "SignupFormButton",
      sc.Class+"SignupFormButton",
      coLang.Table.Buttons.Back
    );
    btn.Visible=true;
    btn.Placement.Mode.setBottomLeft();
    btn.Placement.Bottom=10;
    btn.Placement.Left=10;
    btn.onClick=function(){
      var sl=this.Owner;
      var sci=sl.Owner;
      var pg=sci.Owner;
      pg.Items.Name.Button.Select();
    };
    var btn=sl.Controls.Next=coAppUI.App.Components.Button.Create(
      sl,
      sl.Container,
      "SignupFormButton",
      sc.Class+"SignupFormButton",
      coLang.Table.Buttons.Next
    );
    btn.Visible=true;
    btn.Placement.Mode.setBottomRight();
    btn.Placement.Bottom=10;
    btn.Placement.Right=10;
    btn.onClick=function(){
      var sl=this.Owner;
      var sci=sl.Owner;
      var pg=sci.Owner;
      if (sl.Validate()==true) {
        pg.Items.Business.Button.Select();
      };
    };

    sl.Validate=function(){
      var sl=this;
      var sci=sl.Owner;
      var pg=sci.Owner;
      if (sl.Controls.Phone.Container.value.length<2){
        pg.Items.Contact.Button.Select();
        sl.Controls.Phone.Focus();
        coVDM.VDM.Status.Show(
          coLang.Table.Signup.EnterPhone,
          sl.Screen,
          sl.Controls.Phone
        );
        return false;
      };
      if (sl.Controls.Email.Container.value.length<2){
        pg.Items.Contact.Button.Select();
        sl.Controls.Email.Focus();
        coVDM.VDM.Status.Show(
          coLang.Table.Signup.ForwardAddress,
          sl.Screen,
          sl.Controls.Email
        );
        return false;
      };
      if (sl.Controls.Website.Container.value.length<2){
        pg.Items.Contact.Button.Select();
        sl.Controls.Website.Focus();
        coVDM.VDM.Status.Show(
          coLang.Table.Signup.EnterWebsite,
          sl.Screen,
          sl.Controls.Website
        );
        return false;
      };
      return true;
    };

  },
  setNameForm:function(Screen,ShowCase,Item){
    var sc=Screen;
    var bxName=Item;
    bxName.Button.setCaption(coLang.Table.Labels.Name);

    var sl=bxName.Page.Slides.Nav=bxName.Page.Slides.createSlide(
      "SignupNameNav",
      sc.Class+"SignupNameNav",
      sc,
      bxName.Page,
      bxName.Page.Client,
      coAppUI.Alignment.Center
    );
    sl.clearContainerClass();

    var sl=bxName.Page.Slides.Form=bxName.Page.Slides.createSlide(
      "SignupNameForm",
      sc.Class+"SignupNameForm",
      sc,
      bxName.Page,
      bxName.Page.Client,
      coAppUI.Alignment.Center
    );
    var txt=sl.Controls.First=coAppUI.App.Components.Text.Create(
      sl,
      sl.Container,
      "First Name",
      sc.Class+"SignupNameFormFirst",
      coLang.Table.Signup.EnterFirstName,
      coLang.Table.Signup.NameFirst
    );
    txt.Placement.Mode.setTopLeftRight();
    txt.Placement.Top=10;
    txt.Placement.Left=10;
    txt.Placement.Right=10;
    txt.Visible=true;
    txt.onNext=function(){
      var sl=this.Owner;
      sl.Controls.Middle.Focus();
    };
    var txt=sl.Controls.Middle=coAppUI.App.Components.Text.Create(
      sl,
      sl.Container,
      "Middle Name",
      sc.Class+"SignupNameFormMiddle",
      coLang.Table.Signup.EnterMiddleName,
      coLang.Table.Signup.NameMiddle
    );
    txt.Visible=true;
    txt.Placement.Mode.setTopLeftRight();
    txt.Placement.Top=57;
    txt.Placement.Left=10;
    txt.Placement.Right=10;
    txt.onNext=function(){
      var sl=this.Owner;
      sl.Controls.Family.Focus();
    };

    var txt=sl.Controls.Family=coAppUI.App.Components.Text.Create(
      sl,
      sl.Container,
      "Family Name",
      sc.Class+"SignupNameFormFamily",
      coLang.Table.Signup.EnterFamilyName,
      coLang.Table.Signup.NameFamily
    );
    txt.Visible=true;
    txt.Placement.Mode.setTopLeftRight();
    txt.Placement.Top=105;
    txt.Placement.Left=10;
    txt.Placement.Right=10;
    txt.onNext=function(){
      var sl=this.Owner;
      sl.Controls.Next.doClick();
    };

    var btn=sl.Controls.Next=coAppUI.App.Components.Button.Create(
      sl,
      sl.Container,
      "SignupFormButton",
      sc.Class+"SignupFormButton",
      coLang.Table.Buttons.Next
    );
    btn.Visible=true;
    btn.Placement.Mode.setBottomRight();
    btn.Placement.Bottom=10;
    btn.Placement.Right=10;
    btn.onClick=function(){
      var sl=this.Owner;
      var sci=sl.Owner;
      var pg=sci.Owner;
      if (sl.Validate()==true) {
        pg.Items.Contact.Button.Select();
      };
    };
    sl.Validate=function(){
      var sl=this;
      var sci=sl.Owner;
      var pg=sci.Owner;
      if (sl.Controls.First.Container.value.length<2){
        pg.Items.Name.Button.Select();
        sl.Controls.First.Focus();
        coVDM.VDM.Status.Show(
          coLang.Table.Signup.EnterFirstName,
          sl.Screen,
          sl.Controls.First
        );
        return false;
      };
      if (sl.Controls.Family.Container.value.length<2){
        pg.Items.Name.Button.Select();
        sl.Controls.Family.Focus();
        coVDM.VDM.Status.Show(
          coLang.Table.Signup.EnterLastName,
          sl.Screen,
          sl.Controls.Family
        );
        return false;
      };
      return true;
    };
  }
};
coPartners.App.Components.Signup.Init();

