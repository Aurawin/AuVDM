coAccount.App.Components.Services = {
  Version        : new Version(2013,5,18,20),
  Title          : new Title("Account Services","Services"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAccount.App,'/core/vdm/account/Services.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var sc=Screen;
    var sl=sc.Slides.createSlide("Services","sldServices",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
    sl.vScroll=coAppUI.App.Components.vScroll.Create("vScroll",sc.Frame,sl,sl.Container,sl.Container);
    sl.VirtualMemory=sl.Slides.createSlide("VirtualMemory","sldSvcVM",sc,sl,sl.Container,coAppUI.Alignment.Top);
    sl.VirtualDisk=sl.Slides.createSlide("VirtualDisk","sldSvcVD",sc,sl,sl.Container,coAppUI.Alignment.Top);
    // Virtual Memory Code
    sl.VirtualMemory.Label=sl.VirtualMemory.Slides.createSlide("VirtualMemoryLabel","sldSvcVMLabel",sc,sl.VirtualMemory,sl.VirtualMemory.Container,coAppUI.Alignment.Left);
    sl.VirtualMemory.Value=sl.VirtualMemory.Slides.createSlide("VirtualMemoryValue","sldSvcVMValue",sc,sl.VirtualMemory,sl.VirtualMemory.Container,coAppUI.Alignment.Client);
    // Label Code
    sl.VirtualMemory.Banner=sl.VirtualMemory.Label.Slides.createSlide("VirtualMemoryBanner","sldSvcVMBanner",sc,sl.VirtualMemory.Label,sl.VirtualMemory.Label.Container,coAppUI.Alignment.Top);
    sl.VirtualMemory.Banner.setCaption(coLang.Table.Account.VirtualMemory);
    sl.VirtualMemory.Glyph=coAppUI.App.Components.Image.Create("VirtualMemoryGlyph","imgSvcVMGlyph",sc,sl.VirtualMemory.Label.Slides,sl.VirtualMemory.Label,sl.VirtualMemory.Label.Container,coAppUI.Alignment.Client);
    sl.VirtualMemory.Stamp=coAppUI.App.Components.Label.Create(sl.VirtualMemory.Glyph,sl.VirtualMemory.Glyph.Container);
    sl.VirtualMemory.Stamp.setCaption("28 MB");
    sl.VirtualMemory.Stamp.Container.className="Label lblMemoryStamp";
    // Value Code
    sl.VirtualMemory.Consumption=coAppUI.App.Components.Select.Create(sl.VirtualMemory.Value,sl.VirtualMemory.Value.Container);
    sl.VirtualMemory.Consumption.setClass("selSvcMemConsumption");
    sl.VirtualMemory.Consumption.Placement.Mode.setTopLeftRight();
    sl.VirtualMemory.Consumption.Placement.Top=10;
    sl.VirtualMemory.Consumption.Placement.Left=10;
    sl.VirtualMemory.Consumption.Placement.Right=10;
    sl.VirtualMemory.Consumption.onChange=function(){
      var DB=this.Owner.Screen.DB;
      var m=DB.ServerMemory.Items[this.itemIndex];
      var sCaption= (this.itemIndex==0) ?  coLang.Table.Commerce.NoCharge :  coLang.Table.Commerce.Symbol+m.MAP.Price.Value.toFixed(2)+coLang.Table.Commerce.Rate.AsPerMonth();
      this.Owner.Owner.Notice.setCaption( sCaption );
      this.Owner.Owner.Stamp.setCaption(m.MAP.Capacity.Value);
    };
    sl.VirtualMemory.Value.onResize=function(){
      this.Owner.Consumption.enforcePlacement();
      this.Owner.Notice.enforcePlacement();
    };
    sl.VirtualMemory.Notice=coAppUI.App.Components.Label.Create(sl.VirtualMemory.Value,sl.VirtualMemory.Value.Container);
    sl.VirtualMemory.Notice.setClass("lbSvcMemNotice");
    sl.VirtualMemory.Notice.setCaption("Free");
    sl.VirtualMemory.Notice.Placement.Mode.setTopLeftRight();
    sl.VirtualMemory.Notice.Placement.Top=60;
    sl.VirtualMemory.Notice.Placement.Left=20;
    sl.VirtualMemory.Notice.Placement.Right=20;

    sc.DB.ServerMemory.setOptions(sl.VirtualMemory.Consumption.Container);


    sl.VirtualMemory.clearContainerClass();
    sl.VirtualMemory.Label.clearContainerClass();
    sl.VirtualMemory.Banner.clearContainerClass();
    sl.VirtualMemory.Glyph.clearContainerClass();
    sl.VirtualMemory.Value.clearContainerClass();

    // Server Disk Storage Code

    sl.VirtualDisk.Label=sl.VirtualDisk.Slides.createSlide("VirtualDiskLabel","sldSvcVDLabel",sc,sl.VirtualDisk,sl.VirtualDisk.Container,coAppUI.Alignment.Left);
    sl.VirtualDisk.Value=sl.VirtualDisk.Slides.createSlide("VirtualDiskValue","sldSvcVDValue",sc,sl.VirtualDisk,sl.VirtualDisk.Container,coAppUI.Alignment.Client);
    // Label Code
    sl.VirtualDisk.Banner=sl.VirtualDisk.Label.Slides.createSlide("VirtualDiskBanner","sldSvcVDBanner",sc,sl.VirtualDisk.Label,sl.VirtualDisk.Label.Container,coAppUI.Alignment.Top);
    sl.VirtualDisk.Banner.setCaption(coLang.Table.Account.VirtualDisk);
    sl.VirtualDisk.Glyph=coAppUI.App.Components.Image.Create("VirtualDiskGlyph","imgSvcVDGlyph",sc,sl.VirtualDisk.Label.Slides,sl.VirtualDisk.Label,sl.VirtualDisk.Label.Container,coAppUI.Alignment.Client);
    sl.VirtualDisk.Stamp=coAppUI.App.Components.Label.Create(sl.VirtualDisk.Glyph,sl.VirtualDisk.Glyph.Container);
    sl.VirtualDisk.Stamp.setCaption("4 GB");
    sl.VirtualDisk.Stamp.Container.className="Label lblDiskStamp";
    // Value Code
    sl.VirtualDisk.Consumption=coAppUI.App.Components.Select.Create(sl.VirtualDisk.Value,sl.VirtualDisk.Value.Container);
    sl.VirtualDisk.Consumption.setClass("selSvcDiskConsumption");
    sl.VirtualDisk.Consumption.Placement.Mode.setTopLeftRight();
    sl.VirtualDisk.Consumption.Placement.Top=10;
    sl.VirtualDisk.Consumption.Placement.Left=10;
    sl.VirtualDisk.Consumption.Placement.Right=10;
    sl.VirtualDisk.Consumption.onChange=function(){
      var DB=this.Owner.Screen.DB;
      var m=DB.ServerStorage.Items[this.itemIndex];
      var sCaption= (this.itemIndex==0) ?  coLang.Table.Commerce.NoCharge :  coLang.Table.Commerce.Symbol+m.MAP.Price.Value.toFixed(2)+coLang.Table.Commerce.Rate.AsPerMonth();
      this.Owner.Owner.Notice.setCaption( sCaption );
      this.Owner.Owner.Stamp.setCaption(m.MAP.Capacity.Value);
      this.Owner.Owner.Glyph.setImage(m.MAP.Glyph.Value);
    };
    sl.VirtualDisk.Value.onResize=function(){
      this.Owner.Consumption.enforcePlacement();
      this.Owner.Notice.enforcePlacement();
    };
    sl.VirtualDisk.Notice=coAppUI.App.Components.Label.Create(sl.VirtualDisk.Value,sl.VirtualDisk.Value.Container);
    sl.VirtualDisk.Notice.setClass("lbSvcDiskNotice");
    sl.VirtualDisk.Notice.setCaption("Free");
    sl.VirtualDisk.Notice.Placement.Mode.setTopLeftRight();
    sl.VirtualDisk.Notice.Placement.Top=60;
    sl.VirtualDisk.Notice.Placement.Left=20;
    sl.VirtualDisk.Notice.Placement.Right=20;

    sc.DB.ServerMemory.setOptions(sl.VirtualMemory.Consumption.Container);
    sc.DB.ServerStorage.setOptions(sl.VirtualDisk.Consumption.Container);

    sl.VirtualDisk.clearContainerClass();
    sl.VirtualDisk.Label.clearContainerClass();
    sl.VirtualDisk.Banner.clearContainerClass();
    sl.VirtualDisk.Glyph.clearContainerClass();
    sl.VirtualDisk.Value.clearContainerClass();


    return sl;
  }
};
