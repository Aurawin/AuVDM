/*
unit /core/app/Net.js

  Copyright Aurawin LLC 2003-2015
  Written by: Andrew Thomas Brunner

  This code is protected under the Aurawin Public Release License
  http://www.aurawin.com/aprl.html

This unit leverages HTTP headers to serve as a binding agent between
server core objects/commands and services.

Implemented protocols
  HTTP protocol

*/
const Net = {
  Unit           : '',
  Loaded         : true,
  Initialized    : false,
  debugToConsole : false,
  Protocol                                 : "AuraCore.Net",
  NoData                                   : null,
  CreateSuspended                          : true,
  CreateAndRun                             : false,
  FreeOnComplete                           : true,
  debugToConsole                           : false,
  AutoLoadOff                              : false,
  AutoLoadOn                               : true,
  NET_ASYNC                                : true,
  NET_SNYC                                 : false,
  LingerOnComplete                         : false,
  WebSockets                               : false, //("WebSocket" in window),
  HEADER_SEPARATOR                         : "\r\n\r\n",
  SMTP_FOOTER                              : "\r\n.\r\n",
  FIELD_SEPARATOR                          : "=",
  RestrictedHeaders                        : List.createStringArray(),
  CommandsManifest                         : new Array(),
  CRLF                                     : "\r\n",
  CR                                       : "\r",
  LF                                       : "\n",
  nextID                                   : 127,
  NET_TRIES                                : 4,
  NET_CON_PAUSE                            : 5000,
  msPolling                                : 250,
  CO_STATUS_FAIL                           : 0,
  CO_STATUS_OK                             : 1,
  CO_STATUS_WAIT                           : 2,
  CO_STATUS_AUTHENTICATE                   : 3,
  CO_STATUS_RESET                          : 4,
  CO_STATUS_TIMEOUT                        : 5,
  CO_STATUS_NOT_FOUND                      : 6,

  CO_STATUS_ERROR                          : 100,
  CO_STATUS_EXCEPTION                      : 101,

  CO_STATUS_ERR_CO_NOT_FOUND               : 102,
  CO_STATUS_ERR_CO_FOLDER_NOT_FOUND        : 103,
  CO_STATUS_ERR_CO_RESOURCE_NOT_FOUND      : 104,
  CO_STATUS_ERR_CO_ACCESS_DENIED           : 105,
  CO_STATUS_ERR_CO_BEFORE_EXECUTE          : 106,
  CO_STATUS_ERR_CO_NO_DEVICE_ID            : 107,
  CO_STATUS_ERR_CO_RESERVED_1              : 108,
  CO_STATUS_ERR_CO_RESERVED_2              : 109,
  CO_STATUS_ERR_CO_RESERVED_3              : 110,

  CO_STATUS_ERR_CO_CMD_NOT_FOUND           : 200,
  CO_STATUS_ERR_CO_CMD_INITIALIZATION      : 201,
  CO_STATUS_ERR_CO_CMD_FOLDER_NOT_FOUND    : 202,
  CO_STATUS_ERR_CO_CMD_RESOURCE_NOT_FOUND  : 203,
  CO_STATUS_ERR_CO_CMD_AUTH_REQD           : 204,
  CO_STATUS_ERR_CO_CMD_REDIRECT            : 205,
  CO_STATUS_ERR_CO_CMD_DBMS_FAILURE        : 206,
  CO_STATUS_ERR_CO_CMD_NOT_UNDERSTOOD      : 207,
  CO_STATUS_ERR_CO_CMD_NOT_IMPLEMENTED     : 208,
  CO_STATUS_ERR_CO_CMD_NOT_INITIALIZED     : 209,
  CO_STATUS_ERR_CO_CMD_ACCESS_DENIED       : 210,
  CO_STATUS_ERR_CO_CMD_MISSING_FIELDS      : 211,
  CO_STATUS_ERR_CO_CMD_INVALID_SEARCH      : 212,
  CO_STATUS_ERR_CO_CMD_INVALID_XML         : 213,
  CO_STATUS_ERR_CO_CMD_DUPLICATE           : 214,
  CO_STATUS_ERR_CO_CMD_MISSING_PARAMETER   : 215,
  CO_STATUS_ERR_CO_CMD_MEDIA_NOT_FOUND     : 216,
  CO_STAUTS_ERR_CO_CMD_CHANNEL_NOT_FOUND   : 217,
  CO_STAUTS_ERR_CO_CMD_INVALID_EXECUTION   : 218,
  CO_STATUS_ERR_CO_CMD_INVALID_PROPERTY    : 219,
  CO_STATUS_ERR_CO_CMD_INVALID_MEDIA       : 220,
  CO_STATUS_ERR_CO_CMD_INVALID_PARAMETER   : 221,
  CO_STATUS_ERR_CO_CMD_DISK_MISSING        : 222,
  CO_STATUS_ERR_CO_CMD_DISK_DATA_MISSING   : 223,
  CO_STATUS_ERR_CO_CMD_REQUIRES_SECURITY   : 224,
  CO_STATUS_ERR_CO_CMD_NETWORK_READ_FAIL   : 225,


  SOCKET_OPENING                           : 0,
  SOCKET_OPEN                              : 1,
  SOCKET_CLOSED                            : 2,
  SOCKET_NETWORK_DOWN                      : 500,

  NoProgress                               : null,
  NoTimeout                                : null,
  NoError                                  : null,

  fieldID                                  : "ID",
  fieldDID                                 : "DID",
  fieldRCID                                : "RCID",
  fieldNS                                  : "ns",
  fieldRemoteIP                            : "remote-ip",
  fieldNSCore                              : "co-ns",
  fieldNSCommand                           : "cc-ns",
  fieldAuth                                : "auth",
  fieldCode                                : "code",
  fieldResource                            : "resource",
  fieldDomain                              : "domain",
  fieldNameSpace                           : "NS",
  fieldAccount                             : "user",
  fieldSearch                              : "SRCH",
  fieldScale                               : "SCALE",
  fieldDepth                               : "DEPTH",
  fieldMethodOverride                      : "X-HTTP-Method-Override",
  fieldContentType                         : "Content-Type",
  init : function (Server,NameSpace,Creds,onNetworkFail){
    Net.Initialized=true;
    Net.RestrictedHeaders.Add("Content-Length");
    Net.RestrictedHeaders.Add("Host");
    Net.RestrictedHeaders.Add("Connection");
    var _net=new Object();
    _net.Class="Net";
    _net.Shutdown=false;
    _net.Failed=false;
    _net.Creds=Creds;
    _net.WebSockets=false; //("WebSocket" in window);
    //_net.Server = (_net.WebSockets==true) ? "ws://" + Server : "http://" + Server;
    if (_net.WebSockets==false) Net.FIELD_SEPARATOR = ": ";
    _net.msTimeOut=35000;
    _net.NameSpace=NameSpace;
    //_net.URI=Server+NameSpace+"/";
    _net.URI=NameSpace+"/";
    _net.onNetworkFailure=onNetworkFail;
    _net.Parser=createParser();
    _net.Timers=Net.createTimers(_net);
    _net.Commands=Net.createCommands(_net);

    _net.Error=function(Code){
      switch (Code) {
        case Net.CO_STATUS_FAIL                          : return "General fail code ["+ Net.CO_STATUS_FAIL+"].";
        case Net.CO_STATUS_OK                            : return "Success ["+ Net.CO_STATUS_OK+"].";
        case Net.CO_STATUS_WAIT                          : return "Waiting ["+ Net.CO_STATUS_WAIT+"].";
        case Net.CO_STATUS_REDIRECT                      : return "Redirect ["+ Net.CO_STATUS_REDIRECT+"].";
        case Net.CO_STATUS_AUTHENTICATE                  : return "Authenticate ["+ Net.CO_STATUS_AUTHENTICATE+"].";

        case Net.CO_STATUS_RESET                         : return "Network connect was reset ["+ Net.CO_STATUS_RESET+"].";
        case Net.CO_STATUS_ERROR                         : return "Task resulted in error ["+ Net.CO_STATUS_ERROR+"].";
        case Net.CO_STATUS_TIMEOUT                       : return "Time allocated for task expired ["+ Net.CO_STATUS_TIMEOUT+"].";
        case Net.CO_STATUS_EXCEPTION                     : return "Task resulted in exception ["+ Net.CO_STATUS_EXCEPTION+"].";
        case Net.CO_STATUS_ERR_CO_NOT_FOUND              : return "Core Object was not found ["+ Net.CO_STATUS_ERR_CO_NOT_FOUND+"].";
        case Net.CO_STATUS_ERR_CO_FOLDER_NOT_FOUND       : return "Core Object folder was not found ["+ Net.CO_STATUS_ERR_CO_FOLDER_NOT_FOUND+"].";
        case Net.CO_STATUS_ERR_CO_RESOURCE_NOT_FOUND     : return "Core Object resource was not found ["+ Net.CO_STATUS_ERR_CO_RESOURCE_NOT_FOUND+"].";
        case Net.CO_STATUS_ERR_CO_CMD_NOT_FOUND          : return "Core Object resource was not found ["+ Net.CO_STATUS_ERR_CO_RESOURCE_NOT_FOUND+"].";
        case Net.CO_STATUS_ERR_CO_CMD_INITIALIZATION     : return "Core Object Command was not initialized properly before execution ["+ Net.CO_STATUS_ERR_CO_CMD_INITIALIZATION+"].";
        case Net.CO_STATUS_ERR_CO_CMD_FOLDER_NOT_FOUND   : return "Core Object Command folder was not found ["+ Net.CO_STATUS_ERR_CO_CMD_FOLDER_NOT_FOUND+"].";
        case Net.CO_STATUS_ERR_CO_CMD_RESOURCE_NOT_FOUND : return "Core Object Command resource was not found ["+ Net.CO_STATUS_ERR_CO_CMD_RESOURCE_NOT_FOUND+"].";
        case Net.CO_STATUS_ERR_CO_CMD_AUTH_REQD          : return "Core Object Command requires authentication with matching acl entries ["+ Net.CO_STATUS_ERR_CO_CMD_AUTH_REQD+"].";
        case Net.CO_STATUS_ERR_CO_CMD_REDIRECT           : return "Core Object Command is redirecting output via another command ["+ Net.CO_STATUS_ERR_CO_CMD_REDIRECT+"].";
        case Net.CO_STATUS_ERR_CO_CMD_DBMS_FAILURE       : return "Core Object Command resulted in a database error ["+ Net.CO_STATUS_ERR_CO_CMD_DBMS_FAILURE+"].";
        case Net.CO_STATUS_ERR_CO_CMD_NOT_UNDERSTOOD     : return "Core Object Command was not understood ["+ Net.CO_STATUS_ERR_CO_CMD_NOT_UNDERSTOOD+"].";
        case Net.CO_STATUS_ERR_CO_CMD_NOT_IMPLEMENTED    : return "Core Object Command is not implemented ["+ Net.CO_STATUS_ERR_CO_CMD_NOT_IMPLEMENTED+"].";
        case Net.CO_STATUS_ERR_CO_CMD_NOT_INITIALIZED    : return "Core Object Command was not initialized ["+ Net.CO_STATUS_ERR_CO_CMD_NOT_INITIALIZED+"].";
        case Net.CO_STATUS_ERR_CO_CMD_ACCESS_DENIED      : return "Core Object Command access was denied ["+ Net.CO_STATUS_ERR_CO_CMD_ACCESS_DENIED+"].";
        default                                            : return "Error ["+Code+"]";
      };
    };
    return _net;
  },
  getURI:function(sURL){
    var idx=sURL.indexOf("://");
    if (idx==-1) return "";
    var idx=sURL.indexOf("/",idx+3);
    return sURL.substring(idx);
  },
  getFile:function(sURL){
    Socket=new XMLHttpRequest();
    Socket.open("GET",sURL,Net.NET_ASYNC);
    Socket.onreadystatechange=function(){
      var Socket=this;
      switch (Socket.readyState) {
        case (1,2): //server connection established
          break;
        case 4: // request finished and response is ready
          if ((Socket.status==200) || (Socket.status==417)) {
            var sData=Socket.getAllResponseHeaders();
            sData=sData.replace(/\n/g,"\r");
            sData=sData.replace(/\r\r/g,"\r");
            sData=sData.replace(/\r/g,Net.CRLF);
            sData=sData.substring(0,sData.length-2);
            sData+=Net.HEADER_SEPARATOR;
            sData+=Socket.responseText;
            sData.length=0;
            sData=null;
          } else {
            // Error
          };
          break;
      };
    };
    Socket.send();
  },
  createCommands:function(net){
    var cmds=Objects.createNew("Command");
    
    cmds.Net=net;
    cmds.queueAll=new Array();
    cmds.queueActive=new Array();
    cmds.queueIdle=new Array();
    cmds.queueAutoLoad=new Array();

    cmds.Headers=List.createKPList(Net.FIELD_SEPARATOR,Net.CRLF);
    cmds.Net=net;
    cmds.nextID=function(){
      var cmds=this;
      var res=Net.nextID;
      Net.nextID++;
      return res;
    };
    cmds.Find=function(iID){
      var cmds=this;
      var q=cmds.queueAll;
      for (var iLcv=0; iLcv<q.length; iLcv++){
        var cmd=q[iLcv];
        if (cmd.ID==iID) return cmd;
      };
      return null;
    };
    cmds.Clear=function(){
      var cmds=this;
      while (cmds.queueAll.length>0) {
        var cmd=cmds.queueAll[0];
        cmd.Free();
      };
    };
    cmds.AutoLoad=function(){
      var cmds=this;
      var q=cmds.queueAutoLoad;
      for (var iLcv=0; iLcv<q.length; iLcv++){
        var cmd=q[iLcv];
        cmd.reTry();
      };
    };
    cmds.createCommand=function(net,sNSCore,sNSCommand,sData,onComplete,onError,onTimeOut,onProgress,Suspended,FreeOnComplete,AutoLoad) {
      if (onComplete==undefined) onComplete==null;
      if (onError==undefined) onError=null;
      if (onTimeOut==undefined) onTimeOut=null;
      if (onProgress==undefined) onProgress=null;
      if (Suspended==undefined) Suspended=true;
      if (FreeOnComplete==undefined) FreeOnComplete=true;
      if (AutoLoad==undefined) AutoLoad=false;
      var cmds=this;
      var cmd=Objects.createNew("Command");
      cmd.Connection=null;
      cmd.Owner=null;
      cmd.Commands=cmds;
      
      cmd.recurseRelease=false;
      cmd.Expires=0;
      cmd.Try=0;
      cmd.AutoLoad=AutoLoad;
      cmd.Sent=false;
      cmd.Rcvd=false;
      cmd.Error=false;
      cmd.Data=null;
      cmd.Torus=null;

      (Suspended==true) ? cmd.Suspended=true : cmd.Suspended=false;
      (FreeOnComplete==true) ? cmd.FreeOnComplete=true : cmd.FreeOnComplete=false;


      cmd.Code=Net.CO_STATUS_WAIT;
      cmd.NSCore=sNSCore;
      cmd.NSCommand=sNSCommand;

      cmd.URL=sNSCore;
      cmd.URI=sNSCore;
      cmd.Net=net;
      cmd.Secure=false;
      cmd.Parameters=null;

      cmd.ID=cmds.nextID();
      cmd.Headers=List.createKPList(Net.FIELD_SEPARATOR,Net.CRLF);
      cmd.Headers.Add(Net.fieldID,cmd.ID.toString());
      cmd.Headers.Add(Net.fieldNSCore,sNSCore);
      cmd.Headers.Add(Net.fieldNSCommand,sNSCommand);

      cmd.dataSend = (sData==null) ? null : "".concat(sData);
      cmd.dataRecv=null;
      cmd._onComplete=onComplete;
      cmd._onError=onError;
      cmd._onTimeOut=onTimeOut;
      cmd._onProgress=onProgress;
      cmd.onComplete=function(cmd){ cmd._onComplete(cmd); };
      cmd.onError=function(cmd){cmd._onError(cmd);};
      cmd.onTimeOut=function(cmd){cmd._onTimeOut(cmd);};
      if (onProgress){
        cmd.onProgress=function(cmd,iProgress,iTotal){cmd._onProgress(cmd,iProgress,iTotal);};
      } else {
        cmd.onProgress=function(cmd,iProgress){};
      };
      cmd.reTry=function(){
        var cmd=this;
        if ((cmd.Connection) && (cmd.Connection.Connected==true) && (cmd.Sent==false)) cmd.Connection.Free();
        var cmds=cmd.Commands;
        cmd.ID=cmds.nextID();
        cmd.Sent=false;
        cmd.Rcvd=false;
        cmd.Suspended=false;
        cmd.Error=false;
        cmd.Code=Net.CO_STATUS_WAIT;
        var idx=cmds.queueIdle.indexOf(cmd);
        if (idx!=-1) cmds.queueIdle.splice(idx,1);
        var idx=cmds.queueActive.indexOf(cmd);
        if (idx==-1) cmds.queueActive.push(cmd);
        cmd.Expires=new Date().setMilliseconds(cmd.Net.msTimeOut);
        if (cmds.Timer.Active!=true) cmds.Timer.setActive(true);
      };
      cmd.Try=cmd.reTry;
      cmd.toMessage=function(){
        var cmd=this;
        var sResult=cmd.Headers.toString();
        sResult+=Net.HEADER_SEPARATOR;
        if (cmd.dataSend!=null) sResult+=cmd.dataSend;
        return sResult;
      };
      cmd.doWSSend=function(){
        var cmd=this;
        var cmds=cmd.Commands;
        var net=cmd.Net;
        var con=cmd.Connection;

        cmd.Try+=1;
        cmd.Headers.Update(Net.fieldNSCore,cmd.NSCore);
        cmd.Headers.Update(Net.fieldNSCommand,cmd.NSCommand);
        cmd.Headers.Update(Net.fieldAuth,cmd.Net.Creds.Auth);
        cmd.Headers.Update(Net.fieldAccount,cmd.Net.Creds.User);
        cmd.Headers.Update(Net.fieldRCID,cmd.Net.Creds.ResourceID);
        cmd.Headers.Update(Net.fieldID,cmd.ID.toString());
        var sData=cmd.toMessage();
        if (Net.debugToConsole==true) coVDM.VDM.Console.Append(
          "Net - WebSocket Send (".concat(
              " fieldNSCore=",cmd.NSCore,
              " fieldNSCommand=",cmd.NSCommand,
              " fieldID=",cmd.ID.toString(),
              " Try=",cmd.Try,
              " sData=",sData
          )
        );
        cmd.Expires=new Date().setMilliseconds(cmd.Net.msTimeOut);
        con.Socket.send(sData);

        cmd.Sent=true;
        sData.length=0;
        sData=null;
      };
      cmd.doHTTPSend=function(){
        var cmd=this;
        var cmds=cmd.Commands;
        var net=cmd.Net;
        var con=cmd.Connection;

        if (Net.debugToConsole==true) coVDM.VDM.Console.Append("Net - HTTP Send");
        cmd.Headers.Update(Net.fieldNSCore,cmd.NSCore);
        cmd.Headers.Update(Net.fieldNSCommand,cmd.NSCommand);
        cmd.Headers.Update(Net.fieldAuth,cmd.Net.Creds.Auth);
        cmd.Headers.Update(Net.fieldAccount,cmd.Net.Creds.User);
        cmd.Headers.Update(Net.fieldRCID,cmd.Net.Creds.ResourceID);
        cmd.Headers.Update(Net.fieldID,cmd.ID.toString());
        for (var iLcv=0; iLcv<cmd.Headers.length; iLcv++){
          var itm=cmd.Headers[iLcv];
          var iDX=Net.RestrictedHeaders.IndexOf(itm.Name);
          if (iDX==-1)
            con.Socket.setRequestHeader(itm.Name,itm.Value);
        };
        cmd.Try+=1;
        cmd.Expires=new Date().setMilliseconds(cmd.Net.msTimeOut);
        cmd.Sent=true;

        con.Socket.send(cmd.dataSend);

      };
      cmd.TimedOut=function(){
        var cmd=this;
        var cmds=cmd.Commands;
        cmd.Expires=0;
        cmd.Code=Net.CO_STATUS_TIMEOUT;
        cmd.Suspended=true;
        if (cmd.Connection) cmd.Connection.Free();

        var idx=cmds.queueActive.indexOf(cmd);
        if (idx!=-1) cmds.queueActive.splice(idx,1);

        var idx=cmds.queueIdle.indexOf(cmd);
        if (idx==-1) cmds.queueIdle.push(cmd);

        if (cmd.onTimeOut) {
          try {
            if (cmd.Torus) cmd.Torus.Stop();
            cmd.onTimeOut(cmd);
          } catch(err) {
            coVDM.VDM.Console.Append(
            "Net.Commands.Command.onTimeOut Exception".concat(
              " exception = ",err,
              " fieldNSCore=",cmd.NSCore,
              " fieldNSCommand=",cmd.NSCommand,
              " fieldID=",cmd.ID.toString(),
              " Code=",cmd.Code,
              " Try=",cmd.Try,
              " dataSend=",cmd.dataSend
            ));
          };
        };
      };
      cmd.Errored=function(){
        var cmd=this;
        var cmds=cmd.Commands;
        cmd.Error=true;
        cmd.Suspended=true;

        if (cmd.Connection) cmd.Connection.Free();

        var idx=cmds.queueActive.indexOf(cmd);
        if (idx!=-1) cmds.queueActive.splice(idx,1);

        var idx=cmds.queueIdle.indexOf(cmd);
        if (idx==-1) cmds.queueIdle.push(cmd);

        if (cmd._onError) {
          try {
            if (cmd.Torus) cmd.Torus.Stop();
            cmd.onError(cmd);
          } catch(err) {
            if (coVDM.VDM.Console) {
              coVDM.VDM.Console.Append(
              "Net.Commands.Command.onError Exception".concat(
                " exception = ",err,
                " fieldNSCore=",cmd.NSCore,
                " fieldNSCommand=",cmd.NSCommand,
                " fieldID=",cmd.ID.toString(),
                " Code=",cmd.Code,
                " Try=",cmd.Try,
                " dataSend=",cmd.dataSend
              ));
            };
          };
        };
      };
      cmd.Send = (Net.WebSockets==true) ? cmd.doWSSend : cmd.doHTTPSend ;
      cmd.toString=function(){
        var cmd=this;
        return "".concat(
          " cmd.NSCore=",cmd.NSCore,
          " cmd.NSCommand=",cmd.NSCommand,
          " cmd.ID=",cmd.ID.toString(),
          " cmd.Try=", cmd.Try,
          " cmd.Sent=",cmd.Sent,
          " cmd.Rcvd=",cmd.Rcvd,
          " cmd.Error=",cmd.Error,
          " cmd.Code=",cmd.Code,
          " cmd.Suspended=",cmd.Suspended
        );
      };
      cmd.createConnection=function(){
        var cmd=this;
        var con=Objects.createNew("Connection");
        
        con.Trys=0;
        con.Command=cmd;
        con.Net=net;
        con.Connecting=false;
        con.Connected=false;
        con.Sending=false;
        con.Socket=null;
        con.dtClosed=null;
        con.dtOpened=null;
        con.Connect=function(){
          var con=this;
          var cmd=con.Command;
          cmd.Expires=new Date().setMilliseconds(cmd.Net.msTimeOut);
          if (con.Socket!=null) {
            if (con.Socket.close)
              con.Socket.close();
            con.Socket.Owner=null;
            con.Socket=null;
            con.Connecting=false;
            con.Connected=false;
            con.Sending=false;
            con.dtOpened=null;
            con.dtClosed=null;
          };
          if (con.Trys<Net.NET_TRIES) {
            con.Trys++;
            con.dtOpened=null;
            if (con.Net.WebSockets==true) {
              if (Net.debugToConsole==true) coVDM.VDM.Console.Append("Net Connection - Creating WebSocket");
              con.Socket=new WebSocket(con.Net.URI,Net.Protocol);
              if (con.Socket) {
                con.Socket.onmessage=function(evt) {
                  if (Net.debugToConsole==true) coVDM.VDM.Console.Append("Net Connection - WebSocket Message Data");
                  var idx=evt.data.indexOf(Net.HEADER_SEPARATOR);
                  var iEnd=evt.data.length;
                  con.Net.Queue.fromMessage(evt.data.substring(0,idx),evt.data.substring(idx+4,iEnd));
                };
                con.Socket.onopen=function(){
                  if (Net.debugToConsole==true) coVDM.VDM.Console.Append("Net Connection - WebSocket Opened");
                  con.Trys=0;
                  con.dtOpened=new Date();
                  con.Connected=true;
                };
                con.Socket.onclose=function(){
                  if (Net.debugToConsole==true) coVDM.VDM.Console.Append("Net Connection - WebSocket Closed");
                  con.Connected=false;
                  con.dtClosed=new Date();
                };
              };
            } else {
              con.Connecting=true;
              con.Socket=new XMLHttpRequest();
              con.Socket.Owner=con;
              var sURL=cmd.URI; //( (cmd.Secure==true) || (coVDM.Secure==true) )? "https://"+coVDM.Domain+cmd.URI : "http://"+cmd.URI;
              if (cmd.Parameters) sURL+="?"+cmd.Parameters.join("&");
              con.Socket.open( (cmd.dataSend) ? "PUT" : "GET",sURL,Net.NET_ASYNC);
              if (cmd.Secure==true) con.Socket.withCredentials=true;
              con.Socket.upload.Owner=con;
              con.Socket.upload.onloadstart=function(e){
                var up=this;
                var con=up.Owner;
                var cmd=con.Command;
                if (cmd) cmd.onProgress(cmd,0,0);
              };
              con.Socket.upload.onprogress=function(e){
                var up=this;
                var con=up.Owner;
                var cmd=con.Command;
                if (cmd) cmd.onProgress(cmd,e.loaded,e.total);
              };
              con.Socket.onloadstart=function(e){
                var up=this;
                var con=up.Owner;
                var cmd=con.Command;
                if (cmd) cmd.onProgress(cmd,0,0);
              };
              con.Socket.onprogress=function(e){
                var up=this;
                var con=up.Owner;
                var cmd=con.Command;
                if (cmd) cmd.onProgress(cmd,e.loaded,e.total);
              };
              con.Socket.onreadystatechange=function(){
                var Socket=this;
                var con=Socket.Owner;
                var cmd=con.Command;
                var cmds=cmd.Commands;
                switch (Socket.readyState) {
                  case (1,2): //server connection established
                    con.dtOpened=new Date().setMilliseconds(0);
                    con.Connected=true;
                    con.Connecting=false;
                    con.Sending=true;
                    break;
                  case 4: // request finished and response is ready
                    con.Sending=false;
                    if ((Socket.status==200) || (Socket.status==417)) {
                      var sHeaders=Socket.getAllResponseHeaders();
                      var sContentType=Socket.getResponseHeader(Net.fieldContentType);
                      sContentType=(sContentType) ? sContentType.toLowerCase() : "";

                      sHeaders=sHeaders.replace(/\n/g,"\r");
                      sHeaders=sHeaders.replace(/\r\r/g,"\r");
                      sHeaders=sHeaders.replace(/\r/g,Net.CRLF);


                      var Content=(sContentType=='text/xml')? Socket.responseXML : Socket.responseText;
                      cmds.fromMessage(sHeaders,Content);

                      sContentType=sHeaders.length=0;
                      sContentType=sHeaders=Content=null;
                    } else {
                      cmd.Code=Socket.status;
                      cmd.Errored();
                    };
                    break;
                };
              };
              cmd.Send();
            };
            return true;
          } else if (con.Net.Failed==false) {
            if (Net.debugToConsole==true) coVDM.VDM.Console.Append("Net Connection - Socket Failure");
            con.Net.Failed=true;
            con.Net.onNetworkFailure();
            return false;
          } else {
            if (Net.debugToConsole==true) coVDM.VDM.Console.Append("Net Connection - Socket Refailure");
            con.Net.onNetworkFailure();
            return false;
          };
        };
        con.Free=function(){
          var con=this;
          if (con.Socket!=null) {
            con.Socket.onloadstart=null;
            con.Socket.onprogress=null;
            con.Socket.onreadystatechange=null;
            con.Socket.Owner=null;
            if (con.Socket.close) con.Socket.close();
            if (con.Socket.abort) con.Socket.abort();
            con.Socket=null;
            con=con.Command.Connection=Objects.Release(con);
            return null;
          };
          con=Objects.Release(con);
          return null;
        };
        return con;
      };
      cmd.setAutoLoad=function(value){
       var cmd=this;
       var cmds=this.Commands;
       var idx=cmds.queueAutoLoad.indexOf(cmd);

       if (value==true){
        cmd.AutoLoad=true;
        if (idx==-1) cmds.queueAutoLoad.push(cmd);
       } else {
        cmd.AutoLoad=false;
        if (idx!=-1) cmds.queueAutoLoad.splice(idx,1);
       };
      };
      cmd.Free=function(){
        var cmd=this;
        var cmds=cmd.Commands;
        var idx=cmds.queueAll.indexOf(cmd);
        if (idx!=-1) cmds.queueAll.splice(idx,1);
        var idx=cmds.queueActive.indexOf(cmd);
        if (idx!=-1) cmds.queueActive.splice(idx,1);

        var idx=cmds.queueIdle.indexOf(cmd);
        if (idx!=-1) cmds.queueIdle.splice(idx,1);
        var idx=cmds.queueAutoLoad.indexOf(cmd);
        if (idx!=-1) cmds.queueAutoLoad.splice(idx,1);

        if (cmd.Connection) cmd.Connection.Free();
        cmd.Headers.Free();
        cmd=Objects.Release(cmd);
        return null;
      };
      cmds.queueAll.push(cmd);
      var qList= (cmd.Suspended==true) ?  cmds.queueIdle : cmds.queueActive;
      qList.push(cmd);
      if (cmd.AutoLoad==true) cmds.queueAutoLoad.push(cmd);

      if ((cmds.queueActive.length>=0) && (cmds.Timer.Active==false)) cmds.Timer.setActive(true);

      return cmd;
    };
    cmds.fromMessage=function(sHeaders,Data){
      var cmds=this;
      cmds.Headers.fromString(sHeaders);
      var iID=cmds.Headers.getValueAsInt(Net.fieldID);
      var iRemoteIP=cmds.Headers.getValueAsInt(Net.fieldRemoteIP);
      cmd=cmds.Find(iID);
      if (cmd!=null)  {
        cmd.Expires=0; // Disable Timer
        cmd.Rcvd=true;
        if ( (iRemoteIP!=0) && (iRemoteIP!=cmd.Net.Creds.RemoteIP) )
          cmd.Net.Creds.RemoteIP=iRemoteIP;
        cmd.Headers.fromString(sHeaders);
        cmd.dataRecv=Data;
        cmd.Code=cmds.Headers.getValueAsInt(Net.fieldCode,Net.CO_STATUS_FAIL);
        cmd.onComplete(cmd);
        cmd.Headers.Clear();
        cmd.Try=0;
        if (Net.debugToConsole==true) coVDM.VDM.Console.Append(
          "Net - cmdQueue.fromMessage".concat(
            " fieldNSCore=",cmd.NSCore,
            " fieldNSCommand=",cmd.NSCommand,
            " fieldID=",cmd.ID.toString(),
            " Code=",cmd.Code,
            " Try=",cmd.Try,
            " dataRecv=",cmd.dataRecv
          )
        );
        var idx=cmds.queueActive.indexOf(cmd);
        if (idx!=-1) cmds.queueActive.splice(idx,1);

        if (cmd.Connection) cmd.Connection.Free();
        if (cmd.Torus) cmd.Torus.Stop();
        if (cmd.FreeOnComplete==true)
          cmd.Free();
      };
    };
    cmds.onWSTimer=function(tmr){
      var net=tmr.Net;
      var cmds=net.Commands;
      var qList=cmds.queueActive;
      var iLcv=0;
      if (q.length==0) cmds.Timer.setActive(false);
      while (iLcv<qList.length) {
        var cmd=qList[iLcv];
        iLcv++;
        /*
        switch (con.Socket.readyState) {
          case Net.SOCKET_OPEN :
            var dtNow=new Date().setMilliseconds(0);
            var iLcv=0;
            while (iLcv<qList.length) {
              var cmd=qList[iLcv];
              cmd.Code=con.Socket.readyState;
              if (cmd.Suspended==false) {
                if (cmd.Sent==false) {
                  cmd.Send();
                } else if (cmd.Expires!=0) {
                  if (dtNow>cmd.Expires) {
                    cmds.TimedOut();
                    if (cmd.FreeOnComplete==true) {
                      cmd.Free();
                    };
                    iLcv--;
                  };
                };
              };
              iLcv++;
            };
            return true;
          case Net.SOCKET_CLOSED :
            if (tmr.Net.Shutdown==true) {
              var iLcv=0;
              while (iLcv<qList.length) {
                var cmd=qList[iLcv];
                if (cmd.Error==false) {
                  cmd.Expires=0;
                  if (cmd.Error==false) {
                    cmd.Errored();
                    if (cmd.FreeOnComplete==true) {
                      cmd.Free();
                      iLcv--;
                    };
                  };
                };
                iLcv++;
              };
              return true;
            } else {
              for (var iLcv=0; iLcv<tmr.Net.Queue.List.length; iLcv++){
                cmd=tmr.Net.Queue.List[iLcv];
                cmd.Expires=0;
                if (cmd.Error==false) {
                  cmd.Error=true;
                  cmd.Code=Net.CO_STATUS_RESET;
                  cmd.onError(cmd);
                  if (cmd.FreeOnComplete==true)
                    cmd.Free();
                };
              };
            };
            return true;
          default:  return false;
        };
        */
      };
      /*
      } else if (tmr.Net.Queue.List.length>0) {
        if (tmr.Net.Failed==false) {
          var dtNow=new Date();
          var dtExpires=new Date(tmr.Net.Connection.dtClosed);
          dtExpires.setMilliseconds(Net.NET_CON_PAUSE);
          if ( (tmr.Net.Connection.dtClosed==null) || (dtNow>dtExpires) ) {
            if (
                 (tmr.Net.Connection.dtOpened==null) &&
                 ( (tmr.Net.Connection.Socket==null)  || (tmr.Net.Connection.Socket!=null) && (tmr.Net.Connection.Socket.readyState!=Net.SOCKET_OPENING))
            )
              tmr.Net.Connection.Connect();
          };
        };
      };
      */
    };
    cmds.onHTTPTimer=function(tmr){
      var cmds=this;
      var tmrs=tmr.Owner;
      var net=tmrs.Net;
      var dtNow=new Date().setMilliseconds(0);
      var q=cmds.queueActive;
      var iLcv=0;
      if (q.length==0) cmds.Timer.setActive(false);
      while (iLcv<q.length) {
        var cmd=q[iLcv];
        if (cmd.Suspended==false) {
          if ( (cmd.Sent==false)  ) {
            if (!cmd.Connection)  cmd.Connection=cmd.createConnection();
            try {
              if ((cmd.Connection.Connected==false) && (cmd.Connection.Connecting==false)){
                cmd.Connection.Connect();// includes send
              } else if (dtNow>cmd.Expires){
                cmd.TimedOut();
                if (cmd.FreeOnComplete==true) cmd.Free();
                iLcv--;
              };
            } catch(err){
              cmd.Errored();
              if (cmd.FreeOnComplete==true) cmd.Free();
              iLcv--;
            };
          } else if (cmd.Expires==0){
            q.splice(iLcv,1);
            cmds.queueIdle.push(cmd);
            iLcv--;
          };
        };
        iLcv++;
      };
      return true;
    };
    cmds.Execute=function(){
      var cmds=this;
      var q=cmds.queueIdle;
      for (var iLcv=0; iLcv<q.length; iLcv++){
        var cmd=q[iLcv];
        cmd.reTry();
      };
    };
    cmds.Free=function(){
      var cmds=this;
      var idx=Net.CommandsManifest.indexOf(cmds);
      if (idx!=-1) Net.CommandsManifest.splice(idx,1);
      cmds.Timer.Free();
      cmds.Clear();
      cmds.Net=null;
      cmds=Objects.Release(cmds);
      return null;
    };
    cmds.Timer=net.Timers.createTimer((Net.WebSockets==true) ? function(tmr){cmds.onWSTimer(tmr);} : function(tmr){ cmds.onHTTPTimer(tmr);},Net.msPolling,0);
    Net.CommandsManifest.push(cmds);
    return cmds;
  },
  Free : function(net){
    net.Timers.Free();
    net.Timers=null;

    net.Queue.Free();
    net.Queue=null;

    net.Connection.Free();
    net.Connection=null;

    net.Creds=null;
    net.NameSpace=null;
  },
  createTimers : function(net){
    var tmrs=Objects.createNew("Timers");
    
    tmrs.Net=net;
    tmrs.createTimer=function(eventHandle,msDuration,dtExpires){
      var tmrs=this;
      var _tmr=tmr=Objects.createNew("Timer");
      
      tmr.Owner=tmrs;
      tmr.Expires=dtExpires;
      tmr.Event=eventHandle;
      tmr.Active=false;
      tmr.setActive=function(value){
       var tmr=this;
       if (value==true) {
         tmr.Active=true;
         if (tmr.Handle!=0) return;
         tmr.Handle=setInterval( function(){
            try {
              tmr.Event(tmr);
            } catch (err) {
              tmr.Expires=0;
            };
           },
           msDuration
         );
       } else {
         tmr.Active=false;
         if (tmr.Handle!=0) {
           clearInterval(tmr.Handle);
           tmr.Handle=0;
         };
       };
      };
      tmr.Handle=0;
      tmr.Free=function(){
        var tmr=this;
        var tmrs=tmr.Owner;
        if (tmr.Handle!=0) {
          clearInterval(tmr.Handle);
          tmr.Handle=0;
        };
        var idx=tmrs.List.indexOf(tmr);
        if (idx!=-1) tmrs.List.splice(idx,1);
        tmr=Objects.Release(tmr);
        return null;
      };
      tmrs.List.push(tmr);
      return tmr;
    }
    tmrs.List=new Array();
    tmrs.Clear=function(){
      var tmrs=this;
      while (tmrs.List.length>0) {
        var tmr=tmrs.List[0];
        tmr.Free();
      };
    };
    tmrs.Free=function(){
      var tmrs=this;
      tmrs.Clear();
      tmrs.List=null;
      tmrs=null;
    };
    return tmrs;
  },
  AutoLoad : function(){
    var lst=Net.CommandsManifest;
    for (var iLcv=0; iLcv<lst.length; iLcv++){
      var cmds=lst[iLcv];
      cmds.AutoLoad();
    };
  }
};
