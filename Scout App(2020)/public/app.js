//increments value of textfield
function increment(id, num) {
    let textfield = document.getElementById(id);
    let value = parseInt(textfield.value) + num;
    if (value >= 0) {
        textfield.value = value;
    } else {
        textfield.value = 0;
    }
}

//validates elements and determines path for database
function submit() {
    let elements = document.getElementsByClassName('data-field');

    let teamNum = document.getElementById('teamNum');
    let matchNum = document.getElementById('matchNum');
    let matchType = document.getElementById('matchType');
    teamNum = teamNum.options[teamNum.selectedIndex].value;
    matchNum = matchNum.value;
    matchType = matchType.options[matchType.selectedIndex].value;
    let path = `data/${matchType}/${teamNum}/${matchNum}`;
    let overall = `data/Overall/${teamNum}/${matchNum}`;

    let alert = document.getElementById('alert');
    alert.classList.remove(alert.classList[3]);
    if (validate()) {
        for (i = 0; i < elements.length; i++) {
            database(valOf(elements[i]), `${path}/${elements[i].getAttribute('name')}`, `${overall}/${elements[i].getAttribute('name')}`, `${matchType}-${teamNum}-${matchNum}`);
        }
        let climb = document.getElementsByName('Climb')
        for (i = 0; i < climb.length; i++) {
            database(valOf(climb[i]), `${path}/${climb[i].id}`, `${overall}/${climb[i].id}`, `${matchType}-${teamNum}-${matchNum}`);
        }
        let rating = document.getElementsByName('Rating')
        for (i = 0; i < rating.length; i++) {
            if (rating[i].checked) {
                database(valOf(rating[i]), `${path}/${rating[i].getAttribute('name')}`, `${overall}/${rating[i].getAttribute('name')}`, `${matchType}-${teamNum}-${matchNum}`);
            }
        }
        alert.classList.add('alert-success');
        alert.innerHTML = `Successful Upload: ${matchType}-${teamNum}-${matchNum}`;
        alert.style.display = 'block';
        document.getElementById('matchNum') = parseInt(matchNum) + 1;
        resetData();
    }
    window.scrollTo(0, 0);
}

//reset data
function resetData() {
    let elements = document.getElementsByClassName('data-clear')
    for (i = 0; i < elements.length; i++) {
        if (elements[i].tagName == 'INPUT') {
            if (elements[i].type == 'text') {
                elements[i].value = '';
            }
            if (elements[i].type == 'number') {
                elements[i].value = 0;
            }
            if (elements[i].type == 'checkbox') {
                elements[i].checked = false;
            }
            if (elements[i].type == 'radio') {
                elements[i].checked = false;
            }
        }
        if (elements[i].tagName == 'SELECT') {
            elements[i].selectedIndex = 0;
        }
        if (elements[i].tagName == 'TEXTAREA') {
            elements[i].value = '';
        }
    }

}

//sends data to database or stores data offline
function database(value, path, overall, name) {
    let paths = `${path}-${overall}-${value}`
    if (localStorage.getItem('key') === null) {
        localStorage.setItem('key', name);
    } else {
        var key = localStorage.getItem('key');
        key += "," + name;
        localStorage.setItem('key', key);
    }
    localStorage.setItem(name, paths);

    if (navigator.onLine) {
        let keys = [...new Set(localStorage.getItem('key').split(','))];
        for (var i = 0; i < keys.length; i++) {
            passedData = localStorage.getItem(keys[i]).split('-');
            firebase.database().ref(passedData[0]).set(passedData[2]);
            firebase.database().ref(passedData[1]).set(passedData[2]);
        }
    }
}

//validates data
function validate() {
    let elements = document.getElementsByClassName('data-validate');
    let bool = true;

    let alert = document.getElementById('alert');
    alert.innerHTML = '';
    alert.style.display = 'none';

    for (i = 0; i < elements.length; i++) {
        if (filled(elements[i])) {
            bool = false;
            alert.innerHTML = `${alert.innerHTML}${elements[i].getAttribute('name')} is not filled<br>`;
        }
    }
    let rating = document.getElementsByName('Rating');
    let rated = false;
    for (i = 0; i < rating.length; i++) {
        if (rating[i].checked) {
            rated = true;
        }
    }
    if (!rated) {
        bool = rated;
        alert.innerHTML = `${alert.innerHTML} Rating needs to be rated<br>`;
    }
    if (alert.innerText != '') {
        alert.style.display = 'block';
        alert.classList.add('alert-danger')
    }
    return bool;
}

//checks if specific data is valid
function filled(data) {
    switch (data.tagName) {
        case 'SELECT':
            if (data.options[data.selectedIndex].value == 'null')
                return true
        case 'TEXTAREA':
            if (data.value == '') {
                return true
            }
        case 'INPUT':
            switch (data.type) {
                case 'text':
                    if (data.value == '') {
                        return true
                    }
                case 'number':
                    if (data.value == '') {
                        return true
                    }
            }

    }
}

//gets value of data
function valOf(data) {
    switch (data.tagName) {
        case 'SELECT':
            return data.options[data.selectedIndex].value;
        case 'TEXTAREA':
            return data.value;
        case 'INPUT':
            switch (data.type) {
                case 'checkbox':
                    return data.checked;
                case 'number':
                    return data.value;
                case 'text':
                    return data.value;
                case 'radio':
                    return data.value;
            }
            break;
    }
}