# Task Management Application

ภาพรวมการสร้าง Components

- การใช้ useState และการแสดงผล
  - deleteTask(id)
  - saveTask(event) //เพิ่ม และอัปเดตข้อมูลเมื่อเกิด event
  - editTask(id)
- การส่งค่าและรับค่า props
- Form & State
- การใช้ useEffect ตอบสนองตามตัวแปร state
- การเก็บข้อมูลลงใน Local Storage
- สร้าง state Theme
- การกดปุ่มสลับโหมด Toggle
- การกำหนด CSS Style
- กำหนด icon จาก react-icons

# 1. src/App.js

- เก็บข้อมูลทั้งหมด และส่ง props ไปยัง Components ย่อย

```js
import { useState, useEffect } from 'react'
import Header from './components/Header'
import AddForm from './components/AddForm'
import Item from './components/Item'
import './App.css'

function App() {
  const [tasks, setTask] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  ) // กำหนดข้อมูล state ลงใน Local Storage

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
```

- กำหนด src/App.css

```css
.App {
  min-height: 100vh;
}
.container {
  background-color: #fff;
  padding: 1.2rem;
  margin: 3rem auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  max-width: 65vh;
}

.light {
  background: white;
  color: #000;
  transition: all 500ms;
}
.dark {
  background: #15202b;
  color: #fff;
  transition: all 500ms;
}
```

# 2. components/Header.js

- กำหนด Theme แอปพลิเคชัน และเพิ่ม react-icons

```sh
npm install react-icons
```

```js
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs'
import './Header.css'

export default function Header(props) {
  const { theme, setTheme } = props

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <header>
      <div className="logo">
        <span>Task Management</span>
      </div>
      <div className="theme-container">
        <span>{theme === 'light' ? 'โหมดกลางวัน' : 'โหมดกลางคืน'}</span>
        <span className="icon" onClick={toggleTheme}>
          {theme === 'light' ? <BsSunFill /> : <BsMoonStarsFill />}
        </span>
      </div>
    </header>
  )
}
```

- กำหนด components/Header.css

```css
header {
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  font-weight: bold;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo {
  display: flex;
  align-items: center;
}

.logo span {
  font-size: 22px;
  margin-left: 7px;
}

.theme-container span {
  font-size: 20px;
  margin-bottom: 100px;
  cursor: pointer;
  margin-left: 10px;
}
.theme-container .icon {
  font-size: 15px;
}
```

# 3. components/AddForm.js

- เพิ่ม / แก้ไขข้อมูล

```js
import './AddForm.css'

export default function AddForm(props) {
  const { title, setTitle, saveTask, editId } = props
  return (
    <>
      <h2>แอปบริหารจัดการงาน</h2>
      <form onSubmit={saveTask}>
        <div className="form-control">
          <input
            type="text"
            className="text-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {editId ? 'อัพเดท' : 'เพิ่ม'}
          </button>
        </div>
      </form>
    </>
  )
}
```

- กำหนด components/AddForm.css

```css
h2 {
  font-size: 2rem;
  text-align: center;
  color: black;
  margin-top: 0.5rem;
}

.form-control {
  display: flex;
  justify-content: center;
}

.text-input {
  flex-grow: 1;
  padding: 5px 5px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  font-size: 18px;
}

.text-input:focus {
  outline: none;
}

.submit-btn {
  background: green;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  border: transparent;
}
```

# 4. Item.js

- จัดการข้อมูลแต่ละรายการ

```js
import './Item.css'
import { BiTrash, BiEdit } from 'react-icons/bi'

export default function Item(props) {
  const { data, deleteTask, editTask } = props
  return (
    <div className="list-item">
      <p className="title">{data.title}</p>
      <div className="button-container">
        <BiTrash className="btn" onClick={() => deleteTask(data.id)} />
        <BiEdit className="btn" onClick={() => editTask(data.id)} />
      </div>
    </div>
  )
}
```

```css
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0.25rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  border-radius: 0.25rem;
  font-size: 1.2rem;
}

.title {
  color: #000;
  font-weight: bold;
}

.btn {
  font-size: 1.2rem;
  margin-left: 0.8rem;
  cursor: pointer;
  color: #000;
}
```
