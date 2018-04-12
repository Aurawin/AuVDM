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
  	return this;
  },
  addScripts:function(list){
  	let s=null;
  	let sc=null;
  	let c=null;
  	let bFound=false;
  	for (iLcv=0; iLcv<list.length; iLcv++){
  		s=list[iLcv];
  		bFound=false;
  		for(jLcv=0; jLcv<Scripts.List.length; jLcv++){
			if (Scripts.List[jLcv].Unit==s.src){
				bFound=true;
			}
		}
		if (!bFound){
			sc =document.createElement('script');
			sc.src=s;
			sc.setAttribute("scan",sc.Name);
			AppKit.Timers.ScriptsTimer.setActive(true);
		}
  	}
  }
};
