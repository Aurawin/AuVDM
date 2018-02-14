coVDM.App.Components.coDevice= {
  Version        : new Version(2014,10,31,101),
  Title          : new Title("Aurawin Cloud Devices","coDevice"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/vdm/coDevice.js',
  debugToConsole : true,
  NameSpace      : "/core/vdm",
  NS_RC_LIST            : "/res/l",
  NS_RC_READ            : "/res/r",
  NS_RC_WRITE           : "/res/w",
  NS_RC_DEL             : "/res/d",
  NS_RC_ADD             : "/res/a",
  NS_RC_WRITE_MANIFEST  : "/res/wm",
  FLAG_SAVE_SESSION     : 1 << 0,
  FLAG_SYNC_DOWNLOAD    : 1 << 1,
  FLAG_SYNC_UPLOAD      : 1 << 2,
  List                  : null,
  Screen                : null,
  VDM                   : null,
  init           : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js'
      ],
      coAppKit.NoDependencies,
      this.onInitialized
    );
    this.App.Unit=this;
    this.VDM=vdm;
    this.App.onAuthorized=function(App){
      if ((App.Loaded==true) && (App.Unit.List.DB.Loaded==false)) {
        App.Unit.List.cmdList.reTry();
      } else {
        App.processAuthorized=false;
      };
    };
    this.App.onLogout=function(App){

    };
    this.App.deferInit=function(){
      return (typeof(coTheme)!=undefined);
    };
    this.App.Initialized=true;
    return this;
  },
  onInitialized : function(App){
    App.Unit.List=App.Unit.createList();
    App.Unit.VDM.Devices=App.Screen=App.Unit.Screen=App.Screen=App.Unit.createScreen();
    App.Loaded=true;
  },
createList:function(){
  var vdm=coVDM.VDM;
  var rcs=coObject.Create();
  rcs.Unit=this;
  rcs.DB=coDB.createCollection(vdm.Net.Parser,"resources","resource",coDB.HasItems,coDB.HasDisplays);
  rcs.DB.Items.DisplayMode.setValue(rcs.DB.Items.DisplayMode.Single);
  rcs.DB.Loaded=false;
  rcs.DB.createSaveLoginFields=function(){
    var flds=coDB.Fields(coXML.Parser,"",null);
    flds.addField(coLang.Table.Labels.Off,coDB.Kind.Byte,0,coDB.StreamOff);
    flds.addField(coLang.Table.Labels.On,coDB.Kind.Byte,1,coDB.StreamOff);
    return flds;
  };
  rcs.DB.createDirectionFields=function(){
    var flds=coDB.Fields(coXML.Parser,"",null);
    flds.addField(coLang.Table.Apps.Devices.Direction.Off,coDB.Kind.Byte,0,coDB.StreamOff);
    flds.addField(coLang.Table.Apps.Devices.Direction.Download,coDB.Kind.Byte,1,coDB.StreamOff);
    flds.addField(coLang.Table.Apps.Devices.Direction.Upload,coDB.Kind.Byte,2,coDB.StreamOff);
    flds.addField(coLang.Table.Apps.Devices.Direction.Both,coDB.Kind.Byte,3,coDB.SteramOff);
    return flds;
  };
  rcs.DB.createPipes=function(){
    pipes=coDB.createCollection(vdm.Net.Parser,"pipes","pipe",coDB.HasItems);
    pipes.Fields.addField("Resource",coDB.Kind.Int64,"resource",0,coDB.StreamOn);
    pipes.Fields.addField("Name",coDB.Kind.String,"name","",coDB.StreamOn);
    pipes.Fields.addField("Path",coDB.Kind.String,"path","",coDB.StreamOn);
    pipes.Fields.addField("Direction",coDB.Kind.Byte,"direction",0,coDB.StreamOn);
    pipes.Fields.addField("Mode",coDB.Kind.Byte,"mode",0,coDB.StreamOn);
    return pipes;
  };
  rcs.DB.Compress=function(dbItem){
    var db=this;
    return coXML.Print(dbItem.Stanza,coXML.Print(dbItem.MAP.ID.Tag,dbItem.MAP.ID.Value.toString()));
  };

  rcs.DB.Fields.optionValue=rcs.DB.Identity=rcs.DB.Fields.addField("ID",coDB.Kind.Int64,"id",0,true,coDB.StreamOn);
  rcs.DB.Fields.optionName=rcs.DB.Fields.addField("Name",coDB.Kind.String,"name","",coDB.StreamOn);
  rcs.DB.Fields.addField("Manifest ID",coDB.Kind.Int64,"manifest-id",0,coDB.StreamOn);
  rcs.DB.Fields.addField("Sync ID",coDB.Kind.Int64,"sync-id",0,coDB.StreamOn);
  rcs.DB.Fields.addField("Modified",coDB.Kind.Double,"mtd",0.0,coDB.StreamOn);
  rcs.DB.Fields.addField("Flags",coDB.Kind.Byte,"flags",0,coDB.StreamOn);
  rcs.DB.Fields.addField("Description",coDB.Kind.String,"description","",coDB.StreamOn);
  rcs.DB.Fields.Direction=rcs.DB.createDirectionFields();
  rcs.DB.Fields.SaveLogin=rcs.DB.createSaveLoginFields();

  rcs.getResourceByName=function(sName) {
    var rcs=this;
    if (sName==undefined) sName="";
    return rcs.DB.getItem(rcs.DB.Fields.MAP.Name,sName);
  };

  rcs.getCurrentResource=function(){
    var rcs=this;
    return rcs.DB.getItemById(coVDM.Credentials.ResourceID);
  };

  rcs.onListComplete=function(netCMD){
    if (netCMD.Code==coNet.CO_STATUS_OK){
      rcs.DB.Loaded=true;
      var xDoc=netCMD.dataRecv;
      var xItems=coXML.getStanza(xDoc,rcs.DB.Stanza,xDoc.documentElement);
      rcs.DB.fromXML(xDoc,xItems);

      coAppKit.ResourcesLoaded();

    };
  };
  rcs.onAddComplete=function(netCMD){
    if (netCMD.Code==coNet.CO_STATUS_OK){
     var dbItem=netCMD.Data;

     var xDoc=netCMD.dataRecv;
     var xItem=coXML.getStanza(xDoc,rcs.DB.Stanza2,xDoc.documentElement);
     dbItem.fromXML(xDoc,xItem);

     coAppKit.ResourceAdded(dbItem);
    };
  };
  rcs.onReadComplete=function(netCMD){

  };
  rcs.onWriteComplete=function(netCMD){
    if (netCMD.Code==coNet.CO_STATUS_OK){
     var dbItem=netCMD.Data;

     var xDoc=netCMD.dataRecv;
     var xItem=coXML.getStanza(xDoc,rcs.DB.Stanza2,xDoc.documentElement);
     dbItem.fromXML(xDoc,xItem);

    };
  };
  rcs.onDeleteComplete=function(netCMD){

  };
  rcs.onDeleteComplete=function(netCMD){

  };
  rcs.onReadTimeOut=function(netCMD){

  };
  rcs.onNetError=function(netCMD){

  };

  rcs.onNetTimeOut=function(netCMD){

  };
  rcs.cmdList=vdm.Net.Commands.createCommand(
    vdm.Net,
    rcs.Unit.NameSpace,
    rcs.Unit.NS_RC_LIST,
    coNet.NoData,
    rcs.onListComplete,
    rcs.onNetError,
    rcs.onNetTimeOut,
    coNet.NoProgress,
    coNet.CreateSuspended,
    coNet.LingerOnComplete,
    coNet.AutoLoadOff
  );
  rcs.cmdList.Owner=rcs;
  rcs.cmdAdd=vdm.Net.Commands.createCommand(
    vdm.Net,
    rcs.Unit.NameSpace,
    rcs.Unit.NS_RC_ADD,
    coNet.NoData,
    rcs.onAddComplete,
    rcs.onNetError,
    rcs.onNetTimeOut,
    coNet.NoProgress,
    coNet.CreateSuspended,
    coNet.LingerOnComplete,
    coNet.AutoLoadOff
  );
  rcs.cmdAdd.Owner=rcs;
  rcs.cmdDelete=vdm.Net.Commands.createCommand(
    vdm.Net,
    rcs.Unit.NameSpace,
    rcs.Unit.NS_RC_DEL,
    coNet.NoData,
    rcs.onDeleteComplete,
    rcs.onNetError,
    rcs.onNetTimeOut,
    coNet.NoProgress,
    coNet.CreateSuspended,
    coNet.LingerOnComplete,
    coNet.AutoLoadOff
  );
  rcs.cmdDelete.Owner=rcs;
  rcs.cmdWrite=vdm.Net.Commands.createCommand(
    vdm.Net,
    rcs.Unit.NameSpace,
    rcs.Unit.NS_RC_WRITE,
    coNet.NoData,
    rcs.onWriteComplete,
    rcs.onNetError,
    rcs.onNetTimeOut,
    coNet.NoProgress,
    coNet.CreateSuspended,
    coNet.LingerOnComplete,
    coNet.AutoLoadOff
  );
  rcs.cmdWrite.Owner=rcs;
  rcs.cmdRead=vdm.Net.Commands.createCommand(
    vdm.Net,
    rcs.Unit.NameSpace,
    rcs.Unit.NS_RC_READ,
    coNet.NoData,
    rcs.onReadComplete,
    rcs.onNetError,
    rcs.onNetTimeOut,
    coNet.NoProgress,
    coNet.CreateSuspended,
    coNet.LingerOnComplete,
    coNet.AutoLoadOff
  );
  rcs.cmdRead.Owner=rcs;


  return rcs;
},
createPipeEditor:function(Screen){
  var db=this.List.DB;
  var dbPipes=db.Fields.MAP.Pipes.Value;

  var _edt=Screen.Slides.createSlide("pipesEditor","Pipe",Screen,Screen.Frame,Screen.Frame.Client,coAppUI.Alignment.Client);
  _edt.Panels=coAppUI.App.Components.Panels.Create("Editor","pnlClient",Screen.Frame,Screen,_edt.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);
  _edt.Panels.Pipe=_edt.Panels.createItem("",_edt.Panels.Kind.Panels,coLang.Table.Labels.Resource,"pnlCollection",coAppUI.Alignment.Top);
  _edt.Panels.Pipe.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",Screen.Frame,_edt.Panels.Resource,_edt.Panels.Pipe.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
  _edt.Panels.Pipe.Caption=_edt.Panels.Pipe.Panels.createCaption(coLang.Table.Labels.Pipe,"Pipe","pnlCaption");

  _edt.Panels.Pipe.Name=_edt.Panels.Pipe.Panels.createLabeledText(coLang.Table.Labels.Name,"Name","pnlField");
  _edt.Panels.Pipe.Name.DB.DataSet=db;
  _edt.Panels.Pipe.Name.DB.Field=db.Fields.MAP.Name;

  _edt.Panels.Pipe.Path=_edt.Panels.Pipe.Panels.createLabeledText(coLang.Table.Labels.Description,"Description","pnlField");
  _edt.Panels.Pipe.Path.DB.DataSet=dbPipes;
  _edt.Panels.Pipe.Path.DB.Field=dbPipes.Fields.MAP.Path;

  _edt.Panels.Pipe.Direction=_edt.Panels.Pipe.Panels.createLabeledCombo(coLang.Table.Labels.Direction,"Direction","pnlField");
  _edt.Panels.Pipe.Direction.DB.DataSet=dbPipes;
  _edt.Panels.Pipe.Direction.DB.Field=dbPipes.Fields.MAP.Direction;

  _edt.Panels.Pipe.Placement=_edt.Panels.Pipe.Panels.createLabeledCombo(coLang.Table.Labels.Placement,"Placement","pnlField");
  _edt.Panels.Pipe.Placement.DB.DataSet=dbPipes;
  _edt.Panels.Pipe.Placement.DB.Field=dbPipes.Fields.MAP.Placement;
  return _edt;
},
createDeviceEditor:function(Screen){
  var db=this.List.DB;
  var _edt=Screen.Slides.createSlide("rcEditor","Resource",Screen,Screen.Frame,Screen.Frame.Client,coAppUI.Alignment.Client);
  _edt.Resource=coObject.Create();
  _edt.Unit=this;
  _edt.Panels=coAppUI.App.Components.Panels.Create("Editor","pnlClient",Screen.Frame,Screen,_edt.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);
  _edt.Panels.Resource=_edt.Panels.createItem("",_edt.Panels.Kind.Panels,coLang.Table.Labels.Resource,"pnlCollection",coAppUI.Alignment.Top);
  _edt.Panels.Resource.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",Screen.Frame,_edt.Panels.Resource,_edt.Panels.Resource.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
  _edt.Resource.Caption=_edt.Panels.Resource.Panels.createCaption(coLang.Table.Labels.Resource,"Resource","pnlCaption");

  _edt.Resource.Name=_edt.Panels.Resource.Panels.createLabeledText(coLang.Table.Labels.Name,"Name","pnlField");
  _edt.Resource.Name.DB.DataSet=db;
  _edt.Resource.Name.DB.Field=db.Fields.MAP.Name;

  _edt.Resource.Description=_edt.Panels.Resource.Panels.createLabeledText(coLang.Table.Labels.Description,"Description","pnlField");
  _edt.Resource.Description.DB.DataSet=db;
  _edt.Resource.Description.DB.Field=db.Fields.MAP.Description;

  _edt.Resource.Direction=_edt.Panels.Resource.Panels.createLabeledCombo(coLang.Table.Labels.Synchronize,"Direction","pnlField");
  _edt.Resource.SaveLogin=_edt.Panels.Resource.Panels.createLabeledCombo(coLang.Table.Labels.SaveLogin,"SaveLogin","pnlField");


  db.Fields.Direction.setOptions(_edt.Resource.Direction.Value.Container);
  db.Fields.SaveLogin.setOptions(_edt.Resource.SaveLogin.Value.Container);
  _edt.getFlags=function(){
    var Flags=0;
    var ed=_edt;
    var sel=ed.Resource.SaveLogin.Value.Container;
    if (sel.options.selectedIndex==1) Flags=Flags | ed.Unit.FLAG_SAVE_SESSION;
    var sel=ed.Resource.Direction.Value.Container;
    switch (sel.options.selectedIndex) {
      case (3) :
        Flags= Flags | ed.Unit.FLAG_SYNC_DOWNLOAD;
        Flags= Flags | ed.Unit.FLAG_SYNC_UPLOAD;
        break;
      case (2) :
        Flags= Flags | ed.Unit.FLAG_SYNC_UPLOAD;
        break;
      case (1) :
        Flags= Flags | ed.Unit.FLAG_SYNC_DOWNLOAD;
        break;
    };
    return Flags;
  };
  _edt.setRecord=function(dbItem){
    var ed=_edt;
    ed.Panels.setRecord(dbItem);
    ed.Panels.resetValues();
    var Flags=dbItem.MAP.Flags.Value;
    var bSave=((Flags | ed.Unit.FLAG_SAVE_SESSION)==Flags);
    var bSyncDown=((Flags | ed.Unit.FLAG_SYNC_DOWNLOAD)==Flags);
    var bSyncUp=((Flags | ed.Unit.FLAG_SYNC_UPLOAD)==Flags);

    var sel=ed.Resource.SaveLogin.Value.Container;
    var idx=(bSave==true)? 1 : 0;
    sel.options.selectedIndex=idx;
    var sel=ed.Resource.Direction.Value.Container;
    if ( (bSyncDown==true) && (bSyncUp==true) ){
      idx=3;
    } else if (bSyncDown==true){
      idx=1;
    } else if (bSyncUp==true){
      idx=2;
    };
    sel.options.selectedIndex=idx;
  };

  _edt.updateRecord=function(){
    var ed=_edt;
    ed.Panels.Commit();
    ed.Panels.resetValues();
    ed.Panels.DB.Record.MAP.Flags.Value=edt.getFlags();
  };


  return _edt;
},
createScreen:function(){
  var _rs=coAppScreens.createScreen(coVDM.VDM,"Resources","System",coLang.Table.Apps.Devices.Name,coLang.Table.Apps.Devices.Title,coTheme.Icons.Devices.Cloud);
  _rs.Unit=this;
  _rs.AllowFullScreen=true;
  _rs.SaveGeometry=true;
  _rs.Description=coLang.Table.Apps.Devices.Description;
  _rs.List=_rs.Unit.List;
  var lv=_rs.ListView=coAppUI.App.Components.ListView.Create("Resources","ListView",_rs,_rs.Slides,_rs.Frame,_rs.Frame.Client,coAppUI.Alignment.Client);
  var ds = lv.DataSet = _rs.Unit.List.DB;
  ds.Displays.push(lv);
  lv.Header.Columns.addItem(ds.Fields.MAP.Name);
  lv.Header.Columns.addItem(ds.Fields.MAP.Description);
  lv.onDoubleClick=function(itm){
    var rs=_rs;
    var lv=rs.ListView;
    if (itm!=null) {
      rs.rcEditor.setRecord(itm.Data,coAppUI.ShowTorus);
      rs.Nav.setSelected(rs.Nav.gpRcEdit);
    };
  };
  _rs.rcEditor=_rs.Unit.createDeviceEditor(_rs);
  _rs.pipeEditor=_rs.rcEditor; // coDevice.createPipeEditor(_rs);
  _rs.Nav=coAppUI.App.Components.Nav.Create("Resources","Nav",_rs,_rs.Slides,_rs.Frame,_rs.Frame.Client);
  _rs.Nav.Home=_rs.Nav.Items.addItem(
    _rs.Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
    _rs.Nav.oAutoShowOn,
    _rs.Nav.oCascadeChildren,
    _rs.Nav.oAddToShowList,
    _rs.Nav.oSetAsDefaultOff,
    _rs.Nav.NoTarget,
    _rs.ListView,
    [_rs.ListView],
    [_rs.rcEditor,_rs.pipeEditor],
    _rs.Nav.NoReturn,
    function(){
      var rs=_rs;
    }
  );
  _rs.Nav.gpOptions=_rs.Nav.Items.addItem(
    _rs.Nav.itemKind.Group,"gpOptions","Commands",
    _rs.Nav.oAutoShowOn,
    _rs.Nav.oCascadeChildren,
    _rs.Nav.oAddToShowList,
    _rs.Nav.oSetAsDefaultOn,
    _rs.Nav.NoTarget,
    _rs.ListView,
    _rs.Nav.NoShowList,
    [_rs.rcEditor,_rs.pipeEditor],
    _rs.Nav.NoReturn,
    _rs.Nav.NoClick
  );
  _rs.Nav.gpNew=_rs.Nav.Items.addItem(
    _rs.Nav.itemKind.Group,"gpNew","New",
    _rs.Nav.oAutoShowOff,
    _rs.Nav.oCascadeChildren,
    _rs.Nav.oAddToShowList,
    _rs.Nav.oSetAsDefaultOff,
    _rs.Nav.NoTarget,
    _rs.rcEditor,
    _rs.Nav.NoShowList,
    [_rs.ListView],
    _rs.Nav.Home,
    _rs.Nav.NoClick
  );
  _rs.Nav.gpNew.Confirm=_rs.Nav.gpNew.Items.addItem(
    _rs.Nav.itemKind.Confirm,"cnfNew",[coLang.Table.Buttons.Create,coLang.Table.Buttons.Cancel],
    _rs.Nav.oAutoShowOn,
    _rs.Nav.oCascadeChildren,
    _rs.Nav.oAddToShowList,
    _rs.Nav.oSetAsDefaultOn,
    _rs.Nav.NoTarget,
    _rs.rcEditor,
    _rs.Nav.NoShowList,
    _rs.Nav.NoHideList,
    _rs.Nav.gpOptions,
      [
        function(){ // ok
          var rs=_rs;
          var rl=rs.Unit.List;
          var itm=rl.DB.Fields.createItem();
          itm.MAP.Name.Value=rs.rcEditor.Resource.Name.getValue();
          itm.MAP.Description.Value=rs.rcEditor.Resource.Description.getValue();
          itm.MAP.Flags.Value=rs.rcEditor.getFlags();
          // more for options set flags via <<
          rl.cmdAdd.dataSend=coXML.Header+itm.toXML();
          rl.cmdAdd.Data=itm;
          rl.cmdAdd.reTry();
        },
        function(){ // cancel
          var rs=_rs;
          rs.rcEditor.Panels.resetValues();
        }
      ]
  );
  _rs.Nav.gpRcEdit=_rs.Nav.Items.addItem(
    _rs.Nav.itemKind.Group,"gpRcEdit","rcEdit",
    _rs.Nav.oAutoShowOff,
    _rs.Nav.oCascadeOn,
    _rs.Nav.oNoShowList,
    _rs.Nav.oSetAsDefaultOff,
    _rs.Nav.NoTarget,
    _rs.rcEditor,
    _rs.Nav.NoShowList,
    [_rs.Nav.gpNew,_rs.Nav.gpOptions,_rs.ListView],
    _rs.Nav.Home,
    _rs.Nav.NoClick
  );
  _rs.Nav.gpRcEdit.Confirm=_rs.Nav.gpRcEdit.Items.addItem(
    _rs.Nav.itemKind.Confirm,"cnfEdit",[coLang.Table.Buttons.Save,coLang.Table.Buttons.Cancel],
    _rs.Nav.oAutoShowOn,
    _rs.Nav.oCascadeChildren,
    _rs.Nav.oAddToShowList,
    _rs.Nav.oSetAsDefaultOn,
    _rs.Nav.NoTarget,
    _rs.rcEditor,
    _rs.Nav.NoShowList,
    _rs.Nav.NoHideList,
    _rs.Nav.gpOptions,
      [
        function(){ // ok
          var rs=_rs;
          var rl=rs.Unit.List;
          var itm=rs.ListView.Items.Selected.Data;
          var rc=rs.rcEditor.Resource;
          itm.MAP.Name.Value=rc.Name.getValue();
          itm.MAP.Description.Value=rc.Description.getValue();
          itm.MAP.Flags.Value=rs.rcEditor.getFlags();

          rl.cmdWrite.dataSend=coXML.Header+itm.toXML();
          rl.cmdWrite.reTry();
          rl.cmdWrite.Data=itm;
        },
        function(){ // cancel
          var rs=_rs;
          rs.rcEditor.Panels.setRecord(null);
          rs.rcEditor.Panels.resetValues();
        }
      ]
  );
  _rs.Nav.gpPipeEdit=_rs.Nav.Items.addItem(
    _rs.Nav.itemKind.Group,"gpPipeEdit","pipeEdit",
    _rs.Nav.oAutoShowOff,
    _rs.Nav.oCascadeOn,
    _rs.Nav.oNoShowList,
    _rs.Nav.oSetAsDefaultOff,
    _rs.Nav.NoTarget,
    _rs.pipeEditor,
    _rs.Nav.NoShowList,
    [_rs.Nav.gpNew,_rs.Nav.gpOptions,_rs.Nav.gpRcEdit,_rs.ListView],
    _rs.Nav.Home,
    _rs.Nav.NoClick
  );

  _rs.Nav.gpDelete=_rs.Nav.Items.addItem(
  _rs.Nav.itemKind.Group,"gpDelete",coLang.Table.Buttons.Delete,
  _rs.Nav.oAutoShowOff,
  _rs.Nav.oCascadeOn,
  _rs.Nav.oNoShowList,
  _rs.Nav.oSetAsDefaultOff,
  _rs.Nav.NoTarget,
  _rs.Nav.NoSlide,
  [_rs.ListView],
  [_rs.Nav.gpOptions],
  _rs.Nav.Home,
  function(){
    var rs=_rs;
    var cmds=rs.ListView.Commands;
    cmds.onConfirm=function(cmd){
      var rs_rs;
      var rcs=rs.Unit.List;
      var vdm=coVDM.VDM;
      var li=cmd.Item;
      var netCMD=vdm.Net.Commands.createCommand(
        vdm.Net,
        rs.Unit.NameSpace,
        rs.Unit.NS_RC_DEL,
        coXML.Header+rcs.DB.Compress(cmd.Item.Data),
        function(){li.Free();},
        rcs.onNetError,
        rcs.onNetTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=cmd.Item.Data;
    };
    if (cmds.Mode.Index!=cmds.Mode.Default)
      cmds.Cancel();
      cmds.setMode(cmds.Mode.Delete);
    }
  );
  _rs.Nav.gpDelete.Confirm=_rs.Nav.gpDelete.Items.addItem(
    _rs.Nav.itemKind.Confirm,"cnfDelete",[coLang.Table.Buttons.Delete,coLang.Table.Buttons.Cancel],
    _rs.Nav.oAutoShowOff,
    _rs.Nav.oCascadeOff,
    _rs.Nav.oAddToShowList,
    _rs.Nav.oSetAsDefaultOff,
    _rs.Nav.NoTarget,
    _rs.Nav.NoSlide,
    [_rs.Nav.gpDelete],
    _rs.Nav.NoHideList,
    _rs.Nav.Home,
    [
      function(){
        var rs=_rs;
        var cmds=rs.ListView.Commands;
        cmds.Confirm();
      },
      function(){
        var rs=_rs;
        var cmds=rs.ListView.Commands;
        cmds.Cancel();
      }
    ]
  );

  _rs.Nav.gpOptions.Menu=_rs.Nav.gpOptions.Items.addItem(
    _rs.Nav.itemKind.Menu,"Menu",coLang.Table.Labels.Menu,
    _rs.Nav.oAutoShowOn,
    _rs.Nav.oCascadeOn,
    _rs.Nav.oAddToShowList,
    _rs.Nav.oSetAsDefaultOn,
    _rs.Nav.NoTarget,
    _rs.Nav.NoSlide,
    _rs.Nav.NoShowList,
    _rs.Nav.NoHideList,
    _rs.Nav.NoReturn,
    _rs.Nav.NoClick
  );
  _rs.Nav.gpOptions.Menu.AllowCaptionChange=false;
  _rs.Nav.gpOptions.Menu.miRcNew=_rs.Nav.gpOptions.Menu.addItem(
    "Edit",
    coLang.Table.Buttons.New,
    _rs.Nav.gpNew,
    function(){
      var rs=_rs;
      var rl=rs.Unit.List;
      rs.rcEditor.Panels.setRecord(null);
      rs.rcEditor.Panels.resetValues();
    },
    null
  );
  _rs.Nav.gpOptions.Menu.miRcEdit=_rs.Nav.gpOptions.Menu.addItem(
    "Edit",
    coLang.Table.Buttons.Edit,
    _rs.Nav.gpRcEdit,
    function(){
      var rs=_rs;
      var rl=rs.Unit.List;
      var li=rs.ListView.Items.Selected;
      if (!li) return false;
      rs.rcEditor.setRecord(li.Data);
    },
    null
  );
  _rs.Nav.gpOptions.Menu.miDelete=_rs.Nav.gpOptions.Menu.addItem(
    "Delete",
    coLang.Table.Buttons.Delete,
    _rs.Nav.gpDelete,
    function(){

    },
    null
  );
  _rs.Nav.gpOptions.Menu.miRefresh=_rs.Nav.gpOptions.Menu.addItem(
    "Refresh",
    coLang.Table.Buttons.Refresh,
    _rs.Nav.NoTarget,
    function(){
      var rl=_rs.Unit.List;
      rl.cmdList.reTry();
    },
    null
  );

  _rs.Nav.gpDelete.homeInfo=_rs.Nav.gpNew.homeInfo=_rs.Nav.gpRcEdit.homeInfo=_rs.Nav.Home.homeInfo=_rs.Nav.gpOptions.homeInfo=_rs.Nav.createHomeInfo(
    _rs.Nav.Home,
    _rs.Nav.gpOptions,
    _rs.Nav.NoMenuItem,
    function(){
      var rs=_rs;
      var cmds=rs.ListView.Commands;
      if (cmds.Mode.Index!=cmds.Mode.Default)
        cmds.Cancel();
    }
  );
  _rs.AddToHideLists=function(itm){
    _rs.Nav.Home.HideList.push(itm);
    _rs.Nav.gpNew.HideList.push(itm);
    _rs.Nav.gpRcEdit.HideList.push(itm);
    _rs.Nav.gpOptions.HideList.push(itm);
    _rs.Nav.gpPipeEdit.HideList.push(itm);
  };
  _rs.AddToHideLists(_rs.Nav.gpPipeEdit);
  _rs.AddToHideLists(_rs.rcEditor);
  _rs.AddToHideLists(_rs.Nav.gpNew);
  _rs.AddToHideLists(_rs.Nav.gpRcEdit);
  _rs.AddToHideLists(_rs.Nav.gpPipeEdit);
  _rs.AddToHideLists(_rs.Nav.gpDelete);

  _rs.onShow=function(){
    this.Unit.List.cmdList.reTry();
  };

  return _rs;
}

};
coVDM.App.Components.coDevice.init(coVDM.VDM);
