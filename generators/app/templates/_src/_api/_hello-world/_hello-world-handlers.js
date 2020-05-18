'use strict';

exports.helloWorld = (request, reply) => {
  
  const response = reply.response('Welcome!! You are ready to create API');
  response.type('application/json');
  
  return response;

};

