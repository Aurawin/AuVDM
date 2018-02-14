var  divTNBIDownloads=divTNBIDevelopers=divTNBIPartners=divTNBIEnterprise=divTNBIHome=divWrapper=divTopNavBarTitle=null;

function doLoad(){
  var html=document.getElementsByTagName('html')[0];
  html.style.overflow="auto";
  window.scrollTo(0,1);
  document.body.style.margin="0";
  document.body.style.padding="0";
  document.body.style.overflow="auto";
  divWrapper=document.getElementById("cmpWrapper");

  divTopNavBarTitle=coDOM.$("TopNavBarTitle");
  divTNBIHome=coDOM.$("TNBIHome");
  divTNBIEnterprise=coDOM.$("TNBIEnterprise");
  divTNBIPartners=coDOM.$("TNBIPartners");
  divTNBIDevelopers=coDOM.$("TNBIDevelopers");
  divTNBIDownloads=coDOM.$("TNBIDownloads");
  divTNBIHome.firstElementChild.setAttribute("disabled","disabled");
  coDOM.setText(divTopNavBarTitle,"Aurawin");
};


