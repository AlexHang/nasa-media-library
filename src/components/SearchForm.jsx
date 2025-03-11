import React, { useState, useEffect } from 'react';

const SearchForm = ({ params, onParamsChange, onSearch }) => {
  const [errors, setErrors] = useState({});
  const [localParams, setLocalParams] = useState(params);
  
  useEffect(() => {
    setLocalParams(params);
  }, [params]);

  const validateForm = () => {
    const newErrors = {};
    
    // I took this regex from chatGPT, to test if it contains SQL injections
    const sqlInjectionPattern = /('|"|;|--|\/\*|\*\/|xp_|UNION|SELECT|INSERT|UPDATE|DELETE|DROP|EXEC|OR 1=1|AND 1=1)/i;
    
    if(sqlInjectionPattern.test(localParams.q)){
        newErrors.q = 'Invalid search query';
    };
    // maybe we can add more validation, but I think this is enough for now
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onParamsChange(localParams);
      onSearch();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Search NASA Image Collection</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="q" className="block text-sm font-medium text-gray-700 mb-1">
            Search Query*
          </label>
          <input
            type="text"
            id="q"
            name="q"
            value={localParams.q}
            onChange={handleChange}
            placeholder="e.g., moon, mars, apollo"
            className={`w-full p-2 border rounded-md ${errors.q ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.q && <p className="text-red-500 text-sm mt-1">{errors.q}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="year_start" className="block text-sm font-medium text-gray-700 mb-1">
              Year Start
            </label>
            <input
              type="text"
              id="year_start"
              name="year_start"
              value={localParams.year_start}
              onChange={handleChange}
              placeholder="e.g., 1969"
              className={`w-full p-2 border rounded-md ${errors.year_start ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.year_start && <p className="text-red-500 text-sm mt-1">{errors.year_start}</p>}
          </div>
          
          <div>
            <label htmlFor="year_end" className="block text-sm font-medium text-gray-700 mb-1">
              Year End
            </label>
            <input
              type="text"
              id="year_end"
              name="year_end"
              value={localParams.year_end}
              onChange={handleChange}
              placeholder="e.g., 1972"
              className={`w-full p-2 border rounded-md ${errors.year_end ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.year_end && <p className="text-red-500 text-sm mt-1">{errors.year_end}</p>}
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md w-full md:w-auto"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
