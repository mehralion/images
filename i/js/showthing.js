function absPosition(obj) {
      var x = y = 0;
      while(obj) {
            x += obj.offsetLeft;
            y += obj.offsetTop;
            obj = obj.offsetParent;
      }
      return {x:x, y:y};
}

function ShowThing(obj,txt)	{
var xshift=55;
var yshift=55;
setTimeout(function(){ShowThingMain(obj,txt,xshift,yshift);},11);

}

function ShowThingMain(obj,txt,xshift,yshift)	{
var img_x=absPosition(obj).x;
var img_y=absPosition(obj).y;
img_y=img_y+yshift;
img_x=img_x+xshift;
if (document.getElementById("thing_"+img_x+img_y))
	{document.getElementById("thing_"+img_x+img_y).style.display='block';}
else	{
    		var divTag = document.createElement("div");
    		divTag.id = "thing_"+img_x+img_y;
//			alert (divTag.id);
    		divTag.style.position = "absolute";
    		divTag.style.zIndex = 9;
    		divTag.style.border = "1px solid black";
    		divTag.style.top = img_y + "px";
    		divTag.style.left = img_x + "px";
    		divTag.style.backgroundColor = "#ffffe1";
    		divTag.style.minWidth = "100px"
    		divTag.style.maxWidth = "400px";
    		divTag.style.paddingLeft = "5px";
    		divTag.style.paddingRight = "5px";
    		divTag.style.paddingTop = "2px";
    		divTag.style.paddingBottom = "2px";
    		divTag.style.boxShadow = "5px 5px 5px black";
    		divTag.style.boxShadow = "5px 5px 10px rgba(0,0,0,0.5)";
    		divTag.style.MozBoxShadow = "5px 5px 10px rgba(0,0,0,0.5)";
    		divTag.style.WebkitBoxShadow = "5px 5px 10px rgba(0,0,0,0.5)";			
    		divTag.style.borderRadius = "0px 5px 5px 5px";
    		divTag.style.MozBorderRadius = "0px 5px 5px 5px";
    		divTag.style.WebkitBorderRadius = "0px 5px 5px 5px";
			divTag.style.lineHeight = "10px";
			divTag.style.fontSize = "9px";
			
    		divTag.className ="dynamicDiv";
    		divTag.innerHTML = txt;
    		document.body.appendChild(divTag);
		}
}

function HideThing(obj)	{
var xshift=55;
var yshift=55;
var img_x=absPosition(obj).x;
var img_y=absPosition(obj).y;
img_y=img_y+yshift;
img_x=img_x+xshift;
document.getElementById("thing_"+img_x+img_y).style.display='none';
}