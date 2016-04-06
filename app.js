#!/usr/bin/env node

var app_info   = require('./package.json');
var fs         = require('fs');
var util       = require('util');
var config     = require('nconf');
var gitrev     = require('git-rev');
var debug      = require('debug')('ExternalContactDB:server');
var express    = require('express');
var bodyParser = require('body-parser');
var http       = require('http');

/**
 * Fake database
 */
var contact_db = {
  '1111': { agent_id: 'agent01' },
  '2222': { agent_id: 'agent02' },
  '3333': { agent_id: 'agent03' },
  '4444': { agent_id: 'agent04' },
};

/**
 * Retrieve the configuration
 *   Order: CLI, Environment, config file, defaults.
 *   Reminder: When running through foreman (nf), the port will be set to 5000 via the environment
 */
config.argv({
  port: { alias: 'p', describe: 'Make the server listen to this port' }
})
.env({ separator: '_', lowerCase: true })
.file({ file: './config.json' })
.defaults({
  port: 3000
});

/**
 * Environment and git information
 */
console.log("Version: %s", app_info.version);
gitrev.short(function(value)  { console.log('Git commit: ' + value); });
gitrev.branch(function(value) { console.log('Git branch: ' + value); });
gitrev.tag(function(value)    { console.log('Git tag: '    + value); });

/**
 * Create the application.
 */
var app = express();

app.set('port', config.get('port'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Routes
 */
app.post('/GetLastAgentByCustomerId', function(req, res) {
  console.log('POST /GetLastAgentByCustomerId');
  console.log("  customer id: %s", req.body.customerId);

  var contact = contact_db[req.body.customerId];
  if (contact){
    console.log("Found customer!");
    res.json(contact);
  } else if (req.body.customerId === undefined) {
    console.log("Bad Request is missing [customerId]");
    res.status(400).send("error.key.notfound(id: \"customerId\")");
  } else {
    console.log("Customer not found");
    res.status(404).send(util.format("error.id.notfound(id: \"%s\")", req.body.customerId));
  }
});

/**
 * Error handling
 */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });
} else { // production error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: {} });
  });
}

/**
 * Create HTTP server.
 */
app.set('server', app.listen(config.get('port'), function(){
  console.log("Listening on port %s", config.get('port'));
}));

// Expose app
exports = module.exports = app;
