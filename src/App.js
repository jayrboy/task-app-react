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

  return (
    <div className="App">
      <Header />
      <div className="container">
        <AddForm />
        <Item />
      </div>
    </div>
  );
}

export default App;
