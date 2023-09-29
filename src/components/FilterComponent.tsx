import { useState } from 'react';

const FilterComponent = ({ onStockFilterChange, onPriceFilterChange } : { onStockFilterChange: any, onPriceFilterChange: any }) => {
  const [, setStockFilter] = useState('all');
  const [, setPriceFilter] = useState('');

  const handleStockFilterChange = (event: any) => {
    const filter = event.target.value;
    setStockFilter(filter);
    onStockFilterChange(filter);
  };

  const handlePriceFilterChange = (event: any) => {
    const filter = event.target.value;
    setPriceFilter(filter);
    const parsedFilter = parseFloat(filter);
    onPriceFilterChange(!isNaN(parsedFilter) ? parsedFilter : null);
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 my-6">
    <input type="radio" name="my-accordion-2" /> 
    <div className="collapse-title text-xl font-medium">
      Filtrado de búsqueda
    </div>
    <div className="collapse-content"> 
    <div>
        <div className="flex items-center space-x-4">
        <label htmlFor="stockFilter" className="font-bold">Filtrar por stock:</label>
        <select id="stockFilter" className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleStockFilterChange}>
            <option value="all">Todos</option>
            <option value="inStock">En stock</option>
            <option value="outOfStock">Agotado</option>
        </select>
        </div>

        <div className="flex items-center space-x-4 mt-2">
        <label htmlFor="priceFilter" className="font-bold">Filtrar por precio:</label>
        <input type="text" id="priceFilter" className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handlePriceFilterChange}/>
        </div>
    </div>
    </div>
  </div>
  );
};

export default FilterComponent;