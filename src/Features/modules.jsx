import React, { useState, useEffect } from 'react';

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('https://backend-dot-capstone-c242-ps555.et.r.appspot.com/getModules');
        if (!response.ok) {
          throw new Error('Failed to fetch modules');
        }
        const data = await response.json();
        setModules(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []); 

  const renderModules = (category) => {
    return modules
      .filter(module => module.category === category)
      .map((module, index) => (
        <div
          key={index}
          className="module-card p-4 mb-4 border rounded-lg shadow-lg cursor-pointer"
          onClick={() => setSelectedModule(module)} // Menangani klik pada modul
        >
          <img src={module.imageUrl} alt={module.title} className="w-full h-40 object-cover rounded-lg mb-4" />
          <h3 className="text-2xl font-semibold">{module.title}</h3>
          <p className="text-gray-700 mt-2">{module.content}</p>
          <p className="text-gray-500 text-sm mt-4">Dibuat pada: {module.createdAt}</p>
        </div>
      ));
  };

  const closeModal = () => setSelectedModule(null); // Menutup modal

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Modul Pelatihan Saham</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Modul Dasar</h2>
        {renderModules('Dasar')} {/* Modul Dasar di atas */}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Modul Lanjutan</h2>
        {renderModules('Lanjutan')} {/* Modul Lanjutan di bawah */}
      </div>

      {/* Modal untuk menampilkan detail modul */}
      {selectedModule && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <h3 className="text-2xl font-semibold mb-4">{selectedModule.title}</h3>
            <img src={selectedModule.imageUrl} alt={selectedModule.title} className="w-full h-60 object-cover rounded-lg mb-4" />
            <p className="text-gray-700">{selectedModule.content}</p>
            <p className="text-gray-500 text-sm mt-4">Dibuat pada: {selectedModule.createdAt}</p>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full"
              onClick={closeModal} // Menutup modal saat tombol ini diklik
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
