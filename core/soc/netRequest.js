coSocial.App.Components.netRequest = {
  Version        : new Version(2013,5,18,6),
  Title          : new Title("Social Network Request","netRequest"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/netRequest.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,Owner){
    var ns=Owner;
    var sc=Screen;
    var rs=ns.Slides.createSlide("Requests","sldClient",sc,ns,ns.Container,coAppUI.Alignment.Client);
    rs.Hidden=true;
    rs.Requests=coSocial.App.Components.DB.createRequests();
    rs.Requests.Displays.push(rs);
    rs.createItems=function(){
        var rs=this;
        var itms=new Array();
        itms.Class="NetworkRequests";
        itms.Owner=rs;
        itms.Parent=rs.Container;

        itms.Container=document.createElement('div');
        itms.Parent.appendChild(itms.Container);
        itms.Container.className=itms.Class;

        itms.createItem=function(){
          var itms=this;
          var rs=itms.Owner;

          var itm=coObject.Create();
          itm.Parent=itms.Container;
          itm.Owner=itms;
          itm.Slide=rs;
          itm.Data=null;
          itm.Member=null;

          itm.Class="NetworkRequest";
          itm.Container=document.createElement('div');
          itm.Parent.appendChild(itm.Container);
          itm.Container.className=itm.Class;

          itm.createInfo=function(){
            var itm=this;
            var inf=coObject.Create();
            inf.Owner=itm;
            inf.Parent=itm.Container;
            inf.Class=itm.Class+"Info";

            inf.Container=document.createElement('div');
            inf.Parent.appendChild(inf.Container);
            inf.Container.className=inf.Class;

            inf.createAvatar=function(){
              var inf=this;
              var itm=inf.Owner;
              var av=coObject.Create();
              av.Class=itm.Class+"Avatar";
              av.Parent=inf.Container;
              av.Owner=inf;

              av.Container=document.createElement('div');
              av.Parent.appendChild(av.Container);
              av.Container.className=av.Class;

              av.Image=document.createElement('div');
              av.Container.appendChild(av.Image);
              av.Image.className=av.Class+"Img";

              av.Show=function(){
                var av=this;
                this.Visible=true;
                this.Container.style.visibility="visible";
                this.Image.style.visibility="visible";
              };
              av.Hide=function(){
                this.Visible=true;
                this.Container.style.visibility="visible";
                this.Image.style.visibility="visible";
              };
              av.Free=function(){
                var av=this;

                av.Container.removeChild(av.Image);
                av.Parent.removeChild(av.Container);

                av=coObject.Release(av);

                return null;
              };

              return av;
            };
            inf.createContact=function(){
              var inf=this;
              var itm=inf.Owner;

              var ct=coObject.Create();
              ct.Class=itm.Class+"Contact";
              ct.Parent=inf.Container;
              ct.Owner=inf;

              ct.Container=document.createElement('div');
              ct.Parent.appendChild(ct.Container);
              ct.Container.className=ct.Class;

              ct.Name=document.createElement('div');
              ct.Container.appendChild(ct.Name);
              ct.Name.className=ct.Class+"Name";

              ct.Location=document.createElement('div');
              ct.Container.appendChild(ct.Location);
              ct.Location.className=ct.Class+"Location";

              ct.Time=document.createElement('div');
              ct.Container.appendChild(ct.Time);
              ct.Time.className=ct.Class+"Time";

              ct.setSize=function(){
                this.Container.style.width=this.Parent.clientWidth-this.Container.offsetLeft-this.Owner.Accept.Button.offsetWidth-this.Owner.Accept.Button.offsetWidth-40+"px";
              };
              ct.Show=function(){
                this.Visible=true;
                this.Container.style.visibility="visible";
                this.Name.style.visibility="visible";
                this.Location.style.visibility="visible";
                this.Time.style.visibility="visible";
              };
              ct.Hide=function(){
                this.Visible=false;
                this.Container.style.visibility="hidden";
                this.Name.style.visibility="hidden";
                this.Location.style.visibility="hidden";
                this.Time.style.visibility="hidden";
              };
              ct.Free=function(){
                var ct=this;

                ct.Container.removeChild(ct.Location);
                ct.Container.removeChild(ct.Name);
                ct.Parent.removeChild(ct.Container);

                ct=coObject.Release();

                return null;
              };
              return ct;
            };
            inf.createAccept=function(){
              var inf=this;
              var itm=inf.Owner;
              var ac=coObject.Create();
              ac.Class=itm.Class+"Accept";
              ac.Parent=inf.Container;
              ac.Owner=inf;
              ac.Container=document.createElement('div');
              ac.Parent.appendChild(ac.Container);
              ac.Container.className=ac.Class;

              ac.Button=document.createElement('div');
              ac.Container.appendChild(ac.Button);
              ac.Button.className=ac.Class+"Btn";
              ac.Button.Owner=ac;
              coDOM.setText(ac.Button,coLang.Table.Buttons.Accept);
              ac.doClick=function(){
                var itm=this.Owner.Owner;
                itm.Data.MAP.Response.Value=itm.Messages.Request.Message.value;
                itm.Slide.onItemAccepted(itm);
              };
              ac.Button.ontouchstart=function(e){
                if (e==undefined) e=window.event;
                var src=coDOM.srcElement(e);

                // Shade
                coDOM.preventDefault(e);
              };
              ac.Button.ontouchend=function(e){
                if (e==undefined) e=window.event;
                var src=coDOM.srcElement(e);
                var ac=src.Owner;
                ac.doClick();
                coDOM.preventDefault(e);
              };
              ac.Button.onmousedown=function(e){
                if (e==undefined) e=window.event;
                var src=coDOM.srcElement(e);
                var ac=src.Owner;
                coDOM.preventDefault(e);
              };
              ac.Button.onmouseup=function(e){
                if (e==undefined) e=window.event;
                var src=coDOM.srcElement(e);
                var ac=src.Owner;
                ac.doClick();
                coDOM.preventDefault(e);
              };
              ac.Show=function(){
                this.Visible=true;
                this.Button.style.visibility="visible";
                this.Container.style.visibility="visible";
              };
              ac.Hide=function(){
                this.Visible=false;
                this.Button.style.visibility="hidden";
                this.Container.style.visibility="hidden";
              };
              ac.Free=function(){
                var ac=this;

                ac.Container.removeChild(ac.Button);
                ac.Parent.removeChild(ac.Container);

                ac=coObject.Release(ac);
                return null;
              };
              return ac;
            };
            inf.createDecline=function(){
              var inf=this;
              var itm=inf.Owner;
              var dc=coObject.Create();
              dc.Class=itm.Class+"Decline";
              dc.Parent=inf.Container;
              dc.Owner=inf;
              dc.Container=document.createElement('div');
              dc.Parent.appendChild(dc.Container);
              dc.Container.className=dc.Class;

              dc.Button=document.createElement('div');
              dc.Container.appendChild(dc.Button);
              dc.Button.className=dc.Class+"Btn";
              dc.Button.Owner=dc;

              coDOM.setText(dc.Button,coLang.Table.Buttons.Decline);
              dc.doClick=function(){
                var itm=this.Owner.Owner;
                itm.Data.MAP.Response.Value=itm.Messages.Request.Message.value;
                itm.Slide.onItemRejected(itm);
              };
              dc.Button.ontouchstart=function(e){
                if (e==undefined) e=window.event;
                var src=coDOM.srcElement(e);
                var dc=src.Owner;
                // Shade
                coDOM.preventDefault(e);
              };
              dc.Button.ontouchend=function(e){
                if (e==undefined) e=window.event;
                var src=coDOM.srcElement(e);
                var dc=src.Owner;
                dc.doClick();
                coDOM.preventDefault(e);
              };
              dc.Button.onmousedown=function(e){
                if (e==undefined) e=window.event;
                var src=coDOM.srcElement(e);
                var dc=src.Owner;
                coDOM.preventDefault(e);
              };
              dc.Button.onmouseup=function(e){
                if (e==undefined) e=window.event;
                var src=coDOM.srcElement(e);
                var dc=src.Owner;
                dc.doClick();
                coDOM.preventDefault(e);
              };
              dc.Show=function(){
                this.Visible=true;
                this.Button.style.visibility="visible";
                this.Container.style.visibility="visible";
              };
              dc.Hide=function(){
                this.Visible=false;
                this.Button.style.visibility="hidden";
                this.Container.style.visibility="hidden";
              };
              dc.Free=function(){
                var dc=this;

                dc.Container.removeChild(dc.Button);
                dc.Parent.removeChild(dc.Container);

                dc=coObject.Release(dc);
                return null;
              };

              return dc;
            };
            inf.Synchronize=function(dbItem){
              var inf=this;
              var itm=inf.Owner;
              itm.Data=dbItem;
              var sl=itm.Slide;
              if (itm.Member) {
                var MAP=itm.Member.MAP;
                if (MAP.AvatarID.Value==0) {
                  inf.Avatar.Image.style.backgroundImage="";
                } else {
                  inf.Avatar.Image.style.backgroundImage="url("+coAvatar.URI_AVATAR.replace("$id",MAP.AvatarID.Value) +")";
                };
                coDOM.setText(inf.Contact.Name,MAP.First.Value+" "+MAP.Last.Value);
                coDOM.setText(inf.Contact.Location,MAP.City.Value+", "+MAP.State.Value+" "+MAP.Country.Value);
                coDOM.setText(inf.Contact.Time,coDateTime.decodeDateTime(dbItem.MAP.Opened.Value).toString(coDateTime.formatShort));
              } else {
                inf.Avatar.Image.style.backgroundImage="";
                coDOM.setText(inf.Contact.Name,"");
                coDOM.setText(inf.Contact.Location,"");
              };
            };
            inf.setSize=function(){
              this.Container.style.width=this.Parent.clientWidth+"px";
              this.Contact.setSize();
            };
            inf.Show=function(){
              this.Visible=true;
              this.Container.style.visibility="visible";
              this.Avatar.Show();
              this.Contact.Show();
              this.Accept.Show();
              this.Decline.Show();
            };
            inf.Hide=function(){
              this.Visible=false;
              this.Container.style.visibility="hidden";
              this.Avatar.Hide();
              this.Contact.Hide();
              this.Accept.Hide();
              this.Decline.Hide();
            };
            inf.Free=function(){
              var inf=this;

              inf.Avatar.Free();
              inf.Contact.Free();
              inf.Accept.Free();
              inf.Decline.Free();

              inf.Parent.removeChild(inf.Container);

              inf=coObject.Release(inf);
              return null;
            };


            inf.Avatar=inf.createAvatar();
            inf.Contact=inf.createContact();
            inf.Accept=inf.createAccept();
            inf.Decline=inf.createDecline();

            return inf;
          };
          itm.createMessages=function(){
            var itm=this;
            var msg=coObject.Create();
            msg.Class=itm.Class+"Msg";
            msg.Owner=itm;
            msg.Parent=itm.Container;

            msg.Container=document.createElement('div');
            msg.Parent.appendChild(msg.Container);
            msg.Container.className=msg.Class;


            msg.createRequest=function(){
              var msg=this;
              rq=coObject.Create();
              rq.Class=msg.Class+"Rq";
              rq.Parent=msg.Container;
              rq.Owner=msg;
              rq.Container=document.createElement('div');
              rq.Parent.appendChild(rq.Container);
              rq.Container.className=rq.Class;

              rq.Label=document.createElement('div');
              rq.Container.appendChild(rq.Label);
              rq.Label.className=rq.Class+"Label";
              coDOM.setText(rq.Label,coLang.Table.Labels.Request);

              rq.Message=document.createElement('input');
              rq.Container.appendChild(rq.Message);
              rq.Message.className=rq.Class+"Message";
              rq.Message.placeholder=coLang.Table.Apps.Social.Request.NoMessage;
              rq.Message.readOnly=true;
              rq.setSize=function(){
                this.Message.style.width=this.Container.clientWidth-this.Message.offsetLeft-10+"px";
              };
              rq.Show=function(){
                this.Visible=true;
                this.Message.style.visibility="visible";
                this.Label.style.visibility="visible";
                this.Container.style.visibility="visible";
              };
              rq.Hide=function(){
                this.Visible=false;
                this.Message.style.visibility="hidden";
                this.Label.style.visibility="hidden";
                this.Container.style.visibility="hidden";
              };
              rq.Free=function(){
                rq=this;

                rq.Container.removeChild(rq.Label);
                rq.Container.removeChild(rq.Message);
                rq.Parent.removeChild(rq.Container);

                rq=coObject.Release(rq);

                return null;
              };
              return rq;
            };
            msg.createResponse=function(){
              var msg=this;
              var itm=msg.Owner;
              rs=coObject.Create();
              rs.Class=msg.Class+"Rs";
              rs.Parent=msg.Container;
              rs.Owner=msg;
              rs.Container=document.createElement('div');
              rs.Parent.appendChild(rs.Container);
              rs.Container.className=rs.Class;

              rs.Label=document.createElement('div');
              rs.Container.appendChild(rs.Label);
              rs.Label.className=rs.Class+"Label";
              coDOM.setText(rs.Label,coLang.Table.Labels.Response);

              rs.Message=document.createElement('input');
              rs.Container.appendChild(rs.Message);
              rs.Message.className=rs.Class+"Message";
              rs.Message.placeholder=coLang.Table.Apps.Social.Request.ResponseMessage;
              rs.Message.readOnly=false;
              rs.Message.Owner=itm;
              rs.setSize=function(){
                this.Message.style.width=this.Container.clientWidth-this.Message.offsetLeft-10+"px";
              };
              rs.Show=function(){
                this.Visible=true;
                this.Message.style.visibility="visible";
                this.Label.style.visibility="visible";
                this.Container.style.visibility="visible";
              };
              rs.Hide=function(){
                this.Visible=false;
                this.Message.style.visibility="hidden";
                this.Label.style.visibility="hidden";
                this.Container.style.visibility="hidden";
              };
              rs.Free=function(){
                rq=this;

                rq.Container.removeChild(rq.Label);
                rq.Container.removeChild(rq.Message);
                rq.Parent.removeChild(rq.Container);

                rq=coObject.Release(rq);

                return null;
              };


              return rs;
            };
            msg.setSize=function(){
              this.Container.style.width=this.Parent.clientWidth+"px";
              this.Request.setSize();
              this.Response.setSize();
            };
            msg.Synchronize=function(dbItem){
              var msg=this;
              msg.Request.Message.value=dbItem.MAP.Query.Value;
              msg.Response.Message.value=dbItem.MAP.Response.Value;
            };
            msg.Free=function(){
              var msg=this;
              msg.Request.Free();
              msg.Response.Free();
              msg.Parent.removeChild(msg.Container);
              msg=coObject.Release(msg);
              return null;
            };
            msg.Show=function(){
              this.Visible=true;
              this.Container.style.visibility="visible";
              this.Request.Show();
              this.Response.Show();
            };
            msg.Hide=function(){
              this.Visible=false;
              this.Container.style.visibility="hidden";
              this.Request.Hide();
              this.Response.Hide();
            };
            msg.Request=msg.createRequest();
            msg.Response=msg.createResponse();

            return msg;
          };
          itm.Synchronize=function(dbItem){
            var itm=this;
            var mems=itm.Owner.Owner.Requests.Members;
            if (dbItem.Verified==true) {
              itm.Member=mems.getItem(mems.Fields.MAP.AccountID,dbItem.MAP.QueryID.Value);
              itm.Info.Synchronize(dbItem);
              itm.Messages.Synchronize(dbItem);
              itm.setSize();
            } else {
              itm.Free();
            };
          };
          itm.setSize=function(){
            this.Info.setSize();
            this.Messages.setSize();
          };
          itm.Show=function(){
            var itm=this;
            itm.Visible=true;
            itm.Container.style.visibility="visible";
            itm.Info.Show();
            itm.Messages.Show();
          };
          itm.Hide=function(){
            var itm=this;
            itm.Visible=false;
            itm.Container.style.visibility="hidden";
            itm.Info.Hide();
            itm.Messages.Hide();
          };
          itm.Free=function(){
            var itm=this;
            var itms=itm.Owner;

            var idx=itms.indexOf(itm);
            if (idx!=-1) itms.splice(idx,1);

            itm.Info.Free();
            itm.Messages.Free();

            if (itm.Data) itm.Data.Display=null;

            itm.Parent.removeChild(itm.Container);

            itm=coObject.Release(itm);
            return null;
          };
          itm.Info=itm.createInfo();
          itm.Messages=itm.createMessages();

          itms.push(itm);

          return itm;
        };
        itms.Show=function(){
          var itms=this;
          itms.Visible=true;
          itms.Container.style.visibility="visible";
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            itm.Show();
          };
        };
        itms.setSize=function(){
          var itms=this;
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            itm.setSize();
          };
        };
        itms.Hide=function(){
          var itms=this;
          itms.Visible=false;
          itms.Container.style.visibility="hidden";
          for (var iLcv=0; iLcv<itms.length; iLcv++){
            var itm=itms[iLcv];
            itm.Hide();
          };
        };
        itms.Free=function(){
          var itms=this;

          while (itms.length>0){
            var itm=itms[iLcv];
            itm.Free();
          };
        };
        return itms;
    };
    rs.Load=function(dbItem){
      var rs=this;
      rs.DataSet=dbItem;
      if (dbItem) {
          rs.Requests.Commands.List(dbItem.MAP.ID.Value);
      } else{
          rs.Requests.Clear();
      };
    };
    rs.Items=rs.createItems();
    rs.vScroll=coAppUI.App.Components.vScroll.Create("vScroll",sc.Frame,rs,rs.Container,rs.Container);
    rs.onItemAccepted=function(itm){
        var rs=this;
        var dbItem=itm.Data;
        rs.Requests.Commands.Accept(dbItem);
        itm.Free();
    };
    rs.onItemRejected=function(itm){
        var rs=this;
        var dbItem=itm.Data;
        rs.Requests.Commands.Reject(dbItem);
        itm.Free();
    };
    rs.Synchronize=function(){
        var rs=this;
        var dbItems=rs.Requests.Items;
        for (var iLcv=0; iLcv<dbItems.length; iLcv++){
          var dbItem=dbItems[iLcv];
          if (dbItem.Verified==true) {
            var itm=dbItem.Display;
            if (itm==null) {
              dbItem.Display=itm=rs.Items.createItem(dbItem);
              itm.Show();
            };
            itm.Synchronize(dbItem);
          };
        };
    };
    rs.onResize=function(){
        var rs=this;
        rs.Items.setSize();
    };
    rs.onShow=function(){
      var rs=this;
      var sc=rs.Screen;
      rs.Items.Show();
      rs.Synchronize();
    };
    rs.onHide=function(){
      var rs=this;
      var sc=rs.Screen;
      rs.Items.Hide();
    };
    return rs;
  }
};
