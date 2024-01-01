import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePostHandler } from '../../Store/stores/postStore';
import { useAlertText } from '../../Store/stores/alertStore';

export const AlertToast = () => {
  const handler = usePostHandler();
  const alertText = useAlertText();
  const notify = (text: string) => toast(text);

  useEffect(() => {
    if (handler?.title !== '' && handler?.title !== undefined) {
      notify(`"${handler.title}" 할일이 ${alertText}되었습니다.`);
    }
  }, [handler?.title, alertText]);
};
