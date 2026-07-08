"use client";

/**
 * AskStella — Agents Lounge
 * EmbedContainer component.
 *
 * Renders the selected agent's interface inside the modal.
 * Supports iframe (default) and SDK (future) embed types.
 * Session is client-side only — no server logging of conversation content.
 */

import { Agent } from "@/lib/agents";
import PrivacyBanner from "./PrivacyBanner";

interface EmbedContainerProps {
  agent: Agent;
  onExit: () => void;
}

export default function EmbedContainer({ agent, onExit }: EmbedContainerProps) {
  return (
    <div className="relative flex flex-col w-full h-full">
      {/* Agent header strip */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white flex-shrink-0">
        <span className="text-2xl">{agent.avatar}</span>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{agent.name}</p>
          <p className="text-xs text-gray-500">Agents Lounge — AskStella</p>
        </div>
      </div>

      {/* Iframe embed */}
      {agent.embedType === "iframe" && (
        <iframe
          src={agent.embedUrl}
          className="flex-1 w-full border-0"
          title={`${agent.name} — AskStella Agents Lounge`}
          allow="microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      )}

      {/* SDK placeholder — swap in React SDK component per agent in Phase 2 */}
      {agent.embedType === "sdk" && (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-sm">
            <span className="text-5xl block mb-4">{agent.avatar}</span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {agent.name}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Full in-page chat launching soon. For now, click below to open{" "}
              {agent.name} in a new tab — it&apos;s free to try.
            </p>
            <a
              href={agent.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 text-white px-6 py-3 text-sm hover:bg-gray-700 transition-colors"
            >
              Open {agent.name} ↗
            </a>
          </div>
        </div>
      )}

      {/* Mandatory privacy banner — non-dismissable */}
      <PrivacyBanner agentName={agent.name} onExit={onExit} />
    </div>
  );
}
