coAppUI.App.Components.Panels = {
  Version        : new Version(2014,9,17,125),
  Title          : new Title("Aurawin UI Panels","Panels"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Panels.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function(sName,sClass,Frame,Owner,Parent,Align,AutoSize,vScroll){
    if (!Align)
      Align=coAppUI.Alignment.Default;
    if (!AutoSize)
      AutoSize=true;
    if (!vScroll)
      vScroll=false;
    var _pnls=new Array();
    _pnls.API=this;
    _pnls.Frame=Frame;
    _pnls.Screen=Frame.Screen;
    _pnls.recurseRelease=false;
    _pnls.copyAsVar=true;
    _pnls.Class=sClass;
    _pnls.Name=sName;
    _pnls.Owner=Owner;
    _pnls.Parent=Parent;
    _pnls.Panels=null;
    _pnls.Position=new Position();
    _pnls.Border=new Border();
    _pnls.Margin=new Margin();
    _pnls.Padding=new Padding();
    _pnls.onShow=null;
    _pnls.onResize=null;
    _pnls.innerPosition=new Position();
    _pnls.Visible=true;
    _pnls.Hidden=false;
    _pnls.vScroll=null;
    _pnls.hScroll=null;
    _pnls.AutoSize=AutoSize;
    _pnls.MultiLine=false;
    _pnls.Align=new Alignment(Align);
    _pnls.Container=document.createElement('div');
    _pnls.Parent.appendChild(_pnls.Container);
    _pnls.Container.className=_pnls.Class;
    _pnls.Container.Owner=_pnls;
    _pnls.Width=0;
    _pnls.Height=0;
    _pnls.Commit=function(){
      var pnls=this;
      for (var iLcv=0; iLcv<pnls.length; iLcv++){
        var pnl=pnls[iLcv];
        pnl.Commit();
      };
    };
    _pnls.setRecord=function(itm,showTorus){
      if (!showTorus) showTorus=false;
      var pnls=this;
      if (showTorus==true)
        pnls.Frame.Torus.Show();
      for (var iLcv=0; iLcv<pnls.length; iLcv++){
        var pnl=pnls[iLcv];
        pnl.setRecord(itm);
      };
    };
    _pnls.getRoot=function(){
      var pnls=this;
      if (pnls.Owner.Owner)  {
        return  (pnls.Owner.Owner.Panels) ? pnls.Owner.Owner.Panels.getRoot() : pnls;
      } else {
        return pnls;
      };
    };
    _pnls.getVScroll=function(){
      var pnls=this;
      if (pnls.vScroll) {
        return pnls.vScroll;
      };
      var oo=pnls.Owner.Owner;
      if (oo) {
        if (oo.Panels) {
          return (oo.Panels.vScroll) ? oo.Panels.vScroll : oo.Panels.getVScroll();
        } else {
           return (oo.getVScroll)? oo.getVScroll() : oo.vScroll;
        }
      } else {
        return pnls.vScroll;
      };
    };
    _pnls.getVerticalCount=function(){
      var pnls=this;
      var iCount=0;
      for (var iLcv=0; iLcv<pnls.length; iLcv++){
        var pnl=pnls[iLcv];
        if ((pnl.Align.Index==pnl.Align.Top) || (pnl.Align.Index==pnl.Align.Bottom) || (pnl.Align.Index==pnl.Align.Client) || (pnl.Align.Index==pnl.Align.Center))
          iCount++;
      };
      return iCount;
    };
    _pnls._createPanelKind=function(Value){
      var _knd=new Object();
      _knd.recurseRelease=true;
      _knd.copyAsVar=true;
      _knd.Index=Value;
      _knd.Blank=0;
      _knd.LabeledText=1;
      _knd.LabeledCombo=2;
      _knd.LabeledMemo=3;
      _knd.LabeledIconList=4;
      _knd.IconList=5;
      _knd.Label=6;
      _knd.Text=7;
      _knd.Memo=8;
      _knd.Combo=9;
      _knd.Caption=10;
      _knd.Editor=11;
      _knd.Panels=12;
      _knd.Image=13;
      _knd.Movie=14;
      _knd.ProgressBar=15;

      _knd.isText=function(){
        var knd=this;
        return ((knd.Index==5) || (knd.Index==6));
      };
      _knd.Clone=function(Value){
        return _pnls._createPanelKind(Value);
      };
      _knd.Free=function(){
        _knd=Release(_knd);
        return null;
      };
      return _knd;
    };
    _pnls.createCaption=function(sCaption,sName,sClass){
      var pnls=this;
      var pnl=pnls.createItem(sCaption,pnls.Kind.Caption,sName,sClass,pnls.Align.Top);
      return pnl;
    };
    _pnls.createProgressBar=function(sCaption,sName,sClass,Align){
      var pnls=this;
      var pnl=pnls.createItem(sCaption,pnls.Kind.ProgressBar,sName,sClass,Align);
      pnl.Control=coAppUI.App.Components.ProgressBar.Create(pnl,pnl.Container);
      pnl.Control.Placement.Mode.Value=pnl.Control.Placement.Mode.Center;
      pnl.Control.Placement.Enforce(pnl.Control.Container);
      pnl.onShow=function(){
        var pnl=this;
        pnl.Control.Placement.Enforce(pnl.Control.Container);
      };
      pnl.onSetSize=function(){
        var pnl=this;
        pnl.Control.Placement.Enforce(pnl.Control.Container);
      };
      pnl.onFree=function(){
        var pnl=this;
        pnl.evtResize.Free();
        pnl.Container.EventList.Free();
        pnl.Control.Free();
      };
      return pnl;
    };
    _pnls.createLabeledCombo=function(sLabel,sName,sClass){
      var pnls=this;
      var _pnl=pnls.createItem("",pnls.Kind.LabeledCombo,sName,sClass,pnls.Align.Top);
      _pnl.Panels=coAppUI.App.Components.Panels.Create("Label",sClass+"Items",pnls.Frame,_pnl,_pnl.Container,pnls.Align.Client,pnls.AutoSize,coAppUI.vScrollOff);
      _pnl.Label=_pnl.Panels.createItem(sLabel,pnls.Kind.Label,"Label",sClass+"Label",coAppUI.Alignment.Left);
      _pnl.Value=_pnl.Panels.createItem("",pnls.Kind.Combo,"Value",sClass+"Value",coAppUI.Alignment.Client);
      _pnl.Label.getHeight=function(){
        return coVDM.PanelLabelComboLabelHeight;
      };
      _pnl.Value.getHeight=function(){
        var val=this;
        var pnl=val.Owner;
        return pnl.Height-(pnl.Border.yBias()+pnl.Padding.yBias()+val.Border.yBias());
      };
      _pnl.Panels.getHeight=function(){
        return this.Owner.getHeight()-this.Padding.yBias();
      };
      _pnl.getHeight=function(){
        return coVDM.PanelLabeledComboHeight
      };
      _pnl.Panels.getWidth=function(){
        var pnls=this;
        var pnl=pnls.Owner;
        return pnl.Width+pnl.Label.getWidth()+pnl.Value.getWidth();
      };
      _pnl.Label.getWidth=function(){
        return this.Width;
      };
      _pnl.getWidth=function(){
        var pnl=this;
        return pnl.Width+pnl.Label.getWidth()+pnl.Value.getWidth();
      };
      _pnl.Height=coVDM.PanelLabeledComboHeight;
      _pnl.Commit=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null))
          pnl.DB.Record.setValue(pnl.DB.Field,pnl.Value.value);
        if (pnl.Panels!=null)
          pnl.Panels.Commit();
      };
      _pnl.getValue=function(){
        var pnl=this;
        return pnl.Value.Container.value;
      };
      _pnl.resetValues=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null)) {
          var sValue=pnl.DB.Record.getValue(pnl.DB.Field);
          var idx=pnl.Value.Options.indexOf(sValue);
          pnl.Value.itemIndex=idx;
        } else {
          pnl.Value.itemIndex=-1;
        }
      };
      return _pnl;
    };
    _pnls.createLabeledText=function(sLabel,sName,sClass){
      var pnls=this;
      var _pnl=pnls.createItem("",pnls.Kind.LabeledText,sName,sClass,pnls.Align.Top);
      // problem with setting size (not enough room here) both top and client alignements cause this
      _pnl.Panels=coAppUI.App.Components.Panels.Create("Label",sClass+"Items",_pnls.Frame,_pnl,_pnl.Container,pnls.Align.Client,pnls.AutoSize,coAppUI.vScrollOff);
      _pnl.Label=_pnl.Panels.createItem(sLabel,pnls.Kind.Label,"Label",sClass+"Label",coAppUI.Alignment.Left);
      _pnl.Value=_pnl.Panels.createItem("",pnls.Kind.Text,"Value",sClass+"Value",coAppUI.Alignment.Client);
      _pnl.Label.getWidth=function(){
        var pnl=this;
        return pnl.Width;
      };
      _pnl.onValueChanged=null;
      _pnl.doTouchEnd=function(e){
        var pnl=this;
        //coDOM.preventDefault(e);
        if (coVDM.vsFocusScrollToTop==false){
          if (pnls.API.debugToConsole==true)
            coVDM.VDM.Console.Append("Screen.Panels.LabeledText.doTouchEnd (exiting)");
          return;
        }
        coEvents.FocusLock.Touched=true;
        pnl.scrollToTop();
        if (pnls.API.debugToConsole==true)
          coVDM.VDM.Console.Append("Screen.Panels.LabeledText.doTouchEnd");
      };
      _pnl.doTouchStart=function(e){
        if (e==undefined) e=window.event;
        var pnl=this;
        var pnls=this.Owner;
        if (coVDM.vsFocusScrollToTop==false){
          if (pnls.API.debugToConsole==true)
            coVDM.VDM.Console.Append("Screen.Panels.LabeledText.doTouchStart(exiting)");
          return;
        }
        coDOM.preventDefault(e);

        coEvents.FocusLock.Touched=true;
        if (pnls.API.debugToConsole==true)
          coVDM.VDM.Console.Append("Screen.Panels.LabeledText.doTouchStart");
      };
      _pnl.doInputChange=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var pnl=this;
        if (pnl.onValueChanged) pnl.onValueChanged(pnl);
      };
      _pnl.evtInputChanged=coEvents.Add(_pnl.Value.Container,"change",function(e){var pnl=_pnl; pnl.doInputChange(e);},coEvents.Capture,coEvents.Active);
      _pnl.evtTouchEnd=coEvents.Add(_pnl.Label.Container,"touchend",function(e){var pnl=_pnl; pnl.doTouchEnd(e);},coEvents.Capture,coEvents.Active);
      _pnl.evtTouchStart=coEvents.Add(_pnl.Label.Container,"touchstart",function(e){var pnl=_pnl; pnl.doTouchStart(e);},coEvents.Capture,coEvents.Active);
      _pnl.Label.getHeight=function(){
        return coVDM.PanelLabelTextLabelHeight;
      };
      _pnl.getHeight=function(){
        return coVDM.PanelLabeledTextHeight;
      };
      _pnl.Panels.getWidth=function(){
        var pnls=this;
        var pnl=pnls.Owner;
        return pnl.Width+pnl.Label.getWidth()+pnl.Value.getWidth();
      };
      _pnl.getWidth=function(){
        var pnl=this;
        return pnl.Label.getWidth()+pnl.Value.getWidth()+pnl.Padding.xBias()+pnl.Border.xBias();
      };

      _pnl.Height=coVDM.PanelLabeledTextHeight;

      _pnl.Commit=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null))
          pnl.DB.Record.setValue(pnl.DB.Field,pnl.Value.Container.value);
        if (pnl.Panels!=null)
          pnl.Panels.Commit();
      };
      _pnl.resetValues=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null)) {
          pnl.Value.Container.value= (pnl.DB.Field.lookupValue) ? pnl.DB.Record.getValue(pnl.DB.Field) : pnl.DB.Field.Value;
        } else {
          pnl.Value.Container.value="";
        }
      };
      _pnl.getValue=function(){
        var pnl=this;
        return pnl.Value.Container.value;
      };
      _pnl.setValue=function(value){
        var pnl=this;
        pnl.Value.Container.value=value;
      };
      _pnl.getText=function(){
        var pnl=this;
        return coDOM.getText(pnl.Label.Container);
      };
      _pnl.setText=function(value){
        var pnl=this;
        pnl.Label.setText(value);
      };
      return _pnl;
    };
    _pnls.createIconList=function(Caption,Kind,sName,sClass,Align){
      var pnls=this;
      var pnl=pnls.createItem(Caption,Kind,sName,sClass,Align);
      pnl.Container.className=sClass;
      pnl.DB.Icon=null;
      pnl.DB.Caption=null;
      pnl.Items=new Array();
      pnl.Items.Owner=pnl;
      pnl.Items.Selected=null;
      pnl.Items.onSelected=null;
      pnl.Items.onClick=null;
      pnl.getHeight=function(){
        var pnl=this;
        return pnl.Height+pnl.Border.yBias()+pnl.Margin.yBias();
      };
      pnl.setSize=function(){
        var pnl=this;
      };
      pnl.onShow=function(){
        var pnl=this;
        pnl.Items.Show();
      };
      pnl.onHide=function(){
        var pnl=this;
        pnl.Items.Hide();
      };
      pnl.Items.Show=function(){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var ico=itms[iLcv];
          ico.Show();
        };
      };
      pnl.Items.Hide=function(){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var ico=itms[iLcv];
          ico.Hide();
        };
      };
      pnl.Items.setSelected=function(ico){
        var itms=this;
        var pnl=itms.Owner;
        if ( (itms.Selected) && (itms.Selected!=ico)){
          itms.Selected.Selected=false;
          itms.Selected.Decorate();
          itms.Selected=null;
        };
        itms.Selected=ico;
        if (ico){
          ico.Selected=true;
          ico.Decorate();
        };
      };
      pnl.Items.Clear=function(){
        var itms=this;
        var pnl=itms.Owner;
        itms.Loading=true;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var ico=itms[iLcv];
          ico.Free();
        };
        itms.Loading=false;
        itms.length=0;
      };
      pnl.Items.Add=function(sCaption,sIcon){
        var itms=this;
        var pnl=itms.Owner;
        var ico=coObject.Create();

        ico.Class="pnlIconListItem";
        ico.Parent=pnl.Container;
        ico.Owner=itms;
        ico.Selected=false;
        ico.Visible=false;

        ico.Container=document.createElement('div');
        ico.Parent.appendChild(ico.Container);
        ico.Container.className=ico.Class;
        ico.Container.Owner=ico;


        ico.Icon=document.createElement('div');
        ico.Container.appendChild(ico.Icon);
        ico.Icon.className=ico.Class+"ICON";
        ico.Icon.Owner=ico;
        if (sIcon) ico.Icon.style.backgroundImage="url("+sIcon+")";

        ico.Caption=document.createElement('div');
        ico.Container.appendChild(ico.Caption);
        ico.Caption.className=ico.Class+"CPTN";
        ico.Caption.Owner=ico;
        coDOM.setText(ico.Caption,sCaption);
        ico.Decorate=function(){
          var ico=this;
          if (ico.Selected==true){
            ico.Caption.className=ico.Class+"CPTNSEL";
            ico.Container.className=ico.Class+"SEL";
          } else {
            ico.Caption.className=ico.Class+"CPTN";
            ico.Container.className=ico.Class;
          };
        };
        ico.Hide=function(){
          var ico=this;
          ico.Caption.style.visibility="hidden";
          ico.Icon.style.visibility="hidden";
          ico.Container.style.visibility="hidden";
          ico.Visible=false;
        };
        ico.Show=function(){
          var ico=this;
          ico.Caption.style.visibility="visible";
          ico.Icon.style.visibility="visible";
          ico.Container.style.visibility="visible";
          ico.Visible=false;
        };
        ico.Container.onmouseover=function(e){
          if (e==undefined) e=window.event;
          coDOM.preventDefault(e);
          var elm=coDOM.currentTarget(e);
          var ico=elm.Owner;
          var itms=ico.Owner;
          itms.setSelected(ico);
        };
        ico.Container.onmouseout=function(e){
          if (e==undefined) e=window.event;
          coDOM.preventDefault(e);
          var elm=coDOM.currentTarget(e);
          var ico=elm.Owner;
          var itms=ico.Owner;
          itms.setSelected(null);
        };
        ico.Container.ontouchstart=function(e){
          if (e==undefined) e=window.event;
          coDOM.preventDefault(e);
          var elm=coDOM.currentTarget(e);
          var ico=elm.Owner;
          var itms=ico.Owner;
          itms.setSelected(ico);
        };
        ico.Container.ontouchend=function(e){
          if (e==undefined) e=window.event;
          var elm=coDOM.currentTarget(e);
          var ico=elm.Owner;
          var itms=ico.Owner;
          itms.setSelected(ico);
          if (itms.onClick) {
            coDOM.preventDefault(e);
            itms.Owner.Owner.Frame.Torus.Start();
            setTimeout(
              function(){
                itms.onClick(ico);
                itms.Owner.Owner.Frame.Torus.Stop();
              },
              coVDM.TouchMouseDelay
            );
          };
        };
        ico.Container.onclick=function(e){
          if (e==undefined) e=window.event;
          var elm=coDOM.currentTarget(e);
          var ico=elm.Owner;
          var itms=ico.Owner;
          itms.setSelected(ico);
          if (itms.onClick) {
            coDOM.preventDefault(e);
            itms.Owner.Owner.Frame.Torus.Start();
            setTimeout(
              function(){
                itms.onClick(ico);
                itms.Owner.Owner.Frame.Torus.Stop();
              },
              coVDM.TouchMouseDelay
            );
          };
        };
        ico.Free=function(){
          var ico=this;
          var itms=ico.Owner;

          ico.Container.removeChild(ico.Caption);
          ico.Container.removeChild(ico.Icon);
          ico.Parent.removeChild(ico.Container);

          if (itms.Loading!=true){
            var idx=itms.indexOf(ico);
            if (idx!=-1) itms.splice(idx,1);s
          };
          itm=coObject.Release(ico);
        };
        itms.push(ico);
        return ico;
      };

      return pnl;
    };
    _pnls.createLabeledIconList=function(sLabel,sName,sClass,fldCaption,fldIcon){
      if (fldCaption==undefined) fldCaption=null;
      if (fldIcon==undefined) fldIcon=null;
      var pnls=this;
      var _pnl=pnls.createItem("",pnls.Kind.LabeledIconList,sName,sClass,coAppUI.Alignment.Top);
      _pnl.Panels=coAppUI.App.Components.Panels.Create("Label",sClass+"Items",_pnls.Frame,_pnl,_pnl.Container,pnls.Align.Client,pnls.AutoSize,coAppUI.vScrollOff);
      _pnl.Label=_pnl.Panels.createItem(sLabel,pnls.Kind.Label,"Label",sClass+"Label",coAppUI.Alignment.Left);
      _pnl.Value=_pnl.Panels.createIconList("",pnls.Kind.IconList,"Value",sClass+"IconList",coAppUI.Alignment.Client);
      _pnl.DB.Caption=fldCaption;
      _pnl.DB.Icon=fldIcon;
      _pnl.Value.DB.Caption=fldCaption;
      _pnl.Value.DB.Icon=fldIcon;
      _pnl.doTouchEnd=function(e){
        var pnl=this;
        var pnls=this.Owner;
        coDOM.preventDefault(e);
        if (coVDM.vsFocusScrollToTop==false){
          if (pnls.API.debugToConsole==true)
            coVDM.VDM.Console.Append("Screen.Panels.LabeledIconList.doTouchEnd (exiting)");
          return;
        }
        coEvents.FocusLock.Touched=true;
        pnl.scrollToTop();
        if (pnls.API.debugToConsole==true)
          coVDM.VDM.Console.Append("Screen.Panels.LabeledIconList.doTouchEnd");
      };
      _pnl.doTouchStart=function(e){
        if (e==undefined) e=window.event;
        var pnl=this;
        var pnls=pnl.Owner;
        if (coVDM.vsFocusScrollToTop==false){
          if (pnls.API.debugToConsole==true)
            coVDM.VDM.Console.Append("Screen.Panels.LabeledIconList.doTouchStart(exiting)");
          return;
        }
        coDOM.preventDefault(e);

        coEvents.FocusLock.Touched=true;
        if (pnls.API.debugToConsole==true)
          coVDM.VDM.Console.Append("Screen.Panels.LabeledIconList.doTouchStart");
      };
      _pnl.doInputChange=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var pnl=this;
        if (pnl.onValueChanged) pnl.onValueChanged(pnl);
      };
      _pnl.evtTouchEnd=coEvents.Add(_pnl.Label.Container,"touchend",function(e){var pnl=_pnl; pnl.doTouchEnd(e);},coEvents.Capture,coEvents.Active);
      _pnl.evtTouchStart=coEvents.Add(_pnl.Label.Container,"touchstart",function(e){var pnl=_pnl; pnl.doTouchStart(e);},coEvents.Capture,coEvents.Active);

      _pnl.Panels.getHeight=function(){
        var pnls=this;
        var pnl=pnls.Owner;
        return pnl.Height+pnl.Border.yBias()+pnl.Padding.yBias();
      };
      _pnl.Panels.getWidth=function(){
        var pnls=this;
        var pnl=pnls.Owner;
        return pnl.Width+pnl.Label.getWidth()+pnl.Value.getWidth();
      };
      _pnl.Height=Math.max(_pnl.Height,_pnl.Value.Height,_pnl.Label.Height);

      _pnl.Commit=function(){
      };
      _pnl.resetValues=function(){
        var pnl=this;
        var ilv=pnl.Value;
        ilv.Items.Clear();
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null)) {
          var dbCol=pnl.DB.Record.getValue(pnl.DB.Field);
          for (var iLcv=0; iLcv<dbCol.Items.length; iLcv++){
            var dbItem=dbCol.Items[iLcv];
            var sCaption=dbItem.getValue(ilv.DB.Caption);
            var sIcon=(ilv.DB.Icon) ? dbItem.getValue(ilv.DB.Icon) : null;
            ilv.Items.Add(sCaption,sIcon);
          };
        }
      };
      _pnl.getValue=function(){
        var pnl=this;
        return pnl.Value;
      };
      _pnl.setValue=function(){
        throw coLang.Table.Exceptions.NotImplemented;
      };
      _pnl.getText=function(){
        var pnl=this;
        return pnl.Label.getText();
      };
      _pnl.getHeight=function(){
        var pnl=this;
        return pnl.Panels.getHeight();
      };
      _pnl.getWidth=function(){
        var pnl=this;
        return pnl.Label.getWidth()+pnl.Value.getWidth()+pnl.Padding.xBias()+pnl.Border.xBias();
      };
      _pnl.setText=function(value){
        var pnl=this;
        pnl.Label.setText(value);
      };
      return _pnl;
    };
    _pnls.createFullEditor=function(sName,sClass){
      var pnls=this;
      sName=makeID(sName);
      var _pnl=pnls.createItem("",pnls.Kind.Editor,sName,sClass,pnls.Align.Index);
      _pnl.Control=coAppUI.App.Components.RichEdit.Create(_pnl,_pnl.Container,"Editor",sClass);
      _pnl.Control.Placement.Mode.setFull();
      _pnl.Control.Placement.Top=5;
      _pnl.Control.Placement.Left=5;
      _pnl.Control.Placement.Right=5;
      _pnl.Control.Placement.Bottom=5;

      _pnl.getWidth=function(){
        var pnl=this;
        return pnl.Container.offsetWidth;
      };
      _pnl.onSetSize=function(){
        var pnl=this;
        pnl.Control.enforcePlacement();
      };
      _pnl.Commit=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null))
          pnl.DB.Record.setValue(pnl.DB.Field,pnl.Control.getText());
        if (pnl.Panels!=null)
          pnl.Panels.Commit();
      };
      _pnl.getValue=function(){
        var pnl=this;
        return pnl.Control.getText();
      };
      _pnl.resetValues=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null)) {
          pnl.Control.setText(pnl.DB.Record.getValue(pnl.DB.Field));
        } else {
          pnl.Control.setText("");
        };
      };
      _pnl.onShow=function(){
        var pnl=this;
      };
      return _pnl;
    };
    _pnls.createEditor=function(sName,sClass,Align){
      var pnls=this;
      var sID=makeID(sName);
      if (Align==undefined) Align=pnls.Align.Index;
      var _pnl=pnls.createItem("",pnls.Kind.Editor,sName,sClass,Align);
      _pnl.Control=coAppUI.App.Components.RichEdit.Create(_pnl,_pnl.Container,"Editor",sClass);
      _pnl.Control.Placement.Mode.setFull();
      _pnl.Control.Placement.Top=5;
      _pnl.Control.Placement.Left=5;
      _pnl.Control.Placement.Right=5;
      _pnl.Control.Placement.Bottom=5;
      _pnl.getWidth=function(){
        var pnl=this;
        return pnl.Container.offsetWidth;
      };
      _pnl.onSetSize=function(){
        var pnl=this;
        pnl.Control.enforcePlacement();
      };
      _pnl.Commit=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null))
          pnl.DB.Record.setValue(pnl.DB.Field,pnl.Control.getText());
        if (pnl.Panels!=null)
          pnl.Panels.Commit();
      };
      _pnl.getValue=function(){
        var pnl=this;
        return pnl.Control.getText();
      };
      _pnl.resetValues=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null)) {
          pnl.Control.setText(pnl.DB.Record.getValue(pnl.DB.Field));
        } else if ( pnl.Editor ) {
          pnl.Control.setText("");
        } else {
          pnl.Control.setText("");
        };
      };
      return _pnl;
    };
    _pnls.createLabeledMemo=function(sLabel,sName,sClass){
      var pnls=this;
      var _pnl=pnls.createItem("",pnls.Kind.LabeledMemo,sName,sClass,pnls.Align.Index);
      _pnl.Panels=coAppUI.Panels("Label",sClass+"Items",_pnl,_pnl.Container,pnls.Align.Index,pnls.AutoSize);
      _pnl.Label=_pnl.Panels.createItem(sLabel,pnls.Kind.Label,"Label",sClass,coAppUI.Alignment.Left);
      _pnl.Value=_pnl.Panels.createItem("",pnls.Kind.Memo,"Value",sClass,coAppUI.Alignment.Client);
      _pnl.Value.Text=document.createElement('textarea');
      _pnl.Value.Container.appendChild(_pnl.Value.Text);
      _pnl.Value.Text.className=sClass+"MemoBox";
      _pnl.Commit=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null))
          pnl.DB.Record.setValue(pnl.DB.Field,pnl.Value.Text.value);
        if (pnl.Panels!=null)
          pnl.Panels.Commit();
      };
      _pnl.getValue=function(){
        var pnl=this;
        return pnl.Value.Text.value;
      };
      _pnl.setValue=function(value){
        var pnl=this;
        pnl.Value.Text.value=value;
      };
      _pnl.getWidth=function(){
        var pnl=this;
        return pnl.Label.getWidth()+pnl.Value.getWidth();
      };
      _pnl.resetValues=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null)) {
          pnl.Value.Text.value=pnl.DB.Record.getValue(pnl.DB.Field);
        } else {
          pnl.Value.Text.value="";
        };
      };
      _pnl.onSetVisibility=function(Value){
        var pnl=this;
        pnl.Value.Text.style.visibility=((Value==true) && (pnl.Hidden==false))? "visible" : "hidden";
      };
      return pnl;
    };

    _pnls.createMemo=function(sName,sClass,Align){
      if (Align==undefined) Align=pnls.Align.Index;
      var pnls=this;
      var _pnl=pnls.createItem("",pnls.Kind.Memo,sName,sClass,Align);
      _pnl.Value=_pnl.Container;
      _pnl.vScroll=coAppUI.App.Components.vScroll.Create("vScroll",pnls.Frame,_pnl,_pnl.Container,_pnl.Container);
      //_pnl.Value.onkeydown=coAppUI.checkTab;
      _pnl.onValueChanged=null;
      _pnl.doInputChange=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var pnl=this;
        if (pnl.onValueChanged) pnl.onValueChanged(pnl);
      };
      _pnl.evtInputChanged=coEvents.Add(_pnl.Value,"change",function(e){var pnl=_pnl; pnl.doInputChange(e);},coEvents.Capture,coEvents.Active);
      _pnl.Commit=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null))
          pnl.DB.Record.setValue(pnl.DB.Field,pnl.Value.value);
        if (pnl.Panels!=null)
          pnl.Panels.Commit();
      };
      _pnl.getValue=function(){
        var pnl=this;
        return pnl.Value.value;
      };
      _pnl.setValue=function(value){
        var pnl=this;
        pnl.Value.value=value;
      };
      _pnl.getWidth=function(){
        var pnl=this;
        return pnl.Width;
      };
      _pnl.resetValues=function(){
        var pnl=this;
        if ((pnl.DB.Field!=null) && (pnl.DB.Record!=null)) {
          pnl.Value.value=pnl.DB.Record.getValue(pnl.DB.Field);
        } else {
          pnl.Value.value="";
        };
      };
      _pnl.onSetVisibility=function(Value){
        var pnl=this;
        pnl.Value.style.visibility=((Value==true) && (pnl.Hidden==false))? "visible" : "hidden";
      };
      return _pnl;
    };
    _pnls.createItem=function(Caption,Kind,sName,sClass,Align){
      var pnls=this;
      var _pnl=new Object();
      if (Align==undefined) Align=pnls.Align.Index;

      _pnl.Kind=pnls.Kind.Clone(Kind);
      _pnl.recurseRelease=false;
      _pnl.copyAsVar=true;
      _pnl.Parent=pnls.Container;
      _pnl.Owner=pnls;
      _pnl.onClick=null;
      _pnl.Class=sClass;
      _pnl.Position=new Position();
      _pnl.innerPosition=new Position();
      _pnl.cssPosition=new Position();
      _pnl.Align=pnls.Align.Clone(Align);
      _pnl.Name=sName;
      _pnl.Hidden=false;
      _pnl.Visible=false;
      switch (Kind){
        case _pnl.Kind.Text :
          var sElem="input";
          break;
        case _pnl.Kind.Combo :
          var sElem="select";
          break;
        case _pnl.Kind.Memo :
          var sElem="textarea";
          break;
        case _pnl.Kind.Movie:
          var sElem="div";
          _pnl.Stop=function(){
            var pnl=this;
            if (pnl.Control)
              pnl.Control.pause();
          };
          _pnl.Play=function(){
            var pnl=this;
            if (pnl.Control)
              pnl.Control.play();
          };
          _pnl.Load=function(sURL){
            var pnl=this;
            if (pnl.Control)
              pnl.Container.removeChild(_pnl.Control);
            pnl.Torus.Start();
            pnl.Control=document.createElement('video');
            pnl.Container.appendChild(pnl.Control);
            pnl.Control.Owner=pnl;
            pnl.Control.style.display="block";
            pnl.Control.style.position="absolute";
            pnl.Control.style.top="0px";
            pnl.Control.style.left="0px";
            if (pnl.Visible==true){
              pnl.Control.style.width=pnl.Container.clientWidth+"px";
              pnl.Control.style.height=pnl.Container.clientHeight+"px";
            };
            pnl.Control.autoplay=true;
            pnl.Control.controls=false;
            pnl.Control.src=sURL;
            pnl.Control.load();
            pnl.Control.play();
            pnl.onSetSize=function(){
              var pnl=this;
              if (pnl.Control){
                pnl.Control.style.width=pnl.Container.clientWidth+"px";
                pnl.Control.style.height=pnl.Container.clientHeight+"px";
              };
            };
            pnl._doEnded=function(){
              var pnl=this.Owner;
              pnl.Torus.Stop();
              if (pnl.onEnded)
                pnl.onEnded(pnl);
            };
            pnl._doPaused=function(){
              var pnl=this.Owner;
              pnl.Torus.Start();
              if (pnl.onPaused)
                pnl.onPaused(pnl);
            };
            pnl._doError=function(){
              var pnl=this.Owner;
              pnl.Torus.Stop();
              if (pnl.onError)
                pnl.onError(pnl);
            };
            pnl._doPlay=function(){
              var pnl=this.Owner;
              pnl.Torus.Stop();
              if (pnl.onPlay)
                pnl.onPlay(pnl);
            };
            pnl._doControls=function(){
              var pnl=this.Owner;
              if (pnl.onControls)
                pnl.onControls(pnl);
            };
            coDOM.addEvent(pnl.Control,"mousemove",pnl._doControls,false);
            coDOM.addEvent(pnl.Control,"touchstart",pnl._doControls,false);
            coDOM.addEvent(pnl.Control,"error",pnl._doError,true);
            coDOM.addEvent(pnl.Control,"ended",pnl._doEnded,true);
            coDOM.addEvent(pnl.Control,"pause",pnl._doPaused,true);
            coDOM.addEvent(pnl.Control,"play",pnl._doPlay,true);
          };
          _pnl.unLoad=function(){
            var pnl=this;
            if (pnl.Control) {
              pnl.Container.removeChild(_pnl.Control);
              pnl.Control=null;
            };
          };
          break;
        default :
          var sElem="div";
          break;
      };
      _pnl.Container=document.createElement(sElem);
      _pnl.Parent.appendChild(_pnl.Container);
      _pnl.Container.className=_pnl.Class;
      coDOM.setText(_pnl.Container,Caption);
      _pnl.evtTouchStart=null;
      _pnl.Panels=null;
      _pnl.Border=new Border();
      _pnl.Margin=new Margin();
      _pnl.Padding=new Padding();
      _pnl.DB=coDB.createDB();
      _pnl.doBlur=function(e){
        var pnl=this;
        var pnls=this.Owner;
        if (coVDM.vsFocusScrollToTop==false) return;
        if (pnls.API.debugToConsole==true)
          coVDM.VDM.Console.Append("Screen.Panels.Panel.doBlur (FocusLock.Active="+coEvents.FocusLock.Active+")");
        if (e==undefined) e=window.event;
        if (coEvents.FocusLock.Active==true) {
          if (pnls.API.debugToConsole==true)
            coVDM.VDM.Console.Append("Screen.Panels.Panel.doBlur (reFocus)");
          pnl.Container.focus();
          return;
        };
      };
      _pnl.doFocus=function(e){
        var pnl=this;
        var pnls=pnl.Owner;
        if (e==undefined) e=window.event;

        if (coEvents.FocusLock.Active==true) {
          if (pnls.API.debugToConsole==true)
            coVDM.VDM.Console.Append("Screen.Panels.Panel.doFocus (FocusLock exit)");
          return
        };

        if (e.srcElement==pnl.Container) {
          if (pnls.API.debugToConsole==true)
            coVDM.VDM.Console.Append("Screen.Panels.Panel.doFocus");
          if ( (coVDM.vsFocusScrollTouchOnly==false) || ((coVDM.vsFocusScrollTouchOnly==true) && (coEvents.FocusLock.Touched==true)) ) {
            if (pnls.API.debugToConsole==true)
              coVDM.VDM.Console.Append("Screen.Panels.Panel.doFocus.scrollToTop");
            pnl.scrollToTop();
          } else {
            coEvents.ScrollLock.Lock(coVDM.ScrollLock);
            if (pnls.API.debugToConsole==true)
              coVDM.VDM.Console.Append("Screen.Panels.Panel.doFocus (exiting, coVDM.vsFocusScrollTouchOnly="+coVDM.vsFocusScrollTouchOnly+", FocusLock.Touched="+coEvents.FocusLock.Touched);
          };
        } else {
          if (pnls.API.debugToConsole==true)
            coVDM.VDM.Console.Append("Screen.Panels.Panel.doFocus (exiting)");
        };

      };
      _pnl.doTouchStart=function(e){
        if (e==undefined) e=window.event;
        var pnl=this;
        var pnls=pnl.Owner;
        if (pnls.API.debugToConsole==true)
          coVDM.VDM.Console.Append("Screen.Panels.Panel.doTouchStart");
        //coDOM.preventDefault(e);
        //coEvents.TouchLock.Lock(coVDM.TouchLock);
        //coEvents.FocusLock.Touched=true;
      };
      _pnl.doMouseUp=function(e){
        var pnl=this;
        if (pnls.API.debugToConsole==true)
          coVDM.VDM.Console.Append("Screen.Panels.Panel.doMouseUp");
        if (e==undefined) e=window.event;
        if (pnl.onClick) {
          coDOM.preventDefault(e);
          pnl.Owner.Frame.Torus.Start();
          setTimeout(
            function(){
                pnl.onClick(pnl);
                pnl.Owner.Frame.Torus.Stop();
            },
            coVDM.TouchMouseDelay
          );
        };
      };
      _pnl.doTouchEnd=function(e){
        var pnl=this;
        var pnls=pnl.Owner;
        if (pnls.API.debugToConsole==true)
          coVDM.VDM.Console.Append("Screen.Panels.Panel.doTouchEnd");
        if (e==undefined) e=window.event;
        coEvents.FocusLock.Touched=true;
        pnl.Container.focus();
        if (pnl.onClick) {
          coDOM.preventDefault(e);
          pnl.Owner.Frame.Torus.Start();
          setTimeout(
            function(){
                pnl.onClick(pnl);
                pnl.Owner.Frame.Torus.Stop();
            },
            coVDM.TouchMouseDelay
          );
        };
      };
      _pnl.evtFocus=coEvents.Add(_pnl.Container,"focus",function(e){var pnl=_pnl; pnl.doFocus(e);},coEvents.NoCapture,coEvents.Active);
      _pnl.evtBlur=coEvents.Add(_pnl.Container,"blur",function(e){var pnl=_pnl; pnl.doBlur(e);},coEvents.NoCapture,coEvents.Active);
      _pnl.evtTouchStart=coEvents.Add(_pnl.Container,"touchstart",function(e){var pnl=_pnl; pnl.doTouchStart(e);},coEvents.NoCapture,coEvents.Active);
      _pnl.evtTouchEnd=coEvents.Add(_pnl.Container,"touchend",function(e){var pnl=_pnl; pnl.doTouchEnd(e);},coEvents.NoCapture,coEvents.Active);
      _pnl.evtMouseUp=coEvents.Add(_pnl.Container,"mouseup",function(e){var pnl=_pnl; pnl.doMouseUp(e);},coEvents.NoCapture,coEvents.Active);
      if (_pnl.Kind.Index==_pnl.Kind.Text) {
        _pnl.evtTouchEnd=coEvents.Add(_pnl.Container,"touchend",function(e){var pnl=_pnl; pnl.doTouchEnd(e);},coEvents.NoCapture,coEvents.Active);
      };
      _pnl.setText=function(value){
        var pnl=this;
        coDOM.setText(pnl.Container,value);
      };
      _pnl.Commit=function(){
        var pnl=this;
        if (pnl.Panels!=null)
          pnl.Panels.Commit();
      };
      _pnl.getHeight=function(){
        var pnl=this;
        return ((pnl.Visible==true) && (pnl.Kind.Index==pnl.Kind.Panels) && (pnl.Panels!=null)) ? pnl.Panels.getHeight()+pnl.Border.yBias()+pnl.Padding.yBias()+pnl.Panels.Border.yBias()+pnl.Panels.Padding.yBias() : pnl.Height+ pnl.Border.yBias()+pnl.Padding.yBias();
      };
      _pnl.getWidth=function(){
        var pnl=this;
        return ((pnl.Visible==true) && (pnl.Kind.Index==pnl.Kind.Panels) && (pnl.Panels!=null)) ? pnl.Panels.getWidth()+pnl.Border.xBias()+pnl.Panels.Border.xBias() +pnl.Padding.xBias()+pnl.Panels.Padding.xBias() : pnl.Width + pnl.Border.xBias()+pnl.Padding.xBias();
      };
      _pnl.setRecord=function(itm){
        var pnl=this;
        pnl.DB.Record=itm;
        if (pnl.Panels!=null)
          pnl.Panels.setRecord(itm);
      };
      _pnl.Owner.push(_pnl);
      if (_pnl.Owner.MultiLine==false){
        var iVert=_pnls.getVerticalCount();
        _pnl.Owner.MultiLine=((iVert>1) || (_pnl.Kind.Index==_pnl.Kind.Panels));
      };
      _pnl.loadCSS=function(){
        var pnl=this;
        pnl.Border.Load(pnl.Container);
        pnl.Padding.Load(pnl.Container);
        pnl.Margin.Load(pnl.Container);
        pnl.cssPosition.loadCSS(pnl.Container);
      };
      _pnl.setPosition=function(p){
        var pnl=this;
        var pnls=pnl.Owner;

        pnl.Margin.enForce(pnl.Container);
        pnl.Padding.enForce(pnl.Container);

        pnl.Position.Assign(p);
        pnl.Position.enForce(pnl.Container);
        pnl.innerPosition.Assign(p);

        pnl.innerPosition.Top=pnl.Margin.Top+pnl.Border.Top+pnl.Padding.Top;
        pnl.innerPosition.Left=pnl.Margin.Left+pnl.Border.Left+pnl.Padding.Left;
        pnl.innerPosition.Width-=(pnl.Margin.xBias()+pnl.Border.xBias()+pnl.Padding.xBias());
        pnl.innerPosition.Height-=(pnl.Margin.yBias()+pnl.Border.yBias()+pnl.Padding.yBias());

      };
      _pnl.enforcePosition=function(){
        var pnl=this;
        if (pnl.Visible==false) return;
        pnl.Position.enForce(pnl.Container);
        if ((pnl.Panels!=null) && (pnl.Panels.Visible==true))
          pnl.Panels.enforcePosition();
      };
      _pnl.getValue=function(){
        var pnl=this;
        return null;
      };
      _pnl.resetValues=function(){
        var pnl=this;
        if (pnl.Panels!=null)
          pnl.Panels.resetValues();
      };
      _pnl.prePosition=function(){
        var pnl=this;
        var pnls=pnl.Owner;
        switch (pnl.Align.Index){
          case pnl.Align.Top     : pnls.setPosForTop(pnl); break;
          case pnl.Align.Bottom  : pnls.setPosForBottom(pnl); break;
          case pnl.Align.Left    : pnls.setPosForLeft(pnl);  break;
          case pnl.Align.Right   : pnls.setPosForRight(pnl); break;
          case pnl.Align.Client  : pnls.setPosForClient(pnl); break;
          case pnl.Align.Center  : pnls.setPosForCenter(pnl); break;
        };
        if (pnl.Panels!=null)
          pnl.Panels.prePosition();
      };
      _pnl.setVisible=function(){
        var pnl=this;
        var pnls=pnl.Owner.getRoot();
        pnl.Hidden=false;
        //pnls.setSize();
        pnl.setVisibility(true);
        //pnls.setSize();
      };
      _pnl.setHidden=function(){
        var pnl=this;
        var pnls=pnl.Owner.getRoot();
        pnl.Hidden=true;
        pnl.setVisibility(false);
        //pnls.setSize();
      };
      _pnl.setVisibility=function(Value){
        var pnl=this;
        var pnls=pnl.Owner;
        if ((pnl.Hidden==true) || (Value==false)) {
          pnl.Container.style.visibility="hidden";
          pnl.Container.style.display="none";
          Value=false;
        } else if (pnl.Hidden==false) {
          pnl.Container.style.visibility="visible";
          switch (pnl.Kind.Index){
            case pnls.Kind.Blank        :
              pnl.Container.style.display="";
              pnl.Container.style.position="absolute";
              //pnls.Container.style.position="absolute";
              break;
            case pnls.Kind.LabeledText  : pnl.Container.style.display="block"; break;
            case pnls.Kind.LabeledCombo : pnl.Container.style.display="block"; break;
            case pnls.Kind.LabeledMemo  : pnl.Container.style.display="block"; break;
            case pnls.Kind.LabeledIconList  : pnl.Container.style.display="block"; break;
            case pnls.Kind.Label        :
              switch (pnl.Align.Index){
                case pnl.Align.Top     : pnl.Container.style.display="block"; break;
                case pnl.Align.Bottom  : pnl.Container.style.display="block"; break;
                case pnl.Align.Left    : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Right   : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Client  : pnl.Container.style.display="block"; break;
                case pnl.Align.Center  : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Default : pnl.Container.style.display="inline-block"; break;
              };
              break;
            case pnls.Kind.IconList     : pnl.Container.style.display="inline-block"; break;
            case pnls.Kind.Text         : pnl.Container.style.display="inline-block"; break;
            case pnls.Kind.Memo         : pnl.Container.style.display="inline-block"; break;
            case pnls.Kind.Combo        : pnl.Container.style.display="inline"; break;
            case pnls.Kind.Caption      : pnl.Container.style.display="block"; break;
            case pnls.Kind.Editor       : pnl.Container.style.display="block"; break;
            case pnls.Kind.Panels       :
              pnl.Container.style.display="block";
              pnl.Container.style.position="absolute";
              break;
            case pnls.Kind.Image        :
              switch (pnl.Align.Index){
                case pnl.Align.Top     : pnl.Container.style.display="block"; break;
                case pnl.Align.Bottom  : pnl.Container.style.display="block"; break;
                case pnl.Align.Left    : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Right   : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Client  : pnl.Container.style.display="block"; break;
                case pnl.Align.Center  : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Default : pnl.Container.style.display="inline-block"; break;
              };
              break;
            case pnls.Kind.Movie        :
              switch (pnl.Align.Index){
                case pnl.Align.Top     : pnl.Container.style.display="block"; break;
                case pnl.Align.Bottom  : pnl.Container.style.display="block"; break;
                case pnl.Align.Left    : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Right   : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Client  : pnl.Container.style.display="block"; break;
                case pnl.Align.Center  : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Default : pnl.Container.style.display="inline-block"; break;
              };
              break;
            case pnls.Kind.ProgressBar        :
              switch (pnl.Align.Index){
                case pnl.Align.Top     : pnl.Container.style.display="block"; break;
                case pnl.Align.Bottom  : pnl.Container.style.display="block"; break;
                case pnl.Align.Left    : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Right   : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Client  : pnl.Container.style.display="block"; break;
                case pnl.Align.Center  : pnl.Container.style.display="inline-block"; break;
                case pnl.Align.Default : pnl.Container.style.display="inline-block"; break;
              };
              break;
          };
        };
        pnl.Visible=Value;
        if (pnl.onSetVisibility)
          pnl.onSetVisibility(Value);
        if (pnl.Panels!=null)
          pnl.Panels.setVisibility(Value);
      };
      _pnl.getVScroll=function(){
        var pnl=this;
        var pnls=pnl.Owner;
        return  (pnls.vScroll) ? pnls.vScroll : pnls.getVScroll();
      };
      _pnl.scrollToTop=function(){
        var pnl=this;
        var pnls=pnl.Owner;
        var vs=pnl.getVScroll();
        if (vs) {
          var elm=pnl.Owner.Container;
          if (elm) {
            coEvents.FocusLock.Lock(coVDM.FocusLock,elm);
            coEvents.ScrollLock.Lock(coVDM.ScrollLock,vs,elm);
            if (pnls.API.debugToConsole==true)
              coVDM.VDM.Console.Append("Panels.Panel.scrollToTop (FocusLocked, ScrollLocked, elm.className="+elm.className+")");
          } else {
            if (pnls.API.debugToConsole==true)
              coVDM.VDM.Console.Append("Panels.Panel.scrollToTop (elm not found)");
          };
        } else {
          if (pnls.API.debugToConsole==true)
            coVDM.VDM.Console.Append("Panels.Panel.scrollToTop (vScroll not found)");
        };
      };
      _pnl.Free=function(){
        var pnl=this;
        if (pnl.Panels)
          pnl.Panels=pnl.Panels.Free();
        if (pnl.vScroll) pnl.vScroll.Free();
        if (pnl.Container.EventList) pnl.Container.EventList.Free();
        if (pnl.onFree) pnl.onFree(pnl);
        pnl.DB.Free();
        if (pnl.doFree) pnl.doFree();
        pnl.Parent.removeChild(pnl.Container);
        pnl=Release(pnl);
        return null;
      };
      _pnl.loadCSS();
      _pnl.Height=_pnl.cssPosition.Height;
      _pnl.Width=_pnl.cssPosition.Width;
      switch (_pnl.Kind.Index){
        case _pnl.Kind.Text :
          _pnl.getHeight=function(){
            var pnl=this;
            return pnl.Container.offsetHeight;
          };
          break;
        case _pnl.Kind.LabeledText:{
          _pnl.Height=coVDM.PanelLabeledTextHeight;
          break;
        };
        case _pnl.Kind.Blank :
          _pnl.getHeight=function(){
            var pnl=this;
            return pnl.Height-pnl.Border.yBias();
          };
          _pnl.getWidth=function(){
            var pnl=this;
            return pnl.Width-pnl.Border.xBias();
          };
          break;
        case _pnl.Kind.Movie:
          _pnl.Torus=pnls.Frame.Torus;
          break;
        case _pnl.Kind.Panels:
          _pnl.getHeight=function(){
            var pnl=this;
            return pnl.Panels.getHeight()+pnl.Padding.yBias()+pnl.Margin.yBias();
          };
          break;
        case _pnl.Kind.Image :
          _pnl.Height=_pnl.Container.offsetHeight;
          _pnl.Width=_pnl.Container.offsetWidth;
          _pnl.setGlyph=function(sURL){
            var pnl=this;
            pnl.Container.style.backgroundImage=(sURL.length>0)? "url("+sURL+")" : "";
          };
          _pnl.getHeight=function(){
            var pnl=this;
            return pnl.Height;
          };
          break;
      };
      return _pnl;
    };
    _pnls.Clear=function(){
      var pnls=this;
      for (var iLcv=0; iLcv<pnls.length; iLcv++){
        var pnl=pnls[iLcv];
        pnl.Free();
      };
      pnls.length=0;
    };
    _pnls.getWidth=function(){
      var pnls=this;
      var iWidth=0;
      var xTB=0;
      var xLR=0;
      if (pnls.MultiLine==true){
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var pnl=pnls[iLcv];
          if (pnl.Visible==true) {
            switch (pnl.Align.Index) {
             case pnl.Align.Top : xTB=Math.max(pnl.getWidth() - pnl.Border.xBias()-pnl.Padding.xBias(),xTB); break;
             case pnl.Align.Bottom : xTB=Math.max(pnl.getWidth() - pnl.Border.xBias()-pnl.Padding.xBias(),xTB); break;
             case pnl.Align.Left : xLR+=pnl.getWidth(); break;
             case pnl.Align.Right : xLR+=pnl.getWidth(); break;
             case pnl.Align.Client : iWidth=Math.max(iWidth,pnl.getWidth()); break;
             case pnl.Align.Default : iWidth=Math.max(pnl.Container.offsetLeft+pnl.getWidth(),iWidth); break;
             case pnl.Align.Center : iWidth=Math.max(pnl.Container.offsetLeft+pnl.getWidth(),iWidth); break;
            };
          };
        };
        iWidth=Math.max(xTB,iWidth);
        iWidth+=xLR;
      } else {
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var pnl=pnls[iLcv];
          if (pnl.Visible==true) {
            switch (pnl.Align.Index) {
             case pnl.Align.Top : iWidth=Math.max(pnl.getWidth()-pnl.Border.xBias()-pnl.Padding.xBias(),iWidth); break;
             case pnl.Align.Bottom : iWidth=Math.max(pnl.getWidth()-pnl.Border.xBias()-pnl.Padding.xBias(),iWidth); break;
             case pnl.Align.Left : iWidth+=pnl.getWidth(); break;
             case pnl.Align.Right : iWidth+=pnl.getWidth(); break;
             case pnl.Align.Client : iWidth+=pnl.getWidth()-pnl.Border.xBias()-pnl.Padding.xBias(); break;
             case pnl.Align.Default : iWidth=Math.max(pnl.Container.offsetLeft+pnl.getWidth()-pnl.Border.xBias()-pnl.Padding.xBias(),iWidth); break;
             case pnl.Align.Center : iWidth=Math.max(pnl.Container.offsetLeft+pnl.getWidth()-pnl.Border.xBias()-pnl.Padding.xBias(),iWidth); break;
            };
          };
        };
        iWidth=Math.max(pnls.Width,iWidth);
      };
      return iWidth;
    };
    _pnls.getHeight=function(){
      var pnls=this;
      var iHeight=0;
      var yLR=0;
      if (pnls.MultiLine==true){
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var pnl=pnls[iLcv];
          if (pnl.Visible==true) {
            switch (pnl.Align.Index) {
             case pnl.Align.Top     : iHeight+=pnl.getHeight()+pnl.Border.yBias()+pnl.Padding.yBias()+pnl.Margin.yBias(); break;
             case pnl.Align.Bottom  : iHeight+=pnl.Height-pnl.Border.yBias()-pnl.Padding.yBias(); break;
             case pnl.Align.Left    : yLR=Math.max(pnl.Height,yLR); break;
             case pnl.Align.Right   : yLR=Math.max(pnl.Height,yLR); break;
             case pnl.Align.Client  : iHeight+=pnl.Height; break;
             case pnl.Align.Default : iHeight=Math.max(pnl.Container.offsetTop+pnl.Height,iHeight); break;
             case pnl.Align.Center  : iHeight=Math.max(pnl.Container.offsetTop+pnl.getHeight(),iHeight); break;
            };
          };
        };
        if (yLR)
          iHeight=Math.max(yLR,iHeight);
        iHeight+=(pnls.Border.yBias()+pnls.Padding.yBias());
      } else {
        iHeight=pnls.Height;
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var pnl=pnls[iLcv];
          if (pnl.Visible==true) {
            switch (pnl.Align.Index) {
             case pnl.Align.Top     : iHeight=Math.max(pnl.getHeight(),iHeight); break;
             case pnl.Align.Bottom  : iHeight=Math.max(pnl.getHeight(),iHeight); break;
             case pnl.Align.Left    : iHeight=Math.max(pnl.getHeight(),iHeight); break;
             case pnl.Align.Right   : iHeight=Math.max(pnl.getHeight(),iHeight); break;
             case pnl.Align.Client  : iHeight=Math.max(pnl.getHeight(),iHeight); break;
             case pnl.Align.Default : iHeight=Math.max(pnl.Container.offsetTop+pnl.getHeight(),iHeight); break;
             case pnl.Align.Center  : iHeight=Math.max(pnl.getHeight(),iHeight); break;
            };
          };
        };
      };
      return iHeight;
    };
    _pnls.setPosForBottom=function(pnl){
      var pnls=this;
      if (pnl){
        pnl.Position.Top=pnls.innerPosition.Height-pnl.getHeight();
        for (var iLcv=pnls.length-1; iLcv>=0; iLcv--){
          var itm=pnls[iLcv];
          if (itm==pnl) break;
          if ( (itm.Align.Index==coAppUI.Alignment.Bottom) && (itm.Visible==true)  )
            pnl.Position.Top-=itm.getHeight();
        };
        pnl.Position.Left=pnls.innerPosition.Left;
        pnl.Position.Width=pnls.innerPosition.Width-pnl.Border.xBias()+pnl.Padding.xBias();
        pnl.Position.Height=pnl.getHeight()-pnl.Border.yBias()-pnl.Padding.yBias();
      } else {
        pnl.Position.Top=pnls.Parent.clientHeight-pnls.getHeight();
        pnl.Position.Width=pnls.getWidth()-pnl.Border.xBias()-pnl.Padding.xBias();
        pnl.Position.Height=pnls.getHeight() - pnl.Border.yBias()-pnl.Padding.yBias();
      };
    };
    _pnls.setPosForTop=function(pnl){
      var pnls=this;
      if (pnl){
        pnl.Position.Assign(pnls.innerPosition);
        if (pnl.Panels!=null) {
          var iOffset=(pnl.Margin.xBias()+pnl.Border.xBias()+pnl.Padding.xBias()+pnls.innerPosition.Left);
          pnl.Position.Left+=iOffset;
          pnl.Position.Width-=iOffset;
          //if (pnls.MultiLine==true){
          //  pnl.Position.Height=pnl.getHeight()-(pnls.Margin.yBias()+pnl.Margin.yBias()+pnl.Border.yBias()+pnl.Padding.yBias());
          //} else {
          pnl.Position.Height=pnl.getHeight();
          pnl.Height=pnl.getHeight();
          //};
          //pnl.setPosition(pnl.Position);
        } else {
          if (pnl.Kind.Index==pnl.Kind.Blank) {
            pnl.Position.Height=pnl.getHeight();
            var iOffset=(pnl.Margin.xBias()+pnl.Border.xBias()+pnl.Padding.xBias());
            pnl.Position.Width-=iOffset;
            //pnl.Position.Left-=iOffset;
            var iOffset=(pnl.Margin.yBias()+pnl.Border.yBias()+pnl.Padding.yBias());
            pnl.Position.Height-=iOffset;
            pnl.Position.Top+=pnl.Margin.Top; //-pnl.Border.Top-pnl.Padding.Top);
          } else {
            pnl.Position.Height=pnl.getHeight();
            var iOffset=(pnl.Margin.xBias()+pnl.Border.xBias()+pnl.Padding.xBias());
            pnl.Position.Width-=iOffset;
            pnl.Position.Left-=iOffset;
            var iOffset=(pnl.Margin.yBias()+pnl.Border.yBias()+pnl.Padding.yBias());
            pnl.Position.Height-=iOffset;
            pnl.Position.Top+=pnl.Margin.Top; //-pnl.Border.Top-pnl.Padding.Top);
          };
        };
        // Adjust Top Aligned Items
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var itm=pnls[iLcv];
          if (itm==pnl) break;
          if ( (itm.Align.Index==itm.Align.Top) && (itm.Visible==true) )
            pnl.Position.Top=itm.Position.Top+itm.Position.Height+itm.Margin.yBias()+itm.Border.yBias()+itm.Padding.yBias();
        };
        // Adjust Width for Right Aligned Items
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var itm=pnls[iLcv];
          if ((itm.Align.Index==itm.Align.Right) && (itm.Visible==true)) {
            var iOffset=itm.Margin.xBias()+itm.Border.xBias()+itm.Padding.xBias();
            var iWidth=itm.Position.Left-iOffset;
            pnl.Position.Width=Math.min(pnl.Position.Width,iWidth);
          };
        };
        // Adjust Left & Width for Left Aligned Items
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var itm=pnls[iLcv];
          if ((itm.Align.Index==itm.Align.Left) && (itm.Visible==true)) {
            var iOffset=itm.Margin.xBias()+itm.Border.xBias()+itm.Padding.xBias();
            var iLeft=itm.Position.Left+itm.Position.Width+iOffset;
            iLeft=Math.max(pnl.Position.Left,iLeft);
            if (iLeft>pnl.Position.Left) {
              pnl.Position.Width-=(iLeft+iOffset);
              pnl.Position.Left=iLeft;
            };
          };
        };
        //if (pnl.Kind.Index==pnl.Kind.Panels)
        //  pnl.Position.Height+=(pnls.Padding.yBias()+pnls.Margin.yBias());
        pnl.setPosition(pnl.Position);
      } else {
        pnls.Position.Left-=pnls.Margin.Left;
        pnls.Position.Top-=pnls.Margin.Top;
        pnls.Position.Width-=pnls.Margin.xBias();
        pnls.Position.Height-=pnls.Margin.yBias();
      };
    };
    _pnls.setPosForCenter=function(pnl){
      var pnls=this;
      if (pnl){
        pnl.Position.Width=pnl.getWidth();
        pnl.Position.Height=pnl.getHeight();
        pnl.Position.Left=(pnls.innerPosition.Width/2) - (pnl.Position.Width/2);

      } else {
        pnls.Position.Width=pnls.getWidth();
        pnls.Position.Height=pnls.getHeight();
        pnls.Position.Left=(pnls.Parent.clientWidth/2) - (pnls.Position.Width/2);
      };
    };
    _pnls.setPosForLeft=function(pnl){
      var pnls=this;
      if (pnl) {
        // set left position starting at 0
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var itm=pnls[iLcv];
          if (itm==pnl) break;
          if ( (itm.Align.Index==itm.Align.Left) && (itm.Visible==true)  )
            pnl.Position.Left+=itm.Container.offsetWidth;
        };
        pnl.Position.Width=pnl.getWidth();
        pnl.Position.Height=pnl.getHeight();
      } else {
        pnls.Position.Width=pnls.Container.offsetWidth - pnl.Border.xBias()-pnl.Padding.xBias();
        pnls.Position.Height=pnls.Parent.clientHeight - pnl.Border.yBias()-pnl.Padding.yBias();
      };
    };
    _pnls.setPosForRight=function(pnl){
      var pnls=this;
      if (pnl){
        pnl.Position.Top=pnls.innerPosition.Top;
        pnl.Position.Width=pnl.getWidth();
        pnl.Position.Height=pnls.innerPosition.Height - pnl.Border.yBias()-pnl.Padding.yBias();
        pnl.Position.Left=pnls.innerPosition.Width-pnl.Position.Width;
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var itm=pnls[iLcv];
          if (itm==pnl) break;
          if ( (itm.Align.Index==itm.Align.Right) && (itm.Visible==true) )
            pnl.Position.Left-=sLcv.Container.offsetWidth;
        };
      } else {
        pnls.Position.Top=pnls.innerPosition.Top;
        pnls.Position.Left=pnls.innerPosition.Left;
        pnls.Postion.Width=pnls.innerPosition.Width - pnls.Border.xBias()-pnls.Padding.yBias();
        pnls.Position.Height=pnls.innerPosition.Height - pnls.Border.yBias()-pnls.Padding.yBias();
      };
    };
    _pnls.initPosForClient=function(){
      var pnls=this;
      pnls.Container.style.top="0px";
      pnls.Container.style.left="0px";
      pnls.Container.style.right="0px";
      pnls.Container.style.bottom="0px";
      pnls.Container.style.width=" !important;";
      pnls.Container.style.height=" !important;";
      pnls.Height=this.Container.clientHeight;
      pnls.Width=this.Container.clientWidth;
    };
    _pnls.setPosForClient=function(pnl){
      var pnls=this;
      if (pnl){
        var val=0;
        var xBias=pnl.Border.xBias()+pnl.Padding.xBias();
        var yBias=pnl.Border.yBias()+pnl.Padding.yBias();
        var xMargin=0;
        var yMargin=0;
        if (pnl.Kind.Index==pnl.Kind.IconList){
          pnl.Position.Assign(pnls.innerPosition);
          pnl.Position.Width-=pnls.Padding.xBias();
        } else if (pnl.Kind.Index==pnl.Kind.Combo) {
          pnl.Position.Top=pnls.innerPosition.Top;
          pnl.Position.Left=pnls.innerPosition.Left+pnl.Padding.Left+pnl.Border.Left;
          pnl.Position.Width=pnls.innerPosition.Width-(xBias+xMargin+pnls.Position.Left)+2;
          pnl.Position.Height=pnls.innerPosition.Height-(pnls.Padding.yBias()+yBias);
        } else if ( pnl.Kind.Index==pnl.Kind.Panels){
          xMargin=pnl.Margin.xBias()+pnls.Margin.xBias();
          yMargin=pnl.Margin.yBias()+pnls.Margin.yBias();
          xBias+=xMargin+pnls.Padding.xBias();
          yBias+=yMargin+pnls.Padding.yBias();
          pnl.Position.Assign(pnls.innerPosition);
          pnl.Position.Top=0;
          pnl.Position.Left=0;
          pnl.Position.Width-=xBias;
          pnl.Position.Height-=yBias;
        } else if ( pnl.Kind.Index!=pnl.Kind.Text) {
          xMargin=pnl.Margin.xBias();
          yMargin=pnl.Margin.yBias();
          xBias+=xMargin;
          yBias+=yMargin;
          pnl.Position.Assign(pnls.innerPosition);
          pnl.Position.Width-=xBias;
          pnl.Position.Height-=yBias;
        } else {
          // Text
          pnl.Position.Top=pnls.innerPosition.Top;
          pnl.Position.Left=pnls.innerPosition.Left+pnl.Padding.Left+pnl.Border.Left;
          pnl.Position.Width=pnls.innerPosition.Width-(xBias+xMargin+pnls.Position.Left);
          pnl.Position.Height=pnls.innerPosition.Height-(pnls.innerPosition.Top+yBias);
          pnl.Height=pnl.Position.Height;

          val=pnl.Padding.xBias()+pnl.Border.xBias();
          pnl.Position.Left+=val;
          pnl.Position.Width-=val;

        };
        for (var iLcv=0; iLcv<pnls.length; iLcv++){
          var itm=pnls[iLcv];
          if ( (itm!=pnl) && (itm.Visible==true)) {
            switch (itm.Align.Index) {
              case itm.Align.Top :
                val=itm.Container.offsetTop+itm.Container.offsetHeight+itm.Margin.Bottom;
                pnl.Position.Top+=val;
                pnl.Position.Height-=val;
                break;
              case itm.Align.Bottom :
                pnl.Position.Height-=itm.Container.offsetHeight;
                break;
              case itm.Align.Left :
                val=itm.getWidth()+itm.Border.xBias()+itm.Padding.xBias()+itm.Margin.xBias();
                pnl.Position.Left+=val;
                pnl.Position.Width-=val;
                break;
              case itm.Align.Right :
                pnl.Position.Width=-itm.Container.offsetWidth;
                break;
            };
          };
        };
      } else {
        var sl=pnls.Owner.Slides;
        if (sl){
          var xBias=pnls.Margin.xBias()+pnls.Border.xBias()+pnls.Padding.xBias();
          var yBias=pnls.Margin.yBias()+pnls.Border.yBias()+pnls.Padding.yBias();
          pnls.Position.Top=pnls.Border.Top+pnls.Padding.Top;
          pnls.Position.Left=pnls.Border.Left+pnls.Padding.Left;
          pnls.Position.Width=pnls.Parent.clientWidth-xBias;
          pnls.Position.Height=pnls.Parent.clientHeight-yBias;

          var posAdj=sl.getClientArea(pnls.Parent,pnls.Position);
          pnls.Position.Assign(posAdj);
        } else{
          var xBias=pnls.Margin.xBias()+pnls.Border.xBias()+pnls.Padding.xBias();
          var yBias=pnls.Margin.yBias()+pnls.Border.yBias()+pnls.Padding.yBias();
          pnls.Position.Top=pnls.Container.offsetTop+pnls.Border.Top+pnls.Padding.Top;
          pnls.Position.Left=pnls.Container.offsetLeft+pnls.Border.Left+pnls.Padding.Left;
          pnls.Position.Width=pnls.Parent.clientWidth-xBias;
          pnls.Position.Height=pnls.Parent.clientHeight-(yBias+pnls.Position.Top);
        };
      };

    };
    _pnls.resetValues=function(){
      var pnls=this;
      for (var iLcv=0; iLcv<pnls.length; iLcv++){
        var pnl=pnls[iLcv];
        pnl.resetValues();
      };
    };
    _pnls.copyInnerPosition=function(){
      var pnls=this;
      if (pnls.Owner.innerPosition) {
        pnls.Position.Assign(pnls.Owner.innerPosition);
        pnls.Position.Top=pnls.Border.Top+pnls.Padding.Top;
        pnls.Position.Left=pnls.Border.Left+pnls.Padding.Left;
        pnls.Position.Width-=pnls.Border.xBias()+pnls.Padding.xBias()+pnls.Margin.xBias();
        pnls.Position.Height-=pnls.Border.yBias()+pnls.Padding.yBias()+pnls.Margin.yBias();
        pnls.setPosition(pnls.Position);

        pnls.innerPosition.Top=pnls.Border.Top+pnls.Padding.Top;
        pnls.innerPosition.Left=pnls.Border.Left+pnls.Padding.Left;
        pnls.innerPosition.Width=pnls.Position.Width-(pnls.Border.xBias()+pnls.Padding.xBias()+pnls.Margin.xBias() );
        pnls.innerPosition.Height=pnls.Position.Height-(pnls.Border.yBias()+pnls.Padding.yBias()+pnls.Margin.yBias() );
      }
    };
    _pnls.prePosition=function(){
      var pnls=this;
      switch (pnls.Align.Index){
        case pnls.Align.Top     :
          pnls.copyInnerPosition();
          pnls.setPosForTop();
          pnls.setPosition(pnls.Position);
          break;
        case pnls.Align.Bottom  :
          pnls.copyInnerPosition();
          pnls.setPosForBottom();
          pnls.setPosition(pnls.Position);
          break;
        case pnls.Align.Left    :
          pnls.copyInnerPosition();
          pnls.setPosForLeft();
          pnls.setPosition(pnls.Position);
          break;
        case pnls.Align.Right   :
          pnls.copyInnerPosition();
          pnls.setPosForRight();
          pnls.setPosition(pnls.Position);
          break;
        case pnls.Align.Client  :
          pnls.initPosForClient();
          pnls.copyInnerPosition();
          pnls.setPosForClient();
          pnls.setPosition(pnls.Position);
          break;
        case pnls.Align.Center  :
          pnls.copyInnerPosition();
          pnls.setPosForCenter();
          pnls.setPosition(pnls.Position);
          break;
      };

      for (var iLcv=0; iLcv<pnls.length; iLcv++){
        var pnl=pnls[iLcv];
        if (pnl.Visible==true)
          pnl.prePosition();
      };
    };
    _pnls.enforcePosition=function(){
      var pnls=this;
      if (pnls.Visible==false) return;
      pnls.Container.style.top=pnls.Position.Top+"px";
      pnls.Container.style.left=pnls.Position.Left+"px";
      pnls.Container.style.width=pnls.Position.Width+"px";
      pnls.Container.style.height=pnls.Position.Height+"px";
      for (var iLcv=0; iLcv<pnls.length; iLcv++){
        var pnl=pnls[iLcv];
        if (pnl.Visible==true)
          pnl.enforcePosition();
      };
    };
    _pnls.loadCSS=function(){
      var pnls=this;
      pnls.Border.Load(pnls.Container);
      pnls.Padding.Load(pnls.Container);
      pnls.Margin.Load(pnls.Container);
      for (var iLcv=0; iLcv<pnls.length; iLcv++) {
        var pnl=pnls[iLcv];
        pnl.loadCSS();
      };
    };

    _pnls.setSize=function(){
      var pnls=this;
      if (pnls.Visible==true){
        pnls.prePosition();
        for (var iLcv=0; iLcv<pnls.length; iLcv++) {
          var pnl=pnls[iLcv];
          if (pnl.Visible==true) {
            pnl.setPosition(pnl.Position);
            if (pnl.onSetSize)
              pnl.onSetSize();
          };
        };
        pnls.setPosition(pnls.Position);
        pnls.enforcePosition();
      };
    };
    _pnls.setVisible=function(){
      var pnls=this;
      pnls.Hidden=false;
      pnls.setVisibility(Value);
      if (pnls.onShow) pnls.onShow(pnls);
    };
    _pnls.setHidden=function(){
      var pnls=this;
      pnls.Hidden=true;
      for (var iLcv=0; iLcv<pnls.length; iLcv++){
        var pnl=pnls[iLcv];
        pnl.Hidden=true;
        if (pnl.Panels)
          pnl.Panels.setHidden();
      };
      pnls.setVisibility(false);
    };
    _pnls.setVisibility=function(Value){
      var pnls=this;
      if ((pnls.Hidden==true) || (Value==false)) {
        pnls.Container.style.visibility="hidden";
        pnls.Container.style.display="none";
        if ( (pnls.vScroll) && (pnls.vScroll.Visible==true)) pnls.vScroll.Hide();
        Value=false;
      } else {
        pnls.Container.style.visibility="visible";
        switch (pnls.Align.Index){
          case pnls.Align.Top    : pnls.Container.style.display="block"; break;
          case pnls.Align.Bottom : pnls.Container.style.display="block"; break;
          case pnls.Align.Left   : pnls.Container.style.display="block"; break;
          case pnls.Align.Right  : pnls.Container.style.display="block"; break;
          case pnls.Align.Client : pnls.Container.style.display="block"; break;
          case pnls.Align.Center : pnls.Container.style.display="inline-block"; break;
        };
      };
      pnls.Visible=Value;
      if (pnls.onSetVisibility)
        pnls.onSetVisibility(Value)
      for (var iLcv=0; iLcv<pnls.length; iLcv++) {
        var pnl=pnls[iLcv];
        pnl.setVisibility(Value);
      };
      if (Value==true) {
        if (_pnls.onShow) _pnls.onShow(_pnls);
        for (var iLcv=0; iLcv<pnls.length; iLcv++) {
          var itm=pnls[iLcv];
          if (itm.Hidden==false){
            if (itm.onShow) itm.onShow(itm);
            if (itm.Panels) itm.Panels.Show();
          };
        };
      };
    };
    _pnls.setPosition=function(p){
      var pnls=this;

      pnls.Margin.enForce(pnls.Container);
      pnls.Padding.enForce(pnls.Container);

      pnls.Position.Assign(p);
      if (pnls.Visible==true) pnls.Position.enForce(pnls.Container);
      pnls.innerPosition.Assign(p);
      pnls.innerPosition.Top=pnls.Border.Top+pnls.Padding.Top;
      pnls.innerPosition.Left=pnls.Border.Left+pnls.Padding.Left;
      pnls.innerPosition.Width-=(pnls.innerPosition.Left+pnls.Border.Right+pnls.Padding.Right);
      pnls.innerPosition.Height-=(pnls.innerPosition.Top+pnls.Border.Bottom+pnls.Padding.Bottom);
    };
    _pnls.Show=function(){
      var pnls=this;
      if (pnls.cssLoaded!=true){
        pnls.loadCSS();
        pnls.cssLoaded=true;
      };
      pnls.setVisibility(true);
      //pnls.setSize();
    };
    _pnls.Hide=function(){
      var pnls=this;
      pnls.setVisibility(false);
    };
    _pnls.Free=function(){
      var pnls=this;
      if (pnls.vScroll) pnls.vScroll.Free();
      pnls.Clear();
      pnls.Parent.removeChild(pnls.Container);

      pnls=Release(pnls);
      return null;
    };
    _pnls.Height=_pnls.Container.offsetHeight;
    _pnls.Width=_pnls.Container.offsetWidth;
    _pnls.Kind=_pnls._createPanelKind(10);
    _pnls.Margin.Load(_pnls.Container);
    _pnls.Padding.Load(_pnls.Container);
    _pnls.Border.Load(_pnls.Container);
    if (vScroll==true)
      _pnls.vScroll=coAppUI.App.Components.vScroll.Create("VScroll",_pnls.Frame,_pnls,_pnls.Parent,_pnls.Parent);
    return _pnls;
  }
};
