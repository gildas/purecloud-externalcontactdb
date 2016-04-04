ExternalContactDB
=================

A simple Website that shows how to use [Interactive Intelligence, Inc](https://www.inin.com)'s [PureCloud](https://mypurecloud.com) connector to interface with external providers.

Installation
------------

First, we need to install [Node.js](https://nodejs.org) and [Bower](http://bower.io):  

1. On Mac OS/X
  If you use [Homebrew](http://brew.sh), simply run:
  ```sh
  brew install nodejs
  ```
  Otherwise, go to [Node.js downloads](https://nodejs.org/en/download) and follow the instructions.

2. On  Windows
  If you use [chocolatey](https://chocolatey.org), simply run in an *administrator* shell:
  ```posh
  cinst -y nodejs
  ```
  Otherwise, go to [Node.js downloads](https://nodejs.org/en/download) and follow the instructions.

3. On Linux
  Debian like distributions would use:
  ```sh
  sudo apt-get install -y build-essential
  curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

  RedHat like distributions would use:
  ```sh
  sudo yum groupinstall 'Development Tools'
  curl --silent --location https://rpm.nodesource.com/setup_5.x | bash -
  sudo yum -y install nodejs
  ```

Finally, clone this repository anywhere you see fit:

```sh
git clone https://github.com/gildas/ExternalContactDB.git
```

Install it:
```sh
cd ExternalContactDB
npm install
```

Configuration
-------------

In the root folder of the project, write a config.json file, like this:

```json
{
  "port": 3000
}
```

An example is provided in [config-sample.json](../blob/master/config-sample.json).

Notes:
- To use the default values, you can omit the value in the JSON.
- The default port is 3000

Run
---

In the root folder of the prohect, simply type:
```sh
node app.js
```

in the main folder of the project.

You can override the configuration set in the config.json using environment variables and command line options:

```sh
node app.js -- --port 1234
```

On Mac OS/Linux:
```sh
PORT=1234 node app.js
```

On Windows:
```posh
$env:PORT=1234 ; node app.js
```

If you want extra debugging messages to show:

```sh
DEBUG=ExternalContactDB:* node app.js
```

or, on Windows:
```posh
$env:DEBUG="ExternalContactDB:*" ; node app.js
```

Deployment on :heart:[Heroku](https://heroku.com):sunglasses:
----------------------

These instructions are for Mac OS/X, but I suspect Linux and Windows would be quite similar.  
Run all commands from the *root* of the project.

1. Make sure you have the [Heroku](https://heroku.com) toolbelt loaded... Check their [getting started](https://devcenter.heroku.com/login?back_to=%2Farticles%2Fgetting-started-with-nodejs) document otherwise.
2. Login your heroku account
3. Create the application:
```sh
heroku create
```
4. Configure your PureCloud OAUTH Application to accept the URL that was just created.  
   For instance: `http://sharp-rain-871.herokuapp.com/`
5. Deploy the application to your [Heroku apps](https://dashboard.heroku.com/apps).
```sh
git push heroku master
```
6. Configure the instance with the port you want:
```sh
heroku config:set PORT="80"
```
On Heroku, 80 is the default port, so you can omit the configuration in that case.

7. Make sure the instance is running
```sh
heroku ps:scale web=1
```
Here I give only 1 Dyno, for a quick test, that's more than enough.
8. Have fun a use it!  
Either open your browser and go to the web site created in 3, or type:
```sh
heroku open
```

To see if it is all smooth, you can check the logs at:
```sh
heroku logs --tail
```

AUTHORS
=======
[Gildas Cherruel ![endorse](https://api.coderwall.com/gildas/endorsecount.png)](https://coderwall.com/gildas)
