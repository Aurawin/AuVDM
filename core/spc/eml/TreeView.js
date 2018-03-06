coMail.App.Components.TreeView = {
  Version        : new Version(2015,2,16,45),
  Title          : new Title("Spectrum Mail Tree View","TreeView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/TreeView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function (Screen,Slides,Owner,Parent,Align){
    var tv=coAppUI.App.Components.TreeView.Create("Folders","TreeView",Screen,Slides,Owner,Parent,Align);
    Screen.DB.Folders.Displays.Add(tv);
    tv.AllowNotify=true;
    tv.AutoExpand=true;
    tv.DataSet=Screen.DB.Folders;
    tv.DataSet.pathField=tv.DataSet.Fields.MAP.Path;
    tv.Trash=null;
    tv.Inbox=null;
    tv.Outbox=null;
    tv.Sent=null;

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
    tv.onEmptyFolder=function(itm){
      var mbx=this.Screen;
      var Folder=itm.Data;
      var vw=Folder.Display.getItemByProperty("Folder",Folder);
      if (vw) mbx.DB.Commands.Clear(Folder,vw.DataSet,mbx.DB.Folders);
    };
    tv.onItemAdded=function(itm){
      var tv=this;
      var sc=tv.Screen;
      var db=tv.DataSet;
      tv.placeFolder(itm,true);
      if (itm.Data==null){
        itm.Data=dbItem=db.createItem();
        dbItem.MAP.Path.Value=itm.getPath();
        dbItem.Display.addItem(itm,tv);
        db.Items.push(dbItem);
        coCabinet.Folders.Commands.Add(dbItem);
      };
      itm.onDragQuery=function(inf){
          var itm=this;
          if (inf.Source.Class=="ThreadViewItem"){
            inf.Accepted=true;
            inf.Action.Target=coDOM.getText(itm.Caption);
            inf.setAction(coLang.Table.DragDrop.Action.Move);
            inf.setIcon(coTheme.Icons.Spectrum.Mail.Read);
          };
      };
    };
    tv.onItemSelected=function(itm){
      var tv=this;
      var mbx=tv.Screen;
      var fldrs=mbx.Folders;
      var Folder=itm.Data;
      var dtNow=coDateTime.Now();
      var vw=null;
      switch (itm) {
        case (fldrs.Mail.Inbox) : {
          vw=mbx.Views.Inbox;
          break;
        };
        case (fldrs.Mail.Outbox): {
          vw=mbx.Views.Outbox;
          break;
        };
        default : {
          var vw=Folder.Display.getItemByProperty("Folder",Folder);
          if (!vw) vw=coMail.App.Components.ThreadView.CreateFolderView(mbx,Folder,itm);
          vw.Tab.setCaption(itm.getCaption());
          break;
        };
      };
      if (vw.Folder!=Folder) {
         vw.Folder=Folder;
         vw.DataSet.Folder=Folder;
         Folder.Display.addItem(vw,mbx);
         Folder.Display.addItem(vw.Tab,mbx.Tabsbar);
      };
      vw.Tab.Select();
      mbx.Tabsbar.Torus=vw.Torus;
      if (coDateTime.secondsBetween(dtNow,Folder.MAP.Modified.Value)>30){
        mbx.DB.Commands.RecordCount(Folder);
        mbx.DB.Commands.ListFolders(Folder);
        mbx.DB.Commands.FolderList(vw,Folder.MAP.ID.Value,vw.Header.Pages.Current);
      };
    };
    tv.PartialSynchronize=function(inf){
      var tv=this;
      tv.Items.Loading=true;
      for (var iLcv=0; iLcv<inf.Items.length; iLcv++){
        var dbi=inf.Items[iLcv];
        tv.SyncItem(dbi);
      };
      if (tv.Selected) tv.Selected.Show();
      tv.Items.Loading=false;
    };
    tv.placeFolder=function(tn,readOnly){
      tn.setIcon("tviFolder");
      tn.readOnly=(readOnly==true);
      tn.onDragQuery=function(inf){
        var tn=this;
        if (
          ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) ||
          (inf.Source.Class=="ThreadViewItem")
        ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(coTheme.Icons.Spectrum.Folder.Open);
        };
      };
      tn.Synchronize=function(Folder){
        var tn=this;
        if (Folder.Verified==true) {
          var Stats=Folder.MAP.Status.Value.MAP;
          if (Stats.Unread.Value==0) {
            if (tn.Notify.Visible==true)
              tn.Notify.Clear();
          } else {
            tn.Notify.Set(Stats.Unread.Value);
          };
        } else {
          tn.Free();
        };
      };
    };
    tv.placeAvoid=function(tn){
      tn.setIcon("tviFolder");
      tn.readOnly=true;
      tn.onDragQuery=function(inf){
        var tn=this;
        inf.Accepted=false;
      };
    };
    tv.placeInbox=function(tn){
      var tv=this;
      var mbx=tv.Screen;
      var Folder=tn.Data;
      tn.setIcon("tviInbox");
      tn.readOnly=true;
      tn.onDragQuery=function(inf){
        var tn=this;
        if (
          ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) ||
          (inf.Source.Class=="ThreadViewItem")
        ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(coMail.App.Screen.Icon);
        };
      };
      mbx.Views.Inbox.Folder=Folder;
      mbx.Views.Inbox.DataSet.Folder=Folder;
      Folder.Display.addItem(mbx.Views.Inbox,mbx);
      Folder.Display.addItem(mbx.Views.Inbox.Tab,mbx.Tabsbar);
    };
    tv.placeOutbox=function(tn){
      var tv=this;
      var mbx=tv.Screen;
      var Folder=tn.Data;
      tn.setIcon("tviOutbox");
      tn.readOnly=true;
      tn.onDragQuery=function(inf){
        var tn=this;
        if (
          ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) ||
          (inf.Source.Class=="ThreadViewItem")
        ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(coTheme.Icons.Spectrum.Folder.Outbox);
        };
      };
      mbx.Views.Outbox.Folder=Folder;
      mbx.Views.Outbox.DataSet.Folder=Folder;
      Folder.Display.addItem(mbx.Views.Outbox,mbx);
      Folder.Display.addItem(mbx.Views.Outbox.Tab,mbx.Tabsbar);
    };
    tv.placeSent=function(tn){
      tn.setIcon("tviSent");
      tn.readOnly=true;
      tn.onDragQuery=function(inf) {
        var tn=this;
        if (
          ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) ||
          (inf.Source.Class=="ThreadViewItem")
        ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(coTheme.Icons.Spectrum.Folder.Sent);
        };
      };
    };
    tv.placeJunk=function(tn){
      tn.setIcon("tviJunk");
      tn.readOnly=true;
      tn.emptyFolderFromHere=true;
      tn.onDragQuery=function(inf) {
        var tn=this;
        if (
          ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) ||
          (inf.Source.Class=="ThreadViewItem")
        ) {
          inf.Accepted=true;
          inf.Action.Target=coDOM.getText(tn.Caption);
          inf.setAction(coLang.Table.DragDrop.Action.Move);
          inf.setIcon(coTheme.Icons.Spectrum.Folder.Junk);
        };
      };
    };
    tv.placeTrash=function(tn){
      tn.setIcon("tviTrash");
      tn.readOnly=true;
      tn.emptyFolderFromHere=true;
      tn.onDragQuery=function(inf) {
        var tn=this;
        if (
          ( (inf.Source.Data) && (inf.Source.Data.Stanza=="file") ) ||
          (inf.Source.Class=="ThreadViewItem")
        ) {
          inf.Accepted=true;
          inf.Action.Target="";
          inf.setAction(coLang.Table.DragDrop.Action.Delete);
          inf.setIcon(coTheme.Icons.Spectrum.Mail.Trash);
        };
      };
    };
    tv.onLoaded=function(){
      var tv=this;
      var sc=tv.Screen;
      var db=tv.DataSet;

      itmMail=tv.Mail=tv.Items.findByText(coLang.Table.Mail.Folder);
      if (!itmMail) itmMail=tv.Items.addChild(coLang.Table.Mail.Folder);
      tv.placeAvoid(itmMail);
      db.Mail=itmMail.Data;


      var mbxIn=tv.Mail.Inbox=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Inbox) : null;
      if (!mbxIn) var mbxIn=itmMail.addChild(coLang.Table.Mail.Inbox);
      db.Mail.Inbox=mbxIn.Data;
      sc.Views.Inbox.Folder=mbxIn.Data;
      sc.Views.Inbox.Item=mbxIn;
      mbxIn.Data.Display.addItem(sc.Views.Inbox,sc);

      tv.placeInbox(mbxIn);
      sc.DB.Commands.RecordCount(mbxIn.Data);

      var mbxOut=tv.Mail.Outbox=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Outbox) : null;
      if (!mbxOut) var mbxOut=itmMail.addChild(coLang.Table.Mail.Outbox);
      db.Mail.Outbox=mbxOut.Data;
      tv.placeOutbox(mbxOut);

      var mbxSent=tv.Mail.Sent=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Sent) : null;
      if (!mbxSent) var mbxSent=itmMail.addChild(coLang.Table.Mail.Sent);
      db.Mail.Sent=mbxSent.Data;
      tv.placeSent(mbxSent);
      sc.DB.Commands.RecordCount(mbxSent.Data);


      var mbxJunk=tv.Mail.Junk=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Junk) : null;
      if (!mbxJunk) var mbxJunk=itmMail.addChild(coLang.Table.Mail.Junk);
      db.Mail.Junk=mbxJunk.Data;
      tv.placeJunk(mbxJunk);
      sc.DB.Commands.RecordCount(mbxJunk.Data);

      var mbxTrash=tv.Mail.Trash=(itmMail.subItems) ? itmMail.subItems.findByText(coLang.Table.Mail.Trash) : null;
      if (!mbxTrash) var mbxTrash=itmMail.addChild(coLang.Table.Mail.Trash);
      db.Mail.Trash=mbxTrash.Data;
      tv.placeTrash(mbxTrash);
      sc.DB.Commands.RecordCount(mbxTrash.Data);

      itmMail.Show(coAppUI.recurseOn);
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
