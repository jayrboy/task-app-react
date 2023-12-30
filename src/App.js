import "./App.css";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import Item from "./components/Item";
import { useState } from "react";

function App() {
  const [task, setTask] = useState([
    { id: 1, title: "แก้บั๊คโปรแกรม" },
    { id: 2, title: "คู่มือการใช้งาน" },
    { id: 3, title: "กดเงินธนาคาร" },
  ]);

  const [title, setTitle] = useState("");

  function deleteTask(id) {
    const result = task.filter((item) => item.id !== id);
    setTask(result);
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <AddForm title={title} setTitle={setTitle} />
        <section>
          {task.map((data) => (
            <Item key={data.id} data={data} deleteTask={deleteTask} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
