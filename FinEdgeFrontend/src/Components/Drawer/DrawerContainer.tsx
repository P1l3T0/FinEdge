import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerSelectEvent } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { userIcon, logoutIcon, menuIcon, bellIcon, sparklesIcon, trackChangesEnableIcon, categorizeIcon } from "@progress/kendo-svg-icons";
import useGetNotifications from "../../Hooks/useGetNotifications";
import useLogout from "../../Hooks/useLogOut";

type DrawerContainerProps = {
  children: ReactNode;
}

const DrawerContainer = ({ children }: DrawerContainerProps) => {
  const { data } = useGetNotifications();
  const navigate = useNavigate();
  const { mutateAsync: logOut } = useLogout();

  const [expanded, setExpanded] = useState<boolean>(true);
  const [selected, setSelected] = useState(0);

  const items = [
    { text: "Profile", svgIcon: userIcon, route: "/home" },
    { text: `Notifications (${data?.length || "0"})`, svgIcon: bellIcon, route: "/notifications" },
    { text: "Accounts", svgIcon: userIcon, route: "/accounts" },
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
      <div className="p-0.5">
        <Button svgIcon={menuIcon} fillMode="flat" onClick={handleClick} />
      </div>
      <Drawer
        mini={true}
        expanded={expanded}
        position={"start"}
        mode={"push"}
        width={200}
        items={items.map((item, index) => ({
          ...item,
          selected: index === selected,
        }))}
        onSelect={onSelect}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerContainer;
