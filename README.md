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

# Sample Deployment
## Deployment Architecture