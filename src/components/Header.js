import "./Header.css";

export default function Header(props) {
  const { theme, setTheme } = props;

  return (
    <header>
      <div className="logo">
        <span>Task Management</span>
      </div>
      <div className="theme-container">
        <span>{theme === "light" ? "โหมดกลางวัน" : "โหมดกลางคืน"}</span>
        <span className="icon">สลับ</span>
      </div>
    </header>
  );
}
