const Container = (props) => {
  return (
    <div className='container mx-auto mt-48 w-2/4 overflow-hidden rounded-2xl shadow-md shadow-black/40 ring-black/40'>
      {props.children}
    </div>
  )
}

export default Container
