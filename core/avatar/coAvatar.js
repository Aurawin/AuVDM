/*
unit /core/avatar/coAvatar.js

This unit provides access to the Avatar system

*/
var coAvatar = {
  Version          : new Version(2014,10,28,63),
  Title            : new Title("Aurawin Avatar","coAvatar"),
  Vendor           : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit             : '/core/avatar/coAvatar.js',
  Header           : coAppKit.Dependencies.Create(null,'/core/avatar/coAvatar.js',coAppKit.PreLoaded),
  Usage            : coAppKit.Units.Create(null,'/core/avatar/coAvatar.js',coAppKit.PreLoaded),
  debugToConsole   : true,
  ns               : "/core/avatar",
  NS_AVATAR_ADD    : "/a",
  NS_AVATAR_UPDATE : "/u",
  NS_AVATAR_PARAMS : "$Kind&$NetworkId&$FolderId&$FileId&$FileNetworkId",
  URI_AVATAR       : "/core/avatar?g&$id",

  KIND_USER      : 0,
  KIND_NETWORK   : 1,

  NoAddCallback  : null,
  NoUpdateCallback : null,
  init           : function(vdm){
    this.VDM=vdm;
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/spc/fldrs/coCabinet.js'
      ],
      [
        '/core/avatar/coAvatar.css'
      ],
      this.onInitialized
    );
    this.Header.App=this.App;
    this.Usage.App=this.App;
    this.App.Unit=this;
    this.App.deferInit=function(App){
      return  (
        (typeof(coCabinet)!='undefined') &&
        (coCabinet.App.Screen!=null) &&
        (coCabinet.App.Screen.DB!=null)
      );
    };
    return this;
  },
  onInitialized : function(App){
    App.Loaded=true;
  },
  createFields:function(Kind){
    var flds=new coDB.Fields("avatar",coDB.HasNoCollection,coDB.HasNoItems);
    flds.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    flds.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    flds.addField("Kind",coDB.Kind.Integer,"kind",Kind,coDB.StreamOn);
    flds.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    flds.addField("Modified",coDB.Kind.Double,"mdf",0.0,coDB.StreamOn);
    flds.addField("Width",coDB.Kind.Integer,"width",0,coDB.StreamOn);
    flds.addField("Height",coDB.Kind.Integer,"height",0,coDB.StreamOn);
    flds.addField("Size",coDB.Kind.Integer,"size",0,coDB.StreamOn);
    flds.addField("Extension",coDB.Kind.String,"ext","",coDB.StreamOn);
    flds.addField("Data",coDB.Kind.Base64,"data","",coDB.StreamOn);

    return flds;
  },
  createDataset:function(Kind){
    var ds=coDB.createCollection(coXML.Parser,"avatars","avatar",coDB.HasItems,coDB.HasDisplays);
    ds.Identity=ds.Fields.addField("ID",coDB.Kind.Int64,"id",0,coDB.StreamOn);
    ds.Fields.addField("OwnerID",coDB.Kind.Int64,"oid",0,coDB.StreamOn);
    ds.Fields.addField("Kind",coDB.Kind.Integer,"kind",Kind,coDB.StreamOn);
    ds.Fields.addField("Created",coDB.Kind.Double,"ctd",0.0,coDB.StreamOn);
    ds.Fields.addField("Modified",coDB.Kind.Double,"mdf",0.0,coDB.StreamOn);
    ds.Fields.addField("Width",coDB.Kind.Integer,"width",0,coDB.StreamOn);
    ds.Fields.addField("Height",coDB.Kind.Integer,"height",0,coDB.StreamOn);
    ds.Fields.addField("Size",coDB.Kind.Integer,"size",0,coDB.StreamOn);
    ds.Fields.addField("Extension",coDB.Kind.Integer,"ext","",coDB.StreamOn);
    ds.Fields.addField("Data",coDB.Kind.Base64,"data","",coDB.StreamOn);

    return ds;
  },
  createPanelSet:function(Kind,Screen,Slide,Panels,onAvatarAdded,onAvatarUpdated){
    // Avatar Panels requires Slide.Avatar as a User based File Item

    var ps=Panels.Avatar=Panels.createItem("",Panels.Kind.Panels,"Avatar","pnlCollection",coAppUI.Alignment.Top);
    ps.Network=null;
    ps.Screen=Screen;
    ps.Slide=Slide;
    ps.onAvatarAdded=onAvatarAdded;
    ps.onAvatarUpdated=onAvatarUpdated;
    ps.avKind=Kind;
    ps.dbFile=coCabinet.App.Screen.DB.createFile();
    ps.dbAvatar=coAvatar.createFields(Kind);
    ps.onCmdError=function(netCMD){
    };
    ps.onCmdTimeOut=function(netCMD){
    };
    ps.onAddComplete=function(netCMD){
      var ps=netCMD.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,ps.dbAvatar.Stanza);
        ps.dbAvatar.fromXML(xDoc,xItem);
        if (ps.onAvatarAdded) ps.onAvatarAdded(ps);
      };
    };
    ps.onUpdateComplete=function(netCMD){
      var ps=netCMD.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc = netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,ps.dbAvatar.Stanza);
        ps.dbAvatar.fromXML(xDoc,xItem);
        if (ps.onAvatarUpdated) ps.onAvatarUpdated(ps);
      };
    };
    ps.resetValues=function(){
      var ps=this;
      ps.dbFile.Reset();
      ps.dbAvatar.Reset();
      ps.Panels.Avatar.Image.style.backgroundImage="";
    };
    ps.Reset=function(){
      var ps=this;
      ps.dbFile.Reset();
      ps.dbAvatar.Reset();
      ps.Panels.Avatar.Image.style.backgroundImage="";
    };
    ps.Load=function(dbItem,Network){
      if (Network==undefined) Network=null;
      var ps=this;
      ps.Network=Network;
      ps.DataSet=dbItem;
      ps.dbAvatar.Reset();
      ps.dbAvatar.MAP.ID.Value=dbItem.MAP.AvatarID.Value;
      ps.dbAvatar.Verified=true;

      var sURL=(ps.dbAvatar.MAP.ID.Value!=0) ? coAvatar.URI_AVATAR.replace('$id',ps.dbAvatar.MAP.ID.Value) : null;
      if (sURL) ps.Panels.Avatar.Image.style.backgroundImage="url("+sURL+")";
    };

    ps.Commit=function(){
      var ps=this;
      if (ps.DataSet==null) return;
      if (ps.DataSet.MAP.ID.Value==0) return;
      // Commit called after primary object has Identity.
      // Please call again...
      if ( (ps.dbAvatar.Verified==false) && (ps.dbFile.MAP.ID.Value!=0) ) {
        if (ps.dbAvatar.MAP.ID.Value==0){
          ps.dbAvatar.MAP.ID.Value=ps.dbFile.MAP.ID.Value;
          ps.dbAvatar.MAP.OwnerID.Value=ps.DataSet.MAP.ID.Value;
          ps.dbAvatar.MAP.Extension.Value=coUtils.extractFileExt(ps.dbFile.MAP.Name.Value);
          var iNetworkID=(ps.Network) ? ps.Network.MAP.ID.Value : 0;
          ps.AddAvatar(ps.avKind,iNetworkID,ps.dbFile.MAP.ID.Value,ps.dbFile.MAP.FolderID.Value,ps.dbFile.MAP.NetworkID.Value);
        } else{
          ps.dbAvatar.MAP.Extension.Value=coUtils.extractFileExt(ps.dbFile.MAP.Name.Value);
          var iNetworkID=(ps.Network) ? ps.Network.MAP.ID.Value : 0;
          ps.UpdateAvatar(ps.avKind,iNetworkID,ps.dbFile.MAP.ID.Value,ps.dbFile.MAP.FolderID.Value,ps.dbFile.MAP.NetworkID.Value);
        };
      } else {
        ps.Reset();
      };
    };
    ps.AddAvatar=function(iKind,iNetworkID,iFileID,iFolderID,iFileNetworkID){
      var sParams=coAvatar.NS_AVATAR_PARAMS;
      sParams=sParams.replace("$Kind",iKind);
      sParams=sParams.replace("$FolderId",iFolderID);
      sParams=sParams.replace("$FileId",iFileID);
      sParams=sParams.replace("$NetworkId",iNetworkID);
      sParams=sParams.replace("$FileNetworkId",(iFileNetworkID==0)? "" : iFileNetworkID);
      var ps=this;
      var netCMD=coVDM.VDM.Net.Commands.createCommand(
        coVDM.VDM.Net,
        coAvatar.ns,
        coAvatar.NS_AVATAR_ADD,
        coXML.Header+ps.dbAvatar.toXML(),
        ps.onAddComplete,
        ps.onCmdError,
        ps.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Parameters=sParams.split("&");
      netCMD.Owner=ps;
      netCMD.Data=ps.dbAvatar;
    };
    ps.UpdateAvatar=function(iKind,iNetworkID,iFileID,iFolderID,iFileNetworkID){
      var ps=this;
      var sParams=coAvatar.NS_AVATAR_PARAMS;
      sParams=sParams.replace("$Kind",iKind);
      sParams=sParams.replace("$FolderId",iFolderID);
      sParams=sParams.replace("$FileId",iFileID);
      sParams=sParams.replace("$NetworkId",iNetworkID);
      sParams=sParams.replace("$FileNetworkId",(iFileNetworkID==0)? "" : iFileNetworkID);
      var netCMD=coVDM.VDM.Net.Commands.createCommand(
        coVDM.VDM.Net,
        coAvatar.ns,
        coAvatar.NS_AVATAR_UPDATE,
        coXML.Header+ps.dbAvatar.toXML(),
        ps.onUpdateComplete,
        ps.onCmdError,
        ps.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Parameters=sParams.split("&");
      netCMD.Owner=ps;
      netCMD.Data=ps.dbAvatar;
    };
    ps.Panels=coAppUI.App.Components.Panels.Create("Avatar","pnlCollectionFields",Screen.Frame,ps,ps.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
    ps.Panels.Caption=ps.Panels.createCaption(coLang.Table.Apps.Social.Network.Avatar,"Avatar","pnlCaption");
    var Av=ps.Panels.Avatar=ps.Panels.createItem("",Panels.Kind.Blank,"Avatar","pnlAvatar",coAppUI.Alignment.Top);
    Av.doClick=function(e){
      var av=this;
      var edt=av.Slide;
      if (e==undefined) e=window.event;
      coDOM.preventDefault(e);
      var dlg=coVDM.App.Components.coDialogs.SelectPicture;
      dlg.onCanceled=function(dlg){

      };
      dlg.onExecuted=function(dlg){
        var dbFile=dlg.File;
        var sURI=(dbFile.MAP.NetworkID.Value==0) ? coSpectrum.Folders.DB.palmprintURL(dbFile) : dlg.Files.DataSet.palmprintURL(dbFile);

        ps.dbFile.Assign(dlg.File);
        ps.dbAvatar.Verified=false; // new import

        Av.Image.style.backgroundImage=(sURI.length>0)? "url("+sURI+")" : "";
        Av.Text.style.display="none";
      };
      ps.Screen.Frame.Torus.Show();
      setTimeout(function(){ dlg.Show();},coVDM.torusDelay);
    };
    Av.Wrapper=document.createElement('div');
    Av.Container.appendChild(Av.Wrapper);
    Av.Wrapper.className="wrapAvatar";

    Av.Image=document.createElement('div');
    Av.Wrapper.appendChild(Av.Image);
    Av.Image.className="imgAvatar";
    Av.evtTouchStart=coEvents.Add(
      Av.Image,
      "touchstart",
      function(e){
        coEvents.ScrollLock.Lock(coVDM.ScrollLock);
        Av.Text.style.display="block";
        coVDM.VDM.Console.Append("coSocial.NetworkSlide.Avatar.ontouchstart");
      },
      coEvents.Capture,
      coEvents.Active
    );
    Av.evtTouchEnd=coEvents.Add(
      Av.Image,
      "touchend",
      function(e){
        Av.doClick(e);
        coVDM.VDM.Console.Append("coSocial.NetworkSlide.Avatar.ontouchend");
      },
      coEvents.Capture,
      coEvents.Active
    );
    Av.evtMouseOver=coEvents.Add(
      Av.Image,
      "mouseover",
      function(e){
        Av.Text.style.display="block";
        coVDM.VDM.Console.Append("coSocial.NetworkSlide.Avatar.onmouseover");
      },
      coEvents.Capture,
      coEvents.Active
    );
    Av.evtMouseOut=coEvents.Add(
      Av.Image,
      "mouseout",
      function(e){
        Av.Text.style.display=(ps.dbAvatar.MAP.ID.Value==0) ? "block" : "none";
        coVDM.VDM.Console.Append("coSocial.NetworkSlide.Avatar.onmouseout");
      },
      coEvents.Capture,
      coEvents.Active
    );
    Av.evtMouseDown=coEvents.Add(
      Av.Image,
      "mousedown",
      function(e){
        if (e==undefined) e=window.event;
        if (e.button==0) Av.doClick(e);
        coVDM.VDM.Console.Append("coSocial.NetworkSlide.Avatar.onmousedown");
      },
      coEvents.Capture,
      coEvents.Active
    );

    Av.Text=document.createElement('div');
    Av.Image.appendChild(Av.Text);
    Av.Text.className="imgAvatarText";
    coDOM.setText(Av.Text,coLang.Table.Apps.Social.Network.SetAvatar);
    return ps;
  }
};
coAvatar.init(coVDM.VDM);
