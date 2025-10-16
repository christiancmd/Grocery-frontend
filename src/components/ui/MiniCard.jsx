export default function MiniCard({ title, value, icon, bg }) {
  return (
    <div
      className={`${bg} relative rounded-lg min-h-24 p-4 shadow-sm hover:shadow-md hover:shadow-black transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white font-bold uppercase tracking-wide">
            {title}
          </p>
          <p className="text-xl lg:text-lg font-bold  text-white mt-1">
            {value}
          </p>
        </div>
        <div className="w-8 h-8 absolute bottom-2 right-2 rounded-full flex items-center justify-center">
          <span className=" text-sm font-bold">{icon}</span>
        </div>
      </div>
    </div>
  );
}
