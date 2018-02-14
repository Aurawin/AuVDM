coCollageBoard.App.Components.Editor = {
  Version        : new Version(2013,12,1,45),
  Title          : new Title("Collage Board Editor","Editor"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coCollageBoard.App,'/core/collages/Editor.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create : function(sc){
    var edt=sc.Slides.createSlide("Editor","sldCollageEditor",sc,sc.Frame,sc.Frame.Client,coAppUI.Alignment.Client);
    edt.clearContainerClass();
    edt.DataSet=null;
    edt.Switcher=coAppUI.App.Components.MultiView.Create("Switcher","sldClient",sc,edt.Slides,edt,edt.Container,coAppUI.Alignment.Default);
    edt.Switcher.setTransparent(true);
    edt.Switcher.Nav.Menu.Conseal();
    edt.Switcher.Views=coObject.Create("Views");
    edt.Switcher.Views.Owner=edt.Switcher;

    edt.Switcher.Views.Kind=this.createKindView(edt);
    edt.Switcher.Views.Details=this.createDetailsView(edt);

    edt.Commit=function(){
      var edt=this;
      var ds=edt.DataSet;
      var imgs=ds.MAP.Glyphs.Value;
      var Details=edt.Switcher.Views.Details;
      var Collage=Details.Slides.Collage;
      imgs.Clear();

      ds.MAP.Kind.Value=Math.max(Collage.Items[0].subItems.length-1,0);
      ds.MAP.Title.Value=Details.Slides.Title.Text.getCaption();
      ds.MAP.Description.Value=Details.Slides.Description.RichEdit.getHTML();
      switch (ds.MAP.Kind.Value){
        case (0) : {
          ds.MAP.Type.Value=coLang.Table.Labels.Single;
          break;
        };
        case (1) : {
          ds.MAP.Type.Value=coLang.Table.Labels.Double;
          break;
        };
        case (2) : {
          ds.MAP.Type.Value=coLang.Table.Labels.Tripple;
          break;
        };
        case (3) : {
          ds.MAP.Type.Value=coLang.Table.Labels.Quadruple;
          break;
        };
      };
      for (var iLcv=0; iLcv<Collage.Items.length; iLcv++){
        var elm=Collage.Items[iLcv];
        for (var jLcv=0; jLcv<elm.subItems.length; jLcv++){
          var si=elm.subItems[jLcv];
          for (var gLcv=0; gLcv<si.Glyphs.length; gLcv++){
            var g=si.Glyphs[gLcv];
            var img=imgs.addItem();
            img.MAP.FolderID.Value=g.FolderID;
            img.MAP.FileID.Value=g.FileID;
            img.MAP.NetworkID.Value=g.NetworkID;
            img.MAP.Element.Value=iLcv;
            img.MAP.SubItem.Value=jLcv;
            img.MAP.MoveX.Value=(g.MoveX) ? g.MoveX : 0;
            img.MAP.MoveY.Value=(g.MoveY) ? g.MoveY : 0;
            img.MAP.Rotate.Value=(g.Rotate) ? g.Rotate : 0;
            img.MAP.ScaleX.Value=(g.ScaleX) ? g.ScaleX: 0;
            img.MAP.ScaleY.Value=(g.ScaleY) ? g.ScaleY: 0;
          };
        };
      };
      ds.MAP.Images.Value=ds.MAP.Glyphs.Value.Items.length;
    };
    edt.Clear=function(){
      var edt=this;
      edt.DataSet=null;
      var dets=edt.Switcher.Views.Details;
      var elms=dets.Slides.Collage;
      elms.Items.Stop();

      var knd=edt.Switcher.Views.Kind;

      knd.Items.Single.Clear();
      knd.Items.Double.Clear();
      knd.Items.Tripple.Clear();
      knd.Items.Quad.Clear();

      elms.Items.Clear();

      dets.Slides.Title.Text.Clear();
      dets.Slides.Description.RichEdit.Clear();
    };
    edt.Load=function(dbItem){
      var edt=this;
      var dets=edt.Switcher.Views.Details;
      var ds=edt.DataSet=dbItem;
      var imgs=ds.MAP.Glyphs.Value;
      var elms=edt.Switcher.Views.Details.Slides.Collage;
      elms.Items.Clear();
      edt.Reveal();
      edt.Switcher.Views.Kind.Conseal();
      edt.Switcher.Reveal();
      edt.Switcher.Nav.forceSelected(edt.Switcher.Nav.gpEditDetails);
      var elm=elms.Items.Add(ds.MAP.Kind.Value);
      coCollageBoard.App.Components.edtViews.initEditorElement(elm);
      dets.Slides.Location.Text.Show();
      dets.Slides.Location.Text.setCaption(ds.Collection.getURL(ds));
      dets.Slides.Title.Text.setCaption(ds.MAP.Title.Value);
      dets.Slides.Description.RichEdit.setHTML(ds.MAP.Description.Value);
      for (var iLcv=0; iLcv<imgs.Items.length; iLcv++){
        var img=imgs.Items[iLcv];
        var sURL=(img.MAP.NetworkID.Value!=0) ? coSocial.URI_FILE_PALMPRINT : coVDM.URI_FILE_PALMPRINT;
        sURL=sURL.replace("$nid",img.MAP.NetworkID.Value).replace("$fid",img.MAP.FolderID.Value).replace("$id",img.MAP.FileID.Value);
        var si=elm.subItems[img.MAP.SubItem.Value];
        if (si){
          var g=si.addGlyph(sURL,"");
          g.Delay=ds.MAP.Delay.Value;
          g.FolderID=img.MAP.FolderID.Value;
          g.FileID=img.MAP.FileID.Value;
          g.NetworkID=img.MAP.NetworkID.Value;
          g.MoveX=(img.MAP.MoveX.Value==0)? null : img.MAP.MoveX.Value;
          g.MoveY=(img.MAP.MoveY.Value==0)? null : img.MAP.MoveY.Value;
          g.Rotate=(img.MAP.Rotate.Value==0)? null : img.MAP.Rotate.Value;
          g.ScaleX=(img.MAP.ScaleX.Value==0)? null : img.MAP.ScaleX.Value;
          g.ScaleY=(img.MAP.ScaleY.Value==0)? null : img.MAP.ScaleY.Value;
        };
      };
      edt.setSize();
      elms.Items.Start();
    };

    coCollageBoard.App.Components.Nav.initEditor(edt);

    return edt;
  },
  createKindView:function(edt){
    var sw=edt.Switcher;
    vw=coAppUI.App.Components.ShowCase.Create("Kinds","scCollageKinds",edt.Screen,sw.Slides,sw,sw.Container,coAppUI.Alignment.Client);
    vw.Hidden=true;
    vw.PageItemPosition=coAppUI.Absolute;
    vw.PageClientPosition=coAppUI.Absolute;
    vw.PageContentPosition=coAppUI.Absolute;

    vw.Items.Single=vw.Items.addItem();
    coCollageBoard.App.Components.edtViews.initSingle(vw);
    vw.Selected=vw.Items.Single.Page.Slides.Sample;
    vw.Items.Double=vw.Items.addItem();
    coCollageBoard.App.Components.edtViews.initDouble(vw);
    vw.Items.Tripple=vw.Items.addItem();
    coCollageBoard.App.Components.edtViews.initTripple(vw);
    vw.Items.Quad=vw.Items.addItem();
    coCollageBoard.App.Components.edtViews.initQuad(vw);
    vw.onSelectItem=function(itm){
      var vw=this;
      switch (itm){
        case (vw.Items.Single): {
          vw.Selected=vw.Items.Single.Page.Slides.Sample;
          vw.Items.Double.Page.Slides.Sample.Items.Stop();
          vw.Items.Tripple.Page.Slides.Sample.Items.Stop();
          vw.Items.Quad.Page.Slides.Sample.Items.Stop();
          vw.Items.Single.Page.Slides.Sample.Items.Start();
          break;
        };
        case (vw.Items.Double): {
          vw.Selected=vw.Items.Double.Page.Slides.Sample;
          vw.Items.Single.Page.Slides.Sample.Items.Stop();
          vw.Items.Tripple.Page.Slides.Sample.Items.Stop();
          vw.Items.Quad.Page.Slides.Sample.Items.Stop();
          vw.Items.Double.Page.Slides.Sample.Items.Start();
          break;
        };
        case (vw.Items.Tripple): {
          vw.Selected=vw.Items.Tripple.Page.Slides.Sample;
          vw.Items.Single.Page.Slides.Sample.Items.Stop();
          vw.Items.Double.Page.Slides.Sample.Items.Stop();
          vw.Items.Quad.Page.Slides.Sample.Items.Stop();
          vw.Items.Tripple.Page.Slides.Sample.Items.Start();
          break;
        };
        case (vw.Items.Quad): {
          vw.Selected=vw.Items.Quad.Page.Slides.Sample;
          vw.Items.Single.Page.Slides.Sample.Items.Stop();
          vw.Items.Double.Page.Slides.Sample.Items.Stop();
          vw.Items.Tripple.Page.Slides.Sample.Items.Stop();
          vw.Items.Quad.Page.Slides.Sample.Items.Start();
          break;
        };
      };
    };

    return vw;
  },
  createDetailsView:function(edt){
    var sw=edt.Switcher;
    var vw=sw.Slides.createSlide("sldDetails","CollageEditDetails",sw.Screen,sw,sw.Container,coAppUI.Alignment.Client);
    vw.Hidden=true;
    vw.clearContainerClass();

    vw.Slides.Location=vw.Slides.createSlide("sldLocation",vw.Class+"Location",edt.Screen,vw,vw.Container,coAppUI.Alignment.Default);
    vw.Slides.Location.zIndex=2;
    vw.Slides.Location.View=vw;
    vw.Slides.Location.setTransparent(true);
    vw.Slides.Location.Label=coAppUI.App.Components.Label.Create(
      vw.Slides.Location,
      vw.Slides.Location.Container,
      "txtLocationLabel",
      vw.Class+"lblLocation",
      coLang.Table.Labels.Location
    );
    vw.Slides.Location.Label.Visible=true;
    vw.Slides.Location.Label.Placement.Mode.setTopLeft();
    vw.Slides.Location.Label.Placement.Top=7;
    vw.Slides.Location.Label.Placement.Left=12;

    vw.Slides.Location.Text=coAppUI.App.Components.Text.Create(
      vw.Slides.Location,
      vw.Slides.Location.Container,
      "txtLocation",
      vw.Class+"txtLocation",
      coLang.Table.Apps.Collage.Edit.Location,
      coLang.Table.Apps.Collage.Edit.LocationHint
    );
    vw.Slides.Location.Text.Visible=true;
    vw.Slides.Location.Text.Placement.Mode.setFull();
    vw.Slides.Location.Text.Placement.Top=5;
    vw.Slides.Location.Text.Placement.Left=90;
    vw.Slides.Location.Text.Placement.Right=5;
    vw.Slides.Location.Text.Placement.Bottom=5;
    vw.Slides.Location.Text.setReadOnly(true);
    vw.Slides.Location.Conseal();

    vw.Slides.Title=vw.Slides.createSlide("sldTitle",vw.Class+"Title",edt.Screen,vw,vw.Container,coAppUI.Alignment.Top);
    vw.Slides.Title.View=vw;
    vw.Slides.Title.setTransparent(true);
    vw.Slides.Title.Text=coAppUI.App.Components.Text.Create(
      vw.Slides.Title,
      vw.Slides.Title.Container,
      "txtTitle",
      vw.Class+"txtTitle",
      coLang.Table.Apps.Collage.Edit.Title,
      coLang.Table.Apps.Collage.Edit.TitleHint
    );
    vw.Slides.Title.Text.Visible=true;
    vw.Slides.Title.Text.Placement.Mode.setFull();
    vw.Slides.Title.Text.Placement.Top=5;
    vw.Slides.Title.Text.Placement.Left=5;
    vw.Slides.Title.Text.Placement.Right=5;
    vw.Slides.Title.Text.Placement.Bottom=5;

    vw.Slides.Title.Text.onNext=function(){
      var vw=this.Owner.View;
      vw.Slides.Description.Memo.Focus();
    };
    vw.Slides.Collage=coAppUI.App.Components.Elements.Create("elsCollage",vw.Class+"Collage",edt.Screen,vw.Slides,vw,vw.Container,coAppUI.Alignment.Client);
    coCollageBoard.App.Components.edtViews.initElementsForPublisher(vw.Slides.Collage);

    vw.Slides.Description=vw.Slides.createSlide("sldDescription","CollageEditDetailsDescription",edt.Screen,vw,vw.Container,coAppUI.Alignment.Bottom);
    vw.Slides.Description.View=vw;
    vw.Slides.Description.setTransparent(true);
    var re=vw.Slides.Description.RichEdit=coAppUI.App.Components.RichEdit.Create(
      vw.Slides.Description,
      vw.Slides.Description.Container,
      "txtDescription",
      vw.Class+"txtDescription",
      coLang.Table.Apps.Collage.Edit.Description,
      coLang.Table.Apps.Collage.Edit.DescriptionHint
    );
    re.Visible=true;
    re.Placement.Mode.setFull();
    re.Placement.Top=5;
    re.Placement.Left=5;
    re.Placement.Right=27;
    re.Placement.Bottom=27;
    re.Redactor.wprMargin.Top=0;
    re.Redactor.wprMargin.Left=4;
    re.Redactor.wprMargin.Right=4;
    re.Redactor.wprMargin.Bottom=4;

    coTheme.Apps.Collages.Editor.Apply(re);

    vw.Conseal();


    return vw;
  }
};
