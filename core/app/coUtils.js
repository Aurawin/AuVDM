var coUtils= {
  Version : new Version(2015,5,22,64),
  Title   : new Title("Core Object Application Utilities","coUtils"),
  Vendor  : new Vendor("Aurawin", "Copyright (&copy;) 2011-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Digits  : "-0123456789",
  intToStr:function(val){
    var sVal=val.toString();
    var sOut="";
    var sSep=coLang.Table.Separate.Thousands;
    var iChMod=1;
    for (var iLcv=sVal.length-1; iLcv>-1; iLcv--){
      sOut=sVal[iLcv]+sOut;
      iChMod+=1;
      if (iChMod>3){
        if (iLcv>0) sOut=sSep+sOut;
        iChMod=1;
      };
    };
    return sOut;
  },
  extractPathName:function(Path){
    var idx=Path.lastIndexOf("/");
    if (idx!=-1)
      return Path.substring(idx+1);
    return Path;
  },
  extractFileName:function(FileName){
    var idx=FileName.lastIndexOf(".");
    if (idx!=-1)
      return FileName.substring(0,idx);
    return FileName;
  },
  extractFileExt:function(FileName){
    var ext=FileName;
    var idx=FileName.lastIndexOf(".");
    if (idx!=-1)
      ext=FileName.substring(idx+1);
    return ext;
  },
  changeFileExt:function(FileName,Ext){
    var idx=FileName.lastIndexOf(".");
    if (idx>0){
      sName=FileName.substring(0,idx);
      sName=sName.concat(Ext);
    } else {
      sName=FileName.concat(".".concat(Ext));
    };
    return sName;
  },
  xBias:function(itm){
    var marginLeft =(itm.style.marginLeft=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-left')) : coUtils.parseInt(itm.style.marginLeft);
    var marginRight = (itm.style.marginRight=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-right')) : coUtils.parseInt(itm.style.marginRight);
    var paddingLeft = (itm.style.paddingLeft=='') ? coUtils.parseInt(coUtils.getStyle(itm,'padding-left')) : coUtils.parseInt(itm.style.paddingLeft);
    var paddingRight = (itm.style.paddingRight=='') ? coUtils.parseInt(coUtils.getStyle(itm,'padding-right')) : coUtils.parseInt(itm.style.paddingRight);

    return paddingLeft + paddingRight + marginLeft + marginRight;
  },
  yBias:function(itm){
    var marginTop =(itm.style.marginTop=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-top')) : coUtils.parseInt(itm.style.marginTop);
    var marginBottom = (itm.style.marginBottom=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-bottom')) : coUtils.parseInt(itm.style.marginBottom);
    var paddingTop = (itm.style.paddingTop=='') ? coUtils.parseInt(coUtils.getStyle(itm,'padding-top')) : coUtils.parseInt(itm.style.paddingTop);
    var paddingBottom = (itm.style.paddingBottom=='') ? coUtils.parseInt(coUtils.getStyle(itm,'padding-bottom')) : coUtils.parseInt(itm.style.paddingBottom);
    return paddingTop + paddingBottom + marginTop + marginBottom;
  },
  xRightBias:function(itm){
    var marginRight = (itm.style.marginRight=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-right')) : coUtils.parseInt(itm.style.marginRight);
    var paddingRight = (itm.style.paddingRight=='') ? coUtils.parseInt(coUtils.getStyle(itm,'padding-right')) : coUtils.parseInt(itm.style.paddingRight);
    return paddingRight + marginRight;
  },
  yBottomBias:function(itm){
    var marginBottom = (itm.style.marginBottom=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-bottom')) : coUtils.parseInt(itm.style.marginBottom);
    var paddingBottom = (itm.style.paddingBottom=='') ? coUtils.parseInt(coUtils.getStyle(itm,'padding-bottom')) : coUtils.parseInt(itm.style.paddingBottom);
    return paddingBottom + marginBottom;
  },
  yTopBias:function(itm){
    var marginTop =(itm.style.marginTop=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-top')) : coUtils.parseInt(itm.style.marginTop);
    var paddingTop = (itm.style.paddingTop=='') ? coUtils.parseInt(coUtils.getStyle(itm,'padding-top')) : coUtils.parseInt(itm.style.paddingTop);
    return paddingTop + marginTop;
  },
  yMarginBias:function(itm){
    var marginTop =(itm.style.marginTop=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-top')) : coUtils.parseInt(itm.style.marginTop);
    var marginBottom = (itm.style.marginBottom=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-bottom')) : coUtils.parseInt(itm.style.marginBottom);
    return marginTop+marginBottom;
  },
  xMarginBias:function(itm){
    var marginLeft =(itm.style.marginLeft=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-left')) : coUtils.parseInt(itm.style.marginLeft);
    var marginRight = (itm.style.marginRight=='') ? coUtils.parseInt(coUtils.getStyle(itm,'margin-right')) : coUtils.parseInt(itm.style.marginRight);
    return marginLeft+marginRight;
  },

  indexOfOptionByValue:function(elm,Value){
    for (var iLcv=0; iLcv<elm.options.length; iLcv++){
      var opt=elm.options[iLcv];
      if (opt.Value==Value)
        return iLcv;
    };
    return -1;
  },

  randomString: function(BlockSize,BlockCount,Delim){
    var sValue="";
    if (BlockSize==undefined) BlockSize=4;
    if (BlocCount==undefined) BlockCount=1;
    if (Delim==undefined) Delim=".";
    for (var iLcv=0; iLcv<BlockCount; iLcv++){
      var sBlock="";
      var iCt=Math.floor(Math.random() * BlockSize);
      for (bLcv=0; bLcv<iCt; bLcv++){
        var idx = Math.floor(Math.random() * AlphaNumeric.length);
        sBlock+=AlphaNumeric.substring(idx,idx+1);
      };
      sValue+=sBlock+Delim;
    };
    return sValue;

  },
  parseInt : function(sVal,Def){
    if (Def==undefined) Def=0;
    if (sVal==null) return Def;
    sInt="";
    for (var iLcv=0; iLcv<sVal.length; iLcv++){
      var chr=sVal.charAt(iLcv);
      var idx=coUtils.Digits.indexOf(chr);
      if (idx!=-1){
        sInt+=chr;
      } else {
        break;
      };
    };
    return (sInt.length>0) ? parseInt(sInt) : Def;
  },
  getStyle : function(el, css){
      if(!el || el.style==undefined) return '';
      var val= '', str= css.toLowerCase();
      if(/\-/.test(css)){
          str= css.replace(/\-[a-z]/g, function(w){
              return w.charAt(1).toUpperCase() + w.substring(2);
          })
      };
      val=el.style[str];
      if(!val){
          if (el.currentStyle) {
            val= el.currentStyle[str] ;
          } else {
              var dv= document.defaultView || window;
              if(dv && dv.getComputedStyle){
                  val= dv.getComputedStyle(el,'').getPropertyValue(css);
              }
          }
      };
      return (val)? val: '';
  },

  getLeft : function (Start,Finish){
    if (Start==Finish) return 0;
    var node=Start; iLeft=0;
    while (node!=null)  {
      iLeft+=node.offsetLeft;
      if (node!=Finish) {
        node= node.offsetParent;
      } else {
       return iLeft;
      };
    };
    return iLeft;
  },
  getOffsetLeft : function (Start,Finish){
    if (Start==Finish) return 0;
    var node=Start; iLeft=0;
    // test
    while (node!=null) {
      iLeft+=node.offsetLeft;
      if (node!=Finish) {
        node= node.parentElement;
      } else {
       return iLeft;
      };
    };
    return iLeft;
  },
  getScrollTop : function (Start,Finish){
    if (Start==Finish) return 0;
    var node=Start; iTop=0;
    while (node!=null)  {
      iTop+=node.scrollTop;
      if (node!=Finish) {
        node= node.parentElement;
      } else {
       return iTop;
      };
    };
    return iTop;
  },
  getOffsetTop : function (Start,Finish){
    if (Start==Finish) return 0;
    var node=Start; iTop=0;
    while (node!=null)  {
      iTop+=node.offsetTop;
      if (node!=Finish) {
        node= node.parentElement;
      } else {
       return iTop;
      };
    };
    return iTop;
  }
};

