const express = require('express')
const app = express()


// Den här raden settar view engine till ejs så att den vet vad den ska använda när man använder res.render
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//lyssnar på 3000
server = app.listen(3000)

//ger oss tillgång till socket.io bibliotek
const io = require("socket.io")(server)


//lyssnar på varje connection
io.on('connection', (socket) => {
	console.log('Ny användare connected') //skriver ut en ny användare conntected varje gång någon connectar

	//Ser till så att man är annonym
	socket.username = "Anonymous"

    //lyssnar när man byter namn
    socket.on('change_username', (data) => {
        socket.username = data.username //om ett meddlande är skickat till event så ändras namnet
    })

    //lyssnar på nytt msg
    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
					//broadcastar sedan det till alla så att alla användare kan se meddelanet
    })

    //lysnnar när man skirver
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
			//broadcastar sedan det till alla
    })
})
