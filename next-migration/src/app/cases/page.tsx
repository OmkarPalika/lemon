"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CaseItem {
  _id: string;
  customerReferenceID: string;
  firstName: string;
  lastName: string;
  status: string;
  riskScore: number;
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerReferenceID: "",
    firstName: "",
    lastName: "",
    status: "Pending",
    riskScore: 0
  });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await fetch("/api/cases");
      const data = await res.json();
      setCases(data);
    } catch (error) {
      console.error("Failed to fetch cases", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsOpen(false);
        setFormData({ customerReferenceID: "", firstName: "", lastName: "", status: "Pending", riskScore: 0 });
        fetchCases();
      }
    } catch (error) {
      console.error("Failed to create case", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>AML Cases</CardTitle>
            <CardDescription>View and manage screening cases.</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button type="button">Add Case</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Case</DialogTitle>
                <DialogDescription>Manually enter a customer case for screening.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerReferenceID">Customer Reference ID</Label>
                  <Input id="customerReferenceID" required value={formData.customerReferenceID} onChange={(e) => setFormData({ ...formData, customerReferenceID: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" required value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />
                </div>
                <Button type="submit" className="w-full">Create Case</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ref ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((c) => (
                <TableRow key={c._id}>
                  <TableCell>{c.customerReferenceID}</TableCell>
                  <TableCell>{c.firstName}</TableCell>
                  <TableCell>{c.lastName}</TableCell>
                  <TableCell>{c.riskScore}</TableCell>
                  <TableCell>{c.status}</TableCell>
                </TableRow>
              ))}
              {cases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No cases found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
