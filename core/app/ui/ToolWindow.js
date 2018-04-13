UI.ToolWindow = {
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
    var pu=coObject.Create(coObject.relInline,coObject.cpyAsVar,"ToolWindow");
    pu.Position=new Position();
    pu.Parent=coVDM.VDM.WorkSpace.Client;
    pu.Container=document.createElement('div');
    pu.Parent.appendChild(pu.Container);
    pu.Container.className=pu.Class+" ToolWindowBoxShadow";
    pu.Owner=Owner;
    pu.Visible=false;
    pu.Screen=Screen;
    pu.Control=null;
    pu.onPopUp=function(PopUp){};
    pu.onExecute=function(PopUp){};
    pu.onClose=function(PopUp){};
    coAppUI.Tools.push(pu);
    pu.Slides=coAppUI.App.Components.Slides.Create();
    pu.PopUp=function(Control){
      var pu=this;
      pu.Control=Control;
      pu.Position.enForce(pu.Container);
      pu.Visible=true;
      pu.Container.style.display="block";
      pu.Slides.Show();
      pu.onPopUp(pu);
      pu.BringToTop();
      pu.setSize();
    };
    pu.BringToTop=function(){
      var pu=this;
      pu.Container.style.zIndex=coVDM.VDM.Screens.zOrderTop();
    };
    pu.setSize=function(){
      var pu=this;
      pu.Position.Top=coDOM.getOffsetTop(pu.Control.Container,coVDM.VDM.WorkSpace.Client)+pu.Control.Container.offsetHeight+coTheme.UI.ToolWindow.Margin;
      pu.Position.Left=coDOM.getOffsetLeft(pu.Control.Container,coVDM.VDM.WorkSpace.Client);
      pu.Position.Width=pu.Control.Container.offsetWidth;
      pu.Position.Height=300;
      this.Position.enForce(this.Container);
      this.Slides.setSize();
    };
    pu.Close=function(){
      var pu=this;
      pu.Visible=false;
      pu.Slides.Hide();
      pu.Container.style.display="none";
      pu.onClose(pu);
    };
    pu.Free=function(){
      var pu=this;

      var idx=coAppUI.Tools.indexOf(pu);
      if (idx!=-1) coAppUI.Tools.splice(idx,1);

      pu.Slides.Free();
      pu.Parent.removeChild(pu.Container);
      pu=coObject.Release(pu);
      return null;
    };
    pu.Nav=coAppUI.App.Components.Nav.Create("Nav","Nav",pu,pu.Slides,pu,pu.Container);
    pu.Nav.Confirm=pu.Nav.Items.addItem(
      pu.Nav.itemKind.Confirm,"cnfSelect",[coLang.Table.Buttons.Ok,coLang.Table.Buttons.Cancel],
      pu.Nav.oAutoShowOn,
      pu.Nav.oCascadeOn,
      pu.Nav.oAddToShowList,
      pu.Nav.oSetAsDefaultOn,
      pu.Nav.NoTarget,
      pu.Nav.NoSlide,
      pu.Nav.NoShowList,
      pu.Nav.NoHideList,
      pu.Nav.NoReturn,
      [
        function(navItem){
          var pu=navItem.Nav.Screen;
          pu.onExecute(pu);
          pu.Close();
        },
        function(navItem){
          var pu=navItem.Nav.Screen;
          pu.Close();
        }
      ]
    );
    return pu;
  }
};

