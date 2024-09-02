import { Box, Tabs, Tab } from "@mui/material";
import RestProfileForm from "../RestProfileForm/RestProfileForm";
import TaxInfoForm from "../TaxInfoForm/TaxInfoForm";
import PaymentInfoForm from "../PaymentInfoForm/PaymentInfoForm";
import SideNav from "../SideNav/SideNav";
import { useState } from "react";
import DeliveryInfoForm from "../DeliveryInfoForm/DeliveryInfoForm";
import ExtraPayment from "../ExtraPayment/ExtraPayment";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideNav />
      <Box component='main' sx={{ flexGrow: 1, p: 3, marginTop: "4rem" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label='Dashboard Tabs'
          sx={{ fontWeight: "500" }}
        >
          <Tab sx={{ fontWeight: "600" }} label='Restaurant Information' />
          <Tab sx={{ fontWeight: "600" }} label='Tax Details' />
          <Tab sx={{ fontWeight: "600" }} label='Payment Details' />
          <Tab sx={{ fontWeight: "600" }} label='Delivery Details' />
          <Tab sx={{ fontWeight: "600" }} label='Extra Payment' />
        </Tabs>

        {selectedTab === 0 && <RestProfileForm />}
        {selectedTab === 1 && <TaxInfoForm />}
        {selectedTab === 2 && <PaymentInfoForm />}
        {selectedTab === 3 && <DeliveryInfoForm />}
        {selectedTab === 4 && <ExtraPayment />}
      </Box>
    </Box>
  );
};

export default Dashboard;
