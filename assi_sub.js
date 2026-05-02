window.onload = function () {
    let currentUser = localStorage.getItem("eduhub_currentUser");

    if (!currentUser) {
        window.location.href = "index.html";
    }
};

let tbody = document.querySelector("#submissionTable");
let assignment = JSON.parse(localStorage.getItem("assignment_details")) || [];
let user = localStorage.getItem("eduhub_currentUser");

document.querySelector("#teacherName").textContent = "Welcome, " + user;

function load_data(){

    tbody.innerHTML = "";

    for (let obj of assignment){

        if (obj.teacher !== user) continue;

        if (!obj.submissions) continue;

        for (let sub of obj.submissions){

            let tr = document.createElement("tr");

            let statusClass = sub.marks ? "submitted" : "pending";
            let statusText = sub.marks ? "Reviewed" : "Pending";

            tr.innerHTML = `
                <td>${sub.studentName}</td>
                <td>${obj.title_value}</td>
                <td><a href="${sub.link}" target="_blank">Open</a></td>
                <td class="${statusClass}">${statusText}</td>
                <td>${sub.marks ? sub.marks : "-"}</td>
                <td>
                    <button onclick="giveMarks('${obj.uid}','${sub.studentName}')">
                        Review
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        }
    }
}

load_data();


function giveMarks(uid, student){

    let marks = prompt("Enter marks:");
    console.log(marks);

    if (!marks) return;

    for (let obj of assignment){

        if (obj.uid === uid){

            for (let sub of obj.submissions){

                if (sub.studentName === student){
                    console.log(marks);
                    sub.marks = marks;
                }
            }
        }
    }

    localStorage.setItem("assignment_details", JSON.stringify(assignment));

    load_data();
}


function goDash(){
    document.location.href = "teach_dash.html";
}

function goAssign(){
    document.location.href = "assignment.html";
}
