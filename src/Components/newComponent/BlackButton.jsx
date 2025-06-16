export default function BlackButton({ btnText,handleClick }) {
  return <button className='w-full bg-[black] text-white py-2 rounded-md text-base my-1' onClick={()=>{handleClick();}}>{btnText}</button>;
}
