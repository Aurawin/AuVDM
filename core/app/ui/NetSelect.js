coAppUI.App.Components.NetSelect = {
  Version        : new Version(2014,3,16,34),
  Title          : new Title("Aurawin Network Selector","NetSelect"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/NetSelect.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function (Groups,sName,sClass,Screen,Slides,Owner,Parent,Align){
    var sc=Screen;
    nSel=Slides.createSlide(sName,"sldClient",Screen,Owner,Parent,Align);
    nSel.Groups=new Array();
    nSel.Group=null;
    nSel.Client=nSel.Slides.createSlide("nSelClient","nSelClient",sc,nSel,nSel.Container,coAppUI.Alignment.Client);
    nSel.Client.clearContainerClass();
    nSel.AdjustGroups=null;
    nSel.createGroup=function(DataSet,Caption,Kind){
      var nSel=this;
      var gp=coObject.Create();
      if (DataSet) DataSet.Displays.push(gp);
      gp.Visible=false;
      gp.onSelected=null;
      gp.onShow=null;
      gp.onHide=null;
      gp.onCommand=null;
      gp.onOpenItem=null;
      gp.onOpenPendingRequests=null;
      gp.Class="NetworkListItemGroup";
      gp.Parent=nSel.Client.Container;
      gp.Owner=nSel;
      gp.Kind=Kind;
      gp.createState=function(){
        var gp=this;
        var st=coObject.Create();
        st.Class="State";
        st.Owner=gp;
        st.Expanded=0;
        st.Collapsed=1;
        st.Index=st.Expanded;
        st.setValue=function(value){
          var st=this;
          var gp=st.Owner;
          switch (value){
            case (st.Expanded) : gp.Expand(); break;s
            case (st.Collapsed): gp.Collapse(); break;
          };
        };
        st.Free=function(){
          var st=this;
          st=coObject.Release(st);
          return null;
        };
        return st;
      };
      gp.State=gp.createState();
      gp.DataSet=DataSet;

      gp.Container=document.createElement('div');
      gp.Parent.appendChild(gp.Container);
      gp.Container.className=gp.Class;
      gp.Header=document.createElement('div');
      gp.Container.appendChild(gp.Header);
      gp.Header.className=gp.Class+"Header";

      gp.Indicator=document.createElement('div');
      gp.Header.appendChild(gp.Indicator);
      gp.Indicator.className=gp.Class+"Indc8r";
      gp.Indicator.Owner=gp;

      gp.Icon=document.createElement('div');
      gp.Header.appendChild(gp.Icon);
      gp.Icon.className=gp.Class+"Icon";
      gp.Icon.Owner=gp;
      gp.Icon.style.backgroundImage="url("+coTheme.Icons.Social.Main+")";

      gp.doStateChange=function(e){
        if (e==undefined) e=window.event;
        coDOM.preventDefault(e);
        var src=coDOM.srcElement(e);
        var gp=src.Owner;
        switch (gp.State.Index){
          case (gp.State.Collapsed) :
            gp.Expand();
            break;
          case (gp.State.Expanded) :
            gp.Collapse();
            break;
        };
      };
      gp.Indicator.ontouchstart=gp.doStateChange;
      gp.Indicator.onmousedown=gp.doStateChange;

      gp.Title=document.createElement('div');
      gp.Header.appendChild(gp.Title);
      gp.Title.className=gp.Class+"Title";
      coDOM.setText(gp.Title,Caption);

      gp.Items=nSel.createItems(gp,Kind);
      gp.Expand=function(){
        var gp=this;
        gp.Items.Show();
        gp.Indicator.className="NetworkIndc8rExp";
        gp.State.Index=gp.State.Expanded;
        if (gp.onExpanded) gp.onExpanded(gp);
      };
      gp.Collapse=function(){
        var gp=this;
        gp.Items.Hide();
        gp.Indicator.className="NetworkIndc8rCol";
        gp.State.Index=gp.State.Collapsed;
        if (gp.onCollapsed) gp.onCollapsed(gp);
      };
      gp.Synchronize=function(){
        var sc=this.Owner.Screen;
        sc.Frame.Torus.Show();
        var dbItems=this.DataSet.Items;
        for (var iLcv=0; iLcv<dbItems.length; iLcv++){
          var dbItem=dbItems[iLcv];
          var itm=dbItem.Display.getItem(this);
          if (itm==null) itm=this.Items.createItem(dbItem);
          itm.Show();
          itm.Synchronize(dbItem);
        };
        if (this.onSynchronized) this.onSynchronized(this);
        sc.Frame.Torus.Stop();
      };
      gp.setSize=function(){
        var gp=this;
        gp.Title.style.width=gp.Container.clientWidth - gp.Title.offsetLeft+"px";
        gp.Items.setSize();
      };
      gp.Show=function(){
        var gp=this;
        gp.Visible=true;
        gp.Container.style.display="block";
        gp.Container.style.visibility="visible";
        gp.Indicator.style.visibility="visible";
        gp.Icon.style.visibility="visible";
        gp.Title.style.visibility="visible";
        if (gp.onShow) gp.onShow(gp);
      };
      gp.Hide=function(){
        var gp=this;
        gp.Visible=false;
        gp.Container.style.display="none";
        if (gp.onHide) gp.onHide(gp);
      };
      gp.Free=function(){
        var gp=this;

        var idx=gp.Owner.Groups.indexOf(gp);
        if (idx!=-1) gp.Owner.Groups.splice(idx,1);

        gp.Items.Free();

        gp.Header.removeChild(gp.Indicator);
        gp.Header.removeChild(gp.Title);
        gp.Container.removeChild(gp.Header);
        gp.Parent.removeChild(gp.Container);

        gp=coObject.Release(gp);

        return null;
      };
      nSel.Groups.push(gp);
      gp.Expand();
      return gp;
    };
    nSel.createItems=function(Group,Kind){
      var nSel=this;
      var itms=new Array();

      itms.Parent=Group.Container;
      itms.Kind=Kind;
      itms.Owner=Group;
      itms.Class="NetworkListItems";
      itms.Container=document.createElement('div');
      itms.Parent.appendChild(itms.Container);
      itms.Container.className=itms.Class;
      itms.Container.tabIndex=1;
      itms.Selected=new Array();
      itms.Focused=null;
      itms.itmHandleMargin=null;
      itms.itmHandleBorder=null;
      itms.itmBorder=null;
      itms.itmsPadding=new Padding();
      itms.itmsPadding.Load(itms.Container);
      itms.Clear=function(){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          itm.Free();
        };
      };
      itms.findItem=function(data){
        var itms=this;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          if (itm.Data==data) return itm;
        };
        return null;
      };
      itms.AllowMultiSelect=false;
      itms._createMode=function(){
        var itms=this;
        var md=coObject.Create();
        md.Owner=itms;
        md.Default=0;
        md.Delete=1;
        md.Join=2;
        md.Pending=3;
        md.Value=0;
        md.getCaption=function(Checked){
          var md=this;
          switch (md.Value) {
            case ( md.Delete ) : return (Checked==true) ? coLang.Table.Buttons.Undelete : coLang.Table.Buttons.Delete;
            case ( md.Join ) : return (Checked==true) ? coLang.Table.Buttons.Unselect : coLang.Table.Buttons.Join;
            case ( md.Pending ) : return (Checked==true) ? coLang.Table.Buttons.Pending : coLang.Table.Buttons.Pending;
          };
          return "";
        };
        md.setValue=function(val){
          var md=this;
          var itms=md.Owner;
          switch (val) {
            case ( md.Delete ) :
              md.Value=md.Delete;
              for (var iLcv=0; iLcv<itms.length; iLcv++){
                var itm=itms[iLcv];
                coDOM.setText(itm.Command.Button,coLang.Table.Buttons.Delete);
                itm.Command.Checked=false;
                itm.Command.Show();
              };
              break;
            case ( md.Join ) :
              md.Value=md.Join;
              for (var iLcv=0; iLcv<itms.length; iLcv++){
                var itm=itms[iLcv];
                coDOM.setText(itm.Command.Button,coLang.Table.Buttons.Join);
                itm.Command.Checked=false;
                itm.Command.Show();
              };
              break;
            case ( md.Pending ) :
              md.Value=md.Pending;
              for (var iLcv=0; iLcv<itms.length; iLcv++){
                var itm=itms[iLcv];
                coDOM.setText(itm.Command.Button,coLang.Table.Buttons.Pending);
                itm.Command.Checked=false;
                itm.Command.Show();
              };
              break;
            case (md.Default) :
              md.Value=md.Default;
              for (var iLcv=0; iLcv<itms.length; iLcv++){
                var itm=itms[iLcv];
                itm.Command.Checked=false;
                itm.Command.Hide();
              };
              break;
          };
        };
        return md;
      };
      itms.setSize=function(){
          var itms=this;
          for (var iLcv=0; iLcv<itms.length; iLcv++) {
            var itm=itms[iLcv];
            itm.setSize();
          };
      };
      itms.createItem=function(dbItem){
        var itms=this;
        var Group=itms.Owner;

        var itm=coObject.Create();
        itm.Slide=Group;

        itm.Data=dbItem;
        itm.Owner=itms;
        itm.Parent=itms.Container;
        itm.Class="NetworkListItem";
        itm.Container=document.createElement('div');
        itm.Parent.appendChild(itm.Container);
        itm.Container.className=itm.Class;
        itm.Selected=false;
        itm.Focused=false;
        dbItem.Display.push(itm);

        itm.setSize=function(){
          var itm=this;
          var itms=this.Owner;
          itm.Container.style.width=itms.Container.clientWidth-itms.itmsPadding.xBias()+"px";

          var itms=itm.Owner;
          if (itm.Selected==true) {
            if (!itms.itmHandleMargin) {
              itms.itmHandleMargin=new Margin();
              itms.itmHandleMargin.Load(itm.Handle);
            };
            if (!itms.itmHandleBorder){
              itms.itmHandleBorder=new Border();
              itms.itmHandleBorder.Load(itm.Handle);
            };
            itm.Handle.style.height=itm.Container.clientHeight-(itms.itmHandleMargin.yBias()+itms.itmHandleBorder.yBias()) +"px";
          };
          var xBias=0;
          if (itm.Command.Visible){
            xBias=itm.Command.Container.offsetWidth;
            itm.Command.setSize();
          }
          xBias+=itm.Handle.clientWidth;
          if (itms.itmHandleMargin) xBias+=itms.itmHandleMargin.xBias();
          if (itms.itmBorder) xBias+=itms.itmBorder.xBias();
          itm.Info.Wrapper.style.width=itm.Info.Parent.clientWidth-(itm.Info.Container.offsetLeft + xBias)+"px";
        };
        itm.Hide=function(){
          var itm=this;
          itm.Visible=false;
          itm.Container.style.display="none";
        };
        itm.Show=function(){
          var itm=this;
          var itms=itm.Owner;
          itm.Visible=true;
          itm.Container.style.display="block";
          if (itms.Mode.Value!=itms.Mode.Default) itm.Command.Show();
        };
        itm._createHandle=function(){
            var itm=this;
            var h=document.createElement('div');
            h.Owner=itm;
            h.Parent=itm.Container;
            h.Parent.appendChild(h);
            h.className=itm.Class+"Handle";
            h.Free=function(){
              var h=this;
              h.Parent.removeChild(h);
              h.Owner=null;
              h.Parent=null;
              return null;
            };
            return h;
        };
        itm._createCommand=function(){
          var itm=this;
          var cmd=coObject.Create();
          cmd.Owner=itm;
          cmd.Parent=itm.Container;
          cmd.Class="NetworkListItemCmd";
          cmd.Visible=false;
          cmd.Checked=false;
          cmd.Enabled=true;
          cmd.Container=document.createElement('div');
          cmd.Container.Owner=cmd;
          cmd.Parent.appendChild(cmd.Container);
          cmd.Container.className=cmd.Class;
          cmd.Button=document.createElement('div');
          cmd.Container.appendChild(cmd.Button);
          cmd.Button.className="NetworkListItemCmdBtn";

          cmd.setSize=function(){
            var cmd=this;
            var iHt=cmd.Parent.clientHeight;
            cmd.Container.style.height=iHt+"px";
            cmd.Button.style.marginTop=((iHt/2)-cmd.Button.offsetHeight/2) +"px";
          };
          cmd.Synchronize=function(){
            var cmd=this;
            var itms=cmd.Owner.Owner;
            var mode=itms.Mode;
            cmd.Button.className=(cmd.Checked==true)? cmd.Class + "BtnChecked goldFrame" : cmd.Class + "Btn goldFrame";
            coDOM.setText(cmd.Button,mode.getCaption(cmd.Checked));
          };
          cmd.Container.ontouchstart=function(e){
            if (e==undefined) e=window.event;
            var cmd=this.Owner;
            coDOM.preventDefault(e);
            if (cmd.Enabled!=true) return;
            cmd.Checked=!cmd.Checked;
            cmd.Synchronize();
            if (cmd.Owner.Owner.Owner.onCommand)
              cmd.Owner.Owner.Owner.onCommand(cmd.Owner);
          };
          cmd.Container.onclick=function(e){
            if (e==undefined) e=window.event;
            var cmd=this.Owner;
            coDOM.preventDefault(e);
            if (cmd.Enabled!=true) return;
            cmd.Checked=!cmd.Checked;
            cmd.Synchronize();
            if (cmd.Owner.Owner.Owner.onCommand)
              cmd.Owner.Owner.Owner.onCommand(cmd.Owner);
          };
          cmd.Show=function(){
            var cmd=this;
            cmd.Visible=true;
            cmd.Container.style.visibility="visible";
            cmd.Container.style.display="inline-block";
            cmd.Owner.setSelected(false);
            cmd.Synchronize();
          };
          cmd.Hide=function(){
            var cmd=this;
            cmd.Visible=false;
            cmd.Container.style.visibility="hidden";
            cmd.Container.style.display="none";
          };
          cmd.Free=function(){
            var cmd=this;
            cmd.Container.removeChild(cmd.Button);
            cmd.Parent.removeChild(cmd.Container);
            cmd=coObject.Release(cmd);
            return null;
          };
          return cmd;
        };
        itm._createInfo=function(){
          var itm=this;
          var itms=itm.Owner;

          var inf=coObject.Create();
          inf.Kind=itms.Owner.Kind;
          inf.Owner=itm;
          inf.Parent=itm.Container;
          inf.Class="NetworkListItemInfo";


          inf.Container=document.createElement('div');
          inf.Parent.appendChild(inf.Container);
          inf.Container.className=inf.Class;

          inf.Wrapper=document.createElement('div');
          inf.Container.appendChild(inf.Wrapper);
          inf.Wrapper.className=inf.Class+"Wrap";

          inf.Title=document.createElement('div');
          inf.Wrapper.appendChild(inf.Title);
          inf.Title.className=inf.Class+"Title";

          inf.Description=document.createElement('div');
          inf.Wrapper.appendChild(inf.Description);
          inf.Description.className=inf.Class+"Description";

          inf.Stats=document.createElement('div');
          inf.Wrapper.appendChild(inf.Stats);
          inf.Stats.className=inf.Class+"Stats";


          switch (inf.Kind) {

            case (coSocial.NET_KIND_OWNER) :
              inf.Members=document.createElement('div');
              inf.Stats.appendChild(inf.Members);
              inf.Members.className=inf.Class+"Members";

              inf.MembersLabel=document.createElement('div');
              inf.Members.appendChild(inf.MembersLabel);
              inf.MembersLabel.className=inf.Class+"MembersLabel";
              coDOM.setText(inf.MembersLabel,coLang.Table.Labels.Members);

              inf.Public=document.createElement('div');
              inf.Members.appendChild(inf.Public);
              inf.Public.className=inf.Class+"Public";

              inf.PublicCount=document.createElement('div');
              inf.Public.appendChild(inf.PublicCount);
              inf.PublicCount.className=inf.Class+"PublicCount";

              inf.PublicLabel=document.createElement('div');
              inf.Public.appendChild(inf.PublicLabel);
              inf.PublicLabel.className=inf.Class+"PublicLabel";
              coDOM.setText(inf.PublicLabel,coLang.Table.Apps.Social.Network.Members.Public);

              inf.Private=document.createElement('div');
              inf.Members.appendChild(inf.Private);
              inf.Private.className=inf.Class+"Private";

              inf.PrivateCount=document.createElement('div');
              inf.Private.appendChild(inf.PrivateCount);
              inf.PrivateCount.className=inf.Class+"PrivateCount";

              inf.PrivateLabel=document.createElement('div');
              inf.Private.appendChild(inf.PrivateLabel);
              inf.PrivateLabel.className=inf.Class+"PrivateLabel";
              coDOM.setText(inf.PrivateLabel,coLang.Table.Apps.Social.Network.Members.Private);

              inf.Requests=document.createElement('div');
              inf.Stats.appendChild(inf.Requests);
              inf.Requests.className=inf.Class+"Requests";

              inf.RequestsLabel=document.createElement('div');
              inf.Requests.appendChild(inf.RequestsLabel);
              inf.RequestsLabel.className=inf.Class+"RequestsLabel";
              coDOM.setText(inf.RequestsLabel,coLang.Table.Apps.Social.Network.Requests);

              inf.Pending=document.createElement('div');
              inf.Requests.appendChild(inf.Pending);
              inf.Pending.className=inf.Class+"Pending buttonGradient";
              inf.Pending.Owner=inf;

              inf.PendingCount=document.createElement('div');
              inf.Pending.appendChild(inf.PendingCount);
              inf.PendingCount.className=inf.Class+"PendingCount";
              inf.PendingCount.Owner=inf;

              inf.doOpenPendingRequests=function(e){
                var inf=this.Owner;
                var itm=this.Owner.Owner;
                var gp=itm.Owner.Owner;
                coDOM.preventDefault(e);
                if (gp.onOpenPendingRequests) gp.onOpenPendingRequests(itm);
              };

              inf.PendingLabel=document.createElement('div');
              inf.Pending.appendChild(inf.PendingLabel);
              inf.PendingLabel.className=inf.Class+"PendingLabel";
              inf.PendingLabel.Owner=inf;
              coDOM.setText(inf.PendingLabel,coLang.Table.Apps.Social.Network.Pending);

              inf.Pending.ontouchend=inf.doOpenPendingRequests;
              inf.Pending.onmouseup=inf.doOpenPendingRequests;

              break;
            case (coSocial.NET_KIND_OTHER) :
              inf.Members=document.createElement('div');
              inf.Stats.appendChild(inf.Members);
              inf.Members.className=inf.Class+"Members";

              inf.MembersLabel=document.createElement('div');
              inf.Members.appendChild(inf.MembersLabel);
              inf.MembersLabel.className=inf.Class+"MembersLabel";
              coDOM.setText(inf.MembersLabel,coLang.Table.Labels.Members);


              inf.Count=document.createElement('div');
              inf.Members.appendChild(inf.Count);
              inf.Count.className=inf.Class+"Count";
              break;
          };

          inf.Free=function(){
            var inf=this;

            switch (inf.Kind) {
              case (coSocial.NET_KIND_OWNER):
                inf.Members.removeChild(inf.MembersLabel);

                inf.Private.removeChild(inf.PrivateLabel);
                inf.Private.removeChild(inf.PrivateCount);
                inf.Members.removeChild(inf.Private);

                inf.Public.removeChild(inf.PublicLabel);
                inf.Public.removeChild(inf.PublicCount);
                inf.Members.removeChild(inf.Public);

                inf.Pending.removeChild(inf.PendingLabel);
                inf.Pending.removeChild(inf.PendingCount);


                inf.Requests.removeChild(inf.Pending);
                inf.Requests.removeChild(inf.RequestsLabel);
                inf.Stats.removeChild(inf.Requests);

                break;
              case (coSocial.NET_KIND_OTHER):
                inf.Members.removeChild(inf.Count);
                inf.Members.removeChild(inf.MembersLabel);
                break;
            }
            inf.Stats.removeChild(inf.Members);

            inf.Wrapper.removeChild(inf.Stats);
            inf.Wrapper.removeChild(inf.Description);
            inf.Wrapper.removeChild(inf.Title);

            inf.Container.removeChild(inf.Wrapper);
            inf.Parent.removeChild(inf.Container);

            inf=coObject.Release(inf);
            return null;
          };
          return inf;
        };
        itm._createAvatar=function(){
          var itm=this;
          var av=coObject.Create();
          av.Class="NetworkListItemAvatar";
          av.Parent=itm.Container;
          av.Owner=itm;
          av.Container=document.createElement('div');
          av.Parent.appendChild(av.Container);
          av.Container.className=av.Class;

          av.Image=document.createElement('div');
          av.Container.appendChild(av.Image);
          av.Image.className=av.Class+"Image";

          av.Free=function(){
            var av=this;

            av.Container.removeChild(av.Image);

            av.Parent.removeChild(av.Container);

            av=coObject.Release(av);
            return null;
          };
          return av;
        };
        itm.Synchronize=function(dbItem){
          var itm=this;
          if (dbItem.Verified==true) {
              var sURI=(dbItem.MAP.AvatarID.Value!=0) ? coAvatar.URI_AVATAR.replace("$id",dbItem.MAP.AvatarID.Value) : "";
              coDOM.setText(itm.Info.Title,dbItem.MAP.Title.Value);
              coDOM.setText(itm.Info.Description,dbItem.MAP.Description.Value);
              switch (itm.Info.Kind){
                case (coSocial.NET_KIND_OWNER) :
                  coDOM.setText(itm.Info.PublicCount,dbItem.MAP.PubMembers.Value.length);
                  coDOM.setText(itm.Info.PrivateCount,dbItem.MAP.PriMembers.Value.length);
                  coDOM.setText(itm.Info.PendingCount,dbItem.MAP.RequestCount.Value);
                  break;
                case (coSocial.NET_KIND_OTHER) :
                  coDOM.setText(itm.Info.Count,dbItem.MAP.MemberCount.Value);
                  break;
              };
              var st=itm.Avatar.Image.style;
              if (sURI.length>0){
                st.backgroundImage="url("+sURI+")";
              } else {
                st.backgroundImage="";
              };
              itm.Avatar.url=sURI;
              itm.Data=dbItem;
          } else {
              // item has been deleted from collection
              itm.Free();
          };
        };
        itm.setSelected=function(val){
          var itm=this;
          var itms=itm.Owner;
          var gp=itms.Owner;
          var nSel=gp.Owner;
          itm.Handle.className=(val==true) ? itm.Class+"HandleSel" + " purpleFrame" : itm.Class+"Handle";
          itm.setSize();
          itm.Selected=(val==true);
          if (nSel.Group!=gp) {
            nSel.Group=gp;
            if (gp.onSelected) gp.onSelected(gp);
          };
          if (val==true){
            if (itms.AllowMultiSelect==true){
                var idx=itms.Selected.indexOf(itm);
                if (idx==-1) itms.Selected.push(itm);
            } else {
                for (var iLcv=0; iLcv<itms.Selected.length; iLcv++){
                  var itmSel=itms.Selected[iLcv];
                  if (itmSel!=itm) {
                    itmSel.Handle.className=itm.Class+"Handle";
                    itmSel.Selected=false;
                  };
                };
              itms.Selected.length=1;
              itms.Selected[0]=itm;
            };
            if (gp.onSelectItem) gp.onSelectItem(itm);
          } else {
              var idx=itms.Selected.indexOf(itm);
              if (idx!=-1) itms.Selected.splice(idx,1);
          };
        };
        itm.setFocused=function(val){
          var itm=this;
          var itms=itm.Owner;
          if ((itms.Focused) && (itms.Focused!=itm)) itms.Focused.setFocused(false);
          itms.Focused=itm;
          itm.Container.className=(val==true) ? itm.Class+"Focused purpleFrame" : itm.Class;
          itm.Focused=(val==true);
          if (val==true){
            if ((!itms.itmBorder) && (itms.Focused) ) {
              itms.itmBorder=new Border();
              itms.itmBorder.Load(itms.Focused.Container);
            };
            itm.setSize();
          };
        };
        itm.Free=function(){
          var itm=this;
          var itms=itm.Owner;

          if (itms.Focused==itm) itms.Focused=null;

          var idx=itms.Selected.indexOf(itm);
          if (idx!=-1) itms.Selected.splice(idx,1);

          var idx=itm.Owner.indexOf(itm);
          if (idx!=-1) itm.Owner.splice(idx,1);

          itm.Container.EventList.Free();
          itm.Handle.Free();
          itm.Command.Free();
          itm.Info.Free();
          itm.Avatar.Free();

          itm.Parent.removeChild(itm.Container);

          itm=coObject.Release(itm);
          return null;
        };
        itm.doClick=function(e){
          var itm=this;
          var itms=itm.Owner;
          if (itms.AllowMultiSelect==true) {
            itm.setSelected( ((!itm.Command.Visible) && (!itm.Selected)));
          } else {
            itm.setSelected(true);
          };
          itm.setFocused(true);
        };
        itm.doDoubleClick=function(e){
          var itm=this;
          var gp=itm.Owner.Owner;
          if (gp.onOpenItem) gp.onOpenItem(itm);
        };
        coEvents.Add(itm.Container,"touchstart",function(e){itm.doClick(e);},coEvents.NoCapture,coEvents.Activate);
        coEvents.Add(itm.Container,"mousedown" ,function(e){if (coDOM.getButton(e)!=1) return; itm.doClick(e);},coEvents.NoCapture,coEvents.Activate);
        itm.evtDoubleClick=coEvents.Add(itm.Container,"dblclick",function(e){itm.doDoubleClick(e);},coEvents.Capture,coEvents.Active);

        itm.Avatar  = itm._createAvatar();
        itm.Info    = itm._createInfo();
        itm.Command = itm._createCommand();
        itm.Handle  = itm._createHandle();

        itms.push(itm);

        return itm;
      };
      itms.Show=function(){
        var itms=this;
        itms.Visible=true;
        itms.Container.style.visibility="visible";
        itms.Container.style.display="block";
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          itm.Show();
        };
      };
      itms.Hide=function(){
        var itms=this;
        itms.Visible=true;
        itms.Container.style.visibility="hidden";
        itms.Container.style.display="none";
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var itm=itms[iLcv];
          itm.Hide();
        };
      };
      itms.Mode=itms._createMode();
      return itms;
    };
    nSel.onResize=function(){
      nSel=this;
      for (var iLcv=0; iLcv<nSel.Groups.length; iLcv++){
        var gp=nSel.Groups[iLcv];
        gp.setSize();
      };
    };
    nSel.onShow=function(){
      var nSel=this;
      for (var iLcv=0; iLcv<nSel.Groups.length; iLcv++){
        var gp=nSel.Groups[iLcv];
        gp.Show();
        gp.Synchronize();
      };
    };
    nSel.onHide=function(){
      var nSel=this;
      for (var iLcv=0; iLcv<nSel.Groups.length; iLcv++){
        var gp=nSel.Groups[iLcv];
        gp.Hide();
      };
    };
    if (Groups.indexOf(coSocial.NET_GROUP_MY)!=-1)
      nSel.My=nSel.createGroup(coSocial.Networks,coLang.Table.Apps.Social.Networks.My,coSocial.NET_KIND_OWNER);
    if (Groups.indexOf(coSocial.NET_GROUP_OTHER)!=-1)
      nSel.Other=nSel.createGroup(coSocial.Connections.Networks,coLang.Table.Apps.Social.Networks.Other,coSocial.NET_KIND_OTHER);
    if (Groups.indexOf(coSocial.NET_GROUP_RESULTS)!=-1)
      nSel.Group=nSel.createGroup(coDB.NoDataSet,coLang.Table.Apps.Social.Networks.Search.Group,coSocial.NET_KIND_OTHER);

    return nSel;
  }
}

