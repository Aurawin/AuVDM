var coAppUI={
  Version        : new Version(2014,9,18,548),
  Title          : new Title("Aurawin User Interface","coAppUI"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(null,'/core/app/coAppUI.js',coAppKit.PreLoaded),
  Usage          : coAppKit.Units.Create(null,'/core/app/coAppUI.js',coAppKit.PreLoaded),
  Unit           : '/core/app/coAppUI.js',
  NameSpace      : '/core/app',
  Alignment      : new Alignment(),
  Framed         : true,
  Frameless      : false,
  AutoSize       : true,
  NoAutoSize     : false,
  debugToConsole : false,
  recurseOn      : true,
  recurseOff     : false,
  allowClose     : true,
  disableClose   : false,
  ForceSelection : true,
  BypassSelection: false,
  vScrollOn      : true,
  vScrollOff     : false,
  ShowTorus      : true,
  VDM            : null,
  NoCaption      : "",
  NoURL          : "",
  Absolute       : 'absolute',
  Relative       : 'relative',
  NoRepeat       : 'no-repeat',
  Center         : 'center',
  Contain        : 'contain',
  None           : 'none',
  ConsealediFrames   : new Array(),
  ConsealedPageViews : new Array(),
  PopUps         : new Array(),
  Tools          : new Array(),
  iFrames        : new Array(),
  PageViews      : new Array(),
  ListViews      : new Array(),
  TreeViews      : new Array(),
  init           : function(){

    this.ConsealediFrames.Enable=function(){
      for (var iLcv=0; iLcv<this.length; iLcv++){
        var f=this[iLcv];
        f.Container.style.pointerEvents="";
      };
      this.length=0;
    };
    this.ConsealedPageViews.Enable=function(){
      for (var iLcv=0; iLcv<this.length; iLcv++){
        var pv=this[iLcv];
        pv.Container.style.pointerEvents="";
      };
      this.length=0;
    };
    this.iFrames.Disable=function(){
      for (var iLcv=0; iLcv<this.length; iLcv++){
        var f=this[iLcv];
        if (
          (f.Screen.Visible==true) &&
          (f.Hidden==false) &&
          (f.Visible==true)
        ) {
          f.Container.style.pointerEvents="none";
          coAppUI.ConsealediFrames.push(f);
        };
      };
    };
    this.PageViews.Disable=function(){
      for (var iLcv=0; iLcv<this.length; iLcv++){
        var pv=this[iLcv];
        if (
          (pv.Screen.Visible==true) &&
          (pv.Hidden==false) &&
          (pv.Visible==true)
        ) {
          pv.Container.style.pointerEvents="none";
          coAppUI.ConsealedPageViews.push(pv);
        };
      };
    };

    this.VDM=null;
    this.App=coAppKit.createApplication(
      this.Unit,
      this.Title,
      this.Version,
      this.Vendor,
      coAppKit.NoUses,
      coAppKit.NoDependencies,
      this.onInitialized
    );
    this.App.Unit=this;
    this.App.Initialized=true;
    this.Header.App=this.App;
    this.Usage.App=this.App;
    return this;
  },
  onInitialized : function(App){
    App.Loaded=true;
  },
  onLogOut       : function(){
    for (var iLcv=0; iLcv<coAppUI.ListViews.length; iLcv++){
      var lv=coAppUI.ListViews[iLcv];
      lv.Items.Clear();
    };
    for (var iLcv=0; iLcv<coAppUI.TreeViews.length; iLcv++){
      var tv=coAppUI.TreeViews[iLcv];
      tv.Items.Clear();
    };
  },
  checkTab       : function (evt) {
      var tab = "\t";
      var t = evt.target;
      var ss = t.selectionStart;
      var se = t.selectionEnd;

      // Tab key - insert tab expansion
      if (evt.keyCode == 9) {
          evt.preventDefault();

          // Special case of multi line selection
          if (ss != se && t.value.slice(ss,se).indexOf("\n") != -1) {
              // In case selection was not of entire lines (e.g. selection begins in the middle of a line)
              // we ought to tab at the beginning as well as at the start of every following line.
              var pre = t.value.slice(0,ss);
              var sel = t.value.slice(ss,se).replace(/\n/g,"\n"+tab);
              var post = t.value.slice(se,t.value.length);
              t.value = pre.concat(tab).concat(sel).concat(post);

              t.selectionStart = ss + tab.length;
              t.selectionEnd = se + tab.length;
          }

          // "Normal" case (no selection or selection on one line only)
          else {
              t.value = t.value.slice(0,ss).concat(tab).concat(t.value.slice(ss,t.value.length));
              if (ss == se) {
                  t.selectionStart = t.selectionEnd = ss + tab.length;
              }
              else {
                  t.selectionStart = ss + tab.length;
                  t.selectionEnd = se + tab.length;
              }
          }
      }

      // Backspace key - delete preceding tab expansion, if exists
     else if (evt.keyCode==8 && t.value.slice(ss - 4,ss) == tab) {
          evt.preventDefault();

          t.value = t.value.slice(0,ss - 4).concat(t.value.slice(ss,t.value.length));
          t.selectionStart = t.selectionEnd = ss - tab.length;
      }

      // Delete key - delete following tab expansion, if exists
      else if (evt.keyCode==46 && t.value.slice(se,se + 4) == tab) {
          evt.preventDefault();

          t.value = t.value.slice(0,ss).concat(t.value.slice(ss + 4,t.value.length));
          t.selectionStart = t.selectionEnd = ss;
      }
      // Left/right arrow keys - move across the tab in one go
      else if (evt.keyCode == 37 && t.value.slice(ss - 4,ss) == tab) {
          evt.preventDefault();
          t.selectionStart = t.selectionEnd = ss - 4;
      }
      else if (evt.keyCode == 39 && t.value.slice(ss,ss + 4) == tab) {
          evt.preventDefault();
          t.selectionStart = t.selectionEnd = ss + 4;
      }
  }
};
coAppUI.init();

