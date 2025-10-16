export default function ChartGrafic({ chartRef, ariaLabel }) {
  return (
    <div className="max-w-md mx-auto w-full h-64 flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <canvas
          ref={chartRef}
          className="max-w-full max-h-full"
          aria-label={ariaLabel}
        />
      </div>
    </div>
  );
}
