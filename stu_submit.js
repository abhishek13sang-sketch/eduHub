window.onload = function () {
    let currentUser = localStorage.getItem("eduhub_currentUser");

    if (!currentUser) {
        window.location.href = "index.html";
    }
};

let assi_details = JSON.parse(localStorage.getItem("assignment_details"));
let current_uid = localStorage.getItem("curr_assi_uid");
let title = document.querySelector("#title");
let descrip = document.querySelector("#description");
let teach = document.querySelector("#teacher");
let date = document.querySelector("#deadline");
let submit = document.querySelector("#submitBtn");
let link = document.querySelector("#fileLink");
let back = document.querySelector("#backBtn");
let student = localStorage.getItem("eduhub_currentUser");

back.addEventListener("click", ()=>{
    document.location.href = "stu_dash.html";
})
let assignment = assi_details.find((obj)=>{
    return obj.uid === current_uid;
})

function renderDetails(){
    // console.log(assignment);
    title.textContent = assignment.title_value;
    descrip.textContent = assignment.desciption;
    teach.textContent = assignment.teacher;
    date.textContent = assignment.date_value;
}
renderDetails();

submit.addEventListener("click",()=>{
    if (!assignment.submissions){
        assignment.submissions = [];
    }
    assignment.submissions.push({
        studentName : student,
        link : `${link.value}`,
        status : "Submitted",
        marks : null,
    })
    localStorage.setItem("assignment_details",JSON.stringify(assi_details))
    link.value = "";
})
