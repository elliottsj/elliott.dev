import { DateTime } from 'luxon';
import React from 'react';

interface Props {
  isoDate: string;
}

const PostDate: React.FC<Props> = ({ isoDate }) => (
  <time dateTime={isoDate}>{DateTime.fromISO(isoDate).toLocaleString(DateTime.DATE_FULL)}</time>
);

export default PostDate;
