import * as React from 'react';
import { GreenSubmitButton } from '../Shared/Components/StyledComponents';

import { useAssetContext } from './AssetContext';

export function CreateAccount() {
  const { createAlgoAccount } = useAssetContext();

  return (
    <div>
      <GreenSubmitButton onClick={createAlgoAccount}>
        Create new address
      </GreenSubmitButton>
    </div>
  );
}
