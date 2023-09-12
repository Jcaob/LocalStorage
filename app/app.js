function initListeners() {
    
    $("#submit").on("click", (e) =>{
        e.preventDefault();
        

        let fn = $("#firstName").val();
        let ln = $("#lastName").val();
        let cs = $("#classes").val();
        let pn = $("#pNumber").val();
        let ag = $("#age").val();
        let em = $("#email").val();
        // let newArrClass = cs.replaceAll(", ", ",").split(",");
        let newArrClass = cs.split(",");
        let finalClassArray = [];
        let userObj = {
                fname: fn,
                lname: ln,
                pNumber: pn,
                age: ag,
                email: em,
                classes: []
            }
        $.each(newArrClass, (idx, newClass) =>{
            let cl = {
                className: newClass.trim(),
            }
            finalClassArray.push(cl);
        })

        console.log(userObj)
        
        userObj.classes = finalClassArray;
            addUser(userObj);

        
    })

    $("#getName").on("click", (e) =>{
        getUser();
    })
   
}

function addUser(user){
    $("#firstName").val("")
    $("#lastName").val("")
    $("#classes").val("")
    $("#pNumber").val("")
    $("#age").val("")
    $("#email").val("")
    let allUsers = JSON.parse(localStorage.getItem("Classes"));
    // console.log(user);
    allUsers.push(user);


    localStorage.setItem("Classes", JSON.stringify(allUsers));
}

function getUser(){
    $("#app").html("");
    let allUsers = JSON.parse(localStorage.getItem("Classes"));

    $.each(allUsers, (idx, user) =>{
        $("#app").append(`
        <div class="card">
        <p>Name: ${user.fname} ${user.lname} </p> 
        <p>Age: ${user.age}</p>
        <p>Phone Number: ${user.pNumber}</p>
        <p>Email: ${user.email}</p>
        Classes: 
        `)
        $.each(user.classes, (idx, cls) =>{
            $("#app").append(`
            <span>${cls.className}</span>
            `) 
        })
        $("#app").append(`</div><br><br>`)
    })
    console.log(localStorage.getItem("Classes"))
}

function connectToStorage(){
    if(localStorage){
        let Classes = localStorage.getItem("Classes");
        if(Classes){
            console.log("already there")
        }else{
            localStorage.setItem("Classes", "[]");
        }
        
    }else{
        console.log("pls help me")
    }
}
 
$(document).ready(function () {
initListeners();
connectToStorage();
});