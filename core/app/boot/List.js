var List= {
  Unit           : '/core/app/boot/List.js',
  Loaded         : true,
  debugToConsole : false,
  NaN    : 'NaN',
  FreeOnClear : true,
  KeepOnClear : false,
  Pack : function (lst){
    var iLcv=0;
    while (iLcv<lst.length) {
      var itm=lst[iLcv];
      if (itm==null) {
          lst.splice(iLcv,1);
      } else {
          iLcv+=1;
      };
    };
  },
  StartsWith : function(sValue,List){
    for (var iLcv=0; iLcv<List.length; iLcv++){
      if (sValue.indexOf(List[iLcv])==0)
        return iLcv;
    };
    return -1;
  },
  Contains : function(sValue,List){
    for (var iLcv=0; iLcv<List.length; iLcv++){
      if (List[iLcv].indexOf(sValue)>-1)
        return iLcv;
    };
    return -1;
  },
  Search : function(saTerms,saValues){
    if (saValues==null) return -1;
    for (var iLcv=0; iLcv<saTerms.length; iLcv++)
      saTerms[iLcv]=saTerms[iLcv].replace(/\*/g, '\\w');
    for (var iLcv=0; iLcv<saTerms.length; iLcv++){
      for (var jLcv=0; jLcv<saValues.length;  jLcv++){
        if (saValues[jLcv].search(saTerms[iLcv])==0)
          return iLcv;
      };
    };
    return -1;
  },
  SortBy : function(field, reverse, primer){
   var key = primer ?
       function(x) {return primer(x[field])} :
       function(x) {return x[field]};
   reverse = [-1, 1][+!!reverse];
   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
   };
  },
  Split : function(sData) {
    return (sData.indexOf("\r")==-1) ? sData.split("\n") : sData.split("\r\n");
  },
  ObjectList : function(FreeOnClear){
    if (FreeOnClear==undefined) FreeOnClear=true;
    var ol=new Array();
    ol.Class="ObjectList";
    ol.FreeOnClear=true;
    ol.getItemByProperty=function(Property,Value){
      var ol=this;
      for (var iLcv=0; iLcv<ol.length; iLcv++){
        if (ol[iLcv][Property]==Value) return ol[iLcv];
      };
      return null;
    };
    ol.Remove=function(obj){
      var ol=this;
      var idx=ol.indexOf(obj);
      if (idx>-1) ol.splice(idx,1);
    };
    ol.Clear=function(){
      var ol=this;
      var obj=null;
      if (ol.FreeOnClear==true) {
        while (ol.length>0) {
          obj=ol.pop();
          obj.Free();
          obj=null;
        };
      } else {
        ol.length=0;
      };
      return 0;
    };
    ol.Free=function(){
      var ol=this;
      ol.Clear();
      ol=null;
      return null;
    };
    return ol;
  },
  createTreeList : function(Parent){
    var self=new Object();
    self.Class="treeList";
    self.Level=0;
    self.Parent = (Parent) ? Parent : null;
    self.Items=new Array();
    self.Items.Add=function(Name){
      var itm=new _lst._item(Name);
      return itm;
    };
    self.onAddItem=null;
    self.Items._item=function(Name,Default){
      var _itm=this;
      if (! Default) Default=false;
      _itm.Default=false;
      _itm.Parent=self;
      _itm.Name=Name;
      _itm.Level=self.Level;
      _itm.Items=new coList.treeList(_itm);
      _itm.Items.Level+=1;
      _itm.Parent.Items.push(_itm);
      if (Default) _itm.Parent.Items.setDefault(_itm);
      if (self.onAddItem) self.onAddItem(_itm);
      return _itm;
    };
    self.getDefault=function(){
      var itm=null; iLcv=0;
      for (iLcv=0; iLcv<self.Items.length; iLcv++){
        itm=self.Items[iLcv];
        if (itm.Default==true)
          return itm;
      };
      return null;
    };
    self.getDefaults=function(List,Deep){
      var itm=null;
      if (!Deep) Deep=3;
      itm=self.getDefault;
      if (itm!=null) {
        List.push(itm);
        Deep--;
        if (Deep>=0)
          itm.Items.getDefaults(List,Deep);
      };
    };
    self.Items.setDefault=function(itm){
      var _itm=null; iLcv=0;
      for (iLcv=0; iLcv<self.Items.length; iLcv++){
        _itm=self.Items[iLcv];
        if (_itm==itm) {
          _itm.Default=true;
        } else {
          _itm.Default=false;
        };
      };
    };
    self.Search=function(Path){
      var saPath=Path.split("/");
      if ( (saPath.length>0) && (saPath[0]=="") ) saPath.slice(0,1);
      if (saPath.length>0) {
        var itm=self.Find(saPath[0]);
        if (itm!=null) {
          saPath.slice(0,1);
          if (saPath.length>0) {
            Path=saPath.join("/");
            return itm.Items.Search(Path);
          } else {
            return itm;
          };
        } else {
          return null;
        };
      } else {
        return null;
      };
    };
    self.Find=function(Name){
      var itm=null;
      for (var iLcv=0; iLcv<self.Items.length; iLcv++){
        itm=self.Items[iLcv];
        if (itm.Name==Name) {
          return itm;
        };
      };
      return null;
    };
    self.IndexOf=function(Name){
      var itm=null;
      for (var iLcv=0; iLcv<self.Items.length; iLcv++){
        itm=self.Items[iLcv];
        if (itm.Name==Name) {
          return iLcv;
        };
      };
      return -1;
    };
    return self;
  },
  createStringArray : function(){
    var _lst=new Array();
    _lst.Class="StringArray";
    _lst.recurseRelease=false;
    _lst.copyAsVar=true;

    _lst.Clear=function(){
      var lst=this;
      while (lst.length>0) {
        var itm=lst.pop();
        itm.length=0;
        itm=null;
      };
    };
    _lst.Assign=function(srcList){
      var lst=this;
      lst.length=srcList.length;
      for (var iLcv=0; iLcv<srcList.length; iLcv++)
        lst[iLcv]=srcList[iLcv];
    };
    _lst.Add=function(Value){
      var lst=this;
      return lst.push(Value)-1;
    };
    _lst.Remove=function(Value){
      var lst=this;
      var idx=lst.IndexOf(Value);
      if (idx!=-1) {
        lst.splice(idx,1);
        return true;
      } else {
        return false;
      };
    };
    _lst.buildIndex=function(){
      var lst=this;
      var saIdx=new Array();
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var saVal=lst[iLcv].toLowerCase().split(/[\s,\'\:\-\*\!\@\#\$\%\^\&\(\)\_\+\{\}]+/);
        for (var saLcv=0; saLcv<saVal.length; saLcv++)
          if (saIdx.indexOf(saVal[saLcv])==-1)
            saIdx.push(saVal[saLcv]);
      };
      return saIdx;
    };
    _lst.Lookup=function(Terms){
      var lst=this;
      for (var iLcv=0; iLcv<Terms.length; iLcv++){
        Term=Terms[iLcv];
        var idx=lst.IndexOf(Term);
        if (idx>-1) return idx;
      };
      return -1;
    };
    _lst.Lookup=function(Terms){
      var lst=this;
      for (var iLcv=0; iLcv<Terms.length; iLcv++){
        Term=Terms[iLcv];
        var idx=lst.IndexOf(Term);
        if (idx>-1) return idx;
      };
      return -1;
    };
    _lst.IndexOf=function(Value){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        if (lst[iLcv]==Value) return iLcv;
      };
      return -1;
    };
    _lst.fromString=function(Value,Delimitor){
      var lst=this;
      lst.Clear();
      var saItems=Value.split(Delimitor);
      for (var iLcv=0; iLcv<saItems.length; iLcv++){
        lst.Add(saItems[iLcv]);
      };
      saItems.length=0;
      saItems=null;
      return lst.length;
    };
    _lst.Clone=function(){
      var clone=coList.StringArray();
      clone.length=this.length;
      for (var iLcv=0; iLcv<clone.length; iLcv++)
        clone[iLcv]=this[iLcv];
      return clone;
    };
    _lst.toString=function(Delimitor){
      var lst=this;
      var sItems="";
      if (!Delimitor) Delimitor=",";
      for (var iLcv=0; iLcv<lst.length-1; iLcv++){
        sItems+=lst[iLcv]+Delimitor;
      };
      if (lst.length>0)
        sItems+=lst[iLcv]+"";
      return sItems;
    };
    _lst.itemAsQword=function(idx,def){
      if (def==undefined) def=0;
      var lst=this;
      return ((idx<lst.length) && (idx>-1)) ? coUtils.parseInt(lst[idx]) : def;
    };
    _lst.Free=function(){
      var lst=this;
      lst.Clear();
      lst=coObject.Release(lst);
      return null;
    };
    return _lst;
  },
  createInt64Array : function(){
    var _lst=new Array();
    _lst.Clear=function(){
      var lst=this;
      lst.length=0;
    };
    _lst.Add=function(Value){
      var lst=this;
      return lst.push(Value)-1;
    };
    _lst.Remove=function(Value){
      var lst=this;
      var idx=lst.IndexOf(Value);
      if (idx!=-1) {
        lst.splice(idx,1);
        return true;
      } else {
        return false;
      };
    };
    _lst.Lookup=function(Terms){
      var lst=this;
      for (var iLcv=0; iLcv<Terms.length; iLcv++){
        Term=Terms[iLcv];
        var idx=lst.IndexOf(Term);
        if (idx>-1) return idx;
      };
      return -1;
    };
    _lst.IndexOf=function(Value){
      var lst=this;
      for (iLcv=0; iLcv<lst.length; iLcv++){
        if (lst[iLcv]==Value) return iLcv;
      };
      return -1;
    };
    _lst.Assign=function(srcList){
      var lst=this;
      lst.length=srcList.length;
      for (var iLcv=0; iLcv<srcList.length; iLcv++)
        lst[iLcv]=srcList[iLcv];
    };
    _lst.fromString=function(Value,Delimitor){
      var lst=this;
      lst.Clear();
      var saItems=Value.split(Delimitor);
      for (var iLcv=0; iLcv<saItems.length; iLcv++){
        var iVal=coUtils.parseInt(saItems[iLcv],coList.NaN);
        if (iVal!=coList.NaN) lst.Add(iVal);
      };
      saItems=null;
      return lst.length;
    };
    _lst.toString=function(Delimitor){
      var lst=this;
      var sItems="";
      for (var iLcv=0; iLcv<lst.length-1; iLcv++){
        sItems+=lst[iLcv]+""+Delimitor;
      };
      if (lst.length>0)
        sItems+=lst[iLcv]+"";
      return sItems;
    };
    _lst.Clone=function(){
      var lst=this;
      var nl=coList.Int64Array();
      nl.Assign(lst);
      return nl;
    };
    _lst.Free=function(){
      var lst=this;
      lst.Clear();
      lst.Clear=null;
      lst.fromString=null;
      lst.toString=null;
      lst.IndexOf=null;
      lst.Remove=null;
      lst.Add=null;
      lst.Assign=null;
      lst.Free=null;
      lst=null;
      return null;
    };
    return _lst;
  },
  createKPList:function (sepField,sepItem){
    var _lst=new Array();
    if (!sepField) sepField="=";
    if (!sepItem) sepItem="\r\n";
    _lst.sepItem=sepItem;
    _lst.sepField=sepField;
    _lst.Clearing=false;
    _lst.recurseRelease=false;
    _lst.buildIndex=function(){
      var lst=this;
      var saIdx=new Array();
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var saVal=lst[iLcv].Name.toLowerCase().split(/[\s,\'\:\-\*\!\@\#\$\%\^\&\(\)\_\+\{\}]+/);
        for (var saLcv=0; saLcv<saVal.length; saLcv++)
          if (saIdx.indexOf(saVal[saLcv])==-1)
            saIdx.push(saVal[saLcv]);
        var saVal=lst[iLcv].Value.toLowerCase().split(' ');
        for (var saLcv=0; saLcv<saVal.length; saLcv++)
          if (saIdx.indexOf(saVal[saLcv])==-1)
            saIdx.push(saVal[saLcv]);
      };
      return saIdx;
    };
    _lst.Update=function(Key,Value){
      var lst=this;
      var idx = lst.IndexOf(Key);
      if (idx!=-1){
        lst[idx].Value=Value;
      } else {
        idx=lst.Add(Key,Value);
      }
      return idx;
    };
    _lst.onAddItem=null;
    _lst.onDeleteItem=null;
    _lst.toString=function(){
      var lst=this;
      var sOut=""; iLen=0; iSepLen=lst.sepItem.length;
      for (var iLcv=0; iLcv<lst.length; iLcv++) {
        sOut+=lst[iLcv].Name+lst.sepField+lst[iLcv].Value+lst.sepItem;
      };
      if ((lst.length>0) && (iSepLen>0)) {
        iLen=sOut.length;
        sOut=sOut.slice(0,iLen-iSepLen);
      };
      return sOut;
    };
    _lst.Lookup=function(Terms){
      var lst=this;
      for (var iLcv=0; iLcv<Terms.length; iLcv++){
        Term=Terms[iLcv];
        var idx=lst.IndexOf(Term);
        if (idx>-1) return idx;
      };
      return -1;
    };
    _lst.Assign=function(srcList){
      var lst=this;
      lst.fromString(srcList.toString());
    };
    _lst.fromString=function(Data){
      var lst=this;
      var saTemp=Data.split(lst.sepItem);
      var sName="";
      var sValue="";
      lst.Clear();
      for (var iLcv=0; iLcv<saTemp.length; iLcv++){
        var saItem=saTemp[iLcv].split(lst.sepField);
        (saItem[0]==null) ? sName="" : sName=saItem[0];
        (saItem[1]==null) ? sValue="" : sValue=saItem[1];
        lst.Add(sName,sValue);
      };
      return lst.length;
    };
    _lst.IndexOf=function(sKey){
      var lst=this;
      var iResult=-1;

      if (!sKey) sKey="";

      var sKey=sKey.toLowerCase();
      var iLcv=0;
      while ( (iLcv<lst.length) && (iResult==-1)){
        if (lst[iLcv].Name.toLowerCase()==sKey)
          iResult=iLcv;
        iLcv++;
      };
      return iResult;
    };
    _lst.getValueAsInt=function(sKey,iDefault){
      var lst=this;
      if (!sKey) sKey="";
      if (!iDefault) iDefault=0;
      var iIndex=lst.IndexOf(sKey)
      if (iIndex==-1) {
        return iDefault
      } else{
        return coUtils.parseInt(lst[iIndex].Value,0);
      };
    };
    _lst.getValue=function(sKey,sDefault){
      var lst=this;
      if (!sKey) sKey="";
      if (!sDefault) sDefault="";
      var iIndex=lst.IndexOf(sKey)
      if (iIndex==-1){
        return sDefault;
      } else {
        return lst[iIndex].Value;
      }
    };
    _lst.Clear=function(){
      var lst=this;
      lst.Clearing=true;
      for (var iLcv=0; iLcv<lst.length; iLcv++) {
        var itm=lst[iLcv];
        itm.Free();
        itm=null;
      };
      lst.length=0;
      lst.Clearing=false;
      return 0;
    };
    _lst.Add=function(Name,Value){
      var lst=this;
      return lst._Item(Name,Value);
    };
    _lst.inValidate=function(){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        var itm=lst[iLcv];
        itm.Verified=false;
      };
    };
    _lst._Item=function(Name,Value){
      var lst=this;
      var _itm=new Object();
      _itm.recurseRelease=false;
      _itm.copyAsVar=true;
      _itm.List=lst;
      _itm.Name=Name;
      _itm.Value=Value;
      _itm.Checked=false;
      _itm.Delete=false;
      _itm.Verified=false;
      _itm.Options=null;
      _itm.Data=null;
      _itm.SubItems=new Array();
      _itm.Clear=function(){
        var itm=_itm;
        itm.Name="";
        itm.Value="";
        return itm;
      };
      _itm.Index=function(){
        var itm=_itm;
        var iIndex=-1;
        var iLcv=0;
        while (  (iLcv<itm.List.length) && (iIndex==-1) ) {
          if (itm.List[iLcv]==itm) {
            iIndex=iLcv;
          };
          iLcv++;
        };
        return iIndex;
      };
      _itm.Free=function(){
        var itm=this;

        if (itm.List.Clearing!=true){
          var iIndex=itm.Index();
          if (iIndex!=-1) {
            if (itm.List.onDeleteItem!=null)
              itm.List.onDeleteItem(itm);
            itm.List.splice(iIndex,1);
          };
        };
        itm.Data=null;
        itm.List=null;
        return _itm=itm=Release(itm);
      };
      var idx=_itm.List.push(_itm)-1;
      if (_itm.List.onAddItem!=null)
        _itm.List.onAddItem(_itm,idx);
      return _itm;
    };
    _lst.Free=function(){
      var lst=this;
      lst.Clear();
      _lst=Release(lst);
    };
    return _lst;
  },
  aggWidth : function(node){
    var iLcv=0; cNode=null; iWidth=0;
    for (iLcv=0; node.childNodes.length; iLcv++){
      cNode=node.childNodes[iLcv];
      if (cNode.style.visibility=="visible"){
          iWidth+=cNode.offsetWidth;
          if (cNode.childNodes.length>0)
            iWidth+=coUtils.aggWidth(cNode);
      };
    };
    return iWidth;
  },
  createArray : function(){
    const a=new Array();
    a.Class="Array";
    a.Clear=function(){
      let a = this;
      a.splice(0,a.length);
    }
    a.Assign=function(src){
      let a = this;
      a.Clear();
      for (iLcv=0; iLcv<src.length; iLcv++){
        a.push(src[iLcv]);
      }
    }
    a.Remove=function(src){
      let a=this;
      let idx = a.indexOf(src);
      if (idx>-1) a.splice(idx,1);
    }
    return a;
  }
};
if (!Array.indexOf) {
  Array.prototype.indexOf=function(val){
    for (var iLcv=0; iLcv<this.length; iLcv++) {
      if (this[iLcv] == val) {
        return iLcv;
      };
    };
    return -1;
  };
};


