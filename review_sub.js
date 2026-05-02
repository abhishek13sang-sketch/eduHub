window.onload = function () {
    let currentUser = localStorage.getItem("eduhub_currentUser");

    if (!currentUser) {
        window.location.href = "index.html";
    }
};

let assi_details = JSON.parse(localStorage.getItem("assignment_details")) || [];
let current_id = localStorage.getItem("curr_assi_uid");

let teacher_name = document.querySelector(".name");
let date = document.querySelector(".date");
let view = document.querySelector(".view button");
let review = document.querySelector(".publish button");
let marks = document.querySelector("input");
let back = document.querySelector(".nav");

let current_assign = assi_details.find(item => item.uid === current_id);

if (!current_assign){
    alert("Assignment not found");
}

teacher_name.textContent = current_assign?.teacher || "";
date.textContent = current_assign?.date_value || "";

view.addEventListener("click", () => {
    if (!current_assign.link){
        alert("No submission yet");
        return;
    }
    window.open(current_assign.link, "_blank");
});

function review_submit(){
    if (!marks.value.trim()){
        alert("Enter the marks.");
        return;
    }

    current_assign.marks = marks.value;

    localStorage.setItem("assignment_details", JSON.stringify(assi_details));

    alert("Marks submitted");
}

review.addEventListener("click", review_submit);

back.addEventListener("click", () => {
    document.location.href = "teach_dash.html";
});
