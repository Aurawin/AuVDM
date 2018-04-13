UI.Toolbar = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  debugToConsole : true,
  Compiled       : false,
  init: function(){
    this.Initialized=true;
    UI.Controls.Add(this);
  },
  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Top;
    var _tb=Slides.createSlide(sName,sClass,Screen,Owner,Parent,Align);
    _tb._Free=_tb.Free;

    _tb.Client=document.createElement('div');
    _tb.Container.appendChild(_tb.Client);
    _tb.Client.className=_tb.Class+"Btns";
    _tb.Container.className=_tb.Class+ " toolbarGradient";
    _tb.AllowWrap=true;
    _tb.Height=coVDM.ToolbarHeightFull;
    _tb.Container.style.height=_tb.Height+"px";

    _tb.Buttons=coObject.Create();
    _tb.Buttons.Padding=new Padding();
    _tb.Buttons.Padding.Load(_tb.Client);
    _tb.Buttons.Class="toolbarButtons";
    _tb.Buttons.btnBorder=null;
    _tb.Buttons.Height=coVDM.ToolbarHeightFull;
    _tb.Buttons.FullHeight=coVDM.ToolbarHeightFull;
    _tb.Buttons.LinearHeight=coVDM.ToolbarHeightLinear;
    _tb.Buttons.BareHeight=coVDM.ToolbarHeightBare;
    coTheme.UI.Toolbar.Apply(_tb);
    _tb.setHeights=function(iFull,iLinear,iBare){
      var tb=this;
      tb.Buttons.FullHeight=iFull;
      tb.Buttons.LinearHeight=iLinear;
      tb.Buttons.BareHeight=iBare;
      tb.Buttons.Height=iFull;
      tb.Container.style.maxHeight=(tb.AllowWrap==true) ? "" : iLinear+"px";
      tb.Client.style.whiteSpace=(tb.AllowWrap==true) ? "" : "nowrap";
      tb.Container.style.height=iFull+"px";
      if ((tb.AllowWrap==true) && (tb.Container.scrollHeight>tb.Container.offsetHeight))
        tb.Container.style.height=tb.Container.scrollHeight+"px";
    };
    _tb.setTransition=function(sTransition){
      coDOM.setTransition(this.Container,sTransition);
    };
    _tb.createMode=function(){
      var tb=this;
      var md=coObject.Create();
      md.Class="toolbarMode";
      md.captionBottom=1;
      md.captionRight=2;
      md.captionNone=3;
      md.justCaptions=4;
      md.Index=1;
      md.Owner=tb;
      md.setValue=function(value){
        var md=this;
        var tb=md.Owner;
        switch (value) {
          case (md.justCaptions):
            md.Index=md.justCaptions;
            tb.Buttons.Height=tb.Buttons.BareHeight;
            break;
          case (md.captionBottom) :
            md.Index=md.captionBottom;
            tb.Buttons.Height=tb.Buttons.FullHeight;
            break;
          case (md.captionRight) :
            md.Index=md.captionRight;
            tb.Buttons.Height=tb.Buttons.LinearHeight;
            break;
          case (md.captionNone) :
            md.Index=md.captionNone;
            tb.Buttons.Height=tb.Buttons.LinearHeight;
            break;
        };
        tb.Container.style.height=tb.Height+"px";
        for (var iLcv=0; iLcv<tb.Items.length; iLcv++){
          var itm=tb.Items[iLcv];
          itm.modeChanged();
        };
      };
      md.Free=function(){
        var md=this;
        md=coObject.Release(md);
        return null;
      };
      return md;
    };
    _tb.btnInfo=coObject.Create();
    _tb.btnInfo.Border=null;

    _tb.createItemKind=function(Value){
      var tb=this;
      if (Value==undefined) Value=1;
      var knd=coObject.Create();
      knd.Class="toolbarItemKind";
      knd.Owner=tb;
      knd.Button=1;
      knd.TextWithButton=2;
      knd.Seperator=3;
      knd.Select=4;
      knd.Switch=5;
      knd.Index=Value;
      knd.Free=function(){
        var knd=this;
        knd=coObject.Release(knd);
        return null;
      };
      return knd;
    };
    _tb.createTextWithButton=function(sCaption,urlIcon){
      var tb=this;
      var twb=coObject.Create();
      twb.Hidden=false;
      twb.Visible=false;
      twb.Class=tb.Class+"TxtWBtn";
      twb.Parent=tb.Client;
      twb.Owner=tb;
      twb.onClick=null;
      twb.onTextChange=null;
      twb.Kind=tb.createItemKind(tb.Kinds.TextWithButton);
      twb.inputBorder=new Border();
      twb.inputMargin=new Margin();
      twb.Container=document.createElement('div');
      twb.Parent.appendChild(twb.Container);
      twb.Container.className=twb.Class;

      twb.Input=document.createElement('input');
      twb.Container.appendChild(twb.Input);
      twb.Input.className=twb.Class+"Text toolbarGradient";
      twb.Input.Owner=twb;
      twb.Input.style.borderColor=coTheme.UI.Toolbar.Item.Border.Color.Idle.toString();
      twb.Input.style.color=coTheme.UI.Toolbar.Item.Text.Color.toString();
      coTheme.UI.Toolbar.Item.Text.Shadow.Idle.Apply(twb.Input);

      twb.doClick=function(){
        var twb=this;
        twb.Input.blur();
        if (twb.onClick) twb.onClick(twb);
      };
      twb.Input.onkeypress=function(e){
        if (e.keyCode==13){
          coDOM.preventDefault(e);
          twb.doClick();
        } else {
          if (twb.onTextChange) twb.onTextChange(twb);
        };
      };
      twb.Conseal=function(){
        var twb=this;
        twb.Hidden=true;
        twb.Hide();
        twb.Container.style.display="none";
      };
      twb.Button=tb.createButton(sCaption,urlIcon);
      twb.Button.Parent=twb.Container;
      twb.Container.appendChild(twb.Button.Container);
      var idx=tb.Items.indexOf(twb.Button);
      if (idx!=-1) tb.Items.splice(idx,1);

      twb.Button.onClick=function(){
        twb.doClick();
      };

      twb.Show=function(){
        var twb=this;
        twb.Visible=true;
        twb.Container.style.display="inline-block";
        twb.Container.style.visibility="visible";
        twb.Input.style.visibility="visible";
        twb.inputBorder.Load(twb.Input);
        twb.inputMargin.Load(twb.Input);
        twb.Button.Show();
      };

      twb.Hide=function(){
        var twb=this;
        twb.Visible=false;
        twb.Container.style.visibility="hidden";
        twb.Input.style.visibility="hidden";
        twb.Input.blur();
        twb.Button.Hide();
      };
      twb.modeChanged=function(){
        var twb=this;
        var btn=twb.Button;
        btn.modeChanged();
      };
      twb.Free=function(){
        var twb=this;
        twb.Button.Free();
        twb.Input.onkeypress=null;

        twb.Container.removeChild(twb.Input);
        twb.Parent.removeChild(twb.Container);

        twb=coObject.Release(twb);
        return null;
      };

      tb.Items.push(twb);
      return twb;
    };
    _tb.createText=function(sCaption,sTitle){
      if (sCaption==undefined) sCaption="";
      if (sTitle==undefined) sTitle="";
      var tb=this;
      var t=coObject.Create();
      t.Hidden=false;
      t.Visible=false;
      t.Enabled=true;
      t.Class=tb.Class+"Txt";
      t.Parent=tb.Client;
      t.Owner=tb;
      t.onClick=null;
      t.onTextChange=null;
      t.Kind=tb.createItemKind(tb.Kinds.Text);

      t.Container=document.createElement('div');
      t.Parent.appendChild(t.Container);
      t.Container.className=t.Class;
      t.Container.title=sTitle;

      t.Decore=document.createElement('div');
      t.Container.appendChild(t.Decore);
      t.Decore.className=t.Class+"Deco";


      t.Input=document.createElement('input');
      t.Decore.appendChild(t.Input);
      t.Input.className=t.Class+" toolbarGradient";
      t.Input.style.borderColor=coTheme.UI.Toolbar.Item.Border.Color.Idle.toString();
      t.Input.style.color=coTheme.UI.Toolbar.Item.Text.Color.toString();
      coTheme.UI.Toolbar.Item.Text.Shadow.Idle.Apply(t.Input);
      t.Input.placeholder=sTitle;
      t.Input.Owner=t;

      t.Caption=document.createElement('div');
      t.Decore.appendChild(t.Caption);
      t.Caption.className=t.Class+"Cap";
      coDOM.setText(t.Caption,sCaption);
      t.doClick=function(){
        var t=this;
        t.Input.blur();
        if (t.onClick) t.onClick(t);
      };
      t.getCaption=function(){
        return coDOM.getText(this.Caption);
      };
      t.setCaption=function(sCaption){
        if (sCaption==undefined) sCaption="";
        return coDOM.setText(this.Caption,sCaption);
      };
      t.Input.onkeypress=function(e){
        if (e.keyCode==13){
          coDOM.preventDefault(e);
          t.doClick();
        } else {
          t.tmrChange.setActive(true);
        };
      };
      t.Input.oninput=function(e){
        var t=this.Owner;
        if (t.Loading==true) return;
        t.tmrChange.setActive(true);
      };
      t.tmrChange=coApp.Timers.createItem(coVDM.EditChangeNotifiyDelay);
      t.tmrChange.Owner=t;
      t.tmrChange.RunOnce=true;
      t.tmrChange.onExecute=function(){
        var t=this.Owner;
        if (t.onTextChange) t.onTextChange(t);
      };
      t.Conseal=function(){
        var t=this;
        t.Hidden=true;
        t.Hide();
        t.Container.style.display="none";
      };
      t.Show=function(){
        var t=this;
        t.Visible=true;
        t.Container.style.display="inline-block";
        t.Container.style.visibility="visible";
        t.Decore.style.visibility="visible";
        t.Input.style.visibility="visible";
        t.Caption.style.visibility="visible";
        coTheme.UI.Toolbar.Item.Text.Apply(t);
      };
      t.Hide=function(){
        var t=this;
        t.Visible=false;
        t.Input.blur();
        t.Input.style.visibility="hidden";
        t.Decore.style.visibility="hidden";
        t.Caption.style.visibility="hidden";
        t.Container.style.visibility="hidden";
      };
      t.modeChanged=function(){
        var t=this;
        switch (tb.Mode.Index){
          case (tb.Mode.captionBottom) : {
            t.Container.style.display="inline-block";
            t.Caption.style.cssFloat="right";
            t.Caption.style.lineHeight=tb.Buttons.LinearHeight+"px";
            t.Input.style.cssFloat="left";
            break;
          };
          case (tb.Mode.captionRight)  : {
            t.Container.style.display="inline-block";
            t.Caption.style.cssFloat="right";
            t.Caption.style.lineHeight=tb.Buttons.LinearHeight+"px";
            t.Input.style.cssFloat="left";
            break;
          };
          case (tb.Mode.captionNone)   : {
            t.Container.style.display="inline-block";
            t.Caption.style.cssFloat="right";
            t.Caption.style.lineHeight=tb.Buttons.LinearHeight+"px";
            t.Input.style.cssFloat="left";
            break;
          };
          case (tb.Mode.justCaptions)   : {
            t.Container.style.display="inline-block";
            t.Caption.style.lineHeight=tb.Buttons.BareHeight+"px";
            t.Caption.style.cssFloat="right";
            t.Input.style.cssFloat="left";
            break;
          };
        };
        t.Input.style.height=t.Caption.offsetHeight-coTheme.UI.Toolbar.Item.Text.Input.yBias()+"px";
      };
      t.setEnabled=function(Value){
        if (Value==undefined) Value=false;
        var t=this;
        t.Enabled=(Value==true);
        if (t.Enabled==true){
          t.Input.style.pointerEvents="all";
        } else {
          t.Input.value="";
          t.Input.style.pointerEvents="none";
        };

      };
      t.setTitle=function(Value){
        this.Container.title=Value;
        this.Input.placeholder=Value;
      };
      t.getTitle=function(){
        return this.Container.title;
      };
      t.setValue=function(Value){
        this.Value=Value;
        this.Input.value=Value;
      };
      t.getValue=function(Value){
        return this.Input.value;
      };
      t.setTextWidth=function(Width){
        if (Width==undefined) Width=coTheme.UI.Toolbar.Item.Text.Width;
        this.Input.style.width=Width+"px";
      };
      t.Free=function(){
        var t=this;
        t.Input.onkeypress=null;
        t.Decore.removeChild(t.Caption);
        t.Decore.removeChild(t.Input);
        t.Container.removeChild(t.Decore);
        t.Parent.removeChild(t.Container);
        t=coObject.Release(t);
        return null;
      };

      tb.Items.push(t);
      return t;
    };
    _tb.createSelect=function(){
      var tb=this;
      var sel=coObject.Create();
      sel.Hidden=false;
      sel.Visible=false;
      sel.Class=tb.Class+"Select";
      sel.Parent=tb.Client;
      sel.Owner=tb;
      sel.onClick=null;
      sel.onChange=null;
      sel.Padding=new Padding();
      sel.Margin=new Margin();
      sel.Kind=tb.createItemKind(tb.Kinds.Select);
      sel.Container=document.createElement('select');
      sel.Parent.appendChild(sel.Container);
      coTheme.UI.Toolbar.Item.Text.Shadow.Idle.Apply(sel.Container);
      sel.Container.style.color=coTheme.UI.Toolbar.Item.Text.Color.toString();
      sel.Container.style.borderColor=coTheme.UI.Toolbar.Item.Border.Color.Idle.toString();
      sel.Container.className=sel.Class + " toolbarGradient";
      sel.Container.Owner=sel;
      sel.Margin.Load(sel.Container);
      sel.Padding.Load(sel.Container);
      sel.Padding.Left+=4;
      sel.Padding.Right+=4;
      sel.AutoSize=function(){
        var sel=this;
        var tb=sel.Owner;
        if (sel.Container.options.selectedIndex!=-1) {
          sel.staticWidth=coDOM.textWidth(
            coVDM.divFormat,
            coTheme.UI.Select.fontSize,
            sel.Container.options[sel.Container.options.selectedIndex].text,
            sel.Padding,
            sel.Margin
          )+coTheme.UI.Select.buttonWidth;
          if (sel.Container.offsetLeft+sel.staticWidth>tb.Container.clientWidth-7)
            sel.staticWidth=tb.Container.clientWidth-(7+sel.Container.offsetLeft);
          sel.Container.style.width=sel.staticWidth+"px";
        };
      };
      sel.Container.onchange=function(e){
        if (e==undefined) e=window.event;
        var src=coDOM.srcElement(e);
        var sel=src.Owner;
        sel.AutoSize();
        if (sel.onChange) sel.onChange();
      };
      sel.Show=function(){
        var sel=this;
        sel.Visible=true;
        sel.Container.style.visibility="visible";
        sel.Container.style.display="inline-block";
        coTheme.UI.Select.Apply(sel.Container);
        sel.AutoSize();
      };
      sel.Hide=function(){
        var sel=this;
        sel.Visible=false;
        sel.Container.style.display="none";
      };
      sel.modeChanged=function(){
        var sel=this;
      };
      sel.Free=function(){
        var sel=this;

        sel.Parent.removeChild(sel.Container);

        sel=coObject.Release(sel);
        return null;
      };
      sel.Conseal=function(){
        var sel=this;
        sel.Hidden=true;
        sel.Hide();
        sel.Container.style.display="none";
      };

      tb.Items.push(sel);
      return sel;
    };
    _tb.createSwitch=function(sCaption){
      var tb=this;
      var s=coObject.Create();
      s.Visible=false;
      s.Hidden=false;
      s.Class=tb.Class+"Swth";
      s.Parent=tb.Client;
      s.Owner=tb;
      s.onClick=null;
      s.Value=false;
      s.Enabled=true;
      s.Kind=tb.createItemKind(tb.Kinds.Switch);

      s.Container=document.createElement('div');
      s.Parent.appendChild(s.Container);
      s.Container.className=s.Class;
      s.Container.Owner=s;

      s.Decore=document.createElement('div');
      s.Container.appendChild(s.Decore);
      s.Decore.className=s.Class+"Deco";

      s.Caption=document.createElement('div');
      s.Decore.appendChild(s.Caption);
      s.Caption.className=s.Class+"Cap";
      coDOM.setText(s.Caption,sCaption);

      s.Track=document.createElement('div');
      s.Decore.appendChild(s.Track);
      s.Track.className=s.Class+"Track";
      s.Track.Owner=s;

      s.Nurl=document.createElement('div');
      s.Track.appendChild(s.Nurl);
      s.Nurl.Owner=s;
      s.Nurl.className=s.Class+"Nurl";
      s.Nurl.onclick=function(e){
        this.Owner.Toggle();
        this.Owner.doClick();
        e.preventDefault();
      };
      s.Nurl.onmouseover=function(e){
        this.style.backgroundColor=coTheme.UI.Toolbar.Item.Switch.Nurl.Face.Hover.Color.toString();
        coTheme.UI.Toolbar.Item.Switch.Nurl.Border.Hover.enForce(this);
      };
      s.Nurl.onmouseout=function(e){
        this.style.backgroundColor=coTheme.UI.Toolbar.Item.Switch.Nurl.Face.Normal.Color.toString();
        coTheme.UI.Toolbar.Item.Switch.Nurl.Border.Normal.enForce(this);
      };
      s.Nurl.ontouchend=function(e){
        this.Owner.Toggle();
        this.Owner.doClick();
        e.preventDefault();
      };
      s.Container.title=sCaption;
      s.doClick=function(){
        if (this.onClick) this.onClick(this);
      };
      s.setCaption=function(value){
        coDOM.setText(this.Caption,value);
      };
      s.setValue=function(Value){
        var s=this;
        if (Value==true){
          s.setOn();
        } else {
          s.setOff();
        };
      };
      s.Toggle=function(){
        var s=this;
        if (s.Value==true){
          s.setOff();
        } else {
          s.setOn();
        };
      };
      s.setOn=function(){
        var s=this;
        s.Value=true;
        s.Nurl.style.cssFloat="right";
        s.Nurl.style.backgroundColor=coTheme.UI.Toolbar.Item.Switch.Nurl.Face.Normal.Color.toString();
        s.Track.style.backgroundColor=coTheme.UI.Toolbar.Item.Switch.Color.On.toString();
        coTheme.UI.Toolbar.Item.Switch.Nurl.Border.Normal.enForce(s.Nurl);
      };
      s.setOff=function(){
        var s=this;
        s.Value=false;
        s.Nurl.style.cssFloat="left";
        s.Nurl.style.backgroundColor=coTheme.UI.Toolbar.Item.Switch.Nurl.Face.Normal.Color.toString();
        s.Track.style.backgroundColor=coTheme.UI.Toolbar.Item.Switch.Color.Off.toString();
        coTheme.UI.Toolbar.Item.Switch.Nurl.Border.Normal.enForce(s.Nurl);
      };
      s.setEnabled=function(Value){
        if (Value==undefined) Value=false;
        var s=this;
        s.Enabled=(Value==true);
        if (s.Enabled==true){
          s.Nurl.style.pointerEvents="all";
          s.Track.style.pointerEvents="all";
          if (s.Value==true) {
            s.setOn();
          } else {
            s.setOff();
          };
        } else {
          s.Nurl.style.pointerEvents="none";
          s.Track.style.pointerEvents="none";
          s.Nurl.style.cssFloat="right";
          s.Nurl.style.backgroundColor=coTheme.UI.Toolbar.Item.Switch.Nurl.Face.Disabled.Color.toString();
          s.Track.style.backgroundColor=coTheme.UI.Toolbar.Item.Switch.Color.Disabled.toString();
        };

      };
      s.setHint=function(value){
        this.Container.title=value;
      };
      s.Show=function(){
        var s=this;
        s.Visible=true;
        s.Container.className=s.Class;
        s.Container.style.display="inline-block";
        s.Container.style.visibility="visible";
        s.Decore.style.visibility="visible";
        s.Caption.style.visibility="visible";

        coTheme.UI.Toolbar.Item.Switch.Apply(s);

        s.modeChanged();

        if (s.Enabled==true) {
          if (s.Value==true){
            s.setOn();
          } else {
            s.setOff();
          };
        } else {
          s.setEnabled(false);
        };
      };
      s.Conseal=function(){
        var s=this;
        s.Hidden=true;
        s.Hide();
        s.Container.style.display="none";
      };
      s.Hide=function(){
        var s=this;
        s.Visible=false;
        s.Container.style.visibility="hidden";
        s.Decore.style.visibility="hidden";
        s.Caption.style.visibility="hidden";
        s.Track.style.visibility="hidden";
        s.Nurl.style.visibility="hidden";
      };
      s.modeChanged=function(){
        var s=this;
        var tb=s.Owner;
        switch (tb.Mode.Index){
          case (tb.Mode.captionBottom) : {
            s.Container.style.display="inline-block";
            s.Caption.style.cssFloat="left";
            s.Caption.style.lineHeight=tb.Buttons.LinearHeight+"px";
            break;
          };
          case (tb.Mode.captionRight)  : {
            s.Container.style.display="inline-block";
            s.Caption.style.cssFloat="right";
            s.Caption.style.lineHeight=tb.Buttons.LinearHeight+"px";
            break;
          };
          case (tb.Mode.captionNone)   : {
            s.Container.style.display="inline-block";
            s.Caption.style.cssFloat="left";
            s.Caption.style.lineHeight=tb.Buttons.LinearHeight+"px";
            break;
          };
          case (tb.Mode.justCaptions)   : {
            s.Container.style.display="inline-block";
            s.Caption.style.cssFloat="left";
            s.Caption.style.lineHeight=tb.Buttons.BareHeight+"px";
            break;
          };
        };
        s.Track.style.height=s.Caption.offsetHeight-(
          coTheme.UI.Toolbar.Item.Switch.Track.yBias()
          //coTheme.UI.Toolbar.Item.Switch.Nurl.Border.Normal.yBias()
        )+"px";
        s.Nurl.style.height=s.Track.clientHeight-coTheme.UI.Toolbar.Item.Switch.Nurl.yBias()+"px";
      };
      s.Free=function(){
        var s=this;
        var tb=s.Owner;
        if (tb.Items.Loading==false) {
          var idx= tb.Items.indexOf(tab);
          if (idx!=-1)
            tb.Items.splice(idx,1);
        };
        s.Track.removeChild(s.Nurl);
        s.Decore.removeChild(s.Track);
        s.Decore.removeChild(s.Caption);
        s.Parent.removeChild(s.Container);

        s=coObject.Release(s);
        return null;
      };

      tb.Items.push(s);

      return s;
    };
    _tb.createButton=function(sCaption,urlIcon){
      var tb=this;
      var btn=coObject.Create();
      btn.Visible=false;
      btn.Hidden=false;
      btn.Class=tb.Class+"Btn";
      btn.Parent=tb.Client;
      btn.Owner=tb;
      btn.Down=false;
      btn.AllowUp=true;
      btn.onClick=null;
      btn.Border=new Border();
      btn.Margin=new Margin();
      btn.Padding=new Padding();

      btn.Kind=tb.createItemKind(tb.Kinds.Button);

      btn.Container=document.createElement('div');
      btn.Parent.appendChild(btn.Container);
      btn.Container.className=btn.Class;
      btn.Container.Owner=btn;

      btn.Decore=document.createElement('div');
      btn.Container.appendChild(btn.Decore);
      btn.Decore.className=btn.Class+"Deco";

      btn.Icon=document.createElement('div');
      btn.Decore.appendChild(btn.Icon);
      btn.Icon.className=btn.Class+"Icon";

      btn.Caption=document.createElement('div');
      btn.Decore.appendChild(btn.Caption);
      btn.Caption.className=btn.Class+"Cap";
      coDOM.setText(btn.Caption,sCaption);
      btn.Container.title=sCaption;
      btn.setIcon=function(sUrl){
        if ((sUrl!=undefined) && (sUrl!==null) && (sUrl.length>0) ){
          btn.Icon.style.backgroundImage="url("+sUrl+")";
          btn.urlIcon=sUrl;
        } else {
          btn.Icon.style.display="none";
          btn.Icon.style.width="0px";
          btn.Icon.style.height="0px";
          btn.Caption.style.paddingTop="0px";
          btn.Caption.style.paddingBottom="0px";
          btn.urlIcon=null;
        }
      };

      if (! tb.Buttons.btnBorder) {
        tb.Buttons.btnBorder=new Border();
        tb.Buttons.btnBorder.Load(btn.Container);
      };

      btn.Container.ontouchstart=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var src=coDOM.currentTarget(e);
        if (coAppUI.debugToConsole==true) coVDM.VDM.Console.Append("Toolbar.btn.ontouchstart");
        var btn=src.Owner;
        btn.setDown();
      };
      btn.Container.ontouchend=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var src=coDOM.currentTarget(e);
        if (coAppUI.debugToConsole==true) coVDM.VDM.Console.Append("Toolbar.btn.ontouchend");
        var btn=src.Owner;
        if (btn.AllowUp==true) btn.setUp();

        if (btn.onClick) {
          if (coAppUI.debugToConsole==true) coVDM.VDM.Console.Append("Toolbar.btn.onClick");
          try{
            btn.onClick(btn);
          }catch(err){
            if (coAppUI.debugToConsole==true) coVDM.VDM.Console.Append("Exception: Toolbar.btn.onClick "+err);
          };
        };
      };
      btn.Container.onmousedown=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var src=coDOM.currentTarget(e);
        if (coAppUI.debugToConsole==true) coVDM.VDM.Console.Append("Toolbar.btn.onmousedown");
        var btn=src.Owner;
        btn.setDown();
      };
      btn.Container.onmouseup=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var src=coDOM.currentTarget(e);
        if (coAppUI.debugToConsole==true) coVDM.VDM.Console.Append("Toolbar.btn.onmouseup");
        var btn=src.Owner;
        if (btn.AllowUp==true) btn.setUp();
      };
      btn.Container.onclick=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var src=coDOM.currentTarget(e);
        if (coAppUI.debugToConsole==true) coVDM.VDM.Console.Append("Toolbar.btn.onclick");
        var btn=src.Owner;
        if (btn.onClick) btn.onClick(btn);
      };
      btn.setDown=function(){
        var btn=this;
        var tb=btn.Owner;
        btn.Container.className=btn.Class+"Down";
        btn.Down=true;
      };
      btn.setUp=function(){
        var btn=this;
        btn.Container.className=btn.Class;
        btn.Down=false;
      };
      btn.Click=function(){
        var btn=this;
        if (btn.onClick) btn.onClick(btn);
      };
      btn.modeChanged=function(){
        var btn=this;
        var tb=btn.Owner;

        switch (tb.Mode.Index){
          case (tb.Mode.justCaptions):
            btn.Container.style.display="inline-block";
            btn.Decore.style.display="block";
            btn.Caption.style.display=(coDOM.getTextLen(btn.Caption)>0) ? "inline-block" : "none";
            btn.Icon.style.display="none";
            btn.Caption.style.lineHeight=tb.Buttons.BareHeight+"px";
            break;
          case (tb.Mode.captionBottom) :
            btn.Container.style.display="inline-block";
            if (btn.urlIcon){
              btn.Icon.style.display="block";
              btn.Icon.style.height="";
              btn.Icon.style.width="";
            };
            btn.Caption.style.display="block";
            break;
          case (tb.Mode.captionRight)  :
            btn.Container.style.display="inline-block";
            btn.Decore.style.display="block";

            btn.Caption.style.display=(coDOM.getTextLen(btn.Caption)>0) ? "inline-block" : "none";

            btn.Decore.style.width="";
            btn.Caption.style.verticalAlign="top";
            btn.Container.style.height=tb.Buttons.Height-tb.Buttons.Padding.yBias()-tb.Buttons.btnBorder.yBias()+"px";
            btn.Icon.style.height=btn.Container.clientHeight+"px";
            if (btn.Container.clientHeight>0) {
              if (btn.urlIcon) {
                btn.Icon.style.display="inline-block";
                btn.Icon.style.width=btn.Icon.clientHeight+"px";
                btn.Decore.style.height=btn.Container.clientHeight+"px";
                btn.Caption.style.lineHeight=tb.Buttons.LinearHeight+"px";
              } else {
                btn.Caption.style.lineHeight=btn.Container.clientHeight+"px";
              };
            } else {
              tb.resizeNeeded=true;
            };
            break;
          case (tb.Mode.captionNone)   :
            if (btn.urlIcon){
              btn.Icon.style.display="block";
              btn.Icon.style.width=btn.Icon.clientHeight+"px";
            };
            var iSquare=tb.Buttons.Height-tb.Buttons.Padding.yBias()-tb.Buttons.btnBorder.yBias();
            btn.Container.style.height=iSquare+"px";
            btn.Container.style.width=iSquare+"px";
            btn.Caption.style.display="none";
            btn.Decore.style.height=btn.Container.clientHeight+"px";
            btn.Decore.style.width="";
            btn.Icon.style.height=btn.Decore.clientHeight+"px";
            break;
        };

      };
      btn.setCaption=function(value){
        coDOM.setText(this.Caption,value);
      };
      btn.setHint=function(value){
        this.Container.title=value;
      };
      btn.Show=function(){
        var btn=this;
        btn.Visible=true;
        btn.Container.className=(btn.Down==true)? btn.Class+"Down" : btn.Class;
        btn.Container.style.display="inline-block";
        btn.Container.style.visibility="visible";
        btn.Decore.style.visibility="visible";
        btn.Icon.style.visibility="visible";
        btn.Caption.style.visibility="visible";

        btn.Margin.Load(btn.Container);
        btn.Border.Load(btn.Container);

        btn.modeChanged();
      };
      btn.Conseal=function(){
        var btn=this;
        btn.Hidden=true;
        btn.Hide();
        btn.Container.style.display="none";
      };
      btn.Hide=function(){
        var btn=this;
        btn.Visible=false;
        btn.Container.style.visibility="hidden";
        btn.Decore.style.visibility="hidden";
        btn.Icon.style.visibility="hidden";
        btn.Caption.style.visibility="hidden";
      };
      btn.Free=function(){
        var btn=this;
        var tb=btn.Owner;
        if (tb.Items.Loading==false) {
          var idx= tb.Items.indexOf(tab);
          if (idx!=-1)
            tb.Items.splice(idx,1);
        };
        btn.Decore.removeChild(btn.Caption);
        btn.Decore.removeChild(btn.Icon);
        btn.Container.removeChild(btn.Decore);
        btn.Parent.removeChild(btn.Container);

        btn=coObject.Release(btn);
        return null;
      };
      btn.setIcon(urlIcon);
      tb.Items.push(btn);
      return btn;
    };
    _tb.createSeperator=function(){
      var tb=this;
      var sep=coObject.Create();
      sep.Visible=false;
      sep.Hidden=false;
      sep.Class=tb.Class+"Sep";
      sep.Parent=tb.Client;
      sep.Owner=tb;
      sep.Margin=new Margin();
      sep.Kind=tb.createItemKind(tb.Kinds.Seperator);

      sep.Container=document.createElement('div');
      sep.Parent.appendChild(sep.Container);
      sep.Container.className=sep.Class;

      sep.Nurl=document.createElement('div');
      sep.Container.appendChild(sep.Nurl);
      sep.Nurl.className=sep.Class+"Nurl";
      sep.nurlMargin=new Margin();
      sep.modeChanged=function(){
        var sep=this;
        var tb=sep.Owner;
        switch (tb.Mode.Index){
          case (tb.Mode.captionBottom) :
            sep.Container.style.display="inline-block";
            break;
          case (tb.Mode.captionRight)  :
            sep.Container.style.display="inline-block";
            break;
          case (tb.Mode.captionNone)   :
            break;
        };
        sep.nurlMargin.Load(sep.Nurl);
        sep.Margin.Load(sep.Container);
        sep.Container.style.height=tb.Buttons.Height-tb.Buttons.Padding.yBias()+"px";
        sep.Nurl.style.height=sep.Container.clientHeight-(sep.Margin.yBias()+sep.nurlMargin.yBias())+"px";
      };
      sep.Show=function(){
        var sep=this;
        sep.Visible=true;
        sep.Container.style.visibility="visible";
        sep.Nurl.style.visibility="visible";
      };
      sep.Hide=function(){
        var sep=this;
        sep.Visible=false;
        sep.Container.style.visibility="hidden";
        sep.Nurl.style.visibility="hidden";
      };
      sep.Free=function(){
        var sep=this;
        var tb=btn.Owner;
        if (tb.Items.Loading==false) {
          var idx= tb.Items.indexOf(sep);
          if (idx!=-1)
            tb.Items.splice(idx,1);
        };
        sep.Container.removeChild(sep.Nurl);
        sep.Parent.removeChild(sep.Container);
        sep=coObject.Release(sep);
        return null;
      };
      tb.Items.push(sep);
      return sep;
    };
    _tb.Clear=function(){
      var tb=this;
      tb.Items.Loading=true;
      for (var iLcv=0; iLcv<tb.Items.length; iLcv++){
        var itm=tb.Items[iLcv];
        itm.Free();
      };
      tb.Items.length=0;
    };
    _tb.doShow=function(){
      var tb=this;
      tb.Client.style.display="inline-block";
      for (var iLcv=0; iLcv<tb.Items.length; iLcv++){
        var itm=tb.Items[iLcv];
        itm.modeChanged();
        if (itm.Hidden==false)
          itm.Show();
      };
      if (
        (tb.Align.Index==coAppUI.Alignment.Default) ||
        (tb.Align.Index==coAppUI.Alignment.Center)
      ) {
        tb.Container.style.width=tb.Client.offsetWidth+"px";
      };
    };
    _tb.doSetSize=function(){
      var tb=this;
      tb.Height=tb.Client.offsetHeight-tb.Padding.yBias();
      tb.Container.style.height=tb.Height+"px";
      if (tb.AllowWrap==true)  {
        tb.Height=tb.Client.offsetHeight-tb.Padding.yBias();
        tb.Container.style.height=tb.Height+"px";
      };
    };
    _tb.doHide=function(){
      var tb=this;
      tb.Client.style.display="none";
    };
    _tb.Free=function(){
      var tb=this;
      tb.Clear();
      tb.Mode=tb.Mode.Free();
      tb.Kinds=tb.Kinds.Free();
      tb.Buttons=coObject.Release(tb.Buttons);
      tb.Container.removeChild(tb.Client);
      tb=tb._Free();
      return null;
    };
    _tb.Items=new Array();
    _tb.Items.Loading=false;
    _tb.Mode=_tb.createMode();
    _tb.Kinds=_tb.createItemKind();


    return _tb;
  }
};
