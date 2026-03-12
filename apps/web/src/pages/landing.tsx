export default function Landing() {
  return (
    <div className="h-[calc(100vh-4.5rem)] bg-primary/80 text-white md:pl-20 text-center md:text-left">
      <h1 className="text-3xl sm:text-5xl font-medium pt-28">
        Small Steps,
        <br />
        <span className="text-5xl sm:text-7xl md:text-8xl font-bold">
          <span className="underline-offset-2">Big </span> Changes
        </span>
      </h1>
      <p className="mt-2 md:mt-8 text-lg sm:text-xl md:text-2xl font-medium">
        An app designed for your success.
      </p>
    </div>
  );
}
