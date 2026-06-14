"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RiskItem {
  _id: string;
  customerCode: string;
  customerName: string;
  finalRiskScore: string;
  customerType: string;
}

export default function RisksPage() {
  const [risks, setRisks] = useState<RiskItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerCode: "",
    customerName: "",
    finalRiskScore: "",
    customerType: ""
  });

  useEffect(() => {
    fetchRisks();
  }, []);

  const fetchRisks = async () => {
    try {
      const res = await fetch("/api/risks");
      const data = await res.json();
      setRisks(data);
    } catch (error) {
      console.error("Failed to fetch risks", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/risks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsOpen(false);
        setFormData({ customerCode: "", customerName: "", finalRiskScore: "", customerType: "" });
        fetchRisks();
      }
    } catch (error) {
      console.error("Failed to create risk record", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Risk Assessments</CardTitle>
            <CardDescription>Manage customer risk scores and assessments.</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button type="button">Add Risk Record</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Risk Record</DialogTitle>
                <DialogDescription>Manually enter a risk assessment record.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerCode">Customer Code</Label>
                  <Input id="customerCode" required value={formData.customerCode} onChange={(e) => setFormData({ ...formData, customerCode: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input id="customerName" required value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerType">Customer Type</Label>
                  <Input id="customerType" value={formData.customerType} onChange={(e) => setFormData({ ...formData, customerType: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finalRiskScore">Final Risk Score</Label>
                  <Input id="finalRiskScore" value={formData.finalRiskScore} onChange={(e) => setFormData({ ...formData, finalRiskScore: e.target.value })} />
                </div>
                <Button type="submit" className="w-full">Create Risk Record</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Code</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Risk Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.customerCode}</TableCell>
                  <TableCell>{r.customerName}</TableCell>
                  <TableCell>{r.customerType}</TableCell>
                  <TableCell>{r.finalRiskScore}</TableCell>
                </TableRow>
              ))}
              {risks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No risk records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
