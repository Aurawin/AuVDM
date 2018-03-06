coPartners.App.Components.ImageBar = {
  Version        : new Version(2013,12,6,1),
  Title          : new Title("Partners Views Image Bar","Image Bar"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPartners.App,'/partners/ImageBar.js',coAppKit.PreLoaded),
  debugToConsole : true,
  urlProgramText : '/partners/cntImageBar.html',
  Init : function(){

  },

  Create : function(Owner){
    var sc=Owner.Screen;
    var vs=Owner.Slides.createSlide(
      "ImageBar",
      sc.Class+"ImageBar",
      sc,
      Owner,
      Owner.Container,
      coAppUI.Alignment.Top
    );
    vs.Unit=this;
    vs.Visible=true;
    vs.Wrapper=vs.Slides.createSlide(
      "ImageBarWrapper",
      sc.Class+"ImageBarWrapper",
      sc,
      vs,
      vs.Container,
      coAppUI.Alignment.Center
    );
    vs.doSetSizeLarge=function(){
      var vw=this;
      var sc=vw.Screen;

      vw.Wrapper.Width=(
        vw.Wrapper.Glyph1.Container.offsetWidth+
        vw.Wrapper.Glyph2.Container.offsetWidth+
        vw.Wrapper.Glyph3.Container.offsetWidth
      );
      if (vw.Wrapper.restoreWidth==undefined){
        vw.Wrapper.restoreWidth=vw.Wrapper.Width;
      };
      if (vw.Container.clientWidth<vw.Wrapper.Width){
        vw.Wrapper.Width=vw.Container.clientWidth;
      } else {
        var iBias=(vw.Container.clientWidth<vw.Wrapper.restoreWidth) ? vw.Wrapper.restoreWidth-vw.Container.clientWidth : 0;
        vw.Wrapper.Width=vw.Wrapper.restoreWidth - iBias ;
      };
      var iBias=(
        vw.Wrapper.Glyph1.Border.xBias()+
        vw.Wrapper.Glyph1.Padding.xBias()+
        vw.Wrapper.Glyph2.Border.xBias()+
        vw.Wrapper.Glyph2.Padding.xBias()+
        vw.Wrapper.Glyph3.Padding.xBias()+
        vw.Wrapper.Glyph3.Border.xBias()
      );
      var iWidth=(vw.Wrapper.Width - iBias)/3;
      vw.Wrapper.Glyph1.setWidth(iWidth);
      vw.Wrapper.Glyph2.setWidth(iWidth);
      vw.Wrapper.Glyph3.setWidth(iWidth);
      vw.Wrapper.Container.style.height=vw.Container.clientHeight+"px";
      vw.Wrapper.Container.style.width=vw.Wrapper.Width+"px";
    };
    vs.doSetSizeSmall=function(){};
    vs.doSetSize=vs.doSetSizeLarge;
    vs.Wrapper.Glyph1=vs.Wrapper.Slides.createSlide(
      "ImageBarGlyph1",
      sc.Class+"ImageBarGlyph1",
      sc,
      vs.Wrapper,
      vs.Wrapper.Container,
      coAppUI.Alignment.Left
    );
    vs.Wrapper.Glyph2=vs.Wrapper.Slides.createSlide(
      "ImageBarGlyph2",
      sc.Class+"ImageBarGlyph2",
      sc,
      vs.Wrapper,
      vs.Wrapper.Container,
      coAppUI.Alignment.Left
    );
    vs.Wrapper.Glyph3=vs.Wrapper.Slides.createSlide(
      "ImageBarGlyph3",
      sc.Class+"ImageBarGlyph3",
      sc,
      vs.Wrapper,
      vs.Wrapper.Container,
      coAppUI.Alignment.Left
    );
    vs.onContentLoaded=function(s){
      var vs=s.Owner;
      coDOM.setHTML(vs.Wrapper.Glyph2.Container,s.responseText);
    };
    vs.onContentError=function(s){
      var vs=s.Owner;
      coDOM.setHTML(vs.Wrapper.Glyph2.Container,"");
    };
    vs.LoadContent=function(){
      var vs=this;
      coDOM.httpGET(vs,vs.Unit.urlProgramText,vs.onContentLoaded,vs.onContentError);

    };
    vs.Visible=true;
    vs.clearContainerClass();
    vs.Wrapper.clearContainerClass();
    vs.Wrapper.Visible=true;
    vs.Wrapper.Glyph1.clearContainerClass();
    vs.Wrapper.Glyph2.clearContainerClass();
    vs.Wrapper.Glyph3.clearContainerClass();

    if  (coVDM.Display.Small==true){
      vs.Wrapper.Glyph1.Conseal();
      vs.Wrapper.Glyph2.Visible=true;
      vs.Wrapper.Align.setValue(coAppUI.Alignment.Client);
      vs.Wrapper.Glyph2.Align.setValue(coAppUI.Alignment.Client);
      vs.Wrapper.Glyph3.Conseal();
      vs.doSetSize=vs.doSetSizeSmall;
    } else {
      vs.Wrapper.Glyph1.Visible=true;
      vs.Wrapper.Glyph2.Visible=true;
      vs.Wrapper.Glyph3.Visible=true;
    };

    vs.LoadContent();
    return vs;
  }
};
coPartners.App.Components.ImageBar.Init();
