import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";

export default function AddCommentary() {
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      match: "",
      minute: "",
      period: "2nd innings",
      eventType: "OVER_END",
      team: "",
      actor: "",
      sequence: "",
      tags: "",
      message: "End of the over with tidy bowling. (New Zealand)",
    },
  });

  const message = watch("message") || "";

  const onSubmit = (data) => {
    console.log(data);
    // add commentary logic
  };

  return (
    <div className="flex items-center justify-center py-4! px-4">
      <div className="w-full max-w-3xl border-2 border-black rounded-2xl overflow-hidden shadow-sm bg-white">
        {/* Header */}
        <div className="bg-amber-300 flex items-center justify-between px-8! py-5! border-b-2 border-black">
          <div className="flex items-center gap-3">
            <button type="button" className="text-black hover:opacity-70">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-extrabold text-black">
                Add Commentary
              </h1>
              <p className="text-sm text-black/70">
                Add live commentary for the match
              </p>
            </div>
          </div>
          <button
            type="button"
            className="bg-white border-2 border-black rounded-lg px-4! py-2! text-sm font-bold hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6!">
          {/* Select Match */}
          <div className="mb-5!">
            <label className="block text-sm font-semibold text-black mb-2!">
              Select Match
            </label>
            <select
              className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              {...register("match")}
            >
              <option value="india-australia">India vs Australia (Live)</option>
              <option value="england-pakistan">England vs Pakistan (Live)</option>
              <option value="sa-nz">South Africa vs New Zealand (Live)</option>
            </select>
          </div>

          {/* Minute / Period / Event Type / Team */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4! mb-5!">
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Minute
              </label>
              <input
                type="number"
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("minute")}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Period
              </label>
              <select
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("period")}
              >
                <option value="1st innings">1st innings</option>
                <option value="2nd innings">2nd innings</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Event Type
              </label>
              <select
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("eventType")}
              >
                <option value="OVER_END">OVER_END</option>
                <option value="WICKET">WICKET</option>
                <option value="SIX">SIX</option>
                <option value="FOUR">FOUR</option>
                <option value="RUN">RUN</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Team <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <select
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("team")}
              >
                <option value="">Select team</option>
                <option value="India">India</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>

          {/* Actor / Sequence / Tags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4! mb-5!">
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Actor <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Enter player name"
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("actor")}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Sequence <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                placeholder="Enter sequence"
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("sequence")}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Tags <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <select
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("tags")}
              >
                <option value="">Select tags</option>
                <option value="wicket">wicket</option>
                <option value="boundary">boundary</option>
                <option value="over">over</option>
                <option value="milestone">milestone</option>
              </select>
            </div>
          </div>

          {/* Commentary Message */}
          <div className="mb-6!">
            <label className="block text-sm font-semibold text-black mb-2!">
              Commentary Message
            </label>
            <div className="relative">
              <textarea
                maxLength={400}
                rows={3}
                placeholder="Enter commentary message"
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4! py-2.5! pb-6! text-sm resize-none focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("message", { maxLength: 400 })}
              />
              <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                {message.length}/400
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg border-2 border-black px-6! py-2.5! transition-colors duration-200"
            >
              Add Commentary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}