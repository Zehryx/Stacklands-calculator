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
    { name: "Sawmill", output: "plank", output_rate: 10, input1: "wood", input2: "wood"},
    { name: "Brickyard", output: "brick", output_rate: 10, input1: "stone", input2: "stone"},
    { name: "Smelter (Iron)", output: "iron bar", output_rate: 10, input1: "iron ore", input2: "wood"},
    { name: "Smelter (Glass)", output: "glass", output_rate: 10, input1: "sand", input2: "wood"},
    { name: "Smelter (Gold)", output: "gold bar", output_rate: 10, input1: "gold ore", input2: "wood"}
  ]
};

export default function App() {
  const [selectedResource1, setSelectedResource1] = useState(resourceOptions.resource[0]);
  const [selectedResource2, setSelectedResource2] = useState(resourceOptions.resource[0]);

  const resource1Rate = selectedResource1.output_rate;
  const resource2Rate = selectedResource2.output_rate;

  const output1PerSec = 1 / resource1Rate;
  const output2PerSec = 1 / resource2Rate;

  const lcm = (a, b) => a * b / gcd(a, b);
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const lcmTime = lcm(resource1Rate, resource2Rate);
  const numResource1 = lcmTime / resource1Rate;
  const numResource2 = lcmTime / resource2Rate;

  const totalOutputPerSec = Math.min(output1PerSec * numResource1, output2PerSec * numResource2);
  //const smeltersNeeded = Math.floor(totalGlassPerSec / 0.1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">🏗️ Stacklands Resource Calculator</h1>

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
                {machine.name} ({machine.output_rate}s per sand)
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
                {machine.name} ({machine.output_rate}s per wood)
              </option>
            ))}
          </select>
        </div>

        <hr />

        <div className="space-y-2 text-gray-800">
          <p>🔧 Resource 1 Needed: <strong>{numResource1}</strong></p>
          <p>🪓 Resource 2 Needed: <strong>{numResource2}</strong></p>
        </div>
      </div>
    </div>
  );
}
