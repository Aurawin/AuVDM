coMail.App.Components.Reader = {
  Version        : new Version(2015,8,15,85),
  Title          : new Title("Spectrum Mail Reader","Reader"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/Reader.js',coAppKit.PreLoaded),
  debugToConsole : true,
  createFullReader: function(Screen,itm){
    var mbx=Screen;
    var _fr=mbx.Main.Slides.createSlide("Reader","sldMailReader",mbx,mbx.Main,mbx.Main.Container,coAppUI.Alignment.Client);
    _fr.Unit=this;

    mbx.Readers.push(_fr);
    _fr.MBX=mbx;
    _fr.Folder=null;
    _fr.mimeCount=0;

    _fr.Contents=coList.ObjectList(coList.KeepOnClear);
    _fr.Commands=coList.ObjectList(coList.FreeOnClear);

    _fr.Tab=mbx.Tabsbar.createTab("Reader",coTheme.Icons.Spectrum.Mail.Read,coAppUI.AutoSize,coAppUI.allowClose);
    _fr.Item=itm;
    _fr.Tab.Data=_fr;
    _fr.Tab.Show();
    _fr.Tab.Hidden=false;
    _fr.Tab.onClose=function(tab){
      var fr=tab.Data;
      var mbx=fr.MBX;
      var vi=fr.Item;
      var Folder=fr.Folder;
      if (fr.Visible==true){
        mbx.Tabsbar.Selected=null;
        var tn=Folder.Display.getItem(mbx.Folders);
        if (tn) mbx.Folders.onItemSelected(tn);
      };
      fr.Item=null;
      fr.Free();
      if (vi) vi.Reader=null;
    };
    _fr.Tab.onSelect=function(tab){
      var fr=tab.Data;
      var mbx=fr.MBX;
      if (fr.Item) fr.Item.Select();
      if (mbx.Nav.gpFullReader.Slide!=fr){
        mbx.Nav.gpFullReader.Slide=fr;
        if (mbx.Nav.Selected!=mbx.Nav.gpFullReader) {
          fr.Loading=true;
          try {
            mbx.Nav.forceSelected(mbx.Nav.gpFullReader);
            fr.Loading=false;
          } catch (err) {
            fr.Loading=false;
            throw err;
          };
        } else {
          fr.Reveal();
        };
      };
    };
    _fr.Tab.onUnselect=function(tab){
      var fr=tab.Data;
      var mbx=fr.MBX;
      mbx.Nav.gpFullReader.Slide=null;
      fr.Conseal();
    };
    _fr.DataSet=itm.Data;

    var sldTop=_fr.Slides.Top=_fr.Slides.createSlide("Top","sldMailReaderTop",mbx,_fr,_fr.Container,coAppUI.Alignment.Top);
    var sldAttaches=_fr.Slides.Attaches=coAppUI.App.Components.IconListView.Create("Attaches",coLang.Table.Mail.Files,mbx,_fr.Slides,_fr,_fr.Container,coAppUI.Alignment.Top);
    var sldBody=_fr.Slides.Body=_fr.Slides.createSlide("Body","sldMailReaderBody",mbx,_fr,_fr.Container,coAppUI.Alignment.Client);
    //coAppUI.App.Components.iFrame.Create("Body","ifMailReaderBody",mbx,_fr.Slides,_fr,_fr.Container,coAppUI.Alignment.Client);
    _fr.clearContainerClass();
    sldTop.clearContainerClass();

    sldAttaches.clearContainerClass();
    sldBody.clearContainerClass();
    sldAttaches.Title.Conseal();
    sldAttaches.Mode.setValue(coTheme.Icons.Spectrum.Mail.Reader.AttachmentsMode);
    sldAttaches.setHeight(coTheme.Icons.Spectrum.Mail.Reader.AttachmentHeight);
    var sbj=sldTop.Controls.Subject=coAppUI.App.Components.Label.Create(sldTop,sldTop.Container,"Subject","lblMailReaderSubject","");
    sbj.Placement.Top=4;
    sbj.Placement.Left=4;
    sbj.Placement.Right=4;
    sbj.Placement.Mode.setTopLeftRight();


    var hr=sldTop.Controls.Line1=coAppUI.App.Components.Line.Create(sldTop,sldTop.Container,"Line1","lnMailReader1");
    hr.Placement.Top=28;
    hr.Placement.Left=4;
    hr.Placement.Right=4;
    hr.Placement.Mode.setTopLeftRight();

    var ava=sldTop.Controls.Avatar=coAppUI.App.Components.Glyph.Create(sldTop,sldTop.Container,"Avatar","glyMailReaderAvatar","",coTheme.Icons.Spectrum.Mail.Stamp);
    ava.Placement.Top=30;
    ava.Placement.Left=2;
    ava.Placement.Mode.setTopLeft();

    var dte=sldTop.Controls.Date=coAppUI.App.Components.Label.Create(sldTop,sldTop.Container,"Date","lblMailReaderDate","");
    dte.Placement.Top=32;
    dte.Placement.Right=8;
    dte.Placement.Mode.setTopRight();

    var nme=sldTop.Controls.Name=coAppUI.App.Components.Label.Create(sldTop,sldTop.Container,"Name","lblMailReaderName","");
    nme.Placement.Top=30;
    nme.Placement.Left=52;
    nme.Placement.Right=4;
    nme.Placement.Mode.setTopLeftRight();

    var rcps=sldTop.Controls.Recipients=coAppUI.App.Components.Label.Create(sldTop,sldTop.Container,"Recipients","lblMailReaderRecipients","");
    rcps.Placement.Top=48;
    rcps.Placement.Left=52;
    rcps.Placement.Right=4;
    rcps.Placement.Mode.setTopLeftRight();

    var ccs=sldTop.Controls.CC=coAppUI.App.Components.Label.Create(sldTop,sldTop.Container,"Carbon Copy","lblMailReaderCarbonCopies","");
    ccs.Placement.Top=65;
    ccs.Placement.Left=52;
    ccs.Placement.Right=4;
    ccs.Placement.Mode.setTopLeftRight();

    _fr.DecodeData=function(mItem,Data){
      var fr=this;
      switch (mItem.MAP.cntCharSet.Value){
        case (smtp.CharSet.UTF_8) :
          Data=smtp.UnEscapeUTF8(Data); break;
        case smtp.CharSet.USASCII :
        case smtp.CharSet.ISO_8859_1 :
        case smtp.CharSet.ISO_8859_2 :
        case smtp.CharSet.ISO_8859_3 :
        case smtp.CharSet.ISO_8859_4 :
        case smtp.CharSet.ISO_8859_5 :
        case smtp.CharSet.ISO_8859_6 :
        case smtp.CharSet.ISO_8859_7 :
        case smtp.CharSet.ISO_8859_8 :
        case smtp.CharSet.ISO_8859_8_1 :
        case smtp.CharSet.ISO_8859_9 :
        case smtp.CharSet.ISO_8859_10 :
        case smtp.CharSet.ISO_8859_11 :
        case smtp.CharSet.ISO_8859_12 :
        case smtp.CharSet.ISO_8859_13 :
        case smtp.CharSet.ISO_8859_14 :
        case smtp.CharSet.ISO_8859_15 :
        case smtp.CharSet.ISO_8859_16 :
          Data=smtp.UnEscapeISO(Data,mItem.MAP.cntCharSet.Value); break;
        case smtp.CharSet.Windows_874:
        case smtp.CharSet.Windows_1250:
        case smtp.CharSet.Windows_1251:
        case smtp.CharSet.Windows_1252:
        case smtp.CharSet.Windows_1253:
        case smtp.CharSet.Windows_1254:
        case smtp.CharSet.Windows_1255:
        case smtp.CharSet.Windows_1256:
        case smtp.CharSet.Windows_1257:
        case smtp.CharSet.Windows_1258:
          Data=smtp.UnEscapeWindows(Data,mItem.MAP.cntCharSet.Value); break;
        case smtp.CharSet.GB2312:
        case  smtp.CharSet.GB18030 :
          Data=smtp.UnEscapeGB(Data,mItem.MAP.cntCharSet.Value); break;
      };
      return Data;
    };
    _fr.displayMime=function(Element,mItem,Data){
      var fr=this;
      var sc=fr.Screen;
      fr.mimeCount-=1;
      if (fr.mimeCount<=0) {
        fr.mimeCount=0;
        fr.Loading=false;
      };
      var smtp=coSpectrum.SMTP;
      if (fr.divLoading) {
        fr.divLoading.parentElement.removeChild(fr.divLoading);
        fr.divLoading=null;
      };
      switch (mItem.MAP.cntType.Value){
        case (coSpectrum.SMTP.ContentType.TextPlain): {
          Element.className="txtSMTPMsg";
          Data=coSpectrum.SMTP.TextToHTML(Data);
          coDOM.setHTML(Element,Data);
          coDOM.enableSelect(Element);
          break;
        };
        case (coSpectrum.SMTP.ContentType.TextHTML): {
          Element.className="txtSMTPMsg";
          coDOM.setHTML(Element,Data);
          coDOM.enableSelect(Element);
          var lst=Element.getElementsByTagName(coDOM.tagImage);
          for (var iLcv=0; iLcv<lst.length; iLcv++){
            lst[iLcv].onerror=function(){
              this.style.display="none";
            };
          };
          break;
        };
        case (coSpectrum.SMTP.ContentType.Image): {
          var sName=mItem.MAP.cntName.Value;
          var sExt=coUtils.extractFileExt(sName);
          var ct=coContentType.getContentType(sExt);
          if (ct){
            // we can append image of certain type
            Element.className="imgSMTPMsg";
            Element.src="data:"+ct.Name+";base64, "+Data;
          };
          break;
        };
      };
    };
    _fr.Render=function(){
      var fr=this;
      var smtp=coSpectrum.SMTP;
      var regEx=sData=ct=sExt=sName=nCID=nCMD=mCMD=mCID=sID=null;
      for (var iLcv=0; iLcv<fr.Commands.length; iLcv++){
        nCMD=fr.Commands[iLcv];
        mCMD=nCMD.Mime;
        switch (mCMD.MAP.cntType.Value) {
          case (smtp.ContentType.TextPlain): {
            nCMD.dataRecv=coEncoding.base64Decode(nCMD.dataRecv);
            if (mCMD.MAP.cntEncoding.Value==smtp.ContentEncoding.QuotedPrintable) {
              nCMD.dataRecv=fr.DecodeData(mCMD,nCMD.dataRecv);
            };
            break;
          };
          case (coSpectrum.SMTP.ContentType.TextHTML):
            nCMD.dataRecv=coEncoding.base64Decode(nCMD.dataRecv); {
            if (mCMD.MAP.cntEncoding.Value==smtp.ContentEncoding.QuotedPrintable){
              nCMD.dataRecv=fr.DecodeData(mCMD,nCMD.dataRecv);
            };
            break;
          };
        };
      };
      for (var iLcv=0; iLcv<fr.Contents.length; iLcv++){
        mCID=fr.Contents[iLcv];
        nCID=fr.Commands.getItemByProperty('Mime',mCID);
        sName=mCID.MAP.cntName.Value;
        if (sName.length>0) {
          sID="cid:"+mCID.MAP.cntID.Value.substring(1,mCID.MAP.cntID.Value.length-1);

          sExt=coUtils.extractFileExt(sName);
          ct=coContentType.getContentType(sExt);
          if (ct){
              sData="data:"+ct.Name+";base64, "+nCID.dataRecv;
              regEx=new RegExp(sID,"g");
              if (ct) {
                for (var jLcv=0; jLcv<fr.Commands.length; jLcv++){
                  nCMD=fr.Commands[jLcv];
                  nCMD.dataRecv=nCMD.dataRecv.replace(regEx,sData);
                };
              };
          };
          ct=regEx=sData=null;
        };
        fr.Commands.Remove(nCID);
        nCID.Free();
      };
      fr.Contents.Clear();
      for (var iLcv=0; iLcv<fr.Commands.length; iLcv++) {
        nCMD=fr.Commands[iLcv];
        fr.displayMime(nCMD.Element,nCMD.Mime,nCMD.dataRecv);
        nCMD.Element=null;
        nCMD.Mime=null;
        nCMD.dataRecv=null;
      };
      regEx=sData=ct=sExt=sName=nCID=nCMD=mCMD=mCID=sID=null;
    };
    _fr.downloadMime=function(mItem,fileID,kind,Element){
      if (Element==undefined) Element=null;
      var fr=this;
      var sc=fr.Screen;
      fr.mimeCount+=1;
      var netCMD=coVDM.VDM.Net.Commands.createCommand(
        coVDM.VDM.Net,
        coSpectrum.NameSpace,
        coSpectrum.NS_EML_MIME,
        coXML.Header+mItem.toXML(),
        function(netCMD){ // Success
          var fr=netCMD.Owner;
          fr.mimeCount--;
          if (fr.mimeCount<=0) fr.Render();
        },
        function(netCMD){ // Error

        },
        function(netCMD){ // Timeout

        },
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      if (Element==null) {
        netCMD.Element=document.createElement(kind);
        fr.divSMTP.appendChild(netCMD.Element);
        netCMD.Element.className="txtSMTPMsg";
      } else {
        netCMD.Element=Element;
      };
      netCMD.Mime=mItem;
      netCMD.Owner=fr;
      netCMD.Data=fr.DataSet;
      netCMD.Headers.Update(coNet.fieldSearch,fileID);
      netCMD.FreeOnComplete=false;
      fr.Commands.push(netCMD);
      return netCMD;
    };
    _fr.readItem=function(Folder,drItem){
      var fr=this;
      var mbx=fr.MBX;
      mbx.Frame.Torus.Show();

      var sldAttaches=fr.Slides.Attaches;
      sldAttaches.Items.Clear();
      fr.mimeCount=0;
      fr.DataSet=drItem;
      fr.Folder=Folder;
      fr.Contents.Clear();
      fr.Commands.Clear();

      drItem.Display.addItem(fr,mbx);
      Folder.Display.addItem(fr.Tab,mbx.Tabsbar);

      var smry=fr.DataSet.MAP.Summary.Value.MAP;
      var dtMessage= (smry.Bound.Value==coSpectrum.SMTP_INBOUND) ? drItem.MAP.Created.Value : drItem.MAP.Modified.Value;

      dtMessage=coDateTime.incSecond(dtMessage,coDateTime.DateOffset);

      var dtStamp=coDateTime.decodeDateTime(dtMessage);

      fr.Tab.setCaption(smry.Subject.Value);
      var ctls=sldTop.Controls;

      ctls.Date.setCaption(dtStamp.toString(coDateTime.formatShort));
      ctls.Subject.setCaption(smry.Subject.Value);
      var sName=coSpectrum.SMTP.NameFromEmail(smry.From.Value);
      var sAddr=coSpectrum.SMTP.AddressFromEmail(smry.From.Value);
      ctls.Name.setHTML("<b>"+sName+"</b>&nbsp;&lt;"+sAddr+"&gt;");

      fr.Slides.Body.setHTML("");

      fr.divSMTP=document.createElement('div');
      fr.Slides.Body.Container.appendChild(fr.divSMTP);
      fr.divSMTP.className="SMTPMsg";

      fr.divLoading=document.createElement('div');
      fr.divSMTP.appendChild(fr.divLoading);
      fr.divLoading.className="loadSMTPMsg";

      coDOM.setText(fr.divLoading,coLang.Table.Mail.Loading);

      var cts=coSpectrum.Contacts;
      var me=cts.Me.MAP;

      if (smry.To.Index.length>0){
        var sRHTML="<b>"+coLang.Table.Mail.To+":</b>&nbsp;";
        for (var iLcv=0; iLcv<smry.To.Index.length; iLcv++){
          var sR=coSpectrum.SMTP.NameFromEmail(smry.To.Index[iLcv]);
          if (sR.length==0) {
            var sEml=coSpectrum.SMTP.AddressFromEmail(smry.To.Index[iLcv]);
            var ct=cts.FindByEmail(sEml);
            sR=(ct) ? cts.DisplayName(ct) : sEml;
          };
          sRHTML+="<b>"+sR+"</b>,&nbsp;";
        };
        var iLen=sRHTML.length;
        if (iLen>0)
          sRHTML=sRHTML.substring(0,iLen-7);
        ctls.Recipients.setHTML(sRHTML);
      } else {

      };
      if (smry.CC.Index.length>0) {
        var sRHTML="<b>"+coLang.Table.Mail.CC+":</b>&nbsp;";
        for (var iLcv=0; iLcv<smry.CC.Index.length; iLcv++){
          var sR=coSpectrum.SMTP.NameFromEmail(smry.CC.Index[iLcv]);
          if (sR.length==0){
            var sEml=coSpectrum.SMTP.AddressFromEmail(smry.CC.Index[iLcv]);
            var ct=cts.FindByEmail(sEml);
            sR=(ct) ? cts.DisplayName(ct) : sEml;
          };
          sRHTML+="<b>"+sR+"</b>,&nbsp;";
        };
        var iLen=sRHTML.length;
        if (iLen>0)
          sRHTML=sRHTML.substring(0,iLen-7);
        ctls.CC.setHTML(sRHTML);
      } else{
        ctls.CC.Conseal();
      };
      var Attaches=smry.Attachments.Value;
      if (Attaches==true) {
        fr.Slides.Attaches.Reveal();
      } else {
        fr.Slides.Attaches.Conseal();
      };
      var mRoot=smry.Mime.Value;
      var mParent=mRoot.MAP.Mimes.Value.Items;
      var index=0;
      mbx.DB.getMimesWithContentID(mRoot,fr.Contents);
      for (var iLcv=0; iLcv<fr.Contents.length; iLcv++)
        fr.downloadMime(fr.Contents[iLcv],drItem.MAP.ID.Value,"cid");
      if (
        (mParent.length>0) &&
        (mRoot.MAP.cntType.Value==coSpectrum.SMTP.ContentType.MultiMixed)
      ) {
        for (var iLcv=0; iLcv<mParent.length; iLcv++){
          var mItem=mParent[iLcv];
          if (mItem.MAP.cntDisposition.Value!=coSpectrum.SMTP.ContentDisposition.Attachment) {
            switch (mItem.MAP.cntType.Value) {
              case (coSpectrum.SMTP.ContentType.MultiAlternative) :
              case (coSpectrum.SMTP.ContentType.MultiSigned) :
                mItem=mbx.DB.getReadableMime(mItem);
                fr.downloadMime(mItem,drItem.MAP.ID.Value,"div");
                index++;
                break
              case (coSpectrum.SMTP.ContentType.MultiRelated) :
                mItem=mbx.DB.getReadableMime(mItem);
                fr.downloadMime(mItem,drItem.MAP.ID.Value,"div");
                index++;
                break;
              case (coSpectrum.SMTP.ContentType.TextHTML) :
                fr.downloadMime(mItem,drItem.MAP.ID.Value,"div");
                index++;
                break;
              case (coSpectrum.SMTP.ContentType.TextPlain) :
                fr.downloadMime(mItem,drItem.MAP.ID.Value,"div");
                index++;
                break;
              case (coSpectrum.SMTP.ContentType.Image) :
                fr.downloadMime(mItem,drItem.MAP.ID.Value,"img");
                index++;
                break;
            };
          } else {
            var sName=mItem.MAP.cntName.Value;
            var itm=sldAttaches.Items.createItem(sName,coTheme.Icons.Associated.getIcon(sName),mItem);
            itm.Caption.style.fontSize=coTheme.Icons.Spectrum.Mail.Reader.AttachmentsFontSize+"px";
            itm.onDoubleClick=function(itm){
              var fr=itm.Owner.Owner.Owner;
              var Mime=itm.Data.MAP;
              var sExt=coUtils.extractFileExt(Mime.cntName.Value);
              var ct=coContentType.getContentType(sExt);
              var sURL=coSpectrum.NameSpace.concat("?",
                coSpectrum.URI_EML_MGET,"&",
                fr.DataSet.MAP.ID.Value,"&",
                Mime.idxContentStart.Value,"&",
                Mime.idxContentEnd.Value,"&",
                Mime.cntEncoding.Value,"&",
                coSpectrum.SMTP.ContentDisposition.Inline,"&",
                Mime.cntName.Value
              );
              sURL=escape(sURL);
              if (ct) {
                var scViewer=null;
                switch (ct.Kind) {
                  case (coContentType.fkImage) : {
                    scViewer=ImageViewer.Create();
                    break;
                  };
                  case (coContentType.fkPDF) : {
                    var scViewer=PDFViewer.Create();
                    break;
                  };
                };
                scViewer.FreeOnClose=true;
                scViewer.Get(fr.Folder,Mime.cntName.Value,sURL);
                scViewer.Reveal();
              } else {
                coDOM.Download(sURL);
              };
            };
            itm.Show();
            itm=null;
          };
          mItem=null;
        };
      } else {
        var mItem=mbx.DB.getReadableMime(mRoot);
        fr.downloadMime(mItem,drItem.MAP.ID.Value,"div");
        index++;
        mItem=null;
      };
      index=mRoot=mParent=null;

      if (smry.Read.Value==false){
        smry.Read.Value=true;
        mbx.DB.Commands.UpdateSummary(fr.DataSet);
        if (fr.Folder)
          mbx.DB.Commands.RecordCount(fr.Folder);
      };
      fr.Tab.Select();
      sldAttaches=fr=smry=mItem=null;
    };
    _fr.onFree=function(){
      var fr=this;
      var mbx=fr.MBX;
      var idx=mbx.Readers.indexOf(fr);
      if (idx!=-1) mbx.Readers.splice(idx,1);
      if (mbx.Nav.gpFullReader.Slide==fr)
        mbx.Nav.gpFullReader.Slide=null;
      fr.Tab.Free();
    };
    return _fr;
  }
};
