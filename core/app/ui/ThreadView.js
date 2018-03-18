coAppUI.ThreadView=coAppUI.App.Components.ThreadView = {
  Version        : new Version(2018,3,17,143),
  Title          : new Title("Aurawin Thread View","ThreadView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2018.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/ThreadView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  SelectNext     : true,
  SelectNone     : false,
  SkipThreads    : true,
  SkipGroup      : true,
  WhithinGroup   : false,
  WhithinThread  : false,
  Create         : function(Slides,Owner,Frame,Client,sName,sClass,Align,vScroll){
    var vw=Slides.createSlide(sName,"ThreadView",Owner,Frame,Client,Align);
    vw.UIC=this;
    vw.Container.className="ThreadView " + sClass+"ThreadView";
    vw.Class=sClass;
    vw.touchLocked=false;
    vw.onOpenItem=null;
    vw.onSelectItem=null;
    vw.onDeleteItem=null;
    vw.onJunkItem=null;
    vw.onPageChanged=null;
    vw.onPageRefresh=null;

    vw.onSynchronizeItem=null;
    vw.Selected=null;
    vw.Hover=null;
    vw.dragInfo=null;
    vw.Theme=new Object()
    vw.scrollLock=false;
    vw.Theme.Color=new Object();

    vw.Torus=coAppUI.App.Components.Torus.Create(Frame,vw,vw.Container);
    vw._createHeader=function(){
      var vw=this;
      var p=null;
      var hdr=new Object();

      hdr.Container=document.createElement('div');
      hdr.Parent=vw.Container;
      hdr.Parent.appendChild(hdr.Container);
      hdr.Class="ThreadViewHeader";
      hdr.Container.className=hdr.Class+" " + vw.Class+"Header";
      hdr.Owner=vw;

      hdr.Commands=document.createElement('nav');
      hdr.Container.appendChild(hdr.Commands);
      hdr.Commands.className=hdr.Class+"Commands";
      hdr.Commands.Owner=hdr;
      hdr.Commands.setAttribute("role","navigation");
      hdr.Commands.style.height=coTheme.UI.ThreadView.Header.Height+"px";

      hdr.Refresh=document.createElement('div');
      hdr.Commands.appendChild(hdr.Refresh);
      hdr.Refresh.Owner=hdr;
      hdr.Refresh.className="ThreadViewRefresh "+vw.Class+"Refresh";
      hdr.Refresh.setAttribute("role","navigation");
      coDOM.setText(hdr.Refresh,"\u21BB");
      coDOM.setHint(hdr.Refresh,coLang.Table.Buttons.Refresh);
      hdr.Refresh.onclick=function(){
        var hdr=this.Owner;
        var vw=hdr.Owner;
        if (vw.onPageRefresh) vw.onPageRefresh(hdr.Pages.Current);
      };
      hdr.Pages=new Array();
      hdr.Pages.Current=0;
      hdr.Pages.Count=0;
      hdr.Pages.Owner=hdr;
      hdr.Pages.Parent=hdr.Commands;
      hdr.Pages.Class="ThreadViewPages";
      hdr.Pages.Container=document.createElement('ul');
      hdr.Pages.Parent.appendChild(hdr.Pages.Container);
      hdr.Pages.Container.className=hdr.Pages.Class +" " + vw.Class+"Pages";
      hdr.Pages.Container.setAttribute("role","navigation");

      hdr.Pages.Add=function(Caption){
        var pgs=this;
        var hdr=pgs.Owner;
        p=document.createElement('li');
        p.Owner=pgs;
        pgs.Container.appendChild(p);
        p.className="ThreadViewPage " + vw.Class+"Page";
        p.setAttribute("role","navigation");
        p.style.height=coTheme.UI.ThreadView.Header.pageHeight+"px";
        p.style.lineHeight=coTheme.UI.ThreadView.Header.pageHeight+"px";
        coDOM.setText(p,Caption);
        pgs.push(p);
        return p;
      };
      hdr.Pages.First=function(){
        var pgs=this;
        var hdr=pgs.Owner;
        var vw=hdr.Owner;
        pgs.Current=1;
        coDOM.setText(pgs.Indicator,pgs.Current+" "+coLang.Table.Labels.PageBreak+" "+pgs.Count);
        if (vw.onPageChanged) vw.onPageChanged(pgs.Current);
      };
      hdr.Pages.Previous=function(){
        var pgs=this;
        var hdr=pgs.Owner;
        var vw=hdr.Owner;
        pgs.Current-=1;
        if (pgs.Current<1) pgs.Current=1;
        coDOM.setText(pgs.Indicator,pgs.Current+" "+coLang.Table.Labels.PageBreak+" "+pgs.Count);
        if (vw.onPageChanged) vw.onPageChanged(pgs.Current);
      };
      hdr.Pages.Next=function(){
        var pgs=this;
        var hdr=pgs.Owner;
        var vw=hdr.Owner;
        pgs.Current+=1;
        if (pgs.Current>pgs.Count) pgs.Current=pgs.Count;

        coDOM.setText(pgs.Indicator,pgs.Current+" "+coLang.Table.Labels.PageBreak+" "+pgs.Count);
        if (vw.onPageChanged) vw.onPageChanged(pgs.Current);
      };
      hdr.Pages.Last=function(){
        var pgs=this;
        var hdr=pgs.Owner;
        var vw=hdr.Owner;
        pgs.Current=pgs.Count;
        coDOM.setText(pgs.Indicator,pgs.Current+" "+coLang.Table.Labels.PageBreak+" "+pgs.Count);
        if (vw.onPageChanged) vw.onPageChanged(pgs.Current);
      };

      p=hdr.Pages.Add("\u21e4");
      coDOM.setHint(p,coLang.Table.Labels.First+" "+coLang.Table.Buttons.Page);
      p.onclick=function(){
        this.Owner.First();
      };

      p=hdr.Pages.Add("\u21e0");
      coDOM.setHint(p,coLang.Table.Buttons.Previous+" "+coLang.Table.Buttons.Page);
      p.onclick=function(){
        this.Owner.Previous();
      };
      p=hdr.Pages.Indicator=hdr.Pages.Add("");
      coDOM.setHint(p,coLang.Table.Buttons.Current+" "+coLang.Table.Buttons.Page);

      p=hdr.Pages.Add("\u21e2");
      coDOM.setHint(p,coLang.Table.Buttons.Next+" "+coLang.Table.Buttons.Page);
      p.onclick=function(){
        this.Owner.Next();
      };

      p=Last=hdr.Pages.Add("\u21e5");
      coDOM.setHint(p,coLang.Table.Buttons.Last+" "+coLang.Table.Buttons.Page);
      p.onclick=function(){
        this.Owner.Last();
      };

      hdr.Pages.Free=function(){
        var pgs=this;
        var hdr=pgs.Owner;
        var p=null;
        for (var iLcv=0; iLcv<pgs.length; iLcv++){
          p=pgs[iLcv];
          pgs.Container.removeChild(p);
        };
        pgs.Parent.removeChild(pgs.Container);
        pgs.length=0;
      };
      hdr.Pages.setValue=function(Count){
        var pgs=this;
        var hdr=pgs.Owner;
        var vw=hdr.Owner;
        var p=null;
        if (pgs.Current<1) pgs.Current=1;
        if (pgs.Current>Count) pgs.Current=Count;
        if (Count!=pgs.Count){
          pgs.Count=Count;
        };
        coDOM.setText(pgs.Indicator,pgs.Current+" "+coLang.Table.Labels.PageBreak+" "+pgs.Count);
      };
      hdr.Adjust=function(PageCount){
        if (PageCount==undefined) PageCount=1;
        var hdr=this;
        var vw=hdr.Owner;
        hdr.Pages.setValue(PageCount);
        //hdr.Container.style.display="block";
        //hdr.Container.style.height=coTheme.UI.ThreadView.Header.Height+"px";
        //vw.Groups.Container.style.top=coTheme.UI.ThreadView.Header.Height+"px";
      };
      hdr.Free=function(){
        var hdr=this;
        hdr.Pages.Free();
        hdr.Commands.removeChild(hdr.Refresh);
        hdr.Parent.removeChild(hdr.Container);
        hdr.Pages=null;
        hdr=null;
        return null;
      };

      coTheme.UI.ThreadView.Header.Apply(hdr);
      return hdr;
    };
    vw._createItemTools=function(){
      var vw=this;
      tls=new Array();
      tls.Class="ThreadViewTools";
      tls.Owner=vw;
      tls.Clearing=false;
      tls.Add=function(sName,sHint,srcIcon,sClass,onExecute){
        var tls=this;

        var tl=tls[sName]=coObject.Create();
        tl.Permanent=false;
        tl.Owner=tls;
        tl.Class=sClass;
        tl.onExecute=onExecute;
        tl.srcIcon=srcIcon;
        tl.Hint=sHint;
        tl.Name=sName;
        tl.Enabled=true;
        tl.createButton=function(itm,elm){
          var tl=this;
          var btn=document.createElement('div');
          elm.appendChild(btn);
          btn.className=tl.Class;
          btn.Owner=itm;
          btn.Tool=tl;

          coDOM.setHint(btn,tl.Hint);
          btn.style.backgroundImage="url("+tl.srcIcon+")";
          btn.style.pointerEvents=(tl.Enabled==true)? "":"none";
          coDOM.setTransition(btn,coTheme.UI.ThreadView.Tools.buttonTransition);
          btn.doExecute=function(){
            var itm=this.Owner;
            var tl=this.Tool;
            itm.Select();
            if (tl.onExecute) tl.onExecute(itm);
          };
          btn.ontouchstart=function(e){coDOM.preventDefault(e); btn.Owner.Select();};
          btn.ontouchend=function(e){ coDOM.preventDefault(e); btn.doExecute();};
          btn.onmousedown=function(e){ coDOM.preventDefault(e); btn.Owner.Select();};
          btn.onmouseup=function(e){ coDOM.preventDefault(e); btn.doExecute();};
          return btn;
        };
        tl.Free=function(){
          var tl=this;
          if (this.Owner.Clearing!=true){
            var idx=this.Owner.indexOf(tl);
            if (idx!=-1) this.Owner.splice(idx,1);
          };
          tl=coObject.Release(tl);
          return null;
        };
        this.push(tl);
        return tl;
      };
      tls.Clear=function(){
        var tls=this.Owner;
        this.Clearing=true;
        for (var iLcv=0; iLcv<this.length; iLcv++)
          this[iLcv]=coObject.Release(this[iLcv]);
        this.length=0;
        this.Clearing=false;
      };
      tls.Free=function(){
        var tls=this;
        tls.Clear();
        tls=coObject.Release(tls);
        return null;
      };
      return tls;
    };
    vw._createGroups=function(){
      var gps=new Array();
      var vw=this;
      gps.Class="ThreadViewGroups";
      gps.Container=document.createElement('div');
      gps.Parent=vw.Container;
      gps.Parent.appendChild(gps.Container);
      gps.Container.className=gps.Class+" " + vw.Class+gps.Class;
      gps.Container.tabIndex=0;
      gps.Container.Owner=gps;
      gps.Loading=false;
      gps.Focused=null;
      gps.View=this;
      gps.Top=null;
      gps.evtKeyDown=coEvents.Add(gps.Container,"keydown",function(e){this.Owner.View.doKeyDown(e);},coEvents.NoCapture,coEvents.Active);

      gps.hasItems=function(){
        var gps=this;
        var gp=null;
        for (var iLcv=0; iLcv<gps.length; iLcv++){
          gp=gps[iLcv];
          if (gp.Items.length>0) return true;
        };
        return false;
      };
      gps.Next=function(Group){
        var gps=this;
        var idx=gps.indexOf(Group);
        if (idx!=-1){
          idx++;
          return (idx<gps.length) ? gps[idx] : null;
        } else {
          return (gps.length>0) ? gps[0] : null;
        };
      };
      gps.Previous=function(Group){
        var gps=this;
        var idx=gps.indexOf(Group);
        if (idx!=-1){
          idx--;
          return (idx>=0) ? gps[idx] : null;
        } else {
          return (gps.length>0) ? gps[0] : null;
        };
      };
      gps.Add=function(sGlyph,sCaption,sEmpty){
        if (sGlyph==undefined) sGlyph="";

        var gps=this;
        var gp=coObject.Create(coObject.relInline,coObject.cpyAsVar,"ThreadViewGroup");
        gp.Owner=gps;
        gp.View=gps.View;
        gp.Parent=gps.Container;
        gp.Container=document.createElement('div');
        gp.Parent.appendChild(gp.Container);
        gp.Container.className=gp.Class+" "+ vw.Class+gp.Class;
        gp.Container.tabIndex=0;
        gp.Container.Owner=gp;
        
        gp.TopBar=document.createElement('div');
        gp.Container.appendChild(gp.TopBar);
        gp.TopBar.className="ThreadViewGroupHeaderTopBar "+vw.Class+"ThreadViewGroupHeaderTopBar";
        
        gp.Header=document.createElement('div');
        gp.TopBar.appendChild(gp.Header);
        gp.Header.className="ThreadViewGroupHeader "+vw.Class+"ThreadViewGroupHeader";
        gp.Symbol=document.createElement('span');
        gp.Header.appendChild(gp.Symbol);
        gp.evtKeyDown=coEvents.Add(gp.Container,"keydown",function(e){this.Owner.View.doKeyDown(e);},coEvents.NoCapture,coEvents.Active);


        gp.Symbol.style.backgroundImage=(sGlyph.length>0)? "url("+sGlyph+")" : "";

        gp.Caption=document.createElement('span');
        gp.Header.appendChild(gp.Caption);
        coDOM.setHTML(gp.Caption,sCaption);


        gp.Wrapper=document.createElement('div');
        gp.Container.appendChild(gp.Wrapper);
        gp.Wrapper.className="ThreadViewGroupWrapper "+vw.Class+"ThreadViewGroupWrapper";

        gp.Notice=document.createElement('div');
        gp.Notice.Owner=gp;
        gp.Wrapper.appendChild(gp.Notice);
        gp.Notice.className="ThreadViewGroupNotice " + vw.Class+"ThreadViewGroupNotice";
        coDOM.setText(gp.Notice,sEmpty);

        coTheme.UI.ThreadView.Group.Apply(gp);
        gp._doNoticeCheck=function(){
          this.Notice.style.display=(this.Items.length==0)? "block" : "none";
        };
        gp._doSubtreeModified=function(){
          var gp=this;
          gp.evtDOMSubtreeModified.setActive(false);
          gp._doNoticeCheck();
          setTimeout(function(){gp._doNoticeCheck(); gp.evtDOMSubtreeModified.setActive(true);},300);
        };
        gp._createItems=function(){
          var itms=new Array();
          var gp=this;
          var vw=gp.View;
          itms.Owner=gp;

          itms.Container=document.createElement('div');
          itms.Parent=gp.Wrapper;
          itms.Parent.appendChild(itms.Container);
          itms.Container.className="ThreadViewItems " + vw.Class+"ThreadViewItems";
          itms.Container.tabIndex=0;
          itms.Container.Owner=itms;

          itms.Loading=false;
          itms.View=vw;
          itms.evtFocus=coEvents.Add(
            itms.Container,
            "focus",
            function(e){
              var itms=this.Owner;
              var gp=itms.Owner;
              var gps=gp.Owner;
              gps.Focused=gp;
            },
            coEvents.NoCapture,
            coEvents.Active
          );
          itms.Clear=function(){
            var itms=this;
            var vw=itms.View;
            if (vw.dragInfo) vw.dragInfo.Hide();
            itms.Loading=true; var itm=null;
            while (itms.length>0){
              itm=itms[0];
              itm.Free(0);
            };
            itms.Loading=false;
          };
          itms.Free=function(){
            var itms=this;
            itms.evtKeyDown.Free();
            while (itms.length>0) {
              var itm=itms[iLcv];
              itm.Free();
            };
            itms.Parent.removeChild(itms.Container);
            itms=coObject.Release(itms);
            return null;
          };
          return itms;
        };
        gp.Last=function(){
          var gp=this;
          var idx=gp.Items.length-1;
          return (idx>=0) ? gp.Items[idx] : null;
        };
        gp.Free=function(){
          var gp=this;
          gp.evtDOMSubtreeModified.Free();
          gp.evtKeyDown.Free();
          gp.Items.Free();
          gp.Header.removeChild(gp.Symbol);
          gp.Header.removeChild(gp.Caption);
          gp.TopBar.removeChild(gp.Header);
          gp.Container.removeChild(gp.TopBar);
          gp.Container.removeChild(gp.Wrapper);
          gp.Parent.removeChild(gp.Container);

          var idx=gp.Owner.indexOf(gp);
          if (idx!=-1) gp.Owner.splice(idx,1);

          gp=coObject.Release(gp);
          return null;
        };
        gp.Items=gp._createItems();
        gp.getAllItems=function(List){
          var gp=this;
          for (var iLcv=0; iLcv<gp.Items.length; iLcv++){
            var itm=gp.Items[iLcv];
            itm.Thread.getAllItems(List);
          };
        };
        gp.moveItem=function(itm,SelectNext,SkipThreads,SkipGroup){
          if (SelectNext==undefined) throw "ThreadView.Group.moveItem requires SelectNext parameter.";
          if (SkipThreads==undefined) throw "ThreadView.Group.moveItem requires SkipThreads parameter.";
          if (SkipGroup==undefined) throw "ThreadView.Group..moveItem requries SkipGroup parameter.";
          var gp=this;
          var vw=gp.View;
          if (itm.Group!=this) {
            if (SelectNext) {
              if (SkipGroup){
                vw.Next(SkipThreads);
              } else {
                // force selection iff itm is last in group.
                // could be previous.
                var itmR=itm.getRoot();
                if ((itmR)==itmR.Group.Last()) {
                  vw.Previous(SkipThreads);
                } else {
                  vw.Next(SkipThreads);
                };
              };
            };
            var List=new Array();
            var itmLcv=null;


            itm.Thread.getAllItems(List);

            var idx=itm.List.indexOf(itm);
            itm.List.splice(idx,1); // remove item from list

            itm.Owner=gp;
            itm.Group=gp;
            itm.List=itm.Group.Items;
            itm.Parent=itm.List.Container;

            itm.List.splice(0,0,itm);
            itm.Parent.insertBefore(itm.Container,itm.Parent.firstChild);

            for (var iLcv=0; iLcv<List.length; iLcv++){
              itmLcv=List[iLcv];
              itmLcv.Group=gp;
            };
            List.length=0;
            List=null;
          };
        };
        gp.evtDOMSubtreeModified=coEvents.Add(
          gp.Wrapper,
          "DOMSubtreeModified",
          function(e){
            gp._doSubtreeModified();
          },
          coEvents.NoCapture,
          coEvents.Active
        );

        gps.push(gp);
        return gp;
      };
      gps.getAllItems=function(List){
        var gp=this;
        for (var iLcv=0; iLcv<gps.length; iLcv++){
          var g=gps[iLcv];
          g.getAllItems(List);
        };
      };
      gps.Show=function(){
        var gps=this;
        gps.Container.tabIndex=1;
        gps.Container.style.display="block";
        gps.snapTopGroup();
      };
      gps.Hide=function(){
        var gps=this;
        gps.Container.tabIndex=0;
        gps.Container.style.display="none";
      };
      gps.Clear=function(){
        var gps=this;
        while (gps.length>0)
          gps[0].Free();
        gps.View.Header.Adjust(0);
      };
      gps.Free=function(){
        var gps=this;
        gps.Clear();

        gps.evtKeyDown.Free();
        gps.Parent.removeChild(gps.Container);

        gps=coObject.Release(gps);
        return null;
      };
      gps.snapTopGroup=function(){
        var gps=this;
        var vw=gps.View;
        var elm=coDOM.getChildAtY(0,gps.Container.scrollTop,gps.Container,gps.Container);
        if (elm) {
          var gp=elm.Owner;
          if (gps.Top!=gp) {
            vw.evtDOMSubtreeModified.setActive(false);
            if (gps.Top) {
              gps.Top.TopBar.appendChild(gps.Top.Header);
            };
            gps.Top=gp;
            vw.Header.Container.appendChild(gp.Header);
            vw.evtDOMSubtreeModified.setActive(true);
          };
        };
      };
      gps.evtScroll=coEvents.Add(
        gps.Container,
        "scroll",
        function(e){
          var gps=this.Owner;
          var vw=gps.View;
          if (vw.scrollLock==true)
            coDOM.preventDefault(e);
          gps.snapTopGroup();
        },
        coEvents.NoCapture,
        coEvents.Active
      );
      return gps;
    };

    vw.doItemNormalize=function(itm){};
    vw.doItemHover=function(itm){};
    vw.doItemSelect=function(itm){};

    vw.Header=vw._createHeader();
    vw.Tools=vw._createItemTools();
    vw.doKeyDown=function(e){
      var vw=this;
      if (e==undefined) e=window.event;
      switch (e.keyCode) {
          case (13) :
            if ((vw.Selected) && (vw.onOpenItem))
              vw.onOpenItem(vw.Selected);
            coDOM.preventDefault(e);
            break;
          case (33) :
            vw.pageUp();
            coDOM.preventDefault(e);
            break;
          case (34) :
            vw.pageDown();
            coDOM.preventDefault(e);
            break;
          case (35) :
            vw.Last();
            coDOM.preventDefault(e);
            break;
          case (36) :
            vw.First();
            coDOM.preventDefault(e);
            break;
          case (38) :
            if ((vw.Selected) && (vw.onOpenItem))
              vw.Previous();
            coDOM.preventDefault(e);
            break;
          case (40) :
            if ((vw.Selected) && (vw.onOpenItem))
              vw.Next();
            coDOM.preventDefault(e);
            break;
          case (46) :
            if ((vw.Selected) && (vw.onDeleteItem))
              vw.onDeleteItem(vw.Selected);
            coDOM.preventDefault(e);
            break;
          case (74) :
            if ((e.ctrlKey==true) && (vw.Selected) && (vw.onJunkItem))
              vw.onJunkItem(vw.Selected);
            coDOM.preventDefault(e);
            break;
          case (116) :
            if (vw.onPageRefresh) vw.onPageRefresh(vw.Header.Pages.Current);  
            coDOM.preventDefault(e);
      };
    };
    vw.doMouseMove=function(e) {
      if (coVDM.VDM.Browser.Mouse!=true) return;
      if (e==undefined) e=window.event;
      var itm=vw.Selected;
      if (itm) {
        var di=vw.dragInfo;
        if (di) {
          if (coDragDrop.Locked==false) {
            di.Mouse.Update(e);
            if (
              (di.Active==false) &&
              (di.Mouse.Active==true) &&
              (di.Mouse.Down==true)
            ) {
              if (
                (di.Mouse.Duration()>coVDM.dndStartTimeWindow) &&
                (
                  (Math.abs(di.Mouse.ptVector.X)>=coVDM.dndStartDelta) ||
                  (Math.abs(di.Mouse.ptVector.Y)>=coVDM.dndStartDelta)
                )
              ) {
                if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doMouseMove (DragDrop)");
                di.Invoke(itm,e.pageX,e.pageY);
                vw.evtMouseMove.setActive(false); // stop tracking
              };
            };
          } else if (coEvents.ScrollLock.Active==true) {
            coEvents.ScrollLock.Unlock();
            if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doMouseMove (unlocked ScrollLock exiting)");
          } else {
            if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doMouseMove (DragDrop locked exiting)");
          };
        };
      } else {
        vw.evtMouseUp.setActive(false);
        vw.evtMouseMove.setActive(false);
        if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doMouseMove (Nothing Selected exiting)");
      };
    };
    vw.doMouseUp=function(e){
      if (e==undefined) e=window.event;
      var vw=this;
      var itm=vw.Selected;
      var di=vw.dragInfo;
      if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doMouseUp");
      vw.evtMouseMove.setActive(false);
      vw.evtMouseUp.setActive(false);
      if (di) {
        di.Mouse.Done(e);
        di.Mouse.Down=false;
        coDragDrop.Locked=false;
      };
      if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doMouseUp (All inactive)");
    };
    vw.doTouchMove=function(e){
      if (e==undefined) e=window.event;
      var vw=this;
      var itm=vw.Selected;
      if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchMove (itm)");
      vw.touchLocked=true;
      var di=vw.dragInfo;
      var touch=e.targetTouches[e.targetTouches.length-1];
      if (di) {
        if (coDragDrop.Locked==false) {
          if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchMove (updating touch inf)");
          di.Touch.Update(touch);
          if ( (di.Active==false) && (di.Touch.Active==true) ){
            if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchMove (inspecting touch inf ptVector.X="+di.Touch.ptVector.X+" ptVector.Y="+di.Touch.ptVector.Y+")");
            if (
              (di.Touch.Duration()>coVDM.dndStartTimeWindow) &&
              (Math.abs(di.Touch.ptVector.X)<=coVDM.dndStartDelta) &&
              (Math.abs(di.Touch.ptVector.Y)<=coVDM.dndStartAllowY)
            ) {
              if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchMove pageX="+touch.pageX+" pageY="+touch.pageY+"(DragDrop)");
              vw.evtTouchMove.setActive(false);
              vw.touchLocked=true;
              di.Invoke(itm,touch.pageX,touch.pageY);
            };
          } else if (vw.touchLocked==false){
            if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchMove (bypass to scrolling)");
            coEvents.ScrollLock.Unlock();
          };
        } else if (coEvents.ScrollLock.Active==true) {
          coEvents.ScrollLock.Unlock();
          if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchMove (unlocked ScrollLock)");
        } else {
          if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchMove (DragDrop locked)");
        };
      };
    };
    vw.doTouchEnd=function(e){
      var vw=this;
      var itm=vw.Selected;
      if (e==undefined) e=window.event;

      if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchEnd (enter)");
      vw.evtTouchMove.setActive(false);
      vw.evtTouchEnd.setActive(false);

      if (itm.evtMouseDown) itm.evtMouseDown.setActive(true);

      e.stopPropagation();
      var di=vw.dragInfo;
      if ( (vw.touchLocked==true) || (di.Active==true) ) {
        if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchEnd (exiting)");
        return;
      };
      if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.doTouchEnd (itm)");

      itm.View.Torus.Show(coVDM.torusAutoShow);
      if (itm.View.onOpenItem) itm.View.onOpenItem(itm);
      vw.touchLocked=false;
    };
    vw.evtMouseMove=coEvents.Add(window,"mousemove",function(e){vw.doMouseMove(e);},coEvents.NoCapture,coEvents.NoActivate);
    vw.evtMouseUp=coEvents.Add(window,"mouseup",function(e){vw.doMouseUp(e);},coEvents.NoCapture,coEvents.NoActivate);
    vw.evtTouchMove=coEvents.Add(window,"touchmove",function(e){vw.doTouchMove(e);},coEvents.NoCapture,coEvents.NoActivate);
    vw.evtTouchEnd=coEvents.Add(window,"touchend",function(e){vw.doTouchEnd(e);},coEvents.NoCapture,coEvents.NoActivate);
    vw.evtKeyDown=coEvents.Add(vw.Container,"keydown",function(e){this.Owner.doKeyDown(e);},coEvents.NoCapture,coEvents.Active);

    vw.createItem=function(Group,Thread,Insert,Data){
      if (Group==undefined) Group=null;
      if (Thread==undefined) Thread=null;
      if (Insert==undefined) Insert=true;
      var v=this;
      var el=sel=null;
      var scTop1=scTop2=oTop1=oTop2=oVal1=oVal2=0;

      sel=(Assigned(v.Selected)==true)?v.Selected:null;
      if (sel){
        scTop1=v.Groups.Container.scrollTop;
        oTop1=coDOM.getOffsetTop(sel.Container,v.Groups.Container);
        oVal1=oTop1-scTop1;
      };
      var idxTab=0;
      var itms=(Thread) ? Thread.Items : Group.Items;
      var itm=coObject.Create();

      itm.Modified=0;
      itm.View=v;
      itm.Group=Group;
      itm.Owner=(!Thread) ? Group : Thread;
      itm.Class="ThreadViewItem";
      itm.Parent=itm.Owner.Items.Container;

      itm.Data=Data;
      itm.List=itms;


      itm.getRoot=function(){
        return (this.Owner==this.Group) ? this : this.Owner.getRoot();
      };
      itm.MoveToTop=function(){
        var itmRoot=itm.getRoot();
        var idx=this.Group.Items.indexOf(itmRoot);
        this.Group.Items.splice(idx,1);
        this.Group.Items.splice(0,0,itmRoot);
        this.Group.Items.Container.insertBefore(itmRoot.Container,this.Group.Items.Container.firstChild);
      };
      itm.Synchronize=function(Data){
        if (this.View.onSynchronizeItem) {
          this.View.onSynchronizeItem(this);
        };
      };
      itm._createThread=function(){
        var itm=this;
        var td=coObject.Create();
        td.Owner=itm;
        td.Class=itm.View.Class+"Thread";
        td.Items=new Array();
        td.Items.Loading=false;
        td.Items.Owner=td;
        td.Items.Container=document.createElement('div');
        td.Items.Parent=itm.Container;
        td.Items.Parent.appendChild(td.Items.Container);
        td.Items.Container.className=td.Class;
        td.getRoot=function(){
          return this.Owner.getRoot();
        };
        td.getAllItems=function(List){
          var td=this;
          if (td.Items.length>0) {
            for (var iLcv=0; iLcv<td.Items.length; iLcv++){
              var itm=td.Items[iLcv];
              itm.Thread.getAllItems(List);
            };
          };
          List.push(td.Owner);
        };
        td.getFirstItem=function(){
          var td=this;
          var len=td.Items.length;
          return (len>0)? td.Items[0] : td.Owner;
        };
        td.Last=function(){
          var td=this;
          var len=td.Items.length;
          return (len>0)? td.Items[len-1].Thread.Last() : td.Owner;
        };
        td.Items.Clear=function(){
          var itms=this;
          var vw=itms.Owner.Owner;
          if (vw.dragInfo) vw.dragInfo.Hide();
          var td=itms.Owner;
          itms.Loading=true;
          var itm=null;
          while (itms.length>0) {
            itm=itms.pop();
            itm.Free();
          };
          itms.Loading=false;
        };
        td.Items.Free=function(){
          var itms=this;
          var td=itms.Owner;
          itms.Clear();
          itms.Parent.removeChild(itms.Container);
          td.Items=itms=null;
          return null;
        };
        td.Free=function(){
          var td=this;
          td.Items.Free();
          td=coObject.Release(td);
          return null;
        };
        return td;
      };
      itm._createHeader=function(){
        var itm=this;
        var hdr=new coObject.Create();
        hdr.Class=itm.Class+"Header";
        hdr.Owner=itm;
        hdr.Parent=itm.Client;

        hdr._createLabels=function(){
          var hdr=this;
          var itm=hdr.Owner;

          var lbl=coObject.Create(coObject.relInline,coObject.cpyAsVar,itm.Class+"Label");

          lbl.Owner=hdr;
          lbl.Parent=hdr.Container;

          lbl.Container=document.createElement('div');
          lbl.Parent.appendChild(lbl.Container);
          lbl.Container.className=lbl.Class;

          lbl.Name=document.createElement('div');
          lbl.Container.appendChild(lbl.Name);
          lbl.Name.className=lbl.Class+"Name";

          lbl.Subject=document.createElement('div');
          lbl.Container.appendChild(lbl.Subject);
          lbl.Subject.className=lbl.Class+"Subject";

          lbl.getSubject=function(){
            return coDOM.getText(this.Subject);
          };
          lbl.setSubject=function(s){
            return coDOM.setHTML(this.Subject,s);
          };

          lbl.getName=function(){
            return coDOM.getText(this.Name);
          };
          lbl.setName=function(s){
            return coDOM.setHTML(this.Name,s);
          };

          lbl.Free=function(){
            var lbl=this;
            var hdr=lbl.Owner;

            lbl.Container.removeChild(lbl.Subject);
            lbl.Container.removeChild(lbl.Name);
            lbl.Parent.removeChild(lbl.Container);

            hdr.Label=null;

            lbl=coObject.Release(lbl);
            return null;
          };
          return lbl;
        };
        hdr._createStamp=function(){
          var hdr=this;
          var itm=this.Owner;
          var vw=itm.View;

          var stmp=coObject.Create();
          stmp.Owner=hdr;
          stmp.Parent=hdr.Container;

          stmp.Container=document.createElement('div');
          stmp.Parent.appendChild(stmp.Container);
          stmp.Container.className=itm.Class+"Stamp";
          stmp.Container.Owner=stmp;

          stmp.Label=document.createElement('div');
          stmp.Container.appendChild(stmp.Label);
          stmp.Label.className=itm.Class+"StampLabel";
          stmp.Label.Owner=smtp;

          stmp.Tools=document.createElement('div');
          stmp.Container.appendChild(stmp.Tools);
          stmp.Tools.className=itm.Class+"StampTools";
          stmp.Tools.Owner=smtp;
          //stmp.Tools.style.opacity=coTheme.UI.ThreadView.Tools.Opacity.Idle;
          stmp.setDate=function(sDate){
            coDOM.setText(this.Label,sDate);
          };
          var tl=null;
          for (var iLcv=0; iLcv<vw.Tools.length; iLcv++){
            tl=vw.Tools[iLcv];
            stmp.Tools[tl.Name]=tl.createButton(itm,stmp.Tools);
          };
          stmp.Free=function(){
            var stmp=this;
            var hdr=stmp.Owner;
            stmp.Container.removeChild(stmp.Label);
            stmp.Container.removeChild(stmp.Tools);
            stmp.Parent.removeChild(stmp.Container);
            hdr.Stamp=null;
            stmp=coObject.Release(stmp);
            return null;
          };
          return stmp;
        };
        hdr.Container=document.createElement('div');
        hdr.Parent.appendChild(hdr.Container);
        hdr.Container.className=hdr.Class;

        hdr.Label=hdr._createLabels();
        hdr.Stamp=hdr._createStamp();


        hdr.Free=function(){
          var hdr=this;
          var itm=hdr.Owner;

          hdr.Label.Free();
          hdr.Stamp.Free();

          itm.Header=null;

          hdr.Parent.removeChild(hdr.Container);

          hdr=coObject.Release(hdr);

          return null;
        };
        return hdr;
      };
      itm._createLines=function(){
        var itm=this;
        var lns=coObject.Create();
        lns.Class=itm.Class+"Lines";
        lns.Parent=itm.Client;

        lns.Container=document.createElement('div');
        lns.Parent.appendChild(lns.Container);
        lns.Container.className=lns.Class;

        lns.Line1=document.createElement('div');
        lns.Container.appendChild(lns.Line1);
        lns.Line1.className=itm.Class+"Line1";

        lns.Line2=document.createElement('div');
        lns.Container.appendChild(lns.Line2);
        lns.Line2.className=itm.Class+"Line2";

        lns.Free=function(){
          var lns=this;

          lns.Container.removeChild(lns.Line1);
          lns.Container.removeChild(lns.Line2);
          lns.Parent.removeChild(lns.Container);

          lns=coObject.Release(lns);
          return null;
        };
        return lns;
      };
      itm.doSelect=function(e){
        if (e==undefined) e=window.event;
        var itm=this;
        itm.Select();
        coDOM.preventDefault(e);
      };
      itm.doHover=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var itm=this;
        var vw=itm.View;
        if ((!e.touches) || (e.touches.length==0))
          itm.Hover();
        else
          itm.Select();
      };
      itm.doTouchStart=function(e){
        var itm=this;
        var vw=itm.View;
        if (e==undefined) e=window.event;

        e.stopPropagation();

        if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.Item.doTouchStart ("+itm.Data.MAP.ID.Value+")");

        vw.evtTouchMove.setActive(true);
        vw.evtTouchEnd.setActive(true);

        var di=vw.dragInfo;
        var touch=e.targetTouches[e.targetTouches.length-1];
        coEvents.ScrollLock.Lock(coVDM.ListItemScrollDelay);

        vw.evtMouseMove.setActive(false);
        vw.evtMouseUp.setActive(false);

        if (itm.evtMouseDown) itm.evtMouseDown.setActive(false);

        if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.Item.doTouchStart.MouseEvents (All inactive)");

        vw.touchLocked=false;

        itm.Select();

        if (di) {
          di.Touch.Start(touch);
        };
      };
      itm.doMouseDown=function(e){
        if (e==undefined) e=window.event;
        var itm=this;
        var vw=itm.View;
        var di=vw.dragInfo;
        e.stopPropagation();

        if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.Item.doMouseDown");

        itm.Select();

        vw.evtMouseMove.setActive(true);
        vw.evtMouseUp.setActive(true);

        if (di) di.Mouse.Start(e);

        if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.Item.doMouseDown (active)");
      };
      itm.doDoubleClick=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var itm=this;
        itm.Select();
        itm.View.Torus.Show(coVDM.torusAutoShow);
        if (itm.View.onOpenItem) itm.View.onOpenItem(itm);
      };
      itm.Container=document.createElement('div');

      if (Insert==true) {
        itm.Parent.insertBefore(itm.Container, itm.Parent.firstChild);
        idxTab=0;
      } else {
        itm.Parent.appendChild(itm.Container);
        idxTab=itm.Parent.children.length;
      };

      itm.Container.className=itm.Class;
      itm.Container.Owner=itm;
      itm.Container.tabIndex=idxTab;

      itm.Client=document.createElement('div');
      itm.Container.appendChild(itm.Client);
      itm.Client.className=itm.Class+"Client";
      itm.Client.Owner=itm;
      itm.Hidden=false;
      itm.Visible=true;
      itm.Header=itm._createHeader();
      itm.Lines=itm._createLines();
      itm.Thread=itm._createThread();

      if (coVDM.VDM.Browser.Mouse==true) {
        itm.evtHover=coEvents.Add(itm.Client,"mouseover",function(e){itm.doHover(e);},coEvents.NoCapture,coEvents.Active);
        itm.evtMouseDown=coEvents.Add(itm.Client,"mousedown",function(e){itm.doMouseDown(e);},coEvents.NoCapture,coEvents.Active);
        itm.evtDblClick=coEvents.Add(itm.Client,"dblclick",function(e){itm.doDoubleClick(e);},coEvents.Capture,coEvents.Active);
      };
      itm.evtTouchStart=coEvents.Add(itm.Container,"touchstart",function(e){itm.doTouchStart(e);},coEvents.NoCapture,coEvents.Active);
      itm.evtKeyDown=coEvents.Add(itm.Container,"keydown",function(e){this.Owner.View.doKeyDown(e);},coEvents.NoCapture,coEvents.Active);

      itm.Show=function(){
        var itm=this;
        itm.Container.style.display="block";
        itm.Visible=true;
      };
      itm.Hide=function(){
        var itm=this;
        var vw=itm.View;
        itm.Container.style.display="none";
        itm.Visible=false;
        itm.Hidden=true;
      };
      itm.Previous=function(){
        var itm=this;
        var vw=itm.View;
        switch (itm.Owner.Class){
          case ("mailThread") :{
            var td=itm.Owner;
            var idx=td.Items.indexOf(itm);
            if (idx==0) {
              return td.Owner;
            } else {
              return td.Items[idx-1].Thread.Last();
            };
          };
          case ("ThreadViewGroup") : {
            var gp=itm.Owner;
            var nItem=null;
            var idxG=vw.Groups.indexOf(gp);
            var idx=gp.Items.indexOf(itm);
            if (idx>0) {
              return gp.Items[idx-1].Thread.Last();
            } else if (idxG>0) {
              while ((!nItem) && (idxG>=1)) {
                nItem= vw.Groups[idxG-1].Last();
                idxG--;
              };
              return (nItem) ? nItem : itm;
            } else {
              // at top of the list and group
              return itm;
            };
          };
        };
        return null;
      };
      itm.Select=function(){
        var itm=this;
        var tl=null;
        var vw=itm.View;
        var oldItm=vw.Selected;
        if (oldItm==itm) {
          if (vw.Groups.Focused!=itm.Group)
            vw.Groups.Focused=itm.Group; //itm.Group.Items.Container.focus();
          if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.Item.Select (exiting)");
          return;
        };
        if (vw.UIC.debugToConsole==true) coVDM.VDM.Console.Append("ThreadView.Item.Select");
        vw.Selected=itm;
        for (var iLcv=0; iLcv<vw.Tools.length; iLcv++){
          tl=vw.Tools[iLcv];
          itm.Header.Stamp.Tools[tl.Name].style.opacity=coTheme.UI.ThreadView.Tools.Opacity.Active;
        };

        if (Assigned(oldItm)==true) oldItm.Normalize();

        itm.Container.focus();
        itm.Client.style.backgroundColor=coTheme.UI.ThreadView.Background.Color.Selected.toString();
        vw.doItemSelect(itm);
        if (vw.Visible==true) {
          if (vw.Groups.Focused!=itm.Group){
            /*
            var scTop=vw.Groups.Container.scrollTop;
            itm.Group.Items.Container.focus();
            vw.Groups.Container.scrollTop=scTop;
            */
          };
          var idx=itm.Group.Items.indexOf(itm);
          vw.scrollInView(itm.Client,vw.Groups.Container,coTheme.UI.ThreadView.Group.scrollBias);
        };
        if (vw.onSelectItem) vw.onSelectItem(itm);
      };
      itm.Normalize=function(){
        var itm=this;
        var vw=itm.View;
        var tl=null;
        if (vw.Selected==itm) {
          itm.Client.style.backgroundColor=coTheme.UI.ThreadView.Background.Color.Selected.toString();
          for (var iLcv=0; iLcv<vw.Tools.length; iLcv++){
            tl=vw.Tools[iLcv];
            itm.Header.Stamp.Tools[tl.Name].style.opacity=coTheme.UI.ThreadView.Tools.Opacity.Idle;
          };
        } else {
          itm.Client.style.backgroundColor="transparent";
          for (var iLcv=0; iLcv<vw.Tools.length; iLcv++){
            tl=vw.Tools[iLcv];
            itm.Header.Stamp.Tools[tl.Name].style.opacity=(tl.Permanent==true)? coTheme.UI.ThreadView.Tools.Opacity.Idle: coTheme.UI.ThreadView.Tools.Opacity.Hidden;
          };
        };
        vw.doItemNormalize(itm);
      };
      itm.Hover=function(){
        var itm=this;
        var vw=itm.View;

        if (vw.Hover==itm) return;

        var oldItm=vw.Hover;
        var scTop=tl=null;

        if (oldItm) {
          oldItm.Normalize();
        };

        itm.Client.style.backgroundColor=coTheme.UI.ThreadView.Background.Color.Hover.toString();

        vw.Hover=itm;
        if (vw.Groups.Focused!=itm.Group) {
          /*
          var scTop=vw.Groups.Container.scrollTop;
          itm.Group.Items.Container.focus();
          vw.Groups.Container.scrollTop=scTop;
          */
        };

        for (var iLcv=0; iLcv<vw.Tools.length; iLcv++){
          tl=vw.Tools[iLcv];
          itm.Header.Stamp.Tools[tl.Name].style.opacity=coTheme.UI.ThreadView.Tools.Opacity.Idle;
        };

        vw.doItemHover(itm);
      };
      itm.Free=function(){
        var itm=this;
        var el=sel=null;
        var scTop1=scTop2=oTop1=oTop2=oVal1=oVal2=0;
        var vw=itm.View;

        vw.scrollLock=true;
        try {
          if (vw.Selected==itm) vw.Next();
          if (vw.Hover==itm) vw.Hover=null;

          sel=(Assigned(vw.Selected)==true)?vw.Selected:null;
          if (sel){
            scTop1=vw.Groups.Container.scrollTop;
            oTop1=coDOM.getOffsetTop(sel.Container,vw.Groups.Container);
            oVal1=oTop1-scTop1;
          };

          var idx=itm.List.indexOf(itm);
          if (idx==-1)
            idx=itm.Group.Items.indexOf(itm);
          if (idx!=-1) itm.List.splice(idx,1);

          el=itm.Container.EventList;
          if (el) el=el.Free();

          el=itm.Client.EventList;
          if (el) el=el.Free();

          itm.Lines.Free();
          itm.Header.Free();
          itm.Thread.Free();

          itm.Container.removeChild(itm.Client);
          itm.Parent.removeChild(itm.Container);

          if (sel){
            scTop2=vw.Groups.Container.scrollTop;
            oTop2=coDOM.getOffsetTop(sel.Container,vw.Groups.Container);
            oVal2=oTop2-scTop2;
            if (scTop1!=scTop2){
              vw.Groups.Container.scrollTop-=(oVal1-oVal2);
            };
          };
          vw.scrollLock=false;
          itm=coObject.Release(itm);
        } catch (err) {
          vw.scrollLock=false;
        };

        return null;
      };
      itms.splice(0,0,itm);
      Data.Display.addItem(itm,v);
      if (v.onSynchronizeItem) v.onSynchronizeItem(itm);
      if (sel){
        scTop2=v.Groups.Container.scrollTop;
        oTop2=coDOM.getOffsetTop(sel.Container,v.Groups.Container);
        oVal2=oTop2-scTop2;
        if (scTop1!=scTop2){
          v.Groups.Container.scrollTop=oVal2;
        };
      };
      return itm;
    };
    vw.doShow=function(){
      vw=this;
      if (vw.dragInfo) vw.dragInfo.Hide();
      vw.Groups.Show();
    };
    vw.doResize=function(){

    };
    vw.doHide=function(){
      vw=this;
      if (vw.dragInfo) vw.dragInfo.Hide();
      vw.Groups.Hide();
    };
    vw.setDragInfo=function(srcIcon,sBlurb,sTarget,Item,Action,onAccepted,onRejected,onCanceled,onCommited){
      var vw=this;
      if (vw.dragInfo) {
        vw.dragInfo.setInfo(srcIcon,sBlurb,sTarget,Item,Action);
        vw.dragInfo.onAccepted=onAccepted;
        vw.dragInfo.onRejected=onRejected;
        vw.dragInfo.onCanceled=onCanceled;
        vw.dragInfo.onCommited=onCommited;
      } else {
        vw.dragInfo=coDragDrop.createInfo(
          srcIcon,sBlurb,sTarget,
          Item,Action,
          onAccepted,onRejected,onCanceled,onCommited
        );
      };
      return vw.dragInfo;
    };
    vw.Next=function(SkipThread){
      if (SkipThread==undefined) SkipThread=false;
      var vw=this;
      var itm=vw.Selected;
      var idx=-1;
      var gps=vw.Groups;
      var gLcv=0;
      var gp=null;
      var gpNext=null;
      var div=null;
      var itmNext=null;
      if (itm) {
        var itms=itm.List; // could be group list or thread
        if ((itm.Thread.Items.length==0) || (SkipThread==true)) {
          itmNext=itm.getRoot();
          div=(SkipThread==true)? itmNext.Container.nextSibling : itmNext.Container.nextSibling;
          while ((!div) && (itmNext)){
            switch (itmNext.Owner.Class) {
              case ("mailThread") : {
                itmNext=itmNext.Owner.Owner;
                div=itmNext.Container.nextSibling;
                break;
              };
              case ("ThreadViewGroup") : {
                gp=itmNext.Owner;
                div=null;
                while ((div==null) && (gp)){
                  gpNext=gps.Next(gp);
                  if (gpNext){
                    if  (gpNext.Items.length>0) {
                      div=gpNext.Items[0].Container;
                    } else {;
                      gp=gpNext;
                    };
                  } else {
                    itmNext=null;
                    gp=null;
                  };
                };
                break;
              };
            };
          };
          if (div==null) div=itm.Owner.Owner.Container.nextSibling;
          if (div) {
            div.Owner.Select();
            return div.Owner;
          } else {
            return null;
          };
        } else {
          itm.Thread.Items[0].Select();
        };
      } else {
        var gp=null;
        var gps=vw.Groups;
        var idxG=-1;
        while ( (gpNext==null) && (gLcv<2) ) {
          idxG++;
          if (idxG>=gps.length) {
            idxG=0;
            gLcv++;
          };
          gp=gps[idxG];
          if (gp.Items.length>0) gpNext=gp;
        };
        if (gpNext!=null){
          itm=gpNext.Items[0];
          itm.Select();
          return itm;
        };
        return null;
      };
    };
    vw.Previous=function(SkipThread){
      if (SkipThread==undefined) SkipThread=false;
      var vw=this;
      var itm=vw.Selected;
      var idx=-1;
      var gps=vw.Groups;
      var gLcv=0;
      var gp=null;
      var gpPrev=null;
      var div=null;
      var itmPrev=null;
      if (itm) {
        var itms=itm.List; // could be group list or thread
        div=itm.Container.previousSibling;
        if (div){
          div=div.Owner.Thread.Last().Container;
        } else {
          itmPrev=itm;
          while ((!div) && (itmPrev)){
            switch (itmPrev.Owner.Class) {
              case ("mailThread") : {
                  itmPrev=itmPrev.Owner.Owner;
                  div=itmPrev.Container;
                  break;
              };
              case ("ThreadViewGroup") : {
                gp=itmPrev.Owner;
                div=null;
                while ((div==null) && (gp)){
                  gpPrev=gps.Previous(gp);
                  if (gpPrev){
                    if  (gpPrev.Items.length>0) {
                      div=gpPrev.Items[gpPrev.Items.length-1].Container;
                    } else {;
                      gp=gpPrev;
                    };
                  } else {
                    itmPrev=null;
                    gp=null;
                  };
                };
                break;
              };
            };
          };
          if (div==null) div=itm.Container;
        };
        div.Owner.Select();
        return div.Owner;
      } else {
        var gp=null;
        var gps=vw.Groups;
        var idxG=-1;
        while ( (gpPrev==null) && (gLcv<2) ) {
          idxG--;
          if (idxG<0) {
            idxG=gps.length-1;
            gLcv++;
          };
          gp=gps[idxG];
          if (gp.Items.length>0) gpPrev=gp;
        };
        if (gpPrev!=null){
          itm=gpPrev.Items[gpPrev.Items.length-1];
          itm.Select();
          return itm;
        };
        return null;
      };
    };
    vw.First=function(){
      var gp=null;
      var gps=vw.Groups;
      var idxG=-1;
      var gpNext=null;
      var gLcv=0;
      while ( (gpNext==null) && (gLcv<2) ) {
        idxG++;
        if (idxG>=gps.length) {
          idxG=0;
          gLcv++;
        };
        gp=gps[idxG];
        if (gp.Items.length>0) gpNext=gp;
      };
      if (gpNext!=null){
        itm=gpNext.Items[0];
        itm.Select();
        return itm;
      };
      return null;
    };
    vw.Last=function(){
      var gp=null;
      var gps=vw.Groups;
      var idxG=-1;
      var gpPrev=null;
      var gLcv=0;
      while ( (gpPrev==null) && (gLcv<2) ) {
        idxG--;
        if (idxG<0) {
          idxG=gps.length-1;
          gLcv++;
        };
        gp=gps[idxG];
        if (gp.Items.length>0) gpPrev=gp;
      };
      if (gpPrev!=null){
        itm=gpPrev.Items[gpPrev.Items.length-1];
        itm.Select();
        return itm;
      };
      return null;
    };
    vw.Groups=vw._createGroups();
    vw._doFree=vw.Free;
    vw.Free=function(){
      var vw=this;
      vw.Container.EventList.Free();
      vw.Mode.Free();
      vw.Groups.Free();
      vw.DB=null;
      vw=_doFree();
      return null;
    };
    return vw;
  }
};

