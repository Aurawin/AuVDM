coAppUI.App.Components.PageView = {
  Version        : new Version(2014,10,10,22),
  Title          : new Title("Aurawin Page View","PageView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/PageView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Default;
    var _vw=Slides.createSlide(sName,sClass+" PageView",Screen,Owner,Parent,Align);
    _vw.clearContainerClass();

    _vw.Client=document.createElement('div');
    _vw.Container.appendChild(_vw.Client);
    _vw.Client.className=sClass+"Client PageViewClient";

    //if (typeof(coCMS)!="undefined")
    //  _vw.CMS=coAppUI.App.Components.CMS.createTools(_vw,_vw.Client,"PageView");


    _vw.Content=document.createElement('div');
    _vw.Client.appendChild(_vw.Content);
    _vw.Content.className=sClass+"Content PageViewContent";

    _vw._url="";
    _vw.onLoaded=null;
    _vw.Sending=false;
    _vw.Socket=null;
    _vw.dtOpened=null;

    _vw.Connecting=false;

    _vw.getURL=function(){
      var vw=this;
      return vw._url;
    };
    _vw.doError=function(){
      var vw=this;
    };
    _vw.setClientPosition=function(aPosition){
      var vw=this;
      vw.Content.style.position=aPosition;
    };
    _vw.doSetSize=function(){
      this.Client.style.height=(this.Container.clientHeight-this.Client.offsetTop)+"px";
      this.Client.style.width=this.Container.clientWidth+"px";
    };
    _vw.ConsealImages=function(){
      var vw=this;
      coDOM.ConsealImages(vw.Client);
    };
    _vw.setURL=function(sURL){
      var vw=this;
      vw.Connecting=true;
      vw.Socket=new XMLHttpRequest();
      vw.Socket.Owner=vw;
      vw.Socket.open("GET",sURL,coNet.NET_ASYNC);
      vw.Socket.onerror=function(){
        var Socket=this;
        var vw=Socket.Owner;
        vw.Code=Socket.status;
        vw.doError();
        vw.Socket=null;
      };
      vw.Socket.onreadystatechange=function(){
        var Socket=this;
        var vw=Socket.Owner;
        switch (Socket.readyState) {
          case (1,2): //server connection established
            vw.dtOpened=new Date().setMilliseconds(0);
            vw.Connected=true;
            vw.Connecting=false;
            vw.Sending=true;
            break;
          case 4: // request finished and response is ready
            vw.Sending=false;
            if ((Socket.status==200) || (Socket.status==417)) {
              vw.Content.innerHTML=Socket.responseText;
              vw.Socket=null;
              if (vw.onLoaded) vw.onLoaded(vw);
            } else {
              vw.Code=Socket.status;
              vw.doError();
              vw.Socket=null;
            };
            break;
        };
      };
      vw.Socket.send();
    };
    _vw._Free=_vw.Free;
    _vw.Free=function(){
      var vw=this;
      var idx=coAppUI.PageViews.indexOf(vw);
      if (idx!=-1) coAppUI.PageViews.splice(idx,1);
      //if (vw.CMS) vw.CMS.Free();
      vw.Client.removeChild(vw.Content);
      vw.Container.removeChhild(vw.Client);
      vw._Free();
    };
    _vw.Class=sClass;
    _vw.Selected=null;
    coAppUI.PageViews.push(_vw);
    return _vw;
  }
}
