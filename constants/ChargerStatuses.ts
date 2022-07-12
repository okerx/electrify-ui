export const ChargerStatusesList: { title: string; value: string }[] = [
  { title: 'Connected', value: 'CONNECTED' },
  { title: 'Not Connected', value: 'NOT_CONNECTED' },
  { title: 'Removed', value: 'REMOVED' },
];

enum ChargerStatuses {
  CONNECTED = 'Connected',
  NOT_CONNECTED = 'Not Connected',
  REMOVED = 'Removed',
}

export default ChargerStatuses;
