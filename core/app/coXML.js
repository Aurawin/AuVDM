var coXML= {
  Version        : new Version(2014,10,28,32),
  Title          : new Title("Core Object XML","coXML"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
  CDATA_OFF      : false,
  CDATA_ON       : true,
  createParser   : createParser,
  Parser         : createParser(),
  init  : function(){
    this.nodeValue=function(node){return node.textContent; };
  },
  Print : function (Name,Value){
    return "<"+Name+">"+Value+"</"+Name+">";
  },

  nodeValue      : null,
  nodeNamePrep: function(sValue){
    if (sValue==undefined) sValue="";
    sValue=sValue.replace(" ","-");
    sValue=sValue.replace("<","");
    sValue=sValue.replace(">","");
    sValue=sValue.toLowerCase();
    return sValue;
  },
  nodeXML:function(xNode){
    if (xNode==null) return "";
    switch (xNode.nodeType) {
      case (3) :
        var sXML="";
        if (xNode.nodeValue!=null)
          sXML+=xNode.nodeValue;
        for (var iLcv=0; iLcv<xNode.childNodes.length; iLcv++)
          sXML+=coXML.nodeXML(xNode.childNodes[iLcv]);
        return sXML;
      case (4) :
        var sXML="<![CDATA["+xNode.nodeValue+"]]>";
        return sXML;
      default:
        var sXML="<"+xNode.nodeName+">";
        if (xNode.nodeValue!=null)
          sXML+=xNode.nodeValue;
        for (var iLcv=0; iLcv<xNode.childNodes.length; iLcv++)
          sXML+=coXML.nodeXML(xNode.childNodes[iLcv]);
        sXML+="</"+xNode.nodeName+">";
        return sXML;
    };
  },
  getStanza    : function(xDoc,Stanza,Node){
   if (!Node) Node=xDoc.documentElement;
   if (Node.nodeName==Stanza) return Node;
   var nds=Node.childNodes; iLcv=0; nd=null;
   for (iLcv=0; iLcv<nds.length; iLcv++){
     nd=nds[iLcv];
     if (nd.nodeName==Stanza)
       return nd;
   };
   nd=null; nds=null;
   return null;
  },
  getChildByNameWithValue : function(nd,Name,Value){
   var Name=Name.toLowerCase();
   var nds=nd.childNodes;
   for (var iLcv=0; iLcv<nds.length; iLcv++){
     var nd=nds[iLcv];
     var ndVal=coXML.getChildByName(Name);
     var val=coXML.nodeValue(ndVal);
     if (val==Value)
       return nd;
   };
   return null;
  },
  getChildByName : function(nd,Name){
   var Name=Name.toLowerCase();
   var nds=nd.childNodes;
   for (var iLcv=0; iLcv<nds.length; iLcv++){
     var nd=nds[iLcv];
     if (nd.nodeName.toLowerCase()==Name)
       return nd;
   };
   nd=null; nds=null;
   return null;
  },
  IndexOfTag   : function (xTags,Name) {
    var sTag=Name.toLowerCase();
    for (var iLcv=0; iLcv<xTags.length; iLcv++) {
      if (xTags[iLcv].nodeName.toLowerCase()==sTag) {
        return iLcv;
      };
    };
    return -1;
  },
  TagAsInteger : function (xTags,Name,Default){
    if (! Default) Default=0;
    var idx=this.IndexOfTag(xTags,Name);
    if (idx !=-1) {
      return parseInt(this.nodeValue(xTags[idx]));
    } else {
      return Default;
    }
  },
  TagAsString : function(xTags,Name,Default){
    if (! Default) Default="";
    var idx=this.IndexOfTag(xTags,Name);
    if (idx != -1) {
      return this.nodeValue(xTags[idx]);
    } else {
      return Default;
    };
  },
  TagAsFloat : function(xTags,Name,Default){
    if (! Default) Default="";
    var idx=this.IndexOfTag(xTags,Name);
    if (idx != -1) {
      return parseFloat(xTags[idx].nodeValue);
    } else {
      return Default;
    };
  },
  TagAsInt64Array : function(xTags,Name,Default){
    if (! Default) Default=new Int64Array();
    var idx=this.IndexOfTag(xTags,Name);
    if (idx != -1) {
      return Default.fromString(xTags[idx].nodeValue,',');
    } else {
      return Default;
    };
  },
  Print:function(Tag,Value,AsCDATA){
    if (AsCDATA==undefined) AsCDATA=false;
    return (AsCDATA==true) ? "<" + Tag + ">" + "<![CDATA["+ Value + "]]></" + Tag + ">" : "<" + Tag + ">" + Value + "</" + Tag + ">";
  }
};
coXML.init();

