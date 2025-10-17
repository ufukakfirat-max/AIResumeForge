interface AdPlaceholderProps {
  width: number;
  height: number;
  label?: string;
}

export function AdPlaceholder({ width, height, label = 'Advertisement' }: AdPlaceholderProps) {
  return (
    <div
      className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
      style={{ width: `${width}px`, height: `${height}px`, minWidth: `${width}px`, minHeight: `${height}px` }}
    >
      <div className="text-center text-gray-400">
        <p>{label}</p>
        <p className="text-sm">{width}x{height}</p>
      </div>
    </div>
  );
}
