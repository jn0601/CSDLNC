import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ hoaDon }) {
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
                        Thông Tin Hóa Đơn
                    </h2>
                    <div className="flex space-x-2">
                        <Link href={route('hoa-don.edit', hoaDon.SOHD)}>
                            <PrimaryButton>Chỉnh Sửa</PrimaryButton>
                        </Link>
                        <Link href={route('hoa-don.index')}>
                            <SecondaryButton>Quay Lại</SecondaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Hóa Đơn ${hoaDon.SOHD}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Số Hóa Đơn
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {hoaDon.SOHD}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Ngày Hóa Đơn
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {formatDate(hoaDon.NGHD)}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Khách Hàng
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {hoaDon.khach_hang?.HOTEN || '—'}
                                        {hoaDon.khach_hang && (
                                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                ({hoaDon.khach_hang.MAKH})
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Nhân Viên
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                                        {hoaDon.nhan_vien?.HOTEN || '—'}
                                        {hoaDon.nhan_vien && (
                                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                ({hoaDon.nhan_vien.MANV})
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Trị Giá
                                    </label>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {formatCurrency(hoaDon.TRIGIA)}
                                    </p>
                                </div>
                            </div>

                            {hoaDon.chi_tiet_hoa_dons && hoaDon.chi_tiet_hoa_dons.length > 0 && (
                                <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Chi Tiết Hóa Đơn ({hoaDon.chi_tiet_hoa_dons.length})
                                    </h3>
                                    <div className="mt-4 overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-900">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        Sản Phẩm
                                                    </th>
                                                    <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        Số Lượng
                                                    </th>
                                                    <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        Đơn Giá
                                                    </th>
                                                    <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                                        Thành Tiền
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {hoaDon.chi_tiet_hoa_dons.map((ct) => (
                                                    <tr key={`${ct.SOHD}-${ct.MASP}`}>
                                                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                                                            {ct.san_pham?.TENSP || ct.MASP}
                                                        </td>
                                                        <td className="px-4 py-2 text-right text-sm text-gray-900 dark:text-gray-100">
                                                            {ct.SL}
                                                        </td>
                                                        <td className="px-4 py-2 text-right text-sm text-gray-900 dark:text-gray-100">
                                                            {formatCurrency(ct.san_pham?.GIA)}
                                                        </td>
                                                        <td className="px-4 py-2 text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {formatCurrency(
                                                                ct.SL * (ct.san_pham?.GIA || 0)
                                                            )}
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
