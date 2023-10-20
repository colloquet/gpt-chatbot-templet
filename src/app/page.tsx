"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { v4 as uuid } from "uuid";
import { Github } from "lucide-react";

import ChatFooter from "../components/ChatFooter";
import ChatBody from "../components/ChatBody";
import { DEFAULT_SYSTEM_PROMPT } from "../constant";
import SystemPromptEditor from "../components/SystemPromptEditor";

export default function Chat() {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    error,
  } = useChat({
    initialMessages: [
      {
        id: uuid(),
        content:
          "Hello! Thanks for using this template. On a larger screen, you'll find the context provided to ChatGPT on the left. Feel free to edit it and modify the conversation's context. By adding more context, we can enhance the AI's knowledge.",
        role: "system",
      },
    ],
    body: {
      systemPrompt,
    },
  });

  return (
    <main className="m-auto flex h-[100dvh] w-full max-w-screen-2xl flex-col bg-white dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b px-4 py-2 dark:border-zinc-800">
        <div className="text-lg font-bold text-zinc-700 dark:text-zinc-200">
          GPT Chatbot Template
        </div>
        <a
          href="https://github.com/colloquet/gpt-chatbot-templet"
          target="_blank"
          title="View source code on Github"
        >
          <Github />
        </a>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <SystemPromptEditor value={systemPrompt} onChange={setSystemPrompt} />
        <div className="flex flex-1 flex-col overflow-auto">
          {error ? (
            <div className="flex flex-1 items-center justify-center p-4">
              <div className="text-zinc-400">{error.message}</div>
            </div>
          ) : (
            <>
              <ChatBody messages={messages} isLoading={isLoading} />

              <ChatFooter
                input={input}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onSuggestionClick={(suggestion) => {
                  append({
                    id: uuid(),
                    content: suggestion,
                    role: "user",
                  });
                }}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
