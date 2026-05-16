function BottomNav({ activePage, setActivePage }) {
  const tabs = [
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "sell", label: "Sell", icon: "🛒" },
    { id: "analytics", label: "Analytics", icon: "📊" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 shadow-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActivePage(tab.id)}
          className={`flex flex-col items-center px-6 py-1 rounded-xl transition-all ${
            activePage === tab.id
              ? "text-green-700 font-bold"
              : "text-gray-400"
          }`}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default BottomNav;