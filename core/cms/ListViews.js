coCMS.App.Components.ListViews = {
  Version        : new Version(2014,10,23,7),
  Title          : new Title("Aurawin CMS ListViews","ListViews"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/ListViews.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCMS.App,'/core/cms/ListViews.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/ListViews.js',
  debugToConsole : true,
  LoadChunk      : 20,
  LoadPause      : 2500,
  LoadDelay      : 250,

  createFiles:function(Screen){
    var lv=coAppUI.App.Components.ListView.Create(
      "Files",
      "ListView",
      Screen,
      Screen.Client.Slides,
      Screen.Client,
      Screen.Client.Container,
      coAppUI.Alignment.Client
    );
    lv.AllowEdit=true;
    var ds=lv.DataSet=coCMS.App.Components.DB.createFiles();
    ds.Displays.push(lv);

    lv.tmrLoad.Chunk=this.LoadChunk;
    lv.tmrLoad.Interval=this.LoadPause;
    lv.tmrLoad.FirstDelay=this.LoadDelay;

    lv.Header.Columns.addItem(ds.Fields.MAP.Name);
    lv.Header.Columns.addItem(ds.Fields.MAP.Size);
    lv.Header.Columns.addItem(ds.Fields.MAP.Cache);
    lv.Header.Columns.addItem(ds.Fields.MAP.Compress);
    lv.Header.Columns.addItem(ds.Fields.MAP.Keywords);
    lv.Header.Columns.addItem(ds.Fields.MAP.TTL);
    lv.Header.Columns.addItem(ds.Fields.MAP.Modified);
    lv.onItemSelected=function(itm){
      var File=(Assigned(itm))? itm.Data : null;
      this.Screen.Toolbar.setupFileOptions(File);
    };
    lv.onDoubleClick=function(itm){
      var sc=this.Screen;
      sc.Nav.gpMain.mnuFile.miFileEdit.doClick();
    };
    lv.onItemBeginEdit=function(Item,Editor){
      return true;
    };
    lv.onItemCancelEdit=function(Item,Editor){
      return true;
    };
    lv.onItemEndEdit=function(Item,Editor){
      var File=Item.Data;
      File.MAP.Name.Value=Editor.getCaption();
      coCMS.App.DB.Commands.RenameFile(File);
      return true;
    };
    lv.onDragStarted=function(Info){
      var vw=Info.View;
      var itm=Info.Source;
      Info.Action.Blurb=itm.getCaption();
    };
    lv.onDragAccepted=function(Info){
      var vw=Info.View;
    };
    lv.onDragRejected=function(Info){
      var vw=Info.View;
    };
    lv.onDragCanceled=function(Info){
      var vw=Info.View;
    };
    lv.onDragCommited=function(Info){
      var vw=Info.View;
      var itm=Info.Source;
      var File=itm.Data;
      var Folder=Info.Target.Data;
      var folderID=Folder.MAP.ID.Value;
      var currentID=File.MAP.FolderID.Value;
      if (folderID!=currentID){
        coCMS.App.DB.Commands.MoveFile(itm,File,folderID);
      };
    };
    lv.dragInfo=coDragDrop.createInfo(
      lv,
      coTheme.Icons.Files.Blank,
      coDragDrop.NoBlurb,
      coDragDrop.NoTarget,
      coLang.Table.DragDrop.Items.File,
      coLang.Table.DragDrop.Action.Move,
      lv.onDragStarted,
      lv.onDragAccepted,
      lv.onDragRejected,
      lv.onDragCanceled,
      lv.onDragCommited
    );
    lv.onInvokeDelete=function(){
      var lv=this;
      var sc=lv.Screen;
      sc.Nav.forceSelected(sc.Nav.gpDelete);
      var cmds=lv.Commands;
      if (cmds.Mode.Index!=cmds.Mode.Default)
        cmds.Cancel();
      cmds.setMode(cmds.Mode.Delete);
      cmds.onConfirm=null;
    };
    lv.onInvokeCanceled=function(){
      var lv=this;
      var sc=lv.Screen;
      sc.Nav.forceSelected(sc.Nav.gpMain);
      var cmds=lv.Commands;
      cmds.Cancel();
    };
    return lv;
  }
};
