import { RowDataPacket } from "mysql2";

interface DomainsTableStructure extends RowDataPacket{
	id: string;
	domain: string;
	active: string;
	comments: string;
}

const DomainsTableFields : DomainsTableStructure = {
	"id" : "int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY",
	"domain" : "varchar(50) NOT NULL",
	"active" : "boolean NOT NULL DEFAULT 0",
	"comments" : "varchar(150)",
	constructor: {
		name: 'RowDataPacket',
	},
} 

interface LightningTable extends RowDataPacket {
	id: string;
	pubkey: string;
	lightningaddress: string;
	comments: string;
}

const LightningTableFields: LightningTable = {
	id: "int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY",
	pubkey: "varchar(64) NOT NULL",
	lightningaddress: "varchar(50) NOT NULL",
	comments: "varchar(150)",
	constructor: {
		name: 'RowDataPacket',
	},

};

interface MediafilesTable extends RowDataPacket {
	id: string;
	pubkey: string;
	filename: string;
	original_hash: string;
	hash: string;
	status: string;
	percentage: string;
	visibility: string;
	active: string;
	date: string;
	ip_address: string;
	magnet: string;
	blurhash: string;
	dimensions: string;
	filesize: string;
	comments: string;
}

const MediafilesTableFields: MediafilesTable = {
	id: "int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY",
	pubkey: "varchar(64) NOT NULL",
	filename: "varchar(128) NOT NULL",
	original_hash: "varchar(64)",
	hash: "varchar(64)",
	status: "varchar(10) NOT NULL",
	percentage: "int(3) NOT NULL DEFAULT 0",
	visibility: "boolean NOT NULL DEFAULT 0",
	active: "boolean NOT NULL DEFAULT 0",
	date: "datetime NOT NULL",
	ip_address: "varchar(64) NOT NULL",
	magnet: "varchar(512)",
	blurhash: "varchar(256)",
	dimensions: "varchar(15)",
	filesize: "varchar(15)",
	comments: "varchar(150)",
	constructor: {
		name: 'RowDataPacket',
	},
};

interface MediatagsTable extends RowDataPacket {
	id: string;
	fileid: string;
	tag: string;
}

const MediatagsTableFields: MediatagsTable = {
	id: "int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY",
	fileid: "int(11) NOT NULL",
	tag: "varchar(64) NOT NULL",
	constructor: {
		name: 'RowDataPacket',
	},
};

interface RegisteredTable extends RowDataPacket{
	id: string;
	pubkey: string;
	hex: string;
	username: string;
	password: string;
	domain: string;
	active: string;
	date: string;
	allowed: string;
	authkey: string;
	apikey: string;
	comments: string;
}

const RegisteredTableFields: RegisteredTable = {
	id: "int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY",
	pubkey: "varchar(64) NOT NULL",
	hex: "varchar(64) NOT NULL",
	username: "varchar(50) NOT NULL",
	password: "varchar(100) NOT NULL",
	domain: "varchar(50) NOT NULL",
	active: "boolean NOT NULL DEFAULT 0",
	date: "datetime NOT NULL",
	allowed: "boolean NOT NULL DEFAULT 0",
	authkey: "varchar(64)",
	apikey: "varchar(64)",
	comments: "varchar(150)",
	constructor: {
		name: 'RowDataPacket',
	},
};

//If you add a new field that is substituting an old one, add it here
const newFieldcompatibility = [
	{ newfield: 'newFieldname', oldField: 'oldFiedName' },
  ];

  const DatabaseTablestest = [
	{"domains": DomainsTableFields},
	{"lightning": LightningTableFields},
	{"mediafiles": MediafilesTableFields},
	{"mediatags": MediatagsTableFields},
	{"registered": RegisteredTableFields}
];


export {
	DomainsTableFields,
	LightningTableFields,
	MediafilesTableFields,
	MediatagsTableFields,
	RegisteredTableFields,
	newFieldcompatibility,
	DatabaseTablestest
};	
	