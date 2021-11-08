const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random',(req,res,next)=>{
	const randomQuote = getRandomElement(quotes);
	res.send({ quote :randomQuote})

});

app.get('/api/quotes',(req,res,next)=>{
	
	if(req.query.person){
		const filterquote = quotes.filter(
			item => item.person == req.query.person )
			res.send({quoteps : filterquote});
		
	}else{

		 res.send({ quotes : quotes});
	}

});

app.post('/api/quotes',(req,res,next)=>{
	if (req.query.quote && req.query.person){
		quotes.push(req.query);
		res.send({ quote: { quote: req.query.quote, person: req.query.person } });
	}else {
		res.status(400).send();
	}
})

app.listen(PORT, ()=>{
	 console.log(`Quote API listening at http://localhost:${PORT}`)
});
