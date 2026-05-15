export default function Spinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-zinc-500" />
    </div>
  );
}
