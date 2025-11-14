import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ToastTypes, pushToast } from '../Global/myToaster';
import { Button } from '../Global/styles';
import { tokenParser } from '../Global/tokenParser';
import { OfferBox, OfferTitle } from '../Home/styles';
import { Input } from '../LogIn/styles';
import { theme } from '../Theme';
import { updateUserDisplayName } from '../api/User';

export const UserCard = () => {
  const [displayName, setDisplayName] = useState<string>(
    tokenParser(sessionStorage.getItem('accessToken') ?? '')?.displayName
  );

  const useUpdateUserDisplayName = useMutation({
    mutationFn: updateUserDisplayName,
    onError: (err) => {
      pushToast('Failed to update display name', ToastTypes.error);
    },
    onSuccess: (res) => {
      sessionStorage.setItem('accessToken', res.data);
      pushToast('Display Name updated');
    }
  });

  return (
    <OfferBox style={{ background: theme.postIt.orange }}>
      <OfferTitle>Display Name</OfferTitle>
      <Input
        placeholder='Display Name'
        value={displayName}
        style={{ width: '100%' }}
        onChange={({ target: { value } }) => setDisplayName(value)}
      />
      <Button onClick={() => useUpdateUserDisplayName.mutate(displayName)}>Update</Button>
    </OfferBox>
  );
};
