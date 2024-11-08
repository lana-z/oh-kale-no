function CustomProgress({ value, max }) {
    const progress = (value / max) * 100;
  
    return (
      <div className="w-full mt-4">
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-700 via-green-400 to-green-300 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-sm font-semibold">
          {value} of {max} healthy choices completed! 🥦
        </p>
      </div>
    );
  }
  
  export default CustomProgress;
  