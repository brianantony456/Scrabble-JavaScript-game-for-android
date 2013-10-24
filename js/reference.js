//////////////////////////////////////////////////////////////////////////////////////////
//__init__(): 
//twitter @brianantony456
//initial declarations
var level=1;
var eWords={},Next=false,Pause=false,isDispAlert=true,exit=false;
var saveState=[], allValid=[];
var rand;
var WordNo=0,stateVar=0;
var Score=0;
var scrambled,maxlength=0;
var counter=120,value=true;
var words=JSON.parse(localStorage["words"]);
var dictionary=JSON.parse(localStorage["dictionary"]);
//
//
/////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////
// android cordova api
// for back hardware button
//
function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
}			
function onDeviceReady() {// Register the event listener
	document.addEventListener("backbutton", onBackKeyDown, false);
}			
function onBackKeyDown() {
	showConfirm();
}			
function onConfirm(buttonIndex) {
	if(buttonIndex===2){
		window.location.href='index.html';
	}
}		
function showConfirm() {
	navigator.notification.confirm(
		'Are you sure ?',  // message
		onConfirm,         // callback to invoke with index of button pressed
		'Exit',            // title
		'No,Yes'          // buttonLabels
	);
}
//
//
///////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////
// necessary definations
//
//
// all valid from dictionary for the scrambled word
function allValidWords(current){
		for(l=5;l<=current.length;l++)
		for(var key in dictionary[l]){
			Value=true;
			var n=current.split('');
			kl=key.length;
			for(m=0;m<kl;m++){
				index=n.indexOf(key[m]);
				if(index===-1){
					Value=false;
					break;
				}
				else
					n.splice(index,1);
			}
			if(Value)
				allValid.push(key);
		}
}
//twitter @brianantony456
// available word size block (empty blocks)
function createStringInitial(word_current){
	var temp_string='';
	for(temp in word_current){
		temp_string+="<b style=\"display:inline-block;width:"+blocksize+"px;height:"+blocksize*1.2+"px;font-size:"+blocksize+"px;background-image:url('images/block.png');background-size:100% 100%;background-repeat:no repeat;margin:0px;\">"+word_current[temp]+"</b>";
	}
	return temp_string;
}

// available word size block with letters after being confirmed as valid
function createString(word_current){
	var temp_string='';
	for(temp in word_current){
		temp_string+="<b style=\"display:inline-block;width:"+blocksize+"px;height:"+blocksize*1.4+"px;font-size:"+blocksize+"px;text-align:center;text-transform:uppercase;background-image:url('images/block.png');background-size:100% 100%;background-repeat:no repeat;margin:0px;\">"+word_current[temp]+"</b>";
	}
	return temp_string;
}

// arrange boxes in the form of ellipse
function arrangeBoxes(){
		var len=allValid.length;
		var temp=0;
		var temp1="";
		document.getElementById("one_id").innerHTML="";
		document.getElementById("two_id").innerHTML="";
		document.getElementById("three_id").innerHTML="";
		while(temp<len)
		{
			if(allValid[temp].length<5){
				temp1="";
				for(allValid[temp].length in allValid[temp])
					temp1+=" ";
				document.getElementById("one_id").innerHTML+="<div style=\"font-weight:900;display:block;height:"+blocksize*1.2+"px;\" id="+allValid[temp]+">"+createStringInitial(temp1)+"</div>";
				temp++;
			}
			if(allValid[temp].length<5){
				temp1="";
				for( temp2 in allValid[temp])
					temp1+=" ";
				document.getElementById("two_id").innerHTML+="<div style=\"font-weight:900;display:block;height:"+blocksize*1.2+"px;\" id="+allValid[temp]+">"+createStringInitial(temp1)+"</div>";
				temp++;
			}			
			if(allValid[temp].length>=5){
				temp1="";
				for(allValid[temp].length in allValid[temp])
					temp1+=" ";
				document.getElementById("three_id").innerHTML+="<div style=\"];font-weight:900;display:block;height:"+blocksize*1.2+"px;\" id="+allValid[temp]+">"+createStringInitial(temp1)+"</div>";
				temp++;
			}			
		}
}

//select a random word from dictionary and scramble it
function wordScramble(s){
	while(true){
		var word1= s.split(''),scram= '';
		while(word1.length){
			scram+= word1.splice(Math.floor(Math.random()*word1.length), 1)[0];
		}
		if(!(scram.substring(0,2)===(words[WordNo]).substring(0,2)))
			break;
		}
		return scram;
}
	
	
function dispScrambled(){
	var Length=scrambled.length;
	switch(Length){
	case 6:{var len=['top:29%;left:2%;',
			 'top:5%;left:28%;',
			 'top:5%;left:53%;',
			 'top:29%;left:78%;',
			 'top:58%;left:53%;',
			 'top:58%;left:28%;'];
			 break;}
	case 8:{var len=['top:30%;left:0%;',
			 'top:5%;left:20%;',
			 'top:2%;left:41%;',
			 'top:5%;left:61%;',
			 'top:30%;left:82%;',
			 'top:55%;left:61%;',
			 'top:58%;left:41%;',
			 'top:55%;left:20%;'];
			 break;}
	case 7:{var len=['top:46%;left:6%;',
			 'top:4%;left:20%;',
			 'top:1%;left:41%;',
			 'top:4%;left:63%;',
			 'top:46%;left:80%;',
			 'top:58%;left:30%;',
			 'top:58%;left:56%;'];
			 break;}
	}
	document.getElementById("ran_id").innerHTML="";
	document.getElementById("con_id").innerHTML="";
	for(var l=0;l<Length;l++)
	document.getElementById("ran_id").innerHTML=document.getElementById("ran_id").innerHTML+"<b style=\""+len[l]+"position:absolute;display:block;z-index:0;text-transform:uppercase;font-size:"+(fsize)+"px;\
		font-weight:700;float:left;padding:5px;text-align:center;background-image:url('images/button.png');\
		height:"+(fsize+margright)+"px;width:"+(fsize+margright)+"px;background-size:100% 100%;opacity:1.0;\" div=\"but"+l+"\" ontouchstart=\"changeAct(this)\">"+scrambled[l]+"</b>";
}

// shuffle the current word
function scrabble(){
	document.getElementById('scramble_id').style.opacity=0.5;
	scrambled=wordScramble(scrambled);
	dispScrambled();
	setTimeout(function(){document.getElementById('scramble_id').style.opacity=1.0},200);
}

// rejumble the words and display as ellipse
function reset(){
	document.getElementById('reset_id').style.opacity=0.5;
	dispScrambled();
	setTimeout(function(){document.getElementById('reset_id').style.opacity=1.0},200);
	
}

// animation on button click (ie. make it little opaque)
function changeAct(x){
	if(x.style.opacity!=0.3)
	{
	document.getElementById("con_id").innerHTML=document.getElementById("con_id").innerHTML+x.innerHTML;
	saveState[++stateVar]=document.getElementById("ran_id").innerHTML;
	x.style.opacity=0.3;	
	
	}
}

//when back arrow pressed
function backPressed()
{
	document.getElementById('backbut_id').style.opacity=0.5;
	var Value=document.getElementById("con_id").innerHTML;
	Value=Value.replace(" ","");
	var Length=Value.length;
	if(Length>0){
		document.getElementById("con_id").innerHTML=Value.slice(0,Length-1);
		document.getElementById("ran_id").innerHTML=saveState.pop();
	}
	setTimeout(function(){document.getElementById('backbut_id').style.opacity=1.0},200);
}

// when touched enter
function enterPressed(){
	var temp;
	document.getElementById('enterbut_id').style.opacity=0.5;
	var Value=document.getElementById("con_id").innerHTML;
	Value=Value.replace(" ","");
	var Length=Value.length;
	if(Length<=5)
		var Length1=5;
	else
		var Length1=Length;
	if(Value in dictionary[Length1] && !(Value in eWords)){
		switch(Length){
			case 3:Score+=5;
				temp=5;
				break;
			case 4:Score+=10;
				temp=10;
				break;
			case 5:Score+=20;
				temp=20;
				break;
			case 6:Score+=50;
				temp=50;
				break;
			case 7:Score+=75;
				temp=75;
				break;
			case 8:Score+=100;
				temp=100;
				break;
		}
	document.getElementById('dispScore_id').style.display="block";
	document.getElementById('dispScore_id').innerHTML="+"+temp;
	document.getElementById("Score_id").innerHTML="Score: "+Score;
	document.getElementById(Value).innerHTML=createString(Value);
	eWords[Value]=0;
	setTimeout(function(){document.getElementById('dispScore_id').style.display="none";},1000);
	}
	document.getElementById("con_id").innerHTML="";
	dispScrambled();
	setTimeout(function(){document.getElementById('enterbut_id').style.opacity=1.0},200);
}

//hide the dictionary
function hidedic(){
	document.getElementById("dictionary_id").innerHTML="";
	document.getElementById("dictionary_id").style.display="none";
}

//display dictionary for the touched work
function showDict(y){
	var word=y.innerHTML;
	document.getElementById("dictionary_id").style.display="block";
	document.getElementById('dictionary_id').innerHTML="<div ontouchstart=\"hidedic();\" style='background-image:url(\"images/close.png\");z-index:13;height:7%;width:8%;position:fixed;top:0%;right:0%;background-repeat:no-repeat;background-size:100% 100%'></div>\
	<iframe style='width:100%;height:99%;position:absolute;top:0%;left:0%' src='http://m.dictionary.com/?q="+word+"&submit-result-SEARCHD=Search'></iframe>";
}

// timeout alert window
function dispAlert(y){
		document.getElementById('alert_id').display="block";
		document.getElementById("text1_id").innerHTML="Level:"+level;
		document.getElementById("one_id").innerHTML=" ";
		document.getElementById("two_id").innerHTML=" ";
		document.getElementById("three_id").innerHTML=" ";
	if(y){
	document.getElementById('alert_id').innerHTML="\
		<div style=\"top:13%;height:87%;width:100%;position:absolute;z-index:9;background-image:url('images/back.jpg');\">\
		<div style=\"font-size:"+fsize+"px;font-weight:900;position:absolute;top:0%;margin-left:3%;color:brown;\">Congratulations! Click on words below to find their meaning!</div>\
		<div id=\"allvalid_id\" style=\"\position:absolute;top:20%;left:5%;display:block;right:5%;width:90%;height:65%;overflow-y:scroll;\"></div>\
		<button ontouchstart=\"Next=true;\" style=\"position:absolute;top:88%;color:white;font-size:"+fsize+"px;background-image:url('images/appendb.jpg');height:8%;width:50%;left:25%;right:25%;text-align:center;background-size:100% 100%;background-repeat:no-repeat;\">Next</button>\
		</div>";
		}
		else
		{
		document.getElementById('alert_id').innerHTML="\
		<div style=\"top:13%;height:87%;width:100%;position:absolute;z-index:9;background-image:url('images/back.jpg');\">\
		<div style=\"font-size:"+fsize+"px;font-weight:900;position:absolute;top:0%;margin-left:3%;color:brown;\">Word not guessed. Click on words below to find their meaning!</div>\
		<div id=\"allvalid_id\" style=\"\position:absolute;top:20%;left:5%;display:block;overflow-x:hidden;overflow-y:scroll;right:5%;width:90%;height:65%;\"></div>\
		<button ontouchstart=\"exit=true;\" style=\"position:absolute;color:white;top:88%;font-size:"+fsize+"px;background-image:url('images/appendb.jpg');height:8%;width:50%;left:25%;right:25%;text-align:center;background-size:100% 100%;background-repeat:no-repeat;\">Exit</button>\
		</div>";
		}
		Length=allValid.length;
		for(n=0;n<Length;n++){
			if(allValid[n] in eWords)
				document.getElementById('allvalid_id').innerHTML+="<div style='display:block;background-image:url(\"images/topbar.png\");background-repeat:no-repeat;background-size:100% 100%;text-align:left;color:black;;margin-top:"+margtop*1.2+"px;padding:"+margtop*2+"px;font-size:"+fsize+"px;'><b ontouchstart=\'showDict(this)\'>"+allValid[n]+"</b></div>";
			else
				document.getElementById('allvalid_id').innerHTML+="<div style='display:block;background-image:url(\"images/topbar.png\");background-repeat:no-repeat;background-size:100% 100%;text-align:left;padding:"+margtop*2+"px;margin-top:"+margtop*1.3+"px;font-size:"+fsize+"px;color:white;'><b ontouchstart=\'showDict(this)\'>"+allValid[n]+"</b></div>";
		}
		document.getElementById("loading_id").style.display="none";
}
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////







///////////////////////////////////////////////////////////////////////////////////////////////////
// main part of program
//
//
//
//
//
rand=words[WordNo];
scrambled=wordScramble(rand);
dispScrambled();
allValidWords(rand);
arrangeBoxes();
document.getElementById("loading_id").style.display="none";
setInterval(timer,1000);
function timer(){
	if(counter!==0)
		--counter;
	else
		Pause=true;
	document.getElementById("clock_id").innerHTML=Math.floor(counter/60)+":"+(counter%60);
	if(Pause)
	{	
		maxlength=0;
		for(temp in eWords){
			if(temp.length>maxlength)
				maxlength=temp.length;
		}
		if(isDispAlert){
				if(!(rand.length===maxlength))
					{
						document.getElementById("loading_id").style.display="block";
						document.getElementById('alert_id').style.display="block";
						dispAlert(false);
					}
				else
					{
						document.getElementById("loading_id").style.display="block";
						document.getElementById('alert_id').style.display="block";
						dispAlert(true);
					}
			isDispAlert=false;
		}
		if(exit)
			window.location.href='index.html';
		if(Next){
			document.getElementById("loading_id").style.display="block";
			document.getElementById('alert_id').innerHTML="";
			document.getElementById('alert_id').style.display="none";
			document.getElementById("append_id").innerHTML="";
			document.getElementById("con_id").innerHTML="";
			eWords={};
			WordNo++;
			if((WordNo+1)%6==0){
				level++;
				if(WordNo>(words.length-6)){
					var array=[];
						for(var q in dictionary[8])
							array.push(q);
					for(var p=0;p<6;p++)
						while(true){
							var num = Math.floor(Math.random()*array.length);
							if(!(array[num] in words)){
								 words[(words.length+1)]=array[num];
								break;
							}	
						}
				}
			}
//twitter @brianantony456
			stateVar=0;
			saveState=[];
			allValid=[];
			counter=120;
			Next=false;
			isDispAlert=true;
			exit=false;
			Pause=false;
			rand=words[WordNo];
			scrambled=wordScramble(rand);
			allValidWords(rand);
			document.getElementById("fix_id").innerHTML='<div style="margin-left:auto;margin-right:auto;" id="append_id">\
			<div id="one_id"style="width:20%;height:53%;position:absolute;left:5%;overflow-x:hidden;overflow-y:scroll;"></div>\
			<div id="two_id" style="width:25%;height:53%;position:absolute;left:30%;overflow-x:hidden;overflow-y:scroll;"></div>\
			<div id="three_id" style="width:40%;height:53%;;position:absolute;left:59%;overflow-x:hidden;overflow-y:scroll;"></div>\
			</div>';
			arrangeBoxes();
			dispScrambled();
			document.getElementById("loading_id").style.display="none";
		}
	}
}
//
////twitter @brianantony456
//////////////////////////////////////////////////////////////////////////////////////////////
	
