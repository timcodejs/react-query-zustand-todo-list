import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import { useGetScrollDataQuery } from '../Store/queries/scrollQuery';

const ScrollContainer = () => {
  const [ref, inView] = useInView();
  const { scrollDatas, fetchNextPage } = useGetScrollDataQuery(inView);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  console.log(scrollDatas);

  return (
    <>
      {scrollDatas?.pages?.quotes?.map((e: any, i: number) => {
        return (
          <div key={i}>
            <div>{e.author}</div>
            <Item>{e.quote}</Item>
          </div>
        );
      })}
      <div id='scrollArea' ref={ref}>
        ---
      </div>
    </>
  );
};

export default ScrollContainer;

const Item = styled.div`
  width: fit-content;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 18px;
  color: #fff;
  background-color: #222271;
  border-radius: 8px;
  border: 1px solid #717171;
`;
