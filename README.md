LDRLY-THT
=======

# LDRLY Development - Take Home Test
## Description
Create a simple HTTP based REST based API that implements three methods, sendStat,
getLeaderboard, getStats. This functionality can be implemented in any language you choose,
and you can use any persistence mechanism to store the stat data (text file, MySQL,
Memcache, MongoDB, Redis, PostGreSQL, etc). The application should check inputs to ensure
validity and requires either a success or failure message upon HTTP response to the client.

## Methods
* sendStat should accept the following inputs: username, stat name, and stat value. Each
stat needs to be stored specific to the username so that it can be compared to the other
users in the upcoming methods
* getLeaderboard should accept the following inputs: stat name. The method should
return a JSON sorted list of all recorded users with entries for the specified stat (highest
to lowest) of the username, users ranking, points scored. Essentially this is a JSON
representation of a stat specific leaderboard.
* getStats should accept the following inputs: username. The method should return a
JSON list of all stats submitted to the API for the specified user.

## Start Schema
Sample JSON schema provided

    <code>
        {
            "created_at" : ISODate("2013-10-13T08:38:10.6363Z"),
            "fbid" : 123456789,
            "value" : 456,
            "name" : "coins_earned",
            "_id" : ObjectId("5265b428545034135f000008")
        }
    <code>

## Revised Schema
    <code>
        {
            type : String,
            username : String,
            name : String,
            value : Number,
            created : Date,
            lastmodified : Date
            }
    </code>

# Routes
## Populate data
*   /leaderboard/populate/with/sample/data/homeslice
    + Send a POST request to this resource in-order to populate with sample data
        + 100 Users where each users has 10 stats
## Get Stats
* /leaderboard/user/:uname/stats
    + Send a GET request in-order to retruns a JSON list of all the stats submitted to the API for the specified user
        + :uname - The specified user
## Get Leaderboard
* /leaderboard/user/:uname/stat/:sname
    + Send a PUT request in-order to store a stat name and value against a specific user
        + :uname - The specified user
        + :sname - The stat name
        + Messagebody: { "value" : 10 }
## /leaderboard/stat/:sname
* Send a GET request in-order to retrieve the Leaderboard, represented a JSON object, sorted from highest value to lowest
    + :sname - The specified stat name
## /index.html
* Homepage - returns an HTML page representing the leaderboard
    + Searching by a stat name will return the leaderboard, from highest to lowest value
    + Searching by the player will return all the stats associated to that player via the API

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

