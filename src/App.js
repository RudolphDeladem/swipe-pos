import { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Inventory from "./pages/Inventory";
import Sell from "./pages/Sell";
import Analytics from "./pages/Analytics";

function App() {
  const [activePage, setActivePage] = useState("sell");
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Header />
      <div className="flex-1 p-4 pb-24">
        {activePage === "inventory" && (
          <Inventory products={products} setProducts={setProducts} />
        )}
        {activePage === "sell" && (
          <Sell products={products} setProducts={setProducts} sales={sales} setSales={setSales} />
        )}
        {activePage === "analytics" && (
          <Analytics products={products} sales={sales} />
        )}
      </div>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}

export default App;