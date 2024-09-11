"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Filter = () => {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(currentYear - 2014),
    (val, index) => 2015 + index
  );

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    )
      .then((response) => response.json())
      .then((data) => setVehicleMakes(data.Results))
      .catch((error) => console.error("Error fetching vehicle makes:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMake && selectedYear) {
      const makeId = vehicleMakes.find(
        (make) => make.MakeName === selectedMake
      )?.MakeId;
      if (makeId) {
        router.push(`/results/${makeId}/${selectedYear}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full border border-gray-700 rounded-xl py-6 px-4"
    >
      <h2 className="text-2xl font-bold mb-4">Filter a car</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-col gap-4 ">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="vehicles" className="text-lg text-blue-400">
              Vehicles
            </label>
            <select
              id="vehicles"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="border bg-gray-600 border-gray-700 rounded-md px-2 h-10"
            >
              <option>Select a vehicle</option>
              {vehicleMakes.map((make) => (
                <option key={make.MakeId} value={make.MakeName}>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="year" className="text-lg text-blue-400">
              Model year
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border bg-gray-600 border-gray-700 rounded-md px-2 h-10"
            >
              <option value="">Select a model year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={selectedMake === "" || selectedYear === ""}
            className={`rounded-md p-2 w-full font-bold ${
              selectedMake === "" || selectedYear === ""
                ? "bg-gray-500 text-gray-400"
                : "bg-blue-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Filter;
