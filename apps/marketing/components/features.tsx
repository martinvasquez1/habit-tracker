import { LayoutGrid, SlidersHorizontal, Flame,  MoonStar, Archive, Lock } from "lucide-react"

const features = [
    {
        title: "Habit Overview",
        body: "Track your consistency at a glance with clean visuals that make daily progress satisfying and easy to follow.",
        icon: LayoutGrid,
        bg: "bg-blue-600 dark:bg-blue-800"
    },
    {
        title: "Flexible Setup",
        body: "Create and personalize habits in seconds, adapting them to your routine with ease and clarity.",
        icon: SlidersHorizontal,
        bg: "bg-yellow-400 dark:bg-yellow-600"
    },
    {
        title: "Streak Momentum",
        body: "Build motivation naturally by maintaining streaks and watching your consistency grow over time.",
        icon: Flame,
        bg: "bg-orange-400 dark:bg-orange-700"
    },
    {
        title: "Adaptive Themes",
        body: "Switch between light and dark modes or let the interface adjust automatically to your system preferences.",
        icon: MoonStar,
        bg: "bg-violet-500 dark:bg-violet-800"
    },
    {
        title: "Archive",
        body: "Keep your workspace focused by setting habits aside without losing progress, and bring them back anytime.",
        icon: Archive,
        bg: "bg-green-500 dark:bg-green-700"
    },
    {
        title: "Private",
        body: "Your data stays under your control, with optional backups and no unnecessary data collection.",
        icon: Lock,
        bg: "bg-rose-500 dark:bg-rose-700"
    }
];

export default function Features() {
    return (
        <div className="pt-20 max-w-7xl mx-auto text-center px-6">
            <h2 className="text-xl md:text-4xl font-bold">Everything you need to build habits that stick</h2>
            <p className="md:text-lg mt-4">Simple features to keep you on track and building better habits every day.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 pt-8 md:pt-12">
                {features.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            className="p-6 rounded-xl border-2 text-left border-slate-200/70 dark:border-zinc-900"
                            key={item.title}
                        >
                            <div className={`${item.bg} p-3 rounded-lg inline-flex mb-4`}>
                                <Icon className="w-5 h-5 text-white dark:text-gray-100" />
                            </div>

                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="mt-2">{item.body}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}