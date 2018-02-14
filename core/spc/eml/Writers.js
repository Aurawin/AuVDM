coMail.App.Components.Writers = {
  Version        : new Version(2014,11,6,52),
  Title          : new Title("Spectrum Mail Writers","Writers"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/Writers.js',coAppKit.PreLoaded),
  debugToConsole : true,
  headerKinds    : new Array("To","BCC","CC"),
  createRecipients : function(hdrs){
    var sc=hdrs.Screen;
    var sl=hdrs.Owner;
    var hdr=hdrs.Slides.createSlide("Recipients",sl.Class+"Header",sc,hdrs,hdrs.Container,coAppUI.Alignment.Client);
    hdr.clearContainerClass();
    hdr.Visible=true;

    hdr.getEntries=function(Kind){
      var lst=new Array();
      var hdr=this, sl=null, Count=0;
      for (var iLcv=0; iLcv<hdr.Slides.length; iLcv++){
        sl=hdr.Slides[iLcv];
        if (sl.Kind==Kind) {
          lst[Count]=sl;
          Count+=1;
        };
      };
      return lst;
    };
    hdr.setCount=function(Kind,Count){
      var hdr=this;
      var lst=hdr.getEntries(Kind);
      if (lst.length<Count) {
        for (var iLcv=lst.length; iLcv<Count; iLcv++)
          hdr.addSelect(Kind,"",true,true);
      } else if (lst.length>Count) {
        for (var iLcv=lst.length-1; ( (iLcv>Count) && (lst.length>1) ); iLcv--)
          lst[iLcv].Free();
      };
    };
    hdr.addSelect=function(idxKind,Value,Delete,Enabled){
      if (Delete==undefined) Delete=false;
      var Kinds=coMail.App.Components.Writers.headerKinds;
      var rcpts=this;
      var sc=hdr.Screen;
      var wr=hdr.Owner.Owner;

      var rcpt=rcpts.Slides.createSlide("Recipient",wr.Class+"Recipient",sc,rcpts,rcpts.Container,coAppUI.Alignment.Top);
      rcpt.clearContainerClass();
      rcpt.Visible=true;
      rcpt.Kind=idxKind;
      rcpt.setHeight(coTheme.Apps.Mail.Writer.HeaderHeight);
      hdrs.setHeight((rcpt.Height*Math.min(rcpts.Slides.length,coTheme.Apps.Mail.Writer.MaxHeaders))+coTheme.Apps.Mail.Writer.HeaderBuffer);
      rcpt.Add=function(hdrAfter){
        if (hdrAfter==undefined) hdrAfter=null;
        var rcpt=this, rcptOld=null;
        var rcpts=rcpt.Owner;
        var sc=hdr.Screen;
        var rcptNew=rcpts.addSelect(rcpt.Kind,"",true,true);
        var lst=rcpts.getEntries(rcpt.Kind);
        var idxOld=-1;
        if (lst.length>1) {
          idxOld=(hdrAfter) ? rcpts.Slides.indexOf(hdrAfter)+1 : rcpts.Slides.indexOf(lst[1]);
          rcptOld=hdrs.Slides[idxOld];
          rcpts.Slides.Exchange(rcptOld,rcptNew);
        };
        return rcptNew;
      };
      var ctl=hdr.Controls.Kind=coAppUI.App.Components.Select.Create(
        rcpt,
        rcpt.Container,
        "Kind",
        wr.Class+"HeaderKind",
        ""
      );
      ctl.onChange=function(){
        var ctl=this;
        var rcpt=ctl.Owner;
        var rcpts=rcpt.Owner;
        var hdrs=rcpts.Owner;

        var wr=rcpts.Owner;
        rcpt.Kind=ctl.itemIndex;
        var txt=rcpt.Controls.Value;
        txt.setHint(coLang.Table.Mail.Writer.Hint.get(rcpt.Kind));
        txt.setPlaceHolder(coLang.Table.Mail.Writer.Placeholder.get(rcpt.Kind));
        hdrs.Commit();
      };
      ctl.setEnabled(Enabled);
      ctl.Placement.Top=4;
      ctl.Placement.Left=4;
      ctl.Placement.Mode.setTopLeft();
      ctl.addOption(Kinds[0],0,(idxKind==0),false);
      ctl.addOption(Kinds[1],1,(idxKind==1),false);
      ctl.addOption(Kinds[2],2,(idxKind==2),false);
      var ctl=rcpt.Controls.Value=coAppUI.App.Components.Text.Create(
        rcpt,
        rcpt.Container,
        "Value",
        wr.Class+"HeaderValue",
        coLang.Table.Mail.Writer.Hint.get(idxKind),
        coLang.Table.Mail.Writer.Placeholder.get(idxKind)
      );
      ctl.onChange=function(){
        var ctl=this;
        var wr=ctl.Owner.Owner.Owner.Owner;
        if (wr.Roster.Visible!=true) {
          wr.Roster.PopUp(ctl);
        };
        wr.Roster.View.Search(coSpectrum.SMTP.NameFromEmail(ctl.getCaption()));
        wr.Headers.Commit();
      };
      ctl.onNext=function(){
        var rcpt=this.Owner;
        var hdrs=rcpt.Owner.Owner;
        sc=rcpt.Screen;
        if (rcpt.Controls.Value.getTextLength()>0) {
          var rcptNew=rcpt.Add(rcpt);
          hdrs.AdjustSize();
          rcptNew.Controls.Value.Focus();
        };
      };
      ctl.setVisible(true);
      ctl.setCaption(Value);
      ctl.Placement.Top=4;
      ctl.Placement.Left=60;
      ctl.Placement.Right=(Delete==true)? 70: 35;
      ctl.Placement.Mode.setTopLeftRight();
      coTheme.UI.Text.Apply(ctl.Container);

      var ctl=hdr.Controls.btnAdd=coAppUI.App.Components.Button.Create(
        rcpt,
        rcpt.Container,
        "btnAdd",
        wr.Class+"HeaderButtonAdd",
        ""
      );
      ctl.onClick=function(){
        var rcpt=this.Owner;
        var hdrs=rcpt.Owner.Owner;
        var hdrNew=rcpt.Add(rcpt);
        hdrs.AdjustSize();
        hdrNew.Controls.Value.Focus();
      };
      ctl.setGylph(coTheme.Icons.Add.Black);
      ctl.Placement.Top=4;
      ctl.Placement.Right=(Delete==true)? 40: 4;
      ctl.Placement.Mode.setTopRight();
      if (Delete==true){
        var ctl=hdr.Controls.btnDelete=coAppUI.App.Components.Button.Create(
          rcpt,
          rcpt.Container,
          "btnDelete",
          wr.Class+"HeaderButtonDelete",
          ""
        );
        ctl.onClick=function(){
          var ctl=this;
          var rcpt=ctl.Owner;
          var rcpts=rcpt.Owner;
          var hdrs=rcpts.Owner;
          rcpt.Free();
          hdrs.Commit();
          hdrs.AdjustSize();
        };
        ctl.Placement.Top=4;
        ctl.Placement.Right=4;
        ctl.Placement.Mode.setTopRight();
        ctl.setGylph(coTheme.Icons.Delete.Black);
      };
      return rcpt;
    };
    return hdr;
  },
  createSubject : function(hdrs){
    var sc=hdrs.Screen;
    var sl=hdrs.Owner;
    var hdr=hdrs.Slides.createSlide("Subject",sl.Class+"Header",sc,hdrs,hdrs.Container,coAppUI.Alignment.Top);
    hdr.clearContainerClass();
    hdr.Visible=true;
    hdr.setHeight(coTheme.Apps.Mail.Writer.HeaderHeight);
    var ctl=hdr.Controls.Kind=coAppUI.App.Components.Label.Create(
      hdr,
      hdr.Container,
      "Kind",
      sl.Class+"HeaderKind",
      coLang.Table.Mail.Subject
    );
    ctl.Placement.Top=6;
    ctl.Placement.Left=4;
    ctl.Placement.Mode.setTopLeft();
    var ctl=hdr.Controls.Value=coAppUI.App.Components.Text.Create(
      hdr,
      hdr.Container,
      "Value",
      sl.Class+"HeaderValue",
      coLang.Table.Mail.Writer.Hint.get(3),
      coLang.Table.Mail.Writer.Placeholder.get(3)
    );
    ctl.onChange=function(){
      this.Owner.Owner.Commit();
    };
    ctl.onNext=function(){
      var ctl=this;
      var hdr=ctl.Owner;
      var hdrs=hdr.Owner;
      var wr=hdrs.Owner;
      wr.Body.Controls.Edit.Focus();
    };
    ctl.NextOnTab=false;
    ctl.setVisible(true);
    ctl.Placement.Top=4;
    ctl.Placement.Left=60;
    ctl.Placement.Right=6;
    ctl.Placement.Mode.setTopLeftRight();
    coTheme.UI.Text.Apply(ctl.Container);
    return hdr;
  },
  createHeaders : function(sl){
    // appends Headers GUI
    var hdrs=sl.Slides.createSlide("Headers",sl.Class+"Headers",sl.Screen,sl,sl.Container,coAppUI.Alignment.Top);
    hdrs.Container.style.backgroundColor=coTheme.UI.RichEdit.Toolbar.Background.Color.toString();
    hdrs.clearContainerClass();

    hdrs.Subject=this.createSubject(hdrs);
    hdrs.Recipients=this.createRecipients(hdrs);
    hdrs.AdjustSize=function(){
      var hdrs=this;
      var sc=hdrs.Screen;
      hdrs.Recipients.setHeight((coTheme.Apps.Mail.Writer.HeaderHeight*Math.min(hdrs.Recipients.Slides.length,coTheme.Apps.Mail.Writer.MaxHeaders))+coTheme.Apps.Mail.Writer.HeaderBuffer);
      hdrs.setHeight(hdrs.Subject.Height+hdrs.Recipients.Height);
      sc.setSize();
    };
    hdrs.Commit=function(){
      var hdrs=this;
      var wr=hdrs.Owner;
      var s=null;
      var Kinds=coMail.App.Components.Writers.headerKinds;
      var sHeader="";
      var smry=wr.DataSet.MAP.Summary.Value;

      for (var iLcv=0; iLcv<Kinds.length; iLcv++){
        sHeader="";
        for (var jLcv=0; jLcv<hdrs.Recipients.Slides.length; jLcv++){
          s=hdrs.Recipients.Slides[jLcv];
          if (s.Kind==iLcv) {
            sHeader+=s.Controls.Value.getCaption()+"; ";
          };
        };
        if (sHeader.length>0) sHeader=sHeader.substring(0,sHeader.length-2);
        smry.MAP[Kinds[iLcv]].Value=sHeader;
      };
      smry.MAP.Subject.Value=hdrs.Subject.Controls.Value.getCaption();
      wr.Modified=true;
      wr.Tab.setCaption(smry.MAP.Subject.Value);
    };
    hdrs.setValue=function(Kind,Value){
      var hdrs=this;
      switch (Kind) {
        case (0) :
        case (1) :
        case (2) :
          if (Value.length>0) {
            var sa=Value.split('; '), hdr=null;
            hdrs.Recipients.setCount(Kind,sa.length);
            var lst=hdrs.Recipients.getEntries(Kind);
            for (var iLcv=0; iLcv<lst.length; iLcv++){
              edt=lst[iLcv].Controls.Value;
              edt.setCaption(sa[iLcv]);
            };
          } else {
            hdrs.Recipients.setCount(Kind,0);
          };
          break;
        case (3) : {
          hdrs.Subject.Controls.Value.setCaption(Value);
          break;
        };
      };

    };
    hdrs.Recipients.addSelect(0,"",false,false);// default 1st field
    return hdrs;
  },
  createBody:function(sl){
    // appends Headers GUI
    var bdy=sl.Slides.createSlide("Body",sl.Class+"Body",sl.Screen,sl,sl.Container,coAppUI.Alignment.Client);
    bdy.clearContainerClass();
    bdy.Conseal();
    var ctl=bdy.Controls.Edit=coAppUI.App.Components.RichEdit.Create(
      bdy,
      bdy.Container,
      "Edit",
      sl.Class+"Edit",
      "", // hint
      "", // placeholder
      coAppUI.App.Components.RichEdit.FullButtons,
      coAppUI.App.Components.RichEdit.BtnNewOff,
      coAppUI.App.Components.RichEdit.BtnSaveOff
    );
    ctl.Visible=true;
    ctl.Placement.Mode.setFull();
    ctl.Placement.Top=1;
    ctl.Placement.Left=1;
    ctl.Placement.Right=1;
    ctl.Placement.Bottom=1;

    bdy.Hidden=false;
    bdy.Visible=true;
    return bdy;
  },
  Create : function(Screen,Folder,Files,srcFile) {
    if (Folder==undefined) throw "Writers.Create requires a Folder parameter.";
    if (Files==undefined) throw "Writers.Create requires a File parameter.";
    if (srcFile==undefined) srcFile=null;
    var mbx=Screen;
    var cmds=mbx.DB.Commands;
    var DB=cmds.Owner
    var mfst=coVDM.Manifest;
    var cts=coSpectrum.Contacts;
    var fldrs=coSpectrum.Folders;
    var itmFile=null;
    wr=mbx.Main.Slides.createSlide("msgComposer","MailComposer",mbx,mbx.Main,mbx.Main.Container,coAppUI.Alignment.Client);
    wr.Unit=this;
    wr.clearContainerClass();
    mbx.Writers.push(wr);
    wr.Folder=Folder;
    if (srcFile) {
      itmFile=wr.DataSet=srcFile;
      var smry=wr.DataSet.SMRY=wr.DataSet.MAP.Summary.Value;
    } else {
      itmFile=wr.DataSet=Files.addItem();
      var smry=wr.DataSet.SMRY=wr.DataSet.MAP.Summary.Value;
      smry.MAP.Subject.Value=coLang.Table.Mail.DefaultSubject;
      smry.MAP.Kind.Value=coContentType.fkSMTP;
      smry.MAP.Bound.Value=coSpectrum.SMTP_OUTBOUND;
      smry.MAP.Sent.Value=false;
      smry.MAP.From.Value=cts.getEmail(cts.Me);
      smry.MAP.RemoteIP.Value=coVDM.VDM.Net.Creds.RemoteIP;
      smry.MAP.RemoteDomain.Value=coVDM.VDM.Net.Creds.Domain;
      itmFile.MAP.Kind.Value=coContentType.fkSMTP;
      itmFile.MAP.FolderID.Value=Folder.MAP.ID.Value;
    };
    itmFile.Display.addItem(wr,wr);
    if (!srcFile) {
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSpectrum.NameSpace,
        coSpectrum.NS_EML_ADD,
        coXML.Header+itmFile.toXML(),
        function(netCMD){
          var itmFile=netCMD.Data;
          var cmp=netCMD.Owner;
          if (netCMD.Code==coNet.CO_STATUS_OK) {
            var xDoc=netCMD.dataRecv;
            var xItem=coXML.getStanza(xDoc,itmFile.Stanza,xDoc.documentElement);
            itmFile.fromXML(xDoc,xItem);
            itmFile.SMRY.MAP.ID.Value=itmFile.MAP.ID.Value;
            cmp.Modified=true;
            cmp.Loading=false;
          };
          netCMD.Data=null;
          netCMD.Owner=null;
        },
        function(){
        },
        function(){
        },
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=itmFile;
      netCMD.Owner=wr;
    };
    wr.Roster=coContacts.createSelector(Screen,wr);
    wr.Headers=this.createHeaders(wr);
    wr.Body=this.createBody(wr);
    wr.Tab=mbx.Tabsbar.createTab(smry.MAP.Subject.Value,coTheme.Icons.Spectrum.Mail.Compose,coAppUI.AutoSize,coAppUI.allowClose);
    wr.Tab.Data=wr;
    wr.Tab.Show();
    wr.Tab.onSelect=function(tab){
        var wr=tab.Data;
        var mbx=wr.Screen;
        var mnu=mbx.Nav.gpWriter.Menu;
        var mnuItem=wr.Selections.navMenuItem;
        mbx.setWriterSlides(wr);
        mbx.Nav.setSelected(mbx.Nav.gpWriter);
        mnu.Selected=null;
        mnu.setSelected(mnuItem);
        wr.Show();
    };
    wr.Tab.onUnselect=function(tab){
      var wr=tab.Data;
      var mbx=wr.Screen;
      wr.Conseal();
      mbx.setWriterSlides(null);
    };
    wr.Tab.onClose=function(tab){
      var wr=tab.Data;
      var mbx=wr.Screen;
      if ( (wr.Modified==true) || (wr.Body.Controls.Edit.Modified==true))
        wr.Save();
      wr.Free();
    };
    wr.Modified=false;
    wr.nav=null;
    wr.navMenu=null;
    wr.navGpRecipients=null;
    wr.setNavInfo=function(nav,navMenu,navGpRecipients){
      var wr=this;
      wr.nav=nav;
      wr.navMenu=navMenu;
      wr.navGpRecipients=navGpRecipients;
    };
    wr.onWriteComplete=function(netCMD){
      wr=netCMD.Owner;
      if ( coObject.Assigned(wr)==true) {
        var mbx=wr.Screen;
      };
      coMail.App.Screen.Frame.Torus.Stop();
    };
    wr.Selections=coObject.Create();
    wr.Selections.navMenuItem=null;
    wr.Read=function(){
      var wr=this;
      var mbx=wr.Screen;

      wr.Tab.setCaption(wr.DataSet.SMRY.MAP.Subject.Value);
      wr.Loading=true;
      mbx.Frame.Torus.Start();
      mbx.Nav.gpWriter.hideTorus=false;
      var netCMD=coVDM.VDM.Net.Commands.createCommand(
        coVDM.VDM.Net,
        coSpectrum.NameSpace,
        coSpectrum.NS_EML_READ,
        coXML.Header+wr.DataSet.toXML(),
        function(netCMD){
          var wr=netCMD.Owner;
          var mbx=wr.Screen;
          mbx.Frame.Torus.Stop();
          if (netCMD.Code==coNet.CO_STATUS_OK){
            var SumMod=false;
            var xDoc=netCMD.dataRecv;
            var xItem=coXML.getStanza(xDoc,wr.DataSet.Stanza,xDoc.documentElement);
            wr.DataSet.fromXML(xDoc,xItem);
            wr.Load();
          };
          netCMD.Data=null;
          netCMD.Owner=null;
        },
        function(netCMD){
          var wr=netCMD.Owner;
          wr.Read();
        },
        function(netCMD){
          var wr=netCMD.Owner;
          wr.Read();
        },
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=wr;
      netCMD.Data=wr.DataSet;
    };
    wr.Load=function(){
      var wr=this;
      var smry=wr.DataSet.MAP.Summary.Value.MAP;
      var Kinds=coMail.App.Components.Writers.headerKinds;
      var hdrs=wr.Headers;
      hdrs.setValue(0,smry.To.Value);
      hdrs.setValue(1,smry.BCC.Value);
      hdrs.setValue(2,smry.CC.Value);
      hdrs.setValue(3,smry.Subject.Value);
      hdrs.AdjustSize();
      wr.Body.Controls.Edit.setHTML(coEncoding.base64Decode(wr.DataSet.MAP.Data.Value));
      wr.DataSet.MAP.Data.Value="";
      wr.Loading=false;
    };
    wr.Save=function(){
      var wr=this;
      var mbx=wr.Screen;
      var hdrs=wr.Slides.Headers;
      var dbItem=wr.DataSet;
      mbx.Frame.Torus.Start();
      wr.Modified=false;
      wr.Body.Controls.Edit.Modified=false;
      dbItem.MAP.Data.Value=coEncoding.base64Encode(wr.Body.Controls.Edit.getHTML());
      var netCMD=coVDM.VDM.Net.Commands.createCommand(
        coVDM.VDM.Net,
        coSpectrum.NameSpace,
        coSpectrum.NS_EML_WRITE,
        coXML.Header+wr.DataSet.toXML(),
        wr.onWriteComplete,
        coNet.NoError,
        coNet.NoTimeout,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=wr;
      netCMD.Data=dbItem;
      dbItem.MAP.Data.Value="";
    };
    wr.UpdateLines=function(sData){
      var wr=this;
      var saLines=sData.split(coNet.CRLF);
      var iCt=0; sLines="";
      for (var iLcv=0; iLcv<saLines.length; iLcv++){
        if (saLines[iLcv].length>0){
          sLines+=saLines[iLcv]+coNet.CRLF;
          iCt+=1;
          if (iCt>=coSpectrum.SMTP.LinesMax) break;
        };
      };
      wr.DataSet.SMRY.MAP.Lines.Value=sLines;
      wr.Modified=true;
    };
    wr.setNavInfo(mbx.Nav,mbx.Nav.gpWriter.Menu,mbx.Nav.gpWriterRecips);
    wr.Selections.navMenuItem=mbx.Nav.gpWriter.Menu.miOptions;
    wr.doFree=function(){
      var wr=this;
      var mbx=wr.Screen;
      var idx=mbx.Writers.indexOf(wr);

      if (mbx.Nav.gpWriter.Slide==wr)
        mbx.setWriterSlides(null);

      if (idx!=-1) mbx.Writers.splice(idx,1);

      wr.DataSet.Display.removeItem(wr);
      wr.Tab.Free();
      wr.Roster.Free();
      var Tab= (wr.Folder) ? wr.Folder.Display.getItem(mbx.Tabsbar): null;
      if ((Tab) && (Tab.Selected!=true)) Tab.Select();
    };
    wr.doSetSize=function(){
      var wr=this;
      if (wr.Roster.Visible==true)
        wr.Roster.setSize();
    };
    if (srcFile) {
      wr.Read();
    } else {
      wr.Load();
    };

    return wr;
  },
  createReply:function(Screen,itmFile){
    var mbx=Screen;
    var mfst=coVDM.Manifest;
    var Unit=this;
    var cmds=Screen.DB.Commands;
    var SumMod=false;
    var dtStamp=itmFile.MAP.Created.Value;
    var smry=itmFile.MAP.Summary.Value;
    var sFrom=smry.MAP.From.Value;
    var cmp=Unit.Create(Screen,null);
    cmp.setNavInfo(mbx.Nav,mbx.Nav.gpWriter.Menu,mbx.Nav.gpWriterRecips);
    cmp.Selections.navMenuItem=mbx.Nav.gpWriter.Menu.miOptions;
    cmp.MBX=mbx;
      // Body
    coDOM.setHTML(coVDM.divFormat,coEncoding.base64Decode(itmFile.MAP.Data.Value));
    var sValue=coDOM.getText(coVDM.divFormat);
    coDOM.setHTML(coVDM.divFormat,"");
    sValue=coSpectrum.SMTP.BodyLinesForReply(sValue,dtStamp,sFrom);
    cmp.Panels.Message.Plain.setValue(sValue);
      // Subject
    var sSubject=smry.MAP.Subject.Value;
    sSubject=coSpectrum.SMTP.SubjectForReply(sSubject);
    cmp.Headers.Subject.Controls.Value.setCaption(sSubject);
    cmp.DataSet.SMRY.MAP.Subject.Value=sSubject;
    cmp.DataSet.SMRY.MAP.cntType.Value=coSpectrum.SMTP.ContentType.TextPlain;
    cmp.Tab.setCaption(sSubject);

    var sStatus=coLang.Table.Apps.Spectrum.Composer.Writer.replace("$message",sSubject);
    mbx.setStatus(sStatus);
      // To Field
    sValue=smry.MAP.From.Value;
    cmp.Panels.Headers.To.Value.Container.value=sValue;
    cmp.DataSet.SMRY.MAP.To.Value=sValue;
    if (smry.MAP.Read.Value==false){
      SumMod=true;
      smry.MAP.Read.Value=true;
    };
    if (smry.MAP.Replied.Value==false){
      SumMod=true;
      smry.MAP.Replied.Value=true;
    };
    if (SumMod==true)
      mbx.DB.Commands.UpdateSummary(itmFile);
    cmp.Modified=true;
    cmp.Tab.Select();
    return cmp;

  },
  createForward : function(Screen,itmFile){
      var Unit=this;
      var SumMod=false;
      var mfst=coVDM.Manifest;
      var mbx=Screen;
      var dtStamp=itmFile.MAP.Created.Value;
      var smry=itmFile.MAP.Summary.Value;
      var sFrom=smry.MAP.From.Value;

      var cmp=Unit.Create(Screen,itmFile);
      // Body
      var sValue=coEncoding.base64Decode(itmFile.MAP.Data.Value);
      sValue=coSpectrum.SMTP.Text(sValue);
      sValue=coSpectrum.SMTP.BodyLinesForForward(sValue,dtStamp,sFrom);
      cmp.Panels.Message.Plain.setValue(sValue);
      // Subject
      sSubject=smry.MAP.Subject.Value;
      sSubject=coSpectrum.SMTP.SubjectForForward(sSubject);
      cmp.Headers.Subject.Controls.Value.setCaption(sSubject);
      cmp.DataSet.SMRY.MAP.Subject.Value=sSubject;
      var sStatus=coLang.Table.Apps.Spectrum.Composer.Writer;
      sStatus=sStatus.replace("$message",sSubject);
      mbx.setStatus(sStatus);
      // To Field
      sValue=smry.MAP.From.Value;
      cmp.Panels.Headers.To.Value.Container.value=sValue;
      cmp.DataSet.SMRY.MAP.To.Value=sValue;
      if (smry.MAP.Read.Value==false){
        SumMod=true;
        smry.MAP.Read.Value=true;
      };
      if (smry.MAP.Forwarded.Value==false){
        SumMod=true;
        smry.MAP.Forwarded.Value=true;
      };
      if (SumMod==true)
        mbx.DB.Commands.UpdateSummary(itmFile);
    return cmp;
  }
};

