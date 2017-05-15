const util = module.exports = (() => {

  'use strict';

  return {
    sanitizeInput: sanitizeInput,
    createResponseData: createResponseData,
    saveDocument: saveDocument
  };

  /////////////////////////////////////////////////////////////////////////////

  function sanitizeInput(str) {
      return String(str).replace(/&(?!amp;|lt;|gt;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function createResponseData(id, name, value, attachments) {

      var responseData = {
          id: id,
          name: sanitizeInput(name),
          value: sanitizeInput(value),
          attachements: []
      };


      attachments.forEach((item, index) => {
          var attachmentData = {
              content_type: item.type,
              key: item.key,
              url: '/api/favorites/attach?id=' + id + '&key=' + item.key
          };
          responseData.attachements.push(attachmentData);

      });
      return responseData;
  }

  function saveDocument(id, name, value, response) {

      if (id === undefined) {
          // Generated random id
          id = '';
      }

      db.insert({
          name: name,
          value: value
      }, id, function(err, doc) {
          if (err) {
              console.log(err);
              response.sendStatus(500);
          } else
              response.sendStatus(200);
          response.end();
      });

  }

})();
