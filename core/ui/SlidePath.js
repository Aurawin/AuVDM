coAppUI.App.Components.SlidePath = {
  Version        : new Version(2013,5,19,3),
  Title          : new Title("Aurawin Slide Path","Path"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/SlidePath.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function(sName,sClass,Screen,Slides,Owner,Parent,Align) {
    if (Align==undefined) Align=coAppUI.Alignment.Client;
    var _sp=Slides.createSlide(sName,sClass,Screen,Owner,Parent,Align);
    _sp.Visible=false;
    _sp.Clearing=false;
    _sp.recurseRelease=false;
    _sp.cloneAsVar=true;
    _sp.Visible=false;
    _sp.DataSet=null;
    _sp.Client=Frame.Client;
    _sp.Header=document.createElement('div');
    _sp.Container.appendChild(_sp.Header);
    _sp.Header.className=sClass+"Header";
    coDOM.setText(_sp.Header,"Path");
    _sp.Header.style.position="inline-block";
    _sp.Items=new coList.treeList();
    _sp.Items.Container=document.createElement('div');
    _sp.Container.appendChild(_sp.Items.Container);
    _sp.Items.Container.className=sClass+"Items";
    _sp.Items.onDeleteItem=function(itm){
      itm.Container.removeChild(itm.Icon);
      itm.Container.removeChild(itm.Caption);
      _sp.Container.removeChild(itm.Container);
      itm.Icon=null;
      itm.Caption=null;
      itm.Container=null;
    };
    _sp.Items.onAddItem=function(itm){
      itm.Container=document.createElement('div');
      _sp.Container.addChild(itm.Container);
      itm.Container.className=_sp.Class+"Item";
      itm.Container.style.position="inline-block";
      itm.Icon=document.createElement('div');
      itm.Container.appendChild(itm.Icon);
      itm.Icon.className=_sp.Class+"Icon";
      itm.Icon.style.position="inline";
      itm.Caption=document.createElement('div');
      itm.Container.appendChild(itm.Caption);
      itm.Caption.className=_sp.Class+"Caption";
      itm.Caption.style.position="inline-block";
      coDOM.setText(itm.Caption,itm.Value);
    };
    _sp.onShow=function(){
      _sp.Header.style.visibility="visible";
      _sp.Items.Container.style.visibility="visible";
    };
    _sp.onHide=function(){
      _sp.Header.style.visibility="hidden";
      _sp.Items.Container.style.visibility="hidden";
    };
    _sp.onSetSize=function(){
      _sp.Header.style.width=_sp.Container.clientWidth-coUtils.xBias(_sp.Header)+"px";
      _sp.Header.style.height=_sp.Container.clientHeight-coUtils.yBias(_sp.Header)+"px";
    };
    return _sp;
  }
};

