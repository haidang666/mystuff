import React from 'react';
import MainMenuItem from '@/Shared/MainMenu/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Organizations" link="organizations" icon="building" />
      <MainMenuItem text="Contacts" link="contacts" icon="address book" />
      <MainMenuItem text="Reports" link="reports" icon="print" />
      <MainMenuItem text="Notes" link="notes" icon="sticky note" />
      <MainMenuItem text="Documents" link="documents" icon="file alternate" />
    </div>
  );
};
