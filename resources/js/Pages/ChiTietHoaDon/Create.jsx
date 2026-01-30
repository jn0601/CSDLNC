import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import FormSelect from '@/Components/FormSelect';

export default function Create({ hoaDons, sanPhams }) {
    const { data, setData, post, processing, errors } = useForm({
        SOHD: '',
        MASP: '',
        SL: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chi-tiet-hoa-don.store'));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Thêm Chi Tiết Hóa Đơn
                </h2>
            }
        >
            <Head title="Thêm Chi Tiết Hóa Đơn" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="SOHD" value="Hóa Đơn *" />
                                    <FormSelect
                                        id="SOHD"
                                        value={data.SOHD}
                                        onChange={(e) => setData('SOHD', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    >
                                        <option value="">-- Chọn Hóa Đơn --</option>
                                        {hoaDons.map((hd) => (
                                            <option key={hd.SOHD} value={hd.SOHD}>
                                                HD #{hd.SOHD}
                                            </option>
                                        ))}
                                    </FormSelect>
                                    <InputError message={errors.SOHD} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="MASP" value="Sản Phẩm *" />
                                    <FormSelect
                                        id="MASP"
                                        value={data.MASP}
                                        onChange={(e) => setData('MASP', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    >
                                        <option value="">-- Chọn Sản Phẩm --</option>
                                        {sanPhams.map((sp) => (
                                            <option key={sp.MASP} value={sp.MASP}>
                                                {sp.MASP} - {sp.TENSP}
                                            </option>
                                        ))}
                                    </FormSelect>
                                    <InputError message={errors.MASP} className="mt-2" />
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
                                <PrimaryButton disabled={processing}>Lưu</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
