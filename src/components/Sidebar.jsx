const Sidebar = ({ categories }) => {
  return (
    <div className="p-3 shadow-xl rounded-2xl">
      <h3 className="text-2xl mt-3 font-bold text-center">Categories</h3>
      <div className="mt-5 flex flex-col gap-3">
        {categories.map((category, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                value={category}
                key={index}
                id={category}
              />
              <label className="cursor-pointer" htmlFor={category}>
                {category}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
