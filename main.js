var courseName=document.getElementById("courseName");
var courseCat=document.getElementById("courseCat");
var coursePrice=document.getElementById("coursePrice");
var courseDesc=document.getElementById("courseDesc");
var addBtn = document.getElementById("click");
var data = document.getElementById("data");
var courses ;
var nameAlert = document.getElementById("nameAlert");
var currentIndex;
if(localStorage.getItem("coursesList") == null){
     courses = [] ;
}else{
    courses = JSON.parse(localStorage.getItem("coursesList"));
    displayData();
}
addBtn.onclick = function(){
    if(addBtn.innerHTML=='Add Course'){
        addCourse();
    }else{
      updateCourse();
      addBtn.innerHTML ="Add Course";
    }
    
   //read
   displayData();
   //clear
   clear();
} 
function addCourse(){
    var course = {
        name:courseName.value,
        cat:courseCat.value,
        price:coursePrice.value,
        desc:courseDesc.value
     };
     courses.push(course);
     localStorage.setItem("coursesList",JSON.stringify(courses));
     Swal.fire({
      position: 'top-end',
      icon: 'success',
     title: 'course added successfully',
     showConfirmButton: false,
     timer: 2500
})
}
function displayData(){
    var result = "";
    for(var i=0;i<courses.length;i++){
        result += `<tr>
          <td>${i}</td>
          <td>${courses[i].name}</td>
          <td>${courses[i].cat}</td>
          <td>${courses[i].price}</td>
          <td>${courses[i].desc}</td>
          <td> <button onclick="getCourseData(${i})" class="btn btn-outline-info">update</button>
            <button onclick="deleteCourse(${i})" class="btn btn-outline-danger">delete</button>
          </td>
        </tr>`; 
    }
    data.innerHTML=result;
}
function clear(){
    courseName.value = "";
   courseCat.value = "";
   coursePrice.value = "";
   courseDesc.value = "";
}
//deleteCourse
function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        
        if (result.isConfirmed) {
            courses.splice(index,1);
          localStorage.setItem("coursesList",JSON.stringify(courses));
          displayData();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}
 // delete all
deleteBtn.onclick=function(){
    localStorage.removeItem('coursesList');
    courses=[];
    data.innerHTML="";
}
//search
function search(e){
    var result = "";
    for(var i=0;i<courses.length;i++){
        if(courses[i].name.toLowerCase().includes(e.toLowerCase())){

            result += `<tr>
                <td>${i}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].cat}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].desc}</td>
                <td> <button class="btn btn-outline-info">update</button>
                   <button onclick="deleteCourse(${i})" class="btn btn-outline-danger">delete</button>
                </td>
            </tr>`; 
        }
    }
    data.innerHTML=result; 
}
 //give the data
function getCourseData(index){
    var course = courses[index];
    courseName.value=course.name
    courseCat.value=course.cat
    coursePrice.value=course.price
    courseDesc.value=course.desc
    addBtn.innerHTML='update course';
    currentIndex=index;
}
//update the data
function updateCourse(index){
    
    var course = {
        name:courseName.value,
        cat:courseCat.value,
        price:coursePrice.value,
        desc:courseDesc.value
     };
     courses[currentIndex].name = course.name;
     courses[currentIndex].cat = course.cat;
     courses[currentIndex].price = course.price;
     courses[currentIndex].desc = course.desc;
     localStorage.setItem("coursesList",JSON.stringify(courses));
}

courseName.onkeyup = function(){
    var namePattern = /^[A-Z][a-z]{2,8}$/;
    if(namePattern.test(courseName.value)){
        addBtn.removeAttribute("disabled");
        courseName.classList.add('is-valid');
        courseName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    }else{
        addBtn.setAttribute("disabled","disabled");
        courseName.classList.replace('is-valid','is-invalid');
        nameAlert.classList.add('d-block');
        nameAlert.classList.remove('d-none');
    }
}