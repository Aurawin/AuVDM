UI.ProgressBar = {
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
    var bar=coObject.Create();
    bar.Visible=false;
    bar.Hidden=false;
    bar.minValue=0;
    bar.maxValue=100;
    bar.Step=1;
    bar.Progress=0;
    bar.Class="progressBar";
    bar.Parent=aParent;
    bar.Owner=aOwner;
    bar.fillerClass=bar.Class+"Filler";

    bar.Container=document.createElement('div');
    bar.Parent.appendChild(bar.Container);
    bar.Container.className=bar.Class;

    bar.Filler=document.createElement('div');
    bar.Container.appendChild(bar.Filler);
    bar.Filler.className=bar.fillerClass;

    bar.Placement=new Placement();
    bar.Border=new Border();
    bar.Padding=new Padding();
    bar.Margin=new Margin();
    bar.Visible=(coUtils.getStyle(bar.Container,'visibility')=='visible');
    bar.setHeight=function(height){
      var iY=height-(this.Border.yBias()+this.Padding.yBias());
      this.Container.style.height=iY+"px";
      this.Filler.style.height=this.Container.clientHeight+"px";
    };
    bar.setSize=function(ix,iY){
      var iX=iX-this.Border.xBias()-this.Padding.xBias();
      this.Container.style.width=iX+"px";
      this.Filler.style.height=this.Container.clientHeight+"px";
      this.setHeight(iY);
    };
    bar.Conseal=function(){
      this.Hide();
      this.Hidden=true;
    };
    bar.Show=function(){
      var bar=this;
      if (bar.Hidden==true) return;
      bar.Visible=true;
      bar.Container.style.visibility="visible";
      bar.Filler.style.visibility="visible";
      bar.setProgress(bar.Progress);
    };
    bar.Hide=function(){
      var bar=this;
      bar.Visible=false;
      bar.Container.style.visibility="hidden";
      bar.Filler.style.visibility="hidden";
    };
    bar.setProgress=function(iValue){
      var bar=this;
      bar.Progress=iValue;
      var Mod=bar.Progress%bar.Step;
      if (Mod==0) {
        var iRatio= (bar.maxValue!=0) ? bar.Progress/bar.maxValue : 0;
        if (iRatio>1) {
          bar.Filler.className=bar.Class+"FillerError";
          iRatio=1;
        } else if (bar.Filler.className!=bar.fillerClass) {
          bar.Filler.className=bar.fillerClass;
        };
        var iWidth=Math.max(0,(bar.Container.clientWidth*iRatio)-bar.Padding.xBias());
        bar.Filler.style.width=iWidth+"px";
      };
    };
    bar.loadCSS=function(){
      var bar=this;
      bar.Border.Load(bar.Container);
      bar.Padding.Load(bar.Container);
      bar.Margin.Load(bar.Filler);
    };
    bar.Free=function(){
      if (this.Owner.Controls) {
        var idx=this.Owner.Controls.indexOf(this);
        if (idx!=-1) this.Owner.Controls.splice(idx,1);
      };
      this.Container.removeChild(this.Filler);
      this.Parent.removeChild(this.Container);
      this.Placement.Free();
      coObject.Release(this);
      return null;
    };
    bar.loadCSS();
    return bar;
  }
};
