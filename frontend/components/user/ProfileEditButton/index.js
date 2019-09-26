import React, { useCallback } from 'react';
import { Button, message } from 'antd';

const ProfileEditButton = () => {
  const handleEditProfile = useCallback(() => {
    message.info('아직 등록되지 않은 서비스입니다.');
  }, []);
  return (
    <Button onClick={handleEditProfile} >프로필 수정</Button>
  );
};

export default ProfileEditButton;
