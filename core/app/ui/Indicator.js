UI.Indicator = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  Compiled       : false,
  init:function(){
    this.Initialized=true;
    UI.Controls.Add(this);  
  },
  Create         : function (sName,sClass,Owner,Parent) {
    var itm=coObject.Create(coObject.relInline,coObject.cpyAsVar,sClass);
    itm.Owner=Owner;
    itm.Name=sName;
    itm.Parent=Parent;


    if (Owner.Controls) Owner.Controls.push(itm);

    itm.Container=document.createElement('div');
    Parent.insertBefore(itm.Container,Parent.firstChild);
    itm.Container.className=itm.Class;
    itm.Container.style.backgroundColor=coTheme.UI.Indicator.Background.Color.toString();
    coDOM.setBoxShadow(itm.Container,coTheme.UI.Indicator.BoxShadow.toString());

    itm.Label=document.createElement('div');
    itm.Container.appendChild(itm.Label);


    itm.Label.className=itm.Class+"Label";
    itm.Visible=(coUtils.getStyle(itm.Container,'visibility')=='visible');
    itm.Value=null;
    itm.Clear=function(){
      this.Value=null;
      coDOM.setText(this.Label,"");
      this.Conseal();
    };

    itm.setValue=function(iValue){
      this.Value=iValue;
      if ( (iValue==null) || (iValue==0) ) {
        this.Conseal();
      } else {
        coDOM.setText(this.Label,iValue);
        this.Reveal();
      } ;
    };
    itm.getValue=function(){
      return this.Value;
    };
    itm.Reveal=function(){
      this.Container.style.display="inline-block";
      this.Container.style.visibility="visible";
    };
    itm.Conseal=function(){
      this.Container.style.display="none";
    };
    itm.Free=function(){
      if (this.Owner.Controls) {
        var idx=this.Owner.Controls.indexOf(this);
        if (idx!=-1) this.Owner.Controls.splice(idx,1);
      };

      var itm=this;
      itm.Container.removeChild(itm.Label);
      itm.Parent.removeChild(itm.Container);
      itm=coObject.Release(itm);
      return null;
    };
    return itm;
  }
}
