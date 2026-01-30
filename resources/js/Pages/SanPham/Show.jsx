import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ sanPham }) {
    const formatCurrency = (value) => {
        if (!value) return '—';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Thông Tin Sản Phẩm
                    </h2>
                    <div className="flex space-x-2">
                        <Link href={route('san-pham.edit', sanPham.MASP)}>
                            <PrimaryButton>Chỉnh Sửa</PrimaryButton>
                        </Link>
                        <Link href={route('san-pham.index')}>
                            <SecondaryButton>Quay Lại</SecondaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={sanPham.TENSP} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Mã Sản Phẩm
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {sanPham.MASP}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Tên Sản Phẩm
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {sanPham.TENSP}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Đơn Vị Tính
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {sanPham.DVT || '—'}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Nước Sản Xuất
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {sanPham.NUOCSX || '—'}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Giá
                                    </label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {formatCurrency(sanPham.GIA)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
