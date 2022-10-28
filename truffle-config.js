const path = require("path");

module.exports = {
	contracts_build_directory: path.join(__dirname, "etherbank-dapp/src/contracts"),
	networks: {
		development: {
			network_id: "*",
			port: 7545,
			host: "127.0.0.1",
		},
	},
	develop: {
		port: 8545,
	},
	compilers: {
		solc: {
			version: "^0.8.0",
		},
	},
};