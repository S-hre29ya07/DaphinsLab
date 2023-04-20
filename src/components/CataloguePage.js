import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PieChart, defaultProps } from 'react-minimal-pie-chart';
import './CataloguePage.css';
function CataloguePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const chartRef = useRef(null);


  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setName(searchParams.get('name') || '');
    setEmail(searchParams.get('email') || '');
  }, [location]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));

    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(products.filter((product) => product.category === selectedCategory));
  }, [products, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const categoryData = categories.map((category) => ({
    title: category,
    value: products.filter((product) => product.category === category).length,
    color: getRandomColor(),
  }));

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleAnalyseClick = () => {
    chartRef.current && chartRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="header">
       <h4>({name}) and ({email})</h4>
        <select onChange={(e) => handleCategorySelect(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleAnalyseClick}>ANALYSE</button>
      </div>
      <div className="product-container" >
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description.length > 150 ? `${product.description.slice(0, 150)}...` : product.description}</p>
            {product.description.length > 150 && (
              <button onClick={() => window.alert(product.description)}>Read more</button>
            )}
        </div>
        
        ))}
      </div>
      <div className='chart' ref={chartRef}>
        <PieChart
          data={categoryData}
          label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})`}
          labelStyle={{ fontSize: '5px' }}
          {...defaultProps}
          animate
          animationDuration={500}
          animationEasing="ease-out"
        />
      </div>
    </div>
  );
}
export default CataloguePage;
