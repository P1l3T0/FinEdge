import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerSelectEvent } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { userIcon, logoutIcon, menuIcon, infoCircleIcon, infoSolidIcon, sparklesIcon, trackChangesEnableIcon, dollarIcon, categorizeIcon } from "@progress/kendo-svg-icons";
import useLogout from "../../Hooks/Auth/useLogOut";
import useGetNotifications from "../../Hooks/Notifications/useGetNotifications";

type DrawerContainerProps = {
  children: ReactNode;
}

const DrawerContainer = ({ children }: DrawerContainerProps) => {
  const { data } = useGetNotifications();
  const navigate = useNavigate();
  const { mutateAsync: logOut } = useLogout();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [selected, setSelected] = useState(0);

  const items = [
    { text: "Profile", svgIcon: userIcon, route: "/home" },
    { text: `Notifications (${data?.length || "0"})`, svgIcon: data?.length! > 0 ? infoSolidIcon : infoCircleIcon, route: "/notifications" },
    { text: "Accounts", svgIcon: dollarIcon, route: "/accounts" },
    { text: "Categories", svgIcon: categorizeIcon, route: "/categories" },
    { text: "Transactions", svgIcon: trackChangesEnableIcon, route: "/transactions" },
    { text: "Recommendations", svgIcon: sparklesIcon, route: "/recommendations" },
    { text: "Log Out", svgIcon: logoutIcon, route: "/login" },
  ];

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const onSelect = async (e: DrawerSelectEvent) => {
    if (e.itemTarget.props.text === "Log Out") {
      await logOut();
    } else {
      navigate(e.itemTarget.props.route);
      setSelected(e.itemIndex);
    }
  };

  return (
    <div>
      <div className="flex items-center h-13 border-b border-gray-200 bg-white px-2">
        <div className="p-2 -ml-2">
          <Button svgIcon={menuIcon} fillMode="flat" onClick={handleClick} />
        </div>
        <div className="flex-1 flex justify-center items-center pt-1">
          <svg viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg" className="max-h-20" >
            <path d="M 80 150 L 140 90 L 200 150" fill="none" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <text x="230" y="150" fontFamily="Arial" fontWeight="900" fontSize="120" >
              <tspan fill="#1e3a8a">Fin</tspan>
              <tspan fill="#2563eb" dx="10">Edge</tspan>
            </text>
            <text x="500" y="220" fontFamily="Arial" fontSize="36" fill="#64748b" letterSpacing="4" fontWeight="500" textAnchor="middle" >
              FINANCIAL INTELLIGENCE
            </text>
          </svg>
        </div>
        <div className="w-12 mr-2"></div>
      </div>
      <Drawer mini={true} expanded={expanded} position="start" mode="push" width={200} onSelect={onSelect}
        items={items.map((item, index) => ({
          ...item,
          selected: index === selected,
        }))}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerContainer;
