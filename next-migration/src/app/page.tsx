import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight">AML Core Migration (Phase 7)</h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          Welcome to the Next.js migration of the AML Core platform.
          This phase integrates CodesMaster, ClientCase, Clients, CustomerMaster, and a unified Dashboard.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4 flex-wrap justify-center">
          <Link href="/dashboard"><Button size="lg" variant="default">View Main Dashboard</Button></Link>
        </div>
        <div className="flex gap-2 items-center flex-col sm:flex-row mt-4 flex-wrap justify-center opacity-80">
          <Link href="/users"><Button size="sm" variant="outline">Users</Button></Link>
          <Link href="/departments"><Button size="sm" variant="outline">Departments</Button></Link>
          <Link href="/designations"><Button size="sm" variant="outline">Designations</Button></Link>
          <Link href="/branches"><Button size="sm" variant="outline">Branches</Button></Link>
          <Link href="/cases"><Button size="sm" variant="outline">Cases</Button></Link>
          <Link href="/usergroups"><Button size="sm" variant="outline">User Groups</Button></Link>
          <Link href="/corporates"><Button size="sm" variant="outline">Corporates</Button></Link>
          <Link href="/countries"><Button size="sm" variant="outline">Countries</Button></Link>
          <Link href="/datasource"><Button size="sm" variant="outline">Data Source</Button></Link>
          <Link href="/identitytypes"><Button size="sm" variant="outline">Identity Types</Button></Link>
          <Link href="/visatypes"><Button size="sm" variant="outline">Visa Types</Button></Link>
          <Link href="/products"><Button size="sm" variant="outline">Products</Button></Link>
          <Link href="/risks"><Button size="sm" variant="outline">Risks</Button></Link>
          <Link href="/codesmaster"><Button size="sm" variant="outline">Codes Master</Button></Link>
          <Link href="/clientcases"><Button size="sm" variant="outline">Client Cases</Button></Link>
          <Link href="/clients"><Button size="sm" variant="outline">Clients</Button></Link>
          <Link href="/customermaster"><Button size="sm" variant="outline">Customer Master</Button></Link>
        </div>
      </main>
    </div>
  );
}
