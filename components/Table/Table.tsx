import { ForwardedRef, forwardRef } from 'react';
import { MinTableItem, TableProps } from './types';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import * as S from './styles';

function TableInner<T extends MinTableItem>(
  {
    headers,
    items,
    customRenderers,
    sort,
    pagination,
    onSort,
    onPagination,
    onRowClick,
    loading,
    ...props
  }: TableProps<T>,
  ref: ForwardedRef<HTMLTableElement>,
) {
  return (
    <S.TableMainWrapper>
      <S.TableWrapper>
        <S.StyledTable ref={ref} {...props}>
          <TableHead
            headers={headers}
            sort={sort}
            loading={loading}
            onSort={onSort}
          />
          <TableBody
            headers={headers}
            items={items}
            customRenderers={customRenderers}
            onRowClick={onRowClick}
          />
        </S.StyledTable>
      </S.TableWrapper>
      <TableFooter
        pagination={pagination}
        onPagination={onPagination}
        loading={loading}
      />
    </S.TableMainWrapper>
  );
}

const Table = forwardRef(TableInner) as <T extends MinTableItem>(
  props: TableProps<T> & { ref?: ForwardedRef<HTMLTableElement> },
) => ReturnType<typeof TableInner>;

export default Table;
