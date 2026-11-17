import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { selectToast, hideToast } from '../../features/ui/uiSlice';
import styles from './Toast.module.css';

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector(selectToast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      dispatch(hideToast());
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;

  const { type = 'info', message } = toast;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.icon}>
        {type === 'success' && <CheckCircle2 size={18} />}
        {type === 'error' && <AlertCircle size={18} />}
        {type === 'info' && <Info size={18} />}
        {type === 'warning' && <AlertCircle size={18} />}
      </div>
      <p className={styles.message}>{message}</p>
      <button
        onClick={() => dispatch(hideToast())}
        className={styles.closeBtn}
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
