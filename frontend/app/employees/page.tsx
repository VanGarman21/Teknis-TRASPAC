"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { logout, me } from "@/lib/auth";
import type { Employee, Paginated, Religion, Unit } from "@/lib/types";
import SearchBar from "@/components/SearchBar";
import Select from "@/components/Select";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import EmployeeForm from "@/components/EmployeeForm";
import ConfirmDialog from "@/components/ConfirmDialog";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function EmployeesPage() {
  const [authReady, setAuthReady] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [unitId, setUnitId] = useState<string>("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [data, setData] = useState<Paginated<Employee> | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [religions, setReligions] = useState<Religion[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Employee | null>(null);

  useEffect(() => {
    me().then((u) => {
      if (!u) window.location.href = "/login";
      else {
        setUserName(u.username);
        setAuthReady(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!authReady) return;
    (async () => {
      const [u, r] = await Promise.all([
        api.get<Unit[]>("/units").then((r) => r.data),
        api.get<Religion[]>("/religions").then((r) => r.data),
      ]);
      setUnits(u);
      setReligions(r);
    })();
  }, [authReady]);

  const unitOptions = useMemo(
    () => units.map((u) => ({ value: u.id, label: u.nama_unit })),
    [units]
  );

  useEffect(() => {
    if (!authReady) return;
    const params: any = { page, per_page: perPage };
    if (search) params.search = search;
    if (unitId) params.unit_id = unitId;
    api
      .get<Paginated<Employee>>("/employees", { params })
      .then((r) => setData(r.data));
  }, [authReady, page, perPage, search, unitId]);

  function onEdit(row: Employee) {
    setEditing(row);
    setFormOpen(true);
  }
  function onDelete(row: Employee) {
    setToDelete(row);
    setConfirmOpen(true);
  }

  function onNew() {
    setEditing(null);
    setFormOpen(true);
  }

  async function onPrint() {
    const doc = new jsPDF();
    doc.text("Daftar Pegawai", 14, 14);
    const rows = (data?.data ?? []).map((e, i) => [
      i + 1,
      e.nip,
      e.nama,
      e.unit?.nama_unit ?? "-",
      e.jabatan ?? "-",
    ]);
    // @ts-ignore
    doc.autoTable({
      startY: 20,
      head: [["No", "NIP", "Nama", "Unit", "Jabatan"]],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246] },
    });
    doc.save("employees.pdf");
  }

  async function onLogout() {
    await logout();
    window.location.href = "/login";
  }

  if (!authReady) return null;

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Employees</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Hi, {userName}</span>
          <button
            onClick={onLogout}
            className="px-3 py-1 border border-primary text-primary rounded hover:bg-white/50"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
        <SearchBar
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
        <Select
          value={unitId}
          onChange={(v) => {
            setPage(1);
            setUnitId(v);
          }}
          options={unitOptions}
          placeholder="Semua Unit"
        />
        <div className="flex-1" />
        <div className="flex gap-2">
          <button
            onClick={onNew}
            className="px-3 py-2 bg-primary text-white rounded hover:opacity-90"
          >
            Tambah
          </button>
          <button
            onClick={onPrint}
            className="px-3 py-2 border border-secondary text-primary rounded hover:bg-white/50"
          >
            Print PDF
          </button>
        </div>
      </div>

      <DataTable data={data?.data ?? []} onEdit={onEdit} onDelete={onDelete} />

      <div className="flex justify-end">
        <Pagination
          page={data?.current_page ?? 1}
          totalPages={data?.last_page ?? 1}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(data?.last_page ?? 1, p + 1))}
        />
      </div>

      {formOpen && (
        <EmployeeForm
          value={editing}
          units={units}
          religions={religions}
          onSaved={() => {
            setFormOpen(false);
            api
              .get<Paginated<Employee>>("/employees", {
                params: {
                  page,
                  per_page: perPage,
                  search,
                  unit_id: unitId || undefined,
                },
              })
              .then((r) => setData(r.data));
          }}
          onCancel={() => setFormOpen(false)}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Konfirmasi Hapus"
        message={`Hapus ${toDelete?.nama}?`}
        confirmText="Hapus"
        cancelText="Batal"
        onCancel={() => {
          setConfirmOpen(false);
          setToDelete(null);
        }}
        onConfirm={() => {
          if (!toDelete?.id) return;
          api.delete(`/employees/${toDelete.id}`).then(() => {
            setConfirmOpen(false);
            setToDelete(null);
            api
              .get<Paginated<Employee>>("/employees", {
                params: {
                  page,
                  per_page: perPage,
                  search,
                  unit_id: unitId || undefined,
                },
              })
              .then((r) => setData(r.data));
          });
        }}
      />
    </div>
  );
}
