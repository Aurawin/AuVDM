coAppUI.App.Components.Indicator = {
  Version        : new Version(2014,3,8,9),
  Title          : new Title("Aurawin UI Indicator","Indicator"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Indicator.js',coAppKit.PreLoaded),
  debugToConsole : true,
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
