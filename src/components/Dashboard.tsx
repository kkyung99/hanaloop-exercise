export default function Dashboard() {
  return (
    <div className="p-4 bg-gray-light space-y-6 h-full">
      <h2 className="text-2xl font-bold mb-4">대시보드</h2>
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold mb-4">차트</h3>
        <div className="h-64 bg-blue-light rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-dark">chart</p>
          </div>
        </div>
      </div>
    </div>
  );
}
