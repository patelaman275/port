'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Radio,
  AlertTriangle,
  Play,
  RotateCcw,
  Navigation,
  ShieldAlert,
  Wifi,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';

interface EasyTripSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SocketLog {
  id: string;
  time: string;
  event: string;
  payload: string;
  latency: number;
  type: 'info' | 'coords' | 'sos';
}

export default function EasyTripSimulatorModal({ isOpen, onClose }: EasyTripSimulatorModalProps) {
  // Simulator State
  const [riderA, setRiderA] = useState({ x: 30, y: 65, lat: 26.8467, lng: 80.9462, speed: 45 });
  const [riderB, setRiderB] = useState({ x: 60, y: 40, lat: 26.8512, lng: 80.9528, speed: 48 });
  const [isSimulating, setIsSimulating] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [sosAckTime, setSosAckTime] = useState<number | null>(null);
  const [logs, setLogs] = useState<SocketLog[]>([
    {
      id: 'init-1',
      time: '12:00:00',
      event: 'connection',
      payload: 'Client connected: socket.id = #aman_rider_01',
      latency: 24,
      type: 'info',
    },
    {
      id: 'init-2',
      time: '12:00:01',
      event: 'join_room',
      payload: 'Joined room: #LUCKNOW_EXP (6-char invite code)',
      latency: 38,
      type: 'info',
    },
  ]);

  const logContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Movement Simulation Interval
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const deltaLatA = (Math.random() - 0.4) * 0.0015;
      const deltaLngA = (Math.random() - 0.3) * 0.0015;
      const latencyA = Math.floor(Math.random() * 25) + 32;

      setRiderA((prev) => {
        const newX = Math.max(10, Math.min(85, prev.x + (Math.random() * 4 - 1.5)));
        const newY = Math.max(15, Math.min(85, prev.y - Math.random() * 3));
        return {
          x: newX,
          y: newY,
          lat: Number((prev.lat + deltaLatA).toFixed(5)),
          lng: Number((prev.lng + deltaLngA).toFixed(5)),
          speed: Math.floor(Math.random() * 15) + 40,
        };
      });

      setRiderB((prev) => {
        const newX = Math.max(15, Math.min(85, prev.x + (Math.random() * 3 - 1.2)));
        const newY = Math.max(15, Math.min(85, prev.y - Math.random() * 3.2));
        return {
          x: newX,
          y: newY,
          lat: Number((prev.lat + deltaLatA * 0.9).toFixed(5)),
          lng: Number((prev.lng + deltaLngA * 0.9).toFixed(5)),
          speed: Math.floor(Math.random() * 12) + 42,
        };
      });

      setLogs((prev) => [
        ...prev.slice(-20),
        {
          id: `coord-${Date.now()}`,
          time: now,
          event: 'sendLocation',
          payload: `Rider A (Aman) broadcasted lat/lng delta to roompeers (#LUCKNOW_EXP)`,
          latency: latencyA,
          type: 'coords',
        },
      ]);
    }, 1400);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Trigger Mock SOS Alert
  const handleTriggerSOS = () => {
    const now = new Date().toLocaleTimeString();
    const mockLatency = Math.floor(Math.random() * 18) + 35; // 35 - 53ms broadcast
    setSosActive(true);
    setSosAckTime(mockLatency);

    setLogs((prev) => [
      ...prev,
      {
        id: `sos-${Date.now()}`,
        time: now,
        event: 'EMERGENCY_SOS_BROADCAST',
        payload: `⚠️ CRITICAL: Rider A triggered SOS at 26.8467° N, 80.9462° E! Distress ping delivered to all peers in room.`,
        latency: mockLatency,
        type: 'sos',
      },
    ]);

    // Audio chime if supported
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(650, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.36);
    } catch {}
  };

  const handleReset = () => {
    setIsSimulating(false);
    setSosActive(false);
    setSosAckTime(null);
    setRiderA({ x: 30, y: 65, lat: 26.8467, lng: 80.9462, speed: 45 });
    setRiderB({ x: 60, y: 40, lat: 26.8512, lng: 80.9528, speed: 48 });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl h-[92vh] sm:h-[86vh] max-h-[780px] rounded-2xl border border-[#303030] shadow-2xl bg-[#0F0F0F] text-[#CCCCCC] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 0 60px rgba(254,128,64,0.15), 0 25px 60px rgba(0,0,0,0.85)',
          }}
        >
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-[#303030] bg-[#121212] flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center font-bold">
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className="font-bold text-sm text-[#F5F5F5] tracking-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    EasyTrip WebSocket Mesh Simulator
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#222222] text-[#FE8040] border border-[#303030]">
                    Socket.io v4.7
                  </span>
                </div>
                <p className="text-[11px] text-[#777777] font-mono">
                  Live full-duplex bi-directional GPS event routing &amp; sub-500ms emergency broadcast
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[#222222] text-[#777777] hover:text-[#FE8040] transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 7 Cols: Interactive Map Canvas */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#FE8040] flex items-center gap-1.5 font-bold">
                  <Wifi className="w-3.5 h-3.5" />
                  <span>SIMULATED ROOM: #LUCKNOW_EXP</span>
                </span>
                <span className="text-[#777777] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>2 Active Connected Peers</span>
                </span>
              </div>

              {/* Map Surface */}
              <div
                className="relative w-full h-[280px] sm:h-[340px] rounded-xl border border-[#303030] overflow-hidden bg-[#0A0D10]"
                style={{
                  backgroundImage:
                    'radial-gradient(#1f2937 1px, transparent 1px), radial-gradient(#111827 1px, #07090b 1px)',
                  backgroundSize: '24px 24px',
                  backgroundPosition: '0 0, 12px 12px',
                }}
              >
                {/* Simulated Road Highway Polyline */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 50 280 Q 140 180 220 120 T 360 40"
                    fill="none"
                    stroke="#262626"
                    strokeWidth="28"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50 280 Q 140 180 220 120 T 360 40"
                    fill="none"
                    stroke="#FE8040"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    opacity="0.6"
                  />
                </svg>

                {/* Rider A Marker (Aman - Host) */}
                <motion.div
                  animate={{ left: `${riderA.x}%`, top: `${riderA.y}%` }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                >
                  <div className="relative flex flex-col items-center">
                    {/* SOS Pulse Aura */}
                    {sosActive && (
                      <span className="absolute -inset-3 rounded-full bg-red-500/40 animate-ping" />
                    )}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-colors ${
                        sosActive
                          ? 'bg-red-500 text-white shadow-red-500/50'
                          : 'bg-[#FE8040] text-[#0F0F0F] shadow-orange-500/30'
                      }`}
                    >
                      {sosActive ? <AlertTriangle className="w-4 h-4 animate-bounce" /> : 'A'}
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded bg-[#121212]/90 border border-[#303030] text-[10px] font-mono text-[#F5F5F5] whitespace-nowrap shadow-sm">
                      Aman ({riderA.speed} km/h)
                    </span>
                  </div>
                </motion.div>

                {/* Rider B Marker (Peer) */}
                <motion.div
                  animate={{ left: `${riderB.x}%`, top: `${riderB.y}%` }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#38bdf8] text-[#0F0F0F] flex items-center justify-center font-bold text-xs shadow-md">
                      B
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded bg-[#121212]/90 border border-[#303030] text-[10px] font-mono text-[#F5F5F5] whitespace-nowrap shadow-sm">
                      Peer B ({riderB.speed} km/h)
                    </span>
                  </div>
                </motion.div>

                {/* SOS Emergency Overlay Flash */}
                <AnimatePresence>
                  {sosActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-3 left-3 right-3 p-3 rounded-lg bg-red-950/85 border border-red-500/50 text-red-200 text-xs flex items-center justify-between z-30 backdrop-blur-sm shadow-xl"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-400 animate-spin" />
                        <div>
                          <p className="font-bold text-white text-xs">EMERGENCY SOS BROADCAST ACTIVE</p>
                          <p className="text-[10px] text-red-300 font-mono">
                            Delivered across room in <span className="font-bold underline">{sosAckTime}ms</span>
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-red-900/60 px-2 py-0.5 rounded border border-red-400/40 text-red-100">
                        LATENCY: {sosAckTime}ms
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Coordinate HUD Bottom Left */}
                <div className="absolute bottom-2 left-2 z-10 px-2.5 py-1.5 rounded-lg bg-[#121212]/80 backdrop-blur-sm border border-[#303030] text-[10px] font-mono text-[#999999] space-y-0.5">
                  <div>Rider A: {riderA.lat}, {riderA.lng}</div>
                  <div>Rider B: {riderB.lat}, {riderB.lng}</div>
                </div>
              </div>

              {/* Simulator Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                    isSimulating
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-[#FE8040] hover:bg-[#FF995F] text-[#0F0F0F]'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isSimulating ? 'Pause GPS Stream' : 'Simulate Rider Movement'}</span>
                </button>

                <button
                  onClick={handleTriggerSOS}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-500 text-white transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Trigger Mock SOS</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl border border-[#303030] bg-[#191919] text-[#999999] hover:text-[#FE8040] transition-colors cursor-pointer"
                  title="Reset positions"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Live Socket.IO Event Stream & Tech Highlights */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#FE8040] flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>REAL-TIME PACKET LOG</span>
                </span>
                <span className="text-[10px] text-[#777777]">Sub-50ms relay</span>
              </div>

              {/* Console log box */}
              <div
                ref={logContainerRef}
                className="flex-1 min-h-[220px] max-h-[300px] lg:max-h-[340px] rounded-xl border border-[#303030] bg-[#0A0D10] p-3 font-mono text-[11px] overflow-y-auto space-y-2 select-text"
                style={{ scrollbarWidth: 'thin' }}
              >
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-2 rounded-lg border leading-tight ${
                      log.type === 'sos'
                        ? 'bg-red-950/40 border-red-500/50 text-red-200'
                        : log.type === 'coords'
                        ? 'bg-[#121212] border-[#222222] text-[#CCCCCC]'
                        : 'bg-[#161616] border-[#262626] text-[#888888]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 text-[10px] text-[#777777]">
                      <span className="font-bold text-[#FE8040]">{log.event}</span>
                      <div className="flex items-center gap-2">
                        <span>{log.latency}ms</span>
                        <span>{log.time}</span>
                      </div>
                    </div>
                    <div className="text-[11px] leading-relaxed">{log.payload}</div>
                  </div>
                ))}
              </div>

              {/* Architecture Architecture Highlights */}
              <div className="p-3.5 rounded-xl border border-[#303030] bg-[#121212] space-y-1.5 text-xs text-[#999999]">
                <div className="flex items-center gap-1.5 font-bold text-[#F5F5F5] font-mono text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#FE8040]" />
                  <span>How Aman Built EasyTrip with Socket.io</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  In-memory room maps maintain state without database bottlenecks during rapid highway travel. Bidirectional coordinate streaming relays GPS packets across all room participants simultaneously with sub-500ms guaranteed delivery.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
