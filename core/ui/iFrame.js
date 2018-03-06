coAppUI.App.Components.iFrame = {
  Version        : new Version(2014,10,7,25),
  Title          : new Title("Aurawin UI iFrame","iFrame"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/iFrame.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function(sName,sClass,Screen,Slides,Owner,Parent,Align) {
    var _vw=Slides.createSlide(sName,sClass+" Elements",Screen,Owner,Parent,Align);
    _vw.Container.className="iFrame "+sClass;
    _vw.Class=sClass;
    _vw.Client=null;
    _vw.Container.style.overflow="hidden";
    _vw.iFrame=document.createElement('iframe');
    _vw.Container.appendChild(_vw.iFrame);
    _vw.iFrame.className="iFrame "+ sClass+"iFrame";
    _vw.iFrame.Owner=_vw;
    _vw.Window=_vw.iFrame.contentWindow;
    _vw.Window.Owner=_vw;
    _vw.Document=_vw.Window.document;
    _vw.Document.Owner=_vw;
    _vw.Head=_vw.Document.head || _vw.Document.getElementsByTagName( "head" )[0];
    if ( (_vw.Head==null) || (_vw.Head==undefined)) {
      _vw.Head=_vw.Document.createElement('head');
      _vw.Document.appendChild(_vw.Head);
    };
    _vw.baseURL=_vw.Document.createElement('base');
    _vw.Head.appendChild(_vw.baseURL);
    if (_vw.Document) {
      _vw.Client=_vw.Document.body;
      if (_vw.Client) {
        _vw.Client.style.height="";
        _vw.Client.className="iFrame "+sClass+"Client";
      };
      try { _vw.Document.inputEncoding="UTF-8"; } catch(e) { };
      try { _vw.Document.charset="UTF-8";} catch(e) {};
      try { _vw.Document.characterSet="UTF-8";} catch(e) {};
      try { _vw.Document.defaultCharset="UTF-8";} catch(e) {};
    };
    var saCSS=coAppKit.getStyleSheets();
    for (var iLcv=0; iLcv<saCSS.length; iLcv++){
      var ln=_vw.Document.createElement('link');
      ln.setAttribute("type","text/css");
      ln.setAttribute("href",saCSS[iLcv]);
      ln.setAttribute("rel","stylesheet");
      _vw.Head.appendChild(ln);
    };
    saCSS.length=0;
    saCSS=null;
    _vw.baseURL.href=location.href;
    coAppUI.iFrames.push(_vw);
    _vw._Free=_vw.Free;
    _vw.Free=function(){
      var vw=this;
      var idx=coAppUI.iFrames.indexOf(vw);
      if (idx>-1) coAppUI.iFrames.splice(idx,1);
      vw._Free();
      vw=null;
      return null;
    };
    return _vw;
  }
};

