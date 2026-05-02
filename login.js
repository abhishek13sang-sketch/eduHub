let username = document.querySelector(".inp_user");
let password = document.querySelector(".inp_pass");
let signup = document.querySelector(".sign_up");
let register = document.querySelector(".register");

let credentials = JSON.parse(localStorage.getItem("eduhub_credentials"));

register.addEventListener("click",()=>{
    document.location.href = "register.html";
})


function validation(){
    if (!credentials){
        alert("You will have to register first!");
        document.location.href = "register.html";
        return;
    }

    let found = false;

    for (let obj of credentials){
        if (obj.user === username.value && obj.password === password.value){
            found = true;

            alert("Successful login!");

            localStorage.setItem("eduhub_currentUser", username.value);

            if (obj.roles === "student"){
                document.location.href = "stu_dash.html";
            }
            else if (obj.roles === "teacher"){
                document.location.href = "teach_dash.html";
            }
            break;
        }
    }

    if (!found){
        alert("Invalid username or password!");
    }
}

signup.addEventListener("click",()=>{
    validation();
})