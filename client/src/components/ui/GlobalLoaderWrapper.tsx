import { Outlet, useNavigation } from 'react-router-dom';
import GlobalLoader from './GlobalLoader';

const GlobalLoaderWrapper = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      {isLoading && <GlobalLoader />}
      <Outlet />
    </>
  );
};

export default GlobalLoaderWrapper;

