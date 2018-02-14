coSpectrum.App.Components.Projects = {
  Version        : new Version(2013,5,22,2),
  Title          : new Title("Spectrum Projects","Projects"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSpectrum.App,'/core/spc/pjs/Projects.js',coAppKit.PreLoaded),
  Unit           : '/core/spc/pjs/Project.js',
  debugToConsole : true,
  Create : function(Screen){
    var _pjs=coDB.createCollection(coXML.Parser,"projects","project",coDB.HasItems,coDB.HasDisplays);
    _pjs.Items.DisplayMode.setValue(_pjs.Items.DisplayMode.Multiple);
    _pjs._Priority=function(){
      this.Unknown=-1;
      this.Deprecated=0;
      this.Abandoned= 1;
      this.Normal=2;
      this.Important=3;
      this.Elevated= 4;
      this.High= 5;
      return this;
    };
    _pjs._Status=function(){
      this.Unknown=-1;
      this.Untouched=0;
      this.Assigned=1;
      this.Unassigned=2;
      this.Pending=3;
      this.Complete=4;
      this.Stopped=5;
      return this;
    };
    _pjs._Frequency=function(){
      this.Unknown= -1;
      this.Once= 0;
      this.Hourly= 1;
      this.Daily= 2;
      this.Weekly= 3;
      this.BiWeekly=4;
      this.SemiMonthly=5;
      this.Monthly= 6;
      this.Quartly=7;
      this.Seasonly= 8;
      this.Annually= 9;
      this.OneYear= 10;
      this.TwoYears= 11;
      this.ThreeYears=12;
      this.FourYears=13;
      this.FiveYears= 14;
      this.Specific= 15;
      return this;
    };
    _pjs.Priority=new _pjs._Priority();
    _pjs.Status=new _pjs._Status();
    _pjs.Frequency=new _pjs._Frequency();

    _pjs.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    _pjs.Fields.addField("GroupID",coDB.Kind.Int64,"gid",0,coDB.StreamOn);
    _pjs.Fields.addField("Created",coDB.Kind.DateTime,"created",0.0,coDB.StreamOn);
    _pjs.Fields.addField("Modified",coDB.Kind.DateTime,"modified",0.0,coDB.StreamOn);
    _pjs.Fields.addField("Due",coDB.Kind.DateTime,"due",0.0,coDB.StreamOn);
    _pjs.Fields.addField("Frequency",coDB.Kind.Integer,"hz",0,coDB.StreamOn);
    _pjs.Fields.addField("Priority",coDB.Kind.Integer,"priority",_pjs.Priority.Normal,coDB.StreamOn);
    _pjs.Fields.addField("Status",coDB.Kind.Integer,"status",_pjs.Status.Unknown,coDB.StreamOn);
    _pjs.Fields.addField("Team",coDB.Kind.Int64Array,"team",coList.Int64Array(),coDB.StreamOn);
    _pjs.Fields.addField("Admins",coDB.Kind.Int64Array,"admins",coList.Int64Array(),coDB.StreamOn);
    _pjs.Fields.addField("Files",coDB.Kind.Int64Array,"files",coList.Int64Array(),coDB.StreamOn);
    _pjs.Fields.addField("Comments",coDB.Kind.Int64Array,"comments",coList.Int64Array(),coDB.StreamOn);
    _pjs.Fields.addField("Issues",coDB.Kind.Int64Array,"issues",coList.Int64Array(),coDB.StreamOn);
    _pjs.Fields.addField("Caveats",coDB.Kind.Int64Array,"caveats",coList.Int64Array(),coDB.StreamOn);
    _pjs.Fields.addField("Skills",coDB.Kind.StringArray,"skills",coList.StringArray(),coDB.StreamOn);
    _pjs.Fields.addField("Title",coDB.Kind.String,"title","",coDB.StreamOn);
    _pjs.Fields.addField("Description",coDB.Kind.String,"description","",coDB.StreamOn);

    _pjs.Commands=coNet.createCommands(coVDM.VDM.Net);
    _pjs.Commands.Owner=_pjs;
    _pjs.Commands.onCmdComplete=function(netCMD){
      var cmds=this;
      var pjs=cmds.Owner;
    };
    _pjs.Commands.onCmdError=function(netCMD){
      var cmds=this;
      var pjs=cmds.Owner;
    };
    _pjs.Commands.onCmdTimeOut=function(netCMD){
      var cmds=this;
      var pjs=cmds.Owner;
    };
    _pjs.Commands.List=coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/l",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.Add = coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/a",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.Read = coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/r",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.Write = coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/w",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.Refresh = coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/h",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.Delete  = coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/d",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.AdminsRead= coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/adms/r",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.AdminsWrite= coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/adms/w",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.AdminsCaveatsRead = coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/cvts/r",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.AdminsCaveatsWrite = coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/cvts/w",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.CommentsRead=coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/cmts/r",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.CommentsWrite=coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/cmts/w",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.IssuesRead=coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/iss/r",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.IssuesWrite=coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/iss/w",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.SkillsRead=coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/skls/r",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.SkillsWrite=coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/skls/w",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.StatusRead=coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/stat/r",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);
    _pjs.Commands.StatusWrite=coVDM.VDM.Net.Commands.createCommand(coVDM.VDM.Net,coSpectrum.NameSpace,"/pjs/pj/stat/w",coNet.NoData,_pjs.onCmdComplete,_pjs.onCmdError,_pjs.onCmdTimeOut,coNet.NoProgress,coNet.CreateSuspended,coNet.LingerOnComplete,coNet.AutoLoadOff);

    _pjs.Clear=function(){
      _pjs.Items.Clear();
    };
    _pjs.Add=function(sTitle){
      var itm=_pjs.Fields.fieldsItem("Project");
      if (sTitle) itm.Title.Value=sTitle;
      return itm;
    };
    _pjs.Delete=function(Name,Value){
      return _pjs.Items.deleteItem(Name,Value);
    };
    _pjs.onFree=function(){
      _pjs.Commands.Free();
      _pjs.Priority=null;
      _pjs.Status=null;
      _pjs.Frequency=null;
      _pjs.Items=null;
      // methods
      _pjs.Free=null;
      _pjs.Add=null;
      _pjs.Clear=null;

      _pjs=null;
    };
    return _pjs;
  }
};
