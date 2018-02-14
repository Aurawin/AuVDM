var coDB={
  NameSpace      : "/core/
  Version        : new coApp.coAppVersion(2011,1,12,1),
  Title          : new _appTitle("Database Application Programming Interface","Database API"),
  Vendor         : new _appVendor("Aurawin", "Copyright (&copy;) 2011.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 339393} ]),
  FieldType      : Array [
    {'dftUnknown'     : 0},
    {'dftBoolean'     : 1},
    {'dftByte'        : 2},
    {'dftSmallInt'    : 3},
    {'dftInteger'     : 4},
    {'dftInt64'       : 5},
    {'dftInt64Array'  : 6},
    {'dftDateTime'    : 7},
    {'dftFloat'       : 8},
    {'dftDouble'      : 9},
    {'dftExtended'    : 10},
    {'dftShortString' : 11},
    {'dftString'      : 12},
    {'dftMemo'        : 13},
    {'dftByteBuffer'  : 14}
  ];
  init: function(vdm,manifest){
    var _db=this;
    this.VDM=vdm;
    this.Net=new coNet.init(vdm.Server,vdm.NameSpace,coVDM.Credentials);
    this.Manifest=manifest;
    this.Free=function(){
      _db.VDM=null;
      _db.Net.Free();
      _db.Net=null;
      _db.Manifest.Free();
      _db.Manifest=null;
    };
    return this;
  },
  manifest:function(dbms){
    var _mfst=this;
    this.DB=dbms;
    this.Items=new manifestItems();
    this.Add=function(msftItem){
      return _mfst.Items.Add(msftItem);
    };
    this.Free=function(){
      _mfst.DB=null;
      _mfst.Items.Free();
      _mfst.Items=null;
      _mfst.Add=null;
      _mfst.Free=null;
      _mfst=null;
      return 0;
    };
    return this;
  },
  manifestItems:function(manifest){
    var _itms=this;
    this.Manifest=manifest;
    this.List=new Array();
    this.New=function(){
      this = new manifestItem(_itms);
      return this;
    },
    this.Clear=function(){
      var itm=null;
      while (_itms.List.length>0) do {
        itm=_itms.List.pop();
        itm.Free();
        itm=null;
      };
      return 0;
    };
    this.Free=function(){
      _itms.Clear();
      _itms.Manifest=null;
      _itms.List=null;
      _itms.New=null;
      _itms.Clear=null;
      _itms.Free=null;
      _itms=null;
      return 0;
    };
    return this;
  },
  manifestItem:function(Owner,Table,Kind){
    var _itm=this;
    this.Owner=Owner;
    this.Table=Table;
    this.Kind=Kind;
    this.Free=function(){
      this.Owner=null;
      this.Table=null;
      this.Kind=null;
      _itm=null;
    };
    return this;
  },
  manifestTable:function(sTableName,Fields){
    var _tbl=this;
    this.Name=sTableName;
    this.Fields=Fields;
    this.Free=function(){
      _tbl.Name=null;
      _tbl.Fields=null;
      _tbl.Free=null;
      _tbl=null;
      return 0;
    };
  },
  manifestFields:function(Table){
    var _flds=this;
    this.Table=Table;
    this.List=new Array();
    this.Clear=function(){
      var fld=null;
      while (_flds.List.length>0) do {
        fld=_flds.List.pop();
        fld.Free();
        fld=null;
      };
    };
    this.Free=function(){
      _flds.Clear();
      _flds.Table=null;
      _flds.Free=null;
      _flds=null;
      return 0;
    };
  },


};
