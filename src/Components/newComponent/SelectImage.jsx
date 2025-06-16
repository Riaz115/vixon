export default function SelectImage({ title, description, dropDown }) {
  return (
    <>
      {title && <Heading_Description heading={title} />}
      {dropDown && <DropDown />}
      <label htmlFor='active-stamps'>
        <div className='mt-2 py-3 px-4 flex justify-between items-center border-dashed border-2 border-gray-300 rounded-md'>
          <img src='/assets/dragAndDrop.png' alt='drag and drop' className='w-[35px]' />
          <div className='bg-black py-2 px-4 text-xs w-max text-white rounded'>Select file</div>
        </div>
      </label>
      <div className='text-xs text-center mt-2 text-gray-500'>{description}</div>
    </>
  );
}
