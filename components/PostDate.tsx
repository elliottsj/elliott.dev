import React from 'react';
import { DateTime } from 'luxon';

interface Props {
  isoDate: string;
}

const PostDate: React.FC<Props> = ({ isoDate }) => (
  <small>{DateTime.fromISO(isoDate).toLocaleString(DateTime.DATE_FULL)}</small>
);

export default PostDate;
