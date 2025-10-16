export default function Table({ children }) {
  return (
    <div className="min-h-[36rem] overflow-auto rounded-md shadow-lg border border-gray-300 bg-gray-100">
      <table className=" w-full">{children}</table>
    </div>
  );
}
