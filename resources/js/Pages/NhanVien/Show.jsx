import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ nhanVien }) {
    const formatDate = (dateString) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

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
                        Thông Tin Nhân Viên
                    </h2>
                    <div className="flex space-x-2">
                        <Link href={route('nhan-vien.edit', nhanVien.MANV)}>
                            <PrimaryButton>Chỉnh Sửa</PrimaryButton>
                        </Link>
                        <Link href={route('nhan-vien.index')}>
                            <SecondaryButton>Quay Lại</SecondaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={nhanVien.HOTEN} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Mã Nhân Viên
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {nhanVien.MANV}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Họ Tên
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {nhanVien.HOTEN}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Số Điện Thoại
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {nhanVien.SODT || '—'}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Ngày Vào Làm
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {formatDate(nhanVien.NGVL)}
                                    </p>
                                </div>
                            </div>

                            {nhanVien.hoa_dons && nhanVien.hoa_dons.length > 0 && (
                                <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Hóa Đơn Đã Xử Lý ({nhanVien.hoa_dons.length})
                                    </h3>
                                    <div className="mt-4 overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-900">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        Số HD
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        Ngày
                                                    </th>
                                                    <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        Trị Giá
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {nhanVien.hoa_dons.map((hoaDon) => (
                                                    <tr key={hoaDon.SOHD}>
                                                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                                                            {hoaDon.SOHD}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                                                            {formatDate(hoaDon.NGHD)}
                                                        </td>
                                                        <td className="px-4 py-2 text-right text-sm text-gray-900 dark:text-gray-100">
                                                            {formatCurrency(hoaDon.TRIGIA)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
