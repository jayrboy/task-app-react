import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import AddForm from './components/AddForm'
import Item from './components/Item'

function App() {
  const [tasks, setTask] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  )
  const [title, setTitle] = useState('')
  const [editId, setEditId] = useState(null)
  const [theme, setTheme] = useState('light')

  // useEffect รูปแบบ 3 การตอบสนองตามตัวแปร state [tasks] เมื่อค่าเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function deleteTask(id) {
    const result = tasks.filter((item) => item.id !== id)
    setTask(result)
  }

  function saveTask(e) {
    e.preventDefault()
    if (!title) {
      alert('กรุณาป้อนข้อมูล')
    } else if (editId) {
      // อัพเดทข้อมูล
      const updateTask = tasks.map((item) => {
        // รายการใดมีรหัสตรงกับรหัสแก้ไข
        if (item.id === editId) {
          return { ...item, title: title }
        }
        return item
      })
      setTask(updateTask)
      setEditId(null)
      setTitle('')
    } else {
      // เพิ่มรายการใหม่
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: title,
      }
      setTask([...tasks, newTask])
      setTitle('')
    }
  }

  function editTask(id) {
    setEditId(id)
    const editTask = tasks.find((item) => item.id === id)
    setTitle(editTask.title)
  }

  return (
    <div className={'App ' + theme}>
      <Header theme={theme} setTheme={setTheme} />
      <div className="container">
        <AddForm
          title={title}
          setTitle={setTitle}
          saveTask={saveTask}
          editId={editId}
        />
        <section>
          {tasks.map((data) => (
            <Item
              key={data.id}
              data={data}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </section>
      </div>
    </div>
  )
}

export default App
