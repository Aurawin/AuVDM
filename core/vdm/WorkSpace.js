coVDM.App.Components.WorkSpace = {
  Version        : new Version(2014,8,22,33),
  Title          : new Title("VDM Core WorkSpace","WorkSpace"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/WorkSpace.js',coAppKit.PreLoaded),
  debugToConsole : true,
  VDM            : null,
  Create : function (aVDM){
    var _ws=new Object();
    _ws.Unit=this;
    _ws.VDM=aVDM;

    _ws.Parent=document.getElementById('vdm');
    _ws.Margin = new Margin(0,0,0,0);
    _ws.Container = document.createElement('div');
    _ws.Parent.appendChild(_ws.Container);
    _ws.Container.className="WorkSpace";
    _ws.Visible=false;
    _ws.Client=document.createElement('div');
    _ws.Container.appendChild(_ws.Client);
    _ws.Client.className="WorkSpaceClient";

    _ws.Size= new Size(_ws.Client.offsetWidth,_ws.Client.offsetHeight);
    _ws.setSize=function(){
      coAppUI.App.Components.vScroll.HideAll();
      var ws=this;
      var m=ws.Margin;
      var tbh=(ws.VDM.TopBar) ? ws.VDM.TopBar.getHeight() : 0;
      ws.Container.style.top = tbh  +"px";
      ws.Container.style.left = "0px";
      ws.Container.style.width = (ws.VDM.Container.clientWidth-(m.Right+m.Left) ) +"px";
      ws.Container.style.height = (ws.VDM.Container.clientHeight - tbh - (m.Top+m.Bottom))+ "px";
      ws.Client.style.top="0px";
      ws.Client.style.left="0px";
      ws.Client.style.width=ws.Container.style.width;
      ws.Client.style.height=ws.Container.style.height;
      ws.Size.Width=ws.Container.offsetWidth;
      ws.Size.Height=ws.Container.offsetHeight;

      return true;
    };
    _ws._createButton=function(){
      var ws=this;
      var btn=coObject.Create();
      btn.Caption=coLang.Table.Apps.VDM.Applications;
      btn.Owner=ws;
      btn.Parent=ws.Client;
      btn.Visible=false;
      btn.Class="AuButton";
      btn.Selected=false;
      btn.Expanded=false;
      btn.Disabled=true;
      btn.Caption=coLang.Table.Apps.VDM.Starting;

      btn.Container=document.createElement('div');
      btn.Parent.appendChild(btn.Container);
      btn.Container.className=btn.Class+" "+btn.Class+"Gradient";
      btn.Border=document.createElement('div');
      btn.Container.appendChild(btn.Border);
      btn.Border.className=btn.Class+"Bdr";

      btn.Icon=document.createElement('div');
      btn.Border.appendChild(btn.Icon);
      btn.Icon.className=btn.Class+"Icon";

      coDOM.setText(btn.Icon,btn.Caption);
      btn.Initialize=function(){
        var btn=this;
        btn.Disabled=false;
        btn.Show();
        btn.setExpanded();
      };
      btn.setExpanded=function(){
        var btn=this;
        btn.Expanded=true;
        btn.Disabled=false;
        coDOM.setText(btn.Icon,"");
        btn.Decorate();
      };
      btn.setCaption=function(sCaption){
        var btn=this;
        btn.Caption=sCaption;
        if (btn.Expanded==false)
          coDOM.setText(btn.Icon,sCaption);
      };
      btn.setCollapsed=function(){
        var btn=this;
        if (btn.Expanded==false) return;
        coDOM.setText(btn.Icon,btn.Caption);
        btn.Expanded=false;
        btn.Decorate();
      };
      btn.Show=function(){
        var btn=this;
        btn.Visible=true;
        btn.Decorate();
        btn.Container.style.display="block";
        btn.Icon.style.display="inline-block";
        btn.Border.style.display="inline-block";
        btn.Container.style.visibility="visible";
      };
      btn.Hide=function(){
        var btn=this;
        btn.Visible=false;
        btn.Container.style.display="none";
        btn.Icon.style.display="none";
        btn.Border.style.display="none";
      };
      btn.Decorate=function(){
        var btn=this;
        if (btn.Disabled==true){
            btn.Icon.className=(btn.Selected==true) ? btn.Class+"IconSelectedDis" : btn.Class+"IconDis";
            btn.Border.className=(btn.Selected==true) ? btn.Class+"BdrSelectedDis" : btn.Class+"BdrDis";
            btn.Container.className=(btn.Selected==true) ? btn.Class+"SelectedDis " + btn.Class+"GradientSelected" : btn.Class+"Dis " + btn.Class+"GradientDis";
        } else {
          if (btn.Expanded==true) {
            btn.Icon.className=(btn.Selected==true) ? btn.Class+"IconSelected" : btn.Class+"Icon";
            btn.Border.className=(btn.Selected==true) ? btn.Class+"BdrSelected" : btn.Class+"Bdr";
            btn.Container.className=(btn.Selected==true) ? btn.Class+"Selected " +btn.Class+"GradientSelected" : btn.Class+" " +btn.Class+"Gradient";
          } else {
            btn.Icon.className=(btn.Selected==true) ? btn.Class+"IconSelectedCol" : btn.Class+"IconCol";
            btn.Border.className=(btn.Selected==true) ? btn.Class+"BdrSelectedCol" : btn.Class+"BdrCol";
            btn.Container.className=(btn.Selected==true) ? btn.Class+"SelectedCol " + btn.Class+"GradientSelectedCol" : btn.Class+"Col " + btn.Class+"GradientCol";
          }
        };
      };
      btn.doMouseDown=function(e){
        if (coVDM.debugToConsole==true)
          coVDM.VDM.Console.Append("Workspace.AuButton.doMouseDown");
        if (e==undefined) e=window.event;
        e.stopPropagation();
        e.preventDefault();
        var btn=coVDM.VDM.WorkSpace.Button;
        if (btn.Disabled==true) return;

        if (coVDM.VDM.Applications.Visible==true) {
          coVDM.VDM.Applications.Hide();
        } else {
          coVDM.VDM.Applications.Show();
        };
      };
      btn.doTouchEnd=function(e){
        if (coVDM.debugToConsole==true)
          coVDM.VDM.Console.Append("Workspace.AuButton.doTouchEnd");
        if (e==undefined) e=window.event;
        e.stopPropagation();
        e.preventDefault();
        var btn=coVDM.VDM.WorkSpace.Button;
        if (btn.Disabled==true) return;
        btn.Selected=false;
        btn.Decorate();

        btn.evtMouseIn.setActive(true);
        btn.evtMouseOut.setActive(true);
        btn.evtMouseDown.setActive(true);
        if (coVDM.VDM.Applications.Visible==true) {
          coVDM.VDM.Applications.Hide();
        } else {
          coVDM.VDM.Applications.Show();
        };
      };
      btn.doTouchStart=function(e){
        if (coVDM.debugToConsole==true)
          coVDM.VDM.Console.Append("Workspace.AuButton.doTouchStart");
        if (e==undefined) e=window.event;
        e.stopPropagation();
        e.preventDefault();
        var btn=coVDM.VDM.WorkSpace.Button;
        if (btn.Disabled==true) return;
        btn.evtMouseIn.setActive(false);
        btn.evtMouseOut.setActive(false);
        btn.evtMouseDown.setActive(false);
        btn.Selected=true;
        btn.Decorate();
      };
      btn.doMouseOut=function(e){
        if (coVDM.debugToConsole==true)
          coVDM.VDM.Console.Append("Workspace.AuButton.doMouseOut");
        if (e==undefined) e=window.event;
        e.stopPropagation();
        e.preventDefault();
        var btn=coVDM.VDM.WorkSpace.Button;
        btn.Selected=false;
        btn.Decorate();
      };
      btn.doMouseIn=function(e){
        if (coVDM.debugToConsole==true)
          coVDM.VDM.Console.Append("Workspace.AuButton.doMouseIn");
        if (e==undefined) e=window.event;
        e.stopPropagation();
        e.preventDefault();
        var btn=coVDM.VDM.WorkSpace.Button;
        btn.Selected=true;
        btn.Decorate();
      };
      btn.evtMouseOut=coEvents.Add(btn.Icon,"mouseout",btn.doMouseOut,coEvents.Capture,coEvents.Active);
      btn.evtMouseIn=coEvents.Add(btn.Icon,"mouseover",btn.doMouseIn,coEvents.Capture,coEvents.Active);
      btn.evtMouseDown=coEvents.Add(btn.Container,"mousedown",btn.doMouseDown,coEvents.Capture,coEvents.Active);
      btn.evtTouchStart=coEvents.Add(btn.Container,"touchstart",btn.doTouchStart,coEvents.Capture,coEvents.Active);
      btn.evtTouchEnd=coEvents.Add(btn.Container,"touchend",btn.doTouchEnd,coEvents.Capture,coEvents.Active);

      return btn;
    };
    _ws.Button=_ws._createButton();
    _ws.Show=function(){
      var ws=this;
      ws.Visible=true;
      ws.setSize();
      ws.Client.style.visibility="visible";
      ws.Container.style.visibility="visible";
      document.title=coLang.Table.VDM.Title;
    };
    _ws.Hide=function(){
      var ws=this;
      ws.Visible=false;
      ws.Button.Hide();
      ws.Client.style.visibility="hidden";
      ws.Container.style.visibility="hidden";
    };
    return _ws;
  }
};

