'use client';

interface ErrorProps {
  error: string;
}

export default function ErrorOverlay({ error }: ErrorProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500/80 z-50">
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md w-full text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-3 text-red-600">오류 발생</h2>
        <p className="mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
