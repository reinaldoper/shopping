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

  return (
    <div>
      <button onClick={returnRouterHome} className={style.button}>Home</button>
      <button onClick={Close} className={style.button}>Close</button>
      <h1>Total a pagar</h1>
      {local.length > 0 ? <h2>Total: {soma().toFixed(2)}R$</h2> : null}
    </div>
  )
}
