coSocial.App.Components.netUploader = {
  Version        : new Version(2013,5,18,3),
  Title          : new Title("Social Network Uploader","netUploader"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/netUploader.js',coAppKit.PreLoaded),  debugToConsole : true,
  Create : function(Screen,Owner){
    var sc=Screen;
    var ns=Owner;
    var df=coAppUI.App.Components.DropFiles.Create("Uploader","Uploader",coLang.Table.DragDrop.Files.Dropbox,sc,sc.Slides,ns,sc.Frame.Client,coAppUI.Alignment.Default);
    df.onFileDropped=function(dfItem){
      var up=this;
      var ns=up.Owner;
      var tv=ns.Cabinet.Tree;
      var idx=dfItem.Reader.result.indexOf(',');
      if ( (idx!=-1) && (tv.Selected) ){
        var fldr=tv.Selected.Data;
        dfItem.setLocation(coLang.Table.Separate.Path.concat(fldr.MAP.Path.Value));
        var itmFile=ns.Files.createItem();

        itmFile.MAP.FolderID.Value=fldr.MAP.ID.Value;
        itmFile.MAP.NetworkID.Value=fldr.MAP.NetworkID.Value;
        itmFile.MAP.Data.Value=dfItem.Reader.result.substring(idx+1);
        itmFile.MAP.Name.Value=dfItem.getCaption();
        var cType=coContentType.getFileContentType(itmFile.MAP.Name.Value);
        itmFile.MAP.Kind.Value=(cType) ? cType.Kind : coContentType.fkBinary;
        dfItem.Progress.Hidden=false;
        dfItem.Progress.setProgress(0);
        dfItem.Progress.maxValue=itmFile.MAP.Data.Value.length;
        dfItem.Progress.Show();

        ns.Files.Commands.Upload(dfItem,itmFile);
      };
    };
    return df;
  }
};
