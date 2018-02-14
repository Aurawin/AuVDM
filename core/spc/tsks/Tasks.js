coSpectrum.App.Components.Tasks = {
  Version        : new Version(2013,5,22,3),
  Title          : new Title("Spectrum Tasks","Tasks"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSpectrum.App,'/core/spc/tsks/Tasks.js',coAppKit.PreLoaded),
  Unit           : '/core/spc/tsks/Tasks.js',
  debugToConsole : true,
  Create : function(){
    var _tsks=coDB.createCollection(coXML.Parser,"tasks","task",coDB.HasItems,coDB.HasDisplays);
    _tsks.Items.DisplayMode.setValue(_tsks.Items.DisplayMode.Multiple);
    _tsks.onCmdComplete=function(netCMD){
      var tsks=_tsks;
    };
    _tsks.onCmdError=function(netCMD){
      var tsks=_tsks;
    };
    _tsks.onCmdTimeOut=function(netCMD){
      var tsks=_tsks;
    };
    _tsks._Priority=function(){
      this.Unknown=-1;
      this.Deprecated=0;
      this.Abandoned=1;
      this.Normal=2;
      this.Important=3;
      this.Elevated=4;
      this.High=5;
      return this;
    };
    _tsks._Status=function(){
      this.Unknown=-1;
      this.Untouched=0;
      this.Assigned=1;
      this.Unassigned=2;
      this.Pending=3;
      this.Complete=4;
      this.Stopped=5;
      return this;
    };
    _tsks._Frequency=function(){
      this.Unknown=-1;
      this.Once=0;
      this.Hourly=1;
      this.Daily=2;
      this.Weekly=3;
      this.BiWeekly=4;
      this.SemiMonthly=5;
      this.Monthly=6;
      this.Quartly=7;
      this.Seasonly=8;
      this.Annually=9;
      this.Specific=10;
      return this;
    };
    _tsks.Frequency=new _tsks._Frequency();
    _tsks.Priority=new _tsks._Priority();
    _tsks.Status=new _tsks._Status();

    _tsks.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    _tsks.Fields.addField("ProjectID",coDB.Kind.Int64,"pid",0,coDB.StreamOn);
    _tsks.Fields.addField("GroupID",coDB.Kind.Int64,"gid",0,coDB.StreamOn);
    _tsks.Fields.addField("Created",coDB.Kind.DateTime,"created",0.0,coDB.StreamOn);
    _tsks.Fields.addField("Modified",coDB.Kind.DateTime,"modified",0.0,coDB.StreamOn);
    _tsks.Fields.addField("Due",coDB.Kind.DateTime,"due",0.0,coDB.StreamOn);
    _tsks.Fields.addField("Creator",coDB.Kind.Int64,"creator",0,coDB.StreamOn);
    _tsks.Fields.addField("Frequency",coDB.Kind.Integer,"hz",0,coDB.StreamOn);
    _tsks.Fields.addField("Priority",coDB.Kind.Integer,"priority",_tsks.Priority.Normal,coDB.StreamOn);
    _tsks.Fields.addField("Status",coDB.Kind.Integer,"status",_tsks.Status.Unknown,coDB.StreamOn);
    _tsks.Fields.addField("Team",coDB.Kind.Int64Array,"team",coList.Int64Array(),coDB.StreamOn);
    _tsks.Fields.addField("Admins",coDB.Kind.Int64Array,"admins",coList.Int64Array(),coDB.StreamOn);
    _tsks.Fields.addField("Files",coDB.Kind.Int64Array,"files",coList.Int64Array(),coDB.StreamOn);
    _tsks.Fields.addField("Comments",coDB.Kind.Int64Array,"comments",coList.Int64Array(),coDB.StreamOn);
    _tsks.Fields.addField("Caveats",coDB.Kind.Int64Array,"caveats",coList.Int64Array(),coDB.StreamOn);
    _tsks.Fields.addField("Skills",coDB.Kind.StringArray,"skills",coList.StringArray(),coDB.StreamOn);
    _tsks.Fields.addField("Title",coDB.Kind.String,"title","",coDB.StreamOn);

    _tsks.Commands=coNet.createCommands(coVDM.VDM.Net);
    _tsks.Commands.List=_tsks.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/tsks/l",coNet.NoData,_tsks.onCmdComplete,_tsks.onCmdError,_tsks.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _tsks.Commands.Add = _tsks.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/tsks/tsk/a",coNet.NoData,_tsks.onCmdComplete,_tsks.onCmdError,_tsks.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _tsks.Commands.Read = _tsks.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/tsks/tsk/r",coNet.NoData,_tsks.onCmdComplete,_tsks.onCmdError,_tsks.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _tsks.Commands.Write = _tsks.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/tsks/tsk/w",coNet.NoData,_tsks.onCmdComplete,_tsks.onCmdError,_tsks.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _tsks.Commands.Refresh = _tsks.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/tsks/tsk/h",coNet.NoData,_tsks.onCmdComplete,_tsks.onCmdError,_tsks.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _tsks.Commands.Delete  = _tsks.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/tsks/tsk/d",coNet.NoData,_tsks.onCmdComplete,_tsks.onCmdError,_tsks.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _tsks.Commands.Delegate  = _tsks.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/tsks/tsk/dg",coNet.NoData,_tsks.onCmdComplete,_tsks.onCmdError,_tsks.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);

    _tsks.Clear=function(){
      _tsks.Items.Clear();
    };
    _tsks.Add=function(Title){
      var itm=_tsks.createItem();
      return itm;
    };
    _tsks.Delete=function(Name,Value){
      return _tsks.Items.deleteItem(Name,Value);
    };
    _tsks.onFree=function(){
      var tsks=_tsks;

      tsks.Commands.Free();

      tsks._Priority=null;
      tsks._Status=null;
      tsks._Frequency=null;
      tsks._Items=null;

      tsks.Priority=null;
      tsks.Status=null;
      tsks.Frequency=null;
      tsks.Items=null;
      // methods
      tsks.onFree=null;
      tsks.Add=null;
      tsks.Clear=null;

      tsks=null;
      _tsks=null;
    };
    return _tsks;

  }
};
