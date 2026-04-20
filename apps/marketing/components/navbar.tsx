"use client"

import { useState } from "react";
import { Menu, X, LucideIcon } from "lucide-react";

import Logo from "@repo/ui/logo";
import { navItems } from "@/data/nav-items";

import React from "react";
import ThemeToggle from "./theme-toggle";

export type NavItem = {
    text: string;
    url: string;
    icon: LucideIcon;
};

type MenuProps = {
    open: boolean;
    navItems: NavItem[];
    onClose: () => void;
};

function MobileMenu({
    open,
    navItems,
    onClose,
}: MenuProps) {
    return (
        <div className={`fixed top-16 left-0 h-full w-[50vw] bg-sidebar border-r border-t transform transition-transform duration-200 ease-out md:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
            <nav className="flex flex-col p-6 gap-6">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.text}
                            href={item.url}
                            onClick={onClose}
                            className="flex items-center gap-3"
                        >
                            <Icon className="w-5 h-5" />
                            {item.text}
                        </a>
                    );
                })}
            </nav>
        </div>
    );
}

function DesktopMenu({
    open,
    navItems,
    onClose,
}: MenuProps) {
    return (
        <nav className="hidden md:flex gap-8">
            {navItems.map((item) => {
                return <a key={item.text} href={item.url} onClick={onClose}>{item.text}</a>
            })}
            <ThemeToggle />
        </nav>
    )
}

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="z-50 fixed top-0 left-0 w-full border-b-2 border-slate-200 dark:border-zinc-900 bg-white dark:bg-black">
            <div className="flex items-center justify-between px-6 py-4">
                <div className=""><Logo /></div>

                <DesktopMenu
                    open={open}
                    navItems={navItems}
                    onClose={() => setOpen(false)}
                />

                <div className="flex gap-6 md:hidden">
                    <ThemeToggle />
                    <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
                        {open ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            <MobileMenu
                open={open}
                navItems={navItems}
                onClose={() => setOpen(false)}
            />
        </header>
    );
}