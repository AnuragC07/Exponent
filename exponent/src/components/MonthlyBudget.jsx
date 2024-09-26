const MonthlyBudget = () => {
  return (
    <div className="flex flex-row justify-between mt-8">
      <div>
        <h1 className="text-3xl text-green-600 font-semibold"> 583 ₹</h1>
        <p className="text-lg text-stone-600 mt-1">Current August Monthly Budget</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Update Budget for August"
          className="border rounded-lg h-10 w-56 px-4 m-2"
        />
        <button className="border rounded-lg bg-stone-600 px-4 p-1 mt-10 h-10 text-white">
          Update 
        </button>
      </div>
    </div>
  );
};

export default MonthlyBudget;
