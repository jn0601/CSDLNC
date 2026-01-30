import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        MASP: '',
        TENSP: '',
        DVT: '',
        NUOCSX: '',
        GIA: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('san-pham.store'));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Thêm Sản Phẩm Mới
                </h2>
            }
        >
            <Head title="Thêm Sản Phẩm" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="MASP" value="Mã Sản Phẩm *" />
                                    <TextInput
                                        id="MASP"
                                        value={data.MASP}
                                        onChange={(e) => setData('MASP', e.target.value.toUpperCase())}
                                        className="mt-1 block w-full"
                                        maxLength={4}
                                        required
                                    />
                                    <InputError message={errors.MASP} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="TENSP" value="Tên Sản Phẩm *" />
                                    <TextInput
                                        id="TENSP"
                                        value={data.TENSP}
                                        onChange={(e) => setData('TENSP', e.target.value)}
                                        className="mt-1 block w-full"
                                        maxLength={40}
                                        required
                                    />
                                    <InputError message={errors.TENSP} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="DVT" value="Đơn Vị Tính" />
                                    <TextInput
                                        id="DVT"
                                        value={data.DVT}
                                        onChange={(e) => setData('DVT', e.target.value)}
                                        className="mt-1 block w-full"
                                        maxLength={20}
                                        placeholder="cái, hộp, kg..."
                                    />
                                    <InputError message={errors.DVT} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="NUOCSX" value="Nước Sản Xuất" />
                                    <TextInput
                                        id="NUOCSX"
                                        value={data.NUOCSX}
                                        onChange={(e) => setData('NUOCSX', e.target.value)}
                                        className="mt-1 block w-full"
                                        maxLength={40}
                                    />
                                    <InputError message={errors.NUOCSX} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="GIA" value="Giá" />
                                    <TextInput
                                        id="GIA"
                                        type="number"
                                        value={data.GIA}
                                        onChange={(e) => setData('GIA', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.GIA} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4">
                                <Link href={route('san-pham.index')}>
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
