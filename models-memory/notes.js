var notes = [];

exports.update = exports.create = function (key, title, body) {
    notes[key] = {title: title, body: body};
}


exports.read = function (key) {
    return notes[key];
    consoel.log(notes);
}

exports.destroy = function (key) {
    delete notes[key];
    console.log(notes)
}

exports.keys = function () {
    return Object.keys(notes);
}
