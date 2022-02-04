import { Box, makeStyles } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  GreenSubmitButton,
  StyledDataView,
} from '../Shared/Components/StyledComponents';
import {
  Select,
  StyledTextField,
} from '../Shared/Components/StyledComponents/StyledInputs.jsx';
import { StyledModal } from '../Shared/Components/StyledComponents/StyledModal';

import { AssetTransferDto, IAccounts, useAssetContext } from './AssetContext';

const styles = makeStyles({
  formContainer: {
    padding: 40,
    margin: '50px auto 50px',
  },
});

export function TransferAsset() {
  const classes = styles();
  const {
    accounts,
    handleTransferAssets,
    accountsWithInfo,
  } = useAssetContext();

  const [assets, setAssets] = useState<any>([]);
  const [selectedAsset, setSelectedAsset] = useState(0);
  const [fromAddress, setFromAddress] = useState<any>();

  useEffect(() => {
    if (accountsWithInfo && accountsWithInfo.length > 0) {
      accountsWithInfo.map((account: any, index) => {
        if (
          account &&
          account['created-assets'] &&
          account['created-assets'].length > 0
        ) {
          setAssets((prevState) => prevState.concat(account['created-assets']));
        }
      });
    }
  }, [accounts]);

  useEffect(() => {
    if (selectedAsset) {
      const found = assets.find((asset) => {
        return asset.index === selectedAsset;
      });
      if (found) {
        setFromAddress(found);
      }
    }
  }, [selectedAsset]);

  return (
    <Box className={classes.formContainer}>
      <Formik
        initialValues={{
          tokenName: '',
          quantity: '',
          to: '',
        }}
        validate={(values) => {
          // When the token is selected, get the id and set the selected asset
          const assetId = values.tokenName.substring(0, 9);
          setSelectedAsset(Number(assetId));
        }}
        onSubmit={(values, { resetForm }) => {
          const assetTransfer: AssetTransferDto = {
            senderAddress: fromAddress.params.creator,
            recipientAddress: values.to,
            assetId: selectedAsset,
            amount: Number(values.quantity),
          };
          handleTransferAssets(assetTransfer);
          resetForm();
        }}
        enableReinitialize={true}
      >
        {({ submitForm, isSubmitting, handleChange }) => (
          <Form>
            <Select
              label='Asset name'
              name='tokenName'
              selectOptions={assets.map((asset) => {
                if (asset && asset.params) {
                  return `${asset.index} | ${asset.params.name} | total units: ${asset.params.total}`;
                } else {
                  return '';
                }
              })}
              handleChange={handleChange}
            />
            <StyledTextField label='Quantity' name='quantity' />
            <div style={{ marginBottom: 25 }}>
              <StyledDataView
                label='From'
                text={fromAddress ? fromAddress.params.creator : ''}
              />
            </div>

            <Select
              label='To address'
              name='to'
              selectOptions={accounts.map(
                (account: IAccounts) => account.address,
              )}
              handleChange={handleChange}
            />
            <GreenSubmitButton disabled={isSubmitting} onClick={submitForm}>
              Transfer asset
            </GreenSubmitButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export function TransferAssetModal({ open, handleClose, title, button }) {
  return (
    <StyledModal
      open={open}
      handleClose={handleClose}
      title={title}
      button={button}
    >
      <TransferAsset />
    </StyledModal>
  );
}
