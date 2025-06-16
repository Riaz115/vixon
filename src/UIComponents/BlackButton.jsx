export default function BlackButton({ btnText , handelCLick }) {
  return <button 
  onClick={handelCLick}
   className='w-full bg-[black] text-white py-3 rounded-md text-base my-1'>{btnText}</button>;
}
