nodejs-cxx-proxy
================

Cross site scripting ajax web proxy 

This is an experiment to use nodejs, it starts from the ideas found on:
* http://www.ajax-cross-domain.com/
* re-create a sort of YQL without steroids, in order to have a independent service without external agents

It is a service / API that accepts a set of parameters, including a callback, and generate the Javascript code to be called, like JSONP technique.

I use nodeenv http://pypi.python.org/pypi/nodeenv in order to create a virtual node environment.
