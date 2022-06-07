const {ObjectId} = require('mongodb')
module.exports = function (app, passport, db) {
  // LOGIN ===============================
  // show the home page
  app.get('/', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.get('/bookshelf', isLoggedIn, function (req, res) {
    db.collection('books').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {
        user: req.user,
        books: result
      })
    })
  });


  // process the login form on home page
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/bookshelf', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  //   app.get('/', function(req, res) {
  //       res.render('index.ejs', { message: req.flash('signupMessage') });
  //   });
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });
  // process the signup form
  app.post('/signupsuccess', passport.authenticate('local-signup', {
    successRedirect: '/bookshelf', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // message board routes ===============================================================

  app.post('/bookshelf', (req, res) => {
    db.collection('books').insertOne({ title: req.body.title, edit: req.body.edit, remove: req.body.remove, author: req.body.author, genre: req.body.genre, numOfPages: req.body.numOfPages, startDate: req.body.startDate, endDate: req.body.endDate, thoughts: req.body.thoughts }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/bookshelf')
    })
  })

  app.put('/booklist', (req, res) => {
    db.collection('books')
      .findOneAndUpdate({ favorite: req.body.favorite }, {
        $set: {
          favorite : true

        }
      }, {
        sort: { _id: -1 },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.get('/', (req, res) => {
  db.collection('list').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/items', (req, res) => {
  db.collection('list').insertOne({date: req.body.date, msg: req.body.msg, favorited:false }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/favorites', (req, res) => {
  console.log(req.body)
  db.collection('books')
  .findOneAndUpdate({title: req.body.title, numOfPages: req.body.numOfPages, thoughts: req.body.thoughts}, {
    $set: {
      favorited: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })

  app.delete('/bookshelf', (req, res) => {
    db.collection('books').findOneAndDelete({ title: req.body.title, author: req.body.author, numOfPages: req.body.numOfPages, thoughts: req.body.thoughts },
      (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
  })

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    const user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/');
    });
  });
})
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
}
