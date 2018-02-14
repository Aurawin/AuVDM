coAppUI.App.Components.ListView = {
  Version        : new Version(2014,10,27,201),
  Title          : new Title("Aurawin List View","ListView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/ListView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  colResizeBasis : 10,
  setDataSetDelay: 150,
  resizeScrollBuffer : 10,
  Create         : function(sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Client;
    var _lv=Slides.createSlide(sName,sClass,Screen,Owner,Parent,Align);
    coAppUI.ListViews.push(_lv);
    _lv.Unit=this;
    _lv.Class="ListView";
    _lv.Clearing=false;
    _lv.AllowEdit=false;
    _lv.recurseRelease=false;
    _lv.cloneAsVar=true;
    _lv.Visible=false;
    _lv.DataSet=null;
    _lv.WrapSelection=false;
    _lv.ListItemHeight=coVDM.ListItemHeight;
    _lv.ListItemLineHeight=coVDM.ListItemLineHeight;
    _lv.dragInfo=null;
    _lv.onDoubleClick=null;
    _lv.onFileDrop=null;
    _lv.onFileDragOver=null;
    _lv.onFileDragEnter=null;
    _lv.onFileDragLeave=null;
    _lv.onItemSelected=null;
    _lv.onItemBeginEdit=null;
    _lv.onItemEndEdit=null;
    _lv.onItemCancelEdit=null;
    _lv.onInvokeDelete=null;
    _lv.onInvokeCanceled=null;

    _lv.toDataSet=0;

    _lv.tmrLoad=coApp.Timers.createItem(coVDM.ListViewLoadPause);
    _lv.tmrLoad.Owner=_lv;
    _lv.tmrLoad.Start=0;
    _lv.tmrLoad.AutoReset=true;
    _lv.tmrLoad.Items=new Array();
    _lv.tmrLoad.showItems=false;
    _lv.tmrLoad.setHeaders=false;
    _lv.tmrLoad.Chunk=coVDM.ListViewLoadMax;
    _lv.tmrLoad.FirstDelay=coVDM.ListViewLoadDelay;
    _lv.tmrLoad.onExecute=function(){
        var tmr=this;
        var lv=tmr.Owner;
        var itms=lv.Items;
        tmr.Items.length=0;
        if (lv.DataSet!=null){
          lv.Torus.Start();
          var iStop= ((lv.DataSet.Items.length-tmr.Start)>tmr.Chunk) ? tmr.Start+tmr.Chunk : lv.DataSet.Items.length;

          if (tmr.showItems==true){
            for (var iLcv=tmr.Start; iLcv<iStop; iLcv++){
              var itm=lv.DataSet.Items[iLcv];
              var li=lv.Items.fromDB(itm);
              li.Show();
              tmr.Items.push(li);
            };
          } else {
            for (var iLcv=tmr.Start; iLcv<iStop; iLcv++){
              var itm=lv.DataSet.Items[iLcv];
              var li=lv.Items.fromDB(itm);
              tmr.Items.push(li);
            };
          };
          tmr.Start=iLcv;
          if (tmr.setHeaders==true) {
            lv.Header.setSizeBySum();
            tmr.setHeaders=false;
          };
          for (var iLcv=0; iLcv<tmr.Items.length; iLcv++)
            tmr.Items[iLcv].setSize();
        };
        if (tmr.Start>=lv.DataSet.Items.length){
          tmr.showItems=false;
          tmr.Start=0;
          tmr.setActive(false);
        };
    };
    _lv.tmrResize=coApp.Timers.createItem(coVDM.ListViewResizePause);
    _lv.tmrResize.Owner=_lv;
    _lv.tmrResize.Start=0;
    _lv.tmrResize.Stop=0;
    _lv.tmrResize.Chunk=coVDM.ListViewResizeMax;
    _lv.tmrResize.AutoReset=true;
    _lv.tmrResize.showItems=false;
    _lv.tmrResize.FirstDelay=coVDM.ListViewResizeDelay;
    _lv.tmrResize.sWidth=null;
    _lv.tmrResize.onExecute=function(){
      var tmr=this;
      var lv=tmr.Owner;
      var itms=lv.Items;
      lv.Torus.Start();

      if (tmr.Stop>=itms.length) tmr.Stop=itms.length-1;
      var iStop= ((tmr.Stop-tmr.Start)>tmr.Chunk) ? tmr.Start+tmr.Chunk : tmr.Stop;
      if (iStop>=itms.length) iStop=itms.length-1;
      if (tmr.showItems==true){
        for (var iLcv=tmr.Start; iLcv<=iStop; iLcv++){
          lv.Items[iLcv].Show();
          lv.Items[iLcv].setSize();
        };
      } else{
        for (var iLcv=tmr.Start; iLcv<=iStop; iLcv++){
          lv.Items[iLcv].setSize();
        };
      };
      tmr.Start=Math.max(iLcv-1,0);
      if (tmr.Start>=tmr.Stop){
        tmr.Start=0;
        tmr.Stop=0;
        tmr.setActive(false);
        if ((lv.DataSet) && (lv.DataSet.Loading!=true)) {
          tmr.showItems=false;
        };
        lv.Torus.Stop();
      };
    };
    _lv._createCommands=function(){
        var lv=this;
        var _cmds=new Array();
        _cmds.Visible=false;
        _cmds.Owner=lv;
        _cmds.btnCaptionChecked="";
        _cmds.btnCaptionUnchecked="";
        _cmds.onCommand=null;
        _cmds.onHide=null;
        _cmds.onShow=null;
        _cmds.onCancel=null;
        _cmds.onConfirm=null;
        _cmds.onCommit=null;
        _cmds.Mode=new Object();
        _cmds.Mode.Index=-1;
        _cmds.Mode.Default=-1;
        _cmds.Mode.Delete=0;
        _cmds.Mode.Move=1;
        _cmds.Mode.Join=2;
        _cmds.Mode.Select=3;
        _cmds.Mode.Subscribe=4;
        _cmds.Mode.Download=5;
        _cmds.doCommand=null;
        _cmds.setMode=function(Value){
          var lv=this.Owner;
          if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("ListView.Commands (setMode)");

          var cmds=this;
          var lv=cmds.Owner;
          cmds.Mode.Index=Value;
          switch (Value) {
            case cmds.Mode.Default :
              cmds.btnCaptionChecked="";
              cmds.btnCaptionUnchecked="";
              cmds.Hide();
              break;
            case cmds.Mode.Delete :
              cmds.btnCaptionChecked=coLang.Table.Buttons.Undelete;
              cmds.btnCaptionUnchecked=coLang.Table.Buttons.Delete;
              break;
            case cmds.Mode.Move :
              cmds.btnCaptionChecked=coLang.Table.Buttons.Deselect;
              cmds.btnCaptionUnchecked=coLang.Table.Buttons.Move;
              break;
            case cmds.Mode.Join :
              cmds.btnCaptionChecked=coLang.Table.Buttons.Undo;
              cmds.btnCaptionUnchecked=coLang.Table.Buttons.Join;
              break;
            case cmds.Mode.Select :
              cmds.btnCaptionChecked=coLang.Table.Buttons.Deselect;
              cmds.btnCaptionUnchecked=coLang.Table.Buttons.Select;
              break;
            case cmds.Mode.Subscribe :
              cmds.btnCaptionChecked=coLang.Table.Buttons.Undo;
              cmds.btnCaptionUnchecked=coLang.Table.Buttons.Subscribe;
              break;
            case cmds.Mode.Download :
              cmds.btnCaptionChecked=coLang.Table.Buttons.Cancel;
              cmds.btnCaptionUnchecked=coLang.Table.Buttons.Download;
              break;
          };
          if (Value!=cmds.Mode.Default) cmds.Show();
        };
        _cmds.Show=function(){
          var lv=this.Owner;
          if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("ListView.Commands (Show)");
          var cmds=this;
          if (cmds.Mode.Index!=cmds.Mode.Default){
            var lv=cmds.Owner;
            var itms=lv.Items;
            cmds.Visible=true;
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              var itm=itms[iLcv];
              if (itm.Command==null) {
                var cmd=cmds._newCommand(itm);
              } else {
               cmd=itm.Command;
              };
              cmd.setChecked(false);
              cmd.onClick=cmds.doCommand;
              cmd.Show();
            };
            lv.setSize();
            if (cmds.onShow) cmds.onShow(cmds);
          } else {
           cmds.Hide();
           if (cmds.onHide) cmds.onHide(cmds);
          };
        };
        _cmds.Hide=function(){
          var cmds=this;
          var lv=cmds.Owner;

          if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("ListView.Commands (Hide)");

          var itms=lv.Items;
          cmds.Visible=false;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            if (itm.Command!=null)
              itm.Command.Hide();
          };
          lv.setSize();
        };
        _cmds.SelectAll=function(){
          var cmds=this;
          var lv=cmds.Owner;
          if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("ListView.Commands.SelectAll");
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            cmd.setChecked(true);
            cmd=null;
          };
        };
        _cmds.SelectNone=function(){
          var cmds=this;
          var lv=cmds.Owner;
          if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("ListView.Commands.SelectNone");
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            cmd.setChecked(false);
            cmd=null;
          };
        };
        _cmds.Confirm=function(){
          var cmds=this;
          var lv=cmds.Owner;
          if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("ListView.Commands (Confirm)");
          var itms=lv.Items;
          var Values = new Array();
          var resetValues = (cmds.onCommit) ? true : false;
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            if (cmd.Checked==true){
              if (cmds.onConfirm) cmds.onConfirm(cmd);
              Values.push(cmd.Item);
            };
          };
          if (cmds.onCommit) cmds.onCommit(Values);
          cmds.setMode(cmds.Mode.Default);
          if (resetValues==true) {
            Values.length=0;
            Values=null;
          };
        };
        _cmds.Cancel=function(){
          var cmds=this;
          var lv=cmds.Owner;
          var itms=lv.Items;
          cmds.setMode(cmds.Mode.Default);
          if (cmds.onCancel) cmds.onCancel(cmds);
        };
        /*
        _cmds.Resize=function(){

          var cmds=this;
          var lv=cmds.Owner;
          var itms=lv.Items;
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            cmd.Container.style.right="1px";
          };
        };
        _cmds.setSize=function(){
          var cmds=this;
          var lv=cmds.Owner;
          var itms=lv.Items;
          var iWidth=lv.Header.CMD.Width-(2*coVDM.ListItemMargin);
          var iLeft=lv.Header.CMD.Left-coVDM.ListItemMargin;
          var iHeight=lv.ListItemHeight-2;
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            cmd.Container.style.width=iWidth+"px";
            cmd.Container.style.left=iLeft+"px";
            cmd.Container.style.top=2 +  (iLcv*lv.ListItemHeight) + "px";
            cmd.Container.style.height=iHeight+"px";
          };
        };
        */
        _cmds._newCommand=function(itm){
          var cmds=this;
          var lv=cmds.Owner;
          var _cmd=new Object();
          itm.Command=_cmd;
          _cmd.cloneAsVar=true;
          _cmd.recurseRelease=false;
          _cmd.Class=itm.Class+"Command";
          _cmd.Owner=cmds;
          _cmd.Item=itm;
          _cmd.Visible=false;
          _cmd.Enabled=true;
          _cmd.Checked=false;
          _cmd.onClick=null;
          _cmd.Parent=itm.Container;
          _cmd.Container=document.createElement('div');
          _cmd.Parent.appendChild(_cmd.Container);
          _cmd.Container.className=_cmd.Class;
          _cmd.Container.Owner=_cmd;
          _cmd.Container.style.visibility="hidden";
          _cmd.Container.style.height=lv.ListItemHeight-2+"px";
          _cmd.Container.style.lineHeight=lv.ListItemLineHeight+"px";
          _cmd.Container.style.textAlign="center";
          _cmd.Container.style.verticalAlign="middle";
          _cmd.Container.style.float="right";
          _cmd.Container.style.marginTop="1px";
          _cmd.Container.style.position="absolute";
          _cmd.Container.style.whiteSpace="nowrap"
          _cmd.setChecked=function(Value){
            if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
              coVDM.VDM.Console.Append("ListView.Command.setChecked");
            var cmd=this;
            var cmds=cmd.Owner;
            cmd.Checked=Value;

            if (cmd.Checked==true) {
              cmd.Container.className=cmd.Class + "Checked";
              coDOM.setText(cmd.Container,cmds.btnCaptionChecked);
              cmd.Item.Container.focus();
            } else {
              cmd.Item.Container.blur();
              cmd.Container.className=cmd.Class;
              coDOM.setText(cmd.Container,cmds.btnCaptionUnchecked);
            }
            if (cmd.onClick!=null) cmd.onClick(cmd);
          };
          _cmd.Show=function(){
            var cmd=this;
            cmd.Visible=true;
            cmd.Container.style.visibility="visible";
          };
          _cmd.Hide=function(){
            var cmd=this;
            cmd.Visible=false;
            cmd.Container.style.visibility="hidden";
          };
          _cmd.doMouseUp=function(e){
            var elm=coDOM.target(e);
            var cmd=elm.Owner;
            var cmds=cmd.Owner;
            var lv=cmds.Owner;

            if (coEvents.TouchLock.Active==true) {
              if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
                coVDM.VDM.Console.Append("ListView.Command.doMouseUp (touchlock exiting)");
              return;
            }
            //coDOM.preventDefault(e);
            cmd.setChecked(!(cmd.Checked==true));
            if ( (cmd.Checked==true) && (cmds.onCommand))
              cmds.onCommand(cmd);
            return true;
          };
          _cmd.doTouchStart=function(e){
            var elm=coDOM.target(e);
            var cmd=elm.Owner;
            var cmds=cmd.Owner;
            var lv=cmds.Owner;
            if (e==undefined) e=window.event;
            //coDOM.preventDefault(e);
            if (coEvents.TouchLock.Active==true) {
              if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
                coVDM.VDM.Console.Append("ListView.Command.doTouchStart (exiting)");
              return;
            }
            cmd.setChecked(!(cmd.Checked==true));
            if ( (cmd.Checked==true) && (cmds.onCommand))
              cmds.onCommand(cmd);
            coEvents.TouchLock.Lock(coVDM.TouchLock);
          };
          _cmd.evtTouchStart=coEvents.Add(_cmd.Container,"touchstart",_cmd.doTouchStart,coEvents.NoCapture,coEvents.Active);
          if (coVDM.VDM.Browser.Mouse==true)
            _cmd.evtMouseUp=coEvents.Add(_cmd.Container,"mouseup",_cmd.doMouseUp,coEvents.NoCapture,coEvents.Active);
          _cmd.Free=function(){
            var cmd=this;
            var idx=cmd.Owner.indexOf(cmd);
            if (idx!=-1) cmd.Owner.splice(idx,1);
            cmd.Container.EventList.Free();
            cmd.Parent.removeChild(cmd.Container);
            if (cmd.Item.Command!=null)
              cmd.Item.Command=null;

            return cmd=_cmd=Release(cmd);
          };
          _cmd.Item.Command=_cmd;
          cmds.push(_cmd);
          return _cmd;
        };
      return _cmds;
    };
    _lv._createHeader=function(){
        var lv=this;
        var _hdr=coObject.Create();
        _hdr.xBias=0;
        _hdr.Clearing=false;
        _hdr.Visible=false;
        _hdr.calcNeeded=false;
        _hdr.Columns=new Array();
        _hdr.Columns.Owner=_hdr;
        _hdr.Owner=lv;
        _hdr.Class=lv.Class+"Header";
        _hdr.Parent=lv.Container;
        _hdr.Container=document.createElement('div');
        _hdr.Parent.appendChild(_hdr.Container);
        _hdr.Container.className=_hdr.Class + " " + _hdr.Class+"Gradient";
        _hdr.Container.style.fontSize=coVDM.ListViewHeaderFontSize+"px";

        _hdr.Columns.addItem=function(Field){
          var clms=this;
          var hdr=clms.Owner;
          var _col=new Object();
          _col.Owner=hdr;
          _col.Parent=hdr.Container;
          _col.Field=Field;
          _col.Visible=false;
          _col.recurseRelease=false;
          _col.cloneAsVar=true;
          _col.Ellipsis=false;
          _col.avgWidth=0;
          _col.sumWidth=0;
          _col.maxWidth=0;
          _col.minWidth=0;
          _col.hisWidth=0;
          _col.squashFactor=1.0;
          _col.squashWidth=0;
          _col.Index=0;
          _col.Width=0;
          _col.Padding=new Padding();
          _col.Container=document.createElement('div');
          _col.Parent.appendChild(_col.Container);
          _col.Container.className=hdr.Class+"Item";
          _col.Padding.Load(_col.Container);
          if (Field.Visible==true) coDOM.setText(_col.Container,Field.Caption);
          _col.defaultWidth=_col.Width=_col.Container.clientWidth;
          _col.Show=function(){
            var col=this;
            var lv=col.Owner.Owner;
            col.Visible=true;
            col.Container.style.visibility= (lv.Visible==false) ? "hidden" : "visible";
            if (col.defaultWidth==0){
              col.Container.style.width="";
              col.maxWidth=col.Width=col.defaultWidth=col.Container.clientWidth;
            };
          };
          _col.AdjustSize=function(iWidth){
            var col=this;
            var hdr=col.Owner;
            col.Width=iWidth;
            col.Container.style.width=col.Width+"px";
          };
          _col.Hide=function(){
            var col=this;
            col.Visible=false;
            col.Container.style.visibility="hidden";
          };
          _col.Free=function(){
            var col=this;
            col.Parent.removeChild(col.Container);
            if (col.Owner.Clearing==false){
              var idx=col.Owner.indexOf(col);
              if (idx!=-1)
                col.Owner.splice(idx,1);
            };
            _col=Release(col);
            return null;
          };
          _col.Index=hdr.Columns.push(_col)-1;
          return _col;
        };
        _hdr.Columns.Clear=function(){
          var clms=this;
          var hdr=clms.Owner;
          hdr.Clearing=true;
          for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++){
            var col=hdr.Columns[iLcv];
            hdr.Columns[iLcv]=col.Free();
          };
          hdr.Columns.length=0;
          hdr.Clearing=false;
        };
        _hdr.Columns.Show=function(){
          var clms=this;
          var hdr=clms.Owner;
          hdr.Visible=true;
          hdr.Container.style.visibility="visible";
          for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++){
           var col=hdr.Columns[iLcv];
           col.Show();
          }
        };
        _hdr.Columns.Hide=function(){
          var clms=this;
          var hdr=clms.Owner;
          hdr.Visible=false;
          hdr.Container.style.visibility="hidden";
          for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++){
           var col=hdr.Columns[iLcv];
           col.Hide();
          }
        };
        _hdr.Columns.Free=function(){
          var clms=this;
          clms.Clear();
          clms=Release(clms);
          return null;
        };
        _hdr.setSizeBySum=function(){
          var hdr=this;
          var lv=hdr.Owner;
          var itms=lv.Items;
          var iCount=itms.length;
          var iMaxTotal=0;
          var iMaxWidth=(lv.Items.Container.clientWidth)-(coAppUI.App.Components.ListView.colResizeBasis*hdr.Columns.length);

          for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++) {
            var col=hdr.Columns[iLcv];
            col.avgWidth=coMath.Div(col.sumWidth,iCount);
            iMaxTotal+=col.maxWidth;
          };
          if (iMaxTotal<iMaxWidth) {
            for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++) {
              var col=hdr.Columns[iLcv];
              col.AdjustSize(col.maxWidth);
              col.hisWidth=col.maxWidth;
            };
          } else {
            for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++) {
              var col=hdr.Columns[iLcv];
              col.AdjustSize(col.avgWidth);
              col.hisWidth=col.avgWidth;
            };
          };

          hdr.setSize();
        };
        _hdr.resetSum=function(){
          var hdr=this;
          for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++){
            var col=hdr.Columns[iLcv];
            col.sumWidth=0;
            col.avgWidth=0;
            col.maxWidth=col.minWidth;
          };
        };
        _hdr.setSize=function(){
          var hdr=this;
          var lv=hdr.Owner;
          var itms=lv.Items;
          var iMargin=coVDM.ListItemMargin*2;
          if ((hdr.calcNeeded==true) && (lv.Visible==true)) {
            for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++){
              var col=hdr.Columns[iLcv];
              col.Container.style.width="";
              col.minWidth=col.Container.offsetWidth;

              col.Width= (col.hisWidth>0) ? col.hisWidth : col.minWidth;
              col.sumWidth=0;
            };
            // Now all items are default width
            hdr.calcNeeded=false;
          };

          hdr.Container.style.left="0px";
          hdr.Container.style.top="0px";
          hdr.Container.style.width=hdr.Parent.clientWidth-hdr.Container.offsetLeft + "px";
          if (hdr.Columns.length==1) {
            var col=hdr.Columns[0];
            var iMaxWidth=(hdr.Container.clientWidth)-(coAppUI.App.Components.ListView.colResizeBasis*hdr.Columns.length);
            col.Width=iMaxWidth;
            col.Container.style.width=iMaxWidth+"px";
          } else {
            var iXBias=hdr.Columns[0].Padding.xBias()
            var iBias=coAppUI.App.Components.ListView.colResizeBasis;
            var iMaxWidth=hdr.Container.clientWidth-(iBias*hdr.Columns.length);
            var iRequired=0;
            for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++){
              var col=hdr.Columns[iLcv];
              iRequired+=(col.maxWidth+iXBias);
            };
            if (iRequired<iMaxWidth)
              iRequired=iMaxWidth
            for (var iLcv=0; iLcv<hdr.Columns.length; iLcv++){
              var col=hdr.Columns[iLcv];
              col.squashFactor=col.maxWidth/iRequired;
              col.Width=(iMaxWidth*col.squashFactor);//,col.minWidth;
              col.Container.style.width=col.Width+"px";
            };
          };
        };
        _hdr.getHeight=function(){
          var hdr=this;
          return hdr.Container.offsetHeight;
        };
        _hdr.Resize=function(){
          var hdr=this;
          hdr.Container.style.width=hdr.Parent.clientWidth-hdr.Container.offsetLeft+hdr.xBias + "px";

        };
        _hdr.Show=function(){
          var hdr=this;
          hdr.Columns.Show();
        };
        _hdr.Hide=function(){
          var hdr=this;
          hdr.Columns.Hide();
        };
        _hdr.Free=function(){
          var hdr=this;
          hdr.Parent.removeChild(hdr.Container);
          hdr.Columns.Free();
          _hdr=Release(hdr);
          return null;
        };
      return _hdr;
    };
    _lv.doneSwapDataSet=function(){
        var lv=this;
        lv.Items.Clear();
    };
    _lv.setDataSet=function(DataSet){
        var lv=this;
        lv.DataSet=DataSet;
        if (lv.toDataSet!=0)
          clearTimeout(lv.toDataSet);
        lv.toDataSet=setTimeout(
          function(){
            lv.doneSwapDataSet();
          },
          coAppUI.App.Components.ListView.setDataSetDelay
        );
    };
    _lv._createItems=function(){
        var lv=this;
        var _itms=new Array();
        _itms.Class=lv.Class+"Items";
        _itms.Owner=lv;
        _itms.Parent=lv.Container;
        _itms.Clearing=false;
        _itms.Data=null;
        _itms.Visible=false;
        _itms.xBias=0;
        _itms.yBias=0;
        _itms.resizeCols=true;
        _itms.recurseRelease=false;
        _itms.Selected=null;
        _itms.cloneAsVar=true;
        _itms.Container=document.createElement('div');
        _itms.Parent.appendChild(_itms.Container);
        _itms.Container.className=_itms.Class;
        _itms.Container.Owner=_itms;
        _itms.Container.style.fontSize=coVDM.ListViewItemFontSize+"px";
        _itms.Editor=coAppUI.App.Components.Text.Create(_itms,_itms.Container,"Editor",lv.Class+"Editor",coLang.Table.Apps.Editor.Files.Hints.Rename,"");
        _itms.Editor.Placement.Mode.setTopLeftRight();
        _itms.Editor.setFontSize(coVDM.ListViewItemFontSize);
        _itms.Editor.onNext=function(edt){
          var itms=edt.Owner;
          itms.EndEdit();
        };
        _itms.Editor.AdjustPlacement=function(){
          var edt=this;
          var itms=edt.Owner;
          var lv=itms.Owner;
          edt.Placement.Left=itms.Border.xBias()+coVDM.ListItemMargin;
          edt.Placement.Top=(itms.Selected) ? itms.Selected.Container.offsetTop+1 : 1;
          edt.Placement.Right=itms.Container.clientWidth-( (lv.Header.Columns.length>0) ? lv.Header.Columns[0].Width+(2*coVDM.ListItemMargin) : 0);
          edt.enforcePlacement();
        };
        _itms.BeginEdit=function(){
          var itms=this;
          var lv=itms.Owner;
          if (lv.AllowEdit==true){
            var bAllowEdit=true;
            if (itms.Selected) {
              itms.Editor.setCaption(itms.Selected.getCaption());
              if (lv.onItemBeginEdit)
                bAllowEdit=(lv.onItemBeginEdit(itms.Selected,itms.Editor)==true);
              if (bAllowEdit==true) {
                itms.Editor.AdjustPlacement();
                itms.Editor.Reveal();
                itms.Editor.Focus();
                itms.Editor.selectAll();
              };
            };
          };
        };
        _itms.EndEdit=function(){
          var itms=this;
          var lv=itms.Owner;
          if (lv.AllowEdit==true){
            if (itms.Selected){
              var bAllowEdit=true;
              if (lv.onItemEndEdit)
                bAllowEdit=(lv.onItemEndEdit(itms.Selected,itms.Editor)==true);
              itms.Selected.getCaption(itms.Editor.getCaption());
              itms.Editor.Clear();
              itms.Editor.Conseal();
              itms.Container.focus();
            };
          };
        };
        _itms.CancelEdit=function(){
          var itms=this;
          var lv=itms.Owner;
          if (lv.AllowEdit==true){
            if (itms.Selected){
              var bAllowCancel=true;
              if (lv.onItemCancelEdit)
                bAllowCancel=(lv.onItemCancelEdit(itms.Selected,itms.Editor)==true);
              itms.Editor.Clear();
              itms.Editor.Conseal();
              itms.Container.focus();
            };
          };
        };
        _itms.Next=function(){
          var itms=this;
          var lv=itms.Owner;

          var idx=(itms.Selected) ? itms.indexOf(itms.Selected)+1 : 0;
          if (lv.WrapSelection==true){
            if (idx>=itms.length) idx=0;
          } else if (idx==itms.length) {
            idx=itms.length-1;
          };
          if ((idx>-1) && (idx<itms.length)){
            itms[idx].setSelected();
            lv.scrollInView(itms[idx]);
          };
        };
        _itms.Previous=function(){
          var itms=this;
          var lv=itms.Owner;

          var idx=(itms.Selected) ? itms.indexOf(itms.Selected)-1 : 0;
          if (lv.WrapSelection==true) {
            if (idx<0) idx=itms.length-1;
          } else if (idx==-1) {
           idx=0;
          };
          if (idx<itms.length) {
            itms[idx].setSelected();
            lv.scrollInView(itms[idx]);
          };
        };
        _itms._doKeyDown=function(e){
          var cntr=coDOM.target(e);
          var itms=cntr.Owner;
          var lv=itms.Owner;
          var cmds=lv.Commands;
          var kVal=coDOM.getKeyCode(e);
          switch (kVal) {
            case (38) : {
              if (itms.Editor.Visible==false)
                itms.Previous();
              break;
            };
            case (40) : {
              if (itms.Editor.Visible==false)
                itms.Next();
              break;
            };
            case (36) : {
              if (itms.Editor.Visible==false) {
                itms.Container.scrollTop=0;
                if (itms.length>0)
                  itms[0].setSelected();
              };
              break;
            };
            case (35) : {
              if (itms.Editor.Visible==false) {
                itms.Container.scrollTop=itms.Container.scrollHeight;
                if (itms.length>0)
                  itms[itms.length-1].setSelected();
              };
              break;
            };
            case (113) : {
              itms.BeginEdit();
              break;
            };
            case (27) : {
              if (itms.Editor.Visible==true) {
                itms.CancelEdit();
              } else if (cmds.Visible==true) {
                if (lv.onInvokeCanceled) {
                  lv.onInvokeCanceled();
                } else {
                  cmds.Cancel();
                };
              };
              break;
            };
            case (32) : {
              if (cmds.Visible==true) {
                if (itms.Selected) {
                  var cmd=itms.Selected.Command;
                  cmd.setChecked(!(cmd.Checked==true));
                };
              };
              break;
            };
            case (46) : {
              if (itms.Editor.Visible==true)
                itms.CancelEdit();
              if (cmds.Mode.Index==cmds.Mode.Delete) {
                if (itms.Selected) {
                  var cmd=itms.Selected.Command;
                  cmd.setChecked(!(cmd.Checked==true));
                };
              } else {
                if (lv.onInvokeDelete)
                  lv.onInvokeDelete();
                if (itms.Selected) {
                  var cmd=itms.Selected.Command;
                  cmd.setChecked(!(cmd.Checked==true));
                };
              };
              break;
            };
          };
        };
        _itms.evtKeyDown=coEvents.Add(_itms.Container,"keydown",_itms._doKeyDown,coEvents.NoCapture,coEvents.Active);
        _itms.Padding=new Padding();
        _itms.Border=new Border();
        _itms.Margin=new Margin();
        _itms.Padding.Load(_itms.Container);
        _itms.Margin.Load(_itms.Container);
        _itms.Border.Load(_itms.Container);
        _itms.Container.tabIndex=0;
        _itms.Container.ondragenter=function(e){
          var cntr=this;
          var itms=cntr.Owner;
          var lv=itms.Owner;
          if (lv.onFileDragEnter)
            lv.onFileDragEnter(e);
        };
        _itms.Container.onscroll=function(e){
          this.Owner.partialResize(coVDM.ListViewResizeDefer);
        };
        _itms.Container.ondragover=function(e){
          var cntr=this;
          var itms=cntr.Owner;
          var lv=itms.Owner;
          if (lv.onFileDragOver)
            lv.onFileDragOver(e);
        };
        _itms.Container.ondragleave=function(e){
          var cntr=this;
          var itms=cntr.Owner;
          var lv=itms.Owner;
          if (lv.onFileDragLeave)
            lv.onFileDragLeave(e);
        };
        _itms.Container.ondrop=function(e){
          var cntr=this;
          var itms=cntr.Owner;
          var lv=itms.Owner;
          if (lv.onFileDrop)
            lv.onFileDrop(e);
        };
        _itms.moveToBefore=function(liNew,liOld){
          var itms=this;
          itms.Container.insertBefore(liNew.Container,liOld.Container);
        };
        _itms.partialResize=function(Delay){
          var itms=this;
          var lv=itms.Owner;
          var elm=coDOM.getChildAtY(1,itms.Container.scrollTop,itms.Container,itms.Container);
          if (elm) {
            lv.Torus.Start();
            lv.tmrResize.Start=Math.max(itms.indexOf(elm.Owner)-coAppUI.App.Components.ListView.resizeScrollBuffer,0);
            var elm=coDOM.getChildAtY(lv.tmrResize.Start+1,itms.Container.scrollTop+itms.Container.clientHeight,itms.Container,itms.Container);
            if (!elm) elm=lv.Items.Container.childNodes[lv.Items.Container.childNodes.length-1];
            lv.tmrResize.Stop=Math.max(itms.indexOf(elm.Owner)+coAppUI.App.Components.ListView.resizeScrollBuffer,0);
            lv.tmrResize.Interval=Delay;
            lv.tmrResize.setActive(true);
          } else {
            lv.Torus.Stop();
          };
        };
        _itms.setSize=function(){
          var itms=this;
          var lv=itms.Owner;
          itms.xBias=itms.Margin.xBias()+itms.Padding.xBias()+itms.Border.xBias();
          itms.yBias=itms.Margin.yBias()+itms.Padding.yBias()+itms.Border.yBias();;
          itms.Container.style.top=itms.Owner.Header.Container.offsetTop+itms.Owner.Header.Container.offsetHeight+"px";
          itms.Container.style.left="0px";
          itms.Container.style.width=itms.Parent.clientWidth-itms.xBias+"px";
          itms.Container.style.height=itms.Parent.clientHeight-itms.Container.offsetTop-itms.yBias+"px";
          itms.partialResize(coVDM.ListViewResizePause);
          if (itms.Editor.Visible==true)
            itms.Editor.AdjustPlacement();
        };
        _itms.Invalidate=function(){
          var itms=this;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            itms[iLcv].Verified=false;
          };
        };
        _itms._createItem=function(sCaption){
          var itms=this;
          var lv=itms.Owner;
          var _itm=new Object();
          _itm.cloneAsVar=true;
          _itm.recurseRelease=false;
          _itm.Class=lv.Class+"Item";
          _itm.Parent=itms.Container;
          _itm.Owner=itms;
          _itm.Selected=false;
          _itm.Data=null;
          _itm.Verified=true;
          _itm.Command=null;
          _itm.Container=document.createElement('div');
          _itm.Parent.appendChild(_itm.Container);
          _itm.Container.className=_itm.Class;
          _itm.Caption=document.createElement('div');
          _itm.Container.appendChild(_itm.Caption);
          _itm.Caption.className=_itm.Class+"Caption";
          _itm.Container.style.height=lv.ListItemHeight+"px";
          _itm.Container.style.lineHeight=lv.ListItemLineHeight+"px";
          _itm.Container.style.whiteSpace="nowrap";
          _itm.Container.Owner=_itm;
          _itm.doDoubleClick=function(e){
            if (!e) e=window.event;

            var itm=this;
            var lv=itm.Owner.Owner;
            var cmds=lv.Commands;
            if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
              coVDM.VDM.Console.Append("ListView.ListItem.doDoubleClick");
            if (cmds.Visible==true) {
              itm.Command.setChecked( !(itm.Command.Checked==true));
              if (cmds.onCommand)
                cmds.onCommand(itm.Command);
            } else {
              if (lv.onDoubleClick) {
                lv.Frame.Torus.Show();
                setTimeout(
                  function() {
                    lv.onDoubleClick(itm);
                    lv.Frame.Torus.Hide(coVDM.torusAutoHide);
                  },
                  coVDM.torusAutoShow
                );
              };
            };
          };
          _itm.doClick=function(e){
            var itm=this;
            var lv=itm.Owner.Owner;

            if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
              coVDM.VDM.Console.Append("ListView.ListItem.doClick");
            if (coEvents.TouchLock.Active==true) {
               if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
                coVDM.VDM.Console.Append("ListView.ListItem.doClick (touchlock exiting)");
               return;
            };
            itm.setSelected();
          };
          _itm.doMouseDown=function(e){
            var itm=this;
            var lv=itm.Owner.Owner;
            var di=lv.dragInfo;

            if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
              coVDM.VDM.Console.Append("ListView.ListItem.doMouseDown");
            itm.evtMouseUp.setActive(true);
            itm.setFocused();
            if (di){
              coDragDrop.Locked=false;
              di.evtMouseUp.setActive(true);
              di.Mouse.Start(e);
              itm.evtMouseMove.setActive(true);
            };
          };
          _itm.doMouseMove=function(e){
            if (e==undefined) e=window.event;
            var itm=this;
            var lv=itm.Owner.Owner;
            var di=lv.dragInfo;
            if (di) {
              if (coDragDrop.Locked==false) {
                di.Mouse.Update(e);
                if (  (di.Active==false) && (di.Mouse.Active==true) && (di.Mouse.Down==true) ){
                  if (
                    (di.Mouse.Duration()>coVDM.dndStartTimeWindow) &&
                    (Math.abs(di.Mouse.ptVector.X)<=coVDM.dndStartDelta) &&
                    (Math.abs(di.Mouse.ptVector.Y)<=coVDM.dndStartAllowY)
                  ) {
                    if (lv.Unit.debugToConsole==true) coVDM.VDM.Console.Append("ListView.Item.doMouseMove (DragDrop)");
                    di.Invoke(itm,e.pageX,e.pageY);
                    if (coVDM.VDM.Browser.Mouse==true)
                      itm.evtMouseMove.setActive(false);
                  } else if
                    (
                      (Math.abs(di.Mouse.ptVector.X)>coVDM.dndStartDelta) ||
                      (Math.abs(di.Mouse.ptVector.Y)>coVDM.dndStartAllowY)
                    ) {
                      coEvents.ScrollLock.Unlock();
                      coDragDrop.Locked=true;
                      if (lv.Unit.debugToConsole==true) {
                        coVDM.VDM.Console.Append("ListView.Item.doMouseMove (locked DragDrop)");
                        coVDM.VDM.Console.Append("ListView.Item.doMouseMove (unlocked ScrollLock)");
                      };
                  };
                };
              } else if (coEvents.ScrollLock.Active==true) {
                coEvents.ScrollLock.Unlock();
                if (lv.Unit.debugToConsole==true) coVDM.VDM.Console.Append("ListView.Item.doMouseMove (unlocked ScrollLock)");
              } else {
                if (lv.Unit.debugToConsole==true) coVDM.VDM.Console.Append("ListView.Item.doMouseMove (DragDrop locked)");
              };
            };
          };
          _itm.doMouseUp=function(e){
            var itm=this;
            var lv=itm.Owner.Owner;
            if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
              coVDM.VDM.Console.Append("ListView.ListItem.doMouseUp");
            itm.evtMouseUp.setActive(false);
            itm.evtMouseMove.setActive(false);
            if (itm.Owner.Focused==itm)
              itm.doClick(e);
          };
          _itm.doTouchEnd=function(e){
            var itm=this;
            var lv=itm.Owner.Owner;
            if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
              coVDM.VDM.Console.Append("ListView.ListItem.doTouchEnd");
            if ( (lv.cancelTouch==false) && (itm.Owner.Focused==itm) && (lv.vsPosition==lv.Items.Container.scrollTop ) ) {
              coEvents.TouchLock.Lock(coVDM.TouchLock);
              itm.setSelected();
              itm.doDoubleClick(e);
            } else {
              lv.vsPosition=lv.Items.Container.scrollTop;
            };
            lv.cancelTouch=false;
          };
          _itm.doTouchMove=function(e){
            var itm=this;
            var lv=itm.Owner.Owner;
            if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
              coVDM.VDM.Console.Append("ListView.ListItem.doTouchMove");
            lv.cancelTouch=true;
          };
          _itm.doTouchStart=function(e){
            var itm=this;
            var lv=itm.Owner.Owner;
            itm.setFocused();
            if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
              coVDM.VDM.Console.Append("ListView.ListItem.doTouchStart");
            if (coEvents.TouchLock.Active==true) {
              if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
                coVDM.VDM.Console.Append("ListView.ListItem.doTouchStart.TouchLock (Exit)");
              return;
            }
          };
          _itm.evtTouchEnd=coEvents.Add(_itm.Container,"touchend",function(e){_itm.doTouchEnd(e);},coEvents.NoCapture,coEvents.Active);
          _itm.evtTouchStart=coEvents.Add(_itm.Container,"touchstart",function(e){_itm.doTouchStart(e);},coEvents.NoCapture,coEvents.Active);
          _itm.evtTouchMove=coEvents.Add(_itm.Container,"touchmove",function(e){_itm.doTouchMove(e);},coEvents.NoCapture,coEvents.NoActivate);
          _itm.evtDoubleClick=coEvents.Add(_itm.Container,"dblclick",function(e){_itm.doDoubleClick(e);},coEvents.NoCapture,coEvents.Active);
          if (coVDM.VDM.Browser.Mouse==true){
            _itm.evtMouseDown=coEvents.Add(_itm.Container,"mousedown",function(e){_itm.doMouseDown(e);},coEvents.NoCapture,coEvents.Active);
            _itm.evtMouseUp=coEvents.Add(_itm.Container,"mouseup",function(e){_itm.doMouseUp(e);},coEvents.NoCapture,coEvents.Active);
            _itm.evtMouseMove=coEvents.Add(_itm.Container,"mousemove",function(e){_itm.doMouseMove(e);},coEvents.NoCapture,coEvents.NoActivate);
          };
          _itm.setCaption=function(Val){
            coDOM.setText(this.Caption,Val);
          };
          _itm.getCaption=function(){
            return coDOM.getText(this.Caption);
          };
          _itm.setSelected=function(){
            var itm=this;
            itm.Selected=true;
            itm.Owner.setSelected(itm);
          };
          _itm.setFocused=function(){
            var itm=this;
            itm.Focused=true;
            itm.Owner.setFocused(itm);
          };
          _itm.Synchronize=function(Data){
            var itm=this;
            var itms=itm.Owner;
            var lv=itms.Owner;
            var iMargin=2*coVDM.ListItemMargin;
            var col=lv.Header.Columns[0];
            var fld=col.Field;
            var val=Data.MAP[fld.mapName].Value;
            if (fld!=null){
              if (fld.Kind==coDB.Kind.DateTime){
                val=coDateTime.incSecond(val,coDateTime.DateOffset);
                val=coDateTime.decodeDateTime(val);
                val=val.toString(coDateTime.formatShort);
              };
              itm.setCaption(val);
              itm.Caption.style.width="";
              var iWidth=itm.Caption.offsetWidth+iMargin;
              col.maxWidth=Math.max(iWidth,col.maxWidth);
              itm.Caption.style.width=col.Width+"px";
            };
            for (var iLcv=1; (iLcv<lv.Header.Columns.length); iLcv++){
              var col=lv.Header.Columns[iLcv];
              var fld=col.Field;
              var val=Data.MAP[fld.mapName].Value;
              var sub=itm.SubItems[iLcv-1];
              if (fld!=null) {
                if (fld.Kind==coDB.Kind.DateTime){
                  val=coDateTime.incSecond(val,coDateTime.DateOffset);
                  val=coDateTime.decodeDateTime(val);
                  val=val.toString(coDateTime.formatShort);
                };
                sub.setValue(val);
              };
            };
            itm.Verified=true;
          };
          _itm._createSubItems=function(){
            var itm=this;
            _subs=new Array();
            _subs.cloneAsVar=true;
            _subs.recureRelease=false;
            _subs.Owner=itm;
            _subs.Add=function(sValue){
              var subs=this;
              var itm=subs.Owner;
              var itms=itm.Owner;
              var lv=itms.Owner;

              var _sub=new Object();
              _sub.cloneAsVar=true;
              _sub.recurseRelease=false;
              _sub.Class=lv.Class+"SubItem";
              _sub.Parent=itm.Container;
              _sub.Item=itm;
              _sub.Value=document.createElement('div');
              _sub.Value.Owner=itm;
              _sub.Parent.appendChild(_sub.Value);
              _sub.Value.className=_sub.Class;
              _sub.Show=function(){
                var sub=this;
                var lv=sub.Item.Owner.Owner;
                var col=lv.Header.Columns[sub.Index+1];
                sub.Value.style.visibility=(lv.Visible==true) ? "visible" : "hidden";
              };
              _sub.Hide=function(){
                var sub=this;
                sub.Value.style.visibility="hidden";
              };
              _sub.getValue=function(){
                var sub=this;
                return coDOM.getText(sub.Value);
              };
              _sub.setValue=function(Value){
                var sub=this;
                var lv=sub.Item.Owner.Owner;
                var hdr=lv.Header;
                var col=hdr.Columns[sub.Index+1];
                sub.Value.style.width="";
                coDOM.setText(sub.Value,Value);
                var iWidth=sub.Value.offsetWidth+coVDM.ListItemMargin;
                col.sumWidth+=sub.Value.offsetWidth;
                col.maxWidth=Math.max(iWidth,col.maxWidth);
                sub.Value.style.left=col.Container.offsetLeft+"px";
                sub.Value.style.width=col.Width+"px";
                sub.Value.style.visibility=(lv.Visible==true) ? "visible" : "hidden" ;
              };
              _sub.Free=function(){
                var sub=this;
                sub.Parent.removeChild(sub.Value);
                _sub=coObject.Release(sub);
                return null;
              };
              _sub.Index=itm.SubItems.push(_sub)-1;
              _sub.setValue(sValue);
              return _sub;
            };
            _subs.Show=function(){
              var subs=this;
              for (var iLcv=0; iLcv<subs.length; iLcv++){
                var sub=subs[iLcv];
                sub.Show();
              };
            };
            _subs.Hide=function(){
              var subs=this;
              for (var iLcv=0; iLcv<subs.length; iLcv++){
                var sub=subs[iLcv];
                sub.Hide();
              };
            };
            _subs.Clear=function(){
              var subs=this;
              for (var iLcv=0; iLcv<subs.length; iLcv++){
                var sub=subs[iLcv];
                subs[iLcv]=sub.Free()
              };
              subs.length=0;
            };
            _subs.Free=function(){
              var subs=this;
              var itm=subs.Owner;
              subs.Clear();
              _subs=itm.SubItems=coObject.Release(subs);
              return null;
            };
            return _subs;
          };
          _itm.SubItems=_itm._createSubItems();
          _itm.setSize=function(){
            var itm=this;
            var lv=itm.Owner.Owner;
            var col=lv.Header.Columns[0];
            itm.Caption.style.left=col.Container.offsetLeft+"px";
            itm.Caption.style.width=col.Width+"px";
            for (var iLcv=0; ( (iLcv<itm.SubItems.length) && (iLcv<lv.Header.Columns.length-1) );  iLcv++){
              var col=lv.Header.Columns[iLcv+1];
              itm.SubItems[iLcv].Value.style.left=col.Container.offsetLeft+"px";
              itm.SubItems[iLcv].Value.style.width=col.Width+"px";
              itm.SubItems[iLcv].Value.style.visibility=(lv.Visible==false) ? "hidden" : "visible";
            };
          };
          _itm.Update=function(dbItem){
            var itm=this;
            var lv=itm.Owner.Owner;
            var cols=lv.Header.Columns;
            itm.Data=dbItem;
            itm.setCaption(dbItem.getValue(cols[0].Field));
            for (var iLcv=1; iLcv<cols.length; iLcv++){
              var sub=itm.SubItems[iLcv-1];
              var val=dbItem.getValue(cols[iLcv].Field);
              if (cols[iLcv].Field.Kind==coDB.Kind.DateTime){
                val=coDateTime.incSecond(val,coDateTime.DateOffset);
                val=coDateTime.decodeDateTime(val);
                val=val.toString(coDateTime.formatShort);
              };
              sub.setValue(val);
            };
            lv.setSize();
          };
          _itm.Show=function(){
            var itm=this;
            itm.Container.style.visibility="visible";
            itm.Caption.style.visibility="visible";
            itm.SubItems.Show();
          };
          _itm.Hide=function(){
            var itm=this;
            itm.Container.style.visibility="hidden";
            itm.Caption.style.visibility="hidden";
            itm.SubItems.Hide();
          };
          _itm.Free=function(){
            var itm=this;
            var dbItem=itm.Data;
            var itms=itm.Owner;
            var lv=itms.Owner;
            if (dbItem) dbItem.removeDisplay(itm);
            if (itm.Command) itm.Command=itm.Command.Free();
            itm.Container.EventList.Free();
            if (itms.Clearing==false) {
              var idx=itms.indexOf(itm);
              if (idx!=-1)
                itms.splice(idx,1);
            };
            if (itms.Selected==itm) itms.Selected=null;
            itm.Container.removeChild(itm.Caption);
            itm.Parent.removeChild(itm.Container);
            itm.SubItems=itm.SubItems.Free();
            _itm=Release(itm);
            return null;
          };
          _itm.setCaption(sCaption);
          return _itm;
        };
        _itms.Add=function(sCaption){
          var itms=this;
          var itm=itms._createItem(sCaption);
          itms.push(itm);
          return itm;
        };
        _itms.SyncItem=function(dbItem){
          var itms=this;
          var lv=itms.Owner;
          if (!lv.DataSet) return null;

          var dm=lv.DataSet.Items.DisplayMode;
          var li=(dm.Index==dm.Single) ? dbItem.Display : dbItem.Display.getItem(lv);

          if (!li) {
            if (dbItem.Visible==true) {
              li=itms.fromDB(dbItem);
              li.Show();
            };
          } else if (dbItem.Visible==true) {
            li.Synchronize(dbItem);
          } else {
            li.Verified=false;
          };
          return li;
        };
        _itms.SyncView=function(){
          var iMargin=2*coVDM.ListItemMargin;
          var itms=this;
          var lv=itms.Owner;
          lv.Torus.Start();
          var ds=lv.DataSet;
          if (!ds) return;

          var dm=ds.Items.DisplayMode;
          var Recycled=new Array();
          itms.Invalidate();
          lv.Header.resetSum();
          if (itms.resizeCols==true){
            lv.Header.calcNeeded=true;
            lv.Header.setSize(); // reset To default widths
          };
          if (dm.Index==dm.Single) {
            var getDisplay=function(dbItem){
              return dbItem.Display;
            };
          } else {
            var getDisplay=function(dbItem){
              return (dbItem.Display) ? dbItem.Display.getItem(lv) : null;
            };
          };
          var dbItms=( (ds.Groups.Selected) && (ds.Groups.Selected.Filter!=null) ) ? ds.Groups.Selected.Values[ds.Groups.Selected.Filter] : ds.Items;
          if (dbItms){
            for (var iItmLcv=0; iItmLcv<dbItms.length; iItmLcv++){
              var dbItem=dbItms[iItmLcv];
              if ((dbItem.Verified==true) && (dbItem.Visible==true)) {
                var fld=lv.Header.Columns[0].Field;
                if ((lv.DataSet!=null) && (fld!=null)) {
                    var li=getDisplay(dbItem);
                    if (!li) {
                      li=itms.fromDB(dbItem);
                    } else {
                      li.Verified=true;
                      col=lv.Header.Columns[0];
                      var fld=col.Field;
                      var val=dbItem.MAP[fld.mapName].Value;
                      if (fld!=null){
                        if (fld.Kind==coDB.Kind.DateTime){
                          val=coDateTime.incSecond(val,coDateTime.DateOffset);
                          val=coDateTime.decodeDateTime(val);
                          val=val.toString(coDateTime.formatShort);
                        };
                        li.setCaption(val);
                        li.Caption.style.width="";
                        var iWidth=li.Caption.offsetWidth+iMargin;
                        col.sumWidth+=li.Caption.offsetWidth;
                        col.maxWidth=Math.max(iWidth,col.maxWidth);
                        li.Caption.style.width=col.Width+"px";
                      };
                      for (var iLcv=1; (iLcv<lv.Header.Columns.length); iLcv++){
                        var col=lv.Header.Columns[iLcv];
                        var fld=col.Field;
                        var val=dbItem.MAP[fld.mapName].Value;
                        var sub=li.SubItems[iLcv-1];
                        if (fld!=null) {
                          if (fld.Kind==coDB.Kind.DateTime){
                            val=coDateTime.incSecond(val,coDateTime.DateOffset);
                            val=coDateTime.decodeDateTime(val);
                            val=val.toString(coDateTime.formatShort);
                          };
                          sub.setValue(val);
                        };
                      };
                    };
                    if (lv.Visible==true) li.Show();
                };
              };
            };
          };
          for (var iLcv=0; iLcv<itms.length; iLcv++)
            if (itms[iLcv].Verified!=true)
              Recycled.push(itms[iLcv]);

          for (var iLcv=0; iLcv<Recycled.length; iLcv++){
            var li=Recycled[iLcv];
            li.Free();
          };
          Recycled.length=0;
          Recycled=null;

          //if (itms.resizeCols==true){
            itms.resizeCols=false;
            lv.Header.setSizeBySum();
            lv.setSize();
          //};
        };
        _itms.fromDB=function(dbItem){
          var itms=this;
          var lv=itms.Owner;
          itms.Selected=null;
          var ds=dbItem.Collection;
          var dm=ds.Items.DisplayMode;

          if (dm.Index==dm.Single) {
            var addToDisplay=function(dbItem,li){
              dbItem.Display=li;
            };
          } else {
            var addToDisplay=function(dbItem,li){
              li.Slide=lv;
              dbItem.Display.push(li);
            };
          };

          var fld=lv.Header.Columns[0].Field;
          if ((lv.DataSet!=null) && (fld!=null)) {
            var iMargin=2*coVDM.ListItemMargin;
            var col=lv.Header.Columns[0];
            var li=lv.Items.Add(dbItem.MAP[fld.mapName].Value);
            addToDisplay(dbItem,li);
            li.Caption.style.width="";
            var iWidth=li.Caption.offsetWidth+iMargin;
            col.sumWidth+=li.Caption.offsetWidth;
            col.maxWidth=Math.max(iWidth,col.maxWidth);
            li.Caption.style.width=col.Width+"px";
            for (var iLcv=1; iLcv<lv.Header.Columns.length; iLcv++){
              var col=lv.Header.Columns[iLcv];
              var fld=col.Field;
              if (fld!=null) {
                var dbVal=dbItem.MAP[fld.mapName];
                var val=(dbVal)? dbVal.Value : "";
                if (fld.Kind==coDB.Kind.DateTime){
                  val=coDateTime.incSecond(val,coDateTime.DateOffset);
                  val=coDateTime.decodeDateTime(val);
                  val=val.toString(coDateTime.formatShort);
                };
                var sub=li.SubItems.Add(val);
              } else {
                var sub=li.SubItems.Add("");
              };
            };
            li.Data=dbItem;
            return li;
          } else {
            return null;
          };
        };
        _itms.indexOf=function(itm){
          if (!itm) return -1;
          var itms=this;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itmLcv=itms[iLcv];
            if (itm==itmLcv) return iLcv;
          };
          return -1;
        };
        _itms.Clear=function(){
          var itms=this;
          var lv=itms.Owner;

          itms.Selected=null;
          itms.Clearing=true;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            itms[iLcv]=itm.Free();
          };
          itms.Owner.Header.resetSum();
          itms.length=0;
          itms.Clearing=false;
          if (lv.onItemSelected) lv.onItemSelected(null);
        };
        _itms.Resize=function(){
        };
        _itms.Show=function(){
          var itms=this;
          itms.Visible=true;
          itms.Container.style.visibility="visible";
        };
        _itms.Hide=function(){
          var itms=this;
          itms.Visible=false;
          itms.Container.style.visibility="hidden";
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            itm.Hide();
          };
        };
        _itms.setSelected=function(exItem){
          var itms=this;
          var lv=itms.Owner;
          itms.Selected=exItem;
          if (itms.Editor.Visible==true)
            itms.CancelEdit();
          if (lv.onItemSelected) lv.onItemSelected(exItem);
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            if ((itm!=exItem) && (itm.Selected==true)) {
              itm.Selected=false;
              itm.Container.className=exItem.Class;
            };
          };
          exItem.Container.className=exItem.Class+"Selection";
        };
        _itms.setFocused=function(exItem){
          var itms=this;
          var lv=itms.Owner;
          itms.Focused=exItem;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            if ((itm!=exItem) && (itm.Focused==true) ) {
              itm.Focused=false;
              itm.Container.className=exItem.Class;
            };
          };
          exItem.Container.className=exItem.Class+"Focused";
          if ((lv.Unit.debugToConsole==true) && (coVDM.VDM.Console))
            coVDM.VDM.Console.Append("ListView.ListItems.setFocused");
        };
        _itms.blurItemsInView=function(exItem){
          if (!exItem) exItem=null;
          var itms=this;
          var iTop=itms.Container.scrollTop;
          var iMax=iTop+itms.Container.offsetHeight;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            if  ( (itm!=exItem) && (itm.Container.offsetTop>=iTop) && (itm.Container.offsetTop<=iMax))
              itm.Container.blur();
          };
        };
        _itms.getItemByData=function(Data){
          var itms=this;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            if (itm.Data==Data) return itm;
          };
          return null;
        };
        _itms.getItemsInView=function(){
          var itms=this;
          var lst=new Array();
          var iTop=itms.Container.scrollTop;
          var iMax=iTop+itms.Container.offsetHeight;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            if  ( (itm.Container.offsetTop>=iTop) && (itm.Container.offsetTop<=iMax))
              lst.push(itm);
          };
          return lst;
        };
      return _itms;
    };
    _lv.SyncItem=function(dbItem){
      this.Items.SyncItem(dbItem);
    };
    _lv.SyncClear=function(){
      this.Items.Clear();
    };
    _lv.PartialSynchronize=function(loadInfo){
      var lv=this;
      for (var iLcv=0; iLcv<loadInfo.Items.length; iLcv++) {
        var dbItem=loadInfo.Items[iLcv];

        this.Items.SyncItem(dbItem);
      };
      lv.Items.resizeCols=true;
      lv.Header.calcNeeded=true;
      lv.Header.setSize();
      lv.Items.setSize();
    };
    _lv.setDragInfo=function(srcIcon,sBlurb,sTarget,Item,Action,onAccepted,onRejected,onCanceled,onCommited){
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
    _lv.Synchronize=function(){
      var lv=this;
      lv.Items.SyncView();
    };
    _lv.SyncDone=function(){
      var lv=this;
      lv.Header.setSize();
      lv.Items.partialResize(coVDM.ListViewResizePause);
    };
    _lv.Load=function(){
        var lv=this;
        lv.Torus.Start();
        lv.Items.Clear();
        lv.Header.calcNeeded=true;
        lv.Header.setSize(); // reset To default widths
        lv.tmrLoad.Start=0;
        lv.tmrLoad.showItems=(lv.Visible==true);
        lv.tmrLoad.setHeaders=true;
        lv.tmrLoad.setActive(true);
    };
    _lv.onShow=function(){
        var lv=this;
        lv.Container.style.visibility="visible";
        lv.Torus.Start();
        lv.Header.setSize();
        lv.Header.Show();
        lv.Items.Show();
        lv.Items.SyncView();
        lv.Items.setSize();
    };
    _lv.onHide=function(){
        var lv=this;
        lv.Header.Hide();
        lv.Items.Hide();
        lv.Commands.Hide();
        lv.Container.style.visibility="hidden";
    };
    _lv.onResize=function(){
      var lv=this;
      if (lv.Visible==true){
        lv.Header.setSize();
        lv.Items.setSize();
        //lv.Commands.setSize();
      };
    };
    _lv.onCreated=function(){

    };
    _lv.Header=_lv._createHeader();
    _lv.Items=_lv._createItems();
    _lv.Commands=_lv._createCommands();
    _lv.Torus=coAppUI.App.Components.Torus.Create(_lv.Screen.Frame,_lv,_lv.Container);

    return _lv;
  }
};

