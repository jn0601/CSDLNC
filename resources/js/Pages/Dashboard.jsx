import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Trang Chủ
                </h2>
            }
        >
            <Head title="Trang Chủ" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-semibold mb-4">Hệ Thống Quản Lý Bán Hàng</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Chào mừng đến với hệ thống quản lý bán hàng. Sử dụng menu để quản lý khách hàng, nhân viên, sản phẩm và hóa đơn.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
