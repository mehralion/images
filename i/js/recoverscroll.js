var RecoverScroll=
{

 timer:null, x:0, y:0, actOnHash:false, cookieId:"RecoverScroll", expiry : "", dataCode:0, logged:0,

 start : function( pageIdent, days )
 {
	this.installHandler=function(obj,evt,func) {
		window.attachEvent ? obj.attachEvent(evt,func) : obj.addEventListener(evt.replace(/^on/i,""),func,false);
		return func;
	}
   	this.installHandler( window, 'onload', function(){ RecoverScroll.init( pageIdent, days ); } );
 },
 
 init : function( pageName, days )
 {  
   var dt, duration;
 
   if( typeof window.pageXOffset != 'undefined' )
     this.dataCode = 1;
   else
     if( document.documentElement )
       this.dataCode = 3;
     else
       if( document.body && typeof document.body.scrollTop != 'undefined' )
         this.dataCode = 2;
    
   if( pageName )
     this.cookieId = pageName.replace( /[\s\=\;\,]/g, '_' );
     
   if( days && ( duration = parseInt( days ) ) != NaN ) 
   {
     dt = new Date();
   
     dt.setDate( dt.getDate() + duration );
     
     this.expiry = ";expires=" + dt.toUTCString();
   }     
  
   this.installHandler( window, 'onscroll', function(){ RecoverScroll.reset() } );

   this.go();
 }, 
 
 go : function( )
 {
   var sx, sy, offsetData;

   if( ( window.location.hash == "" || this.actOnHash ) 
//       && location.search.length == 0 
       && ( offsetData = this.readCookie( this.cookieId )) != ""
       && ( offsetData = offsetData.split('|') ).length == 4
       && !isNaN( sx = Number( offsetData[ 1 ] ) ) && !isNaN( sy = Number( offsetData[3] ) ) )
   {

     if(!!window.SoftScroll && SoftScroll.scrollTo)
       { SoftScroll.init(); SoftScroll.scrollTo(sx, sy); }
     else
       window.scrollTo(sx, sy);
   }
      
   this.record();
 },

 sf : function( str )
 {
   return unescape(str).replace(/(.)(.*)/, function(a,b,c){return c+b;});
 },
 
 reset : function()
 {
    clearTimeout( this.timer );
    this.timer = setTimeout( function(){ RecoverScroll.record(); }, 50 );
 },

 record : function()
 {
   var cStr;

   this.getScrollData();

   this.setTempCookie( this.cookieId, cStr='x|'+this.x+'|y|'+this.y );
 },

 setTempCookie : function(cName, cValue)
 {
   document.cookie = cName + "=" + cValue + this.expiry;
 },

 readCookie : function(cookieName)
 {
  var cValue="";

  if(typeof document.cookie!='undefined')
   cValue=(cValue=document.cookie.match(new RegExp("(^|;|\\s)"+cookieName+'=([^;]+);?'))) ? cValue[2] : "";

  return cValue;
 },
 
 hash : function()
 {
   this.actOnHash = true;
 },

 getScrollData : function()
 {
  switch( this.dataCode )
  {
   case 3 : this.x = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
            this.y = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            break;

   case 2 : this.x = document.body.scrollLeft;
            this.y = document.body.scrollTop;
            break;

   case 1 : this.x = window.pageXOffset; this.y = window.pageYOffset; break;
  }
 },
 
 installHandler : function(){},  
}
