const url="http://localhost:3000"

const showAllTasks=()=>{
  const postData={
      method:"GET"
  } 
  

  fetch('getTask',postData)
  .then(response => response.json())
  .then(data => {
      console.log(data,"sagar")

    const taskListContainer = document.getElementById('taskList');

    // Clear the previous content
    taskListContainer.innerHTML = '';

    // Display each task with a radio button
    data.forEach(task => {
      
      const taskDiv = document.createElement('div');
    
      taskDiv.innerHTML = `
      <input type="checkbox" name="taskCheckbox" value="${task.ids}" />${task.task}
      <img style="width:40px;height:35px" src="${task.ids}">
      `;
      taskListContainer.appendChild(taskDiv);
    });

    // Add a complete button
    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.onclick = deleteCompletedTask;
    taskListContainer.appendChild(completeButton);
  })
  .catch(error => console.error('Error getting tasks:', error));



}

// document.getElementById("savetask").addEventListener("click", ()=>{
//     let data=document.getElementById("task").value
//     document.getElementById("task").value=""
//     console.log(data)
//     const dataToSend={
//        task:data
//     }
    
//     const postData={
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },

//         body: JSON.stringify(dataToSend)
//     }

//     fetch(`${url}/sendTask`,postData)
//     .then(response =>{
//         console.log(response.json())
//     })
// }) 

document.getElementById("showtask").addEventListener("click",showAllTasks ) 



 

  // Function to delete the completed tasks
function deleteCompletedTask() {
  const selectedCheckboxes = document.querySelectorAll('input[name="taskCheckbox"]:checked');
  
  console.log(selectedCheckboxes)
  


  if (selectedCheckboxes.length > 0) {
    const taskIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
    
    //Make a DELETE request to the server to delete the tasks
    fetch("/deleteTasks", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskIds })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Reload the task list after deleting the tasks
        showAllTasks();
      })
      .catch(error => console.error('Error deleting tasks:', error));
  } else {
    console.log('No tasks selected.');
}
}