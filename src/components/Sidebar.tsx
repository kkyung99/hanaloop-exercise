export default function Sidebar() {
  const menu = [
    { id: 1, title: '메뉴1' },
    { id: 2, title: '메뉴2' },
    { id: 3, title: '메뉴3' },
  ];
  return (
    <aside className="bg-gray border-r border-gray-medium">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-blue">Hana Loop</h2>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <div key={item.id} className="flex justify-center p-2 rounded-lg">
            <div>
              <div className="text-sm font-medium text-gray-dark">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
