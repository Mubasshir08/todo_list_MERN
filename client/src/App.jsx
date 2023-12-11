import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState('');
  const [updateTaskValue, setUpdateTaskValue] = useState('');
  // let count = 0

 const editBtn = (e) => {
  e.target.style.display = 'none'; 
  document.getElementById('updateInput').style.display = 'inline-block'; 
  document.getElementById('taskName').style.display = 'none';
  document.getElementById('updateOk').style.display = 'inline-block'; 
  document.getElementById('abortBtn').style.display = 'none'; 
  document.getElementById('updateAbortBtn').style.display = 'inline-block';
 };

 const updateAbortBtn = (e) => {
  e.target.style.display = 'none'; 
  document.getElementById('taskName').style.display = 'block'; 
  document.getElementById('updateInput').style.display= 'none'; 
  document.getElementById('editBtn').style.display = 'block'; 
  document.getElementById('updateOk').style.display = 'none';
  document.getElementById('abortBtn').style.display = 'inline-block'; 
 };

 useEffect(() => {
  axios.get('https://todo-list-backend-lilac.vercel.app/tasks')
  .then(response => {
    setData(response.data);
    // console.log(response.data)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
},[])

// console.log(task)

 const createTask = () => {
  if(task){
    axios.post('https://todo-list-henna-beta.vercel.app/createTask', {task})
    .then(res => setData([...data ,res.data]))
    .catch(error => {
     console.error('Error posting data:', error);
   });
   setTask('');
  }
  else{
    document.getElementById('taskInput').placeholder = 'Invalid Task'
  }
 };

 const deleteTask = (id) => {
  axios.post('https://todo-list-henna-beta.vercel.app/deleteTask', {id})
  .then(res => setData(res.data))
  .catch(error => {
   console.error('Error posting data:', error);
 });
 };

 const updateTask = (id) => {
  if(updateTaskValue){
  axios.post('https://todo-list-henna-beta.vercel.app/updateTask', {id, task:updateTaskValue})
  .then(res => setData(res.data))
  .catch(error => {
   console.error('Error posting data:', error);
 });
 document.getElementById('updateInput').style.display= 'none';
 document.getElementById('updateOk').style.display = 'none';
 document.getElementById('taskName').style.display = 'block';
 setUpdateTaskValue('');
 }
 else{
    document.getElementById('updateInput').placeholder = 'Invalid Task'
 }
};


  return (
    <section className='container mx-auto mt-10'>
        <div className='text-center'>
            <label className='text-white'>
            Add Task : <input id='taskInput' type="text" className= 'text-black border-solid border-black border-2 focus:outline-none' value={task}  onChange={e => {setTask(e.target.value)}}/>
              </label> 
            <button className='text-lg' onClick={() => createTask()}>✅</button>
          </div> 
    {
      data.map(dt => (
        <div className='mt-10 w-1/3 mx-auto  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-lg p-5 backdrop-blur-md' key={dt._id}>
        <h3 id='taskName' className='text-white text-lg'>{dt.taskName}</h3>
        <input id='updateInput' value={updateTaskValue} onChange={e => {setUpdateTaskValue(e.target.value)}} type="text" className='text-white border-white border-b-2 border-solid focus:outline-none bg-transparent hidden'/>

        <div className='flex gap-5 text-lg'>
            <button id='abortBtn' className='' onClick={() => deleteTask(dt._id)}>⛔</button>
            <button id='updateAbortBtn' className='hidden' onClick={(e) => updateAbortBtn(e)}>⛔</button>
            <button id='editBtn' onClick={(e) => editBtn(e)}>✒</button>
            <button id='updateOk' className='hidden'  onClick={() => updateTask(dt._id)}>✅</button>
        </div>
      </div>
      ))
    }
    </section>
  )
}

export default App
