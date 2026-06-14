import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight">AML Core Migration (Phase 5)</h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          Welcome to the Next.js migration of the AML Core platform.
          This phase integrates the UserGroup, Corporate, and Country modules.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4 flex-wrap justify-center">
          <Link href="/users">
            <Button size="lg" variant="outline">Users</Button>
          </Link>
          <Link href="/departments">
            <Button size="lg" variant="outline">Departments</Button>
          </Link>
          <Link href="/designations">
            <Button size="lg" variant="outline">Designations</Button>
          </Link>
          <Link href="/branches">
            <Button size="lg" variant="outline">Branches</Button>
          </Link>
          <Link href="/cases">
            <Button size="lg" variant="outline">Cases</Button>
          </Link>
          <Link href="/usergroups">
            <Button size="lg">User Groups</Button>
          </Link>
          <Link href="/corporates">
            <Button size="lg">Corporates</Button>
          </Link>
          <Link href="/countries">
            <Button size="lg">Countries</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
