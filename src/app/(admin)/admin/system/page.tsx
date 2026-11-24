"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Server,
  Database,
  MapPin,
  Users,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  HardDrive,
  Key,
  Globe2,
  Sliders,
  Terminal,
  ExternalLink,
} from "lucide-react";

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "VALIDATOR" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  lastActive: string;
}

export default function AdminSystemPage() {
  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: "u-1",
      name: "Siswa Demo Mejayan",
      email: "siswa@sman1mejayan.sch.id",
      role: "STUDENT",
      status: "ACTIVE",
      lastActive: "10 menit lalu",
    },
    {
      id: "u-2",
      name: "Bpk. Bambang Sutrisno, M.Pd.",
      email: "guru.geografi@sman1mejayan.sch.id",
      role: "TEACHER",
      status: "ACTIVE",
      lastActive: "35 menit lalu",
    },
    {
      id: "u-3",
      name: "Dr. Rina Wulandari (Ahli Materi MMI)",
      email: "validator@mmi-geografi.id",
      role: "VALIDATOR",
      status: "ACTIVE",
      lastActive: "2 jam lalu",
    },
    {
      id: "u-4",
      name: "Administrator Lab SMAN 1 Mejayan",
      email: "admin@sman1mejayan.sch.id",
      role: "ADMIN",
      status: "ACTIVE",
      lastActive: "Sedang aktif",
    },
  ]);

  const [cacheStatus, setCacheStatus] = useState<string>("Tersinkronisasi");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefreshCache = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setCacheStatus("Cache dibersihkan & diperbarui (0.001 deg tolerance)");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#011024] text-slate-100 flex flex-col font-sans">
      <AppNavbar userRole="ADMIN" userName="Admin Lab SMAN 1 Mejayan" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary">ADMIN PORTAL</Badge>
              <span className="text-xs text-slate-400">Pusat Kendali Sistem & Kuota Geospasial</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight flex items-center gap-3">
              <Server className="w-8 h-8 text-[#00D2EE]" />
              Sistem & Infrastruktur GeoSpatialX MMI
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Studi Kasus Lab Komputer: SMAN 1 Mejayan, Kab. Madiun (Lat: -7.5476, Lng: 111.6536)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshCache}
              disabled={isRefreshing}
              className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Memproses..." : "Bersihkan Cache Vektor"}
            </Button>
            <Link href="/studio/teacher">
              <Button variant="secondary" size="sm">
                Studio Guru
              </Button>
            </Link>
            <Link href="/studio/validator">
              <Button variant="secondary" size="sm">
                Portal Validator
              </Button>
            </Link>
          </div>
        </div>

        {/* System Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#091B30]/80 border-cyan-500/20">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Google Maps API Quota
                </p>
                <h3 className="text-2xl font-extrabold text-white mt-1">1,420 / 28,500</h3>
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 4.98% Terpakai (Aman)
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00D2EE]">
                <Globe2 className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#091B30]/80 border-cyan-500/20">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  PostGIS Spatial Index
                </p>
                <h3 className="text-2xl font-extrabold text-white mt-1">SRID 4326</h3>
                <p className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" /> GIST Index Aktif
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <HardDrive className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#091B30]/80 border-cyan-500/20">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Chapter Gating Locks
                </p>
                <h3 className="text-2xl font-extrabold text-white mt-1">100% Strict</h3>
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Server-side 403 Enforced
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#091B30]/80 border-cyan-500/20">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Pengguna Terdaftar
                </p>
                <h3 className="text-2xl font-extrabold text-white mt-1">36 Pengguna</h3>
                <p className="text-[11px] text-purple-400 mt-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 1 Kelas X-7 (32 Siswa)
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Users className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Google Maps Protection & Vector Optimizations */}
          <Card className="lg:col-span-2 bg-[#091B30]/70 border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-lg font-heading text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-[#00D2EE]" />
                Kebijakan Keamanan API & Optimasi Bandwidth Lab
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Konfigurasi kuota Google Maps JavaScript API dan toleransi penyederhanaan geometri PostGIS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-[#021126] border border-cyan-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">HTTP Referrer Key Restriction</h4>
                    <p className="text-xs text-slate-400">Membatasi akses Google Maps API hanya dari domain resmi sekolah</p>
                  </div>
                  <Badge variant="success">AKTIF</Badge>
                </div>
                <div className="text-xs font-mono text-cyan-300 bg-[#011024] p-2.5 rounded-lg border border-cyan-500/20">
                  Allowed: https://*.sman1mejayan.sch.id/*, http://localhost:3000/*
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#021126] border border-cyan-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">PostGIS Vector Simplification</h4>
                    <p className="text-xs text-slate-400">
                      Mencegah transfer payload GeoJSON berat ke peramban komputer lab dengan toleransi topologi
                    </p>
                  </div>
                  <Badge variant="primary">ST_SimplifyPreserveTopology</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 bg-[#011024] p-2.5 rounded-lg border border-cyan-500/20">
                  <span>Toleransi Simplifikasi: <code className="text-[#00D2EE]">0.001 derajat (~111 m)</code></span>
                  <span className="text-emerald-400 font-semibold">Kompresi Payload ~74%</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#021126] border border-cyan-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Status Cache Geospasial</h4>
                    <p className="text-xs text-slate-400">{cacheStatus}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Upstash Redis / In-Memory</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database & Spatial Engine Info */}
          <Card className="bg-[#091B30]/70 border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-lg font-heading text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" />
                Spesifikasi Database PostGIS
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Pondasi relasional dan mesin geospasial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Database Engine</span>
                <span className="font-semibold text-white">PostgreSQL 16.2</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700/50">
                <span className="text-slate-400">PostGIS Extension</span>
                <span className="font-semibold text-[#00D2EE]">v3.4.1 (SRID 4326)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700/50">
                <span className="text-slate-400">ORM Schema</span>
                <span className="font-semibold text-white">Prisma 5.22</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Spatial Index Type</span>
                <span className="font-semibold text-emerald-400">GIST (geom)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Enforcement Modul Bab</span>
                <span className="font-semibold text-white">6 Sfera Lengkap</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Zero-Leakage Policy</span>
                <span className="font-semibold text-emerald-400">Aktif (Kunci Terkunci)</span>
              </div>

              <div className="pt-4">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] leading-relaxed">
                  ✓ Seluruh layer Level 1, Level 2, dan Level 3 telah terverifikasi oleh Validator dan mematuhi atribusi lisensi BIG, BMKG, BNPB, dan Google Maps.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management & RBAC Table */}
        <Card className="bg-[#091B30]/70 border-cyan-500/20">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-heading text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Manajemen Pengguna & Pembagian 4 Role (RBAC)
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Pengelolaan hak akses STUDENT, TEACHER, VALIDATOR, dan ADMIN
                </CardDescription>
              </div>
              <Button size="sm" variant="primary" glow>
                + Tambah Pengguna Baru
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700/80 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Nama Lengkap</th>
                    <th className="py-3 px-4">Email / Akun</th>
                    <th className="py-3 px-4">Role Sistem</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Aktivitas Terakhir</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">{u.name}</td>
                      <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            u.role === "ADMIN"
                              ? "danger"
                              : u.role === "VALIDATOR"
                              ? "warning"
                              : u.role === "TEACHER"
                              ? "secondary"
                              : "primary"
                          }
                        >
                          {u.role}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{u.lastActive}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="text-cyan-400 hover:text-cyan-300 font-semibold px-2 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 transition-all">
                          Kelola
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Security & Audit Trail */}
        <Card className="bg-[#091B30]/70 border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-lg font-heading text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              Log Audit Akses & Penegakan Keamanan (Live Audit Stream)
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Pencatatan percobaan bypass Chapter Gating dan transaksi asesmen kuis C4
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-[11px] bg-[#011024] p-4 rounded-xl border border-cyan-500/20 max-h-48 overflow-y-auto">
              <div className="text-emerald-400 flex items-center gap-2">
                <span className="text-slate-500">[2026-11-24 21:28:10]</span>
                <span>[AUTH/SUCCESS] User 'siswa-demo-mejayan' authenticated via credentials. Role: STUDENT.</span>
              </div>
              <div className="text-cyan-300 flex items-center gap-2">
                <span className="text-slate-500">[2026-11-24 21:32:45]</span>
                <span>[PROGRESS/SYNC] Completed SubMaterial 'lit-01' (Struktur Lapisan Bumi). Progress: 25%.</span>
              </div>
              <div className="text-yellow-400 flex items-center gap-2">
                <span className="text-slate-500">[2026-11-24 21:34:02]</span>
                <span>[GATING/BLOCKED] Blocked GET /chapters/litosfer/quiz. Reason: Incomplete submaterials (3/4). HTTP 403.</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-2">
                <span className="text-slate-500">[2026-11-24 21:35:12]</span>
                <span>[QUIZ/SUBMIT] User 'siswa-demo-mejayan' submitted quiz 'litosfer'. Score: 80/100. Time: 420s.</span>
              </div>
              <div className="text-cyan-400 flex items-center gap-2">
                <span className="text-slate-500">[2026-11-24 21:36:00]</span>
                <span>[POSTGIS/SPATIAL] ST_SimplifyPreserveTopology executed on layer 'layer-meso-das-madiun'. Execution time: 14ms.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
