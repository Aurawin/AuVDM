const Units = {
  Unit           : '/core/app/boot/Units.js',
  Loaded         : true,
  debugToConsole : false,
	List : List.createArray(),
	createUnit : function(name, src, preLoaded){
		let u = new Object();
		u.Class="Unit";
		u.src=src;
		u.Name=name;
		u.Loaded=preLoaded;
		this.List.push(u);
		return u;
	}

};

