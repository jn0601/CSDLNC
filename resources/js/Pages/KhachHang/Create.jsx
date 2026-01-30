import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        MAKH: '',
        HOTEN: '',
        DCHI: '',
        SODT: '',
        NGSINH: '',
        NGDK: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('khach-hang.store'));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Thêm Khách Hàng Mới
                </h2>
            }
        >
            <Head title="Thêm Khách Hàng" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="MAKH" value="Mã Khách Hàng *" />
                                    <TextInput
                                        id="MAKH"
                                        value={data.MAKH}
                                        onChange={(e) => setData('MAKH', e.target.value.toUpperCase())}
                                        className="mt-1 block w-full"
                                        maxLength={4}
                                        required
                                    />
                                    <InputError message={errors.MAKH} className="mt-2" />
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
                                        type="text"
                                        value={data.NGDK}
                                        onChange={(e) => setData('NGDK', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="dd/mm/yyyy"
                                    />
                                    <InputError message={errors.NGDK} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4">
                                <Link href={route('khach-hang.index')}>
                                    <SecondaryButton type="button">Hủy</SecondaryButton>
                                </Link>
                                <PrimaryButton disabled={processing}>Lưu</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
