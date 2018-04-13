UI.RichEdit = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  debugToConsole : true,
  Compiled       : false,

  OldButtons     : ['formatting', '|', 'bold', 'italic', 'underline', 'deleted'],
  SimpleButtons  : ['bold', 'italic', 'underline', 'deleted'],
  BtnNewOn       : true,
  BtnNewOff      : false,
  BtnSaveOn      : true,
  BtnSaveOff     : false,
  FullButtons    : [
    '|', 'btn_new','btn_save', '|','formatting','alignment','|', 'bold', 'italic', 'underline', 'deleted',
    '|','unorderedlist', 'orderedlist', '|', 'outdent', 'indent', '|','table', 'link', '|', 'horizontalrule'
  ],
  init: function(){
    this.Initialized=true;
    UI.Controls.Add(this);
  },
  Create         : function(aOwner,aParent,sName,sClass,sHint,sPlaceHolder,Buttons,NewButton,SaveButton){
    if (sName==undefined) sName="";
    if (sClass==undefined) sClass="";
    if (sHint==undefined) sHint="";
    if (sPlaceHolder==undefined) sPlaceHolder="";
    if (Buttons==undefined) Buttons=this.SimpleButtons;
    if (NewButton==undefined) NewButton=false;
    if (SaveButton==undefined) SaveButton=false;
    var s=coObject.Create();
    s.Unit=this;
    s.AllowInput=new coAppUI.App.Components.Text.AllowInput();
    s.Visible=false;
    s.Hidden=false;
    s.Class="RichEdit";
    s.Parent=aParent;
    s.Owner=aOwner;
    s.onNext=null;
    s.onFocus=null;
    s.onChange=null;
    s.onLoaded=null;
    s.onSaved=null;
    s.onSave=null;
    s.onNew=null;

    s.Redactor=coObject.Create("Redactor");
    s.Redactor.Owner=s;
    s.Redactor.Loading=false;
    s.Redactor.Clearing=false;
    s.Redactor.PlaceHolder=sPlaceHolder;
    s.Redactor.Control=null;
    s.Redactor.Editor=null;
    s.Redactor.Wrapper=null;
    s.Redactor.Toolbar=null;
    s.Redactor.edtPadding=new Padding();
    s.Redactor.wprBorder=new Border();
    s.Redactor.wprMargin=new Margin();
    s.Redactor.Toolbar=null;
    s.Redactor.Wrapper=null;
    s.Redactor.TbCbNew=function(btnName,btnDOM,btnObject){

      var r=btnObject.Owner;
      var s=r.Owner;
      if (s.onNew)
        s.onNew(s);
    };
    s.Redactor.TbCbSave=function(btnName,btnDOM,btnObject){
      var r=btnObject.Owner;
      var s=r.Owner;
      if (s.onSave)
        s.onSave(s);
    };
    s.PlainText=false;

    if (aOwner.Controls) aOwner.Controls.push(s);

    s.Container=document.createElement('textarea');
    s.Parent.appendChild(s.Container);
    s.Container.className=(sClass.length>0) ? s.Class+" "+sClass : s.Class;

    s.Container.Owner=s;

    s.Placement=new Placement();
    s.Border=new Border();
    s.Padding=new Padding();
    s.Margin=new Margin();
    s.Container.name=sName;
    s.Container.title=sHint;
    s.Visible=(coUtils.getStyle(s.Container,'visibility')=='visible');



    s.Focus=function(){
      this.Redactor.Editor.focus();
    };
    s.Blur=function(){
      this.Redactor.Editor.blur();
    };
    s.setPlaceHolder=function(sMessage){
      s.Redactor.Control.set(sMessage);
    };
    s.setCaption=function(sCaption){
      this.Container.value=sCaption;
      this.Redactor.Loading=true;
      this.Redactor.Control.code.set('<p>'+sCaption+'</p>');
    };
    s.setText=function(sText){
      this.Redactor.Loading=true;
      this.Redactor.Control.code.set(sText);
    };
    s.Clear=function(){
      this.Redactor.Clearing=true;
      this.Container.value="";
      this.Redactor.Control.code.set('<p></p>');
      this.Modified=false;
    };
    s.setHint=function(sHint){
      this.Container.title=sHint;
    };
    s.getCaption=function(){
      return this.Redactor.Control.get();
    };
    s.Append=function(sCode){
      $(this.Redactor.Editor).append(sCode);
    };
    s.Insert=function(sCode){
      this.Redactor.Control.insert.html(sCode);
    };
    s.setClass=function(sClass){
      this.Container.className=sClass;
      this.loadCSS();
    };
    s.setHeight=function(height){
      var iY=height-(this.Border.yBias()+this.Padding.yBias());
      this.Container.style.height=iY+"px";
    };
    s.setSize=function(ix,iY){
      var iX=iX-this.Border.xBias()-this.Padding.xBias();
      this.Container.style.width=iX+"px";
    };
    s.Conseal=function(){
      this.Hide();
      this.Hidden=true;
      this.Container.style.display="none";
    };
    s.Reveal=function(){
      this.Hidden=false;
      this.Container.style.display="block";
      this.Show();
    };
    s.enforcePlacement=function(){
      var s=this; var elm=this.Container; var pElm=s.Parent;
      switch (s.Placement.Mode.Value) {
        case (s.Placement.Mode.TopLeft) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          break;
        case (s.Placement.Mode.TopRight) :
          elm.style.right=s.Placement.Right+"px";
          elm.style.top=s.Placement.Top+"px";
          break;
        case (s.Placement.Mode.TopLeftRight) :
          elm.style.left=s.Placement.Left+"px";
          elm.style.top=s.Placement.Top+"px";
          elm.style.width=pElm.clientWidth-(s.Placement.Left+s.Placement.Right+s.Padding.xBias())+"px";
          break;
        case (s.Placement.Mode.TopCenter) :
          elm.style.top=s.Placement.Top+"px";
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.left=iLeft+"px";
          break;
        case (s.Placement.Mode.Center) :
          var iTop=Math.round((pElm.clientHeight-elm.offsetHeight)/2);
          var iLeft=Math.round((pElm.clientWidth-elm.offsetWidth)/2);
          elm.style.left=iLeft+"px";
          elm.style.top=iTop+"px";
          break;
        case (s.Placement.Mode.Full) :
          elm.style.top=s.Placement.Top+"px";
          elm.style.left=s.Placement.Left+"px";
          elm.style.right=s.Placement.Right+"px"; //elm.style.width=pElm.clientWidth-s.Placement.Right+"px";
          elm.style.bottom=s.Placement.Bottom+"px";//elm.style.height=pElm.clientHeight-s.Placement.Bottom+"px";
          s.Redactor.Editor.style.top=s.Redactor.Toolbar.offsetHeight+"px";
          break;
      };
      s.Redactor.Wrapper.style.top=this.Redactor.wprMargin.Top+"px";
      s.Redactor.Wrapper.style.left=this.Redactor.wprMargin.Left+"px";
      s.Redactor.Wrapper.style.height=pElm.clientHeight-this.Redactor.wprBorder.yBias()-this.Redactor.wprMargin.yBias()+"px";
      s.Redactor.Wrapper.style.width=pElm.clientWidth-this.Redactor.wprBorder.xBias()-this.Redactor.wprMargin.xBias()+"px";
    };
    s.Show=function(){
      var s=this;
      if (s.Hidden==true) return;
      s.Visible=true;
      this.Container.style.visibility="visible";
      s.loadCSS();
    };
    s.Hide=function(){
      this.Visible=false;
      this.Container.style.visibility="hidden";
    };
    s.loadCSS=function(){
      this.Border.Load(this.Container);
      this.Padding.Load(this.Container);
      this.Margin.Load(this.Container);
      this.Redactor.wprBorder.Load(this.Redactor.Wrapper);
      this.Redactor.wprMargin.Load(this.Redactor.Wrapper);
      coDOM.clearMargins(this.Container);
    };
    s.getText=function(){
      return this.Redactor.Editor.innerText;
    };
    s.getHTML=function(){
      return this.Redactor.Control.code.get();
    };
    s.setHTML=function(sValue){
      this.Redactor.Control.code.set(sValue);
    };
    s.Free=function(){
      if (this.Owner.Controls) {
        var idx=this.Owner.Controls.indexOf(this);
        if (idx!=-1) this.Owner.Controls.splice(idx,1);
      };
      this.Parent.removeChild(this.Container);
      this.Placement.Free();
      coObject.Release(this);
      return null;
    };
    s.doSocketError=function(){
    };
    s.SaveToUrl=function(sURL){
      var s=this;
      s.Connecting=true;
      s.Socket=new XMLHttpRequest();
      s.Socket.Owner=s;
      s.Socket.open("PUT",sURL,coNet.NET_ASYNC);
      s.Socket.onerror=function(){
        var Socket=this;
        var s=Socket.Owner;
        s.Code=Socket.status;
        s.doSocketError();
        s.Socket=null;
      };
      s.Socket.onreadystatechange=function(){
        var Socket=this;
        var s=Socket.Owner;
        switch (Socket.readyState) {
          case (1,2): //server connection established
            s.dtOpened=new Date().setMilliseconds(0);
            s.Connected=true;
            s.Connecting=false;
            s.Sending=true;
            break;
          case 4: // request finished and response is ready
            s.Sending=false;
            if ((Socket.status==200) || (Socket.status==417)) {
              s.Socket=null;
              if (s.onSaved) s.onSaved(s);
              s.Modified=false;
            } else {
              s.Code=Socket.status;
              s.doSocketError();
              s.Socket=null;
            };
            break;
        };
      };
      s.Socket.send(s.Redactor.Control.get());
    };

    s.LoadFromUrl=function(sURL){
      var s=this;
      s.Connecting=true;
      s.Socket=new XMLHttpRequest();
      s.Socket.Owner=s;
      s.Socket.open("GET",sURL,coNet.NET_ASYNC);
      s.Socket.onerror=function(){
        var Socket=this;
        var s=Socket.Owner;
        s.Code=Socket.status;
        s.doSocketError();
        s.Socket=null;
      };
      s.Socket.onreadystatechange=function(){
        var Socket=this;
        var s=Socket.Owner;
        switch (Socket.readyState) {
          case (1,2): //server connection established
            s.dtOpened=new Date().setMilliseconds(0);
            s.Connected=true;
            s.Connecting=false;
            s.Sending=true;
            break;
          case 4: // request finished and response is ready
            s.Sending=false;
            if ((Socket.status==200) || (Socket.status==417)) {
              s.Redactor.Loading=true;
              if (s.PlainText==true){
                s.Redactor.Control.code.set(Socket.responseText);
                //s.Redactor.Editor.innerText=Socket.responseText;
              } else {
                s.Redactor.Control.code.set(Socket.responseText);
              };
              s.Modified=false;
              s.Socket=null;
            } else {
              s.Code=Socket.status;
              s.doSocketError();
              s.Socket=null;
            };
            break;
        };
      };
      s.Socket.send();
    };

    var Inst=$(s.Container).redactor(
      {
        plugins: ['fontcolor', 'table'],
        focus: true,
        linebreaks: true,
        buttons: Buttons,
        buttonsCustom: {
          btn_new : {
            Owner : s.Redactor,
            title : coLang.Table.Labels.New,
            callback : s.Redactor.TbCbNew
          },
          btn_save : {
            Owner : s.Redactor,
            title : coLang.Table.Labels.Save,
            callback : s.Redactor.TbCbSave
          }
        },
        changeCallback : function(html)	{
          var r=this.$editor[0].Owner;
          var s=r.Owner;
          if ( r.Loading==true) {
            r.Loading=false;
            s.Modified=false;
            if (s.onLoaded) s.onLoaded(s);
          } else if (r.Clearing==true) {
            r.Clearing=false;
            s.Modified=false;
          } else {
            s.Modified=true;
            if (s.onChange)
              s.onChange(s,html);
          } ;
	}
      }
    );
    var idxInst=Inst.length-1;

    s.Redactor.Control=$(s.Container).redactor('core.getObject');
    s.Redactor.Control.Owner=s.Redactor;

    s.Redactor.Editor=$(s.Container).redactor('core.getEditor')[idxInst];
    s.Redactor.Editor.tabIndex=0;
    s.Redactor.Editor.Owner=s.Redactor;

    s.Redactor.Wrapper=$(s.Container).redactor('core.getBox')[idxInst];
    s.Redactor.Wrapper.Owner=s.Redactor;

    var tb=s.Redactor.Toolbar=$(s.Container).redactor('core.getToolbar')[idxInst];
    tb.Owner=s.Redactor;
    tb.style.backgroundColor=coTheme.UI.RichEdit.Toolbar.Background.Color.toString();

    var btn=s.Redactor.tbbLeader=tb.childNodes[0];
    if ( (NewButton!=true) && (SaveButton!=true) && (btn))
      btn.style.display="none";

    var btn=s.Redactor.tbbNew=coDOM.getChildNodeByTitle(tb,coLang.Table.Labels.New);
    if (btn){
      if (NewButton!=true)
        btn.style.display="none";
      btn.style.backgroundSize="90%";
      btn.style.backgroundPosition="center";
      btn.style.backgroundImage="url("+coTheme.Icons.Documents.New+")";
    };

    var btn=s.Redactor.tbbSave=coDOM.getChildNodeByTitle(tb,coLang.Table.Labels.Save);
    if (btn){
      if (SaveButton!=true)
        btn.style.display="none";
      btn.style.backgroundSize="90%";
      btn.style.backgroundPosition="center";
      btn.style.backgroundImage="url("+coTheme.Icons.Save+")";
    };
    s.Redactor.Wrapper.style.backgroundColor=coTheme.UI.RichEdit.Background.Color.toString();
    s.Redactor.Wrapper.style.color=coTheme.UI.RichEdit.Color.toString();
    s.Redactor.Editor.style.color=coTheme.UI.RichEdit.Color.toString();
    if ((s.Redactor.Wrapper) && (sClass.length>0))
      s.Redactor.Wrapper.className+=" "+s.Class+sClass;
    if ((s.Redactor.Toolbar) && (sClass.length>0))
      s.Redactor.Toolbar.className+=" "+s.Class+sClass+" toolbarGradient";

    coTheme.UI.RichEdit.Apply(s);
    return s;
  }
};
if (typeof RedactorPlugins === 'undefined') window.RedactorPlugins = {};
