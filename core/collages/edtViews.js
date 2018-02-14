coCollageBoard.App.Components.edtViews = {
  Version        : new Version(2013,12,9,60),
  Title          : new Title("Collage Board Editor Views","edtViews"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCollageBoard.App,'/core/collages/edtViews.js',coAppKit.PreLoaded),
  debugToConsole : true,
  initTemplateItem   : function(itm,Element){

    itm.Page.Template=itm;
    itm.Page.Slides.Title.setTransparent(true);
    itm.Page.Slides.Description.setTransparent(true);
    itm.Owner.setTransparent(true);
    itm.Page.setClientPosition(coAppUI.Absolute);
    var sis=Element.subItems;
    for (var iLcv=0; iLcv<sis.length; iLcv++){
      sis[iLcv].setCaption(coLang.Table.Apps.Collage.Edit.AddImage);
      sis[iLcv].Template=itm;
      sis[iLcv].Glyphs.Delay=coCollageBoard.ElementSwitchDelay;
      sis[iLcv].onCaptionClick=function(){
        si=this;
        var itm=this.Template;
        itm.Owner.Torus.Start();
        var dlg=coDialogs.SelectPicture;
        dlg.targetScreen=coCollageBoard.App.Screen;
        dlg.Target=si;
        dlg.onCanceled=function(){
          itm.Owner.Torus.Stop();
        };
        dlg.onExecuted=function(){
          var si=this.Target;
          var itm=si.Template;
          if (this.File){
            var sURL=this.File.Collection.palmprintURL(this.File);
            var g=si.addGlyph(sURL);

            g.NetworkID=this.File.MAP.NetworkID.Value;
            g.FolderID=this.File.MAP.FolderID.Value;
            g.FileID=this.File.MAP.ID.Value;

            g.onRotatedLeft=function(g){};
            g.onRotatedRight=function(g){};
            g.onMovedLeft=function(g){};
            g.onMovedRight=function(g){};
            g.onMovedUp=function(g){};
            g.onMovedDown=function(g){};
            g.Show();
          };
          itm.Owner.Torus.Stop();
        };
        dlg.Show();
      };
      sis[iLcv].onAddGlyph=sis[iLcv].onCaptionClick;
    };
    itm.Page.onSetSize=function(){
      var itm=this.Template;
      var cX=itm.Page.Slides.Sample.Container.clientWidth;
      var cY=itm.Page.Slides.Sample.Container.clientHeight;
      var iSpan=cY;
      if (iSpan>cX)
        iSpan=cX;
      iSpan-=(iSpan % 2==0) ? coCollageBoard.SampleMargin : coCollageBoard.SampleMargin+1;
      itm.Page.Slides.Sample.setElementSpan(iSpan);
    };
  },
  initEditorElement : function(Element){
    var sis=Element.subItems;
    for (var iLcv=0; iLcv<sis.length; iLcv++){
      sis[iLcv].setCaption(coLang.Table.Apps.Collage.Edit.AddImage);
      sis[iLcv].Glyphs.Delay=coCollageBoard.ElementSwitchDelay;
      sis[iLcv].Switcher=Element.Owner.Owner.Owner.Owner;
      sis[iLcv].onCaptionClick=function(){
        si=this;
        si.Switcher.Nav.Torus.Start();
        var dlg=coDialogs.SelectPicture;
        dlg.targetScreen=coCollageBoard.App.Screen;
        dlg.Target=si;
        dlg.onCanceled=function(){
          this.Target.Switcher.Nav.Torus.Stop();
        };
        dlg.onExecuted=function(){
          var si=this.Target;
          if (this.File){
            var sURL=this.File.Collection.palmprintURL(this.File);
            var g=si.addGlyph(sURL);

            g.NetworkID=this.File.MAP.NetworkID.Value;
            g.FolderID=this.File.MAP.FolderID.Value;
            g.FileID=this.File.MAP.ID.Value;

            g.onRotatedLeft=function(g){};
            g.onRotatedRight=function(g){};
            g.onMovedLeft=function(g){};
            g.onMovedRight=function(g){};
            g.onMovedUp=function(g){};
            g.onMovedDown=function(g){};
            g.Show();
          };
          si.Switcher.Nav.Torus.Stop();
        };
        dlg.Show();
      };
      sis[iLcv].onAddGlyph=sis[iLcv].onCaptionClick;
    };
  },
  initSingle : function(vw){
    var itm=vw.Items.Single;

    itm.Page.Slides.Title=itm.Page.Slides.createSlide("Title","CollageEditKindTitle",vw.Screen,itm.Page,itm.Page.Content,coAppUI.Alignment.Top);
    itm.Page.Slides.Title.setCaption(coLang.Table.Apps.Collage.Sample.Single.Title);
    itm.Page.Slides.Description=itm.Page.Slides.createSlide("Description","CollageEditKindDescription",vw.Screen,itm.Page,itm.Page.Content,coAppUI.Alignment.Top);
    itm.Page.Slides.Description.setCaption(coLang.Table.Apps.Collage.Sample.Single.Description);
    itm.Page.Slides.Sample=coAppUI.App.Components.Elements.Create("Elements","CollageEditKindElements",vw.Screen,itm.Page.Slides,itm.Page,itm.Page.Content,coAppUI.Alignment.Client);
    itm.Page.Slides.Sample.ReadOnly=false;
    itm.Page.Slides.Sample.Single=itm.Page.Slides.Sample.Items.Add(coAppUI.App.Components.Elements.Kind.Single);
    itm.Clear=function(){
      var itm=this;
      var elm=itm.Page.Slides.Sample.Single;
      for (var iLcv=0; iLcv<elm.subItems.length; iLcv++){
        var si=elm.subItems[iLcv];
        si.Glyphs.Clear();
      };
    };
    this.initTemplateItem(itm,itm.Page.Slides.Sample.Single);
  },
  initElementsForPublisher : function(Elements){
    Elements.ReadOnly=false;
    Elements.setTransparent(true);
    Elements.onSetSize=function(){
      var itm=this.Template;
      var cX=this.Container.clientWidth;
      var cY=this.Container.clientHeight;
      var iSpan=cY;
      if (iSpan>cX)
        iSpan=cX;
      iSpan-=(iSpan % 2==0) ? coCollageBoard.SampleMargin : coCollageBoard.SampleMargin+1;
      this.setElementSpan(iSpan);
    };
    for (var iLcv=0; iLcv<Elements.Items.length; iLcv++)
      this.initEditorElement(Elements.Items[iLcv]);
  },
  copyElementsForPublisher : function(srcElements,dstElements){
    dstElements.Items.Clear();
    for (var iLcv=0; iLcv<srcElements.Items.length; iLcv++){
      var itmSrc=srcElements.Items[iLcv];
      var itmDest=dstElements.Items.Add(itmSrc.Kind);
      itmDest.Assign(itmSrc);
    };
  },
  initDouble : function(vw){
    var itm=vw.Items.Double;
    itm.Page.Template=itm;

    itm.Page.Slides.Title=itm.Page.Slides.createSlide("Title","CollageEditKindTitle",vw.Screen,itm.Page,itm.Page.Content,coAppUI.Alignment.Top);
    itm.Page.Slides.Title.setCaption(coLang.Table.Apps.Collage.Sample.Double.Title);
    itm.Page.Slides.Description=itm.Page.Slides.createSlide("Description","CollageEditKindDescription",vw.Screen,itm.Page,itm.Page.Content,coAppUI.Alignment.Top);
    itm.Page.Slides.Description.setCaption(coLang.Table.Apps.Collage.Sample.Double.Description);
    itm.Page.Slides.Sample=coAppUI.App.Components.Elements.Create("Elements","CollageEditKindElements",vw.Screen,itm.Page.Slides,itm.Page,itm.Page.Content,coAppUI.Alignment.Client);
    itm.Page.Slides.Sample.ReadOnly=false;
    itm.Page.Slides.Sample.Double=itm.Page.Slides.Sample.Items.Add(coAppUI.App.Components.Elements.Kind.Double);
    itm.Clear=function(){
      var itm=this;
      var elm=itm.Page.Slides.Sample.Double;
      for (var iLcv=0; iLcv<elm.subItems.length; iLcv++){
        var si=elm.subItems[iLcv];
        si.Glyphs.Clear();
      };
    };
    this.initTemplateItem(itm,itm.Page.Slides.Sample.Double);
  },
  initTripple : function(vw){
    var itm=vw.Items.Tripple;
    itm.Page.Template=itm;
    itm.Page.Slides.Title=itm.Page.Slides.createSlide("Title","CollageEditKindTitle",vw.Screen,itm.Page,itm.Page.Content,coAppUI.Alignment.Top);
    itm.Page.Slides.Title.setCaption(coLang.Table.Apps.Collage.Sample.Tripple.Title);
    itm.Page.Slides.Description=itm.Page.Slides.createSlide("Description","CollageEditKindDescription",vw.Screen,itm.Page,itm.Page.Content,coAppUI.Alignment.Top);
    itm.Page.Slides.Description.setCaption(coLang.Table.Apps.Collage.Sample.Tripple.Description);
    itm.Page.Slides.Sample=coAppUI.App.Components.Elements.Create("Elements","CollageEditKindElements",vw.Screen,itm.Page.Slides,itm.Page,itm.Page.Content,coAppUI.Alignment.Client);
    itm.Page.Slides.Sample.ReadOnly=false;
    itm.Page.Slides.Sample.Tripple=itm.Page.Slides.Sample.Items.Add(coAppUI.App.Components.Elements.Kind.Tripple);
    itm.Clear=function(){
      var itm=this;
      var elm=itm.Page.Slides.Sample.Tripple;
      for (var iLcv=0; iLcv<elm.subItems.length; iLcv++){
        var si=elm.subItems[iLcv];
        si.Glyphs.Clear();
      };
    };
    this.initTemplateItem(itm,itm.Page.Slides.Sample.Tripple);
  },
  initQuad : function(vw){
    var itm=vw.Items.Quad;
    itm.Page.Template=itm;
    itm.Page.Slides.Title=itm.Page.Slides.createSlide("Title","CollageEditKindTitle",vw.Screen,itm.Page,itm.Page.Content,coAppUI.Alignment.Top);
    itm.Page.Slides.Title.setCaption(coLang.Table.Apps.Collage.Sample.Quad.Title);
    itm.Page.Slides.Description=itm.Page.Slides.createSlide("Description","CollageEditKindDescription",vw.Screen,itm.Page,itm.Page.Content,coAppUI.Alignment.Top);
    itm.Page.Slides.Description.setCaption(coLang.Table.Apps.Collage.Sample.Quad.Description);
    itm.Page.Slides.Sample=coAppUI.App.Components.Elements.Create("Elements","CollageEditKindElements",vw.Screen,itm.Page.Slides,itm.Page,itm.Page.Content,coAppUI.Alignment.Client);
    itm.Page.Slides.Sample.ReadOnly=false;
    itm.Page.Slides.Sample.Quad=itm.Page.Slides.Sample.Items.Add(coAppUI.App.Components.Elements.Kind.Quad);
    itm.Clear=function(){
      var itm=this;
      var elm=itm.Page.Slides.Sample.Quad;
      for (var iLcv=0; iLcv<elm.subItems.length; iLcv++){
        var si=elm.subItems[iLcv];
        si.Glyphs.Clear();
      };
    };
    this.initTemplateItem(itm,itm.Page.Slides.Sample.Quad);
  }
};

