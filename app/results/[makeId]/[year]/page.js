import Spinner from "@/components/Spinner";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const makesApiUrl = process.env.NEXT_PUBLIC_VEHICLE_MAKES_YEAR_API;

async function getVehicleMake(makeId) {
  const response = await fetch(makesApiUrl);
  const data = await response.json();
  const make = data.Results.find((make) => make.MakeId.toString() === makeId);
  return make ? make.MakeName : null;
}

async function getVehicleModels(makeId, year) {
  const modelsApiUrl = process.env.NEXT_PUBLIC_VEHICLE_DATA_API.replace(
    "{makeId}",
    makeId
  ).replace("{year}", year);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(modelsApiUrl);
  const data = await response.json();
  return data.Results;
}

export default async function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <Suspense fallback={<Spinner />}>
      <ResultContent makeId={makeId} year={year} />
    </Suspense>
  );
}

async function ResultContent({ makeId, year }) {
  try {
    const makeName = await getVehicleMake(makeId);
    if (!makeName) {
      notFound();
    }

    const models = await getVehicleModels(makeId, year);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Results of: {makeName} ({year})
        </h1>
        {models.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <li
                key={model.Model_ID}
                className="bg-zinc-700 border border-zinc-600 shadow rounded-lg p-4"
              >
                <h2 className="text-blue-400 text-xl font-semibold mb-2 text-center">
                  {model.Model_Name}
                </h2>
                <div className="flex flex-row justify-evenly">
                  <p className="text-zinc-300">Make: {model.Make_Name}</p>
                  <p className="text-zinc-300">Year: {year}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl">
            No models found for this make and year combination.
          </p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p className="text-xl">There was a problem obtaining vehicle data.</p>
      </div>
    );
  }
}
