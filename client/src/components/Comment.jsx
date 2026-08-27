export default function Comment({ data = {} }) {

  return (
    <div className="relative pl-6!">
      <span className="absolute left-0 top-1.5 w-3! h-3! rounded-full bg-yellow-400 border border-gray-500"></span>

      <div className="flex items-center gap-2 flex-wrap mb-2!">
        <span className="text-sm text-gray-500 font-medium">{data.minute}</span>

        <div className="badge badge-ghost bg-gray-100 text-gray-500 border-gray-200 font-bold px-3! py-3! rounded-xl">
          Seq {data.sequence}
        </div>

        <div className="badge badge-ghost bg-gray-100 text-gray-500 border-gray-200 font-bold px-3! py-3! rounded-xl">
          {data.period}
        </div>

        <div className="badge bg-yellow-300 rounded-2xl text-gray-600 border-2 border-gray-400 font-bold px-3! py-3!">
          {data.eventType}
        </div>
      </div>

      <p className="text-sm font-bold text-gray-700 mb-2!">
        {data.actor} · {data.team}
      </p>

      <div className="bg-gray-50 rounded-lg p-4! mb-2! border border-gray-200">
        <p className="font-bold text-gray-700">{data.message}</p>
      </div>

      {data.tags?.map((tag) => (
        <div className="badge badge-outline border-gray-200 text-gray-500 font-medium px-3! py-3! ml-2!">
          {tag}
        </div>
      ))}
    </div>
  );
}
