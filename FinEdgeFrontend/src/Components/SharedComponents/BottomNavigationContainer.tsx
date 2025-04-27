import { userIcon, categorizeIcon, trackChangesEnableIcon, sparklesIcon, logoutIcon, infoCircleIcon, infoSolidIcon } from '@progress/kendo-svg-icons';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../Hooks/Auth/useLogOut';
import useGetNotifications from '../../Hooks/Notifications/useGetNotifications';
import { BottomNavigationSelectEvent, BottomNavigation } from '@progress/kendo-react-layout';

type BottomNavigationProps = {
  children: ReactNode;
}

const BottomNavigationContainer = ({ children }: BottomNavigationProps) => {
  const navigate = useNavigate();
  const { data } = useGetNotifications();
  const { mutateAsync: logOut } = useLogout();
  const [selected, setSelected] = useState(0);

  const items = [
    { svgIcon: userIcon, route: "/home" },
    { svgIcon: data?.length! > 0 ? infoSolidIcon : infoCircleIcon, route: "/notifications" },
    { svgIcon: userIcon, route: "/accounts" },
    { svgIcon: categorizeIcon, route: "/categories" },
    { svgIcon: trackChangesEnableIcon, route: "/transactions" },
    { svgIcon: sparklesIcon, route: "/recommendations" },
    { svgIcon: logoutIcon, route: "/login" },
  ];

  const onSelect = async (e: BottomNavigationSelectEvent) => {
    if (e.itemTarget.route === "/login") {
      await logOut();
    } else {
      navigate(e.itemTarget.route);
      setSelected(e.itemIndex);
    }
  };

  return (
    <>
      <div>{children}</div>
      <div className='my-12'>
        <BottomNavigation positionMode={"fixed"} items={items.map((item, index) => ({...item, selected: index === selected}))} onSelect={onSelect} />
      </div>
    </>
  );
}

export default BottomNavigationContainer;