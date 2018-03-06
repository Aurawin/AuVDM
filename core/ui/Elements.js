coAppUI.App.Components.Elements = {
  Version        : new Version(2013,12,2,241),
  Title          : new Title("Aurawin UI Elements","Elements"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/Elements.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Transition     : '',
  defaultSpacing : 10,
  ElementSpacing : 2,
  MaxControlIncrement : 100,
  TransitionDelay     : 1000,
  Kind           : null,
  init           : function(){
    this.Kind=this.createKind(this);
  },
  createKind     : function(Owner){
    k=coObject.Create(coObject.relInline,coObject.cpyAsVar,"Kind");
    k.Owner=Owner;
    k.Single=0;
    k.Double=1;
    k.Tripple=2;
    k.Quad=3;
    k.Free=function(){
      var k=this;
      if (k.Owner) k.Owner.Kind=null;
      k=coObject.Release(k);
      return null;
    };
    return k;
  },
  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Default;
    var _vw=Slides.createSlide(sName,sClass,Screen,Owner,Parent,Align);
    _vw.Container.className="Elements "+sClass+"Elements";
    _vw.elementSpan=80;
    _vw.elementHalfSpan=40;
    _vw.ReadOnly=true;
    _vw.AutoStart=true;
    _vw.elementAutoCentered=true;
    _vw.setDelay=function(iValue){
      this.Items.setDelay(iValue);
    };
    _vw.setTransparency=function(iValue){
      this.Container.style.opacity=iValue;
    };
    _vw.setElementSpan=function(iValue){
      this.elementSpan=iValue;
      this.elementHalfSpan=coMath.Div(iValue,2);
    };
    _vw.setCategory=function(sCategory){
      this.Items.setCategory(sCategory);
    };
    _vw._createElements=function(){
      var vw=this;
      var lst=new Array();
      lst.Class="ElementsList";
      lst.Owner=vw;
      lst.View=vw;
      lst.Parent=vw.Container;
      lst.Container=document.createElement('div');
      lst.Parent.appendChild(lst.Container);
      lst.Container.className=lst.Class+ " "+vw.Class+"ElementsList";
      lst.Padding=new Padding();
      lst.Margin=new Margin();
      lst.Border=new Border();
      lst.Clearing=false;
      lst.Loading=false;

      lst.Padding.Load(lst.Container);
      lst.Margin.Load(lst.Container);
      lst.Border.Load(lst.Container);
      lst.setDelay=function(iDelay){
        var lst=this;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var e=lst[iLcv];
          e.setDelay(iDelay);
        };
      };
      lst.clearBoxShadows=function(){
        var lst=this;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var e=lst[iLcv];
          e.clearBoxShadows();
        };
      };
      lst.setCategory=function(sCategory){
        var lst=this;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var e=lst[iLcv];
          e.setCategory(sCategory);
        };
      };
      lst.Stop=function(){
        var lst=this;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var elem=lst[iLcv];
          elem.Stop();
        };
      };
      lst.Start=function(){
        var lst=this;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var elem=lst[iLcv];
          elem.Start();
        };
      };
      lst.LoadCSS=function(){
        // $(lst.Container).css("padding-left");
        this.Padding.Load(this.Container);
        this.Margin.Load(this.Container);
        this.Border.Load(this.Container);
      };
      lst.Show=function(){
        var lst=this;
        lst.Container.style.visibility="visible";
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var elm=lst[iLcv];
          elm.Start();
          elm.Show();
        };
      };
      lst.Conseal=function(){
        var lst=this;
        lst.Hidden=true;
        lst.Container.style.display="none";
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var elm=lst[iLcv];
          elm.Conseal();
        };
      };
      lst.Reveal=function(){
        lst.Hidden=false;
        lst.Container.style.display="inline-block";
      };
      lst.Hide=function(){
        var lst=this;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var elm=lst[iLcv];
          elm.Stop();
          elm.Hide();
        };
        lst.Container.style.visibility="hidden";
      };
      lst.setSize=function(){
        var lst=this;
        var vw=lst.Owner;
        if (vw.elementAutoCentered==true) {
          var iXM=lst.Container.clientWidth-lst.Padding.xBias();
          var iYM=lst.Container.clientHeight-lst.Padding.xBias();

          var sTop=(coMath.Div(iYM,2)-vw.elementHalfSpan)+"px";
          var sLeft=(coMath.Div(iXM,2)-vw.elementHalfSpan)+"px";
          for (var iLcv=0; iLcv<lst.length; iLcv++){
            var elem=lst[iLcv];
            elem.Container.style.left=sLeft;
            elem.Container.style.top=sTop;
            elem.setSize();
          };
        } else {;
          for (var iLcv=0; iLcv<lst.length; iLcv++){
            var elem=lst[iLcv];
            elem.setSize();
          };
        };
      };
      lst.Add=function(iKind){
        if (iKind==undefined) iKind=coAppUI.App.Components.Elements.Single;
        var lst=this;
        var vw=lst.Owner;
        var e=coObject.Create(coObject.relInline,coObject.cpyAsVar,"Element");
        e.Owner=lst;
        e.View=vw;
        e.Visible=false;
        e.Hidden=true;
        e.Parent=lst.Container;
        e.onOpen=null;
        e.Kind=iKind;

        e.Container=document.createElement('div');
        e.Parent.appendChild(e.Container);
        e.Container.className=e.Class + " " + vw.Class+"Element";
        e.Container.style.lineHeight+vw.elementSpan+"px";
        e.clearBoxShadows=function(){
          var e=this;
          e.Container.style.boxShadow="none";
          e.subItems.clearBoxShadows();
        };
        e.Show=function(){
          this.Visible=true;
          this.Container.style.visibility="visible";
          this.subItems.Show();
        };
        e.Hide=function(){
          this.Visible=false;
          this.Container.style.visibility="hidden";
          this.subItems.Hide();
        };
        e.Reveal=function(){
          this.Container.style.display="block";
          this.Hidden=false;
          this.Owner.Reveal();
          this.Show();
        };
        e.Conseal=function(){
          this.Container.style.display="none";
          this.Hidden=true;
        };
        e.Start=function(){
          this.subItems.Start();
        };
        e.Stop=function(){
          this.subItems.Stop();
        };
        e.setDelay=function(iDelay){
          this.subItems.setDelay(iDelay);
        };
        e.setCategory=function(sCategory){
          this.subItems.Stop();
          this.subItems.setCategory(sCategory);
          this.subItems.Start();
        };
        e._createSubItems=function(){
          var lst=new Array();
          lst.Owner=this;
          lst.Class="ElementSubItems";
          lst.Parent=e.Container;
          lst.Container=document.createElement('div');
          lst.Parent.appendChild(lst.Container);
          lst.Container.className=lst.Class;
          lst.View=this.View;
          lst.Clearing=false;
          lst.Loading=false;
          lst.Visible=false;
          lst.clearBoxShadows=function(){
            var lst=this;
            for (var iLcv=0; iLcv<lst.length; iLcv++){
              var si=lst[iLcv];
              si.clearBoxShadows();
            };
          };
          lst.Show=function(){
            var lst=this;
            lst.Visible=true;
            lst.Container.style.visibility="visible";
            for (var iLcv=0; iLcv<lst.length; iLcv++){
              var si=lst[iLcv];
              si.Show();
            };
          };
          lst.Hide=function(){
            var lst=this;
            lst.Visible=false;
            lst.Container.style.visibility="hidden";
            for (var iLcv=0; iLcv<lst.length; iLcv++){
              var si=lst[iLcv];
              si.Hide();
            };
          };
          lst.setDelay=function(iDelay){
            for (var iLcv=0; iLcv<this.length; iLcv++){
              var si=this[iLcv];
              si.Glyphs.setDelay(iDelay);
            };
          };
          lst.setCategory=function(sCategory){
            for (var iLcv=0; iLcv<this.length; iLcv++){
              var si=this[iLcv];
              si.Glyphs.setCategory(sCategory);
            };
          };
          lst.Start=function(){
            for (var iLcv=0; iLcv<this.length; iLcv++){
              var si=this[iLcv];
              si.Start();
            };
          };
          lst.Stop=function(){
            for (var iLcv=0; iLcv<this.length; iLcv++){
              var si=this[iLcv];
              si.Stop();
            };
          };
          lst.Add=function(){
            var si=coObject.Create(coObject.relInline,coObject.cpyAsVar,"ElementSubItem");
            si.Owner=this;
            si.View=this.View;
            si.Parent=this.Container;
            si.Container=document.createElement('div');
            si.Container.Owner=si;
            si.Parent.appendChild(si.Container);
            si.onCaptionClick=null;
            si.onClick=null;

            //si.urlGlyph="";
            si.Container.className=si.Class+ " "+this.View.Class+si.Class;
            si.Glyph=null;
            si.Caption=document.createElement('div');
            si.Container.appendChild(si.Caption);
            si.Caption.className=si.Class+"Caption "+this.View.Class+si.Class+"Caption";
            si.Caption.Owner=si;


            si.Margin=new Margin();
            si.Border=new Border();
            si.Padding=new Padding();


            si.Glyphs=new Array();
            si.Glyphs.Delay=coVDM.ElementSwitchDelay;
            si.Glyphs.Index=-1;
            si.Glyphs.Owner=si;
            si.Glyphs.Handle=0;
            si.Glyphs.View=this.View;
            si.Glyphs.Active=false;
            si.Glyphs.Category="";
            si.Glyphs.Clearing=false;
            si.Glyphs.Show=function(){
              var gls=this;
              for (var iLcv=0; iLcv<gls.length; iLcv++){
                var g=gls[iLcv];
                g.Show();
              };
            };
            si.Glyphs.Hide=function(){
              var gls=this;
              for (var iLcv=0; iLcv<gls.length; iLcv++){
                var g=gls[iLcv];
                g.Hide();
              };
            };
            si.Controls=null;
            si.onAddGlyph=null;
            si.onRemoveGlyph=null;
            si.clearBoxShadows=function(){
              this.Container.style.boxShadow="none";
            };
            si.LoadCSS=function(){
              this.Margin.Load(this.Container);
              this.Border.Load(this.Container);
              this.Padding.SetAll(coAppUI.App.Components.Elements.ElementSpacing);
            };
            si.Show=function(){
              this.Container.style.visibility="visible";
              this.Glyphs.Show();
            };
            si.Hide=function(){
              this.Container.style.visibility="hidden";
              this.Glyphs.Hide();
            };
            si.Assign=function(srcSubItem){
              var si=this;
              si.setCaption(srcSubItem.getCaption());
              si.onAddGlyph=srcSubItem.onAddGlyph;
              si.Glyphs.Assign(srcSubItem.Glyphs);
            };
            si._createControls=function(){
              var si=this;

              ctrls=coObject.Create(coObject.relInline,coObject.cpyAsVar,si.Class+"Controls");
              ctrls.Owner=si;
              ctrls.Visible=false;
              ctrls.toHide=0;
              ctrls.tiTool=0;
              ctrls.ctrTool=0;
              ctrls.Parent=si.Container;

              ctrls.btnTop=document.createElement('div');
              ctrls.btnTop.Owner=ctrls;
              ctrls.Parent.appendChild(ctrls.btnTop);
              ctrls.btnTop.className=ctrls.Class+"btnTop";
              coDOM.setHint(ctrls.btnTop,coLang.Table.Apps.Collage.Edit.MoveImageTop);

              ctrls.btnRotateLeft=document.createElement('div');
              ctrls.btnRotateLeft.Owner=ctrls;
              ctrls.Parent.appendChild(ctrls.btnRotateLeft);
              ctrls.btnRotateLeft.className=ctrls.Class+"btnRotateLeft";
              coDOM.setHint(ctrls.btnRotateLeft,coLang.Table.Apps.Collage.Edit.RotateImageLeft);

              ctrls.btnRemove=document.createElement('div');
              ctrls.btnRemove.Owner=ctrls;
              ctrls.Parent.appendChild(ctrls.btnRemove);
              ctrls.btnRemove.className=ctrls.Class+"btnRemove";
              coDOM.setHint(ctrls.btnRemove,coLang.Table.Apps.Collage.Edit.RemoveImage);

              ctrls.btnAdd=document.createElement('div');
              ctrls.btnAdd.Owner=ctrls;
              ctrls.Parent.appendChild(ctrls.btnAdd);
              ctrls.btnAdd.className=ctrls.Class+"btnAdd";
              coDOM.setHint(ctrls.btnAdd,coLang.Table.Apps.Collage.Edit.AddImage);


              ctrls.btnLeft=document.createElement('div');
              ctrls.btnLeft.Owner=ctrls;
              ctrls.Parent.appendChild(ctrls.btnLeft);
              ctrls.btnLeft.className=ctrls.Class+"btnLeft";
              coDOM.setHint(ctrls.btnLeft,coLang.Table.Apps.Collage.Edit.MoveImageLeft);

              ctrls.btnRight=document.createElement('div');
              ctrls.btnRight.Owner=ctrls;
              ctrls.Parent.appendChild(ctrls.btnRight);
              ctrls.btnRight.className=ctrls.Class+"btnRight";
              coDOM.setHint(ctrls.btnRight,coLang.Table.Apps.Collage.Edit.MoveImageRight);

              ctrls.btnRotateRight=document.createElement('div');
              ctrls.btnRotateRight.Owner=ctrls;
              ctrls.Parent.appendChild(ctrls.btnRotateRight);
              ctrls.btnRotateRight.className=ctrls.Class+"btnRotateRight";
              coDOM.setHint(ctrls.btnRotateRight,coLang.Table.Apps.Collage.Edit.RotateImageRight);

              ctrls.btnBottom=document.createElement('div');
              ctrls.btnBottom.Owner=ctrls;
              ctrls.Parent.appendChild(ctrls.btnBottom);
              ctrls.btnBottom.className=ctrls.Class+"btnBottom";
              coDOM.setHint(ctrls.btnBottom,coLang.Table.Apps.Collage.Edit.MoveImageBottom);

              ctrls.doTouchMove=function(e){
                var touch = e.touches[e.touches.length-1];
                var si=touch.target.Owner;
                if ( (si!=undefined) && (si.Controls) &&(si.View.ReadOnly==false)) {
                  if (si.Controls.Visible==false){
                    si.Controls.Show();
                  } else {
                    si.Controls.setHideTimer();
                  };
                };
              };
              ctrls.doMouseMove=function(e){
                var si=e.currentTarget.Owner;
                if ( (si!=undefined) && (si.Controls) &&(si.View.ReadOnly==false)) {
                  if (si.Controls.Visible==false){
                    si.Controls.Show();
                  } else {
                    si.Controls.setHideTimer();
                  };
                };
              };
              ctrls.doToolCommandEnd=function(e){
                var touch = (e.touches)? e.touches[e.touches.length-1] : null;
                var si= (touch)? touch.target.Owner.Owner : e.currentTarget.Owner.Owner;
                si.Controls.ctrTool=0;
                if (si.Controls.tiTool!=0)
                  clearInterval(si.Controls.tiTool);
              };
              ctrls.doMoveUpStart=function(e){
                var touch = (e.touches)? e.touches[e.touches.length-1] : null;
                var si= (touch)? touch.target.Owner.Owner : e.currentTarget.Owner.Owner;
                if (si.Controls.tiTool!=0)
                  clearInterval(si.Controls.tiTool);
                si.Glyph.MoveDown();
                si.Controls.tiTool=setInterval(
                  function(){
                    si.Controls.ctrTool=(si.Controls.ctrTool+1)*1.2;
                    if (si.Controls.ctrTool<coAppUI.App.Components.Elements.MaxControlIncrement){
                      for (var iLcv=0; iLcv<si.Controls.ctrTool; iLcv++)
                        si.Glyph.MoveDown();
                      si.Controls.setHideTimer();
                    } else {
                      clearInterval(si.Controls.tiTool);
                      si.Controls.tiTool=0;
                    };
                  },
                  coVDM.ElementStickyTool
                );
              };
              ctrls.doMoveDownStart=function(e){
                var touch = (e.touches)? e.touches[e.touches.length-1] : null;
                var si= (touch)? touch.target.Owner.Owner : e.currentTarget.Owner.Owner;
                if (si.Controls.tiTool!=0) clearInterval(si.Controls.tiTool);
                si.Glyph.MoveUp();
                si.Controls.tiTool=setInterval(
                  function(){
                    si.Controls.ctrTool=(si.Controls.ctrTool+1)*1.2;
                    if (si.Controls.ctrTool<coAppUI.App.Components.Elements.MaxControlIncrement){
                      for (var iLcv=0; iLcv<si.Controls.ctrTool; iLcv++)
                        si.Glyph.MoveUp();
                      si.Controls.setHideTimer();
                    } else {
                      clearInterval(si.Controls.tiTool);
                      si.Controls.tiTool=0;
                    };
                  },
                  coVDM.ElementStickyTool
                );
              };
              ctrls.doMoveRightStart=function(e){
                var touch = (e.touches)? e.touches[e.touches.length-1] : null;
                var si= (touch)? touch.target.Owner.Owner : e.currentTarget.Owner.Owner;
                if (si.Controls.tiTool!=0) clearInterval(si.Controls.tiTool);
                si.Glyph.MoveLeft();
                si.Controls.tiTool=setInterval(
                  function(){
                    si.Controls.ctrTool=(si.Controls.ctrTool+1)*1.2;
                    if (si.Controls.ctrTool<coAppUI.App.Components.Elements.MaxControlIncrement){
                      for (var iLcv=0; iLcv<si.Controls.ctrTool; iLcv++)
                        si.Glyph.MoveLeft();
                      si.Controls.setHideTimer();
                    } else {
                      clearInterval(si.Controls.tiTool);
                      si.Controls.tiTool=0;
                    };
                  },
                  coVDM.ElementStickyTool
                );
              };
              ctrls.doMoveLeftStart=function(e){
                var touch = (e.touches)? e.touches[e.touches.length-1] : null;
                var si= (touch)? touch.target.Owner.Owner : e.currentTarget.Owner.Owner;
                if (si.Controls.tiTool!=0) clearInterval(si.Controls.tiTool);
                si.Glyph.MoveRight();
                si.Controls.tiTool=setInterval(
                  function(){
                    si.Controls.ctrTool=(si.Controls.ctrTool+1)*1.2;
                    if (si.Controls.ctrTool<coAppUI.App.Components.Elements.MaxControlIncrement){
                      for (var iLcv=0; iLcv<si.Controls.ctrTool; iLcv++)
                        si.Glyph.MoveRight();
                      si.Controls.setHideTimer();
                    } else {
                      clearInterval(si.Controls.tiTool);
                      si.Controls.tiTool=0;
                    };
                  },
                  coVDM.ElementStickyTool
                );
              };
              ctrls.doRotateRightStart=function(e){
                var touch = (e.touches)? e.touches[e.touches.length-1] : null;
                var si= (touch)? touch.target.Owner.Owner : e.currentTarget.Owner.Owner;
                if (si.Controls.tiTool!=0) clearInterval(si.Controls.tiTool);
                si.Glyph.RotateRight();
                si.Controls.tiTool=setInterval(
                  function(){
                    si.Controls.ctrTool=(si.Controls.ctrTool+1)*1.2;
                    if (si.Controls.ctrTool<coAppUI.App.Components.Elements.MaxControlIncrement){
                      for (var iLcv=0; iLcv<si.Controls.ctrTool; iLcv++)
                        si.Glyph.RotateRight();
                      si.Controls.setHideTimer();
                    } else {
                      clearInterval(si.Controls.tiTool);
                      si.Controls.tiTool=0;
                    };
                  },
                  coVDM.ElementStickyTool
                );
              };
              ctrls.doRotateLeftStart=function(e){
                var touch = (e.touches)? e.touches[e.touches.length-1] : null;
                var si= (touch)? touch.target.Owner.Owner : e.currentTarget.Owner.Owner;
                if (si.Controls.tiTool!=0) clearInterval(si.Controls.tiTool);
                si.Glyph.RotateLeft();
                si.Controls.tiTool=setInterval(
                  function(){
                    si.Controls.ctrTool+=1;
                    if (si.Controls.ctrTool<coAppUI.App.Components.Elements.MaxControlIncrement){
                      for (var iLcv=0; iLcv<si.Controls.ctrTool; iLcv++)
                        si.Glyph.RotateLeft();
                      si.Controls.setHideTimer();
                    } else {
                      clearInterval(si.Controls.tiTool);
                      si.Controls.tiTool=0;
                    };
                  },
                  coVDM.ElementStickyTool
                );
              };
              ctrls.doAddGlyph=function(e){
                var touch = (e.touches)? e.touches[e.touches.length-1] : null;
                var si= (touch)? touch.target.Owner.Owner : e.currentTarget.Owner.Owner;
                if (si.onAddGlyph) si.onAddGlyph(si);
                si.Controls.setHideTimer();
              };
              ctrls.doRemoveGlyph=function(e){
                var touch = (e.touches)? e.touches[e.touches.length-1] : null;
                var si= (touch)? touch.target.Owner.Owner : e.currentTarget.Owner.Owner;

                if (si.onRemoveGlyph) si.onRemoveGlyph(si);
                var idx=si.Glyphs.indexOf(si.Glyph);
                if (idx!=-1) si.Glyphs.splice(idx,1);
                si.Glyph.Free();
                si.Glyph=null;
                si.Container.style.backgroundImage="";
                si.Glyphs.Start();
                si.Controls.Show();
              };
              ctrls.evtTouchMove=coEvents.Add(si.Container,"touchmove",ctrls.doTouchMove,coEvents.NoCapture,coEvents.Active);
              ctrls.evtMouseMove=coEvents.Add(si.Container,"mousemove",ctrls.doMouseMove,coEvents.NoCapture,coEvents.Active);

              ctrls.evtBtnTouchUpStart=coEvents.Add(ctrls.btnTop,"touchstart",ctrls.doMoveUpStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnTouchUpEnd=coEvents.Add(ctrls.btnTop,"touchend",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseUpStart=coEvents.Add(ctrls.btnTop,"mousedown",ctrls.doMoveUpStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseUpEnd=coEvents.Add(ctrls.btnTop,"mouseup",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);

              ctrls.evtBtnTouchDownStart=coEvents.Add(ctrls.btnBottom,"touchstart",ctrls.doMoveDownStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnTouchDownEnd=coEvents.Add(ctrls.btnBottom,"touchend",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseDownStart=coEvents.Add(ctrls.btnBottom,"mousedown",ctrls.doMoveDownStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseDownEnd=coEvents.Add(ctrls.btnBottom,"mouseup",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);

              ctrls.evtBtnTouchRightStart=coEvents.Add(ctrls.btnRight,"touchstart",ctrls.doMoveRightStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnTouchRightEnd=coEvents.Add(ctrls.btnRight,"touchend",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseRightStart=coEvents.Add(ctrls.btnRight,"mousedown",ctrls.doMoveRightStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseRightEnd=coEvents.Add(ctrls.btnRight,"mouseup",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);

              ctrls.evtBtnTouchLeftStart=coEvents.Add(ctrls.btnLeft,"touchstart",ctrls.doMoveLeftStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnTouchLeftEnd=coEvents.Add(ctrls.btnLeft,"touchend",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseLeftStart=coEvents.Add(ctrls.btnLeft,"mousedown",ctrls.doMoveLeftStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseLeftEnd=coEvents.Add(ctrls.btnLeft,"mouseup",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);

              ctrls.evtBtnTouchAdd=coEvents.Add(ctrls.btnAdd,"touchend",ctrls.doAddGlyph,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseAdd=coEvents.Add(ctrls.btnAdd,"mouseup",ctrls.doAddGlyph,coEvents.Capture,coEvents.Active);

              ctrls.evtBtnTouchRemove=coEvents.Add(ctrls.btnRemove,"touchend",ctrls.doRemoveGlyph,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseRemove=coEvents.Add(ctrls.btnRemove,"mouseup",ctrls.doRemoveGlyph,coEvents.Capture,coEvents.Active);

              ctrls.evtBtnTouchRotateLeftStart=coEvents.Add(ctrls.btnRotateLeft,"touchstart",ctrls.doRotateLeftStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnTouchRotateLeftEnd=coEvents.Add(ctrls.btnRotateLeft,"touchend",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseRotateLeftStart=coEvents.Add(ctrls.btnRotateLeft,"mousedown",ctrls.doRotateLeftStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseRotateLeftEnd=coEvents.Add(ctrls.btnRotateLeft,"mouseup",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);

              ctrls.evtBtnTouchRotateRightStart=coEvents.Add(ctrls.btnRotateRight,"touchstart",ctrls.doRotateRightStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnTouchRotateRightEnd=coEvents.Add(ctrls.btnRotateRight,"touchend",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseRotateRightStart=coEvents.Add(ctrls.btnRotateRight,"mousedown",ctrls.doRotateRightStart,coEvents.Capture,coEvents.Active);
              ctrls.evtBtnMouseRotateRightEnd=coEvents.Add(ctrls.btnRotateRight,"mouseup",ctrls.doToolCommandEnd,coEvents.Capture,coEvents.Active);

              ctrls.setHideTimer=function(){
                var ctls=this;
                if (ctls.toHide!=0) clearTimeout(ctls.toHide);
                ctls.toHide=setTimeout(
                  function(){
                    ctls.toHide=0;
                    ctls.Hide();
                    ctls.ctrTool=0;
                    if (ctls.Owner.View.Visible==true)
                      ctls.Owner.Start();
                  },
                  coVDM.ElementControlsDelay
                );
              };
              ctrls.Show=function(){
                var ctls=this;
                ctls.Owner.Stop();
                var lst=ctls.Owner.Owner;
                for (var iLcv=0; iLcv<lst.length; iLcv++){
                  var si=lst[iLcv];
                  if ((si.Controls) && (si.Controls.Visible==true))
                    si.Controls.Hide();
                };
                var iGC=ctls.Owner.Glyphs.length;
                var sDisplay= (iGC==0) ? "none" : "block";

                ctls.Owner.Caption.style.display=(iGC==0)? "block" : "none";
                ctls.Visible=true;
                ctls.btnAdd.style.display="block";
                ctls.btnRemove.style.display=sDisplay;
                //ctls.btnRotateLeft.style.display=sDisplay;
                //ctls.btnRotateRight.style.display=sDisplay;
                ctls.btnTop.style.display=sDisplay;
                ctls.btnLeft.style.display=sDisplay;
                ctls.btnRight.style.display=sDisplay;
                ctls.btnBottom.style.display=sDisplay;
                ctls.setHideTimer();
              };
              ctrls.Hide=function(){
                this.Visible=false;
                this.Owner.Caption.style.display="block";
                this.btnAdd.style.display="none";
                this.btnRemove.style.display="none";
                this.btnRotateLeft.style.display="none";
                this.btnRotateRight.style.display="none";
                this.btnTop.style.display="none";
                this.btnLeft.style.display="none";
                this.btnRight.style.display="none";
                this.btnBottom.style.display="none";
              };
              ctrls.Free=function(){
                var ctrls=this;
                if (ctrls.toHide!=0)
                  clearTimeout(ctrls.toHide);
                ctrls.evtTouchMove.Free();
                ctrls.evtMouseMove.Free();

                ctrls.btnAdd.EventList.Free();
                ctrls.btnRemove.EventList.Free();
                ctrls.btnTop.EventList.Free();
                ctrls.btnLeft.EventList.Free();
                ctrls.btnRight.EventList.Free();
                ctrls.btnBottom.EventList.Free();
                ctrls.btnRotateLeft.EventList.Free();
                ctrls.btnRotateRight.EventList.Free();

                ctrls.Parent.removeChild(ctrls.btnRemove);
                ctrls.Parent.removeChild(ctrls.btnAdd);
                ctrls.Parent.removeChild(ctrls.btnTop);
                ctrls.Parent.removeChild(ctrls.btnBottom);
                ctrls.Parent.removeChild(ctrls.btnLeft);
                ctrls.Parent.removeChild(ctrls.btnRight);
                ctrls.Parent.removeChild(ctrls.btnRotateLeft);
                ctrls.Parent.removeChild(ctrls.btnRotateRight);

                ctrls.Owner.Controls=null;
                ctrls=coObject.Release(ctrls);
                return null;
              };
              ctrls.Hide();
              return ctrls;
            };
            si.setText=function(sText){
              coDOM.setHTML(this.Caption,sText);
            };
            si.setCaption=function(sText){
              coDOM.setText(this.Caption,sText);
            };
            si.getCaption=function(){
              return coDOM.getText(this.Caption);
            };
            si._doCaptionClick=function(e){
              var touch = (e.touches)? e.touches[e.touches.length-1] : null;
              var si= (touch)? touch.target.Owner : e.currentTarget.Owner;
              if (si.View.ReadOnly==true) return;
              if (si.onCaptionClick) {
                si.onCaptionClick(si);
                coDOM.preventDefault(e);
              };
            };
            si.Caption.onmouseup=si._doCaptionClick;
            si.Caption.ontouchend=si._doCaptionClick;

            si.Glyphs.setCategory=function(sCategory){
              if ((sCategory==undefined) || (sCategory.length==0)){
                this.Category="";
                this.Next=this.NextByIndex;
              } else {
                this.Category=sCategory;
                this.Next=this.NextByCategory;
              };
            };
            si.Glyphs.Create=function(sGlyph,sCategory){
              if (sCategory==undefined) sCategory="";
              var g=coObject.Create(coObject.relInline,coObject.cpyAsVar,"Glyph");
              g.Owner=this;
              g.Assigned=false;
              g.Parent=this.Owner.Container;
              g.Container=new Image();
              g.Parent.appendChild(g.Container);
              g.Container.className=this.Owner.Class+"Glyph";
              g.Container.src=sGlyph;
              g.Container.Owner=g;
              g.Container.style.display="block";
              g.Container.style.visibility="visible";
              g.Container.style.opacity=0;
              g.Category=sCategory;
              g.FolderID=0;
              g.FileID=0;
              g.NetworkID=0;
              g.Visible=false;
              g.URL=sGlyph;
              g.Rotate=null;
              g.MoveX=null;
              g.MoveY=null;
              g.SizeX=null;
              g.SizeY=null;
              g.ScaleX=null;
              g.ScaleY=null;
              g.currentScaleX=null;
              g.currentScaleY=null;
              g.toConseal=0;
              g.NaturalAspect=null;
              g.onMovedUp=null;
              g.onMovedDown=null;
              g.onMovedRight=null;
              g.onMovedLeft=null;
              g.onRotatedLeft=null;
              g.onRotatedRight=null;

              g.Container.onload=function(){
                var g=this.Owner;
                if (g.Assigned==false){
                  g.SizeX=g.Container.naturalWidth;
                  g.SizeY=g.Container.naturalHeight;
                  g.NaturalAspect=g.SizeY/g.SizeX;
                  g.Place();
                  g.Assigned=true;
                  g.Enforce();
                } else {
                  g.Place();
                };
              };
              g.Assign=function(srcGlyph){
                var g=this;
                g.Visible=false;

                g.FolderID=srcGlyph.FolderID;
                g.FileID=srcGlyph.FileID;
                g.NetworkID=srcGlyph.NetworkID;

                g.URL=srcGlyph.URL;
                g.Rotate=srcGlyph.Rotate;
                g.MoveX=srcGlyph.MoveX;
                g.MoveY=srcGlyph.MoveY;
                g.SizeX=srcGlyph.SizeX;
                g.SizeY=srcGlyph.SizeY;
                g.ScaleX=srcGlyph.ScaleX;
                g.ScaleY=srcGlyph.ScaleY;
                g.currentScaleX=srcGlyph.currentScaleX;
                g.currentScaleY=srcGlyph.currentScaleY;

                g.NaturalAspect=srcGlyph.NaturalAspect;
                g.Category=srcGlyph.Category;
                g.Assigned=true;
              };
              g.Place=function(){
                var g=this;
                var bReadOnly=(this.Owner.Owner.View.ReadOnly==true);
                var iCW=g.Parent.clientWidth;
                var iCH=g.Parent.clientHeight;
                g.currentScaleX=g.Container.clientWidth/g.SizeX;
                g.currentScaleY=g.Container.clientHeight/g.SizeY;

                var iCW2=iCW/2;
                var iCH2=iCH/2;
                var iX=0;
                var iY=0;
                var iLeft=0;
                var iTop=0;
                var abr=Math.abs(g.Rotate);

                iX=g.SizeX;
                if (iCW>iX)
                  iX=iCW;
                if (iX>iCW)
                  iX=iCW;
                iY=iX*g.NaturalAspect;
                if (iCH>iY){
                  iY=iCH;
                  iX=iY/g.NaturalAspect;
                };
                if ( (iY>iCH) && ( (iCW==iCH) || (g.NaturalAspect==1)) ){
                  iY=iCH;
                  iX=iY/g.NaturalAspect;
                };
                var iX2=iX/2;
                var iY2=iY/2;

                if ((g.MoveX==0) || (g.MoveX==null)) {
                  iLeft=-(iX2-(iCW2));
                } else if (g.MoveX<0) {
                  // Revealing more of left off center
                  iBias=((g.MoveX*-1)/g.ScaleX)*g.currentScaleX;
                  iLeft=-(iX2-(iCW2+iBias));
                  if (iLeft>0) {
                    iLeft=0;
                    if (bReadOnly==false)
                      g.MoveX=-(iX2-iCW2)*g.ScaleX;
                  } else if (iLeft<=-(iX-iCW)){
                    iLeft=-(iX-iCW);
                    if (bReadOnly==false)
                      g.MoveX=-(iX2-iCW2)*g.ScaleX;
                  };
                } else if (g.MoveX>0) {
                  // Revealing to the right off center
                  iLeft=-((iX2-iCW2+(g.MoveX/g.ScaleX))*g.currentScaleX);
                  if (iLeft>0){
                    iLeft=0;
                    if (bReadOnly==false)
                      g.MoveX=-(iX2-iCW2)*g.ScaleX;
                  } else if (iLeft<-(iX-iCW) ) {
                    iLeft=-(iX-iCW);
                    if (bReadOnly==false)
                      g.MoveX=(iX2-iCW2)*g.ScaleX;
                  };
                };

                if ((g.MoveY==0) || (g.MoveY==null)) {
                  iTop=-(iY2-(iCH2));
                } else if (g.MoveY<0) {
                  // Revealing more of top off center
                  iBias=((g.MoveY*-1)/g.ScaleY)*g.currentScaleY;
                  iTop=-(iY2-(iCH2+iBias));
                  if (iTop>0) {
                    iTop=0;
                    if (bReadOnly==false)
                      g.MoveY=-(iY2-iCH2)*g.ScaleY;
                  } else if (iTop<=-(iY-iCH)){
                    iTop=-(iY-iCH);
                    if (bReadOnly==false)
                      g.MoveY=-(iY2-iCH2)*g.ScaleY;
                  };
                } else if (g.MoveY>0) {
                  // Revealing more of bottom off center
                  iTop=-((iY2-iCH2+(g.MoveY/g.ScaleY))*g.currentScaleY);
                  if (iTop>0){
                    iTop=0;
                    if (bReadOnly==false)
                      g.MoveY=-(iY2-iCH2)/g.ScaleY;
                  } else if (iTop<-(iY-iCH) ) {
                    iTop=-(iY-iCH);
                    if (bReadOnly==false)
                      g.MoveY=(iY2-iCH2)/g.ScaleY;
                  };
                };
                if (g.MoveX) g.MoveX=parseInt(g.MoveX);
                if (g.MoveY) g.MoveY=parseInt(g.MoveY);
                g.Container.style.width=iX+"px";
                g.Container.style.height=iY+"px";
                g.Container.style.top=iTop+"px";
                g.Container.style.left=iLeft+"px";
              };
              g.Enforce=function(){
                var g=this;
                var iCW=g.Parent.clientWidth;
                var iCH=g.Parent.clientHeight;
                g.currentScaleX=g.Container.clientWidth/g.SizeX;
                g.currentScaleY=g.Container.clientHeight/g.SizeY;
                var iCW2=iCW/2;
                var iCH2=iCH/2;
                var iX=0;
                var iY=0;
                var iLeft=0;
                var iTop=0;
                var abr=Math.abs(g.Rotate);

                iX=g.SizeX;
                if (iCW>iX)
                  iX=iCW;
                if (iX>iCW)
                  iX=iCW;
                iY=iX*g.NaturalAspect;
                if (iCH>iY){
                  iY=iCH;
                  iX=iY/g.NaturalAspect;
                };
                if ((iY>iCH) && ( (iCW==iCH) || (g.NaturalAspect==1)) ){
                  iY=iCH;
                  iX=iY/g.NaturalAspect;
                };
                var iX2=iX/2;
                var iY2=iY/2;

                if ((g.MoveX==0) || (g.MoveX==null)) {
                  iLeft=-(iX2-(iCW2));
                } else if (g.MoveX<0) {
                  // Revealing more of left off center
                  iBias=-((g.MoveX/g.ScaleX)*g.currentScaleX);
                  iLeft=-(iX2-(iCW2+iBias));
                  if (iLeft>0) {
                    iLeft=0;
                  } else if (iLeft<=-(iX-iCW)){
                    iLeft=-(iX-iCW);
                  };
                } else if (g.MoveX>0) {
                  // Revealing to the right off center
                  iLeft=-((iX2-iCW2+(g.MoveX/g.ScaleX))*g.currentScaleX);
                  if (iLeft>0){
                    iLeft=0;
                  } else if (iLeft<-(iX-iCW) ) {
                    iLeft=-(iX-iCW);
                  };
                };

                if ((g.MoveY==0) || (g.MoveY==null)) {
                  iTop=-(iY2-(iCH2));
                } else if (g.MoveY<0) {
                  // Revealing more of top off center
                  iBias=-((g.MoveY/g.ScaleY)*g.currentScaleX);
                  iTop=-(iY2-(iCH2+iBias));
                  if (iTop>0) {
                    iTop=0;
                  } else if (iTop<=-(iY-iCH)){
                    iTop=-(iY-iCH);
                  };
                } else if (g.MoveY>0) {
                  // Revealing more of bottom off center
                  iTop=-((iY2-iCH2+(g.MoveY/g.ScaleY))*g.currentScaleX);
                  if (iTop>0){
                    iTop=0;
                  } else if (iTop<-(iY-iCH) ) {
                    iTop=-(iY-iCH);
                  };
                };

                g.Container.style.width=iX+"px";
                g.Container.style.height=iY+"px";
                g.Container.style.top=iTop+"px";
                g.Container.style.left=iLeft+"px";

              };

              g.MoveUp=function(){
                var g=this;
                g.ScaleX=g.Container.clientWidth/g.SizeX;
                g.ScaleY=g.Container.clientHeight/g.SizeY;
                g.MoveY+=1;
                g.Place();
                if (g.onMovedUp) g.onMovedUp(g);
              };
              g.MoveDown=function(){
                var g=this;
                g.ScaleX=g.Container.clientWidth/g.SizeX;
                g.ScaleY=g.Container.clientHeight/g.SizeY;
                g.MoveY-=1;
                g.Place();
                if (g.onMovedDown) g.onMovedDown(g);
              };
              g.MoveRight=function(){
                var g=this;
                g.ScaleX=g.Container.clientWidth/g.SizeX;
                g.ScaleY=g.Container.clientHeight/g.SizeY;
                g.MoveX-=1;
                g.Place();
                if (g.onMovedRight) g.onMovedRight(g);
              };
              g.MoveLeft=function(){
                var g=this;
                g.ScaleX=g.Container.clientWidth/g.SizeX;
                g.ScaleY=g.Container.clientHeight/g.SizeY;
                g.MoveX+=1;
                g.Place();
                if (g.onMovedLeft) g.onMovedLeft(g);
              };
              g.RotateRight=function(){
                var g=this;
                g.Rotate+=45;
                if (g.Rotate>360) g.Rotate=null;

                var sRotate=(g.Rotate!=null)?"rotate("+g.Rotate+"deg)" : "";
                coDOM.setTransform(g.Container,sRotate);
                g.Place();
                if (g.onRotateRight) g.onRotateRight(g);

              };
              g.RotateLeft=function(){
                var g=this;
                g.Rotate-=45;
                if (g.Rotate<-360) g.Rotate=null;
                var sRotate=(g.Rotate!=null)?"rotate("+g.Rotate+"deg)" : "";
                coDOM.setTransform(g.Container,sRotate);
                g.Place();
                if (g.onRotateLeft) g.onRotateLeft(g);
              };
              g.Show=function(){
                var g=this;
                var si=this.Owner.Owner;
                g.Visible=true;
                g.Container.style.visibility="visible";
                g.Container.style.opacity=1;
                for (var iLcv=0; iLcv<si.Glyphs.length; iLcv++){
                  var gLcv=si.Glyphs[iLcv];
                   if ( (gLcv!=g) && (gLcv.Container.style.opacity!=0) && (g.toConseal==0) )
                     gLcv.Conseal();
                };
                si.Glyphs.Index=si.Glyphs.indexOf(g);
                si.Glyph=g;
                if (g.Assigned==true) g.Enforce();
              };
              g.Hide=function(){
                var g=this;
                g.Visible=false;
                g.Container.style.visibility="hidden";
              };
              g.Conseal=function(){
                var g=this;
                g.Visible=false;
                g.Container.style.opacity=0;
                g.toConseal=setTimeout(
                  function(){
                    g.Container.style.visibility="hidden";
                    g.toConseal=0;
                  },
                  coAppUI.App.Components.Elements.TransitionDelay
                );
              };
              g.Reset=function(){
                var g=this;
                this.Container.backgroundImage="";
                coDOM.setTransform(this.Container,"");
                this.Container.style.backgroundPositionX="";
                this.Container.style.backgroundPositionY="";
              };
              g.Free=function(){
                var g=this;
                if (g.toConseal!=0)
                  clearTimeout(g.toConseal);
                g.Container.onload=null;
                g.Container.Owner=null;
                g.Parent.removeChild(g.Container);
                if (g.Owner.Clearing==false){
                  var si=g.Owner.Owner;
                  if (si.Glyph==g) si.Glyph=null;
                  var idx=g.Owner.indexOf(g);
                  if (idx!=-1)
                    g.Owner.splice(idx,1);
                };
                g=coObject.Release(g);
                return null;
              };
              return g;
            };
            si.Glyphs.NextByCategory=function(recLcv){
              if (recLcv==undefined) var recLcv=0;
              var gl=this;
              var si=gl.Owner;
              var idx=gl.Index+1;
              if (idx>=gl.length) idx=0;
              var iLcv=idx;
              while (iLcv<gl.length) {
                var g=gl[iLcv];
                if (g.Category==gl.Category) {
                  g.Show();
                  gl.Index=iLcv;
                  return;
                };
                iLcv++;
              };
              gl.Index=-1;
              if (recLcv<2)
                gl.NextByCategory(recLcv+1);
            };
            si.Glyphs.NextByIndex=function(){
              var gl=this;
              var si=gl.Owner;
              var idx=gl.Index+1;
              if (idx>=gl.length) idx=0;
              if ( (idx<gl.length)&&(si.Glyph!=gl[idx])){
                gl[idx].Show();
                gl.Index=idx;
                return;
              };
            };

            si.Glyphs.Next=si.Glyphs.NextByIndex;
            si.Glyphs.Start=function(){
              var gl=this;
              var si=gl.Owner;
              var vw=gl.View;
              if ( (vw.ReadOnly==false) || (gl.length>1)) {
                if (vw.Visible==true) {
                  gl.Active=true;
                  if (gl.Handle!=0)
                    clearInterval(gl.Handle);
                  gl.Handle=setInterval(function(){gl.Next();},gl.Delay);
                };
              };
              gl.Next();
            };
            si.Glyphs.Stop=function(){
              var gl=this;
              gl.Active=false;
              if (gl.Handle!=0){
                clearInterval(gl.Handle);
                gl.Handle=0;
              };
            };
            si.Glyphs.setDelay=function(iDelay){
              var gl=this;
              gl.Delay=iDelay;
              if (gl.Handle!=0){
                clearInterval(gl.Handle);
                gl.Handle=setInterval(function(){gl.Next();},gl.Delay);
              };
            };
            si.Glyphs.Assign=function(srcGlyphs){
              var gl=this;
              gl.Clear();
              for (var iLcv=0; iLcv<srcGlyphs.length; iLcv++){
                var srcG=srcGlyphs[iLcv];
                var destG=gl.Create(srcG.URL,srcG.Category);
                gl.push(destG);
                destG.Assign(srcG);
                //destG.Reveal();
              };
            };
            si.Glyphs.Clear=function(){
              var gl=this;
              var si=gl.Owner;
              gl.Stop();
              gl.Clearing=true;
              for (var iLcv=0; iLcv<gl.length; iLcv++) {
                var g=gl[iLcv];
                g=g.Free();
              };
              gl.Clearing=false;
              gl.length=0;
              si.Glyph=null;
            };
            si.Glyphs.Free=function(){
              var gl=this;
              var si=gl.Owner;
              si.Glyph=null;
              gl.Clear();
              gl=coObject.Release(gl);
              return null;
            };
            coDOM.clearMargins(si.Container);
            si.Start=function(){
              this.Glyphs.Start();
            };
            si.Stop=function(){
              this.Glyphs.Stop();
            };
            si.addGlyph=function(sGlyph,sCategory){
              if ((sGlyph!=undefined) && (sGlyph.length>0)) {
                var g=this.Glyphs.Create(sGlyph,sCategory);
                this.Glyphs.push(g);
                //if (this.View.Visible==true)
                //  g.Show();
                if (this.View.ReadOnly==false) this.Controls.Show();
                return g;
              } else {
                return null;
              };
            };
            if (this.View.ReadOnly==false)
              si.Controls=si._createControls();
            si.Free=function(){
              var si=this;
              if (si.Owner.Clearing==false){
                var idx=si.Owner.indexOf(si);
                si.Owner.splice(idx,1);
              };
              si.Glyphs=si.Glyphs.Free();

              si.Container.removeChild(si.Caption);
              si.Parent.removeChild(si.Container);

              if (si.Controls) si.Controls.Free();
              si=coObject.Release(si);
              return null;
            };
            si.LoadCSS();
            this.push(si);
            return si;
          };
          var k=coAppUI.App.Components.Elements.Kind;
          switch (this.Kind) {
            case (k.Single) : {
              lst.Add();
              break;
            };
            case (k.Double) :{
              lst.Add();
              lst.Add();
              break;
            };
            case (k.Tripple) : {
              lst.Add();
              lst.Add();
              lst.Add();
              break;
            };
            case (k.Quad) : {
              lst.Add();
              lst.Add();
              lst.Add();
              lst.Add();
              break;
            };
          };
          lst.setSize=function(){
            var lst=this;
            var k=coAppUI.App.Components.Elements.Kind;
            lst.Container.style.width=lst.View.elementSpan+"px";
            lst.Container.style.height=lst.View.elementSpan+"px";
            switch (lst.Owner.Kind) {
              case (k.Single) : {
                si=lst[0];
                si.Container.style.top=si.Padding.Top+"px";
                si.Container.style.left=si.Padding.Left+"px";
                si.Container.style.width=lst.View.elementSpan-si.Padding.xBias()-si.Margin.xBias()-si.Border.xBias()+"px";
                si.Container.style.height=lst.View.elementSpan-si.Padding.yBias()-si.Margin.yBias()-si.Border.yBias()+"px";
                si.Caption.style.marginTop=-(si.Caption.clientHeight/2)+"px"
                if (si.Glyph) si.Glyph.Enforce();
                break;
              };
              case (k.Double) :{
                siTop=lst[0];
                siBottom=lst[1];

                siTop.Container.style.top=siTop.Padding.Top+siTop.Margin.Top+"px";
                siTop.Container.style.left=siTop.Padding.Top+siTop.Margin.Left+"px";
                siTop.Container.style.width=lst.View.elementSpan-siTop.Margin.xBias()-siTop.Border.xBias()-siTop.Padding.xBias()+"px";
                siTop.Container.style.height=lst.View.elementHalfSpan-siTop.Margin.yBias()-siTop.Border.yBias()-siTop.Padding.yBias()+"px";
                siTop.Caption.style.marginTop=-(siTop.Caption.clientHeight/2)+"px"

                siBottom.Container.style.top=lst.View.elementHalfSpan+siBottom.Margin.Top+siBottom.Padding.Top+"px";
                siBottom.Container.style.left=siBottom.Margin.Left+siBottom.Padding.Left+"px";
                siBottom.Container.style.height=lst.View.elementHalfSpan-siBottom.Margin.yBias()-siBottom.Border.yBias()-siBottom.Padding.yBias()+"px";
                siBottom.Container.style.width=lst.View.elementSpan-siBottom.Margin.xBias()-siBottom.Border.xBias()-siBottom.Padding.xBias()+"px";
                siBottom.Caption.style.marginTop=-(siBottom.Caption.clientHeight/2)+"px"

                if (siTop.Glyph) siTop.Glyph.Enforce();
                if (siBottom.Glyph) siBottom.Glyph.Enforce();

                break;
              };
              case (k.Tripple) : {
                siTop=lst[0];
                siLeft=lst[1];
                siRight=lst[2];

                siTop.Container.style.left=siTop.Margin.Left+siTop.Padding.Left+"px";
                siTop.Container.style.top=siTop.Margin.Top+siTop.Padding.Top+"px";
                siTop.Container.style.width=lst.View.elementSpan-siTop.Margin.xBias()-siTop.Border.xBias()-siTop.Padding.xBias()+"px";
                siTop.Container.style.height=lst.View.elementHalfSpan-siTop.Margin.yBias()-siTop.Border.yBias()-siTop.Padding.yBias()+"px";
                siTop.Caption.style.marginTop=-(siTop.Caption.clientHeight/2)+"px"
                if (siTop.Glyph) siTop.Glyph.Enforce();

                siLeft.Container.style.top=lst.View.elementHalfSpan+siLeft.Margin.Top+siLeft.Padding.Top+"px";
                siLeft.Container.style.height=lst.View.elementHalfSpan-siLeft.Margin.yBias()-siLeft.Border.yBias()-siLeft.Padding.yBias()+"px";
                siLeft.Container.style.left=siLeft.Margin.Left+siLeft.Padding.Left+"px";
                siLeft.Container.style.width=lst.View.elementHalfSpan-siLeft.Margin.xBias()-siLeft.Border.xBias()-siLeft.Padding.xBias()+"px";
                siLeft.Caption.style.marginTop=-(siLeft.Caption.clientHeight/2)+"px"
                if (siLeft.Glyph) siLeft.Glyph.Enforce();

                siRight.Container.style.top=lst.View.elementHalfSpan+siRight.Margin.Top+siRight.Padding.Top+"px";
                siRight.Container.style.left=lst.View.elementHalfSpan+siRight.Margin.Left+siRight.Padding.Left+"px";
                siRight.Container.style.width=lst.View.elementHalfSpan-siRight.Margin.xBias()-siRight.Border.xBias()-siRight.Padding.xBias()+"px";
                siRight.Container.style.height=lst.View.elementHalfSpan-siRight.Margin.yBias()-siRight.Border.yBias()-siRight.Padding.yBias()+"px";
                siRight.Caption.style.marginTop=-(siRight.Caption.clientHeight/2)+"px"
                if (siRight.Glyph) siRight.Glyph.Enforce();

                break;
              };
              case (k.Quad) : {
                siTopLeft=lst[0];
                siTopRight=lst[1];
                siBoLeft=lst[2];
                siBoRight=lst[3];
                siTopLeft.Container.style.left=siTopLeft.Padding.Left+"px";
                siTopLeft.Container.style.top=siTopLeft.Padding.Top+"px";
                siTopLeft.Container.style.width=lst.View.elementHalfSpan-siTopLeft.Margin.xBias()-siTopLeft.Border.xBias()-siTopLeft.Padding.xBias()  +"px";
                siTopLeft.Container.style.height=lst.View.elementHalfSpan-siTopLeft.Margin.yBias()-siTopLeft.Border.yBias()-siTopLeft.Padding.yBias() +"px";
                siTopLeft.Caption.style.marginTop=-(siTopLeft.Caption.clientHeight/2)+"px"
                if (siTopLeft.Glyph) siTopLeft.Glyph.Enforce();
                siTopRight.Container.style.top=siTopRight.Padding.Top+"px";
                siTopRight.Container.style.left=lst.View.elementHalfSpan+siTopRight.Padding.Left+"px";
                siTopRight.Container.style.width=lst.View.elementHalfSpan-siTopRight.Margin.xBias()-siTopRight.Border.xBias()-siTopRight.Padding.xBias()+"px";
                siTopRight.Container.style.height=lst.View.elementHalfSpan-siTopRight.Margin.yBias()-siTopRight.Border.yBias()-siTopRight.Padding.yBias()+"px";
                siTopRight.Caption.style.marginTop=-(siTopRight.Caption.clientHeight/2)+"px"
                if (siTopRight.Glyph) siTopRight.Glyph.Enforce();

                siBoLeft.Container.style.top=lst.View.elementHalfSpan+siBoLeft.Padding.Top+"px";
                siBoLeft.Container.style.left=siBoLeft.Padding.Left+"px";
                siBoLeft.Container.style.width=lst.View.elementHalfSpan-siBoLeft.Margin.xBias()-siBoLeft.Border.xBias()-siBoLeft.Padding.xBias()+"px";
                siBoLeft.Container.style.height=lst.View.elementHalfSpan-siBoLeft.Margin.yBias()-siBoLeft.Border.yBias()-siBoLeft.Padding.yBias()+"px";
                siBoLeft.Caption.style.marginTop=-(siBoLeft.Caption.clientHeight/2)+"px"
                if (siBoLeft.Glyph) siBoLeft.Glyph.Enforce();

                siBoRight.Container.style.top=lst.View.elementHalfSpan+siBoRight.Padding.Top+"px";
                siBoRight.Container.style.left=lst.View.elementHalfSpan+siBoRight.Padding.Left+"px";
                siBoRight.Container.style.width=lst.View.elementHalfSpan-siBoRight.Margin.xBias()-siBoRight.Border.xBias()-siBoRight.Padding.xBias()+"px";
                siBoRight.Container.style.height=lst.View.elementHalfSpan-siBoRight.Margin.yBias()-siBoRight.Border.yBias()-siBoRight.Padding.yBias()+"px";
                siBoRight.Caption.style.marginTop=-(siBoRight.Caption.clientHeight/2)+"px"
                if (siBoRight.Glyph) siBoRight.Glyph.Enforce();
                break;
              };
            };
          };
          lst.Clear=function(){
            var lst=this;
            lst.Clearing=true;
            try {
              for (var iLcv=0; iLcv<lst.length; iLcv++){
                var si=lst[iLcv];
                si.Free();
              };
              lst.length=0;
            } catch (err) {
              lst.Clearing=false;
              throw err;
            };
          };
          lst.Free=function(){
            var lst=this;
            lst.Clear();
            lst.Parent.removeChild(lst.Container);
            lst=coObject.Release(lst);
            return null;
          };
          return lst;
        };
        e.setSize=function(){
          var e=this;
          e.Container.style.height=e.View.elementSpan+"px";
          e.Container.style.width=e.View.elementSpan+"px";
          e.subItems.setSize();
        };
        e.setImage=function(sGlyph){
          this.Glyph.style.backgroundImage="url("+sGlyph+")";
        };
        e.setCaption=function(sCaption){
          if (sCaption.length>0) coDOM.setText(this.Container,sCaption);
        };
        e.doOpen=function(e){
          if (e==undefined) e=window.event;
          if (this.onOpen){
            coDOM.preventDefault(e);
            this.onOpen(this);
          };
        };
        e.Assign=function(srcElement){
          var e=this;
          e.subItems.Clear();
          for (var iLcv=0; iLcv<srcElement.subItems.length; iLcv++){
            var siSrc=srcElement.subItems[iLcv];
            var siDest=e.subItems.Add();
            siDest.Assign(siSrc);
          };
        };
        e.Free=function(){
          var e=this;
          var vw=e.Owner.Owner;
          e.subItems=e.subItems.Free();
          if (e.Owner.Clearing==false) {
            var idx=e.Owner.indexOf(f)
            if (idx!=-1) e.Owner.splice(idx,1);
          };
          e.Parent.removeChild(e.Container);

          e=coObject.Release(e);
          return null;
        };
        e.subItems=e._createSubItems();
        e.Container.ontouchend=function(ev){e.doOpen(ev);};
        e.Container.onmouseup=function(ev){e.doOpen(ev);};
        this.push(e);
        e.View.Screen.setSize();
        return e;
      };
      lst.Clear=function(){
        var lst=this;
        lst.Stop();
        lst.Clearing=true;
        for (var iLcv=0; iLcv<lst.length; iLcv++){
          var f=lst[iLcv];
          f.Free();
        };
        lst.length=0;
        lst.Clearing=false;
      };
      lst.Free=function(){
        var lst=this;
        lst.Clear();
        lst.Parent.removeChild(lst.Container);
        lst=null;
        return null;
      };
      lst.LoadCSS();
      return lst;
    };
    _vw.Items=_vw._createElements();
    //_vw.vScroll=coAppUI.App.Components.vScroll.Create("vScroll",Screen.Frame,_vw,_vw.Container,_vw.Items.Container,_vw.Container);
    _vw.doShow=function(){
      this.setSize();
      this.Items.Show();
      if (this.AutoStart==true)
        this.Items.Start();
    };
    _vw.doHide=function(){
      this.Items.Hide();
    };
    _vw.doSetSize=function(){
      this.Items.setSize();
    };
    return _vw;
  }
}
coAppUI.App.Components.Elements.init();
