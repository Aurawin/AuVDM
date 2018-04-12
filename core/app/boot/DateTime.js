const DateTime={
  Unit           : '',
  Loaded         : true,
  Initialized    : false,
  debugToConsole : false,
  
  HoursPerDay    : 24,
  MinsPerHour    : 60,
  SecsPerMin     : 60,
  SecsPerHour    : 60*60,
  SecsPerDay     : 60*60*24,
  formatShort    : 0,
  formatLong     : 1,
  MSecsPerSec    : 1000,
  MinsPerDay     : 24 * 60,
  SecsPerDay     : 24 *60 * 60,
  MSecsPerDay    : 24 *60 * 60 * 1000,
  DOWMap         : [undefined,7, 1, 2, 3, 4, 5, 6],
  TimeZoneOffset : null,
  DateOffset     : null,
  DST            : null,
  // DateTime holds the date as the number of days since 30 Dec 1899, known as Microsoft Excel epoch}
  JulianEpoch    : -2415018.5,
  UnixEpoch      : -2415018.5 + 2440587.5,
  DateDelta      : 693594, // Days between 1/1/0001 and 12/31/1899
  UnixDateDelta  : Math.round(-2415018.5 + 2440587.5),
  DateTimeEpsilon : 2.2204460493E-16,
  MonthDays      : new Array(),
  
  init : function(){

    this.Initialized=true;
    this.DST=this.getDST();
    this.TimeZoneOffset=(this.DST==true)? this.getTimezoneOffset() : this.getStandardTimezoneOffset();
    this.DateOffset=-1*this.TimeZoneOffset*60;

    this.MonthDays[0]=this.DayTable(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    this.MonthDays[1]=this.DayTable(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  },

  isLeapYear : function(Year){
    return (Year%4==0) && (( Year%100!=0) || (Year%400==0));
  },
  getStandardTimezoneOffset : function() {
    D=new Date();
    var jan = new Date(D.getFullYear(), 0, 1);
    var jul = new Date(D.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  },
  getTimezoneOffset : function(){
    var D=new Date();
    return D.getTimezoneOffset();
  },
  getDST:function(){
    return this.getTimezoneOffset() < this.getStandardTimezoneOffset();
  },
  Now : function(){
    var now=new Date;
    var d=this.encodeDate(now.getFullYear(),now.getMonth()+1,now.getDate());
    var t=this.encodeTime(now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds());
    if (d < 0) {
      return Numbers.Trunc(d) - Math.abs(Numbers.Frac(t));
    } else {
      return Numbers.Trunc(d) + Math.abs(Numbers.Frac(t));
    };
  },
  Date : function(iYear,iMonth,iDay){
    var dt=new Object();
    dt.Year=(iYear==undefined) ? 0 : iYear;
    dt.Month=(iMonth==undefined) ? 0 : iMonth;
    dt.Day=(iDay==undefined) ? 0 : iDay;
    dt.toString=function(iFormat){
      if (iFormat==undefined) iFormat=DateTime.formatShort;
      var dt=this;
      var sYear="".concat(dt.Year);
      var sMonth="".concat(dt.Month);
      var sDay="".concat(dt.Day);
      if (sDay.length==1) sDay="0"+sDay;
      // todo day of week if format has long day
      var sOut="";
      switch (iFormat){
        case (DateTime.formatShort) : sOut=coLang.Table.Date.Format.Short; break;
        case (DateTime.formatLong) : sOut=coLang.Table.Date.Format.Long; break;
      };
      sOut=sOut.replace("YYYY",sYear);
      sOut=sOut.replace("MM",sMonth);
      sOut=sOut.replace("DD",sDay);
      return sOut;
    };
    return dt;
  },
  Time : function(iHour,iMinute,iSecond,iMilliSecond){
    var tm=new Object();
    tm.Hour=iHour;
    tm.Minute=iMinute;
    tm.Second=iSecond;
    tm.Millisecond=iMilliSecond;
    tm.toString=function(iFormat){
      if (iFormat==undefined) iFormat=DateTime.formatShort;
      var tm=this;
      var sMD="";
      var iHour=tm.Hour;
      var sMin="".concat(tm.Minute);
      var sSec="".concat(tm.Second);
      var sMS="".concat(tm.Millisecond);
      var sHour="";
      if (sMin.length==1) sMin="0"+sMin;
      if (sSec.length==1) sSec="0"+sSec;
      if ( coLang.Table.Time.Meridiem.Enabled==true) {
        if (tm.Hour<12) {
          sMD=coLang.Table.Time.Meridiem.Ante;
          if (iHour==0) iHour=12;
        } else {
          sMD=coLang.Table.Time.Meridiem.Post;
          if (iHour>12)
            iHour-=12;
        };
        var sHour="".concat(iHour);
      } else {
        sHour = (iHour<10) ? "0".concat(iHour) : "".concat(iHour);
      };
      var sOut="";
      switch (iFormat){
        case (DateTime.formatShort) : sOut=coLang.Table.Time.Format.Short; break;
        case (DateTime.formatLong) : sOut=coLang.Table.Time.Format.Long; break;
      };

      sOut=sOut.replace("HH",sHour);
      sOut=sOut.replace("MM",sMin);
      sOut=sOut.replace("SS",sSec);
      sOut=sOut.replace("MS",sMS);
      sOut=sOut.replace("MD",sMD);
      return sOut;
    };
    return tm;
  },
  DateWeek : function(iYear,iWeek,iDay){
    this.Year=(iYear)? iYear : 0;
    this.Week=(iWeek)? iWeek : 0;
    this.Day=(iDay)? iDay : 0;
    return this;
  },
  DayTable : function(v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12){
    tbl=new Array();
    tbl.length=13;
    tbl[0]=null;
    tbl[1]=v1;
    tbl[2]=v2;
    tbl[3]=v3;
    tbl[4]=v4;
    tbl[5]=v5;
    tbl[6]=v6;
    tbl[7]=v7;
    tbl[8]=v8;
    tbl[9]=v9;
    tbl[10]=v10;
    tbl[11]=v11;
    tbl[12]=v12;
    return tbl;
  },
  decodeTime : function(dtValue){
    var iVal = Math.floor(Math.abs(Numbers.Frac(dtValue)) * DateTime.MSecsPerDay);
    var iHour=Math.floor(iVal / 3600000);
    iVal=iVal % 3600000;
    var iMinute= Math.floor(iVal / 60000);
    iVal=iVal % 60000;
    var iSecond = Math.floor(iVal / 1000);
    iVal = iVal % 1000;
    var iMilliSecond = iVal;
    return DateTime.Time(iHour,iMinute,iSecond,iMilliSecond);
  },
  decodeDate : function(dtValue){
    var iYear=0,iMonth=0,iDay=0, iVal=0;
    if (dtValue <=-DateTime.DateDelta){
      return DateTime.Date();
    } else {
      var iVal=Numbers.Pred((Numbers.Trunc(dtValue) + 693900) << 2);
      var iYear=Numbers.Div(iVal,146097);
      iVal=iVal - (146097 * iYear);
      iDay=iVal >> 2;
      iVal=Numbers.Div((iDay << 2) + 3,1461);
      iDay= ( (iDay << 2) + 7 - (1461*iVal)) >> 2;
      iMonth=Numbers.Div( ( (5 * iDay) -3), 153);
      iDay= Numbers.Div( ( (5 * iDay) +2 - (153*iMonth) ) , 5);
      iYear= (100 * iYear) + iVal;
      if (iMonth < 10) {
        iMonth+=3;
      } else {
        iMonth-=9;
        iYear+=1;
      }
      return DateTime.Date(iYear,iMonth,iDay);
    }
  },
  decodeDateTime : function(dtValue){
    dt=new Object();

    dt.Date=DateTime.decodeDate(dtValue);
    dt.Time=DateTime.decodeTime(dtValue);
    dt.toString=function(iFormat){
      if (iFormat==undefined) iFormat=DateTime.formatShort;
      var dt=this;
      var sDate=dt.Date.toString();
      var sTime=dt.Time.toString();
      var sOut="";
      switch (iFormat){
        case (DateTime.formatShort) : sOut=coLang.Table.DateTime.Format.Short; break;
        case (DateTime.formatLong) : sOut=coLang.Table.DateTime.Format.Long; break;
      };
      sOut=sOut.replace("DATE",sDate);
      sOut=sOut.replace("TIME",sTime);
      return sOut;
    };
    return dt;
  },
  decodeDateWeek:function(dtValue){
    var iYear=this.YearOf(AValue);
    var iDayOfWeek=this.dayOfWeek(dtValue)-1;
    if (iDayOfWeek==0) iDayofWeek=7;

    var dtYS=this.startOfAYear(iYear);
    var iDOY=Numbers.Trunc(dtValue-dtYs)+1;
    iYSDOW=this.DayOfTheWeek(dtYs);

    if (iYSDOW<5) {
      iDOY+=iYSDOW-1;
    } else {
      iDOY-=8-iYSDOW;
    };
    if (iDOY<=0) {
      // Day is in last week of previous year.
      return this.decodeDateWeek(dtYS-1);
    } else {
      iWeekOfYear=Numbers.Div(iDOY,7);
      if ((iDOY % 7)!=0) {
        iWeekOfYear+=1;
      };
      if (iWeekOfYear>52){
        iYEDOW=iYSDOW;
        if (this.isLeapYear(iYear)) {
          iYEDOW+=1;
          if (iYEDOW>7)
            iYEDOW=1;
        };
        if (iYEDOW<4){
          iYear+=1;
          iWeekOfYear=1;
        };
      };
    };
    return new DateWeek(iYear,iWeekOfYear,iDayOfWeek);
  },
  encodeDate:function(iYear,iMonth,iDay){
    if (
      ((iYear>0) && (iYear<10000)) &&
      ((iMonth>0) && (iMonth<13)) &&
      (iDay>0)
    ){
      if (iMonth>2){
        iMonth-=3;
      } else {
        iMonth+=9;
        iYear-=1;
      };
      var c=Numbers.Div(iYear,100);
      var ya=iYear - 100*c;
      var D=((146097*c) >> 2) + ((1461*ya) >>2) + Numbers.Div(((153*iMonth)+2),5) + iDay;
      D-=693900;
      return D;
    } else {
      return null;
    };
  },
  encodeTime:function(iHour,iMin,iSec,iMSec){
    if (
         (iHour<24) &&
         (iMin<60) &&
         (iSec<60) &&
         (iMSec<1000)
    ) {
      return (iHour*3600000 +iMin*60000 + iSec*1000 + iMSec)/this.MSecsPerDay;
    } else {
      return null;
    };
  },
  checkForTimeAdjustment:function(dtOld,dtNew){
    if ( (dtOld>0) && (dtNew<0) ){
      dtNew=dtNew-0.5;
    } else if ((dtOld<-1.0) && (dtNew>-1.0)){
      dtNew=dtNew+0.5;
    };
    return dtNew;
  },

  incSecond : function (dtValue,iSeconds){
    var dt=dtValue+(iSeconds / this.SecsPerDay);
    return this.checkForTimeAdjustment(dtValue,dt);
  },
  incMinute : function (dtValue,iMinutes){
    var dt=dtValue+(iMinutes / this.MinsPerDay);
    return this.checkForTimeAdjustment(dtValue,dt);
  },
  yearOf:function(dtValue){
   var d=this.DecodeDate(dtValue);
   return d.Year;
  },
  monthOf:function(dtValue){
   var d=this.DecodeDate(dtValue);
   return d.Month;
  },
  weekOf:function(dtValue){
    var d=this.weekOfTheYear(dtValue);
  },
  dayOf:function(dtValue){
  },
  hourOf:function(dtValue){
  },
  minuteOf:function(dtValue){
  },
  secondOf:function(dtValue){
  },
  milliSecondOf:function(dtValue){
  },
  weeksInYear:function(dtValue){
    return this.weeksInAYear(this.yearOf(dtValue));
  },
  weeksInAYear:function(aYear){
  },
  daysInYear:function(dtValue){
  },
  daysInAYear:function(aYear){
  },
  daysInMonth:function(dtValue){
  },
  daysInAMonth:function(aYear,aMonth){
  },
  dayOfTheWeek:function(dtValue){
    return this.DOWMap[this.dayOfWeek(dtValue)];
  },
  yearOf:function(dtValue){
  },
  monthOf:function(dtValue){
  },
  weekOf:function(dtValue){
  },
  weekOfTheYear:function(dtValue){

  },
  dayOf:function(dtValue){
  },
  hourOf:function(dtValue){
  },
  minuteOf:function(dtValue){
  },
  secondOf:function(dtValue){
  },
  milliSecondOf:function(dtValue){
  },
  startOfAYear:function(aYear) {
    return this.EncodeDate(aYear,1,1);
  },
  dateTimeDiff:function(dtNow,dtThen){
    r= dtNow - dtThen;
    if ( (dtNow>0) && (dtThen<0)) {
      r=r-0.5;
    } else if ((dtNow<-1.0) && (dtThen>-1.0) ){
      r=r+0.5;
    };
    return r;
  },
  secondsBetween:function(dtNow,dtThen){
    return Numbers.Trunc( (Math.abs(this.dateTimeDiff(dtNow,dtThen))+this.DateTimeEpsilon)*this.SecsPerDay);
  },
  minutesBetween:function(dtNow,dtThen){
    return Numbers.Trunc( (Math.abs(this.dateTimeDiff(dtNow,dtThen))+this.DateTimeEpsilon)*this.MinutesPerDay);
  },
  hoursBetween:function(dtNow,dtThen){
    return Numbers.Trunc( (Math.abs(this.dateTimeDiff(dtNow,dtThen))+this.DateTimeEpsilon)*this.HoursPerDay);
  },
  daysBetween:function(dtNow,dtThen){
    return Numbers.Trunc( Math.abs(this.dateTimeDiff(dtNow,dtThen))+this.DateTimeEpsilon);
  },
  dayOfWeek:function(dtValue){
    iResult= 1 + ((Numbers.Trunc(dtValue) - 1) % 7);
    If (iResult<=0)
      iResult+=7;
    return iResult;
  }
};
DateTime.init();