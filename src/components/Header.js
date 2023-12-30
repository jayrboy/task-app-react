import "./Header.css";

export default function Header(props) {
  const { theme, setTheme } = props;

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <header>
      <div className="logo">
        <span>Task Management</span>
      </div>
      <div className="theme-container">
        <span>{theme === "light" ? "โหมดกลางวัน" : "โหมดกลางคืน"}</span>
        <span className="icon" onClick={toggleTheme}>
          สลับ
        </span>
      </div>
    </header>
  );
}
