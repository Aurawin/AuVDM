const Scripts={
  Unit           : '',
  Loaded         : true,
  Initialized    : false,
  debugToConsole : false,

  List	 		 : List.createArray(),

  createScript:function(src,name){
  	s = Objects.createNew("Script");
  	s.src=src;
  	s.Name=name;
    s.loadFailedAlerted=false;
  	return s;
  },
  addScripts:function(list){
  	let s=null;
  	let sc=null;
  	let c=null;
  	let bFound=false;

  	for (let iLcv=0; iLcv<list.length; iLcv++){
  		s=list[iLcv];
  		bFound=false;
  		for(let jLcv=0; jLcv<Scripts.List.length; jLcv++){
  			if (Scripts.List[jLcv].Unit==s.src){
  				bFound=true;
  			}
      }
      if (!bFound){
        sc =document.createElement('script');
        sc.src=s.src;
        sc.setAttribute("scan",s.Name);
        document.getElementsByTagName("head")[0].appendChild(sc);
        AppKit.Timers.ScriptsTimer.setActive(true);
        Scripts.List.Add(s);
  		}
  	}
  }
};
