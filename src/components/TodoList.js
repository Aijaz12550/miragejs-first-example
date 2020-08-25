import  React from 'react'


const TodoList = () => {
    return ["hello","hello"]?.map((val,key)=>{
        return(
            <div key={key}>
                {val}
            </div>
        )
    })
}
export default TodoList