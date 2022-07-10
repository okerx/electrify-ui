import { isPrimitive, objectKeys } from '@/utils';
import * as S from './styles';
import { CustomRenderers, TableHeaders } from './types';

const TableBody = ({
  headers,
  items,
  customRenderers,
  onRowClick,
}: {
  headers: TableHeaders;
  items: any[];
  customRenderers?: CustomRenderers;
  onRowClick?: (it: any) => void;
}) => {
  function renderRow(item: any) {
    return (
      <tr
        key={item.id}
        onClick={() => {
          onRowClick?.(item);
        }}
      >
        {objectKeys(headers).map(itemProperty => {
          const customRenderer = customRenderers?.[itemProperty];
          const key = `${String(itemProperty)}-${item.id}`;
          const content = customRenderer
            ? customRenderer(item)
            : isPrimitive(item[itemProperty])
            ? String(item[itemProperty])
            : '';

          return (
            <td key={key} headers={String(itemProperty)}>
              {content}
            </td>
          );
        })}
      </tr>
    );
  }

  return <S.StyledTableBody>{items.map(renderRow)}</S.StyledTableBody>;
};

export default TableBody;
