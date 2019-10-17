import React from 'react';
import MasonryLayout from './MasonryLayout';
import {useMediaQuery, useTheme} from '@material-ui/core';

export default (props) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  let cols = 1;
  // eslint-disable-next-line fp/no-mutation
  if (isLg) cols = props.cols.lg;
  // eslint-disable-next-line fp/no-mutation
  if (isMd) cols = props.cols.md;
  // eslint-disable-next-line fp/no-mutation
  if (isSm) cols = props.cols.sm;
  // eslint-disable-next-line fp/no-mutation
  if (isXs) cols = props.cols.xs;

  return (
    <MasonryLayout columns={cols} gap={props.gap}>
      {props.children}
    </MasonryLayout>
  );
};
