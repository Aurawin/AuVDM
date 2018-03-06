coAppUI.App.Components.TreeView = {
  Version        : new Version(2014,9,3,62),
  Title          : new Title("Aurawin Tree View","TreeView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/TreeView.js',coAppKit.PreLoaded),
  debugToConsole : false,
  Create         : function(sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Client;
    var _tv=Slides.createSlide(sName,sClass,Screen,Owner,Parent,Align);
    _tv.debugToConsole=coAppUI.App.Components.TreeView.debugToConsole;
    _tv.AutoExpand=true;
    _tv.MultiSelect=false;
    _tv.AllowInplaceEditor=true;
    _tv.AllowNotify=false;
    _tv.touchLocked=false;
    _tv.Selected=null;
    _tv.onItemDeleted=null;
    _tv.onItemAdded=null;
    _tv.onItemRenamed=null;
    _tv.onItemSelected=null;
    _tv.onItemExpanded=null;
    _tv.onItemCollapsed=null;
    _tv.onEmptyFolder=null;
    _tv.onLoaded=null;
    _tv.lockSelection=false;
    _tv.doItemSelected=null;
    _tv.Showing=false;
    _tv._createInplaceEditor=function(){
      var tv=this;
      var _ed=new Object();
      _ed.recurseRelease=false;
      _ed.copyAsVar=true;

      _ed.Class="TVEditor";
      _ed.TreeView=tv;
      _ed.Parent=tv.Container;
      _ed.Selected=null;
      _ed.Visible=false;
      _ed.showEmptyFolder=false;
      _ed.Container=document.createElement('div');
      _ed.Parent.appendChild(_ed.Container);
      _ed.Container.className=_ed.Class;
      _ed.elmList=new Array();
      _ed.Border=new Border();
      _ed.Padding=new Padding();
      _ed.Border.Load(_ed.Container);
      _ed.Padding.Load(_ed.Container);
      _ed.createButton=function(sCaption,clsICO,clsCPTN){
        var ed=this;
        var _cmd=new Object();
        _cmd.recurseRelease=false;
        _cmd.copyAsVar=true;

        _cmd.Visible=false;
        _cmd.Class="TVCMD";
        _cmd.Parent=ed.Container;
        _cmd.Owner=ed;
        _cmd.iconClass=clsICO;
        _cmd.captionClass=clsCPTN;
        _cmd.onExecute=null;

        _cmd.Container=document.createElement('div');
        ed.elmList.push(_cmd.Container);
        _cmd.Parent.appendChild(_cmd.Container);
        _cmd.Container.className=_cmd.Class;

        _cmd.Icon=document.createElement('div');
        ed.elmList.push(_cmd.Icon);
        _cmd.Container.appendChild(_cmd.Icon);
        _cmd.Icon.className="TVCMDICO "+clsICO;

        _cmd.Caption=document.createElement('div');
        ed.elmList.push(_cmd.Caption);
        _cmd.Container.appendChild(_cmd.Caption);
        _cmd.Caption.className=clsCPTN;
        _cmd.Caption.textContent=sCaption;

        _cmd.doTouchEnd=function(e){
          var cmd=this;
          cmd.doMouseDown(e);
        };
        _cmd.doMouseDown=function(e){
          var cmd=this;
          if (e==undefined) e=windows.event;
          e.stopPropagation();
          e.preventDefault();
          cmd.Owner.setPosition();
          if (cmd.onExecute) {
            setTimeout(
              function(){
                cmd.onExecute(cmd);
              },
              250
            )
          };
        };
        _cmd.evtTouchEnd=coEvents.Add(_cmd.Container,"touchend",function(e){_cmd.doTouchEnd(e);},coEvents.Capture,coEvents.Active);
        if (coVDM.VDM.Browser.Mouse==true)
          _cmd.evtMouseDown=coEvents.Add(_cmd.Container,"mousedown",function(e){_cmd.doMouseDown(e);},coEvents.Capture,coEvents.Active);
        _cmd.Show=function(){
          var cmd=this;
          cmd.Visible=true;
          cmd.Container.style.visibility="visible";
          cmd.Container.style.display="block";
          cmd.Icon.style.visibility="visible";
          cmd.Caption.style.visibility="visible";
          cmd.Owner.setPosition();
        };
        _cmd.Hide=function(){
          var cmd=this;
          cmd.Visible=false;
          cmd.Container.style.visibility="hidden";
          cmd.Container.style.display="none";
          cmd.Icon.style.visibility="hidden";
          cmd.Caption.style.visibility="hidden";
        };
        _cmd.Free=function(){
          var cmd=this;
          var ed=cmd.Owner;
          if (cmd.Container.Events) cmd.Container.Events.Free();
          if (cmd.Icon.Events) cmd.Icon.Events.Free();
          if (cmd.Caption.Events) cmd.Caption.Events.Free();
          var idx=ed.elmList.indexOf(cmd.Icon);
          if (idx!=-1) ed.elmList.splice(idx,1);
          var idx=ed.elmList.indexOf(cmd.Caption);
          if (idx!=-1) ed.elmList.splice(idx,1);
          var idx=ed.elmList.indexOf(cmd.Container);
          if (idx!=-1) ed.elmList.splice(idx,1);
          cmd.Container.removeChild(cmd.Icon);
          cmd.Container.removeChild(cmd.Caption);
          cmd.Parent.removeChild(cmd.Container);
          return cmd=Release(cmd);
        };
        return _cmd;
      };
      _ed.createInput=function(){
        var ed=this;
        var _ip=new Object();
        _ip.Visible=false;
        _ip.Class="TVINPUT";
        _ip.Parent=ed.Container;
        _ip.Owner=ed;
        _ip.Container=document.createElement('input');
        _ip.Border=new Border();
        _ip.Padding=new Padding();
        _ip.Parent.appendChild(_ip.Container);
        _ip.Container.className=_ip.Class;
        _ip.Container.Owner=_ip;
        _ip.onExecute=null;
        ed.elmList.push(_ip.Container);

        _ip.Container.onkeyup=function(e){
          if (e==undefined) e=window.event;
          var key=coDOM.getKeyCode(e);
          var elm=coDOM.srcElement(e);
          if (key==27){
            var ip=elm.Owner;
            ip.Owner.Hide();
          };
        };
        _ip.Container.onkeypress=function(e){
          if (e==undefined) e=window.event;
          var key=coDOM.getKeyCode(e);
          var elm=coDOM.srcElement(e);
          if (key==13){
            e.preventDefault();
            var ip=elm.Owner;
            if ((ip.Visible==true) && (ip.onExecute)) ip.onExecute(ip);
          };
        };
        _ip.Show=function(){
          var ip=this;
          ip.Visible=true;
          ip.Container.style.visibility="visible";
          ip.Container.style.display="block";
          ip.Padding.Load(ip.Container);
          ip.Border.Load(ip.Container);
          ip.setSize();
          ip.Container.select();
          ip.Owner.setPosition();
        };
        _ip.Hide=function(){
          var ip=this;
          ip.Visible=false;
          ip.Container.style.display="none";
        };
        _ip.setSize=function(){
          var ip=this;
          var ed=ip.Owner;
          ip.Container.style.width=ip.Parent.clientWidth-ed.Padding.xBias()-ip.Border.xBias()-ip.Padding.xBias()+"px";
        };
        return _ip;
      };
      _ed.onMouseDown=function(e){
        var ed=this;
        if (e==undefined) e=window.event;
        var src=coDOM.srcElement(e);
        if ( ed.elmList.indexOf(src)==-1) ed.Hide();
      };
      _ed.setSize=function(){
        var ed=this;
        ed.Container.style.width=ed.TreeView.Items.Container.clientWidth-ed.Border.xBias()-ed.Padding.xBias()+"px";
        ed.Input.setSize();
        ed.setPosition();
      };
      _ed.Hide=function(){
        var ed=this;
        if (ed.Visible==false) return;
        var tv=ed.TreeView;
        ed.Container.style.display="none";
        ed.btnAdd.Hide();
        ed.btnDelete.Hide();
        ed.btnRename.Hide();
        ed.btnEmptyFolder.Hide();
        ed.Input.Hide();
        ed.Visible=false;
        tv.lockSelection=false;

        if (coVDM.VDM.Browser.Mouse==true)
          ed.evtMouseDown.setActive(false);
      };
      _ed.setPosition=function(){
        var ed=this;
        if (ed.Visible!=true) return;
        var itm=ed.TreeView.Selected;
        var iTop=itm.Container.offsetTop + itm.Wrapper.offsetHeight - ed.TreeView.Items.Container.scrollTop;
        if ( (iTop + ed.Container.offsetHeight + itm.Wrapper.offsetHeight) > (ed.TreeView.Items.Container.scrollTop + ed.TreeView.Items.Container.clientHeight))
          iTop=itm.Container.offsetTop - ed.Container.offsetHeight-ed.TreeView.Items.Container.scrollTop;
        ed.Container.style.top=iTop + "px";
      };
      _ed.Show=function(){
        var ed=this;
        var itm=ed.TreeView.Selected;
        ed.Selected=itm;
        ed.Container.style.display="block";
        ed.Container.style.visibility="visible";
        if (itm.readOnly==false){
          ed.btnAdd.Show();
          ed.btnDelete.Show();
          ed.btnRename.Show();
        } else {
          if (itm.allowChildren==true)
            ed.btnAdd.Show();
          else
            ed.btnAdd.Hide();

          ed.btnDelete.Hide();
          ed.btnRename.Hide();
        };
        if (ed.showEmptyFolder==true){
          ed.btnEmptyFolder.Show();
        };
        ed.Visible=true;
        ed.setPosition();
        if (coVDM.VDM.Browser.Mouse==true)
          ed.evtMouseDown.setActive(true);
      };
      _ed.Free=function(){
        var ed=this;
        ed.btnAdd.Free();
        ed.btnDelete.Free();
        ed.btnRename.Free();
        ed.btnEmptyFolder.Free();
        ed.elmList.length=0;
        ed.Input.Free();
        if (coVDM.VDM.Browser.Mouse==true)
          ed.evtMouseDown.Free();
        ed=Release(ed);
      };

      _ed.btnAdd=_ed.createButton(coLang.Table.Buttons.New,"TVCMDAddICO","TVCMDCPTN");
      _ed.btnDelete=_ed.createButton(coLang.Table.Buttons.Delete,"TVCMDDelICO","TVCMDCPTN");
      _ed.btnRename=_ed.createButton(coLang.Table.Buttons.Rename,"TVCMDRenICO","TVCMDCPTN");
      _ed.btnEmptyFolder=_ed.createButton(coLang.Table.Buttons.Clear,"TVCMDEtsICO","TVCMDCPTN");
      _ed.Input=_ed.createInput();
      _ed.btnAdd.onExecute=function(cmd){
        var ed=cmd.Owner;
        ed.Input.Container.value=coLang.Table.Buttons.New+" "+coLang.Table.Labels.Folder;
        ed.Input.onExecute=function(input){
          var ed=input.Owner;
          var pNode=ed.Selected;
          var itm=pNode.addChild(input.Container.value);
          ed.Hide();
        };
        ed.btnDelete.Hide();
        ed.btnRename.Hide();
        ed.btnEmptyFolder.Hide();
        ed.Input.Show();
      };
      _ed.btnRename.onExecute=function(cmd){
        var ed=cmd.Owner;
        if (ed.Selected.readOnly==true) return;
        ed.Input.Container.value=ed.Selected.Caption.textContent;
        ed.Input.onExecute=function(input){
          var ed=input.Owner;
          var itm=ed.Selected;
          itm.Rename(input.Container.value);
          ed.Hide();
        };
        ed.btnDelete.Hide();
        ed.btnAdd.Hide();
        ed.btnEmptyFolder.Hide();
        ed.Input.Show();
      };
      _ed.btnDelete.onExecute=function(cmd){
        var ed=cmd.Owner;
        if (ed.Selected.readOnly==true) return;
        ed.TreeView.Selected=ed.Selected=ed.Selected.Delete();
        ed.Hide();
      };
      if (coVDM.VDM.Browser.Mouse==true)
        _ed.evtMouseDown=coEvents.Add(window,"mousedown",function(e){_ed.onMouseDown(e);},coEvents.Capture,coEvents.NoActivate);
      _ed.invokeNew=function(){
        var ed=this;
        ed.Show();
        ed.Input.Container.value=coLang.Table.Buttons.New+" "+coLang.Table.Labels.Folder;
        ed.Input.onExecute=function(input){
          var ed=input.Owner;
          var pNode=ed.Selected;
          var itm=pNode.addChild(input.Container.value);
          ed.Hide();
        };
        ed.btnDelete.Hide();
        ed.btnRename.Hide();
        ed.btnEmptyFolder.Hide();
        ed.Input.Show();
      };
      _ed.invokeRename=function(){
        var ed=this;
        if (ed.Selected.readOnly==true) return;
        ed.Show();
        ed.Input.Container.value=ed.Selected.Caption.textContent;
        ed.Input.onExecute=function(input){
          var ed=input.Owner;
          var itm=ed.Selected;
          itm.Rename(input.Container.value);
          ed.Hide();
        };
        ed.btnDelete.Hide();
        ed.btnAdd.Hide();
        ed.btnEmptyFolder.Hide();
        ed.Input.Show();
      };
      _ed.btnEmptyFolder.onExecute=function(cmd){
        var ed=cmd.Owner;
        var tv=ed.TreeView;
        ed.Hide();
        if (tv.onEmptyFolder)
          tv.onEmptyFolder(tv.Selected);
      };

      return _ed;
    };
    _tv._createTreeViewItems=function(){
      var tv=this;
      var _itms=new Array();
      _itms.Container=document.createElement('div');
      _itms.Class="TVItems";
      tv.Container.appendChild(_itms.Container);
      _itms.Container.className=_itms.Class;
      _itms.Container.Owner=_itms;
      _itms.TreeView=tv;
      _itms.Width=tv.Container.clientWidth;
      _itms.Height=tv.Container.clientHeight;
      _itms.Visible=false;
      _itms.Level=0;
      _itms.Loaded=false;
      _itms.Loading=false;
      _itms.Owner=tv;



      _itms.tmrResize=coApp.Timers.createItem(coVDM.ListViewResizePause);
      _itms.tmrResize.Owner=_itms;
      _itms.tmrResize.FirstDelay=coVDM.ListViewResizeDelay;
      _itms.tmrResize.onExecute=function(){
        var tmr=this;
        var itms=tmr.Owner;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          itm.setSize();
        };
        tmr.setActive(false);
      };
      _itms.moveToTop=function(itm){
        var itms=this;
        itms.Container.insertBefore(itm.Container,itms.Container.firstChild);
      };
      _itms.fromDB=function(dbRec){
        // add a treeNode based on the path
        var chld=null;
        var itms=this;
        var tv=itms.TreeView;
        var sPath=dbRec.MAP[dbRec.Collection.pathField.Name].Value;
        if (sPath[0]=='/') sPath=sPath.substring(1);
        var saPath=sPath.split("/");
        // go through each level forcing nodes along until end.
        if (saPath.length>0) {
          var root=itms.findByText(saPath[0]);
          if (!root) root=itms._createTreeViewItem(saPath[0],null,null);
          if (saPath.length==1) {
            root.Data=dbRec;
            chld=root;
          } else {
            var parent=root;
            for (var iLcv=1; iLcv<saPath.length; iLcv++){
              if (!parent.subItems)
                parent.subItems=parent._createSubItems(iLcv);
              var chld=parent.subItems.findByText(saPath[iLcv]);
              if (!chld)
                chld=itms._createTreeViewItem(saPath[iLcv],parent.subItems,null);
              parent=chld;
            };
            chld.Data=dbRec;
          };
        };
        chld.Data=dbRec;
        return chld;
      };
      _itms.Clear=function(){
        var itms=this;
        itms.TreeView.Selected=null;
        while (itms.length>0){
          var itm=itms[0];
          itm.Free();
        };
      };
      _itms.addChild=function(sCaption,Data){
        if (Data==undefined) Data=null;
        var itms=this;
        return itms._createTreeViewItem(sCaption,null,Data);
      };
      _itms._createTreeViewItem=function(sCaption,subItems,Data){
        if (subItems==undefined) subItems=null;
        if (Data==undefined) Data=null;

        var itms=this;
        var tv=itms.TreeView;

        _itm=new Object();
        _itm.dtMouseMove=0;
        _itm.Visible=false;
        _itm.recurseRelease=false;
        _itm.copyAsVar=true;
        _itm.readOnly=false;
        _itm.allowChildren=true;
        _itm.Class="TVItem";
        _itm.baseClass="TVItem";
        _itm.Verified=true;
        _itm.emptyFolderFromHere=false;
        _itm.Data=Data;
        _itm.Mode=new coObject.Create();
        _itm.Mode.Owner=_itm;
        _itm.Mode.Normal=0;
        _itm.Mode.Collapsed=1;
        _itm.Mode.Expanded=2;
        _itm.Mode.Hidden=3;
        _itm.Mode.getStyle=function(){
          var itm=this.Owner;
          if ( (itm.iconClass) && (!itm.subItems) ) return " " + itm.iconClass;
          switch (itm.Mode.Value) {
            case (itm.Mode.Normal) :  return " " + itm.iconClass
            case (itm.Mode.Collapsed) :  return ( (itm.subItems) &&  (itm.subItems.length>0) ) ? " " + itm.baseClass + "Col" : " " + itm.iconClass;
            case (itm.Mode.Expanded) : return ( (itm.subItems) &&  (itm.subItems.length>0) ) ? " " + itm.baseClass + "Exp" : " " + itm.iconClass;
          };
          return "";
        };
        _itm.Mode.setHidden=function(){
          var itm=this.Owner;
          itm.Mode.Value=itm.Mode.Hidden;
        };
        _itm.Mode.hasIndicator=function(){
          var itm=this.Owner;
          return (  ((itm.iconClass) && (itm.iconClass.length>0))  || ( (itm.subItems) && (itm.subItems.length>0)) );
        };
        var mode=_itm.Mode.Value= (!subItems) ? _itm.Mode.Normal :  (tv.AutoExpand==true) ? _itm.Mode.Expanded : _itm.Mode.Collapsed;
        _itm.iconClass=null;

        _itm.Owner=(subItems)? subItems : itms;
        _itm.Parent=(subItems) ? subItems.Container : itms.Container;
        _itm.Container=document.createElement('div');
        _itm.Parent.appendChild(_itm.Container);
        _itm.Container.className=_itm.Class;

        _itm.Wrapper=document.createElement('div');
        _itm.Container.appendChild(_itm.Wrapper);
        _itm.Wrapper.className=_itm.baseClass;
        _itm.Wrapper.Owner=_itm;

        _itm.Indicator=document.createElement('div');
        _itm.Wrapper.appendChild(_itm.Indicator);
        _itm.Indicator.className=_itm.baseClass+"Indc8r" + _itm.Mode.getStyle();
        _itm.Indicator.Owner=_itm;
        _itm.Caption=document.createElement('div');
        _itm.Wrapper.appendChild(_itm.Caption);
        _itm.Caption.className=_itm.baseClass+"Captn";
        _itm.Caption.textContent=sCaption;
        _itm.Caption.Owner=_itm;
        _itm.Container.Owner=_itm;


        _itm.Selected=false;
        _itm.subItems=null;
        if (tv.AllowNotify) {
          _itm._createNotify=function(){
            var itm=this;
            n=coObject.Create();
            n.Class=itm.baseClass+"Notify";
            n.Owner=itm;
            n.Parent=itm.Wrapper;
            n.Visible=false;

            n.Container=document.createElement('div');
            n.Container.Owner=itm;
            n.Parent.appendChild(n.Container);
            n.Container.className=n.Class;

            n.Clear=function(){
              var n=this;
              n.Container.style.display="none";
              coDOM.setText(n.Container,"");
              n.Visible=false;
            };
            n.Set=function(s){
              var n=this;
              n.Visible=true;
              n.Container.style.display="inline-block";
              coDOM.setText(n.Container,s);
            };
            n.Free=function(){
              var n=this;
              n.Parent.removeChild(n.Container);
              n=coObject.Release(n);
              return null;
            };
            return n;
          };
          _itm.Notify=_itm._createNotify();
        };
        _itm.setIndicatorIcon=function(sURL){
          var itm=this;
          var sImg=coDOM.backgroundImage(itm.Indicator);
          if (sImg.indexOf(sURL)==-1)
            itm.Indicator.style.backgroundImage="url("+sURL+")";
        };
        _itm.setIcon=function(sIconClass){
          var itm=this;
          itm.iconClass=sIconClass;
          itm.Indicator.className=sIconClass;
          itm.Indicator.className=itm.baseClass+"Indc8r" + itm.Mode.getStyle();
          itm.Indicator.style.visibility=(sIconClass) ? "visible" : "hidden";
        };
        _itm.itmDBLClick=function(e){
          if (e==undefined) e=window.event;
          coDOM.preventDefault(e);
          var itm=coDOM.srcElement(e).Owner;
          if (e.srcElement==itm.Indicator){
            switch (itm.Mode.Value) {
              case (itm.Mode.Collapsed) : itm.Expand(); break;
              case (itm.Mode.Expanded) : itm.Collapse(); break;
            };
          } else if (
            (itm.emptyFolderFromHere==true) ||
            (itm.allowChildren==true) ||
            (
              (itm.readOnly!=true) &&
              ( itm.Owner.TreeView.AllowInplaceEditor==true)
            )
          ) {
            var edt=itm.Owner.TreeView.Editor;
            edt.showEmptyFolder=(itm.emptyFolderFromHere==true);
            edt.Show();
          };
        };
        _itm.itmMouseDown=function(e){
          if (e==undefined) e=window.event;
          coDOM.preventDefault(e);
          var src=coDOM.srcElement(e);
          var itm=src.Owner;
          itm.Select();
        };
        _itm.itmTouchStart=function(e){
          if (e==undefined) e=window.event;
          var itm=coDOM.srcElement(e).Owner;
          var tv=itm.Owner.TreeView;
          tv.touchLocked=false;
          coEvents.ScrollLock.Lock(coVDM.ListItemScrollDelay);
          if (tv.debugToConsole==true)
            coVDM.VDM.Console.Append("TreeView.Item.itmTouchStart");
        };
        _itm.itmTouchMove=function(e){
          if (e==undefined) e=window.event;
          var itm=coDOM.srcElement(e).Owner;
          var tv=itm.Owner.TreeView;

          tv.touchLocked=true;
          coEvents.ScrollLock.Unlock();
          if (tv.debugToConsole==true)
            coVDM.VDM.Console.Append("TreeView.Item.itmTouchMove");
        };
        _itm.itmTouchEnd=function(e){
          if (e==undefined) e=window.event;
          var itm=coDOM.srcElement(e).Owner;
          var tv=itm.Owner.TreeView;
          if (tv.debugToConsole==true)
            coVDM.VDM.Console.Append("TreeView.Item.itmTouchEnd");
          coDOM.preventDefault(e);
          if (tv.touchLocked==false) {
            tv.Editor.Hide();
            itm.setSelected(true);
          };
          tv.touchLocked=false;
        };
        _itm.setSelected=function(value){
          var itm=this;
          var tv=itm.Owner.TreeView;

          if (tv.lockSelection==true) {
            if (tv.debugToConsole==true)
              coVDM.VDM.Console.Append("TreeView.Item.setSelected (lockSelected exit)");
            return;
          };
          var bMod=(value!=itm.Selected);
          itm.Selected=(value==true);

          var sel=tv.Selected;
          if ( (sel) && (sel!=itm) && (tv.MultiSelect!=true) )
            sel.setSelected(false);

          if (value==true) {
            itm.Wrapper.className=itm.baseClass+"Sel";
            itm.Caption.className=itm.baseClass+"CaptnSel";
            tv.Selected=itm;
            tv.Editor.Hide();
            if ( bMod==true) tv.tmrSelect.setActive(true);
          } else {
            itm.Wrapper.className=itm.Class;
            itm.Caption.className=itm.baseClass+"Captn";
          };

        };
        _itm.indicatorMouseDown=function(e){
          if (e==undefined) e=window.event;
          coDOM.preventDefault(e);
          var itm=coDOM.srcElement(e).Owner;
          var tv=itm.Owner.TreeView;
          tv.Editor.Hide();
          itm.setSelected(true);
          switch (itm.Mode.Value) {
            case (itm.Mode.Collapsed) : itm.Expand(); break;
            case (itm.Mode.Expanded) : itm.Collapse(); break;
          };
          if (tv.debugToConsole==true)
            coVDM.VDM.Console.Append("TreeView.Item.indicatorMouseDown");
        };
        _itm.indicatorMouseMove=function(e){
          if (e==undefined) e=window.event;
          coDOM.preventDefault(e);
          var itm=coDOM.srcElement(e).Owner;

          var tv=itm.Owner.TreeView;
          if (tv.debugToConsole==true)
             coVDM.VDM.Console.Append("TreeView.Item.indicatorMouseMove");
          if (coDragDrop.Active==true) {
            var dtNow=+new Date();
            var iDiff=dtNow-itm.dtMouseMove;
            if (iDiff>=coTheme.UI.TreeView.AutoSwitchDelay) {
              itm.dtMouseMove=dtNow;
              tv.Editor.Hide();
              switch (itm.Mode.Value) {
                case (itm.Mode.Collapsed) : {
                  itm.Expand();
                  if (tv.onItemExpanded)
                    tv.onItemExpanded(itm);
                  break;
                };
                case (itm.Mode.Expanded)  : {
                  itm.Collapse();
                  if (tv.onItemCollapsed)
                    tv.onItemCollapsed(itm);
                  break;
                };
              };
            };
          };
        };
        _itm.indicatorTouchEnd=function(e){
          if (e==undefined) e=window.event;
          var itm=coDOM.srcElement(e).Owner;
          var tv=itm.Owner.TreeView;
          coDOM.preventDefault(e);
          tv.Editor.Hide();
          itm.setSelected(true);
          switch (itm.Mode.Value) {
            case (itm.Mode.Collapsed) : itm.Expand(); break;
            case (itm.Mode.Expanded) : itm.Collapse(); break;
          };
          if (tv.debugToConsole==true)
            coVDM.VDM.Console.Append("TreeView.Item.indicatorTouchEnd");
        };
        _itm.evtIndicatorTouchEnd=coEvents.Add(_itm.Indicator,"touchend",_itm.indicatorTouchEnd,coEvents.NoCapture,coEvents.Active);
        if (coVDM.VDM.Browser.Mouse==true) {
          _itm.evtIndicatorMouseDown=coEvents.Add(_itm.Indicator,"mousedown",_itm.indicatorMouseDown,coEvents.Capture,coEvents.Active);
          _itm.evtIndicatorMouseMove=coEvents.Add(_itm.Indicator,"mousemove",_itm.indicatorMouseMove,coEvents.NoCapture,coEvents.Active);
          _itm.evtMouseDown=coEvents.Add(_itm.Container,"mousedown",_itm.itmMouseDown,coEvents.NoCapture,coEvents.Active);
        };
        _itm.evtTouchStart=coEvents.Add(_itm.Container,"touchstart",_itm.itmTouchStart,coEvents.NoCapture,coEvents.Active);
        _itm.evtTouchMove=coEvents.Add(_itm.Container,"touchmove",_itm.itmTouchMove,coEvents.NoCapture,coEvents.Active);
        _itm.evtTouchEnd=coEvents.Add(_itm.Container,"touchend",_itm.itmTouchEnd,coEvents.NoCapture,coEvents.Active);
        _itm.evtDoubleClick=coEvents.Add(_itm.Container,"dblclick",_itm.itmDBLClick,coEvents.Capture,coEvents.Active);
        _itm.Show=function(recurse){
          if (recurse==undefined) recurse=false;
          var itm=this;
          var itms=itm.Owner;
          itm.Visible=true;
          itm.Container.style.display="block";
          itm.Container.style.visibility="visible";
          itm.Wrapper.style.visibility="visible";
          itm.Indicator.style.visibility="visible";
          itm.Caption.style.visibility="visible";
          var iML=(itms.Level*itm.Indicator.offsetWidth);
          if  (itm.Mode.hasIndicator()==false) iML-=itm.Indicator.offsetWidth;
          itm.Indicator.style.marginLeft=iML + "px";
          itm.Indicator.className=itm.baseClass+"Indc8r" + itm.Mode.getStyle();
          itm.Indicator.style.visibility=(itm.Mode.hasIndicator()==true)? "visible" : "hidden";
          switch (itm.Mode.Value) {
            case (itm.Mode.Expanded) :
               itm.Expand();
               if ((recurse==true) && (itm.subItems)) itm.subItems.Show();
               break;
            case (itm.Mode.Collapsed) :
              itm.Collapse();
              if (itm.subItems) itm.subItems.Hide();
              break;
            case (itm.Mode.Normal) :
              itm.Visible=true;
              itm.Collapse();
              if (itm.subItems) itm.subItems.Hide();
              break;
            case (itm.Mode.Hidden) :
              itm.Collapse();
              itm.Visible=false;
              itm.Mode.Value=itm.Mode.Hidden;
              itm.Container.style.display="none";
              if (itm.subItems) itm.subItems.Hide();
              break;
          }
        };
        _itm.Hide=function(){
          var itm=this;
          itm.Visible=false;
          itm.Container.style.visibility="hidden";
          itm.Wrapper.style.visibility="hidden";
          itm.Indicator.style.visibility="hidden";
          itm.Caption.style.visibility="hidden";
          if (itm.subItems) itm.subItems.Hide();
        };
        _itm.Collapse=function(){
          var itm=this;
          var itms=itm.Owner;
          itm.Mode.Value=itm.Mode.Collapsed;
          itm.Indicator.className=itm.baseClass+"Indc8r"+itm.Mode.getStyle();
          itm.Indicator.style.visibility=(itm.Mode.hasIndicator()==true)? "visible" : "hidden";
          if (itm.subItems) itm.subItems.Collapse();
          var iML=(itms.Level*itm.Indicator.offsetWidth);
          if  (itm.Mode.hasIndicator()==false) iML-=itm.Indicator.offsetWidth;
          itm.Indicator.style.marginLeft=iML + "px";
          if (itm.subItems) itm.subItems.Hide();
        };
        _itm.Expand=function(){
          var itm=this;
          var itms=itm.Owner;

          var pItem=itms.Owner;
          while ( (pItem!=null)  && (pItem.Class==itm.Class) ) {
            if (pItem.Mode.Value!=pItem.Mode.Expanded) pItem.Expand();
            pItem=(pItem.Owner) ? pItem.Owner.Owner : null;
          };
          pItem=null;

          itm.Mode.Value=itm.Mode.Expanded;
          itm.Indicator.className=itm.baseClass+"Indc8r"+itm.Mode.getStyle();
          itm.Indicator.style.visibility=(itm.Mode.hasIndicator()==true)? "visible" : "hidden";
          if (itm.subItems) itm.subItems.Expand();
          var iML=(itms.Level*itm.Indicator.offsetWidth);
          if  (itm.Mode.hasIndicator()==false) iML-=itm.Indicator.offsetWidth;
          itm.Indicator.style.marginLeft=iML + "px";
          if (itm.subItems) itm.subItems.Show();
        };
        _itm.Force=function(Path,Delim){
          var itm=this;
          if (itm.subItems==null)
            itm.subItems=itm._createSubItems(itm.Owner.Level+1);
          return itm.subItems.Force(Path,Delim);
        };
        _itm.getCaption=function(){
          var itm=this;
          return coDOM.getText(itm.Caption);
        };
        _itm.setCaption=function(sCaption){
          var itm=this;
          coDOM.setText(itm.Caption,sCaption);
        };
        _itm.getData=function(List){
          var itm=this;
          List.push(itm.Data);
          if (itm.subItems){
            for (var iLcv=0; iLcv<itm.subItems.length; iLcv++)
              itm.subItems[iLcv].getData(List);
          };
        };
        _itm.Select=function(){
          var itm=this;
          if (itm.Selected!=true){
            itm.Expand();
            itm.setSelected(true);
          };
        };
        _itm._createSubItems=function(iLevel){
          var tv=_tv;
          var itm=this;
          var _itms=new Array();
          _itms.Loading=false;
          _itms.Level=iLevel;
          _itms.Class="TVSubItems";
          _itms.recurseRelease=false;
          _itms.copyAsVar=true;
          _itms.Parent=itm.Container;
          _itms.Owner=itm;
          _itms.TreeView=tv;
          _itms.Container=document.createElement('div');
          _itms.Parent.appendChild(_itms.Container);
          _itms.Container.className=_itms.Class;
          _itms.Visible=false;
          _itms.findByText=function(sText){
            var itms=_itms;
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              var itm=itms[iLcv];
              if (itm.Caption.textContent==sText)
                return itm;
            };
            return null;
          };
          _itms.findByData=function(data){
            var itms=this;
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              var itm=itms[iLcv];
              if (itm.Data==data) return itm;
              if (itm.subItems) {
                var res=itm.subItems.findByData(data);
                if (res) return res;
              };
            };
            return null;
          };
          _itms.getByNetworkId=function(ID){
            var itms=this;
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              var itm=itms[iLcv];
              if ((itm.Network) && (itm.Network.MAP.ID.Value==ID)) return itm;
              if (itm.subItems){
                var res=itm.subItems.getByNetworkId(ID);
                if (res) return res;
              };
            };
            return null;
          };
          _itms.getByNetwork=function(sCaption,Network){
            var itms=this;
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              var itm=itms[iLcv];
              if ( (itm.Network) && (itm.Network==Network) && (itm.getCaption()==sCaption)) return itm;
            };
            return null;
          };
          _itms.getByData=function(data){
            var itms=this;
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              var itm=itms[iLcv];
              if (itm.Data==data) return itm;
            };
            return null;
          };
          _itms.Show=function(recurse){
            if (recurse==undefined) recurse=false;
            var itms=this;
            itms.Visible=true;
            itms.Container.style.visibility="visible";
            itms.Container.style.display="block";
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              var itm=itms[iLcv];
              itm.Show(recurse);
            };
          };
          _itms.Hide=function(){
            var itms=this;
            itms.Visible=false;
            itms.Container.style.visibility="hidden";
            itms.Container.style.display="none";
          };
          _itms.moveToTop=function(itm){
            var itms=this;
            itms.Container.insertBefore(itm.Container,itms.Container.firstChild);
          };
          _itms.Expand=function(){
            var itms=this;
            itms.Container.style.display="block";
            if (itms.length==0) {
              itms.Visible=false;
              itms.Container.style.visibility="hidden";
            } else {
              itms.Visible=true;
              itms.Container.style.visibility="visible";
            };
          };
          _itms.Collapse=function(){
            var itms=this;
            itms.Visible=false;
            itms.Container.style.visibility="hidden";
            itms.Container.style.display="none";
          };
          /*
          _itms.setSize=function(){
            var itms=this;
            itms.Container.style.width=itms.Owner.Owner.Width+"px";
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              var itm=itms[iLcv];
              itm.setSize();
            };
          };
          */
          _itms.Force=function(Path,Delim){
            var itms=this;
            var saPath=Path.split(Delim);
            var tnLcv=null;
            for (var iLcv=0; iLcv<saPath.length; iLcv++){
              tnLcv=itms.findByText(saPath[iLcv]);
              if (!tnLcv){
                tnLcv=itms.Owner.addChild(saPath[iLcv],null);
                if (iLcv<saPath.length)
                  tnLcv.subItems=tnLcv._createSubItems(tnLcv.Owner.Level+1);
                var itms=tnLcv.subItems;
              } else {
                var itms=tnLcv.subItems;
                if ((iLcv<saPath.length) && (itms==undefined))
                  tnLcv.subItems=tnLcv._createSubItems(tnLcv.Owner.Level+1);
              };
            };
            return tnLcv;
          };
          _itms.pathChanged=function(){
            var itms=this;
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              var itm=itms[iLcv];
              itm.Rename();
            };
          };
          _itms.Free=function(){
            var itms=this;
            itms.Loading=true;
            if (itms.Container.EventList) itms.Container.EvenList=itms.Container.EventList.Free();
            while (itms.length>0){
              var itm=itms[0];
              if ((itm) && (itm.Free)) itm.Free();
            };
            itms.Parent.removeChild(itms.Container);
            return itms=Release(itms);
          };
          return _itms;
        };
        _itm.getChildByData=function(Data){
          var itm=this;
          if (itm.Data==Data) return itm;
          return ( (!itm.subItems) || (itm.subItems==undefined)) ? null : itm.subItems.getByData(Data);
        };
        _itm.getChildByNetworkId=function(ID){
          var itm=this;
          return ( (!itm.subItems) || (itm.subItems==undefined)) ? null : itm.subItems.getByNetworkId(ID);
        };
        _itm.getChildByNetwork=function(sCaption,Network){
          var itm=this;
          return ( (!itm.subItems) || (itm.subItems==undefined)) ? null : itm.subItems.getByNetwork(sCaption,Network);
        };
        _itm.getChild=function(sCaption){
          var itm=this;
          return ( (!itm.subItems) || (itm.subItems==undefined)) ? null : itm.subItems.findByText(sCaption);
        };
        _itm.addChild=function(sCaption,Data){
          if (sCaption==undefined) sCaption="";
          if (Data==undefined) Data=null;
          var itm=this;
          if (!itm.subItems) itm.subItems=itm._createSubItems(itm.Owner.Level+1);
          var newItem=itm.Owner.TreeView.Items._createTreeViewItem(sCaption,itm.subItems,Data);
          if (itm.Mode.Value==itm.Mode.Expanded) {
            itm.Show();
          } else {
            itm.Collapse();
          }
          return newItem;
        };
        _itm.getPath=function(){
          var itm=this;
          var pItem=itm.Owner.Owner;
          var sPath= ((pItem) && (pItem.baseClass==itm.baseClass)) ? pItem.getPath()+"/"+itm.Caption.textContent:itm.Caption.textContent;
          return sPath;
        };
        /*
        _itm.setSize=function(){
          var itm=this;
          var itms=itm.Owner;
          itm.Container.style.width=itms.Width+"px";
          if (itm.subItems) itm.subItems.setSize();
        };
        */
        _itm.Rename=function(sCaption){
          var itm=this;
          if (sCaption) itm.Caption.textContent=sCaption;
          if (itm.Owner.TreeView.onItemRenamed)
            itm.Owner.TreeView.onItemRenamed(itm);
          if (itm.subItems) itm.subItems.pathChanged();
        };
        _itm.Delete=function(){
          var itm=this;
          var itms=itm.Owner;
          if (itm.subItems) {
            itm.subItems.Loading=true;
            for (var iLcv=0; iLcv<itm.subItems.length; iLcv++) {
              var si=itm.subItems[iLcv];
              if ( (si) && (si.Delete)) itm.subItems[iLcv]=si.Delete();
            };
            itm.subItems.Loading=false;
            itm.subItems.length=0;
          };
          if (itms.TreeView.onItemDeleted)
            itms.TreeView.onItemDeleted(itm);
          itm=itm.Free();
          return null;
        };
        _itm.Free=function(){
          var itm=this;
          var itms=itm.Owner;
          var tv=itms.TreeView;
          if (tv.Selected==itm) tv.Selected=null;
          if ( (itm.Data) && (itm.Data.Display)) {
            if (itm.Data.Display==itm) {
              itm.Data.Display=null;
            } else if (itm.Data.Display.getItem) {
              var idx=itm.Data.Display.indexOf(itm);
              if (idx!=-1) itm.Data.Display.splice(idx,1);
            };
          };
          if (itm.subItems) itm.subItems=itm.subItems.Free();
          if (itm.Indicator.EventList) itm.Indicator.EventList=itm.Indicator.EventList.Free();
          if (itm.Caption.EventList) itm.Caption.EventList=itm.Caption.EventList.Free();
          if (itm.Wrapper.EventList) itm.Wrapper.EventList=itm.Wrapper.EventList.Free();
          if (itm.Container.EventList) itm.Container.EventList=itm.Container.EventList.Free();
          if (itm.Notify) itm.Notify.Free();
          itm.Wrapper.removeChild(itm.Indicator);
          itm.Wrapper.removeChild(itm.Caption);
          itm.Container.removeChild(itm.Wrapper);
          itm.Parent.removeChild(itm.Container);
          var idx=itms.indexOf(itm);
          if (idx!=-1) itms.splice(idx,1);
          itm=Release(itm);
          return null;
        };
        (subItems) ? subItems.push(_itm) : itms.push(_itm);
        if (tv.AutoExpand==true) _itm.Expand();
        if ( (tv.Items.Loading==false) && (tv.onItemAdded) ) tv.onItemAdded(_itm);
        return _itm;
      };
      _itms.findByData=function(data){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          if (itm.Data==data) return itm;
          if (itm.subItems) {
            var res=itm.subItems.findByData(data);
            if (res) return res;
          };
        };
        return null;
      };

      _itms.findByText=function(sText){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          if (itm.Caption.textContent==sText)
            return itm;
        };
        return null;
      };
      _itms.Hide=function(){
        var itms=this;
        itms.Visible=false;
        itms.Container.style.display="none";
      };
      _itms.Show=function(recurse){
        var itms=this;
        if (recurse==undefined) recurse=false;

        itms.Visible=true;
        itms.Container.style.display="block";
        itms.Container.style.visibility="visible";

        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          itm.Show(recurse);
        };

      };
      return _itms;
    };
    _tv.Items=_tv._createTreeViewItems();
    _tv.Editor=_tv._createInplaceEditor();
    _tv.Torus=coAppUI.App.Components.Torus.Create(Screen.Frame,_tv,_tv.Container);

    _tv.Load=function(){
      var tv=this;
      tv.Torus.Start();
      if (tv.Items.Loaded==false) {
        tv.Items.Loading=true;
        if ((tv.DataSet) && (tv.DataSet.pathField)){
          for (var iLcv=0; iLcv<tv.DataSet.Items.length; iLcv++){
            var itm=tv.DataSet.Items[iLcv];
            tv.SyncItem(itm);
          };
        };
        if (tv.onLoaded) tv.onLoaded(tv);
        tv.Items.Loading=false;
        tv.Items.Loaded=true;
        if (tv.Visible==true)
          tv.Items.Show(false);
      };
      tv.Torus.Stop();
    };
    _tv.SyncItem=function(dbItem){
      var tv=this;
      var dm=tv.DataSet.Items.DisplayMode;
      var sPath=dbItem.MAP[dbItem.Collection.pathField.Name].Value;
      if (sPath[0]=='/') sPath=sPath.substring(1);
      var saPath=sPath.split("/");
      var node=(dm.Index==dm.Single) ? dbItem.Display : dbItem.Display.getItem(tv);

      if (!node) {
        node=tv.Items.fromDB(dbItem);
        if (dm.Index==dm.Single) {
          dbItem.Display=Node;
        } else {
          dbItem.setDisplay(node);
          node.Slide=tv;
        };
        if (tv.onItemAdded) tv.onItemAdded(node);
      } else if (saPath.length>0) {
        node.setCaption(saPath[saPath.length-1]);
      };
      node.Verified=true;
      return node;
    };
    _tv.SyncStart=function(){
      var tv=this;
      // invalidate all GUI items
    };
    _tv.SyncDone=function(){
      var tv=this;
      tv.lockSelection=false;
      // remove unverified
    };
    _tv.Synchronize=function(){
      var tv=this;
      if ( (tv.DataSet) && (tv.DataSet.pathField)){
        var itms=tv.DataSet.Items;
        tv.Items.Loading=true;
        if (itms.DisplayMode.Index==itms.DisplayMode.Multiple) {
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var dbItem=itms[iLcv];
            if (dbItem.Verified==true){
              var node=dbItem.Display.getItem(tv);
              if (!node) {
                node=tv.Items.fromDB(dbItem);
                dbItem.Display.addItem(node,tv);
                if (tv.onItemAdded) tv.onItemAdded(node);
              };
            } else {
              var node=tv.Items.findByData(dbItem);
              if (node) node.Free();
            };
          };
        } else {
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var dbItem=itms[iLcv];
            if (dbItem.Verified==true){
              var node=tv.Items.fromDB(dbItem);
              dbItem.Display=Node;
            } else {
              var node=tv.Items.findByData(dbItem);
              if (node) node.Free();
            };
          };
        };
        if (tv.onLoaded) tv.onLoaded(tv);
        tv.Items.Loading=false;
        if (tv.Visible==true) tv.Items.Show();
      };
    };
    _tv.tmrSelect=coApp.Timers.createItem(coVDM.ListViewResizePause);
    _tv.tmrSelect.Owner=_tv;
    _tv.tmrSelect.FirstDelay=coVDM.ListViewSelectDelay;
    _tv.tmrSelect.onExecute=function(){
      var tmr=this;
      var tv=tmr.Owner;
      if  (tv.Selected){
        if (tv.doItemSelected) {
          try{
            tv.doItemSelected(tv.Selected);
          } catch(err){
            tv.lockSelection=false;
            coVDM.VDM.Console.Append("Exception: TreeView.doItemSelected "+err);
          };
        };
        if (tv.onItemSelected) {
          try{
            tv.onItemSelected(tv.Selected);
          } catch(err){
            tv.lockSelection=false;
            coVDM.VDM.Console.Append("Exception: TreeView.onItemSelected "+err);
          };
        };
      };
      tmr.setActive(false);
    };

    _tv.onResize=function(){
      var tv=this;
      //tv.Items.setSize();
      tv.Editor.setSize();
    };
    _tv.doShow=function(){
      var tv=this;
      tv.Showing=true;
      tv.lockSelection=false;
      tv.Items.Show(false);
      tv.Showing=false;
    };
    _tv.doHide=function(){
      var tv=this;
      tv.Editor.Hide();
      tv.Items.Hide();
    };
    coAppUI.TreeViews.push(_tv);
    return _tv;
  }
};

