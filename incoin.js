// App.jsx
// The Great INCoin Heist
// React + Tailwind + Framer Motion
// Clean indie-style mystery game

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Timer,
    Monitor,
    Gamepad2,
    Building2,
    FileText,
    Search,
    ShieldAlert,
    Footprints,
    Trophy,
    Siren,
} from "lucide-react";

const ROOMS = [
    {
        id: "imacs",
        name: "iMacs Area",
        icon: Monitor,
        vibe: "Rows of glowing iMacs. Keyboard sounds everywhere.",
        clues: [
            {
                title: "Suspicious USB",
                text: "A USB labelled 'final_final_REAL_export.mov'.",
                suspect: "Joshua",
            },
            {
                title: "Auto Lock Script",
                text: "Someone made a script to remotely lock the display case.",
                suspect: "Si Yuan",
            },
        ],
    },
    {
        id: "games",
        name: "Games Area",
        icon: Gamepad2,
        vibe: "Arcade noises. Someone raging at Mario Kart.",
        clues: [
            {
                title: "Scoreboard Screenshot",
                text: "Joshua left the Games Area earlier than he claimed.",
                suspect: "Joshua",
            },
            {
                title: "Broken Controller",
                text: "Avyan blamed lag for everything again.",
                suspect: "Avyan",
            },
        ],
    },
    {
        id: "tunnel",
        name: "INC Tunnel",
        icon: Footprints,
        vibe: "Dim lights. Quiet footsteps echoing.",
        clues: [
            {
                title: "Footprints",
                text: "Fresh shoe prints lead toward Townhall.",
                suspect: "Kesler",
            },
            {
                title: "CCTV Gap",
                text: "The cameras went offline for exactly 3 minutes.",
                suspect: "Joshua",
            },
        ],
    },
    {
        id: "board",
        name: "Board Room",
        icon: FileText,
        vibe: "Important papers. Coffee cups everywhere.",
        clues: [
            {
                title: "Redacted Notes",
                text: "Someone knew the INCoin security schedule.",
                suspect: "Joshua",
            },
            {
                title: "Meeting List",
                text: "Ted wasn't supposed to be here today.",
                suspect: "Ted",
            },
        ],
    },
    {
        id: "townhall",
        name: "Townhall",
        icon: Building2,
        vibe: "Emergency lights blinking softly.",
        clues: [],
    },
];

const SUSPECTS = [
    {
        name: "Ekansh",
        role: "Overconfident coder",
        emoji: "🧠",
        dialogue: [
            "I literally made a deduction board in my head already.",
            "The clues aren't adding up.",
            "Joshua's calmness is kinda suspicious though.",
        ],
    },
    {
        name: "Si Yuan",
        role: "Quiet tech genius",
        emoji: "💻",
        dialogue: [
            "The CCTV outage wasn't random.",
            "Somebody accessed the server manually.",
            "I didn't touch the INCoin, relax.",
        ],
    },
    {
        name: "Joshua",
        role: "Helpful organiser",
        emoji: "🙂",
        dialogue: [
            "I was helping set up Townhall.",
            "Wait... how did you know the cameras were off?",
            "The INCoin should still be nearby.",
        ],
    },
    {
        name: "Kesler",
        role: "Chaotic funny guy",
        emoji: "😂",
        dialogue: [
            "Bro what if the INCoin became sentient.",
            "I saw someone sprinting actually.",
            "This is better than Netflix honestly.",
        ],
    },
    {
        name: "Avyan",
        role: "Competitive gamer",
        emoji: "🎮",
        dialogue: [
            "I swear it was lag.",
            "Why is everyone acting sus.",
            "Okay but what if Ted did it.",
        ],
    },
];

const randomAds = [
    "BREAKING: Free pizza spotted near Townhall.",
    "Reminder: Do NOT unplug the iMacs again.",
    "Someone lost a hoodie in INC Tunnel.",
    "Open House begins in less than 5 minutes.",
];

export default function App() {
    const [room, setRoom] = useState("imacs");
    const [timeLeft, setTimeLeft] = useState(300);
    const [foundClues, setFoundClues] = useState([]);
    const [popup, setPopup] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [victory, setVictory] = useState(false);
    const [selectedSuspect, setSelectedSuspect] = useState(null);
    const [news, setNews] = useState(randomAds[0]);

    const currentRoom = useMemo(
        () => ROOMS.find((r) => r.id === room),
        [room]
    );

    useEffect(() => {
        if (gameOver || victory) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setGameOver(true);
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameOver, victory]);

    useEffect(() => {
        const adTimer = setInterval(() => {
            setNews(randomAds[Math.floor(Math.random() * randomAds.length)]);
        }, 5000);

        return () => clearInterval(adTimer);
    }, []);

    const formatTime = () => {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const discoverClue = (clue) => {
        if (foundClues.find((c) => c.title === clue.title)) return;

        setFoundClues((prev) => [...prev, clue]);
        setPopup(clue);

        setTimeout(() => {
            setPopup(null);
        }, 3000);
    };

    const accuse = (name) => {
        setSelectedSuspect(name);

        if (name === "Joshua") {
            setVictory(true);
        } else {
            setGameOver(true);
        }
    };

    const suspicionLevel = (name) => {
        return foundClues.filter((c) => c.suspect === name).length * 25;
    };

    if (victory) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-2xl w-full bg-zinc-900 rounded-3xl border border-zinc-800 p-10 shadow-2xl text-center"
                >
                    <motion.div
                        animate={{ rotate: [0, 4, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-6xl mb-5"
                    >
                        🪙
                    </motion.div>

                    <h1 className="text-5xl font-black tracking-tight mb-4">
                        CASE CLOSED
                    </h1>

                    <p className="text-zinc-400 text-lg mb-8">
                        Joshua quietly smirks before finally admitting everything.
                    </p>

                    <div className="bg-zinc-800 rounded-2xl p-6 text-left mb-8">
                        <p className="text-zinc-200 leading-relaxed">
                            “So… you figured it out.”
                            <br />
                            <br />
                            “I had to steal the INCoin before the Open House.”
                            <br />
                            <br />
                            “You were smarter than I expected.”
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-800 rounded-2xl p-5">
                            <p className="text-zinc-500 text-sm mb-1">INCoin Status</p>
                            <p className="font-bold text-xl">Recovered ✅</p>
                        </div>

                        <div className="bg-zinc-800 rounded-2xl p-5">
                            <p className="text-zinc-500 text-sm mb-1">Detective Rank</p>
                            <p className="font-bold text-xl">Master Detective 🕵️</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
                <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
                    <div className="text-6xl mb-6">💀</div>

                    <h1 className="text-4xl font-black mb-4">
                        The thief escaped
                    </h1>

                    <p className="text-zinc-400 mb-8">
                        The Open House starts in 10 seconds...
                        <br />
                        Joshua quietly smirks in the background.
                    </p>

                    <div className="bg-zinc-800 rounded-2xl p-5">
                        <p className="text-sm text-zinc-500 mb-1">
                            Wrong Accusation
                        </p>
                        <p className="font-semibold">
                            You accused {selectedSuspect || "nobody"}.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
            {/* Top Bar */}
            <div className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
                <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">
                            The Great INCoin Heist
                        </h1>
                        <p className="text-zinc-500 text-sm">
                            Solve the mystery before Open House starts.
                        </p>
                    </div>

                    <motion.div
                        animate={{
                            scale: timeLeft < 60 ? [1, 1.05, 1] : 1,
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                        }}
                        className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3"
                    >
                        <Timer size={18} />
                        <span className="font-bold text-lg">
                            {formatTime()}
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Fake News Alert */}
            <div className="border-b border-zinc-800 bg-zinc-900">
                <motion.div
                    key={news}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto px-5 py-3 text-sm text-zinc-300"
                >
                    📢 {news}
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto p-5 grid lg:grid-cols-[260px_1fr_320px] gap-5">
                {/* Sidebar */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 h-fit">
                    <h2 className="font-bold mb-4 text-zinc-300">
                        Rooms
                    </h2>

                    <div className="space-y-2">
                        {ROOMS.map((r) => {
                            const Icon = r.icon;

                            return (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    key={r.id}
                                    onClick={() => setRoom(r.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition ${room === r.id
                                            ? "bg-white text-black"
                                            : "bg-zinc-800 hover:bg-zinc-700"
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium">{r.name}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={room}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="space-y-5"
                    >
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h2 className="text-3xl font-black">
                                        {currentRoom.name}
                                    </h2>
                                    <p className="text-zinc-400 mt-2">
                                        {currentRoom.vibe}
                                    </p>
                                </div>

                                <Search className="text-zinc-500" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {currentRoom.clues.map((clue, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ y: -3 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => discoverClue(clue)}
                                        className="text-left bg-zinc-800 hover:bg-zinc-700 transition rounded-2xl p-5 border border-zinc-700"
                                    >
                                        <p className="font-semibold mb-2">
                                            {clue.title}
                                        </p>

                                        <p className="text-sm text-zinc-400">
                                            Tap to inspect evidence
                                        </p>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Suspects */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                            <h2 className="text-2xl font-black mb-5">
                                Suspects
                            </h2>

                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {SUSPECTS.map((suspect) => (
                                    <motion.div
                                        whileHover={{ y: -3 }}
                                        key={suspect.name}
                                        className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h3 className="font-bold text-lg">
                                                    {suspect.emoji} {suspect.name}
                                                </h3>

                                                <p className="text-zinc-500 text-sm">
                                                    {suspect.role}
                                                </p>
                                            </div>

                                            <ShieldAlert
                                                size={18}
                                                className="text-zinc-500"
                                            />
                                        </div>

                                        <p className="text-zinc-300 text-sm mb-5 min-h-[70px]">
                                            "
                                            {
                                                suspect.dialogue[
                                                Math.floor(
                                                    Math.random() *
                                                    suspect.dialogue.length
                                                )
                                                ]
                                            }
                                            "
                                        </p>

                                        {/* Suspicion Meter */}
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs text-zinc-500 mb-2">
                                                <span>Suspicion</span>
                                                <span>
                                                    {suspicionLevel(suspect.name)}%
                                                </span>
                                            </div>

                                            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width: `${suspicionLevel(
                                                            suspect.name
                                                        )}%`,
                                                    }}
                                                    className="h-full bg-white"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => accuse(suspect.name)}
                                            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
                                        >
                                            Accuse
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Evidence Panel */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 h-fit">
                    <div className="flex items-center gap-3 mb-5">
                        <FileText size={18} />
                        <h2 className="font-bold">
                            Evidence Board
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {foundClues.length === 0 && (
                            <div className="text-zinc-500 text-sm">
                                No evidence collected yet.
                            </div>
                        )}

                        {foundClues.map((clue, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={i}
                                className="bg-zinc-800 rounded-2xl p-4 border border-zinc-700"
                            >
                                <p className="font-semibold mb-1">
                                    {clue.title}
                                </p>

                                <p className="text-sm text-zinc-400 mb-2">
                                    {clue.text}
                                </p>

                                <div className="text-xs text-zinc-500">
                                    Related to: {clue.suspect}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Clue Popup */}
            <AnimatePresence>
                {popup && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-4 rounded-2xl shadow-2xl z-50 max-w-md"
                    >
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={18} />

                            <div>
                                <p className="font-bold mb-1">
                                    {popup.title}
                                </p>

                                <p className="text-sm opacity-80">
                                    {popup.text}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}