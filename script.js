var marginY = 0;
var destination = 0;
var speed = 10;
var scroller = null;

function initScroll(elementId){
	destination = document.getElementById('scrollcontent').offsetTop;
	
	scroller = setTimeout(function(){
		initScroll(elementId);
	}, 1);

	marginY = marginY + speed;

	if(marginY >= destination){
		clearTimeout(scroller);
	}	

	window.scroll(0, marginY);
}

window.onscroll = function(){
	marginY = this.pageYOffset;	
};
function toTop(){
	scroller = setTimeout(function(){
		toTop();
	}, 1);

	marginY = marginY - speed;

	if(marginY <= 0){
		clearTimeout(scroller);
	}	

	window.scroll(0, marginY);
}

function openNav() {
    document.getElementById("navMobile").style.width = "300px";
}

function closeNav() {
    document.getElementById("navMobile").style.width = "0";
}
