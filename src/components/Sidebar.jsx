const Sidebar = ({ categories }) => {
  return (
    <div className="p-3">
      <h3 className="text-2xl font-bold text-center">Categories</h3>
      <div className="mt-5">
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
