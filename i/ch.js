//-------------------------------------------------------------
// ‘ункци€ дл€ определени€ координат указател€ мыши
function defPosition(event) {
      var x = y = 0;
      if (document.attachEvent != null) { // Internet Explorer & Opera
            x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
			if (window.event.clientY + 72 > document.body.clientHeight) { y-=68 } else { y-=2 }
      } else if (!document.attachEvent && document.addEventListener) { // Gecko
            x = event.clientX + window.scrollX;
            y = event.clientY + window.scrollY;
			if (event.clientY + 72 > document.body.clientHeight) { y-=68 } else { y-=2 }
      } else {
            // Do nothing
      }
      return {x:x, y:y};
}
function defPosition2(event) {
      var x = y = 0;
      if (document.attachEvent != null) { // Internet Explorer & Opera
            x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
			if (window.event.clientY + 10 > document.body.clientHeight) { y-=6 } else { y-=2 }
      } else if (!document.attachEvent && document.addEventListener) { // Gecko
            x = event.clientX + window.scrollX;
            y = event.clientY + window.scrollY;
			if (event.clientY + 10 > document.body.clientHeight) { y-=6 } else { y-=2 }
      } else {
            // Do nothing
      }
      return {x:x, y:y};
}

var flagpop=0;
 var clip = new ZeroClipboard.Client();
 	 clip.setHandCursor( true );
	 clip.setCSSEffects(true);

	 clip.addEventListener( 'onComplete', function(client){
											  clip.hide();
											  cMenu();
	 } );

function OpenMenu2(evt,level,txt){
    evt = evt || window.event;
    evt.cancelBubble = true;
    // ѕоказываем собственное контекстное меню
    var menu = document.getElementById("oMenu");
    var html = "";
	html  = '<a href="javascript:void(0)" class="menuItem" onclick="window.open(\'topal.php?id='+level+'&t='+txt+'\',\'help\',\'height=300,width=500,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes\'); cMenu();">—ообщить о нарушении</a>';
 // ≈сли есть что показать - показываем
    if (html){
        menu.innerHTML = html;
        menu.style.top = defPosition2(evt).y + "px";
        menu.style.left = defPosition2(evt).x + "px";
        menu.style.display = "";
    }
    // Ѕлокируем всплывание стандартного браузерного меню
    return false;
}



function OpenMenu(evt,level){
    evt = evt || window.event;
    evt.cancelBubble = true;
    // ѕоказываем собственное контекстное меню
    var menu = document.getElementById("oMenu");
    var html = "";
	login=(evt.target || evt.srcElement).innerHTML;

	clip.setText(login);

	var i1, i2;
	if ((i1 = login.indexOf('['))>=0 && (i2 = login.indexOf(']'))>0) login=login.substring(i1+1, i2);

	var login2 = login;
	login2 = login2.replace('%', '%25');
	while (login2.indexOf('+')>=0) login2 = login2.replace('+', '%2B');
	while (login2.indexOf('#')>=0) login2 = login2.replace('#', '%23');
	while (login2.indexOf('?')>=0) login2 = login2.replace('?', '%3F');

	html  = '<a href="javascript:void(0)" class="menuItem" onclick="top.AddTo(\''+login+'\');cMenu()">TO</a>'+
	'<a href="javascript:void(0)" class="menuItem" onclick="top.AddToPrivate(\''+login+'\');cMenu()">PRIVATE</a>'+
	'<a href="javascript:void(0)" class="menuItem" onclick="window.open(\'inf.php?login='+login+'\')"; cMenu();">INFO</a>'+
	'<A HREF="javascript:void(0)" class="menuItem" onclick="AddToList(\''+login+'\',1);return false;">TO FRIENDS</A>'+
	//'<A HREF="javascript:void(0)" class="menuItem" onclick="AddToList(\''+login+'\',2);return false;">TO IGNORE</A>'+
	'<div class="my_clip_button" id="d_clip_button">COPY</div>';

 // ≈сли есть что показать - показываем
    if (html){
        menu.innerHTML = html;
        menu.style.top = defPosition(evt).y + "px";
        menu.style.left = defPosition(evt).x + "px";
        menu.style.display = "";
    }
	if (flagpop==0){
		flagpop=1;
		clip.glue( 'd_clip_button' )
	}
	else
		clip.reposition('d_clip_button');
    // Ѕлокируем всплывание стандартного браузерного меню
    return false;
}


function AddToList(login, type) {
	mypath = "friends.php?FindLogin="+login+"&pals=1";
	if (type == 2) {
		mypath += "1&addenemy";
	}

	top.frames['main'].location = mypath;
}



function addHandler(object, event, handler, useCapture){
    if (object.addEventListener){
        object.addEventListener(event, handler, useCapture ? useCapture : false);
    } else if (object.attachEvent){
        object.attachEvent('on' + event, handler);
    } else alert("Add handler is not supported");
}

addHandler(document, "contextmenu", function(){
    document.getElementById("oMenu").style.display = "none";
});

addHandler(document, "click", function(){
	clip.hide();
    document.getElementById("oMenu").style.display = "none";
});

function cMenu() {
  /*document.all("oMenu").style.visibility = "hidden";
  document.all("oMenu").style.top="0px";*/
  document.getElementById("oMenu").style.display = "none";
  top.frames['bottom'].window.document.F1.text.focus();
}
//-------------------------------------------------------------------------