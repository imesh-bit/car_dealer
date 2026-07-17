const automobileListing = require("./automobileListing");
const autoPartListing = require("./autoPartListing");
const speciesListing = require("./speciesListing");

module.exports = [
  ...automobileListing,
  ...autoPartListing,
  ...speciesListing,
];
