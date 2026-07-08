"use client";

/**
 * AskStella — Agents Lounge
 * AgentCard component.
 *
 * Displays a single agent in the lounge grid.
 * Warm, lounge-like style — not clinical.
 */

import { Agent, getAffiliateUrl } from "@/lib/agents";

interface AgentCardProps {
  agent: Agent;
  onEnter: (agent: Agent) => void;
}

export default function AgentCard({ agent, onEnter }: AgentCardProps) {
  return (
    <div
      className="relative flex flex-col bg-white border border-gray-200 p-6 hover:border-gray-400 hover:shadow-md transition-all duration-200 group"
      style={{ borderTopColor: agent.accentColor, borderTopWidth: 3 }}
    >
      {/* Avatar */}
      <div className="text-4xl mb-4 select-none">{agent.avatar}</div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>

      {/* Tagline */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6">
        {agent.tagline}
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onEnter(agent)}
          className="w-full bg-gray-900 text-white py-3 text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Enter the room
        </button>
        <a
          href={getAffiliateUrl(agent)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center border border-gray-200 text-gray-600 py-2 text-xs hover:border-gray-400 hover:text-gray-900 transition-colors"
        >
          Learn more ↗
        </a>
      </div>
    </div>
  );
}
