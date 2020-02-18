function selectTab() {
	document.getElementById("startTab").click();	
}

function openTab(evt, tabName) {
	  var i, tabcontent, tablinks;

	  tabcontent = document.getElementsByClassName("tabcontent");
	  for (i = 0; i < tabcontent.length; i++) {
	    tabcontent[i].style.display = "none";
	  }	

	  tablinks = document.getElementsByClassName("tablinks");
	  for (i = 0; i < tablinks.length; i++) {
	    tablinks[i].className = tablinks[i].className.replace(" active", "");
	  }

	  document.getElementById(tabName).style.display = "block";
	  evt.currentTarget.className += " active";
}

function submit(){
	selectTab();
	var teamNum = document.getElementById("teamNum").value;
	var matchNum = document.getElementById("matchNum").value;
	var isValid = document.getElementById("isValid").checked;
	var startingPos = document.getElementById("startingPos");
	startingPos = startingPos.options[startingPos.selectedIndex].value;
	var startingLv = document.getElementById("startingLv");
	startingLv = startingLv.options[startingLv.selectedIndex].value;
	
	var isCrossedLine = document.getElementById("isCrossedLine").checked;
	var sComment = document.getElementById("sComment").value;
	
	var playStyle = document.getElementById("playstyle");
	playStyle = playStyle.options[playStyle.selectedIndex].value;
	var isGroundHatch = document.getElementById("isGroundHatch").checked;
	var isGroundCargo = document.getElementById("isGroundCargo").checked;
	var hatchCleared = document.getElementById("hatchCleared");
	hatchCleared = hatchCleared.options[hatchCleared.selectedIndex].value;
	var cargoCleared = document.getElementById("cargoCleared");
	cargoCleared = cargoCleared.options[cargoCleared.selectedIndex].value;
	var tComment = document.getElementById("tComment").value;
	
	var timeClimb = document.getElementById("timeClimb");
	timeClimb = timeClimb.options[timeClimb.selectedIndex].value;
	var climbLv = document.getElementById("climbLv");
	climbLv = climbLv.options[climbLv.selectedIndex].value;
	var gotAssist = document.getElementById("gotAssist").checked;
	var assist = document.getElementById("assist").checked;
	var eComment = document.getElementById("eComment").value;
	
	sFarRocketHatchNum = document.getElementById("sFarRocketHatchNum").innerHTML;
	sFarRocketCargoNum = document.getElementById("sFarRocketCargoNum").innerHTML;
	sCargoShipHatchNum = document.getElementById("sCargoShipHatchNum").innerHTML;
	sCargoShipCargoNum = document.getElementById("sCargoShipCargoNum").innerHTML;
	sCloseRocketHatchNum = document.getElementById("sCloseRocketHatchNum").innerHTML;
	sCloseRocketCargoNum = document.getElementById("sCloseRocketCargoNum").innerHTML;
	sTotalHatch = document.getElementById("sTotalHatch").innerHTML;
	sTotalCargo = document.getElementById("sTotalCargo").innerHTML;
	tFarRocketHatchNum = document.getElementById("tFarRocketHatchNum").innerHTML;
	tFarRocketCargoNum = document.getElementById("tFarRocketCargoNum").innerHTML;
	tCargoShipHatchNum = document.getElementById("tCargoShipHatchNum").innerHTML;
	tCargoShipCargoNum = document.getElementById("tCargoShipCargoNum").innerHTML;
	tCloseRocketHatchNum = document.getElementById("tCloseRocketHatchNum").innerHTML;
	tCloseRocketCargoNum = document.getElementById("tCloseRocketCargoNum").innerHTML;
	tTotalHatch = document.getElementById("tTotalHatch").innerHTML;
	tTotalCargo = document.getElementById("tTotalCargo").innerHTML;
	farRocketHatchNum = document.getElementById("farRocketHatchNum").innerHTML;
	farRocketCargoNum = document.getElementById("farRocketCargoNum").innerHTML;
	cargoShipHatchNum = document.getElementById("cargoShipHatchNum").innerHTML;
	cargoShipCargoNum = document.getElementById("cargoShipCargoNum").innerHTML;
	closeRocketHatchNum = document.getElementById("closeRocketHatchNum").innerHTML;
	closeRocketCargoNum = document.getElementById("closeRocketCargoNum").innerHTML;
	totalHatch = document.getElementById("totalHatch").innerHTML;
	totalCargo = document.getElementById("totalCargo").innerHTML;
	
	const data = new Array(teamNum, matchNum, isValid, startingPos, startingLv, isCrossedLine, playStyle, isGroundHatch, 
						   isGroundCargo, hatchCleared, cargoCleared, timeClimb, climbLv, gotAssist, assist,
						   sTotalHatch, sTotalCargo, tTotalHatch, tTotalCargo);
	var rawData = '';
	for(var i=0; i < data.length; i++) {
		data[i] = data[i].toString().replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g," ");
		rawData += data[i] + ', ';
	}
	
	const comments = new Array(sComment, tComment, eComment);
	for(var i=0, l=39; i < comments.length; i++, l++) {
		comments[i] = comments[i].toString().replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g," ");
		comments[i] = comments[i].replace(',', ' ');
		
		rawData += comments[i] + ', ';
	} 	
	
	rawData = rawData.substring(0, rawData.length - 2);
	
	console.log(rawData);
	
	filename = teamNum+"_"+matchNum+".csv";
	name = teamNum+"_"+matchNum;
	var xhr = new XMLHttpRequest();
	
	console.log(localStorage.getItem("key") == null);
	if(localStorage.getItem("key") === null) {
		localStorage.setItem("key", name);
	} else {
		var key = localStorage.getItem("key");
		key += "," + name;
		localStorage.setItem("key", key);
	}
	localStorage.setItem(name, rawData);
	
	if(navigator.onLine) {
		let keys = [...new Set(localStorage.getItem("key").split(","))];
		var passedData;
		for(var i=0; i<keys.length; i++) {
			
			passedData = localStorage.getItem(keys[i]).split(",");
			
			$.ajax({
				type: "POST",
				data: {passedData:passedData},
				url: "54.153.125.177/deepSpace/submitScoutingData.php",
				success: function(msg){
					$('.answer').html(msg);
				}
			});
		}
			/*
			var file = new File(passedData.split(","), filename);
			xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
			xhr.setRequestHeader('Authorization', 'Bearer ' + 'Yz4zd3i3M5AAAAAAAAAADKHCTtAqODsB_5rCAgVIOWSSzDIyT8wVyGlgE4wW-KvY');
			xhr.setRequestHeader('Content-Type', 'application/octet-stream');
			xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
			    path: '/' +  file.name,
			    mode: 'overwrite',
			    autorename: false,
			    mute: false,
			}));
			
			
			var submitButton = document.getElementById("submitButton");
			xhr.onprogress = function(e) {
				if(e.lengthComputable) {
					submitButton.innerHTML = e.loaded+"/"+e.total;
					var  array = new Array();
					array.add(name);
				}
			}
			xhr.onloadend = function(e) {
				localStorage.removeItem("data");
			}
			xhr.send(file);
		}
		*/
		location.reload();
	}
}

function calculate(){
	var sCheckboxL11 = document.getElementById("sCheckboxL11");
	var sSelectL12 = document.getElementById("sSelectL12");
	var sCheckboxL13 = document.getElementById("sCheckboxL13");
	var sCheckboxL21 = document.getElementById("sCheckboxL21");
	var sSelectL22 = document.getElementById("sSelectL22");
	var sCheckboxL23 = document.getElementById("sCheckboxL23");
	var sCheckboxL31 = document.getElementById("sCheckboxL31");
	var sSelectL32 = document.getElementById("sSelectL32");
	var sCheckboxL33 = document.getElementById("sCheckboxL33");
	var sCheckbox11 = document.getElementById("sCheckbox11");
	var sCheckbox12 = document.getElementById("sCheckbox12");
	var sCheckbox13 = document.getElementById("sCheckbox13");
	var sCheckbox14 = document.getElementById("sCheckbox14");
	var sCheckbox21 = document.getElementById("sCheckbox21");
	var sCheckbox22 = document.getElementById("sCheckbox22");
	var sCheckbox23 = document.getElementById("sCheckbox23");
	var sCheckbox24 = document.getElementById("sCheckbox24");
	var sCheckbox31 = document.getElementById("sCheckbox31");
	var sCheckbox32 = document.getElementById("sCheckbox32");
	var sCheckbox33 = document.getElementById("sCheckbox33");
	var sCheckbox34 = document.getElementById("sCheckbox34");
	var sCheckbox42 = document.getElementById("sCheckbox42");
	var sCheckbox43 = document.getElementById("sCheckbox43");
	var sCheckbox52 = document.getElementById("sCheckbox52");
	var sCheckbox53 = document.getElementById("sCheckbox53");
	var sCheckboxR11 = document.getElementById("sCheckboxR11");
	var sSelectR12 = document.getElementById("sSelectR12");
	var sCheckboxR13 = document.getElementById("sCheckboxR13");
	var sCheckboxR21 = document.getElementById("sCheckboxR21");
	var sSelectR22 = document.getElementById("sSelectR22");
	var sCheckboxR23 = document.getElementById("sCheckboxR23");
	var sCheckboxR31 = document.getElementById("sCheckboxR31");
	var sSelectR32 = document.getElementById("sSelectR32");
	var sCheckboxR33 = document.getElementById("sCheckboxR33");
	
	var tCheckboxL11 = document.getElementById("tCheckboxL11");
	var tSelectL12 = document.getElementById("tSelectL12");
	var tCheckboxL13 = document.getElementById("tCheckboxL13");
	var tCheckboxL21 = document.getElementById("tCheckboxL21");
	var tSelectL22 = document.getElementById("tSelectL22");
	var tCheckboxL23 = document.getElementById("tCheckboxL23");
	var tCheckboxL31 = document.getElementById("tCheckboxL31");
	var tSelectL32 = document.getElementById("tSelectL32");
	var tCheckboxL33 = document.getElementById("tCheckboxL33");
	var tCheckbox11 = document.getElementById("tCheckbox11");
	var tCheckbox12 = document.getElementById("tCheckbox12");
	var tCheckbox13 = document.getElementById("tCheckbox13");
	var tCheckbox14 = document.getElementById("tCheckbox14");
	var tCheckbox21 = document.getElementById("tCheckbox21");
	var tCheckbox22 = document.getElementById("tCheckbox22");
	var tCheckbox23 = document.getElementById("tCheckbox23");
	var tCheckbox24 = document.getElementById("tCheckbox24");
	var tCheckbox31 = document.getElementById("tCheckbox31");
	var tCheckbox32 = document.getElementById("tCheckbox32");
	var tCheckbox33 = document.getElementById("tCheckbox33");
	var tCheckbox34 = document.getElementById("tCheckbox34");
	var tCheckbox42 = document.getElementById("tCheckbox42");
	var tCheckbox43 = document.getElementById("tCheckbox43");
	var tCheckbox52 = document.getElementById("tCheckbox52");
	var tCheckbox53 = document.getElementById("tCheckbox53");
	var tCheckboxR11 = document.getElementById("tCheckboxR11");
	var tSelectR12 = document.getElementById("tSelectR12");
	var tCheckboxR13 = document.getElementById("tCheckboxR13");
	var tCheckboxR21 = document.getElementById("tCheckboxR21");
	var tSelectR22 = document.getElementById("tSelectR22");
	var tCheckboxR23 = document.getElementById("tCheckboxR23");
	var tCheckboxR31 = document.getElementById("tCheckboxR31");
	var tSelectR32 = document.getElementById("tSelectR32");
	var tCheckboxR33 = document.getElementById("tCheckboxR33");
	
	var sFarRocketHatch = new Array(sCheckboxL11,sCheckboxL13, sCheckboxL21, sCheckboxL23, sCheckboxL31, sCheckboxL33);
	var sFarRocketCargo = new Array(sSelectL12, sSelectL22, sSelectL32);
	var sCloseRocketHatch = new Array(sCheckboxR11, sCheckboxR13, sCheckboxR21, sCheckboxR23, sCheckboxR31, sCheckboxR33);
	var sCloseRocketCargo = new Array(sSelectR12, sSelectR22, sSelectR32);
	var sCargoShipHatch = new Array(sCheckbox11, sCheckbox14, sCheckbox21, sCheckbox24, sCheckbox31, sCheckbox34, sCheckbox52, sCheckbox53);
	var sCargoShipCargo = new Array(sCheckbox12, sCheckbox13, sCheckbox22, sCheckbox23, sCheckbox32, sCheckbox33, sCheckbox42, sCheckbox43);
	
	var tFarRocketHatch = new Array(tCheckboxL11, tCheckboxL13, tCheckboxL21, tCheckboxL23, tCheckboxL31, tCheckboxL33);
	var tFarRocketCargo = new Array(tSelectL12, tSelectL22, tSelectL32);
	var tCloseRocketHatch = new Array(tCheckboxR11, tCheckboxR13, tCheckboxR21, tCheckboxR23, tCheckboxR31, tCheckboxR33);
	var tCloseRocketCargo = new Array(tSelectR12, tSelectR22, tSelectR32);
	var tCargoShipHatch = new Array(tCheckbox11, tCheckbox14, tCheckbox21, tCheckbox24, tCheckbox31, tCheckbox34, tCheckbox52, tCheckbox53);
	var tCargoShipCargo = new Array(tCheckbox12, tCheckbox13, tCheckbox22, tCheckbox23, tCheckbox32, tCheckbox33, tCheckbox42, tCheckbox43);
	
	var sFarRocketHatchNum=0;
	var sFarRocketCargoNum=0;
	var sCargoShipHatchNum=0;
	var sCargoShipCargoNum=0;
	var sCloseRocketHatchNum=0;
	var sCloseRocketCargoNum=0;
	var sTotalHatch=0;
	var sTotalCargo=0;
	var tFarRocketHatchNum=0;
	var tFarRocketCargoNum=0;
	var tCargoShipHatchNum=0;
	var tCargoShipCargoNum=0;
	var tCloseRocketHatchNum=0;
	var tCloseRocketCargoNum=0;
	var tTotalHatch=0;
	var tTotalCargo=0;
	var farRocketHatchNum=0;
	var farRocketCargoNum=0;
	var cargoShipHatchNum=0;
	var cargoShipCargoNum=0;
	var closeRocketHatchNum=0;
	var closeRocketCargoNum=0;
	var totalHatch=0;
	var totalCargo=0;
	
	for(var i=0; i<sFarRocketHatch.length; i++) {
		if(sFarRocketHatch[i].checked) {
			sFarRocketHatchNum++;
		}
	}	
	for(var i=0; i<sFarRocketCargo.length; i++) {
		sFarRocketCargoNum += parseInt(sFarRocketCargo[i].options[sFarRocketCargo[i].selectedIndex].value);
	}
	for(var i=0; i<sCloseRocketHatch.length; i++) {
		if(sCloseRocketHatch[i].checked) {
			sCloseRocketHatchNum++;
		}
	}
	for(var i=0; i<sCloseRocketCargo.length; i++) {
		sCloseRocketCargoNum += parseInt(sCloseRocketCargo[i].options[sCloseRocketCargo[i].selectedIndex].value);
	}
	for(var i=0; i<sCargoShipHatch.length; i++) {
		if(sCargoShipHatch[i].checked) {
			sCargoShipHatchNum++;
		}
	}
	for(var i=0; i<sCargoShipCargo.length; i++) {
		if(sCargoShipCargo[i].checked) {
			sCargoShipCargoNum++;
		}
	}
	
	for(var i=0; i<tFarRocketHatch.length; i++) {
		if(tFarRocketHatch[i].checked) {
			tFarRocketHatchNum++;
		}
	}
	for(var i=0; i<tFarRocketCargo.length; i++) {
		tFarRocketCargoNum += parseInt(tFarRocketCargo[i].options[tFarRocketCargo[i].selectedIndex].value);
	}
	for(var i=0; i<tCloseRocketHatch.length; i++) {
		if(tCloseRocketHatch[i].checked) {
			tCloseRocketHatchNum++;
		}
	}
	for(var i=0; i<tCloseRocketCargo.length; i++) {
		tCloseRocketCargoNum += parseInt(tCloseRocketCargo[i].options[tCloseRocketCargo[i].selectedIndex].value);
	}
	for(var i=0; i<tCargoShipHatch.length; i++) {
		if(tCargoShipHatch[i].checked) {
			tCargoShipHatchNum++;
		}
	}
	for(var i=0; i<tCargoShipCargo.length; i++) {
		if(tCargoShipCargo[i].checked) {
			tCargoShipCargoNum++;
		}
	}
	
	farRocketHatchNum=sFarRocketHatchNum+tFarRocketHatchNum;
	farRocketCargoNum=sFarRocketCargoNum+tFarRocketCargoNum
	cargoShipHatchNum=sCargoShipHatchNum+tCargoShipHatchNum
	cargoShipCargoNum=sCargoShipCargoNum+tCargoShipCargoNum
	closeRocketHatchNum=sCloseRocketHatchNum+tCloseRocketHatchNum;
	closeRocketCargoNum=sCloseRocketCargoNum+tCloseRocketCargoNum;
	sTotalHatch = sFarRocketHatchNum+sCargoShipHatchNum+sCloseRocketHatchNum;
	sTotalCargo = sFarRocketCargoNum+sCargoShipCargoNum+sCloseRocketCargoNum;
	tTotalHatch = tFarRocketHatchNum+tCargoShipHatchNum+tCloseRocketHatchNum;
	tTotalCargo = tFarRocketCargoNum+tCargoShipCargoNum+tCloseRocketCargoNum;
	totalHatch=sTotalHatch+tTotalHatch;
	totalCargo=sTotalCargo+tTotalCargo;
	
	document.getElementById("sFarRocketHatchNum").innerHTML = sFarRocketHatchNum;
	document.getElementById("sFarRocketCargoNum").innerHTML = sFarRocketCargoNum;
	document.getElementById("sCargoShipHatchNum").innerHTML = sCargoShipHatchNum;
	document.getElementById("sCargoShipCargoNum").innerHTML = sCargoShipCargoNum;
	document.getElementById("sCloseRocketHatchNum").innerHTML = sCloseRocketHatchNum;
	document.getElementById("sCloseRocketCargoNum").innerHTML = sCloseRocketCargoNum;
	document.getElementById("sTotalHatch").innerHTML = sTotalHatch;
	document.getElementById("sTotalCargo").innerHTML = sTotalCargo;
	document.getElementById("tFarRocketHatchNum").innerHTML = tFarRocketHatchNum;
	document.getElementById("tFarRocketCargoNum").innerHTML = tFarRocketCargoNum;
	document.getElementById("tCargoShipHatchNum").innerHTML = tCargoShipHatchNum;
	document.getElementById("tCargoShipCargoNum").innerHTML = tCargoShipCargoNum;
	document.getElementById("tCloseRocketHatchNum").innerHTML = tCloseRocketHatchNum;
	document.getElementById("tCloseRocketCargoNum").innerHTML = tCloseRocketCargoNum;
	document.getElementById("tTotalHatch").innerHTML = tTotalHatch;
	document.getElementById("tTotalCargo").innerHTML = tTotalCargo;
	document.getElementById("farRocketHatchNum").innerHTML = farRocketHatchNum;
	document.getElementById("farRocketCargoNum").innerHTML = farRocketCargoNum;
	document.getElementById("cargoShipHatchNum").innerHTML = cargoShipHatchNum;
	document.getElementById("cargoShipCargoNum").innerHTML = cargoShipCargoNum;
	document.getElementById("closeRocketHatchNum").innerHTML = closeRocketHatchNum;
	document.getElementById("closeRocketCargoNum").innerHTML = closeRocketCargoNum;
	document.getElementById("totalHatch").innerHTML = totalCargo;
	document.getElementById("totalCargo").innerHTML = totalCargo;
}