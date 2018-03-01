      
      console.log("hello")
      var express = require('express');
      var app = express();
      
      var Time = () => {
      var date = new Date();
      var current_hour = date.getHours();
      var current_minute = date.getMinutes();
      var current_seconds = date.getSeconds();
      return current_hour+':'+current_minute+':'+current_seconds
      }
      
      const movies = [
      { title: 'Jaws', year: 1975, rating: 8 },
      { title: 'Avatar', year: 2009, rating: 7.8 },
      { title: 'Brazil', year: 1985, rating: 8 },
      { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
      ] 

      app.get(`/`, function(req, res){
      res.send('batata');
      })   
      app.get(`/test`, function(req, res){
      res.status(200).send("ok")
      })   
      app.get('/time', (req,res) => {
      res.send({status:200, message:('Time: ',Time())})
      })
      app.get('/hello/:id', function(req, res){
      res.status(200).send('hello, ' + req.params.id)
      });

      app.get('/search',function (req,res) {
      const search = req.query.s;
      if (typeof search != 'undefined') {
      const response = {
      status:200, message:"ok", data: search
      };
      res.status(200)
      res.send(response);
      }
      else {
      const response = {
      status:500, error:true, message: "you have to provide a search"
      };
      res.status(500);
      res.send(response);}
      });

      app.get(`/movies/create`, function(req, res){
      res.send('create movie');
      }) 

      app.get(`/movies/update`, function(req, res){
      res.send('update movie');
      }) 

      app.get(`/movies/delete`, function(req, res){
      res.send('delete movie');
      }) 
      
      app.get(`/movies/read`, function(req, res){
      var makeli = (obj) => `<ul>`+obj.title+`  `+obj.year+`  `+obj.rating+`</ul>`
      var list = movies.slice().map(makeli).join(``)
      res.status(200).send(list)   
      }) 

      app.get(`/movies/read/by-title`, function(req, res){
      var makeli = (obj) => `<ul>`+obj.title+`  `+obj.year+`  `+obj.rating+`</ul>`
      var list = movies.map(makeli).sort().join(``)
      res.status(200).send(list)  
      }) 
    
      app.get(`/movies/read/by-date`, function(req, res){
      var makeli = (obj) => `<ul>`+obj.title+`  `+obj.year+`  `+obj.rating+`</ul>`
      var list = movies.slice().sort((a, b) => {return a.year - b.year}).map(makeli).join(``)
      res.status(200).send(list) 
      }) 

      app.get(`/movies/read/by-rating`, function(req, res){
      var makeli = (obj) => `<ul>`+obj.title+`  `+obj.year+`  `+obj.rating+`</ul>`
      var list = movies.slice().sort((a, b) => {return b.rating - a.rating}).map(makeli).join(``)
      res.status(200).send(list)  
      })

      app.get('/movies/read/id/:num', function(req, res){
      const id = req.params.num
      const article = movies[ id -1 ]
      if (id > movies.length || id < 1) {
      res.send(`error, the article ${id} does not exist`)
      return
      }
      res.send(`<html>`+article.title+`  `+ article.year +`  `+ article.rating+`</html>`)
      return
      });
    
      app.get('/movies/add',function (req,res) {
      const add = req.query;
      const t =req.query.title
      const y =req.query.year
      const r =req.query.rating
      if (!t || !y || y.length != 4 || isNaN(y)){
      console.log('hi')
      const response = {
      status:403, error:true, message: "you cannot create a movie without providing a title and a year"
      };
      res.send(response);
      }
      else if (typeof r == `undefined`){
      var test = {title: t, year:y, rating:4}
      movies.push(test)
      var makelist = (event) => `<li>`+ event.title +`  `+ event.year + `  `+event.rating+`</li>`
      var show = movies.map(makelist).join(``)
       res.send(`<html>`+show+`</html>`)
      }
      else{
      movies.push(add)
      var makelist = (event) => `<li>`+ event.title +`  `+ event.year + `  `+event.rating+`</li>`
      var show = movies.map(makelist).join(``)
      res.send(`<html>`+show+`</html>`)
      }
      });

      app.get('/movies/delete/:id', function(req, res){
      const id = req.params.id
      const array = movies[id - 1]
      if(typeof array == "undefined"){
      const response = {
      status:403, error:true, message: `the movie ${id} does not exist`
      };
      res.send(response) }
      else {
      movies.splice(id-1,1);
      var makelist = (event) => `<li>`+ event.title +`  `+ event.year + `  `+event.rating+`</li>`
      var show = movies.map(makelist).join(``)
      res.send(`<html>`+show+`</html>`)      }
      }) 
          
      app.get('/movies/update/:id', function(req, res){
      const id = req.params.id
      const t =req.query.title
      const r =req.query.rating
      const array = movies[id -1]
     
      if(typeof array !="undefined"){
      array.title =t
      array.rating =r
      var makelist = (event) => `<li>`+ event.title +`  `+ event.year + `  `+event.rating+`</li>`
      var show = movies.map(makelist).join(``)
      res.send(`<html>`+show+`</html>`)   
      return   
      }  
      res.send(`the movie ${id} does not exist `)
      return
      })

      app.listen(8080, function () {
      console.log('this app listening on port 3000');
      });
