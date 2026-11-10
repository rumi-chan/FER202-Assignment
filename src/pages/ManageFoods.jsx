import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { createFood, deleteFood, getCategories, getFoods, updateFood } from '../services/api';
import { formatPrice } from '../utils';

// Dữ liệu rỗng cho form thêm món
const emptyForm = { name: '', categoryId: '', price: '', image: '', description: '', available: true };

const ManageFoods = () => {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null); // null = đang thêm mới, có id = đang sửa

    // READ: lấy danh sách món và danh mục khi mở trang
    useEffect(() => {
        getFoods().then((data) => setFoods(data));
        getCategories().then((data) => setCategories(data));
    }, []);

    const getCategoryName = (id) => {
        const category = categories.find((c) => c.id === id);
        return category ? category.name : '';
    };

    const openAdd = () => {
        setForm(emptyForm);
        setEditId(null);
        setShowForm(true);
    };

    const openEdit = (food) => {
        setForm(food);
        setEditId(food.id);
        setShowForm(true);
    };

    // Dùng chung cho mọi ô nhập trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // CREATE + UPDATE
    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.name === '' || form.categoryId === '' || Number(form.price) <= 0) {
            alert('Vui lòng nhập tên, chọn danh mục và giá lớn hơn 0');
            return;
        }

        const food = { ...form, categoryId: Number(form.categoryId), price: Number(form.price) };

        if (editId === null) {
            createFood(food).then((created) => setFoods([...foods, created]));
        } else {
            updateFood(editId, food).then((updated) => {
                setFoods(foods.map((f) => (f.id === editId ? updated : f)));
            });
        }
        setShowForm(false);
    };

    // DELETE
    const handleDelete = (food) => {
        if (window.confirm('Bạn chắc chắn muốn xoá món "' + food.name + '"?')) {
            deleteFood(food.id).then(() => {
                setFoods(foods.filter((f) => f.id !== food.id));
            });
        }
    };

    return (
        <>
            <h2 className="mb-3">Quản lý món ăn</h2>
            <Button variant="danger" className="mb-3" onClick={openAdd}>
                + Thêm món
            </Button>

            <Table bordered hover className="bg-white">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ảnh</th>
                        <th>Tên món</th>
                        <th>Danh mục</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food) => (
                        <tr key={food.id}>
                            <td>{food.id}</td>
                            <td>
                                <img src={food.image} alt={food.name} width={80} />
                            </td>
                            <td>{food.name}</td>
                            <td>{getCategoryName(food.categoryId)}</td>
                            <td>{formatPrice(food.price)}</td>
                            <td>{food.available ? 'Đang bán' : 'Hết hàng'}</td>
                            <td>
                                <Button size="sm" variant="primary" onClick={() => openEdit(food)}>
                                    Sửa
                                </Button>{' '}
                                <Button size="sm" variant="danger" onClick={() => handleDelete(food)}>
                                    Xoá
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Form thêm / sửa món */}
            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editId === null ? 'Thêm món ăn' : 'Sửa món ăn'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-2">
                            <Form.Label>Tên món *</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Danh mục *</Form.Label>
                            <Form.Select name="categoryId" value={form.categoryId} onChange={handleChange}>
                                <option value="">-- Chọn --</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Giá *</Form.Label>
                            <Form.Control type="number" name="price" value={form.price} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Link ảnh</Form.Label>
                            <Form.Control name="image" value={form.image} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control name="description" value={form.description} onChange={handleChange} />
                        </Form.Group>
                        <Form.Check
                            label="Đang bán"
                            checked={form.available}
                            onChange={(e) => setForm({ ...form, available: e.target.checked })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowForm(false)}>
                            Huỷ
                        </Button>
                        <Button type="submit" variant="danger">
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ManageFoods;
