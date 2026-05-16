import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";

function Inventory({ products, setProducts }) {
  const [showForm, setShowForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    costPrice: "",
    sellPrice: "",
    quantity: "",
    barcode: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleBarcodeDetected(code) {
    setForm({ ...form, barcode: code });
    setShowScanner(false);
    setShowForm(true);
  }

  function handleAddProduct() {
    if (!form.name || !form.sellPrice || !form.quantity) {
      alert("Please fill in at least Name, Selling Price and Quantity.");
      return;
    }
    const newProduct = { id: Date.now(), ...form };
    setProducts([...products, newProduct]);
    setForm({
      name: "",
      category: "",
      costPrice: "",
      sellPrice: "",
      quantity: "",
      barcode: "",
    });
    setShowForm(false);
  }

  return (
    <div>
      {/* Scanner */}
      {showScanner && (
        <BarcodeScanner
          onDetected={handleBarcodeDetected}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Page Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-green-700">📦 Inventory</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowScanner(true)}
            className="bg-green-100 text-green-700 text-sm px-3 py-2 rounded-xl font-semibold shadow"
          >
            📷 Scan
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-700 text-white text-sm px-4 py-2 rounded-xl font-semibold shadow"
          >
            {showForm ? "Cancel" : "+ Add"}
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow p-4 mb-4 border border-green-100">
          <h3 className="font-bold text-green-700 mb-3">New Product</h3>
          <div className="flex flex-col gap-3">
            {form.barcode && (
              <div className="bg-green-50 rounded-xl px-3 py-2 text-xs text-green-700 font-semibold">
                📷 Barcode: {form.barcode}
              </div>
            )}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name *"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-400"
            />
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category (e.g. Drinks, Snacks)"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-400"
            />
            <div className="flex gap-2">
              <input
                name="costPrice"
                value={form.costPrice}
                onChange={handleChange}
                placeholder="Cost Price (GH₵)"
                type="number"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-1/2 focus:outline-none focus:border-green-400"
              />
              <input
                name="sellPrice"
                value={form.sellPrice}
                onChange={handleChange}
                placeholder="Sell Price (GH₵) *"
                type="number"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-1/2 focus:outline-none focus:border-green-400"
              />
            </div>
            <input
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Quantity in Stock *"
              type="number"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-400"
            />
            <button
              onClick={handleAddProduct}
              className="bg-green-600 text-white py-2 rounded-xl font-bold text-sm mt-1"
            >
              Save Product
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      {products.length === 0 ? (
        <div className="text-center text-gray-400 mt-16">
          <p className="text-5xl mb-3">📦</p>
          <p className="font-semibold">No products yet</p>
          <p className="text-sm">Tap "+ Add" or "📷 Scan" to get started</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow px-4 py-3 border border-green-50 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-gray-800">{p.name}</p>
                <p className="text-xs text-gray-400">{p.category || "Uncategorized"}</p>
                <p className="text-xs text-green-600 font-semibold mt-1">
                  GH₵ {p.sellPrice} &nbsp;·&nbsp; Qty: {p.quantity}
                </p>
                {p.barcode && (
                  <p className="text-xs text-gray-300 mt-0.5">#{p.barcode}</p>
                )}
              </div>
              <div>
                {p.quantity <= 5 && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                    Low Stock
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inventory;