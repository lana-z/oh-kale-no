function CustomCheckbox({ label, emoji, checked, onChange, labelClassName }) {
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={onChange}
    >
      {checked ? (
        <span className="text-2xl">{emoji}</span> // Display emoji when checked
      ) : (
        <div className="w-5 h-5 border-2 border-green-600 rounded-full flex items-center justify-center bg-white">
          {/* Empty circle for the checkbox */}
        </div>
      )}
      <span className={`${labelClassName} ${checked ? 'text-gray-500' : ''}`}>
        {label}
      </span>
    </div>
  );
}

export default CustomCheckbox;
