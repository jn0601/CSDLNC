import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import FormSelect from '@/Components/FormSelect';

export default function Create({ khachHangs, nhanViens }) {
    const { data, setData, post, processing, errors } = useForm({
        SOHD: '',
        NGHD: '',
        MAKH: '',
        MANV: '',
        TRIGIA: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('hoa-don.store'));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Thêm Hóa Đơn Mới
                </h2>
            }
        >
            <Head title="Thêm Hóa Đơn" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="SOHD" value="Số Hóa Đơn *" />
                                    <TextInput
                                        id="SOHD"
                                        type="number"
                                        value={data.SOHD}
                                        onChange={(e) => setData('SOHD', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.SOHD} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="NGHD" value="Ngày Hóa Đơn" />
                                    <TextInput
                                        id="NGHD"
                                        type="text"
                                        value={data.NGHD}
                                        onChange={(e) => setData('NGHD', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="dd/mm/yyyy"
                                    />
                                    <InputError message={errors.NGHD} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="MAKH" value="Khách Hàng" />
                                    <FormSelect
                                        id="MAKH"
                                        value={data.MAKH}
                                        onChange={(e) => setData('MAKH', e.target.value)}
                                        className="mt-1 block w-full"
                                    >
                                        <option value="">-- Chọn Khách Hàng --</option>
                                        {khachHangs.map((kh) => (
                                            <option key={kh.MAKH} value={kh.MAKH}>
                                                {kh.MAKH} - {kh.HOTEN}
                                            </option>
                                        ))}
                                    </FormSelect>
                                    <InputError message={errors.MAKH} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="MANV" value="Nhân Viên" />
                                    <FormSelect
                                        id="MANV"
                                        value={data.MANV}
                                        onChange={(e) => setData('MANV', e.target.value)}
                                        className="mt-1 block w-full"
                                    >
                                        <option value="">-- Chọn Nhân Viên --</option>
                                        {nhanViens.map((nv) => (
                                            <option key={nv.MANV} value={nv.MANV}>
                                                {nv.MANV} - {nv.HOTEN}
                                            </option>
                                        ))}
                                    </FormSelect>
                                    <InputError message={errors.MANV} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="TRIGIA" value="Trị Giá" />
                                    <TextInput
                                        id="TRIGIA"
                                        type="number"
                                        value={data.TRIGIA}
                                        onChange={(e) => setData('TRIGIA', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.TRIGIA} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4">
                                <Link href={route('hoa-don.index')}>
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
