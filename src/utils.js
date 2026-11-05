// Định dạng tiền: 59000 -> "59.000 đ"
export const formatPrice = (value) => {
    return Number(value).toLocaleString('vi-VN') + ' đ';
};