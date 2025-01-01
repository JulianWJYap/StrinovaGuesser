import Image from "next/image";
import Link from "next/link";

export const AppHeader = () => {
  return(
    <header className="bg-white max-h-100px sticky top-0">
      <nav className="w-full max-w-full mx-0 flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Strinova Guesser</span>
            <Image
              className="h-8 w-auto"
              src="/globe.svg"
              alt=""
              width={100}
              height={100}
            />
          </Link>
        </div>
      </nav>
    </header>
  )
}