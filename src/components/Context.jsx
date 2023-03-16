import React,{useState, useEffect} from "react";
import TaskCreator from "./TaskCreator";
import "./context.css";

function Context() {
  const [taskItem, setTaskItem] = React.useState([]);
  const [taskDone, setTaskDone] = React.useState([]);

  //crear tarea
  function CreateNewTask(taskImported){

    if(taskItem.find((item) => item.task === taskImported)){
    }else{
      setTaskItem([...taskItem, {id: taskItem.length + 1, task: taskImported, done: false}])
    }
  }
  //para cargar el localStorage al inicio
  useEffect(() => {
    const taskStorage = JSON.parse(localStorage.getItem("task"));
    const taskDoneStorage = JSON.parse(localStorage.getItem("taskDone"));
    if(taskStorage){
      setTaskItem(taskStorage);
      setTaskDone(taskDoneStorage);
    }
  }, [])
//para guardar el localStorage
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskItem));
    localStorage.setItem("taskDone", JSON.stringify(taskDone));
  }, [taskItem, taskDone])
//borrar tarea
  function trash(taskId){
    //console.log('basura ' + taskId);
    if(taskItem.find((item) => item.id === taskId)){
      const taskFilter = taskItem.filter((item) => item.id !== taskId);
      setTaskItem(taskFilter);
    }
  }

  //function toggle task
  function toggleTask(taskId){
    console.log('toggle ' + taskId);
    if(taskItem.find((item) => item.id === taskId)){
      setTaskDone([...taskDone, {id: taskDone.length + 1, task: taskId, done: true}])
    }
  }


  return (
    <div className="mainContext">
      <TaskCreator CreateNewTask={CreateNewTask} title={'desde Context'}/>
      <div className="taskList">
        <h2>Lista de Tareas</h2>
        <ul>
          {
            taskItem.map((item) => (
              <li key={item.id}>
                {item.task}
                <div className="optionsTask">
                  <input name="" type="checkbox" value="" className="form-imagecheck-input" 
                    onChange={(e)=>{
                                    let chequeado = e.target.checked;
                                    if(chequeado){
                                      console.log('chequeado');
                                      toggleTask(item.id)
                                    }else{
                                      console.log('deschequeado');
                                    }
                                    
                                  }
                              }/>
                  <img src="https://unpkg.com/@tabler/icons@2.10.0/icons/trash.svg" className="trash" onClick={()=>{trash(item.id)}}/>
                </div>
              </li>
          ))}
        </ul>

    </div>
    </div>
  );
}


export default Context;


/**
 * <table>
      <thead>
          <tr>
            <th>Id</th>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {
            taskItem.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.task}
                </td>
              </tr>
          ))}
        </tbody>
      </table> 
 * 
 */