import React, { useEffect, useMemo, useState } from "react";
import { Api } from "../services/api";
// Recharts
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

/**
 * Dashboard com:
 * - Cards de métricas (totais, hoje, cidade mais ativa)
 * - Filtro rápido por período
 * - Gráfico dinâmico (Linhas ou Barras) com dados agregados
 */
export default function Dashboard() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Filtro simples de período (últimos N dias) só para demonstrar dinâmica
  const [days, setDays] = useState(7);
  const [chartType, setChartType] = useState("line"); // 'line' | 'bar'

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Api.listGames()
      .then((data) => {
        if (!alive) return;
        // normaliza alguns campos (data/hora) se vierem em formatos diferentes
        const normalized = (data || []).map((g) => ({
          ...g,
          // espera 'date' no formato dd/mm ou yyyy-mm-dd; converte para Date segura
          _date: parseToDate(g.date),
          city: g.city || g.cidade || "—",
        }));
        setGames(normalized);
      })
      .catch((e) => {
        if (!alive) return;
        setErr(e?.message || "Falha ao carregar dados do dashboard");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => { alive = false; };
  }, []);

  // recorte por período
  const cutoff = useMemo(() => {
    const d = new Date();
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() - (Number(days) - 1));
    return d; // início do período
  }, [days]);

  const periodGames = useMemo(() => {
    return games.filter(g => g._date && g._date >= cutoff);
  }, [games, cutoff]);

  // Métricas
  const metrics = useMemo(() => {
    const total = games.length;
    const today = games.filter(g => isSameDay(g._date, new Date())).length;

    // cidade mais ativa no período filtrado
    const byCity = new Map();
    for (const g of periodGames) {
      const c = g.city || "—";
      byCity.set(c, (byCity.get(c) || 0) + 1);
    }
    let topCity = "—";
    let topCount = 0;
    for (const [city, count] of byCity.entries()) {
      if (count > topCount) { topCity = city; topCount = count; }
    }

    return { total, today, topCity, topCount };
  }, [games, periodGames]);

  // Série por dia (para o gráfico)
  const chartData = useMemo(() => {
    // cria um mapa dia->quantidade no período selecionado
    const series = new Map();
    for (let d = new Date(cutoff); d <= todayEnd(); d.setDate(d.getDate() + 1)) {
      const key = formatShort(d); // ex: "21/09"
      series.set(key, 0);
    }
    for (const g of periodGames) {
      if (!g._date) continue;
      const key = formatShort(g._date);
      if (series.has(key)) series.set(key, series.get(key) + 1);
    }
    return Array.from(series, ([date, value]) => ({ date, value }));
  }, [periodGames, cutoff]);

  if (loading) return <section className="max-w-6xl mx-auto px-4 py-6">Carregando dashboard…</section>;
  if (err) return <section className="max-w-6xl mx-auto px-4 py-6 text-red-400">Erro: {err}</section>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-extrabold">Dashboard</h1>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm opacity-80">Período:</label>
          <select
            value={days}
            onChange={(e)=>setDays(e.target.value)}
            className="rounded-xl bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring focus-visible:ring-pink-500"
          >
            <option value={7}>7 dias</option>
            <option value={14}>14 dias</option>
            <option value={30}>30 dias</option>
          </select>

          <label className="ml-3 text-sm opacity-80">Gráfico:</label>
          <select
            value={chartType}
            onChange={(e)=>setChartType(e.target.value)}
            className="rounded-xl bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring focus-visible:ring-pink-500"
          >
            <option value="line">Linha</option>
            <option value="bar">Barras</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Total de jogos" value={metrics.total} />
        <Card title="Jogos hoje" value={metrics.today} />
        <Card title="Cidade mais ativa" value={metrics.topCity} caption={`${metrics.topCount} jogo(s)`} />
        <Card title="Período" value={`${days} dias`} caption={`${formatShort(cutoff)} → ${formatShort(new Date())}`} />
      </div>

      {/* Gráfico */}
      <div className="rounded-2xl p-4 bg-[var(--pb-card,#161a1d)] ring-1 ring-white/10">
        <h2 className="text-lg font-semibold mb-3">Jogos por dia</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={chartData} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" strokeWidth={2} dot />
              </LineChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Componentes auxiliares ----------------- */

function Card({ title, value, caption }) {
  return (
    <div className="rounded-2xl p-4 bg-[var(--pb-card,#161a1d)] ring-1 ring-white/10">
      <p className="text-sm opacity-70">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value ?? "—"}</p>
      {caption ? <p className="mt-1 text-xs opacity-60">{caption}</p> : null}
    </div>
  );
}

/* ----------------- Utils de data ----------------- */

function parseToDate(input) {
  if (!input) return null;

  // Tenta ISO (yyyy-mm-dd)
  if (/^\d{4}-\d{2}-\d{2}/.test(input)) {
    const d = new Date(input);
    return isNaN(d) ? null : stripTime(d);
  }

  // Tenta dd/mm
  if (/^\d{1,2}\/\d{1,2}(\/\d{2,4})?$/.test(input)) {
    const [dd, mm, yyyy] = input.split("/");
    const year = yyyy ? Number(yyyy.length === 2 ? "20"+yyyy : yyyy) : new Date().getFullYear();
    const d = new Date(year, Number(mm)-1, Number(dd));
    return isNaN(d) ? null : stripTime(d);
  }

  // Fallback: tenta Date direto
  const d = new Date(input);
  return isNaN(d) ? null : stripTime(d);
}

function stripTime(d) {
  const x = new Date(d);
  x.setHours(0,0,0,0);
  return x;
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function formatShort(d) {
  if (!d) return "—";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth()+1).padStart(2, "0");
  return `${dd}/${mm}`;
}

function todayEnd() {
  const t = new Date();
  t.setHours(23,59,59,999);
  return t;
}
