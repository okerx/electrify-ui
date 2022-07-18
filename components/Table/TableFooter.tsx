import { ReactEventHandler, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import Select from '@/components/Select';
import Spinner from '@/components/Spinner';
import * as S from './styles';
import { TablePagination } from './types';
import { PER_PAGE_OPTIONS } from './constants';

const TableFooter = ({
  pagination,
  onPagination,
  loading,
}: {
  pagination?: TablePagination;
  onPagination?: (p: Omit<TablePagination, 'total'>) => void;
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
        page: String(parseInt(pagination.page, 10) + 1),
      });
    }
  };

  const handlePrevPage: ReactEventHandler<HTMLButtonElement> = () => {
    if (pagination) {
      onPagination?.({
        perPage: pagination.perPage,
        page: pagination ? String(parseInt(pagination.page, 10) - 1) : '0',
      });
    }
  };

  const handlePerPage: ReactEventHandler<HTMLSelectElement> = e => {
    if (pagination) {
      onPagination?.({
        page: '1',
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
              data-test-id="table-per-page-select"
              defaultValue={pagination.perPage}
              options={[
                ...PER_PAGE_OPTIONS,
                PER_PAGE_OPTIONS.includes(pagination.perPage)
                  ? null
                  : pagination.perPage,
              ]}
            />
          </div>

          <div>
            <span data-test-id="table-page-start">{pageStart}</span>-
            <span data-test-id="table-page-end">{pageEnd}</span> of{' '}
            <span data-test-id="table-page-total">{pagination.total}</span>
          </div>

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
