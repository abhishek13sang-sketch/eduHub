let username = document.querySelector(".inp_user");
let email = document.querySelector(".inp_mail");
let pass = document.querySelector(".inp_pass");
let confirm = document.querySelector(".inp_confirm");
let login = document.querySelector(".login");
let signup = document.querySelector(".sign_up");
let user_error = document.querySelector(".user_error");
let email_error = document.querySelector(".email_error");
let pass_error = document.querySelector(".pass_error");
let confirm_error = document.querySelector(".confirm_error");
// let role_error = document.querySelector(".role_error");
let role = document.querySelector("select");

login.addEventListener("click", ()=>{
    document.location.href = "login.html";
})

let pattern = /^\w+@[a-zA-Z_+-]+\.[a-zA-Z]{2,3}$/;

function formValidation(){
    if (username.value.length < 4 || username.value.length > 15){
        user_error.style.visibility = "visible";
        user_error.style.color = "red";
        return 0;
    }
    else if (!(email.value.match(pattern))){
        user_error.style.visibility = "hidden";
        email_error.style.visibility = "visible";
        email_error.style.color = "red";
        return 0;
    }
    else if (pass.value.length < 4 || pass.value.length > 15){
        email_error.style.visibility = "hidden";
        pass_error.style.visibility = "visible";
        pass_error.style.color = "red";
        return 0;
    }
    else if (pass.value !== confirm.value){
        pass_error.style.visibility = "hidden";
        confirm_error.style.visibility = "visible";
        confirm_error.style.color = "red";
        return 0;
    }
    else if (role.value !== "teacher" && role.value !== "student") {
        confirm_error.style.visibility = "hidden";
        // role_error.style.visibility = "visible";
        // role_error.style.color = "red";
        alert("Please select a role.");
        return 0;

    }
    else {
        let storage = localStorage.getItem("eduhub_credentials");
        let credentials = storage ? JSON.parse(storage) : [];
        let user = username.value;
        let password = pass.value;
        let roles = role.value;
        let details = {user,password,roles};
        credentials.push(details);
        //
        
        localStorage.setItem("eduhub_currentUser",username.value);
        //
        
        localStorage.setItem("eduhub_credentials",JSON.stringify(credentials));
        return 1;
    }
}

signup.addEventListener("click",()=>{
    let isValid = formValidation();
    if ( isValid && role.value === "student"){
        alert("Successfully registered!");
        document.location.href = "stu_dash.html";
    }
    else if (isValid && role.value === "teacher"){
        alert("Successfully registered!");
        document.location.href = "teach_dash.html";
    }
})