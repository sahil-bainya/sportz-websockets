import { useForm } from "react-hook-form";
import { ArrowLeft, Calendar } from "lucide-react";

export default function CreateMatch({ onBack }) {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // create match logic
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="bg-amber-300 flex items-center justify-between px-8! py-5! border-b-2 border-black">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} className="text-black hover:opacity-70">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-black">
              Create New Match
            </h1>
            <p className="text-sm text-black/70">
              Add details of the new match
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="bg-white border-2 border-black rounded-lg px-4! py-2! text-sm font-bold hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>

      {/* Form */}
      <div className="p-10!">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7!">
            {/* Sport */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Sport
              </label>
              <select
                className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("sport")}
              >
                <option value="">Select Sport</option>
                <option value="cricket">Cricket</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Status
              </label>
              <select
                className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("status")}
              >
                <option value="scheduled">Scheduled</option>
                <option value="live">Live</option>
                <option value="finished">Finished</option>
              </select>
            </div>

            {/* Home Team */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Home Team
              </label>
              <input
                type="text"
                placeholder="Enter home team"
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("homeTeam", { required: true })}
              />
            </div>

            {/* Away Team */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Away Team
              </label>
              <input
                type="text"
                placeholder="Enter away team"
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("awayTeam", { required: true })}
              />
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Start Time
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! pr-10! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  {...register("startTime", { required: true })}
                />
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                End Time <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! pr-10! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  {...register("endTime")}
                />
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            

            {/* Initial Home Score */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Initial Home Score
              </label>
              <input
                type="number"
                defaultValue={0}
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("initialHomeScore")}
              />
            </div>

            {/* Initial Away Score */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Initial Away Score
              </label>
              <input
                type="number"
                defaultValue={0}
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("initialAwayScore")}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-7!">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg border-2 border-black px-6! py-2.5! transition-colors duration-200"
            >
              Create Match
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}