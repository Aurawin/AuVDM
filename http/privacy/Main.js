var  divNavBar=divMain=divWrapper=null,divPolicy=null;
function doResize1(){
  //var iOffset = (divMain.scrollHeight<=divMain.clientHeight) ? 0 : divMain.offsetWidth-divMain.clientWidth;
  divMain.style.width=divMain.offsetParent.clientWidth-(divMain.offsetLeft)+"px";
  divMain.style.opacity=1;
  var iHeight=divPolicy.offsetTop;
  divMain.style.height=iHeight+"px";
};
function doResize2(){
  //var iOffset = (divMain.scrollHeight<=divMain.clientHeight) ? 0 : divMain.offsetWidth-divMain.clientWidth;
  divMain.style.width=divMain.offsetParent.clientWidth-(divMain.offsetLeft)+"px";
  divMain.style.opacity=1;
  var iHeight=divPolicy.offsetTop;
  divMain.style.height=iHeight+"px";
};
var doResize=doResize1;
function doLoad(){
  window.scrollTo(0,1);
  divWrapper=document.getElementById("cmpWrapper");
  divNavBar=document.getElementById("NavBar");
  divMain=document.getElementById("Main");
  divPolicy=document.getElementById("Policy");
  doResize1();
  doResize=doResize2;
  doResize();
};

