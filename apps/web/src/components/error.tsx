export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center p-20 md:p-36 bg-card border border-border rounded-lg text-center">
      <div className="font-bold text-2xl">Something went wrong</div>
      <div className="text-lg">There was an issue processing the request.</div>
    </div>
  );
}
