coSitePage.App.Components.DB = {
  Version        : new Version(2013,12,6,1),
  Title          : new Title("Aurawin Page App Database Module","DB"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coPage.App,'/{PATH}/DB.js',coAppKit.PreLoaded),
  debugToConsole : true,
  LoadQuick      : 250,
  LoadPause      : 500,
  LoadChunk      : 300,
  LoadDelay      : 500,

  Init : function(){
    // initialization code below
  },
  Create : function(App){
    // View Creation code below
    var DB=coDB.createCollection(coXML.createParser(),"items","item",coDB.HasItems,coDB.HasDisplays,coDB.ParseAsync);
    DB.LoadInfo.FirstDelay=this.LoadQuick;
    DB.LoadInfo.Interval=this.LoadDelay;
    DB.LoadInfo.Chunk=this.LoadChunk;
    DB.Loaded=false;
    DB.Requested=false;
    DB.Unit=this;
    DB.Screen=Screen;
    DB.Items.DisplayMode.setValue(DB.Items.DisplayMode.Multiple);

    DB.Identity=DB.Fields.ID=DB.Fields.addField("ID",coDB.Kind.QWord,"id",0,coDB.StreamOn);
    //DB.Fields.addField("Bool",coDB.Kind.Boolean,"bln",false,coDB.StreamOn);
    //DB.Fields.addField("Bool",coDB.Kind.Integer,"int",0,coDB.StreamOn);
    //DB.Fields.addField("String",coDB.Kind.String,"stg","",coDB.StreamOn);
    //DB.Fields.addField("StringList",coDB.Kind.StringArray,"sl",coList.StringArray(),coDB.StreamOn);
    //DB.Fields.addField("KPList",coDB.Kind.KPList,"sl",coList.kpList("=","\r\n"),coDB.StreamOn);

    return DB;
  }
};
coSitePage.App.Components.DB.Init();

