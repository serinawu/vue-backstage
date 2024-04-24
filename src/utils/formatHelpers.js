//資料格式處理

export function formatDate(dateStr) {
    return dateStr.split('T')[0]; //僅保留日期
}

export function formatPhone(phoneStr) {
    const match = phoneStr.match(/\((\d{3})\)\s(\d{3}-\d{4})/);
    return match ? `${match[1]} ${match[2]}`: phoneStr;
}