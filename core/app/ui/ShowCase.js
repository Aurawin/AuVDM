coAppUI.App.Components.ShowCase = {
  Version        : new Version(2018,3,8,69),
  Title          : new Title("Aurawin UI ShowCase","ShowCase"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2018.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/ShowCase.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Default;

    var _vw=Slides.createSlide(sName,sClass+" ShowCase",Screen,Owner,Parent,Align);
    _vw.Class=sClass;

    _vw.Scroller=document.createElement('div');
    _vw.Container.appendChild(_vw.Scroller);
    _vw.Scroller.className=sClass+"Scroller";
    _vw.Scroller.style.display="block";
    _vw.Scroller.style.height="100%";
    _vw.Scroller.Owner=_vw;
    _vw.showButtons=true;
    _vw.autoNameButtons=true;
    _vw.AutoSize=false;
    _vw.toResize=0;
    _vw.Mouse=new MouseInfo(_vw);
    _vw.Touch=new TouchInfo(_vw);
    _vw.PageItemPosition=coAppUI.Absolute;
    _vw.PageContentPosition=coAppUI.Absolute;
    _vw.ClientPosition=coAppUI.Relative;

    _vw.Client=document.createElement('div');
    _vw.Scroller.appendChild(_vw.Client);
    _vw.Client.className="ShowCaseClient "+sClass+"Client";
    _vw.Client.Owner=_vw;
    _vw.onSelectItem=null;
    _vw.onAutoSize=null;
    if (coVDM.VDM.Browser.Mouse==true){
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coDragDrop.inf Creating Mouse Events");
      _vw.Mouse.evtStart=coEvents.Add(_vw.Container,"mousedown",function(e){var vw=_vw; vw.doMouseDown(e);},coEvents.Capture,coEvents.Activate);
      _vw.Mouse.evtMove=coEvents.Add(_vw.Container,"mousemove",function(e){var vw=_vw; vw.doMouseMove(e);},coEvents.NoCapture,coEvents.NoActivate);
      _vw.Mouse.evtDone=coEvents.Add(_vw.Container,"mouseup",function(e){var vw=_vw; vw.doMouseUp(e);},coEvents.Capture,coEvents.NoActivate);
    };
    _vw.Mouse.onDone=function(){
       var ti = this;
       var vw = ti.Owner;
       if (ti.ptVector.X>50) {
          vw.Items.selectPrevious();
       } else if (ti.ptVector.X<-50) {
         vw.Items.selectNext();
       }
    };

    _vw.Touch.evtStart=coEvents.Add(_vw.Container,"touchstart",function(e){var vw=_vw; vw.doTouchStart(e);},coEvents.Capture,coEvents.Activate);
    _vw.Touch.evtMove=coEvents.Add(_vw.Container,"touchmove",function(e){var vw=_vw; vw.doTouchMove(e);},coEvents.NoCapture,coEvents.NoActivate);
    _vw.Touch.evtDone=coEvents.Add(_vw.Container,"touchend",function(e){var vw=_vw; vw.doTouchEnd(e);},coEvents.NoCapture,coEvents.NoActivate);
    _vw.Touch.onDone=function(){
       var ti = this;
       var vw = ti.Owner;
       if (ti.ptVector.X>50) {
         vw.Items.selectPrevious();
       } else if (ti.ptVector.X<-50) {
         vw.Items.selectNext();
       }
    };
    _vw.doMouseDown=function(e){
      if (e==undefined) e=window.event;
      var vw=this;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coAppUI.ShowCase.doMouseDown");
      vw.Mouse.Start(e);
    };
    _vw.doMouseMove=function(e){
      if (e==undefined) e=window.event;
      var vw=this;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coAppUI.ShowCase.doMouseDown");
      vw.Mouse.Update(e);
    };
    _vw.doMouseUp=function(e){
      if (e==undefined) e=window.event;
      var vw=this;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coAppUI.ShowCase.doMouseUp");
      vw.Mouse.Done(e);
    };
    _vw.doTouchStart=function(e){
      if (e==undefined) e=window.event;
      var vw=this;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coAppUI.ShowCase.doTouchStart");
      vw.Touch.Start(coDOM.getLastTouch(e));
    };
    _vw.doTouchMove=function(e){
      if (e==undefined) e=window.event;
      var vw=this;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coAppUI.ShowCase.doTouchMove");
      vw.Touch.Update(coDOM.getLastTouch(e));
    };
    _vw.doTouchEnd=function(e){
      if (e==undefined) e=window.event;
      var vw=this;
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coAppUI.ShowCase.doTouchEnd");
      vw.Touch.Done(coDOM.getLastTouch(e));
    };
    if (coVDM.VDM.Browser.Mouse==true){
      if (coDragDrop.debugToConsole==true)
        coVDM.VDM.Console.Append("coAppUI.Showcase (Activating Mouse Events)");
      _vw.Mouse.evtStart.setActive(true);
      _vw.Mouse.evtMove.setActive(false);
      _vw.Mouse.evtDone.setActive(false);

    };
    if (coDragDrop.debugToConsole==true)
      coVDM.VDM.Console.Append("coDragDrop.inf.Show (Activating Touch Events)");
      _vw.Touch.evtStart.setActive(true);
      _vw.Touch.evtMove.setActive(false);
      _vw.Touch.evtDone.setActive(false);

    _vw.doTransitionEnd=function(){
      this.Owner.Screen.tmrResize.setActive(true);
    };
    _vw.evtTransitionEnd=coEvents.Add(
      _vw.Client,
      coDOM.TransitionEnd,
      _vw.doTransitionEnd,
      coEvents.NoCapture,
      coEvents.Active
    );

    _vw._Free=_vw.Free;
    _vw.tmrAutoResize=coApp.Timers.createItem(coVDM.AutoResizeShowCaseDelay);
    _vw.tmrAutoResize.Owner=_vw;
    _vw.tmrAutoResize.RunOnce=true;
    _vw.tmrAutoResize.onExecute=function(tmr){
      var vw=tmr.Owner;
      var itm=tmr.Data;
      vw.onAutoSize(itm.Page.Content.scrollWidth,itm.Page.Content.scrollHeight);
    };
    _vw.setScrollerBackgroundColor=function(sColor){
      var vw=this;
      vw.Scroller.style.backgroundColor=sColor;
    };
    _vw.setScrollerBackgroundImage=function(sURL){
      var vw=this;
      vw.Scroller.style.backgroundImage="url("+sURL+")";
    };
    _vw.Torus=coAppUI.App.Components.Torus.Create(Screen.Frame,_vw,_vw.Container,"block");
    _vw._createItems=function(){
      var vw=this;
      var itms=new Array();
      itms.Owner=vw;
      itms.Selected=null;
      itms.selectNext=function(){
        var itms=this;
        var vw=itms.Owner;
        var idx=itms.indexOf(itms.Selected);
        var idxMax=itms.length-1;
        if (idx<idxMax) {
          idx+=1;
        }
        itms[idx].Button.Select();
      };
      itms.selectPrevious=function(){
        var itms=this;
        var vw=itms.Owner;
        var idx=itms.indexOf(itms.Selected);
        if (idx!=0) {
          idx-=1;
        };
        itms[idx].Button.Select();
      };
      itms.Serialize=function(){
        var itms=this;
        var sResult="";
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          var sData=itm.Page.Controls.Serialize();
          if ( (sData) && (sData.length>0))
            sResult+=sData;
        };
        var idx=sResult.lastIndexOf("&");
        if ((idx>-1) && (idx==sResult.length-1))
          sResult=sResult.substring(0,idx);
        return sResult;
      };
      itms.addItem=function(){
        var itms=this;
        var vw=itms.Owner;
        var itm=coObject.Create(coObject.relInline,coObject.cpyAsVar,"ShowCaseItem");
        itm.Owner=vw;
        itms.push(itm);
        itm.onSelected=null;
        itm.Page=coAppUI.App.Components.PageView.Create("ShowCasePage",itm.Class,vw.Screen,vw.Slides,vw,vw.Client,coAppUI.Alignment.Left);
        itm.Page.displayMode="inline-block";
        itm.Page.ShowCaseItem=itm;
        itm.Page.Container.className=itm.Class;
        itm.Page.Client.className=itm.Class+"Client";
        itm.Page.Container.style.position=vw.PageItemPosition;
        itm.Page.Client.style.position=vw.PageClientPosition;
        itm.Page.Content.style.position=vw.PageContentPosition;
        itm.Page.onLoaded=function(Page){
          var itm=Page.ShowCaseItem;
          var vw=itm.Owner;
          if (itm==vw.Items.Selected){
            if (vw.onAutoSize)
              vw.onAutoSize(itm.Page.Content.scrollWidth,itm.Page.Content.scrollHeight);
          };
        };
        itm.Button=vw.Buttons.createButton(itm);
        itm.AutoSize=function(){
          var itm=this;
          var vw=this.Owner;
          if (vw.onAutoSize)
            vw.onAutoSize(itm.Page.Content.scrollWidth,itm.Page.Content.scrollHeight);
        };

        itm.Free=function(){
          var itm=this;
          itm.Button.Free();

          var lst=itm.Owner.Items;
          var idx=lst.indexOf(itm);

          if (idx!=-1) lst.spice(idx,1);

          if (itm.Owner.Selected==itm) itm.Owner.Selected=null;
          if (vw.autoNameButtons==true)
            vw.Buttons.adjustCaptions();
          itm=coObject.Release(itm);
          return null;
        };
        return itm;
      };
      itms.Free=function(){
        var itms=this;
        var vw=itms.Owner;
        while (itms.length>0){
          var itm=itms[iLcv];
          itm.Free();
        };
        return null;
      };
      return itms;
    };
    _vw._createButtons=function(){
      var vw=this;
      var lst=new Array();
      lst.Owner=vw;
      lst.Parent=vw.Container;
      lst.Container=document.createElement('div');
      lst.Parent.appendChild(lst.Container);
      lst.Container.className="ShowCaseButtons "+vw.Class+"ShowCaseButtons";
      lst.cssLoaded=false;

      lst.Margin=new Margin();
      lst.Padding=new Padding();
      lst.Border=new Border();

      lst.Client=document.createElement('div');
      lst.Container.appendChild(lst.Client);
      lst.Client.className="ShowCaseButtonList";

      lst.Label=document.createElement('label');
      lst.Container.appendChild(lst.Label);
      lst.Label.className="ShowCaseButtonListLabel";
      lst.Label.style.display="none";

      lst.loadCSS=function(){
        var lst=this;
        lst.cssLoaded=true;
        lst.Margin.Load(this.Container);
        lst.Padding.Load(this.Container);
        lst.Border.Load(this.Container);
      };
      lst.placeBottomOutside=function(){
        var lst=this;
        lst.Container.style.top="";
        lst.Container.style.left="";
        lst.Container.style.right="0px";
        lst.Container.style.bottom="-" + lst.Container.offsetHeight +"px";
        lst.placeButtons=lst.placeBottomOutside;
      };
      lst.placeTopOutside=function(){
        var lst=this;
        lst.Container.style.bottom="";
        lst.Container.style.top="-" + lst.Container.offsetHeight +"px";
        lst.Container.style.left="";
        lst.Container.style.right="0px";
        lst.placeButtons=lst.placeTopOutside;
      };
      lst.placeTopCenterInside=function(){
        var lst=this;
        lst.Container.style.top="0px";
        lst.Container.style.bottom="";
        lst.Container.style.right="";
        var iLeft=((lst.Owner.Container.clientWidth/2) - (lst.Container.offsetWidth/2));
        lst.Container.style.left=iLeft+"px";
        lst.placeButtons=lst.placeTopCenterInside;
      };
      lst.placeBottomInside=function(){
        var lst=this;
        lst.Container.style.left="";
        lst.Container.style.top="";
        lst.Container.style.bottom="0px";
        lst.Container.style.right="0px";
        lst.placeButtons=lst.placeBottomInside;
      };
      lst.placeButtons=lst.placeBottomInside;

      lst.Show=function(){
        var lst=this;
        lst.placeButtons();
        lst.Container.style.visibility="visible";
      };
      lst.Hide=function(){
        var lst=this;
        lst.Container.style.visibility="hidden";
      };
      lst.createButton=function(scItem){
        var lst=this;
        var vw=lst.Owner;
        var btn=coObject.Create(coObject.relInline,coObject.cpyAsVar,"ShowCaseButton");
        btn.Parent=lst.Client;
        btn.Container=document.createElement('div');
        btn.Visible=true;
        btn.Hidden=false;
        btn.Owner=vw;
        btn.ShowCaseItem=scItem;
        btn.Parent.appendChild(btn.Container);
        btn.Container.Owner=btn;
        btn.Container.className=btn.Class;
        btn.Container.style.height+coVDM.ShowCaseButtonHeight+"px";
        var ct=lst.push(btn);
        btn.Caption=""+ct;
        coDOM.setText(btn.Container,btn.Caption);
        btn.doClick=function(e){
          var btn=this;
          btn.Owner.Torus.Start();
          btn.Select();
          coDOM.preventDefault(e);
          btn.Owner.Torus.Stop();
        };
        btn.Container.ontouchstart=function(e){
          var btn=this.Owner;
          coEvents.ScrollLock.Lock(coVDM.TouchButtonDelay);
        };
        btn.Container.onmousedown=function(e){
          var btn=this.Owner;
          coEvents.ScrollLock.Lock(coVDM.TouchButtonDelay);
        };
        btn.Container.ontouchend=function(e){
          var btn=this.Owner;
          btn.doClick(e);
        };
        btn.Container.onmouseup=function(e){btn.doClick(e);};
        btn.setHeight=function(Height){
          var btn=this;
          btn.Container.style.height=Height+"px";
          btn.Container.style.lineHeight=Height+"px";
        };
        btn.setCaption=function(Caption){
          var btn=this;
          var vw=btn.Owner;
          vw.autoNameCaptions=false;
          coDOM.setText(btn.Container,Caption);
          btn.Caption=Caption;
        };
        btn.Conseal=function(){
          var btn=this;
          btn.Container.style.display="none";
          btn.Visible=false;
          btn.Hidden=true;
        };
        btn.Reveal=function(){
          var btn=this;
          btn.Container.style.display="inline-block";
          btn.Visible=true;
          btn.Hidden=false;
        };
        btn.Select=function(){
          var btn=this;
          var vw=btn.Owner;
          coEvents.ScrollLock.Lock(coVDM.TouchButtonDelay);
          var itm=btn.ShowCaseItem;

          vw.Screen.Frame.vScrolls.HideAll();

          vw.Client.style.left="-"+btn.ShowCaseItem.Page.Container.offsetLeft+"px";
          var scSel=vw.Items.Selected;

          if (scSel!=itm){

            if (scSel) {
              scSel.Button.Container.className=scSel.Button.Class;
            };
            vw.Items.Selected=itm;
            btn.Container.className=btn.Class+"Selected";
            if (vw.onSelectItem)
              vw.onSelectItem(itm);
            if (btn.ShowCaseItem.onSelected)
              btn.ShowCaseItem.onSelected(itm);

            if ((vw.AutoSize==true) && (itm) ) {
              vw.tmrAutoResize.Data=itm;
              vw.tmrAutoResize.setActive(true);
            };
          };
        };
        btn.Free=function(){
          var btn=this;

          btn.Parent.removeChild(btn.Container);

          var lst=btn.Owner.Buttons;
          var idx=lst.indexOf(btn);
          if (idx!=-1)  lst.splice(idx,1);

          btn=coObject.Release(btn);
          return null;
        };
        return btn;
      };
      lst.Free=function(){
        var lst=this;
        while (lst.length>0) {
          var btn=lst[iLcv];
          btn.Free();
        };
        lst.Container.removeChild(lst.Label);
        lst.Container.removeChild(lst.Client);
        lst.Parent.removeChild(lst.Container);
      };
      lst.setLabel=function(sLabel){
        var lst=this;
        lst.Label.style.display= (sLabel.length>0) ? "block" : "none";
        coDOM.setText(lst.Label,sLabel);
      };
      lst.adjustCaptions=function(){
        var lst=this;
        for (iLcv=0; iLcv<lst.length; iLcv++){
          var btn=lst[iLcv];
          btn.Caption=""+iLcv;
          coDOM.setText(btn.Container,btn.Caption);
        };
      };
      lst.loadCSS();
      return lst;
    };
    _vw.Items=_vw._createItems();
    _vw.Buttons=_vw._createButtons();
    _vw.Free=function(){
      var vw=this;

      vw.Items=vw.Items.Free();
      vw.Buttons=vw.Buttons.Free();

      vw.Scroller.removeChild(vw.Client);
      vw.Container.removeChild(vw.Scroller);

      vw.Client=null;
      vw.Scroller=null;

      vw=vw._Free();
      return null;
    };
    _vw.doShow=function(){
      var vw=this;

      if (vw.showButtons==true) {
        vw.Buttons.Show();
      } else {
        vw.Buttons.Hide();
      };
      if ((vw.Items.Selected==null) && (vw.Items.length>0)){
        if (vw.toResize!=0)
          clearTimeout(vw.toResize);
        vw.toResize=setTimeout(function(){vw.Items[0].Button.Select();},250);
      };
    };
    _vw.onHide=function(){
      var vw=this;
      vw.Buttons.Hide();
    };
    _vw.onResize=function(){
      var vw=this;
      var iWidth=vw.Container.clientWidth;
      var sWidth=iWidth+"px";
      vw.Scroller.style.width=sWidth;
      vw.Buttons.placeButtons();
      if (vw.Items.Selected) {
        if (vw.toResize!=0)
          clearTimeout(vw.toResize);
        vw.toResize=setTimeout(function(){vw.Items.Selected.Button.Select();},250);
      };

      for (var iLcv=0; iLcv<vw.Items.length; iLcv++){
        var itm=vw.Items[iLcv];
        itm.Page.Container.style.width=sWidth;
      };

    };
    return _vw;
  }
}
