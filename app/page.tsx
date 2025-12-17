import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
            <div className="bg-indigo-500 p-1.5 rounded-md">
                <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">StokJualan</span>
        </div>
        <div className="flex gap-4">
            <Link href="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                    Masuk
                </Button>
            </Link>
            <Link href="/register">
                <Button className="bg-indigo-500 hover:bg-indigo-600">
                    Daftar Sekarang
                </Button>
            </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32">
        <div className="max-w-3xl space-y-6">
            <div className="inline-block rounded-full bg-slate-900 border border-slate-800 px-4 py-1.5 text-sm font-medium text-slate-400 mb-4">
                👋 Solusi Anti Ribet untuk Reseller & UMKM
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Kelola Stok Barang <br/> 
                <span className="text-indigo-500">Tanpa Pusing.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                Aplikasi inventaris sederhana yang fokus pada kecepatan. Catat barang masuk, barang keluar, dan pantau keuntungan dalam satu dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/register">
                    <Button size="lg" className="h-12 px-8 text-lg bg-indigo-500 hover:bg-indigo-600 rounded-full">
                        Mulai Gratis <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
                <Link href="/login">
                     <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full">
                        Lihat Demo
                    </Button>
                </Link>
            </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                <div className="bg-slate-950 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-slate-800">
                   <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Cepat & Ringan</h3>
                <p className="text-slate-400">Dibuat khusus untuk kecepatan akses data. Tidak ada loading lama, langsung to the point.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                 <div className="bg-slate-950 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-slate-800">
                   <Package className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Stok Realtime</h3>
                <p className="text-slate-400">Stok update otomatis saat ada barang masuk atau terjual. Hindari selisih stok.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                 <div className="bg-slate-950 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-slate-800">
                   <ShieldCheck className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Data Aman</h3>
                <p className="text-slate-400">Data tersimpan aman di database lokal Anda. Privasi terjamin tanpa cloud share.</p>
            </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-900">
        &copy; {new Date().getFullYear()} StokJualan. Dibuat dengan ❤️ untuk UMKM Indonesia.
      </footer>
    </div>
  );
}
