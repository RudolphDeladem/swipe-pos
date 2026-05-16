function Header() {
  return (
    <div className="bg-green-700 text-white px-4 py-4 flex items-center justify-between shadow-md">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Swipe</h1>
        <p className="text-green-200 text-xs">Smart POS & Inventory</p>
      </div>
      <div className="bg-green-500 rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold">
        S
      </div>
    </div>
  );
}

export default Header;