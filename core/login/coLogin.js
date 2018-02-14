/*
unit /core/login/coLogin.js

  Copyright Aurawin LLC 2003-2014
  Written by: Andrew Thomas Brunner

  This code is protected under the Aurawin Public Release License
  http://www.aurawin.com/aprl.html
*/
var
  coLogin={
  Version                                  : new Version(2014,8,14,90),
  Title                                    : new Title("Aurawin Login Framework","coLogin"),
  Vendor                                   : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header                                   : coAppKit.Dependencies.Create(null,'/core/login/coLogin.js',coAppKit.PreLoaded),
  Usage                                    : coAppKit.Units.Create(null,'/core/login/coLogin.js',coAppKit.PreLoaded),
  Unit                                     : '/core/login/coLogin.js',
  DB                                       : null,
  NET_ASYNC                                : true,
  NET_SNYC                                 : false,
  NET_DOMAIN                               : '{$i domain_name}',
  NET_NS_CO_CREDS                          : '/core/login',
  NET_NS_CC_CREDS                          : '/creds',
  NET_NS_CC_EXISTS                         : '/exs',
  NET_NS_CC_SIGNUP                         : '/su',

  NET_QR_ID                                : 0,
  NET_POLL_MS                              : 300,
  NET_TIMEOUT_MS                           : 1000*20,

  NET_SC_OK                                : 200,
  NET_SC_ERROR                             : 417,

  HEADER_SEPARATOR                         : "\r\n\r\n",
  FIELD_SEPARATOR                          : ": ",
  EQ                                       : "=",
  CRLF                                     : "\r\n",
  VALID_USERNAME_ALPHA_CAPS_LOW            : 65,
  VALID_USERNAME_ALPHA_CAPS_HI             : 90,
  VALID_USERNAME_ALPHA_LOW                 : 97,
  VALID_USERNAME_ALPHA_HI                  : 122,
  VALID_USERNAME_NUM_HI                    : 57,
  VALID_USERNAME_NUM_LOW                   : 48,
  VALID_USERNAME_CHARS                     : [45,46,95],
  VALID_INPUT_CHARATS                      : [8,35,36,37,39],

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


  fieldID                                  : "ID",
  fieldDID                                 : "DID",
  fieldNS                                  : "ns",
  fieldNSCore                              : "co-ns",
  fieldNSCommand                           : "cc-ns",
  fieldAuth                                : "auth",
  fieldCode                                : "code",
  fieldResource                            : "resource",
  fieldDomain                              : "domain",
  fieldAccount                             : "user",
  init : function(vdm){
    this.VDM=vdm;
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      coAppKit.NoUses,
      [
        '/core/app/coDB.js'
      ],
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.Initialized=true;
    return this;
  },
  onInitialized : function(App){
    App.Unit.DB=coDB.createCollection(coXML.Parser,"accounts","account",coDB.HasNoItems,coDB.HasNoDisplays,coDB.ParseSync);
    if (!coLogin.DB.Account) {
      coLogin.DB.Account=new Object();
      coLogin.DB.Account.User=coLogin.DB.Fields.addField("User",coDB.Kind.String,"usrn","",coDB.StreamOn);
      coLogin.DB.Account.FirstName=coLogin.DB.Fields.addField("FirstName",coDB.Kind.String,"fname","",coDB.StreamOn);
      coLogin.DB.Account.LastName=coLogin.DB.Fields.addField("LastName",coDB.Kind.String,"lname","",coDB.StreamOn);
      coLogin.DB.Account.Telephone=coLogin.DB.Fields.addField("Telephone",coDB.Kind.String,"tel","",coDB.StreamOn);
      coLogin.DB.Account.Password=coLogin.DB.Fields.addField("Password",coDB.Kind.String,"pwd","",coDB.StreamOn);
      coLogin.DB.Account.DomainID=coLogin.DB.Fields.addField("DomainID",coDB.Kind.Int64,"did",{$i domain_id},coDB.StreamOn);
      coLogin.DB.Account.Auth=coLogin.DB.Fields.addField("Auth",coDB.Kind.String,"auth","",coDB.StreamOn);
      coLogin.DB.Account.Forward=coLogin.DB.Fields.addField("Forward",coDB.Kind.String,"fwe","",coDB.StreamOn);


      coLogin.DB.Account.Roster=coLogin.DB.Fields.addField("Roster",coDB.Kind.XML,"contacts","",coDB.StreamOn);
      coLogin.DB.Account.toXML=function(){
        return coLogin.DB.Fields.toXML();
      };
    };
    if (!coLogin.DB.Roster){
      coLogin.DB.Roster=coDB.Fields("contact",coLogin.DB,coDB.HasNoItems);
      coLogin.DB.Roster.FirstName=coLogin.DB.Roster.addField("First Name",coDB.Kind.String,"name-first","",coDB.StreamOn);
      coLogin.DB.Roster.MiddleName=coLogin.DB.Roster.addField("Middle Name",coDB.Kind.String,"name-middle","",coDB.StreamOn);
      coLogin.DB.Roster.LastName=coLogin.DB.Roster.addField("Family Name",coDB.Kind.String,"name-family","",coDB.StreamOn);
      coLogin.DB.Roster.Email=coLogin.DB.Roster.addField("Email",coDB.Kind.String,"eml1","",coDB.StreamOn);
      coLogin.DB.Roster.Email2=coLogin.DB.Roster.addField("Email2",coDB.Kind.String,"eml2","",coDB.StreamOn);
      coLogin.DB.Roster.Address1=coLogin.DB.Roster.addField("Address1",coDB.Kind.String,"addr1","",coDB.StreamOn);
      coLogin.DB.Roster.Address2=coLogin.DB.Roster.addField("Address2",coDB.Kind.String,"addr2","",coDB.StreamOn);
      coLogin.DB.Roster.City=coLogin.DB.Roster.addField("City",coDB.Kind.String,"city","",coDB.StreamOn);
      coLogin.DB.Roster.State=coLogin.DB.Roster.addField("State",coDB.Kind.String,"state","",coDB.StreamOn);
      coLogin.DB.Roster.Zip=coLogin.DB.Roster.addField("Zip",coDB.Kind.String,"zip","",coDB.StreamOn);
      coLogin.DB.Roster.Country=coLogin.DB.Roster.addField("Country",coDB.Kind.String,"cntry","",coDB.StreamOn);
      coLogin.DB.Roster.Phone=coLogin.DB.Roster.addField("Phone",coDB.Kind.String,"phn1","",coDB.StreamOn);

    };
    App.Loaded=true;
  },
  checkCreds : function (sUserName,sPassword,onError,onSuccess){

    var Request=new XMLHttpRequest();
    try {
      Request.UserName=sUserName;
      Request.Auth=coEncryption.toMD5(sUserName+sPassword);
      Request.Trys=0;
      Request.dtOpened=0;
      Request.Code=coLogin.CO_STATUS_WAIT;
      Request.Opened=false;
      Request.Rcvd=false;
      Request.onError=onError;
      Request.onSuccess=onSuccess;
      Request.dataRecv=null;
      coLogin.NET_QR_ID = Request.ID = coLogin.NET_QR_ID+1;

      Request.Headers=coList.kpList(coLogin.FIELD_SEPARATOR,coLogin.CRLF);
      Request.Headers.Add(coLogin.fieldID,coLogin.NET_QR_ID.toString());
      Request.Headers.Add(coLogin.fieldNS,coLogin.NET_NS_CO_CREDS);
      Request.Headers.Add(coLogin.fieldNSCore,coLogin.NET_NS_CO_CREDS);
      Request.Headers.Add(coLogin.fieldNSCommand,coLogin.NET_NS_CC_CREDS);
      Request.Headers.Add(coLogin.fieldAccount,Request.UserName);
      Request.Headers.Add(coLogin.fieldAuth,Request.Auth);
      Request.Headers.Add(coLogin.fieldDomain,coLogin.NET_DOMAIN);

      Request.Expires=new Date().setMilliseconds(coLogin.NET_TIMEOUT_MS);
      Request.open("GET",coLogin.NET_NS_CO_CREDS,coLogin.NET_ASYNC);
      Request.Shutdown=function(){
        if ( (Request!=null) && (Request.TimerHandle!=0) ){
          clearInterval(Request.TimerHandle);
          Request.TimerHandle=0;
          Request.onreadystatechange=null;
          Request.abort();
          Request.Expires=0;
          Request=null;
        };
      };
      Request.onTimerEvent=function(){
      };
      Request.TimerHandle=setInterval(
        function(){
          try {
            var dtNow=new Date().setMilliseconds(0);
            if (Request!=null) {
               if (dtNow>Request.Expires){
                 Request.Code=coLogin.CO_STATUS_TIMEOUT;
                 Request.onError(Request);
                 Request.Shutdown();
               };
            };
          } catch (err) {
           Request.Expires=0;
          };
        },
        coLogin.NET_POLL_MS
      );
      Request.onreadystatechange=function(){
      switch (Request.readyState) {
        case 1: //server connection established
          if (Request.Sent==false) {
            Request.Trys=0;
            Request.dtOpened=new Date().setMilliseconds(0);
            Request.Connected=true;
          };
          break;
        case 4: // request finished and response is ready
          Request.Rcvd=true;
          Request.Expires=0;
          if ((Request.status==coLogin.NET_SC_OK) || (Request.status==coLogin.NET_SC_ERROR)) {
            var sData=Request.getAllResponseHeaders();
            sData=sData.replace(/\n/g,"\r");
            sData=sData.replace(/\r\r/g,"\r");
            sData=sData.replace(/\r/g,coLogin.CRLF);
            sData=sData.substring(0,sData.length-2);
            sData+=coLogin.HEADER_SEPARATOR;
            sData+=Request.responseText;
            var saPacket=sData.split(coLogin.HEADER_SEPARATOR); // two pieces

            Request.Headers.fromString(saPacket[0]);
            var iID=Request.Headers.getValueAsInt(coLogin.fieldID);

            if (iID==Request.ID)  {
              Request.Rcvd=true;
              Request.Headers.fromString(saPacket[0]);
              if (saPacket.length>0)
                Request.dataRecv=saPacket[1];
              Request.Code=Request.Headers.getValueAsInt(coLogin.fieldCode,coLogin.CO_STATUS_FAIL);
              if (Request.Code==coLogin.CO_STATUS_OK){
                coCookie.setCookie(coLogin.fieldAuth,Request.Auth,0);
                Request.onSuccess(Request);
              } else {
                Request.onError(Request);
              }
            };
            sData.length=0;
            sData=null;
            saPacket.length=0;
            saPacket=null;
          } else {
            Request.onError(Request);
          };
          Request.Shutdown();
          break;
        };
      };
      for (var iLcv=0; iLcv<Request.Headers.length; iLcv++){
        var itm=Request.Headers[iLcv];
        Request.setRequestHeader(itm.Name,itm.Value);
      };
      Request.send();
    } catch(err){
      Request.Sent=false;
      if (Request.Shutdown) Request.Shutdown();
      throw err;
    };
  },
  userExists : function (sUserName,onError,onSuccess){
    var Request=new XMLHttpRequest();
    try {
      Request.UserName=sUserName;
      Request.Trys=0;
      Request.dtOpened=0;
      Request.Code=coLogin.CO_STATUS_WAIT;
      Request.Opened=false;
      Request.Rcvd=false;
      Request.onError=onError;
      Request.onSuccess=onSuccess;
      Request.dataRecv=null;
      coLogin.NET_QR_ID = Request.ID = coLogin.NET_QR_ID+1;

      Request.Headers=coList.kpList(coLogin.FIELD_SEPARATOR,coLogin.CRLF);
      Request.Headers.Add(coLogin.fieldID,coLogin.NET_QR_ID.toString());
      Request.Headers.Add(coLogin.fieldNS,coLogin.NET_NS_CO_CREDS);
      Request.Headers.Add(coLogin.fieldNSCore,coLogin.NET_NS_CO_CREDS);
      Request.Headers.Add(coLogin.fieldNSCommand,coLogin.NET_NS_CC_EXISTS);
      Request.Headers.Add(coLogin.fieldAccount,Request.UserName);
      if (Request.Auth!=undefined)
        Request.Headers.Add(coLogin.fieldAuth,Request.Auth);
      Request.Headers.Add(coLogin.fieldDomain,coLogin.NET_DOMAIN);

      Request.Expires=new Date().setMilliseconds(coLogin.NET_TIMEOUT_MS);
      Request.open("GET",coLogin.NET_NS_CO_CREDS,coLogin.NET_ASYNC);
      Request.Shutdown=function(){
        if ( (Request!=null) && (Request.TimerHandle!=0) ){
          clearInterval(Request.TimerHandle);
          Request.TimerHandle=0;
          Request.onreadystatechange=null;
          Request.abort();
          Request.Expires=0;
          Request=null;
        };
      };
      Request.onTimerEvent=function(){
      };
      Request.TimerHandle=setInterval(
        function(){
          try {
            var dtNow=new Date().setMilliseconds(0);
            if (Request!=null) {
              if (dtNow>Request.Expires){
                Request.Code=coLogin.CO_STATUS_TIMEOUT;
                Request.onError(Request);
                Request.Shutdown();
              };
            };
          } catch (err) {
           Request.Expires=0;
          };
        },
        coLogin.NET_POLL_MS
      );
      Request.onreadystatechange=function(){
      switch (Request.readyState) {
        case 1: //server connection established
          if (Request.Sent==false) {
            Request.Trys=0;
            Request.dtOpened=new Date().setMilliseconds(0);
            Request.Connected=true;
          };
          break;
        case 4: // request finished and response is ready
          Request.Rcvd=true;
          Request.Expires=0;
          if ((Request.status==coLogin.NET_SC_OK) || (Request.status==coLogin.NET_SC_ERROR)) {
            var sData=Request.getAllResponseHeaders();
            sData=sData.replace(/\n/g,"\r");
            sData=sData.replace(/\r\r/g,"\r");
            sData=sData.replace(/\r/g,coLogin.CRLF);
            sData=sData.substring(0,sData.length-2);
            sData+=coLogin.HEADER_SEPARATOR;
            sData+=Request.responseText;
            var saPacket=sData.split(coLogin.HEADER_SEPARATOR); // two pieces

            Request.Headers.fromString(saPacket[0]);
            var iID=Request.Headers.getValueAsInt(coLogin.fieldID);

            if (iID==Request.ID)  {
              Request.Rcvd=true;
              Request.Headers.fromString(saPacket[0]);
              if (saPacket.length>0)
                Request.dataRecv=saPacket[1];
              Request.Code=Request.Headers.getValueAsInt(coLogin.fieldCode,coLogin.CO_STATUS_FAIL);
              if (Request.Code==coLogin.CO_STATUS_OK){
                Request.onSuccess(Request);
              } else {
                Request.onError(Request);
              }
            };
            sData.length=0;
            sData=null;
            saPacket.length=0;
            saPacket=null;
          } else{
            Request.onError(Request);
          };
          Request.Shutdown();
          break;
        };
      };
      for (var iLcv=0; iLcv<Request.Headers.length; iLcv++){
        var itm=Request.Headers[iLcv];
        Request.setRequestHeader(itm.Name,itm.Value);
      };
      Request.send();
    } catch(err){
      Request.Sent=false;
      if (Request.Shutdown) Request.Shutdown();
      throw err;
    };
  },
  userCreate : function (sUserName,sAuth,sXML,onError,onSuccess){
    var Request=new XMLHttpRequest();
    try {
      Request.UserName=sUserName;
      Request.Auth=sAuth;
      Request.Trys=0;
      Request.dtOpened=0;
      Request.Code=coLogin.CO_STATUS_WAIT;
      Request.Opened=false;
      Request.Rcvd=false;
      Request.onError=onError;
      Request.onSuccess=onSuccess;
      Request.dataRecv=null;
      coLogin.NET_QR_ID = Request.ID = coLogin.NET_QR_ID+1;

      Request.Headers=coList.kpList(coLogin.FIELD_SEPARATOR,coLogin.CRLF);
      Request.Headers.Add("Content-Type","text/xml");
      Request.Headers.Add(coLogin.fieldID,coLogin.NET_QR_ID.toString());
      Request.Headers.Add(coLogin.fieldNS,coLogin.NET_NS_CO_CREDS);
      Request.Headers.Add(coLogin.fieldNSCore,coLogin.NET_NS_CO_CREDS);
      Request.Headers.Add(coLogin.fieldNSCommand,coLogin.NET_NS_CC_SIGNUP);
      Request.Headers.Add(coLogin.fieldAccount,Request.UserName);
      Request.Headers.Add(coLogin.fieldAuth,Request.Auth);
      Request.Headers.Add(coLogin.fieldDomain,coLogin.NET_DOMAIN);

      Request.Expires=new Date().setMilliseconds(coLogin.NET_TIMEOUT_MS);
      Request.open("POST",coLogin.NET_NS_CO_CREDS,coLogin.NET_ASYNC);
      Request.Shutdown=function(){
        if ( (Request!=null) && (Request.TimerHandle!=0) ){
          clearInterval(Request.TimerHandle);
          Request.TimerHandle=0;
          Request.onreadystatechange=null;
          Request.abort();
          Request.Expires=0;
          Request=null;
        };
      };
      Request.onTimerEvent=function(){
      };
      Request.TimerHandle=setInterval(
        function(){
          try {
            var dtNow=new Date().setMilliseconds(0);
            if (Request!=null) {
               if (dtNow>Request.Expires){
                 Request.Code=coLogin.CO_STATUS_TIMEOUT;
                 Request.onError(Request);
                 Request.Shutdown();
               };
            };
          } catch (err) {
           Request.Expires=0;
          };
        },
        coLogin.NET_POLL_MS
      );
      Request.onreadystatechange=function(){
      switch (Request.readyState) {
        case 1: //server connection established
          if (Request.Sent==false) {
            Request.Trys=0;
            Request.dtOpened=new Date().setMilliseconds(0);
            Request.Connected=true;
          };
          break;
        case 4: // request finished and response is ready
          Request.Rcvd=true;
          Request.Expires=0;
          if ((Request.status==coLogin.NET_SC_OK) || (Request.status==coLogin.NET_SC_ERROR)) {
            var sData=Request.getAllResponseHeaders();
            sData=sData.replace(/\n/g,"\r");
            sData=sData.replace(/\r\r/g,"\r");
            sData=sData.replace(/\r/g,coLogin.CRLF);
            sData=sData.substring(0,sData.length-2);
            sData+=coLogin.HEADER_SEPARATOR;
            sData+=Request.responseText;
            var saPacket=sData.split(coLogin.HEADER_SEPARATOR); // two pieces

            Request.Headers.fromString(saPacket[0]);
            var iID=Request.Headers.getValueAsInt(coLogin.fieldID);

            if (iID==Request.ID)  {
              Request.Rcvd=true;
              Request.Headers.fromString(saPacket[0]);
              if (saPacket.length>0)
                Request.dataRecv=saPacket[1];
              Request.Code=Request.Headers.getValueAsInt(coLogin.fieldCode,coLogin.CO_STATUS_FAIL);
              if (Request.Code==coLogin.CO_STATUS_OK){
                Request.onSuccess(Request);
              } else {
                Request.onError(Request);
              }
            };
            sData.length=0;
            sData=null;
            saPacket.length=0;
            saPacket=null;
          } else {
            Request.onError(Request);
          };
          Request.Shutdown();
          break;
        };
      };
      for (var iLcv=0; iLcv<Request.Headers.length; iLcv++){
        var itm=Request.Headers[iLcv];
        Request.setRequestHeader(itm.Name,itm.Value);
      };
      Request.send(sXML);
    } catch(err){
      Request.Sent=false;
      if (Request.Shutdown) Request.Shutdown();
      throw err;
    };
  }
};
coLogin.init(coVDM.VDM);
