var currentMatchType;
var currentTeamNum;

function init() {
    let userRef = firebase.database().ref('data')
    userRef.once('value')
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let key = childSnapshot.key
                if (key == 'Overall' || key == 'Practice' || key == 'Qualification' || key == "Elimination") {
                    initStep2(key, childSnapshot)
                }
            })
        })
}

function initStep2(matchType, snapshot) {
    snapshot.forEach(function (childSnapshot) {
        let key = childSnapshot.key
        initContent(document.getElementById(`${matchType}-body`), document.getElementById(`${matchType}-select`), key, matchType, childSnapshot)
    })
}

function initContent(content, teamList, teamNum, matchType, childSnapshot) {
    let div = document.createElement('div')
    div.classList.add('tabcontent')
    div.id = `${matchType}-${teamNum}-content`

    let graph = document.createElement('div')
    graph.classList.add('dataTypeContent')
    graph.id = `${matchType}-${teamNum}-graph`

    let data = document.createElement('div')
    data.classList.add('dataTypeContent')
    data.classList.add('table-responsive')
    data.setAttribute('style', 'background: #b200ff')
    data.id = `${matchType}-${teamNum}-data`
    let table = document.createElement('table')
    table.id = `${matchType}-${teamNum}-table`
    table.classList.add('table')
    table.classList.add('table-hover')
    thead = table.createTHead()
    thead.id = `${matchType}-${teamNum}-thead`
    tbody = table.createTBody()
    tbody.id = `${matchType}-${teamNum}-tbody`
    data.appendChild(table)

    var comments = document.createElement('div')
    comments.classList.add('dataTypeContent')
    comments.setAttribute('style', 'background: orange')
    comments.id = `${matchType}-${teamNum}-comments`

    div.appendChild(graph)
    div.appendChild(data)
    div.appendChild(comments)
    content.appendChild(div)

    let options = document.createElement('option')
    options.text = teamNum
    options.value = teamNum
    teamList.appendChild(options)
    teamList.onchange = function () {
        selectTeam(event, teamList.options[teamList.selectedIndex].value)
    }

    initStep3(teamNum, matchType, childSnapshot)
}

function initStep3(teamNum, matchType, snapshot) {
    let rocketHatch = []
    let rocketCargo = []
    let cargoshipHatch = []
    let cargoshipCargo = []
    let x = 0
    let thead = document.getElementById(`${matchType}-${teamNum}-thead`)
    let tbody = document.getElementById(`${matchType}-${teamNum}-tbody`)
	let comments = document.getElementById(`${matchType}-${teamNum}-comments`)
    snapshot.forEach(function (childSnapshot) {
        let key = childSnapshot.key
        let match = childSnapshot.toJSON()
        
        if (x == 0) {
            let row = thead.insertRow();
            let th0 = document.createElement('th')
            let text0 = document.createTextNode('Match Number');
            th0.appendChild(text0);
            row.append(th0);
            for (let key of Object.keys(match)) {
                let th = document.createElement('th')
                th.scope = 'col'
                let text = document.createTextNode(key)
                th.appendChild(text)
                row.appendChild(th)
            }
            x++;
        }
        let row = tbody.insertRow()
        let th = document.createElement('th')
        th.scope = 'row'
        th.appendChild(document.createTextNode(key))
        row.appendChild(th)
        for (let key in match) {
            let cell = row.insertCell()
            let text = document.createTextNode(match[key])
            cell.appendChild(text)
        }

		let p1 = document.createElement('p')
		let text1 = document.createTextNode(match['SComment'])
		let p2 = document.createElement('p')
		let text2 = document.createTextNode(match['TComment'])
		let p3 = document.createElement('p')
		let text3 = document.createTextNode(match['EComment'])
		p1.appendChild(text1)
		p2.appendChild(text2)
		p3.appendChild(text3)
		comments.appendChild(p1)
		comments.appendChild(p2)
		comments.appendChild(p3)
        
        rocketHatch.push({
            label: key,
            y: match['Total Rocket Hatch']
        });
        rocketCargo.push({
            label: key,
            y: match['Total Rocket Cargo']
        })
        cargoshipHatch.push({
            label: key,
            y: match['Total Cargoship Hatch']
        })
        cargoshipCargo.push({
            label: key,
            y: match['Total Cargoship Cargo']
        })
    })
    let chart = new CanvasJS.Chart(document.getElementById(`${matchType}-${teamNum}-graph`), {
        title: {
            text: `Total Hatch and Cargo ${teamNum} ${matchType}`
        },
        axisX: {
            title: 'Match Number',
            labelAngle: -60
        },
        axisY: {
            title: 'Number of Hatch/Cargo'
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: true
        },
        data: [{
            type: "line",
            axisYType: "secondary",
            name: "Rocket Hatch",
            showInLegend: true,
            markerSize: 0,
            dataPoints: rocketHatch
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Rocket Cargo",
            showInLegend: true,
            markerSize: 0,
            dataPoints: rocketCargo
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Cargoship Hatch",
            showInLegend: true,
            markerSize: 0,
            dataPoints: cargoshipHatch
        },
        {
            type: "line",
            axisYType: "secondary",
            name: "Cargoship Cargo",
            showInLegend: true,
            markerSize: 0,
            dataPoints: cargoshipCargo
        }]
    });
    chart.render();    
}

function initStep4(matchType, teamNum, snapshot) {
}

function selectedMatch() {
    let matchType = document.getElementById('matchType')
    matchType = matchType.options[matchType.selectedIndex].value
    return matchType
}

function selectMatch(evt, matchType) {
    let i, matchData, child

    matchData = document.getElementsByClassName('matchData')
    for (i = 0; i < matchData.length; i++) {
        child = matchData[i].children
        
        for (k = 0; k < child.length; k++) {
            child[k].style.display='none'
        }
		if(matchData[i].nodeName == 'SELECT'){
			matchData[i].style.display='none'
		}
        
    }
    child = document.getElementById(matchType).children
	document.getElementById(`${matchType}-select`).style.display = 'block'
    for (i = 0; i < child.length; i++) {
        child[i].style.display = 'block'
    }
    
    currentMatchType = matchType;
}


function selectTeam(evt, teamNum) {
    currentTeamNum = teamNum;
    selectData(evt, 'graph')
}

function selectData(evt, dataType) {
    let i, data
    data = document.getElementsByClassName('dataTypeContent');
    for (i = 0; i < data.length; i++) {
        data[i].style.display = 'none'
    }
	console.log((`${currentMatchType}-${currentTeamNum}-${dataType}`))
    document.getElementById(`${currentMatchType}-${currentTeamNum}-${dataType}`).style.display = 'block'
	
}

function selectedData(dataType) {
    return `{${currentMatchType}-${currentTeamNum}-dataType`
}

function onLoad() {
    let matchType = document.getElementById('matchType')
    matchType.selectedIndex = 0
    matchType.onchange()
	let select
}