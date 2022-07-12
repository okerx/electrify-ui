import { ReactEventHandler, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import * as S from './styles';
import { TablePagination } from './types';
import Select from '@/components/Select';
import Spinner from '@/components/Spinner';

const TableFooter = ({
  pagination,
  onPagination,
  loading,
}: {
  pagination?: TablePagination;
  onPagination?: (p: { perPage: string; page: string }) => void;
  loading?: boolean;
}) => {
  const pageStart = useMemo(() => {
    if (pagination) {
      return parseInt(pagination.perPage) * (parseInt(pagination.page) - 1) + 1;
    }
  }, [pagination]);

  const pageEnd = useMemo(() => {
    if (pagination) {
      const count = parseInt(pagination.perPage) * parseInt(pagination.page);
      if (pagination.total && count <= parseInt(pagination.total)) return count;
      return pagination.total;
    }
  }, [pagination]);

  const isNextDisabled = useMemo(() => {
    return pageEnd === pagination?.total;
  }, [pageEnd, pagination]);

  const isPrevDisabled = useMemo(() => {
    if (pagination) return parseInt(pagination?.page) === 1;
  }, [pagination]);

  const handleNextPage: ReactEventHandler<HTMLButtonElement> = () => {
    if (pagination) {
      onPagination?.({
        perPage: pagination.perPage,
        page: pagination.page + 1,
      });
    }
  };

  const handlePrevPage: ReactEventHandler<HTMLButtonElement> = () => {
    if (pagination) {
      onPagination?.({
        perPage: pagination.perPage,
        page: pagination ? String(parseInt(pagination.page) - 1) : '0',
      });
    }
  };

  const handlePerPage: ReactEventHandler<HTMLSelectElement> = e => {
    if (pagination) {
      onPagination?.({
        page: pagination.page,
        perPage: e.currentTarget.value,
      });
    }
  };

  return (
    <S.StyledTableFooter>
      {pagination && (
        <>
          {loading && (
            <div>
              <Spinner size={30} />
            </div>
          )}
          <div>
            Items per page{' '}
            <Select
              hideDetails
              onChange={handlePerPage}
              disabled={loading}
              color="secondary"
              options={[
                {
                  value: 10,
                  title: '10',
                },
                {
                  value: 30,
                  title: '30',
                },
                {
                  value: 50,
                  title: '50',
                },
              ]}
            />
          </div>
          <div>{`${pageStart}-${pageEnd} of ${pagination.total}`}</div>

          <S.TableFooterNextPrev>
            <button
              disabled={loading || isPrevDisabled}
              onClick={handlePrevPage}
            >
              <FontAwesomeIcon size="2x" icon={faArrowLeft} />
            </button>
            <button
              disabled={loading || isNextDisabled}
              onClick={handleNextPage}
            >
              <FontAwesomeIcon size="2x" icon={faArrowRight} />
            </button>
          </S.TableFooterNextPrev>
        </>
      )}
    </S.StyledTableFooter>
  );
};

export default TableFooter;
