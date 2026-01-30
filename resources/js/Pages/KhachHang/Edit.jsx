import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Edit({ khachHang }) {
    // Format dates to DD/MM/YYYY for Vietnamese date format
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const { data, setData, put, processing, errors } = useForm({
        HOTEN: khachHang.HOTEN || '',
        DCHI: khachHang.DCHI || '',
        SODT: khachHang.SODT || '',
        NGSINH: formatDateForInput(khachHang.NGSINH),
        NGDK: formatDateForInput(khachHang.NGDK),
        DOANHSO: khachHang.DOANHSO || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('khach-hang.update', khachHang.MAKH));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Chỉnh Sửa Khách Hàng: {khachHang.MAKH}
                </h2>
            }
        >
            <Head title={`Sửa ${khachHang.HOTEN}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="MAKH" value="Mã Khách Hàng" />
                                    <TextInput
                                        id="MAKH"
                                        value={khachHang.MAKH}
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700"
                                        disabled
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Không thể thay đổi mã khách hàng
                                    </p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="HOTEN" value="Họ Tên *" />
                                    <TextInput
                                        id="HOTEN"
                                        value={data.HOTEN}
                                        onChange={(e) => setData('HOTEN', e.target.value)}
                                        className="mt-1 block w-full"
                                        maxLength={40}
                                        required
                                    />
                                    <InputError message={errors.HOTEN} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="DCHI" value="Địa Chỉ" />
                                    <TextInput
                                        id="DCHI"
                                        value={data.DCHI}
                                        onChange={(e) => setData('DCHI', e.target.value)}
                                        className="mt-1 block w-full"
                                        maxLength={50}
                                    />
                                    <InputError message={errors.DCHI} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="SODT" value="Số Điện Thoại" />
                                    <TextInput
                                        id="SODT"
                                        value={data.SODT}
                                        onChange={(e) => setData('SODT', e.target.value)}
                                        className="mt-1 block w-full"
                                        maxLength={20}
                                    />
                                    <InputError message={errors.SODT} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="NGSINH" value="Ngày Sinh" />
                                    <TextInput
                                        id="NGSINH"
                                        type="text"
                                        value={data.NGSINH}
                                        onChange={(e) => setData('NGSINH', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="dd/mm/yyyy"
                                    />
                                    <InputError message={errors.NGSINH} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="NGDK" value="Ngày Đăng Ký" />
                                    <TextInput
                                        id="NGDK"
                                        type="date"
                                        value={data.NGDK}
                                        onChange={(e) => setData('NGDK', e.target.value)}
                                        className="mt-1 block w-full"                                        placeholder="dd/mm/yyyy"                                    />
                                    <InputError message={errors.NGDK} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="DOANHSO" value="Doanh Số (Tự động tính)" />
                                    <TextInput
                                        id="DOANHSO"
                                        type="text"
                                        value={data.DOANHSO ? new Intl.NumberFormat('vi-VN').format(data.DOANHSO) + ' ₫' : '0 ₫'}
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-900"
                                        disabled
                                        readOnly
                                    />
                                    <InputError message={errors.DOANHSO} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4">
                                <Link href={route('khach-hang.index')}>
                                    <SecondaryButton type="button">Hủy</SecondaryButton>
                                </Link>
                                <PrimaryButton disabled={processing}>Cập Nhật</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
