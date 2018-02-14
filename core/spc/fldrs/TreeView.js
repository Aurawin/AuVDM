coCabinet.App.Components.TreeView = {
  Version        : new Version(2014,12,5,61),
  Title          : new Title("Spectrum Cabinet Tree View","TreeView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCabinet.App,'/core/spc/fldrs/TreeView.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCabinet.App,'/core/spc/fldrs/TreeView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Trees          : Array(),
  Create : function(Screen,Owner,Parent,Align){
    var fldrs=coCabinet.App.Screen;
    var tv=coAppUI.App.Components.TreeView.Create("Folders","TreeView",Screen,Screen.Slides,Owner,Parent,Align);
    this.Trees.push(tv);
    tv.Unit=this;
    fldrs.DB.Displays.Add(tv);
    tv.AutoExpand=false;
    tv.DataSet=fldrs.DB;

    tv.DataSet.pathField=fldrs.DB.Fields.Path;
    tv.Folders=fldrs;
    tv.Files=null;
    tv.Devices=null;
    tv.Documents=null;
    tv.Mail=null;
    tv.Trash=null;
    tv.Music=null;
    tv.Pictures=null;
    tv.Videos=null;
    tv.Social=null;
    tv.MyNetworks=null;
    tv.OtherNetworks=null;

    tv.onItemDeleted=function(itm){
      var tv=this;
      var dbItem=itm.Data;
      if (dbItem==null) return;
      var Network=itm.Network;
      if (Network) {
        var Folders=Network.MAP.Folders.Value;
        Folders.Commands.Delete(dbItem);
      } else {
        tv.Folders.DB.Commands.Delete(dbItem);
      };
    };
    tv.PartialSynchronize=function(inf){
      var tv=this;
      tv.Items.Loading=true;
      var Net=null;
      var tnSoc=tv.Social;
      var tnNet=null;
      for (var iLcv=0; iLcv<inf.Items.length; iLcv++){
        var dbi=inf.Items[iLcv];
        if (dbi.MAP.NetworkID) {
          var tn=dbi.Display.getItem(tv);
          if (!tn) {
            if ((!Net) || (Net.MAP.ID.Value!=dbi.MAP.NetworkID.Value)){
              tnNet=tnSoc.subItems.getByNetworkId(dbi.MAP.NetworkID.Value);
              Net=tnNet.Network;
            };
            var tn=tnNet.Force(dbi.MAP.Path.Value,"/");
            tn.Slide=tv;
            tn.Data=dbi;
            tn.Network=Net;
            tn.Verified=true;
            dbi.setDisplay(tn);
            if (tv.onItemAdded) tv.onItemAdded(tn);
          } else {
            tn.Verified=true;
          };
        } else {
          tv.SyncItem(dbi);
        };

      };
      if (tv.Selected) tv.Selected.Show();
      tv.Items.Loading=false;
    };
    tv.onItemRenamed=function(itm){
      var tv=this;
      var dbItem=itm.Data;
      if (dbItem==null) return;
      var fldr=itm.Owner.Owner.Data;
      if (itm.Network) {
        var saPath=itm.getPath().split("/");
        saPath.splice(0,3);
        dbItem.MAP.NetworkID.Value=itm.Network.MAP.ID.Value;
        dbItem.MAP.Path.Value=saPath.join("/");
        itm.Network.MAP.Folders.Value.Commands.Rename(dbItem);
      } else {
        var fldrs=tv.Folders;
        dbItem.MAP.Path.Value=itm.getPath();
        fldrs.DB.Commands.Rename(dbItem);
      };
    };
    tv.onItemAdded=function(itm){
        var tv=this;
        tv.placeFolder(itm);
        if (itm.Data==null) {
          var fldr=itm.Owner.Owner.Data;
          if ((fldr.MAP.NetworkID) && (fldr.MAP.NetworkID.Value>0)) {
            var net=itm.Network=coSocial.getNetworkById(fldr.MAP.NetworkID.Value);
            var fldrs=fldr.Collection;
            if (fldrs.Loading==true) return;
            var dbItem=itm.Data=fldrs.createItem();
            var saPath=itm.getPath().split("/");
            saPath.splice(0,3);
            dbItem.MAP.NetworkID.Value=net.MAP.ID.Value;
            dbItem.MAP.Path.Value=saPath.join("/")
            dbItem.Display.addItem(itm,tv);
            fldrs.Commands.Add(dbItem);
          } else {
            var fldrs=tv.Folders.DB;
            if (fldrs.Loading==true) return;
            var dbItem=itm.Data=fldrs.createItem();
            dbItem.Display.addItem(itm,tv);
            dbItem.MAP.Path.Value=itm.getPath();
            fldrs.Commands.Add(dbItem);
          };
        };

    };
    tv.placeFolder=function(tn){
      tn.setIcon("tviFolder");
      tn.onDragQuery=function(inf){
        var tn=this;
        if (inf.Source.Class=="ThreadViewItem"){
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(tn.srcIcon);
        } else if ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
        };
      };

    };
    tv.placeDocuments=function(tn){
      var tv=this;
      tn.setIcon("tviDocuments");
      tn.readOnly=true;
      tn.onDragQuery=function(inf){
        var tn=this;
        if (inf.Source.Class=="ThreadViewItem"){
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(tn.srcIcon);
        } else if ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
        };
      };
    };
    tv.placeTrash=function(tn){
      var tv=this;
      tn.setIcon("tviTrash");
      tn.readOnly=true;
      tn.allowChildren=false;
      tn.emptyFolderFromHere=true;
      tn.onDragQuery=function(inf){
        var tn=this;
        if (inf.Source.Class=="ThreadViewItem"){
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Delete);
          inf.setIcon(tn.srcIcon);
        } else if ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Delete);
        };
      };
    };
    tv.placePictures=function(tn){
      var tv=this;
      tn.setIcon("tviPictures");
      tn.readOnly=true;
      tn.onDragQuery=function(inf){
        var tn=this;
        if (inf.Source.Class=="picItem"){
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(tn.srcIcon);
        } else if ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
        };
      };
    };
    tv.placeJunkMail=function(tn){
      var tv=this;
      tn.setIcon("tviJunk");
      tn.readOnly=true;
      tn.onDragQuery=function(inf){
        var tn=this;
        if ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
        };
      };
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
    tv.placeVideos=function(tn){
      var tv=this;
      tn.setIcon("tviVideos");
      tn.readOnly=true;
      tn.onDragQuery=function(inf){
        var tn=this;
        if (inf.Source.Class=="videoItem"){
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(tn.srcIcon);
        };
      };
    };
    tv.placeNetworkRoot=function(tn){
      tn.readOnly=true;
      tn.allowChildren=false;
    }
    tv.placeNetwork=function(tn){
      tn.readOnly=true;
      tn.allowChildren=false;
      var tnLcv=tn.getChild(coLang.Table.Apps.Spectrum.Folders.Documents);
      if (tnLcv) tv.placeDocuments(tnLcv);
      var tnLcv=tn.getChild(coLang.Table.Apps.Spectrum.Folders.Music);
      if (tnLcv) tv.placeMusic(tnLcv);
      var tnLcv=tn.getChild(coLang.Table.Apps.Spectrum.Folders.Pictures);
      if (tnLcv) tv.placePictures(tnLcv);
      var tnLcv=tn.getChild(coLang.Table.Apps.Trash.Name);
      if (tnLcv) tv.placeTrash(tnLcv);
      var tnLcv=tn.getChild(coLang.Table.Apps.Spectrum.Folders.Videos);
      if (tnLcv) tv.placeVideos(tnLcv);
    };
    tv.placeNetworks=function(tn){
      var tv=this;
      if (!tn.subItems) return;
      for (var iLcv=0; iLcv<tn.subItems.length; iLcv++){
        var tnNet=tn.subItems[iLcv];
        tnNet.readOnly=true;
        tnNet.allowChildren=false;
        tv.placeNetworks(tnNet);
      };
    };
    tv.onLoaded=function(){
      var tv=this;

      var itmSocial=tv.Social=tv.Items.findByText(coLang.Table.Apps.Social.Label);
      if (!itmSocial) tv.Social=itmSocial=tv.Items.addChild(coLang.Table.Apps.Social.Label);
      itmSocial.setIcon("tviSocial");
      itmSocial.readOnly=true;
      itmSocial.allowChildren=false;
      itmSocial.onDragQuery=function(inf){
        var itmSocial=this;
        inf.Accepted=false;
      };


      var itmMyNetworks=tv.MyNetworks=tv.Social.getChild(coLang.Table.Apps.Social.Networks.My);
      if (!itmMyNetworks) tv.MyNetworks=itmMyNetworks=tv.Social.addChild(coLang.Table.Apps.Social.Networks.My);
      itmMyNetworks.setIcon("tviMyNetworks");
      itmMyNetworks.readOnly=true;
      itmMyNetworks.allowChildren=false;
      itmMyNetworks.onDragQuery=function(inf){
        var itmMyNetworks=this;
        inf.Accepted=false;
      };

      tv.placeNetworkRoot(itmMyNetworks);
      var tnRoot=itmMyNetworks;
      for (var iLcv=0; iLcv<coSocial.Networks.Items.length; iLcv++){
          var dbItem=coSocial.Networks.Items[iLcv];
          dbItem.MAP.Folders.Value.Displays.Add(tv); // won't add duplicate
          var tn=tnRoot.getChildByNetworkId(dbItem.MAP.ID.Value);
          if (!tn)
            tn=tnRoot.addChild(dbItem.MAP.Title.Value,dbItem);
          tn.Data=dbItem;
          tn.Network=dbItem;
          tv.placeNetwork(tn);
          tn.setCaption(dbItem.MAP.Title.Value);
      };

      var itmOtherNetworks=tv.OtherNetworks=tv.Social.getChild(coLang.Table.Apps.Social.Networks.Other);
      if (!itmOtherNetworks) tv.OtherNetworks=itmOtherNetworks=tv.Social.addChild(coLang.Table.Apps.Social.Networks.Other);
      itmOtherNetworks.setIcon("tviOtherNetworks");
      itmOtherNetworks.readOnly=true;
      itmOtherNetworks.allowChildren=false;
      itmOtherNetworks.onDragQuery=function(inf){
        var itmOtherNetworks=this;
        inf.Accepted=false;
      };
      tv.placeNetworkRoot(itmOtherNetworks);
      var tnRoot=itmOtherNetworks;
      for (var iLcv=0; iLcv<coSocial.Connections.Networks.Items.length; iLcv++){
          var dbItem=coSocial.Connections.Networks.Items[iLcv];
          dbItem.MAP.Folders.Value.Displays.Add(tv); // won't add duplicate
          var tn=tnRoot.getChildByNetworkId(dbItem.MAP.ID.Value);
          if (!tn)
            tn=tnRoot.addChild(dbItem.MAP.Title.Value,dbItem);
          tn.Data=dbItem;
          tn.Network=dbItem;
          tv.placeNetwork(tn);
          tn.setCaption(dbItem.MAP.Title.Value);
      };

      var itmDevices=tv.Devices=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Devices);
      if (!itmDevices) itmDevices=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Devices);
      itmDevices.setIcon("tviDevices");
      itmDevices.readOnly=true;
      itmDevices.allowChildren=false;
      itmDevices.onDragQuery=function(inf){
        var itmDevices=this;
        inf.Accepted=false;
      };
      for (var iLcv=0; iLcv<itmDevices.subItems.length; iLcv++){
        var tnCh=itmDevices.subItems[iLcv];
        tnCh.readOnly=true;
        tnCh.allowChildren=false;
      };


      var itmDocuments=tv.Documents=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Documents);
      if (!itmDocuments) itmDocuments=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Documents);
      tv.placeDocuments(itmDocuments);

      var itmMail=tv.Mail=tv.Items.findByText(coLang.Table.Mail.Folder);
      if (!itmMail) itmMail=tv.Items.addChild(coLang.Table.Mail.Folder);
      itmMail.readOnly=true;

      var mbxIn=tv.Mail.Inbox=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Inbox) : null;
      if (!mbxIn) var mbxIn=itmMail.addChild(coLang.Table.Mail.Inbox);
      mbxIn.setIcon("tviInbox");
      mbxIn.readOnly=true;
      mbxIn.onDragQuery=function(inf){
        var mbxIn=this;
        if (inf.Source.Class=="ThreadViewItem"){
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(mbxIn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(mbxIn.srcIcon);
        };
      };
      var mbxOut=tv.Mail.Outbox=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Outbox) : null;
      if (!mbxOut) var mbxOut=itmMail.addChild(coLang.Table.Mail.Outbox);
      mbxOut.setIcon("tviOutbox");
      mbxOut.readOnly=true;
      mbxOut.onDragQuery=function(inf){
        var mbxOut=this;
        if (inf.Source.Class=="ThreadViewItem"){
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(mbxOut.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(mbxOut.srcIcon);
        };
      };

      var mbxSent=tv.Mail.Sent=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Sent) : null;
      if (!mbxSent) var mbxSent=itmMail.addChild(coLang.Table.Mail.Sent);
      mbxSent.setIcon("tviSent");
      mbxSent.readOnly=true;
      mbxSent.onDragQuery=function(inf){
        var mbxSent=this;
        if (inf.Source.Class=="ThreadViewItem"){
            inf.Accepted=true;
            inf.Action.Target=coDOM.getText(mbxSent.Caption);
            inf.setAction(coLang.Table.DragDrop.Action.Move);
            inf.setIcon(mbxSent.srcIcon);
          };
      };


        var mbxTrash=tv.Mail.Trash=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Trash) : null;
        if (!mbxTrash) var mbxTrash=itmMail.addChild(coLang.Table.Mail.Trash);
        tv.placeTrash(mbxTrash);

        var mbxJunk=tv.Mail.Junk=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Junk) : null;
        if (!mbxJunk) mbxJunk=itmMail.addChild(coLang.Table.Mail.Junk);
        tv.placeJunkMail(mbxJunk);

        var itmMusic=tv.Music=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Music);
        if (!itmMusic) itmMusic=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Music);
        tv.placeMusic(itmMusic);

        var itmPictures=tv.Pictures=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Pictures);
        if (!itmPictures) itmPictures=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Pictures);
        tv.placePictures(itmPictures);

        var itmTrash=tv.Trash=tv.Items.findByText(coLang.Table.Apps.Trash.Name);
        if (!itmTrash) itmTrash=tv.Items.addChild(coLang.Table.Apps.Trash.Name);
        tv.placeTrash(itmTrash);

        var itmVideos=tv.Videos=tv.Items.findByText(coLang.Table.Apps.Spectrum.Folders.Videos);
        if (!itmVideos) itmVideos=tv.Items.addChild(coLang.Table.Apps.Spectrum.Folders.Videos);
        tv.placeVideos(itmVideos);
    };
    tv.onFree=function(){
      var tv=this;
      var lst=tv.Folders.Trees;
      var idx=lst.indexOf(tv);
      if (idx!=-1) lst.splice(idx,1);
    };
    tv.onEmptyFolder=function(itm){
      var vw=itm.Owner.TreeView;
      var sc=vw.Screen;
      var dbItem=itm.Data;
      var dbNetwork=itm.Network;
      sc.Frame.Torus.Start();
      if (dbNetwork){
        var Folders=dbNetwork.MAP.Folders.Value;
        Folders.Commands.Clear(dbItem);
        sc.ListView.Items.Clear()
        sc.Loading=false;
        sc.Frame.Torus.Stop();
      } else {
        var folderID=dbItem.MAP.ID.Value;
        if (folderID!=0){
          var fldrs=dbItem.Collection;
          fldrs.Loading=true;
          var netCMD=coVDM.VDM.Net.Commands.createCommand(
            coVDM.VDM.Net,
            coVDM.NameSpace,
            coVDM.NS_FLDS_CLEAR,
            coNet.NoData,
            function(netCMD){
              sc.ListView.Items.Clear()
              sc.Loading=false;
              sc.Frame.Torus.Stop();
            },
            sc.DB.Commands.onCmdError,
            sc.DB.Commands.onCmdTimeOut,
            coNet.NoProgress,
            coNet.CreateAndRun,
            coNet.FreeOnComplete,
            coNet.AutoLoadOff
          );
          netCMD.Data=itm;
          netCMD.Headers.Update(coNet.fieldSearch,folderID);
        };
      };
    };
    tv.getCurrentFileCollection=function(Node){
      var tv=this;
      return (Node.Network) ? Node.Network.MAP.Files.Value : tv.Files;
    };
    tv.onItemExpanded=function(itm){
      var tv=this;
      var sc=this.Screen;
      var dbItem=itm.Data;
      if (dbItem) {
        if (itm.Network){
          if (itm.Network==itm.Data){
            var nfs=itm.Network.MAP.Folders.Value;
            nfs.Commands.List();
            tv.placeNetwork(itm);
          } else {
            var Files=tv.getCurrentFileCollection(itm);
            itm.Network.MAP.Folders.Value.Commands.RefreshFolder(dbItem);
          };
        } else if (itm==tv.MyNetworks) {
           coSocial.Networks.Commands.ListFolders();
        } else if (itm==tv.OtherNetworks) {
           coSocial.Connections.Commands.ListFolders();
        } else {
          dbItem.Collection.Commands.RefreshFolder(dbItem);
        };
      };
    };
    tv.doItemSelected=function(itm){
      var tv=this;
      var sc=this.Screen;
      var dbItem=itm.Data;
      if (dbItem) {
        if (itm.Network){
          if (itm.Network==itm.Data){
            sc.Uploader.setNetwork(null);
            sc.Uploader.setLocation(null);
            sc.ListView.setDataSet(null);
            var nfs=itm.Network.MAP.Folders.Value;
            nfs.Commands.List();
            tv.placeNetwork(itm);
          } else {
            sc.Uploader.Folder=dbItem;
            sc.Network=itm.Network;
            var Files=tv.getCurrentFileCollection(itm);
            sc.ListView.setDataSet(Files);
            sc.Uploader.setNetwork(itm.Network);
            sc.Uploader.setLocation(dbItem.MAP.Path.Value);
            sc.Network.MAP.Folders.Value.Commands.RefreshFolder(dbItem);
            Files.Commands.List(Files,dbItem.MAP.ID.Value);
          };
        } else if (itm==tv.MyNetworks) {
            sc.Uploader.setNetwork(null);
            sc.Uploader.setLocation(null);
            sc.ListView.setDataSet(null);
            coSocial.Networks.Commands.ListFolders();
        } else if (itm==tv.OtherNetworks) {
            sc.Uploader.setNetwork(null);
            sc.Uploader.setLocation(null);
            sc.ListView.setDataSet(null);
            coSocial.Connections.Commands.ListFolders();
        } else {
          sc.Uploader.Folder=dbItem;
          sc.ListView.setDataSet(tv.Files);
          sc.Tree.Editor.showEmptyFolder= ( (itm==tv.Mail.Trash) || (itm==tv.Trash));
          sc.Uploader.setNetwork(null);
          sc.Uploader.setLocation(dbItem.MAP.Path.Value);
          dbItem.Collection.Commands.ListFiles(dbItem.MAP.ID.Value,tv.Files);
          dbItem.Collection.Commands.RefreshFolder(dbItem);
        };
      } else{
        sc.Uploader.Folder=dbItem;
        sc.Uploader.setNetwork(null);
        sc.Uploader.setLocation(null);
        sc.ListView.setDataSet(null);
      };
    };

    fldrs.Trees.push(tv);
    return tv;
  }
};

