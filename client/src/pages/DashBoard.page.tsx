import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import useAuth from '@/hooks/auth/use-auth';
import { lazy, Suspense, useRef } from 'react';
import useGetAllTemplateHook from '@/hooks/user/use-getAllTemplate';
import templateJson from '@/assets/labStructure.json';
import { useMutation } from '@tanstack/react-query';
import { updateUserMutationFn } from '@/libs/api';
import ToastMessage from '@/components/ui/ToastMessage.com';
import { useNavigate } from 'react-router';
import { EDITOR_ROUTES } from '@/routes/common/routesPath';
import { ToastMessageHandle } from '@/types/interface';
import UploadableAvatar from '@/components/ui/UploadableAvatar';

const HoverCard = lazy(() => import('@/components/ui/HoverCard.com'));

const ColumnGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: theme.spacing(4),
}));

// const HoverText = {
//   EDIT: 'Edit your cv',
//   NEW: 'Choosse your cv',
// };

const DashboardPage = () => {
  const { data, isLoading, refetch } = useAuth();
  const { data: templateData } = useGetAllTemplateHook();
  const userName = data?.user?.name || 'name';
  const { mutate } = useMutation({ mutationFn: updateUserMutationFn });
  const toastRef = useRef<ToastMessageHandle>(null);
  const navigate = useNavigate();

  const handleTemChoose = (templateId: string, isDelete: boolean = false): void => {
    if (!data) return;
    let cvIds = data.user.cvTemplateId;
    if (cvIds.includes(templateId)) {
      if (!isDelete) {
        toastRef.current?.showToast('You already have this template.', 'info');
        return;
      }
      if (isDelete) {
        cvIds = cvIds.filter((id) => id !== templateId);
      }
    } else {
      cvIds = [...cvIds, templateId];
    }
    const payLoad = {
      cvTemplateId: cvIds,
      name: data?.user?.name,
      email: data.user.email,
    };
    mutate(payLoad, {
      onSuccess: () => {
        if (isDelete) {
          toastRef.current?.showToast('Template Deleted successfully', 'success');
          refetch();
          return;
        }
        toastRef.current?.showToast('Nice choose', 'success');
        setTimeout(() => {
          navigate(`/editor/${EDITOR_ROUTES.USERDETAIL}?templateId=${templateId}`);
        }, 400);
      },
      onError: () => {
        toastRef.current?.showToast('Error occurred while adding.', 'error');
      },
    });
  };

  const handleImgUpload = (base64: string) => {
    if (!data) return;

    const payLoad = {
      ...data.user,
      profilePicture: base64,
    };

    mutate(payLoad, {
      onSuccess: () => {
        toastRef.current?.showToast('Img uploaded', 'success');
      },
      onError: () => {
        toastRef.current?.showToast('Error occurred while uploading.', 'error');
      },
    });
  };

  const EditHandler = (templateId: string) =>
    navigate(`/editor/${EDITOR_ROUTES.USERDETAIL}?templateId=${templateId}`);

  if (isLoading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Stack alignItems="center" spacing={2} mb={4}>
          {/* <Avatar
            sx={{ width: 100, height: 100 }}
            src={data?.user?.profilePicture || undefined}
          >
            {!data?.user?.profilePicture &&
              (userName?.charAt(0).toUpperCase() || <PersonIcon />)}
          </Avatar> */}

          <UploadableAvatar
            initialImage={data?.user?.profilePicture}
            userName={data?.user?.name}
            onUpload={(base64) => handleImgUpload(base64)}
            imgURL={data?.user?.profilePicture || undefined}
          />
          <Typography variant="h4">{userName}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Create your professional CV — the fun way!
          </Typography>
        </Stack>
        <Divider sx={{ mb: 4 }} />
        <ColumnGrid>
          <Box>
            <Typography variant="h5" mb={2}>
              Your CVs
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Suspense fallback={<CircularProgress size="3rem" />}>
                {!data?.user?.cvTemplateId.length ? (
                  <Typography color="text.secondary">No CVs created yet.</Typography>
                ) : (
                  data?.user?.cvTemplateId.map((_id) => (
                    <HoverCard
                      key={_id}
                      img={templateJson[_id as keyof typeof templateJson].img}
                      // hoverText={HoverText.EDIT}
                      newCv={false}
                      onClick={() => EditHandler(_id)}
                      delClick={() => handleTemChoose(_id, true)}
                    />
                  ))
                )}
              </Suspense>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" mb={2}>
              Templates
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Suspense fallback={<CircularProgress size="3rem" />}>
                {templateData?.templates.map((id) => (
                  <HoverCard
                    key={id}
                    img={templateJson[id as keyof typeof templateJson].img}
                    // hoverText={
                    //   data?.user?.cvTemplateId.includes(id)
                    //     ? HoverText.EDIT
                    //     : HoverText.NEW
                    // }
                    newCv={!data?.user?.cvTemplateId.includes(id)}
                    onClick={
                      data?.user?.cvTemplateId.includes(id)
                        ? () => EditHandler(id)
                        : () => handleTemChoose(id)
                    }
                    delClick={() => handleTemChoose(id, true)}
                    disable={data?.user?.cvTemplateId.includes(id)}
                  />
                ))}
              </Suspense>
            </Box>
          </Box>
        </ColumnGrid>
      </Container>
      <ToastMessage ref={toastRef} />
    </>
  );
};

export default DashboardPage;

