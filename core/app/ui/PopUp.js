UI.PopUp = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  debugToConsole : true,
  Compiled       : false,
  init: function(){
    this.Initialized=true;
    UI.Controls.Add(this);
  },
  Create         : function(sName,sClass,Screen,Owner){
    var pu=coObject.Create(coObject.relInline,coObject.cpyAsVar,"PopUp");
    pu.Parent=coVDM.VDM.WorkSpace.Client;
    pu.Container=document.createElement('div');
    pu.Parent.appendChild(pu.Container);
    pu.Container.className=pu.Class;
    pu.Owner=Owner;
    pu.Screen=Screen;
    coAppUI.PopUps.push(pu);
    pu.Items=new Array();
    pu.Items.Owner=pu;
    pu.Items.Add=function(Name,Caption,onExecute){
      var pu=this.Owner;
      var itm=coObject.Create(coObject.relInline,coObject.cpyAsVar,"PopUpItem");
      itm.Owner=pu;
      itm.Parent=pu.Container;
      itm.Container=document.createElement('div');
      itm.Parent.appendChild(itm.Container);
      itm.Container.className=itm.Class;

      itm.Free=function(){
        var itm=this;
        var itms=this.Owner.Items;
        itm.Container.removeChild(itm.Glyph);
        itm.Container.removeChild(itm.Caption);
        itm.Parent.removeChild(itm.Container);
        if (itms.Loading!=true){
          var idx=itms.indexOf(itm);
          if (idx!=-1) itms.splice(idx,1);
        };
        itm=coObject.Release(itm);
        return null;
      };
    };
    pu.Items.Clear=function(){
      var itms=this, itm=null;
      itms.Loading=true;
      for (var iLcv=0; iLcv<itms.length; iLcv++){
        itm=itms[iLcv];
        itm.Free();
      };
      itms.Loading=false;
      itms.length=0;
    };

    pu.Free=function(){
      var pu=this;
      var idx=coAppUI.PopUps.indexOf(pu);
      if (idx!=-1) coAppUI.PopUps.splice(idx,1);

      pu.Items.Free();
      pu=coObject.Release(pu);
      return null;
    };

    return pu;
  }
};

