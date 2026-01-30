import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DeleteButton from '@/Components/DeleteButton';
import Pagination from '@/Components/Pagination';

export default function Index({ nhanViens }) {
    const formatDate = (dateString) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Quản Lý Nhân Viên
                    </h2>
                    <Link href={route('nhan-vien.create')}>
                        <PrimaryButton>Thêm Nhân Viên</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Nhân Viên" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {nhanViens.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Chưa có nhân viên nào.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Mã NV
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Họ Tên
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Số ĐT
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Ngày Vào Làm
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Thao Tác
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                            {nhanViens.data.map((nhanVien) => (
                                                <tr key={nhanVien.MANV}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                        {nhanVien.MANV}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {nhanVien.HOTEN}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {nhanVien.SODT || '—'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {formatDate(nhanVien.NGVL)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <Link
                                                                href={route('nhan-vien.show', nhanVien.MANV)}
                                                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-700 dark:focus:ring-offset-gray-800"
                                                            >
                                                                Xem
                                                            </Link>
                                                            <Link
                                                                href={route('nhan-vien.edit', nhanVien.MANV)}
                                                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 dark:focus:ring-offset-gray-800"
                                                            >
                                                                Sửa
                                                            </Link>
                                                            <DeleteButton
                                                                routeName="nhan-vien.destroy"
                                                                routeParams={nhanVien.MANV}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <Pagination links={nhanViens.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
