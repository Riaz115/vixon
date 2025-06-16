

const Alertmessage = ({ message,setMessage,setBarCodeData }) => {

  return (
    <div className="fixed inset-0 mx-4 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={() =>{ 
            setBarCodeData()
            setMessage()}}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Alertmessage;
