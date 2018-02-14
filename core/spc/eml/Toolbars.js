coMail.App.Components.Toolbars = {
  Version        : new Version(2014,10,13,29),
  Title          : new Title("Spectrum Mail Toolbars","Toolbars"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/Toolbars.js',coAppKit.PreLoaded),
  debugToConsole : true,

  createMainToolbar:function(Screen){
    var mbx=Screen;
    var tb=coAppUI.App.Components.Toolbar.Create("mailToolbar","Toolbar",mbx,mbx.Main.Slides,mbx.Main,mbx.Main.Container,coAppUI.Alignment.Top);
    tb.Mode.setValue(tb.Mode.captionRight);
    tb.setHeights(coVDM.ToolbarHeightBare,coVDM.ToolbarTextHeight,coTheme.UI.Toolbar.Item.Text.lineHeight);
    tb.Buttons.New=tb.createButton(coLang.Table.Mail.Compose,coTheme.Icons.Spectrum.Mail.Compose);
    tb.Buttons.Sep1=tb.createSeperator();
    tb.Buttons.New.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      mbx.Folders.Mail.Outbox.Select();
      var cmp=coMail.App.Components.Writers.Create(
        mbx,
        mbx.DB.Folders.Mail.Outbox,
        mbx.Views.Outbox.DataSet
      );
      cmp.Tab.Select();
    };
    /*
    tb.Buttons.Reply=tb.createButton(coLang.Table.Buttons.Reply,coTheme.Icons.Arrow.Black.FullRight);
    tb.Buttons.Reply.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      var tab=mbx.Tabsbar.Selected;
      var widget=tab.Data;
      switch (widget.Class){
        case ("mail") :
          var vw=widget;
          if (vw.Selected){
            var itmFile=vw.Selected.Data;
            mbx.DB.Commands.readAndReply(mbx,itmFile);
          };
          break;
        case ("FolderView"):
          var vw=widget.ThreadView;
          if (vw.Selected){
            var itmFile=vw.Selected.Data;
            mbx.DB.Commands.readAndReply(itmFile);
          };
          break;
        case ("mailComposer","mailReader") :
          var itmFile=widget.DataSet.Fields;
          mbx.DB.Commands.readAndReply(itmFile);
          break;
      };
    };
    tb.Buttons.ReplyAll=tb.createButton(coLang.Table.Buttons.ReplyAll,coTheme.Icons.Arrow.Black.FullRightDouble);
    tb.Buttons.ReplyAll.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      var tab=mbx.Tabsbar.Selected;
      var widget=tab.Data;
      switch (widget.Class){
        case ("mail") :
          var vw=widget;
          if (vw.Selected){
            var itmFile=vw.Selected.Data;
            mbx.DB.Commands.readAndReplyAll(itmFile);
          };
          break;
        case ("FolderView"):
          var vw=widget.ThreadView;
          if (vw.Selected){
            var itmFile=vw.Selected.Data;
            mbx.DB.Commands.readAndReplyAll(itmFile);
          };
          break;
        case ("mailComposer","mailReader") :
          var itmFile=widget.DataSet.Fields;
          mbx.DB.Commands.readAndReplyAll(itmFile);
          break;
      };
    };
    tb.Buttons.Forward=tb.createButton(coLang.Table.Buttons.Forward,coTheme.Icons.Arrow.Black.FullLeft);
    tb.Buttons.Forward.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      var tab=mbx.Tabsbar.Selected;
      var widget=tab.Data;
      switch (widget.Class){
        case ("mail") :
          var vw=widget;
          if (vw.Selected){
            var itmFile=vw.Selected.Data;
            mbx.DB.Commands.readAndForward(itmFile);
          };
          break;
        case ("FolderView"):
          var vw=widget.ThreadView;
          if (vw.Selected){
            var itmFile=vw.Selected.Data;
            mbx.DB.Commands.readAndForward(itmFile);
          };
          break;
        case ("mailComposer","mailReader") :
          var itmFile=widget.DataSet.Fields;
          mbx.DB.Commands.readAndForward(itmFile);
          break;
      };
    };
    tb.Buttons.Sep2=tb.createSeperator();
    */
    tb.Buttons.Junk=tb.createButton(coLang.Table.Mail.Junk,coTheme.Icons.Spectrum.Mail.Junk);
    tb.Buttons.Junk.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      var tab=mbx.Tabsbar.Selected;
      var vw=tab.Data, dbItem=null, itm=null;
      switch (tab) {
        case (mbx.Tabsbar.Tabs.Inbox) : {
          dbItem=vw.Selected.Data;
          break;
        };
        default: {
          dbItem=vw.DataSet;
        };
      };
      itm=dbItem.Display.getItemByProperty("Class","ThreadViewItem");
      if (itm) itm.View.onJunkItem(itm);
      mbx.Tabsbar.Tabs.Inbox.Select(coAppUI.ForceSelection);
    };
    tb.Buttons.Delete=tb.createButton(coLang.Table.Buttons.Delete,coTheme.Icons.Spectrum.Mail.Trash);
    tb.Buttons.Delete.setHint(coLang.Table.Apps.Spectrum.Email.Hint.Trash);
    tb.Buttons.Delete.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      var tab=mbx.Tabsbar.Selected;
      var vw=tab.Data, dbItem=null, itm=null;
      switch (vw.Class) {
        case ("mail") : {
          if (vw.Selected) {
            dbItem=vw.Selected.Data;
            vw.onDeleteItem(vw.Selected);
          };
          break;
        };
        case ("sldMailReader"):{
          mbx.DB.Commands.DeleteMessage(vw.DataSet,vw.Folder);
          tab=vw.Folder.Display.getItem(mbx.Tabsbar);
          tab.Select();
          break;
        };
        default: {
          //todo
          break;
        };
      };
    };
    return tb;
  },
  createAttachToolbar : function(Screen){
    var mbx=Screen;
    var tb=coAppUI.App.Components.Toolbar.Create("attachToolbar","Toolbar",mbx,mbx.Slides,mbx.Frame,mbx.Frame.Client,coAppUI.Alignment.Top);
    tb.Unit=this;
    tb.Buttons.Refresh=tb.createButton(coLang.Table.Buttons.Refresh,coTheme.Icons.Spectrum.Folder.Refresh);
    tb.Buttons.Refresh.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      mbx.DB.Commands.AttachmentsList();
    };
    tb.Buttons.Download=tb.createButton(coLang.Table.Buttons.Download,coTheme.Icons.Download.File);
    tb.Buttons.Download.AllowUp=false;
    tb.Buttons.Download.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      var vw=mbx.Nav.gpAttachView.Slide;
      var cmds=vw.Commands;
      var dwn= (cmds.Mode.Index==cmds.Mode.Download);
      if (dwn!=true) {
        if (cmds.Mode.Index!=cmds.Mode.Default)
          cmds.Cancel();
        cmds.setMode(cmds.Mode.Download);
        mbx.tbAttach.Buttons.Download.setDown();
        cmds.onCommand=function(){
            var mbx=coSpectrum.Mailbox;
            var vw=mbx.Nav.gpAttachView.Slide;
            var li=vw.Items.Selected;
            var dbFile=li.Data;
            mbx.DB.Commands.DownloadFile(dbFile);
        };
        cmds.onCancel=function(){
          mbx.tbAttach.Buttons.Download.setUp();
        };
        cmd.onCommit=function(){
          mbx.tbAttach.Buttons.Download.setUp();
        };
      } else {
        cmds.Cancel();
      };
    };
    tb.Buttons.Upload=tb.createButton(coLang.Table.Buttons.Upload,coTheme.Icons.Upload.File);
    tb.Buttons.Upload.AllowUp=false;
    tb.Buttons.Upload.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      if (btn.Down==true){
        if (mbx.Nav.Selected!=mbx.Nav.gpUploader) {
          mbx.Nav.setSelected(mbx.Nav.gpUploader);
        } else {
          btn.setUp();
          mbx.Nav.setSelected(mbx.Nav.gpAttachView);
        }
      } else {
        mbx.Nav.setSelected(mbx.Nav.gpAttachView);
      };
    };
    tb.Buttons.Sep1=tb.createSeperator();
    tb.Buttons.Delete=tb.createButton(coLang.Table.Buttons.Delete,coTheme.Icons.Spectrum.Mail.Trash);
    tb.Buttons.Delete.onClick=function(btn){
      var mbx=coSpectrum.Mailbox;
      var vw=mbx.Attachments;
      var cmds=vw.Commands;
      if (cmds.Mode.Index!=cmds.Mode.Delete) {
        cmds.Cancel();
        mbx.tbAttach.Buttons.Delete.setDown();
        cmds.setMode(cmds.Mode.Delete);
        cmds.onCommand=null;
        cmds.onConfirm=null;
        cmds.onCancel=function(){
          var mbx=coSpectrum.Mailbox;
          mbx.tbAttach.Buttons.Delete.setUp();
          mbx.Nav.setSelected(mbx.Nav.gpAttachView);
        };
        cmds.onCommit=function(Values){
          var cmds=this;
          var lv=cmds.Owner;
          var mbx=lv.MBX;
          mbx.DB.Commands.multiDeleteFiles(Values);
          mbx.tbAttach.Buttons.Delete.setUp();
        };
        mbx.Nav.setSelected(mbx.Nav.gpAttachView.gpDelete);
      } else {
        cmds.Cancel();
      };
    };
    tb.Visible=false;
    return tb;
  }

};
