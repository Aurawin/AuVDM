coMail.App.Components.TabsBar = {
  Version        : new Version(2014,9,24,11),
  Title          : new Title("Spectrum Mail Tabs Bar","TabsBar"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/TabsBar.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create:function(Screen){

    var mbx=Screen;
    var tb=coAppUI.App.Components.TabsBar.Create("mailTabs","TabsBar",mbx,mbx.Main.Slides,mbx.Main,mbx.Main.Container,coAppUI.Alignment.Top);
    tb.Unit=this;
    tb.MBX=mbx;
    tb.setCorners(0);
    tb.Tabs.Folders=tb.createTab(coAppUI.NoCaption,coTheme.Icons.Spectrum.Folder.Collection,coAppUI.AutoSize,coAppUI.disableClose);
    tb.Tabs.Folders.AllowSelection=false;
    tb.Tabs.Folders.onSelect=function(Tab){
      var tabs=Tab.Owner;
      var sc=Tab.Owner.Screen;
      var mfst=coVDM.Manifest;
      if (sc.Folders.Visible==true){
        Tab.Selected=false;
        sc.Folders.Conseal();
        sc.Splitter.Conseal();

      } else {
        Tab.Selected=true;
        sc.Folders.Reveal();
        sc.Splitter.Reveal();
        sc.Folders.Container.style.width=mfst.MailboxFolders.MAP.Width.Value+"px";
      };
      switch (sc.Nav.Selected) {
        case (sc.Nav.gpInbox) : {
          mfst.MailboxFolders.MAP.ForInbox.Value=Tab.Selected;
          break;
        };
        case (sc.Nav.gpFolderView) : {
          mfst.MailboxFolders.MAP.ForMailbox.Value=Tab.Selected;
          break;
        };
        case (sc.Nav.gpFullReader):{
          mfst.MailboxFolders.MAP.ForReader.Value=Tab.Selected;
          break;
        };
        case (sc.Nav.gpWriter):
        case (sc.Nav.gpWriterOptions):
        case (sc.Nav.gpWriterSigs):
        {
          mfst.MailboxFolders.MAP.ForWriter.Value=Tab.Selected;
          break;
        };
      };
      mfst.Save();
    };
    tb.Tabs.Inbox=null;
    tb.Tabs.Outbox=null;
    tb.Tabs.Attachments=null;

    return tb;
  },
  initInbox:function(sc){
    var tab=sc.Tabsbar.Tabs.Inbox=sc.Views.Inbox.Tab;
    tab.Hidden=false;
    tab.setCaption(coLang.Table.Mail.Inbox);
    tab.setIcon(coTheme.Icons.Spectrum.Mail.Inbox.Empty);
    tab.AutoSize=coAppUI.NoAutoSize;
    tab.AllowClose=coAppUI.disableClose;
    tab.Data=sc.Views.Inbox;
    tab.onSelect=function(tab){
      var tb=tab.Owner;
      var mbx=tb.MBX;
      var ibx=((mbx.Folders) && (mbx.Folders.Mail) )? mbx.Folders.Mail.Inbox: null;
      if (ibx) ibx.Select();
      mbx.Views.Inbox.Reveal();
      mbx.Nav.gpMark.Slide=mbx.Views.Inbox;
      mbx.Nav.setSelected(mbx.Nav.gpInbox);
      mbx.tbMain.Buttons.Junk.setIcon(coTheme.Icons.Spectrum.Mail.Junk);
      mbx.tbMain.Buttons.Junk.setHint(coLang.Table.Apps.Spectrum.Email.Hint.Junk);
      mbx.tbMain.Buttons.Junk.setCaption(coLang.Table.Mail.Junk);
      mbx.tbMain.Buttons.Junk.Show();
    };
    tab.onUnselect=function(tab){
      var tb=tab.Owner;
      var mbx=tb.MBX;
      mbx.Views.Inbox.Conseal();
    };
  },
  initOutbox:function(sc){
    var tab=sc.Tabsbar.Tabs.Outbox=sc.Views.Outbox.Tab;
    tab.Hidden=false;
    tab.setCaption(coLang.Table.Mail.Outbox);
    tab.setIcon(coTheme.Icons.Spectrum.Folder.Outbox);
    tab.AutoSize=coAppUI.NoAutoSize;
    tab.AllowClose=coAppUI.disableClose;
    tab.Data=sc.Views.Outbox;
    tab.onSelect=function(tab){
      var tb=tab.Owner;
      var mbx=tb.MBX;
      var ibx=((mbx.Folders) && (mbx.Folders.Mail) )? mbx.Folders.Mail.Outbox: null;
      if (ibx) ibx.Select();
      mbx.Views.Outbox.Reveal();
      mbx.Nav.gpMark.Slide=mbx.Views.Outbox;
      mbx.Nav.gpFolderView.Slide=mbx.Views.Outbox;
      mbx.Nav.setSelected(mbx.Nav.gpFolderView);
      mbx.tbMain.Buttons.Junk.Conseal();
    };
    tab.onUnselect=function(tab){
      var tb=tab.Owner;
      var mbx=tb.MBX;
      mbx.Views.Outbox.Conseal();
    };
  }
};
