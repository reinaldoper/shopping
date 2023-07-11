import { useState, useEffect } from 'react';
import style from '../style/style.module.css';
import { useNavigate } from "react-router-dom";
import { Local } from '../service/TLocal';

export default function Car() {
  const [local, setLocal] = useState<Local[]>([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    const car = () => {
      const store = localStorage.getItem('search');
      // Verificar se store é nulo e converter para uma string vazia
      const storeValue = store !== null ? store : '';
  
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      void setLocal(JSON.parse(storeValue));
    };
    car();
  }, []);

  // return Home
  const returnRouterHome = () => {
    navigateTo('/');
  };

  // soma total de itens
  const soma = (): number => {
    if (Array.isArray(local)) {
      const sum = local.reduce((acc, item) => acc + Number(item.value), 0);
      return sum;
    }
    return 0;
  };

  // limpar localStore
  const Close = () => {
    localStorage.removeItem("search");
    navigateTo('/');
  }

  // delete item
  const deleteId = (id: string): void => {
    if (Array.isArray(local)) {
      const newItems = local.filter((item) => Number(item.id) !== Number(id));
      localStorage.setItem('search', JSON.stringify(newItems));
    }
    const store = localStorage.getItem('search');
      // Verificar se store é nulo e converter para uma string vazia
      const storeValue = store !== null ? store : '';
  
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      void setLocal(JSON.parse(storeValue));
  };

  const resultLocal = local.map((item: Local) => (
    <div key={item.id} className={style.lis}>
      <li><strong>Id: </strong>{item.id}</li>
      <li><strong>Brand: </strong>{item.brand}</li>
      <li><strong>Price: </strong>{item.price}R$</li>
      <li><strong>Qtd: </strong>{item.qtd}</li>
      <li><button type='button' onClick={() => deleteId(item.id)}>DEL</button></li>
    </div>
  ))

  return (
    <div>
      <h1 className={style.font}>CART_ITEM</h1>
      <button onClick={returnRouterHome} className={style.button}>Home</button>
      <button onClick={Close} className={style.button}>Close</button>
      <h2>Total a pagar</h2>
      {local.length > 0 ? <h2>Total: {soma().toFixed(2)}R$</h2> : null}
      <ol className={style.lists}>{resultLocal}</ol>
    </div>
  )
}
