coVDM.App.Components.coAppScreen = {
  Version        : new Version(2014,8,22,53),
  Title          : new Title("Aurawin Launcher Screen","AppScreen"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Unit           : '/core/vdm/coAppScreen.js',
  debugToConsole : true,
  VDM            : null,
  init           : function(){
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
    this.App.Unit=this;
    this.App.Initialized=true;
    this.App.deferInit=function(App){
      return (
         ((coVDM.App.Components)!=undefined) &&
         ((coVDM.App.Components.Groups)!=undefined)
      );
    };

    return this;
  },
  onInitialized : function(App){
    coVDM.VDM.Applications=App.Unit.Create(App.Unit.VDM);
    App.Loaded=true;
  },
  Create:function(){
    var _as=coAppScreens.createScreen(
      coVDM.VDM,
      "ApplicationsScreen",
      "System",
      "Applications",
      "Applications",
      "/core/vdm/imgs/apps/apps.png",
      1,
      1,
      coAppUI.Frameless
    );
    _as.Unit=this;
    _as.Frame.zIndexFactor=coVDM.zFactorApps;
    _as.iconInApplications=false;
    _as.iconInTaskList=false;
    _as.State=coApp.State.Full;

    _as.Description="";
    _as.AllowFullScreen=true;
    _as.onShow=function() {
      var as=this;
      if (coVDM.debugToConsole==true)
        coVDM.VDM.Console.Append("ApplicationsScreen.onShow");
      as.ilvApps.Items.Clear();
      as.ilvApps.Show();
      var mfst=coVDM.Manifest;
      if ( (mfst.AppScreen.Mode.Value==coLang.Table.Labels.Apps) || (as.ilvApps.Tasks.Items.length==0) ) {
        as.ilvApps.Tabs.setModeToApps();
      } else { // tasks
        as.ilvApps.Tabs.setModeToTasks();
      };
    };
    _as.onHide=function(){
      if (coVDM.debugToConsole==true)
        coVDM.VDM.Console.Append("ApplicationsScreen.onHide");
      var as=this;
      coVDM.VDM.Screens.DodgeButton();
    };
    _as._createAppView=function(){
      var as=this;
      var ilv=coAppUI.App.Components.IconListView.Create("AppIconsSlide","Applications",as,as.Slides,as.Frame,as.Frame.Client,coAppUI.Alignment.Client);
      ilv.clearContainerClass();
      ilv.Title.Close=document.createElement('div');
      ilv.Title.Container.appendChild(ilv.Title.Close);
      ilv.Title.Close.className="btnAppClose redGradient";
      coTheme.Apps.Launcher.CloseButton.Apply(ilv.Title.Close);
      ilv.Title.Close.onclick=function(){
        coVDM.VDM.Applications.Conseal();
      };
      ilv.Title.Logout=document.createElement('div');
      ilv.Title.Container.appendChild(ilv.Title.Logout);
      ilv.Title.Logout.className="btnAppClose redGradient";
      coTheme.Apps.Launcher.LogoutButton.Apply(ilv.Title.Logout);
      ilv.Title.Logout.onclick=function(){
        coVDM.VDM.LogOut();
      };

      ilv.Mode.setValue(ilv.Mode.Values.Medium);
      ilv.oneActExecute=true;
      ilv.Window.Margin.Top=0;
      ilv._createTaskWindow=function(){
        var ilv=this;
        var tabs=ilv.Tabs;

        var tw=coObject.Create();
        tw.Tabs=tabs;
        tw.Owner=ilv;
        tw.Visible=false;
        tw.Class="ilvTaskWindow";

        tw.Items=new Array();
        tw.Items.Loading=false;

        tw.Parent=ilv.Window.Container;

        tw.Container=document.createElement('div');
        tw.Parent.appendChild(tw.Container);
        tw.Container.className=ilv.Name+tw.Class+" " + tw.Class;
        tw.touchLocked=false;
        tw.Collection=document.createElement('div');
        tw.Container.appendChild(tw.Collection);
        tw.Collection.className="ilvTaskCollection";
        tw._createGroups=function(){
          var tw=this;
          var ilv=tw.Owner;
          var gps=coObject.Create();
          gps.Loading=false;
          gps.Class="ilvTaskGroups";
          gps.Visible=false;
          gps.Parent=tw.Container;
          gps.Container=document.createElement('div');
          gps.Parent.appendChild(gps.Container);
          gps.Container.className="ilvTaskGroups";

          gps.List=new Array();
          gps._createGroup=function(sCaption){
            if (sCaption==undefined) sCaption=coLang.Table.Labels.New+" "+coLang.Table.Groups.Group;
            var gps=this;
            var gp=coObject.Create();
            gps.List.push(gp);
            gp.Class="ilvTaskGroup";
            gp.Verified=false;
            gp.Visible=false;
            gp.Owner=gps;
            gp.Parent=gps.Container;

            gp.Container=document.createElement('div');
            gp.Parent.appendChild(gp.Container);
            gp.Container.className=gp.Class;
            coDOM.setText(gp.Container,sCaption);

            gp.Show=function(){
              var gp=this;
              gp.Visible=true;
              gp.Container.style.display="block";
            };
            gp.Hide=function(){
              var gp=this;
              gp.Visible=false;
              gp.Container.style.display="none";
            };

            gp.Free=function(){
              var gp=this;
              var gps=gp.Owner;
              gp.Parent.removeChild(gp.Container);
              if (gps.Loading==false) {
                var idx=gps.List.indexOf(gp);
                if (idx!=-1)
                  gps.List.splice(idx,1);
              };
              gp=coObject.Release(gp);
              return null;
            };
            return gp;
          };
          gps.Refresh=function(){
            var gps=this;
            var as=_as;
            gps.Loading=true;
            // Deleted and Existing Items
            for (var iLcv=0; iLcv<gps.List.length; iLcv++){
              var gp=gps.List[iLcv];
              gp.Verified=false;
              var dbItem=as.Groups.DB.getItem(as.Groups.DB.Fields.Name,coDOM.getText(gp.Container));
              if (dbItem==null) {
                gps.List[iLcv]=gp.Free();
              } else{
                gp.Verified=true;
                coDOM.setText(gp.Container,dbItem.getValue(as.Groups.DB.Fields.Name));
              };
            };
            // Items In DB but not displayed
            for (var iLcv=0; iLcv<as.Groups.DB.Items.length; iLcv++) {
              var sName=as.Groups.DB.Items[iLcv].getValue(as.Groups.DB.Fields.Name);
              var gp=gps.getItem(sName);
              if (gp==null) {
                gp=gps._createGroup(sName);
                gp.Verified=true;
              };
            };
            gps.Loading=false;
            coList.Pack(gps.List);
          };
          gps.getItem=function(sCaption){
            var gps=this;
            for (var iLcv=0; iLcv<gps.List.length; iLcv++){
              var gp=gps.List[iLcv];
              if (gp.Container.innerHTML==sCaption)
                return gp;
            };
            return null;
          };
          gps.Show=function(){
            var gps=this;
            gps.Refresh();
            gps.Visible=true;
            gps.Container.style.display="block";
            for (var iLcv=0; iLcv<gps.List.length; iLcv++){
              var gp=gps.List[iLcv];
              gp.Show();
            };
          };
          gps.Hide=function(){
            var gps=this;
            gps.Visible=false;
            gps.Container.style.display="none";
            for (var iLcv=0; iLcv<gps.List.length; iLcv++){
              var gp=gps.List[iLcv];
              gp.Hide();
            };
          };

          gps.Clear=function(){
            var gps=this;
            gps.Loading=true;
            for (var iLcv=0; iLcv<gps.List.length; iLcv++){
              var gp=gps.List[iLcv];
              gp.Free();
            };
            gps.List.length=0;
            gps.Loading=false;
          };
          gps.Free=function(){
            var gps=this;
            gps.Clear();
            gps.Parent.removeChild(gps.Container);
            gps=coObject.Release(gps);
            return null;
          };
          return gps;
        };
        //tw.Groups=tw._createGroups();
        tw.Resize=function(){
          var tw=this;
          for (var iLcv=0; iLcv<tw.Items.length; iLcv++){
            var tsk=tw.Items[iLcv];
            tsk.Resize();
          };
        };
        tw.Hide=function(){
          var tw=this;
          tw.Visible=false;
          tw.Container.style.display="none";
          tw.Collection.style.display="none";
          //tw.Groups.Hide();
          for (var iLcv=0; iLcv<tw.Items.length; iLcv++){
            var tsk=tw.Items[iLcv];
            tsk.Hide();
          };
        };
        tw.Show=function(){
          var tw=this;
          tw.Container.style.display="block";
          tw.Collection.style.display="block";
          //tw.Groups.Show();
          tw.Visible=true;
          for (var iLcv=0; iLcv<tw.Items.length; iLcv++){
            var tsk=tw.Items[iLcv];
            tsk.Show();
          };
        };
        tw.Clear=function(){
          var tw=this;
          tw.Items.Loading=true;
          for (var iLcv=0; iLcv<tw.Items.length; iLcv++){
            var itm=tw.Items[iLcv];
            itm.Free();
          };
          tw.Items.Loading=false;
          tw.Items.length=0;
        };
        tw.Add=function(app){
          return this._createTaskItem(app);
        };
        tw.Free=function(){
          var tw=this;
          tw.Clear();
          //tw.Container.removeChild(tw.Groups);
          tw.Container.removeChild(tw.Collection);
          tw.Parent.removeChild(tw.Container);
          tw=coObject.Release();
          return null;
        };
        tw._createTaskItem=function(app){
          var tw=this;
          var ilv=tw.Owner;
          var tskItem=coObject.Create();
          tw.Items.push(tskItem);

          tskItem.App=app;
          tskItem.Owner=tw;
          tskItem.Parent=tw.Collection;
          tskItem.Class="ilvTaskItem";
          tskItem.Container=document.createElement('div');
          tskItem.Parent.appendChild(tskItem.Container);
          tskItem.Container.className=tskItem.Class;
          tskItem.Container.Owner=tskItem;

          tskItem.doOpen=function(){
            var tskItem=this;
            var idx=tskItem.Owner.Items.indexOf(tskItem);
            tskItem.Owner.Items.splice(idx,1);
            tskItem.Owner.Items.splice(0,1,tskItem);
            tskItem.Parent.insertBefore(tskItem.Container,tskItem.Parent.firstChild);

            if (tskItem.App) tskItem.App.Reveal();
            coVDM.VDM.Applications.Conseal();
          };
          tskItem.Container.onclick=function(e){
            if (e==undefined) e=window.event;
            coDOM.preventDefault(e);
            this.Owner.doOpen();
          };
          tskItem.Container.ontouchstart=function(e){
            if (e==undefined) e=window.event;
            coDOM.preventDefault(e);
            this.Owner.Owner.touchLocked=false;
            coEvents.ScrollLock.Lock(coVDM.ListItemScrollDelay);
          };
          tskItem.Container.ontouchmove=function(e){
            if (e==undefined) e=window.event;
            coDOM.preventDefault(e);
            coEvents.ScrollLock.Unlock();
            this.Owner.Owner.touchLocked=false;

          };
          tskItem.Container.ontouchend=function(e){
            if (e==undefined) e=window.event;
            if (this.Owner.Owner.touchLocked==true) return;
            coDOM.preventDefault(e);
            this.Owner.Owner.touchLocked=false;
            this.Owner.doOpen();
          };

          tskItem.Button=document.createElement('div');
          tskItem.Container.appendChild(tskItem.Button);
          tskItem.Button.className=tskItem.Class+"Btn btnAppClose redGradient";
          coTheme.Apps.Launcher.Task.CloseButton.Apply(tskItem.Button);
          tskItem.Button.Owner=tskItem;
          tskItem.Button.onclick=function(e){
            if (e==undefined) e=window.event;
            coDOM.preventDefault(e);

            var btn=e.srcElement;
            var tskItem=btn.Owner;
            if (tskItem.App) tskItem.App.Hide();
            tskItem.Free();
          };
          tskItem.Button.ontouchstart=function(e){
            if (e==undefined) e=window.event;
            coDOM.preventDefault(e);
          };
          tskItem.Button.ontouchend=function(e){
            if (e==undefined) e=window.event;
            coDOM.preventDefault(e);
            var btn=e.srcElement;
            var tskItem=btn.Owner;
            if (tskItem.App) tskItem.App.Hide();
            tskItem.Free();
          };
          tskItem._createIcon=function(){
            var tskItem=this;
            var ico=coObject.Create();
            ico.Visible=false;
            ico.Class=tskItem.Class+"Icon";
            ico.Parent=tskItem.Container;

            ico.Container=document.createElement('div');
            ico.Parent.appendChild(ico.Container);
            ico.Container.className=ico.Class;
            ico.Container.style.backgroundImage="url("+tskItem.App.Icon+")";

            ico.Show=function(){
              var ico=this;
              ico.Visible=true;
              ico.Container.style.display="table-cell";
            };
            ico.Hide=function(){
              var ico=this;
              ico.Visible=false;
              ico.Container.style.display="none";
            };
            ico.Free=function(){
              var ico=this;
              ico.Parent.removeChild(ico.Container);
              ico=coObject.Release(ico);
              return null;
            };
            return ico;
          };
          tskItem._createInfo=function(){
            var tskItem=this;
            var inf=new coObject.Create();
            inf.Owner=tskItem;
            inf.Visible=false;
            inf.Class=tskItem.Class+"Info";
            inf.Parent=tskItem.Container;

            inf.Container=document.createElement('div');
            inf.Parent.appendChild(inf.Container);
            inf.Container.className=inf.Class;

            inf.Name=document.createElement('div');
            inf.Container.appendChild(inf.Name);
            inf.Name.className=inf.Class+"Name";
            coDOM.setText(inf.Name,tskItem.App.Name);

            inf.Description=document.createElement('div');
            inf.Container.appendChild(inf.Description);
            inf.Description.className=inf.Class+"Dscrptn";
            coDOM.setText(inf.Description,tskItem.App.Description);

            inf.Status=document.createElement('div');
            inf.Container.appendChild(inf.Status);
            inf.Status.className=inf.Class+"Status";
            inf.Status.innerHTML=tskItem.App.Status;

            inf.Show=function(){
              var inf=this;
              inf.Visible=true;
              inf.Container.style.display="table-cell";
              inf.Name.style.display="block";
              inf.Description.style.display="block";
              //inf.Description.style.width=inf.offsetLe
              inf.Status.style.display="block";
              inf.Status.innerHTML=inf.Owner.App.Status;
            };
            inf.Update=function(){
              var inf=this;
              inf.Status.innerHTML=inf.Owner.App.Status;
            };
            inf.Hide=function(){
              var inf=this;
              inf.Visible=false;
              inf.Container.style.display="none";
              inf.Name.style.display="none";
              inf.Description.style.display="none";
              inf.Status.style.display="none";
            };
            inf.Free=function(){
              var inf=this;
              inf.Container.removeChild(inf.Description);
              inf.Container.removeChild(inf.Name);
              inf.Container.removeChild(inf.Status);
              inf.Parent.removeChild(inf.Container);
              inf=coObject.Release(inf);
              return null;
            };

            return inf;
          };
          tskItem.Show=function(){
            var tskItem=this;
            tskItem.Visible=true;
            tskItem.Container.style.display="block";
            tskItem.Button.style.display="block";
            tskItem.Icon.Show();
            tskItem.Info.Show();
          };
          tskItem.Update=function(){
            var tskItem=this;
            tskItem.Info.Update();
          };
          tskItem.Hide=function(){
            var tskItem=this;
            tskItem.Visible=false;
            tskItem.Container.style.display="none";
            tskItem.Button.style.display="none";
            tskItem.Icon.Hide();
            tskItem.Info.Hide();
          };
          tskItem.Free=function(){
            var tskItem=this;
            tskItem.App.TaskItem=null;
            tskItem.Icon.Free();
            tskItem.Info.Free();

            tskItem.Container.removeChild(tskItem.Button);
            tskItem.Parent.removeChild(tskItem.Container);

            if (tskItem.Owner.Items.Loading==false) {
              var idx=tskItem.Owner.Items.indexOf(tskItem);
              if (idx!=-1) tskItem.Owner.Items.splice(idx,1);
            };
            tskItem=coObject.Release(tskItem);
            return null;
          };
          tskItem.Resize=function(){
            var tskItem=this;
            var iWidth=tskItem.Container.clientWidth-tskItem.Info.Container.offsetLeft;
            tskItem.Button.style.right=iWidth+"px";
            tskItem.Info.Name.style.width=iWidth+"px";
            tskItem.Info.Description.style.width=iWidth + "px";
          };
          tskItem.Icon=tskItem._createIcon();
          tskItem.Info=tskItem._createInfo();
          return tskItem;
        };
        return tw;
      };
      ilv._createILVTabs=function(){
        var ilv=this;
        var as=ilv.Owner;
        var tabs=coObject.Create();
        tabs.Owner=ilv;
        tabs.Class="IconListTabs";
        tabs.Container=document.createElement('div');
        tabs.Parent=ilv.Title.Container;
        tabs.Parent.appendChild(tabs.Container);
        tabs.Container.className=tabs.Class;
        tabs.Apps=document.createElement('div');
        tabs.Container.appendChild(tabs.Apps);
        tabs.Apps.className="IconListTab";
        tabs.Tasks=document.createElement('div');
        tabs.Container.appendChild(tabs.Tasks);
        tabs.Tasks.className="IconListTab";
        coDOM.setText(tabs.Apps,coLang.Table.Tasks.Available)
        coDOM.setText(tabs.Tasks,coLang.Table.Tasks.Opened);
        coTheme.Apps.Launcher.Task.Switcher.Tabs.Apply(tabs);
        $(tabs.Apps).mouseenter(
          function(){
            $(this).css('color',coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Hover.Color.toString());
            $(this).css('background-color',coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Hover.BackgroundColor.toString());
          }
        );
        $(tabs.Apps).mouseleave(
          function(){ coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Apply(this,this.State)}
        );
        $(tabs.Tasks).mouseenter(
          function(){
            $(this).css('color',coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Hover.Color.toString());
            $(this).css('background-color',coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Hover.BackgroundColor.toString());
          }
        );
        $(tabs.Tasks).mouseleave(
          function(){ coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Apply(this,this.State)}
        );

        tabs.setModeToTasks=function(){
          var tabs=this;
          var ilv=tabs.Owner;
          var as=ilv.Screen;
          ilv.Items.Clear();
          coVDM.VDM.WorkSpace.Button.setCollapsed();

          coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Apply(tabs.Apps,0);
          coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Apply(tabs.Tasks,1);

          coVDM.VDM.WorkSpace.Button.setCaption(coLang.Table.Apps.VDM.Switch);
          coVDM.Manifest.AppScreen.Mode.Value=coLang.Table.Labels.Tasks;
          coVDM.Manifest.Save();
          coDOM.setText(ilv.Title.Caption,coLang.Table.Tasks.Description);
          var iOffset=coVDM.VDM.WorkSpace.Button.Container.offsetWidth;
          ilv.Title.Caption.style.marginLeft=coVDM.VDM.WorkSpace.Button.Container.offsetWidth+"px";
          ilv.Title.Caption.style.marginRight=(ilv.Title.Container.clientWidth-(iOffset+ilv.Title.Logout.offsetLeft))+"px";
          ilv.Tasks.Show();
          var apps=coVDM.VDM.Screens.getRunningApps();
          for (var iLcv=0; iLcv<apps.length; iLcv++) {
            var app=apps[iLcv];
            if (app.iconInTaskList==true) {
              var tskItem=app.TaskItem;
              if (!tskItem)
                app.TaskItem=tskItem=ilv.Tasks.Add(apps[iLcv]);
              if (ilv.Visible)
                tskItem.Show();
            };
          };
          apps.Free();
          ilv.setSize();
        };
        tabs.setModeToApps=function(){
          var tabs=this;
          var ilv=tabs.Owner;
          var as=ilv.Screen;
          coVDM.VDM.WorkSpace.Button.setCollapsed();

          ilv.Tasks.Hide();
          ilv.Items.Clear();

          coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Apply(tabs.Apps,1);
          coTheme.Apps.Launcher.Task.Switcher.Tabs.Tab.Apply(tabs.Tasks,0);

          coVDM.VDM.WorkSpace.Button.setCaption(coLang.Table.Apps.VDM.Applications);
          coVDM.Manifest.AppScreen.Mode.Value=coLang.Table.Labels.Apps;
          coVDM.Manifest.Save();
          coDOM.setText(ilv.Title.Caption,coLang.Table.Groups.All.Description);
          var iOffset=coVDM.VDM.WorkSpace.Button.Container.offsetWidth;
          ilv.Title.Caption.style.marginLeft=iOffset+"px";
          ilv.Title.Caption.style.marginRight=(ilv.Title.Container.clientWidth-(iOffset+ilv.Title.Logout.offsetLeft))+"px";

          var apps=coVDM.VDM.Screens.List;
          apps.sort(coList.SortBy('Name',true,function(a){return a.toUpperCase()}));
          for (var iLcv=0; iLcv<apps.length; iLcv++){
            var app=apps[iLcv];
            if (app.iconInApplications==true) {
              var itm=ilv.Items.createItem(app.Name,app.Icon,app);
              coDOM.setText(itm.Caption,app.Name);
              itm.Indicator.setValue(app.iconIndicator);
              if (app.iconIndicator>0) {
                itm.Indicator.Reveal();
              } else {
                itm.Indicator.Conseal();
              };
              itm.onDoubleClick=function(itm){
                var app=itm.Data;
                app.Reveal();
                coVDM.VDM.Applications.Conseal();
              };
              if (ilv.Visible==true)
                itm.Show();
            };
          };
          ilv.setSize();
        };
        tabs._doAppsClick=function(e){
          coDOM.preventDefault(e);
          tabs.setModeToApps();
        };
        tabs._doTasksClick=function(e){
          coDOM.preventDefault(e);
          tabs.setModeToTasks();
        };
        tabs._doAppsTouchStart=function(e){
          coDOM.preventDefault(e);
          tabs.evtAppsClick.setActive(false);
        };
        tabs._doAppsTouchEnd=function(e){
          coDOM.preventDefault(e);
          tabs.setModeToApps();
          tabs.evtAppsClick.setActive(true);
        };
        tabs._doTasksTouchStart=function(e){
          coDOM.preventDefault(e);
          tabs.evtTasksClick.setActive(false);
        };
        tabs._doTasksTouchEnd=function(e){
          coDOM.preventDefault(e);
          tabs.setModeToTasks();
          tabs.evtTasksClick.setActive(true);
        };
        tabs.evtAppsClick=coEvents.Add(tabs.Apps,"click",tabs._doAppsClick,coEvents.Capture,coEvents.Active);
        tabs.evtAppsDoTouchStart=coEvents.Add(tabs.Apps,"touchstart",tabs._doAppsTouchStart,coEvents.Capture,coEvents.Active);
        tabs.evtAppsDoTouchEnd=coEvents.Add(tabs.Apps,"touchend",tabs._doAppsTouchEnd,coEvents.Capture,coEvents.Active);
        tabs.evtTasksClick=coEvents.Add(tabs.Tasks,"click",tabs._doTasksClick,coEvents.Capture,coEvents.Active);
        tabs.evtTasksDoTouchStart=coEvents.Add(tabs.Tasks,"touchstart",tabs._doTasksTouchStart,coEvents.Capture,coEvents.Active);
        tabs.evtTaskssDoTouchEnd=coEvents.Add(tabs.Tasks,"touchend",tabs._doTasksTouchEnd,coEvents.Capture,coEvents.Active);
        tabs.Free=function(){
          var tabs=this;

          tabs.Apps.EventList.Free();
          tabs.Tasks.EventList.Free();
          tabs.Container.removeChild(tabs.Apps);
          tabs.Container.removeChild(tabs.Tasks);
          tabs.Parent.removeChild(tabs.Container);

          tabs=Release(tabs);
          return null;
        };
        return tabs;

      };
      ilv.Tabs=ilv._createILVTabs();
      ilv.Tasks=ilv._createTaskWindow();

      return ilv;
    };
    _as.onManifestUpdated=function(col){
      var as=_as;
      as.Loading=true;
      var mfst=coVDM.Manifest;
      /*
      mfst.AppScreen.Mode.Value.length
      mfst.AppScreen.Group.Value.length

      */
      as.Loading=false;
    };
    _as.Groups=coVDM.App.Components.Groups.Create();

    // Manifest entry for saving/loading
    var mfst=coVDM.Manifest;
    var dbItem=mfst.AppScreen=mfst.addEntry("AppScreen","app-screen-selections",_as.onManifestUpdated);
    mfst.AppScreen.Mode=dbItem.addField("Mode",coDB.Kind.String,"mode",coLang.Table.Modes.Applications,coDB.StreamOn);
    mfst.AppScreen.Group=dbItem.addField("Group",coDB.Kind.String,"group",coLang.Table.Groups.Main.Name,coDB.StreamOn);

    _as.onMenuItemGroupSelect=function(mnuItem){
      var as=_as;
      var mfst=coVDM.Manifest;

      sGroup=mfst.AppScreen.Group.Value=coApp.getText(mnuItem.Caption);
      coVDM.Manifest.Save();

      var gp=mnuItem.Data;
      var ilv=as.ilvApps;
      ilv.Items.Clear();

      coDOM.setText(ilv.Title.Caption,sGroup);
      coDOM.setText(ilv.Title.Description,gp.getValue(as.Groups.DB.Fields.Description));
      ilv.setSize();
      var apps=coVDM.VDM.Screens.getAppsByGroup(sGroup);
      for (var iLcv=0; iLcv<apps.length; iLcv++){
        var app=apps[iLcv];
        if (app.iconInApplications==true) {
          var itm=ilv.Items.createItem(app.Name,app.Icon,app);
          coDOM.setText(itm.Caption,app.Name);
          itm.onDoubleClick=function(itm){
            var app=itm.Data;
            app.Reveal();
            coVDM.VDM.Applications.Conseal();
          };
          if (ilv.Visible==true)
            itm.Show();
        }
      };
      apps.Free();
    };
    _as.kplGroups=coAppUI.App.Components.KPList.Create("AppGroupsSlide","Application Groups",_as,_as.Slides,_as.Frame,_as.Frame.Client,["Name","Value"],_as.onGroupItemAdded,_as.onGroupItemDeleted);
    _as.ilvApps=_as._createAppView();

    _as.onAppDeleteCancel=function(){
    };
    _as.onAppDeleteConfirm=function(){
    };
    _as.onAppMoveClick=function(){
    };
    _as.onAppMoveConfirm=function(){
    };
    _as.onAppMoveCancel=function(){
    };
    _as.onGroupItemAdded=function(itm){
      var as=_as;
      var gi=as.Groups.addItem();
      gi.setValue(as.Groups.Fields.Name,coApp.getText(itm.Name));
      gi.setValue(as.Groups.Fields.Description,coApp.getText(itm.Value));
      var cmdAdd=coVDM.VDM.Net.Commands.createCommand(
        coVDM.VDM.Net,
        coVDM.NameSpace,
        coVDM.NS_GRPS_ADD,
        coXML.Header+gi.toXML(),
        _as.Groups.onGroupAddComplete,
        _as.Groups.onGroupAddError,
        _as.Groups.onGroupAddTimeOut,
        coNet.NoProgress,
        coNet.CreateAndRun,
        coNet.FreeOnComplete
      );
      cmdAdd.Data=gi;
    };
    _as.doHide=function(){
      var as=this;
      as.ilvApps.Conseal();
    };
    _as.doShow=function(){
      var as=this;
      as.ilvApps.Reveal();
    };
    _as.onGroupsNewClick=function(){
      var as=_as;
      var Prompt=as.kplGroups.Prompt;
      Prompt.setMode(Prompt.Mode.New);
    };
    return _as;
  }
};
coVDM.App.Components.coAppScreen.init();
