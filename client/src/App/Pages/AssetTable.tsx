import {
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { testNetBaseUrl } from './AccountListItem';

const styles = makeStyles({
  root: {
    marginTop: 40,
  },
  infoLabel: {
    color: '#A3A9B5',
    fontSize: 13,
    marginTop: 12,
    marginBottom: 20,
  },
});

export function OwnedAssetTable({ info }) {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Typography className={classes.infoLabel}>Assets owned:</Typography>
      {info && info.assets && info.assets.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Asset ID</TableCell>
                <TableCell align='right'>Amount</TableCell>
                <TableCell align='right'>Deleted?</TableCell>
                <TableCell align='right'>Is frozen?</TableCell>
                <TableCell align='right'>Opted in at round</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.assets.map((asset) => (
                <TableRow key={asset['asset-id']}>
                  <TableCell component='th' scope='row'>
                    <Link
                      href={testNetBaseUrl + `/asset/${asset['asset-id']}`}
                      target='_blank'
                    >
                      {asset['asset-id']}
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{asset.amount}</TableCell>
                  <TableCell align='right'>
                    {asset.deleted ? 'true' : 'false'}
                  </TableCell>
                  <TableCell align='right'>
                    {asset['is-frozen'] ? 'true' : 'false'}
                  </TableCell>
                  <TableCell align='right'>
                    {asset['opted-in-at-round']}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export function CreatedAssetTable({ info }) {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Typography className={classes.infoLabel}>Assets created:</Typography>
      {info && info['created-assets'] && info['created-assets'].length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Asset ID</TableCell>
                <TableCell align='right'>Name</TableCell>
                <TableCell align='right'>Total</TableCell>
                <TableCell align='right'>Deleted?</TableCell>
                <TableCell align='right'>Unit name</TableCell>
                <TableCell align='right'>Created at round</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info['created-assets'].map((asset) => (
                <TableRow key={asset.index}>
                  <TableCell component='th' scope='row'>
                    <Link
                      href={testNetBaseUrl + `/asset/${asset.index}`}
                      target='_blank'
                    >
                      {asset.index}
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{asset.params.name}</TableCell>
                  <TableCell align='right'>{asset.params.total}</TableCell>
                  <TableCell align='right'>
                    {asset.deleted ? 'true' : 'false'}
                  </TableCell>
                  <TableCell align='right'>
                    {asset.params['unit-name']}
                  </TableCell>
                  <TableCell align='right'>
                    {asset['created-at-round']}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
