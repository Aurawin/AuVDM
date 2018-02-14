coCabinet.App.Components.Converter = {
  Version              : new Version(2015,2,19,52),
  Title                : new Title("Spectrum Cabinet Converter","Converter"),
  Vendor               : new Vendor("Aurawin", "Copyright (&copy;) 2012-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header               : coAppKit.Dependencies.Create(coCabinet.App,'/core/spc/fldrs/Converter.js',coAppKit.PreLoaded),
  Usage                : coAppKit.Units.Create(coCabinet.App,'/core/spc/fldrs/Converter.js',coAppKit.PreLoaded),
  debugToConsole       : true,
  saNonStreamingVideos : new Array("avi","mpg","mov"),
  saStreamingVideos    : new Array("mp4"),

  Create : function(Screen,Slides,Owner,Parent){
    var con=coAppUI.App.Components.MultiView.Create("Converter","CabinetConverter",Screen,Slides,Owner,Parent,coAppUI.Alignment.Center);
    con.Slides.Video=con.Slides.createSlide("Video","sldVideoConverter",Screen,con,con.Container,coAppUI.Alignment.Client);
    con.Slides.Video.clearContainerClass();
    con.Output=null;
    con.File=null;
    con.ListView=null;
    con.Torus=coAppUI.App.Components.Torus.Create(Screen.Frame,con,con.Container);
    var Nav=con.Nav;
    Nav.Torus=con.Torus;
    Nav.Home.Slide=con.Slides.Video;
    Nav.Home.Conseal();
    Nav.Menu.Conseal();
    Nav.Confirm=Nav.Items.addItem(
      Nav.itemKind.Confirm,"cnfConvert",[coLang.Table.Buttons.Convert,coLang.Table.Buttons.Cancel],
      Nav.oAutoShowOn,
      Nav.oCascadeOff,
      Nav.oAddToShowList,
      Nav.oSetAsDefaultOn,
      Nav.NoTarget,
      Nav.NoSlide,
      Nav.NoShowList,
      Nav.NoHideList,
      Nav.NoReturn,
      [
        function(btn){
          var sc=btn.Nav.Screen;
          var con=sc.Converter;
          var sURL=con.File.Collection.transformURL(con.File);
          con.Request=coAppUI.App.Components.Request.Create(con);
          con.Request.onComplete=con.onRequested;
          con.Request.onError=con.onRequestError;
          con.Request.setURL(sURL);
        },
        function(btn){
          var sc=btn.Nav.Screen;
          var con=sc.Converter;
          con.TreeView.lockSelection=false;
          con.Conseal();
        }
      ]
    );
    var pnls=con.Slides.Video.Panels=coAppUI.App.Components.Panels.Create("Converter","pnlsConverter",Screen.Frame,con.Slides.Video,con.Slides.Video.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);
    pnls.TopPanels=pnls.createItem("",pnls.Kind.Panels,"TopPanels","pnlConverterPanels",coAppUI.Alignment.Top);
    pnls.TopPanels.Panels=coAppUI.App.Components.Panels.Create("TopPanels","pnlsConverter",Screen.Frame,pnls.TopPanels,pnls.TopPanels.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);
    pnls.TopPanels.Glyph=pnls.TopPanels.Panels.createItem("",pnls.Kind.Image,"Glyph","pnlConverterGlyph",coAppUI.Alignment.Left);
    pnls.TopPanels.Glyph.setGlyph(coTheme.Icons.Video.Convert);
    pnls.TopPanels.Message=pnls.TopPanels.Panels.createItem(coLang.Table.Apps.MovieViewer.Converter.Title,pnls.Kind.Blank,"Message","pnlConverterLabel",coAppUI.Alignment.Client);


    pnls.FullPanels=pnls.createItem("",pnls.Kind.Panels,"FullPanels","pnlConverterPanels",coAppUI.Alignment.Client);
    pnls.FullPanels.Panels=coAppUI.App.Components.Panels.Create("FullPanels","pnlsConverter",Screen.Frame,pnls.FullPanels,pnls.FullPanels.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);
    pnls.FullPanels.FileName=pnls.FullPanels.Panels.createItem("",pnls.Kind.Blank,"FileName","pnlConverterFileName",coAppUI.Alignment.Top);
    pnls.FullPanels.Notice=pnls.FullPanels.Panels.createItem(coLang.Table.Apps.MovieViewer.Converter.Notice,pnls.Kind.Blank,"Notice","pnlConverterNotice",coAppUI.Alignment.Top);
    con.doError=function(){
      var con=this;
      var pnls=con.Slides.Video.Panels;

      pnls.FullPanels.Notice.setText(coLang.Table.Apps.MovieViewer.Converter.ErrorNotice);
      pnls.FullPanels.FileName.setText(coLang.Table.Apps.MovieViewer.Converter.getFileNameErrorText(con.File.MAP.Name.Value));

      con.Nav.Home.Reveal();
    };
    con.onRequestError=function(Request){
      var con=Request.Owner;
      con.doError();
      con.Request=null;
    };
    con.Ping=function(){
      var con=this;
      var sc=con.Screen;
      var DS=con.File.Collection;
      var netCMD=DS.Commands.createCommand(
        coVDM.VDM.Net,
        DS.NS_CORE,
        DS.NS_CMD_READ,
        coXML.Header+con.Output.toXML(),
        function(netCMD){ // Success
          var itmFile=netCMD.Data;
          var con=netCMD.Owner;
          if (netCMD.Code==coNet.CO_STATUS_OK){
            var col=con.Output.Collection;
            var xDoc=netCMD.dataRecv;
            var xItem=coXML.getStanza(xDoc,itmFile.Stanza,xDoc.documentElement);
            var xSum=coXML.getChildByName(xItem,itmFile.MAP.Summary.Tag);
            var iStatus=coXML.TagAsInteger(xSum.childNodes,"st",-1);
            itmFile.fromXML(xDoc,xItem);
            if (iStatus==0) {
              con.Conseal();
              con.Torus.Stop();
              con.TreeView.lockSelection=false;
              col.Displays.SyncItem(con.Output);
              coRegistry.Items.Open(con.Output.MAP.Name.Value,con.Folder,col,con.Output);
            } else {
              con.Ping();
            };
          } else {
            con.Ping();
          };
        },
        function(netCMD){ // Error
        },
        function(netCMD){ // Timeout
        },
        coNet.NoProgress,
        coNet.CreateSuspended,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=con.Output;
      netCMD.Owner=con;
      netCMD.Commands=DS.Commands;
      setTimeout(function(){netCMD.Try();},coCabinet.ConverterPingDelay);
      return netCMD;
    };
    con.onRequested=function(Request){
      var con=Request.Owner;

      if (Request.Socket.status==200) {

        var xDoc=coXML.Parser.Parse(Request.Socket.response);
        var xItem=coXML.getStanza(xDoc,con.Output.Stanza,xDoc.documentElement);
        con.Output.fromXML(xDoc,xItem);

        var col=con.Output.Collection;

        var dbItem=col.getItemById(con.Output.MAP.ID.Value);
        if (!dbItem)
          col.Items.push(con.Output);

        col.Displays.SyncItem(con.Output);

        var liFile=con.File.getDisplay(con.ListView);
        var liOutput=con.Output.getDisplay(con.ListView);

        con.ListView.Items.moveToBefore(liOutput,liFile);
        con.Torus.Start();

        pnls.FullPanels.Notice.setText(coLang.Table.Apps.MovieViewer.Converter.CopyNotice);
        pnls.FullPanels.FileName.setText(coLang.Table.Apps.MovieViewer.Converter.getFileNameCopyText(con.File.MAP.Name.Value));

        con.Ping();

      } else {
        con.doError();
      };
      con.Request=null;
    };
    con.getConvertedFile=function(dbFolder,dbItem){
      if (this.Visible==true) return null;

      var con=this;
      var sc=con.Screen;
      var lv=sc.ListView;
      var tv=sc.Tree;
      var DS=dbItem.Collection;
      var exNonStreamingVideos=coCabinet.App.Components.Converter.saNonStreamingVideos;
      var exStreamingVideos=coCabinet.App.Components.Converter.saStreamingVideos;
      var sOrigExt=coUtils.extractFileExt(dbItem.MAP.Name.Value);
      var sExt=sOrigExt.toLowerCase();

      if (exNonStreamingVideos.indexOf(sExt)!=-1) {
        sName=coUtils.changeFileExt(dbItem.MAP.Name.Value,".mp4");
        var dbStreams=DS.getItem(DS.Fields.MAP.Name,sName);
        if (!dbStreams){
          // show a message that confirms the conversion...
          con.Output=dbItem.Collection.createItem();
          con.File=dbItem;
          con.Folder=dbFolder;
          con.ListView=lv;
          con.TreeView=tv;
          con.Reveal();
          con.TreeView.lockSelection=true;
          con.Slides.Video.Reveal();
          con.Nav.Home.Conseal();
          con.Nav.forceSelected(con.Nav.Confirm);
          var pnls=con.Slides.Video.Panels;
          pnls.FullPanels.Notice.setText(coLang.Table.Apps.MovieViewer.Converter.Notice);
          pnls.FullPanels.FileName.setText(coLang.Table.Apps.MovieViewer.Converter.getFileNameText(dbItem.MAP.Name.Value));

          return null;
        } else {
          // already converted... Just play this version
          return dbStreams;
        };
      } else {
        return dbItem;
      };
    };
    con.Conseal();
    return con;
  }
};
