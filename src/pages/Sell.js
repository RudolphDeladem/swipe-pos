import { useState, useEffect, useRef } from "react";
import Quagga from "quagga";

function Sell({ products, setProducts, sales, setSales }) {
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("Cash");
  const [receipt, setReceipt] = useState(false);
  const [search, setSearch] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);
  const scannerRef = useRef(null);
  const quaggaRunning = useRef(false);
  const detectedCodes = useRef([]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function normalizeBarcode(code) {
    return code ? code.toString().trim() : "";
  }

  function showFlash(message, type = "success") {
    setFlashMessage({ message, type });
    setTimeout(() => setFlashMessage(null), 2000);
  }

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showFlash("✅ " + product.name + " added!");
    setSearch("");
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function changeQty(id, delta) {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.sellPrice) * item.qty,
    0
  );
 // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!scannerRef.current) return;

    const timer = setTimeout(() => {
      if (quaggaRunning.current) return;

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              facingMode: "environment",
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
          },
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "code_128_reader",
              "code_39_reader",
              "upc_reader",
              "upc_e_reader",
            ],
            multiple: false,
          },
          locate: true,
          frequency: 10,
        },
        (err) => {
          if (err) {
            console.error("Scanner init error:", err);
            return;
          }
          Quagga.start();
          quaggaRunning.current = true;
        }
      );

      Quagga.onDetected((result) => {
        const code = normalizeBarcode(result.codeResult.code);
        if (!code) return;

        detectedCodes.current.push(code);
        const recent = detectedCodes.current.slice(-6);
        const count = recent.filter((c) => c === code).length;

        if (count >= 3) {
          detectedCodes.current = [];

          setLastScanned((prev) => {
            if (prev === code) return prev;

            setProducts((currentProducts) => {
              const product = currentProducts.find(
                (p) => normalizeBarcode(p.barcode) === code
              );
              if (product) {
                addToCart(product);
              } else {
                showFlash("❌ Product not in inventory. Add it first.", "error");
              }
              return currentProducts;
            });

            setTimeout(() => setLastScanned(null), 2000);
            return code;
          });
        }
      });
    }, 800);

    return () => {
      clearTimeout(timer);
      if (quaggaRunning.current) {
        Quagga.stop();
        quaggaRunning.current = false;
      }
      Quagga.offDetected();
    };
  }, []);

  function checkout() {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    const sale = {
      items: cart,
      total,
      payment,
      date: new Date().toISOString(),
    };
    setSales([...sales, sale]);
    setProducts(
      products.map((p) => {
        const cartItem = cart.find((c) => c.id === p.id);
        if (cartItem) {
          return { ...p, quantity: parseInt(p.quantity) - cartItem.qty };
        }
        return p;
      })
    );
    setReceipt(true);
  }

  function newSale() {
    setCart([]);
    setReceipt(false);
    setSearch("");
  }

  if (receipt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm border border-green-100">
          <div className="text-center mb-4">
            <p className="text-4xl mb-2">✅</p>
            <h3 className="text-xl font-bold text-green-700">Sale Complete!</h3>
            <p className="text-gray-400 text-sm">Payment via {payment}</p>
          </div>
          <div className="border-t border-dashed border-gray-200 py-3 mb-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span>{item.name} x{item.qty}</span>
                <span className="font-semibold">
                  GH₵ {(parseFloat(item.sellPrice) * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-green-700 text-lg border-t border-gray-200 pt-3 mb-4">
            <span>Total</span>
            <span>GH₵ {total.toFixed(2)}</span>
          </div>
          <button
            onClick={newSale}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-sm"
          >
            New Sale
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">

      {/* Flash Message */}
      {flashMessage && (
        <div
          className={`fixed top-20 left-4 right-4 z-50 py-3 px-4 rounded-2xl text-white text-center font-bold text-sm shadow-lg ${
            flashMessage.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {flashMessage.message}
        </div>
      )}

      {/* Scanner — always visible */}
      <div
        ref={scannerRef}
        className="relative w-full rounded-2xl overflow-hidden bg-black mb-3"
        style={{ height: "220px" }}
      >
        {/* Aim overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="border-2 border-green-400 rounded-xl w-52 h-24 relative">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-green-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-green-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-green-400 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-green-400 rounded-br-lg"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-green-400 opacity-70"></div>
          </div>
        </div>
        <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs opacity-70 z-10">
          Point camera at barcode
        </p>
      </div>

      {/* Search Fallback */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Can't scan? Type product name..."
        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm mb-3 focus:outline-none focus:border-green-400 bg-white shadow-sm"
      />

      {search.length > 0 && (
        <div className="bg-white rounded-2xl shadow border border-green-50 mb-3 overflow-hidden">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-4">
              No products found
            </p>
          ) : (
            filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                className="w-full flex justify-between items-center px-4 py-3 hover:bg-green-50 border-b border-gray-100 last:border-0 text-left"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category || "Uncategorized"}</p>
                </div>
                <span className="text-green-700 font-bold text-sm">
                  GH₵ {p.sellPrice}
                </span>
              </button>
            ))
          )}
        </div>
      )}

      {/* Cart */}
      {cart.length === 0 ? (
        <div className="text-center text-gray-400 mt-6">
          <p className="text-4xl mb-2">🛒</p>
          <p className="font-semibold text-sm">Cart is empty</p>
          <p className="text-xs">Scan a product or search above</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow px-4 py-3 border border-green-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-sm text-gray-800">{item.name}</p>
                  <p className="text-xs text-green-600 font-semibold">
                    GH₵ {(parseFloat(item.sellPrice) * item.qty).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeQty(item.id, -1)}
                    className="w-7 h-7 rounded-full bg-green-100 text-green-700 font-bold text-lg flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="font-bold text-sm w-4 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => changeQty(item.id, 1)}
                    className="w-7 h-7 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-400 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow px-4 py-3 border border-green-50 mb-3">
            <p className="text-sm font-bold text-gray-600 mb-2">Payment Method</p>
            <div className="flex gap-2">
              {["Cash", "Mobile Money", "Card"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPayment(method)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    payment === method
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-500 border-gray-200"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={checkout}
            className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold text-base shadow-lg"
          >
            Checkout · GH₵ {total.toFixed(2)}
          </button>
        </>
      )}
    </div>
  );
}

export default Sell;