import { useState, useEffect } from 'react'
import './App.css'
import { fetchProducts } from './service/fetch';
import { Products, Product } from "./service/TProducts";
import style from './style/style.module.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState<Products>();
  const navigateTo = useNavigate();

  useEffect(() => {
    async function fetchData(): Promise<Products | void> {
      const url = 'https://dummyjson.com/products';
      const response = await fetchProducts(url);
      setCount(response);
    }
    void fetchData();
  }, []);

  const fetch = async (): Promise<void> => {
    const url = 'https://dummyjson.com/products';
    const response = await fetchProducts(url);
    setCount(response);
  };

  // search for products
  const handleChange = (value: string): void => {
    if (count?.products?.length && value.length > 0) {
      const data: Products = {
        products: count.products.filter(p => p.category.includes(value.toLowerCase()))
      };
      setCount(data);
    } else if (value.length === 0) {
      void fetch();
    }
  };

  // navigation from search route
  const Navigate = (id: string) => {
    navigateTo(`search/${id}`);
  }

  return (
    <div className={style.body}>
      <div>
        <h1 className={style.font}>SHOPPING</h1>
        <input type="text"
          placeholder='category-search'
          className={style.input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {count?.products?.length ? (
        <ol className={style.list}>
          {count.products.map((item: Product) => (
            <div key={item.id} className={style.li}>
              <li>{item.brand}</li>
              <li>R$: {Number.parseFloat(item.price)}</li>
              <li>Qtd: {item.stock}</li>
              <button type='button' onClick={() => Navigate(item.id)}>
                <img src={item.thumbnail} alt={item.title} className={style.img}
                />
              </button>
            </div>
          ))}
        </ol>
      ) : <h1>Waiting...</h1>}
    </div>
  )
}

export default App
