export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-40">
      <div className="w-10 h-10 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
      <span className="text-white">Loading...</span>
    </div>
  );
}
