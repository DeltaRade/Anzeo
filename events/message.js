const { Utils } = require('liberch');
module.exports = (client, message)=>{
	if(Utils.containsInvite(message)) {
		message.delete();
	}
};