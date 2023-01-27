const Container = (props) => {
  return (
    <div className='container absolute top-1/3 left-1/4 max-w-xl -translate-y-2/4 overflow-hidden rounded-2xl shadow-md shadow-black/40 ring-black/40'>
      {props.children}
    </div>
  )
}

export default Container
