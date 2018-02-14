coVDM.App.Components.Manifest = {
  Version        : new Version(2014,10,31,9),
  Title          : new Title("VDM Manifest","Manifest"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/Manifest.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(vdm){
    if (coVDM.Manifest) return coVDM.Manifest;
    var _mfst=coDB.Fields("manifest",coDB.HasNoCollection,coDB.HasNoItems);
    _mfst.Unit=this;
    _mfst.VDM=vdm;
    _mfst.Modified=false;
    _mfst.addField("ID",coDB.Kind.Int64,"id",0,true,coDB.StreamOn);
    _mfst.addField("Modified",coDB.Kind.Double,"modified",0.0,coDB.StreamOn);
    _mfst.addField("Data",coDB.Kind.Fields,"data",coDB.Fields("data",coDB.HasNoCollection,coDB.HasNoItems),coDB.StreamOn);


    _mfst.WriteTimer=coApp.Timers.createItem(coVDM.TimerIntervalManifest);
    _mfst.WriteTimer.Manifest=_mfst;
    _mfst.WriteTimer.onExecute=function(){
      var tmr=this;
      var mfst=tmr.Manifest;
      if (mfst.MAP.Modified.Value!=0) {
        mfst._cmdWrite.dataSend=coXML.Header+mfst.toXML();
        mfst._cmdWrite.reTry();
        mfst.Modified.Value=0;
      };
      tmr.setActive(false);
    };

    _mfst.ReadTimer=coApp.Timers.createItem(coVDM.TimerIntervalManifest);
    _mfst.ReadTimer.Manifest=_mfst;
    _mfst.ReadTimer.onExecute=function(){
      var tmr=this;
      var mfst=tmr.Manifest;
      mfst._cmdRead.Headers.Update(coNet.fieldRCID,coVDM.Credentials.ResourceID);
      mfst._cmdRead.reTry();
      tmr.setActive(false);
    };

    _mfst.addEntry=function(Name,Tag,onUpdated) {
      var mfst=this;
      var Data=mfst.MAP.Data.Value;
      var flds=coDB.Fields(Tag,coDB.HasNoCollection,coDB.HasNoItems);
      var dbItem=Data.addField(Name,coDB.Kind.Fields,Tag,flds,coDB.StreamOn);
      flds.onLoaded=onUpdated;
      return flds;
    };
    _mfst.Save=function(){
      var mfst=this;
      if (mfst.Loaded==false) return;
      mfst.MAP.Modified.Value=new Date().setMilliseconds(0);
      mfst.WriteTimer.setActive(true);
    };
    _mfst.VDM=vdm;
    _mfst.onReadComplete=function(netCMD){
      var mfst=netCMD.Owner;
      var xDoc = netCMD.dataRecv;
      var xMfst=xDoc.documentElement;
      mfst.fromXML(xDoc,xMfst);
    };
    _mfst.onWriteComplete=function(netCMD){
    };
    _mfst.onError=function(){
    };
    _mfst.onTimeOut=function(){
    };
    _mfst._cmdRead=vdm.Net.Commands.createCommand(
        vdm.Net,
        coVDM.NameSpace,
        coVDM.NS_MFST_READ,
        coNet.NoData,
        _mfst.onReadComplete,
        _mfst.onError,
        _mfst.onTimeOut,
        coNet.NoProgress,
        coNet.CreateSuspended,
        coNet.LingerOnComplete,
        coNet.AutoLoadOff
    );
    _mfst._cmdRead.Owner=_mfst;
    _mfst._cmdWrite=vdm.Net.Commands.createCommand(
        vdm.Net,
        coVDM.NameSpace,
        coVDM.NS_MFST_WRITE,
        coNet.NoData,
        _mfst.onWriteComplete,
        _mfst.onError,
        _mfst.onTimeOut,
        coNet.NoProgress,
        coNet.CreateSuspended,
        coNet.LingerOnComplete
    );
    _mfst._cmdWrite.Owner=_mfst;
    _mfst.Read=function(){
      var mfst=this;
      mfst.ReadTimer.setActive(true);
    };
    _mfst.onFree=function(){
      var mfst=this;
      mfst._cmdWrite.Free();
      mfst._cmdRead.Free();
      return null;
    };
    return _mfst;
  }
};
coVDM.VDM.Manifest  = coVDM.Manifest  = coVDM.App.Components.Manifest.Create(coVDM.VDM);
