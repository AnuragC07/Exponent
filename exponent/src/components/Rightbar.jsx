const Rightbar = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 w-72 h-96 p-4">
        <section className="flex gap-4 justify-center">
          <section className="border h-24 w-28 rounded-3xl justify-center items-center flex flex-col shadow-md ">
            <h1 className="text-2xl text-green-600 font-semibold">8.4</h1>
            <p className="text-xs text-stone-500 mt-2"> Exponent Score</p>
          </section>
          <section className="border h-24 w-32 rounded-3xl justify-center items-center flex flex-col shadow-md ">
            <h1 className="text-xl text-green-700 font-semibold">Healthy</h1>
            <p className="text-xs text-stone-500 mt-2">Financial Habit</p>
          </section>
        </section>
        <section className="border border-stone-300 w-full rounded-3xl p-4 px-8 mt-4">
          <h1 className="text-lg">Recent Inflow</h1>
          <h1 className="text-green-500 text-2xl font-semibold">213 ₹</h1>
          <p className="text-xs text-stone-400">from gpay</p>
        </section>
        <section className="border border-stone-300 w-full rounded-3xl p-4 px-8 ">
          <h1 className="text-lg">Recent Outflow</h1>
          <h1 className="text-red-400 text-2xl font-semibold">53 ₹</h1>
          <p className="text-xs text-stone-400">from gpay</p>
        </section>
      </div>
    </div>
  );
};

export default Rightbar;
