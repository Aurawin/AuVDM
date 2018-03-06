var coDragDrop={
  Version        : new Version(2014,9,18,34),
  Title          : new Title("Core Object Drag And Drop Framework","coDragDrop"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  List           : new Array(),
  debugToConsole : false,
  Locked         : false,
  Active         : false,
  NoBlurb        : "",
  NoTarget       : null,
  actionStatic   : 0,
  actionDynamic  : 1,
  createAction : function(Owner,srcIcon,sBlurb,sTarget,Item,Action){
    act=coObject.Create();
    act.Owner=Owner;
    act.srcIcon=srcIcon;
    act.Blurb=sBlurb;
    act.Target=sTarget;
    act.Item=Item;
    act.Count=1;
    act.Action=Action;
    act.defaultAction=Action;
    act.getStatus=function(action){
      var act=this;
      if (action==undefined) action=coDragDrop.actionStatic;
      var str=coLang.Table.DragDrop.Action.Status;
      str=str.replace("$Action",act.Action[action]);
      str=str.replace("$Count",act.Count);
      str=str.replace("$Items",act.Item);
      if (act.Target)
        str+=" ".concat(coLang.Table.DragDrop.Action.Target.replace("$Target",act.Target));
      return str;
    };
    act.Free=function(){
      var act=this;
      act=coObject.Release(act);
      return null;
    };
    return act;
  },
  createInfo : function(View,srcIcon,sBlurb,sTarget,Item,Action,onStarted,onAccepted,onRejected,onCanceled,onCommited){
    if (onStarted==undefined) onStarted=null;
    if (onAccepted==undefined) onAccepted=null;
    if (onRejected==undefined) onRejected=null;
    if (onCanceled==undefined) onCanceled=null;
    if (onCommited==undefined) onCommited=null;
    inf=coObject.Create();
    coDragDrop.List.push(inf);
    inf.Visible=false;
    inf.Accepted=false;
    inf.Active=false;
    inf.Class="dndInfo";
    inf.Target=null;
    inf.Source=null;
    inf.View=View;
    inf.staleIcon=false;
    inf.srcIcon=srcIcon;
    inf.Mouse=new MouseInfo();
    inf.Touch=new TouchInfo();
    inf.Action=coDragDrop.createAction(inf,srcIcon,sBlurb,sTarget,Item,Action);

    inf.onStarted=onStarted;
    inf.onAccepted=onAccepted;
    inf.onRejected=onRejected;
    inf.onCanceled=onCanceled;
    inf.onCommited=onCommited;

    inf.Container=document.createElement('div');
    inf.Parent=coVDM.VDM.WorkSpace.Client;
    inf.Parent.appendChild(inf.Container);
    inf.Container.className=inf.Class;

    inf.Client=document.createElement('div');
    inf.Container.appendChild(inf.Client);
    inf.Client.className=inf.Class+"Client";

    inf.Icon=document.createElement('div');
    inf.Client.appendChild(inf.Icon);
    inf.Icon.className=inf.Class+"Ico";
    inf.Icon.backgroundImage="url("+srcIcon+")";
    inf.Icon.Owner=inf;

    inf.Wrapper=document.createElement('div');
    inf.Client.appendChild(inf.Wrapper);
    inf.Wrapper.className=inf.Class+"Wrapper";

    inf.Blurb=document.createElement('div');
    inf.Wrapper.appendChild(inf.Blurb);
    inf.Blurb.className=inf.Class+"Blurb";
    coDOM.setText(inf.Blurb,sBlurb);

    inf.Status=document.createElement('div');
    inf.Wrapper.appendChild(inf.Status);
    inf.Status.className=inf.Class+"Status";
    coDOM.setText(inf.Status,inf.Action.getStatus(coDragDrop.actionStatic));

    inf.Bias=new Point();

    inf.Invoke=function(Source,iX,iY){
      var inf=this;
      inf.Bias.X=coVDM.dragItemSpacing;
      inf.Bias.Y=coMath.Div(inf.Container.offsetHeight,2);
      inf.Source=Source;
      if (inf.onStarted) inf.onStarted(inf);
      inf.setPosition(iX,iY);
      inf.Show();
    };
    inf.setPosition=function(iX,iY){
      var inf=this;
      var iBias=inf.Bias.X+inf.Bias.Y;
      iX+=inf.Bias.X;
      iY-=inf.Bias.Y;

      if (iX<inf.Bias.X) iX=inf.Bias.X;
      if (iY<inf.Bias.Y) iY=inf.Bias.Y;

      if (iX>coVDM.VDM.WorkSpace.Size.Width-iBias)
        iX=(coVDM.VDM.WorkSpace.Size.Width-iBias);
      if (iY>coVDM.VDM.WorkSpace.Size.Height-iBias)
        iY=(coVDM.VDM.WorkSpace.Size.Height-iBias);
      inf.Container.style.top=iY+"px";
      inf.Container.style.left=iX+"px";
    };
    inf.resetIcon=function(){
      var inf=this;
      if (inf.urlIcon!=inf.Action.srcIcon){
        inf.urlIcon=inf.Action.srcIcon;
        inf.Icon.style.backgroundImage="url("+inf.urlIcon+")";
      };
      inf.staleIcon=false;
    };
    inf.resetAction=function(){
      var inf=this;
      inf.Action.Target="";
      inf.setAction(inf.Action.defaultAction);
    };
    inf.setIcon=function(srcIcon){
      var inf=this;
      inf.staleIcon=(inf.urlIcon!=srcIcon);
      if (inf.staleIcon==true){
        inf.urlIcon=srcIcon;
        inf.Icon.style.backgroundImage="url("+srcIcon+")";
      };
    };
    inf.setAction=function(Action){
      var inf=this;
      inf.Action.Action=Action;
      coDOM.setText(inf.Status,inf.Action.getStatus(coDragDrop.actionStatic));
    };
    inf.setInfo=function(srcIcon,sBlurb,sTarget,Item,Action){
      var inf=this;
      inf.Action.srcIcon=srcIcon;
      inf.Action.Blurb=sBlurb;
      inf.Action.Target=sTarget;
      inf.Action.Item=Item;
      inf.Action.Action=Action;
      coDOM.setText(inf.Blurb,sBlurb);
      coDOM.setText(inf.Status,inf.Action.getStatus(coDragDrop.actionStatic));
    };
    inf.Show=function(){
      coDragDrop.Active=true;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coDragDrop.inf.Show");
      var inf=this;
      inf.Visible=true;
      inf.Container.style.display="block";
      inf.Container.style.zIndex=coVDM.VDM.Screens.zIndex()+coVDM.zFactorDragDrop;
      inf.Icon.style.backgroundImage="url("+inf.Action.srcIcon+")";
      inf.Container.style.visibility="visible";
      inf.Client.style.visibility="visible";
      inf.Icon.style.visibility="visible";
      inf.Wrapper.style.visibility="visible";
      inf.Blurb.style.visibility="visible";
      inf.Status.style.visibility="visible";

      coDOM.setText(inf.Blurb,inf.Action.Blurb);
      coDOM.setText(inf.Status,inf.Action.getStatus(coDragDrop.actionStatic));
      inf.Active=true;
      inf.Accepted=false;
      inf.Target=null;

      if (coVDM.VDM.Browser.Mouse==true){
        if (coDragDrop.debugToConsole==true)
          coVDM.VDM.Console.Append("coDragDrop.inf.Show (Activating Mouse Events)");
        inf.evtMouseDown.setActive(true);
        inf.evtMouseUp.setActive(true);
        inf.evtMouseMove.setActive(true);
      };
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coDragDrop.inf.Show (Activating Touch Events)");
      inf.evtTouchStart.setActive(true);
      inf.evtTouchEnd.setActive(true);
      inf.evtTouchMove.setActive(true);

      if (coDragDrop.debugToConsole==true) coVDM.VDM.Console.Append("coDragDrop.inf.Show (Done)");
    };
    inf.Hide=function(){
      coDragDrop.Active=false;
      var inf=this;
      if (inf.Visible==false) return;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coDragDrop.inf.Hide");

      inf.Visible=false;
      inf.Active=false;
      inf.Target=null;
      inf.Source=null;
      inf.Container.style.visibility="hidden";
      inf.Client.style.visibility="hidden";
      inf.Icon.style.visibility="hidden";
      inf.Wrapper.style.visibility="hidden";
      inf.Blurb.style.visibility="hidden";
      inf.Status.style.visibility="hidden";
      inf.Container.style.display="none";

      if (coVDM.VDM.Browser.Mouse==true){
        inf.evtMouseDown.setActive(false);
        inf.evtMouseUp.setActive(false);
        inf.evtMouseMove.setActive(false);
      };
      inf.evtTouchStart.setActive(false);
      inf.evtTouchMove.setActive(false);
      inf.evtTouchEnd.setActive(false);

      inf.Mouse.Done();
      inf.Touch.Done();
    };
    inf.doMouseDown=function(e){
      if (e==undefined) e=window.event;
      var inf=this;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coDragDrop.inf.doMouseDown");
      try {
        if (inf.onCanceled) inf.onCanceled(inf);
      } catch(err) {
        coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doMouseDown.onCanceled "+err);
      };
      inf.Hide();
      coDOM.preventDefault(e);
    };
    inf.doTouchStart=function(e){
      if (e==undefined) e=window.event;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coDragDrop.inf.doTouchStart (enter)");
      var inf=this;
      try {
        if (inf.onCanceled) inf.onCanceled(inf);
      } catch(err){
        coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doTouchStart.onCanceled "+err);
      };
      inf.Hide();
      coDOM.preventDefault(e);
    };
    inf.doMouseMove=function(e){
      if (e==undefined) e=window.event;
      var inf=this;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coDragDrop.inf.doMouseMove");
      inf.Mouse.Update(e);
      var Target=coDOM.targetElement(e);

      if (!inf.Source) {
        inf.Hide();
      } else if ( (Target) && (Target.Owner) && (Target.Owner.onDragQuery)){
        if (Target!=inf.Target) {
          inf.Target=Target.Owner;
          try{
            Target.Owner.onDragQuery(inf);
          } catch(err){
            coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doMouseMove.onDragQuery "+err);
          };
          if (inf.Accepted==true) {
            try{
              if (inf.onAccepted) inf.onAccepted(inf);
            } catch(err){
              coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doMouseMove.onAccepted "+err);
            };
          } else {
            inf.resetIcon();
            inf.resetAction();
          };
          inf.Accepted=false;
          inf.Target=null;
        };
      } else if (inf.staleIcon==true) {
        inf.Target=null;
        inf.resetIcon();
        inf.resetAction();
      } else {
        inf.staleIcon=true;
      };
      inf.setPosition(e.pageX,e.pageY);
      coDOM.preventDefault(e);
    };
    inf.doTouchMove=function(e){
      if (e==undefined) e=window.event;
      var inf=this;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coDragDrop.inf.doTouchMove (enter)");
      var touch=e.targetTouches[e.targetTouches.length-1];
      inf.Touch.Update(touch);
      if (inf.Bias.X!=coVDM.dragItemSpacingTouch);
        inf.Bias.X=coVDM.dragItemSpacingTouch;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("dragInfo.doTouchMove (getting touch)");
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("dragInfo.doTouchMove (gettting Target)");
      var Target=document.elementFromPoint(touch.pageX,touch.pageY);
      if (coDragDrop.Locked==true) {
        if (coDragDrop.debugToConsole==true)
          coVDM.VDM.Console.Append("dragInfo.doTouchMove (locked)");
      } else if ( (Target) && (Target.Owner) && (Target.Owner.onDragQuery)){
        if (coDragDrop.debugToConsole==true)
          coVDM.VDM.Console.Append("dragInfo.doTouchMove (Target)");
        inf.Target=Target.Owner;
        Target.Owner.onDragQuery(inf);
        if (inf.Accepted==true){
          try{
            if (inf.onAccepted) inf.onAccepted(inf);
          } catch(err){
            coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doTouchMove.onAccepted "+err);
          };
        };
        inf.Accepted=false;
        inf.Target=null;
      } else if (inf.staleIcon==true) {
        inf.resetIcon();
        inf.resetAction();
      } else {
        if (coDragDrop.debugToConsole==true)
          coVDM.VDM.Console.Append("dragInfo.doTouchMove (no Target)"+Target.className);
      };
      inf.setPosition(touch.pageX,touch.pageY);
      inf.evtMouseMove.setActive(false);
      coDOM.preventDefault(e);
    };
    inf.doMouseUp=function(e){
      if (coDragDrop.Active==true) {
        if (e==undefined) e=window.event;
        if (coDragDrop.debugToConsole==true)
          coVDM.VDM.Console.Append("coDragDrop.inf.doMouseUp");
        var inf=this;
        var Target=coDOM.targetElement(e);
        if ((inf.Source) && (Target) && (Target.Owner) && (Target.Owner.onDragQuery)){
          inf.Target=Target.Owner;
          Target.Owner.onDragQuery(inf);
          if (inf.Accepted==true){
            coDOM.setText(inf.Status,inf.Action.getStatus(coDragDrop.actionDynamic));
            try{
              if (inf.onAccepted) inf.onAccepted(inf);
              if (inf.onCommited) inf.onCommited(inf);
            } catch(err){
              coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doMouseUp.onAccepted "+err);
            };
          };
          inf.Accepted=false;
          inf.Target=null;

        } else {
          try {
            if (inf.onCanceled) inf.onCanceled(inf);
          } catch(err){
            coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doMouseUp.onCanceled "+err);
          };
        };
        inf.evtMouseUp.setActive(false);
        inf.Mouse.Done(e);
        inf.Hide();
        coDragDrop.Locked=false;
      };
    };
    inf.doTouchEnd=function(e){
      if (e==undefined) e=window.event;
      //coDOM.preventDefault(e);
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("dragInfo.doTouchEnd (enter)");
      var inf=this;
      var touch=e.targetTouches[e.targetTouches.length-1];
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("dragInfo.doTouchEnd (touch)");
      inf.Touch.Done(touch);
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("dragInfo.doTouchEnd.Touch.Done");
      var Target=document.elementFromPoint(inf.Touch.ptCurrent.X,inf.Touch.ptCurrent.Y);
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("dragInfo.doTouchEnd (Target)");
      if ((inf.Source) && (Target) && (Target.Owner) && (Target.Owner.onDragQuery)){
        if (coDragDrop.debugToConsole==true)
          coVDM.VDM.Console.Append("dragInfo.doTouchEnd.onDragQuery (Target)");
        inf.Target=Target.Owner;
        try {
          Target.Owner.onDragQuery(inf);
        } catch(err){
          coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doTouchEnd.onDragQuery "+err);
        };
        if (inf.Accepted==true){
          try{
            if (inf.onAccepted) inf.onAccepted(inf);
            if (inf.onCommited) inf.onCommited(inf);
          } catch (err){
            coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doTouchEnd.onAccepted "+err);
          };
        };
        inf.Accepted=false;
        inf.Target=null;
      } else {
        if (coDragDrop.debugToConsole==true)
          coVDM.VDM.Console.Append("dragInfo.doTouchEnd (Canceled)");
        try{
          if (inf.onCanceled) inf.onCanceled(inf);
        } catch(err){
          coVDM.VDM.Console.Append("Exception: coDragDrop.inf.doTouchEnd.onCanceled "+err);
        };
      };
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("dragInfo.doTouchEnd (Hide)");
      inf.Hide();
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("dragInfo.doTouchEnd (Done)");
    };
    var _inf=inf;
    if (coVDM.VDM.Browser.Mouse==true){
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coDragDrop.inf Creating Mouse Events");
      inf.evtMouseDown=coEvents.Add(window,"mousedown",function(e){var inf=_inf; inf.doMouseDown(e);},coEvents.Capture,coEvents.NoActivate);
      inf.evtMouseMove=coEvents.Add(window,"mousemove",function(e){var inf=_inf; inf.doMouseMove(e);},coEvents.NoCapture,coEvents.NoActivate);
      inf.evtMouseUp=coEvents.Add(window,"mouseup",function(e){var inf=_inf; inf.doMouseUp(e);},coEvents.Capture,coEvents.NoActivate);
    };
    inf.evtTouchStart=coEvents.Add(window,"touchstart",function(e){var inf=_inf; inf.doTouchStart(e);},coEvents.Capture,coEvents.NoActivate);
    inf.evtTouchMove=coEvents.Add(window,"touchmove",function(e){var inf=_inf; inf.doTouchMove(e);},coEvents.NoCapture,coEvents.NoActivate);
    inf.evtTouchEnd=coEvents.Add(window,"touchend",function(e){var inf=_inf; inf.doTouchEnd(e);},coEvents.NoCapture,coEvents.NoActivate);

    inf.Free=function(){
      var inf=this;
      var idx=coDragDrop.List.indexOf(inf);
      if (idx!=-1) coDragDrop.List.splice(idx,1);
      if (coVDM.VDM.Broswer.Mouse=true){
        inf.evtMouseMove.Free();
        inf.evtMouseUp.Free();
        inf.evtMouseDown.Free();
      };
      inf.evtTouchStart.Free();
      inf.evtTouchEnd.Free();
      inf.evtTouchMove.Free();

      inf.Wrapper.removeChild(inf.Blurb);
      inf.Wrapper.removeChild(inf.Status);
      inf.Client.removeChild(inf.Icon);
      inf.Client.removeChild(inf.Wrapper);
      inf.Container.removeChild(inf.Client);
      inf.Parent.removeChild(inf.Container);

      inf=coObject.Release(inf);
      return null;
    };
    return inf;
  }

};
