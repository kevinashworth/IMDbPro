/*$(document).ready(function() {
	doPageHandling();
}); 



if (window.top === window) {
// The parent frame is the top-level frame, not an iframe.
// All non-iframe code goes before the closing brace.

	// settings
	var bLoginAutomatically = null;
	var settings;
	
	// listen for an incoming setSettings message
	function getMessage(msgEvent) {
		if (msgEvent.name == "settingValueIs") {
		  settings = msgEvent.message;
			alert("Value for asked setting is: " + msgEvent.message);
	}

	safari.self.tab.dispatchMessage("getSettingValue", "bLoginAutomatically"); // ask for value
	safari.self.addEventListener("message", getMessage, false); // wait for reply



  function PageShowHandler(event)
  {
    if (bLoginAutomatically) {
      hideMessage();
    }
  }
   
  function injectText()
  {
      // get the document body
      var pageBody = jQuery('body', document);
      // console.log('entered injectText');
      pageBody.prepend('<h1>Hello World</h1>');
  }
  
  function hideMessage() {
    //			$("#message").css("display","none");
    $("#message").css("border","30px solid red");
  }
   
  PageShowHandler();


}*/

function loginIfUsernamePassword() {
  // is there a stored username and password?
//  console.log($('#username').val().length);
  //console.log($('#password').val().length);
  if (($('#username').val().length > 0) && ($('#password').val().length > 0)) {
  	$('input[value="go"]').click();
 // 	return true;
  }
}

function doLogin() {
//  var success = loginIfUsernamePassword();
//  var success;
//  setTimeout ("success = loginIfUsernamePassword();", 200);
  // if not, wait 2 seconds for browser to populate remembered fields and try one more time
//  if (!success) 
  //  setTimeout ("loginIfUsernamePassword();", 2000);
  setInterval(loginIfUsernamePassword, 200);
}

function hideMessage() {
  $("#message").css("display","none");
}


/* http://bugs.jquery.com/ticket/278 */
$.extend($.expr[':'], {
  'containsi': function(elem, i, match, array)
  {
    return (elem.textContent || elem.innerText || '').toLowerCase()
    .indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});

function prevNext() {
  $("a:containsi('Previous')").each(function() {
    $(this).attr('accesskey', 'p');
    return false;
  });
  $("a:containsi('Next')").each(function() {
    $(this).attr('accesskey', 'n');
    return false;
  });
}

$(document).ready( function() {
  var settings, init = function() {
    var h = document.location.href;
    var p = document.location.pathname;
    console.log(document.location);
  	var l1 = h.indexOf("https://secure.actorsaccess.com/projects/?login");
  	var l2 = h.indexOf("loginSecure");
  	var l3 = h.indexOf("loggedout"); // don't immediately log back in
  	var l4 = p.length;
  	
  	prevNext();
  	
  	if (settings.bHideMessages) {
  	  hideMessage();
  	}

    if (settings.bLoginAutomatically && (l3 < 1)) {
      if ((l1 == 0) || (l2 > 1) || (l4 == 1)) {
        doLogin();
      }
    }
  };

  // listen for an incoming setSettings message
  safari.self.addEventListener("message", function(e) {
    if(e.name === "setSettings") {
      settings = e.message;
//    console.debug(e.message);
      init();
    }
  }, false );

  // ask global.html for settings
  safari.self.tab.dispatchMessage("getSettings");
}() )
