coSocial.App.Components.netTree = {
  Version        : new Version(2014,9,23,9),
  Title          : new Title("Social Network Tree","netTree"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/netTree.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Network,Screen,Slides,Owner,Parent,Align){
    var ns=Network;
    var tv=coAppUI.App.Components.TreeView.Create("Folders","TreeView",Screen,Slides,Owner,Parent,Align);
    ns.Folders.Displays.push(tv);
    tv.AutoExpand=false;
    tv.DataSet=ns.Folders;
    tv.DataSet.pathField=ns.Folders.Fields.MAP.Path;
    tv.DataSet.Torus=tv.Torus;
    tv.Folders=ns.Folders;
    tv.Documents=null;
    tv.Trash=null;
    tv.Music=null;
    tv.Pictures=null;
    tv.Videos=null;
    tv.onItemDeleted=function(itm){
      var tv=this;
      var fldrs=tv.Folders;
      var dbItem=itm.Data;
      if (dbItem) fldrs.Commands.Delete(dbItem);
    };
    tv.onItemRenamed=function(itm){
      var tv=this;
      var fldrs=tv.Folders;
      var dbItem=itm.Data;
      if (dbItem) {
        dbItem.MAP.Path.Value=itm.getPath();
        fldrs.Commands.Rename(dbItem);
      };
    };
    tv.onItemAdded=function(itm){
      var tv=this;
      var sc=tv.Screen;
      var nSel=sc.Selector.My.Items.Focused;
      var fldrs=tv.Folders;
      itm.Data=dbItem=fldrs.createItem();
      itm.Data.MAP.NetworkID.Value=nSel.Data.MAP.ID.Value;
      fldrs.Items.push(dbItem);
      itm.onDragQuery=function(inf){
          var itm=this;
          if (inf.Source.Class=="ThreadViewItem"){
            inf.Accepted=true;
            inf.Action.Target=coDOM.getText(itm.Caption);
            inf.setAction(coLang.Table.DragDrop.Action.Move);
            inf.setIcon(itm.srcIcon);
          };
      };
      dbItem.Display.push(itm);
      itm.setIcon("tviFolder");
      dbItem.MAP.Path.Value=itm.getPath();
      if (fldrs.Loading==true) return;
      fldrs.Commands.Add(dbItem);
    };
    tv.onItemSelected=function(itm){
     var tv=this;
     var ns=tv.Screen.Network;

     ns.Uploader.setLocation(itm.Data.MAP.Path.Value);

     var netCMD=ns.Files.Commands.List;

     netCMD.Headers.Update(coNet.fieldSearch,itm.Data.MAP.ID.Value);
     netCMD.reTry();
    };
    tv.onLoaded=function(){
        var tv=this;
        var ns=tv.Screen.Network;

        var exList=new Array();

        itmDocuments=tv.Documents=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Documents);
        if (!itmDocuments) itmDocuments=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Documents);
        itmDocuments.setIcon("tviDocuments");
        itmDocuments.readOnly=true;
        itmDocuments.onDragQuery=function(inf){
          var itmDocuments=this;
          if (inf.Source.Class=="ThreadViewItem"){
            inf.Accepted=true;
            inf.Action.Target=coDOM.getText(itmDocuments.Caption);
            inf.setAction(coLang.Table.DragDrop.Action.Move);
            inf.setIcon(itmDocuments.srcIcon);
          };
        };
        exList.push(itmDocuments);


        itmMusic=tv.Music=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Music);
        if (!itmMusic) itmMusic=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Music);

        itmMusic.setIcon("tviMusic");
        itmMusic.readOnly=true;
        itmMusic.onDragQuery=function(inf){
          var itmMusic=this;
          if (inf.Source.Class=="musicItem"){
            inf.Accepted=true;
            inf.Action.Target=coDOM.getText(itmMusic.Caption);
            inf.setAction(coLang.Table.DragDrop.Action.Move);
            inf.setIcon(itmMusic.srcIcon);
          };
        };
        exList.push(itmMusic);

        itmPictures=tv.Pictures=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Pictures);
        if (!itmPictures) itmPictures=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Pictures);
        itmPictures.setIcon("tviPictures");
        itmPictures.readOnly=true;
        itmPictures.onDragQuery=function(inf){
          var itmPictures=this;
          if (inf.Source.Class=="picItem"){
            inf.Accepted=true;
            inf.Action.Target=coDOM.getText(itmPictures.Caption);
            inf.setAction(coLang.Table.DragDrop.Action.Move);
            inf.setIcon(itmPictures.srcIcon);
          };
        };
        exList.push(itmPictures);

        itmTrash=tv.Trash=tv.Items.findByText(coLang.Table.Apps.Trash.Name);
        if (!itmTrash) itmTrash=tv.Items.addChild(coLang.Table.Apps.Trash.Name);
        itmTrash.setIcon("tviTrash");
        itmTrash.readOnly=true;
        itmTrash.emptyTrashFromHere=true;
        exList.push(itmTrash);

        itmVideos=tv.Videos=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Videos);
        if (!itmVideos) itmVideos=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Videos);
        itmVideos.setIcon("tviVideos");
        itmVideos.readOnly=true;
        itmVideos.onDragQuery=function(inf){
          var itmVideos=this;
          if (inf.Source.Class=="videoItem"){
            inf.Accepted=true;
            inf.Action.Target=coDOM.getText(itmVideos.Caption);
            inf.setAction(coLang.Table.DragDrop.Action.Move);
            inf.setIcon(itmVideos.srcIcon);
          };
        };
        exList.push(itmVideos);

        tv.placeIcons(exList,tv.Items);
        exList.length=0;
        exList=null;
    };
    tv.placeIcons=function(exList,lst){
      var tv=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var itm=lst[iLcv];
        if (exList.indexOf(itm)==-1) {
          itm.setIcon("tviFolder");
          itm.onDragQuery=function(inf){
            var itm=this;
            if (inf.Source.Class=="ThreadViewItem"){
              inf.Accepted=true;
              inf.Action.Target=coDOM.getText(itm.Caption);
              inf.setAction(coLang.Table.DragDrop.Action.Move);
              inf.setIcon(itm.srcIcon);
            };
          };
        };
        if (itm.subItems) tv.placeIcons(exList,itm.subItems);
      };
    };
    tv.onFree=function(){
      var tv=this;
      var lst=tv.Folders.Trees;
      var idx=lst.indexOf(tv);
      if (idx!=-1) lst.splice(idx,1);
    };
    ns.Folders.Trees.push(tv);
    return tv;
  }
};
