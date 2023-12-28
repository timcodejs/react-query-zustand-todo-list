export const useQueryString = (
  userId: number,
  setQueryString: (e: string) => void
) => {
  switch (userId) {
    case 2:
      setQueryString('&userId=2');
      break;
    case 3:
      setQueryString('&userId=2&userId=3');
      break;
    case 4:
      setQueryString('&userId=2&userId=3&userId=4');
      break;
    case 5:
      setQueryString('&userId=2&userId=3&userId=4&userId=5');
      break;
    case 6:
      setQueryString('&userId=2&userId=3&userId=4&userId=5&userId=6');
      break;
    case 7:
      setQueryString('&userId=2&userId=3&userId=4&userId=5&userId=6&userId=7');
      break;
    case 8:
      setQueryString(
        '&userId=2&userId=3&userId=4&userId=5&userId=6&userId=7&userId=8'
      );
      break;
    case 9:
      setQueryString(
        '&userId=2&userId=3&userId=4&userId=5&userId=6&userId=7&userId=8&userId=9'
      );
      break;
    case 10:
      setQueryString(
        '&userId=2&userId=3&userId=4&userId=5&userId=6&userId=7&userId=8&userId=9&userId=10'
      );
      break;
    default:
      break;
  }
};
