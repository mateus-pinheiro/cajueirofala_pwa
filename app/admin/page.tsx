"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Comment {
  id: string;
  text: string;
  name: string;
  createdAt: string;
  votes?: number;
  comments?: number;
  category?: string;
}

const CATEGORIES = [
  { id: "infra", label: "Infraestrutura" },
  { id: "saude", label: "Saúde" },
  { id: "transporte", label: "Transporte" },
  { id: "lazer", label: "Lazer" },
  { id: "educacao", label: "Educação" },
  { id: "ambiente", label: "Meio ambiente" },
  { id: "turismo", label: "Turismo" },
  { id: "seguranca", label: "Segurança" },
];

export default function AdminPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState("todas");
  const [sort, setSort] = useState<"populares" | "recentes">("populares");
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const accentColor = "#8B6F3A";

  useEffect(() => {
    const loadComments = () => {
      const stored = localStorage.getItem("cajueiro-comments");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Adicionar valores padrão se não existirem
        const normalized = parsed.map((c: Comment) => ({
          ...c,
          votes: c.votes || 0,
          comments: c.comments || 0,
          category: c.category || "infra",
        }));
        setComments(normalized);
      }
    };

    loadComments();
    const interval = setInterval(loadComments, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    let list =
      filter === "todas"
        ? comments
        : comments.filter((c) => c.category === filter);

    if (sort === "populares") {
      list = [...list].sort((a, b) => (b.votes || 0) - (a.votes || 0));
    } else {
      // recentes = ordem reversa (mais recentes primeiro)
      list = [...list].reverse();
    }

    return list;
  }, [comments, filter, sort]);

  const totalVotes = comments.reduce((a, c) => a + (c.votes || 0), 0);
  const totalComments = comments.reduce((a, c) => a + (c.comments || 0), 0);

  const handleVote = (id: string) => {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, votes: (c.votes || 0) + 1 } : c
    );
    setComments(updated);
    localStorage.setItem("cajueiro-comments", JSON.stringify(updated));
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "agora";
    if (diffMins < 60) return `há ${diffMins}min`;
    if (diffHours < 24) return `há ${diffHours}h`;
    if (diffDays === 1) return "ontem";
    if (diffDays < 7) return `há ${diffDays} dias`;
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "60px 24px 18px",
          borderBottom: "1px solid #F0F0F0",
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <Link
            href="/"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: "#F5F5F5",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            ←
          </Link>
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: accentColor,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            Cajueiro fala
          </div>
          <div style={{ width: 32 }} />
        </div>

        <div
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: 24,
            lineHeight: 1.15,
            color: "#111",
            letterSpacing: -0.3,
            fontWeight: 400,
          }}
        >
          O que <span style={{ fontStyle: "italic" }}>Barra Grande</span> anda
          dizendo
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 16,
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            color: "#666",
            flexWrap: "wrap",
          }}
        >
          <div>
            <b style={{ color: "#111" }}>{comments.length}</b> sugestões
          </div>
          <div style={{ color: "#DDD" }}>·</div>
          <div>
            <b style={{ color: "#111" }}>{totalVotes}</b> votos
          </div>
          <div style={{ color: "#DDD" }}>·</div>
          <div>
            <b style={{ color: "#111" }}>{totalComments}</b> comentários
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 24px",
          overflowX: "auto",
          flexShrink: 0,
          borderBottom: "1px solid #F0F0F0",
          scrollbarWidth: "none",
        }}
      >
        <button
          onClick={() => setFilter("todas")}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: `1px solid ${filter === "todas" ? "#111" : "#E5E5E5"}`,
            background: filter === "todas" ? "#111" : "#fff",
            color: filter === "todas" ? "#fff" : "#444",
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            whiteSpace: "nowrap",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          todas
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: `1px solid ${filter === cat.id ? "#111" : "#E5E5E5"}`,
              background: filter === cat.id ? "#111" : "#fff",
              color: filter === cat.id ? "#fff" : "#444",
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              whiteSpace: "nowrap",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {cat.label.toLowerCase()}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 24px 8px",
          flexShrink: 0,
          fontFamily: "var(--font-inter)",
          fontSize: 12,
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          <button
            onClick={() => setSort("populares")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              cursor: "pointer",
              letterSpacing: 0.2,
              color: sort === "populares" ? "#111" : "#999",
              fontWeight: sort === "populares" ? 600 : 400,
            }}
          >
            populares
          </button>
          <button
            onClick={() => setSort("recentes")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              cursor: "pointer",
              letterSpacing: 0.2,
              color: sort === "recentes" ? "#111" : "#999",
              fontWeight: sort === "recentes" ? 600 : 400,
            }}
          >
            recentes
          </button>
        </div>
        <div style={{ color: "#999" }}>{filtered.length} mostrando</div>
      </div>

      {/* Lista */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "4px 0 100px",
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              padding: 60,
              textAlign: "center",
              fontFamily: "var(--font-inter)",
              fontSize: 14,
              color: "#999",
            }}
          >
            Nenhuma sugestão nessa categoria ainda.
            <br />
            <span style={{ fontSize: 12 }}>Seja o primeiro.</span>
          </div>
        ) : (
          filtered.map((comment) => {
            const cat = CATEGORIES.find((c) => c.id === comment.category);
            const voted = votedIds.has(comment.id);
            const voteCount = (comment.votes || 0) + (voted ? 1 : 0);

            return (
              <div
                key={comment.id}
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid #F5F5F5",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-inter)",
                    fontSize: 11,
                    color: "#888",
                    marginBottom: 10,
                  }}
                >
                  <span style={{ color: "#111", fontWeight: 500 }}>
                    {comment.name}
                  </span>
                  <span>·</span>
                  <span>{formatTimeAgo(comment.createdAt)}</span>
                  <div style={{ flex: 1 }} />
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "#F5F5F5",
                      color: "#555",
                      fontSize: 10,
                      textTransform: "lowercase",
                    }}
                  >
                    {cat?.label || "Geral"}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#111",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {comment.text}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    marginTop: 14,
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!voted) {
                        setVotedIds(new Set(votedIds).add(comment.id));
                        handleVote(comment.id);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: `1px solid ${voted ? accentColor : "#E5E5E5"}`,
                      background: voted ? `${accentColor}12` : "#fff",
                      color: voted ? accentColor : "#444",
                      fontFamily: "var(--font-inter)",
                      fontSize: 12,
                      cursor: "pointer",
                      fontWeight: voted ? 600 : 400,
                    }}
                  >
                    <span style={{ fontSize: 13 }}>{voted ? "▲" : "△"}</span>
                    <span>{voteCount}</span>
                    <span style={{ opacity: 0.6 }}>apoio</span>
                  </button>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontFamily: "var(--font-inter)",
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    <span style={{ fontSize: 13 }}>◠</span>
                    <span>{comment.comments || 0}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FAB */}
      <Link
        href="/"
        style={{
          position: "absolute",
          bottom: 44,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 999,
          background: accentColor,
          color: "#fff",
          border: "none",
          fontSize: 28,
          fontWeight: 300,
          cursor: "pointer",
          zIndex: 10,
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 4,
          textDecoration: "none",
        }}
      >
        +
      </Link>
    </div>
  );
}
