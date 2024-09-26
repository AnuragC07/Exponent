
const Tab = (props) => {
  return (
    <div className="rounded-md border border-stone-200 cursor-pointer px-2 m-4 h-8 flex justify-center items-center">
        <h1 className="text-stone-500">{props.content}</h1>
    </div>
  )
}



export default Tab