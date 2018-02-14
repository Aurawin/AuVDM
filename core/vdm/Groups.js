coVDM.App.Components.Groups = {
  Version        : new Version(2014,10,31,6),
  Title          : new Title("VDM Core Groups","Groups"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/Groups.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create:function(){
    _ag=new Object();
    _ag.Unit=this;

    _ag.Selected=null;
    _ag.Loading=false;
    _ag.DB=coDB.createCollection(coXML.Parser,"groups", "group",coDB.HasItems);
    _ag.DB.Fields.ID=_ag.DB.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    _ag.DB.Fields.System=_ag.DB.Fields.addField("System",coDB.Kind.Boolean,"system",false,coDB.StreamOn);
    _ag.DB.Fields.Modified=_ag.DB.Fields.addField("Modified",coDB.Kind.Double,"modified",0.0,coDB.StreamOn);
    _ag.DB.Fields.Name=_ag.DB.Fields.addField("Name",coDB.Kind.String,"name","",coDB.StreamOn);
    _ag.DB.Fields.Description=_ag.DB.Fields.addField("Description",coDB.Kind.String,"description","",coDB.StreamOn);
    _ag.DB.Fields.setOptionValue(_ag.DB.Fields.ID);
    _ag.DB.Fields.setOptionName(_ag.DB.Fields.Name);
    _ag.Defaults=new Object();
    _ag.Defaults.Main=new Object();
    _ag.Defaults.Main.Name=coLang.Table.Groups.Main.Name;
    _ag.Defaults.Main.Description=coLang.Table.Groups.Main.Description;
    _ag.Defaults.System=new Object();
    _ag.Defaults.System.Name=coLang.Table.Groups.System.Name;
    _ag.Defaults.System.Description=coLang.Table.Groups.System.Description;
    _ag.Defaults.Spectrum=new Object();
    _ag.Defaults.Spectrum.Name=coLang.Table.Groups.Spectrum.Name;
    _ag.Defaults.Spectrum.Description=coLang.Table.Groups.Spectrum.Description;


    _ag.onAddComplete=function(netCMD){
      var ag=_ag;
      var itm=netCMD.Data;
      var xDoc=coXML.Parser.Parse(coXML.Parser,netCMD.dataRecv);
      itm.updateXML(xDoc,xDoc.documentElement);
      var pmpt=coVDM.VDM.Applications.kplGroups.Prompt;
      if (pmpt.Mode.Index>-1)
        pmpt.Views[pmpt.Mode.Index].holdItem.Data=itm;
      coVDM.VDM.Applications.kplGroups.Prompt.Hide();
   };
    _ag.onAddError=function(){
      var ag=_ag;
      coVDM.VDM.Applications.Frame.Shake();
    };
    _ag.onAddTimeOut=function(){
      var ag=_ag;
      coVDM.VDM.Applications.Frame.Shake();
    };
    _ag.onListComplete=function(netCMD){
      var ag=_ag;
      ag.Loading=true;
      var xDoc=netCMD.dataRecv;
      ag.DB.fromXML(xDoc,xDoc.documentElement);
      /*
      var cmbo=coVDM.VDM.Applications.cmboAppMove.Control;
      cmbo.disabled=false;
      ag.DB.Fields.setOptions(cmbo);
      */
      var kpl=coVDM.VDM.Applications.kplGroups;
      var itms=ag.DB.Items;
      //var menu=coVDM.VDM.Applications.mnuGroup.Control;
      var mfst=coVDM.Manifest;
      kpl.Loading=true;
      kpl.Items.Clear();
      //menu.Clear();
      ag.checkDefaults();
      for (var iLcv=0; iLcv<itms.length; iLcv++) {
        var itm=itms[iLcv];
        var sName=itm.getValue(ag.DB.Fields.Name);
        var sDescription=itm.getValue(ag.DB.Fields.Description);
        var kpItem=kpl.Items.Add(sName,sDescription);
        kpItem.Data=itm;
        itm.Display=kpItem;
        /*
        itm.MenuItem=menu.addItem(
          "AppGroup",sName,
          coVDM.VDM.Applications.Nav.NoTarget,
          coVDM.VDM.Applications.onMenuItemGroupSelect
        );
        itm.MenuItem.Data=itm;
        */
      };
      if (!ag.Selected){
        //var mnuItem=menu.getMenuItem(mfst.AppScreen.Group.Value);
        //ag.Selected = (!mnuItem) ? ag.getMain() : mnuItem.Data;
      };
      /*
      var mnuItem=menu.getMenuItem(ag.Selected.getValue(ag.DB.Fields.Name));
      if (mnuItem!=null)
        mnuItem.Menu.setSelected(mnuItem);
      */
      kpl.Loading=false;
      ag.Loading=false;
    };
    _ag.onListTimeOut=function(netCMD){
      var ag=_ag;
      //coVDM.VDM.Applications.cmboAppMove.Control.disabled=true;
    };
    _ag.onListError=function(netCMD){
      var ag=_ag;
      //coVDM.VDM.Applications.cmboAppMove.Control.disabled=true;
    };
    _ag.onDeleteComplete=function(netCMD){
      var ag=_ag;
      var xDoc=netCMD.dataRecv;
      var itm=netCMD.Data;
      var kplItem=itm.Display;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        itm.MenuItem.Free();
        itm=ag.DB.Items.Remove(itm);
        kplItem.Free();
        //ag.DB.Fields.setOptions(coVDM.VDM.Applications.cmboAppMove.Control);
      };
    };
    _ag.onDeleteError=function(netCMD){
      var ag=_ag;
      var kpl=coVDM.VDM.Applications.kplGroups;
      var xDoc=netCMD.dataRecv;
      var itm=netCMD.Data;
      var cmd=itm.Command;
    };
    _ag.onDeleteTimeOut=function(netCMD){
      var ag=_ag;
      var kpl=coVDM.VDM.Applications.kplGroups;
      var xDoc=netCMD.dataRecv;
      var itm=netCMD.Data;
      var cmd=itm.Command;
    };
    _ag.cmdList=coVDM.VDM.Net.Commands.createCommand(
      coVDM.VDM.Net,
      coVDM.NameSpace,
      coVDM.NS_GRPS_LIST,
      coNet.NoData,
      _ag.onListComplete,
      _ag.onListError,
      _ag.onListTimeOut,
      coNet.NoProgress,
      coNet.CreateSuspended,
      coNet.LingerOnComplete,
      coNet.AutoLoadOn
    );
    _ag.onLogOut=function(){
      var ag=_ag;
      ag.Selected=null;
      ag.DB.Items.Clear();
    };
    _ag.addGroup=function(sName,sDescription){
      var ag=_ag;
      var flds=ag.DB.Fields;
      var itm=ag.DB.addItem();
      itm.setValue(flds.Name,sName);
      itm.setValue(flds.Description,sDescription);
      var cmdAdd=coVDM.VDM.Net.Commands.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_GRPS_ADD,
        coXML.Header+itm.toXML(),
        _ag.onAddComplete,
        _ag.onAddError,
        _ag.onAddTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete
      );
      cmdAdd.Data=itm;
      return itm;
    };
    _ag.getSystem=function(){
      var db=_ag.DB;
      return db.getItem(db.Fields.Name,coLang.Table.Groups.System.Name);
    };
    _ag.getSpectrum=function(){
      var db=_ag.DB;
      return db.getItem(db.Fields.Name,coLang.Table.Groups.Spectrum.Name);
    };
    _ag.getMain=function(){
      var db=_ag.DB;
      return db.getItem(db.Fields.Name,coLang.Table.Groups.Main.Name);
    };
    _ag.getGroup=function(sName){
      var db=_ag.DB;
      return db.getItem(db.Fields.Name,sName);
    };
    _ag.checkDefaults=function(){
      var ag=_ag;
      var db=ag.DB;
      var itm=db.getItem(db.Fields.Name,ag.Defaults.System.Name);
      if (itm==null)
        ag.addGroup(ag.Defaults.System.Name,ag.Defaults.System.Description);
      var itm=db.getItem(db.Fields.Name,ag.Defaults.Main.Name);
      if (itm==null)
        ag.addGroup(ag.Defaults.Main.Name,ag.Defaults.Main.Description);
      var itm=db.getItem(db.Fields.Name,ag.Defaults.Spectrum.Name);
      if (itm==null)
        ag.addGroup(ag.Defaults.Spectrum.Name,ag.Defaults.Spectrum.Description);
    };
    return _ag;
  }
};

