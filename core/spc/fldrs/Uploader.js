coCabinet.App.Components.Uploader = {
  Version        : new Version(2013,11,8,29),
  Title          : new Title("Spectrum Cabinet Uploader","Uploader"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCabinet.App,'/core/spc/fldrs/Uploader.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCabinet.App,'/core/spc/fldrs/Uploader.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,Slides,Owner,Parent){
    var df=coAppUI.App.Components.DropFiles.Create("Uploader","Uploader",coLang.Table.DragDrop.Files.Dropbox,Screen,Slides,Owner,Parent,coAppUI.Alignment.Center);

    df.tmrRefresh=coSpectrum.Timers.createItem(coCabinet.RefreshDelay);
    df.tmrRefresh.Owner=df;
    df.tmrRefresh.RunOnce=true;
    df.tmrRefresh.onExecute=function(tmr){
      var df=tmr.Owner;
      var fldrs=df.Screen;
      var tv=fldrs.Tree;
      var tn=tv.Selected;
      if (tn) {
        var fldr=tn.Data;
        df.Network=tn.Network;
        if (tn.Network){
          tn.Network.MAP.Files.Value.Commands.List(tn.Network.MAP.Files.Value,fldr.MAP.ID.Value);
        } else {
          fldrs.DB.Commands.ListFiles(fldr.MAP.ID.Value);
        }
      };
    };
    df.onFileDropped=function(dfItem){
      var df=this;
      var fldrs=df.Screen;
      if ( fldrs.Tree.Selected) {
        var net=df.Network;
        var fldr=df.Folder;
        var files=fldrs.ListView.DataSet;
        var sFileName=dfItem.getCaption();

        dfItem.setLocation(coLang.Table.Separate.Path.concat(fldr.MAP.Path.Value));
        // Write Existing File in System
        var itmFile=files.getItem(files.Fields.MAP.Name,sFileName);
        if (itmFile) {
          // Write File
          if (net) {
            net.MAP.Files.Value.Commands.DropWrite(dfItem,itmFile);
          } else {
            fldrs.DB.Files.Commands.DropWrite(dfItem,itmFile);
          };
        } else {
          // Add File to system
          if (net) {
            var itmFile=coSocial.App.Components.DB.createFile();
            itmFile.Files=files;

            itmFile.MAP.NetworkID.Value=net.MAP.ID.Value;
            itmFile.MAP.FolderID.Value=fldr.MAP.ID.Value;
            itmFile.MAP.Name.Value=sFileName;
            var cType=coContentType.getFileContentType(itmFile.MAP.Name.Value);
            itmFile.MAP.Kind.Value=(cType) ? cType.Kind : coContentType.fkBinary;
            net.MAP.Files.Value.Commands.DropAdd(dfItem,itmFile);
          } else {
            var itmFile=fldrs.DB.createFile();
            itmFile.Files=files;

            itmFile.MAP.FolderID.Value=fldr.MAP.ID.Value;
            itmFile.MAP.Name.Value=sFileName;
            var cType=coContentType.getFileContentType(itmFile.MAP.Name.Value);
            itmFile.MAP.Kind.Value=(cType) ? cType.Kind : coContentType.fkBinary;
            fldrs.DB.Files.Commands.DropAdd(dfItem,itmFile);
          };
        };
        dfItem.Progress.Hidden=false;
        dfItem.Progress.setProgress(0);
        dfItem.Progress.maxValue=dfItem.File.size;
        dfItem.Progress.Show();
      };
    };
    df.Conseal();
    return df;
  }
};
