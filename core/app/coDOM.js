var coDOM={
  Version         : new Version(2018,3,8,179),
  Title           : new Title("Core Object DOM Object","coDOM"),
  Vendor          : new Vendor("Aurawin", "Copyright (&copy;) 2011-2018.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),

  Browser         : null,
  setText         : null,
  setHTML         : null,
  getHTML         : null,
  getText         : null,
  getTextLen      : null,
  setHint         : null,
  target          : null,
  parseText       : null,
  addEvent        : null,
  removeEvent     : null,
  setPlaceHolder  : null,
  setTransform    : null,
  setBoxShadow    : null,
  getTransform    : null,
  clearTransition : null,
  setTransition   : null,
  getKeyCode      : null,
  setKeyCode      : null,
  getProgress     : null,
  forceSecurity   : true,
  Toggle          : "toggle",
  htmlPrintImage  : '',
  tagImage        : 'IMG',
  tagEmbed        : 'EMBED',
  Absolute        : 'absolute',
  Relative        : 'relative',
  BoxShadow       : 'box-shadow',
  Transition      : 'transition',
  TransitionEnd   : 'transitionEnd',
  Scroll          : 'scroll',
  Redirect        : true,
  PrintImage      : null,
  $               : function(ID){
    return document.getElementById(ID);
  },
  getButton       : function(e){
    if (e.which) {
      coDOM.getButton=function(e){
        if (e.button==3) return 3;
        if ((e.button==0) && (e.which==1)) return 1;
      };
      return coDOM.getButton(e);
    } else {
      coDOM.getButton=function(e){
        return e.button;
      };
      return coDOM.getButton(e);
    };
  },
  target         : function(e){
    if (e.toElement){
      return e.toElement;
    } else if (e.currentTarget){
      return e.currentTarget;
    } else{
      return e.target;
    };
  },
  setBackgroundImage:function(elm,sURL){
    elm.style.backgroundImage="url(\'"+sURL+"\')";
  },
  setBackground:function(elm,Size,Position,Repeat,sURL){
    elm.style.backgroundSize=Size;
    elm.style.backgroundPosition=Position;
    elm.style.backgroundRepeat=Repeat;
    elm.style.backgroundImage="url(\'"+sURL+"\')";
  },
  setBackgroundColor:function(elm,rgba){
    elm.style.backgroundColor=rgba.toString();
  },
  CloseWindow:function(){
    window.close();
  },
  enableSelect : function(el){
    el.style.webkitUserSelect="all";
    el.style.khtmlUserSelect="all";
    el.style.MozUserSelect="all";
    el.style.msUserSelect="all";
    el.style.oUserSelect="all";
    el.style.userSelect="all";
    for (var iLcv=0; iLcv<el.childNodes.length; iLcv++) {
      var n=el.childNodes[iLcv];
      if (n.style) coDOM.enableSelect(n);
    };
  },
  currentTarget  : function(e){
    if (e.currentTarget){
      coDOM.currentTarget=function(e){return e.currentTarget;};
      return e.currentTarget;
    } else{
      coDOM.currentTarget=function(e){return e.target;};
      return e.target;
    };
  },
  getChildNodeByTitle:function(srcElm,sTitle){
    if (srcElm.title==sTitle) return srcElm;
    for (var iLcv=0; iLcv<srcElm.childNodes.length; iLcv++){
      var chNode=srcElm.childNodes[iLcv];
      if (chNode.title==sTitle) {
        return chNode;
      } else if (chNode.childNodes.length>0) {
        var res=coDOM.getChildNodeByTitle(chNode,sTitle);
        if (res!=null)
          return res;
      };
    };
    return null;
  },
  getLastTouch:function(e){
    var ts = (e.targetTouches.length>0) ? e.targetTouches : e.changedTouches;
    return ts[ts.length-1];
  },
  hasDescendant:function(srcElm,decElm){
    if (srcElm==decElm) return true;
    for (var iLcv=0; iLcv<srcElm.childNodes.length; iLcv++){
      if (srcElm.childNodes[iLcv]==decElm) {
        return true;
      } else if (this.hasDescendant(srcElm.childNodes[iLcv],decElm)==true) {
        return true;
      }
    };
    return false;
  },
  setStyle : function(elm,prop,val){
    $(elm).css(prop,val);
  },
  hasChild : function(elm,child){
    for (var iLcv=0; iLcv<elm.childNodes.length; iLcv++){
      if (elm.childNodes[iLcv]==child) return true;
    };
    return false;
  },
  firstChildByKind : function(start,Kind){
    if (start.nodeName==Kind) return start;
    for (var iLcv=0; iLcv<start.childNodes.length; iLcv++){
      if (start.childNodes[iLcv].nodeName==Kind) {
        return start.childNodes[iLcv];
      } else if (start.childNodes[iLcv].childNodes.length>0) {
        var node=this.firstChildByKind(start.childNodes[iLcv]);
        if (node) return node;
      };
    };
    return null;
  },
  getKeyCode:function(e){
    return e.keyCode;
  },
  setKeyCode:function(e,iVal){
    e.keyCode=iVal;
  },
  PrintImage:function(sTitle,sImageData){

    var sPrn=this.htmlPrintImage.replace("$Title",sTitle);
    sPrn=sPrn.replace("$Data",sImageData);

    var prnW=window.open('','','width=640,height=480');
    prnW.onafterprint=coDOM.CloseWindow;

    //prnW.document.open();
    prnW.document.write(sPrn);
    //prnW.document.close();
    prnW.focus();
    setTimeout(function(){prnW.print();},3000);
  },
  init : function(){
    var s='<!DOCTYPE html>';
    s+="<html>";
    s+="<head>";
    s+="<link rel=\"stylesheet\" href=\"/core/vdm/coVDM.css\" type=\"text/css\">";
    s+="<script src=\"/core/app/coBoot.js\" type=\"text/javascript\"></script>";
    s+="<script src=\"/core/app/coObject.js\" type=\"text/javascript\"></script>";
    s+="<script src=\"/core/app/coUtils.js\" type=\"text/javascript\"></script>";
    s+="<script src=\"/core/app/coDOM.js\" type=\"text/javascript\"></script>";
    s+="<title>$Title</title>";
    s+="</head>";
    s+="<body class=\"PrintWindow\" onafterprint=\"coDOM.CloseWindow();\">";
    s+="<img class=\"PrintWindow\" src=\"$Data\">";
    s+="</body></html>";
    this.htmlPrintImage=s;
    var wl=window.location;
    if ((this.forceSecurity==true) && (wl.protocol!="https:")){
      var sHost = (wl.hostname.indexOf("www.")==0) ? wl.hostname.substring(4) : wl.hostname;
      window.location="https://"+sHost+wl.pathname+wl.search;
    };
    coDOM.Browser=coDOM.createBrowser();
    if (coDOM.Browser.WebKit==true) {
      this.setBoxShadow=function(elm,sValue){
        elm.style.webkitBoxShadow=sValue;
      };
      this.Transition="webkitTransition";
      this.TransitionEnd="webkitTransitionEnd";
      this.setTransition=function(elm,sValue){
        elm.style[this.Transition]=sValue;
      };
      this.clearTransition=function(elm){
        elm.style.webkitTransition="";
      };
      this.setHint=function(elm,sValue){
        elm.title=sValue;
      };
      this.setTransform=function(elm,sValue){
        elm.style.webkitTransform=sValue;
      };
      this.getTransform=function(elm){
        return elm.style.webkitTransform;
      };
      this.getProgress=function(e){
        return e.position;
      };
    } else if (coDOM.Browser.FireFox==true) {
      this.setBoxShadow=function(elm,sValue){
        elm.style.mozBoxShadow=sValue;
      };
      this.getKeyCode=function(e){
        return  (e.charCode==0) ? e.keyCode : e.charCode;
      };
      this.setKeyCode=function(e,iVal){
        e.charCode=iVal;
        e.keyCode=iVal;
      };
      this.TransitionEnd="mozTransitionEnd";
      this.Transition="mozTransition";
      this.setTransition=function(elm,sValue){
        elm.style.MozTransition=sValue;
      };
      this.setHint=function(elm,sValue){
        elm.title=sValue;
      };
      this.clearTransition=function(elm){
        elm.style.MozTransition="";
      };
      this.setTransform=function(elm,sValue){
        elm.style.MozTransform=sValue;
      };
      this.getTransform=function(elm,sValue){
        return elm.style.MozTransform;
      };
      this.getProgress=function(e){
        return e.position;
      };
    } else if (coDOM.Browser.MSIE==true){
      this.setBoxShadow=function(elm,sValue){
        elm.style.boxShadow=sValue;
      };
      this.Transition="mstransitionend";
      this.TransitionEnd="mstransitionend";
      this.setHint=function(elm,sValue){
        elm.title=sValue;
      };
      this.setTransition=function(elm,sValue){
        elm.style.msTransition=sValue;
      };
      this.clearTransition=function(elm){
        elm.style.msTransition="";
      };
      this.setTransform=function(elm,sValue){
        elm.style.msTransform=sValue;
      };
      this.getTransform=function(elm,sValue){
        return elm.style.msTransform;
      };
      this.getProgress=function(e){
        return e.loaded;
      };
    };
    var elm=document.createElement('div');
    var innerText=(elm.innerText==undefined)? false : true;
    var textContent=(elm.textContent!=undefined) ? true : false;
    if (textContent==true) {
      this.addEvent=function(elm,Name,Method,Capture){
        return elm.addEventListener(Name,Method,Capture);
      };
      this.removeEvent=function(elm,Name,Method,Capture){
        return elm.removeEventListener(Name,Method,Capture);
      };
      this.setText=function(elm,sValue){
        elm.textContent=sValue;
      };
      this.setPlaceHolder=function(elm,sValue){
        elm.placeholder=sValue;
      };
      this.setHTML=function(elm,sValue){
        elm.innerHTML=sValue;
      };
      this.getHTML=function(elm,sValue){
        return elm.innerHTML;
      };
      this.parseChildNodes=function(parent){
        var s="";
        for (var iLcv=0; iLcv<parent.length; iLcv++){
          var elm=parent[iLcv];
          s+=coDOM.parseText(elm);
        };
        return s;
      };
      this.parseText=function(elm){
        var s="";
        switch (elm.nodeName) {
          case ("DIV")   : s=coDOM.parseChildNodes(elm.childNodes); break;
          case ("P")     : s="\r\n\r\n" + coDOM.parseChildNodes(elm.childNodes); break;
          case ("#text") : s=elm.textContent; break;
          case ("BR")    : s="\r\n"; break;
        };
        return s;
      };
      this.getText=function(elm){
        return elm.textContent;
      };
      this.getTextLen=function(elm){
        return elm.textContent.length;
      };
    } else if (innerText==true) {
      this.addEvent=function(elm,Name,Method,Capture){
        elm.attachEvent("on"+Name,Method);
      };
      this.removeEvent=function(elm,Name,Method){
        elm.detachEvent("on"+Name,Method);
      };
      this.setText=function(elm,sValue){
        elm.innerText=sValue;
      };
      this.setPlaceHolder=function(elm,sValue){
        elm.placeholder=sValue;
      };
      this.setHTML=function(elm,sValue){
        elm.innerHTML=sValue;
      };
      this.getHTML=function(elm,sValue){
        return elm.innerHTML;
      };
      this.getText=function(elm){
        return elm.innerText;
      };
      this.getTextLen=function(elm){
        return elm.innerText.length;
      };
      this.parseText=function(elm){
        return elm.innerText;
      };
    };
  },
  textWidth : function(elm,fontSize,Text,Padding,Margin){
    elm.style.fontSize=fontSize+"px";
    if (Padding==undefined) throw "Padding parameter not specified";
    if (Margin==undefined) throw "Margin parameter not specified";
    Padding.enForce(elm);
    Margin.enForce(elm);
    this.setText(elm,Text);
    var iWidth=elm.offsetWidth+Margin.xBias();
    this.setText(elm,"");
    return iWidth;
  },
  backgroundImage:function(elm){
    var sURL=$(elm).css("background-image");
    if (sURL=="none") return "";
    sURL=sURL.substring(4,sURL.length-1);
    return sURL;
  },
  preventDefault: function(e){
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      e.cancelBubble=true;
    };
  },
  srcElement : function(e){
    return (e.srcElement) ? e.srcElement : e.target;
  },
  targetElement : function(e){
    return (e.toElement) ? e.toElement : e.target;
  },
  getOffsetTop : function(Start,Stop){
     return ( (Start==null) || (Start==Stop) ) ? 0 : Start.offsetTop+this.getOffsetTop(Start.offsetParent,Stop);
  },
  getOffsetLeft : function(Start,Stop){
     return ( (Start==null) || (Start==Stop) ) ? 0 : Start.offsetLeft+this.getOffsetLeft(Start.offsetParent,Stop);
  },
  getChildAtY : function(iOffset,iPosition,elmTarget,elmScroll){
    var iMax=elmScroll.scrollTop+elmScroll.clientHeight;
    for (var iLcv=iOffset; iLcv<elmTarget.childNodes.length; iLcv++){
      var elm=elmTarget.childNodes[iLcv];
      if (elm.offsetTop+elm.offsetHeight>=iPosition)
        return elm;
    };
    return null;
  },
  clearMargins: function(elm){
    elm.style.marginTop="0px";
    elm.style.marginLeft="0px";
    elm.style.marginRight="0px";
    elm.style.marginBottom="0px";
  },
  getVisibleChildrenByY : function(iOffset,iStart,elmTarget,elmScroll){
    var lst=new Array();
    var iMax=elmScroll.scrollTop+elmScroll.clientHeight;
    for (var iLcv=iOffset; iLcv<elmTarget.childNodes.length; iLcv++){
      var elm=elmTarget.childNodes[iLcv];
      if (elm.offsetTop>=iStart) {
        lst.push(elm);
        for (jLcv=iLcv+1; jLcv<elmTarget.childNodes.length; jLcv++){
          var elm=elmTarget.childNodes[jLcv];
          if (elm.offsetTop<=iMax) {
            lst.push(elm);
          } else {
            break;
          };
        };
        break;
      };
    };
    return lst;
  },
  setBase: function(Target){
    var head = document.head || document.getElementsByTagName( "head" )[0];
    var base=null;
    for (var iLcv=0; iLcv<head.childNodes.length; iLcv++){
      if (head.childNodes[iLcv].tagName=="base") {
        base=head.childNodes[iLcv];
        break;
      };
    };
    if (base==null) {
      base=document.createElement('base');
      head.appendChild(base);
    };
    base.target=Target;
  },
  loadScript : function(owner,url,onLoadFunction,onErrorFunction){
    if(typeof(url) == 'string'){
      var script=this.getsJavaScript(url);
      if (script==null){
        var head = document.head || document.getElementsByTagName( "head" )[0] || document.documentumentElement;
        var script = document.createElement( "script" );
        script.src = url;
        script.async = true;
        script.Owner=owner;
        if (onLoadFunction!=undefined)
          this.addEvent(script,"load", onLoadFunction, false);
        if (onErrorFunction!=undefined) {
          this.addEvent(script,"abort", onErrorFunction, false);
          this.addEvent(script,"error", onErrorFunction, false);
        };
        head.insertBefore( script, head.firstChild );
      } else if (script.Failed==true) {
        script.Owner=owner;
        onErrorFunction.call(script);
      } else{
        script.Owner=owner;
        onLoadFunction.call(script);
      };
    }else{
      throw("coDOM.loadScript requires a url parameter[0] ");
    }
  },
  loadStyle : function(owner,url,onLoadFunction,onErrorFunction){
    if(typeof(url) == 'string'){
      var style=this.getStyleSheet(url);
      if (style==null) {
        var head = document.head || document.getElementsByTagName( "head" )[0] || document.documentumentElement;
        var style = document.createElement( "link" );
        style.src = url;
        style.rel="stylesheet";
        style.type="text/css";
        style.href=url;
        style.async = true;
        style.Owner=owner;
        if (onLoadFunction!=undefined)
          this.addEvent(style,"load", onLoadFunction, false);
        if (onErrorFunction!=undefined){
          this.addEvent(style,"abort", onErrorFunction, false);
          this.addEvent(style,"error", onErrorFunction, false);
        };
        head.insertBefore( style, head.firstChild );
      } else if (style.Failed==true) {
        style.Owner=owner;
        onErrorFunction.call(style);
      } else{
        style.Owner=owner;
        onLoadFunction.call(style);
      };
    }else{
      throw("coDOM.loadStyle requires a url parameter[0] ");
    }
  },
  isStyleSheetLoaded:function(sUnit){
    return (this.getStyleSheet(sUnit)!=null);
  },
  isJavaScriptLoaded:function(sUnit){
    return (this.getJavaScript(sUnit)!=null);
  },
  getsJavaScript:function(sUnit){
    var head = document.head || document.getElementsByTagName( "head" )[0] || document.documentumentElement;
    var sUnit=sUnit.toLowerCase();
    if (sUnit.indexOf("/")!=0) sUnit="/"+sUnit;
    for (iLcv=0; iLcv<head.childNodes.length; iLcv++){
      var s=head.childNodes[iLcv];
      if (
        (s.nodeName=="SCRIPT") &&
        (s.src!=undefined)
      ) {
        var ss=s.src.toLowerCase();
        if (ss.indexOf(sUnit)!=-1) return s;
      };
    };
    return null;
  },
  getStyleSheet:function(sUnit){
    var head = document.head || document.getElementsByTagName( "head" )[0] || document.documentumentElement;
    var sUnit=sUnit.toLowerCase();
    if (sUnit.indexOf("/")!=0) sUnit="/"+sUnit;
    for (iLcv=0; iLcv<head.childNodes.length; iLcv++){
      var s=head.childNodes[iLcv];
      if (
        (s.nodeName=="LINK") &&
        (s.type=="text/css") &&
        (s.src!=undefined)
      ) {
        var ss=s.src.toLowerCase();
        if (ss.indexOf(sUnit)!=-1) return s;
      };
    };
    return null;
  },
  getComputedStyle : function(elm,Name){
    return window.getComputedStyle(elm,null)[Name];
  },
  createBrowser : function(){
    var wb=coObject.Create();
    wb.outdatedRedirect="/browser/";
    wb.cookieHandoff=true;
    wb.FireFox=(navigator.userAgent.indexOf("Firefox")!=-1);

    wb.MSIE=navigator.userAgent.indexOf("MSIE") != -1;
    wb.Trident=navigator.userAgent.indexOf("Trident") !=-1;
    wb.Chrome=navigator.userAgent.indexOf("Chrome") !=-1;
    wb.Safari=((navigator.userAgent.indexOf("Safari") !=-1) && (navigator.vendor.indexOf("Apple")!=-1) );
    wb.WebKit=(navigator.userAgent.indexOf("WebKit") !=-1);
    wb.Linux=( (navigator.platform) && (navigator.platform.indexOf("Linux")!=-1) );
    var sVersion = navigator.appVersion;
    if ( (wb.MSIE==true) || (wb.Trident==true)) {
      var iStart=sVersion.indexOf("(");
      var iEnd=sVersion.indexOf(")");
      sVersion=sVersion.substring(iStart+1,iEnd);
      var saVersion=sVersion.split("; ");

      for (var idxVers=0; idxVers<saVersion.length; idxVers++){
        if (saVersion[idxVers].indexOf("MSIE")==0) {
            wb.MSIE=true;
            var sVersion=saVersion[idxVers];
            if (sVersion=="MSIE 9.0"){
                sVersion="9.0";
                var sVersMajor="9";
                var sVersMinor="0";
            } else {
                var saVersion=sVersion.split(":");
                var sVersion=saVersion[1];
                var saVersion=sVersion.split(".");
                var sVersMajor=saVersion[0];
                var sVersMinor=saVersion[1];
            };
            break;
        };
        if (saVersion[idxVers].indexOf("rv:")==0) {
            wb.MSIE=true;
            var sVersion=saVersion[idxVers];
            var saVersion=sVersion.split(":");
            var sVersion=saVersion[1];
            var saVersion=sVersion.split(".");
            var sVersMajor=saVersion[0];
            var sVersMinor=saVersion[1];
            break;
        };
      };

      var sVersMicro    = "";
      var sVersBuild    = "";
      var sOrganization = navigator.appName;
      var sVersCopy     = "";
      var iCheck=coUtils.parseInt(sVersMajor);
      if ((iCheck<10) && (coDOM.Redirect==true))
        window.location=wb.outdatedRedirect;
    } else if (wb.Chrome==true) {
      var iStart=sVersion.indexOf("Chrome/");
      sVersion=sVersion.substring(iStart+7);
      var iEnd=sVersion.indexOf(" ");
      sVersion=sVersion.substring(0,iEnd);
      var saVersion=sVersion.split(".");

      var sVersMajor    = saVersion[0];
      var sVersMinor    = saVersion[1];
      var sVersMicro    = saVersion[2];
      var sVersBuild    = saVersion[3];
      var sOrganization = navigator.vendor;
    } else if (wb.Safari==true) {
      var iStart=sVersion.indexOf("Safari/");
      sVersion=sVersion.substring(iStart+7);
      var saVersion=sVersion.split(".");

      var sVersMajor    = saVersion[0];
      var sVersMinor    = saVersion[1];
      var sVersMicro    = "0";
      var sVersBuild    = "0";
      var sOrganization = navigator.vendor;
    } else if (wb.FireFox==true){
        var saVersion=navigator.userAgent.split("/");
        var iLen=saVersion.length;
        if (iLen>0) {
          saVersion=saVersion[iLen-1].split(".");
          var sVersMajor    = saVersion[0];
          var sVersMinor    = saVersion[1];
        } else {
          var saVersion=sVersion.split(" ");
          if (saVersion.length>0) sVersion=saVersion[0];
          saVersion=sVersion.split(".");
          var sVersMajor    = saVersion[0];
          var sVersMinor    = saVersion[1];
        };
        var sVersMicro    = "";
        var sVersBuild    = "";
        var sOrganization = navigator.appName;
        var sVersCopy     = "";
        var iCheck=coUtils.parseInt(sVersMajor);
        if ((iCheck<18) && (coDOM.Redirect==true))
          window.location=wb.outdatedRedirect;
    } else {
        var saVersion=sVersion.split(" ");
        if (saVersion.length>0) sVersion=saVersion[0];
        var sVersMajor    = "";
        var sVersMinor    = "";
        var sVersMicro    = "";
        var sVersBuild    = "";
        var sOrganization = navigator.appName;
        var sVersCopy     = "";
    };

    wb.Version = new Version(sVersMajor,sVersMinor,sVersMicro,sVersBuild);
    wb.Vendor = new Vendor(sOrganization, sVersCopy, null);
    wb.Apple = ((navigator.platform=="MacIntel") || (navigator.platform=="iPad") );
    var bIsiPhone = navigator.userAgent.indexOf("iPhone") != -1;
    var bIsiPod = navigator.userAgent.indexOf("iPod") != -1;
    var bIsiPad = navigator.userAgent.indexOf("iPad") != -1;
    var bIsiOS = bIsiPhone || bIsiPod || bIsiPad;
    if (bIsiOS==true) {
      wb.iOS=coObject.Create();
      wb.iOS.Kind=coObject.Create();

      var sOS= ( ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '') );

      var saOS=sOS.split('.');
      wb.iOS.Major=coUtils.parseInt(saOS[0],0);
      if (saOS.length>1)
        wb.iOS.Minor=coUtils.parseInt(saOS[1],0);

      wb.iOS.Kind.isIphone=bIsiPhone;
      wb.iOS.Kind.isIpod=bIsiPod;
      wb.iOS.Kind.isIpad=bIsiPad;

      if ( (wb.iOS.Kind.isIpad==true) && (wb.iOS.Major<5) )
        wb.cookieHandoff=false;
    };
    wb.OpenURL=function(sURL){
      window.open(sURL,'_blank');
    };
    return wb;
  },
  httpGET:function(Owner,sURL,onComplete,onError) {
    var Socket=new XMLHttpRequest();
    Socket.Code=coNet.CO_STATUS_OK;
    Socket.Owner=Owner;
    Socket.cbError=onError;
    Socket.cbComplete=onComplete;
    Socket.open("GET",sURL,coNet.NET_ASYNC);
    Socket.onerror=function(){
      var Socket=this;
      Socket.cbError(Socket);
      Socket=null;
    };
    Socket.onreadystatechange=function(){
      var Socket=this;
      switch (Socket.readyState) {
        case (1,2): //server connection established
          Socket.Connected=true;
          Socket.Connecting=false;
          Socket.Sending=true;
          break;
        case 4: // request finished and response is ready
          Socket.Sending=false;
          Socket.Code=coUtils.parseInt(Socket.getResponseHeader(coNet.fieldCode));
          if ((Socket.status==200) || (Socket.status==417)) {
            Socket.cbComplete(Socket);//responseText
            Socket=null;
          } else {
            Socket.cbError(Socket);
          };
          break;
      };
    };
    Socket.send();
    return Socket;
  },
  httpPOST:function(Owner,sURL,sData,sContentType,onComplete,onError) {
    if (sContentType==undefined) throw "Invalid content type";
    if (onComplete==undefined) throw "httpPOST requires onComplete";
    if (onError==undefined) throw "httpPOST requires onError";
    var Socket=new XMLHttpRequest();
    Socket.Owner=Owner;
    Socket.Code=coNet.CO_STATUS_OK;
    Socket.cbError=onError;
    Socket.cbComplete=onComplete;
    Socket.open("POST",sURL,coNet.NET_SYNC);
    Socket.onerror=function(){
      var Socket=this;
      Socket.cbError(Socket);
      Socket=null;
    };
    Socket.onreadystatechange=function(){
      var Socket=this;
      switch (Socket.readyState) {
        case (1,2): //server connection established
          Socket.Connected=true;
          Socket.Connecting=false;
          Socket.Sending=true;
          break;
        case 4: // request finished and response is ready
          Socket.Sending=false;
          Socket.Code=coUtils.parseInt(Socket.getResponseHeader(coNet.fieldCode));
          if ((Socket.status==200) || (Socket.status==417)) {
            Socket.cbComplete(Socket);//responseText
            Socket=null;
          } else {
            Socket.cbError(Socket);
          };
          break;
      };
    };
    Socket.setRequestHeader("Content-Type",sContentType);
    Socket.send(sData);
    return Socket;
  },
  ConsealImages:function(elm){
    for (var iLcv=0; iLcv<elm.childNodes.length; iLcv++){
      var cElm=elm.childNodes[iLcv];
      if (cElm.tagName==coDOM.tagImage) {
        cElm.style.display="none";
      } else {
        coDOM.ConsealImages(cElm);
      };
    };
  },
  Download:function(sURL){
    var f=document.createElement("iframe");
    f.src=sURL;
    f.style.display="none";
    document.body.appendChild(f);
    var tmr=coAppKit.Timers.createItem(coVDM.DownloadDelay);
    tmr.Owner=f;
    tmr.RunOnce=false;
    tmr.FreeOnComplete=true;
    tmr.onExecute=function(){
      var tmr=this;
      var iFrame=tmr.Owner;
      try {
        if( iFrame.contentDocument.readyState == "complete"){
          document.body.removeChild(iFrame);
          tmr.RunOnce=true;
        };
      } catch (err) {

      };
    };
    tmr.setActive(true);
    f=null;
  },
  removeTag:function(sData,Tag) {
    var bEndTagScan=true;
    var sTag=sPre=sPost="";
    var idx=sData.search(/Tag+">"/i);
    if (idx!=-1) {
      var idxEnd=idx+5;
      while (sData[idx]!='<') idx--;


      sPre=sData.substring(0,idx-1);
      sTag=sData.substring(idx,idxEnd-idx);
      sPost=sData.substring(idxEnd);

      sData=sPre+sPost;

      if (sTag.indexOf("/")==-1){
        var idx=sData.search(/Tag+">"/i);
        var idxEnd=idx+5;
        while (sData[idx]!='<') idx--;
        sPre=sData.substring(0,idx-1);
        sTag=sData.substring(idx,idxEnd-idx);
        sPost=sData.substring(idxEnd);
        sData=sPre+sPost;
      };
    };
    return sData;
  }
};
coDOM.init();
