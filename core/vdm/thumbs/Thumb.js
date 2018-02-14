coThumbs.App.Components.Thumb = {
  Version        : new Version(2013,5,18,12),
  Title          : new Title("Base Thumbnail","Thumb"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coThumbs.App,'/core/vdm/thumbs/Thumb.js',coAppKit.PreLoaded),
  debugToConsole : true,
  createThumb : function(Owner,Parent,Record){
    if (Record==undefined) Record=null;
    tmb=coObject.Create();
    tmb.Class="ThumbNailItem";
    tmb.Owner=Owner;
    tmb.Parent=Parent;
    tmb.Selected=false;
    tmb.Record=Record;
    tmb.Link=null;

    tmb.Frame=document.createElement('div');
    tmb.Parent.appendChild(tmb.Frame);
    tmb.Frame.className=tmb.Class+"Frame";

    tmb.Container=document.createElement('div');
    tmb.Frame.appendChild(tmb.Container);
    tmb.Container.className=tmb.Class;

    tmb.Icon=document.createElement('div');
    tmb.Container.appendChild(tmb.Icon);
    tmb.Icon.className=tmb.Class+"Ico";

    tmb.Name=document.createElement('div');
    tmb.Container.appendChild(tmb.Name);
    tmb.Name.className=tmb.Class+"Name";
    tmb.setName=function(sName){
      if (sName==undefined) sName="";
      var tmb=this;
      coDOM.setText(tmb.Name,sName);
    };
    tmb.setIcon=function(sURL){
      if (sURL==undefined) sURL="";
      var tmb=this;
      tmb.Icon.style.backgroundImage= (sURL.length>0)? "url("+sURL+")" : "";
    };
    tmb.setLink=function(sLink){
      if (sLink==undefined) sLink="";
      var tmb=this;
      tmb.Link=sLink;
      tmb.Icon.hint=sLink;
    };
    //tmb.evtTouchStart=coEvents.Add(tmb.Container,"touchstart",function(e){return tmb.onTouchStart(e);},coEvents.Capture,coEvents.Active);
    tmb.doSelect=null;
    tmb.Free=function(){
      var base=this;
      var tmb=base.Root;
      tmb.Container.removeChild(tmb.Name);
      tmb.Container.removeChild(tmb.Icon);
      tmb.Frame.removeChild(tmb.Container);
      tmb.Parent.removeChild(tmb.Frame);
      tmb=coObject.Release(tmb);
      return null;
    };
  }
};

