coContacts.DB=coContacts.App.Components.DB = {
  Version        : new Version(2014,10,28,14),
  Title          : new Title("Spectrum Contacts Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coContacts.App,'/core/spc/cts/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(){
    _ds=coDB.createCollection(coXML.Parser,"contacts","contact",coDB.HasItems,coDB.HasDisplays);
    _ds.Unit=this;
    _ds.Loaded=false;
    _ds.Items.DisplayMode.setValue(_ds.Items.DisplayMode.Multiple);
    _ds.Identity=_ds.ID=_ds.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    _ds.ResourceID=_ds.Fields.addField("ResourceID",coDB.Kind.Int64,"rcid",0,coDB.StreamOn);
    _ds.Fields.addField("AccountID",coDB.Kind.Int64,"auid",0,coDB.StreamOn);
    _ds.Fields.addField("AvatarID",coDB.Kind.Int64,"avid",0,coDB.StreamOn);

    _ds.Fields.addField("Subscription",coDB.Kind.Integer,"ssptn",0,coDB.StreamOn);
    _ds.Fields.addField("Modified",coDB.Kind.Double,"modified",0.0,coDB.StreamOn);
    _ds.Fields.addField("Status",coDB.Kind.String,"status",coLang.Table.Status.User.Offline,coDB.StreamOn);
    _ds.Fields.addField("FirstName",coDB.Kind.String,"name-first","",coDB.StreamOn);
    _ds.Fields.addField("MiddleName",coDB.Kind.String,"name-middle","",coDB.StreamOn);
    _ds.Fields.addField("LastName",coDB.Kind.String,"name-family","",coDB.StreamOn);
    _ds.Fields.addField("NickName",coDB.Kind.String,"name-nick","",coDB.StreamOn);
    _ds.Fields.MAP.FirstName.Caption=coLang.Table.Contact.First;
    _ds.Fields.MAP.MiddleName.Caption=coLang.Table.Contact.Middle;
    _ds.Fields.MAP.LastName.Caption=coLang.Table.Contact.Last;

    _ds.Fields.addField("Address",coDB.Kind.String,"addr1","",coDB.StreamOn);
    _ds.Fields.addField("Address2",coDB.Kind.String,"addr2","",coDB.StreamOn);
    _ds.Fields.addField("City",coDB.Kind.String,"city","",coDB.StreamOn);
    _ds.Fields.addField("State",coDB.Kind.String,"state","",coDB.StreamOn);
    _ds.Fields.addField("Post",coDB.Kind.String,"zip","",coDB.StreamOn);
    _ds.Fields.addField("Country",coDB.Kind.String,"cntry","",coDB.StreamOn);
    _ds.Fields.addField("URL",coDB.Kind.String,"url","",coDB.StreamOn);

    _ds.Fields.addField("Phone",coDB.Kind.String,"phn1","",coDB.StreamOn);
    _ds.Fields.addField("Phone2",coDB.Kind.String,"phn2","",coDB.StreamOn);
    _ds.Fields.addField("Phone3",coDB.Kind.String,"phn3","",coDB.StreamOn);
    _ds.Fields.addField("Phones",coDB.Kind.String,"phns","",coDB.StreamOn);
    _ds.Fields.addField("Email",coDB.Kind.String,"eml1","",coDB.StreamOn);
    _ds.Fields.addField("Email2",coDB.Kind.String,"eml2","",coDB.StreamOn);
    _ds.Fields.addField("Email3",coDB.Kind.String,"eml3","",coDB.StreamOn);
    _ds.Fields.addField("Emails",coDB.Kind.StringArray,"emls",coList.StringArray(),coDB.StreamOn);
    _ds.Fields.addField("Text",coDB.Kind.String,"txt1","",coDB.StreamOn);
    _ds.Fields.addField("Text2",coDB.Kind.String,"txt2","",coDB.StreamOn);
    _ds.Fields.addField("Text3",coDB.Kind.String,"txt3","",coDB.StreamOn);
    _ds.Fields.addField("Texts",coDB.Kind.StringArray,"txts",coList.StringArray(),coDB.StreamOn);
    _ds.Fields.addField("Folder",coDB.Kind.String,"fldr","",coDB.StreamOn);

    _ds.Fields.addField("Custom1",coDB.Kind.String,"fld1","",coDB.StreamOn);
    _ds.Fields.addField("Custom2",coDB.Kind.String,"fld2","",coDB.StreamOn);
    _ds.Fields.addField("Custom3",coDB.Kind.String,"fld3","",coDB.StreamOn);
    _ds.Fields.addField("Custom4",coDB.Kind.String,"fld4","",coDB.StreamOn);
    _ds.Fields.addField("Custom5",coDB.Kind.String,"fld5","",coDB.StreamOn);
    _ds.Fields.addField("Custom",coDB.Kind.StringArray,"flds",coList.StringArray(),coDB.StreamOn);
    _ds.cbSortByName=function(a, b){
      if (a.MAP.LastName.Value>b.MAP.LastName.Value) {
        return 1;
      } else if (a.MAP.LastName.Value<b.MAP.LastName.Value) {
        return -1;
      } else if (a.MAP.LastName.Value==b.MAP.LastName.Value) {
        if (a.MAP.FirstName.Value>b.MAP.FirstName.Value) {
          return 1;
        } else if (a.MAP.FirstName.Value<b.MAP.FirstName.Value) {
          return -1;
        };
      };
      return 1;
    };
    _ds.Sort=function(){
      this.Items.sort(this.cbSortByName);
    };
    _ds.Commands=coNet.createCommands(coVDM.VDM.Net);
    _ds.Commands.Owner=_ds;
    _ds.Commands.onCmdComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
    };
    _ds.Commands.onCmdError=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      if (ds.Unit.debugToConsole==true)
        coVDM.VDM.Console.Append(
          "".concat(
          " coSpectrum.App.Components.Contacts.DataSet.Commands.onCmdError",
          " ",netCMD.toString()
          )
        );
    };
    _ds.Commands.onCmdTimeOut=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      if (ds.Unit.debugToConsole==true)
        coVDM.VDM.Console.Append(
          "".concat(
          " coSpectrum.App.Components.Contacts.DataSet.Commands.onCmdTimeOut",
          " ",netCMD.toString()
          )
        );
    };
    _ds.Commands.onListComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      var cts=coSpectrum.Contacts;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        ds.Loaded=true;
        coVDM.VDM.Splash.checkContacts();
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,cts.DB.Stanza,xDoc.documentElement);
        ds.fromXML(xDoc,xItem);
        if (!cts.Me) cts.Me=cts.FindByEmail(coVDM.Credentials.getEmail());

        ds.Sort();
      };
      ds.Loaded=true;
    };
    _ds.Commands.onAddComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      var cts=coSpectrum.Contacts;
      var itm=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,cts.DB.Stanza,xDoc.documentElement);
        var lv=cts.Nav.gpOptions.Slide;
        itm.updateXML(xDoc,xItem);
        ds.Sort();
      };
    };
    _ds.Commands.onReadComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      var cts=coSpectrum.Contacts;
    };
    _ds.Commands.onWriteComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      var cts=coSpectrum.Contacts;
      //var li=netCMD.Data; todo change calling method from ListItem to it's Data
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,cts.DB.Stanza,xDoc.documentElement);
        dbItem.updateXML(xDoc,xItem);
        //li.Update(itm); no need - new system will update all displays
      };
    };
    _ds.Commands.onRefreshComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      var cts=coSpectrum.Contacts;
    };
    _ds.Commands.onDeleteComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      var cts=coSpectrum.Contacts;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var dbItem=netCMD.Data;
        dbItem.Free();
      };
    };
    _ds.Commands.onAddAvatarComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      var cts=coSpectrum.Contacts;
      //var li=netCMD.Data; todo change calling method from ListItem to it's Data
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,cts.DB.Stanza,xDoc.documentElement);
        dbItem.updateXML(xDoc,xItem);
        //li.Update(itm); no need - new system will update all displays
      };
    };
    _ds.Commands.onUpdateAvatarComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var ds=cmds.Owner;
      var cts=coSpectrum.Contacts;
      //var li=netCMD.Data; todo change calling method from ListItem to it's Data
      var dbItem=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,cts.DB.Stanza,xDoc.documentElement);
        dbItem.updateXML(xDoc,xItem);
        //li.Update(itm); no need - new system will update all displays
      };
    };
    _ds.Commands.List = _ds.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/cts/l",
      coNet.NoData,
      _ds.Commands.onListComplete,
      _ds.Commands.onCmdError,
      _ds.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _ds.Commands.Add = _ds.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/cts/ctc/a",
      coNet.NoData,
      _ds.Commands.onAddComplete,
      _ds.Commands.onCmdError,
      _ds.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _ds.Commands.Read = _ds.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/cts/ctc/r",
      coNet.NoData,
      _ds.Commands.onReadComplete,
      _ds.Commands.onCmdError,
      _ds.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _ds.Commands.Write = _ds.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/cts/ctc/w",
      coNet.NoData,
      _ds.Commands.onWriteComplete,
      _ds.Commands.onCmdError,
      _ds.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _ds.Commands.Refresh = _ds.Commands.createCommand(
      coVDM.VDM.Net,coSpectrum.NameSpace,
      "/cts/ctc/h",
      coNet.NoData,
      _ds.Commands.onRefreshComplete,
      _ds.Commands.onCmdError,
      _ds.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _ds.Commands.Delete  = _ds.Commands.createCommand(
      coVDM.VDM.Net,
      coSpectrum.NameSpace,
      "/cts/ctc/d",
      coNet.NoData,
      _ds.Commands.onDeleteComplete,
      _ds.Commands.onCmdError,
      _ds.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _ds.Commands.AddAvatar  = _ds.Commands.createCommand(
      coVDM.VDM.Net,
      "/core/avatar",
      "/a",
      coNet.NoData,
      _ds.Commands.onAddAvatarComplete,
      _ds.Commands.onCmdError,
      _ds.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _ds.Commands.UpdateAvatar  = _ds.Commands.createCommand(
      coVDM.VDM.Net,
      "/core/avatar",
      "/u",
      coNet.NoData,
      _ds.Commands.onAddAvatarComplete,
      _ds.Commands.onUpdateAvatarComplete,
      _ds.Commands.onCmdError,
      _ds.Commands.onCmdTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOff
    );
    _ds.Commands.Free=function(){
      var cmds=this;
      var ds=cmds.Owner;
      cmds.List.Free();
      cmds.Add.Free();
      cmds.Read.Free();
      cmds.Write.Free();
      cmds.Refresh.Free();
      cmds.Delete.Free();
      cmds.AddAvatar.Free();
      cmds=coUtils.Release(ds.Commands);
    };
    return _ds;
  }
};

