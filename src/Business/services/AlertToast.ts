import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePostStore } from '../../Store/stores/postStore';
import { useAlertStore } from '../../Store/stores/alertStore';

export const AlertToast = () => {
  const { alertText } = useAlertStore();
  const { handler, setHandler } = usePostStore();
  const notify = (text: string) => toast(text);

  useEffect(() => {
    if (handler?.title !== '' && handler?.title !== undefined) {
      if (handler?.title === 'void') {
        notify(`할 일을 입력해 주세요.`);
        setHandler({});
      } else {
        notify(`"${handler.title}" 할일이 ${alertText}되었습니다.`);
      }
    }
  }, [handler?.title, alertText]);
};
