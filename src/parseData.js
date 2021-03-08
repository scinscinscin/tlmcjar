function parseData(versionObject) {
	let response = {};

	response.dl = {};
	response.dl.c = versionObject.downloads.client;
	response.dl.s = versionObject.downloads.server;
	return response;
}

module.exports = parseData;
