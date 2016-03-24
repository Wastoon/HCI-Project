/*Smooth Scrolling*/
$(document).ready(function() {
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });

  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
  
	var userID = parseInt(localStorage.getItem("currentUser"));
	var loggedIn;
	if(locationPath == "~jnassar/HCI-Project"){
		$.post("getLoggedInTime.php", {id: userID},
			function(data){
				localStorage.setItem("loggedIn", data);
			});
	}
	else{
		$.post("../getLoggedInTime.php", {id: userID},
			function(data){
				localStorage.setItem("loggedIn", data);
			});
	}

  //Starts the discussion window at the bottom
  var objDiv = document.getElementById("discussion-window");
  objDiv.scrollTop = objDiv.scrollHeight;

});
$(window).load(function(){
	if(localStorage.getItem("loggedIn") == 0){
		console.log("Not logged in");
		$('#loginModal').modal('show');
	}
	else{
		console.log("Logged in");
		console.log(localStorage.getItem("loggedIn"));
		document.getElementById("home-content").style.display = "block";
	}
});

function login(form) {
	var email = $("#email-address").val();
	var password1 = $("#password").val();
	$.post("login.php", { email: email, password1: password1 },
		function(data) {
			if(data == -1){
				alert("No user exists with that email address");
				document.getElementById("email-address").value = "";
				document.getElementById("password").value = "";
				return false;
			}
			else if(data == -2){
				alert("Incorrect password");
				document.getElementById("password").value = "";
				return false;
			}
			else{
				$.post("updateLoggedIn.php", {email: email},
				function(data){
				});
				localStorage.setItem("currentUser", data);
				$('#loginModal').modal('hide');
				document.getElementById("home-content").style.display = "block";
			}
	});
  return true;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile-picture')
                .attr('src', e.target.result)
                .height(140);
        };
        document.getElementById("profile-picture").style.display = "block";
        reader.readAsDataURL(input.files[0]);
    }
}

function checkNewUser(form){
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var ret = true;

  if (reg.test(form.email.value) == false)
  {
      alert('Invalid Email Address');
      ret = false;
  }
  return ret;

}

function signup(form) {

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	if (reg.test(form.email.value) == false)
	{
		alert('Invalid Email Address');
		return false;
	}

	var firstname = $("#first-name").val();
	var lastname = $("#last-name").val();
	var phonenumber = $("#phone-number").val();
	phonenumber = phonenumber.split('-').join('');
	var email = $("#email-address").val();
	var password1 = $("#password1").val();
	var aboutme = $("#about-me").val();
	var groupid = $("#group-id").val();

	$.post("signup.php", { firstname: firstname, lastname: lastname, phonenumber:phonenumber,
			email: email, phonenumber: phonenumber, password1: password1, aboutme: aboutme, groupid: groupid },
		function(data) {
		if(data == 0){
			alert("User created!");
			
			$.post("../updateLoggedIn.php", {email: email},
				function(data){
					localStorage.setItem("currentUser", data);
				});
		}
		else if(data == 1){
			alert("There is already an account associated with that email address!");
		}
		else if(data == 2){
			alert("There is already an account associated with that phone number!");
		}
	});
	
	
   return true;
}
