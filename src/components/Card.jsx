function CustomCard({ title, content }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 m-5">
        <div className="text-center mb-2">
          <h5 className="text-xl font-bold">{title}</h5>
        </div>
        <div>
          <p className="text-base">{content}</p>
        </div>
      </div>
    );
  }
  
  export default CustomCard;
  