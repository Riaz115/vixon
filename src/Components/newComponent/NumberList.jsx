export default function NumberList({ heading, number }) {
  const items = [];

  for (let i = 0; i < number; i++) {
    items.push(
      <div
        key={Math.random(10000)}
        className='text-sm bg-black w-[39px] h-[39px] flex items-center justify-center rounded-full text-white'
      >
        {i + 1}
      </div>
    );
  }
  return (
    <>
      <div className='pt-8 pb-12 border-b border-gray-300'>
        <span className='text-lg font-medium'>{heading}</span>
        <div className='flex gap-1 my-2 flex-wrap mt-3'>{items}</div>
      </div>
    </>
  );
}
