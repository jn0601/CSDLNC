import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import FormSelect from '@/Components/FormSelect';

export default function Edit({ hoaDon, khachHangs, nhanViens, sanPhams }) {
    const { props } = usePage();
    const csrfToken = props.csrf_token || document.querySelector('meta[name="csrf-token"]')?.content || '';
    
    const [chiTietList, setChiTietList] = useState(hoaDon.chi_tiet_hoa_dons || []);
    const [newProduct, setNewProduct] = useState({ MASP: '', SL: '' });
    const [editingItem, setEditingItem] = useState(null);
    const [message, setMessage] = useState(null);
    const [modifiedChiTiet, setModifiedChiTiet] = useState({});
    const [newChiTiet, setNewChiTiet] = useState([]);

    // Format date to DD/MM/YYYY
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatCurrency = (value) => {
        if (!value) return '0 ₫';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const { data, setData, put, processing, errors } = useForm({
        NGHD: formatDateForInput(hoaDon.NGHD),
        MAKH: hoaDon.MAKH || '',
        MANV: hoaDon.MANV || '',
        TRIGIA: hoaDon.TRIGIA ? Math.floor(hoaDon.TRIGIA) : '',
    });

    const submit = async (e) => {
        e.preventDefault();
        
        try {
            // Save new products first
            for (const item of newChiTiet) {
                const { data: result } = await window.axios.post(route('chi-tiet-hoa-don.store'), {
                    SOHD: item.SOHD,
                    MASP: item.MASP,
                    SL: item.SL,
                    _inline: true
                });
                
                if (!result.success) {
                    setMessage({ type: 'error', text: result.message || 'Lỗi khi thêm sản phẩm!' });
                    return;
                }
            }
            
            // Save modified chi tiết quantities
            for (const [masp, quantity] of Object.entries(modifiedChiTiet)) {
                const { data: result } = await window.axios.put(route('chi-tiet-hoa-don.update', [hoaDon.SOHD, masp]), {
                    SL: quantity,
                    _inline: true
                });
                
                if (!result.success) {
                    setMessage({ type: 'error', text: result.message || 'Lỗi khi cập nhật số lượng!' });
                    return;
                }
            }
            
            // Clear tracking
            setModifiedChiTiet({});
            setNewChiTiet([]);
            
            // Then update hóa đơn (don't send TRIGIA - backend already calculated it)
            router.put(route('hoa-don.update', hoaDon.SOHD), {
                NGHD: data.NGHD,
                MAKH: data.MAKH,
                MANV: data.MANV
            }, {
                preserveState: true,
                preserveScroll: true
            });
        } catch (error) {
            setMessage({ type: 'error', text: 'Có lỗi khi lưu chi tiết: ' + (error.response?.data?.message || error.message) });
        }
    };

    const handleAddProduct = () => {
        if (!newProduct.MASP || !newProduct.SL) {
            setMessage({ type: 'error', text: 'Vui lòng chọn sản phẩm và nhập số lượng!' });
            return;
        }

        // Find the product details
        const product = sanPhams.find(sp => sp.MASP === newProduct.MASP);
        if (!product) {
            setMessage({ type: 'error', text: 'Không tìm thấy sản phẩm!' });
            return;
        }

        // Add to local state only - will save when clicking "Cập Nhật"
        const newItem = {
            SOHD: hoaDon.SOHD,
            MASP: newProduct.MASP,
            SL: parseInt(newProduct.SL),
            san_pham: product
        };

        setChiTietList([...chiTietList, newItem]);
        setNewChiTiet([...newChiTiet, newItem]);
        setNewProduct({ MASP: '', SL: '' });
        setMessage({ type: 'success', text: 'Đã thêm sản phẩm! Nhấn "Cập Nhật" để lưu.' });
    };

    const handleUpdateQuantity = (sohd, masp, newQuantity) => {
        // Update local state only - will save when clicking "Cập Nhật"
        const updatedList = chiTietList.map(ct => 
            ct.MASP === masp ? { ...ct, SL: parseInt(newQuantity) } : ct
        );
        setChiTietList(updatedList);
        setEditingItem(null);
        
        // Track this modification for batch save
        setModifiedChiTiet({
            ...modifiedChiTiet,
            [masp]: parseInt(newQuantity)
        });
    };

    const handleDeleteChiTiet = async (sohd, masp) => {
        if (!confirm('Xóa sản phẩm này?')) return;

        // Check if this is a newly added item (not yet saved)
        const isNewItem = newChiTiet.some(item => item.MASP === masp);
        
        if (isNewItem) {
            // Just remove from local state
            setChiTietList(chiTietList.filter(ct => ct.MASP !== masp));
            setNewChiTiet(newChiTiet.filter(item => item.MASP !== masp));
            setMessage({ type: 'success', text: 'Đã xóa sản phẩm!' });
            return;
        }

        // Otherwise delete from database
        try {
            const { data: result } = await window.axios.delete(route('chi-tiet-hoa-don.destroy', [sohd, masp]), {
                data: { _inline: true }
            });

            if (result.success) {
                setChiTietList(chiTietList.filter(ct => ct.MASP !== masp));
                setMessage({ type: 'success', text: result.message });
                router.reload({ only: ['hoaDon'] });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Có lỗi xảy ra!' });
        }
    };

    const calculateTotal = () => {
        return chiTietList.reduce((sum, ct) => 
            sum + (ct.SL * (ct.san_pham?.GIA || 0)), 0
        );
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {message && (
                        <div className={`rounded-md p-4 ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'}`}>
                            <p className={`text-sm ${message.type === 'success' ? 'text-green-800 dark:text-white' : 'text-red-800 dark:text-white'}`}>
                                {message.text}
                            </p>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Thông Tin Hóa Đơn
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="SOHD" value="Số Hóa Đơn" />
                                    <TextInput id="SOHD" value={hoaDon.SOHD} className="mt-1 block w-full bg-gray-100 dark:bg-gray-700" disabled />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Không thể thay đổi</p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="NGHD" value="Ngày Hóa Đơn" />
                                    <TextInput id="NGHD" type="text" value={data.NGHD} onChange={(e) => setData('NGHD', e.target.value)} className="mt-1 block w-full" placeholder="dd/mm/yyyy" />
                                    <InputError message={errors.NGHD} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="MAKH" value="Khách Hàng" />
                                    <FormSelect id="MAKH" value={data.MAKH} onChange={(e) => setData('MAKH', e.target.value)} className="mt-1 block w-full">
                                        <option value="">-- Chọn Khách Hàng --</option>
                                        {khachHangs.map((kh) => (
                                            <option key={kh.MAKH} value={kh.MAKH}>{kh.MAKH} - {kh.HOTEN}</option>
                                        ))}
                                    </FormSelect>
                                    <InputError message={errors.MAKH} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="MANV" value="Nhân Viên" />
                                    <FormSelect id="MANV" value={data.MANV} onChange={(e) => setData('MANV', e.target.value)} className="mt-1 block w-full">
                                        <option value="">-- Chọn Nhân Viên --</option>
                                        {nhanViens.map((nv) => (
                                            <option key={nv.MANV} value={nv.MANV}>{nv.MANV} - {nv.HOTEN}</option>
                                        ))}
                                    </FormSelect>
                                    <InputError message={errors.MANV} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="TRIGIA" value="Trị Giá (Tự động)" />
                                    <TextInput id="TRIGIA" value={formatCurrency(calculateTotal())} className="mt-1 block w-full bg-gray-100 dark:bg-gray-700" disabled />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Tính từ chi tiết</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4 border-t dark:border-gray-700">
                                <Link href={route('hoa-don.index')}>
                                    <SecondaryButton type="button">Hủy</SecondaryButton>
                                </Link>
                                <PrimaryButton disabled={processing}>Cập Nhật</PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Chi Tiết Hóa Đơn ({chiTietList.length})
                            </h3>

                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <h4 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Thêm Sản Phẩm</h4>
                                <div className="flex flex-row items-center gap-3">
                                    <div className="flex-1 max-w-md">
                                        <FormSelect value={newProduct.MASP} onChange={(e) => setNewProduct({ ...newProduct, MASP: e.target.value })} className="block w-full">
                                            <option value="">-- Chọn Sản Phẩm --</option>
                                            {sanPhams.filter(sp => !chiTietList.some(ct => ct.MASP === sp.MASP)).map((sp) => (
                                                <option key={sp.MASP} value={sp.MASP}>
                                                    {sp.TENSP} ({formatCurrency(sp.GIA)})
                                                </option>
                                            ))}
                                        </FormSelect>
                                    </div>
                                    <div className="w-28">
                                        <TextInput type="number" value={newProduct.SL} onChange={(e) => setNewProduct({ ...newProduct, SL: e.target.value })} placeholder="Số lượng" className="block w-full" min="1" />
                                    </div>
                                    <PrimaryButton type="button" onClick={handleAddProduct}>Thêm</PrimaryButton>
                                </div>
                            </div>

                            {chiTietList.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">Chưa có sản phẩm.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Sản Phẩm</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Số Lượng</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Đơn Giá</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Thành Tiền</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                            {chiTietList.map((ct) => (
                                                <tr key={`${ct.SOHD}-${ct.MASP}`}>
                                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                        {ct.san_pham?.TENSP || ct.MASP}
                                                        <div className="text-xs text-gray-500 dark:text-white">{ct.MASP}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-right text-sm">
                                                        {editingItem === ct.MASP ? (
                                                            <TextInput type="number" defaultValue={ct.SL} className="w-20" autoFocus
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') handleUpdateQuantity(ct.SOHD, ct.MASP, e.target.value);
                                                                    else if (e.key === 'Escape') setEditingItem(null);
                                                                }}
                                                                onBlur={(e) => {
                                                                    if (e.target.value != ct.SL) handleUpdateQuantity(ct.SOHD, ct.MASP, e.target.value);
                                                                    else setEditingItem(null);
                                                                }}
                                                            />
                                                        ) : (
                                                            <button onClick={() => setEditingItem(ct.MASP)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                                                <span className="text-gray-900 dark:text-white">{ct.SL}</span> <span className="text-xs dark:text-white">✎</span>
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-right text-sm text-gray-900 dark:text-white">{formatCurrency(ct.san_pham?.GIA)}</td>
                                                    <td className="px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(ct.SL * (ct.san_pham?.GIA || 0))}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button onClick={() => handleDeleteChiTiet(ct.SOHD, ct.MASP)} className="text-red-600 hover:text-red-800 dark:text-red-400 text-sm">Xóa</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="bg-gray-50 dark:bg-gray-900 font-semibold">
                                                <td colSpan="3" className="px-4 py-3 text-right text-sm text-gray-900 dark:text-white">Tổng:</td>
                                                <td className="px-4 py-3 text-right text-base text-blue-600 dark:text-white">{formatCurrency(calculateTotal())}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
