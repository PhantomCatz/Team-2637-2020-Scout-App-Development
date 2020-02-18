var scoutName;
var teamNum;
var matchType;
var matchNum;
var currentStatus;
var startLevel;
var crossLine;
var playstyle;
var totalRocketHatch;
var totalRocketCargo;
var totalCargoshipHatch;
var totalCargoshipCargo;
var highestRocket;
var highestCargo;
var groundHatch;
var groundCargo;
var climbTime;
var climbLevel;
var climbAssist;
var assistedClimb;
var SRocketHatch;
var SRocketCargo;
var SCargoshipHatch;
var SCargoshipCargo;
var TRocketHatch;
var TRocketCargo;
var TCargoshipHatch;
var TCargoshipCargo;

var SComment;
var TComment;
var EComment;

function submit() {
    scoutName = document.getElementById('scoutName');
    teamNum = document.getElementById('teamNum');
    matchType = document.getElementById('matchType');
    matchNum = document.getElementById('matchNum');
    currentStatus = document.getElementById('currentStatus');
    startLevel = document.getElementById('startLevel');

    SRocketHatch = document.getElementById('SRocketHatch');
    SRocketCargo = document.getElementById('SRocketCargo');
    SCargoshipHatch = document.getElementById('SCargoshipHatch');
    SCargoshipCargo = document.getElementById('SCargoshipCargo');
    crossLine = document.getElementById('crossLine');
    SComment = document.getElementById('SComment');

    TRocketHatch = document.getElementById('TRocketHatch');
    TRocketCargo = document.getElementById('TRocketCargo');
    TCargoshipHatch = document.getElementById('TCargoshipHatch');
    TCargoshipCargo = document.getElementById('TCargoshipCargo');
    playstyle = document.getElementById('playstyle');
    highestRocket = document.getElementById('highestRocket');
    highestCargo = document.getElementById('highestCargo');
    groundHatch = document.getElementById('groundHatch');
    groundCargo = document.getElementById('groundCargo');
    TComment = document.getElementById('TComment');

    climbTime = document.getElementById('climbTime');
    climbLevel = document.getElementById('climbLevel');
    var assisting = document.getElementById('assisting');
    var assisted = document.getElementById('assisted');
    EComment = document.getElementById('EComment');

    scoutName = scoutName.value;
    teamNum = teamNum.options[teamNum.selectedIndex].value;
    matchType = matchType.options[matchType.selectedIndex].value;
    matchNum = matchNum.value;
    currentStatus = currentStatus.options[currentStatus.selectedIndex].value;
    startLevel = startLevel.options[startLevel.selectedIndex].value;

    SRocketHatch = SRocketHatch.value;
    SRocketCargo = SRocketCargo.value;
    SCargoshipHatch = SCargoshipHatch.value;
    SCargoshipCargo = SCargoshipCargo.value;
    SComment = SComment.value;

    TRocketHatch = TRocketHatch.value;
    TRocketCargo = TRocketCargo.value;
    TCargoshipHatch = TCargoshipHatch.value;
    TCargoshipCargo = TCargoshipCargo.value;
    playstyle = playstyle.options[playstyle.selectedIndex].value;
    highestRocket = highestRocket.options[highestRocket.selectedIndex].value;
    highestCargo = highestCargo.options[highestCargo.selectedIndex].value;
    groundHatch = groundHatch.checked;
    groundCargo = groundCargo.checked;
    TComment = TComment.value;

    climbTime = climbTime.options[climbTime.selectedIndex].value;
    climbLevel = climbLevel.options[climbLevel.selectedIndex].value;
    climbAssist = assisting.checked;
    assistedClimb = assisted.checked;
    EComment = EComment.value;

    totalRocketHatch = parseInt(SRocketHatch) + parseInt(TRocketHatch);
    totalRocketCargo = parseInt(SRocketCargo) + parseInt(TRocketCargo);
    totalCargoshipHatch = parseInt(SCargoshipHatch) + parseInt(TCargoshipHatch);
    totalCargoshipCargo = parseInt(SCargoshipCargo) + parseInt(TCargoshipCargo);
    writeUserData();
    location.reload();
};

var database = firebase.database();

//add blue alliance api support to pull team names
function initTeams() {
    while (true) {
        var team = prompt("Enter Team Number");
        if (team == null)
            break;
        else {
            let userRef = firebase.database().ref('data');
            let currentTeam = userRef.child(team);
            currentTeam.child(`${team}/Practice`);
            currentTeam.child(`${team}/Qualification`);
            currentTeam.child(`${team}/Elimination`);

            var opt = document.createElement('option');
            opt.appendChild(document.createTextNode(`${team}`));
            opt.value = team;
            teamNum.appendChild(opt);
        };
    };
};

function test() {
    scoutName = document.getElementById('scoutName');
    teamNum = document.getElementById('teamNum');
    matchType = document.getElementById('matchType');
    matchNum = document.getElementById('matchNum');
    currentStatus = document.getElementById('currentStatus');
    startLevel = document.getElementById('startLevel');

    SRocketHatch = document.getElementById('SRocketHatch');
    SRocketCargo = document.getElementById('SRocketCargo');
    SCargoshipHatch = document.getElementById('SCargoshipHatch');
    SCargoshipCargo = document.getElementById('SCargoshipCargo');
    crossLine = document.getElementById('crossLine');
    SComment = document.getElementById('SComment');

    TRocketHatch = document.getElementById('TRocketHatch');
    TRocketCargo = document.getElementById('TRocketCargo');
    TCargoshipHatch = document.getElementById('TCargoshipHatch');
    TCargoshipCargo = document.getElementById('TCargoshipCargo');
    playstyle = document.getElementById('playstyle');
    highestRocket = document.getElementById('highestRocket');
    highestCargo = document.getElementById('highestCargo');
    groundHatch = document.getElementById('groundHatch');
    groundCargo = document.getElementById('groundCargo');
    TComment = document.getElementById('TComment');

    climbTime = document.getElementById('climbTime');
    climbLevel = document.getElementById('climbLevel');
    var assisting = document.getElementById('assisting');
    var assisted = document.getElementById('assisted');
    EComment = document.getElementById('EComment');

    scoutName = scoutName.value;
    teamNum = teamNum.options[teamNum.selectedIndex].value;
    matchType = matchType.options[matchType.selectedIndex].value;
    matchNum = matchNum.value;
    currentStatus = currentStatus.options[currentStatus.selectedIndex].value;
    startLevel = startLevel.options[startLevel.selectedIndex].value;

    SRocketHatch = SRocketHatch.value;
    SRocketCargo = SRocketCargo.value;
    SCargoshipHatch = SCargoshipHatch.value;
    SCargoshipCargo = SCargoshipCargo.value;
    SComment = SComment.value;

    TRocketHatch = TRocketHatch.value;
    TRocketCargo = TRocketCargo.value;
    TCargoshipHatch = TCargoshipHatch.value;
    TCargoshipCargo = TCargoshipCargo.value;
    playstyle = playstyle.options[playstyle.selectedIndex].value;
    highestRocket = highestRocket.options[highestRocket.selectedIndex].value;
    highestCargo = highestCargo.options[highestCargo.selectedIndex].value;
    groundHatch = groundHatch.checked;
    groundCargo = groundCargo.checked;
    TComment = TComment.value;

    climbTime = climbTime.options[climbTime.selectedIndex].value;
    climbLevel = climbLevel.options[climbLevel.selectedIndex].value;
    climbAssist = assisting.checked;
    assistedClimb = assisted.checked;
    EComment = EComment.value;

    totalRocketHatch = parseInt(SRocketHatch) + parseInt(TRocketHatch);
    totalRocketCargo = parseInt(SRocketCargo) + parseInt(TRocketCargo);
    totalCargoshipHatch = parseInt(SCargoshipHatch) + parseInt(TCargoshipHatch);
    totalCargoshipCargo = parseInt(SCargoshipCargo) + parseInt(TCargoshipCargo);

    teamNum = 2637
    for (var i = 0; i < 9; i++) {
        if (0 <= i && i < 3) {
            matchType = 'Practice';
            matchNum = i + 1;
        } else if (3 <= i && i < 6) {
            matchType = 'Qualification'
            matchNum = i - 2;
        } else {
            matchType = 'Elimination'
            matchNum = i - 5;
        }
        writeUserData();
    }

    teamNum = 254
    for (var i = 0; i < 9; i++) {
        if (0 <= i && i < 3) {
            matchType = 'Practice';
            matchNum = i + 1;
        } else if (3 <= i && i < 6) {
            matchType = 'Qualification'
            matchNum = i - 2;
        } else {
            matchType = 'Elimination'
            matchNum = i - 5;
        }
        writeUserData();
    }
};

function writeUserData() {
    var userRef = firebase.database().ref(`data/${matchType}/${teamNum}/${matchNum}`);
    userRef.set({
        'Scout Name': scoutName,
        'Status': currentStatus,
        'Start Level': startLevel,
        'Cross Line': crossLine,
        'Playstyle': playstyle,
        'Total Rocket Hatch': totalRocketHatch,
        'Total Rocket Cargo': totalRocketCargo,
        'Total Cargoship Hatch': totalCargoshipHatch,
        'Total Cargoship Cargo': totalCargoshipCargo,
        'Highest Rocket': highestRocket,
        'Highest Cargo': highestCargo,
        'Ground Hatch': groundHatch,
        'Ground Cargo': groundCargo,
        'Climb Time': climbTime,
        'Climb Level': climbLevel,
        'Climb Assist': climbAssist,
        'Assisted Climb': assistedClimb,
        'SRocket Hatch': SRocketHatch,
        'SRocket Cargo': SRocketCargo,
        'SCargoship Hatch': SCargoshipHatch,
        'SCargoship Cargo': SCargoshipCargo,
        'TRocket Hatch': TRocketHatch,
        'TRocket Cargo': TRocketCargo,
        'TCargoship Hatch': TCargoshipHatch,
        'TCargoship Cargo': TCargoshipCargo,
        'SComment': SComment,
        'TComment': TComment,
        'EComment': EComment
    });

    var letter = matchType.charAt(0).toUpperCase();
    userRef = firebase.database().ref(`data/Overall/${teamNum}/${letter}${matchNum}`);
    userRef.set({
        'Scout Name': scoutName,
        'Status': currentStatus,
        'Start Level': startLevel,
        'Cross Line': crossLine,
        'Playstyle': playstyle,
        'Total Rocket Hatch': totalRocketHatch,
        'Total Rocket Cargo': totalRocketCargo,
        'Total Cargoship Hatch': totalCargoshipHatch,
        'Total Cargoship Cargo': totalCargoshipCargo,
        'Highest Rocket': highestRocket,
        'Highest Cargo': highestCargo,
        'Ground Hatch': groundHatch,
        'Ground Cargo': groundCargo,
        'Climb Time': climbTime,
        'Climb Level': climbLevel,
        'Climb Assist': climbAssist,
        'Assisted Climb': assistedClimb,
        'SRocket Hatch': SRocketHatch,
        'SRocket Cargo': SRocketCargo,
        'SCargoship Hatch': SCargoshipHatch,
        'SCargoship Cargo': SCargoshipCargo,
        'TRocket Hatch': TRocketHatch,
        'TRocket Cargo': TRocketCargo,
        'TCargoship Hatch': TCargoshipHatch,
        'TCargoship Cargo': TCargoshipCargo,
        'SComment': SComment,
        'TComment': TComment,
        'EComment': EComment
    });
}
