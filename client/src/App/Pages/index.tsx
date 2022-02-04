import { Grid, makeStyles } from '@material-ui/core';
import * as React from 'react';
import LandingPageLayout from '../Layouts/LandingPageLayout';
import {
  GreenSubmitButton,
  StyledDivider,
} from '../Shared/Components/StyledComponents';

import { AccountList } from './AccountList';
import { AssetContextWrapper, useAssetContext } from './AssetContext';
import { CreateAccount } from './CreateAccount';
import { CreateAssetModal } from './CreateAsset';
import { TransferAssetModal } from './TransferAsset';

const _ExamplePage = (props) => {
  const {
    accounts,
    isCreateAssetOpen,
    toggleCreateAsset,
    isTransferAssetOpen,
    toggleTransferAsset,
  } = useAssetContext();

  return (
    <div>
      <LandingPageLayout
        title='Test boiletplate(Tamaghna)'
        description='Test boiletplate(Tamaghna)'
      >
        <CreateAssetModal
          open={isCreateAssetOpen}
          handleClose={toggleCreateAsset}
          title='Create an asset'
          button={null}
        />
        <TransferAssetModal
          open={isTransferAssetOpen}
          handleClose={toggleTransferAsset}
          title='Transfer an asset'
          button={null}
        />
        <Grid container spacing={3}>
          <Grid
            container
            spacing={3}
            alignContent='space-between'
            alignItems='center'
            style={{ margin: 20 }}
          >
            <Grid item xs={12} sm={4}>
              <CreateAccount />
            </Grid>
            <Grid item xs={12} sm={4}>
              <GreenSubmitButton onClick={toggleCreateAsset}>
                Create asset
              </GreenSubmitButton>
            </Grid>
            <Grid item xs={12} sm={4}>
              <GreenSubmitButton onClick={toggleTransferAsset}>
                Transfer asset
              </GreenSubmitButton>
            </Grid>
            <StyledDivider />
          </Grid>

          <Grid item xs={12} sm={12}>
            <AccountList accounts={accounts} />
          </Grid>
        </Grid>
      </LandingPageLayout>
    </div>
  );
};

const ExamplePage = (props) => {
  return (
    <AssetContextWrapper>
      <_ExamplePage />
    </AssetContextWrapper>
  );
};

export default ExamplePage;
