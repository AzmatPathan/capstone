// inventoryService.js
const inventoryService = {
  fetchInventoryData: async () => {
    // Simulate fetching inventory data from an API
    const data = [
      { id: 1, name: 'Item 1', quantity: 10 },
      { id: 2, name: 'Item 2', quantity: 20 },
      // Add more inventory items as needed
    ];
    return Promise.resolve(data);
  },
};

export default inventoryService;
