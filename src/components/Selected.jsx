const Selected = ({ value, onChange }) => {
  return (
    <select
      className='mb-2 h-12 rounded-md border-slate-200 text-slate-500 focus:border-slate-800 focus:ring-0'
      value={value}
      onChange={onChange}
    >
      <option value=''>All tasks</option>
      <option value='true'>Pending tasks</option>
      <option value='false'>Completed tasks</option>
    </select>
  )
}

export default Selected
