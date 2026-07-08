"use client";

import { useState } from "react";
import "./globals.css";
import AgentsLoungeModal from "@/components/AgentsLoungeModal";

// Metadata moved to layout.tsx (required: metadata export incompatible with "use client")

const categories = [
  { name: "Work", description: "Productivity, writing, scheduling, and professional tools" },
  { name: "Organization", description: "Note-taking, memory, and life management" },
  { name: "Creativity", description: "Design, content, and artistic expression" },
  { name: "Learning", description: "Research, study, and skill development" },
  { name: "Everyday Life", description: "Health, finance, and daily convenience" },
];

export default function Home() {
  const [loungeOpen, setLoungeOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <AgentsLoungeModal isOpen={loungeOpen} onClose={() => setLoungeOpen(false)} />
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
          I&apos;ll help you ask the right questions.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
          A guide service helping people find their right AI agent. 
          Curated recommendations for ordinary people.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#submit"
            className="inline-block bg-gray-900 text-white px-8 py-4 text-lg rounded-none hover:bg-gray-800 transition-colors"
          >
            Get Started
          </a>
          <button
            className="inline-block border border-gray-300 text-gray-700 px-8 py-4 text-lg rounded-none hover:bg-gray-50 transition-colors"
          >
            Take the Quiz
          </button>
          <button
            onClick={() => setLoungeOpen(true)}
            className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-4 text-lg rounded-none hover:bg-gray-900 hover:text-white transition-colors font-medium"
          >
            Meet &amp; Greet
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-gray-100">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8">
          Find Your Category
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href={`#${category.name.toLowerCase()}`}
              className="block p-6 border border-gray-200 hover:border-gray-400 transition-colors group"
            >
              <h3 className="text-xl font-medium text-gray-900 group-hover:text-gray-700 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600">{category.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Question Submission Section */}
      <section id="submit" className="max-w-2xl mx-auto px-6 py-24 border-t border-gray-100">
        <h2 className="text-3xl font-light text-gray-900 mb-4">
          What do you need help with?
        </h2>
        <p className="text-gray-600 mb-8">
          Tell us what you need, and we&apos;ll send your personalized guide within 24 hours.
        </p>
        
        <form className="space-y-6" onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const response = await fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
            alert("Thanks! We'll send your personalized guide to " + formData.get("email") + " within 24 hours.");
            e.currentTarget.reset();
          } else {
            alert("There was an error submitting your request. Please try again.");
          }
        }}>
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
              What do you need help with?
            </label>
            <textarea
              id="question"
              name="question"
              rows={4}
              maxLength={500}
              required
              className="w-full p-4 border border-gray-300 focus:border-gray-500 focus:ring-0 outline-none"
              placeholder="I'm looking for an AI tool to help with..."
            />
            <p className="text-xs text-gray-500 mt-1 text-right">Max 500 characters</p>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category (optional)
            </label>
            <select
              id="category"
              name="category"
              className="w-full p-4 border border-gray-300 focus:border-gray-500 focus:ring-0 outline-none bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name.toLowerCase()}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-4 border border-gray-300 focus:border-gray-500 focus:ring-0 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 text-lg hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          We&apos;ll send your personalized guide to your email within 24 hours.
        </p>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          © 2026 AskStella. A guide service for ordinary people.
        </p>
      </footer>
    </main>
  );
}