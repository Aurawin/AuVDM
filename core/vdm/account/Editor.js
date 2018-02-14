coAccount.App.Components.Editor = {
  Version        : new Version(2013,1,25,35),
  Title          : new Title("Account Editor","Editor"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAccount.App,'/core/vdm/account/Editor.js',coAppKit.PreLoaded),
  debugToConsole : true,
  createPayment : function(Screen,Switcher){
    var sc=Screen;
    var sl=Switcher.Slides.createSlide("Payments","sldPaymentEditor",sc,Switcher,Switcher.Container,coAppUI.Alignment.Client);
    sl.diNew=coPayments.App.Accounts.createItem();
    sl.diEdit=null;
    sl.Commit=function(dbItem){
      var sl=this;
      var itmMAP=dbItem.MAP;
      itmMAP.Alias.Value=sl.txtAlias.getCaption();
      itmMAP.Holder.Value=sl.txtCardHolder.getCaption();
      itmMAP.Number.Value=parseInt(sl.txtCardNumber.getCaption());
      itmMAP.ExpMonth.Value=parseInt(sl.selCardExpMonth.getCaption());
      itmMAP.ExpYear.Value=parseInt(sl.selCardExpYear.getCaption());
      itmMAP.Code.Value=parseInt(sl.txtCardCCV.getCaption());
    };
    sl.Load=function(dbItem){
      var sl=this;
      var sc=sl.Screen;
      var edt=sc.Switcher.Payment;
      sl.diEdit=dbItem;
      var itmMAP=sl.diEdit.MAP;

      edt.txtAlias.setCaption(itmMAP.Alias.Value);
      edt.txtCardHolder.setCaption(itmMAP.Holder.Value);
      edt.txtCardNumber.setCaption(itmMAP.Number.Value);
      edt.selCardExpMonth.setCaption(itmMAP.ExpMonth.Value);
      edt.selCardExpYear.setCaption(itmMAP.ExpYear.Value);
      edt.txtCardCCV.setCaption(itmMAP.Code.Value);
    };
    sl.onSetSize=function(){
      var sl=this;
      sl.txtAlias.enforcePlacement();
      sl.txtCardHolder.enforcePlacement();
      sl.txtCardNumber.enforcePlacement();
      sl.lbCardExp.enforcePlacement();
      sl.selCardExpMonth.enforcePlacement();
      sl.lbCardExpSep.enforcePlacement();
      sl.selCardExpYear.enforcePlacement();
      sl.txtCardCCV.enforcePlacement();
      sl.Footer.enforcePlacement();
    };
    sl.clearContainerClass();

    sl.vScroll=coAppUI.App.Components.vScroll.Create("vScroll",sc.Frame,sl,sl.Container,sl.Container);
    sl.Icon=coAppUI.App.Components.Image.Create("Card","imgPaymentAccountCard",sc,sl.Slides,sl,sl.Container);
    sl.txtAlias=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtAlias","txtPaymentAccountAlias",coLang.Table.Account.EnterAliasOfPayment,coLang.Table.Account.AliasOfPayment);
    sl.txtAlias.Placement.Mode.setTopLeftRight();
    sl.txtAlias.Placement.Top=32;
    sl.txtAlias.Placement.Left=130;
    sl.txtAlias.Placement.Right=32;

    sl.txtCardHolder=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtCardHolder","txtPaymentAccountCardHolder",coLang.Table.Account.EnterCardHolder,coLang.Table.Account.CardHolder);
    sl.txtCardHolder.Placement.Mode.setTopLeftRight();
    sl.txtCardHolder.Placement.Top=114;
    sl.txtCardHolder.Placement.Left=50;
    sl.txtCardHolder.Placement.Right=50;

    sl.txtCardNumber=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtCardNumber","txtPaymentAccountCardNumber",coLang.Table.Account.EnterCardNumber,coLang.Table.Account.CardNumber);
    sl.txtCardNumber.AllowInput.setNumeric();
    sl.txtCardNumber.Placement.Mode.setTopLeftRight();
    sl.txtCardNumber.Placement.Top=157;
    sl.txtCardNumber.Placement.Left=50;
    sl.txtCardNumber.Placement.Right=50;

    sl.lbCardExp=coAppUI.App.Components.Label.Create(sl,sl.Container,"lbCardExp","lbPaymentAccountCardExp",coLang.Table.Account.CardExpires);
    sl.lbCardExp.Placement.Mode.setTopRight();
    sl.lbCardExp.Placement.Top=200;
    sl.lbCardExp.Placement.Right=200;

    sl.selCardExpMonth=coAppUI.App.Components.Select.Create(sl,sl.Container,"selCardExpMonth","selPaymentAccountCardExpMonth");
    sl.selCardExpMonth.Placement.Mode.setTopRight();
    sl.selCardExpMonth.Placement.Top=200;
    sl.selCardExpMonth.Placement.Right=137;
    coLang.Table.Commerce.Payment.Months.setOptions(sl.selCardExpMonth.Container);
    sl.selCardExpMonth.setOptionsClass("optPaymentAccountCard");

    sl.lbCardExpSep=coAppUI.App.Components.Label.Create(sl,sl.Container,"lbCardExpSep","lbPaymentAccountCardExpSep",coLang.Table.Commerce.Rate.AsPer);
    sl.lbCardExpSep.Placement.Mode.setTopRight();
    sl.lbCardExpSep.Placement.Top=200;
    sl.lbCardExpSep.Placement.Right=120;

    sl.selCardExpYear=coAppUI.App.Components.Select.Create(sl,sl.Container,"selCardExpYear","selPaymentAccountCardExpYear");
    sl.selCardExpYear.Placement.Mode.setTopRight();
    sl.selCardExpYear.Placement.Top=200;
    sl.selCardExpYear.Placement.Right=48;
    coLang.Table.Commerce.Payment.Years.setOptions(sl.selCardExpYear.Container);
    sl.selCardExpYear.setOptionsClass("optPaymentAccountCard");

    sl.txtCardCCV=coAppUI.App.Components.Text.Create(sl,sl.Container,"txtCardCCV","txtPaymentAccountCardCCV",coLang.Table.Account.EnterCardVerification,coLang.Table.Account.CardCode);
    sl.txtCardCCV.AllowInput.setNumeric();
    sl.txtCardCCV.Placement.Mode.setTopRight();
    sl.txtCardCCV.Placement.Top=240;
    sl.txtCardCCV.Placement.Right=50;

    sl.Footer=coAppUI.App.Components.Line.Create(sl,sl.Container,"Footer","lnPaymentAccountFooter");
    sl.Footer.Placement.Mode.setTopLeft();
    sl.Footer.Placement.Top=316;


    sl.Validate=function(){
      var sl=this;
      var iLen=sl.txtAlias.Container.value.length;
      if ( (iLen==0) || (iLen>50) ) {
        sl.txtAlias.Container.focus();
        coVDM.VDM.Status.Show(coLang.Table.Account.InvalidAliasOfPayment,sl.Screen,sl.txtAlias);
        return false;
      };
      var iLen=sl.txtCardHolder.Container.value.length;
      if ( (iLen<=5) || (iLen>50)) {
        sl.txtCardHolder.Container.focus();
        coVDM.VDM.Status.Show(coLang.Table.Account.InvalidCardHolder,sl.Screen,sl.txtCardHolder);
        return false;
      };
      var iLen=sl.txtCardNumber.Container.value.length;
      if  ((iLen<=10) || (iLen>11)) {
        sl.txtCardNumber.Container.focus();
        coVDM.VDM.Status.Show(coLang.Table.Account.InvalidCardNumber,sl.Screen,sl.txtCardNumber);
        return false;
      };
      var iLen=sl.txtCardCCV.Container.value.length;
      if  ((iLen<=2)|| (iLen>5)) {
        sl.txtCardCCV.Container.focus();
        coVDM.VDM.Status.Show(coLang.Table.Account.InvalidCardVerification,sl.Screen,sl.txtCardCCV);
        return false;
      };
    };

    return sl;
  }
};
