import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight">AML Core Migration (Phase 3)</h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          Welcome to the Next.js migration of the AML Core platform.
          This phase continues the migration, integrating the Designation module.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <Link href="/users">
            <Button size="lg" variant="outline">Go to Users Module</Button>
          </Link>
          <Link href="/departments">
            <Button size="lg" variant="outline">Go to Departments Module</Button>
          </Link>
          <Link href="/designations">
            <Button size="lg">Go to Designations Module</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
