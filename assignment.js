window.onload = function () {
    let currentUser = localStorage.getItem("eduhub_currentUser");

    if (!currentUser) {
        window.location.href = "index.html";
    }
};

let title = document.querySelector(".inp_title");
let date = document.querySelector(".inp_date");
let publish = document.querySelector("button");
let descrip = document.querySelector("#descrip");
let dashboard = document.querySelector(".dash");
let logout_btn = document.querySelector(".logout");


dashboard.addEventListener('click',()=>{
    document.location.href = "teach_dash.html";
})

logout_btn.addEventListener('click',()=>{
    document.location.href = "index.html";
    localStorage.setItem("eduhub_currentUser","");
})

function save_assign() {
    let storage = localStorage.getItem("assignment_details");
    let teacher = localStorage.getItem("eduhub_currentUser");

    let title_value = title.value;
    let date_value = date.value;
    let desciption = descrip.value;
    let uid = crypto.randomUUID();
    // console.log(teacher);
    if (!title_value){
        alert("Title can't be empty!");
        return;
    }
    else if (!desciption){
        alert("Provide a description for the assignment!");
        return;
    }
    if (!date_value){
        alert("Please select the deadline for the assignment!");
        return;
    }
    let assignment = storage ? JSON.parse(storage) : [];
    
    // let status = "Pending";

    let obj = {uid, title_value, date_value, desciption, teacher};
    if (!assignment.submissions){
        assignment.submissions = [];
    }


    assignment.push(obj);

    localStorage.setItem("assignment_details",JSON.stringify(assignment));
    
    title.value = "";
    date.value = "";
    descrip.value = "";
}
// console.log(localStorage.getItem("eduhub_currentUser"));
publish.addEventListener("click",()=>{
    save_assign();
})
