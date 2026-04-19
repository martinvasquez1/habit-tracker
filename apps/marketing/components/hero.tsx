export default function Hero() {
    return (
        <div className="flex flex-col items-center gap-2 text-center pt-48 px-8">
            <h1 className="text-4xl md:text-6xl font-bold">
                <span className="text-primary">Self-Hosted </span> Habit Tracker
            </h1>
            <p className="md:text-lg max-w-[700px] pt-4">
                Build better routines with a private, open-source habit tracker you control. Track progress, stay consistent and focus on what truly matters in your daily life—simple, flexible, and fully yours.
            </p>
            <a href="#" className="bg-primary py-3 px-8 rounded-2xl text-lg font-bold text-white mt-3" type="button">Download</a>
        </div>
    )
}