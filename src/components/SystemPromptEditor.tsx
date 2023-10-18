import { useState } from "react";
import dynamic from "next/dynamic";

import Spinner from "./Spinner";
import useDarkMode from "../hooks/useDarkMode";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SystemPromptEditor = ({ value, onChange }: Props) => {
  const isDarkMode = useDarkMode();

  const [editorMounted, setEditorMounted] = useState(false);

  return (
    <div className="hidden flex-1 overflow-hidden border-r outline-none dark:border-zinc-800 md:block">
      {!editorMounted && (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4 text-sm text-zinc-400">
          <Spinner />
          Loading context prompt
        </div>
      )}
      <MonacoEditor
        value={value}
        onChange={onChange}
        language="markdown"
        theme={isDarkMode ? "vs-dark" : "vs-light"}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
          padding: {
            top: 16,
            bottom: 16,
          },
          automaticLayout: true,
        }}
        editorDidMount={() => setEditorMounted(true)}
      />
    </div>
  );
};

export default SystemPromptEditor;
