function has_letters(arr, st) {
    st = st.toLowerCase();
    let stCounts = {};
    for (let ch of st) {
        stCounts[ch] = (stCounts[ch] || 0) + 1;
    }
    let bad = arr.filter(word => word.length > st.length || !Array.from(word).every(ch => (word.match(new RegExp(ch, 'g')) || []).length <= (stCounts[ch] || 0)));
    arr = arr.filter(word => !bad.includes(word));
    let stSet = new Set(st);
    bad = arr.filter(word => !Array.from(word).every(ch => stSet.has(ch)));
    return arr.filter(word => !bad.includes(word));
}


function fill_blanks(arr, bl) {
    bl = bl.toString().toLowerCase().split('');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length != bl.length) {
            arr.splice(i, 1);
            i--;
        }
    }

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < bl.length; j++) {
            if (bl[j] != "_" && bl[j] != arr[i][j]) {
                arr.splice(i, 1);
                i--;
                break;
            }
        }
    }
    return arr;
}


function get_words() {
    var words = english3();
    // want words to be an array of strings with len > 2
    for (var i = 0; i < words.length; i++) {
        if (words[i].length <= 2) {
            words.splice(i, 1);
            i--;
        }
    }
    return words;
}

function show(words) {
    // sort words by length
    words.sort(function (a, b) {
        return a.length - b.length;
    });
    // print words
    document.getElementById("output").innerHTML = "";
    for (var i in words) {
        document.getElementById("output").innerHTML += words[i] + "<br>";
    }
}

function solve_heap() {
    var letters = document.getElementById("letters").value;
    var words = has_letters(get_words(), letters);
    show(words);
}

function solve_blanks() {
    var blanks = document.getElementById("blanks").value;
    var letters = document.getElementById("letters").value;
    var words = fill_blanks(has_letters(get_words(), letters), blanks);
    show(words);
}

function english3() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./english3.txt", false);
    xhr.send();
    var words = xhr.responseText.split(/[\r\n]+/);
    words = words.filter(function (word) {
        return word.length > 2;
    });
    return words;
}
