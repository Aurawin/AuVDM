coAppUI.App.Components.BoxView = {
  Unit           : '',
  Loaded         : true,
  debugToConsole : false,
  Initialized    : false,
  debugToConsole : true,
  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Client;
    var _vw=Slides.createSlide(sName,sClass+" BoxView",Screen,Owner,Parent,Align);
    _vw.Class=sClass;
    _vw.Container.className=sClass+ " BoxView";
    _vw.toScrollEnd=0;
    _vw.AutoSize=false;
    _vw._reveal=_vw.Reveal;
    _vw.Wrap=document.createElement('div');
    _vw.Container.appendChild(_vw.Wrap);
    _vw.Wrap.className=sClass+"Wrap BoxViewWrap";


    _vw.Client=document.createElement('div');
    _vw.Wrap.appendChild(_vw.Client);
    _vw.Client.className=sClass+"Client BoxViewClient";



    _vw._createLogo=function(){
      var vw=this;
      var l=coObject.Create(coObject.relInline,coObject.cpyAsVar,"BoxViewLogo");
      l.View=vw;
      l.Parent=vw.Container;
      l.Owner=vw;
      l.Container=document.createElement('div');
      l.Parent.appendChild(l.Container);
      l.Container.className=l.Class+" "+vw.Class+"Logo";
      l.isTop=true;
      l.isBottom=true;
      l.Transparent=false;
      l.Visible=true;
      l.Hidden=false;
      l.setHint=function(sHint){
        coDOM.setHint(this.Container,sHint);
      };
      l.setTransparent=function(index){
        if (index==undefined) index=0;
        this.Transparent=true;
        this.Container.style.opacity=index;
      };
      l.setOpaque=function(){
        this.Transparent=false;
        this.Container.style.opacity=1;
      };
      l.setGlyph=function(sURL){
        this.Container.style.backgroundImage=(sURL.length>0)? "url("+sURL+")" : "";
      };
      l.setTop=function(){
        var l=this;
        l.isTop=true;
        l.isBottom=false;
        l.Container.style.top="0px";
        l.Container.style.bottom="";
      };
      l.setBottom=function(){
        var l=this;
        l.isTop=false;
        l.isBottom=true;
        l.Container.style.top="";
        l.Container.style.bottom="0px";
      };
      l.Conseal=function(){
        var l=this;
        l.Visible=false;
        l.Hidden=true;
        l.Container.style.display="none";
      };
      l.Free=function(){
        var l=this;
        l.Parent.removeChild(l.Container);
        l=coObject.Release(l);
        return null;
      };
      return l;
    };
    _vw._createNav=function(){
      var vw=this;
      var n=new Array();
      n.Class="BoxViewNav";
      n.Parent=vw.Container;
      n.Owner=vw;
      n.Clearing=false;
      n.isRight=false;
      n.isLeft=false;
      n.isTop=false;
      n.isBottom=false;
      n.Visible=true;
      n.Hidden=false;
      n.Container=document.createElement('div');
      n.Parent.appendChild(n.Container);
      n.Container.className=n.Class + " "+vw.Class+"Nav";

      n.Selected=null;
      n.setRight=function(iValue){
        n.isLeft=false;
        n.isRight=true;
        n.Container.style.left="";
        n.Container.style.right=iValue+"px";
      };
      n.setLeft=function(iValue){
        n.isLeft=true;
        n.isRight=false;
        n.Container.style.right="";
        n.Container.style.left=iValue+"px";
      };
      n.setTop=function(){
        n.isTop=true;
        n.isBottom=false;
        n.Container.style.bottom="";
        n.Container.style.top="0px";
        n.Container.style.borderTopRightRadius="0px";
        n.Container.style.borderTopLeftRadius="0px";
        n.Container.style.borderBottomLeftRadius=coTheme.UI.BoxView.Nav.BorderRadius+"px";
        n.Container.style.borderBottomRightRadius=coTheme.UI.BoxView.Nav.BorderRadius+"px";
      };
      n.setBottom=function(){
        n.isTop=false;
        n.isBottom=true;
        n.Container.style.top="";
        n.Container.style.bottom="0px";
        n.Container.style.borderTopRightRadius=coTheme.UI.BoxView.Nav.BorderRadius+"px";
        n.Container.style.borderTopLeftRadius=coTheme.UI.BoxView.Nav.BorderRadius+"px";
        n.Container.style.borderBottomLeftRadius="0px";
        n.Container.style.borderBottomRightRadius="0px";
      };
      n.Add=function(Box,sIcon,sName,sTitle){
        var n=this;
        var vw=n.Owner;
        var i=coObject.Create(coObject.relInline,coObject.cpyAsVar,"BoxViewNavItem");
        i.Owner=n;
        i.View=vw;
        i.Box=Box;
        i.Parent=n.Container;
        i.Container=document.createElement('div');
        i.Parent.appendChild(i.Container);
        i.Container.className=i.Class + " " + vw.Class+"NavItem";
        i.Container.title=sTitle;
        coDOM.setText(i.Container,sName);
        i.Container.style.backgroundImage=( sIcon.length>0) ? "url("+sIcon+")" : "";
        i.evtTouchEnd=coEvents.Add(
          i.Container,
          "touchend",
          function(e){
            e.preventDefault();
            if (coEvents.NavigationLock.Active==true) return;
            i.Select();
            i.scrollInView();
          },
          coEvents.NoCapture,
          coEvents.Activate
        );
        i.evtMouseUp=coEvents.Add(
          i.Container,
          "mouseup",
          function(e){
            e.preventDefault();
            if (coEvents.NavigationLock.Active==true) return;
            i.Select();
            i.scrollInView();
          },
          coEvents.NoCapture,
          coEvents.Activate
        );
        i.scrollInView=function(){
          var box=this.Box;
          var vw=this.View;
          vw.scrollInView(box);
          vw.Container.scrollTop=box.Container.offsetTop;
        };
        i.Select=function(){
          var i=this;
          var n=i.Owner;
          var vw=i.View;
          var sUnSelClass=i.Class+" "+ vw.Class+"NavItem";
          if (n.Selected!=i) {
            if ( (n.Selected) && (n.Selected.Container.className!=sUnSelClass))
              n.Selected.Container.className=sUnSelClass;
          };
          n.Selected=i;
          i.Container.className=i.Class+"Selected " + vw.Class+"NavItemSelected";
          i.View.Boxes.Select(i.Box);
        };
        i.Free=function(){
          var i=this;
          var n=i.Owner;
          if (n.Clearing==false) {
            var idx=n.indexOf(i);
            if (idx!=-1) n.splice(idx,1);
          };
          i.Box.Button=null;
          i.Parent.removeChild(i.Container);
          i=coObject.Release(i);
          return null;
        };
        n.push(i);
        return i;
      };
      n.Clear=function(){
        var n=this;
        n.Clearing=true;
        for (var iLcv=0; iLcv<n.length; iLcv++){
          var i=n[iLcv];
          i=n[iLcv]=i.Free();
        };
        n.length=0;
      };
      n.Conseal=function(){
        var n=this;
        n.Container.style.display="none";
        n.Visible=false;
        n.Hidden=true;
      };
      n.Free=function(){
        var n=this;
        n.Clear();
        n=coObject.Release(n);
        return null;
      };
      n.setTop();
      n.setRight();
      return n;
    };
    _vw._createBoxes=function(){
      var vw=this;
      var bs=new Array();
      bs.Clearing=false;
      bs.Owner=vw;
      bs.View=vw;
      bs.Margin=new Margin();
      bs.Margin.Right=10;
      bs.Margin.Left=10;
      bs.Select=function(box){
        var bs=this;
        var vw=bs.View;
        if (box.onSelected)
          box.onSelected(box);
      };
      bs.doShow=function(){
        var bs=this;
        for (iLcv=0; iLcv<bs.length; iLcv++){
          var b=bs[iLcv];
          b.Show();
        };
      };
      bs.Add=function(sIcon,sName,sTitle,sClass){
        var bs=this;
        var vw=bs.View;
        var b=coObject.Create(coObject.relInline,coObject.cpyAsVar,"BoxViewBox");

        b.onSelected=null;

        b.Owner=bs;
        b.View=vw;
        b.Parent=vw.Client;
        b.Container=document.createElement('div');
        b.Parent.appendChild(b.Container);
        b.Container.className=b.Class+" " +sClass;

        b.Shell=document.createElement('div');
        b.Container.appendChild(b.Shell);
        b.Shell.className=b.Class+"Shell " + sClass+"Shell";


        b.Wrap=document.createElement('div');
        b.Shell.appendChild(b.Wrap);
        b.Wrap.className=b.Class+"Wrap " + sClass+"Wrap";


        b.Title=document.createElement('div');
        b.Wrap.appendChild(b.Title);
        b.Title.className=b.Class+"Title "+sClass+"Title";
        coDOM.setHTML(b.Title,sTitle);
        sTitle=coDOM.getText(b.Title);

        b.Client=document.createElement('div');
        b.Wrap.appendChild(b.Client);
        b.Client.className=b.Class+"Client "+sClass+"Client";

        b.Button=vw.Nav.Add(b,sIcon,sName,sTitle);

        b.Slides=coAppUI.App.Components.Slides.Create();

        b.setHeight=function(iHeight){
          this.Height=iHeight;
          this.Shell.style.height=this.Height+"px";
          this.Wrap.style.height=this.Shell.clientHeight+"px";
          this.Client.style.height=this.Wrap.clientHeight-this.Title.offsetHeight+"px";
        };
        b.getHeight=function(iHeight){
          return this.Shell.offsetHeight;
        };
        b.Hide=function(){
          this.Container.style.visibility="hidden";
          this.Container.style.display="none";
          this.Slides.Hide();
        };
        b.Show=function(){
          this.Container.style.visibility="visible";
          this.Container.style.display="block";
          this.Slides.Show();
        };
        b.setTitle=function(sTitle){
          coDOM.setHTML(this.Title,sTitle);
        };
        b.Free=function(){
          var b=this;
          var bs=b.Owner;
          if (bs.Clearing==false){
            var idx=bs.indexOf(b);
            if (idx!=-1) bs.splice(idx,1);
          };
          b.Button.Free();
          b.Slides.Free();


          b.Wrap.removeChild(b.Client);
          b.Wrap.removeChild(b.Title);

          b.Shell.removeChild(b.Wrap);
          b.Container.removeChild(b.Shell);

          b.Parent.removeChild(b.Container);
          b=coObject.Release(b);
          return null;
        };
        bs.push(b);
        if (bs.length==1)
          b.Button.Select();
        return b;
      };
      bs.Clear=function(){
        var bs=this;
        bs.Clearing=true;
        for (var iLcv=0; iLcv<bs.length; iLcv++){
          var b=bs[iLcv];
          b=bs[iLcv]=b.Free();
        };
        bs.length=0;
      };
      bs.setSize=function(){
        var bs=this;
        var vw=bs.View;
        var iTop=0, iBottom=0;
        var iWidth=vw.Container.clientWidth;
        if (vw.Nav.isTop==true){
          if (vw.Logo.isTop==true) {
            if (vw.Logo.Transparent==true) {
              iTop=0;
            } else {
              iTop=Math.max(vw.Nav.Container.offsetHeight,vw.Logo.Container.offsetHeight);
            };
          } else {
            iTop=vw.Nav.Container.offsetHeight;
            iBottom=vw.Logo.offsetHeight;
          };
        } else {
          if (vw.Logo.isTop==true){
            if (vw.Logo.Transparent==true) {
              iTop=0;
            } else {
              iTop=vw.Logo.Container.offsetHeight;
            };
            iBottom=vw.Nav.Container.offsetHeight;
          } else {
            iBottom=Math.max(vw.Nav.Container.offsetHeight,vw.Logo.Container.offsetHeight);
          };
        };
        var iHeight=vw.Container.clientHeight-(iTop+iBottom);
        var sWidth=iWidth+"px";
        var sHeight=iHeight+"px";
        var sLeft=bs.Margin.Left+"px";
        var sWidth2=(iWidth-bs.Margin.xBias())+"px";

        vw.Wrap.style.top=iTop+"px";
        vw.Wrap.style.height=iHeight+"px";

        if (coEvents.NavigationLock.Active==true) return;

        var btnSIV=null;

        for (var iLcv=0; iLcv<bs.length; iLcv++){
          var b=bs[iLcv];
          b.Container.style.width=sWidth;
          b.Container.style.height=sHeight;

          b.Shell.style.top=coMath.Div((iHeight-b.Wrap.scrollHeight),2)+"px";
          b.Shell.style.left=sLeft;
          b.Shell.style.width=sWidth2;
          b.Shell.style.height=b.Height+"px";

          b.Wrap.style.height=b.Shell.clientHeight+"px";
          b.Client.style.height=(b.Wrap.clientHeight-b.Title.offsetHeight)+"px";
          b.Slides.setSize();

          if (b.Button.Owner.Selected==b.Button)
            btnSIV=b.Button;
        };
        if (btnSIV) btnSIV.scrollInView();
      };
      return bs;
    };
    _vw.JumpWithScroll=function(){
       if (coEvents.NavigationLock.Active==true) return;
       var vw=this;
       var dPos=vw.Wrap.scrollTop/vw.Wrap.clientHeight;
       var idx=Math.floor(dPos);
       var part=(dPos%1)*100;
       if (part>=40)
         idx+=1;
       if ( (idx<vw.Nav.length) && (vw.Nav[idx].Selected!=vw.Nav[idx]))
         vw.Nav[idx].Select();
    };
    _vw.Reveal=function(){
      this._reveal();
      for (var iLcv=0; iLcv<this.Boxes.length; iLcv++){
        var bx=this.Boxes[iLcv];
        bx.Show();
      };
    };
    _vw.doSetSize=function(){
      this.Boxes.setSize();
    };
    _vw.doShow=function(){
      this.Boxes.doShow();
    };
    _vw.Logo=_vw._createLogo();
    _vw.Nav=_vw._createNav();
    _vw.Boxes=_vw._createBoxes();
    return _vw;
  }
}
