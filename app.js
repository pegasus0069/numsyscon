var http = require('http')
var express = require('express')
const {
	response
} = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = http.Server(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use("/static", express.static('./static/'));
//Server routes from here
app.get('/', function (request, response) {
	//console.log(request)
	response.sendFile(__dirname + '/index.html')
})
server.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function () {
	console.log('Server Running');
})
module.exports = {
	app, server
}