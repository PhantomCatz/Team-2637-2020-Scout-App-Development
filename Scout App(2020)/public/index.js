var currentMatchType = 'Overall'
var header = ['MatchType', 'TeamNumber', 'MatchNumber', 'AssistedAnother', 'AssistedClimb', 'BottomPort', 'ClimbTime', 'GroundPickup', 'InitiationLine', 'InnerPort', 'LatchAbility', 'NoClimb', 'OuterPort', 'Playstyle', 'PositionControl', 'RandezvousAbility', 'Range', 'Rating', 'RotationControl', 'Scouter', 'Stage', 'StartPosition', 'Status', 'TotalShots', 'TrenchAbility']
var BottomPort = []
var InnerPort = []
var OuterPort = []
var TotalShots = []
var MatchNumbers = []

function init() {
	initMatchType()
	let select = document.getElementById('matchType')
	select.onchange = function(){
		currentMatchType = select.options[select.selectedIndex].value
		contentControl1(currentMatchType)
	}
	let search = document.getElementById('search')
	search.onchange = function(){
		contentControl4(search.value)
	}
}

function initMatchType() {
	let userRef = firebase.database().ref('data')
    userRef.once('value')
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let key = childSnapshot.key
                if (key == 'Overall' || key == 'Practice' || key == 'Qualification' || key == "Elimination") {
                    initTeamNum(key, childSnapshot)
                }
			})
			contentControl1(currentMatchType)
		})
}

function initTeamNum(matchType, snapshot){
	snapshot.forEach(function(childSnapshot){
		let key = childSnapshot.key
		initMatchNum(matchType, key, childSnapshot)
	})
}

function initMatchNum(matchType, teamNum, snapshot) {
	let teamList = document.getElementById('teamList')
	let content = document.getElementById('content')
	
	let div = document.createElement('div')
	div.style.textAlign = 'center'
	div.style.display = 'none'
	div.innerHTML = `<input id="${teamNum}-${matchType}" class="${matchType}-${teamNum}" type="checkbox" style="width: 40px; height: 40px" onclick="clicked(this)"><label for="${teamNum}-${matchType}" style="vertical-align: text-bottom">${teamNum}</label>`
	div.classList.add('data-content')
	div.classList.add(`${matchType}`)
	div.classList.add(`${matchType}-${teamNum}`)
	teamList.append(div)
	
	let graph = document.createElement('div')
	graph.innerHTML = `${matchType}-${teamNum}-Graph<br>`
	graph.classList.add('customGraph')
	graph.classList.add('data-content')
	graph.classList.add(`${matchType}-${teamNum}`)
	graph.style.display = 'none'
	let canvas = document.createElement('canvas')
	canvas.style.height = 'auto'
	canvas.style.width = '100%'
	canvas.style.backgroundColor = 'white'
	graph.append(canvas)
	content.append(graph)
	
	let table = document.createElement('div')
	table.innerHTML = `${matchType}-${teamNum}-Table`
	table.classList.add('customTable')
	table.classList.add('data-content')
	table.classList.add(`${matchType}-${teamNum}`)
	table.classList.add('table-responsive')
	table.style.display = 'none'
	let dataTable = document.createElement('table')
	dataTable.classList.add('table-bordered')
	let theadData = dataTable.createTHead()
	let rowData = theadData.insertRow()
	for(let key of header){
		let thData = document.createElement('th')
		let textData = document.createTextNode(key)
		thData.appendChild(textData)
		rowData.appendChild(thData)
	}
	let tbodyData = dataTable.createTBody()
	table.append(dataTable)
	content.append(table)
	
	let comment = document.createElement('div')
	comment.innerHTML = `${matchType}-${teamNum}-Comment`
	comment.classList.add('customComment')
	comment.classList.add('data-content')
	comment.classList.add(`${matchType}-${teamNum}`)
	comment.classList.add('table-responsive')
	comment.style.display = 'none'
	let commentTable = document.createElement('table')
	commentTable.classList.add('table-bordered')
	let theadComment = commentTable.createTHead()
	let rowComment = theadComment.insertRow()
	let thComment = document.createElement('th')
	let textComment = document.createTextNode('Comment')
	thComment.appendChild(textComment)
	let thMatchNum = document.createElement('th')
	let textMatchNum = document.createTextNode('MatchNumber')
	thMatchNum.appendChild(textMatchNum)
	let thTeamNum = document.createElement('th')
	let textTeamNum = document.createTextNode('TeamNumber')
	thTeamNum.appendChild(textTeamNum)
	let thMatchType = document.createElement('th')
	let textMatchType = document.createTextNode('MatchType')
	thMatchType.appendChild(textMatchType)
	let tbodyComment = commentTable.createTBody()
	rowComment.appendChild(thMatchType)
	rowComment.appendChild(thTeamNum)
	rowComment.appendChild(thMatchNum)
	rowComment.appendChild(thComment)
	comment.append(commentTable)
	content.append(comment)
	
	BottomPort = []
	InnerPort = []
	OuterPort = []
	TotalShots = []
	MatchNumbers = []
	snapshot.forEach(function(childSnapshot){
		let key = childSnapshot.key
		initData(matchType, teamNum, key, tbodyData, tbodyComment, childSnapshot)
	})
	generateGraph(canvas)
}

function initData(matchType, teamNum, matchNum, tbodyData, tbodyComment, snapshot){
	let rowData = tbodyData.insertRow()
	let rowComment = tbodyComment.insertRow()
	let data = []
	let comment = []
	MatchNumbers.push(`${matchType.charAt(0)}${matchNum}`)
	data.push(matchType)
	data.push(teamNum)
	data.push(matchNum)
	comment.push(matchType)
	comment.push(teamNum)
	comment.push(matchNum)
	snapshot.forEach(function(childSnapshot){
		let value = childSnapshot.val()
		if(childSnapshot.key != 'Comment'){
			if(childSnapshot.key == 'BottomPort'){
				BottomPort.push(value)
			}
			if(childSnapshot.key == 'InnerPort'){
				InnerPort.push(value)
			}
			if(childSnapshot.key == 'OuterPort'){
				OuterPort.push(value)
			}
			if(childSnapshot.key == 'TotalShots'){
				TotalShots.push(value)
			}
			data.push(value)
		} else {
			comment.push(value)
		}
	})
	for(let key of data){
		let tdData = document.createElement('td')
		let textData = document.createTextNode(key)
		tdData.classList.add('tableTD')
		tdData.appendChild(textData)
		rowData.appendChild(tdData)
	}
	for (i = 0; i < comment.length; i++){
		let tdComment = document.createElement('td')
		let textComment = document.createTextNode(comment[i])
		tdComment.classList.add('commentTD')
		tdComment.appendChild(textComment)
		rowComment.appendChild(tdComment)
	}
}

function generateGraph(canvas){
	var data = {
		labels: MatchNumbers,
		datasets: [{
			label: 'TotalShots',
			borderColor: 'blue',
			data: TotalShots
		}, {
			label: 'BottomPort',
			borderColor: 'yellow',
			data: BottomPort
		}, {
			label: 'OuterPort',
			borderColor: 'red',
			data: OuterPort
		}, {
			label: 'InnerPort',
			borderColor: 'green',
			data: InnerPort
		}]
	}
	
	var chart = new Chart(canvas, {
		type: 'line',
		data: data,
		options:{
			scales: {
				yAxes: [{
					ticks: {
						min: 0,
						max: 50,
					}
				}]
			}
		}
	})
}

function clicked(checkbox){
	update()
}

function update(){
	let teams = document.getElementById('teamList').children
	let classList = []
	let elements = []
	
	for(t=0;t<teams.length; t++){
		if(teams[t].tagName == 'DIV'){
			let children = teams[t].children
			for(c=0; c<children.length; c++){
				if(children[c].tagName == 'INPUT'){
					if(children[c].checked){
						classList.push(children[c].classList[0])
					}
				}
			}
		}
	}
	contentControl2(classList)
}

function contentControl1(matchType) {
    let content = document.getElementsByClassName('data-content')
    for (i = 0; i < content.length; i++) {
		if(!(content[i].style.display == 'block'&&(content[i].classList[0]=='customGraph' || content[i].classList[0]=='customTable'||content[i].classList[0]=='customComment'))){
			content[i].style.display = 'none'
		}
    }

	let elements = document.getElementsByClassName(`${matchType}`)
	for (i = 0; i < elements.length; i++) {
		elements[i].style.display = 'block'
	}
}

function contentControl2(className){
	let content = document.getElementsByClassName('data-content')
    for (i = 0; i < content.length; i++) {
        content[i].style.display = 'none'
    }
	
	let elements = document.getElementsByClassName(`${currentMatchType}`)
	for (i = 0; i < elements.length; i++) {
		elements[i].style.display = 'block'
	}
	
	for(j=0; j<className.length; j++){
		let elements = document.getElementsByClassName(className[j])
		for (i = 0; i < elements.length; i++) {	
			if(elements[i].classList[0]=='customGraph' ){
				elements[i].style.display = 'block'
			}
		}
	}
}

function contentControl3(contentType){
	let content = document.getElementsByClassName('data-content')
	for(i=0; i<content.length; i++){
		if(content[i].style.display == 'block'&&(content[i].classList[0] == 'customGraph'||content[i].classList[0] == 'customTable'||content[i].classList[0] == 'customComment')&&content[i].classList[0] != contentType){
			content[i].style.display = 'none'	
			let parent = content[i].parentElement.children
			for(j=0; j<parent.length; j++){
				if(parent[j].classList[0] == contentType && parent[j].classList[2] == content[i].classList[2]){
					parent[j].style.display = 'block'
				}
			}
		}
	}
}

function contentControl4(value){
	let teamList = document.getElementById('teamList').children
	for(i=0; i<teamList.length; i++){
		if(teamList[i].tagName == 'DIV'){
			teamList[i].style.display = 'none'
		}
		if(teamList[i].tagName == 'DIV' && teamList[i].innerText.includes(value) && teamList[i].classList[1] == currentMatchType){
			teamList[i].style.display = 'block'
		} else if(value == '' && teamList[i].classList[1] == currentMatchType){
			teamList[i].style.display = 'block'
		}
	}
}