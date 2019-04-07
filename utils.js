/**
 *
 * @param {string} msg
 */
function replaceMsgVars(msg, member) {
	let ms = msg;
	ms = ms.replace('{username}', member.user.username);
	ms = ms.replace('{mention}', `<@${member.id}>`);
	ms = ms.replace('{tag}', member.user.tag);
	return ms;
}

module.exports = {
	replaceMsgVars,
};