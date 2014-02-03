LDRLY-THT
=======

LDRLY Development - Take Home Test

# Configuration

Endpoint configuration driven by Environmental Variables. Please see below for more details.

## Environment Variables
### Sample Service Address
* LEADERBOARD_URL
* MONGOHQ_URL


## Node.js WebStorm Configuration
### Sample Project Configuration
* Name:
    + server.js
* Path to node:
    + /usr/local/bin/node
* Node Parameters:
    + --debug
* Working directory:
    + /Users/geekatron/workspace/Webstorm/Planet R&D/SIP
* Path to Node App JS File:
    + server.js
* Application Parameters:
    + N/A

#### Sample Environment Variables
* LEADERBOARD_URL
    + ldrly.geekatron.org
* MONGOHQ_URL
    + mongodb://username:password@troup.mongohq.com:10075/app21866780

#### When deploying set the environmental variables
* LEADERBOARD_URL
     + heroku config:add LEADERBOARD_URL=ldrly.geekatron.org
 * MONGOHQ_URL
     + heroku config:add MONGOHQ_URL=mongodb://username:password@troup.mongohq.com:10075/app21866780

# Routes
## /leaderboard/populate/with/sample/data/homeslice
* Send a POST request to this resource in-order to populate with sample data
    + 100 Users where each users has 10 stats
## /leaderboard/user/:uname/stats
* Send a GET request in-order to retruns a JSON list of all the stats submitted to the API for the specified user
    + :uname - The specified user
## /leaderboard/user/:uname/stat/:sname
* Send a PUT request in-order to store a stat name and value against a specific user
    + :uname - The specified user
    + :sname - The stat name
    + Messagebody: { "value" : 10 }
## /leaderboard/stat/:sname
* Send a GET request in-order to retrieve the Leaderboard, redpresenred as a JSON object, sorted from highest value to lowest
    + :sname - The specified stat name
