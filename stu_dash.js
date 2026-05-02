window.onload = function () {
    let currentUser = localStorage.getItem("eduhub_currentUser");

    if (!currentUser) {
        window.location.href = "index.html";
    }
};


let cred_div = document.querySelector(".cred");
let assi_details = JSON.parse(localStorage.getItem("assignment_details"));
let logout_btn = document.querySelector(".logout");

logout_btn.addEventListener('click',()=>{
    document.location.href = "index.html";
    localStorage.setItem("eduhub_currentUser", "");
})

function assignments(){
    if (!assi_details){
        return;
    }

    let currentUser = localStorage.getItem("eduhub_currentUser");

    for (let obj of assi_details){
        
        let row = document.createElement("div");
        row.classList.add("row");

        let submission = obj.submissions?.find(s => s.studentName === currentUser);

        let status = submission ? submission.status : "Pending";
        let classname = status === "Submitted" ? "submitted" : "pending";

        row.innerHTML = `
            <div class="title" onclick="document.location.href = 'stu_submit.html'; localStorage.setItem('curr_assi_uid','${obj.uid}')">${obj.title_value}</div>
            <div>${obj.teacher}</div>
            <div>${obj.date_value}</div>
            <div class="${classname}">${status}</div>
            <div><button onclick="openDetail('${obj.uid}')">View</button></div>
            <div>-</div>
        `;

        cred_div.appendChild(row);
    }
}
assignments();

function openDetail(uid){

    let currentUser = localStorage.getItem("eduhub_currentUser");

    let wanted_assign = assi_details.find(work => work.uid == uid);

    let submission = wanted_assign.submissions?.find(s => s.studentName === currentUser);

    if (!submission){
        alert("Sorry! You have not submitted this assignment.");
        return;
    }

    window.open(submission.link, "_blank");
}
