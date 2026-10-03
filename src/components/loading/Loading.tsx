export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-50/30">
      
      {/* Content Area Skeleton */}
      <div className="container mx-auto px-4 py-8 sm:px-6">
        {/* Back Link Skeleton */}
        <div className="h-4 w-36 rounded-md bg-gray-200"></div>

        {/* Filter / Counter Bar Skeleton */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-4 w-24 rounded-md bg-gray-200"></div>
            <div className="h-7 w-20 rounded-full bg-gray-200"></div>
          </div>
          <div className="h-4 w-28 rounded-md bg-gray-200"></div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="h-48 w-full rounded-xl bg-gray-100"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="h-5 w-20 rounded bg-emerald-100"></div>
                  <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}