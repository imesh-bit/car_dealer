export default function ListingDetailLoading() {
  return (
    <div className="wrapper" aria-busy="true" aria-live="polite">
      <div className="container py-5">
        <div
          style={{
            height: 360,
            background: "#eef2f6",
            borderRadius: 12,
            marginBottom: 24,
          }}
        />
        <div
          style={{
            height: 32,
            width: "55%",
            background: "#eef2f6",
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
        <div
          style={{
            height: 18,
            width: "35%",
            background: "#eef2f6",
            borderRadius: 8,
          }}
        />
      </div>
    </div>
  );
}
