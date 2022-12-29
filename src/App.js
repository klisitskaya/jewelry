import { Route, Routes} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AppContext from './context';
import axios from 'axios';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import Main from './Pages/Main/Main';
import Catalog from './Pages/Catalog/Catalog';
import Favorites from './Pages/Favorites/Favorites';
import Cart from './components/Cart/Cart';

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    async function fetchData () {
      try {
        const cartResponse = await axios.get('https://63a23334ba35b96522f2129d.mockapi.io/cart')
        const favoritesResponse = await axios.get('https://63a23334ba35b96522f2129d.mockapi.io/favorites')
        const itemsResponse = await axios.get('https://63a23334ba35b96522f2129d.mockapi.io/items')
    
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch(error) {
        alert('Ошибка при запросе данных!')
      }
    }
    fetchData()
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id))); 
        await axios.delete(`https://63a23334ba35b96522f2129d.mockapi.io/cart/${findItem.id}`);
        
      } else {
        setCartItems((prev) => [...prev, obj]);
        const {data} = await axios.post('https://63a23334ba35b96522f2129d.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item
        })); 
      }
    } catch(error) {
      alert('Ошибка при добавлении в корзину')
    } 
  }

  const onRemoveItem = (id) => { 
    try {
      axios.delete(`https://63a23334ba35b96522f2129d.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch(error) {
      alert('Ошибка при удалении товара из корзины')
    } 
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://63a23334ba35b96522f2129d.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id))); 
      } else {
        const {data} = await axios.post('https://63a23334ba35b96522f2129d.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch(error) {
      alert('Ошибка при добавлении товаров в избранное')
    } 
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
      <>
        {cartOpened && <Cart items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCard={() => setCartOpened(true)} />
        <Routes>
          <Route path='/' element={<Main />}/>      
          <Route path='/main' element={<Main />}/>
          <Route path='/catalog'  element={<Catalog items={items} cartItems={cartItems} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite}/>}/>
          <Route path='/favorites'  element={<Favorites/>}/> 
        </Routes>       
        <Footer/>
       </>
    </AppContext.Provider> 
  );
}

export default App;
