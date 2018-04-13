UI.IconBar = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  Compiled       : false,
  init:function(){
    this.Initialized=true;
    UI.Controls.Add(this);  
  },
  Create         : function(sName,VDM,Parent){
    var _ib=new object();
    _ib.cloneAsVar=true;
    _ib.recurseRelease=false;
    _ib.Parent=Parent;
    _ib.Class="IconBar";
    _ib.Owner=VDM;
    _ib.VDM=VDM;
    _ib.Items=null;
    _ib.Container=document.createElement('div');
    _ib.Parent.appendChild(_ib.Container);
    _ib.Container.className=sClass;
    _ib._createKind=function(){
      var _knd=new Object();
      _knd.cloneAsVar=false;
      _knd.recurseRelease=true;
      _knd.Index=0;
      _knd.Icon=0;
      _knd.Menu=1;
      _knd.Clock=2;
      _knd.setValue=function(value){
        var knd=_knd;
        knd.Index=value;
      };
      _knd.Clone=function(){
        var itm=_ib._createKind();
        itm.Index=_knd.Index;
        return itm;
      };
      _knd.Free=function(){
        var knd=_knd;
        _knd=coUtils.Release(knd);
        return null;
      };
      return knd;
    };
    _ib._createMenu=function(){
      var _mnu=new Object();

      return _mnu;
    };
    _ib._createItems=function(){
      var ib=_ib;
      var _itms=new Array();
      _itms.Class=ib.Class+"Items";
      _itms.Parent=ib.Container;
      _itms.Owner=ib;
      _itms.Container=document.createElement('div');
      _itms.Parent.appendChild(_itms.Container);
      _itms.Container.className=_itms.Class;
      _itms._createItem=function(Widget){
        var itms=_itms;
        var ib=_ib;
        var _itm=new Object();
        _itm.Class=ib.Class+"Item";
        _itm.Widget=Widget;
        _itm.Container=document.createElement('div');
        itms.Container.appendChild(_itm.Container);
        _itm.Container.className=_itm.Class;
        _itm.Icon=document.createElement('div');
        _itm.Container.appendChild(_itm.Icon);
        _itm.Icon.className=_itm.Class+"Icon";
        _itm.doClick=function(e){
          var itm=_itm;
          cancelEvent(e);
          itm.Widget.Frame.Restore();
          return true;
        };
        _itm.Container.onclick=_itm.doClick;
        _itm.Free=function(){
          var itms=_itms;
          var itm=_itm;
          itm.Container.removeChild(itm.Icon);
          itms.Container.removeChild(itm.Container);

          _itm=coUtils.Release(itm);
          return null;
        };
        return itm;
      };
      return _itms;
    };
    _ib.Free=function(){
      var ib=_ib;
      ib.Items.Free();
      _ib=coAppUtls.Release(ib);
      return null;
    };
    return _ib;
  }
};
