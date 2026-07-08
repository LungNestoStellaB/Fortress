"use client";

/**
 * AskStella — Agents Lounge Modal
 *
 * Full-screen overlay triggered by the "Meet & Greet" button.
 * Contains: lounge card grid ↔ embed container (toggled by agent selection).
 * Close button always visible. Mobile-first responsive.
 */

import { useState } from "react";
import { AGENTS, Agent } from "@/lib/agents";
import AgentCard from "./AgentCard";
import EmbedContainer from "./EmbedContainer";

interface AgentsLoungeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentsLoungeModal({
  isOpen,
  onClose,
}: AgentsLoungeModalProps) {
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);

  if (!isOpen) return null;

  function handleEnterRoom(agent: Agent) {
    setActiveAgent(agent);
  }

  function handleExitRoom() {
    setActiveAgent(null);
  }

  function handleClose() {
    setActiveAgent(null);
    onClose();
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-40 bg-black/60 flex items-stretch justify-center"
      onClick={(e) => {
        // Close if clicking the backdrop (not the panel)
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Modal panel */}
      <div className="relative w-full max-w-5xl bg-white flex flex-col my-4 mx-4 overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div>
            {activeAgent ? (
              <button
                onClick={handleExitRoom}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Agents Lounge
              </button>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Agents Lounge
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Try before you commit. Meet the agent. See if it&apos;s right for you.
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-900 transition-colors text-2xl leading-none ml-4"
            aria-label="Close Agents Lounge"
          >
            ✕
          </button>
        </div>

        {/* Body — card grid or embed */}
        <div className="flex-1 overflow-auto">
          {!activeAgent ? (
            /* Card Grid */
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">
                Phase 1 — 4 agents available
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {AGENTS.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onEnter={handleEnterRoom}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Embed View */
            <div className="h-full min-h-[500px]">
              <EmbedContainer agent={activeAgent} onExit={handleExitRoom} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
