coCMS.App.Components.Uploaders = {
  Version        : new Version(2014,10,16,1),
  Title          : new Title("Aurawin CMS Uploaders","Uploaders"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/Uploaders.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCMS.App,'/core/cms/Uploaders.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/Uploaders.js',
  debugToConsole : true,
  createManager:function(Screen){
    var ul=Screen.Files.dropFiles=coAppUI.App.Components.DropFiles.Create(
      "Uploader",
      "Uploader",
      coLang.Table.DragDrop.Files.Dropbox,
      Screen,
      Screen.Files.Slides,
      Screen.Files,
      Screen.Files.Items.Container,
      coAppUI.Alignment.Center
    );

    ul.tmrRefresh=coCMS.Timers.createItem(coCMS.RefreshDelay);
    ul.tmrRefresh.Owner=ul;
    ul.tmrRefresh.RunOnce=true;
    ul.tmrRefresh.onExecute=function(tmr){
      var ul=tmr.Owner;
      var sc=ul.Screen;
      var tv=fldrs.Tree;
      var tn=tv.Selected;
      if (tn) {
        var fldr=tn.Data;
        coCMS.App.DB.Commands.ListFiles(fldr.MAP.ID.Value,sc.Files);
      };
    };
    ul.onFileDropped=function(dfItem){
      var ul=this;
      var sc=ul.Screen;
      if (ul.Folder) {
        var files=sc.Files.DataSet;
        var sFileName=dfItem.getCaption();
        dfItem.setLocation(coLang.Table.Separate.Path.concat(ul.Folder.MAP.Path.Value));
        // Write Existing File in System
        var itmFile=files.getItem(files.Fields.MAP.Name,sFileName);
        if (itmFile) {
          coCMS.App.DB.Commands.DropWriteFile(dfItem,itmFile);
        } else {
          // Add File to system
          var itmFile=coCMS.App.Components.DB.createFile();
          itmFile.Files=files;

          itmFile.MAP.FolderID.Value=fldr.MAP.ID.Value;
          itmFile.MAP.Name.Value=sFileName;
          var cType=coContentType.getFileContentType(itmFile.MAP.Name.Value);
          itmFile.MAP.Kind.Value=(cType) ? cType.Kind : coContentType.fkBinary;
          coCMS.App.DB.Commands.DropAddFile(dfItem,itmFile);
        };
        dfItem.Progress.Hidden=false;
        dfItem.Progress.setProgress(0);
        dfItem.Progress.maxValue=dfItem.File.size;
        dfItem.Progress.Show();
      };
    };
    ul.Conseal();
    return ul;
  }
};
