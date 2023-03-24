export default function Card(props) {
  return (
    <div
      className={
        " bg-white border border-gray-200 rounded-sm m-2 shadow-md " +
        props.className
      }>
      {props.children}
    </div>
  );
}
