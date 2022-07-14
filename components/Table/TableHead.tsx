import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { objectKeys } from '@/utils';
import usePrevious from '@/hooks/usePrevious';
import { TableHeaders, TableSort } from './types';
import * as S from './styles';

interface TableHeadProps {
  headers: TableHeaders;
  sort?: TableSort;
  onSort?: (s: TableSort) => void;
  loading?: boolean;
}

const TableHead = (props: TableHeadProps) => {
  const { headers, sort, onSort, loading } = props;
  const prevProps = usePrevious(props);
  const [lastSortHeader, setLastSortHeader] = useState<string | null>(null);

  const renderSortIcon = (header: keyof TableHeaders) => {
    if (sort?.by === header) {
      if (sort?.type === 'asc') return <FontAwesomeIcon icon={faArrowUp} />;
      if (sort?.type === 'desc') return <FontAwesomeIcon icon={faArrowDown} />;
    }
    return <S.SortHoverIcon icon={faArrowUp} />;
  };

  const isSortingDisabled = (sortable?: boolean) =>
    typeof sortable === 'boolean' ? !sortable : false;

  const handleSort = (header: keyof TableHeaders) => {
    if (lastSortHeader === header) {
      switch (sort?.type) {
        case 'asc':
          onSort?.({ type: 'desc', by: String(header) });
          break;

        case 'desc':
          onSort?.({});
          break;

        default:
          onSort?.({ type: 'asc', by: String(header) });
      }
    } else {
      onSort?.({ type: 'asc', by: String(header) });
    }

    setLastSortHeader(header as string);
  };

  return (
    <S.StyledTableHead>
      <tr>
        {objectKeys(headers).map(key => (
          <th id={String(key)} key={String(key)}>
            {!isSortingDisabled(headers[key].sortable) ? (
              <button
                disabled={loading}
                onClick={() => {
                  handleSort(key);
                }}
              >
                {headers[key].title} {renderSortIcon(key)}
              </button>
            ) : (
              headers[key].title
            )}
          </th>
        ))}
      </tr>
    </S.StyledTableHead>
  );
};

export default TableHead;
