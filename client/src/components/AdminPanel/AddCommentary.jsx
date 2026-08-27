import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddCommentaryMutation } from "../../store/commentaryApi.js";
const SPORT_CONFIG = {
  cricket: {
    periods: ["1st innings", "2nd innings"],
    eventTypes: [
      "WICKET",
      "FOUR",
      "SIX",
      "RUN",
      "OVER_END",
      "WIDE",
      "NO_BALL",
      "MILESTONE",
      "INNINGS_END",
      "MATCH_END",
    ],
    tags: ["wicket", "boundary", "over", "milestone", "wide", "no-ball"],
  },
  football: {
    periods: ["1st half", "2nd half", "extra time", "penalties"],
    eventTypes: [
      "GOAL",
      "YELLOW_CARD",
      "RED_CARD",
      "SUBSTITUTION",
      "FOUL",
      "CORNER",
      "OFFSIDE",
      "PENALTY",
      "HALF_TIME",
      "FULL_TIME",
    ],
    tags: ["goal", "card", "substitution", "penalty", "foul"],
  },
  basketball: {
    periods: [
      "1st quarter",
      "2nd quarter",
      "3rd quarter",
      "4th quarter",
      "overtime",
    ],
    eventTypes: [
      "TWO_POINTER",
      "THREE_POINTER",
      "FREE_THROW",
      "FOUL",
      "TIMEOUT",
      "SUBSTITUTION",
      "QUARTER_END",
      "GAME_END",
    ],
    tags: ["scoring", "foul", "timeout", "substitution", "milestone"],
  },
};

export default function AddCommentary() {
  const navigate = useNavigate();
  const location = useLocation();
  const match = location.state?.match;
  const [addCommentary, { isLoading, error }] = useAddCommentaryMutation();

  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      minutes: "",
      period: "",
      eventType: "",
      team: "",
      actor: "",
      sequence: "",
      tags: [],
      message: "",
    },
  });

  if (!match) {
    return <p>No match selected</p>;
  }

  const config = SPORT_CONFIG[match.sport] || {
    periods: [],
    eventTypes: [],
    tags: [],
  };
  const message = watch("message") || "";

  const onSubmitHandler = async (formData) => {
    try {
      const payload = {
        ...formData,
        minutes: formData.minutes ? Number(formData.minutes) : undefined,
        sequence: formData.sequence ? Number(formData.sequence) : undefined,
        team: formData.team || undefined,
        actor: formData.actor || undefined,
        tags: formData.tags?.length ? formData.tags : undefined,
        matchId:Number(match.id)
      };
      await addCommentary(payload).unwrap();
      navigate("/admin");
    } catch (err) {
      console.error("Failed to create match:", err);
    }
  };
  const close = () => navigate("/admin");

  return (
    <div className="flex items-center justify-center">
      <div className="w-full overflow-hidden shadow-sm bg-white">
        {/* Header */}
        <div className="bg-amber-300 flex items-center justify-between px-8! py-5! border-b-2 border-black">
          <div>
            <h1 className="text-xl font-extrabold text-black">
              Add Commentary
            </h1>
            <p className="text-sm text-black/70">
              Add live commentary for the match
            </p>
          </div>
          <button
            type="button"
            className="bg-white border-2 border-black rounded-lg px-4! py-2! text-sm font-bold hover:bg-gray-50"
            onClick={close}
          >
            Cancel
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmitHandler)} className="p-6!">
          <div className="mb-5! text-2xl font-semibold">
            {match.homeTeam?.toUpperCase()} vs {match.awayTeam?.toUpperCase()}
            <span className="text-sm text-gray-400 font-normal ml-2!">
              ({match.sport})
            </span>
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
                {...register("minutes")}
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
                <option value="">Select period</option>
                {config.periods.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
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
                <option value="">Select event</option>
                {config.eventTypes.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Team{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <select
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("team")}
              >
                <option value="">Select team</option>
                <option value={match.homeTeam}>{match.homeTeam}</option>
                <option value={match.awayTeam}>{match.awayTeam}</option>
              </select>
            </div>
          </div>

          {/* Actor / Sequence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4! mb-5!">
            <div>
              <label className="block text-sm font-semibold text-black mb-2!">
                Actor{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
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
                Sequence{" "}
                <span className="text-gray-400 font-normal">
                  (Optional — order within match, e.g. 1, 2, 3...)
                </span>
              </label>
              <input
                type="number"
                placeholder="Enter sequence number"
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-4! py-2.5! text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                {...register("sequence")}
              />
            </div>
          </div>

          {/* Tags — multi-select checkboxes, kyunki schema array hai */}
          <div className="mb-5!">
            <label className="block text-sm font-semibold text-black mb-2!">
              Tags <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="flex flex-wrap gap-2!">
              {config.tags.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3! py-1.5! text-sm cursor-pointer hover:bg-gray-50 has-checked:bg-yellow-100 has-checked:border-yellow-400"
                >
                  <input type="checkbox" value={tag} {...register("tags")} />
                  {tag}
                </label>
              ))}
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
                {...register("message", { required: true, maxLength: 400 })}
              />
              <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                {message.length}/400
              </span>
            </div>
          </div>
          {error && (
            <div className="px-4! py-3! bg-red-50 border border-red-300 rounded-lg">
              <p className="text-red-600 text-md text-center">
                {error?.data?.error || "Failed to create match"}
              </p>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
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
