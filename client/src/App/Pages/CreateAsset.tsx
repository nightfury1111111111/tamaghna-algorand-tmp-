import { Box, makeStyles } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { GreenSubmitButton } from '../Shared/Components/StyledComponents';
import {
  Select,
  StyledTextField,
} from '../Shared/Components/StyledComponents/StyledInputs.jsx';
import { StyledModal } from '../Shared/Components/StyledComponents/StyledModal';

import { IAccounts, useAssetContext } from './AssetContext';

const styles = makeStyles({
  formContainer: {
    padding: 40,
    margin: '50px auto 50px',
  },
});

export function CreateAsset() {
  const classes = styles();

  const { accountsWithInfo, handleCreateAsset } = useAssetContext();

  return (
    <Box className={classes.formContainer}>
      <Formik
        initialValues={{
          tokenName: '',
          totalTokens: '',
          address: '',
        }}
        validate={(value) => { }}
        onSubmit={(values, { resetForm }) => {
          handleCreateAsset(values);
          resetForm();
        }}
      >
        {({ submitForm, isSubmitting, handleChange }) => (
          <Form>
            <Select
              name='address'
              label='Address to create the asset'
              //  filter for accounts with info first - only accounts with a balance will return info
              selectOptions={accountsWithInfo
                .filter((account) => account)
                .map((account: IAccounts) => account.address)}
              handleChange={handleChange}
            />
            <StyledTextField label='Asset name' name='tokenName' />
            <StyledTextField label='Quantity' name='totalTokens' />

            <GreenSubmitButton disabled={isSubmitting} onClick={submitForm}>
              Create asset
            </GreenSubmitButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export function CreateAssetModal({ open, handleClose, title, button }) {
  return (
    <StyledModal
      open={open}
      handleClose={handleClose}
      title={title}
      button={button}
    >
      <CreateAsset />
    </StyledModal>
  );
}
