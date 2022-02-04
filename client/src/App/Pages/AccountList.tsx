import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
  Box,
} from '@material-ui/core';
import React from 'react';
import { AccountListItem } from './AccountListItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAssetContext } from './AssetContext';

export function AccountList({ accounts }) {
  const { selectedAddress } = useAssetContext();

  return (
    <div>
      {accounts &&
        accounts.map((account, index) => {
          return (
            <Accordion key={index}
              defaultExpanded={
                selectedAddress && selectedAddress === account.address
                  ? true
                  : index === accounts.length - 1
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography variant='overline' id={'address'}>
                  {account.address}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AccountListItem account={account} index={index} />
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}
