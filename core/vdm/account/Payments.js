coAccount.App.Components.Payments = {
  Version        : new Version(2014,4,2,31),
  Title          : new Title("Account Payment","Payment"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAccount.App,'/core/vdm/account/Payments.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;

    var sl=sc.Slides.createSlide("Payments","sldPayments",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);

    sl.MonthlyFees=sl.Slides.createSlide("MonthlyFees","sldMonthlyFees",sc,sl,sl.Container,coAppUI.Alignment.Top);
    sl.MonthlyFees.clearContainerClass();

    sl.MonthlyFees.Label=sl.MonthlyFees.Slides.createSlide("MonthlyFeesLabel","sldMonthlyFeesLabel",sc,sl.MonthlyFees,sl.MonthlyFees.Container,coAppUI.Alignment.Left);
    sl.MonthlyFees.Label.clearContainerClass();
    sl.MonthlyFees.Value=sl.MonthlyFees.Slides.createSlide("MonthlyFeesValue","sldMonthlyFeesValue",sc,sl.MonthlyFees,sl.MonthlyFees.Container,coAppUI.Alignment.Client);
    sl.MonthlyFees.Value.clearContainerClass();
    sl.MonthlyFees.Banner=sl.MonthlyFees.Label.Slides.createSlide("sldMonthlyFeesBanner","sldMonthlyFeesBanner",sc,sl.MonthlyFees.Label,sl.MonthlyFees.Label.Container,coAppUI.Alignment.Top);
    sl.MonthlyFees.Banner.setCaption(coLang.Table.Account.MonthlyFees);
    sl.MonthlyFees.Banner.clearContainerClass();

    sl.MonthlyFees.Notice=coAppUI.App.Components.Label.Create(sl.MonthlyFees.Value,sl.MonthlyFees.Value.Container);
    sl.MonthlyFees.Notice.setClass("lbMonthlyFeesNotice");
    sl.MonthlyFees.Notice.setCaption(coLang.Table.Account.NoCharge);
    sl.MonthlyFees.Notice.Placement.Mode.setTopLeftRight();
    sl.MonthlyFees.Notice.Placement.Top=14;
    sl.MonthlyFees.Notice.Placement.Left=20;
    sl.MonthlyFees.Notice.Placement.Right=20;
    sl.MonthlyFees.Notice.Visible=true;


    sl.ListView=coAppUI.App.Components.ListView.Create("ListView","ListView",sc,sl.Slides,sl,sl.Container,coAppUI.Alignment.Client);
    var dc=sl.ListView.DataSet=coPayments.App.Accounts;
    sl.ListView.Header.Columns.addItem(dc.Fields.MAP.Alias);
    sl.ListView.Header.Columns.addItem(dc.Fields.MAP.Card);
    sl.ListView.Header.Columns.addItem(dc.Fields.MAP.Expires);
    sl.ListView.Header.Columns.addItem(dc.Fields.MAP.Default);
    sl.SetMonthlyFee=function(dValue){
      var sl=this;
      if (dValue<=0){
        sl.MonthlyFees.Notice.setCaption(coLang.Table.Account.NoCharge);
        dValue=0;
      } else {
        sl.MonthlyFees.Notice.setCaption(dValue.toFixed(2));
      };
    };
    sl.invokeDelete=function(){
      var sl=this;
      var sc=sl.Screen;
      var cmds=sl.ListView.Commands;
      if (cmds.Mode.Index!=cmds.Mode.Default) cmds.Cancel();
      cmds.onConfirm=function(cmd){
        coPayments.App.Accounts.Commands.Delete(cmd.Item.Data);
      };
      cmds.setMode(cmds.Mode.Delete);
      sc.Nav.forceSelected(sc.Nav.gpPayments);
      sc.Nav.forceSelected(sc.Nav.gpPayments.cnfDelete);
    };
    dc.Displays.Add(sl.ListView);
    sl.ListView.onDoubleClick=function(item){
      var sc=this.Screen;
      var edt=sc.Switcher.Payment;
      edt.diEdit=(item) ? item.Data : null;
      if (edt.diEdit){
        edt.Load(edt.diEdit);
        sc.Switcher.Reveal();
        sc.Switcher.Nav.forceSelected(sc.Switcher.Nav.gpEditPayment);
      };
    };
    sl.Conseal();
    return sl;
  }
};
