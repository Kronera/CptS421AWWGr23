import { Calendar, MapPin, UsersRound } from "lucide-react";

type Props = {
  month: string;
  day: string | number;
  title: string;
  time: string;
  location: string;
  stats?: string;
  href: string;
};

export default function EventTile({ month, day, title, time, location, stats, href }: Props) {
  return (
    <div className="reveal rounded-2xl border bg-white shadow-sm p-6 flex gap-4 items-start transition hover:-translate-y-1 hover:shadow-xl">
      <div className="rounded-xl bg-[#f7941D] text-white px-3 py-2 text-center">
        <div className="text-xs font-semibold">{month}</div>
        <div className="text-2xl font-bold leading-none">{day}</div>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {time}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </span>
          {stats && (
            <span className="inline-flex items-center gap-1">
              <UsersRound className="h-4 w-4" />
              {stats}
            </span>
          )}
        </div>

        <a
          href={href}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-[#f7941D] px-4 py-2 text-white btn-hover"
        >
          Register Now
        </a>
      </div>
    </div>
  );
}
