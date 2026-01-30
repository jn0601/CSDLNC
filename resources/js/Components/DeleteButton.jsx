import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import DangerButton from './DangerButton';
import Modal from './Modal';
import SecondaryButton from './SecondaryButton';

export default function DeleteButton({ routeName, routeParams, className = '', children = 'Xóa', warningMessage = null }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = () => {
        setConfirmingDeletion(true);
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
    };

    const deleteItem = (e) => {
        e.preventDefault();
        destroy(route(routeName, routeParams), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <DangerButton onClick={confirmDeletion} className={`inline-flex items-center ${className}`}>
                {children}
            </DangerButton>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteItem} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Xác nhận xóa
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {warningMessage || 'Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.'}
                    </p>

                    <div className="mt-6 flex justify-end space-x-3">
                        <SecondaryButton onClick={closeModal} type="button">
                            Hủy
                        </SecondaryButton>

                        <DangerButton disabled={processing}>
                            Xóa
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
