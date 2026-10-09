/* =====================================================
COLLEGE PORTAL - MODULE 4 RECONSTRUCTED
Frontend authentication, roles, LocalStorage and pages
===================================================== */

const USERS = [
    { username:"admin", password:"admin123", name:"Administrator", role:"Admin" },
    { username:"faculty", password:"faculty123", name:"Faculty User", role:"Faculty" },
    { username:"student", password:"student123", name:"Shafiq Ahmad", role:"Student", studentId:"CS-2023-001" }
];

const pageInfo = {
    dashboard:["Dashboard","Welcome back to your college portal."],
    students:["Students","Manage registered students."],
    faculty:["Faculty","College teaching staff."],
    courses:["Courses","Available academic courses."],
    attendance:["Attendance","Track your subject-wise attendance."],
    timetable:["Timetable","Your weekly class schedule."],
    assignments:["Assignments","Coursework, submission status, and due dates."],
    results:["Results","Your academic performance."],
    fees:["Fees","Manage your fee information."],
    notices:["Notices","College announcements and updates."],
    profile:["My Profile","Manage your personal information."],
    settings:["Settings","Customize your portal."]
};

const permissions = {
    Admin:["dashboard","students","faculty","courses","attendance","timetable","assignments","results","fees","notices","profile","settings"],
    Faculty:["dashboard","students","faculty","courses","attendance","timetable","assignments","results","notices","profile","settings"],
    Student:["dashboard","courses","attendance","timetable","assignments","results","fees","notices","profile","settings"]
};

const defaultData = {
    students:[
        {name:"Shafiq Ahmad",id:"CS-2023-001",department:"Computer Science",semester:"6th",cgpa:3.62,status:"Active"},
        {name:"Ali Khan",id:"CS-2023-002",department:"Computer Science",semester:"6th",cgpa:3.45,status:"Active"},
        {name:"Sara Ahmed",id:"SE-2023-003",department:"Software Engineering",semester:"5th",cgpa:3.78,status:"Active"},
        {name:"Hamza Malik",id:"IT-2024-004",department:"Information Technology",semester:"4th",cgpa:3.21,status:"Active"},
        {name:"Ayesha Khan",id:"CS-2024-005",department:"Computer Science",semester:"4th",cgpa:3.88,status:"Active"}
    ],
    notices:[
        {title:"Mid-Term Examination Schedule",description:"The mid-term examination schedule has been published.",date:"18 Sep 2026"},
        {title:"Semester Fee Deadline",description:"Students are requested to submit their semester fee before the deadline.",date:"15 Sep 2026"},
        {title:"Programming Competition",description:"Registration is now open for the annual programming competition.",date:"12 Sep 2026"}
    ]
};

const faculty = [
    {name:"Dr. Ahmed Khan",department:"Computer Science",role:"Professor",email:"ahmed.khan@college.edu",phone:"+92 300 1112233"},
    {name:"Prof. Sara Ali",department:"Software Engineering",role:"Associate Professor",email:"sara.ali@college.edu",phone:"+92 300 4455667"},
    {name:"Dr. Hamza Shah",department:"Information Technology",role:"Assistant Professor",email:"hamza.shah@college.edu",phone:"+92 300 7788990"},
    {name:"Prof. Ayesha Malik",department:"Computer Science",role:"Lecturer",email:"ayesha.malik@college.edu",phone:"+92 300 9977665"},
    {name:"Dr. Usman Ahmad",department:"Mathematics",role:"Professor",email:"usman.ahmad@college.edu",phone:"+92 300 5544332"},
    {name:"Prof. Fatima Noor",department:"English",role:"Lecturer",email:"fatima.noor@college.edu",phone:"+92 300 8811224"}
];

let courses = [
    {id:"CRS-0601",code:"CS-601",name:"Artificial Intelligence",teacher:"Dr. Ahmed Khan",credits:3,department:"Computer Science",semester:"6th",status:"Active"},
    {id:"CRS-0602",code:"CS-602",name:"Web Engineering",teacher:"Prof. Sara Ali",credits:3,department:"Computer Science",semester:"6th",status:"Active"},
    {id:"CRS-0603",code:"CS-603",name:"Information Security",teacher:"Dr. Hamza Shah",credits:3,department:"Computer Science",semester:"6th",status:"Active"},
    {id:"CRS-0604",code:"CS-604",name:"Software Project Management",teacher:"Prof. Ayesha Malik",credits:3,department:"Computer Science",semester:"6th",status:"Active"},
    {id:"CRS-0605",code:"CS-605",name:"Technical Writing",teacher:"Prof. Fatima Noor",credits:2,department:"Computer Science",semester:"6th",status:"Active"},
    {id:"CRS-0606",code:"CS-606",name:"Data Mining",teacher:"Dr. Usman Ahmad",credits:3,department:"Computer Science",semester:"6th",status:"Active"}
];

const attendance = [
    {studentId:"CS-2023-001",courseId:"CRS-0601",totalClasses:50,presentClasses:46},
    {studentId:"CS-2023-001",courseId:"CRS-0602",totalClasses:50,presentClasses:44},
    {studentId:"CS-2023-001",courseId:"CRS-0603",totalClasses:50,presentClasses:41},
    {studentId:"CS-2023-001",courseId:"CRS-0604",totalClasses:50,presentClasses:39},
    {studentId:"CS-2023-001",courseId:"CRS-0605",totalClasses:50,presentClasses:45},
    {studentId:"CS-2023-001",courseId:"CRS-0606",totalClasses:50,presentClasses:42}
];
let attendanceSelectedStudentId=null;
let feesSelectedStudentId=null;

const assignments = [
    {id:"ASG-001",courseId:"CRS-0601",title:"AI Classification Model",description:"Build and evaluate a classification model using the techniques covered in class.",issueDate:"2026-09-28",dueDate:"2026-10-08",marks:20},
    {id:"ASG-002",courseId:"CRS-0603",title:"Website Security Report",description:"Analyze common website vulnerabilities and recommend practical mitigations.",issueDate:"2026-09-25",dueDate:"2026-10-10",marks:15},
    {id:"ASG-003",courseId:"CRS-0604",title:"Project Documentation",description:"Submit the initial project scope, schedule, and risk assessment.",issueDate:"2026-09-15",dueDate:"2026-10-05",marks:10},
    {id:"ASG-004",courseId:"CRS-0606",title:"Data Mining Analysis",description:"Prepare a short analysis of the selected dataset and the mining methods applied.",issueDate:"2026-09-20",dueDate:"2026-10-02",marks:10}
];
const defaultAssignmentSubmissions=[
    {assignmentId:"ASG-003",studentId:"CS-2023-001",status:"Submitted",submittedAt:"2026-10-04T14:30:00"}
];

const results = [
    {course:"Artificial Intelligence",credits:3,marks:88,grade:"A",point:4},
    {course:"Web Engineering",credits:3,marks:84,grade:"A-",point:3.7},
    {course:"Information Security",credits:3,marks:81,grade:"A-",point:3.7},
    {course:"Software Project Management",credits:3,marks:90,grade:"A",point:4},
    {course:"Technical Writing",credits:2,marks:78,grade:"B+",point:3.3},
    {course:"Data Mining",credits:3,marks:83,grade:"A-",point:3.7}
];

const defaultFeeRecords = [
    {
        studentId:"CS-2023-001",
        totalAmount:45000,
        payments:[
            {date:"2026-08-05",description:"Semester fee installment",amount:15000},
            {date:"2026-09-05",description:"Semester fee installment",amount:20000}
        ]
    },
    {studentId:"CS-2023-002",totalAmount:45000,payments:[]},
    {studentId:"SE-2023-003",totalAmount:45000,payments:[]},
    {studentId:"IT-2024-004",totalAmount:45000,payments:[]},
    {studentId:"CS-2024-005",totalAmount:45000,payments:[]}
];

const timetable = {
    Monday:[["Artificial Intelligence","09:00 - 10:00"],["Web Engineering","11:00 - 12:00"],["Information Security","02:00 - 03:00"]],
    Tuesday:[["Data Mining","09:00 - 10:00"],["Technical Writing","11:00 - 12:00"]],
    Wednesday:[["Web Engineering","09:00 - 10:00"],["Artificial Intelligence","01:00 - 02:00"]],
    Thursday:[["Information Security","10:00 - 11:00"],["Data Mining","02:00 - 03:00"]],
    Friday:[["Project Management","09:00 - 10:00"],["Technical Writing","11:00 - 12:00"]]
};

function getData(key){
    const saved = localStorage.getItem("collegePortal_" + key);
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(defaultData[key]));
}

function saveData(key,value){
    localStorage.setItem("collegePortal_" + key,JSON.stringify(value));
}

function getCurrentUser(){
    const saved = localStorage.getItem("collegePortalCurrentUser");
    return saved ? JSON.parse(saved) : null;
}

function initials(name){
    return name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();
}

function escapeHTML(value){
    return String(value).replace(/[&<>"']/g,character=>({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#39;"
    })[character]);
}

function parseDate(value){
    if(/^\d{4}-\d{2}-\d{2}$/.test(value)){
        const [year,month,day]=value.split("-").map(Number);
        return new Date(year,month-1,day);
    }
    const date=new Date(value);
    return Number.isNaN(date.getTime())?null:date;
}

function dateKey(date){
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}

function formatDate(value){
    const date=parseDate(value);
    return date?new Intl.DateTimeFormat("en",{month:"short",day:"numeric",year:"numeric"}).format(date):value;
}

function getAssignments(){
    const saved=localStorage.getItem("collegePortal_assignments");
    return saved===null?JSON.parse(JSON.stringify(assignments)):JSON.parse(saved);
}

function getAssignmentSubmissions(){
    const saved=localStorage.getItem("collegePortal_assignmentSubmissions");
    return saved===null?JSON.parse(JSON.stringify(defaultAssignmentSubmissions)):JSON.parse(saved);
}

function getAssignmentStatus(assignment,studentId=null){
    if(studentId&&getAssignmentSubmissions().some(item=>
        item.assignmentId===assignment.id&&item.studentId===studentId&&item.status==="Submitted"
    )) return "Submitted";
    const dueDate=parseDate(assignment.dueDate);
    return dueDate&&dateKey(dueDate)<dateKey(new Date())?"Overdue":"Pending";
}

function showToast(message){
    const container=document.getElementById("toastContainer");
    if(!container) return;
    const toast=document.createElement("div");
    toast.className="toast";
    toast.textContent=message;
    container.appendChild(toast);
    setTimeout(()=>toast.remove(),2500);
}

function applyTheme(){
    const theme=localStorage.getItem("collegePortalTheme") || "light";
    document.body.classList.toggle("dark",theme==="dark");
    const btn=document.getElementById("themeBtn");
    if(btn) btn.textContent=theme==="dark"?"☾":"☀";
}

async function loginWithBackend(username,password){
    try{
        const response=await fetch("api/index.php?resource=auth",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        });

        if(!response.ok) return null;
        const payload=await response.json();
        if(!payload?.user) return null;

        const user={
            username:payload.user.username,
            password:password,
            name:payload.user.name,
            role:payload.user.role,
            studentId:payload.user.student_id || null
        };

        return user;
    }catch(error){
        return null;
    }
}

function setupLogin(){
    const form=document.getElementById("loginForm");
    if(!form) return;

    if(getCurrentUser()){
        window.location.href="portal.html";
        return;
    }

    form.addEventListener("submit",async e=>{
        e.preventDefault();
        const username=document.getElementById("loginUsername").value.trim();
        const password=document.getElementById("loginPassword").value;
        const error=document.getElementById("loginError");

        let user = await loginWithBackend(username,password);
        if(!user){
            user=USERS.find(u=>u.username===username && u.password===password);
        }

        if(!user){
            error.textContent="Invalid username or password.";
            return;
        }

        localStorage.setItem("collegePortalCurrentUser",JSON.stringify(user));
        window.location.href="portal.html";
    });
}

function setupPortal(){
    const content=document.getElementById("pageContent");
    if(!content) return;

    const user=getCurrentUser();
    if(!user){
        window.location.href="index.html";
        return;
    }

    setupUserHeader(user);
    applyTheme();
    setupGlobalEvents(user);
    applyRoleAccess(user);

    loadPage("dashboard");
}

function setupUserHeader(user){
    const avatar=document.getElementById("topAvatar");
    const name=document.getElementById("topUserName");
    const role=document.getElementById("topUserRole");

    if(avatar) avatar.textContent=initials(user.name);
    if(name) name.textContent=user.name;
    if(role) role.textContent=user.role;
}

function applyRoleAccess(user){
    const allowed=permissions[user.role] || permissions.Student;
    document.querySelectorAll(".nav-item").forEach(item=>{
        const allowedPage=allowed.includes(item.dataset.section);
        item.style.display=allowedPage?"flex":"none";
    });
}

function setupGlobalEvents(user){
    document.querySelectorAll(".nav-item").forEach(item=>{
        item.addEventListener("click",()=>{
            loadPage(item.dataset.section);
            document.getElementById("sidebar")?.classList.remove("open");
        });
    });

    document.getElementById("menuBtn")?.addEventListener("click",()=>{
        document.getElementById("sidebar")?.classList.toggle("open");
    });

    document.getElementById("themeBtn")?.addEventListener("click",toggleTheme);

    document.getElementById("logoutBtn")?.addEventListener("click",async()=>{
        try{
            const response=await fetch("api/index.php?resource=logout",{method:"POST"});
            if(!response.ok) throw new Error("Server sign-out failed.");
        }catch(error){
            console.error("Server sign-out failed:",error);
        }
        localStorage.removeItem("collegePortalCurrentUser");
        window.location.href="index.html";
    });
}

function toggleTheme(){
    const dark=!document.body.classList.contains("dark");
    localStorage.setItem("collegePortalTheme",dark?"dark":"light");
    applyTheme();
}

async function loadPage(pageName){
    const allowed=(permissions[getCurrentUser()?.role] || []).includes(pageName);
    if(!allowed) return;

    const content=document.getElementById("pageContent");
    if(!content) return;

    try{
        const response=await fetch("pages/"+pageName+".html");
        if(!response.ok) throw new Error("Page not found");
        content.innerHTML=await response.text();

        const info=pageInfo[pageName];
        if(info){
            document.getElementById("pageTitle").textContent=info[0];
            document.getElementById("pageSubtitle").textContent=info[1];
        }

        document.querySelectorAll(".nav-item").forEach(item=>{
            item.classList.toggle("active",item.dataset.section===pageName);
        });

        initializePage(pageName);
    }catch(error){
        console.error(error);
        content.innerHTML='<div class="card"><h3>Unable to load page</h3><p>Please make sure you are running the project through XAMPP/localhost.</p></div>';
    }
}

function initializePage(page){
    const user=getCurrentUser();

    if(page==="dashboard") renderDashboard(user);
    if(page==="students") renderStudents();
    if(page==="faculty") renderFaculty();
    if(page==="courses") renderCourses();
    if(page==="attendance") renderAttendance();
    if(page==="timetable") renderTimetable();
    if(page==="assignments") renderAssignments();
    if(page==="results") renderResults();
    if(page==="fees") renderFees();
    if(page==="notices") renderNotices();
    if(page==="profile") renderProfile(user);
    if(page==="settings") renderSettings();

    document.querySelectorAll("[data-section-link]").forEach(btn=>{
        btn.addEventListener("click",()=>loadPage(btn.dataset.sectionLink));
    });

    document.querySelectorAll("[data-close-modal]").forEach(btn=>{
        btn.addEventListener("click",()=>closeModal(btn.dataset.closeModal));
    });
}

function renderDashboard(user){
    const students=getData("students");
    const student=students.find(item=>item.id===user.studentId)||students.find(item=>item.name===user.name);
    const dashboardAttendanceRecords=getSavedAttendance().filter(record=>
        user.role==="Student"?record.studentId===student?.id:true
    );
    const dashboardAttendanceTotals=dashboardAttendanceRecords.reduce((total,record)=>({
        classes:total.classes+record.totalClasses,
        present:total.present+record.presentClasses
    }),{classes:0,present:0});
    const attendanceAverage=dashboardAttendanceTotals.classes
        ?Math.round(dashboardAttendanceTotals.present/dashboardAttendanceTotals.classes*100)
        :0;
    const dashboardAssignments=getAssignments().filter(item=>
        user.role!=="Student"||courses.some(course=>
            course.id===item.courseId&&student&&course.department===student.department&&course.semester===student.semester
        )
    );
    const openAssignments=dashboardAssignments.filter(item=>
        getAssignmentStatus(item,user.role==="Student"?student?.id:null)!=="Submitted"
    );
    const studentCourses=student?courses.filter(item=>item.semester===student.semester):courses;
    const stat=(number,label,value,note)=>{
        document.getElementById(`dashboardStat${number}Label`).textContent=label;
        document.getElementById(`dashboardStat${number}`).textContent=value;
        document.getElementById(`dashboardStat${number}Note`).textContent=note;
    };

    document.getElementById("dashboardUserName").textContent=user.name.split(" ")[0];
    document.getElementById("dashboardIntro").textContent=user.role==="Student"
        ?"Here is your academic overview and the latest campus updates."
        :`Here is the latest ${user.role.toLowerCase()} portal overview.`;

    if(user.role==="Student"){
        stat(1,"Total Courses",studentCourses.length,"Enrolled this semester");
        stat(2,"Attendance",`${attendanceAverage}%`,"Across your courses");
        stat(3,"Current CGPA",student?Number(student.cgpa).toFixed(2):"—","Out of 4.00");
        stat(4,"Pending Assignments",openAssignments.length,"Awaiting submission");
        document.getElementById("dashboardStudentSummary").hidden=false;
        document.getElementById("dashboardStudentId").textContent=student?.id||"—";
        document.getElementById("dashboardDepartment").textContent=student?.department||"—";
        document.getElementById("dashboardSemester").textContent=student?.semester||"—";
        document.getElementById("dashboardCourseCount").textContent=studentCourses.length;
    }else if(user.role==="Faculty"){
        stat(1,"Assigned Courses",courses.length,"Current semester");
        stat(2,"Students",students.length,"Registered students");
        stat(3,"Average Attendance",`${attendanceAverage}%`,"Across current courses");
        stat(4,"Open Assignments",openAssignments.length,"Pending or overdue");
        document.getElementById("dashboardStudentSummary").hidden=true;
    }else{
        stat(1,"Total Students",students.length,"Registered students");
        stat(2,"Faculty Members",faculty.length,"Teaching staff");
        stat(3,"Courses",courses.length,"Current semester");
        stat(4,"Open Assignments",openAssignments.length,"Pending or overdue");
        document.getElementById("dashboardStudentSummary").hidden=true;
    }

    const quickActions=document.getElementById("dashboardQuickActions");
    const actionOptions=user.role==="Student"
        ?[["courses","View courses"],["attendance","Check attendance"],["assignments","View assignments"],["results","Check results"],["fees","View fees"]]
        :[["students","Manage students"],["courses","View courses"],["attendance","Manage attendance"],["notices","View notices"]];
    const allowedPages=permissions[user.role]||[];
    quickActions.innerHTML=actionOptions.filter(([page])=>allowedPages.includes(page)).map(([page,label])=>
        `<button class="quick-action" data-section-link="${page}">${label}<span aria-hidden="true">→</span></button>`
    ).join("");

    const classes=document.getElementById("todayClasses");
    if(classes){
        const today=new Intl.DateTimeFormat("en",{weekday:"long"}).format(new Date());
        const todaysClasses=timetable[today]||[];
        classes.innerHTML=todaysClasses.length?todaysClasses.map(x=>`
            <div class="class-item">
                <div class="class-time">${x[1]}</div>
                <div><strong>${x[0]}</strong><span>Current semester</span></div>
            </div>`).join(""):'<p class="dashboard-empty">No classes scheduled for today.</p>';
        document.getElementById("classScheduleDate").textContent=new Intl.DateTimeFormat("en",{weekday:"long",month:"short",day:"numeric"}).format(new Date());
    }

    const deadlines=document.getElementById("dashboardDeadlines");
    if(deadlines){
        const upcoming=openAssignments.slice().sort((a,b)=>(parseDate(a.dueDate)?.getTime()||0)-(parseDate(b.dueDate)?.getTime()||0)).slice(0,4);
        deadlines.innerHTML=upcoming.length?upcoming.map(item=>{
            const status=getAssignmentStatus(item,user.role==="Student"?student?.id:null);
            const course=courses.find(entry=>entry.id===item.courseId);
            return `<div class="dashboard-list-item">
                <div><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(course?.name||"Course")} · Due ${formatDate(item.dueDate)}</span></div>
                <span class="badge ${status==="Overdue"?"danger":"warning"}">${status}</span>
            </div>`;
        }).join(""):'<p class="dashboard-empty">You have no outstanding assignments.</p>';
    }

    const attendanceOverview=document.getElementById("dashboardAttendance");
    if(attendanceOverview){
        const overviewCourses=user.role==="Student"
            ?courses.filter(course=>student&&course.department===student.department&&course.semester===student.semester)
            :courses;
        attendanceOverview.innerHTML=overviewCourses.map(course=>{
            const courseRecords=dashboardAttendanceRecords.filter(record=>record.courseId===course.id);
            const courseTotals=courseRecords.reduce((total,record)=>({
                classes:total.classes+record.totalClasses,
                present:total.present+record.presentClasses
            }),{classes:0,present:0});
            const percentage=courseTotals.classes?Math.round(courseTotals.present/courseTotals.classes*100):0;
            const status=courseTotals.classes?(percentage<75?"Warning":"Good"):"No records";
            return `
            <div class="dashboard-attendance-item">
                <div><strong>${escapeHTML(course.name)}</strong><span class="badge ${status==="Good"?"success":status==="Warning"?"warning":"attendance-none"}">${status}</span></div>
                <div class="dashboard-progress" role="progressbar" aria-label="${escapeHTML(course.name)} attendance" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}"><span class="${percentage<75?"attendance-bar-warning":""}" style="width:${percentage}%"></span></div>
                <small>${courseTotals.classes?`${percentage}% attendance`:"No attendance records"}</small>
            </div>`;
        }).join("");
    }

    const notices=document.getElementById("recentNotices");
    if(notices){
        const recentNotices=getData("notices").slice(0,3);
        notices.innerHTML=recentNotices.length?recentNotices.map(n=>`
            <div class="dashboard-list-item notice-preview">
                <div><strong>${n.title}</strong><span>${n.description}</span><small>${n.date}</small></div>
            </div>`).join(""):'<p class="dashboard-empty">There are no current notices.</p>';
    }
}

async function renderStudents(){
    let students=getData("students");
    const body=document.getElementById("studentsTableBody");
    if(!body) return;

    const search=document.getElementById("studentSearch");
    const filter=document.getElementById("departmentFilter");
    let usingBackend=false;

    try{
        const response=await fetch("api/index.php?resource=students");
        const payload=await response.json();
        if(!response.ok) throw new Error(payload.message||"Unable to load student records.");
        students=payload.data.map(student=>({
            dbId:Number(student.id),
            name:student.name,
            id:student.student_id,
            department:student.department,
            semester:student.semester,
            cgpa:Number(student.cgpa),
            status:student.status
        }));
        saveData("students",students);
        usingBackend=true;
    }catch(error){
        console.error("Student API unavailable:",error);
        showToast("Student API unavailable; showing browser demo data.");
    }

    function draw(){
        const q=(search?.value||"").toLowerCase();
        const dep=filter?.value||"all";
        const filtered=students.filter(s=>
            (s.name.toLowerCase().includes(q)||s.id.toLowerCase().includes(q)) &&
            (dep==="all"||s.department===dep)
        );

        body.innerHTML=filtered.map((s)=>{
            const realIndex=students.indexOf(s);
            return `<tr>
                <td><div class="student-cell"><div class="small-avatar">${escapeHTML(initials(s.name))}</div><div><strong>${escapeHTML(s.name)}</strong><span>${escapeHTML(s.department)}</span></div></div></td>
                <td>${escapeHTML(s.id)}</td><td>${escapeHTML(s.department)}</td><td>${escapeHTML(s.semester)}</td><td>${escapeHTML(s.cgpa)}</td>
                <td><span class="badge ${s.status==="Active"?"success":"danger"}">${escapeHTML(s.status)}</span></td>
                <td>${getCurrentUser().role!=="Student"?`<button class="action-btn edit" data-edit-student="${realIndex}">✎</button><button class="action-btn delete" data-delete-student="${realIndex}">🗑</button>`:"—"}</td>
            </tr>`;
        }).join("");

        document.querySelectorAll("[data-edit-student]").forEach(btn=>btn.addEventListener("click",()=>openStudentModal(Number(btn.dataset.editStudent))));
        document.querySelectorAll("[data-delete-student]").forEach(btn=>btn.addEventListener("click",()=>deleteStudent(Number(btn.dataset.deleteStudent),students,usingBackend)));
    }

    search?.addEventListener("input",draw);
    filter?.addEventListener("change",draw);

    document.getElementById("addStudentBtn")?.addEventListener("click",()=>openStudentModal());
    document.getElementById("studentForm")?.addEventListener("submit",event=>saveStudent(event,students,usingBackend));

    draw();
}

function openStudentModal(index=null){
    const modal=document.getElementById("studentModal");
    if(!modal) return;
    const students=getData("students");
    document.getElementById("studentModalTitle").textContent=index===null?"Add Student":"Edit Student";
    document.getElementById("editStudentIndex").value=index===null?"":index;

    if(index!==null){
        const s=students[index];
        document.getElementById("studentName").value=s.name;
        document.getElementById("studentId").value=s.id;
        document.getElementById("studentDepartment").value=s.department;
        document.getElementById("studentSemester").value=s.semester;
        document.getElementById("studentCgpa").value=s.cgpa;
        document.getElementById("studentStatus").value=s.status;
    }else{
        document.getElementById("studentForm").reset();
    }
    modal.classList.add("active");
}

async function saveStudent(e,students,usingBackend){
    e.preventDefault();
    const index=document.getElementById("editStudentIndex").value;

    const student={
        name:document.getElementById("studentName").value.trim(),
        id:document.getElementById("studentId").value.trim(),
        department:document.getElementById("studentDepartment").value,
        semester:document.getElementById("studentSemester").value,
        cgpa:Number(document.getElementById("studentCgpa").value),
        status:document.getElementById("studentStatus").value
    };

    if(usingBackend){
        const editing=index!=="";
        const existing=editing?students[Number(index)]:null;
        const url="api/index.php?resource=students"+(editing?"&id="+encodeURIComponent(existing.dbId):"");
        try{
            const response=await fetch(url,{
                method:editing?"PUT":"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    student_id:student.id,
                    name:student.name,
                    department:student.department,
                    semester:student.semester,
                    cgpa:student.cgpa,
                    status:student.status
                })
            });
            const payload=await response.json();
            if(!response.ok) throw new Error(payload.message||"Unable to save student record.");
            const saved=payload.data;
            student.dbId=Number(saved.id);
            if(editing) students[Number(index)]=student;
            else students.push(student);
        }catch(error){
            console.error("Student save failed:",error);
            showToast(error.message||"Unable to save student record.");
            return;
        }
    }else if(index==="") students.push(student);
    else students[Number(index)]=student;

    saveData("students",students);
    closeModal("studentModal");
    showToast(usingBackend?"Student record saved to the database.":"Student record saved in this browser.");
    loadPage("students");
}

async function deleteStudent(index,students,usingBackend){
    if(!confirm("Delete this student record?")) return;
    if(usingBackend){
        try{
            const response=await fetch("api/index.php?resource=students&id="+encodeURIComponent(students[index].dbId),{
                method:"DELETE"
            });
            const payload=await response.json();
            if(!response.ok) throw new Error(payload.message||"Unable to delete student record.");
        }catch(error){
            console.error("Student delete failed:",error);
            showToast(error.message||"Unable to delete student record.");
            return;
        }
    }

    students.splice(index,1);
    saveData("students",students);
    loadPage("students");
    showToast(usingBackend?"Student deleted from the database.":"Student deleted from this browser.");
}

function renderFaculty(){
    const grid=document.getElementById("facultyGrid");
    const search=document.getElementById("facultySearch");
    const departmentFilter=document.getElementById("facultyDepartment");
    const modal=document.getElementById("facultyDetailsModal");
    if(!grid) return;

    const draw=()=>{
        const query=(search?.value||"").trim().toLowerCase();
        const selectedDepartment=(departmentFilter?.value||"All");
        const visibleFaculty=faculty.filter(member=>
            (selectedDepartment==="All"||member.department===selectedDepartment)
            && [member.name,member.role,member.department,member.email].join(" ").toLowerCase().includes(query)
        );

        grid.innerHTML=visibleFaculty.map(member=>{
            const assignedCourses=courses.filter(course=>course.teacher===member.name).length;
            return `
                <div class="faculty-card">
                    <div class="faculty-avatar">${initials(member.name)}</div>
                    <h3>${escapeHTML(member.name)}</h3>
                    <p>${escapeHTML(member.role)}</p>
                    <p>${escapeHTML(member.department)}</p>
                    <div class="faculty-meta">
                        <span>${assignedCourses} active courses</span>
                        <button type="button" class="text-btn faculty-details-btn" data-faculty-index="${faculty.indexOf(member)}">View details</button>
                    </div>
                </div>
            `;
        }).join("");

        const emptyState=document.getElementById("facultyEmptyState");
        if(emptyState) emptyState.hidden=visibleFaculty.length>0;

        grid.querySelectorAll(".faculty-details-btn").forEach(button=>{
            button.addEventListener("click",()=>{
                const index=Number(button.dataset.facultyIndex);
                const member=faculty[index];
                if(!member||!modal) return;

                const assignedCourses=courses.filter(course=>course.teacher===member.name);
                document.getElementById("facultyDetailsTitle").textContent=member.name;
                document.getElementById("facultyDetailsContent").innerHTML=`
                    <div class="faculty-detail-head">
                        <div class="faculty-avatar large">${initials(member.name)}</div>
                        <div>
                            <h3>${escapeHTML(member.name)}</h3>
                            <p>${escapeHTML(member.role)} · ${escapeHTML(member.department)}</p>
                        </div>
                    </div>
                    <div class="faculty-detail-grid">
                        <div><span>Email</span><strong>${escapeHTML(member.email||"Not available")}</strong></div>
                        <div><span>Phone</span><strong>${escapeHTML(member.phone||"Not available")}</strong></div>
                        <div><span>Department</span><strong>${escapeHTML(member.department)}</strong></div>
                        <div><span>Courses</span><strong>${assignedCourses.length}</strong></div>
                    </div>
                    <div class="faculty-course-list">
                        ${assignedCourses.map(course=>`<span class="course-badge">${escapeHTML(course.code)} · ${escapeHTML(course.name)}</span>`).join("") || "<p class='muted'>No course assignments yet.</p>"}
                    </div>
                `;
                modal.classList.add("active");
            });
        });
    };

    search?.addEventListener("input",draw);
    departmentFilter?.addEventListener("change",draw);
    draw();
}

async function renderCourses(){
    const grid=document.getElementById("courseGrid");
    if(!grid) return;
    const user=getCurrentUser();
    const savedCourses=localStorage.getItem("collegePortal_courses");
    const previousCourses=savedCourses
        ?[...courses,...JSON.parse(savedCourses)]
        :courses;
    let usingBackend=false;
    try{
        const response=await fetch("api/index.php?resource=courses");
        const payload=await response.json();
        if(!response.ok) throw new Error(payload.message||"Unable to load course records.");
        courses=payload.data.map(record=>{
            const existing=previousCourses.find(course=>course.dbId===Number(record.id))
                ||previousCourses.find(course=>course.code===record.code);
            return {
                id:existing?.id||`DB-${record.id}`,
                dbId:Number(record.id),
                code:record.code,
                name:record.name,
                teacher:record.teacher,
                credits:Number(record.credits),
                department:record.department,
                semester:record.semester,
                status:record.status
            };
        });
        localStorage.setItem("collegePortal_courses",JSON.stringify(courses));
        usingBackend=true;
    }catch(error){
        console.error("Course API unavailable:",error);
        showToast("Course API unavailable; showing browser demo data.");
        if(savedCourses) courses=JSON.parse(savedCourses);
    }
    const students=getData("students");
    const student=user?.role==="Student"
        ?students.find(item=>item.id===user.studentId)||students.find(item=>item.name===user.name)
        :null;
    const enrolledCourses=user?.role==="Student"
        ?student?courses.filter(course=>course.status==="Active"&&course.semester===student.semester&&course.department===student.department):[]
        :courses;
    const search=document.getElementById("courseSearch");
    const emptyState=document.getElementById("courseEmptyState");
    const count=document.getElementById("courseCount");
    const credits=document.getElementById("courseCredits");
    const semester=document.getElementById("courseSemester");
    const modal=document.getElementById("courseDetailsModal");
    const addButton=document.getElementById("addCourseBtn");
    const form=document.getElementById("courseForm");
    if(addButton) addButton.hidden=user?.role!=="Admin";

    document.getElementById("coursesHeading").textContent=user?.role==="Student"?"My Courses":"Courses";
    document.getElementById("coursesDescription").textContent=user?.role==="Student"
        ?student?`${student.department} · ${student.semester} semester`:"No student academic profile is linked to this account."
        :"Course information for the college.";
    document.getElementById("pageSubtitle").textContent=user?.role==="Student"
        ?"Your active courses for this semester."
        :"Course information for the college.";

    const draw=()=>{
        const query=(search?.value||"").trim().toLowerCase();
        const visibleCourses=enrolledCourses.filter(course=>
            [course.id,course.code,course.name,course.teacher,course.department].some(value=>String(value).toLowerCase().includes(query))
        );
        count.textContent=visibleCourses.length;
        credits.textContent=visibleCourses.reduce((total,course)=>total+course.credits,0);
        semester.textContent=student?.semester||"All semesters";
        grid.innerHTML=visibleCourses.map((course,index)=>`
            <article class="course-card">
                <div class="course-card-top">
                    <span class="course-code">${escapeHTML(course.code)}</span>
                    <span class="badge ${course.status==="Active"?"success":"warning"}">${escapeHTML(course.status)}</span>
                </div>
                <h3>${escapeHTML(course.name)}</h3>
                <p class="course-instructor">${escapeHTML(course.teacher)}</p>
                <div class="course-meta">
                    <span>${course.credits} Credits</span>
                    <span>${escapeHTML(course.semester)} Semester</span>
                </div>
                <div class="course-card-actions">
                    <button type="button" class="text-btn course-details-btn" data-course-index="${index}">Course details <span aria-hidden="true">→</span></button>
                    ${user?.role==="Admin"?`<div><button type="button" class="action-btn edit" data-edit-course="${courses.indexOf(course)}" aria-label="Edit ${escapeHTML(course.code)}">✎</button><button type="button" class="action-btn delete" data-delete-course="${courses.indexOf(course)}" aria-label="Delete ${escapeHTML(course.code)}">🗑</button></div>`:""}
                </div>
            </article>
        `).join("");
        emptyState.hidden=visibleCourses.length>0;
        grid.hidden=visibleCourses.length===0;
        grid.querySelectorAll("[data-course-index]").forEach(button=>{
            button.addEventListener("click",()=>{
                const course=visibleCourses[Number(button.dataset.courseIndex)];
                if(!course||!modal) return;
                document.getElementById("courseDetailsTitle").textContent=course.name;
                document.getElementById("courseDetailsContent").innerHTML=`
                    <div class="course-detail-code">${escapeHTML(course.code)}</div>
                    <div class="course-detail-grid">
                        <div><span>Course ID</span><strong>${escapeHTML(course.id)}</strong></div>
                        <div><span>Instructor</span><strong>${escapeHTML(course.teacher)}</strong></div>
                        <div><span>Credit Hours</span><strong>${course.credits}</strong></div>
                        <div><span>Department</span><strong>${escapeHTML(course.department)}</strong></div>
                        <div><span>Semester</span><strong>${escapeHTML(course.semester)}</strong></div>
                        <div><span>Status</span><strong>${escapeHTML(course.status)}</strong></div>
                    </div>`;
                modal.classList.add("active");
            });
        });
        grid.querySelectorAll("[data-edit-course]").forEach(button=>
            button.addEventListener("click",()=>openCourseForm(Number(button.dataset.editCourse),courses))
        );
        grid.querySelectorAll("[data-delete-course]").forEach(button=>
            button.addEventListener("click",()=>deleteCourse(Number(button.dataset.deleteCourse),usingBackend))
        );
    };

    search?.addEventListener("input",draw);
    addButton?.addEventListener("click",()=>openCourseForm(null,courses));
    form?.addEventListener("submit",event=>saveCourse(event,courses,usingBackend));
    draw();
}

function openCourseForm(index,courseList){
    const form=document.getElementById("courseForm");
    const modal=document.getElementById("courseFormModal");
    if(!form||!modal) return;
    const editing=index!==null;
    document.getElementById("courseFormTitle").textContent=editing?"Edit Course":"Add Course";
    document.getElementById("editCourseIndex").value=editing?String(index):"";
    if(editing){
        const course=courseList[index];
        document.getElementById("courseCode").value=course.code;
        document.getElementById("courseName").value=course.name;
        document.getElementById("courseTeacher").value=course.teacher;
        document.getElementById("courseCreditsInput").value=course.credits;
        document.getElementById("courseDepartment").value=course.department;
        document.getElementById("courseSemesterInput").value=course.semester;
        document.getElementById("courseStatus").value=course.status;
    }else{
        form.reset();
    }
    modal.classList.add("active");
}

async function saveCourse(event,courseList,usingBackend){
    event.preventDefault();
    const index=document.getElementById("editCourseIndex").value;
    const editing=index!=="";
    const course={
        code:document.getElementById("courseCode").value.trim(),
        name:document.getElementById("courseName").value.trim(),
        teacher:document.getElementById("courseTeacher").value.trim(),
        credits:Number(document.getElementById("courseCreditsInput").value),
        department:document.getElementById("courseDepartment").value.trim(),
        semester:document.getElementById("courseSemesterInput").value,
        status:document.getElementById("courseStatus").value
    };
    const courseIndex=Number(index);

    if(usingBackend){
        const existing=editing?courseList[courseIndex]:null;
        const url="api/index.php?resource=courses"+(editing?"&id="+encodeURIComponent(existing.dbId):"");
        try{
            const response=await fetch(url,{
                method:editing?"PUT":"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(course)
            });
            const payload=await response.json();
            if(!response.ok) throw new Error(payload.message||"Unable to save course record.");
            course.dbId=Number(payload.data.id);
            course.id=existing?.id||`DB-${course.dbId}`;
        }catch(error){
            console.error("Course save failed:",error);
            showToast(error.message||"Unable to save course record.");
            return;
        }
    }else{
        if(editing) course.id=courseList[courseIndex].id;
        else course.id=`LOCAL-${Date.now()}`;
    }

    if(editing) courseList[courseIndex]=course;
    else courseList.push(course);
    localStorage.setItem("collegePortal_courses",JSON.stringify(courseList));
    closeModal("courseFormModal");
    showToast(usingBackend?"Course saved to the database.":"Course saved in this browser.");
    loadPage("courses");
}

async function deleteCourse(index,usingBackend){
    if(!confirm("Delete this course record?")) return;
    const course=courses[index];
    if(usingBackend){
        try{
            const response=await fetch("api/index.php?resource=courses&id="+encodeURIComponent(course.dbId),{
                method:"DELETE"
            });
            const payload=await response.json();
            if(!response.ok) throw new Error(payload.message||"Unable to delete course record.");
        }catch(error){
            console.error("Course delete failed:",error);
            showToast(error.message||"Unable to delete course record.");
            return;
        }
    }
    courses.splice(index,1);
    localStorage.setItem("collegePortal_courses",JSON.stringify(courses));
    showToast(usingBackend?"Course deleted from the database.":"Course deleted from this browser.");
    loadPage("courses");
}

function renderAttendance(){
    const list=document.getElementById("attendanceList");
    if(!list) return;
    const user=getCurrentUser();
    const students=getData("students");
    const staffControls=document.getElementById("attendanceStaffControls");
    const studentSelect=document.getElementById("attendanceStudentSelect");
    const isStaff=user?.role==="Admin"||user?.role==="Faculty";

    document.getElementById("attendanceHeading").textContent=isStaff?"Attendance Management":"My Attendance";
    document.getElementById("attendanceDescription").textContent=isStaff
        ?"Review attendance by student and record or correct a class."
        :"Review your attendance for this semester.";
    staffControls.hidden=!isStaff;

    if(isStaff){
        studentSelect.innerHTML=students.map(student=>
            `<option value="${escapeHTML(student.id)}">${escapeHTML(student.name)} · ${escapeHTML(student.id)}</option>`
        ).join("");
        if(attendanceSelectedStudentId&&students.some(student=>student.id===attendanceSelectedStudentId)){
            studentSelect.value=attendanceSelectedStudentId;
        }else{
            attendanceSelectedStudentId=students[0]?.id||"";
            studentSelect.value=attendanceSelectedStudentId;
        }
        studentSelect.onchange=()=>{
            attendanceSelectedStudentId=studentSelect.value;
            drawAttendance();
        };
        document.getElementById("attendanceExportBtn").onclick=exportAttendanceReport;
    }else{
        attendanceSelectedStudentId=students.find(student=>student.id===user?.studentId)?.id
            ||students.find(student=>student.name===user?.name)?.id
            ||"";
    }

    document.getElementById("attendanceForm").onsubmit=saveAttendanceSession;
    drawAttendance();
}

function getSavedAttendance(){
    const saved=localStorage.getItem("collegePortal_attendanceRecords");
    return saved===null?JSON.parse(JSON.stringify(attendance)):JSON.parse(saved);
}

function getAttendanceSessions(){
    const saved=localStorage.getItem("collegePortal_attendanceSessions");
    return saved===null?[]:JSON.parse(saved);
}

function getAttendancePercentage(record){
    return record.totalClasses?Math.round(record.presentClasses/record.totalClasses*100):0;
}

function drawAttendance(){
    const list=document.getElementById("attendanceList");
    if(!list) return;
    const students=getData("students");
    const student=students.find(item=>item.id===attendanceSelectedStudentId);
    const user=getCurrentUser();
    const isStaff=user?.role==="Admin"||user?.role==="Faculty";
    const coursesForStudent=student
        ?courses.filter(course=>course.status==="Active"&&course.department===student.department&&course.semester===student.semester)
        :[];
    const records=getSavedAttendance();
    const sessions=getAttendanceSessions();
    const studentRecords=coursesForStudent.map(course=>({
        course,
        record:records.find(item=>item.studentId===student.id&&item.courseId===course.id)
            ||{studentId:student.id,courseId:course.id,totalClasses:0,presentClasses:0}
    }));
    const totals=studentRecords.reduce((summary,item)=>({
        total:summary.total+item.record.totalClasses,
        present:summary.present+item.record.presentClasses
    }),{total:0,present:0});
    const percentage=totals.total?Math.round(totals.present/totals.total*100):0;

    document.getElementById("pageSubtitle").textContent=isStaff
        ?student?`Attendance report for ${student.name}.`:"Manage student attendance."
        :"Your course-by-course attendance record.";
    document.getElementById("attendanceCourseCaption").textContent=student
        ?`${student.department} · ${student.semester} semester`
        :"Select a student with an active academic profile to view records.";
    document.getElementById("overallAttendance").textContent=totals.total?`${percentage}%`:"—";
    document.getElementById("overallAttendanceProgress").style.width=`${percentage}%`;
    document.getElementById("overallAttendanceProgress").classList.toggle("attendance-progress-warning",percentage<75&&totals.total>0);
    document.getElementById("overallAttendanceStatus").textContent=!totals.total
        ?"No attendance records"
        :percentage<75?"Warning · Below 75%":"Good attendance";
    document.getElementById("overallAttendanceStatus").classList.toggle("warning-text",percentage<75&&totals.total>0);
    document.getElementById("attendancePresentCount").textContent=totals.present;
    document.getElementById("attendanceAbsentCount").textContent=totals.total-totals.present;
    document.getElementById("attendanceClassCount").textContent=totals.total;

    const emptyState=document.getElementById("attendanceEmptyState");
    emptyState.hidden=coursesForStudent.length>0;
    list.innerHTML=studentRecords.map(({course,record})=>{
        const rate=getAttendancePercentage(record);
        const status=record.totalClasses===0?"No records":rate<75?"Warning":"Good";
        const todaysSession=sessions.find(item=>
            item.studentId===student.id&&item.courseId===course.id&&item.date===dateKey(new Date())
        );
        return `<div class="attendance-row">
            <div class="attendance-course-heading">
                <div><strong>${escapeHTML(course.code)} · ${escapeHTML(course.name)}</strong><span>${escapeHTML(course.teacher)}</span></div>
                <div class="attendance-course-status">
                    <strong>${record.totalClasses?`${rate}%`:"—"}</strong>
                    <span class="badge ${status==="Good"?"success":status==="Warning"?"warning":"attendance-none"}">${status}</span>
                </div>
            </div>
            <div class="attendance-bar" role="progressbar" aria-label="${escapeHTML(course.name)} attendance" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${rate}"><div class="${rate<75?"attendance-bar-warning":""}" style="width:${rate}%"></div></div>
            <div class="attendance-course-footer">
                <span>Present <strong>${record.presentClasses}</strong></span>
                <span>Absent <strong>${record.totalClasses-record.presentClasses}</strong></span>
                <span>Total <strong>${record.totalClasses}</strong></span>
                ${isStaff?`<button type="button" class="secondary-btn attendance-mark-btn" data-course-id="${escapeHTML(course.id)}">${todaysSession?"Update today":"Mark today"}</button>`:""}
            </div>
        </div>`;
    }).join("");

    if(isStaff){
        list.querySelectorAll("[data-course-id]").forEach(button=>button.addEventListener("click",()=>{
            const course=coursesForStudent.find(item=>item.id===button.dataset.courseId);
            if(!student||!course) return;
            const todaysSession=sessions.find(item=>
                item.studentId===student.id&&item.courseId===course.id&&item.date===dateKey(new Date())
            );
            document.getElementById("attendanceModalTitle").textContent=todaysSession?"Update Today's Attendance":"Record Attendance";
            document.getElementById("attendanceModalCourse").textContent=`${course.code} · ${course.name} — ${student.name}`;
            document.getElementById("attendanceStudentId").value=student.id;
            document.getElementById("attendanceCourseId").value=course.id;
            const dateInput=document.getElementById("attendanceDate");
            dateInput.value=dateKey(new Date());
            dateInput.max=dateKey(new Date());
            document.getElementById("attendanceStatusSelect").value=todaysSession?.status||"Present";
            document.getElementById("attendanceModal").classList.add("active");
        }));
    }
}

function saveAttendanceSession(event){
    event.preventDefault();
    const studentId=document.getElementById("attendanceStudentId").value;
    const courseId=document.getElementById("attendanceCourseId").value;
    const date=document.getElementById("attendanceDate").value;
    const status=document.getElementById("attendanceStatusSelect").value;
    const today=dateKey(new Date());
    if(!studentId||!courses.some(course=>course.id===courseId)||!date||date>today||!["Present","Absent"].includes(status)){
        showToast("Please enter a valid attendance date and status.");
        return;
    }

    const records=getSavedAttendance();
    const sessions=getAttendanceSessions();
    let summary=records.find(item=>item.studentId===studentId&&item.courseId===courseId);
    if(!summary){
        summary={studentId,courseId,totalClasses:0,presentClasses:0};
        records.push(summary);
    }
    const existingIndex=sessions.findIndex(item=>
        item.studentId===studentId&&item.courseId===courseId&&item.date===date
    );
    if(existingIndex>=0){
        const oldStatus=sessions[existingIndex].status;
        if(oldStatus==="Present") summary.presentClasses--;
        if(status==="Present") summary.presentClasses++;
        sessions[existingIndex].status=status;
    }else{
        summary.totalClasses++;
        if(status==="Present") summary.presentClasses++;
        sessions.push({studentId,courseId,date,status});
    }

    saveData("attendanceRecords",records);
    saveData("attendanceSessions",sessions);
    closeModal("attendanceModal");
    showToast("Attendance saved.");
    drawAttendance();
}

function exportAttendanceReport(){
    const student=getData("students").find(item=>item.id===attendanceSelectedStudentId);
    if(!student){
        showToast("Select a student before exporting an attendance report.");
        return;
    }
    const records=getSavedAttendance();
    const studentCourses=courses.filter(course=>course.status==="Active"&&course.department===student.department&&course.semester===student.semester);
    const rows=[
        ["Student ID","Student Name","Course Code","Course Name","Present Classes","Absent Classes","Total Classes","Attendance","Status"],
        ...studentCourses.map(course=>{
            const record=records.find(item=>item.studentId===student.id&&item.courseId===course.id)
                ||{totalClasses:0,presentClasses:0};
            const rate=getAttendancePercentage(record);
            return [student.id,student.name,course.code,course.name,record.presentClasses,record.totalClasses-record.presentClasses,record.totalClasses,record.totalClasses?`${rate}%`:"No records",record.totalClasses?(rate<75?"Warning":"Good"):"No records"];
        })
    ];
    const csv=rows.map(row=>row.map(value=>{
        const text=String(value);
        const safeText=/^[\t\r ]*[=+\-@]/.test(text)?`'${text}`:text;
        return `"${safeText.replace(/"/g,'""')}"`;
    }).join(",")).join("\r\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;
    link.download=`attendance-${student.id}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}

function renderTimetable(){
    const grid=document.getElementById("timetableGrid");
    if(!grid) return;
    grid.innerHTML=Object.entries(timetable).map(([day,items])=>`
        <div class="day-column"><h3>${day}</h3>${items.map(x=>`<div class="schedule-item"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("")}</div>
    `).join("");
}

function renderAssignments(){
    const grid=document.getElementById("assignmentGrid");
    if(!grid) return;
    const user=getCurrentUser();
    const isStaff=user?.role==="Admin"||user?.role==="Faculty";
    const student=getData("students").find(item=>item.id===user?.studentId)
        ||getData("students").find(item=>item.name===user?.name);
    const studentCourseIds=new Set(student
        ?courses.filter(course=>course.status==="Active"&&course.department===student.department&&course.semester===student.semester).map(course=>course.id)
        :[]);
    const visibleAssignments=getAssignments().filter(item=>isStaff||studentCourseIds.has(item.courseId));
    const search=document.getElementById("assignmentSearch");
    const filter=document.getElementById("assignmentStatusFilter");
    const emptyState=document.getElementById("assignmentEmptyState");
    const addButton=document.getElementById("addAssignmentBtn");
    const courseSelect=document.getElementById("assignmentCourse");
    const assignmentForm=document.getElementById("assignmentForm");

    document.getElementById("assignmentsHeading").textContent=isStaff?"Assignments":"My Assignments";
    document.getElementById("assignmentsDescription").textContent=isStaff
        ?"Create and manage assignments for academic courses."
        :"Track your coursework and due dates.";
    addButton.hidden=!isStaff;
    courseSelect.innerHTML=courses.filter(course=>course.status==="Active").map(course=>
        `<option value="${escapeHTML(course.id)}">${escapeHTML(course.code)} · ${escapeHTML(course.name)}</option>`
    ).join("");

    const draw=()=>{
        const query=(search.value||"").trim().toLowerCase();
        const selectedStatus=filter.value;
        const currentAssignments=getAssignments();
        const matches=visibleAssignments.filter(item=>{
            const course=courses.find(entry=>entry.id===item.courseId);
            const statusMatches=isStaff
                ?getData("students").some(entry=>getAssignmentStatus(item,entry.id)===selectedStatus)
                :getAssignmentStatus(item,student?.id)===selectedStatus;
            return (!query||[item.title,item.description,course?.name,course?.code].some(value=>value?.toLowerCase().includes(query)))
                &&(selectedStatus==="all"||statusMatches);
        });
        grid.innerHTML=matches.map(item=>{
            const course=courses.find(entry=>entry.id===item.courseId);
            const status=getAssignmentStatus(item,isStaff?null:student?.id);
            const originalIndex=currentAssignments.findIndex(entry=>entry.id===item.id);
            const submissionCount=getAssignmentSubmissions().filter(submission=>
                submission.assignmentId===item.id&&submission.status==="Submitted"
            ).length;
            return `<article class="assignment-card">
                <div class="assignment-card-heading">
                    <span class="course-code">${escapeHTML(course?.code||"Course")}</span>
                    <span class="badge ${status==="Submitted"?"success":status==="Overdue"?"danger":"warning"}">${status}</span>
                </div>
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(course?.name||"Course")} · ${escapeHTML(course?.teacher||"")}</p>
                <div class="assignment-card-meta">
                    <span>Due <strong>${formatDate(item.dueDate)}</strong></span>
                    <span>${Number(item.marks)} marks</span>
                </div>
                ${isStaff?`<p class="assignment-submission-summary">${submissionCount} of ${getData("students").length} students submitted</p>`:""}
                <div class="assignment-card-actions">
                    <button type="button" class="text-btn assignment-details-btn" data-assignment-id="${escapeHTML(item.id)}">View details</button>
                    ${isStaff?`<button type="button" class="action-btn edit" data-edit-assignment="${originalIndex}" aria-label="Edit ${escapeHTML(item.title)}">✎</button><button type="button" class="action-btn delete" data-delete-assignment="${originalIndex}" aria-label="Delete ${escapeHTML(item.title)}">🗑</button>`:""}
                </div>
            </article>`;
        }).join("");
        emptyState.hidden=matches.length>0;
        grid.hidden=matches.length===0;

        grid.querySelectorAll("[data-assignment-id]").forEach(button=>button.addEventListener("click",()=>{
            const item=getAssignments().find(entry=>entry.id===button.dataset.assignmentId);
            if(!item) return;
            const course=courses.find(entry=>entry.id===item.courseId);
            const status=getAssignmentStatus(item,isStaff?null:student?.id);
            const submissions=getAssignmentSubmissions().filter(entry=>
                entry.assignmentId===item.id&&entry.status==="Submitted"
            );
            const studentSubmissionRows=isStaff?getData("students").map(entry=>{
                const submission=submissions.find(record=>record.studentId===entry.id);
                const studentStatus=submission?"Submitted":getAssignmentStatus(item,entry.id);
                return `<div class="assignment-submission-row">
                    <div><strong>${escapeHTML(entry.name)}</strong><span>${escapeHTML(entry.id)}</span></div>
                    <span class="badge ${studentStatus==="Submitted"?"success":studentStatus==="Overdue"?"danger":"warning"}">${studentStatus}</span>
                </div>`;
            }).join(""):"";
            const submissionStatus=isStaff
                ?`${submissions.length} of ${getData("students").length} students submitted`
                :status;
            document.getElementById("assignmentDetailsTitle").textContent=item.title;
            document.getElementById("assignmentDetailsContent").innerHTML=`
                <div class="assignment-detail-grid">
                    <div><span>Assignment ID</span><strong>${escapeHTML(item.id)}</strong></div>
                    <div><span>Course</span><strong>${escapeHTML(course?.code||"")} · ${escapeHTML(course?.name||"")}</strong></div>
                    <div><span>Instructor</span><strong>${escapeHTML(course?.teacher||"—")}</strong></div>
                    <div><span>Issue date</span><strong>${formatDate(item.issueDate)}</strong></div>
                    <div><span>Due date</span><strong>${formatDate(item.dueDate)}</strong></div>
                    <div><span>Maximum marks</span><strong>${Number(item.marks)}</strong></div>
                    <div><span>Submission status</span><strong>${isStaff?escapeHTML(submissionStatus):`<span class="badge ${status==="Submitted"?"success":status==="Overdue"?"danger":"warning"}">${status}</span>`}</strong></div>
                    <div class="assignment-detail-description"><span>Description</span><p>${escapeHTML(item.description)}</p></div>
                    ${isStaff?`<div class="assignment-student-submissions"><span>Student submission status</span>${studentSubmissionRows||'<p>No student records are available.</p>'}</div>`:""}
                </div>`;
            document.getElementById("assignmentDetailsModal").classList.add("active");
        }));

        if(isStaff){
            grid.querySelectorAll("[data-edit-assignment]").forEach(button=>button.addEventListener("click",()=>{
                openAssignmentForm(Number(button.dataset.editAssignment));
            }));
            grid.querySelectorAll("[data-delete-assignment]").forEach(button=>button.addEventListener("click",()=>{
                deleteAssignment(Number(button.dataset.deleteAssignment));
            }));
        }
    };

    search.oninput=draw;
    filter.onchange=draw;
    addButton.onclick=()=>openAssignmentForm();
    assignmentForm.onsubmit=saveAssignment;
    draw();
}

function openAssignmentForm(index=null){
    const form=document.getElementById("assignmentForm");
    const currentAssignments=getAssignments();
    const assignment=index===null?null:currentAssignments[index];
    if(index!==null&&!assignment) return;
    form.reset();
    document.getElementById("assignmentEditId").value=assignment?.id||"";
    document.getElementById("assignmentFormTitle").textContent=assignment?"Edit Assignment":"Add Assignment";
    document.getElementById("assignmentCourse").value=assignment?.courseId||courses.find(course=>course.status==="Active")?.id||"";
    document.getElementById("assignmentTitle").value=assignment?.title||"";
    document.getElementById("assignmentDescription").value=assignment?.description||"";
    document.getElementById("assignmentIssueDate").value=assignment?.issueDate||dateKey(new Date());
    document.getElementById("assignmentDueDate").value=assignment?.dueDate||"";
    document.getElementById("assignmentMarks").value=assignment?.marks||"";
    document.getElementById("assignmentFormModal").classList.add("active");
}

function saveAssignment(event){
    event.preventDefault();
    const courseId=document.getElementById("assignmentCourse").value;
    const title=document.getElementById("assignmentTitle").value.trim();
    const description=document.getElementById("assignmentDescription").value.trim();
    const issueDate=document.getElementById("assignmentIssueDate").value;
    const dueDate=document.getElementById("assignmentDueDate").value;
    const marks=Number(document.getElementById("assignmentMarks").value);
    const editId=document.getElementById("assignmentEditId").value;
    if(!courses.some(course=>course.id===courseId&&course.status==="Active")
        ||!title||!description||!parseDate(issueDate)||!parseDate(dueDate)||issueDate>dueDate
        ||!Number.isInteger(marks)||marks<1||marks>1000){
        showToast("Enter valid assignment details and ensure the due date is not before the issue date.");
        return;
    }
    const currentAssignments=getAssignments();
    const assignment={
        id:editId||`ASG-${Date.now()}`,
        courseId,
        title,
        description,
        issueDate,
        dueDate,
        marks
    };
    const existingIndex=currentAssignments.findIndex(item=>item.id===editId);
    if(existingIndex<0) currentAssignments.unshift(assignment);
    else currentAssignments[existingIndex]=assignment;
    saveData("assignments",currentAssignments);
    closeModal("assignmentFormModal");
    showToast(existingIndex<0?"Assignment created.":"Assignment updated.");
    renderAssignments();
}

function deleteAssignment(index){
    const currentAssignments=getAssignments();
    const assignment=currentAssignments[index];
    if(!assignment||!confirm(`Delete "${assignment.title}"?`)) return;
    currentAssignments.splice(index,1);
    saveData("assignments",currentAssignments);
    saveData("assignmentSubmissions",getAssignmentSubmissions().filter(item=>item.assignmentId!==assignment.id));
    showToast("Assignment deleted.");
    renderAssignments();
}

function getResultGrade(marks){
    if(marks>=90) return {grade:"A+",point:4.0};
    if(marks>=85) return {grade:"A",point:4.0};
    if(marks>=80) return {grade:"A-",point:3.7};
    if(marks>=75) return {grade:"B+",point:3.3};
    if(marks>=70) return {grade:"B",point:3.0};
    if(marks>=65) return {grade:"B-",point:2.7};
    if(marks>=60) return {grade:"C+",point:2.3};
    if(marks>=55) return {grade:"C",point:2.0};
    if(marks>=50) return {grade:"C-",point:1.7};
    if(marks>=45) return {grade:"D",point:1.0};
    return {grade:"F",point:0};
}

function calculateGpa(rows){
    if(!rows.length) return 0;
    const totalCredits=rows.reduce((sum,row)=>sum+row.credits,0);
    const weightedPoints=rows.reduce((sum,row)=>sum+(row.point*row.credits),0);
    return totalCredits ? weightedPoints/totalCredits : 0;
}

function renderResults(){
    const body=document.getElementById("resultsTable");
    const gpaValue=document.getElementById("resultGpaValue");
    const cgpaValue=document.getElementById("resultCgpaValue");
    const creditsValue=document.getElementById("resultCreditsValue");
    if(!body) return;

    const user=getCurrentUser();
    const students=getData("students");
    const student=user?.role==="Student"
        ?students.find(item=>item.id===user.studentId)||students.find(item=>item.name===user.name)
        :null;

    const studentResults = student && courses.length
        ? courses
            .filter(course=>course.department===student.department && course.semester===student.semester)
            .map(course=>{
                const match=results.find(item=>item.course===course.name);
                const marks=match?.marks ?? Math.max(0, Math.min(100, Math.round((course.credits*20) + (course.code.length % 15))));
                const gradeInfo=getResultGrade(marks);
                return {
                    course: course.name,
                    credits: course.credits,
                    marks,
                    grade: gradeInfo.grade,
                    point: gradeInfo.point
                };
            })
        : results.map(item=>({
            course: item.course,
            credits: item.credits,
            marks: item.marks,
            grade: item.grade,
            point: item.point
        }));

    const gpa=calculateGpa(studentResults);
    const creditsCompleted=studentResults.reduce((sum,row)=>sum+row.credits,0);

    body.innerHTML=studentResults.map(r=>`<tr><td>${escapeHTML(r.course)}</td><td>${r.credits}</td><td>${r.marks}</td><td><span class="badge success">${escapeHTML(r.grade)}</span></td><td>${Number(r.point).toFixed(1)}</td></tr>`).join("");

    if(gpaValue){ gpaValue.textContent = Number(gpa).toFixed(2); }
    if(cgpaValue){ cgpaValue.textContent = student ? Number(student.cgpa).toFixed(2) : Number(gpa).toFixed(2); }
    if(creditsValue){ creditsValue.textContent = creditsCompleted; }

    const pageSubtitle=document.getElementById("pageSubtitle");
    if(pageSubtitle){
        pageSubtitle.textContent = student
            ?`Performance summary for ${student.department} • ${student.semester}.`
            :"Academic performance summary.";
    }
}

function getFeeRecords(){
    const saved=localStorage.getItem("collegePortal_fees");
    return saved===null?JSON.parse(JSON.stringify(defaultFeeRecords)):JSON.parse(saved);
}

function formatCurrency(amount){
    return `Rs. ${Number(amount).toLocaleString("en-PK")}`;
}

function renderFees(){
    const students=getData("students");
    const user=getCurrentUser();
    const isAdmin=user?.role==="Admin";
    const staffControls=document.getElementById("feesAdminControls");
    const paymentManagement=document.getElementById("feePaymentManagement");
    const studentSelect=document.getElementById("feesStudentSelect");
    const studentsCaption=document.getElementById("feesStudentCaption");

    document.getElementById("feesHeading").textContent=isAdmin?"Fee Management":"My Fees";
    document.getElementById("feesDescription").textContent=isAdmin
        ?"Review student balances and record received payments."
        :"Review your fee balance and payment history.";
    staffControls.hidden=!isAdmin;
    paymentManagement.hidden=!isAdmin;

    if(isAdmin){
        studentSelect.innerHTML=students.map(student=>
            `<option value="${escapeHTML(student.id)}">${escapeHTML(student.name)} · ${escapeHTML(student.id)}</option>`
        ).join("");
        if(feesSelectedStudentId&&students.some(student=>student.id===feesSelectedStudentId)){
            studentSelect.value=feesSelectedStudentId;
        }else{
            feesSelectedStudentId=students[0]?.id||"";
            studentSelect.value=feesSelectedStudentId;
        }
        studentSelect.onchange=()=>{
            feesSelectedStudentId=studentSelect.value;
            drawFees();
        };
    }else{
        feesSelectedStudentId=students.find(student=>student.id===user?.studentId)?.id
            ||students.find(student=>student.name===user?.name)?.id
            ||"";
    }

    document.getElementById("feePaymentForm").onsubmit=saveFeePayment;
    document.getElementById("feePaymentDate").value=dateKey(new Date());
    drawFees();
}

function drawFees(){
    const students=getData("students");
    const student=students.find(item=>item.id===feesSelectedStudentId);
    const records=getFeeRecords();
    const record=student
        ?records.find(item=>item.studentId===student.id)||{studentId:student.id,totalAmount:45000,payments:[]}
        :null;
    const payments=record?.payments||[];
    const paid=payments.reduce((sum,payment)=>sum+Number(payment.amount),0);
    const total=Number(record?.totalAmount||0);
    const remaining=Math.max(0,total-paid);
    const status=remaining===0&&total>0?"Paid":paid>0?"Partial":"Unpaid";
    const statusElement=document.getElementById("feeStatus");
    const paymentsTable=document.getElementById("feePaymentsTable");

    document.getElementById("feesStudentCaption").textContent=student
        ?`${student.name} · ${student.id}`
        :"No student profile is linked to this account.";
    document.getElementById("feeTotal").textContent=record?formatCurrency(total):"—";
    document.getElementById("feePaid").textContent=record?formatCurrency(paid):"—";
    document.getElementById("feeRemaining").textContent=record?formatCurrency(remaining):"—";
    statusElement.textContent=record?status:"—";
    statusElement.className=status==="Partial"||status==="Unpaid"?"warning-text":"";
    document.getElementById("feesEmptyState").hidden=payments.length>0;
    paymentsTable.innerHTML=payments.map(payment=>`
        <tr>
            <td>${escapeHTML(formatDate(payment.date))}</td>
            <td>${escapeHTML(payment.description)}</td>
            <td>${escapeHTML(formatCurrency(payment.amount))}</td>
            <td><span class="badge success">Paid</span></td>
        </tr>
    `).join("");

    const amountInput=document.getElementById("feePaymentAmount");
    amountInput.max=String(remaining);
    amountInput.disabled=!student||remaining<=0;
    document.querySelector("#feePaymentForm button[type='submit']").disabled=!student||remaining<=0;
}

function saveFeePayment(event){
    event.preventDefault();
    const students=getData("students");
    const student=students.find(item=>item.id===feesSelectedStudentId);
    if(!student){
        showToast("Select a student before recording a payment.");
        return;
    }

    const records=getFeeRecords();
    let record=records.find(item=>item.studentId===student.id);
    if(!record){
        record={studentId:student.id,totalAmount:45000,payments:[]};
        records.push(record);
    }

    const amount=Number(document.getElementById("feePaymentAmount").value);
    const paid=record.payments.reduce((sum,payment)=>sum+Number(payment.amount),0);
    if(!Number.isFinite(amount)||amount<=0||amount>record.totalAmount-paid){
        showToast("Payment must be greater than zero and no more than the remaining balance.");
        return;
    }

    record.payments.push({
        date:document.getElementById("feePaymentDate").value,
        description:document.getElementById("feePaymentDescription").value.trim(),
        amount
    });
    saveData("fees",records);
    document.getElementById("feePaymentForm").reset();
    document.getElementById("feePaymentDate").value=dateKey(new Date());
    showToast("Fee payment recorded.");
    drawFees();
}

function renderNotices(){
    const list=document.getElementById("noticeList");
    if(!list) return;
    const notices=getData("notices");

    list.innerHTML=notices.map((n,i)=>`
        <div class="notice-item">
            <h3>${n.title}</h3><p>${n.description}</p><span class="notice-date">${n.date}</span>
            ${getCurrentUser().role==="Admin"?`<button class="action-btn delete" data-delete-notice="${i}">🗑 Delete</button>`:""}
        </div>
    `).join("");

    document.getElementById("addNoticeBtn")?.addEventListener("click",()=>document.getElementById("noticeModal").classList.add("active"));
    document.getElementById("noticeForm")?.addEventListener("submit",saveNotice);
    document.querySelectorAll("[data-delete-notice]").forEach(btn=>btn.addEventListener("click",()=>{
        const notices=getData("notices");
        notices.splice(Number(btn.dataset.deleteNotice),1);
        saveData("notices",notices);
        renderNotices();
        showToast("Notice deleted.");
    }));
}

function saveNotice(e){
    e.preventDefault();
    const notices=getData("notices");
    notices.unshift({
        title:document.getElementById("noticeTitle").value.trim(),
        description:document.getElementById("noticeDescription").value.trim(),
        date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})
    });
    saveData("notices",notices);
    closeModal("noticeModal");
    showToast("Notice added.");
    renderNotices();
}

function renderProfile(user){
    const students=getData("students");
    const student=students.find(item=>item.id===user?.studentId)||students.find(item=>item.name===user?.name)
        ||{
            id:"CS-2023-001",
            department:"Computer Science",
            semester:"6th",
            program:"BS Computer Science",
            email:"student@example.com",
            phone:"+92 300 1234567",
            address:"Lahore, Pakistan",
            fatherName:"Ahmad Ali",
            admissionDate:"2023-09-01"
        };

    document.getElementById("profileAvatar").textContent=initials(user.name);
    document.getElementById("profileName").textContent=user.name;
    document.getElementById("profileRole").textContent=user.role;
    document.getElementById("profileUsername").textContent=user.username;
    document.getElementById("profileStudentId").textContent=student.id || "—";
    document.getElementById("profileFatherName").textContent=student.fatherName || "—";
    document.getElementById("profileEmail").textContent=student.email || user.username + "@example.com";
    document.getElementById("profilePhone").textContent=student.phone || "—";
    document.getElementById("profileAddress").textContent=student.address || "—";
    document.getElementById("profileDepartment").textContent=student.department || "—";
    document.getElementById("profileProgram").textContent=student.program || "BS Computer Science";
    document.getElementById("profileSemester").textContent=student.semester ? `${student.semester} Semester` : "—";
    document.getElementById("profileAdmissionDate").textContent=student.admissionDate ? formatDate(student.admissionDate) : "—";
}

function renderSettings(){
    const dark=localStorage.getItem("collegePortalTheme")==="dark";
    document.getElementById("settingsThemeToggle")?.classList.toggle("active",dark);
    document.getElementById("settingsThemeToggle")?.addEventListener("click",()=>{
        toggleTheme();
        renderSettings();
    });

    document.getElementById("notificationToggle")?.addEventListener("click",e=>{
        e.currentTarget.classList.toggle("active");
    });

    document.getElementById("resetDataBtn")?.addEventListener("click",()=>{
        if(!confirm("Restore all demo data?")) return;
        localStorage.removeItem("collegePortal_students");
        localStorage.removeItem("collegePortal_notices");
        localStorage.removeItem("collegePortal_assignments");
        localStorage.removeItem("collegePortal_assignmentSubmissions");
        localStorage.removeItem("collegePortal_attendanceRecords");
        localStorage.removeItem("collegePortal_attendanceSessions");
        localStorage.removeItem("collegePortal_fees");
        showToast("Demo data restored.");
    });
}

function closeModal(id){
    document.getElementById(id)?.classList.remove("active");
}

function resetDemoData(){
    Object.keys(defaultData).forEach(key=>localStorage.removeItem("collegePortal_"+key));
    localStorage.removeItem("collegePortal_fees");
}

document.addEventListener("DOMContentLoaded",()=>{
    setupLogin();
    setupPortal();
});
