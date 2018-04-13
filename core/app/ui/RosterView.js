UI.RosterView = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  debugToConsole : true,
  Compiled       : false,

  ViewMode       : {'Email':1,'Phone':2,'Address':3},
  
  init: function(){
    this.Initialized=true;
    UI.Controls.Add(this);
  },
 
  releaseItemAsEmail:function(itm){
    itm.Title.removeChild(itm.Last);
    itm.Title.removeChild(itm.Sep);
    itm.Title.removeChild(itm.First);
    itm.Title.removeChild(itm.Middle);
    itm.Container.removeChild(itm.Title);
    itm.Wrapper.removeChild(itm.Avatar);
    itm.Wrapper.removeChild(itm.Value1);
    itm.Wrapper.removeChild(itm.Value2);
    itm.Wrapper.removeChild(itm.Value3);
    itm.Container.removeChild(itm.Wrapper);

    itm.Parent.removeChild(itm.Container);

    itm=coObject.Release(itm);
  },
  initItemAsEmail:function(itm){

    var rc=itm.Data.MAP;

    itm.getValue=function(){
      var itm=this;
      var rc=itm.Data.MAP;
      var sEmail="";
      switch (itm.Index){
        case (1) : {
          sEmail=rc.Email.Value;
          break;
        };
        case (2) : {
          sEmail=rc.Email2.Value;
          break;
        };
        case (3) : {
          sEmail=rc.Email3.Value;
          break;
        };
        default : {
           sEmail=rc.Email.Value;
        };
      };

      var sValue="".concat(
        rc.FirstName.Value+" ",
        rc.MiddleName.Value+" ",
        rc.LastName.Value+" <",
        sEmail,
        ">"
      );
      return sValue.replace(/\  /g," ");
    };

    itm.Title=document.createElement('div');
    itm.Container.appendChild(itm.Title);
    itm.Title.className=itm.Class+"Title";

    itm.Last=document.createElement('span');
    itm.Title.appendChild(itm.Last);
    itm.Last.className=itm.Class+"FamilyName";

    itm.Sep=document.createElement('span');
    itm.Title.appendChild(itm.Sep);
    itm.Sep.className=itm.Class+"SepName";
    coDOM.setText(itm.Sep,coLang.Table.Apps.Spectrum.Email.Seperator.Name);

    itm.First=document.createElement('span');
    itm.Title.appendChild(itm.First);
    itm.First.className=itm.Class+"FirstName";

    itm.Middle=document.createElement('span');
    itm.Title.appendChild(itm.Middle);
    itm.Middle.className=itm.Class+"MiddleName";

    itm.Wrapper=document.createElement('div');
    itm.Container.appendChild(itm.Wrapper);
    itm.Wrapper.className=itm.Class+"Wrapper";


    itm.Avatar=document.createElement('div');
    itm.Wrapper.appendChild(itm.Avatar);
    itm.Avatar.className=itm.Class+"Avatar";


    itm.Value1=document.createElement('div');
    itm.Wrapper.appendChild(itm.Value1);
    itm.Value1.className=itm.Class+"Email1";
    itm.Value1.Owner=itm;
    itm.Value1.onclick=function(e){ this.Owner.Index=1; this.Owner.Owner.Owner.onSelectItem(this.Owner);};

    itm.Value2=document.createElement('div');
    itm.Wrapper.appendChild(itm.Value2);
    itm.Value2.className=itm.Class+"Email2";
    itm.Value2.Owner=itm;
    itm.Value2.onclick=function(e){ this.Owner.Index=2; this.Owner.Owner.Owner.onSelectItem(this.Owner);};


    itm.Value3=document.createElement('div');
    itm.Wrapper.appendChild(itm.Value3);
    itm.Value3.className=itm.Class+"Email3";
    itm.Value3.Owner=itm;
    itm.Value3.onclick=function(e){ this.Owner.Index=3; this.Owner.Owner.Owner.onSelectItem(this.Owner);};


    itm.Synchronize=function(rc){
      var itm=this;
      var m=rc.MAP;
      itm.Container.style.display=(rc.Visible==true)? "block" : "none";
      itm.Hidden=(rc.Visible!=true);
      itm.Visible=(rc.Visible==true);
      coDOM.setText(itm.First,m.FirstName.Value);
      coDOM.setText(itm.Middle,m.MiddleName.Value);
      coDOM.setText(itm.Last,m.LastName.Value);
      if (m.AvatarID.Value!=0)
        coDOM.setBackgroundImage(itm.Avatar,coAvatar.URI_AVATAR.replace("$id",m.AvatarID.Value));
      coDOM.setText(itm.Value1,m.Email.Value);
      coDOM.setText(itm.Value2,m.Email2.Value);
      coDOM.setText(itm.Value3,m.Email3.Value);
    };

    itm.Data.Display.addItem(itm,itm.Owner.Owner);
  },
  createItems :function(Owner,Parent){
    var itms=new Array();
    itms.Clearing=false;
    itms.Owner=Owner;
    itms.Parent=Parent;
    itms.Class="RosterViewItems";
    itms.Container=document.createElement('div');
    itms.Parent.appendChild(itms.Container);
    itms.Container.className=itms.Class;
    itms.Container.tabIndex=0;
    itms._initItem=null;
    itms._releaseItem=null;
    switch (Owner.ViewMode) {
      case (this.ViewMode.Email) : {
        itms._initItem=this.initItemAsEmail;
        itms._releaseItem=this.releaseItemAsEmail;
        break;
      };
      case (this.ViewMode.Phone) : {
        break;
      };
      case (this.ViewMode.Address) : {
        break;
      };
    };
    itms.Add=function(Data){
      var itms=this;
      var itm=coObject.Create(coObject.relInline,coObject.copyAsVar,"RosterViewItem");
      itm.Slide=itms.Owner;
      itm.Owner=itms;
      itm.Container=document.createElement('div');
      itm.Parent=itms.Container;
      itm.Parent.appendChild(itm.Container);
      itm.Container.className=itm.Class;
      itm.Data=Data;
      itm.Index=1;
      itm.Visible=true;
      itm.getValue=null;
      itm.Free=function(){
        var itm=this;
        var itms=this.Owner;
        if (itms.Clearing==false) itms.Remove(itm);

        itms._releaseItem(itm);

        return null;
      };
      itm.Conseal=function(){
        this.Visible=false;
        this.Hidden=true;
        this.Container.style.display="none";
      };
      itm.Reveal=function(){
        this.Visible=true;
        this.Hidden=false;
        this.Container.style.display="block";
      };
      itms._initItem(itm);
      itms.push(itm);
      return itm;
    };
    itms.Remove=function(itm){
      var idx=this.indexOf(itm);
      if (idx!=-1) this.splice(idx,1);
      return idx;
    };
    itms.Clear=function(){
      this.Clearing=true;
      try {
        var itm=this.pop();
        while (itm) {
          itm.Free();
          itm=this.pop();
        };
        this.Clearing=false;
      } catch (err){
        this.Clearing=false;
        throw err;
      };
    };
    itms.Free=function(){
      this.Clear();
      coObject.Release(this);
      return null
    };
    itms.setSize=function(){
      var itms=this;
      itms.Container.style.height=itms.Owner.Container.clientHeight+"px";
    };
    return itms;
  },
  Create : function (Name,Class,Screen,Slides,Owner,Parent,Align,Mode){
    if (Align==undefined) Align=coAppUI.Alignment.Client;
    if (Mode==undefined) Mode=this.ViewMode.Email;
    var rv=Slides.createSlide(Name,Class,Screen,Owner,Parent,Align);
    rv.Terms=null;
    rv.Results=new Array();
    rv.DataSet=coContacts.App.Screen.DB;
    rv.ViewMode=Mode;
    rv.Items=this.createItems(rv,rv.Container);
    rv.Container.tabIndex=0;
    rv.onSelectItem=function(itm){};
    rv.SyncItem=function(dbItem){
      var rv=this;
      var itm=dbItem.Display.getItem(rv);
      if (!itm) itm=rv.Items.Add(dbItem);
      itm.Synchronize(dbItem);
      dbItem.Verified=true;
    };
    rv.Search=function(Entry){
      var rv=this;
      var rc=itm=null,idx=0;
      Entry=Entry.toLowerCase();
      rv.Results.length=0;
      rv.Terms=Entry.split(" ");
      rv.DataSet.Search(rv.DataSet.Fields.MAP.FirstName,rv.Terms,rv.Results);
      rv.DataSet.Search(rv.DataSet.Fields.MAP.MiddleName,rv.Terms,rv.Results);
      rv.DataSet.Search(rv.DataSet.Fields.MAP.LastName,rv.Terms,rv.Results);
      rv.DataSet.Search(rv.DataSet.Fields.MAP.NickName,rv.Terms,rv.Results);

      if (rv.Items.length==rv.Results.length) {
        for (var iLcv=0; iLcv<rv.Items.length; iLcv++) {
          itm=rv.Items[iLcv];
          itm.Reveal();
        };
      } else {
        for (var iLcv=0; iLcv<rv.DataSet.Items.length; iLcv++) {
          rc=rv.DataSet.Items[iLcv];
          idx=rv.Results.indexOf(rc);
          if (idx==-1) {
            itm=rc.Display.getItem(rv);
            itm.Conseal();
          } else {
            itm=rc.Display.getItem(rv);
            itm.Reveal();
          };
        };
      };

    };
    rv.Synchronize=function(){
      var rv=this;
      if (rv.DataSet) {
        var itms=rv.DataSet.Items;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          if (itms[iLcv].Verified==true) {
            rv.SyncItem(itms[iLcv]);
          };
        };
      };
    };
    rv.doSetSize=function(){
      this.Items.setSize();
    };
    coContacts.App.Screen.DB.Displays.Add(rv);
    return rv;
  }
};
