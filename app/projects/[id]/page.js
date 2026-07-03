export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808] text-[#e6e4e2] font-sans">
      <h1 className="font-serif text-3xl font-light lowercase">project: {id}</h1>
    </div>
  );
}
