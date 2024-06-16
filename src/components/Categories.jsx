const Categories = ({ categories }) => {
  return (
    <div className="p-3 shadow-inner border-2 rounded-2xl">
      <h3 className="text-2xl mt-3 font-bold text-center">Categories</h3>
      <div className="mt-5 flex flex-col gap-3">
        {categories.map((category, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                className="cursor-pointer accent-rose-800"
                type="checkbox"
                value={category.name}
                key={index}
                id={category.name}
              />
              <label className="cursor-pointer" htmlFor={category.name}>
                {category.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
