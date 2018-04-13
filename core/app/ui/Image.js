UI.Image = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  Compiled       : false,
  init:function(){
    this.Initialized=true;
    UI.Controls.Add(this);  
  },
  createStyle    : function(Owner){
    s=coObject.Create(coObject.relInline,coObject.cpyAsVar,"Style");
    s.Owner=Owner;
    s.None=0;
    s.Contain=1;
    s.Cover=2;
    s.Value=s.Contain;
    s.setValue=function(Value){
      var s=this;
      switch (Value) {
        case (s.None)    : s.Value=Value; break;
        case (s.Contain)    : s.Value=Value; break;
        case (s.Cover)    : s.Value=Value; break;
      };
      s.Apply();
    };
    s.Apply=function(){
      var s=this;
      var sValue="";
      switch (Value) {
        case (s.None)    : sValue=""; break;
        case (s.Contain) : sValue="contain"; break;
        case (s.Cover)   : sValue="cover"; break;
      };
      s.Owner.style.backgroundSize=sValue;
    };
    s.Free=function(){
      var s=this;
      s=coObject.Release(s);
      return null;
    };
    return s;
  },
  createKind     : function(Owner){
    k=coObject.Create(coObject.relInline,coObject.cpyAsVar,"Kind");
    k.Owner=Owner;
    k.None=0;
    k.TopLeft=1;
    k.TopRight=2;
    k.Center=3;
    k.BottomLeft=4;
    k.BottomRight=5;
    k.Value=k.None;

    k.setValue=function(Value){
      var k=this;
      switch (Value) {
        case (k.None)    : k.Value=Value; break;
        case (k.TopLeft) : k.Value=Value; break;
        case (k.TopRight) : k.Value=Value; break;
        case (k.Center): k.Value=Value; break;
        case (k.BottomLeft) : k.Value=Value; break;
        case (k.BottomRight): k.Value=Value; break;
      };
      k.Apply();
    };
    k.Apply=function(){
      var k=this;
      var sValue="";
      switch (k.Value) {
        case (k.None)    : sValue=""; break;
        case (k.TopLeft) : sValue="left top"; break;
        case (k.TopRight) : sValue="right top"; break;
        case (k.Center): sValue="center"; break;
        case (k.BottomLeft) : sValue="left bottom"; break;
        case (k.BottomRight): sValue="right bottom"; break;
      };
      k.Owner.backgroundPosition=sValue;
    };
    k.Free=function(){
      var k=this;
      k=coObject.Release(k);
      return null;
    };
    return k;
  },
  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Default;
    var _vw=Slides.createSlide(sName,sClass+" Image",Screen,Owner,Parent,Align);
    _vw.Container.className="Image "+sClass;
    _vw.Class=sClass;
    _vw.Container.style.overflow="hidden";
    _vw.Kind=this.createKind(_vw);
    _vw.setImage=function(sURL){
      if (this.imageURL!=sURL) {
        this.imageURL=sURL;
        this.Container.style.backgroundImage=(sURL.length>0) ? "url("+sURL+")" : "" ;
      };
    };
    _vw.getImage=function(){
      return this.imageURL;
    };
    return _vw;
  }
}
