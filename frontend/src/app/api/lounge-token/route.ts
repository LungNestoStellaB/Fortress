/**
 * AskStella — Agents Lounge
 * Session token endpoint for ChatKit (OpenAI) integration.
 * Generates a lightweight ephemeral session identifier so the client
 * can initialise ChatKit without exposing the raw API key.
 *
 * NOTE: Replace OPENAI_API_KEY in your environment variables.
 * This endpoint is client-facing — never log conversation content here.
 */

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  try {
    // Generate a short-lived ephemeral session token
    // In production, exchange this with OpenAI's session endpoint if ChatKit requires it
    const sessionToken = crypto.randomBytes(24).toString("hex");
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes

    // Analytics-only: log session initiation (no conversation content)
    // Supabase or lightweight KV store write can go here in Phase 2

    return NextResponse.json(
      { sessionToken, expiresAt },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to generate session token" },
      { status: 500 }
    );
  }
}
