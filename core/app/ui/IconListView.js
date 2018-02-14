coAppUI.App.Components.IconListView = {
  Version        : new Version(2014,9,3,65),
  Title          : new Title("Aurawin Icon List View","IconListView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/IconListView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  executeDelay   : 500,
  loadPause      : 500,
  maxProcessLoad : 2,
  maxCacheItems  : 5,
  Create         : function(sName,sCaption,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Client;

    var _il=Slides.createSlide(sName,sName+"IconList IconList",Screen,Owner,Parent,Align);
    _il.Class="IconList";
    _il.Clearing=false;
    _il.recurseRelease=false;
    _il.cloneAsVar=true;
    _il.Title=null;
    _il.Window=null;
    _il.Mode=null;
    _il.oneActExecute=false;
    _il.touchLocked=false;
    _il.onDoubleClick=null;
    _il.onSelected=null;
    _il.selectOnHover=true;
    _il.DataSet=null;
    _il.setDataSet=function(ds){
      var il=this;
      il.Items.Clear();
      il.DataSet=ds;
    };
    _il.createViewMode=function(){
      var _vm=new Object();
      _vm.recurseRelease=true;
      _vm.cloneAsVar=true;
      _vm.Values=new Object();
      _vm.Values.Index=2;
      _vm.Values.Tiny=0;
      _vm.Values.Small=1;
      _vm.Values.Medium=2;
      _vm.Values.Large=3;
      _vm.Values.Larger=4;
      _vm.Values.ExtraLarge=5;
      _vm.Values.Largest=6;
      _vm.Values.Custom=7;
      _vm.Size=new Array(6);
      _vm.Size[0]=24;
      _vm.Size[1]=32;
      _vm.Size[2]=54;
      _vm.Size[3]=80;
      _vm.Size[4]=128;
      _vm.Size[5]=256;
      _vm.Size[6]=512;
      _vm.Size[7]=1024;
      _vm.Size.Value=_vm.Size[_vm.Values.Index];
      _vm.setTiny=function(){
        var vm=this;
        vm.Values.Index=vm.Values.Tiny;
        vm.Size.Value=vm.Size[vm.Values.Index];
      };
      _vm.setSmall=function(){
        var vm=this;
        vm.Values.Index=vm.Values.Small;
        vm.Size.Value=vm.Size[vm.Values.Index];
      };
      _vm.setMedium=function(){
        var vm=this;
        vm.Values.Index=vm.Values.Medium;
        vm.Size.Value=vm.Size[vm.Values.Index];
      };
      _vm.setLarge=function(){
        var vm=this;
        vm.Values.Index=vm.Values.Large;
        vm.Size.Value=vm.Size[vm.Values.Index];
      };
      _vm.setLarger=function(){
        var vm=this;
        vm.Values.Index=vm.Values.Larger;
        vm.Size.Value=vm.Size[vm.Values.Index];
      };
      _vm.setExtraLarge=function(){
        var vm=this;
        vm.Values.Index=vm.Values.ExtraLarge;
        vm.Size.Value=vm.Size[vm.Values.Index];
      };
      _vm.setLargest=function(){
        var vm=this;
        vm.Values.Index=vm.Values.Largest;
        vm.Size.Value=vm.Size[vm.Values.Index];
      };
      _vm.setValue=function(Mode){
        var vm=this;
        vm.Values.Index=Mode;
        vm.Size.Value=vm.Size[Mode];
      };
      _vm.Release=function(){
        var vm=this;
        vm=Release(vm);
        return null;
      };
      return _vm;
    };
    _il._createTitleBar=function(sCaption){
      var il=this;
      var _tb=new Object();
      this.Title=_tb;
      _tb.recurseRelease=false;
      _tb.cloneAsVar=true;
      _tb.Visible=true;
      _tb.Owner=il;
      _tb.Hidden=false;
      _tb.Parent=il.Container;
      _tb.Class=il.Class+"Title";
      _tb.Container=document.createElement('div');
      _tb.Parent.appendChild(_tb.Container);
      _tb.Container.className=_tb.Class;
      _tb.Caption=document.createElement('div');
      _tb.Container.appendChild(_tb.Caption);
      _tb.Caption.className=_tb.Class+"Caption";
      _tb.Decore=document.createElement('div');
      _tb.Container.appendChild(_tb.Decore);
      _tb.Decore.className=_tb.Class+"Decore";

      _tb.Description=document.createElement('div');
      _tb.Decore.appendChild(_tb.Description);
      _tb.Description.className=_tb.Class+"Description";
      _tb.setSize=function(){
        this.Container.style.left="0px";
        this.Container.style.top="0px";
        this.Container.style.width=this.Parent.clientWidth+"px";
      };
      _tb.Conseal=function(){
        this.Hidden=true;
        this.Hide();
        this.Container.style.display="none";
      };
      _tb.Reveal=function(){
        this.Hidden=false;
        this.Container.style.display="block";
        this.Show();
      };
      _tb.Show=function(){
        this.Visible=true;
        this.Container.style.visibility="visible";
        this.Caption.style.visibility="visible";
        this.Decore.style.visibility="visible";
        this.Description.style.visibility="visible";
      };
      _tb.Hide=function(){
        this.Visible=false;
        this.Container.style.visibility="hidden";
        this.Caption.style.visibility="hidden";
        this.Decore.style.visibility="hidden";
        this.Description.style.visibility="hidden";
      };
      _tb.Release=function(){
        this.Decore.removeChild(this.Description);
        this.Container.removeChild(this.Decore);
        this.Container.removeChild(this.Caption);
        this.Parent.removeChild(tb.Container);

        Release(this);
        return null;
      };
      if ( (sCaption!=undefined) && (sCaption.length>0)){
        coDOM.setText(_tb.Caption,sCaption);
      } else{
        _tb.Conseal();
      };
      return _tb;
    };
    _il._createWindow=function(Frame){
      var il=this;
      _wd=new Object();
      il.Window=_wd;
      _wd.Class=il.Name+"Window " + il.Class+"Window";
      _wd.xBias=0;
      _wd.yBias=0;
      _wd.recurseRelease=false;
      _wd.cloneAsVar=true;
      _wd.Visible=true;
      _wd.Owner=il;
      _wd.Parent=il.Container;
      _wd.Container=document.createElement('div');
      _wd.Parent.appendChild(_wd.Container);
      _wd.Container.className=_wd.Class;
      _wd.Container.Owner=_wd;
      _wd.Margin=new Margin();
      _wd.Padding=new Padding();
      _wd.Border=new Border();
      _wd.Margin.Load(_wd.Container);
      _wd.Padding.Load(_wd.Container);
      _wd.Border.Load(_wd.Container);
      coDOM.clearMargins(_wd.Container);
      _wd.Release=function(){
        this.Owner.Window=null;
        Release(this);
        return null;
      };
      _wd.setSize=function(){
        var il=this.Owner;
        var wd=this;
        var tb=wd.Owner.Title;
        wd.xBias=wd.Margin.xBias()+wd.Border.xBias()+wd.Padding.xBias();
        wd.yBias=wd.Margin.yBias()+wd.Border.yBias()+wd.Padding.yBias();
        wd.Container.style.left=wd.Margin.Left+"px";
        wd.Container.style.top=tb.Container.offsetTop+tb.Container.offsetHeight+wd.Margin.Top+"px";
        wd.Container.style.width=wd.Parent.clientWidth-wd.xBias+"px";
        wd.Container.style.height=wd.Parent.clientHeight-wd.Container.offsetTop-(wd.yBias-wd.Margin.Top)+"px";
      };
      _wd.Show=function(){
        var wd=this;
        wd.Visible=true;
        wd.Container.style.visibility="visible";
        wd.setSize();
      };
      _wd.Hide=function(){
        var wd=this;
        wd.Visible=false;
        wd.Container.style.visibility="hidden";
      };
      return _wd;
    };
    _il._createItems=function(){
      var il=this;
      var wd=il.Window;
      var _itms=new Array();
      _itms.recurseRelease=false;
      _itms.cloneAsVar=true;
      _itms.Visible=false;
      _itms.Clearing=false;
      _itms.Class=il.Class+"Items";
      _itms.Owner=il;
      _itms.Selected=null;
      _itms.Parent=wd.Container;
      _itms.itmPadding=new Padding();
      _itms.decoPadding=new Padding();
      _itms.itmMargin=new Margin();
      _itms.decoMargin=new Margin();

      _itms._createLoader=function(){
        var itms=this;
        ldr=coObject.Create("ilLoader");
        ldr.maxLoad=coAppUI.App.Components.IconListView.maxProcessLoad;
        ldr.Owner=this;
        ldr.List=new Array();

        ldr._createCache=function(){
          var ldr=this;
          var c=coObject.Create("ilCache");
          c.List=new Array(coAppUI.App.Components.IconListView.maxCacheItems);
          c.getUnloaded=function(){
            var c=this;
            for (var iLcv=0; iLcv<c.List.length; iLcv++){
              if (c.List[iLcv].Loading==false)
                return  c.List[iLcv];
            };
            return null;
          };
          for (var iLcv=0; iLcv<coAppUI.App.Components.IconListView.maxCacheItems; iLcv++){
            var img=c.List[iLcv]=new Image();
            img.Loading=false;
            img.Owner=ldr;
            img.Item=null;
            img.Parent=ldr.Owner.Parent;
            img.Parent.appendChild(img);
            img.style.display="none";
            img.style.position="absolute";
            img.style.visibility="hidden";
            img.URI="";
            img.Load=function(Item,sURI){
              var img=this;
              if (img.Loading==false) {
                img.style.display="block";
                img.Item=Item;
                img.URI=sURI;
                img.src=sURI;
                img.Loading=true;
              };
            };
            img.onerror=function(){
              try {
                this.Loading=false;
                this.Item.Icon.style.backgroundImage="url("+coTheme.Icons.Error+")";
                this.Item.Torus.Stop();
              } catch (err) {

              };
              this.URI=null;
              this.Item=null;
              this.style.display="none";
            };
            img.onabort=function(){
              try {
                this.Item.Torus.Stop();
              } catch (err) {
              };
              this.Loading=false;
              this.style.display="none";
              this.URI=null;
              this.Item=null;
            };
            img.onload=function(){
              try {
                this.Item.Icon.style.backgroundImage="url("+this.URI+")";
                this.Item.Torus.Stop();
              } catch (err) {

              };
              this.style.display="none";
              this.URI=null;
              this.Item=null;
              this.Loading=false;
            };
          };
          return c;
        };
        ldr.onItemLoaded=function(itm){return null};
        ldr.tiLoad=coApp.Timers.createItem(coAppUI.App.Components.IconListView.loadPause);
        ldr.tiLoad.Owner=ldr;
        ldr.tiLoad.AutoReset=true;
        ldr.Add=function(itm){
          var ldr=this;
          ldr.Active=true;
          ldr.List.push(itm);
          ldr.tiLoad.setActive(true);
        };
        ldr.Clear=function(){
          var ldr=this;
          ldr.Active=false;
          ldr.tiLoad.setActive(false);
          ldr.List.length=0;
        };
        ldr.tiLoad.onExecute=function(tmr){
          var ldr=tmr.Owner;
          var itms=ldr.Owner;
          var iMax=ldr.maxLoad;
          var iLcv=0;
          var ci=ldr.Cache.getUnloaded();
          while (  (iLcv<iMax) && (iLcv<ldr.List.length) && (ci!=null) ){
            var itm=ldr.List[iLcv];
            if (itm) {
              var sURI=ldr.onItemLoaded(itm);
              if ( (sURI) && (sURI.length>0))
                ci.Load(itm,sURI);
              ldr.List.splice(iLcv,1);
            } else {
              ldr.List.splice(iLcv,1);
            };
            ci=ldr.Cache.getUnloaded();
          };
          if (ldr.List.length==0) tmr.setActive(false);
        };
        ldr.Free=function(){
          var ldr=this;
          ldr.List.length=0;
          ldr.tiLoad=ldr.tiLoad.Free();
          ldr=coObject.Release(ldr);
          return null;
        };
        ldr.Cache=ldr._createCache();
        return ldr;
      };
      _itms.getItemByData=function(Data){
        var il=this.Owner;
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          if (itm.Data==Data) return itm;
        };
        return null;
      };
      _itms.createItem=function(sCaption,sImage,Data){
        var il=this.Owner;
        var itms=this;
        var _itm=new Object();
        _itm.recurseRelease=false;
        _itm.Slide=il;
        _itm.Data=Data;
        _itm.cloneAsVar=true;
        _itm.Visible=false;
        _itm.Owner=itms;
        _itm.Class=il.Class+"Item";
        _itm.Parent=itms.Parent;
        _itm.Container=document.createElement('div');
        _itm.Container.className=_itm.Class;
        _itm.Parent.appendChild(_itm.Container);
        _itm.Wrap=document.createElement('div');
        _itm.Container.appendChild(_itm.Wrap);
        _itm.Wrap.className=_itm.Class+"Wrap";
        _itm.Icon=document.createElement('div');
        _itm.Wrap.appendChild(_itm.Icon);
        _itm.Icon.className=_itm.Class+"Icon";
        if ( (sImage) && (sImage.length>0) )
          _itm.Icon.style.backgroundImage="url("+sImage+")";
        _itm.Decore=document.createElement('div');
        _itm.Wrap.appendChild(_itm.Decore);
        _itm.Decore.className=_itm.Class+"Decore";
        _itm.Caption=document.createElement('div');
        _itm.Decore.appendChild(_itm.Caption);
        _itm.Caption.className=_itm.Class+"Caption";
        coDOM.setText(_itm.Caption,sCaption);
        _itm.Indicator=coAppUI.App.Components.Indicator.Create("Indicator","IconListItemIndic8r",_itm,_itm.Container);
        _itm.Torus=coAppUI.App.Components.Torus.Create(Screen.Frame,_itm,_itm.Container,"inline-block");
        _itm.Torus.Container.className=_itm.Class+"Torus";
        _itm.Torus.Placement.Mode.setDefault();
        if (itms.itmPadding.Loaded==false)
          itms.itmPadding.Load(_itm.Caption);
        if (itms.itmMargin.Loaded==false)
          itms.itmMargin.Load(_itm.Caption);
        if (itms.decoPadding.Loaded==false)
          itms.decoPadding.Load(_itm.Decore);
        if (itms.decoMargin.Loaded==false)
          itms.decoMargin.Load(_itm.Decore);


        _itm.doExecute=function(){
          var itm=this;
          il=itm.Owner.Owner;
          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("IconListItem.doExecute (Torus)");
          if (itm.onDoubleClick) {
            itm.Torus.Start();
            setTimeout(
              function(){
                if (coAppUI.debugToConsole==true)
                  coVDM.VDM.Console.Append("IconListItem.doExecute (Callback)");
                itm.onDoubleClick(itm);
                itm.Torus.Stop();
              },
              coAppUI.App.Components.IconListView.executeDelay
            )
          } else if (il.onDoubleClick) {
            il.onDoubleClick(itm);
          };
        };
        _itm.doDoubleClick=function(e){
          var itm=this;
          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("IconListItem.doDoubleClick");
          if (!e) e=window.event;
          coDOM.preventDefault(e);
          itm.doExecute();
        };
        _itm.doMouseUp=function(e){
          var itm=this;
          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("IconListItem.doMouseUp");
          if (!e) e=window.event;
          coDOM.preventDefault(e);
          itm.Select();
          if (itm.Slide.oneActExecute==true)
            itm.doExecute();
        };
        _itm.doHover=function(e){
          var itm=this;
          var sl=itm.Slide;

          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("IconListItem.doHover");
          if (!e) e=window.event;
          coDOM.preventDefault(e);
          if (sl.selectOnHover==true)
            itm.Select();
        };
        _itm.doTouchStart=function(e){
          var itm=this;
          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("IconListItem.doTouchStart");
          if (!e) e=window.event;
          //coDOM.preventDefault(e);
          itm.Select();
          var il=itm.Owner.Owner;
          il.touchLocked=false;
        };
        _itm.doTouchEnd=function(e){
          var itm=this;
          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("IconListItem.doTouchEnd");
          if (!e) e=window.event;
          //coDOM.preventDefault(e);
          var il=itm.Owner.Owner;
          if (il.touchLocked==false)
            itm.doExecute();
          il.touchLocked=false;
        };
        _itm.doTouchMove=function(e){
          var itm=this;
          if (coAppUI.debugToConsole==true)
            coVDM.VDM.Console.Append("IconListItem.doTouchMove");
          if (!e) e=window.event;
          //coDOM.preventDefault(e);
          var il=itm.Owner.Owner;
          il.touchLocked=true;
        };
        _itm.evtHover=coEvents.Add(_itm.Container,"mouseover",function(e){_itm.doHover(e);},coEvents.Capture,coEvents.Active);
        _itm.evtDoubleClick=coEvents.Add(_itm.Container,"dblclick",function(e){_itm.doDoubleClick(e);},coEvents.Capture,coEvents.Active);
        _itm.evtMouseUp=coEvents.Add(_itm.Container,"mouseup",function(e){_itm.doMouseUp(e);},coEvents.Capture,coEvents.Active);
        _itm.evtTouchEnd=coEvents.Add(_itm.Container,"touchend",function(e){_itm.doTouchEnd(e);},coEvents.Capture,coEvents.Active);
        _itm.evtTouchStart=coEvents.Add(_itm.Container,"touchstart",function(e){_itm.doTouchStart(e);},coEvents.NoCapture,coEvents.Active);
        _itm.evtTouchMove=coEvents.Add(_itm.Container,"touchmove",function(e){_itm.doTouchMove(e);},coEvents.Capture,coEvents.Active);
        _itm.setSize=function(){
          var iVal=this.Owner.Owner.Mode.Size.Value+"px";
          this.Icon.style.width=iVal;
          this.Icon.style.height=iVal;
        };
        _itm.Resize=function(){
        };
        _itm.Select=function(){
          var itm=this;
          var itms=itm.Owner;
          var lv=itms.Owner;
          if ((itms.Selected)&& (itms.Selected))
            itms.Selected.Container.className=itm.Class;
          itms.Selected=itm;
          itm.Container.className=itm.Class+"Selected";

          if (lv.onSelected) lv.onSelected(itm);
        };
        _itm.Show=function(){
          var itm=this;
          itm.Visible=true;
          itm.Wrap.style.visibility="visible";
          itm.Icon.style.visibility="visible";
          itm.Decore.style.visibility="visible";
          itm.Container.style.visibility="visible";
        };
        _itm.Hide=function(){
          var itm=this;
          itm.Visible=false;
          itm.Wrap.style.visibility="hidden";
          itm.Icon.style.visibility="hidden";
          itm.Decore.style.visibility="hidden";
          itm.Container.style.visibility="hidden";
        };
        _itm.Release=function(){
          var itm=this;
          var itms=itm.Owner;

          if (itm.Owner.Clearing==false){
            var idx=itms.indexOf(itm);
            if (idx!=-1)
              itms.splice(idx,1);
          };
          itm.Torus.Free();
          itm.Container.EventList.Free();
          itm.Decore.removeChild(itm.Caption);
          itm.Wrap.removeChild(itm.Decore);
          itm.Wrap.removeChild(itm.Icon);
          itm.Container.removeChild(itm.Wrap);

          itm.Parent.removeChild(itm.Container);

          itm.Torus=null;
          itm.Data=null;
          itm.Owner=null;
          itm.Parent=null;
          _itm=Release(itm);
          return null;
        };
        _itm.setSize();
        _itm.Owner.push(_itm);
        _itm.Owner.Loader.Add(_itm);
        return _itm;
      };
      _itms.Clear=function(){
        var itms=this;
        itms.Selected=null;
        itms.Clearing=true;
        itms.Loader.Clear();
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          itms[iLcv]=itm.Release();
        };
        itms.length=0;
        itms.Clearing=false;
      };
      _itms.setSize=function(){
        var itms=this,itm=null;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          itm=itms[iLcv];
          itm.setSize();
        };
      };
      _itms.Resize=function(){};
      _itms.Show=function(){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          itm.Show();
        };
      };
      _itms.Hide=function(){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          itm.Hide();
        };
      };
      _itms.Loader=_itms._createLoader();
      _itms.Release=function(){
        var itms=this;
        itms.Clear();
        _itms=Release(itms);
        return null;
      };
      return _itms;
    };
    _il.Torus=coAppUI.App.Components.Torus.Create(
      Screen.Frame,
      _il,
      _il.Container,"block"
    );
    _il.Mode=_il.createViewMode();
    _il._createTitleBar(sCaption);
    _il._createWindow(Screen.Frame);
    _il.Items=_il._createItems();
    _il.doSetSize=function(){
      var il=this;
      il.Title.setSize();
      il.Window.setSize();
      if (il.Mode.Values.Index==il.Mode.Values.Custom){
        var iBias=il.Items.itmPadding.xBias()+il.Items.itmMargin.xBias();
        iBias+=il.Window.Padding.xBias()+il.Window.Padding.xBias();
        setTimeout(
          function(){
            il.Mode.Size.Value=il.Mode.Size[il.Mode.Values.Custom]=il.Window.Container.clientWidth-iBias;
            il.Items.setSize();
          },
          1000
        );
      };
    };
    _il.SyncItem=function(dbItem){
      var il=this;
    };
    _il.SyncClear=function(){
      var il=this;
      il.Items.Clear();
    };
    _il.PartialSynchronize=function(info){
      var il=this;
    };
    _il.SyncDone=function(){
      var il=this;
    };

    _il.onHide=function(){
      var il=this;
      il.Title.Hide();
      il.Items.Hide();
      il.Window.Hide();
    };
    _il.onShow=function(){
      var il=this;
      il.doSetSize();
      il.Window.setSize();
      il.Title.Show();
      il.Items.Show();
      il.Window.Show();
    };
    _il.Release=function(){
      var il=this;
      il.Mode=il.Mode.Release();
      il.Title=il.Title.Release();
      il.Items=il.Items.Release();
      il.Window=il.Window.Release();
      _il=Release(il);
      return null;
    };
    return _il;
  }
};
