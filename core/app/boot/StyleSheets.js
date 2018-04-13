const StyleSheets={
  Unit           : '',
  Loaded         : true,
  Initialized    : false,
  debugToConsole : false,

  List	 		 : List.createArray(),

  createSheet:function(src,name){
  	s = Objects.createNew("StyleSheet");
  	s.src=src;
  	s.Name=name;
  	return this;
  },
  addSheets:function(list){
  	let s=null;
  	let sc=null;
  	let c=null;
    let lnk=null;
  	let bFound=false;

  	for (let iLcv=0; iLcv<list.length; iLcv++){
  		s=list[iLcv];
  		bFound=false;
  		for(let jLcv=0; jLcv<StyleSheets.List.length; jLcv++){
			  if (StyleSheets.List[jLcv].Unit==s.src){
				  bFound=true;
        }
			}
      if (!bFound) {
        lnk =document.createElement('link');
        lnk.href=s.src;
        lnk.rel="stylesheet";
        lnk.type="text/css";
        lnk.setAttribute("scan",s.Name);
        AppKit.Timers.StyleSheetsTimer.setActive(true);
      }
		}
  }
};
