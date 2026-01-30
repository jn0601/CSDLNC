import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DeleteButton from '@/Components/DeleteButton';
import Pagination from '@/Components/Pagination';

export default function Index({ hoaDons }) {
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
                        Quản Lý Hóa Đơn
                    </h2>
                    <Link href={route('hoa-don.create')}>
                        <PrimaryButton>Thêm Hóa Đơn</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Hóa Đơn" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {hoaDons.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Chưa có hóa đơn nào.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Số HD
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Ngày HD
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Khách Hàng
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Nhân Viên
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Trị Giá
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Thao Tác
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                            {hoaDons.data.map((hoaDon) => (
                                                <tr key={hoaDon.SOHD}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                        {hoaDon.SOHD}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {formatDate(hoaDon.NGHD)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {hoaDon.khach_hang?.HOTEN || '—'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {hoaDon.nhan_vien?.HOTEN || '—'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {formatCurrency(hoaDon.TRIGIA)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <Link
                                                                href={route('hoa-don.show', hoaDon.SOHD)}
                                                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-700 dark:focus:ring-offset-gray-800"
                                                            >
                                                                Xem
                                                            </Link>
                                                            <Link
                                                                href={route('hoa-don.edit', hoaDon.SOHD)}
                                                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 dark:focus:ring-offset-gray-800"
                                                            >
                                                                Sửa
                                                            </Link>
                                                            <DeleteButton
                                                                routeName="hoa-don.destroy"
                                                                routeParams={hoaDon.SOHD}
                                                                warningMessage={
                                                                    hoaDon.chi_tiet_hoa_dons_count > 0
                                                                        ? `Xóa hóa đơn này sẽ xóa tất cả ${hoaDon.chi_tiet_hoa_dons_count} chi tiết hóa đơn. Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.`
                                                                        : 'Bạn có chắc chắn muốn xóa hóa đơn này? Hành động này không thể hoàn tác.'
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <Pagination links={hoaDons.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
