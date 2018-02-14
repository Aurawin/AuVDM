coContacts.Editor = {
  Version        : new Version(2013,3,1,10),
  Title          : new Title("Spectrum Contact Editor","Editor"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coContacts.App,'/core/spc/cts/Editor.js',coAppKit.PreLoaded),
  debugToConsole : true,

  Create : function(Screen,Name){
    var DB=Screen.DB;
    var _edt=Screen.Slides.createSlide(Name,"sldClient",Screen,Screen.Frame,Screen.Frame.Client,coAppUI.Alignment.Client);

    _edt.Panels=coAppUI.App.Components.Panels.Create("Contact","pnlClientForList",Screen.Frame,_edt,_edt.Container,coAppUI.Alignment.Client,coAppUI.AutoSize,coAppUI.vScrollOn);
    _edt.Panels.vScroll.Logging=true;

    _edt.Panels.Names=_edt.Panels.createItem("",_edt.Panels.Kind.Panels,"Names","pnlCollection",coAppUI.Alignment.Top);

    _edt.Panels.Names.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",Screen.Frame,_edt.Panels.Names,_edt.Panels.Names.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
    _edt.Panels.Names.Caption=_edt.Panels.Names.Panels.createCaption(coLang.Table.Labels.Contact,"Names","pnlCaption");

    _edt.Panels.Names.First=_edt.Panels.Names.Panels.createLabeledText(coLang.Table.Contact.First,"First","pnlField");
    _edt.Panels.Names.First.DB.DataSet=DB;
    _edt.Panels.Names.First.DB.Field=DB.Fields.MAP.FirstName;
    _edt.Panels.Names.Middle=_edt.Panels.Names.Panels.createLabeledText(coLang.Table.Contact.Middle,"Middle","pnlField");
    _edt.Panels.Names.Middle.DB.DataSet=DB;
    _edt.Panels.Names.Middle.DB.Field=DB.Fields.MAP.MiddleName;

    _edt.Panels.Names.Last=_edt.Panels.Names.Panels.createLabeledText(coLang.Table.Contact.Last,"Last","pnlField");
    _edt.Panels.Names.Last.DB.DataSet=DB;
    _edt.Panels.Names.Last.DB.Field=DB.Fields.MAP.LastName;
    _edt.Panels.Names.Nick=_edt.Panels.Names.Panels.createLabeledText(coLang.Table.Contact.Alias,"Nick","pnlField");
    _edt.Panels.Names.Nick.DB.DataSet=DB;
    _edt.Panels.Names.Nick.DB.Field=DB.Fields.MAP.NickName;

    _edt.Panels.Emails=_edt.Panels.createItem("",_edt.Panels.Kind.Panels,"Emails","pnlCollection",coAppUI.Alignment.Top);
    _edt.Panels.Emails.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",Screen.Frame,_edt.Panels.Emails,_edt.Panels.Emails.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
    _edt.Panels.Emails.Caption=_edt.Panels.Emails.Panels.createCaption(coLang.Table.Labels.Email,"Addresses","pnlCaption");
    _edt.Panels.Emails.One=_edt.Panels.Emails.Panels.createLabeledText("Email 1","First","pnlField");
    _edt.Panels.Emails.One.DB.DataSet=DB;
    _edt.Panels.Emails.One.DB.Field=DB.Fields.MAP.Email;
    _edt.Panels.Emails.Two=_edt.Panels.Emails.Panels.createLabeledText("Email 2","Second","pnlField");
    _edt.Panels.Emails.Two.DB.DataSet=DB;
    _edt.Panels.Emails.Two.DB.Field=DB.Fields.MAP.Email2;
    _edt.Panels.Emails.Three=_edt.Panels.Emails.Panels.createLabeledText("Email 3","Third","pnlField");
    _edt.Panels.Emails.Three.DB.DataSet=DB;
    _edt.Panels.Emails.Three.DB.Field=DB.Fields.MAP.Email3;

    _edt.Panels.Phones=_edt.Panels.createItem("",_edt.Panels.Kind.Panels,"Phones","pnlCollection",coAppUI.Alignment.Top);
    _edt.Panels.Phones.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",Screen.Frame,_edt.Panels.Phones,_edt.Panels.Phones.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
    _edt.Panels.Phones.Caption=_edt.Panels.Phones.Panels.createCaption(coLang.Table.Labels.Phone,"Phone","pnlCaption");
    _edt.Panels.Phones.One=_edt.Panels.Phones.Panels.createLabeledText(coLang.Table.Contact.Phone+"1","First","pnlField");
    _edt.Panels.Phones.One.DB.DataSet=DB;
    _edt.Panels.Phones.One.DB.Field=DB.Fields.MAP.Phone;
    _edt.Panels.Phones.Two=_edt.Panels.Phones.Panels.createLabeledText(coLang.Table.Contact.Phone+"2","Second","pnlField");
    _edt.Panels.Phones.Two.DB.DataSet=DB;
    _edt.Panels.Phones.Two.DB.Field=DB.Fields.MAP.Phone2;
    _edt.Panels.Phones.Three=_edt.Panels.Phones.Panels.createLabeledText(coLang.Table.Contact.Phone+"3","Third","pnlField");
    _edt.Panels.Phones.Three.DB.DataSet=DB;
    _edt.Panels.Phones.Three.DB.Field=DB.Fields.MAP.Phone3;

    _edt.Panels.Texts=_edt.Panels.createItem("",_edt.Panels.Kind.Panels,"Texts","pnlCollection",coAppUI.Alignment.Top);
    _edt.Panels.Texts.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",Screen.Frame,_edt.Panels.Texts,_edt.Panels.Texts.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
    _edt.Panels.Texts.Caption=_edt.Panels.Texts.Panels.createCaption(coLang.Table.Labels.Text,"Addresses","pnlCaption");
    _edt.Panels.Texts.One=_edt.Panels.Texts.Panels.createLabeledText("Text 1","First","pnlField");
    _edt.Panels.Texts.One.DB.DataSet=DB;
    _edt.Panels.Texts.One.DB.Field=DB.Fields.MAP.Text;
    _edt.Panels.Texts.Two=_edt.Panels.Texts.Panels.createLabeledText("Text 2","Second","pnlField");
    _edt.Panels.Texts.Two.DB.DataSet=DB;
    _edt.Panels.Texts.Two.DB.Field=DB.Fields.MAP.Text2;
    _edt.Panels.Texts.Three=_edt.Panels.Texts.Panels.createLabeledText("Text 3","Third","pnlField");
    _edt.Panels.Texts.Three.DB.DataSet=DB;
    _edt.Panels.Texts.Three.DB.Field=DB.Fields.MAP.Text3;

    _edt.Panels.Locations=_edt.Panels.createItem("",_edt.Panels.Kind.Panels,"Locations","pnlCollection",coAppUI.Alignment.Top);
    _edt.Panels.Locations.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",Screen.Frame,_edt.Panels.Locations,_edt.Panels.Locations.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
    _edt.Panels.Locations.Caption=_edt.Panels.Locations.Panels.createCaption(coLang.Table.Labels.Location,"Name","pnlCaption");
    _edt.Panels.Locations.Address=_edt.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.Address,"Address1","pnlField");
    _edt.Panels.Locations.Address.DB.DataSet=DB;
    _edt.Panels.Locations.Address.DB.Field=DB.Fields.MAP.Address;
    _edt.Panels.Locations.Address2=_edt.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.Address,"Address2","pnlField");
    _edt.Panels.Locations.Address2.DB.DataSet=DB;
    _edt.Panels.Locations.Address2.DB.Field=DB.Fields.MAP.Address2;
    _edt.Panels.Locations.City=_edt.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.City,"City","pnlField");
    _edt.Panels.Locations.City.DB.DataSet=DB;
    _edt.Panels.Locations.City.DB.Field=DB.Fields.MAP.City;
    _edt.Panels.Locations.State=_edt.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.State,"State","pnlField");
    _edt.Panels.Locations.State.DB.DataSet=DB;
    _edt.Panels.Locations.State.DB.Field=DB.Fields.MAP.State;
    _edt.Panels.Locations.Postal=_edt.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.Post,"Zipcode","pnlField");
    _edt.Panels.Locations.Postal.DB.DataSet=DB;
    _edt.Panels.Locations.Postal.DB.Field=DB.Fields.MAP.Post;
    _edt.Panels.Locations.Country=_edt.Panels.Locations.Panels.createLabeledText(coLang.Table.Contact.Country,"Country","pnlField");
    _edt.Panels.Locations.Country.DB.DataSet=DB;
    _edt.Panels.Locations.Country.DB.Field=DB.Fields.MAP.Country;
    _edt.Panels.Locations.URL=_edt.Panels.Locations.Panels.createLabeledText("URL","URL","pnlField");
    _edt.Panels.Locations.URL.DB.DataSet=DB;
    _edt.Panels.Locations.URL.DB.Field=DB.Fields.MAP.URL;

    _edt.Panels.Fields=_edt.Panels.createItem("",_edt.Panels.Kind.Panels,"Custom Fields","pnlCollection",coAppUI.Alignment.Top);
    _edt.Panels.Fields.Panels=coAppUI.App.Components.Panels.Create("Fields","pnlCollectionFields",Screen.Frame,_edt.Panels.Fields,_edt.Panels.Fields.Container,coAppUI.Alignment.Center,coAppUI.AutoSize,coAppUI.vScrollOff);
    _edt.Panels.Fields.Caption=_edt.Panels.Fields.Panels.createCaption("Custom Fields","Fields","pnlCaption");
    _edt.Panels.Fields.One=_edt.Panels.Fields.Panels.createLabeledText("Field 1","First","pnlField");
    _edt.Panels.Fields.One.DB.DataSet=DB;
    _edt.Panels.Fields.One.DB.Field=DB.Fields.MAP.Custom1;
    _edt.Panels.Fields.Two=_edt.Panels.Fields.Panels.createLabeledText("Field 2","Second","pnlField");
    _edt.Panels.Fields.Two.DB.DataSet=DB;
    _edt.Panels.Fields.Two.DB.Field=DB.Fields.MAP.Custom2;
    _edt.Panels.Fields.Three=_edt.Panels.Fields.Panels.createLabeledText("Field 3","Third","pnlField");
    _edt.Panels.Fields.Three.DB.DataSet=DB;
    _edt.Panels.Fields.Three.DB.Field=DB.Fields.MAP.Custom3;
    _edt.Panels.Fields.Four=_edt.Panels.Fields.Panels.createLabeledText("Field 4","Fourth","pnlField");
    _edt.Panels.Fields.Four.DB.DataSet=DB;
    _edt.Panels.Fields.Four.DB.Field=DB.Fields.MAP.Custom4;
    _edt.Panels.Fields.Five=_edt.Panels.Fields.Panels.createLabeledText("Field 5","Fifth","pnlField");
    _edt.Panels.Fields.Five.DB.DataSet=DB;
    _edt.Panels.Fields.Five.DB.Field=DB.Fields.MAP.Custom5;


    _edt.onAvatarUpdated=function(Avatar){
        var edt=Avatar.Slide;
        var dbItem=Avatar.DataSet;
        if (dbItem) dbItem.MAP.AvatarID.Value=Avatar.dbAvatar.MAP.ID.Value;
    };
    _edt.onAvatarAdded=function(Avatar){
        var edt=Avatar.Slide;
        var dbItem=Avatar.DataSet;
        if (dbItem) dbItem.MAP.AvatarID.Value=Avatar.dbAvatar.MAP.ID.Value;
    };
    _edt.Panels.Avatar=coAvatar.createPanelSet(coAvatar.KIND_USER,Screen,_edt,_edt.Panels,_edt.onAvatarAdded,_edt.onAvatarUpdated);

    _edt.Load=function(dbItem){
        if (coSpectrum.debugToConsole==true) coVDM.VDM.Console.Append("coSpectrum.Contacts.Editor.Load");
        var edt=this;
        edt.DataSet=dbItem;
        edt.Panels.setRecord(dbItem,coAppUI.ShowTorus);
        edt.Panels.resetValues();
        edt.Panels.Avatar.Load(dbItem,null);
    };
    _edt.Reset=function(){
        if (coSpectrum.debugToConsole==true) coVDM.VDM.Console.Append("coSpectrum.Contacts.Editor.Reset");
        var edt=this;
        edt.DataSet=null;
        edt.Panels.setRecord(null,coAppUI.ShowTorus);
        edt.Panels.resetValues();
    };
    _edt.Write=function(){
        if (coSpectrum.debugToConsole==true) coVDM.VDM.Console.Append("coSpectrum.Contacts.Editor.Write");
        var edt=this;
        var cts=edt.Screen;
        var dbItem=edt.DataSet;

        cts.DB.Commands.Write.dataSend=coXML.Header+dbItem.toXML();
        cts.DB.Commands.Write.Data=dbItem;
        cts.DB.Commands.Write.reTry();
    };
    _edt.Commit=function(){
        if (coSpectrum.debugToConsole==true) coVDM.VDM.Console.Append("coSpectrum.Contacts.Editor.Commit");
        var edt=this;
        var cts=edt.Screen;
        edt.Panels.Commit();
    };
    return _edt;
  },
  createNameSlide:function(Class,Screen,Owner){
    slds=Owner.Slides;
    var sld=slds.Name=slds.createSlide("Name",Class+"ContactName sldContactName",Screen,Owner,Owner.Container,coAppUI.Alignment.Client);

    var lb=sld.Controls.lbFirst=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbFirst","lbl"+Class+"FirstName lblContactFirstName",coLang.Table.Contact.First);
    lb.Placement.setTopLeft();
    lb.Placement.Top=4;
    lb.Placement.Left=4;

    var txt=sld.Controls.First=coAppUI.App.Components.Text.Create(sld,sld.Container,"First","txt"+Class+"FirstName txtContactFirstName",coLang.Table.Contact.Hint.FirstName);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=4;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    var lb=sld.Controls.lbMiddle=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbMiddle","lbl"+Class+"MiddleName lblContactMiddleName",coLang.Table.Contact.Middle);
    lb.Placement.setTopLeft();
    lb.Placement.Top=22;
    lb.Placement.Left=4;

    var txt=sld.Controls.Middle=coAppUI.App.Components.Text.Create(sld,sld.Container,"Middle","txt"+Class+"MiddleName txtContactMiddleName",coLang.Table.Contact.Hint.MiddleName);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=22;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    var lb=sld.Controls.lbLast=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbLast","lbl"+Class+"LastName lblContactLastName",coLang.Table.Contact.Last);
    lb.Placement.setTopLeft();
    lb.Placement.Top=48;
    lb.Placement.Left=4;

    var txt=sld.Controls.Last=coAppUI.App.Components.Text.Create(sld,sld.Container,"Last","txt"+Class+"LastName txtContactLastName",coLang.Table.Contact.Hint.LastName);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=48;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    var lb=sld.Controls.lbNick=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbNick","lbl"+Class+"NickName lblContactNickName",coLang.Table.Contact.Alias);
    lb.Placement.setTopLeft();
    lb.Placement.Top=60;
    lb.Placement.Left=4;

    var txt=sld.Controls.Nick=coAppUI.App.Components.Text.Create(sld,sld.Container,"Nick","txt"+Class+"NickName txtContactNickName",coLang.Table.Contact.Hint.NickName);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=60;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    return sld;
  },
  createLocationSlide:function(Class,Screen,Owner){
    slds=Owner.Slides;
    var sld=slds.Location=slds.createSlide("Location",Class+"ContactLoc sldContactLocation",Screen,Owner,Owner.Container,coAppUI.Alignment.Client);

    var lb=sld.Controls.lbAddress1=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbAddress1","lbl"+Class+"Addr1 lblContactAddress",coLang.Table.Contact.Address);
    lb.Placement.setTopLeft();
    lb.Placement.Top=4;
    lb.Placement.Left=4;

    var txt=sld.Controls.Address1=coAppUI.App.Components.Text.Create(sld,sld.Container,"Address1","txt"+Class+"Address1 txtContactAddr",coLang.Table.Contact.Hint.Location.Address1);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=4;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    var lb=sld.Controls.lbAddress2=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbAddress2","lbl"+Class+"Addr2 lblContactAddress",coLang.Table.Contact.Address);
    lb.Placement.setTopLeft();
    lb.Placement.Top=22;
    lb.Placement.Left=4;

    var txt=sld.Controls.Address2=coAppUI.App.Components.Text.Create(sld,sld.Container,"Address2","txt"+Class+"Address2 txtContactAddr",coLang.Table.Contact.Hint.Location.Address2);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=22;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    var lb=sld.Controls.lbCity=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbCity","lbl"+Class+"City lblContactCity",coLang.Table.Contact.City);
    lb.Placement.setTopLeft();
    lb.Placement.Top=48;
    lb.Placement.Left=4;

    var txt=sld.Controls.City=coAppUI.App.Components.Text.Create(sld,sld.Container,"City","txt"+Class+"City txtContactCity",coLang.Table.Contact.Hint.Location.City);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=48;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    var lb=sld.Controls.lbState=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbState","lbl"+Class+"State lblContactState",coLang.Table.Contact.State);
    lb.Placement.setTopLeft();
    lb.Placement.Top=60;
    lb.Placement.Left=4;

    var txt=sld.Controls.State=coAppUI.App.Components.Text.Create(sld,sld.Container,"State","txt"+Class+"State txtContactState",coLang.Table.Contact.Hint.Location.State);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=60;
    txt.Placement.Left=4;
    txt.Placement.Right=4;


    var lb=sld.Controls.lbCountry=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbCountry","lbl"+Class+"Country lblContactCountry",coLang.Table.Contact.Country);
    lb.Placement.setTopLeft();
    lb.Placement.Top=82;
    lb.Placement.Left=4;

    var txt=sld.Controls.Country=coAppUI.App.Components.Text.Create(sld,sld.Container,"Country","txt"+Class+"URL txtContactURL",coLang.Table.Contact.Hint.Location.Country);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=82;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    var lb=sld.Controls.lbURL=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbURL","lbl"+Class+"URL lblContactURL",coLang.Table.Contact.URL);
    lb.Placement.setTopLeft();
    lb.Placement.Top=106;
    lb.Placement.Left=4;

    var txt=sld.Controls.URL=coAppUI.App.Components.Text.Create(sld,sld.Container,"URL","txt"+Class+"State txtContactURL",coLang.Table.Contact.Hint.Location.URL);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=106;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    return sld;
  },

  createEmailSlide:function(Class,Screen,Owner){
    slds=Owner.Slides;

    var sld=slds.Email=slds.createSlide("Email",Class+"ContactEmail sldContactEmail",Screen,Owner,Owner.Container,coAppUI.Alignment.Client);

    var lb=sld.Controls.lbEmail1=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbEmail1","lbl"+Class+"Email1 lblContactEmail1",coLang.Table.Label.Email+" 1");
    lb.Placement.setTopLeft();
    lb.Placement.Top=4;
    lb.Placement.Left=4;

    var txt=sld.Controls.Email1=coAppUI.App.Components.Text.Create(sld,sld.Container,"Email1","txt"+Class+"Email1 txtContactEmail1",coLang.Table.Contact.Hint.Email.Address1);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=4;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    var lb=sld.Controls.lbEmail2=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbEmail2","lbl"+Class+"Email2 lblContactEmail2",coLang.Table.Label.Email+" 2");
    lb.Placement.setTopLeft();
    lb.Placement.Top=22;
    lb.Placement.Left=4;

    var txt=sld.Controls.Email2=coAppUI.App.Components.Text.Create(sld,sld.Container,"Email2","txt"+Class+"Email3 txtContactEmail2",coLang.Table.Contact.Hint.Email.Address2);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=22;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    var lb=sld.Controls.lbEmail3=coAppUI.App.Components.Label.Create(sld,sld.Container,"lbEmail3","lbl"+Class+"Email3 lblContactEmail3",coLang.Table.Label.Email+" 3");
    lb.Placement.setTopLeft();
    lb.Placement.Top=48;
    lb.Placement.Left=4;

    var txt=sld.Controls.Last=coAppUI.App.Components.Text.Create(sld,sld.Container,"Email3","txt"+Class+"Email3 txtContactLastName",coLang.Table.Contact.Hint.Email.Address3);
    txt.Placement.setTopLeftRight();
    txt.Placement.Top=48;
    txt.Placement.Left=4;
    txt.Placement.Right=4;

    return sld;
  },
  createContactSlide:function(Screen,Owner,Parent,Name,Class,Align){
    if (Align==undefined) Align=coAppUI.Alignment.Client;
    var edt=Owner.Slides.createSlide(Name,Class+" sldContact",Screen,Owner,Parent,Align);
    var sls=edt.Slides;

    sls.Left=sls.createSlide("Left",Class+"ContactLeft sldContactLeft",Screen,edt,edt.Container,coAppUI.Alignment.Left);
    sls.Main=sls.createSlide("Main",Class+"ContactMain sldContactMain",Screen,edt,edt.Container,coAppUI.Alignment.Client);

    sls.Avatar=sls.Left.Slides.createSlide("Avatar",Class+"ContactAvatar sldContactAvatar",Screen,edt.Left,sls.Left.Container,coAppUI.Alignment.Top);
    sls.Main.Slides.Tabs=sls.Tabs=coAppUI.App.Components.TabsBar("Tabs",Class+"ContactTabs",Screen,edt.Main,edt.Main.Container,coAppUI.Alignment.Top);

    this.createNameSlide(Class,Screen,slds.Main);
    this.createLocationSlide(Class,Screen,slds.Main);
    this.createLocationSlide(Class,Screen,slds.Main);


    return edt;
  }
};
