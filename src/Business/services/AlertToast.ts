import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePostStore } from '../../Store/stores/postStore';
import { useAlertStore } from '../../Store/stores/alertStore';

export const AlertToast = () => {
  const { handler } = usePostStore();
  const { alertText } = useAlertStore();
  const notify = (text: string) => toast(text);

  useEffect(() => {
    if (handler.title !== '' && handler.title !== undefined) {
      notify(`"${handler.title}" 할일이 ${alertText}되었습니다.`);
    }
  }, [handler.title, alertText]);
};
