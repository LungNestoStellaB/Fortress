/**
 * AskStella — Agents Lounge
 * Agent seat configuration for Phase 1.
 * 4 confirmed agents. Expandable to 8 in Phase 2.
 *
 * UTM tracking is injected automatically via getAffiliateUrl().
 */

export interface Agent {
  id: string;
  name: string;
  tagline: string;
  avatar: string; // emoji fallback until real assets land
  embedType: "iframe" | "sdk";
  embedUrl: string;
  signupUrl: string;
  accentColor: string;
}

export const AGENTS: Agent[] = [
  {
    id: "myclaw",
    name: "MyClaw",
    tagline: "Your personal AI assistant. Sharp, fast, and always on your side.",
    avatar: "🦅",
    embedType: "iframe",
    embedUrl: "https://app.myclaw.ai/embed",
    signupUrl: "https://myclaw.ai",
    accentColor: "#1a1a2e",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    tagline: "The world's most popular AI. Great for writing, ideas, and conversation.",
    avatar: "🤖",
    embedType: "sdk",
    embedUrl: "https://chatgpt.com",
    signupUrl: "https://chat.openai.com",
    accentColor: "#10a37f",
  },
  {
    id: "gemini",
    name: "Gemini",
    tagline: "Google's AI. Perfect if you live in Gmail, Docs, and the Google world.",
    avatar: "✨",
    embedType: "iframe",
    embedUrl: "https://gemini.google.com",
    signupUrl: "https://gemini.google.com",
    accentColor: "#4285f4",
  },
  {
    id: "canva",
    name: "Canva AI",
    tagline: "Design made easy. Turn your ideas into beautiful images and graphics.",
    avatar: "🎨",
    embedType: "iframe",
    embedUrl: "https://www.canva.com/ai-image-generator/",
    signupUrl: "https://www.canva.com",
    accentColor: "#7d2ae8",
  },
];

/**
 * Returns a sign-up or outbound URL with AskStella UTM parameters appended.
 * Required on all outbound links from the Lounge. Mandatory from day one.
 */
export function getAffiliateUrl(agent: Agent): string {
  const url = new URL(agent.signupUrl);
  url.searchParams.set("utm_source", "askstella");
  url.searchParams.set("utm_medium", "lounge");
  url.searchParams.set("utm_campaign", "meet-and-greet");
  url.searchParams.set("utm_content", agent.id);
  return url.toString();
}
