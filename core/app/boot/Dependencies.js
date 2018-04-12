const NoDependencies = [];
const Dependencies = {
  Unit           : '/core/app/boot/Dependencies.js',
  Loaded         : true,
  debugToConsole : false,

  createList: function(){
    var lst=List.createArray();
    lst.Class="Dependencies";
    lst.Add=function(app,src,loaded){
      var lst=this;

      var dep=lst.Find(src);
      if (!dep) {
        var sExt=Utils.extractFileExt(src).toLowerCase();
        var dep=Objects.createNew("Dependency");
        dep.App=app;
        dep.Apps=List.createArray();

        dep.Apps.Add=function(App){
          var idx=this.indexOf(App);
          if (idx==-1)
            this.push(App);
        };
        
        dep.Source=src;
        dep.Requested=false;
        dep.Loaded=(loaded==undefined) ? false : loaded;
        dep.PreLoaded=(loaded!=undefined) ? loaded : false;
        dep.Kind= (sExt=="css") ? AppKit.ukStyleSheet : AppKit.ukJavaScript;
        lst.Add(dep);
      } else if (dep.App==null){
        dep.App=app;
      };
      if (loaded!=undefined) dep.PreLoaded=(dep.PreLoaded || loaded);
      if (dep.PreLoaded==true)
        dep.Loaded=true;
      if (app){
        app.Dependencies.Add(dep);
        dep.Apps.Add(app);
      };
      return dep;
    };
    lst.Add=function(dep){
      var idx=this.indexOf(dep);
      if (idx==-1)
        this.push(dep);
    };
    lst.Find=function(src){
      var lst=this;
      for (var iLcv=0; iLcv<lst.length; iLcv++){
        if (lst[iLcv].Source==src)
          return lst[iLcv];
      };
      return null;
    };
    lst.styleSheets=List.createArray();
    lst.getLoaded=function(){
      var deps=this;
      var iCt=0;
      for (var iLcv=0; iLcv<deps.length; iLcv++){
        var dep=deps[iLcv];
        if (dep.Loaded==true) {
          iCt+=1;
        };/* else if (dep.Kind==AppKit.ukJavaScript){
          dep.Loaded=coDOM.isJavaScriptLoaded(dep.Source);
        } else if (dep.Kind==AppKit.ukStyleSheet){
          dep.Loaded=coDOM.isStyleSheetLoaded(dep.Source);
        };
        */
      };
      return iCt;
    };
    return lst;
  }

};