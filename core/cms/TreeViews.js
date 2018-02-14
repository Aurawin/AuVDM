coCMS.App.Components.TreeViews = {
  Version        : new Version(2014,10,19,4),
  Title          : new Title("Aurawin CMS TreeViews","TreeViews"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/TreeViews.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCMS.App,'/core/cms/TreeViews.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/TreeViews.js',
  debugToConsole : true,
  createFolders:function(Screen) {
    var tv=coAppUI.App.Components.TreeView.Create("Folders","TreeView",Screen,Screen.Client.Slides,Screen.Client,Screen.Client.Container,coAppUI.Alignment.Left);
    tv.DataSet=coCMS.App.DB.Folders;
    tv.DataSet.Displays.Add(tv);
    tv.AutoExpand=false;
    tv.DataSet.pathField=tv.DataSet.Fields.Path;
    tv.onItemDeleted=function(itm){
      var tv=this;
      var dbItem=itm.Data;
      if (dbItem==null) return;
      coCMS.App.DB.Commands.Delete(dbItem);
    };
    tv.onItemAdded=function(itm){
        var tv=this;
        tv.placeFolder(itm);
    };
    tv.placeFolder=function(tn){
      var tv=this;
      tn.setIcon("tviFolder");
      tn.onDragQuery=function(inf){
        var tn=this;
        if ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
        };
      };

    };
    tv.doItemSelected=function(itm){
      var tv=this;
      var sc=this.Screen;
      var dbItem=itm.Data;
      sc.Files.DataSet.Clear();
      sc.Files.Items.Clear();
      if (dbItem) {
        sc.Uploader.Folder=dbItem;
        sc.Folders.Editor.showEmptyFolder=false;
        sc.Uploader.setLocation(dbItem.MAP.Path.Value);
        coCMS.App.DB.Commands.ListFiles(dbItem.MAP.ID.Value,sc.Files);
        coCMS.App.DB.Commands.ListFolders(dbItem.MAP.Path.Value);
      } else{
        sc.Uploader.Folder=dbItem;
      };
    };
    tv.onLoaded=function(){
      var tv=this;
    };
    tv.PartialSynchronize=function(inf){
      var tv=this;
      tv.Items.Loading=true;
      for (var iLcv=0; iLcv<inf.Items.length; iLcv++){
        tv.SyncItem(inf.Items[iLcv]);
      };

      for (var iLcv=0; iLcv<tv.Items.length; iLcv++){
        tv.Items[iLcv].Show(false);
      };
      tv.Items.Loading=false;
    };

    return tv;
  }
};

