How-to build virtual environment with nodeenv, sample, it seems doesn't work with requirements:

$ nodeenv --requirement=requirements.txt --node=0.6.10 --jobs=4 node-0.6.10

Or, better, it seems not working well on my pc with requirements.txt:

$ nodeenv --node=0.6.10 --jobs=4 node-0.6.10

and then in your git directory install request module.

Don't commit node_modules directory! :) 
Put it into gitignore.

Needed:

http://pythonpackages.com/info/nodeenv

Project actually run on (latest node/packages stable when I wrote this project):
* node 0.6.10 
* request 2.9.100
* npm 1.1.1

