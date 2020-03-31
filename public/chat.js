$(function(){
   	//Skapar en connection för användaren
	var socket = io.connect('http://localhost:3000')

	//buttons och inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	//Lyssnar på new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Emiterar username
	send_username.click(function(){ //varje gång man trycker på knappen(change_username)  och byter namn så skickar man det till servern
		socket.emit('change_username', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Lysnnar  när man skriver
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>") //kommer skriva ut  "is typing a message" när användaren skrivern något
	})
});
//client sidan skickar ett event med ett nytt värde till server sidan
