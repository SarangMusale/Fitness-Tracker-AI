function Navbar() {
  return (
    <nav className="w-full h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
      
      <h1 className="text-2xl font-bold text-cyan-400">
        TrainOS
      </h1>

      <button className="bg-cyan-500 hover:bg-cyan-400 transition px-4 py-2 rounded-lg font-semibold text-slate-900">
        Profile
      </button>

    </nav>
  );
}

export default Navbar;
