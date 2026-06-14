"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Corporate {
  _id: string;
  customerId: string;
  fullName: string;
  country: string;
  businessType: string;
}

export default function CorporatesPage() {
  const [corporates, setCorporates] = useState<Corporate[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    fullName: "",
    country: "",
    businessType: ""
  });

  useEffect(() => {
    fetchCorporates();
  }, []);

  const fetchCorporates = async () => {
    try {
      const res = await fetch("/api/corporates");
      const data = await res.json();
      setCorporates(data);
    } catch (error) {
      console.error("Failed to fetch corporates", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/corporates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsOpen(false);
        setFormData({ customerId: "", fullName: "", country: "", businessType: "" });
        fetchCorporates();
      }
    } catch (error) {
      console.error("Failed to create corporate", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Corporates</CardTitle>
            <CardDescription>Manage corporate clients and KYC data.</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button type="button">Add Corporate</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Corporate</DialogTitle>
                <DialogDescription>Enter details for a new corporate entity.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer ID</Label>
                  <Input id="customerId" required value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name / Entity Name</Label>
                  <Input id="fullName" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input id="businessType" value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} />
                </div>
                <Button type="submit" className="w-full">Create Corporate</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Entity Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Business Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {corporates.map((corp) => (
                <TableRow key={corp._id}>
                  <TableCell>{corp.customerId}</TableCell>
                  <TableCell>{corp.fullName}</TableCell>
                  <TableCell>{corp.country}</TableCell>
                  <TableCell>{corp.businessType}</TableCell>
                </TableRow>
              ))}
              {corporates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No corporate records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
