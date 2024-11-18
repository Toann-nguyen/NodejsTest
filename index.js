const express = require('express')
const connect = require('./connect.js')
const regis = require('./models/user.js')


//kết nối Nodejs và MongoDB
async function main() {
  await connect().then(() => console.log("Ket noi database thanh cong"));
  const app = new express()

  //set ứng dụng để gọi đến giao diện
  const path = require('path')
  const ejs = require('ejs')
  app.set('view engine', 'ejs')
  app.set('views', './views')
  app.use(express.static('public'))
  app.use(express.static(__dirname + '/public'));
  const bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json({ type: 'application/json' }))
  app.use(bodyParser.raw());



  const server = app.listen(8000, () => { console.log("Server run port 8000") })

  app.post('/api/insert', (req, res) => {
    regis.create(req.body).then(() => {
      res.redirect('/admin_select')
    })
  })

  app.get('/', function (req, res) {
    res.render('admin_insert')
  })
  app.get('/login', function (req, res) {
    res.render('create')
  })

  app.get('/admin_insert', function (req, res) {
    regis.find({}).then((result) => {
      console.log(result);
      res.render('admin_insert', { user_regis: result });
    })
      .catch((err) => console.log(err))
  });

  app.get('/admin_select', function (req, res) {
    regis.find({}).then((result) => {
      console.log(result);
      res.render('admin_select', { user_regis: result });
    })
      .catch((err) => console.log(err))
  });

  app.get('/update/:id', function (req, res) {
    regis.findById(req.params.id).then((result) => {
      console.log(result);
      res.render('update', { user_id_regis: result });
    })
      .catch((err) => console.log(err))
  })

  app.get('/update/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getArticleById(id); 
    if (result) {
      res.render('update', { user_id_regis: result });
    } else {
      res.status(404).send('Article not found');
    }
  });



  app.post('/api/update/:id', function (req, res) {
    regis.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        console.log('Update successful');
        res.redirect('/admin_select');
      })
      .catch((error) => {
        console.error('Update failed:', error);
        res.status(500).send('Update failed');
      });
  });


  app.get('/delete/:id', function (req, res) {
    regis.findByIdAndDelete(req.params.id).then((result) => {
      console.log('delete successful')
      res.redirect('/admin_select')
    })
  })

  app.get('/delete/:id', function (req, res) {
    regis.findByIdAndDelete(req.params.id).then((result) => {
      console.log('delete successful')
      res.redirect('/admin_select')
    })
  })

}
main().catch(err => console.error(err))