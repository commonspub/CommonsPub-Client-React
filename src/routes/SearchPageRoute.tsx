import { WithSidebarTemplate } from 'HOC/templates/WithSidebar/WithSidebar';
import SearchComp from 'pages/search/Search';
import React, { FC } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { searchDisabled } from 'mn-constants';
import NotFound from 'pages/not-found/NotFound';

interface SearchPageRouter {}
const SearchPageRouter: FC<RouteComponentProps<SearchPageRouter>> = ({
  match
}) => {
  return searchDisabled ? (
    <NotFound />
  ) : (
    <WithSidebarTemplate>
      <SearchComp />
    </WithSidebarTemplate>
  );
};

export const SearchPageRoute: RouteProps = {
  exact: true,
  path: '/search',
  component: SearchPageRouter
};
