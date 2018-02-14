var ImageViewer=coVDM.App.Components.ImageViewer = {
  Version        : new Version(2014,10,22,163),
  Title          : new Title("Aurawin Image Viewer","ImageViewer"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coVDM.App,'/core/vdm/viewers/ImageViewer.js',coAppKit.PreLoaded),
  debugToConsole : true,
  imageExts    : null,
  imageOpener  : null,
  resetScaleDelay : 250,
  hideToolbarDelay : 3000,
  SlideShowInterval : 3000,
  ToolbarHeight  : 54,
  init : function(){
    var exts=this.imageExts=coList.StringArray();
    exts.Add("png");
    exts.Add("jpg");
    exts.Add("bmp");
    exts.Add("gif");
    exts.Add("svg");
    this.imageOpener=coRegistry.Items.createItem(
      exts,
      function(aItem,Folder,Files,File){
        if (aItem.Screen==null)
          aItem.Screen=ImageViewer.Create();
        aItem.Screen.Reveal();
        aItem.Screen.Open(Folder,Files,File);
        return aItem;
      }
    );
  },
  createImage  : function(Owner,Parent){
    img=coObject.Create();
    img.Class="ImageViewerImage";
    img.Size=new Position();
    img.Container=document.createElement('div');
    Parent.appendChild(img.Container);
    img.Container.className=img.Class;
    img.Container.Owner=img;
    img.Owner=Owner;
    img.Parent=Parent;
    img.pendingID=null;
    img.Loading=false;
    img.srcURL="";
    img.rotateLeftURL="";
    img.rotateRightURL="";
    img.NetworkId=0;
    img.FolderId=0;
    img.FileId=0;
    img.Thumb=null;
    img.tiThumbScroll=0;
    img.Clear=function(){
      var img=this;
      img.pendingID=null;

      img.NetworkId=0;
      img.FolderId=0;
      img.FileId=0;

      img.Thumb=null;

      img.Container.style.opacity=0;
      img.Container.style.visibility="hidden";
    };
    img.Container.ontouchend=function(e){
      if (e==undefined) e=window.event;
      coDOM.preventDefault(e);
      if (ImageViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("ImageViewer.Image.Container.ontouchstart");
      var img=this.Owner;
      var vw=img.Owner;
      if (vw.toSlideShow!=0) {
        vw.Stop();
      } else {
        vw.Next();
      };
    };
    img.Container.onmouseup=function(e){
      if (e==undefined) e=window.event;
      if (coDOM.getButton(e)!=1) return;
      coDOM.preventDefault(e);
      if (ImageViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("ImageViewer.Image.Container.onmousedown");
      var img=this.Owner;
      var vw=img.Owner;
      if (vw.toSlideShow!=0) {
        vw.Stop();
      } else {
        vw.Next();
      };
    };
    img.Loaded=function(){

    };
    img.Container.onmousemove=function(e){
      this.Owner.Owner.renewTools();
    };
    img.Container.onerror=function(){
      if (ImageViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("ImageViewer.Image.Container.onerror");
      var img=this.Owner;
      img.Loaded();
    };
    img.Container.onload=function(){
      if (ImageViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("ImageViewer.Image.Container.onload");
      var img=this.Owner;
      img.Loaded();
    };
    img.Hide=function(){
      var img=this;
      var vw=img.Owner;
      img.Container.style.opacity=0;
      img.Container.style.visibility="hidden";
    };
    img.Show=function(){
      var img=this;
      var vw=img.Owner;
      img.Container.style.visibility="visible";
      img.Container.style.opacity=1;
    };
    img.Pause=function(c){
      c.style.backgroundImage="none";
      coDOM.setBackground(
        c,
        coTheme.Apps.ImageViewer.backgroundSizeWait,
        coAppUI.Center,
        coAppUI.NoRepeat,
        coTheme.Icons.HourGlass
      );
    };
    img.Restore=function(c){
      c.style.backgroundImage=coAppUI.None;
      c.style.opacity=0;

      coDOM.clearTransition(c);
      c.style.backgroundImage=coAppUI.None;

      coDOM.setTransition(c,coTheme.Apps.ImageViewer.imageTransition);
      coDOM.setBackground(
        c,
        coAppUI.Contain,
        coAppUI.Center,
        coAppUI.NoRepeat,
        img.srcURL
      );
      c.style.opacity=1;
    };
    img.RotateLeft=function(){
      var img=this;
      var vw=img.Owner;

      var File=vw.Files.Items[vw.FileIndex];
      var sURL=vw.Files.rotateURL(File,"-90");
      img.Pause(img.Container);
      img.Pause(img.Thumb.Glyph);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', sURL, true);
      xhr.Owner=img;
      xhr.onreadystatechange=function() {
        var xhr=this;
        if (xhr.readyState==4){
          var img=xhr.Owner;
          var vw=img.Owner;
          if (xhr.status==200) {
            setTimeout(
              function(){
                img.Restore(img.Thumb.Glyph);
                img.Restore(img.Container);
              },
              coTheme.Apps.ImageViewer.backgroundRefreshDelay
            );
          } else {
            // error
          };
        };
      };
      xhr.send();
    };
    img.RotateRight=function(){
      var img=this;
      var vw=img.Owner;

      var File=vw.Files.Items[vw.FileIndex];
      var sURL=vw.Files.rotateURL(File,"90");
      img.Pause(img.Container);
      img.Pause(img.Thumb.Glyph);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', sURL, true);
      xhr.Owner=img;
      xhr.onreadystatechange=function() {
        var xhr=this;
        if (xhr.readyState==4){
          var img=xhr.Owner;
          var vw=img.Owner;
          if (xhr.status==200) {
            setTimeout(
              function(){
                img.Restore(img.Thumb.Glyph);
                img.Restore(img.Container);
              },
              coTheme.Apps.ImageViewer.backgroundRefreshDelay
            );
          } else {
            // error
          };
        };
      };
      xhr.send();
    };
    img.Download=function(){
      var img=this;
      var vw=img.Owner;
      var File=vw.Files.Items[vw.FileIndex];
      var sURL=vw.Files.getDownloadURL(File);
      coDOM.Download(sURL);
    };
    img.Get=function(sName,sURL){
      var img=this;
      var vw=img.Owner;

      img.Container.title=sName;
      if (ImageViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("ImageViewer.Image.Load ("+sURL+")");
      vw.Frame.setCaption(coLang.Table.Apps.ImageViewer.Title+coLang.Table.Apps.Seperator.Param+sName);

      var sStatus=coLang.Table.Status.Viewer.Image.Viewing;
      sStatus=sStatus.replace("$Path",vw.Folder.MAP.Path.Value);
      sStatus=sStatus.replace("$Name",sName);
      vw.setStatus(sStatus);
      img.srcURL=sURL;
      img.Container.style.backgroundImage="url("+sURL+")";
      img.Container.style.opacity=1;
      img.Container.style.visibility="visible";
    };
    img.Load=function(dbItem) {
      var img=this;
      var vw=img.Owner;
      img.Loading=true;
      img.Clear();

      if (dbItem==undefined) return;

      img.Container.title=dbItem.MAP.Name.Value;
      if (ImageViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("ImageViewer.Image.Load ("+sURL+")");

      var sURL=vw.Files.transformURL(dbItem);

      img.NetworkId=(dbItem.MAP.NetworkID)? dbItem.MAP.NetworkID.Value : 0;
      img.FolderId=dbItem.MAP.FolderID.Value;
      img.FileId=dbItem.MAP.ID.Value;

      img.Thumb=dbItem.Display.getItem(vw.Slides.FilmStrip);

      if (img.tiThumbScroll!=0) clearTimeout(img.tiThumbScroll);
      img.tiThumbScroll=setTimeout(function(){ if (img.Thumb) img.Thumb.scrollInView();},200);

      vw.FileIndex=vw.Files.Items.indexOf(dbItem);

      vw.Frame.setCaption(coLang.Table.Apps.ImageViewer.Title+coLang.Table.Apps.Seperator.Param+dbItem.MAP.Name.Value);


      var sStatus=coLang.Table.Status.Viewer.Image.Viewing;
      sStatus=sStatus.replace("$Path",vw.Folder.MAP.Path.Value);
      sStatus=sStatus.replace("$Name",dbItem.MAP.Name.Value);
      vw.setStatus(sStatus);
      if (vw.toSlideShow!=0) {
        if (ImageViewer.debugToConsole==true)
          coVDM.VDM.Console.Append("ImageViewer.Image.Loaded (setting timout for next slide)");
        clearTimeout(vw.toSlideShow);
        vw.toSlideShow=setTimeout( function (){ vw.Next(); },ImageViewer.SlideShowInterval);
      };
      img.srcURL=sURL;
      img.Container.style.backgroundImage="url("+sURL+")";
      img.Container.style.opacity=1;
      img.Container.style.visibility="visible";
    };
    img.Free=function(){
      if (ImageViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("ImageViewer.Image.Free");
      var img=this;
      if (img.Container){
        img.Parent.removeChild(img.Container);
        img.Container=null;
      };
      img=coObject.Release(img);
      return null;
    };
    coDOM.setTransition(img.Container,coTheme.Apps.ImageViewer.imageTransition);
    return img;
  },
  Create : function(){
    var vw=coAppScreens.createScreen(
      coVDM.VDM,
      "ImageViewer",
      coLang.Table.Groups.Main.Name,
      coLang.Table.Apps.ImageViewer.Name,
      coLang.Table.Apps.ImageViewer.Title,
      coTheme.Icons.Viewer.Image,
      0.5,
      0.5,
      coAppUI.Framed,
      "bdrFrame",
      "bdrImageViewer",
      "bdrFilm",
      "clientImageViewer"
    );
    vw.AllowFullScreen=true;
    vw.iconInApplications=false;
    vw.ConsealAfterCreate=false;
    vw.SaveGeometry=true;
    vw.Unit=this;
    vw.FileIndex=-1;
    vw.toolsDisabled=false;

    vw.Folder=null;
    vw.Files=null;

    vw.ContentType=null;
    vw.FileIndex=0;
    vw.toSlideShow=0;


    vw.Read=function(itmFile) {
      var vw=this;

      if (ImageViewer.debugToConsole==true) coVDM.VDM.Console.Append("ImageViewer.ImageViewer.Read");

      var iID=itmFile.MAP.ID.Value;
      var iFolderID=itmFile.MAP.FolderID.Value;

      vw.FileIndex=vw.Files.Items.indexOf(itmFile);

      var sExt=coUtils.extractFileExt(itmFile.MAP.Name.Value);
      vw.ContentType=coContentType.getContentType(sExt);
      if ((vw.ContentType==null) || (vw.ContentType.Kind!=coContentType.fkImage)) {
        if (ImageViewer.debugToConsole==true)
          coVDM.VDM.Console.Append("ImageViewer.Read ("+sExt+" not registered)");
        return;
      };

      var sStatus=coLang.Table.Status.Viewer.Image.Loading;
      sStatus=sStatus.replace("$Path",vw.Folder.MAP.Path.Value);
      sStatus=sStatus.replace("$Name",itmFile.MAP.Name.Value);
      vw.setStatus(sStatus);

      vw.Image.Load(itmFile);

      vw.renewTools();
    };
    vw.Open=function(Folder,Files,File){
      var vw=this;
      var bReloadImages=vw.Folder!=Folder;
      vw.Folder=Folder;
      vw.Files=Files;
      if (ImageViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("ImageViewer.ImageViewer.Open");
      vw.Toolbar.Show();
      if (vw.toSlideShow!=0) vw.Stop();
      if (bReloadImages==true){
        var ct=itmFile=f=null, sExt="";
        vw.Slides.FilmStrip.Frames.Clear();
        for (var iLcv=0; iLcv<Files.Items.length; iLcv++){
          itmFile=Files.Items[iLcv];
          sExt=coUtils.extractFileExt(itmFile.MAP.Name.Value);
          ct=coContentType.getContentType(sExt);
          if ( (ct!=null) && (ct.Kind==coContentType.fkImage)) {
            f=vw.Slides.FilmStrip.Frames.addItem(coAppUI.NoCaption,vw.Files.transformURL(itmFile));
            itmFile.Display.addItem(f,vw.Slides.FilmStrip);
            f.Data=itmFile;
            f.onOpen=function(f){
              f.Owner.Owner.Screen.Read(f.Data);
            };
          };
        };
      };
      vw.Read(File);
      vw.enableTools();
    };
    vw.Get=function(Folder,Name,sURL){
      var vw=this;
      vw.Folder=Folder;
      vw.setStatus(
        coLang.Table.Status.Viewer.Image.Loading,
        vw.Folder.MAP.Path.Value,
        Name
      );
      vw.disableTools();
      vw.Image.Get(Name,sURL);
    };
    vw.disableTools=function(){
      this.Slides.FilmStrip.Frames.Clear();
      this.toolsDisabled=true;
      this.Slides.FilmStrip.Conseal();
      this.Toolbar.Conseal();
    };
    vw.enableTools=function(){
      this.toolsDisabled=false;
      this.Slides.FilmStrip.Reveal();
      this.Toolbar.Reveal();
    };
    vw.hideTools=function(){
      this.Toolbar.Container.style.opacity=0;
      this.Slides.FilmStrip.Container.style.opacity=0;
    };
    vw.renewTools=function(){
      if (this.toolsDisabled==true) {
        if (ImageViewer.debugToConsole==true)
          coVDM.VDM.Console.Append("ImageViewer.ImageViewer.renewTools disabled so exiting.");
        return;
      }
      if (ImageViewer.debugToConsole==true)
        coVDM.VDM.Console.Append("ImageViewer.ImageViewer.renewTools");

      var vw=this;
      if (vw.toSlideShow==0) {
        vw.Slides.FilmStrip.Reveal();
        vw.Toolbar.Reveal();
        if (ImageViewer.debugToConsole==true)
          coVDM.VDM.Console.Append("ImageViewer.ImageViewer.renewTools (Toolbar opacity=1)");
        vw.Slides.FilmStrip.Container.style.opacity=1;
        vw.Toolbar.Container.style.opacity=1;
        vw.tmrToolbarHide.setActive(true);
      };
    };
    vw.SlideShow=function(){
      vw=this;
      vw.Slides.FilmStrip.Frames.Stop();

      vw.Toolbar.Buttons.SlideShow.Icon.style.backgroundImage="url("+coTheme.Masks.Stop+")";
      vw.toSlideShow=setTimeout(
        function (){
          vw.Frame.TitleBar.Hide();
          vw.Slides.FilmStrip.Frames.Stop();
          vw.Slides.FilmStrip.Conseal();
          vw.Toolbar.Conseal();
          vw.setSize();
          vw.Next();
        },
        ImageViewer.SlideShowInterval
      );
    };
    vw.Stop=function(){
      var vw=this;
      if (vw.toSlideShow!=0) {
        clearTimeout(vw.toSlideShow);
        vw.toSlideShow=0;
        vw.Toolbar.Buttons.SlideShow.Icon.style.backgroundImage="url("+coTheme.Masks.Start+")";
      };
      if (vw.Visible==true) {
        vw.renewTools();
        vw.Frame.TitleBar.Show();
        vw.Slides.FilmStrip.Reveal();
        vw.Toolbar.Reveal();
        vw.setSize();
      };
    };
    vw.Previous=function(){
      var vw=this;
      if (vw.toolsDisabled==true) return;
      vw.renewTools();

      var iCt=vw.Files.Items.length;
      if (iCt==0) return;
      var iLoop=0;
      var idx=iStart=vw.FileIndex;
      while (idx>-1) {
        idx-=1;
        if (idx<0){
          if (iLoop>0) return;
          idx=iCt-1;
          iLoop=1;
        };
        var itmFile=vw.Files.Items[idx];
        var sExt=coUtils.extractFileExt(itmFile.MAP.Name.Value);
        vw.ContentType=coContentType.getContentType(sExt);
        if ((vw.ContentType!=null) && (vw.ContentType.Kind==coContentType.fkImage)) {
          vw.FileIndex=idx;
          vw.Read(itmFile);
          return;
        };
      };
    };
    vw.getNextFile=function(Index,setIndex){
      if (setIndex==undefined) setIndex=false;
      var vw=this;
      var iCt=vw.Files.Items.length;

      if (iCt==0) return null;
      var iLoop=0;

      var idx=Index;
      while (idx>-1) {
        idx+=1;
        if (idx>iCt-1){
          if (iLoop>0) return null;
          idx=0;
          iLoop=1;
        };
        var itmFile=vw.Files.Items[idx];
        var sExt=coUtils.extractFileExt(itmFile.MAP.Name.Value);
        vw.ContentType=coContentType.getContentType(sExt);
        if ((vw.ContentType!=null) && (vw.ContentType.Kind==coContentType.fkImage)) {
          if (setIndex==true) vw.FileIndex=idx;
          return itmFile;
        };
      };
    };
    vw.Next=function(){
      var vw=this;
      if (vw.toolsDisabled==true) return;
      vw.renewTools();
      var itmFile=vw.getNextFile(vw.FileIndex,true);
      if (itmFile) {
        vw.Read(itmFile);
      };
    };
    vw.onHide=function(){
      this.setIdle();
    };
    vw.setIdle=function(){
      this.Folder=null;
      this.Files=null;
      this.FileIndex=0;
      this.Frame.setCaption(coLang.Table.Apps.ImageViewer.Name);
      this.setStatus(coLang.Table.Status.Viewer.Image.Idle);
      this.Slides.FilmStrip.Frames.Clear();
      this.Image.Clear();
      this.Stop();
    };
    vw.onResize=function(){
      if (this.Image.Thumb) this.Image.Thumb.scrollInView();
    };
    vw.Description=coLang.Table.Apps.ImageViewer.Description;

    vw.tmrToolbarHide=coApp.Timers.createItem(ImageViewer.hideToolbarDelay);
    vw.tmrToolbarHide.RunOnce=true;
    vw.tmrToolbarHide.Owner=vw;
    vw.tmrToolbarHide.onExecute=function(tmr){
      var vw=tmr.Owner;
      vw.hideTools();
    };
    var tb=vw.Toolbar=coAppUI.App.Components.Toolbar.Create(
      "imageToolbar",
      "imageToolbar",
      vw,
      vw.Slides,
      vw.Frame,
      vw.Frame.Client,
      coAppUI.Alignment.Default
    );
    tb.Container.className="imageToolbar imageToolbarGradient";
    tb.setBounds(" "," ","3px","3px");
    tb.Mode.setValue(tb.Mode.captionNone);
    tb.setHeights(ImageViewer.ToolbarHeight,ImageViewer.ToolbarHeight);
    tb.Container.onmousemove=function(e){
      this.Owner.Screen.renewTools();
    };
    coDOM.setTransition(tb.Container,coTheme.Apps.ImageViewer.toolbarTransition);

    tb.Buttons.Previous=tb.createButton(coLang.Table.Buttons.Previous,coTheme.Masks.Previous);
    tb.Buttons.Previous.View=vw;
    tb.Buttons.Previous.onClick=function(btn){
      var vw=btn.View;
      vw.Previous();
    };
    tb.Buttons.SlideShow=tb.createButton(coLang.Table.Buttons.SlideShow,coTheme.Masks.Start);
    tb.Buttons.SlideShow.View=vw;
    tb.Buttons.SlideShow.onClick=function(btn){
      var vw=btn.View;
      if (vw.toSlideShow==0) {
        vw.SlideShow();
      } else{
        vw.Stop();
      };
    };
    tb.Buttons.Next=tb.createButton(coLang.Table.Buttons.Next,coTheme.Masks.Next);
    tb.Buttons.Next.View=vw;
    tb.Buttons.Next.onClick=function(btn){
      var vw=btn.View;
      vw.Next();
    };
    tb.Buttons.Sep1=tb.createSeperator();
    tb.Buttons.RotateLeft=tb.createButton(coLang.Table.Buttons.Rotate,coTheme.Masks.Rotate.Left);
    tb.Buttons.RotateLeft.View=vw;
    tb.Buttons.RotateLeft.onClick=function(btn){
      btn.View.Image.RotateLeft();
    };
    tb.Buttons.RotateRight=tb.createButton(coLang.Table.Buttons.Rotate,coTheme.Masks.Rotate.Right);
    tb.Buttons.RotateRight.View=vw;
    tb.Buttons.RotateRight.onClick=function(btn){
      btn.View.Image.RotateRight();
    };

    tb.Buttons.Sep2=tb.createSeperator();

    tb.Buttons.Download=tb.createButton(coLang.Table.Buttons.Download,coTheme.Masks.Download);
    tb.Buttons.Download.View=vw;
    tb.Buttons.Download.onClick=function(btn){
      btn.View.Image.Download();
    };


    tb.Buttons.Print=tb.createButton(coLang.Table.Buttons.Print,coTheme.Masks.Print);
    tb.Buttons.Print.View=vw;
    tb.Buttons.Print.onClick=function(btn){
      coDOM.PrintImage(btn.View.Image.Container.title,btn.View.Image.srcURL);
    };

    vw.Slides.FilmStrip=coAppUI.App.Components.FilmStrip.Create("FilmStrip","ViewerFilmStrip", vw,vw.Slides,vw.Frame,vw.Frame.Client,coAppUI.Alignment.Default);
    vw.Slides.FilmStrip.urlSlideBackground=coAppUI.NoURL;
    vw.Slides.FilmStrip.setHeight(100);
    vw.Slides.FilmStrip.Aspect.InnerSpacing=coTheme.Apps.ImageViewer.innerSpacing;
    vw.Slides.FilmStrip.onScroll=function(){
      this.Screen.renewTools();
    };
    vw.Slides.FilmStrip.Container.onmousemove=function(e){
      this.Owner.Screen.renewTools();
    };
    vw.Image=this.createImage(vw,vw.Frame.Client);
    coDOM.setBackgroundColor(vw.Frame.Client,coTheme.Apps.ImageViewer.backgroundColor);
    return vw;
  }
};
coVDM.App.Components.ImageViewer.init();
