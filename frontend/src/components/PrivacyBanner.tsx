"use client";

/**
 * AskStella — Agents Lounge
 * PrivacyBanner component.
 *
 * Mandatory. Non-dismissable. Visible at all times during an embed session.
 * "We are the room, not the recorder."
 */

interface PrivacyBannerProps {
  agentName: string;
  onExit: () => void;
}

export default function PrivacyBanner({ agentName, onExit }: PrivacyBannerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between text-sm">
      <span>
        You&apos;re now talking directly with{" "}
        <strong>{agentName}</strong>.{" "}
        <span className="text-gray-400">AskStella doesn&apos;t see your conversation.</span>
      </span>
      <button
        onClick={onExit}
        className="ml-4 flex-shrink-0 text-gray-300 hover:text-white underline underline-offset-2 transition-colors"
        aria-label="Exit and return to Agents Lounge"
      >
        Exit ↩
      </button>
    </div>
  );
}
