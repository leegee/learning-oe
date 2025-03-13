import { useTranslation } from "react-i18next";
import './Confirm.css';

interface ConfirmDialogProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }: ConfirmDialogProps) => {
    if (!isOpen) return null;

    const { t } = useTranslation();

    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <p>{message}</p>
                <footer>
                    <button className="cancel-button" onClick={onCancel}>{t('no')}</button>
                    <button className="next-button" onClick={onConfirm}>{t('yes')}</button>
                </footer>
            </div>
        </div>
    );
};

export default ConfirmDialog;
