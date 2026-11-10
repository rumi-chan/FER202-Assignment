import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Menu from './pages/Menu';
import Orders from './pages/Order';

const App = () => {
    //  hạn chế: F5 sẽ mất giỏ hàng
    const [cart, setCart] = useState([]);

    // Thêm 1 món vào giỏ
    const addToCart = (food) => {
        const item = cart.find((i) => i.id === food.id);
        if (item) {
            // Đã có trong giỏ -> tăng số lượng
            setCart(cart.map((i) => (i.id === food.id ? { ...i, quantity: i.quantity + 1 } : i)));
        } else {
            // Chưa có -> thêm mới với số lượng 1
            setCart([...cart, { id: food.id, name: food.name, price: food.price, quantity: 1 }]);
        }
    };

    // Đổi số lượng của 1 món, nếu về 0 thì xoá luôn
    const changeQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCart(cart.map((i) => (i.id === id ? { ...i, quantity: quantity } : i)));
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((i) => i.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Tổng số món trong giỏ (hiện trên thanh menu)
    let totalQuantity = 0;
    cart.forEach((i) => (totalQuantity += i.quantity));

    return (
        <>
            <AppNavbar totalQuantity={totalQuantity} />
            <Container className="py-4">
                <Routes>
                    <Route path="/" element={<Menu addToCart={addToCart} />} />
                    <Route path="/orders" element={<Orders />} />

                </Routes>

            </Container>
        </>
    );
};

export default App;
