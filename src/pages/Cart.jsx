import { useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';
import { formatPrice } from '../utils';

const Cart = ({ cart, changeQuantity, removeFromCart, clearCart }) => {
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Tính tổng tiền
    let total = 0;
    cart.forEach((item) => (total += item.price * item.quantity));

    const handleOrder = (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu nhập
        if (customerName === '' || phone === '' || address === '') {
            setError('Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ');
            return;
        }
        if (phone.length !== 10) {
            setError('Số điện thoại phải gồm 10 số');
            return;
        }

        const order = {
            customerName: customerName,
            phone: phone,
            address: address,
            note: note,
            items: cart,
            total: total,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        createOrder(order).then(() => {
            clearCart();
            alert('Đặt hàng thành công!');
            navigate('/orders');
        });
    };

    if (cart.length === 0) {
        return (
            <p>
                Giỏ hàng đang trống. <Link to="/">Xem thực đơn</Link>
            </p>
        );
    }

    return (
        <>
            <h2 className="mb-3">Giỏ hàng</h2>
            <Row>
                <Col md={8}>
                    <Table bordered className="bg-white">
                        <thead>
                            <tr>
                                <th>Món</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{formatPrice(item.price)}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => changeQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </Button>{' '}
                                        {item.quantity}{' '}
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => changeQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </td>
                                    <td>{formatPrice(item.price * item.quantity)}</td>
                                    <td>
                                        <Button size="sm" variant="danger" onClick={() => removeFromCart(item.id)}>
                                            Xoá
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h5>
                        Tổng cộng: <span className="text-danger">{formatPrice(total)}</span>
                    </h5>
                </Col>

                <Col md={4}>
                    <h5>Thông tin giao hàng</h5>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleOrder}>
                        <Form.Group className="mb-2">
                            <Form.Label>Họ tên *</Form.Label>
                            <Form.Control value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Số điện thoại *</Form.Label>
                            <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Địa chỉ *</Form.Label>
                            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ghi chú</Form.Label>
                            <Form.Control value={note} onChange={(e) => setNote(e.target.value)} />
                        </Form.Group>
                        <Button type="submit" variant="danger">
                            Đặt hàng
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Cart;
