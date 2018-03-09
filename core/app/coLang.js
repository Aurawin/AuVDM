var coLang= {
  Version        : new Version(2018,3,8,300),
  Title          : new Title("Core Object Language Table","coLang"),
  Vendor         : new Vendor("Aurawin", "Copyright (&copy;) 2012-2018.  All rights reserved.", [{'REAL-TIME END-USE AWARE INTERACTIVE SEARCH UTILIZING LAYERED APPROACH' : 7720843}, {'SYSTEMS AND APPARATUSES FOR SEAMLESS INTEGRATION OF USER, CONTEXTUAL, AND SOCIALLY AWARE SEARCH UTILIZING LAYERED APPROACH' : 7860852} ]),
  Table          : createLangManifest()
};

function createLangManifest(){
  var _mfst=new Object();
  _mfst.API=new Object();
  _mfst.Value=new Object();
  _mfst.Value.Yes="Yes";
  _mfst.Value.No="No";
  _mfst.Value.True="Yes";
  _mfst.Value.False="No";
  _mfst.Value.Boolean=new Object();
  _mfst.Value.Boolean.fromXML=function(Value,Default){
    var mfst=_mfst;
    if (!Default) Default=false;
    switch (Value){
      case ("Yes") :  return true;
      case ("No") : return false;
   };
   return Default;
  };
  _mfst.Value.Boolean.toXML=function(Value){
    var mfst=_mfst;
    switch (Value){
      case (true) :  return "Yes";
      case (false) : return "No";
   };
   return "No";
  };
  _mfst.Value.Boolean.toString=function(Value){
    var mfst=_mfst;
    switch (Value){
      case (true) :  return mfst.Value.True;
      case (false) : return mfst.Value.False;
   };
   return "";
  };
  _mfst.Value.Boolean.fromString=function(Value,Default){
    var mfst=_mfst;
    if (!Default) Default=false;
    switch (Value){
      case (mfst.Value.True) :  return true;
      case (mfst.Value.False) : return false;
   };
   return Default;
  };
  _mfst.VDM=new Object();
  _mfst.VDM.Login="Aurawin Credentials";
  _mfst.VDM.Title="Aurawin";
  _mfst.VDM.Description="Aurawin Virtual Desktop";
  _mfst.VDM.ZoneWarning="You are about to leave Aurawin";
  _mfst.VDM.Initializing="Initializing Aurawin...";
  _mfst.VDM.Installing="Loading Aurawin for the first time...";
  _mfst.VDM.Shutdown="Aurawin has shutdown.";
  _mfst.VDM.Updating="Preparing Aurawin for reboot...";

  _mfst.VDM.getWelcomeBanner=function(bShort){
    return (bShort==true) ? "Welcome": "Welcome to Aurawin";
  };
  _mfst.VDM.getWelcome=function(){
    return coLang.Table.Labels.Beta+" "+coVDM.Version.Major+"."+coVDM.Version.Minor+"."+coVDM.Version.Micro;
  };
  _mfst.Views=new Object();
  _mfst.Views.Simple="Simple";
  _mfst.Views.Complex="Complex";
  _mfst.Views.Complete="Complete";

  _mfst.Commerce=new Object();
  _mfst.Commerce.Symbol="$";
  _mfst.Commerce.NoCharge="Free";
  _mfst.Commerce.Rate=new Object();
  _mfst.Commerce.Rate.AsPer="/";
  _mfst.Commerce.Rate.Month="month";
  _mfst.Commerce.Rate.Day="day";
  _mfst.Commerce.Rate.Year="year";
  _mfst.Commerce.Rate.AsPerMonth=function(){
    return this.AsPer+this.Month;
  };
  _mfst.Commerce.Rate.AsPerDay=function(){
    return this.AsPer+this.Day;
  };
  _mfst.Commerce.Rate.AsPerYear=function(){
    return this.AsPer+this.Year;
  };
  _mfst.Commerce.Payment=new Object();
  _mfst.Commerce.Payment.Months=new Object();
  _mfst.Commerce.Payment.Months.setOptions=function(sel){
    sel.options.length=12;
    for (iLcv=0; iLcv<12; iLcv++){
      sel.options[iLcv]=new Option("".concat(iLcv+1),iLcv+1);
    };
  };
  _mfst.Commerce.Payment.Years=new Object();
  _mfst.Commerce.Payment.Years.setOptions=function(sel){
    sel.options.length=10;
    var iYear={$i year};
    for (iLcv=0; iLcv<10; iLcv++){
      sel.options[iLcv]=new Option("".concat(iYear+iLcv),iYear+iLcv);
    };
  };
  _mfst.Commerce.Payment.setOptionsNoPaymentAccounts=function(sel){
    sel.options.length=1;
    sel.options[0]=new Option(coLang.Table.Account.AddAccount,-1);
  };


  _mfst.Net=new Object();
  _mfst.Net.Failure="Network failure.  Service unavailable.";
  _mfst.Net.Rejected="Invalid login.  Please try again.";
  _mfst.Net.Login=new Object();

  _mfst.Net.Login.ExistingUsers="Existing Users";
  _mfst.Net.Login.AcctName="Please enter your account name.";
  _mfst.Net.Login.AcctNameHint="Your account";
  _mfst.Net.Login.AcctPass="Please enter your password.";
  _mfst.Net.Login.AcctPassHint="Your password";
  _mfst.Net.Login.AcctResource="Which device are you using now?";
  _mfst.Net.Login.ResourceName="Please enter a name for this device.";
  _mfst.Net.Login.SaveLogin="Ok to auto login on this device?";
  _mfst.Net.Login.Verification="Your credentials are being verified...";
  _mfst.Net.Login.Failed="Unable to verify your credentials...";
  _mfst.Net.Login.AcctContinueName="To continue, please enter account name.";
  _mfst.Net.Login.AcctContinuePass="To continue, please enter your password.";
  _mfst.Net.Login.AcctContinueRecource="Please select this device from the list.";
  _mfst.Net.Login.ResourceNameContinue="To continue, please name this device.";
  _mfst.Net.Login.ResourceDupContinue="This device is already listed.  Please, enter a different name";
  _mfst.Net.Login.SaveLoginContinue="To continue, please select an option.";
  _mfst.Net.Login.Requirements="Aurawin requires Chrome, Safari, or Firefox.";
  _mfst.Net.Login.Resource=new Object();
    _mfst.Net.Login.Resource.getCreating=function(value){
    var rc=this;
    if (value==undefined) value="";
    return rc.Creating.replace("$resource",value);
  };
  _mfst.Net.Login.Resource.Select="Which device is this?";
  _mfst.Net.Login.Resource.Adding="Add this device to the list.";
  _mfst.Net.Login.Resource.NotListed="Not Listed";
  _mfst.Net.Login.Resource.New="New Device";
  _mfst.Net.Login.Resource.Name="Name of this device";
  _mfst.Net.Login.Resource.Loading="Loading...";
  _mfst.Net.Login.Resource.Creating="Creating resource $resource...";
  _mfst.Net.Login.Resource.SaveOn="Save login";
  _mfst.Net.Login.Resource.SaveOff="Don't save";
  _mfst.Net.Login.Resource.OkToSave="Is it Okay to save login?";

  _mfst.Exceptions=new Object();
  _mfst.Exceptions.NotImplemented="The method called is not implemented.";

  _mfst.DragDrop=new Object();
  _mfst.DragDrop.Action=new Object();
  _mfst.DragDrop.Action.Status="$Action $Count $Items";
  _mfst.DragDrop.Action.Target="to $Target";

  _mfst.DragDrop.Action.Move=new Array("Move","Moving");
  _mfst.DragDrop.Action.Delete=new Array("Delete","Deleting");
  _mfst.DragDrop.Action.Copy=new Array("Copy","Copying");

  _mfst.DragDrop.Items=new Object();
  _mfst.DragDrop.Items.Default="Item(s)";
  _mfst.DragDrop.Items.Email="Email(s)";
  _mfst.DragDrop.Items.File="File(s)";
  _mfst.DragDrop.Files=new Object();
  _mfst.DragDrop.Files.Dropbox="Drop files here to upload";

  _mfst.Modes=new Object();
  _mfst.Modes.Applications="Applications";
  _mfst.Modes.All="All";
  _mfst.Modes.Groups="Groups";
  _mfst.Modes.Options="Options";

  _mfst.Tasks=new Object();
  _mfst.Tasks.Title="Opened Windows";
  _mfst.Tasks.Description="to opened applications";
  _mfst.Tasks.Opened="Opened";
  _mfst.Tasks.Available="Available";

  _mfst.Groups=new Object();
  _mfst.Groups.Group="Group";

  _mfst.Groups.All=new Object();
  _mfst.Groups.All.Name="All";
  _mfst.Groups.All.Description="that are available";
  _mfst.Groups.Custom=new Object();
  _mfst.Groups.Custom.Name="Custom";
  _mfst.Groups.Custom.Description="Aurawin Custom Application";
  _mfst.Groups.Main=new Object();
  _mfst.Groups.Main.Name="Main";
  _mfst.Groups.Main.Description="Aurawin Essentials";
  _mfst.Groups.Social=new Object();
  _mfst.Groups.Social.Name="System";

  _mfst.Groups.System=new Object();
  _mfst.Groups.System.Name="System";
  _mfst.Groups.System.Description="Platform Applications";
  _mfst.Groups.Spectrum=new Object();
  _mfst.Groups.Spectrum.Name="Spectrum";
  _mfst.Groups.Spectrum.Description="Email, Texting, and Collaboration";

  _mfst.Signup=new Object();
  _mfst.Signup.NameInfo="Your name";
  _mfst.Signup.LocationInfo="Your location";
  _mfst.Signup.PhoneInfo="Telephone number";
  _mfst.Signup.AccountInfo="Your Account";
  _mfst.Signup.SecurityInfo="Your Password";
  _mfst.Signup.Level="Membership Level";
  _mfst.Signup.Levels=new Object();

  _mfst.Signup.NameFirst="First name";
  _mfst.Signup.NameMiddle="Middle name";
  _mfst.Signup.NameFamily="Family name";

  _mfst.Signup.LocationStreet1="Street Address 1";
  _mfst.Signup.LocationStreet2="Street Address 2";
  _mfst.Signup.LocationCity="City";
  _mfst.Signup.LocationState="State/Province";
  _mfst.Signup.LocationPostal="Postal Code";
  _mfst.Signup.LocationCountry="Country";


  _mfst.Signup.Account="Account";
  _mfst.Signup.Username="Username";
  _mfst.Signup.Password="Password";
  _mfst.Signup.Password2="Confirm";
  _mfst.Signup.EmailAddress="Email Address";
  _mfst.Signup.JSTrained="Members trained in JavaScript";
  _mfst.Signup.AuVDMTrained="Members trained in AuVDM";
  _mfst.Signup.AuSCSTrained="Members trained in AuSCS";
  _mfst.Signup.NewAccount="New Account";
  _mfst.Signup.Prompt="Signup for a new account";
  _mfst.Signup.AlreadyTaken="Sorry $First, that account is already taken.";
  _mfst.Signup.Valid="$First, account [$User] is yours if you want it.";
  _mfst.Signup.Error="Sorry $First, there was a network problem.  Please try again [$Code].";
  _mfst.Signup.getError=function(sFirst,sCode){
    return this.Error.replace("$First",sFirst).replace("$Code",sCode);
  };
  _mfst.Signup.Validating="Validating new account [$User]";
  _mfst.Signup.MissingFields="You must enter valid value.";
  _mfst.Signup.EnterWebsite="Please enter your website.";
  _mfst.Signup.Creating="$First, we are creating your account [$User].";
  _mfst.Signup.Success="Welcome $First! Account [$User] is ready for use.";
  _mfst.Signup.EnterFirstName="Please enter your first name.";
  _mfst.Signup.OptionalMiddleName="Optionally enter your middle name.";
  _mfst.Signup.EnterLastName="Please enter your last name.";
  _mfst.Signup.EnterPhone="Please enter your phone number.";
  _mfst.Signup.Membership="Please select your membership level.";
  _mfst.Signup.EnterJSTrained="Please specify number of team members skilled in JavaScript.";
  _mfst.Signup.EnterAuVDMTrained="Please specify number of team members skilled in development using AuVDM.";
  _mfst.Signup.EnterAuSCSTrained="Please specify number of team members skilled in development using AuSCS.";
  _mfst.Signup.EnterAddress="Please enter your street address.";
  _mfst.Signup.OptionalAddress2="You may use this for additional street information.";
  _mfst.Signup.EnterCity="Please enter your city.";
  _mfst.Signup.EnterState="Please enter your state.";
  _mfst.Signup.EnterPost="Please enter your postal code.";
  _mfst.Signup.EnterCountry="Please enter your country.";
  _mfst.Signup.EnterAccount="Please enter an account name.";
  _mfst.Signup.EnterDifferentAccount="Please choose a different account name.";
  _mfst.Signup.EnterPassword="Please choose a valid password.";
  _mfst.Signup.ConfirmPassword="Please enter a matching password.";
  _mfst.Signup.ForwardAddress="Please enter your current email address.";
  _mfst.Signup.EnterDifferentForward="You must specify a forwarding email address.";


  _mfst.Mail=new Object();
  _mfst.Mail.Folder="Mail";
  _mfst.Mail.Name="Mailbox";
  _mfst.Mail.Title="Internet Mail";
  _mfst.Mail.Description="Manage your e-mail";
  _mfst.Mail.Compose="Compose";
  _mfst.Mail.Draft="Draft";
  _mfst.Mail.From="From";
  _mfst.Mail.Inbox="Inbox";
  _mfst.Mail.Junk="Spam";
  _mfst.Mail.Trash="Trash";
  _mfst.Mail.DefaultSubject="New Message";
  _mfst.Mail.Plain="Plain";
  _mfst.Mail.Rich="Rich";
  _mfst.Mail.Options="Options";
  _mfst.Mail.Outbox="Outbox";
  _mfst.Mail.Attach="Attach";
  _mfst.Mail.Attachments="Attachments";
  _mfst.Mail.Files="Files";
  _mfst.Mail.Recipients="Recipients";
  _mfst.Mail.Sent="Sent";
  _mfst.Mail.Signatures="Signatures";
  _mfst.Mail.Folders="Folders";
  _mfst.Mail.Envelope="Envelope";
  _mfst.Mail.Mark=new Object();
  _mfst.Mail.Mark.Label="Mark";
  _mfst.Mail.Mark.Read="Read";
  _mfst.Mail.Mark.Unread="Unread";

  _mfst.Mail.Mark.Thread="Thread";
  _mfst.Mail.Mark.Page="Page";

  _mfst.Mail.To="To";
  _mfst.Mail.Subject="Subject";
  _mfst.Mail.CC="CC";
  _mfst.Mail.BCC="BCC";
  _mfst.Mail.Loading="Loading this message...";
  _mfst.Mail.Reply=new Object();
  _mfst.Mail.Reply.QuoteStr="> ";
  _mfst.Mail.Reply.SubjectStr="RE: ";
  _mfst.Mail.Reply.BodyStr="On $date $time, $name wrote:";
  _mfst.Mail.Forward=new Object();
  _mfst.Mail.Forward.QuoteStr="";
  _mfst.Mail.Forward.SubjectStr="FWD: ";
  _mfst.Mail.Forward.BodyStr="On $date $time, $name wrote:";
  _mfst.Mail.Writer=new Object();
  _mfst.Mail.Writer.Hint=new Object();
  _mfst.Mail.Writer.Hint.To="Email address for To";
  _mfst.Mail.Writer.Hint.BCC="Email address for Blind Carbon Copy";
  _mfst.Mail.Writer.Hint.CC="Email address for Carbon Copy";
  _mfst.Mail.Writer.Hint.get=function(idx){
    switch (idx){
      case (0): return this.To;
      case (1): return this.BCC;
      case (2): return this.CC;
    };
    return "";
  };

  _mfst.Mail.Writer.Placeholder=new Object();
  _mfst.Mail.Writer.Placeholder.get=function(idx){
    switch (idx){
      case (0): return this.To;
      case (1): return this.BCC;
      case (2): return this.CC;
    };
    return "";
  };
  _mfst.Mail.Writer.Placeholder.To="Type a name or e-mail";
  _mfst.Mail.Writer.Placeholder.BCC="Type a name or e-mail";
  _mfst.Mail.Writer.Placeholder.CC="Type a name or e-mail";

  _mfst.Mail.Stamp=new Object();

  _mfst.Mail.Stamp.Yesterday="Yesterday";
  _mfst.Mail.Stamp.DaysAgo="days ago";
  _mfst.Mail.Stamp.SecondAgo="second ago";
  _mfst.Mail.Stamp.SecondsAgo="seconds ago";
  _mfst.Mail.Stamp.MinuteAgo="minute ago";
  _mfst.Mail.Stamp.MinutesAgo="minutes ago";
  _mfst.Mail.Stamp.HourAgo="hour ago";
  _mfst.Mail.Stamp.HoursAgo="hours ago";
  _mfst.Mail.Stamp.getDisplay=function(iSecsAgo,DT){
    if (iSecsAgo<60) {
      var sLabel=(iSecsAgo==1) ? this.SecondAgo : this.SecondsAgo;
      return iSecsAgo+" " + sLabel;
    } else {
      var DaysAgo=iSecsAgo/coDateTime.SecsPerDay;
      if (DaysAgo<.25) {
        return DT.Time.toString(coDateTime.formatShort);
      } else {
        return DT.Date.toString(coDateTime.formatShort);
      };
    };
  };

  _mfst.Account=new Object();
  _mfst.Account.Title="Aurawin Account";
  _mfst.Account.Description="Manage your memory and disk storage capacity.";
  _mfst.Account.Username="Username";
  _mfst.Account.Billing="Billing";
  _mfst.Account.Usage="Usage";
  _mfst.Account.MonthlyFees="Monthly Fees";
  _mfst.Account.Payment="Payment";
  _mfst.Account.Payments="Payments";
  _mfst.Account.Services="Services";
  _mfst.Account.VirtualMemory="Server Memory";
  _mfst.Account.VirtualDisk="Server Storage";
  _mfst.Account.PaymentAccounts="Payment Accounts";
  _mfst.Account.AliasOfPayment="Alias of payment";
  _mfst.Account.EnterAliasOfPayment="Enter a name for this payment method";
  _mfst.Account.InvalidAliasOfPayment="The alias for this payment method appears to be invalid.";
  _mfst.Account.EnterCardHolder="Enter the name as it appears on the card";
  _mfst.Account.InvalidCardHolder="The card holder appears to be invalid.";
  _mfst.Account.EnterCardVerification="Enter the verification code";
  _mfst.Account.InvalidCardVerification="The verification code for this card appears to be invalid.";
  _mfst.Account.EnterCardNumber="Enter the credit card number";
  _mfst.Account.InvalidCardNumber="The card number appears to be invalid.";
  _mfst.Account.CardHolder="Name of Cardholder";
  _mfst.Account.CardNumber="Card Number";
  _mfst.Account.CardCode="Security Code";
  _mfst.Account.MonthlyRecurringCharges="Monthly Recurring Charges";
  _mfst.Account.NoPaymentDue="No payment due";
  _mfst.Account.NoCharge="No Charge";
  _mfst.Account.AddAccount="Add account";
  _mfst.Account.UseCard="Use Card";
  _mfst.Account.CardExpires="Expires";
  _mfst.Account.CardExpireMonth="Month";
  _mfst.Account.CardExpireYear="Year";


  _mfst.Contact=new Object();
  _mfst.Contact.First="First";
  _mfst.Contact.Middle="Middle";
  _mfst.Contact.Last="Family";
  _mfst.Contact.Alias="Alias";
  _mfst.Contact.Phone="Phone";
  _mfst.Contact.Address="Address";
  _mfst.Contact.City="City";
  _mfst.Contact.State="State";
  _mfst.Contact.Post="Postal";
  _mfst.Contact.Country="Country";
  _mfst.Contact.URL="Website";

  _mfst.Contact.Hint=new Object();
  _mfst.Contact.Hint.FirstName="Please enter a first name.";
  _mfst.Contact.Hint.MiddleName="Please enter a middle name.";
  _mfst.Contact.Hint.LastName="Please enter a family name.";
  _mfst.Contact.Hint.NickName="Please enter an alias for this contact.";
  _mfst.Contact.Hint.Location=new Object();
  _mfst.Contact.Hint.Location.Address1="Please enter a street address.";
  _mfst.Contact.Hint.Location.Address2="Optional street address.";
  _mfst.Contact.Hint.Location.City="Please enter a town or city for this contact.";
  _mfst.Contact.Hint.Location.State="Please enter a state for this contact.";
  _mfst.Contact.Hint.Location.Country="Please enter a country for this contact.";
  _mfst.Contact.Hint.Location.URL="Please enter a website for this contact.";
  _mfst.Contact.Hint.Email=new Object();
  _mfst.Contact.Hint.Email.Address1="Please enter a primary e-mail address.";
  _mfst.Contact.Hint.Email.Address2="Optional e-mail address.";
  _mfst.Contact.Hint.Email.Address3="Optional e-mail address.";

  _mfst.Labels=new Object();
  _mfst.Labels.Add="Add";
  _mfst.Labels.Administrate="Administrate";
  _mfst.Labels.All="All";
  _mfst.Labels.Apps="Applications";

  _mfst.Labels.Beta="Beta";
  _mfst.Labels.Benefits="Benefits";
  _mfst.Labels.Business="Business";
  _mfst.Labels.Cabinet="Cabinet";
  _mfst.Labels.Category="Category";
  _mfst.Labels.Close="Close";
  _mfst.Labels.Continue="Continue";
  _mfst.Labels.Control="Control";
  _mfst.Labels.Conversations="Conversations";
  _mfst.Labels.Commitment="Commitment";
  _mfst.Labels.Create="Create";
  _mfst.Labels.Data="Data";
  _mfst.Labels.Database="Database";
  _mfst.Labels.DataTypes="Data Types";
  _mfst.Labels.Developer="Developer";
  _mfst.Labels.Developers="Developers";
  _mfst.Labels.Download="Download";
  _mfst.Labels.Downloads="Downloads";
  _mfst.Labels.Double="Double";

  _mfst.Labels.Edit="Edit";
  _mfst.Labels.Error="Error";
  _mfst.Labels.Empty="Empty";
  _mfst.Labels.Enterprise="Enterprise";
  _mfst.Labels.Everyone="Everyone";
  _mfst.Labels.Faster="Faster";
  _mfst.Labels.Features="Features";
  _mfst.Labels.Introduction="Introduction";
  _mfst.Labels.Tasks="Tasks";
  _mfst.Labels.Thanks="Thanks";
  _mfst.Labels.ThankYou="Thank You";
  _mfst.Labels.Folder="Folder";
  _mfst.Labels.Folders="Folders";
  _mfst.Labels.File="File";
  _mfst.Labels.FileName="Filename";
  _mfst.Labels.Genre="Genre";
  _mfst.Labels.Kind="Kind";
  _mfst.Labels.Personal="Personal";
  _mfst.Labels.Lock="Lock";
  _mfst.Labels.Mark="Mark";
  _mfst.Labels.Data="Data";
  _mfst.Labels.Date="Date";
  _mfst.Labels.Delete="Delete";
  _mfst.Labels.Filter="Filter";
  _mfst.Labels.First="First";
  _mfst.Labels.Down="Down";
  _mfst.Labels.Read="Read";
  _mfst.Labels.Ready="Ready";
  _mfst.Labels.Reload="Reload";
  _mfst.Labels.Select="Select";
  _mfst.Labels.Single="Single";
  _mfst.Labels.Time="Time";
  _mfst.Labels.Tripple="Tripple";
  _mfst.Labels.Main="Main";
  _mfst.Labels.Go="Go";
  _mfst.Labels.Direction="Direction";
  _mfst.Labels.Device="Device";
  _mfst.Labels.Delay="Delay";
  _mfst.Labels.Details="Details";
  _mfst.Labels.Description="Description";
  _mfst.Labels.Incoming="Incoming";

  _mfst.Labels.Layout="Layout";
  _mfst.Labels.Name="Name";
  _mfst.Labels.None="None";
  _mfst.Labels.Menu="Menu";
  _mfst.Labels.Mode="Mode";
  _mfst.Labels.Me="Me";
  _mfst.Labels.Member="Member";
  _mfst.Labels.Members="Members";
  _mfst.Labels.Networks="Networks";
  _mfst.Labels.Views="Views";
  _mfst.Labels.Off="Off";
  _mfst.Labels.On="On";
  _mfst.Labels.Other="Other";
  _mfst.Labels.Others="Others";
  _mfst.Labels.Overview="Overview";
  _mfst.Labels.Overwrite="Overwrite";
  _mfst.Labels.Ownership="Ownership";
  _mfst.Labels.Open="Open";
  _mfst.Labels.OperatingSystem="Operating System";
  _mfst.Labels.Preview="Preview";
  _mfst.Labels.Professional="Professional";
  _mfst.Labels.Professionals="Professionals";
  _mfst.Labels.Quadruple="Quadruple";
  _mfst.Labels.Resource="Resource";
  _mfst.Labels.Revert="Revert";
  _mfst.Labels.Seconds="Seconds";
  _mfst.Labels.seconds="seconds";
  _mfst.Labels.Social="Social";
  _mfst.Labels.Slower="Slower";
  _mfst.Labels.Synchronization="Synchronization";
  _mfst.Labels.Synchronize="Synchronize";
  _mfst.Labels.Summary="Summary";
  _mfst.Labels.Signup="Signup";
  _mfst.Labels.SaveLogin="Save Login";
  _mfst.Labels.Save="Save";
  _mfst.Labels.SaveAs="Save As";
  _mfst.Labels.Scenes="Scenes";
  _mfst.Labels.Tiles="Tiles";
  _mfst.Labels.UserInterface="User Interface";
  _mfst.Labels.Unlock="Unlock";
  _mfst.Labels.PageBreak="of";
  _mfst.Labels.Placement="Placement";
  _mfst.Labels.Policy="Policy";
  _mfst.Labels.Title="Title";
  _mfst.Labels.Location="Location";
  _mfst.Labels.Lines="Lines";
  _mfst.Labels.Options="Options";
  _mfst.Labels.Policies="Policies";
  _mfst.Labels.Address="Address";
  _mfst.Labels.Email="Email";
  _mfst.Labels.Images="Images";
  _mfst.Labels.Information="Information";
  _mfst.Labels.Text="Text";
  _mfst.Labels.Tour="Tour";
  _mfst.Labels.Open="Open";
  _mfst.Labels.Phone="Phone";
  _mfst.Labels.New="New";
  _mfst.Labels.Contact="Contact";
  _mfst.Labels.ContentType="Content-Type";
  _mfst.Labels.Custom="Custom";
  _mfst.Labels.Request="Request";
  _mfst.Labels.Response="Response";
  _mfst.Labels.Safe="Safe";
  _mfst.Labels.Settings="Settings";
  _mfst.Labels.Size="Size";
  _mfst.Labels.View="View";
  _mfst.Labels.Visibility="Visibility";
  _mfst.Labels.Website="Website";
  _mfst.Labels.Welcome="Welcome";


  _mfst.Buttons=new Object();

  _mfst.Buttons.Add="Add";
  _mfst.Buttons.Accept="Accept";
  _mfst.Buttons.Back="Back";
  _mfst.Buttons.Browse="Browse";
  _mfst.Buttons.Home="Home";
  _mfst.Buttons.Ok="Ok";
  _mfst.Buttons.Cancel="Cancel";

  _mfst.Buttons.Yes="Yes";
  _mfst.Buttons.No="No";
  _mfst.Buttons.Logout="Logout";
  _mfst.Buttons.Cabinet="Cabinet";
  _mfst.Buttons.Conversations="Conversations";
  _mfst.Buttons.Copy="Copy";
  _mfst.Buttons.Clear="Clear";
  _mfst.Buttons.Create="Create";
  _mfst.Buttons.Confirm="Confirm";
  _mfst.Buttons.Convert="Convert";
  _mfst.Buttons.Current="Current";
  _mfst.Buttons.Discard="Discard";
  _mfst.Buttons.Decline="Decline";
  _mfst.Buttons.Delete="Delete";
  _mfst.Buttons.Down="Down";
  _mfst.Buttons.Done="Done";
  _mfst.Buttons.Download="Download";
  _mfst.Buttons.Downloading="Downloading";
  _mfst.Buttons.Edit="Edit";
  _mfst.Buttons.Editor="Editor";
  _mfst.Buttons.Enterprise="Enterprise";
  _mfst.Buttons.Family="Family";
  _mfst.Buttons.Find="Find";

  _mfst.Buttons.Move="Move";
  _mfst.Buttons.Join="Join";
  _mfst.Buttons.Forward="Forward";
  _mfst.Buttons.Page="Page";
  _mfst.Buttons.Play="Play";
  _mfst.Buttons.Print="Print";
  _mfst.Buttons.Publish="Publish";
  _mfst.Buttons.Undelete="Undelete";
  _mfst.Buttons.Deselect="Deselect";
  _mfst.Buttons.Networking="Networking";
  _mfst.Buttons.Networks="Networks";
  _mfst.Buttons.Requests="Requests";
  _mfst.Buttons.Restore="Restore";
  _mfst.Buttons.Refresh="Refresh";
  _mfst.Buttons.Rename="Rename";
  _mfst.Buttons.Reply="Reply";
  _mfst.Buttons.ReplyAll="Reply All";
  _mfst.Buttons.Rotate="Rotate";
  _mfst.Buttons.Select="Select";
  _mfst.Buttons.Send="Send";
  _mfst.Buttons.Search="Search";
  _mfst.Buttons.Settings="Settings";
  _mfst.Buttons.Sign="Sign";
  _mfst.Buttons.Signup="Signup";
  _mfst.Buttons.Save="Save";
  _mfst.Buttons.SlideShow="Slide Show";
  _mfst.Buttons.Stop="Stop";
  _mfst.Buttons.Subscribe="Subscribe";
  _mfst.Buttons.Up="Up";
  _mfst.Buttons.Upload="Upload";
  _mfst.Buttons.Unjoin="Unjoin";
  _mfst.Buttons.Unselect="Unselect";
  _mfst.Buttons.Use="Use";
  _mfst.Buttons.Compose="Compose";
  _mfst.Buttons.Login="Login";
  _mfst.Buttons.Pending="Pending";
  _mfst.Buttons.Plain="Plain";
  _mfst.Buttons.Previous="Previous";
  _mfst.Buttons.Next="Next";
  _mfst.Buttons.Rich="Rich";
  _mfst.Buttons.New="New";
  _mfst.Buttons.Last="Last";

  _mfst.MessageBox=new Object();
  _mfst.MessageBox.selectFile="Please select a file...";

  _mfst.Month=new Object();
  _mfst.Month.January="January";
  _mfst.Month.Februrary="February";
  _mfst.Month.March="March";
  _mfst.Month.April="April";
  _mfst.Month.May="May";
  _mfst.Month.June="June";
  _mfst.Month.July="July";
  _mfst.Month.August="August";
  _mfst.Month.September="September";
  _mfst.Month.October="October";
  _mfst.Month.November="November";
  _mfst.Month.December="December";
  _mfst.Date=new Object();
  _mfst.Date.Seperator="/";
  _mfst.Date.Format=new Object();
  _mfst.Date.Format.Long="DAY MONTH DD, YYYY";
  _mfst.Date.Format.Short="MM/DD/YYYY";
  _mfst.Time=new Object();
  _mfst.Time.Seperator=":";
  _mfst.Time.Format=new Object();
  _mfst.Time.Format.Short="HH:MM MD";
  _mfst.Time.Format.Long="HH:MM:SS:MS";
  _mfst.Time.Meridiem=new Object();
  _mfst.Time.Meridiem.Enabled=true;
  _mfst.Time.Meridiem.Ante="AM";
  _mfst.Time.Meridiem.Post="PM";
  _mfst.DateTime=new Object();
  _mfst.DateTime.Format=new Object();
  _mfst.DateTime.Format.Long="DATE, TIME";
  _mfst.DateTime.Format.Short="DATE TIME";
  _mfst.Day=new Object();
  _mfst.Day.Seperator=",";
  _mfst.Day.Long=new Object();
  _mfst.Day.Long.Owner=_mfst.Day;
  _mfst.Day.Long.toString=function(idx){
    var day=this;
    switch (idx) {
      case (1) : return day.Sunday;
      case (2) : return day.Monday;
      case (3) : return day.Tuesday;
      case (4) : return day.Wednesday;
      case (5) : return day.Thursday;
      case (6) : return day.Friday;
      case (7) : return day.Saturday;
    };
    return null;
  };
  _mfst.Day.Long.Sunday="Sunday";
  _mfst.Day.Long.Monday="Monday";
  _mfst.Day.Long.Tuesday="Tuesday";
  _mfst.Day.Long.Wednesday="Wednesday";
  _mfst.Day.Long.Thursday="Thursday";
  _mfst.Day.Long.Friday="Friday";
  _mfst.Day.Long.Saturday="Saturday";
  _mfst.Day.Short=new Object();
  _mfst.Day.Short.Owner=_mfst.Day;
  _mfst.Day.Short.toString=function(idx){
    var day=this;
    switch (idx) {
      case (1) : return day.Sunday;
      case (2) : return day.Monday;
      case (3) : return day.Tuesday;
      case (4) : return day.Wednesday;
      case (5) : return day.Thursday;
      case (6) : return day.Friday;
      case (7) : return day.Saturday;
    };
    return null;
  };
  _mfst.Day.Short.Sunday="Sun";
  _mfst.Day.Short.Monday="Mon";
  _mfst.Day.Short.Tuesday="Tue";
  _mfst.Day.Short.Wednesday="Wed";
  _mfst.Day.Short.Thursday="Thur";
  _mfst.Day.Short.Friday="Fri";
  _mfst.Day.Short.Saturday="Sat";

  _mfst.Separate=new Object();
  _mfst.Separate.Thousands=",";
  _mfst.Separate.Decimal=".";
  _mfst.Separate.Path="/";
  _mfst.Separate.Caption=" - ";

  _mfst.Units=new Object();
  _mfst.Units.Bytes="Bytes";

  _mfst.Settings=new Object();
  _mfst.Settings.Width="Width";

  _mfst.Apps=new Object();
  _mfst.Apps.Seperator=new Object();
  _mfst.Apps.Seperator.Param=" - ";
  _mfst.Apps.Applications=new Object();
  _mfst.Apps.Applications.Description="Use this program to switch or launch other applications";
  _mfst.Apps.Alerts=new Object();
  _mfst.Apps.Alerts.Description="A place to view alerts like notifications and messages";
  _mfst.Apps.System=new Object();
  _mfst.Apps.System.Description="System settings, preferences, and configuration";
  _mfst.Apps.Places=new Object();
  _mfst.Apps.Places.Description="Makes different places easy to manage and visit";
  _mfst.Apps.Console=new Object();
  _mfst.Apps.Console.Description="Use this program to display log information during debugging";


  _mfst.Apps.Cloud=new Object();
  _mfst.Apps.Cloud.Name="Cloud";
  _mfst.Apps.Cloud.Title="Aurawin Cloud Computing";
  _mfst.Apps.Cloud.Description="Application for Aurawin marketing.";

  _mfst.Apps.CMS=new Object();
  _mfst.Apps.CMS.FileMan=new Object();
  _mfst.Apps.CMS.FileMan.Name="File Manager";
  _mfst.Apps.CMS.FileMan.Title="Aurain Domain File Manager";
  _mfst.Apps.CMS.FileMan.getCaption=function(domain){
    return this.Name+coLang.Table.Separate.Caption+domain;
  };
  _mfst.Apps.CMS.FileMan.New=new Object();
  _mfst.Apps.CMS.FileMan.New.Folder=function(){
    return coLang.Table.Labels.New+" "+coLang.Table.Labels.Folder;
  };
  _mfst.Apps.CMS.FileMan.New.File=function(){
    return coLang.Table.Labels.New+" "+coLang.Table.Labels.File;
  };
  _mfst.Apps.CMS.FileMan.Description="This application manages domain level folders and files.";
  _mfst.Apps.CMS.FileMan.Status=new Object();
  _mfst.Apps.CMS.FileMan.Status.Selected="Viewing files in $path.";
  _mfst.Apps.CMS.FileMan.Status.Idle="Waiting for folder selection.";
  _mfst.Apps.CMS.FileMan.Options=new Object();
  _mfst.Apps.CMS.FileMan.Options.Cache="Cache";
  _mfst.Apps.CMS.FileMan.Options.Compress="Compress";
  _mfst.Apps.CMS.FileMan.Options.Keywords="Keywords";
  _mfst.Apps.CMS.FileMan.Options.TTL="TTL";

  _mfst.Apps.CMS.Tools=new Object();
  _mfst.Apps.CMS.Tools.Edit=new Object();
  _mfst.Apps.CMS.Tools.Edit.Name="Edit";
  _mfst.Apps.CMS.Tools.Edit.Hint="Click here to edit content.";
  _mfst.Apps.CMS.Tools.Save=new Object();
  _mfst.Apps.CMS.Tools.Save.Name="Save";
  _mfst.Apps.CMS.Tools.Save.Hint="Click here to save content.";
  _mfst.Apps.CMS.Tools.Items=new Object();
  _mfst.Apps.CMS.Tools.Items.Add=new Object();
  _mfst.Apps.CMS.Tools.Items.Add.Name="Add";
  _mfst.Apps.CMS.Tools.Items.Add.Hint="Click here to add an item.";
  _mfst.Apps.CMS.Tools.Items.Insert = new Object();
  _mfst.Apps.CMS.Tools.Items.Insert.Name="Insert";
  _mfst.Apps.CMS.Tools.Items.Insert.Hint="Click here to insert an item.";
  _mfst.Apps.CMS.Tools.Items.Delete=new Object();
  _mfst.Apps.CMS.Tools.Items.Delete.Name="Delete";
  _mfst.Apps.CMS.Tools.Items.Delete.Hint="Click here to delete an item.";

  _mfst.Apps.Collage=new Object();
  _mfst.Apps.Collage.Label="Collage";
  _mfst.Apps.Collage.Name="Collages";
  _mfst.Apps.Collage.Title="Collage Publisher";
  _mfst.Apps.Collage.Description="Collage app that offers you public sharing of image collages on the web.";
  _mfst.Apps.Collage.Sample=new Object();
  _mfst.Apps.Collage.Edit=new Object();
  _mfst.Apps.Collage.Edit.AddImage="Add Image...";
  _mfst.Apps.Collage.Edit.RemoveImage="Remove Image...";
  _mfst.Apps.Collage.Edit.RotateImageRight="Rotate image clockwise 45%";
  _mfst.Apps.Collage.Edit.RotateImageLeft="Rotate image counter-clockwise 45%";
  _mfst.Apps.Collage.Edit.MoveImageRight="Reveal more to the right";
  _mfst.Apps.Collage.Edit.MoveImageLeft="Reveal more to the left";
  _mfst.Apps.Collage.Edit.MoveImageTop="Reveal more to the top";
  _mfst.Apps.Collage.Edit.MoveImageBottom="Reveal more to the bottom";
  _mfst.Apps.Collage.Edit.TitleHint="Title of collage";
  _mfst.Apps.Collage.Edit.Title="Collage Title";
  _mfst.Apps.Collage.Edit.DescriptionHint="Please, enter a description for this collage.";
  _mfst.Apps.Collage.Edit.Description="Collage Description";
  _mfst.Apps.Collage.Edit.LocationHint="Location of collage";
  _mfst.Apps.Collage.Edit.Location="Collage Location";

  _mfst.Apps.Collage.Sample.Single=new Object();
  _mfst.Apps.Collage.Sample.Single.Title="Single Box Collage";
  _mfst.Apps.Collage.Sample.Single.Description="Multiple images will switch automatically inside this box.";
  _mfst.Apps.Collage.Sample.Double=new Object();
  _mfst.Apps.Collage.Sample.Double.Title="Double Box Collage";
  _mfst.Apps.Collage.Sample.Double.Description="Multiple images will switch automatically inside these two boxes.";
  _mfst.Apps.Collage.Sample.Tripple=new Object();
  _mfst.Apps.Collage.Sample.Tripple.Title="Tripple Box Collage";
  _mfst.Apps.Collage.Sample.Tripple.Description="Multiple images will switch automatically inside these three boxes.";
  _mfst.Apps.Collage.Sample.Quad=new Object();
  _mfst.Apps.Collage.Sample.Quad.Title="Quadruple Box Collage";
  _mfst.Apps.Collage.Sample.Quad.Description="Multiple images will switch automatically inside these four boxes.";

  _mfst.Apps.Collage.PalmView=new Object();
  _mfst.Apps.Collage.PalmView.Name="Palm View";
  _mfst.Apps.Collage.PalmView.Title="Collage Board Palm View";
  _mfst.Apps.Collage.PalmView.Description="An app so you can share links to your collages on the web.";
  _mfst.Apps.Collage.PalmView.Missing="Problem,";
  _mfst.Apps.Collage.PalmView.CollageNotFound="we can\'t locate this collage.";
  _mfst.Apps.Collage.PalmView.LoadingCollage="Loading collage...";
  _mfst.Apps.Collage.PalmView.LoadingError="Unrecognized collage";
  _mfst.Apps.Collage.PalmView.PostedBy="Posted By";

  _mfst.Apps.Developers=new Object();
  _mfst.Apps.Developers.Name="Developers";
  _mfst.Apps.Developers.Title="Web Application Developers";
  _mfst.Apps.Developers.Description="Application for Aurawin cloud application developement.";
  _mfst.Apps.Developers.Overview=new Object();
  _mfst.Apps.Developers.Overview.Intro="Introduction to Aurawin";
  _mfst.Apps.Developers.Overview.Frame="Leverage our technology";
  _mfst.Apps.Developers.UI=new Object();
  _mfst.Apps.Developers.UI.Intro="Comprehensive User Interface Objects";

  _mfst.Apps.Docs=new Object();
  _mfst.Apps.Docs.Name="Insight";
  _mfst.Apps.Docs.Title="Aurawin Insight";
  _mfst.Apps.Docs.Description="Provides access to organize, search, and access documentation.";

  _mfst.Apps.Downloads=new Object();
  _mfst.Apps.Downloads.Name="Downloads";
  _mfst.Apps.Downloads.Title="Aurawin Downloads";
  _mfst.Apps.Downloads.Description="An application that downloads software to your device.";

  _mfst.Apps.Downloads.Category=new Object();
  _mfst.Apps.Downloads.Category.Server="Server";
  _mfst.Apps.Downloads.Category.Desktop="Desktop";

  _mfst.Apps.Downloads.OS=new Object();

  _mfst.Apps.Downloads.OS.Aurawin="Aurawin";
  _mfst.Apps.Downloads.OS.Windows="Windows 32bit";
  _mfst.Apps.Downloads.OS.Windows64="Windows 64bit";
  _mfst.Apps.Downloads.OS.Linux="Linux 32bit";
  _mfst.Apps.Downloads.OS.Linux64="Linux 64bit";
  _mfst.Apps.Downloads.OS.OSX="OSX 32bit";

  _mfst.Apps.Editor=new Object();
  _mfst.Apps.Editor.CMS=new Object();
  _mfst.Apps.Editor.CMS.Name="CMS Edit";
  _mfst.Apps.Editor.CMS.Title="CMS Editor";
  _mfst.Apps.Editor.CMS.Description="Use the CMS editor to manage domain level content.";
  _mfst.Apps.Editor.CMS.Status=new Object();
  _mfst.Apps.Editor.CMS.Status.Loading="Loading file $uri.";
  _mfst.Apps.Editor.CMS.Status.Saving="Saving file $uri.";
  _mfst.Apps.Editor.CMS.Status.Editing="Editing file $uri.";
  _mfst.Apps.Editor.CMS.Status.Idle="There is no file selected.";


  _mfst.Apps.Editor.Files=new Object();
  _mfst.Apps.Editor.Files.Hints=new Object();
  _mfst.Apps.Editor.Files.Hints.Rename="Enter a name for this file.";

  _mfst.Apps.Editor.Filters=new Object();

  _mfst.Apps.Editor.Filters.All=new Object();
  _mfst.Apps.Editor.Filters.All.Title="All Files";
  _mfst.Apps.Editor.Filters.All.Ext="";

  _mfst.Apps.Editor.Filters.Text=new Object();
  _mfst.Apps.Editor.Filters.Text.Title="Text Files";
  _mfst.Apps.Editor.Filters.Text.Ext="txt";

  _mfst.Apps.Editor.Filters.Html=new Object();
  _mfst.Apps.Editor.Filters.Html.Title="Html Files";
  _mfst.Apps.Editor.Filters.Html.Ext="html htm";

  _mfst.Apps.Editor.Text=new Object();
  _mfst.Apps.Editor.Text.Name="Text";
  _mfst.Apps.Editor.Text.Title="Text Editor";
  _mfst.Apps.Editor.Text.Description="Use the Aurawin text editor to view and edit your text files.";
  _mfst.Apps.Editor.Text.Blank="New";
  _mfst.Apps.Editor.Text.Hints=new Object();
  _mfst.Apps.Editor.Text.Hints.EnterNewFileName="Enter a name for this document";
  _mfst.Apps.Editor.Text.FileName="New.txt";
  _mfst.Apps.Editor.Text.Status=new Object();
  _mfst.Apps.Editor.Text.Status.Loading="Loading file $network/$folder/$file.";
  _mfst.Apps.Editor.Text.Status.Saving="Saving file $network/$folder/$file.";
  _mfst.Apps.Editor.Text.Status.Editing="Editing file $network/$folder/$file.";
  _mfst.Apps.Editor.Text.Status.Empty="Starting with a blank file.";
  _mfst.Apps.Editor.Text.Status.Idle="There are no open files.";
  _mfst.Apps.Enticement=new Object();
  _mfst.Apps.Enticement.Name="Enticement";
  _mfst.Apps.Enticement.Title="Aurawin Enticement";
  _mfst.Apps.Enticement.Description="Aurawin showcase teaser appplication";
  _mfst.Apps.Enticement.Share="share better";
  _mfst.Apps.Enticement.Enjoy="enjoy more";
  _mfst.Apps.Enticement.Collaborate="collaborate";
  _mfst.Apps.Enticement.Friends="with friends";
  _mfst.Apps.Enticement.Family="with family";
  _mfst.Apps.Enticement.LovedOnes="loved ones";
  _mfst.Apps.Enticement.Freedom="it\'s free to use";

  _mfst.Apps.Partners=new Object();
  _mfst.Apps.Partners.Name="Partners";
  _mfst.Apps.Partners.Title="Aurawin Partners";
  _mfst.Apps.Partners.Description="Aurawin partners application";

  _mfst.Apps.PDFViewer=new Object();
  _mfst.Apps.PDFViewer.Name="PDF Viewer";
  _mfst.Apps.PDFViewer.Title="Aurawin PDF Viewer";
  _mfst.Apps.PDFViewer.Description="An application that displays PDF documents";

  _mfst.Apps.Policies=new Object();
  _mfst.Apps.Policies.Name="Policies";
  _mfst.Apps.Policies.Title="Aurawin Policies";
  _mfst.Apps.Policies.Description="Aurawin required reading. This explains all our company policies, notices, and agreement.";
  _mfst.Apps.Policies.AcceptableUse="Acceptable Use";
  _mfst.Apps.Policies.Privacy="Privacy Statement";
  _mfst.Apps.Policies.Agreement="Terms & Conditions";

  _mfst.Apps.Tour=new Object();
  _mfst.Apps.Tour.Name="Tour";
  _mfst.Apps.Tour.Title="Aurawin Tour";
  _mfst.Apps.Tour.Description="Tour Aurawin and find out the features and benefits of our cloud social computing platform";
  _mfst.Apps.Tour.Cloud="Cloud Computing";
  _mfst.Apps.Tour.Social="Social Computing";
  _mfst.Apps.Tour.Secure="Safe & Secure";


  _mfst.Apps.Trash=new Object();
  _mfst.Apps.Trash.Name="Trash";
  _mfst.Apps.Trash.Empty="Empty Trash";
  _mfst.Apps.Trash.Description="This folder stores all deleted files, documents, and media";


  _mfst.Apps.Uploader=new Object();
  _mfst.Apps.Uploader.SelectLocation="Please select a folder first";

  _mfst.Apps.WallPaper=new Object();
  _mfst.Apps.WallPaper.Name="Wall Paper";
  _mfst.Apps.WallPaper.Title="Aurawin Wall Paper";
  _mfst.Apps.WallPaper.Description="This application changes your wall paper.";

  _mfst.Apps.Welcome=new Object();
  _mfst.Apps.Welcome.Name="Welcome";
  _mfst.Apps.Welcome.Title="Aurawin Welcome";
  _mfst.Apps.Welcome.Description="Welcome to Aurawin";
  _mfst.Apps.Welcome.EnterpriseGradeCloud="Enterprise cloud";
  _mfst.Apps.Welcome.CloudDevelopers="Cloud developers";
  _mfst.Apps.Welcome.PersonalGradeCloud="Welcome to your cloud";
  _mfst.Apps.Welcome.Downloads="Aurawin downloads";

  _mfst.Apps.Welcome.Hints=new Object();
  _mfst.Apps.Welcome.Hints.Monument="Monument to Discoveries";
  _mfst.Apps.Welcome.Hints.Tour="Tour Aurawin";
  _mfst.Apps.Welcome.Hints.Policies="Aurawin company policies";
  _mfst.Apps.Welcome.Hints.Signup="Signup! It's free to create your own Aurawin account.";

  _mfst.Apps.ImageViewer=new Object();
  _mfst.Apps.ImageViewer.Name="Image Viewer";
  _mfst.Apps.ImageViewer.Title="Aurawin Image Viewer";
  _mfst.Apps.ImageViewer.Description="An application that displays images";

  _mfst.Apps.MovieViewer=new Object();
  _mfst.Apps.MovieViewer.Name="Movie Player";
  _mfst.Apps.MovieViewer.Title="Aurawin Video Player";
  _mfst.Apps.MovieViewer.Description="An application that plays videos";
  _mfst.Apps.MovieViewer.Converter=new Object();
  _mfst.Apps.MovieViewer.Converter.Title="We're sorry, but you cannot play this video just yet.";
  _mfst.Apps.MovieViewer.Converter.FileNameNotice="The file \"$File\" will need to be converted before you can begin.";
  _mfst.Apps.MovieViewer.Converter.FileNameErrorNotice="We had a problem converting file \"$File\".";
  _mfst.Apps.MovieViewer.Converter.FileNameCopyNotice="The video \"$File\" is scheduled for conversion.  This may take a few minutes.";
  _mfst.Apps.MovieViewer.Converter.Notice="We will make a copy of the original file and play the upgraded version.";
  _mfst.Apps.MovieViewer.Converter.ErrorNotice="We were unable to make a copy of the original.";
  _mfst.Apps.MovieViewer.Converter.CopyNotice="Please be patient while we convert your movie.  After we are done, the movie will begin playing.";
  _mfst.Apps.MovieViewer.Converter.getFileNameText=function(sName){
    return this.FileNameNotice.replace("$File",sName);
  };
  _mfst.Apps.MovieViewer.Converter.getFileNameErrorText=function(sName){
    return this.FileNameErrorNotice.replace("$File",sName);
  };
  _mfst.Apps.MovieViewer.Converter.getFileNameCopyText=function(sName){
    return this.FileNameCopyNotice.replace("$File",sName);
  };
  _mfst.Apps.Music=new Object();
  _mfst.Apps.Music.Name="Music";
  _mfst.Apps.Music.My="My Music";
  _mfst.Apps.Music.Title="Music Player";
  _mfst.Apps.Music.Description="An application to organize, share, and play your music.";
  _mfst.Apps.Music.Genre=new Array(
    "Blues",                 // 0
    "Classic Rock",          // 1
    "Country",               // 2
    "Dance",                 // 3
    "Disco",                 // 4
    "Funk",                  // 5
    "Grunge",                // 6
    "Hip-Hop",               // 7
    "Jazz",                  // 8
    "Metal",                 // 9
    "New Age",               // 10
    "Oldies",                // 11
    "Other",                 // 12
    "Pop",                   // 13
    "R&B",                   // 14
    "Rap",                   // 15
    "Reggae",                // 16
    "Rock",                  // 17
    "Techno",                // 18
    "Industrial",            // 19
    "Alternative",           // 20
    "Ska",                   // 21
    "Death Metal",           // 22
    "Pranks",                // 23
    "Soundtrack",            // 24
    "Euro-Techno",           // 25
    "Ambient",               // 26
    "Trip-Hop",              // 27
    "Vocal",                 // 28
    "Jazz+Funk",             // 29
    "Fusion",                // 30
    "Trance",                // 31
    "Classical",             // 32
    "Instrumental",          // 33
    "Acid",                  // 34
    "House",                 // 35
    "Game",                  // 36
    "Sound Clip",            // 37
    "Gospel",                // 38
    "Noise",                 // 39
    "Alternative",           // 40
    "Bass",                  // 41
    "Soul",                  // 42
    "Punk",                  // 43
    "Space",                 // 44
    "Meditative",            // 45
    "Instrumental Pop",      // 46
    "Instrumental Rock",     // 47
    "Ethnic",                // 48
    "Gothic",                // 49
    "Darkwave",              // 50
    "Techno-Industrial",     // 51
    "Electronic",            // 52
    "Pop-Folk",              // 53
    "Eurodance",             // 54
    "Dream",                 // 55
    "Southern Rock",         // 56
    "Comedy",                // 57
    "Cult",                  // 58
    "Gangsta",               // 59
    "Top 40",                // 60
    "Christian Rap",         // 61
    "Pop/Funk",              // 62
    "Jungle",                // 63
    "Native American",       // 64
    "Cabaret",               // 65
    "New Wave",              // 66
    "Psychadelic",           // 67
    "Rave",                  // 68
    "Showtunes",             // 69
    "Trailer",               // 70
    "Lo-Fi",                 // 71
    "Tribal",                // 72
    "Acid Punk",             // 73
    "Acid Jazz",             // 74
    "Polka",                 // 75
    "Retro",                 // 76
    "Musical",               // 77
    "Rock & Roll",           // 78
    "Hard Rock",             // 79
    "Folk",                  // 80
    "Folk-Rock",             // 81
    "National Folk",         // 82
    "Swing",                 // 83
    "Fast Fusion",           // 84
    "Bebob",                 // 85
    "Latin",                 // 86
    "Revival",               // 87
    "Celtic",                // 88
    "Bluegrass",             // 89
    "Avantgarde",            // 90
    "Gothic Rock",           // 91
    "Progressive Rock",      // 92
    "Psychedelic Rock",      // 93
    "Symphonic Rock",        // 94
    "Slow Rock",             // 95
    "Big Band",              // 96
    "Chorus",                // 97
    "Easy Listening",        // 98
    "Acoustic",              // 99
    "Humour",                // 100
    "Speech",                // 101
    "Chanson",               // 102
    "Opera",                 // 103
    "Chamber Music",         // 104
    "Sonata",                // 105
    "Symphony",              // 106
    "Botty Bass",            // 107
    "Primus",                // 108
    "Groovy",                // 109
    "Satire",                // 110
    "Slow Jam",              // 111
    "Club",                  // 112
    "Tango",                 // 113
    "Samba",                 // 114
    "Folklore",              // 115
    "Ballad",                // 116
    "Power Ballad",          // 117
    "Rhythmic Soul",         // 118
    "Freestyle",             // 119
    "Duet",                  // 120
    "Punk Rock",             // 121
    "Drum Solo",             // 122
    "A capella",             // 123
    "Euro-House",            // 124
    "Dance Hall"             // 125
  );
  _mfst.Apps.Music.Player=new Object();
  _mfst.Apps.Music.Player.Label="Player";

  _mfst.Apps.Music.PlayList=new Object();
  _mfst.Apps.Music.PlayList.Label="Play List";
  _mfst.Apps.Music.PlayList.Menu="Play Lists";

  _mfst.Apps.Music.Status=new Object();
  _mfst.Apps.Music.Status.Play="Playing $song by $artist.";
  _mfst.Apps.Music.Status.Stop="$song by $artist has finished playing.";
  _mfst.Apps.Music.Status.Pause="Paused playing $song by $artist.";

  _mfst.Apps.Music.Genre.Option="Genre";
  _mfst.Apps.Music.Genre.Unknown="Unknown";
  _mfst.Apps.Music.Genre.Hints=new Object();
  _mfst.Apps.Music.Genre.Hints.Select="List songs with a genre";
  _mfst.Apps.Music.Search=new Object();
  _mfst.Apps.Music.Search.Select="Select what to search";
  _mfst.Apps.Music.Search.Input="Enter a song, album, or artist";
  _mfst.Apps.Music.Search.Hint="You can search for songs, albums, or artists";
  _mfst.Apps.Music.Search.Options=new Array("Search","Artist","Album","Genre");
  _mfst.Apps.Music.Artist="Artist";
  _mfst.Apps.Music.Album="Album";

  _mfst.Apps.Music.Hints=new Object();
  _mfst.Apps.Music.Hints.Repeat="Repeat playing songs";
  _mfst.Apps.Music.Hints.Play="Play current selection";
  _mfst.Apps.Music.Hints.PlayFromList="Play items from this list";

  _mfst.Apps.Music.Hints.Stop="Stop playing current selection";
  _mfst.Apps.Music.Hints.StopFromList="Stop playing items from this list";
  _mfst.Apps.Music.Hints.Shuffle="Shuffle current selection";
  _mfst.Apps.Music.Hints.Search="Types of search";
  _mfst.Apps.Music.Hints.SelectArtist="List songs by artist";
  _mfst.Apps.Music.Hints.SelectAlbum="List songs by album";
  _mfst.Apps.Music.Inspecting="Inspecting";
  _mfst.Apps.Music.Genre.toString=function(idx){
    var lst=this;
    if ((idx>-1) && (idx<lst.length)) return lst[idx];
    return lst.Unknown;
  };
  _mfst.Apps.Music.Genre.setOptions=function(sel){
    var lst=this;
    sel.options.length=lst.length;
    for (var iLcv=0; iLcv<lst.length; iLcv++){
      sel.options[iLcv]=new Option(lst[iLcv],iLcv, false, false);
    };
  };
  _mfst.Apps.Social=new Object();
  _mfst.Apps.Social.Label="Social";
  _mfst.Apps.Social.Name="Networking";
  _mfst.Apps.Social.Title="Social Networking";
  _mfst.Apps.Social.Description="Social networking is where you can manage the way you connect and share with others.";
  _mfst.Apps.Social.Stream="Stream";
  _mfst.Apps.Social.Converse="Converse";
  _mfst.Apps.Social.Cabinet="Cabinet";

  _mfst.Apps.Social.Networks=new Object();
  _mfst.Apps.Social.Networks.My="My Networks";
  _mfst.Apps.Social.Networks.Other="Other Networks";
  _mfst.Apps.Social.Networks.All="All Networks";
  _mfst.Apps.Social.Networks.Search=new Object();
  _mfst.Apps.Social.Networks.Search.Hint="Find a network";
  _mfst.Apps.Social.Networks.Search.Group="Search Results";
  _mfst.Apps.Social.Networks.Menu="Networks";

  _mfst.Apps.Social.Network=new Object();
  _mfst.Apps.Social.Network.Avatar="Avatar";
  _mfst.Apps.Social.Network.New="New Network";
  _mfst.Apps.Social.Network.Edit="Edit Network";
  _mfst.Apps.Social.Network.Public="Public";
  _mfst.Apps.Social.Network.Private="Private";
  _mfst.Apps.Social.Network.Requests="Requests";
  _mfst.Apps.Social.Network.Pending="Pending";
  _mfst.Apps.Social.Network.Members=new Object();
  _mfst.Apps.Social.Network.Members.Public="Public";
  _mfst.Apps.Social.Network.Members.Private="Private";
  _mfst.Apps.Social.Network.SetAvatar="Select image...";

  _mfst.Apps.Social.Request=new Object();
  _mfst.Apps.Social.Request.Join="Please enter a brief message to become a member of this network.";
  _mfst.Apps.Social.Request.NoMessage="No request message given";
  _mfst.Apps.Social.Request.ResponseMessage="Enter response message";

  _mfst.Apps.Devices=new Object();
  _mfst.Apps.Devices.Name="Devices";
  _mfst.Apps.Devices.Title="Cloud Devices";
  _mfst.Apps.Devices.Description="System resources are cloud respresentations of real world devices.  You can independantly synchronize files from each device to the Cabinet.  For cloud access to files select the Devices folder in the Cabinet.";
  _mfst.Apps.Devices.Direction=new Object();
  _mfst.Apps.Devices.Direction.Off="Off";
  _mfst.Apps.Devices.Direction.Upload="device to cloud";
  _mfst.Apps.Devices.Direction.Download="device from cloud";
  _mfst.Apps.Devices.Direction.Both="device to & from cloud";


  _mfst.Apps.Spectrum=new Object();
  _mfst.Apps.Spectrum.Composer=new Object();
  _mfst.Apps.Spectrum.Composer.Description="Spectrum message is a great way to to compose plain and rich text messages";
  _mfst.Apps.Spectrum.Composer.Status="Click here to start typing a new message.";
  _mfst.Apps.Spectrum.Composer.Writer="Writing message: $message";
  _mfst.Apps.Spectrum.Contacts=new Object();
  _mfst.Apps.Spectrum.Contacts.Description="Spectrum contacts offers the best way to manage your connection to people";
  _mfst.Apps.Spectrum.Email=new Object();
  _mfst.Apps.Spectrum.Email.Description="The Spectrum email application";
  _mfst.Apps.Spectrum.Email.Hint=new Object();
  _mfst.Apps.Spectrum.Email.Hint.Attachments="View message attachments.";
  _mfst.Apps.Spectrum.Email.Hint.Junk="Move message to Spam folder.";
  _mfst.Apps.Spectrum.Email.Hint.Unjunk="Move message to Inbox.";
  _mfst.Apps.Spectrum.Email.Hint.MarkRead="Mark message as read.";
  _mfst.Apps.Spectrum.Email.Hint.MarkUnread="Mark message as unread.";
  _mfst.Apps.Spectrum.Email.Hint.Pin="Pin message to top of view.";
  _mfst.Apps.Spectrum.Email.Hint.Unpin="Unpin message from top of view.";
  _mfst.Apps.Spectrum.Email.Hint.Trash="Move message to the Trash.";
  _mfst.Apps.Spectrum.Email.Seperator=new Object()
  _mfst.Apps.Spectrum.Email.Seperator.Name=",";
  _mfst.Apps.Spectrum.Email.Group=new Object();
  _mfst.Apps.Spectrum.Email.Group.Label=new Object();
  _mfst.Apps.Spectrum.Email.Group.Label.Pinned="Pinned";
  _mfst.Apps.Spectrum.Email.Group.Label.Unread="Unread";
  _mfst.Apps.Spectrum.Email.Group.Label.Default="Otherwise";
  _mfst.Apps.Spectrum.Email.Group.Label.Empty=new Object();
  _mfst.Apps.Spectrum.Email.Group.Label.Empty.Pinned="There are no pinned items to view.";
  _mfst.Apps.Spectrum.Email.Group.Label.Empty.Unread="There are no unread items to view.";
  _mfst.Apps.Spectrum.Email.Group.Label.Empty.Default="There are no items to view otherwise.";

  _mfst.Apps.Spectrum.Email.Group.Label.getEmpty=function(sGroup){
    return this.Empty.replace("$Group",sGroup);
  };
  _mfst.Apps.Spectrum.Folders=new Object();
  _mfst.Apps.Spectrum.Folders.My="My Folders";
  _mfst.Apps.Spectrum.Folders.Description="Cabinet that stores folders, files, pictures, emails, texts, and attachments";
  _mfst.Apps.Spectrum.Folders.Cabinet="Spectrum Cabinet";
  _mfst.Apps.Spectrum.Folders.Name="Cabinet";
  _mfst.Apps.Spectrum.Folders.Devices="Devices";
  _mfst.Apps.Spectrum.Folders.Documents="Documents";
  _mfst.Apps.Spectrum.Folders.Mail="Mail";
  _mfst.Apps.Spectrum.Folders.Music="Music";
  _mfst.Apps.Spectrum.Folders.Pictures="Pictures";
  _mfst.Apps.Spectrum.Folders.Trash="Trash";
  _mfst.Apps.Spectrum.Folders.Videos="Videos";

  _mfst.Apps.Spectrum.Inbox=new Object();
  _mfst.Apps.Spectrum.Inbox.Description="Spectrum Inbox displays incoming email";
  _mfst.Apps.Spectrum.Inbox.Status=new Object();
  _mfst.Apps.Spectrum.Inbox.Status.Mailbox="Inbox contains <b>$unread</b> unread message(s) of $total total message(s)";

  _mfst.Apps.Spectrum.Inbox.Status.Read="Reading an incoming message";
  _mfst.Apps.Spectrum.Inbox.Status.Deleting="Deleting messages";
  _mfst.Apps.Spectrum.Signatures=new Object();
  _mfst.Apps.Spectrum.Signatures.Description="This Spectrum application provides you a great way to append signatures to messages";

  _mfst.Apps.VDM=new Object();
  _mfst.Apps.VDM.Start="Start";
  _mfst.Apps.VDM.Applications="Applications";
  _mfst.Apps.VDM.Windows="Windows";
  _mfst.Apps.VDM.Switch="Swap";
  _mfst.Apps.VDM.Close="Close";
  _mfst.Apps.VDM.Starting="Starting";

  _mfst.Apps.VDM.Status=new Object();
  _mfst.Apps.VDM.Status.Welcome="Welcome $User!";
  _mfst.Apps.VDM.Status.Booted="Aurawin is $Status.";
  _mfst.Apps.VDM.Status.getBootedText=function(bErrored){
    if (bErrored){
      return this.Booted.replace("$Status",coLang.Table.Labels.Down);
    } else {
      return this.Booted.replace("$Status",coLang.Table.Labels.Ready);
    }
  };

  _mfst.Apps.VDM.Status.Creds="Checking your credentials.";
  _mfst.Apps.VDM.Status.Contacts="Your contacts have been retrieved.";
  _mfst.Apps.VDM.Status.Folders="Your folders have been retrieved.";
  _mfst.Apps.VDM.Status.LoggedOut="$User, has been logged off.";
  _mfst.Apps.VDM.Status.CacheUpdated="Reloading Aurawin...";
  _mfst.Apps.VDM.Status.CacheInstall="Aurawin is updating...";

  _mfst.Apps.VDM.Status.getLoggedOut=function(){
    var s=this.LoggedOut.replace("$User",coAccount.App.DB.MAP.First.Value);
    return s;
  }
  _mfst.Dialogs=new Object();
  _mfst.Dialogs.NoFolderSelected="No folder selected";
  _mfst.Dialogs.File=new Object();
  _mfst.Dialogs.File.Name="File";
  _mfst.Dialogs.File.Title="Please select a file";
  _mfst.Dialogs.File.Description="File Selection Dialog Box";
  _mfst.Dialogs.File.Save="Saving, but please provide a filename...";
  _mfst.Dialogs.File.Open="Opening, but please select a file...";

  _mfst.Dialogs.Pictures=new Object();
  _mfst.Dialogs.Pictures.Name="Pictures";
  _mfst.Dialogs.Pictures.Title="Please select a picture";
  _mfst.Dialogs.Pictures.Description="Pictures Dialog Box";
  _mfst.Dialogs.Pictures.List=new Object();
  _mfst.Dialogs.Pictures.List.Title="Pictures";
  _mfst.Dialogs.Pictures.List.Description=function(path){
    return "List of pictures in $path".replace("$path",path);
  };

  _mfst.Status=new Object();
  _mfst.Status.User=new Object();
  _mfst.Status.User.Seperator=" - ";
  _mfst.Status.User.Online="Online";
  _mfst.Status.User.Offline="Offline";
  _mfst.Status.User.Away="Away";
  _mfst.Status.User.Busy="Busy";
  _mfst.Status.Mail=new Object();
  _mfst.Status.Mail.Read="Read";
  _mfst.Status.Mail.Unread="Unread";
  _mfst.Status.Mail.Forward="Forward";
  _mfst.Status.Mail.Replied="Replied";
  _mfst.Status.Viewer=new Object();
  _mfst.Status.Viewer.Movie=new Object();
  _mfst.Status.Viewer.Movie.Loading="Loading /$Path/$Name...";
  _mfst.Status.Viewer.Movie.Viewing="Watching image /$Path/$Name";
  _mfst.Status.Viewer.Image=new Object();
  _mfst.Status.Viewer.Image.Loading="Loading /$Path/$Name...";
  _mfst.Status.Viewer.Image.Viewing="Viewing image /$Path/$Name";
  _mfst.Status.Viewer.Image.Idle="Waiting for you to select an image to view.";


  return _mfst;
};

