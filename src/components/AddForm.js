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
