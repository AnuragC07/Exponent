const TransactionDetail = ({ date, source, category, type, amount }) => {

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getUTCFullYear();
        
        return `${day}-${month}-${year}`;
      };
    
      const formattedDate = formatDate(date);


    return (
      <div className="grid grid-cols-4 gap-4 border w-full p-4 items-center">
        <p className="text-stone-600">{formattedDate}</p>
        <p className="text-stone-600">{source}</p>
        <p className="text-stone-600">{category}</p>
        <h1
          className={`text-xl font-semibold ${
            type === "earning" ? "text-green-600" : "text-red-500"
          }`}
        >
          {amount}
        </h1>
      </div>
    );
  };
  
  export default TransactionDetail;