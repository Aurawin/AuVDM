// Header located at foot of this unit

var AlphaNumeric="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

function Data(){
    this.Drag=null;
    return this;
};


function DragData(doBegin,doEnd,doDrag) {
  _dd=this;
  _dd.TopBarHeight=0;
  _dd.beginDrag=doBegin;
  _dd.endDrag=doEnd;
  _dd.doDrag=doDrag;
  _dd.Size=new Size();
  _dd.Offset=new Point();
  _dd.Start=new Location();
  _dd.Mouse=new Point();

  _dd.evtTouchStart=null;
  _dd.evtMouseDown=null;

  _dd.evtTouchMove=coEvents.Add(window,"touchmove",_dd.doDrag,coEvents.Capture,coEvents.NoActivate);
  _dd.evtTouchEnd=coEvents.Add(window,"touchend",_dd.endDrag,coEvents.Capture,coEvents.NoActivate);
  _dd.evtMouseMove=coEvents.Add(window,"mousemove",_dd.doDrag,coEvents.Capture,coEvents.NoActivate);
  _dd.evtMouseUp=coEvents.Add(window,"mouseup",_dd.endDrag,coEvents.Capture,coEvents.NoActivate);

  _dd.toString=function(){
    var dd=_dd;
    var str="";
    return str.concat(
      " Size=",dd.Size.toString(),
      " Offset=",dd.Offset.toString(),
      " Start=",dd.Start.toString(),
      " Mouse=",dd.Mouse.toString()
    );
  };
  return this;

};

const DragDropHandler={
  Handlers : function(){
    this.List=new Array();
    this.Active=null;
    this.Enable=function(Frame){
        var hndlrs=this;
        var hndlr=null;
        if (hndlrs.Handler) {
          hndlr=new hndlrs.Handler(Frame);
          hndlr.Index=hndlrs.List.push(hndlr)-1;
        };
        return hndlr;
    };
    this.Handler=function(Frame){
        var hndlr=this;
        this.Index=-1;
        this.Data=null;
        this.Screen=Frame.Screen;
        this.Frame=Frame;
        this.onMaximize=function(){
          // taskbar VDM TODO
          var hndlr=this;
          hndlr.Screen.Maximize();
        };
        this.onMinimize=function(){
          // taskbar VDM TODO
          var hndlr=this;
          hndlr.Screen.Minimize();
        };
        this.onResize=function(){
          var hndlr=this;
          hndlr.Screen.setSize();
        };
        this.onRestore=function(){
          // taskbar VDM TODO
          var hndlr=this;
          hndlr.Screen.Restore();
        };
        this.onShow=function(){
          var hndlr=this;
          hndlr.Screen.Show();
        };
        return this;
    };
    return this;
  }
};

function RGBA(r,g,b,a){
  this.Red=r;
  this.Green=g;
  this.Blue=b;
  this.Alpha=a;
  this.toString=function(){
    return "rgba(".concat(this.Red,",",this.Green,",",this.Blue,",",this.Alpha,")");
  };
};
function Sides(){
    this.Top=new Size();
    this.Bottom=new Size();
    this.Left=new Size();
    this.Right=new Size();
    return this;
};
function Corners(){
    this.TopLeft=new Size();
    this.TopRight=new Size();
    this.BottomLeft=new Size();
    this.BottomRight=new Size();
    return this;
};
function Size(Width,Height){
    if (Width==undefined) Width=0;
    if (Height==undefined) Height=0;
    var _sz=this;
    _sz.Width=Width;
    _sz.Height=Height;
    _sz.toString=function(){
      var sz=_sz;
      return "".concat(
        " Size.Width=",sz.Width,
        " Size.Height=",sz.Height
      );
    };
    return _sz;
};
function Location(){
    var _loc=this;
    _loc.Top=new Point();
    _loc.Bottom=new Point();
    _loc.toString=function(){
      var loc=_loc;
      var s="";
      return s.concat(
        " Location.Top=",loc.Top,
        " Location.Bottom=",loc.Bottom
      );
    };
    return _loc;
};
function Lock(Index){
    this.Index=Index;
    this.Locked=true;
    return this;
};

function Release(obj) {
     if (typeof(obj) != 'object') {
       return null;
     } else if (isArray(obj)==true){
       for (var iLcv=0; iLcv<obj.length; iLcv++)
         obj[iLcv]=null;
       obj.length=0;
       obj=null;
       return null;
     } else if (obj == null){
       return null;
     } else {
       if (obj.recurseRelease==true){
         for (var i in obj)
           obj[i] = Release(obj[i]);
       } else {
         for (var i in obj)
           obj[i] = null;
         obj=null;
       }
       return null;
     };
};

function Clone(obj) {
     if (typeof(obj) != 'object')
       return  obj;
     if ((obj == null) || (obj.cloneAsVar==true)) return obj;
     var subobj =  (isArray(obj)==true)? new Array() : new Object();
     for (var i in obj) {
       subobj[i] = Clone(obj[i]);
     }
     return subobj;
};

function Copy(src,dest) {
     if ((typeof(src) != 'object') && (typeof(dest)!='object')) {
       dest=src;
       return  dest;
     };
     if ((src == null) || (src.cloneAsVar==true)) return src;
     for (var i in src) {
       dest[i] = Copy(src[i],dest[i]);
     }
     return dest;
};

function Point(x,y){
  if (x==undefined) x=0;
  if (y==undefined) y=0;
  var _pt=this;
  _pt.X=x;
  _pt.Y=y;
  _pt.toString=function(){
    var pt=this;
    var sData="";
    return sData.concat(
      "point.x=", pt.X,
      "point.y=", pt.Y
    );
  };
  return _pt;
};
function TouchInfo(Owner){
    var ti=this;
    ti.Owner = (Owner==undefined)? null : Owner;
    ti.evtStart=null;
    ti.evtMove=null;
    ti.evtEnd=null;
    ti.ptStart=new Point();
    ti.dtStart=null;
    ti.ptCurrent=new Point();
    ti.dtCurrent=null;
    ti.ptEnd=new Point();
    ti.dtEnd=null;
    ti.Active=false;
    ti.ptVector=new Point();
    ti.onChanged=null;
    ti.onDone=null;
    ti.Start=function(touch){
      var ti=this;

      ti.dtStart=+new Date();
      ti.dtCurrent=+new Date();
      ti.dtEnd=null;
      ti.ptStart.X=touch.clientX;
      ti.ptStart.Y=touch.clientY;
      ti.Active=true;
      if (ti.evtMove) ti.evtMove.setActive(true);
      if (ti.evtEnd) ti.evtEnd.setActive(true);
    };
    ti.Done=function(touch){
      var ti=this;
      if (touch) {
        ti.ptEnd.X=touch.clientX;
        ti.ptEnd.Y=touch.clientY;
      } else {
        ti.ptEnd.X=ti.ptCurrent.X;
        ti.ptEnd.Y=ti.ptCurrent.Y;
      };
      ti.dtEnd=+new Date();
      ti.Active=false;
      ti.ptVector.X=ti.ptEnd.X-ti.ptStart.X;
      ti.ptVector.Y=ti.ptEnd.Y-ti.ptStart.Y;
      if (ti.evtMove) ti.evtMove.setActive(false);
      if (ti.onDone) ti.onDone();
    };
    ti.Duration=function(){
      var ti=this;
      if (ti.dtEnd) return ti.dtEnd-ti.dtStart;
      if (ti.dtCurrent) return ti.dtCurrent-ti.dtStart;
      return 0;
    };
    ti.Update=function(touch){
      var ti=this;
      ti.dtCurrent=+new Date();
      ti.ptCurrent.X=touch.clientX;
      ti.ptCurrent.Y=touch.clientY;
      ti.Active=true;
      ti.ptVector.X=ti.ptCurrent.X-ti.ptStart.X;
      ti.ptVector.Y=ti.ptCurrent.Y-ti.ptStart.Y;
      if (ti.onChanged) ti.onChanged();
    };
    ti.Release=function(){
      var ti=this;
      if (ti.evtStart) ti.evtStart.Release();
      if (ti.evtMove) ti.evtMove.Release();
      if (ti.evtEnd) ti.evtEnd.Release();
    };
    return ti;
};
function MouseInfo(){
    var mi=this;
    mi.Owner = (Owner==undefined)? null : Owner;
    mi.evtDown=null;
    mi.Owner=null;
    mi.evtMove=null;
    mi.evtUp=null;
    mi.ptStart=new Point();
    mi.dtStart=null;
    mi.ptCurrent=new Point();
    mi.dtCurrent=null;
    mi.ptEnd=new Point();
    mi.dtEnd=null;
    mi.Active=false;
    mi.Down=false;
    mi.ptVector=new Point();
    mi.onChanged=null;
    mi.onDone=null;
    mi.Start=function(e){
      var mi=this;
      mi.dtStart=+new Date();
      mi.dtCurrent=+new Date();
      mi.dtEnd=null;
      mi.ptStart.X=e.clientX;
      mi.ptStart.Y=e.clientY;
      mi.Active=true;
      if (mi.evtMove) mi.evtMove.setActive(true);
      if (mi.evtEnd) mi.evtEnd.setActive(true);
    };
    mi.Done=function(e){
      var mi=this;
      mi.dtEnd=+new Date();
      if (e){
        mi.ptEnd.X=e.clientX;
        mi.ptEnd.Y=e.clientY;
      } else {
        mi.ptEnd.X=mi.ptCurrent.X;
        mi.ptEnd.Y=mi.ptCurrent.Y;
      };
      mi.Active=false;
      mi.ptVector.X=mi.ptEnd.X-mi.ptStart.X;
      mi.ptVector.Y=mi.ptEnd.Y-mi.ptStart.Y;
      if (mi.evtMove) mi.evtMove.setActive(false);
      if (mi.onDone) mi.onDone();
    };
    mi.Duration=function(){
      var mi=this;
      if (mi.dtEnd) return mi.dtEnd-mi.dtStart;
      if (mi.dtCurrent) return mi.dtCurrent-mi.dtStart;
      return 0;
    };
    mi.Update=function(e){
      var mi=this;
      mi.dtCurrent=+new Date();
      mi.ptCurrent.X=e.clientX;
      mi.ptCurrent.Y=e.clientY;
      mi.Down=(e.which==1);
      mi.Active=true;
      mi.ptVector.X=mi.ptCurrent.X-mi.ptStart.X;
      mi.ptVector.Y=mi.ptCurrent.Y-mi.ptStart.Y;
      if (mi.onChanged) mi.onChanged();
    };
    mi.Release=function(){
      var mi=this;
      if (mi.evtStart) mi.evtStart.Release();
      if (mi.evtMove) mi.evtMove.Release();
      if (mi.evtEnd) mi.evtEnd.Release();

    };
    return mi;
};


function createTextShadow(){
  ts=new Array();

  ts.Add=function(x,y,Blur,red,green,blue,alpha){
    var ts=this;
    var itm=new Object();
    itm.Owner=ts;
    itm.X=x;
    itm.Y=y;
    itm.Blur=Blur;
    itm.Color=new RGBA(red,green,blue,alpha);
    itm.toString=function(){
      return this.X+"px "+this.Y+"px "+this.Blur+"px "+this.Color.toString();
    };
    ts.push(itm);
  };
  ts.toString=function(){
    var ts=this;
    var sStyle="";
    for (var iLcv=0; iLcv<ts.length; iLcv++){
      var itm=ts[iLcv];
      sStyle+=itm.toString()+", ";
    };
    var iLen=sStyle.length;
    if (iLen>0) sStyle=sStyle.substring(0,iLen-2);
    return sStyle;
  };
  ts.Apply=function(elm){
    elm.style.textShadow=this.toString();
  };
  ts.Clear=function(elm){
    var ts=this;
    ts.length=0;
    elm.style.textShadow="none";
  };

  return ts;
};
function Alignment(Value){
  if (Value==undefined) Value=5;
  this.Index=Value;
  this.Left= 0;
  this.Right=1;
  this.Top=2;
  this.Bottom=3;
  this.Client=4;
  this.Default=5;
  this.Center=6;
  this.setValue=function(Value){
    this.Index=Value;
  };
  this.Clone=function(Value){
    return new Alignment(Value);
  };
  return this;
};

function BoxShadow(X,Y,Blur,Spread,Color,Inset){
  if (X==undefined) X=0;
  if (Y==undefined) Y=0;
  if (Blur==undefined) Blur=0;
  if (Spread==undefined) Spread=0;
  if (Color==undefined) Color=new RGBA(0,0,0,0);
  Inset=((Inset==undefined) || (Inset==false)) ? "" : "inset";
  this.X=X;
  this.Y=Y;
  this.Blur=Blur;
  this.Spread=Spread;
  this.Color=Color;
  this.Inset=Inset;
  this.toString=function(){
    return "".concat(this.X,"px ",this.Y,"px ",this.Blur,"px ",this.Spread,"px ",this.Color.toString()," ",this.Inset);
  };
  this.enForce=function(el){
    el.style.boxShadow=this.toString();
  };
  return this;
};

function WindowState(){
    this.Closed=0;
    this.Hidden=1;
    this.Normal=2;
    this.Icon=3
    this.Full=4;
    return this;
};
function WindowPosition(){
    this.TopLeft=0;
    this.TopCenter=1;
    this.Center=2;
    this.Full=3;
    this.Top=4;
    this.Bottom=5;
    this.Default=6;
    return this;
};
function ComponentState(){
  this.None=0;
  this.Design=1;
  this.Loading=3;
  this.Loaded=4;
  return this;
};

function Version(aMajor,aMinor,aMicro,aBuild){
  var _vers=this;
  if (typeof(aMajor)=="string") aMajor=Utils.parseInt(aMajor);
  if (typeof(aMinor)=="string") aMinor=Utils.parseInt(aMinor);
  if (typeof(aMicro)=="string") aMicro=Utils.parseInt(aMicro);
  if (typeof(aBuild)=="string") aBuild=Utils.parseInt(aBuild);
  this.Major = aMajor;
  this.Minor = aMinor;
  this.Micro = aMicro;
  this.Build = aBuild;
  this.set=function(aMaj,aMin,aMic,aBld){
    if (typeof(aMaj)=="string") aMaj=Utils.parseInt(aMaj);
    if (typeof(aMin)=="string") aMin=Utils.parseInt(aMin);
    if (typeof(aMic)=="string") aMic=Utils.parseInt(aMic);
    if (typeof(aBld)=="string") aBld=Utils.parseInt(aBld);
    if (aMaj) _vers.Major=aMaj;
    if (aMin) _vers.Minor=aMin;
    if (aMic) _vers.Micro=aMic;
    if (aBld) _vers.Build=aBld;
  };
  return this;
};
function Vendor(aOrganization, aCopyright, aPatents) {
  var _vndr=this;
  this.Organization=aOrganization;
  this.Copyright=aCopyright;
  this.Patents=aPatents;
  this.set=function(aOrg,aCopy,aPat){
    if (aOrg) _vndr.Organization=aOrg;
    if (aCopy) _vndr.Copyright=aCopy;
    if (aPat) _vndr.Patents=aPatents;
  };
  return this;
};
function Title( aLongName,aShortName){
  var _tit=this;
  this.Long=aLongName;
  this.Short=aShortName;
  this.set=function(aLongName,aShortName){
    if (aLongName) _tit.Long=aLongName;
    if (aShortName) _tit.Short=aShortName;
  };
  return this;
};

function Orientation(){
  this.Portrait=0;
  this.Landscape=1;
  this.Current=this.Portrait;
  return this;
};function Version(aMajor,aMinor,aMicro,aBuild){
  var _vers=this;
  if (typeof(aMajor)=="string") aMajor=Utils.parseInt(aMajor);
  if (typeof(aMinor)=="string") aMinor=Utils.parseInt(aMinor);
  if (typeof(aMicro)=="string") aMicro=Utils.parseInt(aMicro);
  if (typeof(aBuild)=="string") aBuild=Utils.parseInt(aBuild);
  this.Major = aMajor;
  this.Minor = aMinor;
  this.Micro = aMicro;
  this.Build = aBuild;
  this.set=function(aMaj,aMin,aMic,aBld){
    if (typeof(aMaj)=="string") aMaj=Utils.parseInt(aMaj);
    if (typeof(aMin)=="string") aMin=Utils.parseInt(aMin);
    if (typeof(aMic)=="string") aMic=Utils.parseInt(aMic);
    if (typeof(aBld)=="string") aBld=Utils.parseInt(aBld);
    if (aMaj) _vers.Major=aMaj;
    if (aMin) _vers.Minor=aMin;
    if (aMic) _vers.Micro=aMic;
    if (aBld) _vers.Build=aBld;
  };
  return this;
};
function Vendor(aOrganization, aCopyright, aPatents) {
  var _vndr=this;
  this.Organization=aOrganization;
  this.Copyright=aCopyright;
  this.Patents=aPatents;
  this.set=function(aOrg,aCopy,aPat){
    if (aOrg) _vndr.Organization=aOrg;
    if (aCopy) _vndr.Copyright=aCopy;
    if (aPat) _vndr.Patents=aPatents;
  };
  return this;
};
function Title( aLongName,aShortName){
  var _tit=this;
  this.Long=aLongName;
  this.Short=aShortName;
  this.set=function(aLongName,aShortName){
    if (aLongName) _tit.Long=aLongName;
    if (aShortName) _tit.Short=aShortName;
  };
  return this;
};

function Orientation(){
  this.Portrait=0;
  this.Landscape=1;
  this.Current=this.Portrait;
  return this;
};

function cancelEvent(e,Value){
  if (!Value) var Value=true;
  if (e) {
    e.cancelBubble=true;
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    e.returnValue=Value;
    return true;
  } else {
    return true;
  }
};
function BorderRadius(aTopLeft,aTopRight,aBottomLeft,aBottomRight){
  var r=this;
  if (aTopLeft==undefined) aTopLeft=0;
  if (aTopRight==undefined) aTopRight=0;
  if (aBottomLeft==undefined) aBottomLeft=0;
  if (aBottomRight==undefined) aBottomRight=0;
  r.cloneAsVar=true;
  r.recurseRelease=false;
  r.Loaded=false;
  r.TopLeft=aTopLeft;
  r.TopRight=aTopRight;
  r.BottomLeft=aBottomLeft;
  r.BottomRight=aBottomRight;
  r.Assign=function(rB){
    this.TopLeft=rB.TopLeft;
    this.TopRight=rB.TopRight;
    this.BottomLeft=rB.BottomLeft;
    this.BotomRight=rb.BottomRight;
  };
  r.Load=function(itm){
    this.TopLeft=Utils.parseInt($(itm).css("border-top-left-radius"));
    this.TopRight=Utils.parseInt($(itm).css("border-top-right-radius"));
    this.BottomLeft=Utils.parseInt($(itm).css("border-bottom-left-radius"));
    this.BottomRight=Utils.parseInt($(itm).css("border-bottom-right-radius"));
    this.Loaded=true;
  };
  r.enForce=function(n){
    n.style.borderTopLeftRadius=this.TopLeft+"px";
    n.style.borderTopRightRadius=this.TopRight+"px";
    n.style.borderBottomLeftRadius=this.BottomLeft+"px";
    n.style.borderBottomRightRadius=this.BottomRight+"px";
  };
  return r;
};
function BorderColor(aTop,aLeft,aRight,aBottom){
  var r=this;
  if (aTop==undefined) aTop=new RGBA(0,0,0,0);
  if (aLeft==undefined) aLeft=new RGBA(0,0,0,0);
  if (aRight==undefined) aRight=new RGBA(0,0,0,0);
  if (aBottom==undefined) aBottom=new RGBA(0,0,0,0);
  r.cloneAsVar=true;
  r.recurseRelease=false;
  r.Loaded=false;
  r.Top=aTop;
  r.Left=aLeft;
  r.Right=aRight;
  r.Bottom=aBottom;
  r.Assign=function(rB){
    this.Top=rB.Top;
    this.Left=rB.Left;
    this.Right=rB.Right;
    this.Botom=rb.Bottom;
  };
  r.enForce=function(n){
    n.style.borderTopColor=this.Top.toString();
    n.style.borderLeftColor=this.Left.toString();
    n.style.borderRightColor=this.Right.toString();
    n.style.borderBottomColor=this.Bottom.toString();
  };
  return r;
};
function Border(
  aTop,aLeft,aRight,aBottom,
  rTopLeft,rTopRight,rBottomLeft,rBottomRight,
  cTop,cLeft,cRight,cBottom
){
  var _b=this;
  if (aTop==undefined) aTop=0;
  if (aLeft==undefined) aLeft=0;
  if (aRight==undefined) aRight=0;
  if (aBottom==undefined) aBottom=0;
  if (rTopLeft==undefined) rTopLeft=0;
  if (rTopRight==undefined) rTopRight=0;
  if (rBottomLeft==undefined) rBottomLeft=0;
  if (rBottomRight==undefined) rBottomRight=0;
  if (cTop==undefined) cTop=RGBA(0,0,0,0);
  if (cLeft==undefined) cLeft=RGBA(0,0,0,0);
  if (cRight==undefined) cRight=RGBA(0,0,0,0);
  if (cBottom==undefined) cBottom=RGBA(0,0,0,0);
  _b.cloneAsVar=true;
  _b.recurseRelease=false;
  _b.Loaded=false;
  _b.Top = aTop;
  _b.Left = aLeft;
  _b.Right = aRight;
  _b.Bottom = aBottom;
  _b.Style="solid";
  _b.Radius=new BorderRadius(rTopLeft,rTopRight,rBottomLeft,rBottomRight);
  _b.Color=new BorderColor(cTop,cLeft,cRight,cBottom);
  _b.Assign=function(aB){
    var b=this;
    b.Top=aB.Top;
    b.Left=aB.Left;
    b.Right=aB.Right;
    b.Bottom=aB.Bottom;
    b.Radius.Assign(ab.Radius);
    b.Color.Assign(ab.Color);
  };
  _b.Load=function(itm){
    this.Left=Utils.parseInt($(itm).css("border-left-width"));
    this.Right=Utils.parseInt($(itm).css("border-right-width"));
    this.Top=Utils.parseInt($(itm).css("border-top-width"));
    this.Bottom=Utils.parseInt($(itm).css("border-bottom-width"));
    this.Radius.Load(itm);
    this.Loaded=true;
  };
  _b.xBias=function(){
    return this.Left+this.Right;
  };
  _b.yBias=function(){
    return this.Top+this.Bottom;
  };
  _b.enForce=function(itm){
    itm.style.borderStyle=this.Style;
    itm.style.borderLeftWidth=this.Left+"px";
    itm.style.borderRightWidth=this.Right+"px";
    itm.style.borderTopWidth=this.Top+"px";
    itm.style.borderBottomWidth=this.Bottom+"px";
    this.Radius.enForce(itm);
    this.Color.enForce(itm);
  };
  _b.Clone=function(){
    var b=this;
    var aB= new Border();
    aB.Assign(b);
    return aB;
  };
  _b.Free=function(){
    return Release(this);
  };
  return _b;
};
function Margin(aTop,aLeft,aRight,aBottom){
  if (aTop==undefined) aTop=0;
  if (aLeft==undefined) aLeft=0;
  if (aRight==undefined) aRight=0;
  if (aBottom==undefined) aBottom=0;

  var _m=this;
  _m.cloneAsVar=true;
  _m.recurseRelease=false;
  _m.Loaded=false;
  _m.Top = aTop;
  _m.Left = aLeft;
  _m.Right = aRight;
  _m.Bottom = aBottom;
  _m.Assign=function(aM){
    this.Top=aM.Top;
    this.Left=aM.Left;
    this.Right=aM.Right;
    this.Bottom=aM.Bottom;
  };
  _m.Load=function(itm){
    this.Left=Utils.parseInt($(itm).css("margin-left"));
    this.Right=Utils.parseInt($(itm).css("margin-right"));
    this.Top=Utils.parseInt($(itm).css("margin-top"));
    this.Bottom=Utils.parseInt($(itm).css("margin-bottom"));
    this.Loaded=true;
  };
  _m.xBias=function(){
    return _m.Left+_m.Right;
  };
  _m.yBias=function(){
    return _m.Top+_m.Bottom;
  };
  _m.enForce=function(itm){
    itm.style.marginLeft=this.Left+"px";
    itm.style.marginRight=this.Right+"px";
    itm.style.marginTop=this.Top+"px";
    itm.style.marginBottom=this.Bottom+"px";
  };
  _m.Clone=function(){
    var aM= new Margin();
    aM.Assign(_m);
    return aM;
  };
  _m.Free=function(){
    return Release(this);
  };
  return _m;
};
function Padding(aTop,aLeft,aRight,aBottom){
  if (aTop==undefined) aTop=0;
  if (aLeft==undefined) aLeft=0;
  if (aRight==undefined) aRight=0;
  if (aBottom==undefined) aBottom=0;

  var _p=this;
  _p.cloneAsVar=true;
  _p.recurseRelease=false;
  _p.Loaded=false;
  _p.Top = aTop;
  _p.Left = aLeft;
  _p.Right = aRight;
  _p.Bottom = aBottom;
  _p.SetAll=function(value){
    this.Top=value;
    this.Left=value;
    this.Right=value;
    this.Bottom=value;
  };
  _p.Assign=function(aP){
    this.Top=aP.Top;
    this.Left=aP.Left;
    this.Right=aP.Right;
    this.Bottom=aP.Bottom;
  };
  _p.Load=function(itm){
    this.Left=Utils.parseInt($(itm).css("padding-left"));
    this.Right=Utils.parseInt($(itm).css("padding-right"));
    this.Top=Utils.parseInt($(itm).css("padding-top"));
    this.Bottom=Utils.parseInt($(itm).css("padding-bottom"));
    this.Loaded=true;
  };
  _p.xBias=function(){
    return this.Left+this.Right;
  };
  _p.yBias=function(){
    return this.Top+this.Bottom;
  };
  _p.enForce=function(itm){
    itm.style.paddingLeft=this.Left+"px";
    itm.style.paddingRight=this.Right+"px";
    itm.style.paddingTop=this.Top+"px";
    itm.style.paddingBottom=this.Bottom+"px";
  };
  _p.Clone=function(){
    var aP= new Padding();
    aP.Assign(this);
    return aP;
  };
  _p.Free=function(){
    return Release(this);
  };
  return _p;
};

function Position() {
  var _p=this;
  _p.Top=0;
  _p.Left=0;
  _p.Width=0;
  _p.Height=0;
  _p.Loaded=false;
  _p.Load=function(el){
    this.Top=el.offsetTop;
    this.Left=el.offsetLeft;
    this.Width=el.offsetWidth;
    this.Height=el.offsetHeight;
  };
  _p.loadClient=function(el){
    this.Top=el.clientTop;
    this.Left=el.clientLeft;
    this.Width=el.clientWidth;
    this.Height=el.clientHeight;
    this.Loaded=true;
  };
  _p.loadCSS=function(itm){
    var sValue=$(itm).css("left");
    this.Left=(sValue.length>0) ? Utils.parseInt(sValue) : null;
    sValue=$(itm).css("top");
    this.Top=(sValue.length>0) ? Utils.parseInt(sValue) : null;
    sValue=$(itm).css("width");
    this.Width=(sValue.length>0) ? Utils.parseInt(sValue) : null;
    sValue=$(itm).css("height");
    this.Height=(sValue.length>0) ? Utils.parseInt(sValue) : null;
    this.Loaded=true;
  };
  _p.enForce=function(el) {
    el.style.top=(this.Top!=null) ? this.Top+"px" : "";
    el.style.left=(this.Left!=null) ? this.Left+"px" : "";
    el.style.width=(this.Width!=null) ? this.Width+"px" : "";
    el.style.height=(this.Height!=null) ? this.Height+"px" : "";
  };
  _p.Assign=function(p){
    this.Top=p.Top;
    this.Left=p.Left;
    this.Height=p.Height;
    this.Width=p.Width;
  };
  _p.Clone=function(){
    var aP= new Position();
    aP.Assign(_p);
    return aP;
  };
  _p.Free=function(){
    return Release(this);
  };
  return _p;
};

function makeID(sID){
  var iLcv=0;
  var sEl=sID;
  var el=document.getElementById(sEl);
  while (el!=null) {
    iLcv+=1;
    var sEl=sID+iLcv;
    var el=document.getElementById(sEl);
  };
  return sEl;
};

function isArray(obj){
  return (Array.isArray) ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';
};

function Placement(){
  var _p=this;

  _p.Top=0;
  _p.Left=0;
  _p.Right=0;
  _p.Bottom=0;

  _p.Mode=new Object();
  _p.Mode.Default=0
  _p.Mode.Center=1;
  _p.Mode.Full=2;
  _p.Mode.TopLeft=3;
  _p.Mode.TopLeftRight=4;
  _p.Mode.TopRight=5;
  _p.Mode.TopCenter=6;
  _p.Mode.BottomRight=7;
  _p.Mode.BottomLeft=8;
  _p.Mode.RightCenter=9;

  _p.Mode.Value=_p.Mode.Default;

  _p.Mode.setFull=function(){
    this.Value=this.Full;
  };
  _p.Mode.setDefault=function(){
    this.Value=this.Default;
  };
  _p.Mode.setTopCenter=function(){
    this.Value=this.TopCenter;
  };
  _p.Mode.setTopLeftRight=function(){
    this.Value=this.TopLeftRight;
  };
  _p.Mode.setTopRight=function(){
    this.Value=this.TopRight;
  };
  _p.Mode.setBottomRight=function(){
    this.Value=this.BottomRight;
  };
  _p.Mode.setBottomLeft=function(){
    this.Value=this.BottomLeft;
  };
  _p.Mode.setCenter=function(){
    this.Value=this.Center;
  };
  _p.Mode.setTopLeft=function(){
    this.Value=this.TopLeft;
  };
  _p.Mode.setRightCenter=function(){
    this.Value=this.RightCenter;
  };
  _p.Enforce=function(elm){
    switch (this.Mode.Value) {
      case (this.Mode.TopLeft) :
        var pElm=elm.offsetParent;
        elm.style.left=this.Left+"px";
        elm.style.top=this.Top+"px";
        break;
      case (this.Mode.TopLeftRight) :
        var pElm=elm.offsetParent;
        elm.style.left=this.Left+"px";
        elm.style.top=this.Top+"px";
        elm.style.width=pElm.clientWidth-(this.Left+this.Right)+"px";
        break;
      case (this.Mode.TopRight) :
        var pElm=elm.offsetParent;
        elm.style.right=this.Right+"px";
        elm.style.top=this.Top+"px";
        break;
      case (this.Mode.BottomRight) :
        var pElm=elm.offsetParent;
        elm.style.right=this.Right+"px";
        elm.style.bottom=this.Bottom+"px";
        elm.style.left="";
        elm.style.top="";
        break;
      case (this.Mode.Center) :
        var pElm=elm.offsetParent;
        var iTop=Math.round((pElm.clientHeight-elm.offsetHeight)/2);
        var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
        elm.style.left=iLeft+"px";
        elm.style.top=iTop+"px";
        break;
      case (this.Mode.TopCenter) :
        var pElm=elm.offsetParent;
        elm.style.top=this.Top+"px";
        var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
        elm.style.left=iLeft+"px";
        break;
      case (this.Mode.Full) :
        var pElm=elm.offsetParent;

        elm.style.top=this.Top+"px";
        elm.style.left=this.Left+"px";
        elm.style.width=pElm.clientWidth-this.Right+"px";
        elm.style.height=pElm.clientHeight-this.Bottom+"px";

        break;
    };

  };
  _p.Free=function(){
    var _p=this;
    _p.Mode=null;
    _p.Top=null;
    _p.Left=null;
    _p.Right=null;
    _p.Bottom=null;
    _p.Enforce=null;
    _p.Free=null;
    _p=null;
    return null;
  };
};
function Credentials (sDomain,sUser,sPass,sAuth){
  this.Domain=sDomain;
  this.User=sUser;
  this.Pass=sPass;
  this.Auth=sAuth;
  this.RemoteIP=0;
  this.ResourceID=0;
  this.getResource=function(){
    var rc=coResource.List.DB.getItemById(this.ResourceID);
    return (rc)? rc.MAP.Name.Vale : "";
  };
  this.getEmail=function(){
    var creds=this;
    return creds.User+"@"+creds.Domain;
  };
  return this;
};
function WebWorker(src){
  var ww=(typeof(Worker)!='undefined')? new Worker(src) : new Object();
  return ww;
};

function createParser(){
  var p=Objects.createNew("Parser");
  
  if (typeof(DOMParser)!='undefined') {
    p.XML=new DOMParser();
    p.Parse=function(sXML){
      return this.XML.parseFromString(sXML,"text/xml");
    };
  } else if (typeof(ActiveXObject)!='undefined') {
    p.XML=new ActiveXObject("Microsoft.XMLDOM");
    p.Parse=function(sXML){
      this.XML.loadXML(sXML);
      return this.XML;
    };
  };
  return p;
};

