const StylishLoader = ({ size = 'md', color = 'indigo' }) => {
    const sizeClasses = {
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-16 h-16',
    };
  
    const colorClasses = {
      indigo: 'text-indigo-500',
      blue: 'text-blue-500',
      green: 'text-green-500',
      red: 'text-red-500',
      purple: 'text-purple-500',
    };
  
    return (
      <div className={`inline-flex items-center justify-center ${sizeClasses[size]}`}>
        <svg
          className={`animate-spin ${colorClasses[color]}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  };
  

  
  export default StylishLoader;