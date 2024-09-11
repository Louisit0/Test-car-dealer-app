import Filter from "@/components/Filter";

export default function Home() {
  return (
    <>
      <main className="flex flex-col max-w-xl mx-auto justify-center h-screen gap-4 px-6 sm:px-0">
        <h1 className="text-5xl md:text-6xl font-bold text-start">
          Car Dealer App
        </h1>
        <Filter />
      </main>
    </>
  );
}
