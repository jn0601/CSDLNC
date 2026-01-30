import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DeleteButton from '@/Components/DeleteButton';
import Pagination from '@/Components/Pagination';

export default function Index({ chiTietHoaDons }) {
    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Quản Lý Chi Tiết Hóa Đơn
                    </h2>
                    <Link href={route('chi-tiet-hoa-don.create')}>
                        <PrimaryButton>Thêm Chi Tiết</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Chi Tiết Hóa Đơn" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {chiTietHoaDons.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Chưa có chi tiết hóa đơn nào.
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
                                                    Sản Phẩm
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Số Lượng
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Thao Tác
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                            {chiTietHoaDons.data.map((ct) => (
                                                <tr key={`${ct.SOHD}-${ct.MASP}`}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                        {ct.SOHD}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {ct.san_pham?.TENSP || ct.MASP}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {ct.SL}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <Link
                                                                href={route('chi-tiet-hoa-don.edit', [
                                                                    ct.SOHD,
                                                                    ct.MASP,
                                                                ])}
                                                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 dark:focus:ring-offset-gray-800"
                                                            >
                                                                Sửa
                                                            </Link>
                                                            <form
                                                                method="POST"
                                                                action={route('chi-tiet-hoa-don.destroy', [
                                                                    ct.SOHD,
                                                                    ct.MASP,
                                                                ])}
                                                                onSubmit={(e) => {
                                                                    if (
                                                                        !confirm(
                                                                            'Bạn có chắc chắn muốn xóa?'
                                                                        )
                                                                    ) {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            >
                                                                <input
                                                                    type="hidden"
                                                                    name="_method"
                                                                    value="DELETE"
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500"
                                                                >
                                                                    Xóa
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <Pagination links={chiTietHoaDons.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
