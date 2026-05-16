function Analytics({ products, sales }) {
  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const totalProfit = sales.reduce((sum, sale) => {
    const profit = sale.items.reduce((s, item) => {
      const cost = parseFloat(item.costPrice || 0);
      const sell = parseFloat(item.sellPrice || 0);
      return s + (sell - cost) * item.qty;
    }, 0);
    return sum + profit;
  }, 0);

  const totalSales = sales.length;

  const bestSellers = () => {
    const counts = {};
    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        counts[item.name] = (counts[item.name] || 0) + item.qty;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const lowStock = products.filter((p) => parseInt(p.quantity) <= 5);

  return (
    <div>
      <h2 className="text-xl font-bold text-green-700 mb-4">📊 Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl shadow p-4 border border-green-50">
          <p className="text-xs text-gray-400 mb-1">Total Revenue</p>
          <p className="text-xl font-bold text-green-700">
            GH₵ {totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 border border-green-50">
          <p className="text-xs text-gray-400 mb-1">Net Profit</p>
          <p className="text-xl font-bold text-green-600">
            GH₵ {totalProfit.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 border border-green-50">
          <p className="text-xs text-gray-400 mb-1">Total Sales</p>
          <p className="text-xl font-bold text-gray-700">{totalSales}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 border border-green-50">
          <p className="text-xs text-gray-400 mb-1">Products</p>
          <p className="text-xl font-bold text-gray-700">{products.length}</p>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4">
          <p className="font-bold text-red-600 mb-2">⚠️ Low Stock Alerts</p>
          {lowStock.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center py-1"
            >
              <p className="text-sm text-gray-700">{p.name}</p>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                {p.quantity} left
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Best Sellers */}
      <div className="bg-white rounded-2xl shadow p-4 border border-green-50 mb-4">
        <p className="font-bold text-gray-700 mb-3">🏆 Best Sellers</p>
        {bestSellers().length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-2">
            No sales recorded yet
          </p>
        ) : (
          bestSellers().map(([name, qty], index) => (
            <div
              key={name}
              className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-700 font-bold text-sm">
                  #{index + 1}
                </span>
                <span className="text-sm text-gray-700">{name}</span>
              </div>
              <span className="text-xs font-bold text-green-600">
                {qty} sold
              </span>
            </div>
          ))
        )}
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-2xl shadow p-4 border border-green-50">
        <p className="font-bold text-gray-700 mb-3">🧾 Recent Sales</p>
        {sales.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-2">
            No sales yet
          </p>
        ) : (
          [...sales].reverse().slice(0, 5).map((sale, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
            >
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {sale.items.length} item(s)
                </p>
                <p className="text-xs text-gray-400">{sale.payment}</p>
              </div>
              <span className="text-green-700 font-bold text-sm">
                GH₵ {sale.total.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Analytics;