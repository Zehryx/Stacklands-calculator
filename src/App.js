import React, { useState } from 'react';

// Define available machines and their production rates
const resourceOptions = {
  resource: [
    { name: "Lumber Camp", output: "wood", output_rate: 15 },
    { name: "Quarry (Stone)", output: "stone", output_rate: 15 },
    { name: "Iron Mine", output: "iron ore", output_rate: 45 },
    { name: "Sand Quarry", output: "sand", output_rate: 10 },
    { name: "Gold Mine", output: "gold ore", output_rate: 45 },
  ],
  processer: [
    { name: "Sawmill", output: "plank", output_rate: 10, input1: "wood", input2: "wood" },
    { name: "Brickyard", output: "brick", output_rate: 10, input1: "stone", input2: "stone" },
    { name: "Smelter (Iron)", output: "iron bar", output_rate: 10, input1: "iron ore", input2: "wood" },
    { name: "Smelter (Glass)", output: "glass", output_rate: 10, input1: "sand", input2: "wood" },
    { name: "Smelter (Gold)", output: "gold bar", output_rate: 10, input1: "gold ore", input2: "wood" }
  ]
};

export default function App() {
  const [selectedResource1, setSelectedResource1] = useState(resourceOptions.resource[0]);
  const [selectedResource2, setSelectedResource2] = useState(resourceOptions.resource[0]);
  const [selectedProcessor, setSelectedProcessor] = useState(null);  // Initial value is null
  const [activeTab, setActiveTab] = useState("resource"); // Tab state for toggling workflows

  const resource1Rate = selectedResource1.output_rate;
  const resource2Rate = selectedResource2.output_rate;

  const output1PerSec = 1 / resource1Rate;
  const output2PerSec = 1 / resource2Rate;

  const lcm = (a, b) => a * b / gcd(a, b);
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const lcmTime = lcm(resource1Rate, resource2Rate);
  const numResource1 = lcmTime / resource2Rate;
  const numResource2 = lcmTime / resource1Rate;

  const totalOutputPerSec = Math.min(output1PerSec * numResource1, output2PerSec * numResource2);

  // Function to auto-fill the processer's input resources based on output type
  const handleProcessorChange = (e) => {
    const selected = resourceOptions.processer.find((processor) => processor.output === e.target.value);
    setSelectedProcessor(selected);
    setSelectedResource1(resourceOptions.resource.find((resource) => resource.name === selected.input1));
    setSelectedResource2(resourceOptions.resource.find((resource) => resource.name === selected.input2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">🏗️ Stacklands Resource Calculator</h1>

        {/* Tab navigation */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`w-1/2 py-2 text-center ${activeTab === "resource" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("resource")}
          >
            Resource-Based
          </button>
          <button
            className={`w-1/2 py-2 text-center ${activeTab === "output" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("output")}
          >
            Output-Based
          </button>
        </div>

        {activeTab === "resource" && (
          <>
            {/* Resource 1 */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">🏖️ Resource 1:</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedResource1.name}
                onChange={(e) =>
                  setSelectedResource1(resourceOptions.resource.find((m) => m.name === e.target.value))
                }
              >
                {resourceOptions.resource.map((machine) => (
                  <option key={machine.name} value={machine.name}>
                    {machine.name} ({machine.output_rate}s per {machine.output})
                  </option>
                ))}
              </select>
            </div>

            {/* Resource 2 */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">🌲 Resource 2:</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedResource2.name}
                onChange={(e) =>
                  setSelectedResource2(resourceOptions.resource.find((m) => m.name === e.target.value))
                }
              >
                {resourceOptions.resource.map((machine) => (
                  <option key={machine.name} value={machine.name}>
                    {machine.name} ({machine.output_rate}s per {machine.output})
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {activeTab === "output" && (
          <>
            {/* Processor Output */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">⚙️ Select Processor Output:</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedProcessor ? selectedProcessor.output : ""}
                onChange={handleProcessorChange}
              >
                {resourceOptions.processer.map((processor) => (
                  <option key={processor.name} value={processor.output}>
                    {processor.output}
                  </option>
                ))}
              </select>
            </div>

            {selectedProcessor && (
              <>
                {/* Display processor inputs */}
                <div>
                  <p className="text-gray-800">🔧 Processor: <strong>{selectedProcessor.name}</strong></p>
                  <p className="text-gray-800">🪓 Input 1: <strong>{selectedProcessor.input1}</strong></p>
                  <p className="text-gray-800">🪓 Input 2: <strong>{selectedProcessor.input2}</strong></p>
                </div>
              </>
            )}
          </>
        )}

        <hr />

        {/* Output Results */}
        <div className="space-y-2 text-gray-800">
          <p>🔧 {selectedResource1.name} Needed: <strong>{numResource1}</strong></p>
          <p>🪓 {selectedResource2.name} Needed: <strong>{numResource2}</strong></p>
          <p>Total Output per second: <strong>{totalOutputPerSec.toFixed(2)}</strong> units</p>
        </div>
      </div>
    </div>
  );
}
