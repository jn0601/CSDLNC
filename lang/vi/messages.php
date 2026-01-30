<?php

return [
    // Entity names
    'khach_hang' => 'Khách Hàng',
    'nhan_vien' => 'Nhân Viên',
    'san_pham' => 'Sản Phẩm',
    'hoa_don' => 'Hóa Đơn',
    'chi_tiet_hoa_don' => 'Chi Tiết Hóa Đơn',

    // Field labels
    'fields' => [
        // Customer fields
        'MAKH' => 'Mã Khách Hàng',
        'HOTEN' => 'Họ Tên',
        'DCHI' => 'Địa Chỉ',
        'SODT' => 'Số Điện Thoại',
        'NGSINH' => 'Ngày Sinh',
        'NGDK' => 'Ngày Đăng Ký',
        'DOANHSO' => 'Doanh Số',

        // Employee fields
        'MANV' => 'Mã Nhân Viên',
        'NGVL' => 'Ngày Vào Làm',

        // Product fields
        'MASP' => 'Mã Sản Phẩm',
        'TENSP' => 'Tên Sản Phẩm',
        'DVT' => 'Đơn Vị Tính',
        'NUOCSX' => 'Nước Sản Xuất',
        'GIA' => 'Giá',

        // Invoice fields
        'SOHD' => 'Số Hóa Đơn',
        'NGHD' => 'Ngày Hóa Đơn',
        'MAKH' => 'Mã Khách Hàng',
        'MANV' => 'Mã Nhân Viên',
        'TRIGIA' => 'Trị Giá',

        // Invoice Detail fields
        'SL' => 'Số Lượng',
    ],

    // Actions
    'actions' => [
        'create' => 'Thêm Mới',
        'edit' => 'Chỉnh Sửa',
        'delete' => 'Xóa',
        'view' => 'Xem',
        'save' => 'Lưu',
        'cancel' => 'Hủy',
        'search' => 'Tìm Kiếm',
        'filter' => 'Lọc',
        'export' => 'Xuất',
        'import' => 'Nhập',
        'back' => 'Quay Lại',
        'confirm' => 'Xác Nhận',
    ],

    // Messages
    'messages' => [
        'delete_confirm' => 'Bạn có chắc chắn muốn xóa?',
        'delete_success' => 'Xóa thành công!',
        'save_success' => 'Lưu thành công!',
        'create_success' => 'Thêm mới thành công!',
        'update_success' => 'Cập nhật thành công!',
        'error' => 'Có lỗi xảy ra!',
        'no_data' => 'Không có dữ liệu',
        'loading' => 'Đang tải...',
    ],

    // Navigation
    'nav' => [
        'dashboard' => 'Trang Chủ',
        'customers' => 'Quản Lý Khách Hàng',
        'employees' => 'Quản Lý Nhân Viên',
        'products' => 'Quản Lý Sản Phẩm',
        'invoices' => 'Quản Lý Hóa Đơn',
    ],

    // Page titles
    'titles' => [
        'list' => 'Danh Sách :entity',
        'create' => 'Thêm :entity Mới',
        'edit' => 'Chỉnh Sửa :entity',
        'view' => 'Xem Chi Tiết :entity',
    ],
];
