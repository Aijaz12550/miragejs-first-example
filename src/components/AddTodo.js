import React, { useState, useEffect, Fragment, useCallback } from "react";
let baseUrl ='/fakeapi'
const AddTodo = () => {

    const [todos, setTodos] = useState([])
    let [update, setUpdate] = useState()

  const addTodoHandler = (e) => {
    e.preventDefault();
        fetch(`${baseUrl}/addTodo`, {
            method: "POST",
            body: {id:Math.floor(Math.random()*999999), name: e.target.txt.value },
        }).then((res)=>{
        })
  };

  const getData = () => {
    fetch(`${baseUrl}/users`)
    .then((res) => res.json())
    .then((json) => {
        console.log('=>',json)
        setTodos(json.users)
    });
  }

  const updateTodo = (e) => {
      e.preventDefault()
      fetch(`${baseUrl}/update/${update.id}`, {
        method: "PUT",
        body: { name: e.target.update.value },
    });
    setUpdate(null)
  }

  const deleteTodo = (id) => {
      fetch(`${baseUrl}/delete/${id}`,{
          method:"DELETE"
      }).then(res => {
          console.log("delete response",res)
      }).catch(error => {
          console.log('delete error',error)
      })
  }
  useEffect(()=>{
    fetch(`${baseUrl}/users`)
    .then((res) => res.json())
    .then((json) => {
        console.log('=>',json)
        setTodos(json.users)
    });
  },[])
  return (
      <Fragment>

          {
              update
              ?
              <form onSubmit={updateTodo}>
              <textarea required name="update" value={update.name} onChange={(e)=>{
                  console.log('e',e.target.value)
                  update.name = e.target.value
                  setUpdate({...update})
              }}  />
              <button>update</button>
            </form>
            :


    <form onSubmit={addTodoHandler}>
      <textarea required name="txt" />
      <button>Add</button>
    </form>
          }
    <button onClick={getData}>Get</button>
    {
        todos?.map((val,key)=>{
            console.log('val',val)
            return(
                <div key={key}>
                    <span>

                {val.name}
                    </span>
                    <button onClick={()=>deleteTodo(val.id)}>delete</button>
                    <button onClick={()=>setUpdate(val)}>update</button>

                </div>
            )
        })
    }
      </Fragment>
  );
};
export default AddTodo;
