var PDFViewer=coVDM.App.Components.PDFViewer = {
  Version           : new Version(2014,9,8,21),
  Title             : new Title("Aurawin PDF Viewer","PDFViewer"),
  Vendor            : new Vendor("Aurawin", "Copyright (&copy;) 2013-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header            : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/viewers/PDFViewer.js',coAppKit.PreLoaded),
  debugToConsole    : true,
  pdfOpener         : null,
  NS_VIEWER         : "/core/vdm/viewers/pdf/web/viewer.html?file=",
  init : function(){
    var exts=this.imageExts=coList.StringArray();
    exts.Add("pdf");
    this.imageOpener=coRegistry.Items.createItem(
      exts,
      function(aItem,Folder,Files,File){
        if (aItem.Screen==null)
          aItem.Screen=PDFViewer.Create();
        aItem.Screen.Show();
        aItem.Screen.Open(Folder,Files,File);
        return aItem;
      }
    );
  },
  Create : function(){
    var vw=coAppScreens.createScreen(
      coVDM.VDM,
      "PDFViewer",
      coLang.Table.Groups.Main.Name,
      coLang.Table.Apps.PDFViewer.Name,
      coLang.Table.Apps.PDFViewer.Title,
      "/core/vdm/imgs/icns/lgo.png",
      0.5,
      0.5,
      coAppUI.Framed,
      "bdrFrame",
      "bdrPDFViewer",
      "bdrFilm"
    );
    vw.AllowFullScreen=true;
    vw.iconInApplications=false;
    vw.SaveGeometry=true;
    vw.FileIndex=-1;
    vw.Folder=null;
    vw.Files=null;
    vw.Mimes=null;
    vw.File=null;
    vw.FileName="";
    vw.ConsealAfterCreate=false;
    vw.ContentType=null;
    vw.Read=function(itmFile) {
      var vw=this;
      if (PDFViewer.debugToConsole==true) coVDM.VDM.Console.Append("PDFViewer.Read");

      var iID=itmFile.MAP.ID.Value;
      var iFolderID=itmFile.MAP.FolderID.Value;

      var sExt=coUtils.extractFileExt(itmFile.MAP.Name.Value);
      vw.ContentType=coContentType.getContentType(sExt);
      if ((vw.ContentType==null) || (vw.ContentType.Kind!=coContentType.fkPDF)) {
        if (PDFViewer.debugToConsole==true)
          coVDM.VDM.Console.Append("PDFViewer.Read ("+sExt+" not registered)");
        return;
      };
      vw.setStatus(
        coLang.Table.Status.Viewer.Image.Loading,
        vw.Folder.MAP.Path.Value,
        itmFile.MAP.Name.Value
      );
      var sURL=vw.Files.getURL(itmFile);
      vw.Viewer.iFrame.src=PDFViewer.NS_VIEWER+escape(sURL);
      vw.File=itmFile;
    };
    vw.Get=function(Folder,Name,sURL){
      var vw=this;
      vw.Folder=Folder;
      vw.FileName=Name;
      vw.setStatus(
        coLang.Table.Status.Viewer.Image.Loading,
        vw.Folder.MAP.Path.Value,
        Name
      );
      vw.Viewer.iFrame.src=PDFViewer.NS_VIEWER+sURL;
    };
    vw.Open=function(Folder,Files,File){
      var vw=this;
      vw.Folder=Folder;
      vw.Files=Files;
      if (PDFViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("PDFViewer.Open");
      vw.FileName=File.MAP.Name.Value;
      vw.Read(File);
    };
    vw.onHide=function(){
      var vw=this;
      //vw.Reader.Conseal();
      vw.Viewer.Conseal()
    };
    vw.onShow=function(){
      var vw=this;
      vw.Viewer.Reveal();
      //vw.Reader.Reveal();
    };
    vw.onFree=function(){
      var vw=this;
    };
    vw.onResize=function(){
      var vw=this;
    };
    vw.Description=coLang.Table.Apps.PDFViewer.Description;
/*
    vw.Reader=vw.Slides.createSlide("Reader","PDFReader",vw,vw.Frame,vw.Frame.Client,coAppUI.Alignment.Client);
    vw.Reader.Control=document.createElement(coDOM.tagEmbed);
    vw.Reader.Container.appendChild(vw.Reader.Control);
    vw.Reader.Control.className=vw.Class;
    vw.Reader.Control.Owner=vw.Reader;
    vw.Reader.Control.style.width="100%";
    vw.Reader.Control.style.height="100%";
    vw.Reader.Control.setAttribute("type","application/pdf");
    vw.Reader.evtLoaded=coEvents.Add(
      vw.Reader.Control,
      "load",
      function(e) {
        var rdr=this.Owner;
        var vw=this.Owner.Owner;
        var doc=rdr.Control.contentDocument();
      },
      coEvents.Capture,
      coEvents.Active
    );
*/
    vw.Viewer=coAppUI.App.Components.iFrame.Create("iFrame","PDFViewer",vw,vw.Slides,vw.Frame,vw.Frame.Client,coAppUI.Alignment.Client);
    vw._setStatus=vw.setStatus;
    vw.setStatus=function(Message,sPath,sName){
      var vw=this;
      sStatus=Message.replace("$Path",sPath);
      sStatus=sStatus.replace("$Name",sName);
      vw.Frame.TitleBar.setCaption(vw.Caption+" : "+sName);
      vw._setStatus(sStatus);
    };

    vw.Viewer.iFrame.onload=function(){
      var vw=this.Owner.Owner.Screen;
      vw.setStatus(
        coLang.Table.Status.Viewer.Image.Viewing,
        vw.Folder.MAP.Path.Value,
        vw.FileName
      );
      var emb=coDOM.firstChildByKind(vw.Viewer.iFrame.contentWindow.document.body,coDOM.tagEmbed);
      if (emb) {
        emb.style.display="block";
        emb.style.position="absolute";
        emb.style.overflowX="auto";
        emb.style.overflowY="auto";
        emb.style.webkitOverflowScrolling="touch";
        emb.style.height=emb.style.width="100%";
        emb.style.left=emb.style.top="0px";

      };

      emb=null;
    };
    return vw;
  }
};
coVDM.App.Components.PDFViewer.init();
