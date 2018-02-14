coVDM.App.Components.Status = {
  Version        : new Version(2013,12,10,24),
  Title          : new Title("VDM Core Status","Status"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/vdm/Status.js',coAppKit.PreLoaded),
  debugToConsole : true,
  yOffset        : 15,
  VDM            : null,
  Create:function(vdm){
    var sm=coObject.Create();
    sm.Unit=this;
    sm.Parent=vdm.WorkSpace.Container;
    sm.Owner=vdm.WorkSpace;
    sm.Timer=0;
    sm.toShow=0;
    sm.Container=document.createElement('div');
    sm.Parent.appendChild(sm.Container);
    sm.Container.className="statusBox";
    sm.Message=document.createElement('div');
    sm.Container.appendChild(sm.Message);
    sm.Message.className="statusMessage";

    sm.Show=function(sMsg,Screen,elm){
      var sm=this;
      if (sm.toShow!=0) clearTimeout(sm.toShow);
      sm.toShow=setTimeout(
        function(){
          sm.doShow(sMsg,Screen,elm);
        },
        2000
      );
    };
    sm.doShow=function(sMsg,Screen,elm){
      var sm=this;
      if (sMsg==undefined) sMsg="";
      if (Screen==undefined) Screen=null;
      if (elm==undefined) elm=null;
      if ( (elm) && (elm.nodeName==undefined)) elm=elm.Container;

      sm.Visible=true;
      sm.Container.style.display="block";
      sm.Container.style.opacity=0;
      coDOM.setText(sm.Message,sMsg);
      sm.Container.style.zIndex=coVDM.VDM.Screens.zIndex()+coVDM.zFactorStatus;
      if (coVDM.VDM.Display.Small==true) {
        sm.Container.style.top="0px";
        sm.Container.style.left="";
        sm.Container.style.right="0px";
        sm.Container.style.bottom="";
      } else {
        if (elm){
          sm.Container.style.top="";
          sm.Container.style.left="";
          sm.Container.style.right="";
          sm.Container.style.bottom="";

          var iLeft=Screen.ClientToScreenX(elm);
          var iSMC=coMath.Div(sm.Container.offsetWidth,2);
          var iEMC=coMath.Div(elm.offsetWidth,2);
          var iEML=iLeft+iEMC;
          var iSML=iEML-iSMC;
          var iTop=Screen.ClientToScreenY(elm);
          iTop-=(sm.Container.offsetHeight+coVDM.App.Components.Status.yOffset);

          sm.Container.style.left=iSML+"px";
          sm.Container.style.top=iTop+"px";

        } else {
          sm.Container.style.bottom="";
          sm.Container.style.left="";

          sm.Container.style.right="4px";
          sm.Container.style.top="4px";
        };
      };
      sm.Container.style.opacity=1;
      if (sm.Timer!=0)
        clearTimeout(sm.Timer);
      sm.Timer=setTimeout( function(){sm.Hide(); clearTimeout(sm.Timer); sm.Timer=0;},coVDM.StatusMessageDelay);
    };
    sm.Hide=function(){
      var sm=this;
      sm.Container.style.display="none";
      sm.Visible=false;
    };
    sm.Free=function(){
      var sm=this;
      sm.Container.removeChild(sm.Message);
      sm.Parent.removeChild(sm.Container);
      sm=coObject.Release();
      return null;
    };
    return sm;
  }
};

