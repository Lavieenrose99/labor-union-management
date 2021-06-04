/*
 * @Author: your name
 * @Date: 2021-05-30 15:41:17
 * @LastEditTime: 2021-06-01 14:53:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/pages/test/index.tsx
 */
import React,{useState} from 'react';
// import './App.scss' ;
function Todo({todo,index,completeTodo,removeTodod})
{
    return <div class="todo-list" style={{textDecoration:todo.isCompleted?'line-through':''}}>
        {todo.text}
        <button onClick={()=>{completeTodo(index)}}>完成</button>
        <button onClick={()=>{completeTodo(index)}}>X</button>
    </div>
}
function TodoForm({addTodo}){
    const[value,setvalue]=useState('')
    const handleSubmit=e=>{
        e.preventDefault() ;
        if(!value) return ;
        addTodo(value) ;
        setvalue('')
    }
    return <form onSubmit={handleSubmit}>
        <input type="text" placeholder="add todo ..." value={value} onChange={e=>setvalue(e.target.value)}></input>
    </form>
}
function App()
{
    const [todo,setTodos] = useState([
        {text:'sleep',isCompleted:true},
        {text:'eat',isCompleted:false} 
    ])
    const addTodo=text=>{
        const newTodos=[...todos,text]
        setTodos(newTodos)
    }
    const completeTodo=index=>{
        const newTodos = [...todos]
        newTodos[index].isCompleted= true;
        setTodos(newTodos)
    }
    const removeTodod=index=>{
        const newTodos = [...todos]
        newTodos.splice[index,1]
        setTodos(newTodos)
    }
    return(
        <div className="App">
            <h1>todos</h1>
            <div className="todo-list">
                {
                    todo.map((todo,index)=>{
                        return <Todo key={index} todo={todo}index={index} completeTodo={completeTodo} removeTodod={removeTodod}></Todo>
                    })
                }
                <TodoForm addTodo={addTodo}></TodoForm>
            </div>
        </div>
    )
}

export default App