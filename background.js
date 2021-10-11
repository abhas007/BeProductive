var i=0,j=0;
function blockunblock(){ return {cancel: true}; };
const sitesList =[];
const sitesList2 = [];

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
  if(message == "Time Over!")
  {
    alert(`${message}`);
  }

  else if(message =="unblock")
  {
    alert("You are good to go. All sites have been unblocked!");
    chrome.webRequest.onBeforeRequest.removeListener(blockunblock);
  }

  else if(typeof(message) !== typeof("abc"))
  {
    alert(`Alarm ${message.Text}`)
  }

  else if(message!==null)
  { 
        alert(message + ' blocked!')
        let site = "*://www."+message+".com/*"
        let msg = {
            Text : site
        };
        sitesList[i]=msg.Text;
        i++;
        chrome.webRequest.onBeforeRequest.addListener(
            blockunblock,
            {urls: sitesList},
            ["blocking"]
        );
    }
}