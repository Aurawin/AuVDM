coAppUI.App.Components.ContentBox = {
  Version        : new Version(2018,3,8,17),
  Title          : new Title("Aurawin Content Box","Content Box"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013-2018.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coAppUI.App,'/core/app/ui/ContentBox.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create         : function (sName,sClass,Screen,Slides,Owner,Parent,Align){
    var sc=Screen;
    var cb=Slides.createSlide(sName,sClass,Screen,Owner,Parent,Align);
    cb.Container.className="ContentBox "+sClass;
    cb.scaleX=0.5;
    cb.scaleY=0;
    cb.itemPadding=new Padding();
    cb.itemMargin=new Margin();
    cb.itemBorder=new Border();

    if (typeof(coCMS)!="undefined") {
      cb.CMS=coAppUI.App.Components.CMS.createManifest(cb,"ContentBox");
      cb.CMS.MAP.Items.Value.Fields.addField("Glyph",coDB.Kind.String,"glp","",coDB.StreamOn);
      cb.CMS.MAP.Items.Value.Fields.addField("GlyphRotate",coDB.Kind.Integer,"grt",0,coDB.StreamOn);
      cb.CMS.MAP.Items.Value.Fields.addField("GlyphWidth",coDB.Kind.Integer,"gw",80,coDB.StreamOn);
      cb.CMS.MAP.Items.Value.Fields.addField("GlyphHeight",coDB.Kind.Integer,"gh",80,coDB.StreamOn);
      cb.CMS.MAP.Items.Value.Fields.onLoaded=function(c){
        if (c.MAP.Title.Value.indexOf("coLang.")==0)
          c.MAP.Title.Value=eval(c.MAP.Title.Value);
        if (c.MAP.Glyph.Value.indexOf("coTheme.")==0)
          c.MAP.Glyph.Value=eval(c.MAP.Glyph.Value);
      };
      cb.CMS.onLoaded=function(){
        var CMS=this;
        var cb=CMS.Owner;
        var itms=CMS.MAP.Items.Value.Items;
        for (var iLcv=0; iLcv<itms.length; iLcv++){
          var rcItem=itms[iLcv];
          var sData=decodeURIComponent(rcItem.MAP.Data.Value);
          var sTitle=decodeURIComponent(rcItem.MAP.Title.Value);
          var itm=cb.Items.createItem(sTitle,sData,rcItem.MAP.Glyph.Value,rcItem);
          itm.rotateIcon(rcItem.MAP.GlyphRotate.Value);
          itm.sizeIcon(rcItem.MAP.GlyphWidth.Value,rcItem.MAP.GlyphHeight.Value);
        };
      };
    };

    cb.itemXBias=function(){
      return (cb.itemMargin.xBias()+cb.itemBorder.xBias());
    };
    cb.itemYBias=function(){
      return (cb.itemMargin.yBias()+cb.itemBorder.yBias());
    };
    cb.setScale=function(sX,sY){
      this.scaleX=sX;
      this.scaleY=sY;
      if ( (sX==1) && (sY==1)) {
        this.doSetSize=this.doSetSizeByX;
      } else {
        this.doSetSize=this.doSetSizeByXH;
      };
    };
    cb.doSetSizeByX=function(){
      var cb=this;
      var iW=cb.Container.clientWidth-cb.itemXBias();
      var iX=(iW*cb.scaleX)-cb.itemXBias();
      for (var iLcv=0; iLcv<cb.Items.length; iLcv++){
        var itm=cb.Items[iLcv];
        itm.Container.style.width=iX+"px";
        itm.Container.style.height="";
      };
    };
    cb.doSetSizeByXH=function(){
      var cb=this;
      var iW=cb.Container.clientWidth-cb.itemXBias();

      var iX=(iW*cb.scaleX)-cb.itemXBias();
      var iH=0;

      for (var iLcv=0; iLcv<cb.Items.length; iLcv++){
        var itm=cb.Items[iLcv];
        itm.Container.style.width=iX+"px";
        itm.Container.style.height="";
        iH=Math.max(itm.Container.scrollHeight+cb.itemBorder.yBias(),iH);
      };
      for (var iLcv=0; iLcv<cb.Items.length; iLcv++){
        var itm=cb.Items[iLcv];
        itm.Container.style.height=iH+"px";
      };
    };
    cb.doSetSizeByY=function(){
      var cb=this;
      var iH=cb.Container.clientHeight;
      var iY=iH*cb.scaleY;
      for (var iLcv=0; iLcv<cb.Items.length; iLcv++){
        var itm=cb.Items[iLcv];
        itm.Container.style.height=iY-cb.itemBorder.yBias()+"px";
      };
    };
    cb.doSetSizeByXY=function(){
      var cb=this;
      var iW=cb.Container.clientWidth;
      var iH=cb.Container.clientHeight;

      var iX=iW*cb.scaleX;
      var iY=iH*cb.scaleY;

      for (var iLcv=0; iLcv<cb.Items.length; iLcv++){
        var itm=cb.Items[iLcv];
        itm.Container.style.height=iY-cb.itemBorder.yBias()+"px";
        itm.Container.style.width=iX-cb.itemBorder.xBias()+"px";
      };

    };
    cb.doSetSize=cb.doSetSizeByXH;
    cb._createItems=function(){
      var cb=this;
      var _itms=coList.Array();
      _itms.Class="ContentBoxItems";
      _itms.Owner=cb;
      _itms.Parent=cb.Container;

      _itms.Container=document.createElement('div');
      _itms.Parent.appendChild(_itms.Container);
      _itms.Container.Owner=_itms;
      _itms.Container.className="ContentBoxItems "+cb.Class+"Items";

      if (typeof(coCMS)!="undefined") {
        var cmds=coAppUI.App.Components.CMS.createCommands();

        var cmd=cmds.addItem();
        cmd.MAP.Name.Value=coLang.Table.Apps.CMS.Tools.Items.Insert.Name;
        cmd.MAP.Hint.Value=coLang.Table.Apps.CMS.Tools.Items.Insert.Hint;
        cmd.MAP.Method.Value=function(cmd,CMS){
          var cb=CMS.Owner.Owner;
          var itm=cb.Items.createItem("","","",null,true);
          cb.scrollInView(itm);
        };

        var cmd=cmds.addItem();
        cmd.MAP.Name.Value=coLang.Table.Apps.CMS.Tools.Items.Add.Name;
        cmd.MAP.Hint.Value=coLang.Table.Apps.CMS.Tools.Items.Add.Hint;
        cmd.MAP.Method.Value=function(cmd,CMS){
          var cb=CMS.Owner.Owner;
          var itm=cb.Items.createItem("","","",null,false);
          cb.scrollInView(itm);
        };

        _itms.CMS=coAppUI.App.Components.CMS.createTools(_itms,_itms.Container,_itms.Class,cmds);

      };
      _itms.onContentLoaded=function(s){
        var itm=s.Owner;
        coDOM.setHTML(itm.Content,s.responseText);
        itm.Owner.Owner.setSize();
      };
      _itms.onContentError=function(s){
        var itm=s.Owner;
        coDOM.setHTML(itm.Content,"");
      };
      _itms.createItem=function(Title,Content,srcIcon,rcCMS,Insert){
        if (Insert==undefined) Insert=false;
        var itms=this;
        var cb=itms.Owner;
        var _itm=coObject.Create(coObject.relInline,coObject.cpyAsVar,"ContentBoxItem");

        _itm.Owner=itms;
        _itm.Parent=_itms.Container;
        _itm.Container=document.createElement('div');
        _itm.Container.Owner=_itm;
        if (Insert) {
          if (_itm.Owner.length==0) {
            _itm.Parent.appendChild(_itm.Container);
          } else {
           _itm.Parent.insertBefore(_itm.Container,_itms[0].Container);
          }
        } else {
           _itm.Parent.appendChild(_itm.Container);
        }

        _itm.Container.className=_itm.Class+" "+cb.Class+"Item";
        _itm.Container.style.display="inline-block";

        _itm.Title=document.createElement('div');
        _itm.Container.appendChild(_itm.Title);
        _itm.Title.Owner=_itm;
        _itm.Title.className=_itm.Class+"Title "+ cb.Class+"ItemTitle";
        coDOM.setHTML(_itm.Title,Title);

        _itm.decoTitleTop=document.createElement('div');
        _itm.Container.appendChild(_itm.decoTitleTop);
        _itm.decoTitleTop.Owner=_itm;
        _itm.decoTitleTop.className=_itm.Class+"TitleDecoTop "+ cb.Class+"ItemTitleDecoTop";

        _itm.Icon=document.createElement('div');
        _itm.Container.appendChild(_itm.Icon);
        _itm.Icon.className=_itm.Class+"Icon "+cb.Class+"ItemIcon";
        _itm.Icon.Owner=_itm;

        if (srcIcon.length>0)
          _itm.Icon.style.backgroundImage="url("+srcIcon+")";

        _itm.Content=document.createElement('div');
        _itm.Container.appendChild(_itm.Content);
        _itm.Content.className=_itm.Class+"Content "+cb.Class+"ItemContent";
        _itm.Content.Owner=_itm;
        if (Content.length>0)
          coDOM.setHTML(_itm.Content,Content);

        _itm.decoBottom=document.createElement('div');
        _itm.Container.appendChild(_itm.decoBottom);
        _itm.decoBottom.Owner=_itm;
        _itm.decoBottom.className=_itm.Class+"DecoBottom "+ cb.Class+"ItemDecoBottom";


        cb.itemPadding.enForce(_itm.Container);
        cb.itemMargin.enForce(_itm.Container);
        cb.itemBorder.enForce(_itm.Container);
        _itm.rotateIcon=function(angle){
          coDOM.setTransform(this.Icon,"rotate("+angle+"deg)");
        };
        _itm.sizeIcon=function(w,h){
          this.Icon.style.backgroundSize=w+"px "+h+"px";
        };
        _itm.LoadContent=function(sURL){
          var itm=this;
          return coDOM.httpGET(
            itm,
            sURL,
            itm.Owner.onContentLoaded,
            itm.Owner.onContentError
          );
        };
        _itm.Free=function(){
          var itm=this;
          var itms=this.Owner;
          var idx=itms.indexOf(itm);
          if (idx>-1) itms.splice(idx,1);

          if (itm.CMS) itm.CMS.Data.Display=null;

          itm.Container.removeChild(itm.decoTitleTop);
          itm.Container.removeChild(itm.decoBottom);

          itm.Container.removeChild(itm.Title);
          itm.Container.removeChild(itm.Icon);
          itm.Container.removeChild(itm.Content);

          itm.Parent.removeChild(itm.Container);

          itm=coObject.Release(itm);

          return null;
        };
        if (typeof(coCMS)!="undefined") {
          if (rcCMS==undefined) {
            rcCMS=cb.CMS.MAP.Items.Value.addItem(null,Insert);
          };
          rcCMS.Display=_itm;

          var cmds=coAppUI.App.Components.CMS.createCommands();

          var cmd=cmds.addItem();
          cmd.MAP.Oneshot.Value=false;
          cmd.MAP.Name.Value=coLang.Table.Apps.CMS.Tools.Edit.Name;
          cmd.MAP.Hint.Value=coLang.Table.Apps.CMS.Tools.Edit.Hint;
          cmd.MAP.ActiveName.Value=coLang.Table.Apps.CMS.Tools.Save.Name;
          cmd.MAP.ActiveHint.Value=coLang.Table.Apps.CMS.Tools.Save.Hint;
          cmd.MAP.Method.Value=function(cmd,CMS){
            switch (cmd.MAP.State.Value) {
              case (0) : {
                var itm=CMS.Owner;
                var cb=itm.Owner.Owner;
                var rcCMS=CMS.Data;

                rcCMS.MAP.Data.Value=encodeURIComponent($(itm.Content).redactor('code.get'));
                rcCMS.MAP.Title.Value=encodeURIComponent(coDOM.getText(itm.Title));

                itm.Content.Toolbar=itm.Content.Editor=itm.Content.Control=null;

                $(itm.Content).redactor('core.destroy');
                itm.Title.setAttribute("contenteditable","false");

                coCMS.App.DB.Commands.writeManifest(cb.CMS);
                break;
              };
              case (1) : {
                var itm=CMS.Owner;
                itm.Title.setAttribute("contenteditable","true");
                var Inst=$(itm.Content).redactor();

                var idxInst=Inst.length-1;
                itm.Content.Box=$(itm.Content).redactor('core.getBox')[idxInst];
                itm.Content.Box.style.position="relative";
                itm.Content.Control=$(itm.Content).redactor('core.getObject');
                itm.Content.Editor=$(itm.Content).redactor('core.getEditor')[idxInst];
                itm.Content.Toolbar=$(itm.Content).redactor('core.getToolbar')[idxInst];
                coTheme.UI.RichEdit.Apply(itm.Content);
                coTheme.UI.ContentBox.Item.Edit.Apply(itm);
                break;
              };
            };
          };
          var cmd=cmds.addItem();
          cmd.MAP.Name.Value=coLang.Table.Apps.CMS.Tools.Items.Delete.Name;
          cmd.MAP.Hint.Value=coLang.Table.Apps.CMS.Tools.Items.Delete.Hint;
          cmd.MAP.Method.Value=function(cmd,CMS){
            var itm=CMS.Owner;
            var cb=itm.Owner.Owner;
            var rcCMS=CMS.Data;
            rcCMS.Free();
            coCMS.App.DB.Commands.writeManifest(cb.CMS);
          };
          _itm.CMS=coAppUI.App.Components.CMS.createTools(_itm,_itm.Container,_itm.Class,cmds);
          _itm.CMS.Data=rcCMS;
        };
        if(Insert) {
          itms.splice(0,0,_itm);
        } else{
          itms.push(_itm);
        }
        return _itm;
      };
      _itms.Free=function(){
        var itms=this;
        while (itms.length>0)
          itms[0].Free();

        itms.Parent.removeChild(itms.Container);
        itms=coObject.Release(itms);
        return null;
      };
      return _itms;
    };
    cb.Items=cb._createItems();
    cb.doFree=function(){
      var cb=this;
      cb.Items=cb.Items.Free();
    };

    return cb;
  }
};
