coMusic.App.Components.TreeView = {
  Version        : new Version(2013,12,4,41),
  Title          : new Title("Music Tree View","TreeView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMusic.App,'/core/vdm/music/TreeView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function (Screen,Slides,Owner,Parent,Align){
    var tv=coAppUI.App.Components.TreeView.Create("Folders","TreeView",Screen,Slides,Owner,Parent,Align);
    Screen.DB.Folders.Displays.push(tv);
    tv.AutoExpand=false;
    tv.DataSet=Screen.DB.Folders;
    tv.DataSet.pathField=tv.DataSet.Fields.MAP.Path;
    tv.Trash=null;
    tv.Music=null;
    tv.onItemDeleted=function(itm){
      var tv=this;
      var fldrs=tv.DataSet;
      var dbItem=itm.Data;
      if (dbItem) fldrs.Commands.Delete(dbItem);
    };
    tv.onItemRenamed=function(itm){
      var tv=this;
      var fldrs=tv.DataSet;
      var dbItem=itm.Data;
      if (dbItem) {
        dbItem.MAP.Path.Value=itm.getPath();
        fldrs.Commands.Rename(dbItem);
      };
    };
    tv.onItemAdded=function(itm){
      var tv=this;
      var sc=tv.Screen;
      itm.setIcon("tviFolder");
      itm.onDragQuery=function(inf){
          var itm=this;
          if (inf.Source.Class=="musicItem"){
            inf.Accepted=true;
            inf.Action.Target=coDOM.getText(itm.Caption);
            inf.setAction(coLang.Table.DragDrop.Action.Move);
            inf.setIcon(itm.srcIcon);
          };
      };
      if (itm.Data==null) {
        var fldrs=tv.DataSet;
        var fldrParent=tv.Selected.Data.MAP;
        var netID=(fldrParent.NetworkID)? fldrParent.NetworkID.Value: 0;
        var net=(netID>0) ? coSocial.getNetworkById(netID) : null;
        var cmds=(net)? coSocial.Folders.Commands : coCabinet.Folders.Commands;

        var dbItem=itm.Data=fldrs.createItem();

        dbItem.MAP.NetworkID.Value=netID;
        if (net){
          var saPath=itm.getPath().split("/");
          saPath.splice(0,2);
          dbItem.MAP.NetworkID.Value=net.MAP.ID.Value;
          dbItem.MAP.Path.Value=saPath.join("/")
          itm.Network=net;
        } else {
          dbItem.MAP.Path.Value=itm.getPath();
        };
        dbItem.setDisplay(itm);
        fldrs.Items.push(dbItem);

        cmds.Add(dbItem);
      };
    };
    tv.onItemSelected=function(itm){
      var tv=this;
      var sc=tv.Screen;
      var lv=sc.RightView.ListView;

      var dbItem=itm.Data;
      sc.Uploader.Folder=dbItem;
      if (dbItem) {
        sc.DB.Selected.LoadInfo.setActive(false);
        lv.Items.Clear();
        //var iNetID=(dbItem.MAP.NetworkID)? dbItem.MAP.NetworkID.Value : 0;
        if (itm.Network){
          if (!itm.Network) itm.Network=coSocial.getNetworkById(dbItem.MAP.NetworkID.Value);
          sc.Network=itm.Network;
          coSocial.Files.Commands.List(sc.DB.Selected,dbItem.MAP.ID.Value);
          sc.Uploader.setNetwork(itm.Network);
          sc.Uploader.setLocation(dbItem.MAP.Path.Value);
        } else {
          sc.Uploader.setNetwork(null);
          sc.Uploader.setLocation(itm.Data.MAP.Path.Value);
          coCabinet.Files.Commands.List(sc.DB.Selected,dbItem.MAP.ID.Value);
        };
      } else{
        sc.Uploader.setNetwork(null);
        sc.Uploader.setLocation(null);
      };
      sc.setSearch(sc.Unit.srchText);
    };
    tv.placeMusic=function(tn){
      var tv=this;
      tn.setIcon("tviMusic");
      tn.readOnly=true;
      tn.onDragQuery=function(inf){
        var tn=this;
        if (inf.Source.Class=="musicItem"){
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(tn.srcIcon);
        };
      };
    };
    tv.placeNetworks=function(tn){
      var tv=this;
      if (!tn.subItems) return;
      for (var iLcv=0; iLcv<tn.subItems.length; iLcv++){
        var tnNet=tn.subItems[iLcv];
        tnNet.readOnly=true;
        tnNet.allowChildren=false;
        var tnLcv=tnNet.getChild(coLang.Table.Apps.Spectrum.Folders.Documents);
        if (tnLcv) tv.placeDocuments(tnLcv);
        var tnLcv=tnNet.getChild(coLang.Table.Apps.Spectrum.Folders.Music);
        if (tnLcv) tv.placeMusic(tnLcv);
        var tnLcv=tnNet.getChild(coLang.Table.Apps.Spectrum.Folders.Pictures);
        if (tnLcv) tv.placePictures(tnLcv);
        var tnLcv=tnNet.getChild(coLang.Table.Apps.Trash.Name);
        if (tnLcv) tv.placeTrash(tnLcv);
        var tnLcv=tnNet.getChild(coLang.Table.Apps.Spectrum.Folders.Videos);
        if (tnLcv) tv.placeVideos(tnLcv);
      };
    };
    tv.onLoaded=function(){
        var tv=this;
        if (!tv.Music) {
          var itmMusic=tv.Music=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Music);
          if (!itmMusic) itmMusic=tv.Music=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Music);

          itmMusic.setCaption(coLang.Table.Apps.Music.My);
          itmMusic.Expand();
          itmMusic.setIcon("tviMusic");
          itmMusic.readOnly=true;
          itmMusic.allowChildren=true;
          itmMusic.Class="TVItem TVHeaderGradient";
          itmMusic.Wrapper.className=itmMusic.Class;
          itmMusic.onDragQuery=function(inf){
            var itmMusic=this;
            if (inf.Source.Class=="musicItem"){
              inf.Accepted=true;
              inf.Action.Target=coDOM.getText(itmMusic.Caption);
              inf.setAction(coLang.Table.DragDrop.Action.Move);
              inf.setIcon(itmMusic.srcIcon);
            };
          };
        };

        var itmMyNetworks=tv.MyNetworks=tv.Items.findByText(coLang.Table.Apps.Social.Networks.My);
        if (!itmMyNetworks) tv.MyNetworks=itmMyNetworks=tv.Items.addChild(coLang.Table.Apps.Social.Networks.My);
        itmMyNetworks.setIcon("tviMyNetworks");
        itmMyNetworks.readOnly=true;
        itmMyNetworks.allowChildren=false;
        itmMyNetworks.onDragQuery=function(inf){
          var itmMyNetworks=this;
          inf.Accepted=false;
        };

        tv.placeNetworks(itmMyNetworks);


        var itmOtherNetworks=tv.OtherNetworks=tv.Items.findByText(coLang.Table.Apps.Social.Networks.Other);
        if (!itmOtherNetworks) tv.OtherNetworks=itmOtherNetworks=tv.Items.addChild(coLang.Table.Apps.Social.Networks.Other);
        itmOtherNetworks.setIcon("tviOtherNetworks");
        itmOtherNetworks.readOnly=true;
        itmOtherNetworks.allowChildren=false;
        itmOtherNetworks.onDragQuery=function(inf){
          var itmOtherNetworks=this;
          inf.Accepted=false;
        };

        tv.placeNetworks(itmOtherNetworks);
    };
    tv.onFree=function(){
      var tv=this;
      var lst=tv.Folders.Trees;
      var idx=lst.indexOf(tv);
      if (idx!=-1) lst.splice(idx,1);
    };
    return tv;
  }

};

