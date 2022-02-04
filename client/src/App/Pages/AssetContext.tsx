import * as React from 'react';
import { useContext, useState } from 'react';
import { useAddEntity, useEntity, useToggle } from '../Shared/Hooks';
import { getEntityById } from '../Shared/Services';

export interface IAccounts {
  address: string;
}

export interface AssetTransferDto {
  senderAddress: string;
  recipientAddress: string;
  assetId: number;
  amount: number;
}

export const AssetContextWrapper = ({ children }) => {
  const addEntity = useAddEntity();
  const [loading, accounts, getAccounts] = useEntity('');

  const [accountsWithInfo, setAccountsWithInfo] = useState<any>([]);

  const [addressToUpdate, setAddressToUpdate] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const [isCreateAssetOpen, toggleCreateAsset] = useToggle();
  const [isTransferAssetOpen, toggleTransferAsset] = useToggle();

  const refresh = () => {
    getAccounts();
  };

  const updateAccountInfo = async (addressToUpdate) => {
    setAddressToUpdate(addressToUpdate);
    setSelectedAddress(addressToUpdate);
  };

  const getAddressInfo = async (account) => {
    const addressInfo: any = await getEntityById(
      '/asset/account',
      account.address,
    );
    if (addressInfo) {
      setAccountsWithInfo((prevState) =>
        prevState.concat([addressInfo.account]),
      );
    }
    return addressInfo;
  };

  const createAlgoAccount = async () => {
    await addEntity('/asset/account', {}, 'Algorand address created', refresh);
  };

  const handleCreateAsset = async (values) => {
    toggleCreateAsset();
    setSelectedAddress(values.address);
    const res = await addEntity('/asset', values, 'Asset created', refresh);
    if (res) {
      updateAccountInfo(values.address);
    }
  };

  const handleTransferAssets = async (values) => {
    toggleTransferAsset();
    const res = await addEntity(
      '/asset/transfer',
      values,
      'Asset transfer complete',
      refresh,
    );

    if (res) {
      updateAccountInfo(values.recipientAddress);
    }
  };

  const value = {
    getAddressInfo,
    addressToUpdate,
    setAddressToUpdate,
    setSelectedAddress,
    selectedAddress,
    refresh,
    accounts,
    createAlgoAccount,
    handleCreateAsset,
    accountsWithInfo,
    isCreateAssetOpen,
    toggleCreateAsset,
    isTransferAssetOpen,
    toggleTransferAsset,
    handleTransferAssets,
  };

  return (
    <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
  );
};

export const AssetContext = React.createContext({
  getAddressInfo: (account): any => {},
  addressToUpdate: '',
  setAddressToUpdate: (value) => {},
  setSelectedAddress: (value) => {},
  selectedAddress: '',
  refresh: () => {},
  accounts: [],
  accountsWithInfo: [],
  createAlgoAccount: () => {},
  handleCreateAsset: (values) => {},
  isCreateAssetOpen: false,
  toggleCreateAsset: () => {},
  isTransferAssetOpen: false,
  toggleTransferAsset: () => {},
  handleTransferAssets: (values) => {},
});

export const useAssetContext = () => useContext(AssetContext);
