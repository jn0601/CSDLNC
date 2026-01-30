import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import FormSelect from '@/Components/FormSelect';

export default function Edit({ hoaDon, khachHangs, nhanViens }) {
    // Format date to DD/MM/YYYY for Vietnamese date format
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const { data, setData, put, processing, errors } = useForm({
        NGHD: formatDateForInput(hoaDon.NGHD),
        MAKH: hoaDon.MAKH || '',
        MANV: hoaDon.MANV || '',
        TRIGIA: hoaDon.TRIGIA ? Math.floor(hoaDon.TRIGIA) : '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('hoa-don.update', hoaDon.SOHD));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Chỉnh Sửa Hóa Đơn: {hoaDon.SOHD}
                </h2>
            }
        >
            <Head title={`Sửa Hóa Đơn ${hoaDon.SOHD}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="SOHD" value="Số Hóa Đơn" />
                                    <TextInput
                                        id="SOHD"
                                        value={hoaDon.SOHD}
                                        className="mt-1 block w-full bg-gray-100 dark:bg-gray-700"
                                        disabled
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Không thể thay đổi số hóa đơn
                                    </p>
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
                                <PrimaryButton disabled={processing}>Cập Nhật</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
