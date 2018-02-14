coMail.App.Components.Manifest = {
  Version        : new Version(2014,8,31,9),
  Title          : new Title("Spectrum Mail Manifest","Manifest"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2014.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Header         : coAppKit.Dependencies.Create(coMail.App,'/core/spc/eml/Manifest.js',coAppKit.PreLoaded),
  debugToConsole : true,
  Create : function(Screen){
    var mbx=Screen;
    var mfst=coVDM.Manifest;
    mfst.MailboxFolders=mfst.addEntry("MailboxFolders","mbx-folders",mbx.onManifestUpdated);
    mfst.MailboxFolders.addField("Width",coDB.Kind.Integer,"width",coSpectrum.DefaultFolderWidth,coDB.StreamOn);
    mfst.MailboxFolders.addField("ForReader",coDB.Kind.Boolean,"for-r",false,coDB.StreamOn);
    mfst.MailboxFolders.addField("ForWriter",coDB.Kind.Boolean,"for-w",false,coDB.StreamOn);
    mfst.MailboxFolders.addField("ForInbox",coDB.Kind.Boolean,"for-i",true,coDB.StreamOn);
    mfst.MailboxFolders.addField("ForMailbox",coDB.Kind.Boolean,"for-m",true,coDB.StreamOn);

    var itmMFST=mfst.emlComposer=mfst.addEntry("emlComposer","eml-cmp-selections",mbx.onManifestUpdated);
    mfst.emlComposer.Mode=itmMFST.addField("Mode",coDB.Kind.String,"mode",coLang.Table.Modes.Options,coDB.StreamOn);
    mfst.emlComposer.PlainText=itmMFST.addField("PlainText",coDB.Kind.Boolean,"plain-text",true,coDB.StreamOn);
    mfst.emlComposer.RichText=itmMFST.addField("RichText",coDB.Kind.Boolean,"rich-text",false,coDB.StreamOn);
    mfst.emlComposer.Signature=itmMFST.addField("Signature",coDB.Kind.Int64,"signature-id",0,coDB.StreamOn);

    mfst.emlThreadView=mfst.addEntry("elmThreadView","eml-thd-vw",mbx.onManifestUpdated);
    mfst.emlThreadView.addField("Mark",coDB.Kind.Integer,"mark",1,coDB.StreamOn);
  }
};
