import { api } from "@/lib/strapi";
type Event = { id: number; title: string; startDateTime: string; location: string };
type EventsRes = { data: Event[] };

export default async function EventsPage() {
  const { data } = await api<EventsRes>("/api/events?sort=startDateTime:asc");
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Events</h1>
      <ul className="space-y-3">
        {data.map(e => (
          <li key={e.id} className="rounded border p-4">
            <div className="text-xl">{e.title}</div>
            <div>{new Date(e.startDateTime).toLocaleString()}</div>
            <div className="text-neutral-600">{e.location}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
