"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Country {
  _id: string;
  code: string;
  name: string;
  isoCode3digit: string;
  riskScore: number;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    isoCode3digit: "",
    riskScore: 0
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await fetch("/api/countries");
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error("Failed to fetch countries", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsOpen(false);
        setFormData({ code: "", name: "", isoCode3digit: "", riskScore: 0 });
        fetchCountries();
      }
    } catch (error) {
      console.error("Failed to create country", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Countries</CardTitle>
            <CardDescription>Manage country records and risk scores.</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button type="button">Add Country</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Country</DialogTitle>
                <DialogDescription>Enter details for a new country record.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Country Code (2-letter)</Label>
                  <Input id="code" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Country Name</Label>
                  <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isoCode3digit">ISO Code (3-letter)</Label>
                  <Input id="isoCode3digit" value={formData.isoCode3digit} onChange={(e) => setFormData({ ...formData, isoCode3digit: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="riskScore">Risk Score</Label>
                  <Input id="riskScore" type="number" step="0.1" value={formData.riskScore} onChange={(e) => setFormData({ ...formData, riskScore: parseFloat(e.target.value) })} />
                </div>
                <Button type="submit" className="w-full">Create Country</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>ISO Code</TableHead>
                <TableHead>Risk Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countries.map((country) => (
                <TableRow key={country._id}>
                  <TableCell>{country.code}</TableCell>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>{country.isoCode3digit}</TableCell>
                  <TableCell>{country.riskScore}</TableCell>
                </TableRow>
              ))}
              {countries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No country records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
