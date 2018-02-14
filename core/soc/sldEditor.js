coSocial.App.Components.sldEditor = {
  Version        : new Version(2013,11,29,11),
  Title          : new Title("Social Network Editor","sldEditor"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSocial.App,'/core/soc/sldEditor.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create : function(Screen){
    var sc=Screen;
    var sld=sc.Switcher.Slides.createSlide("Editor","sldClient",sc,sc.Switcher,sc.Switcher.Container,coAppUI.Alignment.Client);
    sld.Network=coSocial.Networks.Fields.Clone();
    sld.Network.Display.push(sld);

    sld.setEditorCaption=function(sCaption){
      var sld=this;
      coDOM.setText(sld.Panels.Fields.Panels.Caption.Container,sCaption);
    };
    sld.onAvatarAdded=function(Avatar){
      var sc=Avatar.Screen;
      var dbItem=Avatar.DataSet;
      if (dbItem) {
        dbItem.MAP.AvatarID.Value=Avatar.dbAvatar.MAP.ID.Value;
        var dbNet=coSocial.Networks.getItemById(dbItem.MAP.ID.Value);
        if (dbNet){
          dbNet.MAP.AvatarID.Value=Avatar.dbAvatar.MAP.ID.Value;
          dbNet.Display.Synchronize();
        };
      };
    };
    sld.onAvatarUpdated=function(){};
    sld.DataSet=null;

    sld.Panels=coAppUI.App.Components.Panels.Create("Network","pnlClientForList",sc.Frame,sld,sld.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOn);
    sld.Panels.Fields=sld.Panels.createItem("",sld.Panels.Kind.Panels,"Network","pnlCollection",coAppUI.Alignment.Top);

    sld.Panels.Fields.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",sc.Frame,sld.Panels.Fields,sld.Panels.Fields.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
    sld.Panels.Fields.Panels.Caption=sld.Panels.Fields.Panels.createCaption("","Network","pnlCaption");

    sld.Panels.Fields.Panels.Title=sld.Panels.Fields.Panels.createLabeledText(coLang.Table.Labels.Title,"Title","pnlField");
    sld.Panels.Fields.Panels.Title.DB.Field=sld.Network.MAP.Title;
    sld.Panels.Fields.Panels.Description=sld.Panels.Fields.Panels.createLabeledText(coLang.Table.Labels.Description,"Description","pnlField");
    sld.Panels.Fields.Panels.Description.DB.Field=sld.Network.MAP.Description;
    var vis=sld.Panels.Fields.Panels.Visibility=sld.Panels.Fields.Panels.createLabeledCombo(coLang.Table.Labels.Visibility,"Visibility","pnlField");
    var opts=vis.Value.Container.options;
    opts.length=2;
    opts[0]=new Option(coLang.Table.Apps.Social.Network.Private,0, false, false);
    opts[1]=new Option(coLang.Table.Apps.Social.Network.Public,1,false,false);
    // Avatar Panels

    sld.Panels.Avatar=coAvatar.createPanelSet(coAvatar.KIND_NETWORK,sc,sld,sld.Panels,sld.onAvatarAdded,sld.onAvatarUpdated);

    sld.Reset=function(){
      var sld=this;
      sld.DataSet=null;
      sld.Panels.Avatar.DataSet=null;
      sld.Network.Reset();
      sld.Panels.setRecord(null);
      sld.Panels.resetValues();
    };
    sld.Load=function(dbItem){
      var sld=this;
      sld.DataSet=dbItem;
      sld.Network.Assign(dbItem);
      var Av=sld.Panels.Avatar;

      sld.Panels.setRecord(dbItem);
      sld.Panels.Fields.Panels.Title.DB.Field=dbItem.MAP.Title;
      sld.Panels.Fields.Panels.Description.DB.Field=dbItem.MAP.Description;
      sld.Panels.resetValues();


      var opts=sld.Panels.Fields.Panels.Visibility.Value.Container.options;
      opts[dbItem.MAP.Privacy.Value].selected=true;


      Av.Load(dbItem,sld.Network);
      Av.dbFile.MAP.NetworkID.Value=dbItem.MAP.ID.Value;
      Av.dbFile.MAP.FolderID.Value=dbItem.MAP.PicturesID.Value;
      Av.dbFile.MAP.Kind.Value=coContentType.fkImage;
      Av.dbAvatar.Verified=(dbItem.MAP.AvatarID.Value!=0);


    };
    sld.Commit=function(){
      var sld=this;
      var sc=sld.Screen;
      var Avatar=sld.Panels.Avatar;

      Avatar.Commit();

      var dbItem=sld.DataSet;
      var dbMAP=dbItem.MAP;
      dbMAP.Privacy.Value=sld.Panels.Fields.Panels.Visibility.getValue();
      dbMAP.Title.Value=sld.Panels.Fields.Panels.Title.getValue();
      dbMAP.Description.Value=sld.Panels.Fields.Panels.Description.getValue();
    };
    return sld;
  }

};
