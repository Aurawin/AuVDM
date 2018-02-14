coWallPaper.App.Components.DB = {
  Version        : new Version(2014,10,19,2),
  Title          : new Title("Aurawin WallPaper App Database Module","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coWallPaper.App,'/core/vdm/wallpaper/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 500,
  LoadChunk      : 300,
  LoadDelay      : 500,

  Init : function(){
    // initialization code below
  },
  Create : function(App){
    // View Creation code below
    var DB=coDB.createCollection(coXML.createParser(),"fls","fl",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    DB.LoadInfo.FirstDelay=this.LoadQuick;
    DB.LoadInfo.Interval=this.LoadDelay;
    DB.LoadInfo.Chunk=this.LoadChunk;
    DB.Loaded=false;
    DB.Requested=false;
    DB.Unit=this;
    DB.Owner=App;

    DB.Items.DisplayMode.setValue(DB.Items.DisplayMode.Multiple);

    DB.Identity=DB.Fields.ID=DB.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    DB.Fields.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
    DB.Fields.addField("Digest",coDB.Kind.String,"d","",coDB.StreamOn);
    DB.Fields.addField("TTL",coDB.Kind.Integer,"ttl",0,coDB.StreamOn);
    DB.Fields.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    DB.Fields.addField("Modified",coDB.Kind.Double,"mtd",0.0,coDB.StreamOn);
    DB.Fields.addField("Cache",coDB.Kind.Boolean,"cac",false,coDB.StreamOn);
    DB.Fields.addField("Compress",coDB.Kind.Boolean,"cmp",false,coDB.StreamOn);
    DB.Fields.addField("Keywords",coDB.Kind.Boolean,"kwds",false,coDB.StreamOn);
    DB.Fields.addField("Size",coDB.Kind.QWord,"sze",0,coDB.StreamOn);

    var cmds=DB.Commands=coNet.createCommands(coVDM.VDM.Net);
    cmds.Owner=DB;
    cmds.onCmdError=function(netCMD){
      var cmds=this;
      var DB=cmds.DB;
      if (DB.Unit.debugToConsole==true) {
        coVDM.VDM.Console.Append(
          "".concat(
          " coWallPaper.App.Components.DB.Commands.onCmdError",
          " ",netCMD.toString()
          )
        );
      };
    };
    cmds.onCmdTimeOut=function(netCMD){
      var cmds=this;
      var DB=cmds.DB;
      if (DB.Unit.debugToConsole==true){
        coVDM.VDM.Console.Append(
          "".concat(
          " coWallPaper.App.Components.DB.Commands.onCmdTimeOut",
          " ",netCMD.toString()
          )
        );
      };
    };
    cmds.onListTilesComplete=function(netCMD){
      var cmds=this;
      var DB=cmds.Data;
      DB.LoadInfo.XML=netCMD.dataRecv;
      netCMD.dataRecv="";

      DB.LoadInfo.Start=0;
      DB.LoadInfo.setActive(true);
    };
    cmds.onListScenesComplete=function(netCMD){
      var cmds=this;
      var DB=cmds.Data;

      DB.LoadInfo.XML=netCMD.dataRecv;
      netCMD.dataRecv="";

      DB.LoadInfo.Start=0;
      DB.LoadInfo.setActive(true);
    };
    cmds.ListTiles=function(DataSet){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_WPR_LIST_TILES,
        coNet.NoData,
        cmds.onListTilesComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Data=DataSet;
      return netCMD;
    };
    cmds.ListScenes=function(DataSet){
      var cmds=this;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_WPR_LIST_SCENES,
        coNet.NoData,
        cmds.onListScenesComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Data=DataSet;
      return netCMD;
    };
    cmds.getWallPaperURL=function(dbItem){
      return coVDM.URI_WALLPAPER_GET.replace("$id",dbItem.MAP.ID.Value);
    };
    return DB;
  }
};
coWallPaper.App.Components.DB.Init();

