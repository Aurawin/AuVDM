const Encoding= {
  Unit           : '',
  Loaded         : true,
  Initialized    : false,
  debugToConsole : false,
  
  b64Key : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  CRLF   : "\r\n",
  init : function(){
    this.Initialized=true;
  },  
  hexToUTF8:function(){
    var len=arguments.length;
    switch (len){
      case (1) : {
        var a1=parseInt(arguments[0],16);
        return String.fromCharCode(a1);
      };
      case (2) : {
        var a1=parseInt(arguments[0],16);
        var a2=parseInt(arguments[1],16);
        return String.fromCharCode(a2+((a1-194)*64) );
      };
      case (3) : {
        var a1=parseInt(arguments[0],16);
        var a2=parseInt(arguments[1],16);
        var a3=parseInt(arguments[2],16);
        var iBias=a1-224;
        if (iBias==0) {
          return String.fromCharCode( (2048+64*(a2-160)+(a3-128) ));
        } else {
          return String.fromCharCode( ((2048*(2*iBias))+64*(a2-128)+(a3-128) ));
        };
      };
      case (4) : {
        var a1=parseInt(arguments[0],16);
        var a2=parseInt(arguments[1],16);
        var a3=parseInt(arguments[2],16);
        var a4=parseInt(arguments[3],16);
        switch (a1) {
          /* f0 */ case (240) : return String.fromCharCode(65536+128*(a2-144)+64*(a3-128)+(a4-128) );
        };
      };
    };

  },
  toUTF8:function ( string ){
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
     for (var n = 0; n < string.length; n++) {
       var c = string.charCodeAt(n);

       if (c < 128) {
         utftext += String.fromCharCode(c);
       } else if ((c > 127) && (c < 2048)) {
         utftext += String.fromCharCode((c >> 6) | 192);
  	 utftext += String.fromCharCode((c & 63) | 128);
       } else {
         utftext += String.fromCharCode((c >> 12) | 224);
 	 utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	 utftext += String.fromCharCode((c & 63) | 128);
       };

    }

    return utftext;
  },
  fromUTF8:function(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
	i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
	string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	i += 2;
      } else {
        c2 = utftext.charCodeAt(i+1);
	c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	i += 3;
      };
    };

    return string;
  },
  base64Encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    //input = coEncoding.toUTF8(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      };
      var output = output.concat(
        coEncryption.b64Key[enc1],
        coEncryption.b64Key[enc2],
        coEncryption.b64Key[enc3],
        coEncryption.b64Key[enc4]
      );
    };
    return output;
  },
  base64Decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input=input.replace(/\r\n/g,"");
    while (i < input.length) {
        enc1 = coEncryption.b64Key.indexOf(input.charAt(i++));
        enc2 = coEncryption.b64Key.indexOf(input.charAt(i++));
        enc3 = coEncryption.b64Key.indexOf(input.charAt(i++));
        enc4 = coEncryption.b64Key.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        };
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        };

    };
    return this.fromUTF8(output);
  },
  htmlDecode : function(input){
    input = input.replace(/\r\n/g,"\n");
    input = input.replace(/\=\n/g,"");
    var saInput=input.split("\n");
    var chr='';
    var i = 0, iStart=0, iLcv=0;
    var sPre="", sPost="", sLine="";
    while (iLcv<saInput.length) {
      sLine=saInput[iLcv];
      i=0; iStart=0;
      while (i < sLine.length) {
        iStart=i;
        iEnd=i+3;
        chr = sLine.charAt(i++);
        switch (chr){
          case('=') : {
            chr = sLine.charAt(i++);
            switch (chr) {
              case ('3') : {
                chr = sLine.charAt(i++);
                switch (chr){
                  case ('D'):{
                    sPre=sLine.slice(0,iStart);
                    sPost=sLine.slice(iEnd);
                    sLine=sPre+"="+sPost;
                    break;
                  };
                };
                break;
              };
              case ('A') : {
                chr = sLine.charAt(i++);
                switch (chr){
                  case ('0'):{
                    sPre=sLine.slice(0,iStart);
                    sPost=sLine.slice(iEnd);
                    sLine=sPre+"&nbsp;"+sPost;
                    break;
                  };
                };
                break;
              };
            };
            break;
          };
          break;
        };
      };
      saInput[iLcv]=sLine;
      iLcv++;
    };
    return saInput.join(this.CRLF);
  }

};

