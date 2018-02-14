var divWrapper=null;
var iCompWidth=0, iCompHeight=0;

function doResize(){
  divWrapper.style.left= Math.max( ((document.documentElement.clientWidth-iCompWidth) / 2), 10 ) + "px";
};

function doLoad(){
  divWrapper=document.getElementById("cmpWrapper");
  iCompWidth=divWrapper.offsetWidth;
  iCompHeight=divWrapper.offsetHeight;
  divWrapper.style.marginLeft="0px";
  doResize();
};

