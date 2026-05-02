window.onload = function () {
    let currentUser = localStorage.getItem("eduhub_currentUser");

    if (!currentUser) {
        window.location.href = "landing.html";
    }
};

let totalAssignments = document.querySelector("#totalAssignments");
let tbody = document.querySelector("#assignmentTable");
let create_assign = document.querySelector("#createBtn");
let assignment = JSON.parse(localStorage.getItem("assignment_details"));
let total_sub = document.querySelector("#totalSubmissions");
let pending_review = document.querySelector("#pendingReviews");
let user = localStorage.getItem("eduhub_currentUser");
let sub_btn = document.querySelector(".sub_missions");
let assi = document.querySelector(".assign");
let logout_btn = document.querySelector(".Logout");

logout_btn.addEventListener('click',()=>{
    document.location.href = "landing.html";
    localStorage.setItem("eduhub_currentUser","");
})

assi.addEventListener("click",()=>{
    document.location.href = "assignment.html";
})


sub_btn.addEventListener("click",()=>{
    document.location.href = "assi_sub.html";
})

let sub_count = 0;
let review_sub = 0;
let assignment_count = 0;

    
    function create_details(){
        if (!assignment){
            return;
        }
        for (let obj of assignment){
            if (obj.teacher === `${user}`){
                assignment_count++;

                // console.log(obj.submissions[0].status);
                // console.log(obj.submissions[0].marks);

                for (let i = 0; i<obj.submissions.length; i++)
                {
                    if (obj.submissions[i].status === "Submitted"){
                    sub_count++;
                }
                if (obj.submissions[i].marks){
                    review_sub++;
                }
            }
                let tr = document.createElement("tr");
                let td_title = document.createElement("td");
                td_title.id = "open";
                let td_deadline = document.createElement("td");
                let td_status = document.createElement("td");
                td_title.textContent = obj.title_value;
                td_deadline.textContent = obj.date_value;
                
                // td_title.addEventListener("click",()=>{
                //     localStorage.setItem("curr_assi_uid",`${obj.uid}`);
                //     document.location.href = "review_sub.html";
                // })
                
                let today = new Date();
                let deadline = new Date(obj.date_value);
                if (deadline >= today){
                    td_status.innerHTML = "<button class='active' type='button'>Active</button>";
                }
                else {
                    td_status.innerHTML = "<button class='pending' type='button'>Expired</button>";
                }
                
                tr.appendChild(td_title);
                tr.appendChild(td_deadline);
                tr.appendChild(td_status);
                tbody.appendChild(tr);
            }
            else {
                continue;
            }
        }
    }
    create_details();
    
total_sub.textContent = sub_count;
totalAssignments.textContent = assignment_count;
pending_review.textContent = sub_count - review_sub;

create_assign.addEventListener("click",()=>{
    document.location.href = "assignment.html";
})
