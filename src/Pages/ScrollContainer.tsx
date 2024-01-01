import { Fragment, useEffect } from 'react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import { useGetScrollDataQuery } from '../Store/queries/scrollQuery';

const ScrollContainer = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const {
    scrollDatas,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetScrollDataQuery();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {scrollDatas?.pages?.map((page: any, idx: number) => {
        return (
          <Fragment key={idx}>
            {page?.items?.map((e: any, i: number) => {
              return (
                <div key={i}>
                  <div>{e.name}</div>
                  <Item>{e.description}</Item>
                </div>
              );
            })}
          </Fragment>
        );
      })}
      <div>
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load Newer'
          : 'Nothing more to load'}
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
      <div id='scrollArea' ref={ref}></div>
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
