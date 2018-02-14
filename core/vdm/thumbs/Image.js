coThumbs.App.Components.Image = {
  Version        : new Version(2013,5,18,2),
  Title          : new Title("Image Thumbnails","Image"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coThumbs.App,'/core/vdm/thumbs/Image.js',coAppKit.PreLoaded),
  Handles        : ["png","jpeg","jpg","bmp","gif","svg"],
  debugToConsole : true,
  createThumb : function(Owner,Parent,Record){
    if (Record==undefined) Record=null;
    var tmb=coThumbs.App.Components.Thumb.Create(Owner,Parent,Record);

    tmb._Free=tmb.Free;
    tmb.Free=function(){
      var tmb=this;
      // any code here
      tmb=tmb._Free();
      return null;
    };
  },
};

