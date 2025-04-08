import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black">
      <Link href="/blog/exemplo-post" className="text-black text-3xl"> Send me to example</Link>
    </main>
  );
}
