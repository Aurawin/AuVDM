coCMS.App.Components.Editor = {
  Version        : new Version(2014,10,26,12),
  Title          : new Title("Aurawin CMS Editor","Editor"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCMS.App,'/core/cms/Editor.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(coCMS.App,'/core/cms/Editor.js',coAppKit.PreLoaded),
  Unit           : '/core/cms/Editor.js',
  debugToConsole : true,
  List           : new Array(),
  Active         : null,
  init : function(){
    this.List.getActive=function(ID){
      for (var iLcv=0,sc=null; iLcv<this.length; iLcv++){
        sc=this[iLcv];
        if (  (Assigned(sc)) && (sc.File.MAP.ID.Value==ID))
          return this[iLcv];
      };
      return null;
    };
  },
  Open  : function(Folder,File,ContentType){
    var edt=this.List.getActive(File.MAP.ID.Value)
    if (!edt) {
      edt=this.Create();
      edt.Open(Folder,File,ContentType);
    } else {
      edt.BringToTop();
    };
  },
  Create:function(){
    var ss=coAppScreens.createScreen(
      coVDM.VDM,
      "screenCMSEditor",
      "System",
      coLang.Table.Apps.Editor.CMS.Name,
      coLang.Table.Apps.Editor.CMS.Title,
      coTheme.Icons.Text.File,
      0.5,
      0.5,
      coAppUI.Frame,
      "frmScreen",
      "bdrScreen",
      "flmScreen",
      "cntScreen"
    );
    ss.Unit=this;
    ss.Description=coLang.Table.Apps.Editor.CMS.Description;
    ss.Position=coApp.Position.TopLeft;
    ss.State=coApp.State.Normal;
    ss.iconInApplications=false;
    ss.iconInTaskList=true;
    ss.AllowFullScreen=true;
    ss.SaveGeometry=true;
    ss.FreeOnClose=true;
    ss.File=coCMS.App.Components.DB.createFile();
    ss.setStatus(coLang.Table.Apps.Editor.CMS.Status.Idle);
    ss.Client=ss.Slides.createSlide(
      "sldClient",
      "sldEditorCMSMemo",
      ss,
      ss.Frame,
      ss.Frame.Client,
      coAppUI.Alignment.Client
    );
    ss.Client.Hidden=false;
    ss.Client.Visible=true;
    ss.Content=coAppUI.App.Components.CMS.createEditor("Content","CMSContent",ss.Client);
    ss.Content.onCursorChanged=function(Column,Row){
      var sc=this.Screen;
      sc.Nav.Status.Column.setCaption(Column+1);
      sc.Nav.Status.Row.setCaption(Row+1);
    };
    ss.Content.onSave=function(){
      this.Screen.Nav.Menu.Save.doClick();
    }
    coTheme.UI.Ace.Apply(ss.Content.Control);
    ss.onSetDataComplete=function(Socket){
      var ss=Socket.Owner;
      // data has updated XML for File
      var xDoc=coCMS.App.DB.Parser.Parse(Socket.responseText);
      var xItem=coXML.getStanza(xDoc,ss.File.Stanza,xDoc.documentElement);
      if (xItem){
        ss.File.fromXML(xDoc,xItem);
      };
    };
    ss.onGetDataComplete=function(Socket){
      var ss=Socket.Owner;
      ss.Content.Loading=true;
      try {
        ss.Content.Control.setValue(Socket.responseText,-1);
        ss.Content.Loading=false;
      } catch (err){
        ss.Content.Loading=false;
      };
      ss.Content.Control.setReadOnly(false);
      ss.Content.Control.session.getUndoManager().markClean();

      var sFile=ss.Folder.MAP.Path.Value+"/"+ss.File.MAP.Name.Value;
      var sStatus=coLang.Table.Apps.Editor.CMS.Status.Editing.replace("$uri",sFile);
      ss.setStatus(sStatus);
    };
    ss.onGetDataFailed=function(Socket){
      var ss=Socket.Owner;
      ss.Content.Control.setValue("");
      ss.Nav.Torus.Stop();
    };
    ss.onSetDataFailed=function(Socket){
      var ss=Socket.Owner;
      ss.Nav.Torus.Stop();
    };
    ss.Save=function(){
      var ss=this;
      ss.Nav.Torus.Start();
      var sURL=coCMS.NS_FILE_SET_DATA.replace("$fid",ss.Folder.MAP.ID.Value).replace("$id",ss.File.MAP.ID.Value);
      coDOM.httpPOST(ss,sURL,ss.Content.Control.getValue(),ss.ContentType.Name,ss.onSetDataComplete,ss.onSetDataFailed);
    };
    ss.Revert=function(){
      var ss=this;
      ss.Nav.Torus.Start();
      var sURL=coCMS.NS_FILE_GET_DATA.replace("$fid",ss.Folder.MAP.ID.Value).replace("$id",ss.File.MAP.ID.Value);
      coDOM.httpGET(ss,sURL,ss.onGetDataComplete,ss.onGetDataFailed);
    };
    ss.Open=function(Folder,File,ContentType){
      if (ContentType==undefined) ContentType=coContentType.getFileContentType(File.MAP.Name.Value)
      var ss=this;
      ss.ContentType=ContentType;
      ss.Folder=Folder;
      ss.File.Assign(File);
      ss.Reveal();
      var sFile=Folder.MAP.Path.Value+"/"+File.MAP.Name.Value;
      var sStatus=coLang.Table.Apps.Editor.CMS.Status.Loading.replace("$uri",sFile);
      ss.setStatus(sStatus);
      ss.Frame.setCaption(sFile);
      var sURL=coCMS.NS_FILE_GET_DATA.replace("$fid",Folder.MAP.ID.Value).replace("$id",File.MAP.ID.Value);
      switch (ContentType.Kind){
        case (coContentType.fkText):
        case (coContentType.fkAppCache): {
          ss.Content.Control.getSession().setMode("ace/mode/text");
          break;
        };
        case (coContentType.fkHTML): {
          ss.Content.Control.getSession().setMode("ace/mode/html");
          break;
        };
        case (coContentType.fkJavaScript):{
          ss.Content.Control.getSession().setMode("ace/mode/javascript");
          break;
        };
        case (coContentType.fkCSS): {
          ss.Content.Control.getSession().setMode("ace/mode/css");
          break;
        };
        case (coContentType.fkXML): {
          ss.Content.Control.getSession().setMode("ace/mode/xml");
          break;
        };
      };
      coDOM.httpGET(ss,sURL,ss.onGetDataComplete,ss.onGetDataFailed);
    };
    ss.onResize=function(){
      this.Content.Control.resize();
    };
    ss.doHide=function(){
    };
    ss.doFree=function(){
      var ss=this;
      var lst=coCMS.App.Components.Editor.List;
      var idx=lst.indexOf(ss);
      if (idx>-1) lst.splice(idx,1);

      ss.File.Free();
    };
    ss.Nav=coCMS.App.Components.Navs.createEditor(ss);
    ss.Conseal();
    this.List.push(ss);
    return ss;
  }
};
coCMS.App.Components.Editor.init();
