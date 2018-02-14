coVDM.App.Components.Events = {
  Version        : new Version(2014,8,13,32),
  Title          : new Title("VDM Core Events","Events"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/Events.js',coAppKit.PreLoaded),
  debugToConsole : false,
  init : function(_vdm){

    coVDM.Events.BeforeUnload=coEvents.Add(
      window,
      "beforeunload",
      function(e){
        return coVDM.VDM.onBeforeUnload(e);
      },
      coEvents.Capture,
      coEvents.NoActivate
    );
    coVDM.Events.MozOrientation=coEvents.Add(
      window,
      "MozOrientation",
      function() {
        coVDM.VDM.Resize();
      },
      coEvents.NoCapture,
      coEvents.Active
    );
    coVDM.Events.OrientationChange=coEvents.Add(
      window,
      "orientationchange",
      function() {
        coVDM.VDM.Resize();
      },
      coEvents.NoCapture,
      coEvents.Active
    );
    coVDM.Events.WorkSpaceScrolled=coEvents.Add(
      coVDM.VDM.WorkSpace.Client,
      "scroll",
      function() {
        coVDM.Events.WorkSpaceScrolled.setActive(false);
        if (coVDM.VDM.WorkSpace.Client.scrollTop!=0)
          coVDM.VDM.WorkSpace.Client.scrollTop=0;
        coVDM.Events.WorkSpaceScrolled.setActive(true);
      },
      coEvents.NoCapture,
      coEvents.Active
    );
    coVDM.Events.Resize=coEvents.Add(
      window,
      "resize",
      function(e) {
        coVDM.VDM.Resize();
      },
      coEvents.NoCapture,
      coEvents.Active
    );
    coVDM.Events.MozScrolledAreaChanged=coEvents.Add(
      document,
      "MozScrolledAreaChanged",
      function() {
        coVDM.VDM.Resize();
      },
      coEvents.NoCapture,
      coEvents.Active
    );
    coVDM.Events.TouchMove=coEvents.Add(document,"touchmove",
      function(e){
        if (coVDM.App.Components.Events.debugToConsole==true)
          coVDM.Console.Append("document.body.touchmove");

        if (e==undefined) e=window.event;
        var elm=coDOM.srcElement(e);
        var srcEL = elm.EventList;
        var srcEv = (srcEL) ? srcEL.findType('touchstart') : null ;

        if (coVDM.App.Components.Events.debugToConsole==true) {
          var sLog="document.touchmove ";
          sLog+=" elmTagName="+elm.tagName;
          sLog+=" elmClassName="+elm.className;
          sLog+=" elmID="+elm.id;
          if (srcEL)
            sLog+=" elm.length=" + srcEL.length;
          coVDM.Console.Append(sLog);
        };
        if (elm==coVDM.VDM.WorkSpace.Client)
          coDOM.preventDefault(e);
      },
      coEvents.NoCapture,
      coEvents.NoActivate
    );
    coVDM.Events.TouchStart=coEvents.Add(document.body, "touchstart",
      function(e){
        if (coVDM.App.Components.Events.debugToConsole==true)
          coVDM.Console.Append("document.body.touchstart");
        var elm=(e.srcElement) ? e.srcElement : e.target;
        var srcEL = elm.EventList;
        var srcEv = (srcEL) ? srcEL.findType('touchstart') : null ;
        if (coVDM.App.Components.Events.debugToConsole==true) {
          var sLog="document.body.touchstart ";
          sLog+="srcTagName="+elm.tagName;
          sLog+="targetTagName="+e.target.tagName;
          sLog+="target="+e.target.id;
          sLog+="src="+elm.id;
          if (srcEv) sLog+="srcEv found";
          if (srcEL) sLog+="srcEL.length=" + srcEL.length;
          coVDM.Console.Append(sLog);
        };
        if (srcEv) {
          if (coVDM.App.Components.Events.debugToConsole==true)
            coVDM.VDM.Console.Append("document.touchstart srcEv.Type="+srcEv.Type);
        };
      },
      coEvents.NoCapture,
      coEvents.NoActivate
    );
  }
};

