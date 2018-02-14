coMail.App.Components.Uploader = {
  Version        : new Version(2013,8,3,5),
  Title          : new Title("Spectrum Mail Uploader","Uploader"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/Uploader.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var upl=coAppUI.App.Components.DropFiles.Create("Uploader","Uploader",coLang.Table.DragDrop.Files.Dropbox,Screen,Screen.Slides,Screen,Screen.Frame.Client,coAppUI.Alignment.Default);
    upl.onFileDropped=function(dfItem){
      var upl=this;
      var mbx=upl.Screen;
      var idx=dfItem.Reader.result.indexOf(',');
      if (idx!=-1) {
        var itmFile=mbx.DB.createFile();
        itmFile.Fields.MAP.FolderID.Value=coSpectrum.Folders.getAttachmentsID();
        itmFile.Fields.MAP.Data.Value=dfItem.Reader.result.substring(idx+1);
        itmFile.Fields.MAP.Name.Value=dfItem.getCaption();
        dfItem.Progress.Hidden=false;
        dfItem.Progress.setProgress(0);
        dfItem.Progress.maxValue=itmFile.Fields.MAP.Data.Value.length;
        dfItem.Progress.Show();
        var netCMD=coVDM.VDM.Net.Commands.createCommand(
          coVDM.VDM.Net,
          coVDM.NameSpace,
          coVDM.NS_FLS_ADD,
          coXML.Header+itmFile.toXML(),
          function(netCMD){ // Success
              var dfItem=netCMD.Owner;
              var upLoader=dfItem.Owner;
              var mbx=upLoader.Owner;

              var itmFile=netCMD.Data;
              itmFile.Free();
              dfItem.Progress.setProgress(0);
          },
          mbx.DB.Commands.onCmdError,
          mbx.DB.Commands.onCmdTimeOut,
          function(netCMD,iProgress,iTotal){
            var dfItem=netCMD.Owner;
            dfItem.Progress.maxValue=iTotal;
            dfItem.Progress.setProgress(iProgress);
          },
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
        );
        netCMD.Owner=dfItem;
        netCMD.Data=itmFile;
      };
    };
    return upl;
  }
};

