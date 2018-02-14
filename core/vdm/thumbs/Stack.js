coThumbs.App.Components.Stack = {
  Version        : new Version(2013,5,18,3),
  Title          : new Title("Thumbnail Stack","Stack"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2013.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coThumbs.App,'/core/vdm/thumbs/Stack.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen,Slides,Owner,Parent,Align){
    if (Owner==undefined) Owner=Screen.Frame;
    if (Parent==undefined) Parent=Screen.Frame.Client;
    if (Align==undefined) Align=coAppUI.Alignment.Top;
    stk=Slides.createSlide("Thumbnails","ThumbStack",Screen,Owner,Parent,Align);
    stk.AddItem=function(sName,sIcon,sLink,Record){
      if (Record==undefined) Record=null;
      var stk=this;
      var sExt=coUtils.ExtractFileExt(sURL);
      var tmbH=coThumbs.getThumbHandler(sExt);
      var itm=tmbH.createThumb(stk,stk.Container,Record);
      itm.setName(sName);
      itm.setIcon(sURL);
      itm.setLink(sLink);

      return itm;
    };
    return stk;
  }

};

