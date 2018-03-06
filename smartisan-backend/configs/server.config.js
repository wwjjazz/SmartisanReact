const host = '127.0.0.1';
const port = 9999;
const staticPath = 'public/';
const url = `http://${host}:${port}/`;
const staticUrl = url + staticPath;
const attachmentUrl = staticUrl + 'attachments/';

module.exports = {
	host,
	port,
	staticPath,
	url,
	staticUrl,
	attachmentUrl
};