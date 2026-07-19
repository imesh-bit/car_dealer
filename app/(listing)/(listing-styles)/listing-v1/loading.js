export default function ListingLoading() {
  return (
    <div className="wrapper" aria-busy="true" aria-live="polite">
      <div className="container py-5">
        <div
          style={{
            height: 28,
            width: "40%",
            background: "#eef2f6",
            borderRadius: 8,
            marginBottom: 24,
          }}
        />
        <div className="row">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-4" key={index}>
              <div
                style={{
                  height: 220,
                  background: "#eef2f6",
                  borderRadius: 12,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
