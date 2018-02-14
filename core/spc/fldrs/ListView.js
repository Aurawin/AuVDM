coCabinet.App.Components.ListView = {
  Version        : new Version(2014,2,7,17),
  Title          : new Title("Spectrum Cabinet ListView","ListView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCabinet.App,'/core/spc/fldrs/ListView.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCabinet.App,'/core/spc/fldrs/ListView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  LoadChunk      : 20,
  LoadPause      : 2500,
  LoadDelay      : 250,
  Create : function (Screen,Slides,Owner,Parent){
    var lv=coAppUI.App.Components.ListView.Create("Files","ListView",Screen,Slides,Owner,Screen.Frame.Client,coAppUI.Alignment.Client);
    lv.Unit=this;
    lv.AllowEdit=true;
    var ds=lv.DataSet=Screen.DB.Files;
    ds.Displays.push(lv);

    lv.tmrLoad.Chunk=lv.Unit.LoadChunk;
    lv.tmrLoad.Interval=lv.Unit.LoadPause;
    lv.tmrLoad.FirstDelay=lv.Unit.LoadDelay;

    lv.Header.Columns.addItem(ds.Fields.MAP.Name);
    lv.Header.Columns.addItem(ds.Fields.MAP.Created);
    lv.Header.Columns.addItem(ds.Fields.MAP.Modified);
    lv.Header.Columns.addItem(ds.Fields.MAP.Size);
    lv.onDoubleClick=function(itm){
      var lv=this;
      var sc=lv.Screen;
      var tv=sc.Tree;
      var itmFile=itm.Data;
      var conFile=sc.Converter.getConvertedFile(tv.Selected.Data,itmFile);
      if (conFile!=null) {
        var sFile=conFile.MAP.Name.Value;
        var aItem=coRegistry.Items.Open(sFile,tv.Selected.Data,lv.DataSet,conFile);
        if (aItem){
         // can do stuff with screen
        };
      };
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
      coCabinet.Files.Commands.Rename(File);
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
      var Network=(Info.Target.Network)? Info.Target.Network : null;
      if ((File.MAP.NetworkID.Value==0) && (Network==null)) {
        var folderID=Folder.MAP.ID.Value;
        var currentID=File.MAP.FolderID.Value;
        if (folderID!=currentID){
          coCabinet.Files.Commands.Move(itm,File,folderID);
        };
      } else if ((Info.Target.Network) && (Network) && (Network.MAP.ID.Value==File.MAP.NetworkID.Value)) {
        var folderID=Folder.MAP.ID.Value;
        var currentID=File.MAP.FolderID.Value;
        if (folderID!=currentID){
          coCabinet.Files.Commands.Move(itm,File,folderID);
        };
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

