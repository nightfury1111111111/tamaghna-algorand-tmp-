import { useState } from 'react';

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [isToggled, setToggled] = useState<boolean>(initialValue);

  const toggle = () => {
    setToggled((prevState) => !prevState);
  };

  return [isToggled, toggle];
};
