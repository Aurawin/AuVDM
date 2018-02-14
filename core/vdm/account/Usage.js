coAccount.App.Components.Usage = {
  Version        : new Version(2013,5,18,31),
  Title          : new Title("Account Usage","Usage"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAccount.App,'/core/vdm/account/Usage.js',coAppKit.PreLoaded),
  debugToConsole : true,
  pbHeight       : 50,
  pbWidth        : 140,
  Create : function(Screen){
    var sc=Screen;
    var sl=sc.Slides.createSlide("Usage","sldUsage",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
    sl.vScroll=coAppUI.App.Components.vScroll.Create("vScroll",sc.Frame,sl,sl.Container,sl.Container);

    sl.VirtualMemory=sl.Slides.createSlide("VirtualMemory","sldVirtualMemory",sc,sl,sl.Container,coAppUI.Alignment.Top);
    sl.VirtualDisk=sl.Slides.createSlide("VirtualDisk","sldVirtualDisk",sc,sl,sl.Container,coAppUI.Alignment.Top);

    sl.VirtualMemory.Label=sl.VirtualMemory.Slides.createSlide("VirtualMemoryLabel","sldVirtualMemoryLabel",sc,sl.VirtualMemory,sl.VirtualMemory.Container,coAppUI.Alignment.Left);
    sl.VirtualMemory.Value=sl.VirtualMemory.Slides.createSlide("VirtualMemoryValue","sldVirtualMemoryValue",sc,sl.VirtualMemory,sl.VirtualMemory.Container,coAppUI.Alignment.Client);
    sl.VirtualMemory.Banner=sl.VirtualMemory.Label.Slides.createSlide("VirtualMemoryBanner","sldVirtualMemoryBanner",sc,sl.VirtualMemory.Label,sl.VirtualMemory.Label.Container,coAppUI.Alignment.Top);
    sl.VirtualMemory.Banner.setCaption(coLang.Table.Account.VirtualMemory);

    sl.VirtualMemory.Glyph=coAppUI.App.Components.Image.Create("VirtualMemoryGlyph","imgVirtualMemoryGlyph",sc,sl.VirtualMemory.Label.Slides,sl.VirtualMemory.Label,sl.VirtualMemory.Label.Container,coAppUI.Alignment.Client);
    sl.VirtualMemory.Value.onResize=function(){
      var val=this;
      var ui=this.Owner.Consumption;
      ui.Placement.Enforce(ui.Container);
      var ui=this.Owner.Usage;
      ui.Placement.Enforce(ui.Container);
    };

    sl.VirtualMemory.Consumption=coAppUI.App.Components.ProgressBar.Create(sl.VirtualMemory.Value,sl.VirtualMemory.Value.Container);
    sl.VirtualMemory.Consumption.Placement.Mode.setCenter();
    sl.VirtualMemory.Consumption.setSize(this.pbWidth,this.pbHeight);

    sl.VirtualMemory.Stamp=coAppUI.App.Components.Label.Create(sl.VirtualMemory.Glyph,sl.VirtualMemory.Glyph.Container);
    sl.VirtualMemory.Stamp.setCaption("28 MB");
    sl.VirtualMemory.Stamp.Container.className="Label lblMemoryStamp";

    sl.VirtualMemory.Usage=coAppUI.App.Components.Label.Create(sl.VirtualMemory.Value,sl.VirtualMemory.Value.Container);
    sl.VirtualMemory.Usage.Placement.Mode.setCenter();
    sl.VirtualMemory.Usage.setCaption("28 Megabytes");
    sl.VirtualMemory.Banner.setCaption(coLang.Table.Account.VirtualMemory);

    sl.VirtualDisk.Label=sl.VirtualDisk.Slides.createSlide("VirtualDiskLabel","sldVirtualDiskLabel",sc,sl.VirtualDisk,sl.VirtualDisk.Container,coAppUI.Alignment.Left);
    sl.VirtualDisk.Value=sl.VirtualDisk.Slides.createSlide("VirtualDiskLabel","sldVirtualDiskValue",sc,sl.VirtualDisk,sl.VirtualDisk.Container,coAppUI.Alignment.Client);
    sl.VirtualDisk.Banner=sl.VirtualDisk.Label.Slides.createSlide("VirtualDiskBanner","sldVirtualDiskBanner",sc,sl.VirtualMemory.Label,sl.VirtualDisk.Label.Container,coAppUI.Alignment.Top);
    sl.VirtualDisk.Glyph=coAppUI.App.Components.Image.Create("VirtualDiskGlyph","imgVirtualDiskGlyph",sc,sl.VirtualDisk.Label.Slides,sl.VirtualMemory.Label,sl.VirtualDisk.Label.Container,coAppUI.Alignment.Client);
    sl.VirtualDisk.Consumption=coAppUI.App.Components.ProgressBar.Create(sl.VirtualDisk.Value,sl.VirtualDisk.Value.Container);
    sl.VirtualDisk.Banner.setCaption(coLang.Table.Account.VirtualDisk);
    sl.VirtualDisk.Consumption.Placement.Mode.setCenter();
    sl.VirtualDisk.Consumption.setSize(this.pbWidth,this.pbHeight);
    sl.VirtualDisk.Usage=coAppUI.App.Components.Label.Create(sl.VirtualDisk.Value,sl.VirtualDisk.Value.Container);
    sl.VirtualDisk.Usage.Placement.Mode.setCenter();
    sl.VirtualDisk.Usage.setCaption("2 Gigabytes");
    sl.VirtualDisk.Value.onResize=function(){
      var val=this;
      var ui=this.Owner.Consumption;
      ui.Placement.Enforce(ui.Container);
      var ui=this.Owner.Usage;
      ui.Placement.Enforce(ui.Container);
    };
    sl.VirtualMemory.clearContainerClass();
    sl.VirtualMemory.Label.clearContainerClass();
    sl.VirtualMemory.Value.clearContainerClass();
    sl.VirtualMemory.Banner.clearContainerClass();
    sl.VirtualMemory.Glyph.clearContainerClass();

    sl.VirtualDisk.clearContainerClass();
    sl.VirtualDisk.Label.clearContainerClass();
    sl.VirtualDisk.Value.clearContainerClass();
    sl.VirtualDisk.Banner.clearContainerClass();
    sl.VirtualDisk.Glyph.clearContainerClass();
    sl.Synchronize=function(act){
      var sl=this;
      if (act.MAP.Quota.Value==0) act.MAP.Quota.Value=act.ServerStorage.AuDisk1.MAP.Size.Value;
      var iPct=coMath.Trunc((act.MAP.Consumption.Value/act.MAP.Quota.Value) * 100);
      var iUseGB=coMath.Trunc(act.MAP.Consumption.Value/(1024*1024*1024));
      var iMaxGB=coMath.Trunc(act.MAP.Quota.Value/(1024*1024*1024));
      sl.VirtualDisk.Consumption.setProgress(iPct);
      sl.VirtualDisk.Usage.setCaption(iUseGB+" GB of " + iMaxGB + " GB");
    };
    return sl;
  }
};

