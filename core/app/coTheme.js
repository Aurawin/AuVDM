var coTheme= {
  Version        : new Version(2014,11,8,114),
  Title          : new Title("Core Object Theme Table","coTheme"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2011-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/app/coTheme.js',coAppKit.PreLoaded),
  NoImageUrl     : "",
  Icons          : new Object(),
  UI             : new Object(),
  Scenes         : new Object(),
  People         : new Object(),
  CSS            : null,
  init           : function(){
    var tbl=this;
    this.CSS=this.createCSS();

    var sScenes="/images/scenes/";
    var sTourist="/images/tourist/";
    var sPeople="/images/ppl/";
    var sVDM="/core/vdm/imgs/";
    var sSlides=sVDM+"slds/";
    var sIcons=sVDM+"icns/";
    var sApps=sVDM+"apps/";
    var sMasks=sVDM+"msks/";
    var sSpec="/core/spc/imgs/";
    var sEml=sSpec+"eml/";
    var sBtns=sVDM+"btns/";
    var sTour=sVDM+"tour/";
    var sArrows=sIcons+"arw/";
    var sVideo=sIcons+"video/";
    var sComp=sIcons+"comp/";
    var sPins=sVDM+"pins/";

    tbl.Icons=new Object();

    tbl.Icons.Acorn=sIcons+"acrn.png";
    tbl.Icons.Add=new Object();
    tbl.Icons.Add.Black=sIcons+"Add/black.png";
    tbl.Icons.Add.Blue=sIcons+"Add/blue.png";
    tbl.Icons.Delete=new Object();
    tbl.Icons.Delete.Black=sIcons+"Delete/black.png";
    tbl.Icons.Delete.Blue=sIcons+"Delete/blue.png";
    tbl.Icons.Junk=new Object();
    tbl.Icons.Junk.Black=sIcons+"Junk/black.png";
    tbl.Icons.Junk.Blue=sIcons+"Junk/blue.png";

    tbl.Icons.Apps=sApps+"apps.png";

    tbl.Icons.Arrow=new Object();
    tbl.Icons.Arrow.Black=new Object();
    tbl.Icons.Arrow.Black.Down=sArrows+"blk/d.png";
    tbl.Icons.Arrow.Black.Right=sArrows+"blk/r.png";
    tbl.Icons.Arrow.Black.FullDown=sArrows+"blk/fdwn.png";
    tbl.Icons.Arrow.Black.FullLeft=sArrows+"blk/flft.png";
    tbl.Icons.Arrow.Black.FullLeftDouble=sArrows+"blk/fldb.png";
    tbl.Icons.Arrow.Black.FullRight=sArrows+"blk/frht.png";
    tbl.Icons.Arrow.Black.FullRightDouble=sArrows+"blk/frdb.png";
    tbl.Icons.Arrow.Black.FullUp=sArrows+"blk/fup.png";

    tbl.Icons.Arrow.Blue=new Object();
    tbl.Icons.Arrow.Blue.Down=sArrows+"blu/d.png";
    tbl.Icons.Arrow.Blue.Right=sArrows+"blu/r.png";
    tbl.Icons.Arrow.Blue.FullDown=sArrows+"blu/fdwn.png";
    tbl.Icons.Arrow.Blue.FullLeft=sArrows+"blu/flft.png";
    tbl.Icons.Arrow.Blue.FullLeftDouble=sArrows+"blu/fldb.png";
    tbl.Icons.Arrow.Blue.FullRight=sArrows+"blu/frht.png";
    tbl.Icons.Arrow.Blue.FullRightDouble=sArrows+"blu/frdb.png";
    tbl.Icons.Arrow.Blue.FullUp=sArrows+"blu/fup.png";


    tbl.Icons.BusinessMan=sIcons+"entpsn.png";
    tbl.Icons.Docs=new Object();
    tbl.Icons.Docs.Main=sApps+"docs.png";
    tbl.Icons.Logo=new Object();
    tbl.Icons.Associated=new Object();
    tbl.Icons.Associated.getIcon=function(FileName){
      var sIco="";
      var sGrph=sIcons+"grph/";
      var sAudio=sIcons+"audio/";
      var sWeb=sIcons+"web/";

      var ext=coUtils.extractFileExt(FileName).toLowerCase();
      switch (ext) {
        // Text Files
        case ("log")  : sIco=sIcons+"txt1.png"; break;
        case ("txt")  : sIco=sIcons+"txt1.png"; break;
        case ("doc")  :
        case ("docx") : sIco=sIcons+"doc1.png"; break;
        case ("pdf")  : sIco=sIcons+"pdf.png"; break;
        // Graphic Files
        case ("bmp") : sIco=sGrph+"bmp.png"; break;
        case ("cdr") : sIco=sGrph+"cdr.png"; break;
        case ("eps") : sIco=sGrph+"eps.png"; break;
        case ("gif") : sIco=sGrph+"gif.png"; break;
        case ("jpg") : sIco=sGrph+"jpg.png"; break;
        case ("png") : sIco=sGrph+"png.png"; break;
        case ("psd") : sIco=sGrph+"psd.png"; break;
        case ("psp") : sIco=sGrph+"psp.png"; break;
        case ("svg") : sIco=sGrph+"svg.png"; break;
        case ("tga") : sIco=sGrph+"tga.png"; break;
        case ("tif") : sIco=sGrph+"tif.png"; break;
        // Audio Files
        case ("al")  : sIco=sAudio+"al.png"; break;
        case ("mid") : sIco=sAudio+"mid.png"; break;
        case ("ogg") : sIco=sAudio+"ogg.png"; break;
        case ("mp3") : sIco=sAudio+"mp3.png"; break;
        case ("wma") : sIco=sAudio+"wma.png"; break;
        case ("cda") : sIco=sAudio+"cda.png"; break;
        case ("acc") : sIco=sAudio+"acc.png"; break;
        case ("wav") : sIco=sAudio+"wav.png"; break;
        // Compression Files
        case ("zip") : sIco=sComp+"zip.png"; break;
        case ("rar") : sIco=sComp+"rar.png"; break;
        case ("tar") : sIco=sComp+"tar.png"; break;
        case ("gz") : sIco=sComp+"gz.png"; break;
        case ("cab") : sIco=sComp+"cab.png"; break;
        case ("ace") : sIco=sComp+"ace.png"; break;
        case ("7z")  : sIco=sComp+"7z.png"; break;
        case ("sit") : sIco=sComp+"sit.png"; break;
        // Web Files
        case ("asp") : sIco=sWeb+"asp.png"; break;
        case ("css") : sIco=sWeb+"css.png"; break;
        case ("fla") : sIco=sWeb+"fla.png"; break;
        case ("htm") : sIco=sWeb+"htm.png"; break;
        case ("html") : sIco=sWeb+"html.png"; break;
        case ("php") : sIco=sWeb+"php.png"; break;
        case ("xml") : sIco=sWeb+"xml.png"; break;
        // Video Files
        case ("asf") : sIco=sVideo+"asf.png"; break;
        case ("avi") : sIco=sVideo+"avi.png"; break;
        case ("divx") : sIco=sVideo+"divx.png"; break;
        case ("mov") : sIco=sVideo+"mov.png"; break;
        case ("mp4") : sIco=sVideo+"mp4.png"; break;
        case ("mpg") : sIco=sVideo+"mpg.png"; break;
        case ("ogm") : sIco=sVideo+"ogm.png"; break;
        case ("wmv") : sIco=sVideo+"wmv.png"; break;
        case ("xvid") : sIco=sVideo+"xvid.png"; break;

        default:
          sIco=sIcons+"blank.png";
      };
      return sIco;
    };
    tbl.People.Wide=new Object();
    tbl.People.Wide.Freedom=sPeople+"wide/freedom.jpg";
    tbl.People.Wide.Friends=sPeople+"wide/friends.jpg";
    tbl.People.Wide.Loved=sPeople+"wide/loved.jpg";

    tbl.People.Wide.Skiing=new Object();
    tbl.People.Wide.Skiing.Poles=sPeople+"wide/skiing/11161387.jpg";
    tbl.People.Wide.Skiing.LegUp=sPeople+"wide/skiing/11920069.jpg";
    tbl.People.Wide.Skiing.CrossCountry=sPeople+"wide/skiing/14790299.jpg";

    tbl.People.Wide.Biking=new Object();
    tbl.People.Wide.Biking.Couple=sPeople+"wide/biking/9654684.jpg";
    tbl.People.Wide.Biking.Family=sPeople+"wide/biking/13805318.jpg";

    tbl.People.Square=new Object();

    tbl.People.Square.Biking=new Object();
    tbl.People.Square.Biking.Beach=sPeople+"square/cplbike.jpg";
    tbl.People.Square.Biking.Girl=sPeople+"square/gbike.jpg";
    tbl.People.Square.Biking.Street=sPeople+"square/srtbike.jpg";
    tbl.People.Square.Biking.Woman=sPeople+"square/biking/4044653.jpg";

    tbl.People.Square.Birthday=new Object();
    tbl.People.Square.Birthday.Boy=sPeople+"square/bboy.jpg";

    tbl.People.Square.Camping=new Object();
    tbl.People.Square.Camping.Tent=sPeople+"square/6413698.jpg";


    tbl.People.Square.Family=new Object();
    tbl.People.Square.Family.Aunt=sPeople+"square/gaunt.jpg";
    tbl.People.Square.Family.Wedding=sPeople+"square/wed.jpg";
    tbl.People.Square.Family.Sledding=sPeople+"sledding.jpg";


    tbl.People.Square.Skiing=new Object();
    tbl.People.Square.Skiing.Trail=sPeople+"square/skiing/387728.jpg";
    tbl.People.Square.Skiing.Boarder=sPeople+"square/skiing/12405920.jpg";
    tbl.People.Square.Skiing.Braking=sPeople+"square/skiing/15072915.jpg";
    tbl.People.Square.Skiing.DogWalk=sPeople+"square/skiing/16385825.jpg";
    tbl.People.Square.Skiing.Road=sPeople+"square/skiing/16385915.jpg";
    tbl.People.Square.Skiing.Family=sPeople+"square/skiing/13757377.jpg";

    tbl.Tourist=new Object();
    tbl.Tourist.Square=new Object();
    tbl.Tourist.Square.SaintBasil=sTourist+"square/12368970.jpg";
    tbl.Tourist.Square.Eiffel=sTourist+"square/13482056.jpg";
    tbl.Tourist.Square.MonumentToDiscoveries=sTourist+"square/6198592.jpg";

    tbl.Tourist.Wide=new Object();
    tbl.Tourist.Wide.Caribbean=sTourist+"wide/1151956.jpg";
    tbl.Tourist.Wide.GrandCanyon=sTourist+"wide/3019893.jpg";
    tbl.Tourist.Wide.IgauzuFalls=sTourist+"wide/8152542.jpg";
    tbl.Tourist.Wide.BrandenburgGate=sTourist+"wide/14795474.jpg";

    tbl.Slides=new Object();
    tbl.Slides.Black=new Object();
    tbl.Slides.Black.Leather=sSlides+"emb.jpg";
    tbl.Slides.Black.Pavement=sSlides+"pvmt.jpg";
    tbl.Slides.Black.Fabric=sSlides+"bfbrc.jpg";
    tbl.Slides.Black.Rough=sSlides+"rough.png";


    tbl.Scenes.Monuments=new Object();
    tbl.Scenes.Monuments.Discoveries=sScenes+"13823355.jpg";

    tbl.Scenes.Road=new Object();
    tbl.Scenes.Road.Dirt=sScenes+"droad.jpg";
    tbl.Scenes.Road.Paved=sScenes+"road.jpg";


    tbl.Icons.None="";

    tbl.Icons.Logo.Aurawin="/images/logo/dark/au.png";
    tbl.Icons.Logo.Top="/images/logo/dark/tp.png";
    tbl.Icons.Logo.Bottom="/images/logo/dark/btm.png";
    tbl.Icons.Logo.Dark=new Object();
    tbl.Icons.Logo.Dark.Cloud="/images/logo/dark/lgo.png";
    tbl.Icons.Logo.Table=sIcons+"/lgo.png";

    tbl.Icons.Buttons=new Object();
    tbl.Icons.Buttons.Next=sBtns+"next.png";
    tbl.Icons.Buttons.Previous=sBtns+"prev.png";
    tbl.Icons.Buttons.Slide=sBtns+"slide.png";
    tbl.Icons.Buttons.Stop=sBtns+"stop.png";
    tbl.Icons.Buttons.Back=sBtns+"back.png";
    tbl.Icons.Buttons.Forward=sBtns+"fwd.png";
    tbl.Icons.CMS=new Object();
    tbl.Icons.CMS.Suite=sApps+"cms.png";
    tbl.Icons.CMS.FileManager=sApps+"cmsfmn.png";

    tbl.Icons.Viewer=new Object();
    tbl.Icons.Viewer.Image=sApps+"imgvwr.png";


    tbl.Icons.Collage=new Object();
    tbl.Icons.Collage.Main=sIcons+"cboard.jpg";
    tbl.Icons.Crash=sIcons+"crash.png";
    tbl.Icons.CheckMark=sIcons+"check.png";
    tbl.Icons.Column=sIcons+"col.png";
    tbl.Icons.Computer=new Object();
    tbl.Icons.Computer.Server=sComp+"srvr.png";
    tbl.Icons.Computer.Laptop=sComp+"lptp.png";
    tbl.Icons.Database=sIcons+"db.png";
    tbl.Icons.Downloads=new Object();
    tbl.Icons.Downloads.Aurawin=sIcons+"audls.png";
    tbl.Icons.Download=new Object();
    tbl.Icons.Download.File=sSpec+"fldl.png";
    tbl.Icons.Devices=new Object();
    tbl.Icons.Devices.Cloud=sIcons+"rcs.png";
    tbl.Icons.Devices.Connected=sIcons+"inet.png";
    tbl.Icons.Documents=new Object();
    tbl.Icons.Documents.New=sIcons+"ndoc.png";
    tbl.Icons.Error=sIcons+"error.png";

    tbl.Icons.Files=new Object();
    tbl.Icons.Files.Blank=sIcons+"blank2.png";
    tbl.Icons.Mailbox=new Object();
    tbl.Icons.Mailbox.Full=sIcons+"mb/mbf.png";
    tbl.Icons.Mailbox.Empty=sIcons+"mb/mbe.png";

    tbl.Icons.Find=sIcons+"find.png";

    tbl.Icons.Framework=sIcons+"fw.png";
    tbl.Icons.Gears=new Object();
    tbl.Icons.Gears.Single=sIcons+"gr1.png";
    tbl.Icons.Gears.Double=sIcons+"grs2.png";
    tbl.Icons.Gears.Tripple=sIcons+"grs3.png";
    tbl.Icons.Save=sIcons+"save.png";
    tbl.Icons.Seal=sIcons+"seal.png";
    tbl.Icons.Scenes=sIcons+"scns.png";
    tbl.Icons.Tiles=sIcons+"tls.png";

    tbl.Icons.Text=new Object();
    tbl.Icons.Text.File=sIcons+"txt.png";


    tbl.Icons.HourGlass=sIcons+"hglass.png";


    tbl.Icons.Pin=new Object();
    tbl.Icons.Pin.Green=sPins+"grn.png";
    tbl.Icons.Pin.Gray=sPins+"gry.png";

    tbl.Icons.Upload=new Object();
    tbl.Icons.Upload.File=sSpec+"flul.png";
    tbl.Icons.Video=new Object();
    tbl.Icons.Video.Convert=sVideo+"vcon.png";

    tbl.Masks=new Object();
    tbl.Masks.Download=sMasks+"dl.png";
    tbl.Masks.Next=sMasks+"next.png";
    tbl.Masks.Previous=sMasks+"prev.png";
    tbl.Masks.Start=sMasks+"start.png";
    tbl.Masks.Stop=sMasks+"stop.png";
    tbl.Masks.Pause=sMasks+"pause.png";
    tbl.Masks.Film=sMasks+"strip.png";
    tbl.Masks.Print=sMasks+"print.png";
    tbl.Masks.Rotate=new Object();
    tbl.Masks.Rotate.Left=sMasks+"rtl.png";
    tbl.Masks.Rotate.Right=sMasks+"rtr.png";
    tbl.Masks.None="";


    tbl.Icons.Policies=new Object();
    tbl.Icons.Policies.Main=sApps+"policy.png";
    tbl.Icons.Puzzle=sIcons+"puz.png";

    tbl.Icons.Tour=new Object();
    tbl.Icons.Tour.Main=sIcons+"scrn.png";
    tbl.Icons.Tour.Devices=sTour+"devs.png";
    tbl.Icons.Lock=sIcons+"lock.png";
    tbl.Icons.Music=new Object();
    tbl.Icons.Music.Main=sIcons+"music.png";
    tbl.Icons.Music.Play=sIcons+"play.png";
    tbl.Icons.Music.Stop=sIcons+"stop.png";
    tbl.Icons.Music.Error=sIcons+"error.png";
    tbl.Icons.Music.Repeat=sIcons+"repeat.png";


    tbl.Icons.Social=new Object();
    tbl.Icons.Social.Main=sIcons+"soc.png";

    tbl.Icons.Spectrum=new Object();
    tbl.Icons.Spectrum.Contacts=new Object();
    tbl.Icons.Spectrum.Contacts.Book=sSpec+"addr.png";
    tbl.Icons.Spectrum.Mail=new Object();

    tbl.Icons.Spectrum.Mail.Attach=sSpec+"ppc.png";
    tbl.Icons.Spectrum.Mail.Inbox=new Object();
    tbl.Icons.Spectrum.Mail.Inbox.Full=sEml+"ibf.png";
    tbl.Icons.Spectrum.Mail.Inbox.Empty=sEml+"ibe.png";
    tbl.Icons.Spectrum.Mail.Inbox.get=function(UnRead){
      return (UnRead==true)? this.Full : this.Empty;
    }

    tbl.Icons.Spectrum.Mail.Compose=sEml+"new.png";
    tbl.Icons.Spectrum.Mail.Save=sVDM+"apps/cmp.png";
    tbl.Icons.Spectrum.Mail.Stamp=sSpec+"postage.png";
    tbl.Icons.Spectrum.Mail.Status=sSpec+"msgs.png";
    tbl.Icons.Spectrum.Mail.Mixed=sSpec+"yy.png";
    tbl.Icons.Spectrum.Mail.Pin=sEml+"pin.png";
    tbl.Icons.Spectrum.Mail.Unpin=sEml+"upn.png";
    tbl.Icons.Spectrum.Mail.Send=sVDM+"apps/cmp.png";
    tbl.Icons.Spectrum.Mail.Read=sEml+"r.png";
    tbl.Icons.Spectrum.Mail.Unread=sEml+"ur.png";
    tbl.Icons.Spectrum.Mail.Reader=new Object();
    tbl.Icons.Spectrum.Mail.Reader.AttachmentHeight=84;
    tbl.Icons.Spectrum.Mail.Reader.AttachmentsMode=0;
    tbl.Icons.Spectrum.Mail.Reader.AttachmentsFontSize=10;
    tbl.Icons.Spectrum.Mail.Reply=sSpec+"msgre.png";
    tbl.Icons.Spectrum.Mail.ReplyAll=sSpec+"msgrpa.png";
    tbl.Icons.Spectrum.Mail.Safe=sEml+"sfe.png";
    tbl.Icons.Spectrum.Mail.Forward=sSpec+"msgfwd.png";
    tbl.Icons.Spectrum.Mail.Trash=sEml+"rm.png";
    tbl.Icons.Spectrum.Mail.Junk=sEml+"jnk.png";
    tbl.Icons.Spectrum.Mail.Unjunk=sEml+"ujk.png";

    tbl.Icons.Spectrum.Folder=new Object();
    tbl.Icons.Spectrum.Folder.Attach=sSpec+"fldatch.png";
    tbl.Icons.Spectrum.Folder.Cabinet=sSpec+"cab.png";
    tbl.Icons.Spectrum.Folder.Delivered=sSpec+"fldcnf.png";
    tbl.Icons.Spectrum.Folder.Collection=sSpec+"folders.png";
    tbl.Icons.Spectrum.Folder.Open=sSpec+"fldo.png";
    tbl.Icons.Spectrum.Folder.Closed=sSpec+"fldc.png";
    tbl.Icons.Spectrum.Folder.Refresh=sSpec+"fldrf.png";
    tbl.Icons.Spectrum.Folder.Sent=sSpec+"fldd.png";

    tbl.Icons.Spectrum.Folder.Junk=sSpec+"fldjnk.png";
    tbl.Icons.Spectrum.Folder.Outbox=sSpec+"fldrout.png";

    tbl.Icons.WallPaper=sApps+"wlpr.png";



    tbl.Apps=new Object();
    tbl.Apps.CMS=new Object();
    tbl.Apps.CMS.Toolbar=new Object();
    tbl.Apps.CMS.Toolbar.FileManager=new Object();
    tbl.Apps.CMS.Toolbar.FileManager.TTL=43;

    tbl.Apps.Cabinet=new Object();
    tbl.Apps.Cabinet.Folder=new Object();
    tbl.Apps.Cabinet.Folder.Width=70;

    tbl.Apps.Collages=new Object();
    tbl.Apps.Collages.Editor=new Object();
    tbl.Apps.Collages.Editor.fontColor=new RGBA(255,255,255,1);
    tbl.Apps.Collages.Editor.Apply=function(edt){
      edt.Redactor.Editor.style.color=this.fontColor.toString();
    };

    tbl.Apps.ImageViewer=new Object();
    tbl.Apps.ImageViewer.backgroundColor=new RGBA(0,0,0,.79);
    tbl.Apps.ImageViewer.backgroundSizeWait="80px 80px";
    tbl.Apps.ImageViewer.backgroundRefreshDelay=800;
    tbl.Apps.ImageViewer.imageTransition="opacity 0.25s linear, visibility 0.25s linear";
    tbl.Apps.ImageViewer.toolbarTransition="opacity 0.125s linear";
    tbl.Apps.ImageViewer.innerSpacing=2;

    tbl.Apps.Mail=new Object();
    tbl.Apps.Mail.Writer=new Object();
    tbl.Apps.Mail.Writer.HeaderHeight=28;
    tbl.Apps.Mail.Writer.HeaderBuffer=4;
    tbl.Apps.Mail.Writer.MaxHeaders=3;

    tbl.Apps.Launcher=new Object();
    tbl.Apps.Launcher.CloseButton=new Object();
    tbl.Apps.Launcher.CloseButton.Right=2;
    tbl.Apps.Launcher.CloseButton.Top=4;
    tbl.Apps.Launcher.CloseButton.Apply=function(btn){
      coTheme.UI.screenCloseButton.Apply(btn);
      btn.style.top=this.Top+"px";
      btn.style.right=this.Right+"px";
    };
    tbl.Apps.Launcher.LogoutButton=new Object();
    tbl.Apps.Launcher.LogoutButton.Right=48;
    tbl.Apps.Launcher.LogoutButton.Top=4;
    tbl.Apps.Launcher.LogoutButton.FontWeight="";
    tbl.Apps.Launcher.LogoutButton.FontSize=14;
    tbl.Apps.Launcher.LogoutButton.LineHeight=24;
    tbl.Apps.Launcher.LogoutButton.Height=24;
    tbl.Apps.Launcher.LogoutButton.Apply=function(btn){
      coTheme.UI.screenCloseButton.Apply(btn);
      coDOM.setText(btn,coLang.Table.Buttons.Logout);
      btn.style.top=this.Top+"px";
      btn.style.right=this.Right+"px";
      btn.style.height=this.Height+"px";
      btn.style.width="";
      btn.style.lineHeight=this.LineHeight+"px";
      btn.style.fontWeight=this.FontWeight;
      btn.style.fontSize=this.FontSize+"px";
    };
    tbl.Apps.Launcher.Task=new Object();
    tbl.Apps.Launcher.Task.CloseButton=new Object();
    tbl.Apps.Launcher.Task.CloseButton.Padding=new Padding(0,8,8,0);
    tbl.Apps.Launcher.Task.CloseButton.Height=18;
    tbl.Apps.Launcher.Task.CloseButton.LineHeight=18;
    tbl.Apps.Launcher.Task.CloseButton.FontSize=12;
    tbl.Apps.Launcher.Task.CloseButton.FontWeight='bold';
    tbl.Apps.Launcher.Task.CloseButton.Apply=function(btn){
      this.Padding.enForce(btn);
      btn.style.height=this.Height+"px";
      btn.style.lineHeight=this.LineHeight+"px";
      btn.style.fontWeight=this.FontWeight;
      btn.style.fontSize=this.FontSize+"px";
      coDOM.setText(btn,coTheme.UI.screenCloseButton.Label);
    };
    tbl.Apps.Launcher.Task.Switcher=new Object();
    tbl.Apps.Launcher.Task.Switcher.Tabs=new Object();
    tbl.Apps.Launcher.Task.Switcher.Tabs.Margin=new Margin(7,0,0,0);
    tbl.Apps.Launcher.Task.Switcher.Tabs.Border=new Border(
      1,0,0,1,
      2,2,2,2,
      new RGBA(200,200,200,.4),
      new RGBA(0,0,0,0),
      new RGBA(0,0,0,0),
      new RGBA(0,0,0,0)
    );
    tbl.Apps.Launcher.Task.Switcher.Tabs.Background="blackHighlight";
    tbl.Apps.Launcher.Task.Switcher.Tabs.Apply=function(Tabs){
      Tabs.Container.className=Tabs.Class+" "+this.Background;
      this.Margin.enForce(Tabs.Container);
      this.Border.enForce(Tabs.Container);
    };
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab=new Object();
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Apply=function(Tab,State){
      Tab.State=State;

      switch (State) {
        case (0) : {
          Tab.style.color=this.Normal.Color.toString();
          Tab.style.backgroundColor=this.Normal.BackgroundColor.toString();
          this.Normal.Border.enForce(Tab);
          break;
        };
        case (1) : {
          Tab.style.color=this.Selected.Color.toString();
          Tab.style.backgroundColor=this.Selected.BackgroundColor.toString();
          this.Selected.Border.enForce(Tab);
          break;
        };

        case (2) : {
          Tab.style.color=this.Hover.Color.toString();
          Tab.style.backgroundColor=this.Hover.BackgroundColor.toString();
          this.Hover.Border.enForce(Tab);
          break;
        };
      };

    };
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Normal=new Object();
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Normal.Color=new RGBA(202,202,202,.7);
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Normal.BackgroundColor=new RGBA(37,37,37,.17);
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Normal.Border=new Border(
      1,0,0,1,
      2,2,2,2,
      new RGBA(200,200,200,.14),
      new RGBA(0,0,0,0),
      new RGBA(0,0,0,0),
      new RGBA(0,0,0,0)
    );
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Selected=new Object();
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Selected.Color=new RGBA(255,255,255,1);
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Selected.BackgroundColor=new RGBA(200,200,200,.1);
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Selected.Border=new Border(
      1,0,0,1,
      2,2,2,2,
      new RGBA(200,200,200,.4),
      new RGBA(0,0,0,0),
      new RGBA(0,0,0,0),
      new RGBA(0,0,0,0)
    );
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Hover=new Object();
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Hover.Color=new RGBA(255,255,255,1);
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Hover.BackgroundColor=new RGBA(22,137,17,1);
    tbl.Apps.Launcher.Task.Switcher.Tabs.Tab.Hover.Border=new Border(
      1,0,0,1,
      2,2,2,2,
      new RGBA(200,200,200,.4),
      new RGBA(0,0,0,0),
      new RGBA(0,0,0,0),
      new RGBA(0,0,0,0)
    );
    tbl.UI.Ace=new Object();
    tbl.UI.Ace.Theme="ace/theme/twilight";
    tbl.UI.Ace.KeyBinding="";
    tbl.UI.Ace.showPrintMargin=false;
    tbl.UI.Ace.fontSize=14;
    tbl.UI.Ace.gutterWidth=70;
    tbl.UI.Ace.gutterBackgroundImage=tbl.Slides.Black.Rough;
    tbl.UI.Ace.indentGuides=false;
    tbl.UI.Ace.Apply=function(ace){
      ace.renderer.$gutter.style.backgroundImage="url("+this.gutterBackgroundImage+")";
      ace.renderer.$gutter.style.minWidth=this.gutterWidth+"px";
      if (this.KeyBinding.length>0)
        ace.setKeyboardHandler(this.KeyBinding);
      ace.setTheme(coTheme.UI.Ace.Theme);
      ace.setShowPrintMargin(this.showPrintMargin);
      ace.setFontSize(this.fontSize);
      ace.setDisplayIndentGuides(this.indentGuides);
    };

    tbl.UI.BoxView=new Object();
    tbl.UI.BoxView.Nav=new Object();
    tbl.UI.BoxView.Nav.BorderRadius=8;

    tbl.UI.ContentBox=new Object();
    tbl.UI.ContentBox.Item=new Object();
    tbl.UI.ContentBox.Item.Edit=new Object();
    tbl.UI.ContentBox.Item.Edit.Margin=new Margin(0,2,85,0);
    tbl.UI.ContentBox.Item.Edit.Apply=function(itm){
      this.Margin.enForce(itm.Content.Box);
    };

    tbl.UI.frameThicknessNormal=7;
    tbl.UI.frameThicknessFull=1;
    tbl.UI.frameTransitionDelay=270;
    tbl.UI.frameTransitionResetDelay=2000;
    tbl.UI.frameTransitionResizeDelay=1001;
    tbl.UI.frameTransitionEase="swing";

    tbl.UI.screenCloseButton=new Object();
    tbl.UI.screenCloseButton.Label="x";
    tbl.UI.screenCloseButton.Height=24;
    tbl.UI.screenCloseButton.LineHeight=22;
    tbl.UI.screenCloseButton.Padding=new Padding(0,4,4,0);
    tbl.UI.screenCloseButton.Width=35;
    tbl.UI.screenCloseButton.Right=0;
    tbl.UI.screenCloseButton.Top=0;
    tbl.UI.screenCloseButton.FontWeight="bold";
    tbl.UI.screenCloseButton.FontSize=17;
    tbl.UI.screenCloseButton.Apply=function(btn){
      coDOM.setText(btn,this.Label);
      btn.style.top=this.Top+"px";
      btn.style.right=this.Right+"px";
      btn.style.height=this.Height+"px";
      btn.style.lineHeight=this.LineHeight+"px";
      this.Padding.enForce(btn);
      btn.style.width=this.Width+"px";
      btn.style.fontWeight=this.FontWeight;
      btn.style.fontSize=this.FontSize+"px";
    };
    tbl.UI.FilmStrip=new Object();
    tbl.UI.FilmStrip.Slide=new Object();
    tbl.UI.FilmStrip.Slide.Background=tbl.Masks.Film;
    tbl.UI.FilmStrip.Slide.Color=new RGBA(100,100,100,.5)
    tbl.UI.FilmStrip.Slide.transitionScrollDelay=500;

    tbl.UI.Nav=new Object();
    tbl.UI.Nav.fontSize=12;
    tbl.UI.Nav.Menu=new Object();
    tbl.UI.Nav.Menu.Margin=new Margin(0,4,4,0);
    tbl.UI.Nav.Menu.Padding=new Padding(0,2,2,0);
    tbl.UI.Nav.Menu.Apply=function(itm){
      this.Margin.enForce(itm.Label);
      this.Padding.enForce(itm.Label);
    };
    tbl.UI.Nav.Combo=new Object();
    tbl.UI.Nav.Combo.Padding=new Padding(0,2,2,0);
    tbl.UI.Nav.Combo.Apply=function(itm){
      this.Padding.enForce(itm.Container);
    };
    tbl.UI.Nav.Item=new Object();
    tbl.UI.Nav.Item.Label=new Object();
    tbl.UI.Nav.Item.Label.Border=new Border(
      1,0,1,1,
      0,0,0,0,
      new RGBA(255,255,255,.17),
      new RGBA(255,255,255,.17),
      new RGBA(255,255,255,.17),
      new RGBA(255,255,255,.17)
    );
    tbl.UI.Nav.Item.Label.Apply=function(itm){
      this.Border.enForce(itm.Container);
    };

    tbl.UI.ToolWindow=new Object();
    tbl.UI.ToolWindow.Margin=4;
    tbl.UI.TabsBar=new Object();
    tbl.UI.TabsBar.Height=25;
    tbl.UI.TabsBar.Background=new Object();
    tbl.UI.TabsBar.Background.Color=new RGBA(77,77,77,1);
    tbl.UI.TabsBar.Background.Image=tbl.Slides.Black.Rough;
    tbl.UI.TabsBar.Item=new Object();
    tbl.UI.TabsBar.Item.Radius=1;
    tbl.UI.TabsBar.Item.minWidth=27;
    tbl.UI.TabsBar.AutoSelectDelay=2000;
    tbl.UI.TabsBar.Apply=function(tb){
      tb.setHeight(this.Height);
      tb.Container.style.height=tb.Height+"px";
      tb.Client.style.backgroundColor=this.Background.Color.toString();
      if (this.Background.Image.length>0){
        tb.Client.style.backgroundImage= "url("+this.Background.Image+")"
        tb.Client.style.backgroundRepeat="repeat";
      } else {
        tb.Client.style.backgroundImage= "none";
      };
    };

    tbl.UI.ThreadView=new Object();
    tbl.UI.ThreadView.Background=new Object();
    tbl.UI.ThreadView.Background.Color=new Object();
    tbl.UI.ThreadView.Background.Color.Window=new RGBA(255,255,255,1);
    tbl.UI.ThreadView.Background.Color.Hover=new RGBA(230,230,230,1);
    tbl.UI.ThreadView.Background.Color.Selected=new RGBA(214,214,214,1);


    tbl.UI.ThreadView.Border=new Object();
    tbl.UI.ThreadView.Border.Color=new Object();
    tbl.UI.ThreadView.Border.Color.Hover=new RGBA(77,77,77,1);
    tbl.UI.ThreadView.Border.Color.Read=new RGBA(0,0,0,.2);
    tbl.UI.ThreadView.Border.Color.UnRead=new RGBA(0,100,220,1);

    tbl.UI.ThreadView.Font=new Object();
    tbl.UI.ThreadView.Font.Size=new Object();
    tbl.UI.ThreadView.Font.Size.Read=12;
    tbl.UI.ThreadView.Font.Size.UnRead=13;
    tbl.UI.ThreadView.Font.Color=new Object();
    tbl.UI.ThreadView.Font.Color.Read=new RGBA(0,100,220,1);
    tbl.UI.ThreadView.Font.Color.UnRead=new RGBA(0,100,220,1);
    tbl.UI.ThreadView.Font.Weight=new Object();
    tbl.UI.ThreadView.Font.Weight.Read="";
    tbl.UI.ThreadView.Font.Weight.UnRead="bold";

    tbl.UI.ThreadView.Status=new Object();
    tbl.UI.ThreadView.Status.Color=new Object();
    tbl.UI.ThreadView.Status.Color.Read=new RGBA(0,0,0,0);
    tbl.UI.ThreadView.Status.Color.UnRead=new RGBA(0,100,220,1);

    tbl.UI.ThreadView.Status.Color.Online=new RGBA(0,0,243,1);
    tbl.UI.ThreadView.Status.Color.Offline=new RGBA(25,25,25,1);
    tbl.UI.ThreadView.Status.Color.Busy=new RGBA(243,25,25,1);

    tbl.UI.ThreadView.Header=new Object();
    tbl.UI.ThreadView.Header.Background=new Object();
    tbl.UI.ThreadView.Header.Background.Color=new RGBA(127,127,127,.3);
    tbl.UI.ThreadView.Header.Height=27;
    tbl.UI.ThreadView.Header.snapHeight=23;

    tbl.UI.ThreadView.Header.fontSize=22;
    tbl.UI.ThreadView.Header.fontColor=new RGBA(0,0,0,1);
    tbl.UI.ThreadView.Header.indicatorFontSize=12;
    tbl.UI.ThreadView.Header.pageHeight=27;
    tbl.UI.ThreadView.Header.buttonHeight=27;
    tbl.UI.ThreadView.Header.buttonFontSize=22;
    tbl.UI.ThreadView.Header.buttonFontWeight="bold";
    tbl.UI.ThreadView.Header.buttonFontColor=new RGBA(0,0,0,1);
    tbl.UI.ThreadView.Header.Apply=function(hdr){
      hdr.Container.style.backgroundColor=this.Background.Color.toString();
      hdr.Container.style.color=this.buttonFontColor.toString();
      hdr.Pages.Container.style.lineHeight=this.pageHeight+"px";
      hdr.Pages.Container.style.height=this.pageHeight+"px";
      hdr.Refresh.style.height=this.buttonHeight+"px";
      hdr.Refresh.style.lineHeight=this.buttonHeight+"px";
      hdr.Refresh.style.fontSize=this.buttonFontSize+"px";
      hdr.Refresh.style.fontWeight=this.buttonFontWeight;
      var p=null;
      for (var iLcv=0; iLcv<hdr.Pages.length; iLcv++){
        p=hdr.Pages[iLcv];
        p.style.fontSize=this.fontSize+"px";
      };
      hdr.Pages.Indicator.style.fontSize=this.indicatorFontSize+"px";
    };

    tbl.UI.ThreadView.Group=new Object();
    tbl.UI.ThreadView.Group.Background=new Object();
    tbl.UI.ThreadView.Group.Background.Color=new RGBA(217,217,217,1);
    tbl.UI.ThreadView.Group.Border=new Object();
    tbl.UI.ThreadView.Group.Border.Thickness=1;
    tbl.UI.ThreadView.Group.Border.Style="solid";
    tbl.UI.ThreadView.Group.Border.Color=new Object();
    tbl.UI.ThreadView.Group.Border.Color.Top=new RGBA(127,127,127,.5);
    tbl.UI.ThreadView.Group.Border.Color.Bottom=new RGBA(127,127,127,.5);
    tbl.UI.ThreadView.Group.Height=17;
    tbl.UI.ThreadView.Group.scrollBias=-20;
    tbl.UI.ThreadView.Group.fontSize=12;
    tbl.UI.ThreadView.Group.fontColor=new RGBA(0,0,0,1);
    tbl.UI.ThreadView.Group.Notice=new Object();
    tbl.UI.ThreadView.Group.Notice.fontColor=new RGBA(0,0,0,1);
    tbl.UI.ThreadView.Group.Notice.fontSize=12;
    tbl.UI.ThreadView.Group.Notice.fontWeight="bold";
    tbl.UI.ThreadView.Group.Symbol=new Object();
    tbl.UI.ThreadView.Group.Symbol.Size=17;
    tbl.UI.ThreadView.Group.Symbol.Spacing=5;

    tbl.UI.ThreadView.Group.Apply=function(Group){
      Group.Header.style.zIndex=1;
      Group.Header.style.height=this.Height+"px";
      Group.Header.style.borderTopStyle=this.Border.Style;
      Group.Header.style.borderTopColor=this.Border.Color.Top.toString();
      Group.Header.style.borderTopWidth=this.Border.Thickness+"px";
      Group.Header.style.borderBottomStyle=this.Border.Style;
      Group.Header.style.borderBottomColor=this.Border.Color.Bottom.toString();
      Group.Header.style.borderBottomWidth=this.Border.Thickness+"px";
      Group.Header.style.backgroundColor=this.Background.Color.toString();
      Group.Header.style.color=this.fontColor.toString();
      Group.Header.style.fontSize=this.fontSize+"px";
      Group.Symbol.style.display="inline-block";
      Group.Symbol.style.height=this.Symbol.Size+"px";
      Group.Symbol.style.width=this.Symbol.Size+"px";
      Group.Symbol.style.backgroundRepeat="no-repeat";
      Group.Symbol.style.backgroundPosition="center";
      Group.Symbol.style.backgroundSize=this.Symbol.Size+"px "+this.Symbol.Size+"px";
      Group.Caption.style.marginLeft=this.Symbol.Spacing+"px";
      Group.Caption.style.verticalAlign="top";
      Group.Caption.style.lineHeight=this.Height+"px";
      Group.Notice.style.color=this.Notice.fontColor.toString();
      Group.Notice.style.fontSize=this.Notice.fontSize+"px";
      Group.Notice.style.fontWeight=this.Notice.fontWeight;
    };

    tbl.UI.ThreadView.Tools=new Object();
    tbl.UI.ThreadView.Tools.Opacity=new Object();
    tbl.UI.ThreadView.Tools.Opacity.Idle=0.70;
    tbl.UI.ThreadView.Tools.Opacity.Hover=1;
    tbl.UI.ThreadView.Tools.Opacity.Inactive=0.87;
    tbl.UI.ThreadView.Tools.Opacity.Disabled=0.2;
    tbl.UI.ThreadView.Tools.Opacity.Active=1;
    tbl.UI.ThreadView.Tools.Opacity.Hidden=0.1;
    tbl.UI.ThreadView.Tools.buttonTransition="0.5s ease-in-out";

    tbl.UI.frameTransition=function(){
      return "".concat(
        "top ",
        this.frameTransitionDelay,
        "s, ",
        "left ",
        this.frameTransitionDelay,
        "s, ",
        "width ",
        this.frameTransitionDelay,
        "s, ",
        "height ",
        this.frameTransitionDelay,
        "s"
      );
    }
    tbl.UI.screenFade=true;
    tbl.UI.screenFadeDelay=0.27;
    tbl.UI.screenFadeTransition=function(){
      return "".concat(
        "opacity ",
        this.screenFadeDelay,
        "s"
      );
    };
    tbl.UI.RichEdit=new Object();
    tbl.UI.RichEdit.Background=new Object();
    tbl.UI.RichEdit.Background.Color=new RGBA(255,255,255,1);
    tbl.UI.RichEdit.Color=new RGBA(0,0,0,1);
    tbl.UI.RichEdit.Toolbar=new Object();
    tbl.UI.RichEdit.Toolbar.Color=new RGBA(0,0,0,1);
    tbl.UI.RichEdit.Toolbar.Background=new Object();
    tbl.UI.RichEdit.Toolbar.Background.Color=new RGBA(217,217,217,1);
    tbl.UI.RichEdit.Apply=function(re){
      if (re.Redactor){
        re.Redactor.Toolbar.style.color=this.Toolbar.Color.toString();
        re.Redactor.Toolbar.style.backgroundColor=this.Toolbar.Background.Color.toString();
      } else {
        re.Toolbar.style.color=this.Toolbar.Color.toString();
        re.Toolbar.style.backgroundColor=this.Toolbar.Background.Color.toString();
      };
    };
    tbl.UI.Select=new Object();
    tbl.UI.Select.fontSize=12;
    tbl.UI.Select.Height=24;
    tbl.UI.Select.buttonWidth=34;
    tbl.UI.Select.Background=new Object();
    tbl.UI.Select.Background.Color=new RGBA(127,127,127,1);
    tbl.UI.Select.Color=new RGBA(255,255,255,1);
    tbl.UI.Select.Shadow=createTextShadow();
    tbl.UI.Select.Shadow.Add(1,-1,2,0,0,0,1);
    tbl.UI.Select.Shadow.Add(1,1,2,0,0,0,1);

    tbl.UI.Select.Border=new Object();
    tbl.UI.Select.Border.Thickness=1;
    tbl.UI.Select.Border.Radius=new Object();
    tbl.UI.Select.Border.Radius.TopLeft=2;
    tbl.UI.Select.Border.Radius.TopRight=2;
    tbl.UI.Select.Border.Radius.BottomRight=2;
    tbl.UI.Select.Border.Radius.BottomLeft=2;
    tbl.UI.Select.Border.Color=new Object();
    tbl.UI.Select.Border.Color.Top=new RGBA(255,255,255,.3);
    tbl.UI.Select.Border.Color.Right=new RGBA(255,255,255,.1);
    tbl.UI.Select.Border.Color.Bottom=new RGBA(255,255,255,.1);
    tbl.UI.Select.Border.Color.Left=new RGBA(255,255,255,.3);
    tbl.UI.Select.Apply=function(el){
      el.style.fontSize=this.fontSize+"px";
      el.style.height=this.Height+"px";
      el.style.borderTopLeftRadius=this.Border.Radius.TopLeft+"px";
      el.style.borderTopRightRadius=this.Border.Radius.TopRight+"px";
      el.style.borderBottomRightRadius=this.Border.Radius.BottomRight+"px";
      el.style.borderBottomLeftRadius=this.Border.Radius.BottomLeft+"px";
      el.style.borderTopColor=this.Border.Color.Top.toString();
      el.style.borderLeftColor=this.Border.Color.Left.toString();
      el.style.borderRightColor=this.Border.Color.Right.toString();
      el.style.borderBottomColor=this.Border.Color.Bottom.toString();
      el.style.borderWidth=this.Border.Thickness+"px";
      el.style.backgroundColor=this.Background.Color.toString();
      el.style.color=this.Color.toString();
      var ops=el.options;
      for (var iLcv=0; iLcv<ops.length; iLcv++){
        $(ops[iLcv]).css('color',this.Color.toString());
        $(ops[iLcv]).css('text-shadow',this.Shadow.toString());
        $(ops[iLcv]).css('backgroundColor',this.Background.Color.toString());
      };
      this.Shadow.Apply(el);
    };
    tbl.UI.Select.ApplyToOption=function(opt){
      $(opt).css('color',this.Color.toString());
      $(opt).css('text-shadow',this.Shadow.toString());
      $(opt).css('backgroundColor',this.Background.Color.toString());
    };

    tbl.UI.Text=new Object();
    tbl.UI.Text.Color=new RGBA(255,255,255,1);
    tbl.UI.Text.Height=21;
    tbl.UI.Text.Shadow=createTextShadow();
    tbl.UI.Text.Shadow.Add(1,-1,2,0,0,0,1);
    tbl.UI.Text.Shadow.Add(1,1,2,0,0,0,1);

    tbl.UI.Text.Background=new Object();
    tbl.UI.Text.Background.Color=new RGBA(127,127,127,1);
    tbl.UI.Text.Border=new Object();
    tbl.UI.Text.Border.Thickness=1;
    tbl.UI.Text.Border.Radius=new Object();
    tbl.UI.Text.Border.Radius.TopLeft=2;
    tbl.UI.Text.Border.Radius.TopRight=2;
    tbl.UI.Text.Border.Radius.BottomRight=2;
    tbl.UI.Text.Border.Radius.BottomLeft=2;
    tbl.UI.Text.Border.Color=new Object();
    tbl.UI.Text.Border.Color.Top=new RGBA(255,255,255,.3);
    tbl.UI.Text.Border.Color.Left=new RGBA(255,255,255,.3);
    tbl.UI.Text.Border.Color.Bottom=new RGBA(255,255,255,.1);
    tbl.UI.Text.Border.Color.Right=new RGBA(255,255,255,.1);

    tbl.UI.Text.Apply=function(el){
      el.style.height=this.Height+"px";
      el.style.borderTopLeftRadius=this.Border.Radius.TopLeft+"px";
      el.style.borderTopRightRadius=this.Border.Radius.TopRight+"px";
      el.style.borderBottomRightRadius=this.Border.Radius.BottomRight+"px";
      el.style.borderBottomLeftRadius=this.Border.Radius.BottomLeft+"px";
      el.style.borderTopColor=this.Border.Color.Top.toString();
      el.style.borderLeftColor=this.Border.Color.Left.toString();
      el.style.borderRightColor=this.Border.Color.Right.toString();
      el.style.borderBottomColor=this.Border.Color.Bottom.toString();
      el.style.borderWidth=this.Border.Thickness+"px";
      el.style.backgroundColor=this.Background.Color.toString();
      el.style.color=this.Color.toString();

      this.Shadow.Apply(el);
    };


    tbl.UI.Toolbar=new Object();

    tbl.UI.Toolbar.Background=new Object();
    tbl.UI.Toolbar.Background.Color=new RGBA(77,77,77,1);
    tbl.UI.Toolbar.Background.Image=tbl.Slides.Black.Rough;
    tbl.UI.Toolbar.Apply=function(tb){
      tb.Container.style.backgroundColor=this.Background.Color.toString();
      if (this.Background.Image.length>0){
        tb.Container.style.backgroundImage= "url("+this.Background.Image+")"
        tb.Container.style.backgroundRepeat="repeat";
      } else {
        tb.Container.style.backgroundImage= "none";
      };
    };
    tbl.UI.Toolbar.Item=new Object();

    tbl.UI.Toolbar.Item.Border=new Object();
    tbl.UI.Toolbar.Item.Border.Color=new Object();
    tbl.UI.Toolbar.Item.Border.Color.Idle=new RGBA(255,255,255,.1);
    tbl.UI.Toolbar.Item.Border.Color.Hover=new RGBA(255,255,255,.3);
    tbl.UI.Toolbar.Item.Border.Width=1;

    tbl.UI.Toolbar.Item.Caption=new Object();
    tbl.UI.Toolbar.Item.Caption.Padding=Padding(1,1,1,2);
    tbl.UI.Toolbar.Item.Caption.Margin=Padding(0,0,0,0);


    tbl.UI.Toolbar.Item.Switch=new Object();
    tbl.UI.Toolbar.Item.Switch.Color=new Object();
    tbl.UI.Toolbar.Item.Switch.Color.On=new RGBA(200,200,200,.27);
    tbl.UI.Toolbar.Item.Switch.Color.Off=new RGBA(0,0,0,.1);
    tbl.UI.Toolbar.Item.Switch.Color.Disabled=new RGBA(255,255,255,.1);

    tbl.UI.Toolbar.Item.Switch.Decore=new Object();
    tbl.UI.Toolbar.Item.Switch.Decore.Margin=new Margin(0,1,0,0);
    tbl.UI.Toolbar.Item.Switch.Decore.Padding=new Padding(0,1,0,0);

    tbl.UI.Toolbar.Item.Switch.Margin=new Margin(2,1,1,0);
    tbl.UI.Toolbar.Item.Switch.Track=new Object();
    tbl.UI.Toolbar.Item.Switch.Track.Width=40;
    tbl.UI.Toolbar.Item.Switch.Track.BoxShadow=new BoxShadow(0,0,10,2,new RGBA(0,0,0,.3),true);
    tbl.UI.Toolbar.Item.Switch.Track.Margin=new Margin(2,1,1,0);
    tbl.UI.Toolbar.Item.Switch.Track.Padding=new Padding(0,1,1,0);
    tbl.UI.Toolbar.Item.Switch.Track.Border=new Border(
      1,1,1,1,
      4,4,4,4,
      tbl.UI.Toolbar.Item.Border.Color.Idle,
      tbl.UI.Toolbar.Item.Border.Color.Idle,
      tbl.UI.Toolbar.Item.Border.Color.Idle,
      tbl.UI.Toolbar.Item.Border.Color.Idle
    );
    tbl.UI.Toolbar.Item.Switch.Track.yBias=function(){
      return this.Margin.yBias()+this.Padding.yBias()+this.Border.yBias();
    };
    tbl.UI.Toolbar.Item.Switch.Nurl=new Object();
    tbl.UI.Toolbar.Item.Switch.Nurl.Width=20;
    tbl.UI.Toolbar.Item.Switch.Nurl.Border=new Object();
    tbl.UI.Toolbar.Item.Switch.Nurl.Border.Normal=new Border(
      1,1,1,1,
      4,4,4,4,
      tbl.UI.Toolbar.Item.Border.Color.Idle,
      tbl.UI.Toolbar.Item.Border.Color.Idle,
      tbl.UI.Toolbar.Item.Border.Color.Idle,
      tbl.UI.Toolbar.Item.Border.Color.Idle
    );
    tbl.UI.Toolbar.Item.Switch.Nurl.Border.Hover=new Border(
      1,1,1,1,
      4,4,4,4,
      tbl.UI.Toolbar.Item.Border.Color.Hover,
      tbl.UI.Toolbar.Item.Border.Color.Hover,
      tbl.UI.Toolbar.Item.Border.Color.Hover,
      tbl.UI.Toolbar.Item.Border.Color.Hover
    );
    tbl.UI.Toolbar.Item.Switch.Nurl.Face=new Object();
    tbl.UI.Toolbar.Item.Switch.Nurl.BoxShadow=new BoxShadow(0,0,0,1,new RGBA(0,0,0,.79),false);

    tbl.UI.Toolbar.Item.Switch.Nurl.Face.Disabled=new Object();
    tbl.UI.Toolbar.Item.Switch.Nurl.Face.Disabled.Color=new RGBA(57,57,57,.2);
    tbl.UI.Toolbar.Item.Switch.Nurl.Face.Normal=new Object();
    tbl.UI.Toolbar.Item.Switch.Nurl.Face.Normal.Color=new RGBA(127,127,127,.2);
    tbl.UI.Toolbar.Item.Switch.Nurl.Face.Hover=new Object();
    tbl.UI.Toolbar.Item.Switch.Nurl.Face.Hover.Color=new RGBA(43,43,43,1);
    tbl.UI.Toolbar.Item.Switch.Nurl.yBias=function(){
      return this.Border.Normal.yBias();
    };

    tbl.UI.Toolbar.Item.Switch.Apply=function(s){
      coTheme.UI.Toolbar.Item.Caption.Padding.enForce(s.Caption);
      coTheme.UI.Toolbar.Item.Caption.Margin.enForce(s.Caption);
      this.Margin.enForce(s.Container);
      this.Decore.Padding.enForce(s.Decore);
      this.Decore.Margin.enForce(s.Decore);

      this.Track.Padding.enForce(s.Track);
      this.Track.Margin.enForce(s.Track);
      this.Track.Border.enForce(s.Track);
      this.Track.BoxShadow.enForce(s.Track);

      this.Nurl.Border.Normal.enForce(s.Nurl);
      this.Nurl.BoxShadow.enForce(s.Nurl);

      s.Track.style.width=this.Track.Width+"px";
      s.Nurl.style.width=this.Nurl.Width+"px";
      s.Nurl.style.backgroundColor=(s.Enabled==true)? this.Nurl.Face.Normal.Color.toString() : this.Nurl.Face.Disabled.Color.toString();;
    };

    tbl.UI.Toolbar.Item.Text=new Object();
    tbl.UI.Toolbar.Item.Text.lineHeight=24;
    tbl.UI.Toolbar.Item.Text.Input=new Object();
    tbl.UI.Toolbar.Item.Text.Input.Width=43;
    tbl.UI.Toolbar.Item.Text.Input.Margin=new Margin(2,0,0,0);
    tbl.UI.Toolbar.Item.Text.Input.Border=new Border(
      1,1,1,1,
      4,4,4,4,
      tbl.UI.Toolbar.Item.Border.Color.Hover,
      tbl.UI.Toolbar.Item.Border.Color.Hover,
      tbl.UI.Toolbar.Item.Border.Color.Hover,
      tbl.UI.Toolbar.Item.Border.Color.Hover
    );
    tbl.UI.Toolbar.Item.Text.Input.yBias=function(){
      return this.Margin.yBias()+this.Border.yBias();
    };
    tbl.UI.Toolbar.Item.Text.Color=new RGBA(255,255,255,1);
    tbl.UI.Toolbar.Item.Text.Caption=new Object();
    tbl.UI.Toolbar.Item.Text.Caption.Padding=tbl.UI.Toolbar.Item.Caption.Padding;
    tbl.UI.Toolbar.Item.Text.Caption.Margin=new Margin(0,2,2,0);
    tbl.UI.Toolbar.Item.Text.Shadow=new Object();
    tbl.UI.Toolbar.Item.Text.Shadow.Idle=createTextShadow();
    tbl.UI.Toolbar.Item.Text.Shadow.Idle.Add(1,-1,2,0,0,0,1);
    tbl.UI.Toolbar.Item.Text.Shadow.Idle.Add(1,1,2,0,0,0,1);
    tbl.UI.Toolbar.Item.Text.Decore=new Object();
    tbl.UI.Toolbar.Item.Text.Decore.Margin=new Margin(1,1,1,0);
    tbl.UI.Toolbar.Item.Text.Apply=function(t){
      this.Decore.Margin.enForce(t.Decore);
      this.Caption.Padding.enForce(t.Caption);
      this.Caption.Margin.enForce(t.Caption);
      this.Input.Margin.enForce(t.Input);
      this.Input.Border.enForce(t.Input);
      t.Input.style.width=this.Input.Width+"px";
    };
    tbl.UI.TreeView=new Object();
    tbl.UI.TreeView.Background=new Object();
    tbl.UI.TreeView.Background.Color=new Object();
    tbl.UI.TreeView.Background.Color.Window=new RGBA(0,0,0,0);
    tbl.UI.TreeView.Item=new Object();
    tbl.UI.TreeView.Item.Height=25;
    tbl.UI.TreeView.AutoSwitchDelay=1500;

    tbl.UI.TreeView.Item.Background=new Object();
    tbl.UI.TreeView.Item.Background.Color=new Object();
    tbl.UI.TreeView.Item.Background.Color.Hover=new RGBA(230,230,230,1);
    tbl.UI.TreeView.Item.Background.Color.Selected=new RGBA(214,214,214,1);

    tbl.UI.Indicator=new Object();
    tbl.UI.Indicator.Background=new Object();
    tbl.UI.Indicator.Background.Color=new RGBA(77,77,207,1);
    tbl.UI.Indicator.BoxShadow=new BoxShadow();
    tbl.UI.Indicator.BoxShadow.X=0;
    tbl.UI.Indicator.BoxShadow.Y=0;
    tbl.UI.Indicator.BoxShadow.Blur=3;
    tbl.UI.Indicator.BoxShadow.Color=new RGBA(255,255,255,1);


  },
  createCSS:function(){
    c=new Object();
    c.Class="CSS";
    c.BoxShadow=new Object();
    c.BoxShadow.None="0px 0px 0px rgba(0,0,0,0)";
    return c;
  }
};
coTheme.init();
