import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { deleteOrder, getOrders, updateOrder } from '../services/api';
import { ORDER_STATUS, formatDate, formatPrice } from '../utils';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // đơn đang xem chi tiết

    // READ: lấy danh sách đơn khi mở trang
    useEffect(() => {
        getOrders().then((data) => setOrders(data));
    }, []);

    // UPDATE: đổi trạng thái đơn
    const handleChangeStatus = (order, status) => {
        updateOrder(order.id, { ...order, status: status }).then((updated) => {
            setOrders(orders.map((o) => (o.id === order.id ? updated : o)));
        });
    };

    // DELETE: xoá đơn
    const handleDelete = (order) => {
        if (window.confirm('Bạn chắc chắn muốn xoá đơn #' + order.id + '?')) {
            deleteOrder(order.id).then(() => {
                setOrders(orders.filter((o) => o.id !== order.id));
            });
        }
    };

    return (
        <>
            <h2 className="mb-3">Đơn hàng</h2>

            {orders.length === 0 ? (
                <p>Chưa có đơn hàng nào.</p>
            ) : (
                <Table bordered hover className="bg-white">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Khách hàng</th>
                            <th>SĐT</th>
                            <th>Thời gian</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.phone}</td>
                                <td>{formatDate(order.createdAt)}</td>
                                <td>{formatPrice(order.total)}</td>
                                <td>
                                    <Form.Select
                                        size="sm"
                                        value={order.status}
                                        onChange={(e) => handleChangeStatus(order, e.target.value)}
                                    >
                                        {ORDER_STATUS.map((s) => (
                                            <option key={s.value} value={s.value}>
                                                {s.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </td>
                                <td>
                                    <Button size="sm" variant="primary" onClick={() => setSelectedOrder(order)}>
                                        Chi tiết
                                    </Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => handleDelete(order)}>
                                        Xoá
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Chi tiết đơn hàng */}
            <Modal show={selectedOrder !== null} onHide={() => setSelectedOrder(null)}>
                {selectedOrder && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Đơn #{selectedOrder.id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Khách hàng: {selectedOrder.customerName} - {selectedOrder.phone}</p>
                            <p>Địa chỉ: {selectedOrder.address}</p>
                            <p>Ghi chú: {selectedOrder.note}</p>
                            <Table bordered size="sm">
                                <thead>
                                    <tr>
                                        <th>Món</th>
                                        <th>SL</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{formatPrice(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <h5>Tổng cộng: {formatPrice(selectedOrder.total)}</h5>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
};

export default Orders;
