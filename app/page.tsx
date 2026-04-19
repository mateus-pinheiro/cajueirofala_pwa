"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Comment {
  id: string;
  text: string;
  name: string;
  createdAt: string;
  votes: number;
  comments: number;
  category: string;
}

export default function Home() {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const accentColor = "#8B6F3A";

  useEffect(() => {
    // Focar automaticamente no textarea quando a página carregar
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text: text,
      name: "Você",
      createdAt: new Date().toISOString(),
      votes: 0,
      comments: 0,
      category: "infra",
    };

    // Salvar no localStorage
    const existingComments = JSON.parse(
      localStorage.getItem("cajueiro-comments") || "[]"
    );
    localStorage.setItem(
      "cajueiro-comments",
      JSON.stringify([...existingComments, newComment])
    );

    setSubmitted(true);

    // Reset após 3 segundos
    setTimeout(() => {
      setText("");
      setSubmitted(false);
      setFocused(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white p-7">
        <div className="text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <svg
              className="w-10 h-10"
              style={{ color: accentColor }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2
            className="text-3xl mb-2"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontWeight: 400,
              letterSpacing: "-0.4px",
              color: "#111",
            }}
          >
            Obrigado!
          </h2>
          <p className="text-base text-gray-600 font-normal">
            Sua sugestão foi enviada com sucesso.
          </p>
          <Link
            href="/admin"
            className="inline-block mt-6 px-6 py-3 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: accentColor }}
          >
            Ver todas as sugestões
          </Link>
        </div>
      </div>
    );
  }

  const hasText = text.length > 0;

  return (
    <div className="h-screen flex flex-col bg-white p-7 pt-24 box-border">
      <div
        className="text-xs tracking-[2px] uppercase mb-12 font-medium"
        style={{ color: accentColor, fontFamily: "var(--font-inter)" }}
      >
        Cajueiro fala
      </div>

      <div className="flex-1 flex flex-col">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col relative">
            {/* Título que diminui quando há texto */}
            <h1
              className="transition-all duration-300 ease-out mb-4"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                color: hasText ? "#999" : "#111",
                letterSpacing: "-0.5px",
                fontWeight: 400,
                fontSize: hasText ? "18px" : "38px",
                lineHeight: hasText ? "1.4" : "1.1",
                opacity: hasText ? 0.7 : 1,
              }}
            >
              Você como morador de Barra Grande, o que acha que pode melhorar?
            </h1>

            {/* Textarea */}
            <div className="flex-1 flex flex-col">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder=""
                className="w-full border-none outline-none resize-none bg-transparent text-base leading-6 text-gray-900 p-0 flex-1"
                style={{
                  fontFamily: "var(--font-inter)",
                  minHeight: hasText ? "200px" : "90px",
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              className="inline-flex items-center px-3.5 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="mr-1.5">＋</span> foto
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-4 py-2 rounded-full border-none text-sm font-medium transition-colors"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: text.trim() ? accentColor : "#E5E5E5",
                color: text.trim() ? "#fff" : "#999",
                cursor: text.trim() ? "pointer" : "not-allowed",
              }}
            >
              Enviar →
            </button>
          </div>
        </form>
      </div>

      <div className="text-[11px] text-gray-400 text-center mt-4 tracking-[0.2px]">
        <Link href="/admin" className="hover:underline">
          ver o que outros moradores disseram
        </Link>
      </div>
    </div>
  );
}
