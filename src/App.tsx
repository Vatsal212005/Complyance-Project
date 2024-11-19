import React from 'react';
import { useStore } from './store/useStore';
import Login from './components/Login';
import Header from './components/Header';
import DataTable from './components/DataTable';

function App() {
  const { user } = useStore();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Data Management</h2>
              <DataTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;