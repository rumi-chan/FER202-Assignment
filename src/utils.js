// Định dạng tiền: 59000 -> "59.000 đ"
export const formatPrice = (value) => {
    return Number(value).toLocaleString('vi-VN') + ' đ';
};
export const formatDate = (date) => {
    return new Date(date).toLocaleString('vi-VN');
};
// Các trạng thái của đơn hàng
export const ORDER_STATUS = [
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'preparing', label: 'Đang chuẩn bị' },
    { value: 'delivering', label: 'Đang giao' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã huỷ' },
];
