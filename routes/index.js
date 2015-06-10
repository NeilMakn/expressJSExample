var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var notes = require('../models/notes');

// get notes
router.get('/', function(req,res){
    res.render('index', {title: "My Notes", notes: notes});

});

// add note
router.get('/noteadd', function(req,res){
  res.render('noteedit', {
      title: "add note",
      docreate: true,
      notekey: "",
      note: undefined
  });
});


router.post('/notesave', function(req,res){
    if (req.body.docreate == 'create') {
        notes.create(req.body.notekey, req.body.title, req.body.body);
    } else {
        notes.update(req.body.notekey, req.body.title, req.body.body);
    }
    res.redirect('/noteview?key=' + req.body.notekey);
});


router.get('/noteview', function(req,res){
    var note = undefined;
    if (req.query.key){
        note = notes.read(req.query.key);
    };
    res.render('noteview', {
      // title: boolean test ? trueEpression evaluated : false eval
        title: note ? note.title : "",
        notekey: req.query.key,
        note: note
    });

});


router.get('/noteedit', function(req,res){
  var note = undefined;
  if (req.query.key) {
      note = notes.read(req.query.key);
  };
    res.render('noteedit', {
        title: note ? note.title : "",
        docreate: note ? false : true,
        notekey: req.query.key,
        note: note
    });
});


router.get('/delete', function(req,res){
    var note = undefined;
    if (req.query.key) {
      note = notes.read(req.query.key);
    };
    res.render('confirmDestroy',{
        title: note ? note.title : "",
        notekey: req.query.key,
        note: note
    });
});


router.post('/notedeleted', function(req,res) {
    notes.destroy(req.body.notekey);
    res.redirect('/');

});


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//

module.exports = router;
