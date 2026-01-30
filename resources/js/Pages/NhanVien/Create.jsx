import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        MANV: '',
        HOTEN: '',
        SODT: '',
        NGVL: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('nhan-vien.store'));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Thêm Nhân Viên Mới
                </h2>
            }
        >
            <Head title="Thêm Nhân Viên" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="MANV" value="Mã Nhân Viên *" />
                                    <TextInput
                                        id="MANV"
                                        value={data.MANV}
                                        onChange={(e) => setData('MANV', e.target.value.toUpperCase())}
                                        className="mt-1 block w-full"
                                        maxLength={4}
                                        required
                                    />
                                    <InputError message={errors.MANV} className="mt-2" />
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
                                    <InputLabel htmlFor="NGVL" value="Ngày Vào Làm" />
                                    <TextInput
                                        id="NGVL"
                                        type="text"
                                        value={data.NGVL}
                                        onChange={(e) => setData('NGVL', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="dd/mm/yyyy"
                                    />
                                    <InputError message={errors.NGVL} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4">
                                <Link href={route('nhan-vien.index')}>
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
