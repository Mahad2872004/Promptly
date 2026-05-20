import React, { useState } from "react";
import { PortalTask, PortalInvoice, PortalMessage } from "../types";
import { MessageSquare, Send, CheckSquare, Square, FileText, CheckCircle2, RefreshCw, SendHorizonal, Terminal } from "lucide-react";

export default function PortalView() {
  const [tasks, setTasks] = useState<PortalTask[]>([
    { id: "task-1", title: "Setup secure server-side Express sandbox with SSL key configs", status: "completed", phase: "Milestone 1", assignedTo: "Kamil" },
    { id: "task-2", title: "Generate vector embedding database tables for cognitive search", status: "completed", phase: "Milestone 1", assignedTo: "Ethan" },
    { id: "task-3", title: "Implement Row-Level Security parameters on multi-tenant tables", status: "in-progress", phase: "Milestone 2", assignedTo: "Kamil" },
    { id: "task-4", title: "Engineer patient calendar drag/drop UI state machine", status: "in-progress", phase: "Milestone 2", assignedTo: "Meera" },
    { id: "task-5", title: "Incorporate Stripe continuous payment webhook handler", status: "pending", phase: "Milestone 3", assignedTo: "Kamil" }
  ]);

  const [invoices, setInvoices] = useState<PortalInvoice[]>([
    { id: "inv-101", amount: "$12,400.00", date: "2026-05-02", status: "paid", item: "Milestone 1: Prototype Scaffolding & Blueprint Signing" },
    { id: "inv-102", amount: "$15,000.00", date: "2026-05-18", status: "sent", item: "Milestone 2: Database Schema & Secure Auth Deployment" },
    { id: "inv-103", amount: "$15,000.00", date: "Est. 2026-06-03", status: "draft", item: "Milestone 3: Production QA & Standalone Client Hand-off" }
  ]);

  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<PortalMessage[]>([
    { id: "m-1", sender: "lead-engineer", text: "Welcome to your Promptly Client Portal! I am Kamil, your Assigned Specialist. We've compiled your database schema.", timestamp: "10:14 AM" }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: PortalMessage = {
      id: `m-u-${Date.now()}`,
      sender: "client",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = chatInput.toLowerCase();
    setChatInput("");

    // Simulate Kamil replying intelligently after a small timeout
    setTimeout(() => {
      let replyText = "Understood. I have logged this technical note on our sprint board. I'll analyze this in detail and share a spec upgrade during our stand-up.";
      if (currentInput.includes("database") || currentInput.includes("postgresql") || currentInput.includes("db")) {
        replyText = "Got it. Regarding the database, we're building Row-Level Security (RLS) policies based on the tenant-uuid key to guarantee 100% isolation. I'll publish the schema on Github tonight.";
      } else if (currentInput.includes("stripe") || currentInput.includes("payment") || currentInput.includes("price")) {
        replyText = "Understood! For Stripe integration, we're proxying checkout intents via our custom server-side microservice to bypass token exposure. Let's discuss billing intervals tomorrow.";
      } else if (currentInput.includes("timeline") || currentInput.includes("sprint") || currentInput.includes("fast")) {
        replyText = "We are running exactly according to schedule! Milestone 2 tasks are 75% completed, and we expect a staging build ready for your audit on Friday.";
      }

      const specialistMsg: PortalMessage = {
        id: `m-s-${Date.now()}`,
        sender: "lead-engineer",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, specialistMsg]);
    }, 1000);
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus: "completed" | "in-progress" | "pending" =
            t.status === "completed" ? "in-progress" : t.status === "in-progress" ? "pending" : "completed";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/20">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Title Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">Simulated Workspace</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl">
            Client Hub
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Welcome to your interactive simulator hub! We give our clients absolute clarity. Click on active tasks to simulate status updates, or chat directly with your principal engineer below.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="client-dashboard-hub">
          
          {/* Left Block - Interactive Sprint Tasks & Invoices (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Direct Project Health Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl border border-slate-905 bg-slate-900/30">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-mono block">PROJECT IDENTIFIER</span>
                <span className="text-xs font-bold font-mono">PR_SaaS_09</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-mono block">COMPLETION</span>
                <span className="text-xs font-bold text-cyan-400 font-mono">68% Total</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-mono block">ACTIVE BUILD STRAY</span>
                <span className="text-xs font-bold text-teal-400 font-mono">All Green</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-mono block">DUE FOR HANDOVER</span>
                <span className="text-xs font-bold text-slate-300 font-mono">16 Days</span>
              </div>
            </div>

            {/* Task Tracker Block */}
            <div className="p-5 rounded-2xl border border-slate-900 bg-slate-900/10 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider text-slate-300">Milestone Task Registry</h3>
                <span className="text-[10px] font-mono text-slate-500">CLICK ROW TO TOGGLE STATUS</span>
              </div>

              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    id={`portal-task-${task.id}`}
                    onClick={() => toggleTaskStatus(task.id)}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 border border-transparent hover:border-slate-800 transition-colors cursor-pointer select-none"
                  >
                    <div className="shrink-0 mt-0.5" id={`task-check-${task.id}`}>
                      {task.status === "completed" && <CheckSquare className="w-4.5 h-4.5 text-cyan-400" />}
                      {task.status === "in-progress" && <span className="h-4.5 w-4.5 rounded border border-cyan-400 inline-flex items-center justify-center text-[10px] font-bold text-cyan-400 animate-pulse font-mono">/</span>}
                      {task.status === "pending" && <Square className="w-4.5 h-4.5 text-slate-600" />}
                    </div>
                    <div className="flex-1 space-y-0.5 text-left">
                      <p className={`text-xs sm:text-sm leading-normal font-sans ${task.status === "completed" ? "line-through text-slate-500" : "text-slate-300"}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <span className="uppercase text-slate-400">ASSIGNED: {task.id === "task-4" ? "MEERA" : task.id === "task-2" ? "ETHAN" : "KAMIL"}</span>
                        <span>•</span>
                        <span>{task.phase}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoices Block */}
            <div className="p-5 rounded-2xl border border-slate-900 bg-slate-900/10 space-y-4">
              <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-3">Financial Disclosures (Simulated)</h3>
              
              <div className="space-y-3">
                {invoices.map((inv) => (
                  <div key={inv.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded bg-slate-950 border border-slate-900 text-xs font-sans">
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200">{inv.item}</span>
                        <span className="font-mono text-[9px] text-slate-500">({inv.id})</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono">ISSUED: {inv.date}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3.5 pt-2 sm:pt-0 border-t sm:border-0 border-slate-900">
                      <p className="font-mono font-bold text-slate-200">{inv.amount}</p>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                        ${inv.status === "paid" ? "bg-cyan-900/20 border border-cyan-900 text-cyan-400" : ""}
                        ${inv.status === "sent" ? "bg-orange-900/20 border border-orange-900 text-orange-400 animate-pulse" : ""}
                        ${inv.status === "draft" ? "bg-slate-900 border border-slate-800 text-slate-500" : ""}
                      `}>
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Block - Simulated Real-Time Specialist Developer Chat (Col 5) */}
          <div className="lg:col-span-5 flex flex-col h-[580px] rounded-2xl border border-slate-900 bg-slate-900/20 shadow-xl overflow-hidden">
            
            {/* Chat Head */}
            <div className="p-4 bg-slate-950 border-b border-slate-900 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-cyan-950 border border-cyan-900 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                KV
              </div>
              <div className="text-left space-y-0.5">
                <p className="font-sans font-bold text-xs text-slate-200 leading-none">Kamil Vance</p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Your Assigned Specialist (Online)</span>
                </div>
              </div>
            </div>

            {/* Simulated Chat Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 flex flex-col justify-end" id="chat-messages-container">
              {messages.map((msg) => {
                const isClient = msg.sender === "client";
                return (
                  <div 
                    key={msg.id} 
                    className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed flex flex-col space-y-1 text-left
                      ${isClient 
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white self-end rounded-tr-none" 
                        : "bg-slate-950 border border-slate-850 text-slate-300 self-start rounded-tl-none"
                      }
                    `}
                  >
                    <p className="font-sans">{msg.text}</p>
                    <span className={`text-[9px] font-mono block text-right mt-1
                      ${isClient ? "text-orange-200" : "text-slate-500"}
                    `}>
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-950/80 border-t border-slate-900 flex gap-2" id="portal-chat-form">
              <input
                type="text"
                required
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask kamil about 'database', 'stripe', or 'timeline'..."
                className="flex-1 rounded border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="p-2 rounded bg-cyan-500 hover:bg-cyan-600 text-slate-950 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
