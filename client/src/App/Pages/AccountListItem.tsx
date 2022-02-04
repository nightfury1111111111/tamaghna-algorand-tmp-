import { CircularProgress, Grid, Link, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { StyledDataView } from '../Shared/Components/StyledComponents';
import { CreatedAssetTable, OwnedAssetTable } from './AssetTable';
import { useAssetContext } from './AssetContext';

export interface AlgoAccountInfo {
  assets: IOwnedAsset[];
  'created-assets': ICreatedAssets[];
}

export interface IOwnedAsset {
  amount: number;
  'asset-id': string;
  creator: string;
  deleted: boolean;
  'is-frozen': boolean;
  'opted-in-at-round': number;
}

export interface ICreatedAssets {
  index: number;
}

export const testNetBaseUrl = 'https://testnet.algoexplorer.io';

export function AccountListItem({ account, index }) {
  const {
    getAddressInfo,
    addressToUpdate,
    setAddressToUpdate,
  } = useAssetContext();

  const [accountBalance, setAccountBalance] = useState(0);
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    setLoading(false);
    const addressInfo = await getAddressInfo(account);
    if (addressInfo) {
      setInfo(addressInfo.account);
      if (addressInfo.account) {
        setAccountBalance(addressInfo.account.amount);
      }
    }
  };

  useEffect(() => {
    if (account.address) {
      // Request throttled due to purestake api limits to
      setTimeout(() => getInfo(), 5000 * index);
    }
  }, [account]);

  useEffect(() => {
    if (addressToUpdate && addressToUpdate === account.address) {
      setTimeout(() => getInfo(), 5000);
      setAddressToUpdate('');
    }
  }, [addressToUpdate]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      <Grid xs={12} sm={4}>
        <StyledDataView
          label='Account balance'
          text={
            accountBalance
              ? `${(accountBalance / 1000000).toLocaleString()} algos`
              : '0 algos'
          }
        />
      </Grid>

      <Grid xs={12} sm={4}>
        {account && account.address && (
          <div style={{ marginTop: 10 }}>
            <Link
              align='center'
              href={testNetBaseUrl + `/address/${account.address}`}
              target='_blank'
            >
              Link to testnet
            </Link>
          </div>
        )}
      </Grid>

      {accountBalance === 0 && (
        <div style={{ marginTop: 10 }}>
          <Typography>
            Copy address and paste into{' '}
            <Link
              align='center'
              href='https://testnet.algoexplorer.io/dispenser'
              target='_blank'
            >
              algorand testnest dispenser
            </Link>{' '}
            to add algos
          </Typography>
        </div>
      )}

      <Grid sm={12} md={6}>
        {info && <CreatedAssetTable info={info} />}
      </Grid>

      <Grid sm={12} md={6}>
        {info && <OwnedAssetTable info={info} />}
      </Grid>
    </Grid>
  );
}
