coMail.App.Components.DB = {
  Version        : new Version(2015,2,16,106),
  Title          : new Title("Spectrum Mail Database","DB"),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/DB.js',coAppKit.PreLoaded),
  Vendor         : new Vendor(
    "Aurawin",
    "Copyright (&copy;) 2012-2015.  All rights reserved.",
    [
      {'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843},
      {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852}
    ]
  ),
  debugToConsole : true,

  BuildIndexForAddresses : function(){
        var fld=this;
        var Quote=false;
        var Paren=false;
        var sEntry="";
        var chLcv="";
        fld.Index=new Array();
        for (var iLcv=0; iLcv<fld.Value.length; iLcv++){
          chLcv=fld.Value[iLcv];
          switch (chLcv) {
            case ("\"") :
              Quote=!Quote;
              break;
            case (")"):
              Paren=false;
              break;
            case ("("):
              Paren=true;
              break;
          };
          if ( (chLcv==",") && (Quote==false) && (Paren==false)){
            sEntry=coSpectrum.SMTP.NormalizeAddress(sEntry);
            fld.Index.push(sEntry);
            sEntry="";
          } else {
            sEntry+=chLcv;
          };
        };
        sEntry=coSpectrum.SMTP.NormalizeAddress(sEntry);
        if (sEntry.length>0) fld.Index.push(sEntry);
  },
  Create : function(Screen){
    var DB=new Object();
    DB.Unit=this;
    DB.Screen=Screen;
    DB.getMimeByContentID=function(m,Name){
      var DB=this;
      if (m.MAP.cntID.Value==Name)
        return m;
      var cts=coSpectrum.SMTP.ContentType;
      var mR=null;
      var ms=m.MAP.Mimes.Value.Items;
      for (var iLcv=0; iLcv<ms.length; iLcv++){
        var mLcv=ms[iLcv];
        switch (mLcv.MAP.cntType.Value) {
          case (cts.MultiAlternative) :
          case (cts.MultiRelated) : {
            mR=DB.getMimeByContentID(mLcv,Name);
            if (mR) return mR;
            break;
          };
          default : {
            if (mLcv.MAP.cntID.Value==Name)
              return mLcv;
            break;
          };
        }
      };
      for (var iLcv=0; iLcv<ms.length; iLcv++){
        var mLcv=ms[iLcv];
        if (mLcv.MAP.cntID.Value==Name)
          return mLcv;
      };
      return null;
    };
    DB.getMimesWithContentID=function(m,List){
      var DB=this;
      var cts=coSpectrum.SMTP.ContentType;
      var ms=m.MAP.Mimes.Value.Items;
      for (var iLcv=0; iLcv<ms.length; iLcv++){
        var mLcv=ms[iLcv];
        switch (mLcv.MAP.cntType.Value) {
          case (cts.MultiAlternative) :
          case (cts.MultiRelated) : {
            DB.getMimesWithContentID(mLcv,List);
            break;
          };
          default : {
            if (
              (mLcv.MAP.cntID.Value.length>0) &&
              (mLcv.MAP.cntType.Value>2)
            )
              List.push(mLcv);
            break;
          };
        }
      };
      if (
        (m.MAP.cntID.Value.length>0) &&
        (mLcv.MAP.cntType.Value>2)
      ) {
        List.push(m);
      } else {
        for (var iLcv=0; iLcv<ms.length; iLcv++){
          var mLcv=ms[iLcv];
          if (
            (mLcv.MAP.cntID.Value.length>0) &&
            (mLcv.MAP.cntType.Value>2)
          )
            List.push(mLcv);
        };
      };
    };
    DB.getReadableMime=function(m){
      var DB=this;
      var cts=coSpectrum.SMTP.ContentType;
      if (m.MAP.cntType.Value==cts.TextHTML)
        return m;
      var ms=m.MAP.Mimes.Value.Items;
      for (var iLcv=0; iLcv<ms.length; iLcv++){
        var mLcv=ms[iLcv];
        switch (mLcv.MAP.cntType.Value) {
          case (cts.TextHTML) : return mLcv;
          case (cts.MultiAlternative) : return DB.getReadableMime(mLcv);
          case (cts.MultiRelated) : return DB.getReadableMime(mLcv);
        }
      };
      for (var iLcv=0; iLcv<ms.length; iLcv++){
        var mLcv=ms[iLcv];
        if (mLcv.MAP.cntType.Value==cts.TextHTML)
          return mLcv;
      };
      for (var iLcv=0; iLcv<ms.length; iLcv++){
        var mLcv=ms[iLcv];
        if (mLcv.MAP.cntType.Value==cts.TextPlain)
          return mLcv;
      };
      return m;
    };
    DB.getAttachments=function(m,list){
      var DB=this;
      var ctd=coSpectrum.SMTP.ContentDisposition;

      if (m.MAP.cntDisposition.Value==ctd.Attachment)
        list.push(m);

      var ms=m.MAP.Mimes.Value.Items;
      for (var iLcv=0; iLcv<ms.length; iLcv++){
        var mLcv=ms[iLcv];
        list=DB.getAttachments(mLcv,list);
      };
      return list;
    };
    DB.getInlines=function(m,list){
      var DB=this;
      var ctd=coSpectrum.SMTP.ContentDisposition;

      if (m.MAP.cntDisposition.Value==ctd.Inline)
        list.push(m);

      var ms=m.MAP.Mimes.Value.Items;
      for (var iLcv=0; iLcv<ms.length; iLcv++){
        var mLcv=ms[iLcv];
        list=DB.getInlines(mLcv,list);
      };
      return list;
    };
    DB.getMixedText=function(m,list){
      // mainly used for iPhone messages
      var DB=this;

      var ctt=coSpectrum.SMTP.ContentType;
      if (m.MAP.cntType.Value==ctt.MultiMixed) {
        var ms=m.MAP.Mimes.Value.Items;
        for (var iLcv=0; iLcv<ms.length; iLcv++){
          var mLcv=ms[iLcv];
          if (
            (mLcv.MAP.cntType.Value==ctt.TextPlain) ||
            (mLcv.MAP.cntType.Value==ctt.TextHTML)
          ) {
            list.push(mLcv);
          };
        };
      };
      return list;
    };
    DB.createMime=function(){
      var DB=this;
      var m=new coDB.Fields("mime",coDB.HasNoCollection,coDB.HasNoItems);
      m.addField("idxHeadersStart",coDB.Kind.Int64,"idx-hrs-s",0,coDB.StreamOn);
      m.addField("idxHeadersEnd",coDB.Kind.Int64,"idx-hrs-e",0,coDB.StreamOn);
      m.addField("idxContentStart",coDB.Kind.Int64,"idx-cnt-s",0,coDB.StreamOn);
      m.addField("idxContentEnd",coDB.Kind.Int64,"idx-cnt-e",0,coDB.StreamOn);
      m.addField("cntLast",coDB.Kind.Boolean,"cnt-last",false,coDB.StreamOn);
      m.addField("cntAttachment",coDB.Kind.Boolean,"cnt-atch",false,coDB.StreamOn);
      m.addField("cntEncoding",coDB.Kind.Byte,"cnt-enc",0,coDB.StreamOn);
      m.addField("cntType",coDB.Kind.Byte,"cnt-type",0,coDB.StreamOn);
      m.addField("cntCharFormat",coDB.Kind.Byte,"cnt-char-fmt",0,coDB.StreamOn);
      m.addField("cntCharSet",coDB.Kind.Byte,"cnt-char-set",0,coDB.StreamOn);
      m.addField("cntID",coDB.Kind.String,"cnt-id","",coDB.StreamOn);
      m.addField("cntRead",coDB.Kind.Int64,"cnt-rad",0,coDB.StreamOn);
      m.addField("cntSize",coDB.Kind.Int64,"cnt-siz",0,coDB.StreamOn);
      m.addField("cntReadableSize",coDB.Kind.Int64,"cnt-rs",0,coDB.StreamOn);
      m.addField("cntName",coDB.Kind.String,"cnt-nme","",coDB.StreamOn);
      m.addField("cntDescription",coDB.Kind.String,"cnt-dsc","",coDB.StreamOn);
      m.addField("cntDisposition",coDB.Kind.Byte,"cnt-disp","",coDB.StreamOn);
      m.addField("cntBoundary",coDB.Kind.String,"cnt-bndry","",coDB.StreamOn);

      var colMS1=coDB.createCollection(coXML.Parser,"mimes","mime",coDB.HasItems,coDB.HasNoDisplays);
      m.addField("Mimes",coDB.Kind.Collection,"mimes",colMS1,coDB.StreamOn);
      colMS1.Fields.Clone(m);

      var colMS2=coDB.createCollection(coXML.Parser,"mimes","mime",coDB.HasItems,coDB.HasNoDisplays);
      colMS1.Fields.MAP.Mimes.Value.Fields.addField("Mimes",coDB.Kind.Collection,"mimes",colMS2,coDB.StreamOn);
      colMS2.Fields.Clone(m);

      return m;
    };
    DB.createDeliveries=function(){
      var DB=this;
      var mbx=DB.Screen;
      var D=coDB.createCollection(coXML.Parser,"dvs","dvy",coDB.HasItems,coDB.HasNoDisplays);
      D.Fields.addField("Read",coDB.Kind.Boolean,"dr",coDB.StreamOn);
      D.Fields.addField("Code",coDB.Kind.Integer,"dc",coDB.StreamOn);
      D.Fields.addField("Date",coDB.Kind.Double,"dd",coDB.StreamOn);
      D.Fields.addField("Message",coDB.Kind.String,"dm",coDB.StreamOn);
      D.Fields.addField("Address",coDB.Kind.String,"da",coDB.StreamOn);
      return D;
    };
    DB.createSummary=function(){
      var DB=this;
      var mbx=DB.Screen;
      var SMRY=new coDB.Fields("s",coDB.HasNoCollection,coDB.HasNoItems);
      SMRY.Identity=SMRY.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      SMRY.addField("Kind",coDB.Kind.Integer,"kind",coContentType.fkSMTP,coDB.StreamOn);
      SMRY.addField("From",coDB.Kind.String,"from","",coDB.StreamOn);
      SMRY.addField("Sender",coDB.Kind.String,"sndr","",coDB.StreamOn);
      SMRY.addField("To",coDB.Kind.String,"rcpt","",coDB.StreamOn);
      SMRY.addField("CC",coDB.Kind.String,"cc","",coDB.StreamOn);
      SMRY.addField("BCC",coDB.Kind.String,"bcc","",coDB.StreamOn);
      SMRY.addField("From",coDB.Kind.String,"from","",coDB.StreamOn);
      SMRY.addField("Subject",coDB.Kind.String,"sbj","",coDB.StreamOn);
      SMRY.addField("User",coDB.Kind.String,"user","",coDB.StreamOn);
      SMRY.addField("Group",coDB.Kind.String,"grp","",coDB.StreamOn);
      SMRY.addField("Lines",coDB.Kind.String,"lines","",coDB.StreamOn);
      SMRY.addField("tzBias",coDB.Kind.Byte,"tz-bias",0,coDB.StreamOn);
      SMRY.addField("Bound",coDB.Kind.Byte,"bnd",0,coDB.StreamOn);
      SMRY.addField("cntType",coDB.Kind.Byte,"cnt-type",mbx.Unit.SMTP.ContentType.TextPlain,coDB.StreamOn);
      SMRY.addField("Rendered",coDB.Kind.Boolean,"rndrd",false,coDB.StreamOn);
      SMRY.addField("Pinned",coDB.Kind.Boolean,"pnnd",false,coDB.StreamOn);
      SMRY.addField("Read",coDB.Kind.Boolean,"read",false,coDB.StreamOn);
      SMRY.addField("Sent",coDB.Kind.Boolean,"sent",false,coDB.StreamOn);
      SMRY.addField("Replied",coDB.Kind.Boolean,"rep",false,coDB.StreamOn);
      SMRY.addField("Replied All",coDB.Kind.Boolean,"rep-all",false,coDB.StreamOn);
      SMRY.addField("Forwarded",coDB.Kind.Boolean,"fwdd",false,coDB.StreamOn);
      SMRY.addField("Spam",coDB.Kind.Boolean,"spam",false,coDB.StreamOn);
      SMRY.addField("Attachments",coDB.Kind.Boolean,"atmts",false,coDB.StreamOn);
      SMRY.addField("White List",coDB.Kind.Boolean,"wl",false,coDB.StreamOn);
      SMRY.addField("Black List",coDB.Kind.Boolean,"bl",false,coDB.StreamOn);
      SMRY.addField("Remote IP",coDB.Kind.String,"rem-ip","",coDB.StreamOn);
      SMRY.addField("Remote Domain",coDB.Kind.String,"rem-dn","",coDB.StreamOn);
      SMRY.addField("Remote From",coDB.Kind.String,"rem-fm","",coDB.StreamOn);
      SMRY.addField("MessageId",coDB.Kind.String,"msgid","",coDB.StreamOn);
      SMRY.addField("ReplyTo",coDB.Kind.String,"rplt","",coDB.StreamOn);
      SMRY.addField("InReplyTo",coDB.Kind.String,"irpt","",coDB.StreamOn);
      SMRY.Mime=SMRY.addField("Mime",coDB.Kind.Fields,"mime",DB.createMime(),coDB.StreamOn,coDB.ReadOnce);
      SMRY.Deliveries=SMRY.addField("Deliveries",coDB.Kind.Collection,"dvs",DB.createDeliveries(),coDB.StreamOn);

      SMRY.MAP.From.buildIndex=coMail.App.Components.DB.BuildIndexForAddresses;
      SMRY.MAP.To.buildIndex=coMail.App.Components.DB.BuildIndexForAddresses;
      SMRY.MAP.CC.buildIndex=coMail.App.Components.DB.BuildIndexForAddresses;
      SMRY.MAP.BCC.buildIndex=coMail.App.Components.DB.BuildIndexForAddresses;
      SMRY.onLoaded=function(){
        var SMRY=this.MAP;
        if (Assigned(this.Owner)==true) {
          SMRY.Read.Value=((SMRY.Read.Value==true) || ((this.Owner.MAP.Flags.Value | coSpectrum.IMAP.Flags.Seen)==this.Owner.MAP.Flags.Value));
          SMRY.Pinned.Value=((SMRY.Pinned.Value==true) || ((this.Owner.MAP.Flags.Value | coSpectrum.IMAP.Flags.Pinned)==this.Owner.MAP.Flags.Value));
        };
        SMRY.Subject.Value=coSpectrum.SMTP.DecodeHeader(SMRY.Subject.Value);
        SMRY.From.Value=coSpectrum.SMTP.DecodeHeader(SMRY.From.Value);
      };
      return SMRY;
    };
    DB.createFolders=function(){
      var DB=this;
      var Folders=coDB.createCollection(coXML.Parser,"folders","folder",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);

      Folders.LoadInfo.FirstDelay=coCabinet.App.Components.DB.LoadQuick;
      Folders.LoadInfo.Interval=coCabinet.App.Components.DB.LoadDelay;
      Folders.LoadInfo.Chunk=coCabinet.App.Components.DB.LoadChunk;
      Folders.LoadInfo.onComplete=function(col){
        sMail=coLang.Table.Mail.Folder;
        col.Mail=col.getItem(col.Fields.MAP.Path,sMail);

        col.Mail.Inbox=col.getItem(col.Fields.MAP.Path,sMail+"/"+coLang.Table.Mail.Inbox);
        col.Mail.Outbox=col.getItem(col.Fields.MAP.Path,sMail+"/"+coLang.Table.Mail.Outbox);
        col.Mail.Sent=col.getItem(col.Fields.MAP.Path,sMail+"/"+coLang.Table.Mail.Sent);

        col.Mail.Junk=col.getItem(col.Fields.MAP.Path,sMail+"/"+coLang.Table.Mail.Junk);
        col.Mail.Trash=col.getItem(col.Fields.MAP.Path,sMail+"/"+coLang.Table.Mail.Trash);

      };

      Folders.Items.DisplayMode.setValue(Folders.Items.DisplayMode.Multiple);
      Folders.Identity=Folders.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      Folders.Fields.addField("Path",coDB.Kind.String,"path","",coDB.StreamOn);
      Folders.Fields.addField("Status",coDB.Kind.Fields,"status",DB.createRecordCount(),coDB.StreamOff);
      Folders.Fields.addField("Modified",coDB.Kind.Double,"modified",0,coDB.StreamOff);
      return Folders;
    };
    DB.createFiles=function(){
      var DB=this;
      var mbx=DB.Screen;
      var SMRY=mbx.DB.createSummary();
      var Files=coDB.createCollection(coXML.Parser,"files","file",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
      Files.Owner=DB;
      Files.Items.DisplayMode.setValue(Files.Items.DisplayMode.Multiple);
      Files.LoadInfo.FirstDelay=coCabinet.App.Components.DB.LoadQuick;
      Files.LoadInfo.Interval=coCabinet.App.Components.DB.LoadDelay;
      Files.LoadInfo.Chunk=coCabinet.App.Components.DB.LoadChunk;
      Files.LoadInfo.onComplete=function(col){
        col.Folder.MAP.Modified.Value=coDateTime.Now();
      };
      Files.Folder=null;

      Files.SMRY=SMRY;
      Files.Identity=Files.Fields.ID=Files.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      Files.Fields.FolderID=Files.Fields.addField("FolderID",coDB.Kind.Int64,"fid",0,coDB.StreamOn);
      Files.Fields.Created=Files.Fields.addField("Created",coDB.Kind.DateTime,"ctd",0.0,coDB.StreamOn);
      Files.Fields.Modified=Files.Fields.addField("Modified",coDB.Kind.DateTime,"mtd",0.0,coDB.StreamOn);
      Files.Fields.Modified=Files.Fields.addField("Allocated",coDB.Kind.DateTime,"atd",0.0,coDB.StreamOn);
      Files.Fields.Kind=Files.Fields.addField("Kind",coDB.Kind.Integer,"kd",coContentType.fkBinary,coDB.StreamOn);
      Files.Fields.Flags=Files.Fields.addField("Flags",coDB.Kind.Integer,"fs",0,coDB.StreamOn);
      Files.Fields.Name=Files.Fields.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
      Files.Fields.Size=Files.Fields.addField("Size",coDB.Kind.Int64,"z",0,coDB.StreamOn);
      Files.Fields.Summary=Files.Fields.addField("Summary",coDB.Kind.Fields,"s",SMRY,coDB.StreamOn);
      Files.Fields.Digest=Files.Fields.addField("Digest",coDB.Kind.Base64,"d","",coDB.StreamOn);
      Files.Fields.Data=Files.Fields.addField("Data",coDB.Kind.Base64,"data","",coDB.StreamOn);
      Files.Identity=Files.Fields.ID;

      Files.Move=coDB.createCollection(coXML.Parser,"file","file",coDB.HasNoItems,coDB.HasNoDisplays);
      Files.Move.Fields.ID=Files.Move.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      Files.Move.Fields.FolderID=Files.Move.Fields.addField("FolderID",coDB.Kind.Int64,"fid",0,coDB.StreamOn);
      Files.Move.Update=function(itmFile){
        var mbx=_mbx;
        var mv=this;
        mv.Fields.MAP.ID.Value=itmFile.getValue(mv.Fields.MAP.ID);
        mv.Fields.MAP.FolderID.Value=itmFile.getValue(mv.Fields.MAP.FolderID);
      };
      Files.Delete=coDB.createCollection(coXML.Parser,"file","file",coDB.HasNoItems,coDB.HasNoDisplays);
      Files.Delete.Fields.ID=Files.Delete.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      Files.Delete.Fields.FolderID=Files.Delete.Fields.addField("FolderID",coDB.Kind.Int64,"fid",0,coDB.StreamOn);
      return Files;
    };
    DB.createFile=function(){
      var DB=this;
      var mbx=DB.Screen;
      var SMRY=mbx.DB.createSummary();
      var File=new coDB.Fields("file","file",coDB.HasNoCollection,coDB.HasNoItems);
      File.SMRY=SMRY;
      File.Identity=File.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      File.addField("FolderID",coDB.Kind.Int64,"fid",0,coDB.StreamOn);
      File.addField("Created",coDB.Kind.DateTime,"ctd",0.0,coDB.StreamOn);
      File.addField("Modified",coDB.Kind.DateTime,"mtd",0.0,coDB.StreamOn);
      File.addField("Allocated",coDB.Kind.DateTime,"atd",0.0,coDB.StreamOn);
      File.addField("Flags",coDB.Kind.Integer,"fs",0,coDB.StreamOn);
      File.addField("Kind",coDB.Kind.Integer,"kd",coContentType.fkBinary,coDB.StreamOn);
      File.addField("Name",coDB.Kind.String,"n","",coDB.StreamOn);
      File.addField("Size",coDB.Kind.Int64,"z",0,coDB.StreamOn);
      File.addField("Digest",coDB.Kind.Base64,"d","",coDB.StreamOn);
      File.addField("Summary",coDB.Kind.Fields,"s",SMRY,coDB.StreamOn);
      File.addField("Data",coDB.Kind.Base64,"data","",coDB.StreamOn);
      return File;
    };
    DB.createDeleteMessage=function(){
      var msg=new coDB.Fields("file",coDB.HasNoCollection,coDB.HasNoItems);
      msg.Identity=msg.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      msg.addField("FolderID",coDB.Kind.Int64,"fid",0,coDB.StreamOn);
      return msg;
    };
    DB.createMimeMessage=function(){
      var msg=new coDB.Fields("file",coDB.HasNoCollection,coDB.HasNoItems);
      msg.Identity=msg.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      msg.addField("Data",coDB.Kind.Base64,"data","",coDB.StreamOn);
      return msg;
    };
    DB.createRecordCount=function(){
      var sts=new coDB.Fields("recs",coDB.HasNoCollection,coDB.HasNoItems);
      sts.addField("Total",coDB.Kind.DWord,"tol",0,coDB.StreamOn);
      sts.addField("Unread",coDB.Kind.DWord,"urd",0,coDB.StreamOn);
      sts.addField("Recent",coDB.Kind.DWord,"rnt",0,coDB.StreamOn);
      sts.addField("Read",coDB.Kind.DWord,"red",0,coDB.StreamOn);
      sts.addField("Deleted",coDB.Kind.DWord,"del",0,coDB.StreamOn);
      sts.addField("Pages",coDB.Kind.DWord,"pgs",0,coDB.StreamOn);
      sts.addField("LastTotal",coDB.Kind.DWord,"ltl",0,coDB.StreamOff);
      return sts;
    };
    DB.createMessage=function(){
      var msg=new coDB.Fields("file",coDB.HasNoCollection,coDB.HasNoItems);
      msg.Identity=msg.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
      msg.addField("Data",coDB.Kind.String,"data","",coDB.StreamOn);
      return msg;
    };
    DB.getInboxID=function(){
      return this.Mail.Inbox.Fields.MAP.ID.Value;
    };
    DB.getOutboxID=function(){
      return this.Mail.Outbox.Fields.MAP.ID.Value;
    };
    DB.getSentBoxID=function(){
      return this.Mail.Sent.Fields.MAP.ID.Value;
    };
    DB.getTrashBoxID=function(){
      return this.Mail.Trash.Fields.MAP.ID.Value;
    };
    DB.getFolder=function(iID){
      return this.getItem(fldrs.DB.Fields.MAP.ID,iID);
    };
    DB.SMRY=DB.createSummary();
    DB.Message=DB.createMessage();
    DB.Folders=DB.createFolders();

    DB.Commands=coNet.createCommands(coVDM.VDM.Net);
    DB.Commands.Owner=DB;
    DB.Commands.Screen=Screen;
    DB.Commands.onCmdTimeout=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      mbx.Frame.Torus.Hide();
    };
    DB.Commands.onCmdError=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      mbx.Frame.Torus.Hide();
    };
    DB.Commands.onRecordCountComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK) {
        var cmds=netCMD.Commands;
        var Folder=netCMD.Data;
        var DB=cmds.Owner;
        var mbx=cmds.Screen;
        var status=Folder.MAP.Status.Value;

        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,status.Stanza,xDoc.documentElement);
        if (xItem) {
          status.fromXML(xDoc,xItem);
          var tvi=Folder.Display.getItem(mbx.Folders);
          if (tvi)
            tvi.Synchronize(Folder);
        };
        var vw=Folder.Display.getItemByProperty("Folder",Folder);
        if ((vw) && (vw.Visible==true)) {
          vw.Header.Adjust(status.MAP.Pages.Value);
          if (status.MAP.Total.Value!=status.MAP.LastTotal.Value) {
            status.MAP.LastTotal.Value=status.MAP.Total.Value;
            vw.Torus.Start();
            cmds.FolderList(vw,Folder.MAP.ID.Value,vw.Header.Pages.Current);
          };

        };
        if (DB.Folders.Mail.Inbox==Folder)
          mbx.UpdateStatus();
      };
    };
    DB.Commands.UpdateSMRYInfo=function(vw,id,xDoc,xSMRY){
      var dbItem=vw.getItemById(id);
      if (dbItem) {
        var SMRY=dbItem.MAP.Summary.Value;
        SMRY.fromXML(xDoc,xSMRY);
        dbItem.Display.Synchronize();
      };
    };

    DB.Commands.onUpdateSummaryComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var itmFile=netCMD.Data;
      var xDoc=netCMD.dataRecv;
      var smry=itmFile.MAP.Summary.Value;
      if (coObject.Assigned(smry)) {
        var xSMRY=coXML.getStanza(xDoc,smry.Stanza,xDoc.documentElement);
        if (xSMRY) {
          smry.fromXML(xDoc,xSMRY); // update Master File
          itmFile.Display.Synchronize();
        };
      };
    };
    DB.Commands.onToggleReadComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var itmFile=netCMD.Data;
      var xDoc=netCMD.dataRecv;
      var smry=itmFile.MAP.Summary.Value;
      if (coObject.Assigned(smry)) {
        var xSMRY=coXML.getStanza(xDoc,smry.Stanza,xDoc.documentElement);
        if (xSMRY) {
          smry.fromXML(xDoc,xSMRY);
          itmFile.Display.Synchronize();
        };
      };
      cmds.RecordCount(mbx.Folders.Selected.Data);
    };
    DB.Commands.onTogglePinComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var itmFile=netCMD.Data;
      var xDoc=netCMD.dataRecv;
      var smry=itmFile.MAP.Summary.Value;
      if (coObject.Assigned(smry)) {
        var xSMRY=coXML.getStanza(xDoc,smry.Stanza,xDoc.documentElement);
        if (xSMRY) {
          smry.fromXML(xDoc,xSMRY);
          itmFile.Display.Synchronize();
        };
      };
    };
    DB.Commands.onReadAndReply=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var itmFile=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var mfst=coVDM.Manifest;
        var SumMod=false;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,itmFile.Collection.Stanza,xDoc.documentElement);
        itmFile.fromXML(xDoc,xItem);

        coMail.App.Components.Writers.CreateReply(mbx,itmFile);

        mbx.Frame.Torus.Hide();
      };
    };
    DB.Commands.onReadAndReplyWithMime=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var itmFile=netCMD.Data;
      if (netCMD.Code==coNet.CO_STATUS_OK){
          var mfst=coVDM.Manifest;
          var SumMod=false;
          itmFile.MAP.Data.Value=netCMD.dataRecv;
          coMail.App.Components.Writers.CreateReply(mbx,itmFile);
          mbx.Frame.Torus.Hide();
      };
    };
    DB.Commands.onReadAndForward=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Commands;
        var DB=cmds.Owner;
        var mbx=cmds.Screen;
        var itmFile=netCMD.Data;
        var mfst=coVDM.Manifest;
        var SumMod=false;
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,itmFile.Collection.Stanza,xDoc.documentElement);
        itmFile.fromXML(xDoc,xItem);
        coMail.App.Components.Writers.CreateForward(mbx,itmFile);
        mbx.Frame.Torus.Hide();
      };
    };
    DB.Commands.onFolderListComplete=function(netCMD){
      var cmds=netCMD.Owner;
      var ds=netCMD.Data;
      try {
        ds.LoadInfo.XML=netCMD.dataRecv;
        netCMD.dataRecv="";
        ds.LoadInfo.Start=0;
        ds.LoadInfo.setActive(true);
      } catch(err){
        coVDM.VDM.Console.Append("Exception: Mailbox.DB.Commands.onFolderListComplete "+err);
      };
    };
    DB.Commands.onClearComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Commands;
        var Files=netCMD.Data;
        Files.Clear();
        cmds.RecordCount(Files.Folder);
      };
    };
    DB.Commands.onDeleteComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var tv=mbx.Folders;
      var dbItem=netCMD.Data;
      var Folder=netCMD.Folder;

      if (netCMD.Code==coNet.CO_STATUS_OK){

        var status=Folder.MAP.Status.Value;

        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,status.Stanza,xDoc.documentElement);
        if (xItem) {
          status.fromXML(xDoc,xItem);
          var tvi=Folder.Display.getItem(mbx.Folders);
          if (tvi)
            tvi.Synchronize(Folder);
        };
        var vw=mbx.Nav.gpFullReader.Slide;
        if ( (vw) && (vw.DataSet) && (vw.DataSet==dbItem) )
          mbx.Nav.gpFullReader.Slide=null;

        if (tv.Selected==tv.Mail.Inbox){
          mbx.Nav.setSelected(mbx.Nav.gpInbox);
        } else {
          mbx.Nav.setSelected(mbx.Nav.gpFolderView);
        };

        dbItem.Free();
      };
    };
    DB.Commands.Clear=function(Folder,Files,Folders){
      if (Files==undefined) throw "Files parameter is required.";
      if (Folders==undefined) throw "Folders parameter is required.";
      if (Folder.MAP.ID.Value==Folders.Mail.Inbox.MAP.ID.Value) throw "Cannot clear Inbox.";
      var cmds=this;
      var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coSpectrum.NameSpace,
          coSpectrum.NS_EML_CLEAR,
          coNet.NoData,
          cmds.onClearComplete,
          cmds.onCmdError,
          cmds.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
      );
      netCMD.Data=Files;
      netCMD.Headers.Update(coNet.fieldSearch,Folder.MAP.ID.Value);
      return netCMD;
    };
    DB.Commands.DeleteMessage=function(itmFile,Folder){
      if (Folder==undefined) throw "API Error : Folder Missing";
      var cmds=this;
      var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coSpectrum.NameSpace,
          coSpectrum.NS_EML_DEL,
          coXML.Header+"<files><file><id>"+itmFile.MAP.ID.Value+"</id><fid>"+itmFile.MAP.FolderID.Value+"</fid></file></files>",
          cmds.onDeleteComplete,
          cmds.onCmdError,
          cmds.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
      );
      netCMD.Folder=Folder;
      netCMD.Data=itmFile;
      return netCMD;
    };
    DB.Commands.onMoveComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Owner;
        var DB=cmds.Owner;
        var mbx=coMail.App.Screen;
        var itm=netCMD.Data;

        var Folder=netCMD.Folder;
        var status=Folder.MAP.Status.Value;

        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,status.Stanza,xDoc.documentElement);
        if (xItem) {
          status.fromXML(xDoc,xItem);
          var tvi=Folder.Display.getItem(mbx.Folders);
          if (tvi)
            tvi.Synchronize(Folder);
        };

        itm.Free();
      };
    };
    DB.Commands.MoveMessage=function(itmFile,folderID,Folder){
      if (Folder==undefined) throw "API Error : Folder Missing";
      var cmds=this;
      var ds=itmFile.Collection;
      ds.Move.Assign(itmFile); // streamlined file item for moving files
      var netCMD=coVDM.VDM.Net.Commands.createCommand(
        coVDM.VDM.Net,
        coSpectrum.NameSpace,
        coSpectrum.NS_EML_MOVE,
        coXML.Header+"<files>"+ds.Move.toXML()+"</files>",
        cmds.onMoveComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Headers.Update(coNet.fieldSearch,folderID);
      netCMD.Data=itmFile;
      netCMD.Owner=cmds;
      netCMD.Folder=Folder;
      return netCMD;
    };
    DB.Commands.onDownloadFileComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
    };
    DB.Commands.onMultiDeleteEmailComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var vw=netCMD.Owner;
      var dbFiles=netCMD.Data;
      for (var iLcv=0; iLcv<dbFiles.length; iLcv++){
        var itm=dbFiles[iLcv];
        itm.Free();
      };
      dbFiles.length=0;
      dbFiles=netCMD.Data=null;
      vw.Torus.Hide();
      mbx.UpdateStatus();
    };
    DB.Commands.onMultiDeleteFilesComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var dbFiles=netCMD.Data;
      for (var iLcv=0; iLcv<dbFiles.length; iLcv++){
        var itm=dbFiles[iLcv];
        itm.Free();
      };
      dbFiles.length=0;
      dbFiles=netCMD.Data=null;
    };
    DB.Commands.onListFoldersComplete=function(netCMD){
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var cmds=netCMD.Owner;
        var DB=cmds.Owner;
        var sc=DB.Screen;
        sc.Loading=true;
        DB.Loading=true;
        DB.Loaded=false;
        DB.Folders.LoadInfo.Validate=false;
        DB.Folders.LoadInfo.XML=netCMD.dataRecv;
        DB.Folders.LoadInfo.Start=0;
        DB.Folders.LoadInfo.setActive(true);
        netCMD.dataRecv="";
      };
    };
    DB.Commands.DownloadFile=function(dbFile){
      var cmds=this;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var sURL=coVDM.URI_FILE_DOWNLOAD.replace("$id",dbFile.MAP.ID.Value);
      window.open(sURL,"_blank");
    };
    DB.Commands.FolderList=function(View,folderID,Page){
      if (Page==undefined) throw "Page is now required.";
      var cmds=this;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var Files=View.DataSet;
      if ( (!folderID) || (folderID==0) || (folderID==undefined) ) return;
      View.Torus.Show();
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSpectrum.NameSpace,
        coSpectrum.NS_EML_LIST,
        coNet.NoData,
        cmds.onFolderListComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Owner=cmds;
      netCMD.Data=Files;
      netCMD.Headers.Update(coNet.fieldSearch,folderID);
      netCMD.Headers.Update(coNet.fieldDepth,Page);
    };
    DB.Commands.ListFolders=function(Parent){
      var cmds=this;
      var DB=cmds.Owner;
      var sPath=(Parent==undefined) ? coLang.Table.Mail.Folder: Parent.MAP.Path.Value;
      var mbx=cmds.Screen;
      mbx.Folders.Torus.Start();
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_FLDS_LIST,
        coNet.NoData,
        cmds.onListFoldersComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=DB.Folders;
      netCMD.Owner=cmds;
      netCMD.Headers.Update(coNet.fieldSearch,sPath);
      netCMD.Headers.Update(coNet.fieldDepth,coVDM.FolderRefreshDepth);
    };
    DB.Commands.multiDeleteEmail=function(vw,itms){
      var cmds=this;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var dbFiles=new Array();
      var sData=coXML.Header+"<files>";
      var iID=0;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var vi=itms[iLcv];
        vi.Hide();
        var dbItem=vi.Data;
        dbFiles.push(dbItem);
        sData+="<file><id>"+dbItem.MAP.ID.Value+"</id></file>";
      };
      sData+="</files>";
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coSpectrum.NameSpace,
        coSpectrum.NS_EML_DEL,
        sData,
        cmds.onMultiDeleteEmailComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=dbFiles;
      netCMD.Owner=vw;
      var cmd=vw.Mode.Command;
      cmd.setValue(cmd.Default);
    };
    DB.Commands.multiDeleteFiles=function(itms){
      var cmds=this;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var dbFiles=new Array();
      var sData=coXML.Header+"<files>";
      var iID=0;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        var vi=itms[iLcv];
        vi.Hide();
        var dbItem=vi.Data;
        dbFiles.push(dbItem);
        sData+="<file><id>"+dbItem.MAP.ID.Value+"</id><fid>"+dbItem.MAP.FolderID.Value+"</fid></file>";
      };
      sData+="</files>";
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_FLS_DELETE,
        sData,
        cmds.onMultiDeleteFilesComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Data=dbFiles;
    };
    DB.Commands.RecordCount=function(Folder){
      var cmds=this;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coSpectrum.NameSpace,
          coSpectrum.NS_EML_COUNT,
          coNet.NoData,
          cmds.onRecordCountComplete,
          cmds.onCmdError,
          cmds.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
      );
      netCMD.Headers.Update(coNet.fieldSearch,Folder.MAP.ID.Value);
      netCMD.Owner=cmds;
      netCMD.Data=Folder;
    };
    DB.Commands.UpdateSummary=function(itmFile){
      var cmds=this;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var drSum=DB.SMRY;
      var smry=itmFile.MAP.Summary.Value;
      drSum.Assign(smry);
      drSum.MAP.ID.Value=itmFile.MAP.ID.Value;
      var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coSpectrum.NameSpace,
          coSpectrum.NS_EML_UP_SMRY,
          coXML.Header+drSum.toXML(),
          cmds.onUpdateSummaryComplete,
          cmds.onCmdError,
          cmds.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
      );
      netCMD.Data=itmFile;
    };
    DB.Commands.ToggleRead=function(itmFile, Value){
      if (Value==undefined) Value=null;
      var cmds=this;
      var smry=itmFile.MAP.Summary.Value;
      var Read=smry.MAP.Read.Value=(!smry.MAP.Read.Value);
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var drSum=DB.SMRY;
      var smry=itmFile.MAP.Summary.Value;
      drSum.Assign(smry);
      drSum.MAP.ID.Value=itmFile.MAP.ID.Value;
      if (Value!=null) Read=Value;
      if (Read==true) {
        itmFile.MAP.Flags.Value=itmFile.MAP.Flags.Value | coSpectrum.IMAP.Flags.Seen;
      } else {
        if ( (itmFile.MAP.Flags.Value | coSpectrum.IMAP.Flags.Seen)==itmFile.MAP.Flags.Value)
          itmFile.MAP.Flags.Value-=coSpectrum.IMAP.Flags.Seen;
      };
      var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coSpectrum.NameSpace,
          coSpectrum.NS_EML_UP_SMRY,
          coXML.Header+drSum.toXML(),
          cmds.onToggleReadComplete,
          cmds.onCmdError,
          cmds.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
      );
      netCMD.Data=itmFile;
    };
    DB.Commands.TogglePin=function(itmFile, Value){
      if (Value==undefined) Value=null;
      var cmds=this;
      var smry=itmFile.MAP.Summary.Value;
      var Pin=smry.MAP.Pinned.Value=(!smry.MAP.Pinned.Value);
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      var drSum=DB.SMRY;
      var smry=itmFile.MAP.Summary.Value;
      drSum.Assign(smry);
      drSum.MAP.ID.Value=itmFile.MAP.ID.Value;
      if (Value!=null) Pin=Value;
      if (Pin==true) {
        itmFile.MAP.Flags.Value=itmFile.MAP.Flags.Value | coSpectrum.IMAP.Flags.Pinned;
      } else {
        if ((itmFile.MAP.Flags.Value | coSpectrum.IMAP.Flags.Pinned)==itmFile.MAP.Flags.Value)
          itmFile.MAP.Flags.Value-=coSpectrum.IMAP.Flags.Pinned;
      };
      var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coSpectrum.NameSpace,
          coSpectrum.NS_EML_UP_SMRY,
          coXML.Header+drSum.toXML(),
          cmds.onTogglePinComplete,
          cmds.onCmdError,
          cmds.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
      );
      netCMD.Data=itmFile;
    };
    DB.Commands.readAndReply=function(mbx,itmFile){
      var cmds=this;
      var DB=cmds.Owner;
        // streamlined xml with just id and file data
      DB.Message.Assign(itmFile);
      if (DB.Message.MAP.Data.Value.length==0) {
        mbx.Frame.Torus.Show();
        var smry=itmFile.MAP.Summary.Value.MAP;
        var ct=mbx.Unit.SMTP.ContentType;
        var ctVal=smry.cntType.Value;
        if ( (ctVal==ct.MultiAlternative) || (ctVal==ct.MultiMixed) ) {
          var fileID=itmFile.MAP.ID.Value;
          var mimes=smry.Mimes.Value;
          var ctHTML=mbx.Unit.SMTP.ContentType.TextHTML;
          var ctText=mbx.Unit.SMTP.ContentType.TextPlain;
          var mItem=mHTML=mimes.getItem(mimes.MAP.cntType,ctHTML);
          if (!mHTML) {
            var mPlain=mimes.mimes.getItem(mimes.MAP.cntType,ctText);
            mItem=mPlain;
          };
          var netCMD=cmds.createCommand(
              coVDM.VDM.Net,
              coSpectrum.NameSpace,
              coSpectrum.NS_EML_MIME,
              coXML.Header+mItem.toXML(),
              function(netCMD){ // Success
                var mbx=netCMD.Owner;
                var dbItem=netCMD.Data;
                var smry=dbItem.MAP.Summary.Value.MAP;
                var SumMod=false;
                var cmds=mbx.DB.Commands;
                dbItem.MAP.Data.Value=netCMD.dataRecv;
                coMail.App.Components.Writers.CreateReply(mbx,dbItem);
                mbx.Frame.Torus.Hide();
              },
              mbx.DB.Commands.onCmdError, // Error
              mbx.DB.Commands.onCmdTimeOut, // TimeOut
              coNet.NoProgress,
              coNet.CreateAndRun,
              coNet.FreeOnComplete,
              coNet.AutoLoadOff
          );
          netCMD.Headers.Update(coNet.fieldSearch,fileID);

        } else {
          var netCMD=cmds.createCommand(
              coVDM.VDM.Net,
              coSpectrum.NameSpace,
              coSpectrum.NS_EML_READ,
              coXML.Header+mbx.DB.Message.toXML(),
              cmds.onReadAndReply,
              mbx.DB.Commands.onCmdError,
              mbx.DB.Commands.onCmdTimeOut,
              coNet.NoProgress,
              coNet.CreateAndRun,
              coNet.FreeOnComplete,
              coNet.AutoLoadOff
          );
        };
        netCMD.Owner=mbx;
        netCMD.Data=itmFile;
      } else {
        mbx.Frame.Torus.Show();
        coMail.App.Components.Writers.CreateReply(mbx,itmFile);
        mbx.Frame.Torus.Hide();
      };
    };
    DB.Commands.readAndForward=function(itmFile){
      var cmds=this;
      var DB=cmds.Owner;
      var mbx=cmds.Screen;
      DB.Message.Assign(itmFile);
      if (DB.Message.Data.Value.length==0) {
        mbx.Frame.Torus.Show();
        var netCMD=cmds.createCommand(
          coVDM.VDM.Net,
          coSpectrum.NameSpace,
          coSpectrum.NS_EML_READ,
          coXML.Header+mbx.DB.Message.toXML(),
          cmds.onReadAndForward,
          mbx.DB.Commands.onCmdError,
          mbx.DB.Commands.onCmdTimeOut,
          coNet.NoProgress,
          coNet.CreateAndRun,
          coNet.FreeOnComplete,
          coNet.AutoLoadOff
        );
        netCMD.Owner=mbx;
        netCMD.Data=itmFile;
      } else {
        mbx.Frame.Torus.Show();
        coMail.App.Components.Writers.CreateForward(mbx,itmFile);
        mbx.Frame.Torus.Hide();
      };
    };
    return DB;
  }
};
