const MonthlyBudget = () => {
  return (
    <div className="flex flex-row justify-between mt-8">
      <div>
        <h1 className="text-3xl text-green-600 font-semibold"> 583 ₹</h1>
        <p className="text-lg text-stone-400 mt-1">August Monthly Budget</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Update Budget for August"
          className="rounded-lg h-10 w-56 px-4 m-2 bg-stone-800 text-stone-200 placeholder:text-stone-500"
        />
        <button className="rounded-lg bg-stone-700 px-4 p-1 mt-10 h-10 text-white">
          Update 
        </button>
      </div>
    </div>
  );
};

export default MonthlyBudget;
