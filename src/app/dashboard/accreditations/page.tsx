"use client";

import { useState, useEffect } from "react";

const InventoryCheckoffApp = () => {
  const [items, setItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanInput, setScanInput] = useState("");
  const [activeTab, setActiveTab] = useState("checkoff");
  const [matchingSummary, setMatchingSummary] = useState({
    matchedItems: 0,
    quantityIssues: 0,
    priceIssues: 0,
  });

  // Simulate fetching data from API
  useEffect(() => {
    // This would be your API call to fetch order data
    setTimeout(() => {
      const mockItems = [
        {
          id: "2666871",
          description: "DONEPEZIL IPCA Tablets 5mg",
          pack: "84",
          ordered: 10,
          received: 0,
          invoiced: 10,
          unitPrice: 4.0,
          status: "pending",
          checked: false,
        },
        {
          id: "2643588",
          description: "SIMVASTATIN VIATRIS Tablets 40mg",
          pack: "90",
          ordered: 4,
          received: 0,
          invoiced: 4,
          unitPrice: 4.45,
          status: "pending",
          checked: false,
        },
        {
          id: "2581752",
          description: "FAMOTIDINE HOVID Tablets 20mg",
          pack: "100",
          ordered: 10,
          received: 0,
          invoiced: 10,
          unitPrice: 5.7,
          status: "pending",
          checked: false,
        },
        {
          id: "2196786",
          description: "ACIDEX Oral liquid",
          pack: "500",
          ordered: 4,
          received: 0,
          invoiced: 4,
          unitPrice: 8.15,
          status: "pending",
          checked: false,
        },
        {
          id: "201839",
          description: "DIPROSONE Cream 0.05%",
          pack: "15",
          ordered: 1,
          received: 0,
          invoiced: 1,
          unitPrice: 3.26,
          status: "pending",
          checked: false,
        },
      ];

      setItems(mockItems);
      setCurrentOrder({
        orderNumber: "32947",
        supplier: "Propharma",
        date: "30 Apr 2025",
        totalItems: 15,
        totalCost: 366.87,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleReceiveItem = (id, count = 1) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              received: Math.min(item.received + count, item.ordered),
              status:
                item.received + count >= item.ordered ? "complete" : "partial",
              checked: item.received + count >= item.ordered,
            }
          : item
      )
    );

    // Update matching summary
    updateMatchingSummary();
  };

  const handleScanSubmit = () => {
    // In a real app, you would validate the barcode against your database
    const matchedItem = items.find((item) => item.id === scanInput);
    if (matchedItem) {
      handleReceiveItem(matchedItem.id);
      // Clear the input after successful scan
      setScanInput("");
    } else {
      alert("Item not found in current order");
    }
  };

  const updateMatchingSummary = () => {
    const summary = items.reduce(
      (acc, item) => {
        // Check if quantities match
        if (item.received > 0 && item.received === item.invoiced) {
          acc.matchedItems++;
        }

        // Check for quantity issues
        if (item.received !== item.invoiced) {
          acc.quantityIssues++;
        }

        // Price issues would be detected from invoice data
        // This is just a placeholder logic
        const expectedPrice = item.unitPrice * item.ordered;
        const invoicedPrice = item.unitPrice * item.invoiced;
        if (expectedPrice !== invoicedPrice) {
          acc.priceIssues++;
        }

        return acc;
      },
      { matchedItems: 0, quantityIssues: 0, priceIssues: 0 }
    );

    setMatchingSummary(summary);
  };

  const getCompletionPercentage = () => {
    if (items.length === 0) return 0;
    const checkedItems = items.filter((item) => item.checked).length;
    return Math.round((checkedItems / items.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading order data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Inventory Receiving</h1>
        {currentOrder && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold">Order:</span>{" "}
                {currentOrder.orderNumber}
              </div>
              <div>
                <span className="font-semibold">Supplier:</span>{" "}
                {currentOrder.supplier}
              </div>
              <div>
                <span className="font-semibold">Date:</span> {currentOrder.date}
              </div>
              <div>
                <span className="font-semibold">Items:</span>{" "}
                {currentOrder.totalItems}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Total Cost:</span> $
                {currentOrder.totalCost.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="h-4 bg-gray-200 rounded-full">
          <div
            className="h-4 bg-green-500 rounded-full"
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
        <div className="text-center mt-1 text-sm font-medium">
          {getCompletionPercentage()}% Complete
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === "checkoff" ? "border-b-2 border-blue-500 font-medium" : ""}`}
            onClick={() => setActiveTab("checkoff")}
          >
            Check-off Items
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "summary" ? "border-b-2 border-blue-500 font-medium" : ""}`}
            onClick={() => setActiveTab("summary")}
          >
            Matching Summary
          </button>
        </div>
      </div>

      {activeTab === "checkoff" && (
        <>
          <div className="mb-6">
            <div className="flex">
              <input
                type="text"
                className="flex-1 p-2 border rounded-l"
                placeholder="Scan barcode or enter item code"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleScanSubmit();
                  }
                }}
              />
              <button
                onClick={handleScanSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-r"
              >
                Check Item
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left">PharmaCode</th>
                  <th className="py-2 px-3 text-left">Description</th>
                  <th className="py-2 px-3 text-center">Pack</th>
                  <th className="py-2 px-3 text-center">Ordered</th>
                  <th className="py-2 px-3 text-center">Received</th>
                  <th className="py-2 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-t ${item.checked ? "bg-green-50" : ""}`}
                  >
                    <td className="py-2 px-3">{item.id}</td>
                    <td className="py-2 px-3">{item.description}</td>
                    <td className="py-2 px-3 text-center">{item.pack}</td>
                    <td className="py-2 px-3 text-center">{item.ordered}</td>
                    <td className="py-2 px-3 text-center">
                      <span
                        className={`font-medium ${item.received < item.ordered ? "text-red-500" : "text-green-500"}`}
                      >
                        {item.received}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className="flex justify-center space-x-1">
                        <button
                          onClick={() => handleReceiveItem(item.id)}
                          disabled={item.received >= item.ordered}
                          className={`px-3 py-1 text-xs rounded ${
                            item.received >= item.ordered
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          +1
                        </button>
                        <button
                          onClick={() =>
                            handleReceiveItem(
                              item.id,
                              item.ordered - item.received
                            )
                          }
                          disabled={item.received >= item.ordered}
                          className={`px-3 py-1 text-xs rounded ${
                            item.received >= item.ordered
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          Receive All
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "summary" && (
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">3-Way Matching Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-3xl font-bold text-green-600">
                {matchingSummary.matchedItems}
              </div>
              <div className="text-sm">Matched Items</div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="text-3xl font-bold text-yellow-600">
                {matchingSummary.quantityIssues}
              </div>
              <div className="text-sm">Quantity Discrepancies</div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="text-3xl font-bold text-red-600">
                {matchingSummary.priceIssues}
              </div>
              <div className="text-sm">Price Discrepancies</div>
            </div>
          </div>

          <h3 className="font-medium mb-2">Discrepancy Details</h3>
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-3 text-left">Item</th>
                <th className="py-2 px-3 text-center">Ordered</th>
                <th className="py-2 px-3 text-center">Received</th>
                <th className="py-2 px-3 text-center">Invoiced</th>
                <th className="py-2 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((item) => item.received !== item.invoiced)
                .map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-2 px-3">{item.description}</td>
                    <td className="py-2 px-3 text-center">{item.ordered}</td>
                    <td className="py-2 px-3 text-center">{item.received}</td>
                    <td className="py-2 px-3 text-center">{item.invoiced}</td>
                    <td className="py-2 px-3 text-right">
                      <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                        Quantity Mismatch
                      </span>
                    </td>
                  </tr>
                ))}
              {/* Example of a price discrepancy */}
              <tr className="border-t">
                <td className="py-2 px-3">DIPROSONE Cream 0.05%</td>
                <td className="py-2 px-3 text-center">1</td>
                <td className="py-2 px-3 text-center">1</td>
                <td className="py-2 px-3 text-center">1</td>
                <td className="py-2 px-3 text-right">
                  <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                    Price Mismatch ($3.26 vs $3.50)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryCheckoffApp;
