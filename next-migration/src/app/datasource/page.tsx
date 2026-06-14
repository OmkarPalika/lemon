"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DataSourcePage() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleScreening = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await fetch("/api/scheduler/screen-customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ CASEID: "TEST-123", CUSTOMERFULLNAME: "John Doe", RISKSCORE: 5 })
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(`Success!\nResult:\n${JSON.stringify(data, null, 2)}`);
      } else {
        setOutput(`Execution failed: ${data.error}`);
      }
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePending = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await fetch("/api/scheduler/pending-cases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ CASEID: "TEST-123" })
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(`Success!\nResult:\n${JSON.stringify(data, null, 2)}`);
      } else {
        setOutput(`Execution failed: ${data.error}`);
      }
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Data Source / Scheduler Testing</CardTitle>
          <CardDescription>Trigger the internal Node.js ported scheduler processes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
             <Button onClick={handleScreening} disabled={loading}>
                 {loading ? "Executing..." : "Test Screen Customer"}
             </Button>
             <Button variant="outline" onClick={handlePending} disabled={loading}>
                 {loading ? "Executing..." : "Test Pending Cases Cleanup"}
             </Button>
          </div>

          {output && (
            <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap font-mono text-sm dark:bg-gray-800 dark:text-gray-100">
              {output}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
