coContacts.Recipients=coContacts.App.Components.Recipients = {
  Version        : new Version(2013,8,5,5),
  Title          : new Title("Spectrum Contact Recipients","Recipients"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coContacts.App,'/core/spc/cts/Recipients.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,Owner,Parent,Name){
    var _rs=coAppUI.App.Components.ListView.Create(Name+"Contacts","ListView",Screen,Screen.Slides,Owner,Parent,coAppUI.Alignment.Client);
    _rs.DataSet=coSpectrum.Contacts.DB;
    _rs.DataSet.Displays.push(_rs);

    _rs.kplTo=coList.kpList();
    _rs.kplCC=coList.kpList();
    _rs.kplBCC=coList.kpList();
      /*
      _rs.onCmdComplete=function(netCMD){
        var rs=_rs;
      };
      _rs.onCmdError=function(netCMD){
        var rs=_rs;
      };
      _rs.onCmdTimeOut=function(netCMD){
        var rs=_rs;
      };
      _rs.onListComplete=function(netCMD){
        var rs=_rs;
        if (netCMD.Code==coNet.CO_STATUS_OK){
          rs.DB.Loaded=true;
          var xDoc=netCMD.Net.Parser.Parse(netCMD.dataRecv);
          var xItem=coXML.getStanza(xDoc,rs.DB.Stanza,xDoc.documentElement);
          rs.DB.fromXML(xDoc,xItem);
          rs.Load();
        };
      };
      _rs.onAddComplete=function(netCMD){
        var rs=_rs;
        var li=netCMD.Data;
        var itm=li.Data;
        if (netCMD.Code==coNet.CO_STATUS_OK) {
          var xDoc=netCMD.Net.Parser.Parse(netCMD.dataRecv);
          var xItem=coXML.getStanza(xDoc,rs.DB.Stanza,xDoc.documentElement);
          itm.updateXML(xDoc,xItem);
          li.Update(itm);
        };
      };
      _rs.onReadComplete=function(netCMD){
        var rs=_rs;
      };
      _rs.onWriteComplete=function(netCMD){
        var rs=_rs;
        var li=netCMD.Data;
        var itm=li.Data;
        if (netCMD.Code==coNet.CO_STATUS_OK){
          li.Update(itm);
        };
      };
      _rs.onRefreshComplete=function(netCMD){
      };
      _rs.onDeleteComplete=function(netCMD){
        var rs=_rs;
        if (netCMD.Code==coNet.CO_STATUS_OK){
          var li=netCMD.Data;
          var cmd=li.Command;
          var dbItem=li.Data;
          cts.DB.Items.Remove(dbItem);
          cmd.Free();
          li.Free();
        };
      };
      */
      // contacts are autoLoaded on boot
    _rs.Header.Columns.addItem(_rs.DataSet.Fields.MAP.FirstName);
    _rs.Header.Columns.addItem(_rs.DataSet.Fields.MAP.MiddleName);
    _rs.Header.Columns.addItem(_rs.DataSet.Fields.MAP.LastName);
    _rs.Header.Columns.addItem(_rs.DataSet.Fields.MAP.Email);

    return _rs;
  }
};
