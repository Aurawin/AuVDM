coAppUI.App.Components.MultiView = {
  Version        : new Version(2014,8,7,12),
  Title          : new Title("Aurawin Multi View","MultiView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/MultiView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Default;
    var _vw=Slides.createSlide(sName,sClass+" MultiView screenBoxShadow",Screen,Owner,Parent,Align);
    _vw.Container.style.left=coVDM.MultiViewOffset+"px";
    _vw.Container.style.right=coVDM.MultiViewOffset+"px";
    _vw.Container.style.top=coVDM.MultiViewOffset+"px";
    _vw.Container.style.bottom=coVDM.MultiViewOffset+"px";
    _vw.onRefresh=null;
    _vw.Class=sClass;

    _vw.Selected=null;

    _vw.Nav=coAppUI.App.Components.Nav.Create("Menu","Nav",Screen,_vw.Slides,_vw,_vw.Container,coAppUI.Alignment.Bottom);
    _vw.Nav.Home=_vw.Nav.Items.addItem(
      _vw.Nav.itemKind.Button,"Home",coLang.Table.Buttons.Done,
      _vw.Nav.oAutoShowOn,
      _vw.Nav.oCascadeChildren,
      _vw.Nav.oAddToShowList,
      _vw.Nav.oSetAsDefaultOff,
      _vw.Nav.NoTarget,
      _vw.Nav.NoSlide,
      _vw.Nav.NoShowList,
      _vw.Nav.NoHideList,
      _vw.Nav.NoReturn,
      function(navItem){
        var vw=navItem.Nav.Owner;
        vw.Conseal();
      }
    );
    _vw.Nav.Menu=_vw.Nav.Items.addItem(
      _vw.Nav.itemKind.Menu,"Menu",coLang.Table.Labels.Menu,
      _vw.Nav.oAutoShowOn,
      _vw.Nav.oCascadeChildren,
      _vw.Nav.oAddToShowList,
      _vw.Nav.oSetAsDefaultOff,
      _vw.Nav.NoTarget,
      _vw.Nav.NoSlide,
      _vw.Nav.NoShowList,
      _vw.Nav.NoHideList,
      _vw.Nav.NoReturn,
      _vw.Nav.NoClick
    );
    return _vw;
  }
};
