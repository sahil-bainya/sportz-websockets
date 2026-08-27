import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateMatchMutation } from "../../store/matchesApi.js";

export default function CreateMatch() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const [isCricket, setisCricket] = useState(false);
  const [createMatch, { isLoading, error }] = useCreateMatchMutation();

  const onSubmit = async (formData) => {
    try {
      const payload = {
        sport: formData.sport,
        homeTeam: formData.homeTeam,
        awayTeam: formData.awayTeam,

        startTime: new Date(formData.startTime).toISOString(),
        endTime: formData.endTime
          ? new Date(formData.endTime).toISOString()
          : undefined,
        homeScore: Number(formData.initialHomeScore) || 0,
        awayScore: Number(formData.initialAwayScore) || 0,
      };
      if (isCricket) {
        payload.homeTeamWickets = formData.initialHomeWickets
          ? Number(formData.initialHomeWickets)
          : 0;
        payload.awayTeamWickets = formData.initialAwayWickets
          ? Number(formData.initialAwayWickets)
          : 0;
      }
      await createMatch(payload).unwrap();
      navigate("/admin");
    } catch (err) {
      console.error("Failed to create match:", err);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-amber-300 flex items-center justify-between px-8! py-5! border-b-2 border-black">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={()=>navigate("/admin")}
            className="text-black hover:opacity-70"
          
          >
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
        <button onClick={() => navigate("/")}>
          <div className="flex items-center gap-2 bg-white border-2 border-black rounded-lg px-4! py-2! text-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Live Matches
          </div>
        </button>
      </div>

      <div className="p-10!">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7!">
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Sport
              </label>
              <select
                className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("sport")}
                defaultValue=""
                onChange={(e) => setisCricket(e.target.value === "cricket")}
              >
                <option value="" disabled>
                  Select Sport
                </option>
                <option value="cricket">Cricket</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
              </select>
            </div>

            <br />

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

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Start Time
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! pr-3! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  {...register("startTime", { required: true })}
                />
              
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                End Time{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! pr-3! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  {...register("endTime")}
                />
                
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Initial Home Score
              </label>
              <div className={isCricket ? "flex gap-3!" : ""}>
                <input
                  type="number"
                  defaultValue={0}
                  className={`bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 ${
                    isCricket ? "w-1/2" : "w-full"
                  }`}
                  {...register("initialHomeScore")}
                />

                {isCricket && (
                  <input
                    type="number"
                    defaultValue={0}
                    placeholder="Wickets"
                    className="w-1/2 bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                    {...register("initialHomeWickets")}
                  />
                )}
              </div>
              {isCricket && (
                <div className="flex justify-between px-2!">
                  <p className="text-xs text-gray-400 mt-1!">Score</p>
                  <p className="text-xs text-gray-400 mt-1!">Wickets</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Initial Away Score
              </label>
              <div className={isCricket ? "flex gap-3!" : ""}>
                <input
                  type="number"
                  defaultValue={0}
                  className={`bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 ${
                    isCricket ? "w-1/2" : "w-full"
                  }`}
                  {...register("initialAwayScore")}
                />

                {isCricket && (
                  <input
                    type="number"
                    defaultValue={0}
                    placeholder="Wickets"
                    className="w-1/2 bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                    {...register("initialAwayWickets")}
                  />
                )}
              </div>

              {isCricket && (
                <div className="flex justify-between px-2!">
                  <p className="text-xs text-gray-400 mt-1!">Score</p>
                  <p className="text-xs text-gray-400 mt-1!">Wickets</p>
                </div>
              )}
            </div>
          </div>
          {error && (
            <div className="px-4! py-3! bg-red-50 border border-red-300 rounded-lg">
              <p className="text-red-600 text-md text-center">
                {error?.data?.error || "Failed to create match"}
              </p>
            </div>
          )}
          <div className={`flex justify-end ${isCricket ? "mt-3!" : "mt-8!"}`}>
            <button
              type="submit"
              disabled={isLoading}
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
