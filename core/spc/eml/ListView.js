coMail.App.Components.ListView = {
  Version        : new Version(2013,9,9,8),
  Title          : new Title("Spectrum Mail List View","ListView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/ListView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var mbx=Screen;
    lv=coAppUI.App.Components.ListView.Create("Files","ListView",mbx,mbx.Slides,mbx.Frame,mbx.Frame.Client,coAppUI.Alignment.Client);
    var ds = lv.DataSet = mbx.DB.createFiles();
    ds.Displays.Add(lv);
    lv.MBX=mbx;
    lv.Header.Columns.addItem(ds.Fields.MAP.Name);
    lv.Header.Columns.addItem(ds.Fields.MAP.Created);
    lv.Header.Columns.addItem(ds.Fields.MAP.Modified);
    lv.Header.Columns.addItem(ds.Fields.MAP.Size);
    lv.onDoubleClick=function(itm){
        var itmFile=itm.Data;
        var sFile=itmFile.MAP.Name.Value;
        var aItem=coRegistry.Items.Open(sFile,itmFile);
        if (aItem){
          // can do stuff with screen
        };
    };
    lv._onFree=lv.onFree;
    lv.onFree=function(){
        var lv=this;
        lv.DataSet.Free();
        if (lv._onFree) lv._onFree();
    };
    var tab=lv.Tab=mbx.Tabsbar.Tabs.Attachments=mbx.Tabsbar.createTab(coLang.Table.Mail.Attachments,coTheme.Icons.Spectrum.Folder.Open,coAppUI.AutoSize,coAppUI.allowClose);
    tab.Hide();
    tab.Hidden=true;
    tab.Data=lv;
    tab.onSelect=function(tab){
      var lv=tab.Data;
      var mbx=lv.MBX;
      mbx.Nav.setSelected(mbx.Nav.gpAttachView);
      if (mbx.tbAttach.Buttons.Upload.Down==true)
        mbx.Nav.setSelected(mbx.Nav.gpUploader);
      tab.Show();
      lv.Show();
      mbx.Folders.Mail.Attachments.Select();
      mbx.tbAttach.Buttons.Refresh.Click();
    };
    tab.onUnselect=function(tab){
      var lv=tab.Data;
      lv.Hide();
    };
    tab.onClose=function(tab){
        var lv=tab.Data;
        tab.Hide();
        lv.Hide();
    };
    return lv;
  }
};
