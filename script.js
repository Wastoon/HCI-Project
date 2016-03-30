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
  
	if(locationPath == "~jnassar/HCI-Project/signup"){}
	else if(locationPath == "~jnassar/HCI-Project"){
		$.post("isLoggedIn.php", {id: 0},
			function(data){
				console.log("Logged in as: "+data);
				if(data != -1){
					document.getElementById("home-content").style.display = "block";
				}
				else{
					console.log("Not logged in");
					$('#loginModal').modal('show');
				}
			});
	}
	else{
		$.post("../isLoggedIn.php", {id: 0},
			function(data){
				if(data == -1){
					window.location.href = "http://cise.ufl.edu/~jnassar/HCI-Project/";		//THIS NEEDS TO BE ACTUALLY TESTED
				}
			});
	}

  //Starts the discussion window at the bottom
  var objDiv = document.getElementById("discussion-window");
  objDiv.scrollTop = objDiv.scrollHeight;
});
$(window).load(function(){
	
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
				window.location.href = "http://cise.ufl.edu/~jnassar/HCI-Project/";
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

	

	var firstname = $("#first-name").val();
	var lastname = $("#last-name").val();
	var phonenumber = $("#phone-number").val();
	phonenumber = phonenumber.split('-').join('');
	var email = $("#email-address").val();
	var password1 = $("#password1").val();
	var password2 = $("#password2").val();
	var aboutme = $("#about-me").val();
	var groupid = $("#group-id").val();
	
	if(firstname == "" || lastname == ""){
		alert("You must provide your first and last name!");
		return false;
	}
	else if (reg.test(form.email.value) == false){
		alert('Invalid Email Address');
		return false;
	}
	else if(password1 == "" || password2 == ""){
		alert("You must enter your password twice!");
		return false;
	}
	else if(password1 != password2){
		alert("The passwords must match!");
		return false;
	}
	else if(phonenumber.length != 10){
		alert("Your phone number is the wrong number of digits!");
		return false;
	}
	else if(groupid == ""){
		alert("You must provide a group ID!");
		return false;
	}

	$.post("signup.php", { firstname: firstname, lastname: lastname, phonenumber:phonenumber,
			email: email, phonenumber: phonenumber, password1: password1, aboutme: aboutme, groupid: groupid },
		function(data) {
		if(data == 0){
			alert("User created!");
			window.location.href = "http://cise.ufl.edu/~jnassar/HCI-Project/";
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

function addGoal() {
	
	var title = $("#newTitle").val();
	var deadline = $("#newDeadline").val();
	var desc = $("#newGoal").val();
	
	$.post("addGoal.php", { title: title, deadline: deadline, desc: desc, userID: 0 },
		function(data) {
			document.getElementById("newTitle").value= "";
			document.getElementById("newDeadline").value= "";
			document.getElementById("newGoal").value= "";
			$('#myModalHorizontal').modal('hide');
			displayMessageModal("Goal Created", "You've just created a new goal. Good luck!");
			printGoals();
	});
	return true;
}

function printGoals() {
	$.post("printGoals.php", {userID: 0},
		function(data) {
			data = JSON.parse(data);
			var currentGoals = "";
			var completedGoals = "";
			var currentCount = 0;
			var completedCount = 0;
			for(var i = 0; i < data.length; i++){
				data[i][3] = data[i][3].substr(0, data[i][3].indexOf(' ')); 
				if(data[i][4] == 0){
					currentGoals += "<div class='panel panel-default'><div class='panel-heading' data-toggle='collapse' data-parent='#currentGoalsAccordion' data-target='#goal" + data[i][5] +"'>";
					currentGoals += "<h3 class='panel-title'><span class='glyphicon glyphicon-chevron-down'></span>&nbsp;" + data[i][1] + "</h3></div>";
					currentGoals += "<div id='goal" + data[i][5] + "' class='panel-collapse collapse'><h4>&nbsp;&nbsp;";
					currentGoals += "<button type='button' class='btn btn-info glyphicon glyphicon-ok' onClick='completeGoal("+data[i][5]+");' style='color:black;'></button>";
					currentGoals += "<button type='button' class='btn btn-danger glyphicon glyphicon-remove' onClick='deleteGoal("+data[i][5]+");' style='color:black;'></button>";
					currentGoals += "&nbsp;&nbsp;Deadline: " + data[i][3] + "</h4><div class='panel-body'>" + data[i][2] + "</div></div></div>";
					currentCount++;
				}
				else{
					completedGoals += "<div class='panel panel-default'><div class='panel-heading' data-toggle='collapse' data-parent='#currentGoalsAccordion' data-target='#goal" + data[i][5] +"'>";
					completedGoals += "<h3 class='panel-title'><span class='glyphicon glyphicon-chevron-down'></span>&nbsp;" + data[i][1] + "</h3></div>";
					completedGoals += "<div id='goal" + data[i][5] + "' class='panel-collapse collapse'><h4>&nbsp;&nbsp;";
					completedGoals += "&nbsp;&nbsp;Completed: " + data[i][3] + "</h4><div class='panel-body'>" + data[i][2] + "</div></div></div>";
					completedCount++;
				}
			}
			var percent = 0;
			if(completedCount+currentCount != 0){
				percent = Math.round((completedCount/(completedCount+currentCount))*100);
			}
			var progressBar = "<div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar'";
			progressBar += "aria-valuenow='" + percent + "' aria-valuemin='0' aria-valuemax='100' style='min-width: 2em; width: " + percent + "%;'>";
			progressBar += percent + "%</div>";
			
			document.getElementById("currentGoalsAccordion").innerHTML = currentGoals;
			document.getElementById("completedGoalsAccordion").innerHTML = completedGoals;
			document.getElementById("progress").innerHTML = progressBar;
	});
}

function completeGoal(goalID){
	$.post("completeGoal.php", { goalID: goalID },
		function(data) {
			printGoals();
			displayMessageModal("Completed", "Goal completed! Nice!");
	});
}

function deleteGoal(goalID){
	$.post("deleteGoal.php", { goalID: goalID },
		function(data) {
			printGoals();
			displayMessageModal("Deleted", "Goal deleted.");
	});
}

function displayMessageModal(title, body){
	document.getElementById("messageModalTitle").innerHTML = title;
	document.getElementById("messageModalBody").innerHTML = body;
	$('#messageModal').modal('show');
	setTimeout(function() {
		$('#messageModal').modal('hide');
	}, 2000);
}

function addTask() {
	
	var title = $("#newTitle").val();
	var deadline = $("#newDeadline").val();
	var desc = $("#newTask").val();
	
	$.post("addTask.php", { title: title, deadline: deadline, desc: desc, userID: 0 },
		function(data) {
			document.getElementById("newTitle").value= "";
			document.getElementById("newDeadline").value= "";
			document.getElementById("newTask").value= "";
			$('#myModalHorizontal').modal('hide');
			displayMessageModal("Task Created", "You've just created a new task. Good luck!");
			printTasks();
	});
	return true;
}

function printTasks() {
	var listOfNames;
	$.post("getNames.php", {userID: 0},
		function(data){
			data = JSON.parse(data);
			listOfNames = data;
			var names = "<h9>Jump to:</h9></br>";
			names += "<a class='group-menu' href='#panel"+listOfNames[0][0]+"'>"+data[0][1]+" "+data[0][2]+"</a></br>";
			for(var i = 1; i < data.length; i++){
				names += "<a class='group-menu' href='#panel"+listOfNames[i][0]+"'>"+data[i][1]+" "+data[i][2]+"</a></br>";
			}
			document.getElementById("names-nav").innerHTML = names;
			var currentID = "";
			var stringHTML = "";
			
			$.post("../isLoggedIn.php",{userID:0},
			function(userID){
				userID = parseInt(userID);
				$.post("printTasks.php", {userID: 0},
				function(data) {
					data = JSON.parse(data);
					console.log(userID);
					for(var j = 0; j < listOfNames.length; j++){
						currentID = listOfNames[j][0];
						stringHTML += "<div class='panel panel-default' style='background-color:#ffff99;padding-left:10px;padding-right:10px;>";
						stringHTML += "<div class='tab-pane fade in active'><div class='panel-title'><h9 id='panel"+currentID+"'>"+listOfNames[j][1]+" "+listOfNames[j][2]+"</h9></br><h1>Current Tasks</h1>";
						if(currentID == userID){
							stringHTML += "<button type='button' class='btn btn-success' style='color:black;font-weight:bold;font-size:150%;' data-toggle='modal' data-target='#myModalHorizontal'>+ Add Task</button></div>";
						}
						var currentTasks = "<div class='panel-group' id='currentAccordion"+currentID+"'>";
						var completedTasks = "</br></br></br><div class='panel-title'><h1>Completed Tasks</h1></div><div class='panel-group' id=completedAccordion"+currentID+"'>";
						var currentCount = 0;
						var completedCount = 0;
						for(var i = 0; i < data.length; i++){
							if(currentID == data[i][0]){
								data[i][3] = data[i][3].substr(0, data[i][3].indexOf(' '));
								
								if(data[i][4] == 0){		//Incomplete tasks
									currentTasks += "<div class='panel panel-default'><div class='panel-heading' data-toggle='collapse' data-parent='#currentAccordion' data-target='#task"+data[i][5]+"'>";
									currentTasks += "<h3 class='panel-title'><span class='glyphicon glyphicon-chevron-down'></span>&nbsp;"+data[i][1]+"</h3></div>";
									currentTasks += "<div id='task"+data[i][5]+"' class='panel-collapse collapse'><h4>&nbsp;&nbsp;";
									if(currentID == userID){
										currentTasks += "<button type='button' class='btn btn-info glyphicon glyphicon-ok' onClick='completeTask("+data[i][5]+");' style='color:black;'></button>";
										currentTasks += "<button type='button' class='btn btn-danger glyphicon glyphicon-remove' onClick='deleteTask("+data[i][5]+");' style='color:black;'></button>";
									}
									currentTasks += "&nbsp;&nbsp;Deadline: "+data[i][3]+"</h4>";
									currentTasks += "<div class='panel-body'>"+data[i][2]+"</div></div></div>";
									currentCount++;
								}
								else{		//Completed tasks
									completedTasks += "<div class='panel panel-default'>";
									completedTasks += "<div class='panel-heading' data-toggle='collapse' data-parent='#completedAccordion' data-target='#completed"+data[i][5]+"'>";
									completedTasks += "<h3 class='panel-title'><span class='glyphicon glyphicon-chevron-down'></span>&nbsp;"+data[i][1]+"</h3></div>";
									completedTasks += "<div id='completed"+data[i][5]+"' class='panel-collapse collapse'>";
									completedTasks += "<h4>&nbsp;&nbsp;Completed: "+data[i][3]+"</h4><div class='panel-body'>"+data[i][2]+"</div></div></div>";
									completedCount++;
								}
							}
						}
						
						var percent = 0;
						if(completedCount+currentCount != 0){
							percent = Math.round((completedCount/(completedCount+currentCount))*100);
						}
						currentTasks += "</div>";
						completedTasks += "</div>";
						stringHTML += "<div class='progress'>";
						stringHTML += "<div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow='"+percent+"' ";
						stringHTML += "aria-valuemin='0' aria-valuemax='100' style='min-width:2em; width: "+percent+"%;'>"+percent+"%</div></div></br>";
						stringHTML += currentTasks + completedTasks + "</div></div></div></br>";
					}
					document.getElementById("tab-content").innerHTML = stringHTML;
				});
			});
	});
}

function completeTask(taskID){
	$.post("completeTask.php", { taskID: taskID },
		function(data) {
			printTasks();
			displayMessageModal("Completed", "Task completed! Nice!");
	});
}

function deleteTask(taskID){
	$.post("deleteTask.php", { taskID: taskID },
		function(data) {
			printTasks();
			displayMessageModal("Deleted", "Task deleted.");
	});
}

function homePageLoad(){
	printGoals();
	printUsers();
}

function printUsers(){
	var userID = "";
	$.post("printUsers.php", {userID: 0},
		function(data){
			data = JSON.parse(data);
			var userString = "";
			for(var i = 0; i < data.length; i++){
				userString += "<div class='col-sm-6 col-md-4'><div class='thumbnail'>";
				userString += "<div class='caption'><h3>"+data[i][1]+" "+data[i][2]+"</h3>";
				userString += "<p>"+data[i][7]+"</p></div></div></div>";
			}
			document.getElementById("userContactCards").innerHTML = userString;
		});
}

function displayAccountInfo(){
	$.post("getAccountInfo.php", {bogus: 0},
		function(data){
			data = JSON.parse(data);
			var accountString = "<form class='form-inline'><div class='form-group'>";
			accountString += "<label for='first-name'>First Name </label>";
			accountString += "<input class='form-control' id='first-name' type='text' placeholder='"+data[1]+"'></div><div class='form-group'>&nbsp;&nbsp;&nbsp;";
			accountString += "<label for='last-name'>Last Name <label><input class='form-control' id='last-name' type='text' placeholder='"+data[2]+"'></div></form></br>";
			accountString += "<form role='form'><div class='form-group'><label for='email-address'>Email Address</label>";
			accountString += "<input class='form-control' id='email-address' type='text' placeholder='"+data[4]+"'></br><label for='phone-number'>Phone Number</label>";
			accountString += "<input class='form-control' id='phone-number' type='tel' placeholder='"+data[3]+"'></br><label for='about-me'>Bio</label>";
			accountString += "<textarea class='form-control' id='about-me' rows='3'>"+data[7]+"</textarea></br></div></form>";
			document.getElementById("account-info").innerHTML = accountString;
		});
}

function updateAccount(){
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	var firstname = $("#first-name").val();
	var lastname = $("#last-name").val();
	var phonenumber = $("#phone-number").val();
	phonenumber = phonenumber.split('-').join('');
	var email = $("#email-address").val();
	var aboutme = $("#about-me").val();
	
	if (reg.test(email) == false && email != ""){
		alert('Invalid Email Address');
		return false;
	}
	else if(phonenumber.length != 10 && phonenumber != ""){
		alert("Your phone number is the wrong number of digits!");
		return false;
	}
	$.post("getAccountInfo.php", {},
	function(account){
		account = JSON.parse(account);
		console.log(email + ", " + account[4]);
		console.log(phonenumber + ", " + account[3]);
		if(firstname.length == 0){
			firstname = account[1];
		}
		if(lastname.length == 0){
			lastname = account[2];
		}
		if(email.length == 0){
			email = account[4];
		}
		if(phonenumber.length == 0){
			phonenumber = account[3];
		}
		$.post("updateAccount.php", { firstname: firstname, lastname: lastname, email: email, phonenumber: phonenumber, aboutme: aboutme},
			function(data) {
			if(data == 0){
				alert("Account updated!");
			}
			else if(data == 1){
				alert("There is already an account associated with that email address!");
			}
			else if(data == 2){
				alert("There is already an account associated with that phone number!");
			}
		});
	});
	
   return true;
}

function logoutHomePage(){
	$.post("logout.php", {},
	function(data){
		
	});
}

function logout(){
	$.post("../logout.php", {},
	function(data){
		
	});
}
