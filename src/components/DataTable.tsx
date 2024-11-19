import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { DataEntry } from '../types';
import CreateEntryForm from './CreateEntryForm';
import EditEntryForm from './EditEntryForm';

const DataTable: React.FC = () => {
  const { user, data, deleteData, fetchData } = useStore();
  const [editingEntry, setEditingEntry] = useState<DataEntry | null>(null);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  const filteredData = data.filter(
    (entry) => user?.role === 'admin' || entry.country === user?.country
  );

  const handleDelete = async (id: string) => {
    if (user?.role !== 'admin') return;
    try {
      await deleteData(id);
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <CreateEntryForm />
      
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Country
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                    {user?.role === 'admin' && (
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredData.map((entry: DataEntry) => (
                    <tr key={entry.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {entry.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {entry.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {entry.country}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDate(entry.createdAt)}
                      </td>
                      {user?.role === 'admin' && (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingEntry(entry)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {editingEntry && (
        <EditEntryForm
          entry={editingEntry}
          onClose={() => setEditingEntry(null)}
        />
      )}
    </>
  );
}

export default DataTable;