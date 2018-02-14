coVDM.App.Components.coMusic.App.Components.Uploader = {
  Version        : new Version(2013,12,4,4),
  Title          : new Title("Music Uploader","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/Uploader.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var upl=coAppUI.App.Components.DropFiles.Create(
      "Uploader",
      "Uploader",
      coLang.Table.DragDrop.Files.Dropbox,
      Screen,
      Screen.Slides,
      Screen,Screen.Frame.Client,
      coAppUI.Alignment.Center
    );
    upl.tmrRefresh=coSpectrum.Timers.createItem(coCabinet.RefreshDelay);
    upl.tmrRefresh.Owner=upl;
    upl.tmrRefresh.RunOnce=true;
    upl.tmrRefresh.onExecute=function(tmr){
      var df=tmr.Owner;
      var sc=df.Screen;
      var tv=sc.LeftView.Tree;
      var tn=tv.Selected;
      if (tn) {
        var fldr=tn.Data;
        df.Network=tn.Network;
        if (tn.Network) {
          //tn.Network.MAP.Files.Value.Commands.List(tn.Network.MAP.Files.Value,fldr.MAP.ID.Value);
          coSocial.Files.Commands.List(sc.DB.Selected,dbItem.MAP.ID.Value);
        } else {
          coCabinet.Files.Commands.List(sc.DB.Selected,fldr.MAP.ID.Value);
          //fldrs.DB.Commands.ListFiles(fldr.MAP.ID.Value);
        }
      };
    };
    upl.onFileDropped=function(dfItem){
      var df=this;
      var sc=df.Screen;
      var net=df.Network;
      var fldr=df.Folder;
      var files=sc.DB.Selected;
      var sFileName=dfItem.getCaption();

      dfItem.setLocation(coLang.Table.Separate.Path.concat(fldr.MAP.Path.Value));
      // Write Existing File in System
      var itmFile=files.getItem(files.Fields.MAP.Name,sFileName);
        if (itmFile) {
          // Write File
          if (net) {
            coSocial.Files.Commands.DropWrite(dfItem,itmFile);
          } else {
            coCabinet.Files.Commands.DropWrite(dfItem,itmFile);
          };
        } else {
          // Add File to system
          var itmFile=coMusic.App.Components.DB.createFile();
          if (net) {

            itmFile.Files=files;

            itmFile.MAP.NetworkID.Value=net.MAP.ID.Value;
            itmFile.MAP.FolderID.Value=fldr.MAP.ID.Value;
            itmFile.MAP.Name.Value=sFileName;
            var cType=coContentType.getFileContentType(itmFile.MAP.Name.Value);
            itmFile.MAP.Kind.Value=(cType) ? cType.Kind : coContentType.fkBinary;
            coSocial.Files.Commands.DropAdd(dfItem,itmFile);
          } else {
            itmFile.Files=files;

            itmFile.MAP.FolderID.Value=fldr.MAP.ID.Value;
            itmFile.MAP.Name.Value=sFileName;
            var cType=coContentType.getFileContentType(itmFile.MAP.Name.Value);
            itmFile.MAP.Kind.Value=(cType) ? cType.Kind : coContentType.fkBinary;
            coCabinet.Files.Commands.DropAdd(dfItem,itmFile);
          };
        };
        dfItem.Progress.Hidden=false;
        dfItem.Progress.setProgress(0);
        dfItem.Progress.maxValue=dfItem.File.size;
        dfItem.Progress.Show();

    };
    return upl;
  }
};

