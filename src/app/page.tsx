import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="font-bold text-5xl">Daggerheart Quick Ref</h1>
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by clicking the domain you wish
          </li>
          <li className="tracking-[-.01em]">
            Check the cards you want.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-80 px-4 sm:px-5 sm:w-auto"
          >
            <Image
            src="/Svg_Arcana.svg"
            alt="dh logo"
            width={180}
            height={38}
            priority></Image>
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-80 px-4 sm:px-5 sm:w-auto"
          >
            <Image
            src="/Svg_Blade.svg"
            alt="dh logo"
            width={180}
            height={38}
            priority></Image>
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-80 px-4 sm:px-5 sm:w-auto"
          >
            <Image
            src="/Svg_Bone.svg"
            alt="dh logo"
            width={180}
            height={38}
            priority></Image>
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-80 px-4 sm:px-5 sm:w-auto"
          >
            <Image
            src="/Svg_Codex.svg"
            alt="dh logo"
            width={180}
            height={38}
            priority></Image>
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-80 px-4 sm:px-5 sm:w-auto"
          >
            <Image
            src="/Svg_Grace.svg"
            alt="dh logo"
            width={180}
            height={38}
            priority></Image>
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-80 px-4 sm:px-5 sm:w-auto"
          >
            <Image
            src="/Svg_Midnight.svg"
            alt="dh logo"
            width={180}
            height={38}
            priority></Image>
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-80 px-4 sm:px-5 sm:w-auto"
          >
            <Image
            src="/Svg_Sage.svg"
            alt="dh logo"
            width={180}
            height={38}
            priority></Image>
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-80 px-4 sm:px-5 sm:w-auto"
          >
            <Image
            src="/Svg_Splendor.svg"
            alt="dh logo"
            width={180}
            height={38}
            priority></Image>
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-80 px-4 sm:px-5 sm:w-auto"
          >
            <Image
            src="/Svg_Valor.svg"
            alt="dh logo"
            width={180}
            height={38}
            priority></Image>
          </a>
          
        </div>
      </main>
    </div>
  );
}
