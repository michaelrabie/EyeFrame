gamelength=15;
timerID=null
var playing=false;
var numholes=5*10;
var currentpos=-1;
function clrholes() {
	for(var k=0;k<document.dmz.elements.length;k++)
		document.dmz.elements[k].checked=false;
}
function stoptimer() {
	if(playing)
		clearTimeout(timerID);
}
function showtime(remtime) {
	document.cpanel.timeleft.value=remtime;
	if(playing) {
		if(remtime==0) {
			game_over();
			return;
		}
		else {
			temp=remtime-1;
			timerID=setTimeout("showtime(temp)",1000);
		}
	}
}
function stopgame() {
	stoptimer();
	playing=false;
	clrholes();
	display("Game Over");
}
function easy() {
	gamelength=20;
}
function medium() {
	gamelength=15;
}
function hard() {
	gamelength=10
}
function play() {
	stoptimer();
	if(playing) {
		stopgame();
		return;
	}
	playing=true;
	clrholes();
	totalhits=0;
	document.cpanel.score.value=totalhits;
	display("Playing");
	launch();
	showtime(gamelength);
}
function display(msg) {
	document.cpanel.state.value=msg;
}
function launch() {
	var launched=false;
	while(!launched) {
		mynum=random();
		if(mynum!=currentpos) {
			document.dmz.elements[mynum].checked=true;
			currentpos=mynum;
			launched=true;
		}
	}
}

function hithead(id) {
	if(playing==false) {
		clrholes();
		display("Push Start to Play");
		return;
	}
	if(currentpos!=id) {
		totalhits=Number(document.cpanel.score.value)-1;
		document.cpanel.score.value=totalhits;
		document.dmz.elements[id].checked=false;
	}
	else {
		totalhits=Number(document.cpanel.score.value)+1;
		document.cpanel.score.value=totalhits;
		launch();
		document.dmz.elements[id].checked=false;
		stoptimer();
		showtime(gamelength);
	}
}

function random() {
	return(Math.floor(Math.random()*100%numholes));
}