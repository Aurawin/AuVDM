UI.KPList = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  Compiled       : false,
  init:function(){
    this.Initialized=true;
    UI.Controls.Add(this);  
  },
  Create         : function(sName,sCaption,Screen,Slides,Owner,Parent,Columns,onAddItem,onDeleteItem,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Client;
    var _kpl=Slides.createSlide(sCaption,sName,Screen,Owner,Parent,Align);
    _kpl.Options=coList.kpList("=","\r\n");
    _kpl.Columns=coList.StringArray();
    for (var iLcv=0; iLcv<Columns.length; iLcv++)
      _kpl.Columns.Add(Columns[iLcv]);
      _kpl.Index=-1;
      _kpl.Loading=false;
      _kpl.Name=sName;
      _kpl.Class="KPList";
      _kpl.refreshTimer=coApp.Timers.createItem(coVDM.ListViewAutoRefresh);
      _kpl.refreshTimer.RunOnce=true;
      _kpl.refreshTimer.onExecute=function(){
      _kpl.Screen.setSize();
    };
    _kpl.onAddItem=onAddItem;
    _kpl.onDeleteItem=onDeleteItem;

    _kpl.setCaption=function(sName,sValue){
        var kpl=_kpl;
        kpl.Columns[0]=sName;
        kpl.Columns[1]=sValue;
        coDOM.setText(kpl.Title.Name,sName);
        coDOM.setText(kpl.Title.Value,sValue);
    };
    _kpl.onShow=function(){
        var kpl=_kpl;
        kpl.Title.Show();
        kpl.Items.Show();
    };
    _kpl.onHide=function(){
        var kpl=_kpl;
        kpl.Title.Hide();
        kpl.Items.Hide();
        if (kpl.Commands.Visible==true)
          kpl.Commands.Hide();
        if (kpl.Prompt.Visible==true)
          kpl.Prompt.Hide();
    };
    _kpl.onResize=function(){
        var kpl=_kpl;
        kpl.Title.Resize();
        kpl.Items.Resize();
        kpl.Commands.Resize();
        if (kpl.Prompt.Visible==true)
          kpl.Prompt.Resize();
    };
    _kpl.onSetSize=function(){
        var kpl=_kpl;
        kpl.Title.setSize();
        kpl.Items.setSize();
        if (kpl.Commands.Visible==true)
          kpl.Commands.setSize();
        if (kpl.Prompt.Visible==true)
          kpl.Prompt.setSize();
      };
      _kpl.kplItems=function(){
        var _itms=coList.kpList("=","\r\n");
        _itms.Owner=_kpl;
        _itms.Class=_kpl.Class+"Items";
        _itms.Container=document.createElement('div');
        _itms.Owner.Container.appendChild(_itms.Container);
        _itms.Container.className=_itms.Class;
        _itms.Container.style.overflowX="hidden";
        _itms.Container.style.overflowY="auto";
        _itms._kplClear=_itms.Clear;
        _itms.Clear=function(){
          var itms=_itms;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            itm.cntValue.removeChild(itm.Value);
            itm.cntName.removeChild(itm.Name);
            itm.Container.removeChild(itm.cntValue);
            itm.Container.removeChild(itm.cntName);
            itms.Container.removeChild(itm.Container);
            itm.Value=null;
            itm.Name=null;
            itm.cntValue=null;
            itm.cntName=null;
            itm.Container=null;
          };
          itms._kplClear();
        };
        _itms.MaxWidthForName=function(){
          var kpl=_kpl;
          var itms=_itms;
          var iWidth=kpl.Title.Name.offsetWidth+2*coVDM.ListItemMargin;
          var iValWidth=kpl.Title.Value.offsetWidth+2*coVDM.ListItemMargin;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            iWidth=Math.max(iWidth,itm.Name.offsetWidth);
          };
          if (iWidth+kpl.Title.Gutter.offsetWidth+iValWidth+kpl.Title.CMD.offsetWidth>kpl.Container.clientWidth)
            iWidth=kpl.Container.clientWidth-(kpl.Title.Gutter.offsetWidth+iValWidth+kpl.Title.CMD.offsetWidth);
          kpl.Title.colWidths.Name=kpl.Title.Name.offsetWidth;
          return iWidth+coVDM.ListItemMargin;
        };
        _itms.onAddItem=function(itm,idx){
          var itms=_itms;
          var kpl=_kpl;
          itm.Owner=_itms;
          itm.Command=null;
          itm.Class=_kpl.Class+"Item";
          itm.Container=document.createElement('div');
          itms.Container.appendChild(itm.Container);
          itm.Container.className=itm.Class;

          itm.cntName=document.createElement('div')
          itm.Container.appendChild(itm.cntName);
          itm.cntName.className=itm.Class+"Name";
          var sName=itm.Name;
          itm.Name=document.createElement('span');
          itm.cntName.appendChild(itm.Name);
          itm.Name.className=itm.Class+"Name";
          coDOM.setText(itm.Name,sName);
          itm.cntName.style.overflow="hidden";
          itm.Name.style.lineHeight=coVDM.ListItemLineHeight+"px";
          itm.Name.style.whiteSpace="nowrap";

          var sValue=itm.Value;
          itm.cntValue=document.createElement('div')
          itm.Container.appendChild(itm.cntValue);
          itm.cntValue.className=itm.Class+"Value";
          itm.Value=document.createElement('span');
          itm.cntValue.appendChild(itm.Value);
          itm.Value.className=itm.Class+"Value";
          coDOM.setText(itm.Value,sValue);
          itm.cntName.style.overflow="hidden";
          itm.Value.style.lineHeight=coVDM.ListItemLineHeight+"px";
          itm.Value.style.whiteSpace="nowrap";
          itm.Hide=function(iIndex){
            var itms=_itms;
            itms[iIndex].Container.style.visibility="hidden";
            itms[iIndex].cntName.style.visibility="hidden";
            itms[iIndex].cntValue.style.visibility="hidden";
            itms[iIndex].Name.style.visibility="hidden";
            itms[iIndex].Value.style.visibility="hidden";
          };
          itm.Show=function(iIndex){
            var itms=_itms;
            itms[iIndex].setSize(iIndex);
            itms[iIndex].Container.style.visibility="visible";
            itms[iIndex].cntName.style.visibility="visible";
            itms[iIndex].cntValue.style.visibility="visible";
            itms[iIndex].Name.style.visibility="visible";
            itms[iIndex].Value.style.visibility="visible";
          };
          itm.Resize=function(iIndex){
            var itms=_itms;
            itms[iIndex].Container.style.width=itms.Container.clientWidth+"px";
            itms[iIndex].cntName.style.left=_kpl.Title.cntName.offsetLeft+"px";
            itms[iIndex].cntName.style.width=_kpl.Title.colWidths.Name+"px";
            itms[iIndex].cntValue.style.left=_kpl.Title.cntValue.offsetLeft+"px";
            itms[iIndex].cntValue.style.width=_kpl.Title.colWidths.Value+"px";
          };
          itm.setSize=function(iIndex){
            var itms=_itms;
            itms[iIndex].Container.style.left="0px";
            itms[iIndex].Container.style.top=iIndex*coVDM.ListItemHeight+"px";
            itms[iIndex].Container.style.width=itms.Container.clientWidth+"px";
            itms[iIndex].Container.style.height=coVDM.ListItemHeight+"px";

            itms[iIndex].cntName.style.top="0px";
            itms[iIndex].cntName.style.left=_kpl.Title.cntName.offsetLeft+"px";
            itms[iIndex].cntName.style.width=_kpl.Title.colWidths.Name+"px";
            itms[iIndex].cntName.style.height=itms[iIndex].Container.clientHeight+"px";

            itms[iIndex].cntValue.style.top="0px";
            itms[iIndex].cntValue.style.left=_kpl.Title.cntValue.offsetLeft+"px";
            itms[iIndex].cntValue.style.width=_kpl.Title.colWidths.Value+"px";
            itms[iIndex].cntValue.style.height=itms[iIndex].Container.clientHeight+"px";
          };
          if (kpl.Visible==true)
            itm.Show(idx);
          if ((kpl.onAddItem) && (kpl.Loading!=true))
            kpl.onAddItem(itm);
        };
        _itms.onDeleteItem=function(itm){
          // this is called by kpList native util
          var kpl=_kpl;
          var itms=_itms;
          kpl.refreshTimer.setActive(true);
          itm.cntValue.removeChild(itm.Value);
          itm.cntName.removeChild(itm.Name);
          itm.Container.removeChild(itm.cntValue);
          itm.Container.removeChild(itm.cntName);
          itms.Container.removeChild(itm.Container);
        };
        _itms.setSize=function(){
          var itms=_itms;
          var kpl=_kpl;
          var iHeight=kpl.Container.offsetHeight-kpl.sumClientHeightsEx(itms.Container);
          var iTop=kpl.Title.Container.offsetTop+kpl.Title.Container.offsetHeight;
          itms.Container.style.left="0px";
          itms.Container.style.top=iTop+"px";
          itms.Container.style.width=itms.Owner.Container.clientWidth+"px";
          itms.Container.style.height=iHeight+"px";
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            itm.setSize(iLcv);
          };
        };
        _itms.Resize=function(){
          var itms=_itms;
          var kpl=_kpl;
          var iHeight=kpl.Container.offsetHeight-kpl.sumClientHeightsEx(itms.Container);
          var iTop=kpl.Title.Container.offsetTop+kpl.Title.Container.offsetHeight;
          itms.Container.style.width=itms.Owner.Container.clientWidth+"px";
          itms.Container.style.height=iHeight+"px";
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            itm.setSize(iLcv);
          };
        };
        _itms.Hide=function(){
          var itms=_itms;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            if (itm.Hide) itm.Hide(iLcv);
          };
          itms.Container.style.visibility="hidden";
        };
        _itms.Show=function(){
          var itms=_itms;
          itms.Container.style.visibility="visible";
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            if (itm.Show) itm.Show(iLcv);
          };
          itms.setSize();
        };
        return _itms;
      };
      _kpl.kplCommands=function(){
        var _cmds=new Array();
        _cmds.Visible=false;
        _cmds.Owner=_kpl;
        _cmds.btnCaptionChecked="";
        _cmds.btnCaptionUnchecked="";
        _cmds.onCommand=null;
        _cmds.Mode=new Object();
        _cmds.Mode.Index=-1;
        _cmds.Mode.Unknown=-1;
        _cmds.Mode.Delete=0;
        _cmds.Mode.Move=1;
        _cmds.Mode.Join=2;
        _cmds.Mode.Subscribe=3;
        _cmds.onConfirm=null;
        _cmds.Mode.setMode=function(Value){
          var cmds=_cmds;
          var kpl=_kpl;
          cmds.Mode.Index=Value;
          switch (Value) {
            case cmds.Mode.Delete :
              coDOM.setText(kpl.Title.CMD,"Delete");
              cmds.btnCaptionChecked="Undelete";
              cmds.btnCaptionUnchecked="Delete";
              break;
            case cmds.Mode.Move :
              coDOM.setText(kpl.Title.CMD,"Move");
              cmds.btnCaptionChecked="Deselect";
              cmds.btnCaptionUnchecked="Move";
              break;
            case cmds.Mode.Join :
              coDOM.setText(kpl.Title.CMD,"Join");
              cmds.btnCaptionChecked="Undo";
              cmds.btnCaptionUnchecked="Join";
              break;
            case cmds.Mode.Subscribe :
              coDOM.setText(kpl.Title.CMD,"Subscribe");
              cmds.btnCaptionChecked="Undo";
              cmds.btnCaptionUnchecked="Subscribe";
              break;
          };
        };
        _cmds.Show=function(){
          var cmds=_cmds;
          var itms=_kpl.Items;
          var kpl=_kpl;
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
          };
          kpl.onSetSize();
        };
        _cmds.Hide=function(){
          var kpl=_kpl;
          var cmds=_cmds;
          var itms=kpl.Items;
          cmds.Visible=false;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            if (itm.Command!=null)
              itm.Command=null;
          };
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            cmd.cntCaption.removeChild(cmd.Caption);
            cmd.Parent.removeChild(cmd.cntCaption);
            cmd.Caption=null;
            cmd.cntCaption=null;
            cmd.Parent=null;
            cmd.Owner=null;
            cmd.Item=null;
            cmd.Free();
            cmd=null;
          };
          cmds.length=0;
          kpl.onSetSize();
        };
        _cmds.Confirm=function(){
          var cmds=_cmds;
          var itms=_kpl.Items;
          if (cmds.onConfirm!=null){
            for (var iLcv=0; iLcv<cmds.length; iLcv++){
              var cmd=cmds[iLcv];
              if (cmd.Checked==true)
                cmds.onConfirm(cmd)
            };
          };
        };
        _cmds.Resize=function(){
          var kpl=_kpl;
          var cmds=_cmds;
          var itms=kpl.Items;
          var iWidth=kpl.Title.colWidths.CMD;
          var iLeft=kpl.Title.cntCMD.offsetLeft;
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            cmd.cntCaption.style.left=iLeft+"px";
            cmd.cntCaption.style.width=iWidth+"px";
          };
        };
        _cmds.setSize=function(){
          var kpl=_kpl;
          var cmds=_cmds;
          var itms=kpl.Items;
          var iWidth=kpl.Title.colWidths.CMD;
          var iLeft=kpl.Title.cntCMD.offsetLeft;
          for (var iLcv=0; iLcv<cmds.length; iLcv++){
            var cmd=cmds[iLcv];
            cmd.cntCaption.style.width=iWidth+"px";
            cmd.cntCaption.style.left=iLeft+"px";
            cmd.cntCaption.style.top="1px";
            cmd.cntCaption.style.height=coVDM.ListItemHeight-2+"px";
          };
        };
        _cmds._newCommand=function(itm){
          var cmds=_cmds;
          var _cmd=new Object();
          _cmd.recurseRelease=false;
          _cmd.Class=itm.Class+"Command";
          _cmd.Owner=_cmds;
          _cmd.Item=itm;
          _cmd.Enabled=true;
          _cmd.Checked=false;
          _cmd.onClick=null;
          _cmd.Parent=itm.Container;
          _cmd.cntCaption=document.createElement('div');
          _cmd.Parent.appendChild(_cmd.cntCaption);
          _cmd.cntCaption.className=_cmd.Class;
          _cmd.Caption=document.createElement('span');
          _cmd.cntCaption.appendChild(_cmd.Caption);
          _cmd.Caption.className=_cmd.Class;
          _cmd.cntCaption.style.visibility="visible";
          _cmd.Caption.style.visibility="visible";
          _cmd.Caption.style.lineHeight=coVDM.ListItemLineHeight+"px";
          _cmd.cntCaption.style.textAlign="center";
          _cmd.cntCaption.style.verticalAlign="middle";
          _cmd.setChecked=function(Value){
            var cmd=_cmd;
            var cmds=_cmds;
            cmd.Checked=Value;
            (cmd.Checked==true) ? cmd.cntCaption.className=cmd.Class + "Checked" : cmd.cntCaption.className=cmd.Class;
            (cmd.Checked==true) ? coDOM.setText(cmd.Caption,cmds.btnCaptionChecked) : coDOM.setText(cmd.Caption,cmds.btnCaptionUnchecked);
            if (cmd.onClick!=null) cmd.onClick(cmd);
          };
          _cmd.doClick=function(e){
            var cmd=_cmd;
            cancelEvent(e,true);
            cmd.setChecked(!cmd.Checked);
          };
          _cmd.cntCaption.onclick=_cmd.doClick;
          _cmd.Caption.onclick=_cmd.doClick;
          _cmd.Free=function(){
            _cmd=Release(_cmd);
          };
          _cmd.Item.Command=_cmd;
          cmds.push(_cmd);
          return _cmd;
        };
        return _cmds;
      };
      _kpl.kplTitle=function(){
        var _title=new Object();
        _title.Owner=_kpl;
        _title.Class=_kpl.Class+"Title";
        _title.Parent=_kpl.Container;
        _title.colWidths=new Array();

        _title.Container=document.createElement('div');
        _title.Parent.appendChild(_title.Container);
        _title.Container.className=_title.Class;
        _title.Gutter=document.createElement('div');
        _title.Container.appendChild(_title.Gutter);
        _title.Gutter.className=_title.Class+"Gutter";
        _title.colWidths.Gutter=_title.Gutter.offsetWidth;

        _title.cntName=document.createElement('div');
        _title.Container.appendChild(_title.cntName);
        _title.cntName.className=_title.Class+"Name";
        _title.Name=document.createElement('span');
        _title.cntName.appendChild(_title.Name);
        _title.cntName.style.overflow="hidden";
        _title.Name.className=_title.Class+"Name";
        _title.colWidths.Name=_title.cntName.offsetWidth;
        _title.cntName.style.textAlign="center";
        _title.cntName.style.verticalAlign="middle";


        _title.cntValue=document.createElement('div');
        _title.Container.appendChild(_title.cntValue);
        _title.cntValue.className=_title.Class+"Value";
        _title.Value=document.createElement('span');
        _title.cntValue.appendChild(_title.Value);
        _title.cntValue.style.overflow="hidden";
        _title.Value.className=_title.Class+"Value";
        _title.colWidths.Value=_title.cntValue.offsetWidth;
        _title.cntValue.style.textAlign="center";
        _title.cntValue.style.verticalAlign="middle";

        _title.cntCMD=document.createElement('div');
        _title.Container.appendChild(_title.cntCMD);
        _title.cntCMD.className=_title.Class+"CMD";
        _title.CMD=document.createElement('span');
        _title.cntCMD.appendChild(_title.CMD);
        _title.CMD.className=_title.Class+"CMD";
        _title.cntCMD.style.textAlign="center";
        _title.cntCMD.style.verticalAlign="middle";

        _title.colWidths.CMD=_title.CMD.offsetWidth;
        if (_title.Owner.Columns.length>0)
          coDOM.setText(_title.Name,_title.Owner.Columns[0]);
        if (_title.Owner.Columns.length>1)
          coDOM.setText(_title.Value,_title.Owner.Columns[1]);
        _title.Show=function(){
          var tit=_title;
          var kpl=_kpl;
          tit.Container.style.visibility="visible";
          tit.Gutter.style.visibility="visible";
          tit.cntName.style.visibility="visible";
          tit.Name.style.visibility="visible";
          tit.cntValue.style.visibility="visible";
          tit.Value.style.visibility="visible";
          if (kpl.Commands.Visible==true){
            tit.cntCMD.style.visibility="visible";
            tit.CMD.style.visibility="visible";
          } else {
            tit.cntCMD.style.visibility="hidden";
            tit.CMD.style.visibility="hidden";
          };
          tit.setSize();
        };
        _title.Hide=function(){
          var tit=_title;
          tit.Container.style.visibility="hidden";
          tit.Gutter.style.visibility="hidden";
          tit.cntName.style.visibility="hidden";
          tit.Name.style.visibility="hidden";
          tit.cntValue.style.visibility="hidden";
          tit.Value.style.visibility="hidden";
          tit.cntCMD.style.visibility="hidden";
          tit.CMD.style.visibility="hidden";
        };
        _title.setSize=function(){
          var tit=_title;
          var kpl=_kpl;
          var iWidth=tit.Parent.offsetWidth;
          tit.Container.style.height=coVDM.MenuItemHeight+"px";
          tit.Container.style.width=iWidth+"px";
          tit.Gutter.style.height=coVDM.ListItemHeight+"px";
          tit.Gutter.style.left="0px";
          tit.Gutter.style.top="0px";
          tit.Gutter.style.width=coVDM.ListItemHeight+"px";
          tit.colWidths.Gutter=tit.Gutter.offsetWidth;

          tit.cntCMD.style.top="0px";
          if (kpl.Commands.Visible==true) {
            tit.cntCMD.style.left=iWidth-tit.cntCMD.offsetWidth-coVDM.ListItemMargin+"px";
            tit.colWidths.CMD=tit.cntCMD.offsetWidth-coVDM.ListItemMargin;
          } else {
            tit.cntCMD.style.left=iWidth-coVDM.ListItemMargin+"px";
            tit.colWidths.CMD=0;
          };
          tit.cntCMD.style.height=coVDM.ListItemHeight+"px";
          tit.cntCMD.style.lineHeight=coVDM.ListItemLineHeight+"px";

          tit.cntName.style.top="0px";
          tit.cntName.style.left=tit.Gutter.offsetWidth+coVDM.ListItemMargin+"px";
          tit.cntName.style.height=coVDM.ListItemHeight+"px";
          tit.cntName.style.width=kpl.Items.MaxWidthForName()+"px";
          tit.cntName.style.lineHeight=coVDM.ListItemLineHeight+"px";
          tit.colWidths.Name=tit.cntName.offsetWidth-coVDM.ListItemMargin;

          tit.cntValue.style.top="0px";
          tit.cntValue.style.left=tit.cntName.offsetLeft+tit.cntName.offsetWidth+coVDM.ListItemMargin+"px";
          tit.cntValue.style.height=coVDM.MenuItemHeight+"px";

          tit.cntValue.style.width=tit.cntCMD.offsetLeft-tit.cntValue.offsetLeft-coVDM.ListItemMargin+"px";
          tit.cntValue.style.lineHeight=coVDM.ListItemLineHeight+"px";
          tit.colWidths.Value=tit.cntValue.offsetWidth-coVDM.ListItemMargin;
        };
        _title.Resize=function(){
          var tit=_title;
          var kpl=_kpl;
          var iWidth=tit.Parent.offsetWidth;
          tit.Container.style.height=coVDM.ListItemHeight+"px";
          tit.Container.style.width=iWidth+"px";
          tit.Gutter.style.width=coVDM.ListItemHeight+"px";
          tit.colWidths.Gutter=tit.Gutter.offsetWidth;
          if (kpl.Commands.Visible==true) {
            tit.cntCMD.style.left=iWidth-tit.cntCMD.offsetWidth-coVDM.ListItemMargin+"px";
            tit.colWidths.CMD=tit.cntCMD.offsetWidth;
          } else {
            tit.cntCMD.style.left=iWidth-coVDM.ListItemMargin+"px";
            tit.colWidths.CMD=0;
          };
          tit.cntName.style.left=tit.Gutter.offsetWidth+coVDM.ListItemMargin+"px";
          tit.cntName.style.width=kpl.Items.MaxWidthForName()+"px";
          tit.colWidths.Name=tit.cntName.offsetWidth-coVDM.ListItemMargin;

          tit.cntValue.style.left=tit.cntName.offsetLeft+tit.cntName.offsetWidth+coVDM.ListItemMargin+"px";
          tit.cntValue.style.width=tit.cntCMD.offsetLeft-tit.cntValue.offsetLeft-coVDM.ListItemMargin+"px";
          tit.colWidths.Value=tit.cntValue.offsetWidth-coVDM.ListItemMargin;
        };
        return _title;
      };
      _kpl.kplPrompt=function(){
        var _prmt=new Object();
        _prmt.Owner=_kpl;
        _prmt.Visible=false;
        _prmt.Mode=new Array();
        _prmt.Mode.Index=-1;
        _prmt.Mode.New=0;
        _prmt.Mode.Delete=1;
        _prmt.Mode.Edit=2;
        _prmt.Class=_kpl.Class+"Prompt";
        _prmt.Parent=_kpl.Container;
        _prmt.Container=document.createElement('div');
        _prmt.Parent.appendChild(_prmt.Container);
        _prmt.Container.className=_prmt.Class;
        _prmt.Views=new Array();
        _prmt.Views.New=null;
        _prmt.Views.Delete=null;
        _prmt.Views.Edit=null;
        _prmt.Show=function(){
          var pmpt=this;
          pmpt.Visible=true;
          pmpt.Container.style.visibility="visible";
        };
        _prmt.Hide=function(){
          var pmpt=this;
          var kpl=pmpt.Owner;
          pmpt.False=true;
          pmpt.Container.style.visibility="hidden";
          if (pmpt.Mode.Index!=-1){
            pmpt.Views[pmpt.Mode.Index].Hide();
            pmpt.Mode.Index=-1;
          }
          kpl.Title.setSize();
          kpl.Items.setSize();
        };
        _prmt.setMode=function(Mode){
          var pmpt=this;
          var kpl=pmpt.Owner;
          if ((pmpt.Mode.Index!=Mode) && (pmpt.Mode.Index!=-1))
            pmpt.Views[pmpt.Mode.Index].Hide();
          pmpt.Mode.Index=Mode;
          pmpt.Visible=(Mode.Index!=-1);
          var dest=null;
          switch (Mode) {
            case pmpt.Mode.New :  dest=pmpt._setPromptToNew(); break;
            case pmpt.Mode.Delete : dest=pmpt._setPromptToDelete(); break;
            case pmpt.Mode.Edit : dest=pmpt._setPromptToEdit(); break;
          };
          kpl.Items.setSize();
          return dest;
        };
        _prmt.setSize=function(){
          var pmpt=this;
          pmpt.Container.style.top="0px";
          pmpt.Container.style.left="0px";
          pmpt.Container.style.width=pmpt.Parent.clientWidth+"px";
          pmpt.Container.stle.height=pmpt.Parent.clientHeight+"px";
          if (pmpt.Mode.Index!=-1) pmpt.Views[pmpt.Mode.Index].setSize();
        };
        _prmt.Resize=function(){
          var pmpt=this;
          pmpt.Container.style.width=pmpt.Parent.clientWidth="px";
          if (pmpt.Mode.Index!=-1) pmpt.Views[pmpt.Mode.Index].Resize();
        };
        _prmt._setPromptToNew=function(){
          var pmpt=this;
          if (pmpt.Views.New==null) pmpt.Views.New=pmpt.Owner._PromptNew();
          pmpt.Views.New.Show();
          return pmpt.Views.New;
        };
        _prmt._setPromptToDelete=function(){
          var pmpt=this;
          if (pmpt.Views.Delete==null) pmpt.Views.Delete=pmpt.Owner._PromptDelete();
          pmpt.Views.Delete.Show();
          return pmpt.Views.Delete;
        };
        _prmt._setPromptToEdit=function(){
          var pmpt=this;
          if (pmpt.Views.Edit==null) pmpt.Views.Edit=pmpt.Owner._PromptEdit();
          pmpt.Views.Edit.Show();
          return pmpt.Views.Edit;
        };
        return _prmt;
      };
      _kpl._PromptEdit=function(){
        var _edt=new Object();
        _edt.Owner=_kpl;
        _edt.Class=_prmpt.Class+"Edit";
        _edt.Parent=_prmpt.Container;
        _edt.Container=document.createElement('div');
        _edt.Parent.appendChild(_edt.Container);
        _edt.Container.className=_edt.Class;

        _edt.Name=document.createElement('input');
        _edt.Container.appendChild(_edt.Name);
        _edt.Name.className=_edt.Class+"Name";
        _edt.Name.ontouchstart=function(e){
          var edt=_edt;
          var kpl=_kpl;
          edt.Name.focus();
          e.preventDefault();
          return true;
        };
        // Value may have Options
        _edt.Value=document.createElement('input');
        _edt.Container.appendChild(_edt.Value);
        _edt.Value.ontouchstart=function(e){
          var edt=_edt;
          var kpl=_kpl;
          edt.Value.focus();
          e.preventDefault();
          return true;
        };
        _edt.Value.className=_edt.Class+"Value";
        if (_edt.Owner.Options.length>0) {
          _edt.btnOptions=document.createElement('div');
          _edt.Container.appendChild(_edt.btnOptions);
          _edt.btnOptions.className=_edt.Class+"btnOptions";
          _edt.btnOptions.onclick=function(){
            var edt=_edt;
            edt.Options.style.left=edt.Value.offsetLeft+"px";
            edt.Options.style.height=edt.Value.offsetHeight+"px";
            edt.Options.style.width=edt.Value.offsetWidth+"px";
            edt.Options.style.height=edt.Value.offsetHeight+"px";
            edt.Value.style.visibility="hidden";
            edt.Options.style.visibility="visible";
          };

          _edt.Options=document.createElement('select');
          _edt.Container.appendChild(_edt.Options);
          _edt.Options.className=_edt.Class+"Options";
          _edt.Options.onchange=function(){
            var edt=_edt;
            edt.Value.value=edt.Options.value;
            edt.Options.style.visibility="hidden";
            edt.Value.style.visibility="visible";
          };
        };
        _edt.Show=function(){
          var edt=this;
          var kpl=edt.Owner;

          if (edt.Prompt.Views[edt.Prompt.Mode.New]!=null) edt.Prompt.Views[edt.Prompt.Mode.New].Container.style.visibility="hidden";
          if (edt.Prompt.Views[edt.Prompt.Mode.Delete]!=null) edt.Prompt.Views[edt.Prompt.Mode.Delete].Container.style.visibility="hidden";

          edt.Value.value=_kpl[kpl.Index].Value;
          edt.Name.value=_kpl[kpl.Index].Name;
          edt.Options.options.length=0;
          for (var iLcv=0; iLcv<_kpl.Options.length; iLcv++) {
            _edt.Options.options.push(new Option(_kpl.Options[iLcv],_kpl.Options[iLcv],false,(_kpl.Options[iLcv] == _kpl.List[kpl.Index].Value )));
          };
          _edt.Parent.Container.style.visibility="visible";
          _edt.Container.style.visibility="visible";
        };
        return _edt;
      };
      _kpl._PromptDelete=function(){
        var kpl=this;
        var _del=new Object();
        _del.Owner=kpl;
        _del.Class=_prmpt.Class+"Delete";
        _del.Parent=_prmpt.Container;
        _del.Container=document.createElement('div');
        _del.Parent.appendChild(_del.Container);
        _del.Container.className=_del.Class;
        _del.Message=document.createElement('div');
        _del.Message.className=_del.Class+"Message";
        _del.Container.appendChild(_del.Message);

        _del.cntOK=document.createElement('div');
        _del.Container.appendChild(_del.cntOK);
        _del.cntOK.className=_del.Class+"OK";
        _del.OK=document.createElement('span');
        _del.cntOK.appendChild(_del.OK);
        _del.OK.className=_del.Class+"OK";

        _del.cntCancel=document.createElement('div');
        _del.Container.appendChild(_del.cntCancel);
        _del.cntCancel.className=_del.Class+"Cancel";
        _del.Cancel=document.createElement('span');
        _del.cntCancel.appendChild(_del.Cancel);
        _del.Cancel.className=_del.Class+"Cancel";

        _del.Show=function(){
          del=this;
          var pmpt=del.Prompt;
          if (prmt.Views[prmt.Mode.New]!=null) prmt.Views[prmt.Mode.New].Container.style.visibility="hidden";
          if (prmt.Views[prmt.Mode.Edit]!=null) prmt.Views[prmt.Mode.Edit].Container.style.visibility="hidden";
          del.Parent.Container.style.visibility="visible";
          del.Container.style.visibility="visible";
        };

        kpl.Prompt.Views[kpl.Prompt.Mode.Delete]=_del;

        return _del;
      };
      _kpl._PromptNew=function(){
        var kpl=this;
        var prmt=kpl.Prompt;
        var _self=Object();
        _self.Owner=kpl;
        _self.holdItem=null;
        _self.Class=prmt.Class+"New";
        _self.Parent=prmt.Container;
        _self.Container=document.createElement('div');
        _self.Parent.appendChild(_self.Container);
        _self.Container.className=_self.Class;
        _self.Name=document.createElement('input');
        _self.Container.appendChild(_self.Name);
        _self.Name.className=_self.Class+"Name";
        _self.Name.ontouchstart=function(e){
          var self=_self;
          var kpl=_kpl;
          self.Name.focus();
          e.preventDefault();
          return true;
        };
        _self.Value=document.createElement('input');
        _self.Container.appendChild(_self.Value);
        _self.Value.className=_self.Class+"Value";
        _self.Value.ontouchstart=function(e){
          var self=_self;
          var kpl=_kpl;
          self.Value.focus();
          e.preventDefault();
          return true;
        };
        _self.btnOptions=document.createElement('div');
        _self.Container.appendChild(_self.btnOptions);
        _self.btnOptions.className=kpl.Class+"PromptOptions";
        _self.btnOptions.onclick=function(e){
          var self=_self;
          cancelEvent(e);
          self.Options.style.left=pmpt.Value.offsetLeft+"px";
          self.Options.style.height=pmpt.Value.offsetHeight+"px";
          self.Options.style.width=pmpt.Value.offsetWidth+"px";
          self.Options.style.height=pmpt.Value.offsetHeight+"px";
          self.Value.style.visibility="hidden";
          self.Options.style.visibility="visible";
        };
        _self.Options=document.createElement('select');
        _self.Container.appendChild(_self.Options);
        _self.Options.className=kpl.Class+"PromptOptions";
        _self.Options.onchange=function(e){
          var self=_self;
          cancelEvent(e);
          self.Value.value=self.Options.value;
          self.Options.style.visibility="hidden";
          self.Value.style.visibility="visible";
        };
        _self.cntOK=document.createElement('div');
        _self.Container.appendChild(_self.cntOK);
        _self.cntOK.className=kpl.Class+"PromptOK";
        _self.cntOK.onclick=function(e){
          var self=_self;
          cancelEvent(e);
          if (self.holdItem==null) {
            self.holdItem=_kpl.Items.Add(self.Name.value,self.Value.value);
          } else {
            coDOM.setText(self.holdItem.Name,self.Name.value);
            coDOM.setText(self.holdItem.Value,self.Value.value);
            _kpl.setSize();
            if (_kpl.onAddItem!=null)_kpl.onAddItem(self.holdItem);
          };
        };
        _self.OK=document.createElement('span');
        _self.cntOK.appendChild(_self.OK);
        _self.OK.className=kpl.Class+"PromptOK";
        coDOM.setText(_self.OK,"OK");
        _self.OK.onclick=_self.cntOK.onclick;
        _self.OK.style.lineHeight=coVDM.FooterLineHeight+"px";
        _self.cntCancel=document.createElement('div');
        _self.Container.appendChild(_self.cntCancel);
        _self.cntCancel.className=kpl.Class+"PromptCancel";
        _self.cntCancel.onclick=function(e){
          var self=_self;
          cancelEvent(e);
          self.Name.value="";
          self.Value.value="";
          self.Owner.Prompt.Hide();
        };
        _self.Cancel=document.createElement('span');
        _self.cntCancel.appendChild(_self.Cancel);
        _self.Cancel.className=kpl.Class+"PromptCancel";
        coDOM.setText(_self.Cancel,"Cancel");
        _self.Cancel.style.lineHeight=coVDM.FooterLineHeight+"px";
        _self.Cancel.onclick=_self.cntCancel.onclick;
        _self.Show=function(){
          var self=_self;
          var pmpt=self.Owner.Prompt;
          pmpt.Visible=true;
          pmpt.Container.style.visibility="visible";
          if (pmpt.Views[pmpt.Mode.Delete]!=null) pmpt.Views[pmpt.Mode.Delete].Hide();
          if (pmpt.Views[pmpt.Mode.Edit]!=null) pmpt.Views[pmpt.Mode.Edit].Hide();
          self.Options.options.length=0;
          for (var iLcv=0; iLcv<self.Options.length; iLcv++) {
            self.Options.options.push(new Option(self.Owner.Options[iLcv],self.Owner.Options[iLcv],false,(self.Owner.Options[iLcv] == self.Owner.List[kpl.Index].Value )));
          };
          self.Container.style.visibility="visible";
          self.Name.style.visibility="visible";
          self.Value.style.visibility="visible";
          self.btnOptions.style.visibility="visible";
          self.cntOK.style.visibility="visible";
          self.OK.style.visibility="visible";
          self.cntCancel.style.visibility="visible";
          self.Cancel.style.visibility="visible";
          self.setSize();
        };
        _self.Hide=function(){
          var self=_self;
          self.holdItem=null;
          self.Name.value="";
          self.Value.value="";
          self.Owner.Prompt.Visible=false;
          self.Owner.Prompt.Container.style.visibility="hidden";
          self.Name.style.visibility="hidden";
          self.Value.style.visibility="hidden";
          self.btnOptions.style.visibility="hidden";
          self.Container.style.visibility="hidden";
          self.Options.style.visibility="hidden";
          self.OK.style.visibility="hidden";
          self.cntOK.style.visibility="hidden";
          self.Cancel.style.visibility="hidden";
          self.cntCancel.style.visibility="hidden";
        };
        _self.setSize=function(){
          var self=_self;
          var pmpt=self.Owner.Prompt;
          var itms=self.Owner.Items;
          var iWidth=self.Owner.Container.clientWidth;
          pmpt.Container.style.top=self.Owner.Container.clientHeight-coVDM.FooterHeight+"px";
          pmpt.Container.style.height=coVDM.FooterHeight+"px";
          pmpt.Container.style.left="0px";
          pmpt.Container.style.width=iWidth+"px";

          self.Container.style.top="0px";
          self.Container.style.left="0px";
          self.Container.style.width=pmpt.Container.clientWidth+"px";
          self.Container.style.height=pmpt.Container.clientHeight+"px";


          self.cntCancel.style.top="0px";
          self.cntCancel.style.width=self.Cancel.offsetWidth+2*coVDM.ButtonMargin+"px";
          self.cntCancel.style.left=self.Container.clientWidth-self.cntCancel.offsetWidth+"px";
          self.cntCancel.style.height=self.Container.clientHeight+"px";

          self.cntOK.style.top="0px";
          self.cntOK.style.width=self.OK.offsetWidth+2*coVDM.ButtonMargin+"px";
          self.cntOK.style.left=self.cntCancel.offsetLeft-self.cntOK.offsetWidth+"px";
          self.cntOK.style.height=self.Container.clientHeight+"px";

          self.btnOptions.style.top="0px";
          self.btnOptions.style.left=self.cntOK.offsetLeft-self.btnOptions.offsetWidth+"px";
          self.btnOptions.style.height=self.Container.clientHeight+"px";

          iWidth=self.btnOptions.offsetLeft-((4*coVDM.ButtonMargin)+(2*coVDM.VDM.Browser.ButtonSpacing));
          self.Name.style.left=coVDM.ButtonMargin+"px";
          self.Name.style.width=(iWidth/2)+"px";
          self.Name.style.top=self.Container.clientHeight/2-(self.Name.offsetHeight/2)+"px";

          self.Value.style.left=self.Name.offsetLeft+self.Name.offsetWidth+coVDM.ButtonMargin+"px";
          self.Value.style.top=self.Container.clientHeight/2-(self.Value.offsetHeight/2)+"px";
          self.Value.style.width=self.btnOptions.offsetLeft-(self.Value.offsetLeft+(2*coVDM.ButtonMargin)+coVDM.VDM.Browser.ButtonSpacing)+"px";
        };
        _self.Resize=function(){
          var self=_self;
          var pmpt=self.Owner.Prompt;
          var itms=self.Owner.Items;
          pmpt.Container.style.top=self.Owner.Container.clientHeight-coVDM.FooterHeight+"px";
          pmpt.Container.style.width=self.Owner.Container.clientWidth+"px";
          self.Container.style.width=pmpt.Container.clientWidth+"px";
          self.cntCancel.style.left=self.Container.clientWidth-self.cntCancel.offsetWidth+"px";
          self.cntOK.style.left=self.cntCancel.offsetLeft-self.cntOK.offsetWidth+"px";
          self.btnOptions.style.left=self.cntOK.offsetLeft-self.btnOptions.offsetWidth+"px";
          iWidth=self.btnOptions.offsetLeft-((4*coVDM.ButtonMargin)+(2*self.VDM.Browser.ButtonSpacing));
          self.Name.style.width=(iWidth/2)+"px";
          self.Value.style.left=self.Name.offsetLeft+self.Name.offsetWidth+coVDM.ButtonMargin+"px";
          self.Value.style.width=self.btnOptions.offsetLeft-(self.Value.offsetLeft+(2*coVDM.ButtonMargin)+coVDM.VDM.Browser.ButtonSpacing)+"px";
        };
        _self.Owner.Prompt.Views[_self.Owner.Prompt.Mode.New]=_self;
        return _self;
      };
      _kpl.Title=_kpl.kplTitle();
      _kpl.Items=_kpl.kplItems();
      _kpl.Prompt=_kpl.kplPrompt();
      _kpl.Commands=_kpl.kplCommands();
      return _kpl;
  }
};
