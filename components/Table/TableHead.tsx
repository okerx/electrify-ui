import { objectKeys } from '@/utils';
import { TableHeaders, TableSort } from './types';
import * as S from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';

const TableHead = ({
  headers,
  sort,
  onSort,
  loading,
}: {
  headers: TableHeaders;
  sort?: TableSort;
  onSort?: (s: TableSort) => void;
  loading?: boolean;
}) => {
  const renderSortIcon = (header: keyof TableHeaders) => {
    if (sort?.type === 'asc') return <FontAwesomeIcon icon={faArrowUp} />;
    if (sort?.type === 'desc') return <FontAwesomeIcon icon={faArrowDown} />;
    return <S.SortHoverIcon icon={faArrowUp} />;
  };

  const isSortingDisabled = (sortable?: boolean) =>
    typeof sortable === 'boolean' ? !sortable : false;

  const handleSort = (header: keyof TableHeaders) => {
    if (!sort || sort.type === 'desc')
      onSort?.({ type: 'asc', by: String(header) });
    else onSort?.({ type: 'desc', by: String(header) });
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
