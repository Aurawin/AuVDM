coAppUI.App.Components.TreeNav = {
  Version        : new Version(2015,8,21,4),
  Title          : new Title("Aurawin Tree Navigation","TreeNav"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2015.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/TreeNav.js',coAppKit.PreLoaded),
  debugToConsole : false,
  Create         : function(sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Client;
    var _tn=Slides.createSlide(sName,sClass,Screen,Owner,Parent,Align);
    _tn.debugToConsole=coAppUI.App.Components.TreeView.debugToConsole;
    _tn.doFree=function(){
      var tn=this;
      tn.Pins.Free();
      tn.Next.Free();
      tn.Current.Free();
      tn.Items.Free();
    };
    _tn.Commands=this.createCommands(_tn);
    _tn.Items=this.createItems(_tn);
    _tn.Pins=this.createPins(_tn);
    _tn.Next=this.createItem(_tn,_tn.Items,true);
    _tn.Current=this.createItem(_tn,_tn.Items,true);
    _tn.PathField=null;
    _tn.NotifyField=null;
    _tn.DataSet=null;
    _tn.onSelectItem=function(TreeNavItem){};
    
    return _tn;
  },
  createItems:function(TreeNav){
    var _tn=TreeNav;
    itms=new Array();
    itms.Container=document.createElement('div');
    itms.Parent=_tn.Container;
    itms.Container.className="TreeNavItems";
    itms.Parent.appendChild(_tn.Items.Container);
    itms.Owner=_tn;
    itms.Clear=function(){
      var itms=this;
      itms.Clearing=true;
      for (var iLcv=0; iLcv<itms.lenth; iLcv++)
        itms[iLcv].Free();
      itms.Clearing=false;
      itms.length=0;
    };
    itms.Free=function(){
      var itms=this;
      var tn=itms.Owner;
      
      itms.Clear();
      
      itms.Parent.removeChild(itms.Container);
      itms=null
      tn.Items=null;
      return null;
    };
    
    return itms;
          
  },
  createCommands:function(TreeNav){
    var tn=TreeNav;
    var cmds=coObject.Create(coObject.relInline,coObject.cpyAsVar,"TreeNavCommands");
    cmds.List=new Array();
    cmds.Owner=tn;
    cmds.Parent=tn.Container;
    cmds.Container=document.createElement('div');
    cmds.Parent.appendChild(cmds.Container);
    cmds.Container.className=cmds.Class;
    cmds.Container.Owner=cmds;
    cmds.Clearing=false;
    
    cmds.Client=document.createElement('div');
    cmds.Container.appendChild(cmds.Client);
    cmds.Client.Owner=cmds;
    cmds.Client.className="TreeNavCommandsClient";
    
    cmds.Buttons=document.createElement('div');
    cmds.Buttons.Owner=cmds;
    cmds.Container.appendChild(cmds.Buttons);
    cmds.Buttons.className="TreeNavCommandsButtons";
    
    cmds.btnOk=document.createElement('div');
    cmds.btnOk.Owner=cmds;
    cmds.Buttons.appendChild(cmds.btnOK);
    cmds.btnOK.className="TreeNavCommandsbtnOK";
    
    cmds.btnCancel=document.createElement('div');
    cmds.btnCancel.Owner=cmds;
    cmds.Buttons.appendChild(cmds.btnCancel);
    cmds.btnCancel.className="TreeNavCommandsbtnCancel";
    
    cmds.Clear=function(){
      var cmds=this;
      cmds.Clearing=true;
      for (var iLcv=0; iLcv<cmds.List.length; iLcv++)
        cmds.List[iLcv].Free();
      cmds.length=0;
      cmds.Clearing=false;
    };
    cmds.Free=function(){
      var cmds=this;
      
      cmds.Clear();
      cmds.Buttons.removeChild(cmds.btnOk);
      cmds.Buttons.removeChild(cmds.btnCancel);
      cmds.Container.removeChild(cmds.Buttons);
      cmds.Container.removeChild(cmds.Client);
      cmds.Parent.removeChild(cmd.Container);
      
      cmds=coObject.Release(cmds);
      return null;
    }
    return cmds;
  },
  createCommandForAdd:function(TreeNav){
    var _tn=TreeNav;
    
    var cmd=coObject.Create(coObject.relInline,coObject.cpyAsVar,"TreeNavCommandAdd");
    cmd.Owner=_tn.Commands;
    cmd.Container=document.createElement('input');
    cmd.Parent=_tn.Commands.Client;
    cmd.Parent.appendChild(cmd.Container);
    cmd.Container.className="TreeNavCommandAdd";
    
    cmd.Free=function(){
      var cmd=this;
      var cmds=cmd.Owner;
      if (cmds.Clearing!=true){
        var idx=cmds.List.indexOf(cmd);
        if (idx!=-1)
          cmds.List.splice(idx,1);
      };
      cmd.Parent.removeChild(cmd.Container);
      coObject.Release(cmd);
      return null;
    };
    _tn.Commands.list.push(cmd);
    return cmd;
  },  
  createCommandForRename:function(TreeNav){
    var _tn=TreeNav;
    
    var cmd=coObject.Create(coObject.relInline,coObject.cpyAsVar,"TreeNavCommandRename");
    cmd.Container=document.createElement('input');
    cmd.Parent=_tn.Commands.Client;
    cmd.Parent.appendChild(cmd.Container);
    cmd.Container.className="TreeNavCommandRename";
    
    cmd.Free=function(){
      var cmd=this;
      var cmds=cmd.Owner;
      if (cmds.Clearing!=true){
        var idx=cmds.List.indexOf(cmd);
        if (idx!=-1)
          cmds.List.splice(idx,1);
      };      
      cmd.Parent.removeChild(cmd.Container);
      coObject.Release(cmd);
      return null;
    };
    
    return cmd;
  },
  createCommandForClear:function(TreeNav){
    var _tn=TreeNav;
    
    var cmd=coObject.Create(coObject.relInline,coObject.cpyAsVar,"TreeNavCommandClear");
    cmd.Container=document.createElement('span');
    cmd.Parent=_tn.Commands.Client;
    cmd.Parent.appendChild(cmd.Container);
    cmd.Container.className="TreeNavCommandClear";
    
    cmd.Free=function(){
      var cmd=this;
      var cmds=cmd.Owner;
      if (cmds.Clearing!=true){
        var idx=cmds.List.indexOf(cmd);
        if (idx!=-1)
          cmds.List.splice(idx,1);
      };      
      cmd.Parent.removeChild(cmd.Container);
      coObject.Release(cmd);
      return null;
    };
    
    return cmd;
  },
  createCommandForDelete:function(TreeNav){
    var _tn=TreeNav;
    
    var cmd=coObject.Create(coObject.relInline,coObject.cpyAsVar,"TreeNavCommandDelete");
    cmd.Container=document.createElement('span');
    cmd.Parent=_tn.Commands.Client;
    cmd.Parent.appendChild(cmd.Container);
    cmd.Container.className="TreeNavCommandDelete";
    
    cmd.Free=function(){
      var cmd=this;
      var cmds=cmd.Owner;
      if (cmds.Clearing!=true){
        var idx=cmds.List.indexOf(cmd);
        if (idx!=-1)
          cmds.List.splice(idx,1);
      };
      cmd.Parent.removeChild(cmd.Container);
      coObject.Release(cmd);
      return null;
    };
    
    return cmd;
  },  
  createChildren:function(TreeNavItem){
    var itm=TreeNavItem;
    var tn=itm.Owner;
    
    var itms=new Array();
    itms.Owner=itm;
    itms.Class="TreeNavItemChildren";
    itms.Container=document.createElement('div');
    itms.Parent=itm.Container;
    itms.Parent.appendChild(itm.Container);
    itms.Container.className=itms.Class;
    itms.Clear=function(){
      var itms=this;
      itms.Clearing=true;
      for (var iLcv=0; iLcv<itms.length; iLcv++)
        itms[iLcv].Free();
      itms.length=0;
      itms.Clearing=false;
    };
    itms.Add=function(){
      var itms=this;
      var tn=itms.Owner;
      var itm=this.createItem(tn,itms,false);
      
      return itm;
    };
    
    return itms;
  },
  createHeader:function(TreeNav){
    var tn=TreeNav;
    var itm=coObject.Create(coObject.relInline,coObject.cpyAsVar,"TreeNavHeader");
    
    itm.Owner=tn;
    itm.Data=null;
    itm.View=tn;
    
    itm.Container=document.createElement('div');
    itm.Parent=tn.Container;
    itm.Parent.appendChild(itm.Container);
    itm.Container.className=itm.Class;

    itm.Home=document.createElement('div');
    itm.Container.appendChild(itm.Home);
    itm.Home.className=itm.Class+"Home";
    itm.Home.Owner=itm;

    itm.Title=document.createElement('div');
    itm.Container.appendChild(itm.Title);
    itm.Title.className=itm.Class+"Title";
    itm.Title.Owner=itm;
    
    
    itm.Add=document.createElement('div');
    itm.Container.appendChild(itm.Add);
    itm.Add.className=itm.Class+"Add";
    itm.Add.Owner=itm;

    itm.Back=document.createElement('div');
    itm.Container.appendChild(itm.Back);
    itm.Back.className=itm.Class+"Back";
    itm.Back.Owner=itm;

    itm.Synchronize=function(){
      var itm=this;
      
      coDOM.setText(itm.Title,coUtils.extractPathName(itm.Data.MAP[itm.View.PathField.Name].Value));
      coDOM.setText(itm.Notify,itm.Data.MAP[itm.View.NotifyField.Name].Value);
      pns.push(itm);
    };
    itm.doFree=function(){};
    
    itm.Free=function(){
      var itm=this;
      
      itm.doFree();
      
      itm.Container.removeChild(itm.Home);
      itm.Container.removeChild(itm.Title);
      itm.Container.removeChild(itm.Add);
      itm.Container.removeChild(itm.Back);
      itm.Parent.removeChild(itm.Container);
      
      itm=coObject.Release(itm);
      return null;
    };
    
    return itm;
  },
  createItem:function(TreeNav,Owner,AllowChildren){
    
    var tn=TreeNav;
    
    var itm=coObject.Create(coObject.relInline,coObject.cpyAsVar,"TreeNavItem");
    itm.View=TreeNav;
    itm.Owner=Owner;
    itm.Container=document.createElement('div');
    itm.Parent=Owner.Container;
    itm.Parent.appendChild(itm.Container);
    itm.Container.className=itm.Class;
    itm.Data=Data;
    
    itm.Title=document.createElement('div');
    itm.Container.appendChild(itm.Title);
    itm.Title.className=itm.Class+"Title";
    itm.Title.Owner=itm;
    coDOM.setText(itm.Title,Name);
        
    itm.Notify=document.createElement('div');
    itm.Container.appendChild(itm.Notify);
    itm.Notify.className=itm.Class+"Notify";
    itm.Notify.Owner=itm;
    
    itm.Free=function(){
      var itm=this;
      var lst=itm.Owner;
      if (lst.Clearing!=true){
        var idx=lst.indexOf(itm);
        if (idx!=-1) lst.splice(idx,1);
      };
      itm.Container.removeChild(itm.Title);
      itm.Container.removeChild(itm.Notify);
      itm.Parent.removeChild(itm.Container);
      itm=coObject.Release(itm);
      return null;
    };
        
    itm.Synchronize=function(){
      var itm=this;
      coDOM.setText(itm.Title,coUtils.extractPathName(itm.Data.MAP[itm.View.PathField.Name].Value));
      coDOM.setText(itm.Notify,itm.Data.MAP[itm.View.NotifyField.Name].Value);
    }
    
    itm.Children=(AllowChildren==true) ? this.createChildren(TreeNav,itm) : null;
    Owner.push(itm);
    return itm;
  },
  createPins:function(TreeNav){
    var tn=TreeNav;
    var pns=new Array();
    pns.Owner=tn;
    pns.Class="TreeNavPins";
    pns.Container=document.createElement('div');
    pns.Parent=tn.Container;
    pns.Parent.appendChild(pns.Container);
    pns.Container.className=pns.Class;
      
    pns.addItem=function(){
      if (Name==undefined) Name="";
      if (Data==undefined) Data=null;
          
      var pns=this;
      var tn=pns.Owner;
      
      var itm=coAppUI.App.Components.TreeNav.createItem(tn,pns,false);
      
      return itm;
    };
      
    pns.Clear=function(){
      var pns=this;
      pns.Clearing=true;
      for (var iLcv=0; iLcv<pns.length; iLcv++){
        pns[iLcv].Free();
      };
      pns.length=0;
      pns.Clearing=false;
    };
    pns.Synchronize=function(){
      var pns=this;
      for (var iLcv=0; iLcv<pns.length; iLcv++)
        pns[iLcv].Synchronize();
    };
    pns.Free=function(){
      var pns=this;
      pns.Clear();
        
      pns.Parent.removeChild(pns.Container);
        
      pns=null;
      return null;
    };
    return pns;
  }
  
};
