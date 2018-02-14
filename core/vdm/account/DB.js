coAccount.App.Components.DB = {
  Version        : new Version(2014,10,28,20),
  Title          : new Title("Account Database","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAccount.App,'/core/vdm/account/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,

  createServerMemoryOptions : function(){
    var smo=coDB.createCollection(coXML.Parser,"smos","smo",coDB.HasItems,coDB.HasNoDisplays,coDB.ParseSync);

    smo.Fields.addField("Capacity",coDB.Kind.String,"cap","",coDB.StreamOn);
    smo.Fields.addField("Description",coDB.Kind.String,"des","",coDB.StreamOn);
    smo.Fields.addField("Price",coDB.Kind.Double,"price",0.0,coDB.StreamOn);
    smo.Fields.addField("Size",coDB.Kind.Int64,"size",0,coDB.StreamOn);

    smo.Fields.optionName=smo.Fields.MAP.Description;
    smo.Fields.optionValue=smo.Fields.MAP.Price;

    smo.Level1=smo.addItem();
    smo.Level2=smo.addItem();
    smo.Level3=smo.addItem();
    smo.Level4=smo.addItem();
    smo.Level5=smo.addItem();
    smo.Level6=smo.addItem();
    smo.Level7=smo.addItem();

    smo.setLevel=function(itmLevel,sCapacity,sDescription,dPrice,iSize){
      itmLevel.MAP.Capacity.Value=sCapacity;
      itmLevel.MAP.Description.Value=sDescription;
      itmLevel.MAP.Price.Value=dPrice;
      itmLevel.MAP.Size.Value=iSize;
    };

    smo.setLevel(smo.Level1,"28 MB","28 Megabytes",0.0,28*1000*1000);
    smo.setLevel(smo.Level2,"56 MB","56 Megabytes",0.50,56*1000*1000);
    smo.setLevel(smo.Level3,"128 MB","128 Megabytes",0.75,128*1000*1000);
    smo.setLevel(smo.Level4,"256 MB","256 Megabytes",1.00,256*1000*1000);
    smo.setLevel(smo.Level5,"512 MB","512 Megabytes",2.00,512*1000*1000);
    smo.setLevel(smo.Level6,"1 GB","1 Gigabyte",4.00,1*1000*1000*1000);
    smo.setLevel(smo.Level7,"2 GB","2 Gigabytes",8.00,2*1000*1000*1000);

    return smo;
  },
  createServerStorageOptions : function(){
    var sso=coDB.createCollection(coXML.Parser,"ssos","sso",coDB.HasItems,coDB.HasNoDisplays,coDB.ParseSync);
    sso.Fields.addField("Capacity",coDB.Kind.String,"cap","",coDB.StreamOn);
    sso.Fields.addField("Description",coDB.Kind.String,"des","",coDB.StreamOn);
    sso.Fields.addField("Glyph",coDB.Kind.String,"glyph","",coDB.StreamOn);
    sso.Fields.addField("Price",coDB.Kind.Double,"price",0.0,coDB.StreamOn);
    sso.Fields.addField("Size",coDB.Kind.Int64,"size",0,coDB.StreamOn);

    sso.Fields.optionName=sso.Fields.MAP.Description;
    sso.Fields.optionValue=sso.Fields.MAP.Price;

    sso.AuDisk1=sso.addItem();
    sso.AuDisk2=sso.addItem();
    sso.AuDisk3=sso.addItem();
    sso.AuDisk4=sso.addItem();
    sso.AuDisk5=sso.addItem();
    sso.AuDisk6=sso.addItem();
    sso.AuDisk7=sso.addItem();
    sso.AuDisk8=sso.addItem();
    sso.AuDisk9=sso.addItem();
    sso.AuDisk10=sso.addItem();
    sso.AuDisk11=sso.addItem();
    sso.AuDisk12=sso.addItem();
    sso.AuDisk13=sso.addItem();
    sso.AuDisk14=sso.addItem();

    sso.setLevel=function(itmLevel,sCapacity,sDescription,sGlyph,dPrice,iSize){
      itmLevel.MAP.Capacity.Value=sCapacity;
      itmLevel.MAP.Description.Value=sDescription;
      itmLevel.MAP.Glyph.Value=sGlyph;
      itmLevel.MAP.Price.Value=dPrice;
      itmLevel.MAP.Size.Value=iSize;
    };

    sso.setLevel(sso.AuDisk1,"4 GB","4 Gigabytes","/core/vdm/imgs/acct/auDisk1.png",0.0,4*1000*1000*1000);
    sso.setLevel(sso.AuDisk2,"8 GB","8 Gigabytes","/core/vdm/imgs/acct/auDisk1.png",1.00,8*1000*1000*1000);
    sso.setLevel(sso.AuDisk3,"10 GB","10 Gigabytes","/core/vdm/imgs/acct/auDisk2.png",1.25,10*1000*1000*1000);
    sso.setLevel(sso.AuDisk4,"12 GB","12 Gigabytes","/core/vdm/imgs/acct/auDisk2.png",1.50,12*1000*1000*1000);
    sso.setLevel(sso.AuDisk5,"16 GB","16 Gigabytes","/core/vdm/imgs/acct/auDisk3.png",2.00,16*1000*1000*1000);
    sso.setLevel(sso.AuDisk6,"32 GB","32 Gigabytes","/core/vdm/imgs/acct/auDisk3.png",3.20,32*1000*1000*1000);
    sso.setLevel(sso.AuDisk7,"64 GB","64 Gigabytes","/core/vdm/imgs/acct/auDisk4.png",5.12,64*1000*1000*1000);
    sso.setLevel(sso.AuDisk8,"128 GB","128 Gigabytes","/core/vdm/imgs/acct/auDisk4.png",10.24,128*1000*1000*1000);
    sso.setLevel(sso.AuDisk9,"256 GB","256 Gigabytes","/core/vdm/imgs/acct/auDisk5.png",15.36,256*1000*1000*1000);
    sso.setLevel(sso.AuDisk10,"512 GB","512 Gigabytes","/core/vdm/imgs/acct/auDisk5.png",25.60,512*1000*1000*1000);
    sso.setLevel(sso.AuDisk11,"750 GB","750 Gigabytes","/core/vdm/imgs/acct/auDisk6.png",30.00,750*1000*1000*1000);
    sso.setLevel(sso.AuDisk12,"1 TB","1 Terabyte","/core/vdm/imgs/acct/auDisk6.png",40.00,1*1000*1000*1000*1000);
    sso.setLevel(sso.AuDisk13,"2 TB","2 Terabytes","/core/vdm/imgs/acct/auDisk7.png",60.00,2*1000*1000*1000*1000);
    sso.setLevel(sso.AuDisk14,"3 TB","3 Terabytes","/core/vdm/imgs/acct/auDisk7.png",90.00,3*1000*1000*1000*1000);

    return sso;
  },
  Create : function(App){
    var act=coDB.Fields("account",coDB.HasNoCollection,coDB.HasNoItems);
    act.App=App;
    act.Commands=coNet.createCommands(coVDM.VDM.Net);
    act.Commands.Unit=this;
    act.Commands.Owner=act;
    act.Commands.onCmdError=function(netCMD){
      var cmds=netCMD.Commands;
      var act=cmds.Owner;
      if (cmds.Unit.debugToConsole==true)
        coVDM.VDM.Console.Append(
          "".concat(
          " coVDM.App.Components.coAccount.App.Components.DB.onCmdError",
          " ",netCMD.toString()
          )
        );
    };
    act.Commands.onCmdTimeOut=function(netCMD){
      var cmds=netCMD.Commands;
      var act=cmds.Owner;
      if (cmds.Unit.debugToConsole==true)
        coVDM.VDM.Console.Append(
          "".concat(
          " coVDM.App.Components.coAccount.App.Components.DB.onCmdTimeOut",
          " ",netCMD.toString()
          )
        );
    };
    act.Commands.onCmdReadComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var act=cmds.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,act.Stanza,xDoc.documentElement);
        act.updateXML(xDoc,xItem);
        if ((act.MAP.Contact.Value==0) && (coContacts.App.Screen.Me!=null)){
          act.MAP.Contact.Value=coContacts.App.Screen.Me.MAP.ID.Value;
          act.Commands.SetContact(act);
        };

      };
    };
    act.Commands.onCmdWriteComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var act=cmds.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,act.Stanza,xDoc.documentElement);
        act.updateXML(xDoc,xItem);
      };
    };
    act.Commands.onCmdDiskUseComplete=function(netCMD){
      var cmds=netCMD.Commands;
      var act=cmds.Owner;
      if (netCMD.Code==coNet.CO_STATUS_OK){
        var xDoc=netCMD.dataRecv;
        var xItem=coXML.getStanza(xDoc,act.Stanza,xDoc.documentElement);
        act.updateXML(xDoc,xItem);
      };
    };
    act.Commands.Read=function(){
      var cmds=this;
      var act=cmds.Owner;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.App.Components.coAccount.NameSpace,
        coVDM.App.Components.coAccount.NS_ACCT_READ,
        coNet.NoData,
        cmds.onCmdReadComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Secure=true;
      netCMD.Commands=cmds;
      return netCMD;
    };
    act.Commands.Write=function(){
      var cmds=this;
      var act=cmds.Owner;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.App.Components.coAccount.NameSpace,
        coVDM.App.Components.coAccount.NS_ACCT_WRITE,
        coXML.Header+act.toXML(),
        cmds.onCmdWriteComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Secure=true;
      netCMD.Commands=cmds;
      return netCMD;
    };
    act.Commands.SetContact=function(){
      var cmds=this;
      var act=cmds.Owner;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.App.Components.coAccount.NameSpace,
        coVDM.App.Components.coAccount.NS_ACCT_SET_CONTACT,
        coXML.Header+act.toXML(),
        cmds.onCmdWriteComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      netCMD.Secure=true;
      netCMD.Commands=cmds;
      return netCMD;
    };
    act.Commands.DiskUsage=function(){
      var cmds=this;
      var act=cmds.Owner;
      var netCMD=cmds.createCommand(
        coVDM.VDM.Net,
        coVDM.App.Components.coAccount.NameSpace,
        coVDM.App.Components.coAccount.NS_ACCT_DISK_USE,
        coNet.NoData,
        cmds.onCmdDiskUseComplete,
        cmds.onCmdError,
        cmds.onCmdTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete,
        coNet.AutoLoadOff
      );
      //netCMD.Secure=true;
      netCMD.Commands=cmds;
      return netCMD;
    };
    act.Owner=App;
    act.Unit=this;
    act.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    act.addField("DomainID",coDB.Kind.QWord,"did",0,coDB.StreamOn);
    act.addField("Kind",coDB.Kind.Integer,"kind",0,coDB.StreamOn);
    act.addField("User",coDB.Kind.String,"usrn","",coDB.StreamOn);
    act.addField("First",coDB.Kind.String,"fname","",coDB.StreamOn);
    act.addField("Last",coDB.Kind.String,"lname","",coDB.StreamOn);
    act.addField("Telephone",coDB.Kind.String,"tel","",coDB.StreamOn);
    act.addField("Password",coDB.Kind.String,"pwd","",coDB.StreamOn);
    act.addField("Forward",coDB.Kind.String,"fwe","",coDB.StreamOn);
    act.addField("Auth",coDB.Kind.String,"auth","",coDB.StreamOn);
    act.addField("LastAccessed",coDB.Kind.Double,"lsta",0.0,coDB.StreamOn);
    act.addField("LastQuotaEnforce",coDB.Kind.Double,"lqe",0.0,coDB.StreamOn);
    act.addField("LastMessage",coDB.Kind.Integer,"lstm",0,coDB.StreamOn);
    act.addField("FirstIP",coDB.Kind.QWord,"fip",0,coDB.StreamOn);
    act.addField("LastIP",coDB.Kind.QWord,"lip",0,coDB.StreamOn);
    act.addField("Quota",coDB.Kind.QWord,"qta",0,coDB.StreamOn);
    act.addField("Consumption",coDB.Kind.QWord,"cspn",0,coDB.StreamOn);
    act.addField("Throttle",coDB.Kind.QWord,"trtl",0,coDB.StreamOn);
    act.addField("Forwarding",coDB.Kind.Boolean,"smf",false,coDB.StreamOn);
    act.addField("Filtering",coDB.Kind.Boolean,"spf",false,coDB.StreamOn);
    act.addField("Enabled",coDB.Kind.Boolean,"end",true,coDB.StreamOn);
    act.addField("LockOutCount",coDB.Kind.Integer,"loc",0,coDB.StreamOn);
    act.addField("Trash",coDB.Kind.QWord,"trsh",0,coDB.StreamOn);
    act.addField("Inbox",coDB.Kind.QWord,"ibox",0,coDB.StreamOn);
    act.addField("Trashbox",coDB.Kind.QWord,"tbox",0,coDB.StreamOn);
    act.addField("Attachments",coDB.Kind.QWord,"match",0,coDB.StreamOn);
    act.addField("Devices",coDB.Kind.QWord,"devcs",0,coDB.StreamOn);
    act.addField("Contact",coDB.Kind.QWord,"cid",0,coDB.StreamOn);
    act.addField("CoreObjectACL",coDB.Kind.Int64Array,"coACL",coList.Int64Array(),coDB.StreamOn);
    act.addField("CoreCommandACL",coDB.Kind.Int64Array,"ccACL",coList.Int64Array(),coDB.StreamOn);

    act.ServerMemory=this.createServerMemoryOptions();
    act.ServerStorage=this.createServerStorageOptions();
    act.onLoaded=function(flds){
      flds.Display.Slides.Usage.Synchronize(flds);
    };
    return act;
  }
};

