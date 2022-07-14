import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const $dayjs = dayjs;

dayjs.extend(relativeTime);

export default $dayjs;
