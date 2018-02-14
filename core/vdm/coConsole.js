coVDM.App.Components.coConsole = {
  Version        : new Version(2014,8,12,22),
  Title          : new Title("VDM Core Console","Console"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/vdm/coConsole.js',
  debugToConsole : true,
  VDM            : null,
  Screen         : null,
  init           : function(vdm){
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      [
        '/core/app/coApp.js',
        '/core/app/coAppUI.js',
        '/core/app/coAppScreens.js'
      ],
      coAppKit.NoDependencies,
      this.onInitialized
    );
    this.VDM=vdm;
    this.App.Unit=this;
    this.App.Initialized=true;
    return this;
  },
  onInitialized:function(App){
    coVDM.Console=App.Unit.Screen=App.Screen=App.Unit.VDM.Console=App.Unit.Create(App.Unit.VDM);
    App.Loaded=true;
  },
  Create:function(aVDM){
    var _cs=coAppScreens.createScreen(aVDM,"consoleBox","System","Console","Console Output","/core/vdm/imgs/icns/console.png");
    _cs.Unit=this;
    _cs.SaveGeometry=true;
    _cs.Position=coApp.Position.TopLeft;
    _cs.AllowFullScreen=true;
    _cs.Index=0;
    _cs.Count=0;
    _cs.List=new Array();
    _cs.Description=coLang.Table.Apps.Console.Description;
    _cs.onShow=function(){
      var cs=_cs;
    };
    _cs.Exception=function(err,show){
      if (show==undefined) show=true;
      var cs=this;
      var sErr="";
      if (show==true)
        cs.Show();
      for (var prop in err)
       sErr += "property: "+ prop+ " value: ["+ err[prop]+ "]\n";
      cs.Append(err);
      cs.Append(sErr);
    };
    _cs.Append=function(sEntry){
      var cs=this;
      cs.Index+=1;
      var div=document.createElement('div');
      div.id=cs.Count+1;
      div.className="consoleEntry";
      div.textContent=cs.Index+" "+sEntry;
      cs.Log.Panels.Container.appendChild(div);
      cs.Log.Container.scrollTop=cs.Log.Container.scrollHeight-cs.Log.Panels.Container.clientHeight;
      cs.List.push(div);
      cs.Count+=1;
    };
    _cs.divToString=function(div){
      var str="";
      return str.concat(
        " id=",div.id,
        " className=",div.className,
        " offsetTop=",div.offsetTop,
        " offsetLeft=",div.offsetLeft,
        " offsetWidth=",div.offsetWidth,
        " offsetHeight=",div.offsetHeight
      );
    };
    _cs.ClearLog=function(){
      var cs=_cs;
      for (var iLcv=0; iLcv<cs.List.length; iLcv++){
        var div=cs.List[iLcv];
        cs.Log.Panels.Container.removeChild(div);
      };
      cs.List.length=0;
    };

    _cs.Log=_cs.Slides.createSlide("slideConsole","sldClient",_cs,_cs.Frame,_cs.Frame.Client,coAppUI.Alignment.Client);
    _cs.Log.setOverflow(false,true);
    _cs.Log.Panels=coAppUI.App.Components.Panels.Create("Logs","pnlClientForList",_cs.Frame,_cs.Log,_cs.Log.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOff);
    _cs.Log.Visible=true;
    _cs.Nav=coAppUI.App.Components.Nav.Create("Console","Nav",_cs,_cs.Slides,_cs.Frame,_cs.Frame.Client);
    _cs.Nav.Visible=true;
    _cs.Nav.Home=_cs.Nav.Items.addItem(
      _cs.Nav.itemKind.Button,"Home",coLang.Table.Buttons.Home,
      _cs.Nav.oAutoShowOn,
      _cs.Nav.oCascadeOn,
      _cs.Nav.oAddToShowList,
      _cs.Nav.oSetAsDefaultOn,
      _cs.Nav.NoTarget,
      _cs.Log,
      [_cs.Log],
      _cs.Nav.NoHideList,
      _cs.Nav.NoReturn,
      _cs.Nav.NoClick
    );
    _cs.Nav.Clear=_cs.Nav.Items.addItem(
      _cs.Nav.itemKind.Button,"Clear",coLang.Table.Buttons.Clear,
      _cs.Nav.oAutoShowOn,
      _cs.Nav.oCascadeOn,
      _cs.Nav.oAddToShowList,
      _cs.Nav.oSetAsDefaultOff,
      _cs.Nav.NoTarget,
      _cs.Log,
      _cs.Nav.NoShowList,
      _cs.Nav.NoHideList,
      _cs.Nav.NoReturn,
      _cs.ClearLog
    );
    _cs.Nav.Home.ShowList.Add(_cs.Nav.Clear);
    return _cs;
  }
};
coVDM.App.Components.coConsole.init(coVDM.VDM);
