import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Product } from "../service/TProduct";
import { fetchProducts } from '../service/fetch';
import style from '../style/style.module.css';

export default function Search() {
  const { id } = useParams();
  const [search, setSearch] = useState<Product>();
  const [count, setCount] = useState('');
  const navigateTo = useNavigate();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const url = `https://dummyjson.com/products/${id || 'default'}`;
      const response = await fetchProducts(url);
      if (response) {
        // Converter de Products para Product
        const convertedResponse: Product = response as unknown as Product;
        void setSearch(convertedResponse);
      }
    }
    void fetchData();
  }, [id]);

  const returnRouterHome = () => {
    navigateTo('/');
  };

  const returnRouterCar = () => {
    const existingItems: unknown = localStorage.getItem('search') ?? null;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const items: string[] = typeof existingItems === 'string' ? JSON.parse(existingItems) : [];
    if (items.length > 0){
      navigateTo('/car');
    } else {
      alert('Please select one or more items');
    }
    
  }

  const handleChange = () => {
    if (Number(count) > 0) {
      const value: number = (Number(search?.price) * Number(count));
      const total: number = value * (Number(search?.discountPercentage) / 100);
      const final: number = value - total;

      const existingItems: unknown = localStorage.getItem('search') ?? null;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const items: string[] = typeof existingItems === 'string' ? JSON.parse(existingItems) : [];


      const newItems = [...items, { ...search, value: Number(final.toFixed(2)), qtd: Number(count) }];
      localStorage.setItem('search', JSON.stringify(newItems));
    } else {
      null;
    }
  }


  return (
    <div>
      <input type="number" className={style.input} onChange={(e) => setCount(e.target.value)} />
      <button onClick={handleChange} className={style.button}>purchase</button>
      <button onClick={returnRouterHome} className={style.button}>Home</button>
      <button onClick={returnRouterCar} className={style.button}>Car</button>
      <h1 className={style.font}>Title: {search?.title}</h1>
      <p><strong>Category:</strong> {search?.category}</p>
      <p><strong>Stock:</strong> {search?.stock}</p>
      <p><strong>Brand:</strong> {search?.brand}</p>
      <p><strong>Price:</strong> {search?.price}</p>
      <p><strong>Discount:</strong> {search?.discountPercentage}%</p>
      <p><strong>Rating:</strong> {search?.rating}</p>
      <p><strong>Description:</strong> {search?.description}</p>
      {search?.images?.length ? <ol className={style.list}>{search.images.map((item: string) => (
        <div key={item} className={style.li}>
          <li>{<img src={item} alt="item" className={style.img} />}</li>
        </div>
      ))}</ol> : <h1>Waiting...</h1>}
    </div>
  )
}
