/*
  SCRIPT INFO

  This script is for use with Google Sheets. 
  It is designed to be used with the 'maizey' function that sends a message to a conversation in Maizey.
  The 'maizey' function takes a query as an argument and returns the response from Maizey.
  The 'send_msg' function is used to send a message to a conversation in Maizey.
  The 'new_convo' function is used to generate a new conversation for use with the 'send_msg' function.

  SCRIPT SETUP

  1. Create a new Google Sheet or open an existing one.
  2. Click on Extensions > Apps Script.
  3. Copy and paste this script into the code editor.
  4. Save the project with a name of your choice.
  5. Navigate to 'Script Properties' by clicking on the gear on the left and scrolling down.
  6. Add a new property with the key 'token' and the value as your Maizey token. BE CAREFUL AS ANYONE WITH EDITING ACCESS WILL BE ABLE TO SEE YOUR TOKEN.
  7. Go back to the code editor and change the 'url' and 'project_pk' variables to match your Maizey instance and project GUID.
  8. Click on the floppy disk icon to save the changes. Then, select the new_convo function in the droppdown and click the play button to generate a new conversation.
  9. Set the 'convo_pk' variable to the conversation GUID that was generated. Then, save.
  10. You can now use the 'maizey' function in your Google Sheet to send queries to Maizey.
*/

url = "https://dev.dev.umgpt.umich.edu"
project_pk = '76b93e4c-46d2-423d-937b-cf5e792dd6d4'
var scriptProperties = PropertiesService.getScriptProperties();
token = scriptProperties.getProperty('token')
convo_pk = '2305'

const headers = {
  'accept': 'application/json',
  'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json'
};

function make_request(url = '', msg = '') {
  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: headers,
    muteHttpExceptions: true, // To get detailed error messages if any
    payload: JSON.stringify({ 'query': msg })
  };

  var r = UrlFetchApp.fetch(url, options);
  Logger.log(r)  
  var content = JSON.parse(r.getContentText());
  return content;
}

function new_convo() {
  request = make_request(`${url}/maizey/api/projects/${project_pk}/conversation/`,'')
  Logger.log(request)
}

function send_msg(conversation_pk = '', message = '') {
  var new_msg = `${url}/maizey/api/projects/${project_pk}/conversation/${conversation_pk}/messages/`;
  return make_request(new_msg, message);
}

function maizey(query) {
  var r = send_msg(convo_pk, query);
  Logger.log(r.response);
  return r.response;
}
