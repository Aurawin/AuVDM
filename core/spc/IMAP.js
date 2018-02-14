coSpectrum.App.Components.IMAP = {
  Version        : new Version(2014,9,12,4),
  Title          : new Title("Spectrum IMAP","IMAP"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coSpectrum.App,'/core/spc/IMAP.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create:function(){
    imap=new Object();
    imap.Flags=new Object;
    imap.Flags.None=0 << 0;
    imap.Flags.Seen=1 << 1;
    imap.Flags.Answered=1 << 2;
    imap.Flags.Flagged=1 << 3;
    imap.Flags.Deleted=1 << 4;
    imap.Flags.Draft=1 << 5;
    imap.Flags.Recent=1 << 6;
    imap.Flags.NoSelect=1 << 7;
    imap.Flags.Pinned=1 << 8;
    imap.Flags.isSeen=function(iFlags){
      return ((iFlags|this.Seen)==iFlags);
    };
    imap.Flags.isAnswered=function(iFlags){
      return ((iFlags|this.Answered)==iFlags);
    };
    imap.Flags.isFlagged=function(iFlags){
      return ((iFlags|this.Flagged)==iFlags);
    };
    imap.Flags.isDeleted=function(iFlags){
      return ((iFlags|this.Deleted)==iFlags);
    };
    imap.Flags.isDraft=function(iFlags){
      return ((iFlags|this.Draft)==iFlags);
    };
    imap.Flags.isRecent=function(iFlags){
      return ((iFlags|this.Recent)==iFlags);
    };
    imap.Flags.isNoSelect=function(iFlags){
      return ((iFlags|this.NoSelect)==iFlags);
    };
    imap.Flags.isPinned=function(iFlags){
      return ((iFlags|this.Pinned)==iFlags);
    };
    return imap;

  }
};
