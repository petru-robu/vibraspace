import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../routes";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Menu Trigger Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed top-6 right-6 z-40 flex items-center gap-3 px-5 py-2.5 transition-all duration-300 group"
            >
                <div className="flex flex-col gap-2 w-10">
                    <span className="h-0.5 w-full bg-white group-hover:bg-indigo-600 transition-colors"></span>
                    <span className="h-0.5 w-full bg-white group-hover:bg-indigo-600 transition-colors"></span>
                </div>
            </button>

            {/* Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-72 md:w-80 bg-black z-50 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <div className="flex justify-end p-6">
                    <button
                        onClick={() => setOpen(false)}
                        className="text-white hover:text-indigo-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-8 px-10 pt-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="group text-3xl font-light text-white hover:text-indigo-600 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Footer info in Sidebar
                <div className="mt-auto p-10 border-t border-gray-100 text-gray-400 text-sm">
                    <p>2026 Your Studio</p>
                </div> */}
            </div>
        </>
    );
}
