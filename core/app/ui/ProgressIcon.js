UI.ProgressIcon = {
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
  Create         : function(aOwner,aParent){
    var ico=coObject.Create();
    ico.Visible=false;
    ico.Hidden=true;
    ico.minValue=0;
    ico.maxValue=100;
    ico.Step=1;
    ico.Progress=0;
    ico.Class="progressIcon";
    ico.Parent=aParent;
    ico.Owner=aOwner;

    ico.Container=document.createElement('div');
    ico.Parent.appendChild(ico.Container);
    ico.Container.className=ico.Class;

    ico.Filler=document.createElement('div');
    ico.Container.appendChild(ico.Filler);
    ico.Filler.className=ico.Class+"Filler";
    ico.Border=new Border();
    ico.Padding=new Padding();
    ico.Margin=new Margin();
    ico.setSize=function(ix,iY){
      var ico=this;
      var iY=iY-ico.Border.yBias()-ico.Padding.yBias();
      ico.Container.style.height=iY+"px";
    };
    ico.Show=function(){
      var ico=this;
      if (ico.Hidden==true) return;
      ico.Visible=true;
      ico.Container.style.visibility="visible";
      ico.Filler.style.visibility="visible";
      ico.setProgress(ico.Progress);
    };
    ico.Hide=function(){
      var ico=this;
      ico.Visible=false;
      ico.Container.style.visibility="hidden";
      ico.Filler.style.visibility="hidden";
    };
    ico.setProgress=function(iValue){
      var ico=this;
      ico.Progress=iValue;
      var Mod=ico.Progress%ico.Step;
      if (Mod==0) {
        var iRatio= (ico.maxValue!=0) ? ico.Progress/ico.maxValue : 0;
        var iHeight=Math.max(0,(ico.Container.clientHeight*iRatio)-ico.Padding.yBias());
        var iTop=Math.max(0,ico.Container.clientHeight-iHeight-ico.Padding.yBias());
        ico.Filler.style.top=iTop+"px";
        ico.Filler.style.height=iHeight+"px";
      };
    };
    ico.loadCSS=function(){
      var ico=this;
      ico.Border.Load(ico.Container);
      ico.Padding.Load(ico.Container);
      ico.Margin.Load(ico.Filler);
    };
    ico.Free=function(){
      var ico=this;
      ico.Container.removeChild(ico.Filler);
      ico.Parent.removeChild(ico.Container);
      ico=coObject.Release(ico);
    };
    ico.loadCSS();
    return ico;
  }
};

