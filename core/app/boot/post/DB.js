const DB = {
  Unit           : '',
  Loaded         : true,
  Initialized    : false,
  debugToConsole : false,

  Kind           : null,
  HasNoItems     : false,
  HasItems       : true,
  HasDisplays    : true,
  HasNoDisplays  : false,
  HasNoCollection: null,
  ParseAsync     : false,
  ParseSync      : true,
  NoDataSet      : null,
  NoUpdate       : null,
  ReadAlways     : true,
  ReadOnce       : false,
  StreamOn       : true,
  StreamOff      : false,
  Empty          : '',
  Null           : null,
  LoadDelay      : 250,
  LoadPause      : 800,
  LoadChunk      : 100,
  Comma          : ',',
  Recycle        : new Array(),
  evkLoaded      : 0,
  evkSynchronize : 1,
  Parser         : null,
  Collections    : new Array(),
  //Worker         : new WebWorker('/core/app/coDB.Worker.js'),
  init           : function(){
    this.Initialized=true;
    this.Kind=this.createDBFieldKind();
    this.Parser=createParser();
  },
  onLogOut       : function(){
    for (var iLcv=0; iLcv<coDB.Collections.length; iLcv++){
      var col=coDB.Collections[iLcv];
      col.Loaded=false;
      if (col.Items) col.Items.Clear();
    };
  },
  createGroups:function(Owner){
    // Load mechanism will place incoming items in these bins for displays
    var gps=new Array();
    gps.Class="dbGroups";
    gps.recurseRelease=false;
    gps.copyAsVar=true;
    gps.Selected=null;
    gps.Force=function(dbItem){
      var gps=this;
      if (gps.length>0){
        var gp=null, Value=null;
        for (var iLcv=0; iLcv<gps.length; iLcv++){
          gp=gps[iLcv];
          Value=dbItem.MAP[gp.Key].Value;
          if (gp.Values[Value]==undefined)
            gp.Values[Value]=new Array();
          gp.Values[Value].push(dbItem);
        };
      } else {
        return null;
      };
    };
    gps.Add=function(Field){
      var gps=this;
      var gp=coObject.Create(coObject.relInline,coObject.cpyAsVar,"dbGroup");
      gp.Key=Field.Name;
      gp.Values=new Object();
      gp.Filter=null;
      gp.Reset=function(){
        var gp=this;
        gp.Filter=null;
        for (var Lcv in gp.Values){
          gp.Values[Lcv].length=0;
          gp.Values[Lcv]=null;
        };
        gp.Values=new Object();
      };
      gp.Free=function(){
        var gp=this;
        gp.Key.length=0;
        for (var Lcv in gp.Values){
          gp.Values[Lcv].length=0;
          gp.Values[Lcv]=null;
        };
        gp.Values=null;
        gp=coObject.Release(gp);
        return null;
      };
      gps.push(gp);
      return gp;
    };
    gps.Reset=function(){
      var gps=this;
      gps.Selected=null;
      for (var iLcv=0; iLcv<gps.length; iLcv++)
        gps[iLcv].Reset();
    };
    gps.Clear=function(){
      var gps=this, gp=null;
      for (var iLcv=0; iLcv<gps.length; iLcv++){
        gp=gps[iLcv];
        gp.Free();
      };
      gps.length=0;
    };
    gps.Free=function(){
      var gps=this;
      gps.Clear();
      gps=coObject.Release(gps);
    };
    return gps;
  },
  createEventList:function(Owner){
    var el=new Array();
    el.Owner=Owner;
    el.Fire=function(Kind){
      var el=this, itm=null;
      for (var iLcv=0; iLcv<el.length; iLcv++){
        itm=el[iLcv];
        if (itm.Kind==Kind)
          itm.Method(itm);
      };
    };
    el.Assign=function(src){
      var el=this;
      el.length=src.length;
      for (var iLcv=0; iLcv<src.length; iLcv++)
        el[iLcv]=el.createItem(src[iLcv].Kind,src[iLcv].Method);
    };
    el.Clone=function(col){
      var el=this;
      var clNew=coDB.createEventList(col);
      clNew.Assign(el);
      return clNew;
    };
    el.createItem=function(Kind,Method){
      var el=this;
      var itm=coObject.Create(coObject.relInline,coObject.cpyAsVar,"dbEventItem");
      itm.Owner=el;
      itm.Kind=Kind;
      itm.Method=Method;
      itm.Free=function(){
        var itm=this;
        itm=coObject.Release(itm);
        return null;
      };
      itm.Owner.push(itm);
      return itm;
    };
    el.Free=function(){
      var el=this, itm=null;
      for (var iLcv=0; iLcv<el.length; iLcv++){
        itm=el[iLcv];
        el[iLcv]=itm=itm.Free();
      };
      el.length=0;
    };
    return el;
  },
  createDBFieldKind : function (){
    var _knd=new Object();
      _knd.Boolean     = 0;
      _knd.Byte        = 1;
      _knd.Integer     = 2;
      _knd.DWord       = 3;
      _knd.Int64       = 4;
      _knd.QWord       = 5;
      _knd.Double      = 6;
      _knd.DateTime    = 7;
      _knd.Pointer     = 8;
      _knd.String      = 9;
      _knd.NameSpace   = 10;
      _knd.XML         = 11;
      _knd.Int64Array  = 12;
      _knd.StringArray = 13;
      _knd.KPList      = 14;
      _knd.Base64      = 15;
      _knd.Field       = 16;
      _knd.Fields      = 17;
      _knd.Collection  = 18;

      _knd.booleanToString=function(Value){
        switch (Value){
         case (true) :  return "yes";
         case (false) : return "no";
        };
        return "no";
      };
      _knd.booleanFromString=function(Value,Default){
      if (typeof(Value)=="string") Value=Value.toLowerCase();
      if (!Default) Default=false;
      switch (Value){
        case (true)    : return true;
        case (false)   : return false;
        case ("yes")   : return true;
        case ("true")  : return true;
        case ("no")    : return false;
        case ("false") : return false;
     };
     return Default;
    };
    return _knd;
  },
  createDB       : function(){
    var _itm=coObject.Create();
    _itm.Class="DB";
    _itm.Field=null;
    _itm.Record=null;
    _itm.DataSet=null;
    _itm.Free=function(){
      var itm=this;
      _itm=coObject.Release(itm);
      return null;
    };
    return _itm;
  },
  Field : function(sName,fldKind,xmlTag,Value,Stream,ReadAlways){
    var _fld=new Object();
    _fld.recurseRelease=false;
    _fld.Name=sName;
    _fld.Caption=sName;
    _fld.Kind=fldKind;
    _fld.Value=Value;
    _fld.Tag=xmlTag;
    _fld.lookupValue=true;
    _fld.MenuItem=null;
    _fld.Verified=false;
    _fld.Visible=true;
    _fld.Default=Value;
    _fld.Index=null;
    _fld.readCount=0;
    _fld.readAlways=(ReadAlways==undefined) ? coDB.ReadAlways : ReadAlways;
    _fld.Stream=(Stream==true);
    _fld.buildIndex=function(){
      var fld=this;
      if (fld.Index) {
        fld.Index.length=0;
        fld.Index=null;
      };
      switch (fld.Kind) {
        case coDB.Kind.String      : fld.Index=fld.Value.toLowerCase().split(/[\s,\'\:\-\*\!\@\#\$\%\^\&\(\)\_\+\{\}]+/); break;
        case coDB.Kind.StringArray : fld.Index=fld.Value.buildIndex(); break;
        case coDB.Kind.KPList      : fld.Index=fld.Value.buildIndex(); break;
      };
    };
    _fld.Reset=function(){
        var fld=this;
        switch (fld.Kind) {
          case coDB.Kind.Boolean     : fld.Value=fld.Default; break;
          case coDB.Kind.Byte        : fld.Value=fld.Default; break;
          case coDB.Kind.Integer     : fld.Value=fld.Default; break;
          case coDB.Kind.DWord       : fld.Value=fld.Default; break;
          case coDB.Kind.Int64       : fld.Value=fld.Default; break;
          case coDB.Kind.QWord       : fld.Value=fld.Default; break;
          case coDB.Kind.Double      : fld.Value=fld.Default; break;
          case coDB.Kind.DateTime    : fld.Value=fld.Default; break;
          case coDB.Kind.Pointer     : fld.Value=fld.Default; break;
          case coDB.Kind.String      : fld.Value=fld.Default; break;
          case coDB.Kind.NameSpace   : fld.Value=fld.Default; fld.buildIndex(); break;
          case coDB.Kind.XML         : fld.Value=fld.Default; break;
          case coDB.Kind.Int64Array  : fld.Value.Clear(); break;
          case coDB.Kind.StringArray : fld.Value.Clear(); fld.buildIndex(); break;
          case coDB.Kind.KPList      : fld.Value.Clear(); fld.buildIndex(); break;
          case coDB.Kind.Base64      : fld.Value=""; break;
          case coDB.Kind.Fields      : fld.Value.Clear(); break;
          case coDB.Kind.Collection  : fld.Value.Clear(); break;
        };
      };
      _fld.toXML=function(){
        var fld=this;
        var sXML="";
        switch (fld.Kind) {
          case coDB.Kind.Boolean     : sXML+="<"+fld.Tag+">"+coDB.Kind.booleanToString(fld.Value)+"</"+fld.Tag+">"; break;
          case coDB.Kind.Byte        : sXML+="<"+fld.Tag+">"+fld.Value.toString()+"</"+fld.Tag+">"; break;
          case coDB.Kind.Integer     : sXML+="<"+fld.Tag+">"+fld.Value.toString()+"</"+fld.Tag+">"; break;
          case coDB.Kind.DWord       : sXML+="<"+fld.Tag+">"+fld.Value.toString()+"</"+fld.Tag+">"; break;
          case coDB.Kind.Int64       : sXML+="<"+fld.Tag+">"+fld.Value.toString()+"</"+fld.Tag+">"; break;
          case coDB.Kind.QWord       : sXML+="<"+fld.Tag+">"+fld.Value.toString()+"</"+fld.Tag+">"; break;
          case coDB.Kind.Double      : sXML+="<"+fld.Tag+">"+fld.Value.toString()+"</"+fld.Tag+">"; break;
          case coDB.Kind.DateTime    : sXML+="<"+fld.Tag+">"+fld.Value.toString()+"</"+fld.Tag+">"; break;
          case coDB.Kind.Pointer     : sXML+="<"+fld.Tag+">"+fld.Value.toString()+"</"+fld.Tag+">"; break;
          case coDB.Kind.String      : sXML+="<"+fld.Tag+">"+"<![CDATA["+fld.Value+"]]>"+"</"+fld.Tag+">"; break;
          case coDB.Kind.NameSpace   : sXML+="<"+fld.Tag+">"+fld.Value+"</"+fld.Tag+">"; break;
          case coDB.Kind.XML         : sXML+="<"+fld.Tag+">"+fld.Value+"</"+fld.Tag+">"; break;
          case coDB.Kind.Int64Array  : sXML+="<"+fld.Tag+">"+fld.Value.toString(coDB.Comma)+"</"+fld.Tag+">"; break;
          case coDB.Kind.StringArray : sXML+="<"+fld.Tag+">"+"<![CDATA["+fld.Value.toString()+"]]>"+"</"+fld.Tag+">"; break;
          case coDB.Kind.Base64      : sXML+="<"+fld.Tag+">"+fld.Value+"</"+fld.Tag+">"; break;
          case coDB.Kind.KPList      : sXML+="<"+fld.Tag+">"+"<![CDATA["+fld.Value.toString()+"]]>"+"</"+fld.Tag+">"; break;
          case coDB.Kind.Fields      : sXML+=fld.Value.toXML(); break;
          case coDB.Kind.Collection  : sXML+=fld.Value.toXML(); break;
        };
        return sXML;
      };
      _fld.Assign=function(srcField){
        var fld=this;
        fld.Verified=true;
        fld.buildIndex=srcField.buildIndex;
        switch (fld.Kind) {
          case coDB.Kind.Boolean     : fld.Value=srcField.Value; break;
          case coDB.Kind.Byte        : fld.Value=srcField.Value; break;
          case coDB.Kind.Integer     : fld.Value=srcField.Value; break;
          case coDB.Kind.DWord       : fld.Value=srcField.Value; break;
          case coDB.Kind.Int64       : fld.Value=srcField.Value; break;
          case coDB.Kind.QWord       : fld.Value=srcField.Value; break;
          case coDB.Kind.Double      : fld.Value=srcField.Value; break;
          case coDB.Kind.DateTime    : fld.Value=srcField.Value; break;
          case coDB.Kind.Pointer     : fld.Value=srcField.Value; break;
          case coDB.Kind.String      : fld.Value=srcField.Value; fld.buildIndex(); break;
          case coDB.Kind.NameSpace   : fld.Value=srcField.Value; break;
          case coDB.Kind.XML         : fld.Value=srcField.Value; break;
          case coDB.Kind.Int64Array  : fld.Value.Assign(srcField.Value); break;
          case coDB.Kind.StringArray : fld.Value.Assign(srcField.Value); fld.buildIndex(); break;
          case coDB.Kind.Base64      : fld.Value=srcField.Value; break;
          case coDB.Kind.KPList      : fld.Value.Assign(srcField.Value); fld.buildIndex(); break;
          case coDB.Kind.Fields      : fld.Value.Assign(srcField.Value); break;
          case coDB.Kind.Collection  : fld.Value.Assign(srcField.Value); break;
        };
      };
      _fld.fromValue=function(Value){
        var fld=this;
        switch (fld.Kind) {
          case coDB.Kind.Boolean     : fld.Value=coDB.Kind.booleanFromString(Value,false); break;
          case coDB.Kind.Byte        : fld.Value=coUtils.parseInt(Value,0); break;
          case coDB.Kind.Integer     : fld.Value=coUtils.parseInt(Value,0); break;
          case coDB.Kind.DWord       : fld.Value=coUtils.parseInt(Value,0); break;
          case coDB.Kind.Int64       : fld.Value=coUtils.parseInt(Value,0); break;
          case coDB.Kind.Qword       : fld.Value=coUtils.parseInt(Value,0); break;
          case coDB.Kind.Double      : fld.Value=parseFloat(Value); break;
          case coDB.Kind.DateTime    : fld.Value=parseFloat(Value); break;
          case coDB.Kind.Pointer     : fld.Value=Value; break;
          case coDB.Kind.String      : fld.Value=Value; fld.buildIndex(); break;
          case coDB.Kind.NameSpace   : fld.Value=Value; break;
          case coDB.Kind.XML         : fld.Value=Value; break;
          case coDB.Kind.Int64Array  : fld.Value.fromString(Value); break;
          case coDB.Kind.StringArray : fld.Value.fromString(Value); fld.buildIndex(); break;
          case coDB.Kind.Base64      : fld.Value=Value; break;
          case coDB.Kind.KPList      : fld.Value.fromString(Value); fld.buildIndex(); break;
          case coDB.Kind.Fields      : fld.Value.fromString(Value); break;
        };
      };
      _fld.Lookup=function(Item,Terms,List){
        var fld=this;
        switch (fld.Kind) {
          case coDB.Kind.Boolean     : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Byte        : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Integer     : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.DWord      : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Int64       : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.QWord       : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Double      : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.DateTime    : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Pointer     : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.String      : if (coList.StartsWith(fld.Value,Terms)>-1) List.push(Item); break;
          case coDB.Kind.NameSpace   : if (coList.StartsWith(fld.Value,Terms)>-1) List.push(Item); break;
          case coDB.Kind.XML         : if (coList.Contains(fld.Value,Terms)>-1) List.push(Item); break;
          case coDB.Kind.Int64Array  : if (fld.Value.Lookup(Terms)>-1) List.push(Item); break;
          case coDB.Kind.StringArray : if (fld.Value.Lookup(Terms)>-1) List.push(Item); break;
          case coDB.Kind.KPList      : if (fld.Value.Lookup(Terms)>-1) List.push(Item); break;
          case coDB.Kind.Fields      : fld.Value.Lookup(Item,Terms,List); break;
          case coDB.Kind.Collection  : fld.Value.Lookup(Item,Terms,List); break;
        };
      };
      _fld.Search=function(Item,Terms,List){
        if (List.indexOf(Item)!=-1) return;
        var fld=this;
        switch (fld.Kind) {
          case coDB.Kind.Boolean     : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Byte        : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Integer     : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.DWord       : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Int64       : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.QWord       : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Double      : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.DateTime    : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.Pointer     : if (Terms.indexOf(fld.Value)>-1) List.push(Item); break;
          case coDB.Kind.String      : if (coList.Search(Terms,fld.Index)>-1) List.push(Item); break;
          case coDB.Kind.NameSpace   : if (coList.Search(Terms,fld.Index)>-1) List.push(Item); break;
          case coDB.Kind.XML         : if (coList.Contains(fld.Value,Terms)>-1) List.push(Item); break;
          case coDB.Kind.Int64Array  : if (fld.Value.Lookup(Terms)>-1) List.push(Item); break;
          case coDB.Kind.StringArray : if (coList.Search(Terms,fld.Index)>-1) List.push(Item); break;
          case coDB.Kind.KPList      : if (coList.Search(Terms,fld.Index)>-1) List.push(Item); break;
          case coDB.Kind.Fields      : fld.Value.Search(Item,Terms,List); break;
          case coDB.Kind.Collection  : fld.Value.Search(Item,Terms,List); break;
        };
      };

      _fld.fromXML=function(oTag){
        var fld=this;
        fld.readCount++;
        switch (fld.Kind) {
          case coDB.Kind.Boolean     : fld.Value=coDB.Kind.booleanFromString(coXML.nodeValue(oTag),false); fld.Verified=true; break;
          case coDB.Kind.Byte        : fld.Value=coUtils.parseInt(coXML.nodeValue(oTag),0); fld.Verified=true; break;
          case coDB.Kind.Integer     : fld.Value=coUtils.parseInt(coXML.nodeValue(oTag),0); fld.Verified=true; break;
          case coDB.Kind.DWord       : fld.Value=coUtils.parseInt(coXML.nodeValue(oTag),0); fld.Verified=true; break;
          case coDB.Kind.Int64       : fld.Value=coUtils.parseInt(coXML.nodeValue(oTag),0); fld.Verified=true; break;
          case coDB.Kind.QWord       : fld.Value=coUtils.parseInt(coXML.nodeValue(oTag),0); fld.Verified=true; break;
          case coDB.Kind.Double      : fld.Value=parseFloat(coXML.nodeValue(oTag)); fld.Verified=true; break;
          case coDB.Kind.DateTime    : fld.Value=parseFloat(coXML.nodeValue(oTag)); fld.Verified=true; break;
          case coDB.Kind.Pointer     : fld.Value=coUtils.parseInt(coXML.nodeValue(oTag),0); fld.Verified=true; break;
          case coDB.Kind.String      : fld.Value=coXML.nodeValue(oTag); fld.buildIndex(); fld.Verified=true; break;
          case coDB.Kind.NameSpace   : fld.Value=coXML.nodeValue(oTag); fld.Verified=true; break;
          case coDB.Kind.XML         : fld.Value=coXML.nodeXML(oTag.firstChild); fld.Verified=true; break;
          case coDB.Kind.Int64Array  : fld.Value.fromString(coXML.nodeValue(oTag),coDB.Comma); fld.Verified=true; break;
          case coDB.Kind.StringArray : fld.Value.fromString(coXML.nodeValue(oTag)); fld.buildIndex(); fld.Verified=true; break;
          case coDB.Kind.KPList      : fld.Value.fromString(coXML.nodeValue(oTag)); fld.buildIndex(); fld.Verified=true; break;
          case coDB.Kind.Base64      : fld.Value=coXML.nodeValue(oTag); fld.Verified=true; break;
          case coDB.Kind.Fields      : fld.Value.fromXML(oTag.ownerDocument,oTag); fld.Verified=true; break;
          case coDB.Kind.Collection  : fld.Value.fromXML(oTag.ownerDocument,oTag); fld.Verified=true; break;
        };
      };
      _fld.Free=function(){
        var fld=this;
        fld.Name=null;
        switch (fld.Kind) {
          case coDB.Kind.Int64Array  : fld.Value.Free(); break;
          case coDB.Kind.StringArray : fld.Value.Free(); break;
          case coDB.Kind.KPList      : fld.Value.Free(); break;
          case coDB.Kind.Fields      : fld.Value.Free(); break;
          case coDB.Kind.Collection  : fld.Value.Free(); break;
        };
        fld.Value=null;
        if (fld.Index) fld.Index.length=0;
        if ( (fld.Display) && (fld.Display.Free) ) fld.Display.Free();
        Release(fld);
        fld=null;
        return null;
      };
      _fld.Clone=function(Owner){
        var fld=this;
        var val=null;
        switch (fld.Kind) {
          case coDB.Kind.StringArray :
            val=fld.Value.Clone();
            break;
          case coDB.Kind.Int64Array :
            val=fld.Value.Clone();
            break;
          case coDB.Kind.Fields :
            val=fld.Value.Clone();
            val.Owner=Owner;
            break;
          case coDB.Kind.Collection :
            var col=val=fld.Value.Clone();
            if (fld.Value.LoadInfo) {
              col.LoadInfo=fld.Value.LoadInfo;
              col.LoadInfo.Owner=col;
            };
            col.Displays=fld.Value.Displays;
            col.Items.Assign(fld.Value.Items);
            if (fld.Value.Commands) col.Commands=fld.Value.Commands;
            if (fld.Value.Items.onLoaded) col.Items.onLoaded=fld.Value.Items.onLoaded;
            if (fld.Value.Items.onPartialLoad) col.Items.onPartialLoad=fld.Value.Items.onPartialLoad;
            if (fld.Value.Identity) col.Identity=col.Fields.MAP[fld.Value.Identity.Name];
            break;
          default :
            val=fld.Value;
        };
        var clone=coDB.Field(fld.Name,fld.Kind,fld.Tag,val,fld.Stream);
        clone.Owner=Owner;
        clone.Default=fld.Default;
        clone.buildIndex=fld.buildIndex;
        clone.readAlways=fld.readAlways;
        return clone;
      };
      return _fld;
  },
  Fields : function(sStanza,Collection,hasItems){
    if (Collection==undefined) Collection=null;
    if (hasItems==undefined) hasItems=false;

    var _flds=new Array();
    _flds.recurseRelease=false;
    _flds.optionValue=null;
    _flds.optionName=null;
    _flds.Stanza=sStanza;
    _flds.Collection=Collection;
    _flds.hasItems=hasItems;
    _flds.Items=null;
    _flds.Verified=false;
    _flds.Visible=true;
    _flds.Display=null;
    _flds.onLoaded=null;

    _flds.Loaded=false;
    _flds.MAP=coObject.Create();
    _flds.getDisplay=function(Slide){
      var flds=this;
      var col=flds.Collection;
      if (col) {
        var itms=col.Items;
        var dm=itms.DisplayMode;
        switch (dm.Index){
          case (dm.None) :
            return null;
          case (dm.Single) :
            return flds.Display;
          case (dm.Multiple) :
            return flds.Display.getItem(Slide);
        };
      } else {
        return flds.Display;
      };
    };
    _flds.setDisplay=function(Display){
      var flds=this;
      var col=flds.Collection;
      if (col) {
        var itms=col.Items;
        var dm=itms.DisplayMode;
        switch (dm.Index){
          case (dm.None) :
            return true;
          case (dm.Single) :
            flds.Display=null;
            return true;
          case (dm.Multiple) :
            var idx=flds.Display.indexOf(Display);
            if (idx==-1) flds.Display.push(Display);
            return true;
        };
      } else {
        flds.Display=Display;
        return true;
      };
    };
    _flds.removeDisplay=function(Display){
      var flds=this;
      var col=flds.Collection;
      if (col) {
        var itms=col.Items;
        var dm=itms.DisplayMode;
        switch (dm.Index){
          case (dm.None) :
            return true;
          case (dm.Single) :
            flds.Display=null;
            return true;
          case (dm.Multiple) :
            var idx=flds.Display.indexOf(Display);
            if (idx>-1) flds.Display.splice(idx,1);
            return true;
        };
      } else {
        flds.Display=null;
        return true;
      };
    };
    _flds.createDisplayList=function(){
      var flds=this;
      var col=flds.Collection;
      if (flds.hasItems==true){
        var itms=col.Items;
        var dm=itms.DisplayMode;
        switch (dm.Index){
          case (dm.None) :
            return null;
          case (dm.Single) :
            return null;
          case (dm.Multiple) :
            var dis=new Array();
            dis.Owner=flds;
            dis.Synchronize=function(){
              var dis=this, itm=null;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv]; // Like a ListItem
                if (itm.Synchronize) itm.Synchronize( (itm.DataSet) ? itm.DataSet : itm.Data);
              };
            };
            dis.addItem=function(Item,Slide){
              if (Slide==undefined) Slide=Item;
              var dis=this, itm=null;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv]; // Like a ListItem
                if (itm.Slide==Slide) {
                  return itm;
                };
              };
              if (Item!=Slide)
                Item.Slide=Slide;
              dis.push(Item);
              return null;
            };
            dis.removeItem=function(Slide){
              var dis=this, itm=null;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv]; // Like a ListItem
                if (itm.Slide==Slide) {
                  dis.splice(iLcv,iLcv,1);
                  return itm;
                };
              };
              return null;
            };
            dis.getItem=function(Slide){
              var dis=this, itm=null;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv]; // Like a ListItem
                if (itm.Slide==Slide) return itm;
              };
              return null;
            };
            dis.getItemBySlideProperty=function(Name,Value){
              var dis=this, itm=null;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv];
                if ((itm.Slide) &&(itm.Slide[Name]==Value)) return itm;
              };
              return null;
            };
            dis.getSlideByProperty=function(Name,Value){
              var dis=this, itm=null;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv];
                if ((itm.Slide) &&(itm.Slide[Name]==Value)) return itm.Slide;
              };
              return null;
            };
            dis.getItemByProperty=function(Name,Value){
              var dis=this, itm=null;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv];
                if (itm[Name]==Value) return itm;
              };
              return null;
            };
            dis.startTorus=function(){
              var dis=this, itm=null;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv];
                if (itm.Torus) itm.Torus.Start();
              };
              return null;
            };
            dis.stopTorus=function(){
              var dis=this, itm=null;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv];
                if (itm.Torus) itm.Torus.Stop();
              };
              return null;
            };
            dis.Free=function(){
              var dis=this, itm=null;
              var flds=dis.Owner;
              var col=flds.Collection;
              for (var iLcv=0; iLcv<dis.length; iLcv++){
                itm=dis[iLcv];
                if ( (itm) && (itm.Free) ) itm.Free();
                itm=null;
              };
              dis.length=0;
              coObject.Release(dis);
              dis=null;
              return null;
            };
            return dis;
        };
      } else {
        return null;
      };
    };
    _flds.setValue=function(fld,Value){
      var flds=this;
      if (flds.hasItems==true){
        var itms=flds.Collection.Items;
        //var idx=itms.indexOf(itm);
        var idx=itms.indexOf(flds);
        var itm=itms.getItem(idx,fld.Name);
        if (itm!=null)
          itm.fromValue(Value);
      } else {
        var fld=flds.getFieldByName(fld.Name);
        if (fld)
          fld.fromValue(Value);
      };
    };
    _flds.getValue=function(fld){
      var flds=this;
      if ( flds.hasItems==true) {
        var itms=flds.Collection.Items;

        //var idx=itms.indexOf(itm);
        var idx=itms.indexOf(flds);
        var itm=itms.getItem(idx,fld.Name);

        return (itm==null) ? null : itm.Value;
      } else {
        var itm=null;
        for (var iLcv=0; iLcv<flds.length; iLcv++){
          itm=flds[iLcv];
          if (itm.Name==fld.Name)
            return itm.Value;
        };
        return null;
      };
      return null;
    };
    _flds.getFieldByName=function(sName){
      var flds=this, fld=null;
      for (var iLcv=0; iLcv<flds.length; iLcv++){
        fld=flds[iLcv];
        if (fld.Name==sName) return fld;
      };
      return null;
    };
    _flds.getFieldByTag=function(sName){
      var flds=this, fld=null;
      for (var iLcv=0; iLcv<flds.length; iLcv++){
        fld=flds[iLcv];
        if (fld.Tag==sName) return fld;
      };
      return null;
    };
    _flds.getValueByTag=function(sName){
      var flds=this, fld=null;
      for (var iLcv=0; iLcv<flds.length; iLcv++){
        fld=flds[iLcv];
        if (fld.Tag==sName) return fld.Value;
      };
      return null;
    };
    _flds.setOptions=function(Select){
      var flds=this;
      if (flds.Collection) {
        var itms=flds.Collection.Items, itm=null;
        Select.length=0;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          itm=itms[iLcv];
          Select.options[iLcv]=new Option(itm.getOptionName(iLcv),itm.getOptionValue(iLcv), false, false);
        };
      } else {
        var itms=flds, itm=null;
        Select.length=0;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          itm=itms[iLcv];
          Select.options[iLcv]=new Option(itm.Name,itm.Value, false, false);
        };
      };
    };
    _flds.getOptionValue=function(idx){
      var flds=this;
      if (flds.optionValue!=null){
        var itm=flds.Collection.Items.getItem(idx,flds.optionValue.Name);
        if (itm!=null)
          return itm.Value;
      };
      return "";
    };
    _flds.getOptionName=function(idx){
      var flds=this;
      if (flds.optionName!=null){
        var itm=flds.Collection.Items.getItem(idx,flds.optionName.Name);
        if (itm!=null)
          return itm.Value;
      };
      return "";
    };
    _flds.setOptionValue=function(fld){
      var flds=this;
      flds.optionValue=fld;
    };
    _flds.setOptionName=function(fld){
      var flds=this;
      flds.optionName=fld;
    };
    _flds.Reset=function(){
      var flds=this, mFld=null;
      for (var iLcv=0; iLcv<flds.length; iLcv++) {
        mFld=flds[iLcv];
        if ( (mFld.Stream==true) && ( (mFld.readAlways) || (mFld.readCount==0) ) )
          mFld.Reset();
      };
      mFld=null;
    };
    _flds.addField=function(sName,fldKind,xmlTag,Value,Stream,ReadAlways){
      var flds=this;
      var mItem=coDB.Field(sName,fldKind,xmlTag,Value,Stream,ReadAlways);
      mItem.mapName=coObject.Map(flds.MAP,sName,mItem);
      flds.push(mItem);
      return mItem;
    };
    _flds.toXML=function(){
      var flds=this, fld=null;
      var sXML="<"+flds.Stanza+">";
      for (var iLcv=0; iLcv<flds.length; iLcv++){
        fld=flds[iLcv];
        if (fld.Stream==true)
          sXML+=fld.toXML();
      };
      sXML+="</"+flds.Stanza+">";
      return sXML;
    };
    _flds.Clone=function(srcFields){
      var flds=this;
      if (srcFields) {
        flds.onLoaded=srcFields.onLoaded;
        flds.setOptionName(srcFields.optionName);
        flds.setOptionValue(srcFields.optionValue);
        flds.buildIndex=srcFields.buildIndex;
        var fld=cl=null;
        for (var iLcv=0; iLcv<srcFields.length; iLcv++){
          fld=srcFields[iLcv];
          cl=fld.Clone(flds);
          cl.mapName=coObject.Map(flds.MAP,cl.Name,cl);
          flds.push(cl);
        };
        return flds;
      } else {
        var clFlds=coDB.Fields(flds.Stanza,flds.Collection,flds.hasItems);
        clFlds.onLoaded=flds.onLoaded;
        clFlds.buildIndex=flds.buildIndex;
        clFlds.hasItems=(clFlds.Items!=null);
        clFlds.setOptionName(flds.optionName);
        clFlds.setOptionValue(flds.optionValue);
        var fld=cl=null;
        for (var iLcv=0; iLcv<flds.length; iLcv++){
          fld=flds[iLcv];
          cl=fld.Clone(clFlds);
          cl.Owner=clFlds;
          clFlds.push(cl);
          cl.mapName=coObject.Map(clFlds.MAP,cl.Name,cl);
        };
        return clFlds;
      };
    };
    _flds.Search=function(Field,Terms,List){
      var flds=this, fld=null;
      for (var iLcv=0; iLcv<flds.length; iLcv++){
        fld=flds[iLcv];
        if (fld.Tag==Field.Tag) {
          fld.Search(flds,Terms,List);
        } else if (
          (fld.Kind==coDB.Kind.Fields) ||
          (fld.Kind==coDB.Kind.Collection)
        ) {
          fld.Value.Search(Field,Terms,List);
        };
      };
    };
    _flds.Copy=function(){
      var flds=this;
      var clFlds=coDB.Fields(flds.Stanza,null,false);
      clFlds.setOptionName(flds.optionName);
      clFlds.setOptionValue(flds.optionValue);
      var fld=cl=null;
      for (var iLcv=0; iLcv<flds.length; iLcv++){
        fld=flds[iLcv];
        cl=fld.Clone(clFlds);
        clFlds.push(cl);
        cl.mapName=coObject.Map(clFlds.MAP,cl.Name,cl);
      };
      return clFlds;
    };
    _flds.Lookup=function(Field,Terms,List){
      var flds=this, fld=null;
      for (var iLcv=0; iLcv<flds.length; iLcv++){
        fld=flds[iLcv];
        if (fld.Tag==Field.Tag) {
          fld.Lookup(flds,Terms,List);
        } else if (
          (fld.Kind==coDB.Kind.Fields) ||
          (fld.Kind==coDB.Kind.Collection)
        ) {
          fld.Lookup(Field,Terms,List);
        };
      };
    };
    _flds.Copy=function(){
      var flds=this;
      var clFlds=coDB.Fields(flds.Stanza,null,false);
      clFlds.setOptionName(flds.optionName);
      clFlds.setOptionValue(flds.optionValue);
      var fld=cl=null;
      for (var iLcv=0; iLcv<flds.length; iLcv++){
        fld=flds[iLcv];
        cl=fld.Clone(clFlds);
        clFlds.push(cl);
        cl.mapName=coObject.Map(clFlds.MAP,cl.Name,cl);
      };
      return clFlds;
    };
    _flds.fromXML=function(xDoc,xNode,Collection){
      if (Collection==undefined) Collection=null;
      var flds=this;
      if (Collection) {
        var _col=Collection;
        if (flds.hasItems==true) {
          if (_col.Identity==null) {
            if (_col.Validate==true) _col.Items.Clear();
          } else {
            if (_col.Validate==true)  flds.resetVerified(_col);
          };
          // Identity will sync item rather than free/re-create
          // Subitems specified.  Get node from self stanza and iterate
          var xColItems=coXML.getStanza(xDoc,_col.Stanza,xNode);
          if (xColItems==null) return;
          var xColItem=dbItem=null;
          for (var iLcv=0; iLcv<xColItems.childNodes.length; iLcv++){
            xColItem=xColItems.childNodes[iLcv];
            if (_col.Stanza2==xColItem.nodeName){
              dbItem=_col.Fields.fromXML(xDoc,xColItem);
              _col.Groups.Force(dbItem);
            };
          };
        } else {
          var xFields=coXML.getStanza(xDoc,flds.Stanza,xNode);
          if (xFields!=null) {
            var mItm=flds, mField=xField=null;
            for (var mLcv=0; mLcv<mItm.length; mLcv++) {
              mField=mItm[mLcv];
              if ( (mField.Stream==true) && ( (mField.readAlways) || (mField.readCount==0) ) ){
                xField=coXML.getChildByName(xFields,mField.Tag);
                if (xField!=null)
                  mField.fromXML(xField);
              };
            };
          };
        };
      } else {
        var xFields=coXML.getStanza(xDoc,flds.Stanza,xNode);
        if (flds.hasItems==true){
          var _itmCol=flds.Collection;
          var itms=_itmCol.Items;
          if (xFields!=null) {
            flds.Verified=true;
            if (_itmCol.Identity==null) {
              var mItm=_itmCol.Fields.Clone();
              if (_itmCol.Validate==true) mItm.Reset();
              mItm.Verified=true;
              mField=xField=null;
              for (var mLcv=0; mLcv<mItm.length; mLcv++){
                mField=mItm[mLcv];
                if ( (mField.Stream==true) && ( (mField.readAlways) || (mField.readCount==0) ) ){
                  xField=coXML.getChildByName(xFields,mField.Tag);
                  if (xField!=null)
                    mField.fromXML(xField);
                };
              };
              itms.push(mItm);
              _itmCol.Groups.Force(mItm);
              flds.Loaded=true;
              if (mItm.onLoaded) mItm.onLoaded(mItm);
              return mItm;
            } else {
              // update all in the XML list
              var fldID=_itmCol.Identity;
              var idTag=fldID.Tag;
              var xValue=coXML.getChildByName(xFields,idTag);
              if (xValue) {
                var idValue=parseInt(coXML.nodeValue(xValue));
                var dbItem=_itmCol.getItem(fldID,idValue);
                if (!dbItem) {
                  var dbItem=_itmCol.Fields.Clone();
                  dbItem.Reset();
                  dbItem.Verified=true;
                  _itmCol.Items.push(dbItem);

                };
                var dbField=xField=null
                for (var fldLcv=0; fldLcv<dbItem.length; fldLcv++) {
                  dbField=dbItem[fldLcv];
                  if ( (dbField.Stream==true) && ( (dbField.readAlways) || (dbField.readCount==0) ) ){
                    xField=coXML.getChildByName(xFields,dbField.Tag);
                    if (xField!=null)
                      dbField.fromXML(xField);
                  };
                };
                dbItem.Verified=true;
                if (dbItem.onLoaded) dbItem.onLoaded(dbItem);
                flds.Loaded=true;
                _itmCol.Groups.Force(dbItem);
                return dbItem;
              };
            };
          };
        } else {
          if (xFields!=null) {
            var mItm=flds;
            var col=flds.Collection;
            if (col) {
              if (col.Validate==true) mItm.Reset();
            } else {
              mItm.Reset();
            };
            flds.Verified=true;
            var mField=xField=null;
            for (var mLcv=0; mLcv<mItm.length; mLcv++) {
              mField=mItm[mLcv];
              if ( (mField.Stream==true) && ( (mField.readAlways) || (mField.readCount==0) ) ){
                xField=coXML.getChildByName(xFields,mField.Tag);
                if (xField!=null)
                  mField.fromXML(xField);
              };
            };
            if (flds.onLoaded) flds.onLoaded(flds);
            if ( (col) && (col.Displays)){
              col.LoadInfo.Items.length=1;
              col.LoadInfo.Items[0]=flds;
              col.Displays.PartialSynchronize(col.LoadInfo);
            };
            flds.Loaded=true;
            return flds;
          };
        };
      };
      return null;
    };
    _flds.partialXML=function(xDoc,xNode,Collection){
      if (Collection==undefined) Collection=null;
      var flds=this;
      if (Collection) {
        var _col=Collection;
        if (flds.hasItems==true) {
          // Identity will sync item rather than free/re-create
          // Subitems specified.  Get node from self stanza and iterate
          var xColItems=xNode;
          if (xColItems==null) return;
          var xColItem=dbitem=null;
          for (var iLcv=_col.LoadInfo.Start; iLcv<_col.LoadInfo.Start+_col.LoadInfo.Chunk;  iLcv++){
            if (iLcv<xColItems.childNodes.length) {
              xColItem=xColItems.childNodes[iLcv];
              dbItem=_col.Fields.fromXML(xDoc,xColItem);
              if (dbItem) {
                _col.LoadInfo.Items.push(dbItem);
                _col.Groups.Force(dbItem);
              };
            } else {
              break;
            };
          };
          _col.LoadInfo.Start=iLcv;
          if (_col.Displays){
            _col.Displays.startTorus();
            if (_col.Items.onPartialLoad) _col.Items.onPartialLoad(_col.LoadInfo.Items);
            _col.Displays.PartialSynchronize();
          };
        } else {
          var xFields=coXML.getStanza(xDoc,flds.Stanza,xNode);
          if (xFields!=null) {
            var mItm=flds, mField=null, xField=null;
            for (var mLcv=0; mLcv<mItm.length; mLcv++) {
              mField=mItm[mLcv];
              if (mField.Stream==true) {
                xField=coXML.getChildByName(xFields,mField.Tag);
                if (xField!=null)
                  mField.fromXML(xField);
              };
            };
          };
        };
      } else {
        var xFields=coXML.getStanza(xDoc,flds.Stanza,xNode);
        if (flds.hasItems==true){
          var _itmCol=flds.Collection;
          var itms=_itmCol.Items;
          if (xFields!=null) {
            flds.Verified=true;
            if (_itmCol.Identity==null) {
              var mItm=_itmCol.Fields.Clone();
              if (_itmCol.Validate==true) mItm.Reset();
              mItm.Verified=true;
              var mField=xField=null;
              for (var mLcv=0; mLcv<mItm.length; mLcv++){
                mField=mItm[mLcv];
                if (mField.Stream==true) {
                  xField=coXML.getChildByName(xFields,mField.Tag);
                  if (xField!=null)
                    mField.fromXML(xField);
                };
              };
              itms.push(mItm);
              _itmCol.Groups.Force(dbItem);
            } else {
              // update all in the XML list
              var fldID=_itmCol.Identity;
              var idTag=fldID.Tag;
              var xValue=coXML.getChildByName(xFields,idTag);
              if (xValue) {
                var idValue=parseInt(coXML.nodeValue(xValue));
                var dbItem=_itmCol.getItem(fldID,idValue);
                if (!dbItem) {
                  var dbItem=_itmCol.Fields.Clone();
                  dbItem.Reset();
                  dbItem.Verified=true;
                  _itmCol.Items.push(dbItem);
                };
                var dbField=xField=null;
                for (var fldLcv=0; fldLcv<dbItem.length; fldLcv++) {
                  dbField=dbItem[fldLcv];
                  if (dbField.Stream==true) {
                    xField=coXML.getChildByName(xFields,dbField.Tag);
                    if (xField!=null)
                      dbField.fromXML(xField);
                  };
                };
                dbItem.Verified=true;
                if (dbItem.onLoaded) dbItem.onLoaded(dbItem);
              };
            };
          };
        } else {
          if (xFields!=null) {
            var mItm=flds;
            mItm.Reset();
            flds.Verified=true;
            var mField=xField=null;
            for (var mLcv=0; mLcv<mItm.length; mLcv++) {
              mField=mItm[mLcv];
              if (mField.Stream==true) {
                xField=coXML.getChildByName(xFields,mField.Tag);
                if (xField!=null)
                  mField.fromXML(xField);
              };
            };
            if (flds.onLoaded) flds.onLoaded(flds);
          };
        };
      };
      flds.Loaded=true;
    };
    _flds.updateXML=function(xDoc,xNode){
      var flds=this;
      flds.Verified=true;
      var xFields=coXML.getStanza(xDoc,flds.Stanza,xNode);
      if (xFields!=null) {
        var itm=flds;
        var mField=xField=null;
        for (var mLcv=0; mLcv<itm.length; mLcv++){
          mField=itm[mLcv];
          if (mField.Stream==true){
            xField=coXML.getChildByName(xFields,mField.Tag);
            if (xField!=null)
              mField.fromXML(xField);
          };
        };
      };
      flds.Loaded=true;
      if (flds.onLoaded) flds.onLoaded(flds);
      if ( (flds.Display) && (flds.Display.Synchronize) )
        flds.Display.Synchronize();
    };
    _flds.createItem=function(){
      var flds=this;
      var itm=flds.Collection.Fields.Clone();
      return itm;
    };
    _flds.fromObject=function(Source){
      var flds=this;
      var flds=flds.Collection.Fields;
      var itm=flds.createItem();
      for (var srcFld in Source) {
       // propertyName is what you want
       // you can get the value like this: myObject[propertyName]
       for (var itmFld in itm) {
         if (srcFld==itmFld) {
           itm[itmFld]=Source[srcFld];
           break;
         };
       };
      };
      flds.Collection.Items.push(itm);
      return itm;
    };
    _flds.Assign=function(srcFields){
      var flds=this;
      flds.Verified=true;
      if (flds.hasItems==true) {
        flds.Collection.Items.Assign(srcFields.Items);
      } else {
        for (var iLcv=0; iLcv<flds.length; iLcv++){
          var fld=flds[iLcv];
          var srcFld=srcFields.getFieldByName(fld.Name);
          if (srcFld) fld.Assign(srcFld);
        };
      };
      if (flds.onLoaded) flds.onLoaded(flds);
    };
    _flds.resetVerified=function(col){
      var flds=this;
      if (flds.hasItems==true) {
        if (flds.Collection==col) {
          flds.Verified=false;
          var itms=flds.Collection.Items;
          var itm=null;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            itm=itms[iLcv];
            if (itm.Collection==col) itm.Verified=false;
            if (itm.resetVerified) itm.resetVerified(flds.Collection);
          };
        };
      } else if ( (flds.Collection == undefined) || (flds.Collection==col) ) {
        flds.Verified=false;
        var fld=null;
        for (var iLcv=0; iLcv<flds.length; iLcv++){
          fld=flds[iLcv];
          fld.Verified=false;
        };
      };
    };
    _flds.Clear=function(){
      var flds=this;
      if (flds.hasItems==true) {
        flds.Collection.Items.Remove(flds);
      } else {
        var fld=null;
        for (var iLcv=0; iLcv<flds.length; iLcv++){
          fld=flds[iLcv];
          fld.Reset();
        };
      };
    };
    _flds.Free=function(){
      var flds=this;
      if ((flds.Display) && (flds.Display.Free)) flds.Display=flds.Display.Free();
      if (flds.Collection) {
        if (flds.Collection.Items) {
          flds.Collection.Items.Remove(flds);
        } else {
          // entire collection should be freed
          flds.Collection=null;
          flds.Free();
        };
      } else {
        var fld=null;
        for (var iLcv=0; iLcv<flds.length; iLcv++){
          fld=flds[iLcv];
          flds[iLcv]=fld.Free();
        };
        flds.length=0;
      };
      flds=_flds=Release(flds);
      return null;
    };
    _flds.Display=_flds.createDisplayList();
    return _flds;
  },
  createCollection : function(Parser,Stanza1,Stanza2,hasItems,hasDisplays,syncLoad){
    if (hasItems==undefined) hasItems=true;
    if (hasDisplays==undefined) hasDisplays=false;
    if (syncLoad==undefined) syncLoad=true;
    var _col=coObject.Create();
    _col.Parser=Parser;
    if ((!Stanza2) || (Stanza2==undefined)) {
      Stanza2=Stanza1;
      Stanza1=Stanza1+"s";
    };
    _col.Validate=true;
    _col.createLoadInfo=function(){
      var col=this;
      var inf=coApp.Timers.createItem(coDB.LoadPause);
      inf.Owner=col;
      inf.Start=0;
      inf.xItems=null;
      inf.Items=new Array();
      inf.XML=null;
      inf.Torus=null;
      inf.FirstDelay=coDB.LoadDelay;
      inf.AutoReset=true;
      inf.Validate=true;
      inf.Chunk=coDB.LoadChunk;
      inf.onComplete=null;
      inf.onExecute=function(){
        var inf=this;
        var col=inf.Owner;
        col.Loading=true;
        if (inf.Torus) inf.Torus.Start();
        if (inf.Start==0) {
          inf.Items.length=0;
          inf.List.length=0;
          col.Groups.Reset();
          if (col.Displays) {
            col.Displays.startTorus();
            col.Displays.SyncStart();
          };
          // user parser to parse
          if (inf.XML){
              inf.xItems=coXML.getStanza(inf.XML,col.Stanza);

              if (_col.Identity==null) {
                _col.Items.Clear();
              } else if (inf.Validate==true) {
                _col.Fields.resetVerified(_col);
              };
          } else {
              inf.xItems=null;
          }
        };
        if ( (inf.xItems) && (inf.Start<inf.xItems.childNodes.length) ) {
          inf.Items.length=0;
          col.Fields.partialXML(inf.XML,inf.xItems,col);
        } else {
          inf.setActive(false);
          inf.Items.length=0;
          inf.List.length=0;
          inf.xItems=null;
          if (col.Items.onLoaded) col.Items.onLoaded();
          var itms=col.Items;
          if (itms){
            coDB.Recycle.length=0;
            var itm=null;
            var idx=null;
            for (var iLcv=0; iLcv<itms.length; iLcv++){
              itm=itms[iLcv];
              if (itm.Verified==false){
                coDB.Recycle.push(itm);
              };
            };
            while (coDB.Recycle.length>0) {
              itm=coDB.Recycle.pop();
              idx=itms.indexOf(itm);
              if (idx>-1) itms.splice(idx,1);
              itm.Collection=null;
              itm.Free();
              itm=null;
            };
          };
          if (col.Displays) col.Displays.SyncDone();

          col.Loading=false;
          if (inf.onComplete)
            inf.onComplete(col);
          if (col.Displays) {
            // partialSynchronization used
            // do not call col.Displays.Synchronize();
            col.Displays.stopTorus();
          };
          if (inf.Torus) inf.Torus.Stop();
          col.EventList.Fire(coDB.evkLoaded);
        };
      };
      inf.Free=function(){
        var inf=this;
        inf.setActive(false);
        inf.Release();
        return null;
      };
      return inf;
    };
    _col.createDisplays=function(){
      var col=this;
      var d=new Array();
      d.Owner=col;
      d.Add=function(Display){
        var d=this;
        var col=d.Owner;

        var idx=d.indexOf(Display);
        if ( idx==-1 ) d.push(Display);

        col.Items.DisplayMode.setValue(col.Items.DisplayMode.Multiple);
      };
      d.removeItem=function(item,slide){
        var d=this;
        var col=d.Owner;
        var dm=col.Items.DisplayMode;
        switch (dm.Index){
          case (dm.Single) :
            item.Display=null;
            return null;
            break;
          case (dm.Multiple):
            item.Display.removeItem(slide);
            return null;
            break;
        };
      };
      d.addItem=function(item,slide){
        var d=this;
        var col=d.Owner;
        var dm=col.Items.DisplayMode;
        switch (dm.Index){
          case (dm.Single) :
            item.Display=slide;
            return null;
            break;
          case (dm.Multiple):
            item.Display.addItem(item,slide);
            return null;
            break;
        };
      };
      d.startTorus=function(){
        var d=this;
        var col=d.Owner;
        var ds=null;
        for (var iLcv=0; iLcv<d.length; iLcv++){
          ds=d[iLcv];
          if ( (ds) && (ds.Visible==true) && (ds.Torus)) ds.Torus.Start();
        };
      };
      d.stopTorus=function(){
        var d=this;
        var col=d.Owner;
        var ds=null;
        for (var iLcv=0; iLcv<d.length; iLcv++){
          ds=d[iLcv];
          if (ds) {
            ds.Loaded=true;
            ds.Loading=false;
            if ((ds.Visible==true) && (ds.Torus)) ds.Torus.Stop();
          };
        };
      };
      d.SyncClear=function(){
        var d=this, ds=null;
        var col=d.Owner;
        for (var iLcv=0; iLcv<d.length; iLcv++){
          ds=d[iLcv];
          if ( (ds) && (ds.Visible==true) && (ds.SyncClear)) ds.SyncClear();
        };
      };
      d.SyncStart=function(){
        var d=this, ds=null;
        var col=d.Owner;
        for (var iLcv=0; iLcv<d.length; iLcv++){
          ds=d[iLcv];
          if ( (ds) && (ds.Visible==true) && (ds.SyncStart)) ds.SyncStart();
        };
      };
      d.SyncDone=function(){
        var d=this, ds=null;
        var col=d.Owner;
        for (var iLcv=0; iLcv<d.length; iLcv++){
          ds=d[iLcv];
          if ( (ds) && (ds.Visible==true) && (ds.SyncDone)) ds.SyncDone();
        };
      };
      d.SyncItem=function(dbItem){
        var d=this, ds=null;
        var col=d.Owner;
        for (var iLcv=0; iLcv<d.length; iLcv++){
          ds=d[iLcv];
          if ( (ds) && (ds.Visible==true) && (ds.SyncItem)) ds.SyncItem(dbItem);
        };
      };
      d.Synchronize=function(){
        var d=this, ds=null;
        var col=d.Owner;
        for (var iLcv=0; iLcv<d.length; iLcv++){
          ds=d[iLcv];
          if ( (ds) && (ds.Visible==true) && (ds.Synchronize)) ds.Synchronize();
        };
      };
      d.PartialSynchronize=function(){
        var d=this, ds=null;
        var col=d.Owner;
        for (var iLcv=0; iLcv<d.length; iLcv++){
          ds=d[iLcv];
          if ( (ds) && (ds.Visible==true) && (ds.PartialSynchronize)) ds.PartialSynchronize(col.LoadInfo);
        };
      };
      d.Free=function(){
        var d=this;
        d.length=0;
        d=coObject.Release(d);
        return null;
      };
      return d;
    };
    _col.createDisplayMode=function(){
      var col=this;
      var dm=coObject.Create();
      dm.Owner=col;
      dm.None=0;
      dm.Single=1;
      dm.Multiple=2;
      dm.Index=dm.None;
      dm.setValue=function(val){
        var dm=this;
        var col=dm.Owner;
        var itms=col.Items;
        switch (val) {
          case (dm.None):
            dm.Index=dm.None;
            break;
          case (dm.Single):
            dm.Index=dm.Single;
            break;
          case (dm.Multiple):
            dm.Index=dm.Multiple;
            break;
        };
        return dm.Index;
      };
      dm.Free=function(){
        var dm=this;
        var itms=(dm.Owner.Items)? dm.Owner.Items : null;
        if (itms) itms.DisplayMode=null;
        dm=coObject.Release(dm);
        return null;
      };
      return dm;
    };
    _col.Identity=null;
    _col.Items=null;
    _col.Loading=false;
    _col.syncLoad=(syncLoad==true);
    _col.Displays=(hasDisplays==true) ? _col.createDisplays() : null;
    _col.EventList=coDB.createEventList(_col);
    _col.Groups=coDB.createGroups(_col);
    _col.LoadInfo=((syncLoad==false) || (hasDisplays==true)) ? _col.createLoadInfo() : null;
    if (hasItems==true) {
      _col.Items=new Array();
      _col.Items.DisplayMode=_col.createDisplayMode();
      _col.Items.Owner=_col;
      _col.Items.onLoaded=null;
      _col.Items.Clear=function(){
        var itms=this;
        while (itms.length>0) {
          var itm=itms.pop();
          itm.Collection=null;
          itm.Free();
        };
      };
      _col.Items.indexOf=function(itm){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++)
          if (itms[iLcv]==itm) return iLcv;
        return null;
      };
      _col.Items.Merge=function(list){
        var itms=this;
        var col=itms.Owner;
        col.Loading=true;
        col.Items.length=list.length;
        for (var iLcv=0; iLcv<itms.length; iLcv++)
          itms[iLcv]=list[iLcv];
        col.Loading=false;
      };
      _col.Items.Assign=function(srcItems){
        var itms=this;
        var col=itms.Owner;
        col.Items.Clear();
        if (srcItems) {
          for (var iLcv=0; iLcv<srcItems.length; iLcv++){
            var srcItem=srcItems[iLcv];
            var itm=col.Fields.Clone();
            itm.Assign(srcItem);
            col.Items.push(itm);
          };
        };
      };
      _col.Items.getItem=function(idx,Name){
        var itms=this;
        var flds=itms[idx];
        var Name=Name.toLowerCase();
        var itm=null;
        for (var iLcv=0; iLcv<flds.length; iLcv++){
          itm=flds[iLcv];
          if (itm.Name.toLowerCase()==Name){
            return itm;
          };
        };
        return null;
      };
      _col.Items.getItemByValue=function(Name,Value){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=flds.MAP[Name];
          if (itm.Value==Value){
            return itm;
          };
        };
        return null;
      };
      _col.Items.Remove=function(itm){
        var itms=this;
        var idx=itms.indexOf(itm);
        if (idx!=-1){
          itms.splice(idx,1);
          itm.Collection=null;
          itm.Free();
        };
        return null;
      };
      _col.setOptions=function(Select){
        var itms=this.Items;
        Select.length=0;
        var itm=null;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          itm=itms[iLcv];
          Select.options[iLcv]=new Option(itm.getOptionName(iLcv),itm.getOptionValue(iLcv), false, false);
          coTheme.UI.Select.ApplyToOption(Select.options[iLcv]);
        };
      };
      _col.getItemById=function(iID){
        var col=this;
        if (!col.Identity) return null;
        var itm=itmField=null;
        for (var iLcv=0; iLcv<col.Items.length; iLcv++){
          itm=col.Items[iLcv];
          for (var iFldLcv=0; iFldLcv<itm.length; iFldLcv++){
            itmField=itm[iFldLcv];
            if (itmField.Name==col.Identity.Name){
              if (itmField.Value==iID) {
                return itm;
              } else {
                break;
              };
            };
          };
        };
        return null;
      };
      _col.getItemIndexById=function(iID){
        var col=this;
        if (!col.Identity) return null;
        var itm=itmField=null;
        for (var iLcv=0; iLcv<col.Items.length; iLcv++){
          itm=col.Items[iLcv];
          for (var iFldLcv=0; iFldLcv<itm.length; iFldLcv++){
            itmField=itm[iFldLcv];
            if (itmField.Name==col.Identity.Name){
              if (itmField.Value==iID) {
                return iLcv;
              } else {
                break;
              };
            };
          };
        };
        return -1;
      };
      _col.getItem=function(fld,fldValue){
        var col=this;
        var itm=itmField=null;
        for (var iLcv=0; iLcv<col.Items.length; iLcv++){
          itm=col.Items[iLcv];
          for (var iFldLcv=0; iFldLcv<itm.length; iFldLcv++){
            itmField=itm[iFldLcv];
            if (itmField.Name==fld.Name){
              if (itmField.Value==fldValue) {
                return itm;
              } else {
                break;
              };
            };
          };
        };
        return null;
      };
      _col.addItem=function(srcCopy){
        if (srcCopy==undefined) srcCopy=null;
        var col=this;
        var itm=col.Fields.Clone();
        itm.Reset()
        if (srcCopy) itm.Assign(srcCopy);
        itm.Verified=true;
        col.Items.push(itm);
        col.Groups.Force(itm);
        if (col.Displays) {
          col.LoadInfo.Items.length=1;
          col.LoadInfo.Items[0]=itm;
          col.Displays.PartialSynchronize(col.LoadInfo);
        };
        return itm;
      };
      _col.Delete=function(dbItem){
        var col=this;
        dbItem.Free();
        if (col.Displays) col.Displays.Synchronize();
      };
      _col.createItem=function(){
        var col=this;
        var itm=col.Fields.Clone();
        itm.Reset();
        return itm;
      };
    };
    _col.fromXML=function(xDoc,xNode){
      var col=this;
      col.Loading=true;
      col.Groups.Reset();
      if (col.Displays) col.Displays.startTorus();
      col.Fields.fromXML(xDoc,xNode,col);
      if (col.Items.onLoaded) col.Items.onLoaded();
      var itms=col.Items;
      if ((itms) && (col.Validate==true)) {
        var itm=null;
        var idx=null;
        for (var iLcv=0; iLcv<itms.length; iLcv++) {
          itm=itms[iLcv];
          if ( (itm.Verified==false) && (itm.Collection==col)) {
            coDB.Recycle.push(itm);
          };
        };
        while (coDB.Recycle.length>0) {
          itm=coDB.Recycle.pop();
          idx=itms.indexOf(itm);
          if (idx>-1) itms.splice(idx,1);
          itm.Collection=null;
          itm.Free();
          itm=null;
        };
      };
      if (col.Displays) {
        col.Displays.Synchronize();
        col.Displays.stopTorus();
      };
      col.EventList.Fire(coDB.evkLoaded);
      col.Loading=false;
    };
    _col.toXML=function(){
      var col=this;
      if ( (col.Stanza!=null) && (col.Fields.hasItems==true) ) {
        var sXML="<"+col.Stanza+">";
        var itm=null;
        for (var iLcv=0; iLcv<col.Items.length; iLcv++){
          itm=col.Items[iLcv];
          sXML+=itm.toXML();
        };
        sXML+="</"+col.Stanza+">";
      } else {
        var sXML=col.Fields.toXML();
      };
      return sXML;
    };
    _col.Search=function(Field,Terms,List){
      var col=this;
      if (col.Fields.hasItems==true){
        var itm=null;
        for (var iLcv=0; iLcv<col.Items.length; iLcv++){
          itm=col.Items[iLcv];
          if (itm.MAP[Field.Name]) {
            itm.MAP[Field.Name].Search(itm,Terms,List);
          } else {
            itm.Search(Field,Terms,List);
          };
        };
      } else {
        col.Fields.Search(Field,Terms,List);
      };
    };
    _col.Lookup=function(Field,Terms,List){
      var col=this;
      if (col.Fields.hasItems==true){
        var itm=null;
        for (var iLcv=0; iLcv<col.Items.length; iLcv++){
          itm=col.Items[iLcv];
          if (itm.MAP[Field.Name]) {
            itm.MAP[Field.Name].Lookup(itm,Terms,List);
          } else {
            itm.Lookup(Field,Terms,List);
          };
        };
      } else {
        col.Fields.Lookup(Field,Terms,List);
      };
    };
    _col.Fields=coDB.Fields(Stanza2,_col,hasItems);
    _col.Stanza=Stanza1;
    _col.Stanza2=Stanza2;
    _col.EventList=coDB.createEventList(_col);
    _col.Clone=function(){
      var col=this;
      var clcol=coDB.createCollection(col.Parser,col.Stanza,col.Stanza2,col.hasItems);
      clcol.Fields.Clone(col.Fields);
      clcol.EventList=col.EventList.Clone(clcol);
      return clcol;
    };
    _col.Assign=function(srcCol){
      var col=this;
      if (col.Fields.hasItems==true) {
        col.Items.Clear();
        for (var iLcv=0; iLcv<srcCol.Items.length; iLcv++){
          var dbItm=srcCol.Items[iLcv];
          var dbNew=dbItm.Clone();
          col.Items.push(dbNew);
        };
      } else if (srcCol.Fields) {
        col.Fields.Assign(srcCol.Fields);
      } else if (srcCol) {
        col.Fields.Assign(srcCol);
      };
    };
    _col.Clear=function(){
      var col=this;
      if (col.Fields.hasItems==true) {
        col.Items.Clear();
      } else {
        col.Fields.Reset();
      };
      if (col.Displays) col.Displays.Synchronize();
    };
    _col.Free=function(){
      var col=this;
      if (col.DisplayMode) col.DisplayMode.Free();
      var idx=coDB.Collections.indexOf(col);
      if (idx>-1)
        coDB.Collections.splice(idx,1);
      if (col.onFree!=null)
        col.onFree();
      col.Fields=col.Fields.Free();
      if (col.LoadInfo)
        col.LoadInfo.Free();
      if (col.Items)
        col.Items.Clear();

      _col=Release(col);
      return null;
    };
    coDB.Collections.push(_col);
    return _col;
  }
};
DB.init();
