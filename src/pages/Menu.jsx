import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { getCategories, getFoods } from '../services/api';
import { formatPrice } from '../utils';

const Menu = ({ addToCart }) => {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        getFoods().then((data) => setFoods(data));
        getCategories().then((data) => setCategories(data));
    }, []);

    const filteredFoods = foods.filter((food) => {
        const matchName = food.name.toLowerCase().includes(keyword.toLowerCase());
        const matchCategory = categoryId === '' || food.categoryId === Number(categoryId);
        return matchName && matchCategory;
    });

    const handleAdd = (food) => {
        addToCart(food);
        alert('Đã thêm "' + food.name + '" vào giỏ hàng');
    };

    return (
        <>
            <h2 className="mb-3">Thực đơn</h2>

            <Row className="mb-3">
                <Col md={8}>
                    <Form.Control
                        placeholder="Tìm món..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">Tất cả danh mục</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            {filteredFoods.length === 0 && <p>Không tìm thấy món nào.</p>}

            <Row>
                {filteredFoods.map((food) => (
                    <Col key={food.id} md={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Img variant="top" src={food.image} />
                            <Card.Body>
                                <Card.Title>{food.name}</Card.Title>
                                <Card.Text>{food.description}</Card.Text>
                                <p className="fw-bold text-danger">{formatPrice(food.price)}</p>
                                {food.available ? (
                                    <Button variant="danger" onClick={() => handleAdd(food)}>
                                        + Thêm vào giỏ
                                    </Button>
                                ) : (
                                    <Button variant="secondary" disabled>
                                        Hết hàng
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Menu;
