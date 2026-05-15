import { useState } from "react";
import { useNavigate } from "react-router-dom";
import columnsData from "./columns_data.json";
import Navbar from "../components/Navbar";

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-2 transition-transform duration-300 group-hover:-translate-x-1">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export default function SessionForm() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selections, setSelections] = useState(
    Object.fromEntries(columnsData.map(col => [col.title, ""]))
  );

  const allSelected =
    projectName.trim() !== "" &&
    columnsData.every(col => selections[col.title] !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/session-mixer", {
      state: { projectName: projectName.trim(), projectDescription: projectDescription.trim(), selections },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-neutral-900 px-4 md:px-6 pt-16 md:pt-24 pb-16 font-['Poppins',_sans-serif]">
      <Navbar />
      <div className="max-w-2xl mx-auto">
        <a
          href="/"
          className="group inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors mb-6"
        >
          <ArrowLeft />
          Return Home
        </a>

        <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-2">
          New Session
        </h1>
        <p className="text-sm text-neutral-500 mb-10">
          Define your architectural parameters to compose a spatial soundscape.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project name */}
          <div>
            <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder="e.g. Museum Foyer Study"
              maxLength={200}
              required
              className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 bg-white"
            />
          </div>

          {/* Project description */}
          <div>
            <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-2">
              Project Description
              <span className="ml-2 normal-case tracking-normal font-normal text-neutral-400">(optional)</span>
            </label>
            <textarea
              value={projectDescription}
              onChange={e => setProjectDescription(e.target.value)}
              placeholder="Briefly describe the space, intent, or context of this session…"
              maxLength={1000}
              rows={3}
              className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 bg-white resize-none"
            />
          </div>

          {/* One selector per architectural category */}
          {columnsData.map(col => {
            const uniqueLabels = [...new Set(col.items.map(item => item.label))];
            return (
              <div key={col.title}>
                <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 block mb-1">
                  {col.title}
                </label>
                {col.description && (
                  <p className="text-xs text-neutral-400 mb-3">{col.description}</p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {uniqueLabels.map(label => (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        setSelections(s => ({ ...s, [col.title]: label }))
                      }
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors text-left ${
                        selections[col.title] === label
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <button
            type="submit"
            disabled={!allSelected}
            className="w-full py-3 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Open Mixer →
          </button>
        </form>
      </div>
    </div>
  );
}
