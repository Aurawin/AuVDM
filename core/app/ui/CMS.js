UI.CMS = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  Compiled       : false,
  uriAce             : '/core/vdm/editor/ace/ace.js',

  aceLoaded      : false,
  Aces           : new Array(),
  init:function(){
    this.Initialized=true;
    UI.Controls.Add(this);  
  },
  checkForAce:function(){
    if (this.aceLoaded!=true){
      coDOM.loadScript(
        coAppUI.App,
        this.uriAce,
        function(){
          coAppUI.App.Components.CMS.aceLoaded=true;
        },
        function(){

        }
      );
    };
  },
  createEditor:function(Name,Class,Owner){
    if (this.Aces.lastID==undefined) this.Aces.lastID=1;
    var edt=Owner.Slides.createSlide(
      Name,
      Class,
      Owner.Screen,
      Owner,
      Owner.Container
    );
    edt.onCursorChanged=null;
    edt.onSave=null;

    edt.ID=this.Aces.lastID;
    this.Aces.lastID+=1;
    this.Aces.push(edt);
    edt.Container.setAttribute('id',"CMSAce"+edt.ID);
    edt.Container.setAttribute('name',Name);
    edt.Container.className=Class;
    edt.Control=ace.edit(edt.Container);
    edt.Control.Owner=edt;
    edt.Control.setReadOnly(false);
    edt.doCursorChange=function(e,selection){
      var edt=selection.Owner.Owner;
      if ((edt.Loading==false) && (edt.onCursorChanged))
        edt.onCursorChanged(selection.selectionLead.column,selection.selectionLead.row);
    };
    edt.Control.selection.Owner=edt.Control;
    edt.Control.selection.on("changeCursor",edt.doCursorChange);
    edt.doFree=function(){
      var edt=this;
      var lst=coAppUI.App.Components.CMS.Aces;
      var idx=lst.indexOf(edt);
      if (idx>-1) lst.splice(idx,1);
      edt.Control.destroy();
    };
    edt.Control.commands.addCommand({
      name: "save",
      bindKey: {win: "Ctrl-S", mac: "Command-Option-S"},
      exec: function(editor) {
        var edt=editor.Owner;
        if (edt.onSave) edt.onSave();
      }
    });

    return edt;
  },
  createCommands:function(){
    var c=coDB.createCollection(coXML.Parser,"cmds","cmd",coDB.HasItems,coDB.HasNoDisplays);
    c.Fields.addField("Name",coDB.Kind.String,"nme","",coDB.StreamOff);
    c.Fields.addField("Hint",coDB.Kind.String,"hnt","",coDB.StreamOff);
    c.Fields.addField("ActiveName",coDB.Kind.String,"ane","",coDB.StreamOff);
    c.Fields.addField("ActiveHint",coDB.Kind.String,"aht","",coDB.StreamOff);
    c.Fields.addField("Oneshot",coDB.Kind.Boolean,"ost",true,coDB.StreamOff);
    c.Fields.addField("State",coDB.Kind.Integer,"ste",0,coDB.StreamOff);
    c.Fields.addField("Method",coDB.Kind.Pointer,"mtd",null,coDB.StreamOff);
    return c;
  },
  createPropertySheet:function(){
    var ps=new coDB.Fields("ps",coDB.HasNoCollection,coDB.HasNoItems);
    return ps;
  },
  createPagePoint : function() {
    var pp=new coDB.Fields("pp",coDB.HasNoCollection,coDB.HasNoItems);
    pp.addField("FileID",coDB.Kind.QWord,"fild",0,coDB.StreamOn);
    pp.addField("FolderID",coDB.Kind.QWord,"fold",0,coDB.StreamOn);
    pp.addField("Space",coDB.Kind.String,"spc","http",coDB.StreamOn);
    pp.addField("URI",coDB.Kind.String,"uri","",coDB.StreamOn);
    pp.addField("Data",coDB.Kind.Base64,"data","",coDB.StreamOn);
    return pp;
  },
  createItems:function(Class){
    var c=coDB.createCollection(coXML.Parser,"itms","itm",coDB.HasItems,coDB.HasNoDisplays);
    c.Fields.addField("Class",coDB.Kind.String,"cls",Class,coDB.StreamOn);
    c.Fields.addField("Title",coDB.Kind.String,"ttl","",coDB.StreamOn);
    c.Fields.addField("Data",coDB.Kind.Base64,"data","",coDB.StreamOn);
    c.Fields.onLoaded=function(c){
      if (c.MAP.Title.Value.indexOf("coLang.")==0)
        c.MAP.Title.Value=eval(c.MAP.Title.Value);
    };
    return c;
  },
  createManifest:function(Owner,Class){
    var m=new coDB.Fields("mfst",coDB.HasNoCollection,coDB.HasNoItems);
    m.Owner=Owner;
    m.addField("Class",coDB.Kind.String,"cls",Class,coDB.StreamOn);
    m.addField("Title",coDB.Kind.String,"ttl","",coDB.StreamOn);
    m.addField("Items",coDB.Kind.Collection,"itms",this.createItems(Class+"Item"),coDB.StreamOn);
    m.addField("PagePoint",coDB.Kind.Fields,"pp",this.createPagePoint(),coDB.StreamOff);
    m.setURI=function(sURI){
      var pp=this.MAP.PagePoint.Value;
      pp.MAP.URI.Value=sURI;
      coCMS.App.DB.Commands.Discover(this);
    };
    m.Components=new Object();
    return m;
  },
  createTools    : function (Owner,Parent,Class,Commands) {
    if (Class==undefined) Class="";
    if (Commands==undefined) Commands=coAppUI.App.Components.CMS.createCommands();
    tls=document.createElement('div');
    tls.Owner=Owner;
    tls.Parent=Parent;
    tls.Parent.appendChild(tls);
    tls.className=(Class.length>0)? Class+"CMSTools CMSTools" : "CMSTools";
    sState=(coCMS.Tools.Enabled==true) ? "enabled":"disabled";
    tls.setAttribute("CMS",sState);
    tls.setAttribute("role","navigation");
    tls.Data=null;
    tls.Commands=Commands;
    coCMS.Tools.push(tls);

    for (var iLcv=0; iLcv<tls.Commands.Items.length; iLcv++){
      var cmd=tls.Commands.Items[iLcv];
      var btn=cmd.Display=document.createElement('div');
      tls.appendChild(btn);
      btn.className="CMSTool";
      btn.Owner=tls;
      btn.Command=cmd;
      coDOM.setText(btn,cmd.MAP.Name.Value);
      coDOM.setHint(btn,cmd.MAP.Hint.Value);
      btn.setAttribute("role","navigation");
      btn.onmouseup=btn.ontouchend=function(){
        var tls=this.Owner;
        var cmd=this.Command;
        var rcItem=tls.Data;

        switch (cmd.MAP.State.Value) {
          case (0) : {
            if (cmd.MAP.Oneshot.Value==true) {
              cmd.MAP.State.Value=0;
            } else {
              cmd.MAP.State.Value=1;
              coDOM.setText(this,cmd.MAP.ActiveName.Value);
              coDOM.setHint(this,cmd.MAP.ActiveHint.Value);
            };
            cmd.MAP.Method.Value(cmd,this.Owner);
            break;
          };
          case (1) : {
            cmd.MAP.State.Value=0;
            cmd.MAP.Method.Value(cmd,this.Owner);
            coDOM.setText(this,cmd.MAP.Name.Value);
            coDOM.setHint(this,cmd.MAP.Hint.Value);
            break;
          };
        };
      };
      btn.Free=function(){
        var tls=this.Owner;
        tls.removeChild(this);
      };
    };
    tls.Free=function(){
      var tls=this;
      tls.Commands.Free();
      tls.Data.Free();
      coCMS.Tools.Remove(tls);
      tls.Parent.removeChild(tls);
      return null;
    };
    return tls;
  }
};


