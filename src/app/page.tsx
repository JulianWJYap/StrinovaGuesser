import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <h1
        className="text-6xl mb-6 text-center"
      >
        Strinova Guesser
      </h1>
      <Link
        href={'/mapguess'}
      >
        <button
          className="bg-blue-500 hover:bg-sky-600 rounded-lg shadow-xl transition-all duration-200 px-24 py-3"
        >
          Play Map Guesser
        </button>
      </Link>
    </div>
  );
}
