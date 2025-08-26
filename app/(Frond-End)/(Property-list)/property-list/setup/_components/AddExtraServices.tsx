import React, { useState } from 'react';


interface propType {
    services: {
        name: string;
        price: number;
    }[];
    handleExtraServices: (data: {
        name: string;
        price: number;
    }[]) => void;
}


const AddExtraServices = ({services,handleExtraServices}:propType) => {
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    const handleAddService = () => {
        if (serviceName && price) {
            if (editingIndex !== null) {
                // Edit existing service
                const updatedServices = services.map((service, index) =>
                    index === editingIndex ? { name: serviceName, price:parseFloat(price) } : service
                );
                handleExtraServices(updatedServices);
                setEditingIndex(null);
            } else {
                // Add new service
                handleExtraServices([...services, { name: serviceName, price:parseFloat(price) }]);
            }
            setServiceName('');
            setPrice('');
        }
    };

    const handleEditService = (index) => {
        setServiceName(services[index].name);
        setPrice(services[index].price.toString());
        setEditingIndex(index);
    };

    const handleDeleteService = (index) => {
        setServiceToDelete(index);
        setIsDeleteModalOpen(true); // Open confirmation modal
    };

    const confirmDeleteService = () => {
        const updatedServices = services.filter((_, idx) => idx !== serviceToDelete);
        handleExtraServices(updatedServices);
        setIsDeleteModalOpen(false); // Close the modal
    };

    const cancelDeleteService = () => {
        setIsDeleteModalOpen(false); // Close the modal without deleting
        setServiceToDelete(null);
    };

    return (
        <div className="w-full">
            <div>
                {/* Service Name Input */}
                <div className='flex items-center gap-4'>
                    <div className="space-y-2">
                        <label htmlFor="serviceName" className="text-sm text-gray-600">Service Name</label>
                        <input
                            type="text"
                            id="serviceName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter service name"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                        />
                    </div>

                    {/* Price Input */}
                    <div className="space-y-2">
                        <label htmlFor="price" className="text-sm text-gray-600">Price</label>
                        <input
                            type="number"
                            id="price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>

                {/* Add Button */}
                <button
                    onClick={handleAddService}
                    type='button'
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                    {editingIndex !== null ? 'Update Service' : 'Add Service'}
                </button>

                {/* Service List */}
                <div className="mt-6">
                    <h4 className="text-lg font-medium">Added Services</h4>
                    <ul className="space-y-3 mt-4">
                        {services.map((service, index) => (
                            <li key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                                <div>
                                    <strong>{service.name}</strong>
                                    <p className="text-gray-500">${service.price}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type='button'
                                        onClick={() => handleEditService(index)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => handleDeleteService(index)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-xl font-semibold text-center">Confirm Deletion</h3>
                        <p className="text-center mt-4">Are you sure you want to delete this service?</p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={confirmDeleteService}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={cancelDeleteService}
                                className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddExtraServices;