coContacts.App.Components.RosterView = {
  Version        : new Version(2014,9,19,7),
  Title          : new Title("Spectrum Contact Roster View","RosterView"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coContacts.App,'/core/spc/cts/RosterView.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Tool,Kind){
    var _rv=coAppUI.App.Components.RosterView.Create(
      "Roster",
      "RosterView",
      Tool.Screen,
      Tool.Slides,
      Tool,
      Tool.Container,
      coAppUI.Alignment.Client,
      Kind
    );
    _rv.DataSet=coSpectrum.Contacts.DB;
    _rv.DataSet.Displays.push(_rv);
    _rv.doShow=function(){
      this.Synchronize();
    };
    _rv.onSelectItem=function(itm){
      var rv=this;
      var tw=rv.Owner;
      var wr=tw.Owner;
      var ctl=tw.Control;
      ctl.setCaption(itm.getValue());
      wr.Headers.Commit();
      tw.Close();
    };
    return _rv;
  }
};
