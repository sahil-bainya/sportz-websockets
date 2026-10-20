const MatchCardSkeleton = () => (
  <div className="flex flex-col gap-4 rounded-2xl border-2 border-base-300 bg-base-100 p-4">
    {/* sport tag + status */}
    <div className="flex items-center justify-between">
      <div className="skeleton h-6 w-20 rounded-full"></div>
      <div className="skeleton h-4 w-12"></div>
    </div>

    {/* team 1 */}
    <div className="flex items-center justify-between gap-4">
      <div className="skeleton h-5 w-2/5"></div>
      <div className="skeleton h-9 w-16 rounded-lg"></div>
    </div>

    {/* team 2 */}
    <div className="flex items-center justify-between gap-4">
      <div className="skeleton h-5 w-1/3"></div>
      <div className="skeleton h-9 w-16 rounded-lg"></div>
    </div>

    <div className="divider my-0"></div>

    {/* date + button */}
    <div className="flex items-center justify-between">
      <div className="skeleton h-3 w-32"></div>
      <div className="skeleton h-8 w-24 rounded-full"></div>
    </div>
  </div>
);

const CommentarySkeleton = () => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-wrap items-center gap-2">
      <div className="skeleton h-4 w-4 shrink-0 rounded-full"></div>
      <div className="skeleton h-4 w-6"></div>
      <div className="skeleton h-6 w-14 rounded-full"></div>
      <div className="skeleton h-6 w-16 rounded-full"></div>
      <div className="skeleton h-6 w-24 rounded-full"></div>
    </div>
    <div className="skeleton h-4 w-40"></div>
    <div className="skeleton h-24 w-full rounded-xl"></div>
    <div className="skeleton h-6 w-24 rounded-full"></div>
  </div>
);

const SpotrzSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-100 p-3 sm:p-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-3 rounded-2xl border-2 border-base-300 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex flex-col gap-2">
            <div className="skeleton h-6 w-28"></div>
            <div className="skeleton h-3 w-40"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="skeleton h-8 w-24 rounded-lg"></div>
            <div className="skeleton h-8 w-32 rounded-lg"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Current Matches */}
          <section className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="skeleton h-7 w-44"></div>
              <div className="flex items-center gap-2">
                <div className="skeleton h-9 w-24 rounded-lg"></div>
                <div className="skeleton h-9 w-36 rounded-lg"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <MatchCardSkeleton key={i} />
              ))}
            </div>
          </section>

          {/* Live Commentary */}
          <aside className="flex flex-col overflow-hidden rounded-2xl border-2 border-base-300 lg:col-span-1">
            <div className="flex items-center justify-between border-b-2 border-base-300 p-4">
              <div className="skeleton h-6 w-40"></div>
              <div className="skeleton h-8 w-20 rounded-lg"></div>
            </div>

            <div className="flex flex-col gap-6 p-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <CommentarySkeleton key={i} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SpotrzSkeleton;
