import React from "react";
import './taskCreator.css';

function TaskCreator(props) {
  const [valorInput, setValorInput] = React.useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    if( valorInput !== ""){
      props.CreateNewTask(valorInput);
    }
    else{
      console.log("No se puede agregar una tarea vacia");
      
    }
    //localStorage.setItem("task", valorInput);
    setValorInput("");
  };

  return (
    <div className="taskCreator">
      <h2>Nueva Tarea</h2>
        <form onSubmit={handlerSubmit}>
          <input
            type="text"
            value={valorInput}
            placeholder="enter a new Task"
            onChange={(e) => {
              setValorInput(e.target.value);
            }}
          />
          <button>Save Task</button>
        </form>
    </div>
  );
}

export default TaskCreator;
