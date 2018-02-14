coSpectrum.App.Components.Assemblies = {
  Version        : new Version(2013,5,22,4),
  Title          : new Title("Spectrum Assemblies","Assemblies"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSpectrum.App,'/core/spc/asms/Assemblies.js',coAppKit.PreLoaded),
  Unit           : '/core/spc/asms/Assemblies.js',
  debugToConsole : true,
  Create : function(){
    var _asms=coDB.createCollection(coXML.Parser,"assemblies","assembly",coDB.HasItems,coDB.HasDisplays);
    _asms.Items.DisplayMode.setValue(_asms.Items.DisplayMode.Multiple);
    _asms.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    _asms.Fields.addField("ParentID",coDB.Kind.Int64,"pid",0,coDB.StreamOn);
    _asms.Fields.addField("Created",coDB.Kind.DateTime,"created",0.0,coDB.StreamOn);
    _asms.Fields.addField("Modified",coDB.Kind.DateTime,"modified",0.0,coDB.StreamOn);
    _asms.Fields.addField("Scheduled",coDB.Kind.DateTime,"scheduled",0.0,coDB.StreamOn);
    _asms.Fields.addField("State",coDB.Kind.Integer,"state",0,coDB.StreamOn);
    _asms.Fields.addField("Privacy",coDB.Kind.Integer,"privacy",0,coDB.StreamOn);
    _asms.Fields.addField("Admins",coDB.Kind.Int64Array,"admins",coList.Int64Array(),coDB.StreamOn);
    _asms.Fields.addField("Files",coDB.Kind.Int64Array,"files",coList.Int64Array(),coDB.StreamOn);
    _asms.Fields.addField("Comments",coDB.Kind.Int64Array,"comments",coList.Int64Array(),coDB.StreamOn);
    _asms.Fields.addField("Assemblies",coDB.Kind.Int64Array,"assemblies",coList.Int64Array(),coDB.StreamOn);
    _asms.Fields.addField("Title",coDB.Kind.String,"title","",coDB.StreamOn);
    _asms.Fields.addField("Description",coDB.Kind.String,"description","",coDB.StreamOn);
    _asms.Fields.addField("Location",coDB.Kind.String,"location","",coDB.StreamOn);

    _asms.Commands=coNet.createCommands(coVDM.VDM.Net);
    _asms.Commands.onCmdComplete=function(netCMD){

    };
    _asms.Commands.onCmdError=function(netCMD){
    };
    _asms.Commands.onCmdTimeOut=function(netCMD){
    };
    _asms.Commands.List=coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/l",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.Add =coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/a",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.Read = coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/r",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.Write = coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/w",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.Refresh = coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/h",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.Delete  = coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/d",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );

    _asms.Commands.AdminsRead=coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/adns/r",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.AdminsWrite = coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/adns/w",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );

    _asms.Commands.FilesRead = coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/fls/r",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.FilesWrite= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/fls/w",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );

    _asms.Commands.CommentsRead= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/cmnts/r",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.CommentsWrite= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/cmnts/w",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );

    _asms.Commands.AssembliesRead= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/subs/r",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.AssembliesWrite= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/subs/w",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );

    _asms.Commands.StateRead= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/ste/r",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.StateWrite= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/ste/w",
      coNet.NoData,
      _asms.onCmdComplete,
      _asms.onCmdError,
      _asms.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );

    _asms.Commands.PrivacyRead= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/prcy/r",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.PrivacyWrite= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/prcy/w",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );

    _asms.Commands.ScheduledRead= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/sched/r",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _asms.Commands.ScheduledWrite= coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/asms/asm/sched/w",
      coNet.NoData,
      _asms.Commands.onCmdComplete,
      _asms.Commands.onCmdError,
      _asms.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );

    _asms.Clear=function(){
      _asms.Items.Clear();
    };
    _asms.Add=function(ID,ParentID,Created,Modified,Scheduled,State,Privacy,Title,Description,Location){
      var itm=_asms.Fields.fieldsItem("Assembly");
      if (ID) itm.ID.Value=ID;
      if (ParentID) itm.ParentID.Value=ParentID;
      if (Created) itm.Created.Value=Created;
      if (Modified) itm.Modified.Value=Modified;
      if (Scheduled) itm.Scheduled.Value=Scheduled;
      if (State) itm.State.Value=State;
      if (Privacy) itm.Privacy.Value=Privacy;
      if (Title) itm.Title.Value=Title;
      if (Description) itm.Description.Value=Description;
      if (Location) itm.Location.Value=Location;
      return itm;
    };
    _asms.Delete=function(Name,Value){
      return _asms.Items.deleteItem(Name,Value);
    };
    _asms.onFree=function(){
      _asms.Commands.Free();
      _asms.Clear();
      _asms.List=null;
      _asms=null;
    };
    return _asms;
  }
};
