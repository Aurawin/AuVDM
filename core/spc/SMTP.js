coSpectrum.App.Components.SMTP = {
  Version        : new Version(2014,10,8,45),
  Title          : new Title("Spectrum SMTP","SMTP"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSpectrum.App,'/core/spc/SMTP.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create:function(){
    smtp=coObject.Create();
    smtp.Class="SMTP";
    smtp.LinesMax=2;
    smtp.CharSet=new Object();
    smtp.CharSet.UTF_8=1;
    smtp.CharSet.UTF_16=2;
    smtp.CharSet.UTF_16BE=3;
    smtp.CharSet.UTF_16LE=4;
    smtp.CharSet.ISO_8859_1=5;
    smtp.CharSet.ISO_8859_2=6;
    smtp.CharSet.ISO_8859_3=7;
    smtp.CharSet.ISO_8859_4=8;
    smtp.CharSet.ISO_8859_5=9;
    smtp.CharSet.ISO_8859_6=10;
    smtp.CharSet.ISO_8859_7=11;
    smtp.CharSet.ISO_8859_8=12;
    smtp.CharSet.ISO_8859_8_1=13;
    smtp.CharSet.ISO_8859_9=14;
    smtp.CharSet.ISO_8859_10=15;
    smtp.CharSet.ISO_8859_11=16;
    smtp.CharSet.ISO_8859_12=17;
    smtp.CharSet.ISO_8859_13=18;
    smtp.CharSet.ISO_8859_14=19;
    smtp.CharSet.ISO_8859_15=20;
    smtp.CharSet.ISO_8859_16=21;
    smtp.CharSet.ISO_8859_KR=22;
    smtp.CharSet.ISO_8859_JP=23;
    smtp.CharSet.ISO_8859_CN=24;
    smtp.CharSet.ISO_IR_111=25;
    smtp.CharSet.Windows_874=26;
    smtp.CharSet.Windows_1250=27;
    smtp.CharSet.Windows_1251=28;
    smtp.CharSet.Windows_1252=29;
    smtp.CharSet.Windows_1253=30;
    smtp.CharSet.Windows_1254=31;
    smtp.CharSet.Windows_1255=32;
    smtp.CharSet.Windows_1256=33;
    smtp.CharSet.Windows_1257=34;
    smtp.CharSet.Windows_1258=35;
    smtp.CharSet.EUC_KR=36;
    smtp.CharSet.EUC_JP=37;
    smtp.CharSet.EUC_TW=38;
    smtp.CharSet.TIS_620=39;
    smtp.CharSet.UHC=40;
    smtp.CharSet.JOHAB=41;
    smtp.CharSet.TCVN=42;
    smtp.CharSet.VPS=43;
    smtp.CharSet.CP_866=44;
    smtp.CharSet.ARMSCII_8=45;
    smtp.CharSet.USASCII=46;
    smtp.CharSet.VISCII=47;
    smtp.CharSet.HZ=48;
    smtp.CharSet.GBK=49;
    smtp.CharSet.Big5=50;
    smtp.CharSet.Big5_HKSCS=51;
    smtp.CharSet.GB2312=52;
    smtp.CharSet.GB18030=53;
    smtp.CharSet.K018_R=54;
    smtp.CharSet.K018_U=55;
    smtp.CharSet.IBM_850=56;
    smtp.CharSet.IBM_852=57;
    smtp.CharSet.IBM_855=58;
    smtp.CharSet.IBM_857=59;
    smtp.CharSet.IBM_864=60;
    smtp.CharSet.IBM_862=61;

    smtp.CharSet.MacCE=62;
    smtp.CharSet.MacRoman=63;
    smtp.CharSet.MacRomanian=64;
    smtp.CharSet.MacTurkish=65;
    smtp.CharSet.MacIcelandic=66;
    smtp.CharSet.MacShift_JIS=67;
    smtp.CharSet.MacCyrillic=68;
    smtp.CharSet.MacCroation=69;
    smtp.CharSet.MacDevanagari=70;
    smtp.CharSet.MacGurmukhi=71;
    smtp.CharSet.MacGujarati=62;

    smtp.ContentType=new Object();
    smtp.ContentType.Class="ContentType";
    smtp.ContentType.Unknown          = 0;
    smtp.ContentType.TextPlain        = 1;
    smtp.ContentType.TextHTML         = 2;
    smtp.ContentType.MultiAlternative = 3;
    smtp.ContentType.MultiMixed       = 4;
    smtp.ContentType.MultiRelated     = 5;
    smtp.ContentType.MultiDigest      = 6;
    smtp.ContentType.MultiMessage     = 7;
    smtp.ContentType.MultiSigned      = 8;
    smtp.ContentType.MultiEncrypted   = 9;
    smtp.ContentType.Application      = 10;
    smtp.ContentType.Image            = 11;
    smtp.ContentType.PGPSignature     = 12;
    smtp.ContentDisposition=new Object();
    smtp.ContentDisposition.None       = 0;
    smtp.ContentDisposition.Inline     = 1;
    smtp.ContentDisposition.Attachment = 2;

    smtp.ContentEncoding=new Object();
    smtp.ContentEncoding.Class="ContentEncoding";
    smtp.ContentEncoding.None            = 0;
    smtp.ContentEncoding.Base64          = 1;
    smtp.ContentEncoding.Bit7            = 2;
    smtp.ContentEncoding.Bit8            = 3;
    smtp.ContentEncoding.QuotedPrintable = 4;
    smtp.ContentEncoding.Binary          = 5;

    smtp.RX_UTF_8=new RegExp("\=\\?utf\-8\\?", "i");
    smtp.RX_UTF_8.Owner=smtp;
    smtp.RX_UTF_8.TagOffset=8;
    smtp.RX_UTF_8.UnEscape=function(sData){
      sData=sData.replace(/\_/g," ");
      return this.Owner.UnEscapeUTF8(sData);
    };
    smtp.RX_UTF_8.getCharSet=function(itm){
      return this.Owner.CharSet.UTF_8;
    };

    smtp.RX_GB=new RegExp("\=\\?gb\d{4}\\?","i");
    smtp.RX_GB.Owner=smtp;
    smtp.RX_GB.TagOffset=4;
    smtp.RX_GB.getCharSet=function(itm){
      return this.Owner.CharSet.GB2312;
    };
    smtp.RX_GB.UnEscape=function(sData){
      sData=sData.replace(/\_/g," ");
      return this.Owner.UnEscapeGB(sData);
    };

    smtp.RX_ISO=new RegExp("\=\\?iso\-8859\-[1-9]","i");
    smtp.RX_ISO.Owner=smtp;
    smtp.RX_ISO.TagOffset=10;
    smtp.RX_ISO.getCharSet=function(itm){
      switch (itm){
        case ("1")   : return this.Owner.CharSet.ISO_8859_1;
        case ("2")   : return this.Owner.CharSet.ISO_8859_2;
        case ("3")   : return this.Owner.CharSet.ISO_8859_3;
        case ("4")   : return this.Owner.CharSet.ISO_8859_4;
        case ("5")   : return this.Owner.CharSet.ISO_8859_5;
        case ("6")   : return this.Owner.CharSet.ISO_8859_6;
        case ("7")   : return this.Owner.CharSet.ISO_8859_7;
        case ("8")   : return this.Owner.CharSet.ISO_8859_8;
        case ("8_1") : return this.Owner.CharSet.ISO_8859_8_1;
        case ("9")   : return this.Owner.CharSet.ISO_8859_9;
        case ("10")   : return this.Owner.CharSet.ISO_8859_10;
        case ("11")   : return this.Owner.CharSet.ISO_8859_11;
        case ("12")   : return this.Owner.CharSet.ISO_8859_12;
        case ("13")   : return this.Owner.CharSet.ISO_8859_13;
        case ("14")   : return this.Owner.CharSet.ISO_8859_14;
        case ("15")   : return this.Owner.CharSet.ISO_8859_15;
        case ("16")   : return this.Owner.CharSet.ISO_8859_16;
      };
      return this.Owner.CharSet.ISO_8859_1;
    };
    smtp.RX_ISO.UnEscape=function(sData){
      sData=sData.replace(/\_/g," ");
      return this.Owner.UnEscapeISO(sData);
    };

    smtp.RX_Windows=new RegExp("\\=\\?windows\\-[1-9]","i");
    smtp.RX_Windows.Owner=smtp;
    smtp.RX_Windows.TagOffset=9;
    smtp.RX_Windows.getCharSet=function(itm){
      switch (itm){
        case ("874")   : return this.Owner.CharSet.Windows_874;
        case ("1250")   : return this.Owner.CharSet.Windows_1250;
        case ("1251")   : return this.Owner.CharSet.Windows_1251;
        case ("1252")   : return this.Owner.CharSet.Windows_1252;
        case ("1253")   : return this.Owner.CharSet.Windows_1253;
        case ("1254")   : return this.Owner.CharSet.Windows_1254;
        case ("1255")   : return this.Owner.CharSet.Windows_1255;
        case ("1256")   : return this.Owner.CharSet.Windows_1256;
        case ("1257")   : return this.Owner.CharSet.Windows_1257;
      };
      return this.Owner.CharSet.Windows_1250;
    };
    smtp.RX_Windows.UnEscape=function(sData){
      sData=sData.replace(/\_/g," ");
      return this.Owner.UnEscapeWindows(sData);
    };
    smtp.RX_HTTP=new RegExp(" src\=[\"\']http://", "i");

    smtp.Prepare=function(data){
      data=data.replace(/\=\r\n/g,"");
      data=data.replace(/\r/g,"");
      data=data.replace(/\n/g,coNet.CRLF);
      return data;
    };
    smtp.CleanupLines=function(sa){
      var iLcv=0;
      while (iLcv<sa.length){
        sa[iLcv]=sa[iLcv].trim();
        if (sa[iLcv]==""){
          sa.splice(iLcv,1);
        } else {
          iLcv++;
        };
      };
      sa.length=2;
      if (!sa[0]) sa[0]="";
      if (!sa[1]) sa[1]="";

      return sa;
    };
    smtp.BodyLinesForReply=function(input,dtMsg,sFrom){
      var smtp=this;
      var saLines=null;
      var sBodyStr=coLang.Table.Mail.Reply.BodyStr;
      var dtValue=coDateTime.decodeDateTime(dtMsg);
      var sName=smtp.NameFromEmail(sFrom);
      var sEmail=smtp.AddressFromEmail(sFrom);
      sBodyStr=sBodyStr.replace("$date",dtValue.Date.toString());
      sBodyStr=sBodyStr.replace("$time",dtValue.Time.toString());
      sBodyStr=sBodyStr.replace("$email",sEmail);
      sBodyStr=sBodyStr.replace("$name",sName);

      if (input.indexOf(coNet.CRLF)!=-1)
        var saLines=input.split(coNet.CRLF);
      if ( (!saLines) && (input.indexOf(coNet.LF)!=-1) )
        var saLines=input.split(coNet.LF);
      if ( (!saLines) && (input.indexOf(coNet.CR)!=-1) )
        var saLines=input.split(coNet.CR);
      if (!saLines) saLines=input.split(coNet.CRLF);
      if (coLang.Table.Mail.Reply.QuoteStr.length>0){
        for (var iLcv=0; iLcv<saLines.length; iLcv++){
          saLines[iLcv]=coLang.Table.Mail.Reply.QuoteStr+saLines[iLcv];
        };
      };
      return coNet.CRLF.concat(coNet.CRLF,sBodyStr,coNet.CRLF,saLines.join(coNet.CRLF));
    };
    smtp.ParseHeaderB=function(input,rExp,Offset){
      var idxS=input.search(rExp);
      var sPre="", sRest="", idxE=0, sData="";
      while (idxS>-1) {
        sPre=input.substring(0,idxS-1);
        sRest=input.substring(idxS);
        idxE=sRest.indexOf("?=");

        sData=sRest.substring(Offset,idxE);
        sRest=sRest.substring(idxE+2);

        sData=coEncoding.base64Decode(sData);

        input=sPre+sData+sRest;
        idxS=input.search(rExp);
      };
      return input;
    };
    smtp.ParseHeaderQ=function(input,rExp,Offset){
      var idxS=input.search(rExp);
      var sData="", sTag="", idxE=-1, idxQ=-1;
      while (idxS>-1) {
        idxE=input.indexOf("?=",idxS+Offset);
        if (idxE==-1) idxE=input.length;
        sData=input.substring(idxS+Offset,idxE);
        sTag=input.substring(rExp.TagOffset);
        idxQ=sTag.indexOf("?");
        sTag=sTag.substring(0,idxQ);


        sData=rExp.UnEscape(sData);
        try {
          input=input.substring(0,idxS)+sData+input.substring(idxE+2);
        } catch (err){
          idxS=idxS;
        };

        idxS=input.search(rExp);
      };
      return input;
    };
    smtp.ParseHeader=function(input,rExp){
      var idx=input.search(rExp);
      if (idx>-1) {
        //?b? or ?q?
        var idxQ=input.indexOf("?",idx+2);
        var Offset=0;
        var kind=input.substring(idxQ+1,idxQ+2).toLowerCase();
        switch (kind){
          case ("b") : {
            Offset=(input.indexOf("?",idxQ+2)-idx)+1;
            return this.ParseHeaderB(input,rExp,Offset);
          };
          case ("q") : {
            Offset=(input.indexOf("?",idxQ+2)-idx)+1;
            return this.ParseHeaderQ(input,rExp,Offset);
          };
        };
      };
      return input;
    };
    smtp.DecodeHeader=function(input){
      input=smtp.ParseHeader(input,this.RX_UTF_8);
      input=smtp.ParseHeader(input,this.RX_ISO);
      input=smtp.ParseHeader(input,this.RX_GB);
      input=smtp.ParseHeader(input,this.RX_Windows);
      return this.UnEscapeISO(input);
    };
    smtp.BodyLinesForForward=function(input,dtMsg,sFrom){
      var smtp=this;
      var saLines=null;
      var sBodyStr=coLang.Table.Mail.Forward.BodyStr;
      var dtValue=coDateTime.decodeDateTime(dtMsg);
      var sName=smtp.NameFromEmail(sFrom);
      var sEmail=smtp.AddressFromEmail(sFrom);
      sBodyStr=sBodyStr.replace("$date",dtValue.Date.toString());
      sBodyStr=sBodyStr.replace("$time",dtValue.Time.toString());
      sBodyStr=sBodyStr.replace("$email",sEmail);
      sBodyStr=sBodyStr.replace("$name",sName);

      if (input.indexOf(coNet.CRLF)!=-1)
        var saLines=input.split(coNet.CRLF);
      if ( (!saLines) && (input.indexOf(coNet.LF)!=-1) )
        var saLines=input.split(coNet.LF);
      if ( (!saLines) && (input.indexOf(coNet.CR)!=-1) )
        var saLines=input.split(coNet.CR);
      if (!saLines) saLines=input.split(coNet.CRLF);
      if (coLang.Table.Mail.Forward.QuoteStr.length>0){
        for (var iLcv=0; iLcv<saLines.length; iLcv++){
          saLines[iLcv]=coLang.Table.Mail.Forward.QuoteStr+saLines[iLcv];
        };
      };
      return coNet.CRLF.concat(coNet.CRLF,sBodyStr,coNet.CRLF,saLines.join(coNet.CRLF));
    };
    smtp.SubjectForReply=function(input){
      var output=input;
      if (output.indexOf(coLang.Table.Mail.Reply.SubjectStr)==-1)
        output=coLang.Table.Mail.Reply.SubjectStr+output;
      return output;
    };
    smtp.SubjectForForward=function(input){
      var output=input;
      if (output.indexOf(coLang.Table.Mail.Forward.SubjectStr)==-1)
        output=coLang.Table.Mail.Forward.SubjectStr+output;
      return output;
    };
    smtp.NameFromEmail=function(input){
      // "User Name" <id@domain>
      // id@domain (User Name)
      // just@domain
      var iStartLoc=input.indexOf("<");
      var iEndLoc=input.indexOf(">");
      if (iStartLoc==-1) {
        iStartLoc=input.indexOf("(");
        iEndLoc=input.indexOf(")");
        if (iStartLoc!=-1) {
          input=input.substring(iStartLoc+1,iEndLoc-1);
        } else {
          iStartLoc=input.indexOf("@");
          input=(iStartLoc>=0) ? input.substring(0,iStartLoc) : input;
        };
      } else {
        input=input.substring(0,iStartLoc-1);
        input=input.replace(/\"/g,"");
      };
      return input;
    };
    smtp.Split=function(input){
      var sa=new Array();
      sa[0]=this.NameFromEmail(input);
      sa[1]=this.AddressFromEmail(input);
      return sa;
    };
    smtp.AddressFromEmail=function(input){
      // "User Name" <id@domain>
      // id@domain (User Name)
      var output=input;
      var iStartLoc=output.indexOf("<");
      var iEndLoc=output.indexOf(">");
      if (iStartLoc==-1) {
        iStartLoc=output.indexOf("(");
        if (iStartLoc!=-1)
          output=output.substring(0,iStartLoc-1);
      } else {
        output=output.substring(iStartLoc+1,iEndLoc);
      };
      return output.toLowerCase();
    };
    smtp.getBody=function(mime,input){
      var saInput=input.split(coNet.CRLF);

      var output=input;

      var iLoc=output.indexOf(coNet.HEADER_SEPARATOR);
      output=output.substring(iLoc+4,output.length)
      output=output.replace(coNet.SMTP_FOOTER,"");
      return output;
    };
    smtp.CleanupLine=function(line){
      line=line.replace("\u2013","&ndash;");
      line=line.replace("\u2014","&emdash;");
      return line;
    };
    smtp.TextToHTML=function(input){
      var output=input.replace("<","&lt;");
      output=output.replace(">","&gt;");
      output=output.replace(/\r\n\r\n/g,"<p>");
      output=output.replace(/\r\n/g,"<br>");
      output=output.replace(/\n/g,"<br>");
      return output;
    };
    smtp.UnEscapeUTF8=function(input){
      var output=input;
      output=output.replace(/\=\r\n/g,"");

      output=output.replace(
        /\=([F][A-F0-9])\=([A-F0-9]{2})\=([A-F0-9]{2})\=([A-F0-9]{2})/g,
        function(m, g1,g2,g3,g4) {
          return coEncoding.hexToUTF8(g1,g2,g3,g4);
        }
      );

      output=output.replace(
        /\=([E-F][A-F0-9])\=([A-F0-9]{2})\=([A-F0-9]{2})/g,
        function(m, g1,g2,g3) {
          return coEncoding.hexToUTF8(g1,g2,g3);
        }
      );
      output=output.replace(
        /\=([C-F][0-9])\=([A-F0-9]{2})/g,
        function(m, g1,g2) {
          return coEncoding.hexToUTF8(g1,g2);
        }
      );
      output=output.replace(
        /\=([A-F0-9]{2})/g,
        function(m, g1) {
          return String.fromCharCode(parseInt(g1,16));
        }
      );
      return output;
    };
    smtp.UnEscapeISO=function(input){
      var output=input;
      output=output.replace(/\=\r\n/g,"");
      output=output.replace(
        /\=([A-F0-9]{2})/g,
        function(m, g1) {
            return String.fromCharCode(parseInt(g1,16));
        }
      );
      return output;
    };
    smtp.UnEscapeWindows=function(input){
      var output=input;
      output=output.replace(/\=\r\n/g,"");
      output=output.replace(
        /\=([A-Fa-f0-9]{2})/g,
        function(m, g1) {
            return String.fromCharCode(parseInt(g1,16));
        }
      );
      return output;
    };
    smtp.UnEscapeGB=function(input){
      var output=input;
      output=output.replace(/\=\r\n/g,"");
      output=output.replace(
        /\=([A-Fa-f0-9]{2})/g,
        function(m, g1) {
            return String.fromCharCode(parseInt(g1,16));
        }
      );
      return output;
    };
    smtp.Wrap=function(input){
      return "".concat("<div class=\"pnlSMTPMsg\">",input,"</div>");
    };
    smtp.NormalizeAddress=function(Addr){
      Addr=Addr.trim();
      var sName=""; var sEmail="";
      var idx=Addr.indexOf("(");
      if (idx!=-1){
        // me@there.com (Test Name)
        var idxE=Addr.indexOf(")");
        sName=Addr.substring(idx+1,idxE);
        sEmail=Addr.substring(0,idx-2);

        return sName+" <"+sEmail+">";
      };
      idx=Addr.indexOf(", ");
      if (idx!=-1){
        idx=Addr.indexOf(" <");
        if (idx!=-1){
          var idxE=Addr.indexOf(">");
          sName=Addr.substring(0,idx-1);
          sName=sName.replace(/"/g, "");
          var saName=sName.split(", ");
          sName=saName[1]+" "+saName[0];
          sEmail=Addr.substring(idx+2,idxE);
          return sName+" <"+sEmail+">";
        };
      };
      var len=Addr.length;
      if ( (Addr[0]=='<') && (Addr[len-1]==">") )
        Addr=Addr.substring(1,len-1);
      return Addr;
    };
    smtp.Nullmap=function(Data){
      var idx=Data.search(this.RX_HTTP);
      var sPre=sPost=sQ="";
      while (idx!=-1) {
        sPre=Data.substring(0,idx);
        sPost=Data.substring(idx+13);
        sQ=Data[idx+5];
        Data=sPre+" null="+sQ+"https://"+sPost;
        idx=Data.search(this.RX_HTTP);
      };
      return Data;
    };
    smtp.Remap=function(Data){
      var idx=Data.search(this.RX_HTTP);
      var sPre=sPost=sQ="";
      while (idx!=-1) {
        sPre=Data.substring(0,idx);
        sPost=Data.substring(idx+13);
        sQ=Data[idx+5];
        Data=sPre+" src="+sQ+"https://"+sPost;
        idx=Data.search(this.RX_HTTP);
      };
      return Data;
    };
    return smtp;
  }
};
