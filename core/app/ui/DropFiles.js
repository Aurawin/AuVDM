UI.DropFiles = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  Compiled       : false,
  init:function(){
    this.Initialized=true;
    UI.Controls.Add(this);  
  },
  Create         : function (sName,sClass,sCaption,Screen,Slides,Owner,Parent,Align){
    if (sCaption==undefined) sCaption=coLang.Table.DragDrop.Files.Dropbox;
    if (Align==undefined) Align=coAppUI.Alignment.Center;
    var _df=Slides.createSlide(sName,sClass+" screenBoxShadow",Screen,Owner,Parent,Align);
    _df.onRefresh=null;
    _df.zIndex=coVDM.DropFilesZIndex;
    _df.Class=sClass;
    _df._Free=_df.Free;
    _df.Folder=null;
    _df.Network=null;
    _df.Owner.DropFiles=_df;
    _df.Parent.DropFiles=_df;
    _df.evtDropFiles=coEvents.Add(
      Parent,
      "dragover",
      function(e){
        this.DropFiles.Reveal();
      },
      coEvents.NoCapture,
      coEvents.Active
    );
    _df.createInputForm=function(){
      var df=this;
      var ipf=coObject.Create();

      ipf.Class="InputForm";
      ipf.Parent=df.Container;
      ipf.Owner=df;
      ipf.Button=df.Nav.SelectFile;

      ipf.Form=document.createElement('form');
      ipf.Button.Container.appendChild(ipf.Form);

      ipf.Form.style.position="relative";
      ipf.Form.style.width="0px";
      ipf.Form.style.cursor="default";
      ipf.Form.style.MozUserSelect="none";
      ipf.Form.style.webkitUserSelect="none";
      ipf.Form.style.userSelect="none";

      ipf.Input=document.createElement('input');
      ipf.Input.type="file";
      //ipf.Input.setAttribute("type","file");


      ipf.Input.style.overflow="hidden";
      ipf.Input.style.position="absolute";
      ipf.Input.style.MozUserSelect="none";
      ipf.Input.style.webkitUserSelect="none";
      ipf.Input.style.userSelect="none";
      ipf.Input.style.top="2px";
      ipf.Input.style.width="0px";
      ipf.Input.style.cursor="default";
      ipf.Input.style.opacity=0;
      ipf.Input.style.zIndex=1;
      ipf.Input.Owner=ipf;

      ipf.Form.appendChild(ipf.Input);


      ipf.Input.onclick=function(e){
        var ipf=this.Owner;
        var df=ipf.Owner;
        ipf.Form.reset();
      };
      ipf.Input.onchange=function(e){
        var ipf=this.Owner;
        var df=ipf.Owner;
        var fls=this.files;
        df.Caption.style.visibility="hidden";
        for (var iLcv=0; iLcv<fls.length; iLcv++){
          var fl=fls[iLcv];
          var itm=df.createItem(fl,fl.name,fl.size,coTheme.Icons.Associated.getIcon(fl.name),coAppUI.allowClose);
          itm.Show();
          itm.Reader.readAsDataURL(fl);
        };
      };
      ipf.SelectFile=function(){
        var ipf=this;
        var df=ipf.Owner;
        if (df.Location.length==0) return;
        ipf.Input.select();
        ipf.Input.click();
      };
      ipf.Hide=function(){
        ipf=this;
        ipf.Form.reset();
        ipf.Caption
        ipf.Form.style.visibility="hidden";
        ipf.Input.style.visibility="hidden";
      };
      ipf.Show=function(){
        var ipf=this;
        var btn=ipf.Button.Container;
        ipf.Form.style.visibility="visible";
        ipf.Form.style.top=-(btn.clientHeight-2)+"px";
        ipf.Form.style.width=btn.offsetWidth+"px";
        ipf.Form.style.height=btn.clientHeight+"px";
        ipf.Input.style.visibility="visible";
        ipf.Input.style.width=btn.clientWidth-4+"px";
        ipf.Input.style.height=btn.clientHeight-4+"px";
        ipf.Input.style.top="2px";
        ipf.Input.style.left="0px";
      };
      ipf.Free=function(){
        var ipf=this;
        ipf.Form.removeChild(ipf.Input);
        ipf.Button.Container.removeChild(ipf.Form);
        ipf=coObject.Release(ipf);
        return null;
      };
      return ipf;
    };

    _df.Client=document.createElement('div');
    _df.Container.appendChild(_df.Client);
    _df.Client.className=_df.Class+"Client";

    _df.Caption=document.createElement('div');
    _df.Client.appendChild(_df.Caption);
    _df.Caption.className=_df.Class+"Caption";

    _df.onFileDropped=null;
    _df.Selected=null;
    _df.Location="";

    _df.Files=new Array();
    _df.Files.Owner=_df;
    _df.Files.Container=document.createElement('div');
    _df.Files.Parent=_df.Client;
    _df.Files.Parent.appendChild(_df.Files.Container);
    _df.Files.Container.className=_df.Class+"List";
    _df.Files.Loading=false;
    _df.Files.Show=function(){
      var lst=this;
      lst.Container.tabIndex=1;
      lst.Container.style.visibility="visible";
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var f=lst[iLcv];
        if (f.Hidden==false){
          f.Show();
        };
      };
    };
    _df.Files.Hide=function(){
      var lst=this;
      lst.Container.tabIndex=0;
      lst.Container.style.visibility="hidden";
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var f=lst[iLcv];
        f.Hide();
      };
    };
    _df.Files.Clear=function(){
      var lst=this;
      var df=lst.Owner;
      df.Files.Loading=true;
      var iLcv=0;
      while (iLcv<df.Files.length){
        var f=df.Files[iLcv];
        if (f.Loading==true) {
          f.FreeOnLoad=true;
          iLcv+=1
        } else{
          f.Free();
        };
      };
      df.Files.length=0;
    };
    _df.Files.Free=function(){
      var lst=this;
      var df=lst.Owner;
      df.Clear();
      lst.Parent.removeChild(lst.Container);
      df.Files=coObject.Release(lst);
    };
    _df.vScroll=coAppUI.App.Components.vScroll.Create("vScroll",Screen.Frame,_df,_df.Client,_df.Client);
    _df.hideCaption=function(){
      var df=this;
      df.Caption.style.display="none";
      df.Caption.style.visibility="hidden";
    };
    _df.showCaption=function(){
      var df=this;
      var sCaption=(df.Location.length==0)? coLang.Table.Apps.Uploader.SelectLocation  : coLang.Table.DragDrop.Files.Dropbox;
      coDOM.setText(df.Caption,sCaption);
      df.Caption.style.display="block";
      df.Caption.style.visibility="visible";
    };
    _df.createItem=function(aFile,sFileName,iFileSize,urlIcon,allowRemove){
      if (iFileSize==undefined) iFileSize=0;
      if (allowRemove==undefined) allowRemove=false;
      var df=this;
      var f=coObject.Create();
      f.File=aFile;
      f.Visible=false;
      f.Hidden=false;
      f.Selected=false;
      f.Loading=false;
      f.FreeOnLoad=false;
      f.AllowRemove=(allowRemove==true);
      f.Class=df.Class+"File";
      f.Parent=df.Files.Container;
      f.Size=iFileSize;
      f.Owner=df;
      f.Data=null;
      f.Reader=null;
      f.Writer=null;
      f.onSelect=null;
      f.onRemove=null;

      f.Container=document.createElement('div');
      f.Parent.appendChild(f.Container);
      f.Container.className=f.Class;
      f.Container.Owner=f;

      f.Decore=document.createElement('div');
      f.Container.appendChild(f.Decore);
      f.Decore.className=f.Class+"Deco";
      f.Decore.Owner=f;

      // decore is the item wrapper

      // Icon
      f.Icon=document.createElement('div');
      f.Decore.appendChild(f.Icon);
      f.Icon.className=f.Class+"Icon";
      f.Icon.style.backgroundImage="url("+urlIcon+")";
      f.Icon.Owner=f;
      // Stats is the wrapper for statistics and info
      f.Stats=document.createElement('div');
      f.Decore.appendChild(f.Stats);
      f.Stats.className=f.Class+"Stats";
      f.Stats.Owner=f;
      // Incoming File
      f.statsName=document.createElement('div');
      f.statsName.Owner=f;
      f.Stats.appendChild(f.statsName);
      f.statsName.className=f.Class+"StatsName";
      coDOM.setText(f.statsName,"");
      // Destination
      f.statsDest=document.createElement('div');
      f.statsDest.Owner=f;
      f.Stats.appendChild(f.statsDest);
      f.statsDest.className=f.Class+"StatsDest";
      // Name :
      f.statsDestName=document.createElement('div');
      f.statsDestName.Owner=f;
      f.statsDest.appendChild(f.statsDestName);
      f.statsDestName.className=f.Class+"StatsDestName";
      coDOM.setText(f.statsDestName,coLang.Table.Labels.Location);
      // Value
      f.statsDestVal=document.createElement('div');
      f.statsDestVal.Owner=f;
      f.statsDest.appendChild(f.statsDestVal);
      f.statsDestVal.className=f.Class+"StatsDestVal";
      coDOM.setText(f.statsDestVal,"");
      // Size
      f.statsSize=document.createElement('div');
      f.statsSize.Owner=f;
      f.Stats.appendChild(f.statsSize);
      f.statsSize.className=f.Class+"StatsSize";
      // Name :
      f.statsSizeName=document.createElement('div');
      f.statsSizeName.Owner=f;
      f.statsSize.appendChild(f.statsSizeName);
      f.statsSizeName.className=f.Class+"StatsSizeName";
      coDOM.setText(f.statsSizeName,coLang.Table.Labels.Size);
      // Value
      f.statsSizeVal=document.createElement('div');
      f.statsSizeVal.Owner=f;
      f.statsSize.appendChild(f.statsSizeVal);
      f.statsSizeVal.className=f.Class+"StatsSizeVal";
      coDOM.setText(f.statsSizeVal,"0 bytes");

      f.Button=document.createElement('div');
      f.Decore.appendChild(f.Button);
      f.Button.className=f.Class+"Button";

      f.Close=document.createElement('div');
      f.Button.appendChild(f.Close);
      f.Close.className=f.Class+"Close";
      f.Close.Owner=f;
      coDOM.setText(f.Close,"x");

      f.Progress=coAppUI.App.Components.ProgressIcon.Create(f,f.Icon);


      f.Reader=new FileReader();
      f.Reader.Owner=f;
      f.Reader.onloadstart=function(e){
        var f=this.Owner;
        if (!f) return;
        var vw=f.Owner;

        f.Loading=true;
        f.Progress.maxValue=e.total;
        f.Progress.setProgress(0);
        if (vw.Visible==true){
          f.Progress.Hidden=false;
          f.Progress.Show();
        };
        if (vw.Visible==true) {
          if (vw.onRefresh) vw.onRefresh(df);
        };
      };
      f.Reader.onerror=function(e){
        var f=this.Owner;
        if (!f) return;
        var vw=f.Owner;
        f.Loading=false;
        f.setErrored();
        if (vw.onFileError) vw.onFileError(f);
        if (f.FreeOnLoad==true) f.Free();
      };
      f.Reader.onloadend=function(e){
        var f=this.Owner;
        if (!f) return;
        var vw=f.Owner;
        vw.Uploaded=true;
        f.Progress.setProgress(0);
        f.Progress.Hidden=true;
        f.Loading=false;
        f.Progress.Hide();
        if (vw.Visible==true) {
          if (vw.onFileDropped) vw.onFileDropped(f);
          if (vw.onRefresh) vw.onRefresh(df);
        };
        if (f.FreeOnLoad==true) f.Free();
      };
      f.Reader.onprogress=function(e){
        var f=this.Owner;
        if (!f) return;
        f.Progress.setProgress(e.loaded);
      };
      f.setCaption=function(sCaption){
        var f=this;
        coDOM.setText(f.statsName,sCaption);
        f.Container.title=sCaption;
      };
      f.getCaption=function(){
        var f=this;
        return coDOM.getText(f.statsName);
      };
      f.setSize=function(iSize){
        var f=this;
        coDOM.setText(f.statsSizeVal,coUtils.intToStr(iSize)+" "+coLang.Table.Units.Bytes);
      };
      f.setLocation=function(sLoc){
        var f=this;
        coDOM.setText(f.statsDestVal,sLoc);
      };
      f.setIcon=function(sIconURL){
        var f=this;
        f.Icon.style.backgroundImage="url("+sIconURL+")";
      };
      f.Decorate=function(){
        var f=this;
        var idx=f.Owner.Files.indexOf(f);
        f.Close.style.display=(f.AllowRemove==true) ? "inline-block" : "none";
        f.Container.className=f.Class + (f.Selected==true) ? "Sel" : "";
      };
      f.Select=function(){
        var f=this;
        var df=f.Owner;
        var fs=df.Selected;
        if (fs==f) return;

        if ( (fs!=f) && (fs!=null) ) {
          fs.Selected=false;
          fs.Decorate();
          df.Selected=null;
        };
        df.Selected=f;
        f.Selected=true;
        f.Decorate();
        if (f.onSelect)
          f.onSelect(f);
      };
      f.Decore.ontouchstart=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var cntr=coDOM.currentTarget(e);
        var f=cntr.Owner;
        f.Select();
      };
      f.Close.ontouchstart=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var cntr=coDOM.currentTarget(e);
        var f=cntr.Owner;
        if (f.onClose) f.onClose(tab);
        f.Free();
      };
      f.Container.onmouseover=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var cntr=coDOM.currentTarget(e);
        var f=cntr.Owner;
        f.Select();
      };
      f.Container.onclick=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var cntr=coDOM.currentTarget(e);
        var f=cntr.Owner;
        f.Select();
      };
      f.Close.onclick=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var cntr=coDOM.currentTarget(e);
        var f=cntr.Owner;
        if (f.Loading==true) {
          try {
            f.Reader.abort();
          } catch(err){

          };
        };
        var df=f.Owner;
        if (f.onClose) f.onClose(tab);
        f.Free();
        df.Caption.style.visibility=(df.Files.length==0) ? "visible" : "hidden";
      };
      f.setVisibility=function(sVis){
        var f=this;
        f.Container.style.visibility=sVis;
        f.Decore.style.visibility=sVis;
        f.Icon.style.visibility=sVis;
        f.Close.style.visibility=sVis;
        f.Button.style.visibility=sVis;
        f.Stats.style.visibility=sVis;
        f.statsName.style.visibility=sVis;
        f.statsDest.style.visibility=sVis;
        f.statsDestName.style.visibility=sVis;
        f.statsDestVal.style.visibility=sVis;
        f.statsSize.style.visibility=sVis;
        f.statsSizeName.style.visibility=sVis;
        f.statsSizeVal.style.visibility=sVis;
      };
      f.setErrored=function(){
        var f=this;
        f.setIcon(coTheme.Icons.Error);
        f.Progress.setProgress(100);
        f.Progress.Container.style.backgroundColor="red";
      };
      f.Show=function(){
        var f=this;
        f.Visible=true;
        f.Container.style.display="";
        var idx=f.Owner.Files.indexOf(f);
        f.Container.style.backgroundColor=((idx%2)==0 ) ? coVDM.ListItemAlternateEven : coVDM.ListItemAlternateOdd;
        f.setVisibility("visible");
        f.Progress.setSize(f.Icon.clientWidth,f.Icon.clientHeight);
        f.Progress.Show();
        f.Decorate();
      };
      f.Hide=function(){
        var f=this;
        f.Visible=false;
        f.Container.style.display="none";
        f.setVisibility("hidden");
        f.Progress.Hide();
      };
      f.Free=function(){
        var f=this;
        f.Hide();
        f.Reader.Owner=null;
        f.Progress.Free();
        var df=f.Owner;
        if (df.Selected==f)
          df.Selected=null;
        var idx= df.Files.indexOf(f);
        if (idx!=-1)
          df.Files.splice(idx,1);
        if (df.Files.length==0) {
            df.showCaption();
        } else {
          df.hideCaption();
        };
        f.statsSize.removeChild(f.statsSizeVal);
        f.statsSize.removeChild(f.statsSizeName);
        f.Stats.removeChild(f.statsSize);
        f.statsDest.removeChild(f.statsDestVal);
        f.statsDest.removeChild(f.statsDestName);
        f.Stats.removeChild(f.statsDest);
        f.Stats.removeChild(f.statsName);
        f.Button.removeChild(f.Close);
        f.Decore.removeChild(f.Stats);
        f.Decore.removeChild(f.Button);
        f.Decore.removeChild(f.Icon);

        f.Container.removeChild(f.Decore);
        f.Parent.removeChild(f.Container);

        f=coObject.Release(f);
        return null;
      };
      sLoc= ((!df.Location) || (df.Location.length==0)) ? coLang.Table.Apps.Uploader.SelectLocation : df.Location;
      f.setLocation(sLoc);
      f.setCaption(sFileName);
      f.setSize(iFileSize);
      df.Files.push(f);
      return f;
    };
    _df.setCaption=function(sCaption){
      var df=this;
      coDOM.setText(df.Caption,sCaption);
    };
    _df.getCaption=function(){
      var df=this
      return coDOM.getText(df.Caption);
    };

    _df.doDragEnter=function(e){
      var df=this;
      df.Caption.style.visibility="hidden";
    };
    _df.setNetwork=function(net){
      df=this;
      df.Network=net;
    };
    _df.setLocation=function(sLoc){
      var df=this;
      var ipf=df.inputForm;
      df.Location=sLoc;
      if (df.Visible==true) {
        ipf.Input.disabled=(sLoc.length==0);
        if (df.Files.length==0){
          df.showCaption();
        } else {
          df.hideCaption();
        };
      };
    };
    _df.doDragDrop=function(e){
      if (e==undefined) e=window.event;
      coDOM.preventDefault(e);
      var df=this;
      var fls=e.dataTransfer.files;
      df.Caption.style.visibility="hidden";
      for (var iLcv=0; iLcv<fls.length; iLcv++){
        var fl=fls[iLcv];
        var itm=df.createItem(fl,fl.name,fl.size,coTheme.Icons.Associated.getIcon(fl.name),coAppUI.allowClose);
        itm.Show();
        itm.Reader.readAsArrayBuffer(fl);
      };
    };
    _df.Container.ondragover=function(e){
      var df=_df;
      coDOM.preventDefault(e);
      df.Caption.style.visibility="hidden";
    };
    _df.Client.ondragleave=function(e){
      var df=_df;
      coDOM.preventDefault(e);
      if (df.Location.length==0) return;
      if (e.target!=df.Caption)
        df.Caption.style.visibility=(df.Files.length==0) ? "visible" : "hidden";
    };
    _df.Client.ondragover=function(e){
      var df=_df;
      coDOM.preventDefault(e);
      if (df.Location.length==0) return;
      df.Caption.style.visibility="hidden";
    };
    _df.Client.ondragenter=function(e){
      var df=_df;
      coDOM.preventDefault(e);
      if (df.Location.length==0) return;
      df.doDragEnter(e);
      df.Caption.style.visibility="hidden";
    };
    _df.Container.ondrop=function(e){
      var df=_df;
      if (df.Location.length==0) return;
      df.doDragDrop(e);
      coDOM.preventDefault(e);
    };
    _df.Client.ondrop=function(e){
      var df=_df;
      coDOM.preventDefault(e);
      if (df.Location.length==0) return;
      df.doDragDrop(e);
    };
    _df.Client.onmouseout=function(e){
      var df=_df;
      var sel=df.Selected;
      if (sel) {
        sel.Selected=false;
        sel.Decorate();
        df.Selected=null;
      };
    };
    _df.onFocus=function(){
      var df=this;
      if (df.Files.length==0){
        df.showCaption();
      } else {
        df.hideCaption();
      };
    };
    _df.onShow=function(){
      var df=this;
      df.Uploaded=false;
      if (df.Files.length==0){
        df.showCaption();
      } else {
        df.hideCaption();
      };
      df.inputForm.Input.disabled=(df.Location.length==0);
      df.Client.style.visibility="visible";
      df.inputForm.Show();
      df.Files.Show();
    };
    _df.onHide=function(){
      var df=this;
      df.Client.style.visibility="hidden";
      df.Caption.style.visibility="hidden";
      df.Caption.style.display="none";
      df.Files.Clear();
      df.Files.Hide();
    };
    _df.onSetSize=function(){
      var df=this;
      df.Client.style.height=df.Container.clientHeight-df.Nav.Container.offsetHeight+"px";
    };
    _df.onResize=function(){
      var df=this;
      df.Client.style.height=df.Container.clientHeight-df.Nav.Container.offsetHeight+"px";
    };
    _df.SelectFile=function(){
      var df=this;
      df.Show();
      df.inputForm.SelectFile();
    };
    _df.Free=function(){
      var df=this;
      df.Files.Free();
      df.inputForm.Free();
      df.Client.removeChild(df.Caption);
      df.Container.removeChild(df.Client);
      df=df._Free();
      return null;
    };
    _df.setCaption(sCaption);
    _df.Nav=coAppUI.App.Components.Nav.Create("Menu","Nav",_df,_df.Slides,_df.Frame,_df.Container);
    _df.Nav.Home=_df.Nav.Items.addItem(
      _df.Nav.itemKind.Button,"Home",coLang.Table.Buttons.Done,
      _df.Nav.oAutoShowOn,
      _df.Nav.oCascadeChildren,
      _df.Nav.oAddToShowList,
      _df.Nav.oSetAsDefaultOff,
      _df.Nav.NoTarget,
      _df.Nav.NoSlide,
      _df.Nav.NoShowList,
      _df.Nav.NoHideList,
      _df.Nav.NoReturn,
      function(navItem){
        var df=navItem.Nav.Screen;
        df.Conseal();
      }
    );
    _df.Nav.SelectFile=_df.Nav.Items.addItem(
      _df.Nav.itemKind.Button,"SelectFile",coLang.Table.Buttons.Browse,
      _df.Nav.oAutoShowOn,
      _df.Nav.oCascadeChildren,
      _df.Nav.oAddToShowList,
      _df.Nav.oSetAsDefaultOff,
      _df.Nav.NoTarget,
      _df.Nav.NoSlide,
      _df.Nav.NoShowList,
      _df.Nav.NoHideList,
      _df.Nav.NoReturn,
      function(navItem){
        var df=navItem.Nav.Screen;
        df.SelectFile();
      }
    );
    _df.inputForm=_df.createInputForm();
    return _df;
  }
};
