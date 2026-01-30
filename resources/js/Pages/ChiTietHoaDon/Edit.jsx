import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Edit({ chiTietHoaDon }) {
    const { data, setData, put, processing, errors } = useForm({
        SL: chiTietHoaDon.SL || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('chi-tiet-hoa-don.update', [chiTietHoaDon.SOHD, chiTietHoaDon.MASP]));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Chỉnh Sửa Chi Tiết Hóa Đơn
                </h2>
            }
        >
            <Head title="Sửa Chi Tiết Hóa Đơn" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="SOHD" value="Số Hóa Đơn" />
                                    <TextInput
                                        id="SOHD"
                                        value={chiTietHoaDon.SOHD}
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700"
                                        disabled
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Không thể thay đổi
                                    </p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="MASP" value="Mã Sản Phẩm" />
                                    <TextInput
                                        id="MASP"
                                        value={chiTietHoaDon.MASP}
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700"
                                        disabled
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Không thể thay đổi
                                    </p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="SL" value="Số Lượng" />
                                    <TextInput
                                        id="SL"
                                        type="number"
                                        value={data.SL}
                                        onChange={(e) => setData('SL', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.SL} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4">
                                <Link href={route('chi-tiet-hoa-don.index')}>
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
